import React from "react";
import { Link } from "react-router-dom";
import scannerImg from "../assets/images/barcodescanner.jpg";
import trackerImg from "../assets/images/cfpt.jpg";
import "../styles/homepage.css";

const Features = () => (
  <section className="features">
    <Link to="/scanner" className="feature-link">
      <div className="feature">
        <img src={scannerImg} alt="Barcode Scanner" />
        <h2>Product Scanner</h2>
        <p>
          Scan barcodes to get detailed nutritional insights and make informed
          choices.
        </p>
      </div>
    </Link>

    <Link to="/tracker" className="feature-link">
      <div className="feature">
        <img src={trackerImg} alt="Carbon Calculator" />
        <h2>Carbon Footprint Tracker</h2>
        <p>
          Monitor your daily activities and reduce your impact on the
          environment.
        </p>
      </div>
    </Link>
  </section>
);

export default Features;
