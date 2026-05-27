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
      const normalizedEmail = String(email || "").trim().toLowerCase();
      const normalizedPassword = String(password || "").trim();

      if (!normalizedEmail || !normalizedPassword) {
        return sendJson(res, 400, { success: false, error: "Email and password required" }, origin);
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(normalizedEmail)) {
        return sendJson(res, 400, { success: false, error: "Please enter a valid email address." }, origin);
      }

      const user = db.findUserByEmail(normalizedEmail);
      if (!user) {
        return sendJson(res, 401, { success: false, error: "Email or password is incorrect." }, origin);
      }

      if (user.password !== normalizedPassword) {
        return sendJson(res, 401, { success: false, error: "Email or password is incorrect." }, origin);
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

  // LIVE MARKET TICKER
  "/api/market-ticker": async (req, res, origin) => {
    if (req.method !== "GET") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    const symbols = [
      { symbol: "^NSEI", name: "NIFTY 50" },
      { symbol: "^BSESN", name: "SENSEX" },
      { symbol: "^NSEBANK", name: "BANKNIFTY" },
      { symbol: "RELIANCE.NS", name: "RELIANCE" },
      { symbol: "TCS.NS", name: "TCS" },
      { symbol: "INFY.NS", name: "INFOSYS" },
      { symbol: "HDFCBANK.NS", name: "HDFC BANK" },
      { symbol: "ICICIBANK.NS", name: "ICICI BANK" },
      { symbol: "SBIN.NS", name: "SBI" },
      { symbol: "ADANIENT.NS", name: "ADANI ENTERPRISES" },
      { symbol: "ITC.NS", name: "ITC" },
      { symbol: "BHARTIARTL.NS", name: "BHARTI AIRTEL" },
      { symbol: "LT.NS", name: "LT" },
      { symbol: "ASIANPAINT.NS", name: "ASIAN PAINTS" },
      { symbol: "MARUTI.NS", name: "MARUTI" },
      { symbol: "TATAMOTORS.NS", name: "TATA MOTORS" },
      { symbol: "WIPRO.NS", name: "WIPRO" },
      { symbol: "HCLTECH.NS", name: "HCL TECH" },
      { symbol: "AXISBANK.NS", name: "AXIS BANK" },
      { symbol: "BAJFINANCE.NS", name: "BAJAJ FINANCE" },
      { symbol: "SUNPHARMA.NS", name: "SUN PHARMA" },
    ];

    try {
      const ticker = await Promise.all(symbols.map(async (item) => {
        try {
          const response = await fetch(
            `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(item.symbol)}?range=1d&interval=1m`,
            {
              headers: {
                "User-Agent":
                  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
                Accept: "application/json",
              },
            },
          );

          if (!response.ok) {
            throw new Error(`Unable to load ${item.name}`);
          }

          const data = await response.json();
          const meta = data.chart?.result?.[0]?.meta || {};
          const price = meta.regularMarketPrice ?? null;
          const previousClose = meta.previousClose ?? meta.chartPreviousClose ?? null;
          const change =
            typeof price === "number" && typeof previousClose === "number"
              ? price - previousClose
              : null;
          const changePercent =
            typeof change === "number" && previousClose
              ? (change / previousClose) * 100
              : null;

          return {
            name: item.name,
            symbol: item.symbol,
            price,
            change,
            changePercent,
          };
        } catch {
          return {
            name: item.name,
            symbol: item.symbol,
            price: null,
            change: null,
            changePercent: null,
          };
        }
      }));

      return sendJson(
        res,
        200,
        { success: true, ticker, updatedAt: new Date().toISOString() },
        origin,
      );
    } catch (err) {
      return sendJson(res, 502, { success: false, error: err.message }, origin);
    }
  },

  // LIVE CATEGORY MARKET SNAPSHOT
  "/api/market-category": async (req, res, origin) => {
    if (req.method !== "GET") {
      return sendJson(res, 405, { success: false, error: "Method not allowed" }, origin);
    }

    const urlParams = new URL(req.url, `http://${req.headers.host}`);
    const category = urlParams.searchParams.get("category") || "delivery";
    const categories = {
      delivery: [
        { symbol: "RELIANCE.NS", name: "Reliance Industries", detail: "Energy, retail, telecom" },
        { symbol: "HDFCBANK.NS", name: "HDFC Bank", detail: "Private banking leader" },
        { symbol: "TCS.NS", name: "TCS", detail: "Large-cap IT services" },
        { symbol: "ICICIBANK.NS", name: "ICICI Bank", detail: "Retail and corporate banking" },
        { symbol: "INFY.NS", name: "Infosys", detail: "IT consulting and digital" },
        { symbol: "BHARTIARTL.NS", name: "Bharti Airtel", detail: "Telecom and digital services" },
        { symbol: "LT.NS", name: "Larsen & Toubro", detail: "Infrastructure and engineering" },
        { symbol: "ITC.NS", name: "ITC", detail: "FMCG, hotels, paperboards" },
        { symbol: "SBIN.NS", name: "SBI", detail: "Public sector banking" },
        { symbol: "HINDUNILVR.NS", name: "Hindustan Unilever", detail: "Consumer staples" },
      ],
      intraday: [
        { symbol: "^NSEBANK", name: "Nifty Bank", detail: "High liquidity index basket" },
        { symbol: "RELIANCE.NS", name: "Reliance Industries", detail: "Active large-cap volumes" },
        { symbol: "HDFCBANK.NS", name: "HDFC Bank", detail: "Banking momentum trades" },
        { symbol: "ICICIBANK.NS", name: "ICICI Bank", detail: "Frequent intraday swings" },
        { symbol: "SBIN.NS", name: "SBI", detail: "High retail participation" },
        { symbol: "TATAMOTORS.NS", name: "Tata Motors", detail: "Auto sector volatility" },
        { symbol: "INFY.NS", name: "Infosys", detail: "IT sector liquidity" },
        { symbol: "AXISBANK.NS", name: "Axis Bank", detail: "Banking breakout setups" },
        { symbol: "ADANIENT.NS", name: "Adani Enterprises", detail: "Momentum-focused stock" },
        { symbol: "BAJFINANCE.NS", name: "Bajaj Finance", detail: "Finance sector moves" },
      ],
      fo: [
        { symbol: "^NSEI", name: "Nifty 50", detail: "Index futures and options" },
        { symbol: "^NSEBANK", name: "Bank Nifty", detail: "Banking index derivatives" },
        { symbol: "RELIANCE.NS", name: "Reliance Industries", detail: "Stock futures liquidity" },
        { symbol: "HDFCBANK.NS", name: "HDFC Bank", detail: "Options-heavy counter" },
        { symbol: "ICICIBANK.NS", name: "ICICI Bank", detail: "Active option chain" },
        { symbol: "TATASTEEL.NS", name: "Tata Steel", detail: "Commodity-linked moves" },
        { symbol: "TATAMOTORS.NS", name: "Tata Motors", detail: "Auto derivatives interest" },
        { symbol: "INFY.NS", name: "Infosys", detail: "IT sector hedging" },
        { symbol: "AXISBANK.NS", name: "Axis Bank", detail: "Banking F&O activity" },
        { symbol: "BAJFINANCE.NS", name: "Bajaj Finance", detail: "Premium finance stock" },
      ],
      "mutual-fund": [
        { symbol: "HDFCAMC.NS", name: "HDFC AMC", detail: "Listed asset management company" },
        { symbol: "NAM-INDIA.NS", name: "Nippon India AMC", detail: "Retail-focused asset manager" },
        { symbol: "ABSLAMC.NS", name: "Aditya Birla Sun Life AMC", detail: "Mutual fund asset manager" },
        { symbol: "UTIAMC.NS", name: "UTI AMC", detail: "Legacy asset manager" },
        { symbol: "MFSL.NS", name: "Max Financial", detail: "Financial services market proxy" },
        { symbol: "SBILIFE.NS", name: "SBI Life", detail: "SBI group financial market proxy" },
        { symbol: "ICICIPRULI.NS", name: "ICICI Prudential Life", detail: "ICICI group financial market proxy" },
        { symbol: "KOTAKBANK.NS", name: "Kotak Bank", detail: "Kotak group financial market proxy" },
      ],
      banking: [
        { symbol: "HDFCBANK.NS", name: "HDFC Bank", detail: "Private banking leader" },
        { symbol: "ICICIBANK.NS", name: "ICICI Bank", detail: "Retail and corporate banking" },
        { symbol: "SBIN.NS", name: "SBI", detail: "Public sector banking" },
        { symbol: "AXISBANK.NS", name: "Axis Bank", detail: "Large private bank" },
        { symbol: "KOTAKBANK.NS", name: "Kotak Bank", detail: "Private banking and wealth" },
        { symbol: "INDUSINDBK.NS", name: "IndusInd Bank", detail: "Private sector banking" },
        { symbol: "BANKBARODA.NS", name: "Bank of Baroda", detail: "Public sector banking" },
        { symbol: "PNB.NS", name: "PNB", detail: "Public sector bank" },
      ],
      "it-sector": [
        { symbol: "TCS.NS", name: "TCS", detail: "Large-cap IT services" },
        { symbol: "INFY.NS", name: "Infosys", detail: "IT consulting and digital" },
        { symbol: "HCLTECH.NS", name: "HCL Tech", detail: "Enterprise technology services" },
        { symbol: "WIPRO.NS", name: "Wipro", detail: "IT services and consulting" },
        { symbol: "TECHM.NS", name: "Tech Mahindra", detail: "Technology and telecom services" },
        { symbol: "LTIM.NS", name: "LTIMindtree", detail: "Digital transformation services" },
        { symbol: "PERSISTENT.NS", name: "Persistent", detail: "Software engineering services" },
        { symbol: "MPHASIS.NS", name: "Mphasis", detail: "IT and cloud services" },
      ],
      auto: [
        { symbol: "MARUTI.NS", name: "Maruti", detail: "Passenger vehicle leader" },
        { symbol: "TATAMOTORS.NS", name: "Tata Motors", detail: "Auto and EV momentum" },
        { symbol: "M&M.NS", name: "Mahindra & Mahindra", detail: "SUVs, tractors, and mobility" },
        { symbol: "BAJAJ-AUTO.NS", name: "Bajaj Auto", detail: "Two-wheeler and export strength" },
        { symbol: "EICHERMOT.NS", name: "Eicher Motors", detail: "Premium motorcycle segment" },
        { symbol: "HEROMOTOCO.NS", name: "Hero MotoCorp", detail: "Two-wheeler manufacturer" },
        { symbol: "TVSMOTOR.NS", name: "TVS Motor", detail: "Two and three-wheeler maker" },
        { symbol: "ASHOKLEY.NS", name: "Ashok Leyland", detail: "Commercial vehicles" },
      ],
      pharma: [
        { symbol: "SUNPHARMA.NS", name: "Sun Pharma", detail: "Large pharmaceutical company" },
        { symbol: "DRREDDY.NS", name: "Dr Reddy's", detail: "Generic and specialty pharma" },
        { symbol: "CIPLA.NS", name: "Cipla", detail: "Healthcare and respiratory focus" },
        { symbol: "DIVISLAB.NS", name: "Divi's Labs", detail: "API and pharma ingredients" },
        { symbol: "APOLLOHOSP.NS", name: "Apollo Hospitals", detail: "Healthcare services leader" },
        { symbol: "LUPIN.NS", name: "Lupin", detail: "Global pharmaceutical company" },
        { symbol: "AUROPHARMA.NS", name: "Aurobindo Pharma", detail: "Pharma manufacturing" },
        { symbol: "ZYDUSLIFE.NS", name: "Zydus Life", detail: "Healthcare and pharma products" },
      ],
      bitcoin: [
        { symbol: "BTC-USD", name: "Bitcoin", detail: "Largest crypto asset" },
        { symbol: "ETH-USD", name: "Ethereum", detail: "Smart contract network" },
        { symbol: "USDT-USD", name: "Tether", detail: "USD stablecoin liquidity" },
        { symbol: "BNB-USD", name: "BNB", detail: "Exchange ecosystem token" },
        { symbol: "SOL-USD", name: "Solana", detail: "High-throughput blockchain" },
        { symbol: "XRP-USD", name: "XRP", detail: "Payments-focused token" },
        { symbol: "USDC-USD", name: "USDC", detail: "Regulated stablecoin" },
        { symbol: "DOGE-USD", name: "Dogecoin", detail: "High retail attention" },
        { symbol: "ADA-USD", name: "Cardano", detail: "Proof-of-stake blockchain" },
        { symbol: "AVAX-USD", name: "Avalanche", detail: "Layer-1 blockchain" },
      ],
    };

    const symbols = categories[category];
    if (!symbols) {
      return sendJson(res, 400, { success: false, error: "Unknown market category" }, origin);
    }

    const ticker = await Promise.all(symbols.map(async (item) => {
      try {
        const response = await fetch(
          `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(item.symbol)}?range=1d&interval=1m`,
          {
            headers: {
              "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) throw new Error("Quote unavailable");

        const data = await response.json();
        const meta = data.chart?.result?.[0]?.meta || {};
        const price = meta.regularMarketPrice ?? null;
        const previousClose = meta.previousClose ?? meta.chartPreviousClose ?? null;
        const change =
          typeof price === "number" && typeof previousClose === "number"
            ? price - previousClose
            : null;
        const changePercent =
          typeof change === "number" && previousClose
            ? (change / previousClose) * 100
            : null;

        return { ...item, price, change, changePercent };
      } catch {
        return { ...item, price: null, change: null, changePercent: null };
      }
    }));

    return sendJson(
      res,
      200,
      { success: true, category, ticker, updatedAt: new Date().toISOString() },
      origin,
    );
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
