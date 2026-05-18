import "./App.css";

function Helppage() {
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
                  style={{ background: "#334155", color: "#fff" }}
                >
                  My Issues
                </button>
              </div>

              <input className="search" placeholder="Type your query here..." />
            </div>

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

              <button className="btn" style={{ marginTop: 15 }}>
                Contact Us
              </button>
            </div>

            <div style={{ fontSize: 40 }}>⚙️</div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Helppage;
