import "./App.css";
import Qrcode from "./assets/QRcode.jpg";

function PaymentPage() {
  return (
    <>
      <style>{`
        .payment-body {
          font-family: 'DM Sans', sans-serif;
          background: linear-gradient(135deg,#000c40,#1a2a6c,#607d8b);
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .payment-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 16px;
          width: 360px;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          animation: fadeUp 0.6s ease forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .payment-card img {
          width: 100%;
          border-radius: 12px;
          margin-bottom: 15px;
        }

        .title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
        }

        .text {
          font-size: 14px;
          color: #475569;
          line-height: 1.6;
          margin-top: 10px;
        }

        .highlight {
          color: #2563eb;
          font-weight: 600;
        }

        .divider {
          margin: 15px 0;
          font-weight: bold;
          color: #0f172a;
        }
      `}</style>

      <div className="payment-body">
        <div className="payment-card">
          {/* 🔥 Image yaha change kar */}
          <img src={Qrcode} alt="UPI QR Code" />
          <h1>minimum 10,000</h1>

          <div className="title">Complete Your Payment</div>

          <div className="text">
            Once payment is done, acknowledge on WhatsApp at
            <div className="highlight">96071716340</div>
            with payment screenshot.
          </div>

          <div className="divider">OR</div>

          <div className="text">
            Mail your complete details along with payment screenshot for
            confirmation.
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
