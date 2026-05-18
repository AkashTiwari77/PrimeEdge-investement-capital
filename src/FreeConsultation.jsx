import { useState } from "react";
import "./App.css";

function FreeConsultationPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [search, setSearch] = useState("");

  const faqs = [
    {
      q: "What happens during a free consultation?",
      a: "During the free consultation, our expert will understand your goals, assess your current situation, and recommend the best plan tailored to your needs. It typically lasts 20–30 minutes.",
    },
    {
      q: "Do I need to prepare anything before the consultation?",
      a: "No preparation is required. However, having a rough idea of your goals or questions in mind can help make the session more productive.",
    },
    {
      q: "Is the consultation really free? Any hidden charges?",
      a: "Absolutely free — no hidden charges whatsoever. We believe in building trust first before offering any paid services.",
    },
    {
      q: "How do I book a consultation slot?",
      a: "Click the 'Book a Session' button below or fill out the contact form. Our team will reach out within 24 hours to confirm your slot.",
    },
  ];

  // ✅ Proper filtering
  const filteredFaqs = faqs.filter((item) =>
    item.q.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <style>{`
        .help-body { font-family: 'DM Sans', sans-serif; background: #0d1117; }

        .card {
          background:#1c2333;
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
          color:#9ca3af;
          font-size:14px;
          margin-top:10px;
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
          background:#1c2333;
          color:white;
        }

        .btn {
          padding:10px 20px;
          border-radius:8px;
          border:none;
          background:#fbbf24;
          color:black;
          font-weight:600;
          cursor:pointer;
        }

        .tab-inactive {
          background:#1c2333;
          color:#9ca3af;
          margin-left:10px;
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
                flexWrap: "wrap",
                gap: 10,
              }}
            >
              <div>
                <button className="btn">Free Consultation</button>
                <button className="btn tab-inactive">My Bookings</button>
              </div>

              {/* ✅ React controlled input */}
              <input
                className="search"
                placeholder="Search your query..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <h2 style={{ color: "#fff", marginBottom: 20 }}>
              Got questions? We are here to help 👋
            </h2>

            {/* FAQ */}
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((item, i) => (
                <div
                  key={i}
                  className="card"
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                >
                  <div className="title">
                    <span>{item.q}</span>
                    <span>{openIndex === i ? "▲" : "▼"}</span>
                  </div>

                  {/* ✅ Conditional rendering */}
                  {openIndex === i && <div className="answer">{item.a}</div>}
                </div>
              ))
            ) : (
              <p style={{ color: "#9ca3af" }}>No results found.</p>
            )}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section style={{ padding: "40px 30px" }}>
          <div
            style={{
              maxWidth: 1000,
              margin: "auto",
              background: "#1c2333",
              borderRadius: 16,
              padding: "30px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <div>
              <h2 style={{ color: "#fff" }}>Ready to get started?</h2>
              <p style={{ color: "#9ca3af", marginTop: 10 }}>
                Book a free session and speak with an expert today.
              </p>

              <button className="btn" style={{ marginTop: 15 }}>
                Book a Session
              </button>
            </div>

            <div style={{ fontSize: 40, opacity: 0.3 }}>📅</div>
          </div>
        </section>
      </div>
    </>
  );
}

export default FreeConsultationPage;
