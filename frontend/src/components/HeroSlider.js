// src/components/HeroSlider.js
import React, { useState, useEffect } from "react";
import firstImg from "../assets/images/firstpicture.jpg";
import secondImg from "../assets/images/secondpicture.jpg";
import "../styles/hero.css";

const HeroSlider = () => {
  const slides = [
    {
      img: firstImg,
      alt: "Nutritional Insights Scanner",
      question: "What’s in your food?",
      answer:
        "Scan barcodes to see nutritional facts and make informed choices.",
    },
    {
      img: secondImg,
      alt: "Carbon Footprint Tracker",
      question: "How much do you impact the planet?",
      answer: "Track your carbon footprint and take steps to reduce it daily.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            className={`slide ${index === currentIndex ? "active" : ""}`}
            key={index}>
            <img src={slide.img} alt={slide.alt} />
            <div className="overlay">
              <p className="question">{slide.question}</p>
              <p className="answer">{slide.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
