import { useState } from "react";
import "./App.css";

function Requirement() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending requirement...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          requirement: `Requirement submitted from Requirement page. City: ${formData.city}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to submit requirement");
      }

      setFormData({ name: "", phone: "", email: "", city: "" });
      setStatus("Requirement submitted successfully. We will contact you soon.");
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap');

        .req-body { font-family: 'DM Sans', sans-serif; background:#0f172a; }
        .gold { color:#c9a84c; }
        .gold-bar { width:56px;height:3px;background:linear-gradient(90deg,#c9a84c,#f0d080);border-radius:2px;margin:12px 0 20px;}
        .section-tag {
          display:inline-block;
          background:rgba(201,168,76,0.12);
          border:1px solid rgba(201,168,76,0.35);
          color:#c9a84c;
          font-size:11px;
          padding:5px 14px;
          border-radius:20px;
          margin-bottom:12px;
        }

        .input {
          padding:12px;
          background:#1e293b;
          border:1px solid rgba(255,255,255,0.1);
          border-radius:8px;
          color:white;
          width:100%;
          margin-top:6px;
        }

        .card {
          background:#1e293b;
          padding:30px;
          border-radius:16px;
          border:1px solid rgba(201,168,76,0.2);
        }

        .btn {
          padding:12px 30px;
          background:linear-gradient(90deg,#c9a84c,#f0d080);
          border:none;
          border-radius:10px;
          font-weight:700;
          cursor:pointer;
        }
      `}</style>

      <div className="req-body">
        {/* HERO */}
        <section
          style={{
            background: "linear-gradient(135deg,#000c40,#1a2a6c,#607d8b)",
            padding: "80px 30px",
          }}
        >
          <div style={{ maxWidth: 1100, margin: "auto" }}>
            <span className="section-tag">Requirement</span>

            <h1
              style={{
                fontFamily: "'Playfair Display',serif",
                fontSize: "50px",
                color: "#fff",
              }}
            >
              Submit Your <span className="gold">Requirement</span>
            </h1>

            <div className="gold-bar"></div>

            <p style={{ color: "#cbd5e1", maxWidth: 600 }}>
              Tell us about your investment goals and we’ll connect you with the
              best advisor.
            </p>
          </div>
        </section>

        {/* FORM */}
        <section style={{ padding: "60px 30px" }}>
          <div style={{ maxWidth: 900, margin: "auto" }}>
            <form className="card" onSubmit={handleSubmit}>
              <h2 style={{ color: "#fff", marginBottom: 10 }}>
                Personal Information
              </h2>

              <div className="gold-bar"></div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 20,
                }}
              >
                <div>
                  <label style={{ color: "#94a3b8" }}>Full Name</label>
                  <input
                    className="input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                </div>

                <div>
                  <label style={{ color: "#94a3b8" }}>Phone</label>
                  <input
                    className="input"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                    required
                  />
                </div>

                <div>
                  <label style={{ color: "#94a3b8" }}>Email</label>
                  <input
                    className="input"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                  />
                </div>

                <div>
                  <label style={{ color: "#94a3b8" }}>City</label>
                  <input
                    className="input"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter city"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn" style={{ marginTop: 20 }}>
                Submit Requirement
              </button>

              {status && (
                <p style={{ color: "#f0d080", marginTop: 14 }}>{status}</p>
              )}
            </form>
          </div>
        </section>

        {/* WHAT HAPPENS */}
        <section style={{ padding: "60px 30px" }}>
          <div style={{ maxWidth: 1100, margin: "auto" }}>
            <h2
              style={{
                color: "#fff",
                textAlign: "center",
                fontSize: "32px",
              }}
            >
              What Happens Next
            </h2>

            <div className="gold-bar" style={{ margin: "12px auto" }}></div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 20,
                marginTop: 40,
              }}
            >
              {[
                ["01", "We Review"],
                ["02", "We Contact"],
                ["03", "You Start Investing"],
              ].map(([num, title]) => (
                <div key={num} className="card">
                  <h1 className="gold">{num}</h1>
                  <h3 style={{ color: "#fff" }}>{title}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Requirement;
