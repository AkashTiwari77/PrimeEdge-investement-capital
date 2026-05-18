import { FiPhone, FiMail, FiCopy } from "react-icons/fi";

export default function TopBar({
  showPopup,
  setShowPopup,
  resetLogin,
  loggedInUser,
  loginStep,
  handleLoginEmailSubmit,
  handleLoginPasswordSubmit,
  handleLoginEmailChange,
  handleLoginPasswordChange,
  loginEmail,
  loginPassword,
  loginError,
  loginLoading,

  handleLogout,
  Login,
}) {
  // ─────────────────────────────────────────────────────
  // MARKET STATUS
  // ─────────────────────────────────────────────────────

  const now = new Date();

  const indiaTime = new Date(
    now.toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    }),
  );

  const hours = indiaTime.getHours();
  const minutes = indiaTime.getMinutes();

  const currentTime = hours * 60 + minutes;

  // 9:00 AM to 3:30 PM
  const marketOpen = currentTime >= 540 && currentTime <= 930;

  return (
    <>
      {/* ───────────────────────────────────────────────────── */}
      {/* TOP CONTACT BAR */}
      {/* ───────────────────────────────────────────────────── */}

      <div className="w-full flex justify-center mt-4">
        <div className="bg-[#111111] w-[95%] h-[85px] rounded-full flex items-center justify-between px-10 border border-gray-800 shadow-lg">
          {/* LEFT SIDE */}
          <div className="flex items-center gap-10">
            {/* PHONE */}
            <div className="flex items-center gap-3">
              <FiPhone className="text-pink-500 w-7 h-7" />

              <span className="text-white text-2xl font-medium">
                +91 9607176340
              </span>
            </div>

            {/* DIVIDER */}
            <div className="h-8 w-[2px] bg-gray-600"></div>

            {/* EMAIL */}
            <div className="flex items-center gap-3">
              <FiMail className="text-white w-7 h-7" />

              <span className="text-white text-2xl font-medium">
                support@primeedge.com
              </span>
            </div>

            {/* DIVIDER */}
            <div className="h-8 w-[2px] bg-gray-600"></div>

            {/* MARKET STATUS */}
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full ${
                  marketOpen
                    ? "bg-green-400 shadow-green-400 shadow-lg"
                    : "bg-red-500 shadow-red-500 shadow-lg"
                }`}
              ></div>

              <span className="text-white text-2xl font-medium">
                {marketOpen ? "Market Open" : "Market Closed"}
              </span>
            </div>
          </div>

          {/* RIGHT ICON */}
          <div>
            <FiCopy className="text-white w-9 h-9 cursor-pointer hover:scale-110 transition" />
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────── */}
      {/* MARKET UPDATE + LOGIN BAR */}
      {/* ───────────────────────────────────────────────────── */}

      <div className="bg-[#212533] flex flex-wrap justify-between items-center px-8 py-3 mt-4 gap-4">
        {/* RUNNING MARKET */}
        <div className="min-w-[220px] flex-1 overflow-hidden">
          <marquee className="text-green-400 text-lg font-semibold">
            NIFTY 50 ▲ +1.24% &nbsp;&nbsp;&nbsp; SENSEX ▲ +0.98%
            &nbsp;&nbsp;&nbsp; BANKNIFTY ▼ -0.32%
          </marquee>
        </div>

        {/* TOP BAR PANEL BETWEEN LIVE MARKET AND SIGN IN */}
        <div className="hidden xl:flex items-center justify-between gap-12 bg-[#111111] rounded-full px-6 py-4 shadow-lg border border-gray-800 min-w-[520px] max-w-[720px]">
          <div className="flex items-center gap-4">
            <Phone className="text-pink-500 w-8 h-8" />
            <span className="text-white text-3xl tracking-wide">+91 9607176340</span>
          </div>

          <div className="h-10 w-[2px] bg-gray-500"></div>

          <div className="flex items-center gap-4">
            <Mail className="text-white w-8 h-8" />
            <span className="text-white text-3xl tracking-wide">support@primeedge.com</span>
          </div>

          <div className="h-10 w-[2px] bg-gray-500"></div>

          <div className="flex items-center gap-4">
            <div
              className={`w-6 h-6 rounded-full ${
                marketOpen ? "bg-green-400" : "bg-red-500"
              }`}
            ></div>

            <span className="text-white text-3xl tracking-wide">
              {marketOpen ? "Market Open" : "Market Closed"}
            </span>
          </div>

          <Copy className="text-white w-10 h-10 cursor-pointer" />
        </div>

        {/* LOGIN */}
        <div className="flex items-center gap-3">
          <img
            className="w-12 h-12 rounded-full bg-pink-500 cursor-pointer"
            src={Login}
            alt="login"
            onClick={() => {
              resetLogin();
              setShowPopup("login");
            }}
          />

          {loggedInUser ? (
            <span className="text-white text-lg font-semibold">
              {loggedInUser.split("@")[0]}
            </span>
          ) : (
            <span className="text-white text-lg font-semibold">Sign in</span>
          )}
        </div>
      </div>

      {/* ───────────────────────────────────────────────────── */}
      {/* LOGIN POPUP */}
      {/* ───────────────────────────────────────────────────── */}

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
            {/* CLOSE BUTTON */}
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

            {/* LOGGED IN */}
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
              // EMAIL FORM
              <form onSubmit={handleLoginEmailSubmit}>
                <div className="flex gap-3 justify-center mb-4">
                  <button
                    type="button"
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-100 transition"
                  >
                    GitHub
                  </button>

                  <button
                    type="button"
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 hover:bg-gray-100 transition"
                  >
                    Google
                  </button>

                  <button
                    type="button"
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
              // PASSWORD FORM
              <form onSubmit={handleLoginPasswordSubmit}>
                <div className="text-left mb-4">
                  <p className="text-sm text-gray-500">Signing in as</p>

                  <p className="font-semibold text-gray-900">{loginEmail}</p>
                </div>

                <div className="mt-4 text-left">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>

                  <input
                    type="password"
                    value={loginPassword}
                    onChange={handleLoginPasswordChange}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {loginError && (
                  <p className="mt-3 text-sm text-red-600">{loginError}</p>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="mt-6 w-full rounded-xl bg-black text-white py-3 font-semibold hover:bg-gray-900 transition"
                >
                  {loginLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>
            )}

            <div className="mt-6 text-xs text-gray-400">
              Secured by Clerk · Development mode
            </div>
          </div>
        </div>
      )}
    </>
  );
}
