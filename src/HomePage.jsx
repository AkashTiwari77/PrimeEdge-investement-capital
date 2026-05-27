import finalyearimage from "./assets/finalyearimage.jpg";
import Calllogo from "./assets/Calllogo.png";
import Response from "./assets/Response.png";
import Wealth from "./assets/wealth.png";
import investement from "./assets/investement.jpg";
import Retirement from "./assets/retirement.jpg";
import Login from "./assets/login.png";
import Market from "./assets/marketinsight.jpg";
import analysis from "./assets/analysis.jpg";
import portfolio from "./assets/portfolio-management.jpg";
import risk from "./assets/risk.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiPhone, FiMail, FiCopy } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Navbar from "./components/Navbar.jsx";

const marketCategories = [
  {
    id: "delivery",
    icon: "🚚",
    label: "Delivery",
    title: "Top Delivery Picks",
    subtitle: "Companies commonly preferred for delivery-based equity holdings.",
    companies: [
      { name: "Reliance Industries", share: "12.8%", detail: "Energy, retail, telecom" },
      { name: "HDFC Bank", share: "10.6%", detail: "Private banking leader" },
      { name: "TCS", share: "9.4%", detail: "Large-cap IT services" },
      { name: "ICICI Bank", share: "8.7%", detail: "Retail and corporate banking" },
      { name: "Infosys", share: "7.9%", detail: "IT consulting and digital" },
      { name: "Bharti Airtel", share: "6.8%", detail: "Telecom and digital services" },
      { name: "Larsen & Toubro", share: "6.1%", detail: "Infrastructure and engineering" },
      { name: "ITC", share: "5.7%", detail: "FMCG, hotels, paperboards" },
      { name: "SBI", share: "5.2%", detail: "Public sector banking" },
      { name: "Hindustan Unilever", share: "4.8%", detail: "Consumer staples" },
    ],
  },
  {
    id: "intraday",
    icon: "📊",
    label: "Intraday",
    title: "Top Intraday Movers",
    subtitle: "Liquid names with strong day-trading participation.",
    companies: [
      { name: "Nifty Bank", share: "14.5%", detail: "High liquidity index basket" },
      { name: "Reliance Industries", share: "11.2%", detail: "Active large-cap volumes" },
      { name: "HDFC Bank", share: "10.8%", detail: "Banking momentum trades" },
      { name: "ICICI Bank", share: "9.6%", detail: "Frequent intraday swings" },
      { name: "SBI", share: "8.3%", detail: "High retail participation" },
      { name: "Tata Motors", share: "7.7%", detail: "Auto sector volatility" },
      { name: "Infosys", share: "6.9%", detail: "IT sector liquidity" },
      { name: "Axis Bank", share: "6.4%", detail: "Banking breakout setups" },
      { name: "Adani Enterprises", share: "5.8%", detail: "Momentum-focused stock" },
      { name: "Bajaj Finance", share: "5.1%", detail: "Finance sector moves" },
    ],
  },
  {
    id: "fo",
    icon: "📉",
    label: "F&O",
    title: "Top F&O Contracts",
    subtitle: "Frequently watched futures and options counters.",
    companies: [
      { name: "Nifty 50", share: "16.9%", detail: "Index futures and options" },
      { name: "Bank Nifty", share: "15.4%", detail: "Banking index derivatives" },
      { name: "Reliance Industries", share: "9.8%", detail: "Stock futures liquidity" },
      { name: "HDFC Bank", share: "8.9%", detail: "Options-heavy counter" },
      { name: "ICICI Bank", share: "8.1%", detail: "Active option chain" },
      { name: "Tata Steel", share: "6.7%", detail: "Commodity-linked moves" },
      { name: "Tata Motors", share: "6.3%", detail: "Auto derivatives interest" },
      { name: "Infosys", share: "5.8%", detail: "IT sector hedging" },
      { name: "Axis Bank", share: "5.5%", detail: "Banking F&O activity" },
      { name: "Bajaj Finance", share: "4.9%", detail: "Premium finance stock" },
    ],
  },
  {
    id: "mutual-fund",
    icon: "💹",
    label: "Mutual Fund",
    title: "Top Mutual Fund AMCs",
    subtitle: "Large Indian asset managers by broad market presence.",
    companies: [
      { name: "SBI Mutual Fund", share: "18.2%", detail: "Large diversified AMC" },
      { name: "ICICI Prudential MF", share: "13.8%", detail: "Equity and hybrid schemes" },
      { name: "HDFC Mutual Fund", share: "12.9%", detail: "Established fund house" },
      { name: "Nippon India MF", share: "8.6%", detail: "Retail-focused schemes" },
      { name: "Kotak Mutual Fund", share: "7.9%", detail: "Multi-asset offerings" },
      { name: "Axis Mutual Fund", share: "6.8%", detail: "Equity and debt funds" },
      { name: "Aditya Birla Sun Life MF", share: "6.3%", detail: "Debt and equity products" },
      { name: "UTI Mutual Fund", share: "5.4%", detail: "Legacy AMC presence" },
      { name: "Mirae Asset MF", share: "4.9%", detail: "Growth-oriented equity funds" },
      { name: "DSP Mutual Fund", share: "4.2%", detail: "Active fund management" },
    ],
  },
  {
    id: "banking",
    icon: "🏦",
    label: "Banking",
    title: "Top Banking Stocks",
    subtitle: "Major banking names watched for financial-sector momentum.",
    companies: [
      { name: "HDFC Bank", share: "14.2%", detail: "Private banking leader" },
      { name: "ICICI Bank", share: "13.5%", detail: "Retail and corporate banking" },
      { name: "SBI", share: "12.8%", detail: "Public sector banking" },
      { name: "Axis Bank", share: "10.6%", detail: "Large private bank" },
      { name: "Kotak Bank", share: "9.4%", detail: "Private banking and wealth" },
    ],
  },
  {
    id: "it-sector",
    icon: "💻",
    label: "IT Sector",
    title: "Top IT Stocks",
    subtitle: "Technology and software service companies with active market interest.",
    companies: [
      { name: "TCS", share: "15.5%", detail: "Large-cap IT services" },
      { name: "Infosys", share: "13.8%", detail: "IT consulting and digital" },
      { name: "HCL Tech", share: "10.7%", detail: "Enterprise technology services" },
      { name: "Wipro", share: "8.9%", detail: "IT services and consulting" },
      { name: "Tech Mahindra", share: "7.4%", detail: "Technology and telecom services" },
    ],
  },
  {
    id: "auto",
    icon: "🚗",
    label: "Auto",
    title: "Top Auto Stocks",
    subtitle: "Automobile and mobility companies tracked by market participants.",
    companies: [
      { name: "Maruti", share: "13.1%", detail: "Passenger vehicle leader" },
      { name: "Tata Motors", share: "11.9%", detail: "Auto and EV momentum" },
      { name: "Mahindra & Mahindra", share: "10.8%", detail: "SUVs, tractors, and mobility" },
      { name: "Bajaj Auto", share: "9.6%", detail: "Two-wheeler and export strength" },
      { name: "Eicher Motors", share: "8.2%", detail: "Premium motorcycle segment" },
    ],
  },
  {
    id: "pharma",
    icon: "💊",
    label: "Pharma",
    title: "Top Pharma Stocks",
    subtitle: "Healthcare and pharmaceutical companies with live market movement.",
    companies: [
      { name: "Sun Pharma", share: "12.6%", detail: "Large pharmaceutical company" },
      { name: "Dr Reddy's", share: "10.4%", detail: "Generic and specialty pharma" },
      { name: "Cipla", share: "9.7%", detail: "Healthcare and respiratory focus" },
      { name: "Divi's Labs", share: "8.6%", detail: "API and pharma ingredients" },
      { name: "Apollo Hospitals", share: "7.8%", detail: "Healthcare services leader" },
    ],
  },
  {
    id: "bitcoin",
    icon: "₿",
    label: "Bit Coins",
    title: "Top Crypto Market Leaders",
    subtitle: "Major digital assets commonly tracked in crypto portfolios.",
    companies: [
      { name: "Bitcoin", share: "52.4%", detail: "Largest crypto asset" },
      { name: "Ethereum", share: "17.8%", detail: "Smart contract network" },
      { name: "Tether", share: "5.6%", detail: "USD stablecoin liquidity" },
      { name: "BNB", share: "3.9%", detail: "Exchange ecosystem token" },
      { name: "Solana", share: "3.5%", detail: "High-throughput blockchain" },
      { name: "XRP", share: "2.8%", detail: "Payments-focused token" },
      { name: "USDC", share: "2.3%", detail: "Regulated stablecoin" },
      { name: "Dogecoin", share: "1.9%", detail: "High retail attention" },
      { name: "Cardano", share: "1.6%", detail: "Proof-of-stake blockchain" },
      { name: "Avalanche", share: "1.2%", detail: "Layer-1 blockchain" },
    ],
  },
];

function HomePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    requirement: "",
  });

  const [status, setStatus] = useState(""); // "", "sending", "success", "warning", "error"
  const [errorMessage, setErrorMessage] = useState("");
  const [warningMessage, setWarningMessage] = useState("");
  const [showPopup, setShowPopup] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");

  // Leave empty in development so Vite can proxy /api requests to the backend.
  const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").replace(
    /\/$/,
    "",
  );
  const apiUrl = (path) => `${API_BASE_URL}${path}`;

  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [loginStep, setLoginStep] = useState("email");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [activeCategory, setActiveCategory] = useState("delivery");
  const [marketTickerItems, setMarketTickerItems] = useState([]);
  const [marketTickerLoading, setMarketTickerLoading] = useState(true);
  const [marketTickerError, setMarketTickerError] = useState("");
  const [liveCategoryItems, setLiveCategoryItems] = useState([]);
  const [liveCategoryLoading, setLiveCategoryLoading] = useState(true);
  const [liveCategoryError, setLiveCategoryError] = useState("");
  const selectedCategory =
    marketCategories.find((category) => category.id === activeCategory) ||
    marketCategories[0];
  const selectedCategoryCompanies =
    liveCategoryItems.length > 0 ? liveCategoryItems : selectedCategory.companies;

  const now = new Date();
  const indiaTime = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
  );
  const hours = indiaTime.getHours();
  const minutes = indiaTime.getMinutes();
  const currentTime = hours * 60 + minutes;
  const marketOpen = currentTime >= 540 && currentTime <= 930;
  const fallbackTickerText =
    "NIFTY 50 - Live data loading...   SENSEX - Live data loading...   BANKNIFTY - Live data loading...";
  const marketTickerText =
    marketTickerItems.length > 0
      ? marketTickerItems
          .map((item) => {
            const percent =
              typeof item.changePercent === "number"
                ? item.changePercent.toFixed(2)
                : null;
            const price =
              typeof item.price === "number" ? item.price.toFixed(2) : null;
            const direction = item.changePercent >= 0 ? "▲" : "▼";
            const percentText = percent ? `${direction} ${percent}%` : "--";
            const priceText = price ? `₹${price}` : "";
            return `${item.name} ${priceText} ${percentText}`.trim();
          })
          .join("     ")
      : fallbackTickerText;
  const loadingTickerItems = [
    "NIFTY 50",
    "SENSEX",
    "BANKNIFTY",
    "RELIANCE",
    "TCS",
    "INFOSYS",
    "HDFC BANK",
    "ICICI BANK",
    "SBI",
    "TATA MOTORS",
    "WIPRO",
    "AXIS BANK",
  ].map((name) => ({ name, loading: true }));
  const visibleTickerItems =
    marketTickerItems.length > 0 ? marketTickerItems : loadingTickerItems;
  const marketTickerUnavailableItems = [
    "NIFTY 50",
    "SENSEX",
    "BANKNIFTY",
    "RELIANCE",
    "TCS",
    "INFOSYS",
    "HDFC BANK",
    "ICICI BANK",
    "SBI",
    "TATA MOTORS",
    "WIPRO",
    "AXIS BANK",
  ];

  useEffect(() => {
    let isMounted = true;

    const fetchMarketTicker = async () => {
      try {
        const response = await fetch(apiUrl("/api/market-ticker"));
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Unable to load market data.");
        }

        if (isMounted) {
          setMarketTickerItems(data.ticker || []);
          setMarketTickerError("");
        }
      } catch (error) {
        console.error("Market ticker error:", error);
        if (isMounted) {
          setMarketTickerError("Live market data unavailable");
        }
      } finally {
        if (isMounted) {
          setMarketTickerLoading(false);
        }
      }
    };

    fetchMarketTicker();
    const intervalId = window.setInterval(fetchMarketTicker, 60000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchLiveCategory = async () => {
      try {
        const response = await fetch(
          apiUrl(`/api/market-category?category=${activeCategory}`),
        );
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.error || "Unable to load category data.");
        }

        if (isMounted) {
          setLiveCategoryItems(data.ticker || []);
          setLiveCategoryError("");
        }
      } catch (error) {
        console.error("Live category error:", error);
        if (isMounted) {
          setLiveCategoryError("Live data unavailable");
        }
      } finally {
        if (isMounted) {
          setLiveCategoryLoading(false);
        }
      }
    };

    setLiveCategoryItems([]);
    setLiveCategoryLoading(true);
    setLiveCategoryError("");
    fetchLiveCategory();
    const intervalId = window.setInterval(fetchLiveCategory, 1000);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
    };
  }, [activeCategory]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetLogin = () => {
    setLoginEmail("");
    setLoginPassword("");
    setShowLoginPassword(false);
    setLoginStep("email");
    setLoginError("");
    setLoginLoading(false);
  };

  const handleLogout = () => {
    setLoggedInUser("");
    resetLogin();
    setShowPopup(null);
  };

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
    if (loginError) setLoginError("");
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
    if (loginError) setLoginError("");
  };

  const handleLoginEmailSubmit = (e) => {
    e.preventDefault();
    const normalizedEmail = loginEmail.trim().toLowerCase();

    if (!normalizedEmail) {
      setLoginError("Please enter your email address.");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(normalizedEmail)) {
      setLoginError("Please enter a valid email address.");
      return;
    }
    setLoginEmail(normalizedEmail);
    setLoginStep("password");
    setLoginError("");
  };

  // ✅ FIX: Use consistent API_BASE_URL here too (was missing before)
  const handleLoginPasswordSubmit = async (e) => {
    e.preventDefault();
    const normalizedEmail = loginEmail.trim().toLowerCase();
    const password = loginPassword.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(normalizedEmail)) {
      setLoginError("Please enter a valid email address.");
      setLoginStep("email");
      return;
    }

    if (!password) {
      setLoginError("Please enter your password.");
      return;
    }

    setLoginLoading(true);
    setLoginError("");

    try {
      const response = await fetch(apiUrl("/api/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        setLoginError(
          result.error || "Email or password is incorrect. Please try again.",
        );
        return;
      }

      setLoggedInUser(result.user?.name || result.user?.email || normalizedEmail);
      setLoginStep("success");
    } catch (error) {
      console.error("Login error:", error);
      setLoginError(
        "Unable to reach authentication server. Please try again later.",
      );
    } finally {
      setLoginLoading(false);
    }
  };

  // ✅ FIX: Safe JSON parser with better error messages
  const parseJsonResponse = async (response) => {
    const text = await response.text();
    if (!text) return {};
    try {
      return JSON.parse(text);
    } catch {
      return {
        success: false,
        error: `Server returned unexpected response: ${text.substring(0, 100)}`,
      };
    }
  };

  // ✅ Health check to verify backend is running
  // ✅ Health check to verify backend is running

  // ✅ FIX: Form submission with Nodemailer backend
  //          Sends form data to backend API which handles email via Nodemailer
  //          Added timeout so the request doesn't hang forever.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset messages
    setStatus("");
    setErrorMessage("");
    setWarningMessage("");

    // Client-side validation
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim()
    ) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and phone number.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const phonePattern = /^[0-9+\-\s]{7,15}$/;
    if (!phonePattern.test(formData.phone.trim())) {
      setStatus("error");
      setErrorMessage("Please enter a valid phone number.");
      return;
    }

    setStatus("sending");

    // ✅ AbortController for 15-second timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const dbResponse = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          requirement:
            formData.requirement.trim() || "No requirement specified.",
        }),
      });

      clearTimeout(timeoutId);

      const dbResult = await parseJsonResponse(dbResponse);

      if (!dbResponse.ok) {
        throw new Error(
          dbResult.error || `Server error (${dbResponse.status})`,
        );
      }

      if (dbResult.emailNotification?.sent === false) {
        setStatus("warning");
        setWarningMessage(
          dbResult.emailNotification.error ||
            dbResult.emailNotification.warning ||
            "Your request was saved, but the email notification was not sent.",
        );
      } else {
        setStatus("success");
      }
      console.log("Contact form submitted successfully.");

      // Clear form on success
      setFormData({ name: "", email: "", phone: "", requirement: "" });
      setTimeout(() => setStatus(""), 6000);
    } catch (error) {
      clearTimeout(timeoutId);
      console.error("❌ Contact form error:", error);
      setStatus("error");

      if (error.name === "AbortError") {
        setErrorMessage(
          "Request timed out. Please check your internet connection and try again.",
        );
      } else if (
        error.message.includes("Failed to fetch") ||
        error.message.includes("NetworkError") ||
        error.message.includes("502") ||
        error.message.includes("503")
      ) {
        setErrorMessage(
          "Cannot connect to the backend server. Start the app with npm run dev and try again.",
        );
      } else {
        setErrorMessage(
          error.message || "Something went wrong. Please try again.",
        );
      }

      setTimeout(() => {
        setStatus("");
        setErrorMessage("");
      }, 8000);
    }
  };

  return (
    <>
      {/* CALL SUPPORT POPUP */}
      {showPopup === "support" && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowPopup(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-[350px] text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              📞 Call Support
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Available 24/7 — tap a number to call
            </p>
            <a href="tel:8087921773" className="block mb-4">
              <div className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-lg">
                📱 8087921773
              </div>
            </a>
            <a href="tel:9270746115" className="block">
              <div className="bg-green-500 hover:bg-green-600 text-white text-xl font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-lg">
                📱 9270746115
              </div>
            </a>
          </div>
        </div>
      )}

      {/* CALL PARTNERS POPUP */}
      {showPopup === "partner" && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setShowPopup(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-[350px] text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPopup(null)}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🤝 Call Partners
            </h2>
            <p className="text-gray-500 mb-6 text-sm">
              Your Wealth Partners — tap a number to call
            </p>
            <a href="tel:9607176340" className="block mb-4">
              <div className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-lg">
                📱 9607176340
              </div>
            </a>
            <a href="tel:777875954" className="block">
              <div className="bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold py-3 rounded-xl transition-all duration-300 hover:shadow-lg">
                📱 777875954
              </div>
            </a>
          </div>
        </div>
      )}

      {/* LOGIN POPUP */}
      {showPopup === "login" && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => {
            setShowPopup(null);
            resetLogin();
          }}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 w-[360px] max-w-[90vw] text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setShowPopup(null);
                resetLogin();
              }}
              className="absolute top-3 right-4 text-gray-500 hover:text-black text-2xl font-bold"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sign in to PrimeEdge
            </h2>

            {loggedInUser ? (
              <div className="mt-4">
                <p className="text-green-700 font-semibold text-lg">
                  ✅ Logged in
                </p>
                <p className="mt-3 text-gray-600">
                  Welcome back, {loggedInUser}
                </p>
                <button
                  onClick={() => {
                    setShowPopup(null);
                    resetLogin();
                  }}
                  className="mt-6 w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-900 transition"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleLogout();
                    setShowPopup(null);
                  }}
                  className="mt-3 w-full rounded-xl border border-black text-black py-3 font-semibold hover:bg-black hover:text-white transition"
                >
                  Log out
                </button>
              </div>
            ) : loginStep === "email" ? (
              <form onSubmit={handleLoginEmailSubmit}>
                <div className="flex gap-3 justify-center mb-4">
                  <button
                    type="button"
                    onClick={() =>
                      window.open(
                        "https://mail.google.com/mail/u/0/",
                        "_blank",
                      )
                    }
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Mail
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open("https://accounts.google.com/login", "_blank")
                    }
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      window.open("https://login.microsoftonline.com", "_blank")
                    }
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Microsoft
                  </button>
                </div>
                <div className="border-t border-gray-200 py-4 text-sm text-gray-500">
                  or
                </div>
                <div className="mt-4 text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={handleLoginEmailChange}
                    placeholder="Enter your email address"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {loginError && (
                  <p className="mt-3 text-sm text-red-600">{loginError}</p>
                )}
                <button
                  type="submit"
                  className="mt-6 w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-900 transition"
                >
                  Continue
                </button>
              </form>
            ) : (
              <form onSubmit={handleLoginPasswordSubmit}>
                <div className="text-left mb-4">
                  <p className="text-sm text-gray-500">Signing in as</p>
                  <p className="font-semibold text-gray-900">{loginEmail}</p>
                </div>
                <div className="mt-4 text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? "text" : "password"}
                      value={loginPassword}
                      onChange={handleLoginPasswordChange}
                      placeholder="Enter your password"
                      className="w-full border border-gray-300 rounded-xl px-4 py-3 pr-20 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowLoginPassword((current) => !current)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-600 hover:text-black"
                    >
                      {showLoginPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                {loginError && (
                  <p className="mt-3 text-sm text-red-600">{loginError}</p>
                )}
                <button
                  type="submit"
                  disabled={loginLoading}
                  className="mt-6 w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loginLoading ? "Signing in..." : "Sign in"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLoginStep("email");
                    setLoginPassword("");
                    setShowLoginPassword(false);
                    setLoginError("");
                  }}
                  className="mt-3 w-full rounded-xl border border-gray-300 text-gray-700 py-3 font-semibold hover:bg-gray-50 transition"
                >
                  Use a different email
                </button>
              </form>
            )}
            <div className="mt-6 text-xs text-gray-400">
              Secured by Clerk · Development mode
            </div>
          </div>
        </div>
      )}

      <div className="bg-[#212533] py-3 px-4">
        <div className="grid w-full grid-cols-1 items-center gap-3 lg:grid-cols-[auto_minmax(260px,1fr)_auto]">
          {/* RIGHT: LOGIN ICON */}
          <div className="flex items-center justify-center gap-3 lg:justify-end lg:order-3">
            <img
              className="w-10 h-10 rounded-full bg-pink-500 cursor-pointer"
              src={Login}
              alt="login"
              onClick={() => {
                resetLogin();
                setShowPopup("login");
              }}
            />
            {loggedInUser ? (
              <span className="text-white text-sm font-semibold">
                {loggedInUser.split("@")[0]}
              </span>
            ) : (
              <span className="text-white text-sm font-semibold">Sign in</span>
            )}
          </div>

          {/* MIDDLE: MARQUEE */}
          <div className="w-full max-w-[9020px] pt-2 justify-self-center overflow-hidden min-w-0 lg:order-2">
            <marquee className="font-semibold tracking-wide">
              {marketTickerError
                ? marketTickerUnavailableItems.map((name) => (
                    <span key={name} className="mr-10 text-yellow-300">
                      {name} - {marketTickerError}
                    </span>
                  ))
                : visibleTickerItems.map((item) => {
                const hasLiveChange = typeof item.changePercent === "number";
                const isUp = hasLiveChange && item.changePercent >= 0;
                const price =
                  typeof item.price === "number" ? item.price.toFixed(2) : null;
                const changePercent = hasLiveChange
                  ? Math.abs(item.changePercent).toFixed(2)
                  : null;

                return (
                  <span
                    key={item.symbol || item.name}
                    className={
                      item.loading
                        ? "mr-10 text-yellow-300"
                        : !hasLiveChange
                          ? "mr-10 text-yellow-300"
                          : isUp
                          ? "mr-10 text-green-400"
                          : "mr-10 text-red-400"
                    }
                  >
                    {item.name}{" "}
                    {item.loading
                      ? "Live data loading..."
                      : hasLiveChange
                        ? `${price ? `Rs ${price}` : ""} ${
                            isUp ? "UP" : "DOWN"
                          } ${changePercent}%`
                        : "Live data unavailable"}
                  </span>
                );
              })}
            </marquee>
          </div>

          {/* LEFT: PHONE, MAIL, MARKET STATUS */}
          <div className="flex flex-wrap items-center gap-4 justify-center lg:justify-start lg:order-1">
            <div className="flex items-center gap-2">
              <FiPhone className="text-pink-500 w-5 h-5" />
              <span className="text-white text-sm">+91 9607176340</span>
            </div>

            <div className="h-6 w-[1px] bg-gray-500"></div>

            <div className="flex items-center gap-2">
              <FiMail className="text-white w-5 h-5" />
              <span className="text-white text-sm">
                primeedgecapital@gmail.com
              </span>
            </div>

            <div className="h-6 w-[1px] bg-gray-500"></div>

            <div className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${marketOpen ? "bg-green-400" : "bg-red-500"}`}
              />
              <span className="text-white text-sm">
                {marketOpen ? "Market Open" : "Market Closed"}
              </span>
            </div>

            <FiCopy className="text-white w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>

      <Navbar />

      <div className="relative isolate max-lg:bg-gradient-to-r max-lg:from-[#000c40] max-lg:to-[#607d8b]">
        <img
          src={finalyearimage}
          alt="hero"
          className="w-full max-lg:absolute max-lg:inset-0 max-lg:h-full max-lg:object-cover max-lg:opacity-70"
        />

        <div className="pointer-events-none absolute inset-0 z-10 flex items-start justify-between px-36 pt-32 max-lg:relative max-lg:inset-auto max-lg:justify-center max-lg:px-4 max-lg:pt-12">
          {/* LEFT SIDE CONTENT */}
          <div className="text-white max-w-3xl max-lg:text-center">
            <h1 className="text-5xl ml-95 mt-32 font-bold max-lg:ml-0 max-lg:mt-0 max-lg:text-4xl max-sm:text-3xl">
              INVEST SMART. GROW STRONG
            </h1>

            <h2 className="mt-4 text-3xl ml-14 font-semibold max-lg:ml-0 max-lg:text-2xl max-sm:text-xl">
              Welcome To Primeedge Capital Solution
            </h2>

            <div className="w-full flex justify-center px-4">
              <p className="mt-3 text-lg md:text-2xl leading-relaxed whitespace-nowrap text-center max-lg:whitespace-normal max-sm:text-base">
                We help you make smarter investment decisions with expert
                guidance and trusted strategies.
              </p>
            </div>

            <Link
              to="/about"
              className="pointer-events-auto relative z-20 mt-12 inline-block px-8 py-3 ml-72 bg-black text-white rounded-lg cursor-pointer hover:bg-gray-800 transition max-lg:ml-0 max-lg:mt-8"
            >
              Learn More
            </Link>
          </div>
        </div>

        <div className="">
          <div className="pointer-events-none absolute flex justify-center inset-0 mr-[1250px] mt-[580px] max-lg:hidden">
            <div className="h-[150px] w-[500px] border-black space-y-3">
              <h1 className="text-3xl text-white">
                ✔ Trusted Investment Experts
              </h1>
              <h1 className="text-3xl text-white"> ✔ Registered Advisors </h1>
              <h1 className="text-3xl text-white"> ✔ 10,000+ Happy Client</h1>
              <h1 className="text-3xl text-white">
                ✔ SEBI Registered Advisors
              </h1>
            </div>
          </div>
        </div>

        <div>
          <div className="pointer-events-none absolute flex flex-col justify-center inset-0 mt-[780px] ml-[400px] max-lg:hidden">
            <h1 className="text-4xl text-white">10K+ Clients</h1>
            <h1 className="text-2xl text-white">Active Clients</h1>
          </div>
          <div className="pointer-events-none absolute flex flex-col justify-center inset-0 mt-[780px] ml-[700px] max-lg:hidden">
            <h1 className="text-4xl text-white">100 Cr+</h1>
            <h1 className="text-white text-2xl">managed</h1>
          </div>
          <div className="pointer-events-none absolute flex flex-col justify-center text-white inset-0 mt-[780px] ml-[950px] max-lg:hidden">
            <h1 className="text-4xl text-white"> 12+ Years</h1>
            <h1 className="text-2xl">Experience</h1>
          </div>
          <div className="pointer-events-none absolute flex flex-col justify-center text-white inset-0 mt-[780px] ml-[1250px] max-lg:hidden">
            <h1 className="text-4xl text-white"> 100+ Expert</h1>
            <h1 className="text-2xl">Advisors</h1>
          </div>
        </div>

        {/* ✅ FIXED CONTACT FORM */}
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-end pr-20 max-lg:pointer-events-auto max-lg:relative max-lg:inset-auto max-lg:justify-center max-lg:px-4 max-lg:pr-4 max-lg:pt-10 max-lg:pb-10">
          <form
            onSubmit={handleSubmit}
            className="pointer-events-auto bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-lg w-[600px] mb-[150px] max-lg:mb-0 max-lg:w-full max-lg:max-w-[560px] max-lg:p-5"
            noValidate
          >
            <h1 className="text-black text-4xl mb-4">Get in Touch</h1>

            <div>
              <label className="text-xl">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full border p-2 mb-3 rounded text-black font-bold bg-white/50 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xl">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter Your Email"
                className="w-full border p-2 mb-3 rounded text-black font-bold bg-white/50 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xl">Phone:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="w-full border p-2 mb-3 rounded text-black font-bold bg-white/50 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-300"
              />
            </div>

            <div>
              <label className="text-xl">Requirement:</label>
              <textarea
                name="requirement"
                value={formData.requirement}
                onChange={handleChange}
                rows="3"
                placeholder="Drop Your Message"
                className="w-full border p-2 mb-4 rounded text-black font-bold bg-white/50 outline-none transition focus:border-blue-700 focus:bg-white focus:ring-2 focus:ring-blue-300"
              />
            </div>

            {/* ✅ Status messages */}
            {status === "success" && (
              <p className="text-green-700 font-bold text-center mb-3 bg-green-100 rounded py-2">
                ✅ Message sent successfully! We'll contact you soon.
              </p>
            )}
            {status === "warning" && (
              <p className="text-orange-700 font-bold text-center mb-3 bg-orange-100 rounded py-2">
                ⚠️ {warningMessage}
              </p>
            )}
            {status === "error" && (
              <p className="text-red-700 font-bold text-center mb-3 bg-red-100 rounded py-2">
                ❌ {errorMessage}
              </p>
            )}
            {status === "sending" && (
              <p className="text-blue-700 font-bold text-center mb-3 bg-blue-100 rounded py-2">
                ⏳ Sending your message...
              </p>
            )}

            {/* ✅ FIX: Button is always enabled. No more backend health gate blocking users. */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full p-2 border rounded text-black font-bold bg-white/60 hover:bg-white transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "sending" ? "Sending..." : "Submit Request"}
            </button>

            {/* ✅ Fallback email link if backend is down */}
            {status === "error" &&
              errorMessage.includes("connect to the server") && (
                <p className="text-center text-sm mt-3 text-gray-800">
                  Or email us directly:{" "}
                  <a
                    href={`mailto:akashtiwari7117@gmail.com?subject=Enquiry from ${formData.name}&body=Name: ${formData.name}%0AEmail: ${formData.email}%0APhone: ${formData.phone}%0ARequirement: ${formData.requirement}`}
                    className="underline font-bold text-blue-800 hover:text-blue-600"
                  >
                    akashtiwari7117@gmail.com
                  </a>
                </p>
              )}
          </form>
        </div>
      </div>

      <div>
        <div className="bg-gradient-to-r from-[#000c40] to-[#607d8b] h-[300px] max-lg:h-auto max-lg:pb-10">
          <div className="ml-[40px] pt-12 max-lg:ml-0 max-lg:px-4 max-lg:text-center">
            <h1 className="text-3xl mt-4 text-white">
              Need any Help Scheduling
            </h1>
            <h1 className="text-3xl mt-4 text-white">
              Investment Consultation?
            </h1>
            <div>
              <br />
              <br />
              <button
                onClick={() => navigate("/freeconsulantent")}
                className="text-white text-2xl rounded-xl border py-3 bg-gray-500 ml-12 flex justify-center items-center px-4 max-lg:mx-auto"
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="max-lg:bg-gradient-to-r max-lg:from-[#000c40] max-lg:to-[#607d8b] max-lg:px-4 max-lg:pb-10">
          {/* Card 1 - Available 24/7 */}
          <div className="absolute inset-0 mt-[1250px] ml-[420px] max-lg:static max-lg:mt-0 max-lg:ml-0 max-lg:mb-6">
            <div className="h-[250px] w-[460px] bg-white/20 backdrop-blur-md rounded-2xl transition-all duration-500 bg-transparent relative overflow-hidden hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-300/30 max-lg:mx-auto max-lg:h-auto max-lg:w-full max-lg:max-w-[460px] max-lg:p-5">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-emerald-300/20 opacity-0 hover:opacity-100 transition duration-500"></div>
              <img
                src={Calllogo}
                alt="call logo"
                className="w-[100px] mt-1 ml-52 transition-all duration-500 hover:scale-110 hover:rotate-3 max-lg:mx-auto"
              />
              <h1 className="text-2xl ml-40 mt-3 text-white transition-all duration-300 max-lg:ml-0 max-lg:text-center">
                Available 24/7
              </h1>
              <p className="text-white ml-8 font-bold transition-all duration-300 max-lg:ml-0 max-lg:text-center">
                we're here round-the-clock reach out anytime, any day.
              </p>
              <br />
              <button
                onClick={() => setShowPopup("support")}
                className="text-white ml-44 mb-3 mt-4 border bg-gray-800 rounded py-1 px-2 font-bold transition-all duration-300 relative overflow-hidden hover:bg-gray-400 hover:text-black hover:shadow-[8px_8px_15px_rgba(0,0,0,0.7)] max-lg:mx-auto max-lg:block"
              >
                <span className="relative z-10">Tap here to call</span>
              </button>
            </div>
          </div>

          {/* Card 2 - Immediate Response with WhatsApp */}
          <div>
            <div className="absolute inset-0 mt-[1250px] ml-[910px] max-lg:static max-lg:mt-0 max-lg:ml-0 max-lg:mb-6">
              <div className="h-[250px] w-[470px] bg-white/20 backdrop-blur-md rounded-2xl transition-all duration-500 bg-transparent relative overflow-hidden hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-300/30 max-lg:mx-auto max-lg:h-auto max-lg:w-full max-lg:max-w-[470px] max-lg:p-5">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 hover:opacity-100 transition duration-500"></div>
                <img
                  src={Response}
                  alt="response"
                  className="w-[100px] pt-4 ml-48 transition-all duration-500 hover:scale-110 hover:rotate-3 max-lg:mx-auto"
                />
                <h1 className="text-2xl ml-32 mt-3 text-white transition-all duration-300 max-lg:ml-0 max-lg:text-center">
                  Immediate Response
                </h1>
                <p className="text-white ml-2 font-bold transition-all duration-300 max-lg:ml-0 max-lg:text-center">
                  Count on us for fast replies, No Delay! - Just prompt Support
                </p>
                <a
                  href="https://wa.me/919607176340"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="text-white ml-44 mb-3 mt-6 border bg-gray-800 rounded py-1 px-2 font-bold transition-all duration-300 relative overflow-hidden hover:bg-gray-400 hover:text-black hover:shadow-[8px_8px_15px_rgba(0,0,0,0.7)] max-lg:mx-auto max-lg:block">
                    <span className="relative z-10">💬 Tap here to chat</span>
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3 - Your Wealth Partners */}
          <div>
            <div className="absolute inset-0 mt-[1250px] ml-[1400px] max-lg:static max-lg:mt-0 max-lg:ml-0">
              <div className="h-[250px] w-[470px] bg-white/20 backdrop-blur-md rounded-2xl transition-all duration-500 bg-transparent hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-300/30 relative overflow-hidden max-lg:mx-auto max-lg:h-auto max-lg:w-full max-lg:max-w-[470px] max-lg:p-5">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/20 to-yellow-300/20 opacity-0 hover:opacity-100 transition duration-500"></div>
                <img
                  src={Wealth}
                  alt="wealth"
                  className="w-[100px] ml-48 transition-all duration-500 hover:scale-110 hover:rotate-3 max-lg:mx-auto"
                />
                <h1 className="text-2xl ml-28 text-white font-bold transition-all duration-300 max-lg:ml-0 max-lg:text-center">
                  Your Wealth Partners
                </h1>
                <p className="text-white text-xl ml-16 mt-2 font-semibold transition-all duration-300 max-lg:ml-0 max-lg:text-center">
                  Helping you invest smarter every day.
                </p>
                <button
                  onClick={() => setShowPopup("partner")}
                  className="text-white ml-44 mb-3 mt-11 border bg-gray-800 rounded py-1 px-2 font-bold transition-all duration-300 relative overflow-hidden hover:bg-gray-400 hover:text-black hover:shadow-[8px_8px_15px_rgba(0,0,0,0.7)] max-lg:mx-auto max-lg:block"
                >
                  <span className="relative z-10">call partners</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-black bg-gradient-to-r from-[#000c40] to-[#607d8b]">
        <h1 className="flex text-white justify-center text-3xl pt-20 max-lg:px-4 max-lg:text-center">
          Advisory Services
        </h1>
        <p className="flex text-2xl justify-center pt-8 text-white max-lg:px-4 max-lg:text-center">
          PrimeEdge Capital Advisory Services Your Partner in Wealth Growth
        </p>
        <br />
        <p className="text-center max-w-7xl text-white mx-auto text-2xl max-lg:px-4 max-lg:text-lg">
          We provide result-driven financial advisory backed by market insights
          and proven strategies. Our focus is to optimize returns, manage risks,
          and help clients unlock new financial opportunities while building a
          strong and trusted financial future.
        </p>
        <button
          onClick={() => navigate("/freeconsulantent")}
          className="text-white ml-[880px] bg-black font-bold mt-12 px-4 py-2 border flex justify-center max-lg:mx-auto"
        >
          More About Us
        </button>

        <div className="pt-16 flex justify-center flex-wrap gap-[50px]">
          {/* Card 1 */}
          <div className="bg-[#1e293b] backdrop-blur-md hover:shadow-2xl hover:scale-105 transition duration-300 rounded-xl h-[500px] w-[500px] max-lg:h-auto max-lg:w-[calc(100%-2rem)] max-lg:max-w-[500px]">
            <img
              src={investement}
              alt="investement"
              className="w-full h-[310px] rounded-t-xl max-lg:h-56 max-lg:object-cover"
            />
            <h1 className="text-center text-white text-2xl mt-2">
              Smart Investment Planning
            </h1>
            <p className="text-center text-white text-xl mt-8 px-4">
              Plan your investments with expert strategies designed to maximize
              returns while minimizing risks.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1e293b] backdrop-blur-md hover:shadow-lg hover:scale-105 transition duration-300 rounded-xl h-[500px] w-[500px] max-lg:h-auto max-lg:w-[calc(100%-2rem)] max-lg:max-w-[500px]">
            <img
              src={analysis}
              alt="analysis"
              className="w-full h-[310px] rounded-t-xl max-lg:h-56 max-lg:object-cover"
            />
            <h1 className="text-center text-white text-2xl mt-2">
              Advanced Market Analysis
            </h1>
            <p className="text-center text-xl text-white mt-8 px-4">
              Get accurate market insights backed by research and real-time
              data.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1e293b] backdrop-blur-md hover:shadow-2xl hover:scale-105 transition duration-300 rounded-xl h-[500px] w-[500px] max-lg:h-auto max-lg:w-[calc(100%-2rem)] max-lg:max-w-[500px]">
            <img
              src={risk}
              alt="risk"
              className="w-full h-[310px] rounded-t-xl max-lg:h-56 max-lg:object-cover"
            />
            <h1 className="text-center text-white text-2xl mt-2">
              Risk Management & Wealth Protection
            </h1>
            <p className="text-center text-white text-xl mt-8 px-4">
              Protect your investments with smart risk management strategies.
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#1e293b] backdrop-blur-md hover:shadow-2xl hover:scale-105 transition duration-300 rounded-xl h-[500px] w-[500px] max-lg:h-auto max-lg:w-[calc(100%-2rem)] max-lg:max-w-[500px]">
            <img
              src={portfolio}
              alt="Portfolio Management"
              className="w-full h-[310px] rounded-t-xl max-lg:h-56 max-lg:object-cover"
            />

            <h1 className="text-center text-white text-2xl mt-2">
              Portfolio Management
            </h1>

            <p className="text-center text-white text-xl mt-8 px-4">
              Optimize and manage your investment portfolio with smart
              strategies designed for long-term financial growth and stability.
            </p>
          </div>

          {/* Card 5 */}
          <div className="bg-[#1e293b] backdrop-blur-md hover:shadow-2xl hover:scale-105 transition duration-300 rounded-xl h-[500px] w-[500px] max-lg:h-auto max-lg:w-[calc(100%-2rem)] max-lg:max-w-[500px]">
            <img
              src={Retirement}
              alt="Retirement planning"
              className="w-full h-[310px] rounded-t-xl max-lg:h-56 max-lg:object-cover"
            />

            <h1 className="text-center text-white text-2xl mt-2">
              Retirement Planning
            </h1>

            <p className="text-center text-white text-xl mt-8 px-4">
              Secure your future with personalized retirement strategies
              designed to provide financial stability and long-term peace of
              mind.
            </p>
          </div>

          {/* Card 6 */}
          <div className="bg-[#1e293b] backdrop-blur-md hover:shadow-2xl hover:scale-105 transition duration-300 rounded-xl h-[500px] w-[500px] max-lg:h-auto max-lg:w-[calc(100%-2rem)] max-lg:max-w-[500px]">
            <img
              src={Market}
              alt="Market Insights"
              className="w-full h-[310px] rounded-t-xl max-lg:h-56 max-lg:object-cover"
            />

            <h1 className="text-center text-white text-2xl mt-2">
              Market Insights
            </h1>

            <p className="text-center text-white text-xl mt-8 px-4">
              Stay updated with real-time stock market trends, expert analysis,
              and data-driven insights to make smarter investment decisions and
              maximize financial growth.
            </p>
          </div>
        </div>

        <div className="min-h-screen bg-gradient-to-r from-[#02114d] via-[#13295f] to-[#56778b] text-white px-16 py-10 max-lg:px-4">
          {/* Top Heading Section */}
          <div>
            <button className="border border-blue-500 bg-[#10225a] px-6 py-2 rounded-2xl text-sm tracking-wide shadow-lg">
              OUR INVESTMENT PORTFOLIO
            </button>

            <h1 className="text-7xl font-bold mt-6 leading-tight max-lg:text-4xl">
              Where We Invest Your Money
            </h1>

            <p className="text-gray-300 text-2xl mt-6 max-w-5xl leading-10 max-lg:text-lg max-lg:leading-8">
              We invest across top-performing companies, mutual funds, trading
              markets, and digital assets to maximize growth and long-term
              returns.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="flex gap-10 mt-14 flex-wrap max-lg:flex-col">
            {/* Card 1 */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#263d91] flex items-center justify-center text-4xl">
                🏛️
              </div>

              <div>
                <h2 className="text-3xl font-semibold">Top Companies</h2>

                <p className="text-gray-300 text-lg mt-1">
                  Market leaders with
                  <br />
                  strong fundamentals
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-20 w-[1px] bg-gray-500 mt-2 max-lg:hidden"></div>

            {/* Card 2 */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#214d59] flex items-center justify-center text-4xl">
                📈
              </div>

              <div>
                <h2 className="text-3xl font-semibold">High Growth Markets</h2>

                <p className="text-gray-300 text-lg mt-1">
                  Opportunities in fast
                  <br />
                  growing sectors
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-20 w-[1px] bg-gray-500 mt-2 max-lg:hidden"></div>

            {/* Card 3 */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#33498f] flex items-center justify-center text-4xl">
                🛡️
              </div>

              <div>
                <h2 className="text-3xl font-semibold">
                  Diversified Portfolio
                </h2>

                <p className="text-gray-300 text-lg mt-1">
                  Balanced allocation for
                  <br />
                  risk management
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-20 w-[1px] bg-gray-500 mt-2 max-lg:hidden"></div>

            {/* Card 4 */}
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-[#514488] flex items-center justify-center text-4xl">
                📊
              </div>

              <div>
                <h2 className="text-3xl font-semibold">Long Term Growth</h2>

                <p className="text-gray-300 text-lg mt-1">
                  Focused on consistent
                  <br />
                  and sustainable returns
                </p>
              </div>
            </div>
          </div>

          {/* Main Container */}
          <div className="border border-gray-500 rounded-3xl mt-16 p-10 flex gap-16 max-lg:flex-col max-lg:p-4">
            {/* Left Buttons */}
            <div className="flex flex-col gap-5 max-lg:grid max-lg:grid-cols-2 max-sm:grid-cols-1">
              {marketCategories.map((category) => {
                const isActive = activeCategory === category.id;

                return (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setActiveCategory(category.id)}
                    className={`group w-[340px] min-h-[95px] rounded-2xl border flex items-center gap-6 px-8 text-3xl shadow-xl transition-all duration-300 max-lg:w-full max-lg:text-2xl ${
                      isActive
                        ? "bg-[#f4b942] text-[#101827] border-[#ffe6a7] scale-[1.03] shadow-[#f4b942]/30"
                        : "bg-[#1b2d57] text-white border-black hover:bg-[#254174] hover:-translate-y-1 hover:shadow-2xl"
                    }`}
                  >
                    <span
                      className={`text-5xl transition-transform duration-300 group-hover:scale-110 ${
                        isActive ? "scale-110" : ""
                      }`}
                    >
                      {category.icon}
                    </span>
                    <span className="text-left font-semibold leading-tight">
                      {category.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Big Box */}
            <div className="flex-1 border border-gray-500 rounded-xl bg-gradient-to-br from-[#142447] via-[#1d3768] to-[#607d8b] min-h-[700px] p-8 shadow-2xl transition-all duration-500 max-lg:min-h-[280px] max-lg:p-4">
              <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-6 max-md:flex-col">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-[#f4b942]">
                    Market Snapshot
                  </p>
                  <h2 className="mt-2 text-4xl font-bold text-white max-md:text-3xl">
                    {selectedCategory.title}
                  </h2>
                  <p className="mt-3 max-w-2xl text-lg text-gray-200 max-md:text-base">
                    {selectedCategory.subtitle}
                  </p>
                </div>
                <div className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-right backdrop-blur max-md:w-full max-md:text-left">
                  <p className="text-sm text-gray-200">Active Category</p>
                  <p className="text-2xl font-semibold text-white">
                    {selectedCategory.label}
                  </p>
                  <p className="mt-1 text-xs text-gray-200">
                    {liveCategoryLoading
                      ? "Updating live..."
                      : liveCategoryError || "Live every second"}
                  </p>
                </div>
              </div>

              <div className="mt-7 grid gap-3">
                {selectedCategoryCompanies.map((company, index) => {
                  const hasLiveChange = typeof company.changePercent === "number";
                  const isUp = hasLiveChange && company.changePercent >= 0;
                  const price =
                    typeof company.price === "number"
                      ? company.price.toFixed(activeCategory === "bitcoin" ? 2 : 2)
                      : null;
                  const changePercent = hasLiveChange
                    ? Math.abs(company.changePercent).toFixed(2)
                    : null;
                  const percentWidth = hasLiveChange
                    ? `${Math.min(Math.max(Math.abs(company.changePercent) * 12, 8), 100)}%`
                    : company.share || "18%";

                  return (
                    <div
                      key={company.symbol || company.name}
                      className="rounded-xl border border-white/10 bg-white/95 p-4 text-[#101827] shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-2xl"
                    >
                      <div className="grid grid-cols-[42px_1fr_auto] items-center gap-4 max-sm:grid-cols-[34px_1fr]">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1b2d57] text-sm font-bold text-white max-sm:h-8 max-sm:w-8">
                          {index + 1}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start max-sm:gap-1">
                            <h3 className="truncate text-lg font-bold max-sm:whitespace-normal">
                              {company.name}
                            </h3>
                            <span
                              className={`hidden rounded-full px-3 py-1 text-sm font-semibold max-sm:inline-flex ${
                                hasLiveChange
                                  ? isUp
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                  : "bg-yellow-100 text-yellow-700"
                              }`}
                            >
                              {hasLiveChange
                                ? `${isUp ? "UP" : "DOWN"} ${changePercent}%`
                                : company.share || "Loading"}
                            </span>
                          </div>
                          <p className="mt-1 text-sm text-gray-600">
                            {company.detail}
                          </p>
                        </div>

                        <div className="text-right max-sm:hidden">
                          <p
                            className={`text-xl font-bold ${
                              hasLiveChange
                                ? isUp
                                  ? "text-green-600"
                                  : "text-red-600"
                                : "text-yellow-600"
                            }`}
                          >
                            {hasLiveChange
                              ? `${isUp ? "UP" : "DOWN"} ${changePercent}%`
                              : company.share || "Loading"}
                          </p>
                          <p className="text-xs uppercase tracking-wide text-gray-500">
                            {price ? `Rs ${price}` : hasLiveChange ? "Live" : "Waiting"}
                          </p>
                        </div>
                      </div>

                      <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            hasLiveChange
                              ? isUp
                                ? "bg-gradient-to-r from-green-400 to-green-600"
                                : "bg-gradient-to-r from-red-400 to-red-600"
                              : "bg-gradient-to-r from-yellow-300 to-yellow-500"
                          }`}
                          style={{ width: percentWidth }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#f5f7fa]">
          <div className="bg-gradient-to-r from-[#000c40] to-[#607d8b]">
            <h2 className="text-5xl font-semibold mt-12 text-white ml-40 mb-10 max-lg:ml-0 max-lg:px-4 max-lg:text-center max-lg:text-4xl">
              How We Work ?
            </h2>
            <div className="flex flex-col gap-6 ml-40 max-lg:ml-0 max-lg:px-4">
              <details className="group w-[700px] bg-gray-300 rounded-md px-6 py-4 cursor-pointer max-lg:w-full">
                <summary className="flex justify-between items-center text-xl text-gray-800 font-medium list-none">
                  Identifying Your Financial Objectives
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-900 text-xl">
                  We understand your financial needs, risk capacity, and
                  preferences to design a strategy that fits you best.
                </p>
              </details>
              <details className="group w-[700px] bg-gray-300 rounded-md px-6 py-4 cursor-pointer max-lg:w-full">
                <summary className="flex justify-between items-center text-xl text-gray-800 font-medium list-none">
                  In-Depth Market Research & Insights
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-900 text-xl">
                  Our certified experts analyze the market deeply through
                  technical and fundamental research to identify profitable
                  trading options.
                </p>
              </details>
              <details className="group w-[700px] bg-gray-300 rounded-md px-6 py-4 cursor-pointer max-lg:w-full">
                <summary className="flex justify-between items-center text-xl text-gray-800 font-medium list-none">
                  Delivering Data-Driven Investment Advice
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-900 text-xl">
                  Our recommendations are delivered on time and with precision,
                  enabling investors to make informed decisions with proper risk
                  control.
                </p>
              </details>
              <details className="group w-[700px] bg-gray-300 rounded-md px-6 py-4 cursor-pointer max-lg:w-full">
                <summary className="flex justify-between items-center text-xl text-gray-800 font-medium list-none">
                  Ongoing Guidance & Regular Updates
                  <span className="transition-transform duration-300 group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 text-gray-900 text-xl">
                  With live market updates, smart risk management, and reliable
                  customer support, we make your investment journey seamless.
                </p>
              </details>
              <div className="ml-[940px] mr-40 absolute inset-20 mt-[5140px] max-lg:static max-lg:m-0 max-lg:px-4 max-lg:pb-10">
                <h1 className="text-white text-5xl max-lg:text-3xl">
                  Leading a Top Investment
                </h1>
                <h1 className="text-white text-5xl max-lg:text-3xl">Management Team</h1>
                <p className="text-white mt-6 text-2xl max-lg:text-lg">
                  At PrimeEdge Solution Advisory Services, we use a clear and
                  well-planned approach to guide traders and investors. Our goal
                  is to help you make smart and profitable financial decisions.
                  We focus on keeping everything accurate, transparent, and easy
                  to understand at every step.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-white text-3xl flex justify-center mt-8 max-lg:px-4 max-lg:text-center">
            Our Pricing
          </p>
          <h1 className="text-white text-3xl flex justify-center mt-3 max-lg:px-4 max-lg:text-center">
            Smart Investment Plans at Low Cost
          </h1>
          <div className="pt-16 flex justify-center flex-wrap gap-60 max-lg:gap-8 max-lg:px-4">
            {/* Starter Plan */}
            <div className="w-80 rounded-xl border border-gray-200 bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-md">
              <div className="px-6 pt-5 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
                    Beginner Plan
                  </span>
                  <span className="text-xs text-gray-400">Investment Plan</span>
                </div>
                <p className="text-xl font-medium text-gray-900">
                  Starter Plan
                </p>
                <p className="text-sm text-gray-500">
                  Perfect for beginners starting their investment journey
                </p>
              </div>
              <div className="bg-[#1a2f4e] px-6 py-5 text-center">
                <p className="text-xs text-[#a0b8d4] uppercase tracking-widest mb-1">
                  Starting from
                </p>
                <p className="text-4xl font-medium text-white">
                  ₹1,000
                  <span className="text-base text-[#a0b8d4] font-normal">
                    {" "}
                    / month
                  </span>
                </p>
              </div>
              <div className="px-6 py-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                  Returns Overview
                </p>
                {[
                  { label: "Weekly", value: "₹2000" },
                  { label: "Monthly", value: "₹8000" },
                  { label: "Quarterly", value: "₹25,000" },
                  { label: "Half-yearly", value: "₹55,000", highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${highlight ? "bg-green-500" : "bg-blue-400"}`}
                      />
                      {label}
                    </span>
                    <span
                      className={`font-medium text-sm ${highlight ? "text-green-600" : "text-gray-800"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => navigate("/begineer")}
                  className="w-full py-3 bg-[#1a2f4e] hover:bg-[#0f1e32] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Get Started →
                </button>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="w-80 rounded-xl border border-gray-200 bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-md">
              <div className="px-6 pt-5 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
                    Growth Plan
                  </span>
                  <span className="text-xs text-gray-400">Investment Plan</span>
                </div>
                <p className="text-xl font-medium text-gray-900">Growth Plan</p>
                <p className="text-sm text-gray-400">
                  Ideal for consistent growth and better returns
                </p>
              </div>
              <div className="bg-[#1a2f4e] px-6 py-5 text-center">
                <p className="text-xs text-[#a0b8d4] uppercase tracking-widest mb-1">
                  Starting from
                </p>
                <p className="text-4xl font-medium text-white">
                  ₹5,000
                  <span className="text-base text-[#a0b8d4] font-normal">
                    {" "}
                    / month
                  </span>
                </p>
              </div>
              <div className="px-6 py-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                  Returns Overview
                </p>
                {[
                  { label: "Weekly", value: "₹12,000" },
                  { label: "Monthly", value: "₹50,000" },
                  { label: "Quarterly", value: "₹1,50,000" },
                  { label: "Half-yearly", value: "₹3,20,000", highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${highlight ? "bg-green-500" : "bg-blue-400"}`}
                      />
                      {label}
                    </span>
                    <span
                      className={`font-medium text-sm ${highlight ? "text-green-600" : "text-gray-800"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => navigate("/middle")}
                  className="w-full py-3 bg-[#1a2f4e] hover:bg-[#0f1e32] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Get Started →
                </button>
              </div>
            </div>

            {/* Premium Plan */}
            <div className="w-80 rounded-xl border border-gray-200 bg-white overflow-hidden hover:-translate-y-1 transition-transform duration-200 shadow-sm hover:shadow-md">
              <div className="px-6 pt-5 pb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
                    Pro Plan
                  </span>
                  <span className="text-xs text-gray-400">Investment Plan</span>
                </div>
                <p className="text-xl font-medium text-gray-900">
                  Premium Plan
                </p>
                <p className="text-sm text-gray-400">
                  Advanced strategy for high returns
                </p>
              </div>
              <div className="bg-[#1a2f4e] px-6 py-5 text-center">
                <p className="text-xs text-[#a0b8d4] uppercase tracking-widest mb-1">
                  Starting from
                </p>
                <p className="text-4xl font-medium text-white">
                  ₹10,000
                  <span className="text-base text-[#a0b8d4] font-normal">
                    {" "}
                    / month
                  </span>
                </p>
              </div>
              <div className="px-6 py-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-3">
                  Returns Overview
                </p>
                {[
                  { label: "Weekly", value: "₹25,000" },
                  { label: "Monthly", value: "₹1,00,000" },
                  { label: "Quarterly", value: "₹3,00,000" },
                  { label: "Half-yearly", value: "₹6,50,000", highlight: true },
                ].map(({ label, value, highlight }) => (
                  <div
                    key={label}
                    className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <span className="flex items-center gap-2 text-sm text-gray-500">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${highlight ? "bg-green-500" : "bg-blue-400"}`}
                      />
                      {label}
                    </span>
                    <span
                      className={`font-medium text-sm ${highlight ? "text-green-600" : "text-gray-800"}`}
                    >
                      {value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <button
                  onClick={() => navigate("/pro")}
                  className="w-full py-3 bg-[#1a2f4e] hover:bg-[#0f1e32] text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Get Started →
                </button>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-[#3f4a5a] mt-16 flex flex-col text-gray-300 py-12 px-20 max-lg:px-6">
          <div className="grid grid-cols-4 gap-10 max-lg:grid-cols-1">
            <div>
              <h2 className="text-white text-xl font-semibold mb-2">
                PrimeEdge Capital Solution
              </h2>
              <p className="text-sm mt-4 leading-6">
                We have a team of highly motivated research analysts who are
                keen to deliver profit driven strategies and safety trading tips
                for customers as per their financial investment needs.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">| Our Services</h3>
              <ul className="space-y-2 text-sm">
                <li>Intraday Cash</li>
                <li>Premium Cash</li>
                <li>Index Future</li>
                <li>Index Option Premium</li>
                <li>Index Option</li>
                <li>Index Future</li>
                <li>Premium Option</li>
                <li>Intraday Option</li>
                <li>Premium Future</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">
                | Important Links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requirment"
                    className="text-gray-300 hover:text-white"
                  >
                    Services
                  </Link>
                </li>
                <li>
                  <Link
                    to="/freeconsulantent"
                    className="text-gray-300  hover:text-white"
                  >
                    Free Consultation
                  </Link>
                </li>
                <li>
                  <Link
                    to="/askexpert"
                    className="text-gray-300 hover:text-white"
                  >
                    Ask An Expert
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contactus"
                    className="text-gray-300 hover:text-white"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <a
                    href="mailto:akashtiwari7117@gmail.com"
                    className="text-gray-300 hover:text-white"
                  >
                    Email Support
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+919607176340"
                    className="text-gray-300 hover:text-white"
                  >
                    Call Support
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white">
                    Investor Charter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">
                | Official info:
              </h3>
              <ul className="space-y-4 text-sm">
                <li>plot.No 159 Manish Nagar,Besa Nagpur-440037</li>
                <li>📞 +91 9607176340</li>
                <li>✉️ akashtiwari7117@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="order-2 text-center text-sm text-gray-400 mt-4 border-t border-gray-600 pt-4">
            Copyright © 2025 PrimeEdge capital Solutions. All Rights Reserved
          </div>
          <div className="order-1 flex justify-end gap-4 mt-10">
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-pink-400 text-pink-400 transition-colors hover:bg-pink-400 hover:text-white"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-500 text-blue-500 transition-colors hover:bg-blue-500 hover:text-white"
            >
              <FaFacebookF className="text-lg" />
            </a>
            <a
              href="https://www.youtube.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-red-500 text-red-500 transition-colors hover:bg-red-500 hover:text-white"
            >
              <FaYoutube className="text-xl" />
            </a>
            <a
              href="https://x.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-sky-400 text-sky-400 transition-colors hover:bg-sky-400 hover:text-white"
            >
              <FaTwitter className="text-lg" />
            </a>
          </div>
        </footer>
      </div>
    </>
  );
}

export default HomePage;
