import "./App.css";
import { useState } from "react";

function ContactModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <style>{`
        .modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .modal-box {
          background: #fff;
          width: 400px;
          padding: 20px;
          border-radius: 8px;
          position: relative;
        }

        .close {
          position: absolute;
          right: 10px;
          top: 5px;
          cursor: pointer;
          font-size: 20px;
        }

        .form label {
          display: block;
          margin-top: 10px;
          font-size: 14px;
        }

        .form input,
        .form textarea {
          width: 100%;
          padding: 8px;
          margin-top: 5px;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .send-btn {
          width: 100%;
          margin-top: 15px;
          padding: 10px;
          background: #3b4252;
          color: white;
          border: none;
          cursor: pointer;
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

      {/* Button */}
      <button className="btn" onClick={() => setOpen(true)}>
        Contact Us
      </button>

      {/* Modal */}
      {open && (
        <div className="modal" onClick={() => setOpen(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={() => setOpen(false)}>
              ✖
            </span>

            <form className="form">
              <label>Name</label>
              <input type="text" placeholder="Name" />

              <label>Email</label>
              <input type="email" placeholder="Email" />

              <label>Phone No.</label>
              <input type="tel" placeholder="Phone No." />

              <label>Message</label>
              <textarea placeholder="Message" rows="4"></textarea>

              <button className="send-btn">Send</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ContactModal;









