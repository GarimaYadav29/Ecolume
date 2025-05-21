import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";
import Login from "./Login";
import Signup from "./Signup";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">Ecolume</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/About">About</Link></li>
          <li><Link to="/tracker">Carbon Tracker</Link></li>
          <li><Link to="/scanner">Scanner</Link></li>
        </ul>
        <div className="nav-buttons">
          <button className="btn" onClick={() => setShowLogin(true)}>Login</button>
          <button className="btn" onClick={() => setShowSignup(true)}>Sign Up</button>
        </div>
      </nav>

      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </header>
  );
};

export default Navbar;
