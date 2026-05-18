/* eslint-env node */
import db from "./db.js";
import nodemailer from "nodemailer";
import process from "process";

const EMAIL_TO = process.env.EMAIL_TO || "akashtiwari7117@gmail.com";
const EMAIL_TRANSPORT_USER = process.env.EMAIL_USER;
const EMAIL_TRANSPORT_PASS = process.env.EMAIL_PASS;
const EMAIL_TRANSPORT_HOST = process.env.EMAIL_HOST || "smtp.gmail.com";
const EMAIL_TRANSPORT_PORT = process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587;

function sendJson(res, statusCode, data, origin = "*") {
  const payload = JSON.stringify(data);
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
  });
  res.end(payload);
}

function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1e6) {
        req.connection.destroy();
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
  });
}

function createMailerTransporter() {
  if (!EMAIL_TRANSPORT_USER || !EMAIL_TRANSPORT_PASS) {
    return null;
  }

  const transportOptions = {
    auth: {
      user: EMAIL_TRANSPORT_USER,
      pass: EMAIL_TRANSPORT_PASS,
    },
  };

  if (EMAIL_TRANSPORT_HOST.includes("gmail.com") || EMAIL_TRANSPORT_USER.endsWith("@gmail.com")) {
    transportOptions.service = "gmail";
    transportOptions.secure = EMAIL_TRANSPORT_PORT === 465;
    transportOptions.port = EMAIL_TRANSPORT_PORT;
    transportOptions.tls = {
      rejectUnauthorized: false,
    };
  } else {
    transportOptions.host = EMAIL_TRANSPORT_HOST;
    transportOptions.port = EMAIL_TRANSPORT_PORT;
    transportOptions.secure = EMAIL_TRANSPORT_PORT === 465;
  }

  return nodemailer.createTransport(transportOptions);
}

async function sendContactNotification(lead) {
  const transporter = createMailerTransporter();
  if (!transporter) {
    return {
      sent: false,
      warning: "Email transport is not configured. Set EMAIL_USER and EMAIL_PASS environment variables.",
    };
  }

  const mailOptions = {
    from: `PrimeEdge Contact <${EMAIL_TRANSPORT_USER}>`,
    to: EMAIL_TO,
    subject: `New contact request from ${lead.name}`,
    text: `New contact request:\n\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nRequirement: ${lead.requirement}`,
    html: `<strong>New contact request</strong><br/><br/><b>Name:</b> ${lead.name}<br/><b>Email:</b> ${lead.email}<br/><b>Phone:</b> ${lead.phone}<br/><b>Requirement:</b> ${lead.requirement}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return {
      sent: true,
      info,
    };
  } catch (error) {
    // Don't throw - return error details instead
    return {
      sent: false,
      error: error.message,
    };
  }
}

export const routes = {
  // LOGIN ROUTE
  "/api/login": async (req, res, origin) => {
    if (req.method !== "POST") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    try {
      const { email, password } = await parseRequestBody(req);

      if (!email || !password) {
        return sendJson(res, 400, { success: false, error: "Email and password required" }, origin);
      }

      const user = db.findUserByEmail(email);
      if (!user) {
        return sendJson(res, 401, { success: false, error: "User not found" }, origin);
      }

      if (user.password !== password) {
        return sendJson(res, 401, { success: false, error: "Wrong password" }, origin);
      }

      const { password: _, ...userWithoutPassword } = user;
      return sendJson(res, 200, { success: true, user: userWithoutPassword }, origin);
    } catch (err) {
      return sendJson(res, 400, { success: false, error: err.message }, origin);
    }
  },

  // REGISTER ROUTE
  "/api/register": async (req, res, origin) => {
    if (req.method !== "POST") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    try {
      const { email, password, name, phone } = await parseRequestBody(req);

      if (!email || !password || !name || !phone) {
        return sendJson(res, 400, { success: false, error: "All fields required" }, origin);
      }

      if (db.findUserByEmail(email)) {
        return sendJson(res, 409, { success: false, error: "Email already registered" }, origin);
      }

      const newUser = db.createUser({ email, password, name, phone, plan: "basic" });
      const { password: _, ...userWithoutPassword } = newUser;
      return sendJson(res, 201, { success: true, user: userWithoutPassword }, origin);
    } catch (err) {
      return sendJson(res, 400, { success: false, error: err.message }, origin);
    }
  },

  // CONTACT FORM SUBMISSION
  "/api/contact": async (req, res, origin) => {
    if (req.method !== "POST") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    try {
      const { name, email, phone, requirement } = await parseRequestBody(req);

      if (!name || !email || !phone) {
        return sendJson(res, 400, { success: false, error: "Name, email, and phone are required" }, origin);
      }

      const lead = db.createLead({ 
        name, 
        email, 
        phone, 
        requirement: requirement || "No requirement specified" 
      });

      let emailNotification = {
        sent: false,
        warning: "Email notification was not sent because email transport is not configured.",
      };

      try {
        emailNotification = await sendContactNotification(lead);
      } catch (err) {
        console.error("Failed to send contact notification email:", err);
        emailNotification = {
          sent: false,
          error: err.message || "Email send failed.",
        };
      }

      return sendJson(res, 201, { success: true, lead, emailNotification }, origin);
    } catch (err) {
      return sendJson(res, 400, { success: false, error: err.message }, origin);
    }
  },

  // REQUEST CONSULTATION
  "/api/consultation": async (req, res, origin) => {
    if (req.method === "POST") {
      try {
        const { userId, type, date, notes } = await parseRequestBody(req);

        if (!userId || !type) {
          return sendJson(res, 400, { success: false, error: "UserId and type required" }, origin);
        }

        const consultation = db.createConsultation({ userId, type, status: "scheduled", date, notes });
        return sendJson(res, 201, { success: true, consultation }, origin);
      } catch (err) {
        return sendJson(res, 400, { success: false, error: err.message }, origin);
      }
    } else if (req.method === "GET") {
      const urlParams = new URL(req.url, `http://${req.headers.host}`);
      const userId = urlParams.searchParams.get("userId");

      if (!userId) {
        return sendJson(res, 400, { success: false, error: "UserId required" }, origin);
      }

      const consultations = db.getConsultationsByUserId(userId);
      return sendJson(res, 200, { success: true, consultations }, origin);
    } else {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }
  },

  // SUBSCRIPTION ROUTES
  "/api/subscription": async (req, res, origin) => {
    if (req.method === "POST") {
      try {
        const { userId, plan, amount, billingCycle } = await parseRequestBody(req);

        if (!userId || !plan || !amount) {
          return sendJson(res, 400, { success: false, error: "UserId, plan, and amount required" }, origin);
        }

        const subscription = db.createSubscription({
          userId,
          plan,
          amount,
          billingCycle: billingCycle || "monthly",
          status: "active",
        });
        return sendJson(res, 201, { success: true, subscription }, origin);
      } catch (err) {
        return sendJson(res, 400, { success: false, error: err.message }, origin);
      }
    } else if (req.method === "GET") {
      const urlParams = new URL(req.url, `http://${req.headers.host}`);
      const userId = urlParams.searchParams.get("userId");

      if (!userId) {
        return sendJson(res, 400, { success: false, error: "UserId required" }, origin);
      }

      const subscriptions = db.getSubscriptionsByUserId(userId);
      return sendJson(res, 200, { success: true, subscriptions }, origin);
    } else {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }
  },

  // GET USER PROFILE
  "/api/user": async (req, res, origin) => {
    if (req.method !== "GET") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    try {
      const urlParams = new URL(req.url, `http://${req.headers.host}`);
      const userId = urlParams.searchParams.get("id");

      if (!userId) {
        return sendJson(res, 400, { success: false, error: "UserId required" }, origin);
      }

      const user = db.findUserById(userId);
      if (!user) {
        return sendJson(res, 404, { success: false, error: "User not found" }, origin);
      }

      const { password: _, ...userWithoutPassword } = user;
      return sendJson(res, 200, { success: true, user: userWithoutPassword }, origin);
    } catch (err) {
      return sendJson(res, 400, { success: false, error: err.message }, origin);
    }
  },

  // GET ALL LEADS (Admin)
  "/api/leads": async (req, res, origin) => {
    if (req.method !== "GET") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    try {
      const leads = db.getAllLeads();
      return sendJson(res, 200, { success: true, leads }, origin);
    } catch (err) {
      return sendJson(res, 400, { success: false, error: err.message }, origin);
    }
  },

  // GET ALL CONTACT SUBMISSIONS (Admin)
  "/api/contact-submissions": async (req, res, origin) => {
    if (req.method !== "GET") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    try {
      const submissions = db.getAllContactSubmissions();
      return sendJson(res, 200, { success: true, submissions }, origin);
    } catch (err) {
      return sendJson(res, 400, { success: false, error: err.message }, origin);
    }
  },

  // PRICING PLANS
  "/api/pricing": async (req, res, origin) => {
    if (req.method !== "GET") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    const plans = [
      {
        id: "plan_1",
        name: "Starter Plan",
        price: 1000,
        cycle: "monthly",
        features: ["Intraday Cash", "Basic Support", "Weekly Updates"],
        returns: { weekly: 2000, monthly: 8000, quarterly: 25000, halfYearly: 550000 },
      },
      {
        id: "plan_2",
        name: "Growth Plan",
        price: 5000,
        cycle: "monthly",
        features: ["Premium Cash", "Index Future", "Priority Support"],
        returns: { weekly: 12000, monthly: 50000, quarterly: 150000, halfYearly: 3200000 },
      },
      {
        id: "plan_3",
        name: "Premium Plan",
        price: 10000,
        cycle: "monthly",
        features: ["All Services", "Dedicated Advisor", "24/7 Support"],
        returns: { weekly: 25000, monthly: 100000, quarterly: 300000, halfYearly: 6500000 },
      },
    ];

    return sendJson(res, 200, { success: true, plans }, origin);
  },

  // HEALTH CHECK
  "/api/health": async (req, res, origin) => {
    return sendJson(res, 200, { success: true, message: "Server is running" }, origin);
  },
};

export function handleRequest(req, res) {
  const origin = req.headers.origin || "*";

  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Credentials": "true",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT",
    });
    return res.end();
  }

  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  const route = routes[pathname];

  if (route) {
    return route(req, res, origin);
  }

  return sendJson(res, 404, { success: false, error: "Route not found" }, origin);
}
