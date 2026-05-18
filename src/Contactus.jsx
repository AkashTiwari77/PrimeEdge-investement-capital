import "./App.css";

function ContactUs() {
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
              <div className="form-box">
                <input placeholder="Name" />
                <input placeholder="Email" />
                <input placeholder="Subject" />
                <textarea rows="5" placeholder="Message"></textarea>

                <button className="btn">Send Message</button>
              </div>

              <div className="map"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
