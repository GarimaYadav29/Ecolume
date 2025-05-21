import React from "react";
import "../styles/Auth.css";

const Login = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button className="btn-green">Login</button>
        <button className="btn-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Login;
