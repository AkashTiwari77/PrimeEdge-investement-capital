import { useState } from "react";
import "./App.css";

function AboutUs() {
  const [showConsultationPopup, setShowConsultationPopup] = useState(false);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [consultationForm, setConsultationForm] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [consultationStatus, setConsultationStatus] = useState("");

  const handleConsultationChange = (e) => {
    const { name, value } = e.target;
    setConsultationForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleConsultationSubmit = async (e) => {
    e.preventDefault();
    setConsultationStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...consultationForm,
          requirement: "Wants to book a free seminar from About Us page",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to send request");
      }

      setConsultationStatus("Request sent. We will contact you soon.");
      setConsultationForm({ name: "", email: "", phone: "" });
    } catch (error) {
      setConsultationStatus(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');
        .about-body { font-family: 'DM Sans', sans-serif; background: #0f172a; }
        .gold { color: #c9a84c; }
        .gold-bar { width: 56px; height: 3px; background: linear-gradient(90deg,#c9a84c,#f0d080); border-radius: 2px; margin: 12px 0 20px; }
        .gold-bar.center { margin: 12px auto 20px; }
        .fade { animation: fadeUp 0.7s ease forwards; opacity: 0; transform: translateY(24px); }
        .d1{animation-delay:0.1s} .d2{animation-delay:0.25s} .d3{animation-delay:0.4s}
        @keyframes fadeUp { to { opacity:1; transform:translateY(0); } }
        .val-card {
          background: #1e293b; border-radius: 14px; padding: 28px 24px;
          border-left: 4px solid #c9a84c; border-top: 1px solid rgba(96,125,139,0.2);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .val-card:hover { transform: translateY(-4px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
        .step { background: rgba(0,12,64,0.5); border-radius: 12px; padding: 18px 20px; border: 1px solid rgba(201,168,76,0.12); display:flex; gap:16px; align-items:flex-start; }
        .step-num { font-family:'Playfair Display',serif; font-size:28px; font-weight:900; color:#c9a84c; min-width:36px; line-height:1; }
        .stat-pill { background: rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:12px; padding:22px 16px; text-align:center; transition: transform 0.3s; }
        .stat-pill:hover { transform:translateY(-4px); }
        .why-item { display:flex; gap:14px; align-items:flex-start; padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.06); }
        .why-item:last-child { border-bottom:none; }
        .why-icon { width:40px; height:40px; flex-shrink:0; background:linear-gradient(135deg,#c9a84c,#f0d080); border-radius:9px; display:flex; align-items:center; justify-content:center; font-size:18px; }
        .section-tag { display:inline-block; background:rgba(201,168,76,0.12); border:1px solid rgba(201,168,76,0.35); color:#c9a84c; font-size:11px; font-weight:600; letter-spacing:2px; text-transform:uppercase; padding:5px 14px; border-radius:20px; margin-bottom:12px; }
        @media(max-width:768px){
          .two-col{grid-template-columns:1fr !important;}
          .four-col{grid-template-columns:1fr 1fr !important;}
          .three-col{grid-template-columns:1fr !important;}
        }
        @media(max-width:480px){
          .four-col{grid-template-columns:1fr !important;}
        }
      `}</style>

      <div className="about-body">
        {/* ══ PAGE 1 ══ */}
        <section
          style={{
            background:
              "linear-gradient(135deg,#000c40 0%,#1a2a6c 50%,#607d8b 100%)",
            padding: "72px 32px 80px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: 500,
              height: 500,
              borderRadius: "50%",
              background:
                "radial-gradient(circle,rgba(201,168,76,0.08) 0%,transparent 70%)",
              top: -100,
              right: -100,
              pointerEvents: "none",
            }}
          />

          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Headline */}
            <div className="fade d1">
              <span className="section-tag">About Us</span>
              <h1
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(34px,6vw,64px)",
                  fontWeight: 900,
                  color: "#fff",
                  lineHeight: 1.1,
                  marginBottom: 8,
                }}
              >
                About <span className="gold">PrimeEdge</span>
                <br />
                Capital Solution
              </h1>
              <div className="gold-bar"></div>
              <p
                style={{
                  color: "#cbd5e1",
                  fontSize: 17,
                  maxWidth: 600,
                  lineHeight: 1.85,
                  marginBottom: 40,
                }}
              >
                A <strong style={{ color: "#c9a84c" }}>SEBI-registered</strong>{" "}
                research advisory firm (Reg No: INH000010609) committed to
                helping every Indian investor make smarter, more confident
                financial decisions through expert guidance and transparent
                strategies.
              </p>
            </div>

            {/* Stats */}
            <div
              className="four-col fade d2"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                gap: 16,
                marginBottom: 56,
              }}
            >
              {[
                ["10K+", "Active Clients", "👥"],
                ["₹100 Cr+", "Assets Managed", "💰"],
                ["12+ Yrs", "Experience", "📈"],
                ["100+", "Expert Advisors", "🎯"],
              ].map(([num, label, icon]) => (
                <div key={label} className="stat-pill">
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{icon}</div>
                  <div
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 28,
                      fontWeight: 700,
                      color: "#c9a84c",
                    }}
                  >
                    {num}
                  </div>
                  <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 4 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Who We Are + Mission */}
            <div
              className="two-col fade d3"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
              }}
            >
              <div>
                <span className="section-tag">Who We Are</span>
                <h2
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(22px,3vw,34px)",
                    color: "#fff",
                    marginBottom: 12,
                    lineHeight: 1.3,
                  }}
                >
                  Your Trusted Wealth Partner
                </h2>
                <div className="gold-bar"></div>
                <p
                  style={{
                    color: "#94a3b8",
                    fontSize: 15,
                    lineHeight: 1.9,
                    marginBottom: 16,
                  }}
                >
                  Founded over 12 years ago, PrimeEdge Capital Solution is based
                  in Nagpur, Maharashtra, and serves investors pan-India. Our
                  100+ certified research analysts deliver data-driven
                  strategies across equity, futures, and options segments.
                </p>
                <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.9 }}>
                  Every recommendation is backed by rigorous technical and
                  fundamental analysis. We have helped 10,000+ clients grow
                  their wealth with consistency and confidence.
                </p>
              </div>

              <div
                style={{
                  background: "rgba(0,12,64,0.5)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: 18,
                  padding: 32,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 180,
                    color: "rgba(201,168,76,0.05)",
                    top: -30,
                    left: 10,
                    lineHeight: 1,
                    pointerEvents: "none",
                  }}
                >
                  "
                </div>
                <span className="section-tag">Our Mission</span>
                <h3
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: 22,
                    color: "#fff",
                    lineHeight: 1.4,
                    marginBottom: 16,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  "Empowering Every Investor with the Right Strategy"
                </h3>
                <p
                  style={{
                    color: "#cbd5e1",
                    fontSize: 14,
                    lineHeight: 1.85,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  We bridge the gap between complex market intelligence and
                  everyday investors — making profitable, risk-adjusted
                  investing accessible to all, with transparency and integrity
                  at every step.
                </p>
                <div
                  style={{
                    marginTop: 20,
                    padding: "14px 18px",
                    background: "rgba(201,168,76,0.08)",
                    borderRadius: 10,
                    border: "1px solid rgba(201,168,76,0.18)",
                  }}
                >
                  <div
                    style={{
                      color: "#c9a84c",
                      fontWeight: 600,
                      fontSize: 13,
                      marginBottom: 4,
                    }}
                  >
                    Our Vision
                  </div>
                  <p
                    style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.75 }}
                  >
                    To become India's most trusted and transparent research
                    advisory, known for accuracy, integrity, and client-first
                    values.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══ PAGE 2 ══ */}
        <section style={{ background: "#0f172a", padding: "72px 32px 80px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            {/* Our Values */}
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span className="section-tag">Our Values</span>
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(26px,4vw,42px)",
                  fontWeight: 700,
                  color: "#fff",
                }}
              >
                What Drives Us Every Day
              </h2>
              <div className="gold-bar center"></div>
            </div>
            <div
              className="three-col"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 20,
                marginBottom: 72,
              }}
            >
              {[
                [
                  "🔍",
                  "Research-First",
                  "Every call is backed by deep technical & fundamental analysis. We never guess — we research.",
                ],
                [
                  "🛡️",
                  "Transparency",
                  "Clear communication, no hidden charges, no false promises. What you see is exactly what you get.",
                ],
                [
                  "⚖️",
                  "Risk Management",
                  "Protecting your capital is as important as growing it. Every strategy includes stop-loss parameters.",
                ],
                [
                  "🤝",
                  "Client-First",
                  "Personalised strategies aligned with your risk appetite and financial objectives.",
                ],
                [
                  "📊",
                  "Data-Driven",
                  "Real-time market data, advanced tools, and proven models to stay ahead of market movements.",
                ],
                [
                  "⚡",
                  "24/7 Support",
                  "Round-the-clock availability for immediate responses, live updates, and urgent guidance.",
                ],
              ].map(([icon, title, desc]) => (
                <div key={title} className="val-card">
                  <div style={{ fontSize: 30, marginBottom: 12 }}>{icon}</div>
                  <h3
                    style={{
                      fontFamily: "'Playfair Display',serif",
                      fontSize: 18,
                      color: "#fff",
                      marginBottom: 8,
                    }}
                  >
                    {title}
                  </h3>
                  <p
                    style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.8 }}
                  >
                    {desc}
                  </p>
                </div>
              ))}
            </div>

            {/* Why Choose Us + How We Work */}
            <div
              className="two-col"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 48,
              }}
            >
              <div>
                <span className="section-tag">Why PrimeEdge</span>
                <h2
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(22px,3vw,34px)",
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  Why Thousands Trust Us
                </h2>
                <div className="gold-bar"></div>
                {[
                  [
                    "✅",
                    "SEBI Registered",
                    "Fully compliant under SEBI (Research Analyst) Regulations. Reg No: INH000010609.",
                  ],
                  [
                    "🏆",
                    "12+ Years Experience",
                    "Consistent performance across bull and bear market cycles since 2013.",
                  ],
                  [
                    "📡",
                    "Available 24/7",
                    "Round-the-clock support so you never miss a market opportunity.",
                  ],
                  [
                    "⚡",
                    "Immediate Response",
                    "Fast, reliable trade calls and updates delivered with zero delay.",
                  ],
                  [
                    "💎",
                    "10,000+ Happy Clients",
                    "Trusted by investors across India with ₹100 Cr+ managed.",
                  ],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="why-item">
                    <div className="why-icon">{icon}</div>
                    <div>
                      <div
                        style={{
                          color: "#fff",
                          fontWeight: 600,
                          fontSize: 15,
                          marginBottom: 3,
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          color: "#94a3b8",
                          fontSize: 13,
                          lineHeight: 1.7,
                        }}
                      >
                        {desc}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <span className="section-tag">Our Process</span>
                <h2
                  style={{
                    fontFamily: "'Playfair Display',serif",
                    fontSize: "clamp(22px,3vw,34px)",
                    color: "#fff",
                    marginBottom: 12,
                  }}
                >
                  How We Work
                </h2>
                <div className="gold-bar"></div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 14 }}
                >
                  {[
                    [
                      "01",
                      "Identify Your Goals",
                      "We understand your needs, risk capacity, and preferences to design a strategy that fits you best.",
                    ],
                    [
                      "02",
                      "Deep Market Research",
                      "Our analysts research technically and fundamentally to identify profitable opportunities.",
                    ],
                    [
                      "03",
                      "Data-Driven Advice",
                      "Precise, timely recommendations with proper risk control so you can invest with confidence.",
                    ],
                    [
                      "04",
                      "Ongoing Support",
                      "Live updates, smart risk management, and reliable support throughout your entire journey.",
                    ],
                  ].map(([step, title, desc]) => (
                    <div key={step} className="step">
                      <div className="step-num">{step}</div>
                      <div>
                        <div
                          style={{
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: 15,
                            marginBottom: 4,
                          }}
                        >
                          {title}
                        </div>
                        <div
                          style={{
                            color: "#94a3b8",
                            fontSize: 13,
                            lineHeight: 1.7,
                          }}
                        >
                          {desc}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA strip */}
            <div
              style={{
                marginTop: 64,
                background:
                  "linear-gradient(135deg,#000c40,#1a2a6c 60%,#607d8b)",
                borderRadius: 20,
                padding: "44px 40px",
                textAlign: "center",
                border: "1px solid rgba(201,168,76,0.15)",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display',serif",
                  fontSize: "clamp(24px,4vw,40px)",
                  color: "#fff",
                  marginBottom: 12,
                }}
              >
                Ready to <span className="gold">Invest Smarter?</span>
              </h2>
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: 16,
                  marginBottom: 28,
                  maxWidth: 480,
                  margin: "0 auto 28px",
                }}
              >
                Join 10,000+ investors already growing their wealth with
                PrimeEdge Capital Solution.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: 14,
                  justifyContent: "center",
                  flexWrap: "wrap",
                }}
              >
                <button
                  style={{
                    padding: "13px 34px",
                    background: "linear-gradient(90deg,#c9a84c,#f0d080)",
                    border: "none",
                    borderRadius: 10,
                    color: "#000",
                    fontWeight: 700,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.04)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                  onClick={() => {
                    setConsultationStatus("");
                    setShowConsultationPopup(true);
                  }}
                >
                  Free Consultation
                </button>
                <button
                  style={{
                    padding: "13px 34px",
                    background: "transparent",
                    border: "2px solid rgba(255,255,255,0.25)",
                    borderRadius: 10,
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 15,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.color = "#c9a84c";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.25)";
                    e.currentTarget.style.color = "#fff";
                  }}
                  onClick={() => setShowContactPopup(true)}
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </section>

        {showConsultationPopup && (
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
            <form
              onSubmit={handleConsultationSubmit}
              style={{
                width: "100%",
                maxWidth: 420,
                background: "#111827",
                border: "1px solid rgba(201,168,76,0.35)",
                borderRadius: 16,
                padding: 28,
                boxShadow: "0 24px 80px rgba(0,0,0,0.45)",
              }}
            >
              <h3
                style={{
                  color: "#fff",
                  fontSize: 24,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                Free Seminar Booking
              </h3>
              <p style={{ color: "#94a3b8", fontSize: 14, marginBottom: 20 }}>
                Enter your details and we will send a booking alert to our team.
              </p>

              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  name={field}
                  type={field === "email" ? "email" : "text"}
                  value={consultationForm[field]}
                  onChange={handleConsultationChange}
                  placeholder={
                    field === "name"
                      ? "Your Name"
                      : field === "email"
                        ? "Your Email"
                        : "Your Phone"
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    marginBottom: 12,
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.18)",
                    background: "#0f172a",
                    color: "#fff",
                    outline: "none",
                  }}
                />
              ))}

              {consultationStatus && (
                <p style={{ color: "#f0d080", fontSize: 13, marginBottom: 14 }}>
                  {consultationStatus}
                </p>
              )}

              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowConsultationPopup(false)}
                  style={{
                    padding: "11px 18px",
                    borderRadius: 10,
                    border: "1px solid rgba(255,255,255,0.22)",
                    background: "transparent",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  style={{
                    padding: "11px 18px",
                    borderRadius: 10,
                    border: "none",
                    background: "linear-gradient(90deg,#c9a84c,#f0d080)",
                    color: "#000",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Send Alert
                </button>
              </div>
            </form>
          </div>
        )}

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
                onClick={() => setShowContactPopup(false)}
                style={{
                  padding: "11px 22px",
                  borderRadius: 10,
                  border: "none",
                  background: "linear-gradient(90deg,#c9a84c,#f0d080)",
                  color: "#000",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
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

export default AboutUs;
