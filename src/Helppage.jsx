import { useState } from "react";
import "./App.css";

function Helppage() {
  const [myIssuesActive, setMyIssuesActive] = useState(false);
  const [query, setQuery] = useState("");
  const [queryStatus, setQueryStatus] = useState("");
  const [showContactPopup, setShowContactPopup] = useState(false);

  const handleQuerySubmit = async () => {
    if (!query.trim()) {
      setQueryStatus("Please type your query first.");
      return;
    }

    setQueryStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Help Page Visitor",
          email: "help-query@primeedge.local",
          phone: "Not provided",
          requirement: `Help page query: ${query}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to send query");
      }

      setQuery("");
      setQueryStatus("Your query has been sent.");
    } catch (error) {
      setQueryStatus(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <style>{`
        .help-body { font-family: 'DM Sans', sans-serif; background: #0f172a; }
        .card {
          background:#1e293b;
          border-radius:12px;
          padding:16px 20px;
          margin-bottom:12px;
          cursor:pointer;
          border:1px solid rgba(255,255,255,0.08);
          transition: all 0.3s;
        }
        .card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }
        .answer {
          color:#94a3b8;
          font-size:14px;
          margin-top:10px;
          display:none;
        }
        .title {
          color:white;
          font-weight:500;
          display:flex;
          justify-content:space-between;
        }
        .search {
          padding:10px 14px;
          border-radius:8px;
          border:none;
          width:250px;
          background:#1e293b;
          color:white;
        }
        .btn {
          padding:10px 20px;
          border-radius:8px;
          border:none;
          background:#c9a84c;
          color:black;
          font-weight:600;
          cursor:pointer;
        }
      `}</style>

      <div className="help-body">
        {/* TOP SECTION */}
        <section style={{ padding: "60px 30px" }}>
          <div style={{ maxWidth: 1000, margin: "auto" }}>
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 30,
              }}
            >
              <div>
                <button style={{ marginRight: 10 }} className="btn">
                  Help Centre
                </button>
                <button
                  className="btn"
                  style={{
                    background: myIssuesActive ? "#c9a84c" : "#334155",
                    color: myIssuesActive ? "#000" : "#fff",
                  }}
                  onClick={() => {
                    setMyIssuesActive(true);
                    setQueryStatus("");
                  }}
                >
                  My Issues
                </button>
              </div>

              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <input
                  className="search"
                  placeholder="Type your query here..."
                  value={query}
                  disabled={!myIssuesActive}
                  onChange={(e) => setQuery(e.target.value)}
                  style={{
                    opacity: myIssuesActive ? 1 : 0.55,
                    cursor: myIssuesActive ? "text" : "not-allowed",
                    border: myIssuesActive
                      ? "1px solid #c9a84c"
                      : "1px solid transparent",
                  }}
                />
                {myIssuesActive && (
                  <button className="btn" onClick={handleQuerySubmit}>
                    Send
                  </button>
                )}
              </div>
            </div>

            {queryStatus && (
              <p style={{ color: "#c9a84c", marginBottom: 20 }}>
                {queryStatus}
              </p>
            )}

            <h2 style={{ color: "#fff", marginBottom: 20 }}>
              Tell us how we can help 👋
            </h2>

            {/* FAQ */}
            {[
              {
                q: "How can I provide feedback for my teacher or lecture?",
                a: "Go to dashboard and submit feedback in feedback section.",
              },
              {
                q: "Why am I not receiving the OTP?",
                a: "Check network, spam folder or retry.",
              },
              {
                q: "Why am I having trouble accessing the site?",
                a: "Clear cache or try different browser.",
              },
              {
                q: "Want to inquire about a specific course?",
                a: "Visit course section or contact support.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="card"
                onClick={(e) => {
                  const ans = e.currentTarget.querySelector(".answer");
                  ans.style.display =
                    ans.style.display === "block" ? "none" : "block";
                }}
              >
                <div className="title">
                  <span>{item.q}</span>
                  <span>▼</span>
                </div>
                <div className="answer">{item.a}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section style={{ padding: "40px 30px" }}>
          <div
            style={{
              maxWidth: 1000,
              margin: "auto",
              background: "#1e293b",
              borderRadius: 16,
              padding: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2 style={{ color: "#fff" }}>Still need help, Have Queries</h2>
              <p style={{ color: "#94a3b8", marginTop: 10 }}>
                Have Queries? Please get in touch & we will happy to help you
              </p>

              <button
                className="btn"
                style={{ marginTop: 15 }}
                onClick={() => setShowContactPopup(true)}
              >
                Contact Us
              </button>
            </div>

            <div style={{ fontSize: 40 }}>⚙️</div>
          </div>
        </section>

        {showContactPopup && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(2,6,23,0.75)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 20,
              zIndex: 1000,
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 360,
                background: "#111827",
                border: "1px solid rgba(201,168,76,0.35)",
                borderRadius: 16,
                padding: 28,
                textAlign: "center",
                boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
              }}
            >
              <h3 style={{ color: "#fff", fontSize: 24, marginBottom: 12 }}>
                Contact Us
              </h3>
              <p style={{ color: "#94a3b8", marginBottom: 10 }}>
                Call us for quick support
              </p>
              <a
                href="tel:+919607176340"
                style={{
                  display: "inline-block",
                  color: "#f0d080",
                  fontSize: 22,
                  fontWeight: 700,
                  marginBottom: 22,
                  textDecoration: "none",
                }}
              >
                +91 9607176340
              </a>
              <br />
              <button
                type="button"
                className="btn"
                onClick={() => setShowContactPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Helppage;
