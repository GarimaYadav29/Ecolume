// src/pages/Home.js
import React, { useEffect } from "react";
import HeroSlider from "../components/HeroSlider";
//import About from "../components/About";
import Features from "../components/Features";


const Home = () => {
  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => console.log("FROM BACKEND:", data))
      .catch((err) => console.error("Backend connection error", err));
  }, []);

  return (
    <>
      <HeroSlider />
  
      <Features />
    </>
  );
};

export default Home;
