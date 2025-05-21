import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./components/About";
import BarcodeScanner from "./pages/BarcodeScanner";
import CarbonTracker from "./pages/CarbonTracker";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/scanner" element={<BarcodeScanner />} />
        <Route path="/tracker" element={<CarbonTracker />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
