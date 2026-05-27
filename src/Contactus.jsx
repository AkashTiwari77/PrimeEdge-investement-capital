import { useState } from "react";
import "./App.css";

function ContactUs() {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    agreed: false,
  });
  const [status, setStatus] = useState("");

  const handleContactChange = (e) => {
    const { name, value, type, checked } = e.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    if (!contactForm.agreed) {
      alert("Please agree to all terms & conditions before submitting.");
      setStatus("Please agree to all terms and conditions.");
      return;
    }

    if (
      !contactForm.name.trim() ||
      !contactForm.email.trim() ||
      !contactForm.subject.trim() ||
      !contactForm.message.trim()
    ) {
      setStatus("Please fill all fields.");
      return;
    }

    setStatus("Sending...");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          phone: "Not provided",
          requirement: `Contact Us page message. Subject: ${contactForm.subject}. Message: ${contactForm.message}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Unable to send message");
      }

      setContactForm({
        name: "",
        email: "",
        subject: "",
        message: "",
        agreed: false,
      });
      setStatus("Message sent successfully. We will contact you soon.");
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

        .contact-body {
          background: #0b1a2f;
          color: #fff;
        }

        /* HERO */
        .hero {
          background: url("https://images.unsplash.com/photo-1521791136064-7986c2920216") center/cover;
          padding: 100px 20px;
          text-align: center;
          position: relative;
        }

        .hero::after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.6);
        }

        .hero h1 {
          position: relative;
          z-index: 1;
          font-size: 40px;
        }

        /* CONTACT DETAILS BAR */
        .details-bar {
          background: #374151;
          padding: 30px 20px;
          text-align: center;
        }

        .details-grid {
          max-width: 1100px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(3,1fr);
          gap: 20px;
        }

        .detail-box {
          font-size: 13px;
          color: #ddd;
        }

        /* FORM SECTION (Image 2 Style) */
        .form-section {
          background: linear-gradient(135deg,#1e2f5a,#5b7fa6);
          padding: 80px 20px;
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
          border-radius: 14px;
        }

        .form-box input,
        .form-box textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ccc;
          outline: none;
          color: #111827;
        }

        .form-box input:focus,
        .form-box textarea:focus {
          border-color: #f5c542;
        }

        .btn {
          padding: 12px;
          background: #f5c542;
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
        }

        /* MAP */
        .map {
          height: 350px;
          border-radius: 12px;
          background: url("https://maps.googleapis.com/maps/api/staticmap?center=Nagpur&zoom=10&size=600x400&key=YOUR_API_KEY") center/cover;
        }

        /* RESPONSIVE */
        @media(max-width:768px){
          .details-grid {
            grid-template-columns: 1fr;
          }

          .form-wrapper {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="contact-body">
        {/* HERO */}
        <div className="hero">
          <h1>Contact Us</h1>
        </div>

        {/* DETAILS */}
        <div className="details-bar">
          <div className="details-grid">
            <div className="detail-box">
              <strong>Address</strong>
              <br />
              plot.No 159 Manish Nagar,Besa Nagpur-440037 Nagpur - 440025
            </div>

            <div className="detail-box">
              <strong>Call Us</strong>
              <br />
              +91 9607176340
              <br />
              +91 80879217735
              <br />
            </div>

            <div className="detail-box">
              <strong>Email</strong>
              <br />
              akashtiwari7117@gmail.com
            </div>
          </div>
        </div>

        {/* FORM + MAP */}
        <div className="ml-44">
          <div className="form-section ">
            <div className="form-wrapper">
              <form className="form-box" onSubmit={handleContactSubmit}>
                <input
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder="Name"
                />
                <input
                  name="email"
                  type="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="Email"
                />
                <input
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleContactChange}
                  placeholder="Subject"
                />
                <textarea
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows="5"
                  placeholder="Message"
                ></textarea>

                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: "#ddd",
                    fontSize: 13,
                    marginBottom: 15,
                  }}
                >
                  <input
                    type="checkbox"
                    name="agreed"
                    checked={contactForm.agreed}
                    onChange={handleContactChange}
                    style={{
                      width: "auto",
                      margin: 0,
                      flexShrink: 0,
                    }}
                  />
                  <span>I agree to all terms & conditions.</span>
                </label>

                <button className="btn" type="submit">
                  Send Message
                </button>

                {status && (
                  <p style={{ color: "#f5c542", marginTop: 12 }}>{status}</p>
                )}
              </form>

              <div className="map"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
