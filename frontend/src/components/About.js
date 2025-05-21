import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h1 className="about-heading">
         <span className="brand">Ecolume</span>
      </h1>
      <p className="about-paragraph">
        <strong>Ecolume</strong> is an all-in-one platform designed to promote
        healthy living and environmental responsibility. It empowers users to
        make informed food choices using a barcode scanner and track their
        carbon footprint through daily activity monitoring.
      </p>
      <p className="about-paragraph">
        The platform provides instant nutritional insights, personalized
        eco-tips, and a rewards system that encourages sustainable habits.
        Ecolume helps users scan, understand, and improve—contributing to both
        personal wellness and planetary health.
      </p>
      <p className="about-paragraph">
        Our mission is to build a healthier generation and a greener world by
        combining technology, awareness, and everyday action.
      </p>
      <div className="tagline">Choose Health, choose Ecolume !!</div>
    </div>
  );
};

export default About;
