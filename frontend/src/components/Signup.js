import React from "react";
import "../styles/Auth.css";

const Signup = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Sign Up</h2>
        <input type="text" placeholder="Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn-green">Register</button>
        <button className="btn-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Signup;
