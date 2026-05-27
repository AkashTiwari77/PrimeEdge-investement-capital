import { useState } from "react";
import "./App.css";

function AskExpert() {
  const [advisorForm, setAdvisorForm] = useState({
    name: "",
    phone: "",
    agreed: false,
  });
  const [status, setStatus] = useState("");

  const handleAdvisorChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAdvisorForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAdvisorSubmit = async (e) => {
    e.preventDefault();

    if (!advisorForm.name.trim() || !advisorForm.phone.trim()) {
      setStatus("Please enter your name and number.");
      return;
    }

    if (!advisorForm.agreed) {
      alert("Please agree to all terms & conditions before submitting.");
      setStatus("Please agree to all terms and conditions.");
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: advisorForm.name,
          email: "advisor-request@primeedge.local",
          phone: advisorForm.phone,
          requirement:
            "Find an Advisor form submitted from Ask An Expert page. User agreed to terms and conditions.",
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to submit request");
      }

      setAdvisorForm({ name: "", phone: "", agreed: false });
      setStatus("Request submitted successfully. We will contact you soon.");
    } catch (error) {
      setStatus(error.message || "Something went wrong.");
    }
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .req-body {
          background: #0b1a2f;
          color: #fff;
        }

        /* HERO */
        .hero {
          background: linear-gradient(135deg,#1e2f5a,#5b7fa6);
          padding: 100px 20px 120px;
          text-align: center;
        }

        .hero small {
          letter-spacing: 2px;
          font-size: 11px;
          color: #ccc;
        }

        .hero h1 {
          font-size: 42px;
          margin: 10px 0;
        }

        .breadcrumb {
          font-size: 12px;
          color: #ddd;
        }

        /* FORM SECTION */
        .form-section {
          margin-top: -80px;
          padding: 40px 20px 80px;
        }

        .form-wrapper {
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .form-box {
          background: #1a2a44;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }

        .form-box h2 {
          margin-bottom: 10px;
        }

        .form-box p {
          font-size: 13px;
          color: #bbb;
          margin-bottom: 20px;
        }

        .input {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ccc;
          outline: none;
        }

        .input:focus {
          border-color: #f5c542;
        }

        .checkbox {
          font-size: 12px;
          margin-bottom: 15px;
          color: #ccc;
        }

        .btn {
          width: 100%;
          padding: 12px;
          background: #2d3748;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 6px;
          transition: 0.3s;
        }

        .btn:hover {
          background: #1a202c;
        }

        /* IMAGE SIDE */
        .side-img {
          height: 350px;
          border-radius: 12px;
          background: url("https://images.unsplash.com/photo-1552664730-d307ca884978") center/cover;
        }

        /* SECOND SECTION (LIKE IMAGE 2) */
        .requirement-section {
          background: linear-gradient(135deg,#1e2f5a,#5b7fa6);
          padding: 80px 20px;
          text-align: center;
        }

        .requirement-section h2 {
          font-size: 36px;
        }

        .requirement-section span {
          color: #f5c542;
        }

        .card {
          max-width: 900px;
          margin: 40px auto;
          background: #1a2a44;
          padding: 30px;
          border-radius: 14px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .gold-btn {
          margin-top: 20px;
          padding: 12px 25px;
          background: #f5c542;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        .steps {
          padding: 60px 20px;
          text-align: center;
        }

        .step-boxes {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-top: 30px;
          flex-wrap: wrap;
        }

        .step {
          background: #1a2a44;
          padding: 20px;
          border-radius: 10px;
          width: 200px;
        }

        .step span {
          color: #f5c542;
          font-weight: bold;
        }

        @media(max-width:768px){
          .form-wrapper {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="req-body">
        {/* HERO */}
        <div className="hero">
          <small>WELCOME TO OUR WORLD</small>
          <h1>Ask An Expert</h1>
          <div className="breadcrumb">Home • Ask an Expert</div>
        </div>

        {/* FIND ADVISOR */}
        <div className="form-section">
          <div className="form-wrapper">
            <form className="form-box" onSubmit={handleAdvisorSubmit}>
              <h2>Find an Advisor</h2>
              <p>Our advisors are always ready to help you</p>

              <input
                className="input"
                name="name"
                value={advisorForm.name}
                onChange={handleAdvisorChange}
                placeholder="Your Name*"
              />
              <input
                className="input"
                name="phone"
                value={advisorForm.phone}
                onChange={handleAdvisorChange}
                placeholder="Your Number*"
              />

              <div className="checkbox">
                <input
                  type="checkbox"
                  name="agreed"
                  checked={advisorForm.agreed}
                  onChange={handleAdvisorChange}
                />{" "}
                I agree to all terms & conditions.
              </div>

              <button className="btn" type="submit">
                Submit
              </button>

              {status && (
                <p style={{ color: "#f5c542", marginTop: 12 }}>{status}</p>
              )}
            </form>

            <div className="side-img"></div>
          </div>
        </div>

        {/* SECOND STYLE SECTION */}
        
        {/* STEPS */}
        <div className="steps">
          <h3>What Happens Next</h3>

          <div className="step-boxes">
            <div className="step">
              <span>01</span>
              <p>We Review</p>
            </div>

            <div className="step">
              <span>02</span>
              <p>We Contact</p>
            </div>

            <div className="step">
              <span>03</span>
              <p>You Start</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AskExpert;
