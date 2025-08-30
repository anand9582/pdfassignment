import React from "react";

const HeroSection = ({ scrollToSection }) => {
  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <h1 className="fade-in-slide">Pure Taste, Pure Tradition</h1>
        <p className="fade-in-slide delay-1">
          Fresh, pure, chemical-free dairy crafted with care.
        </p>
        <div className="hero-buttons fade-in-slide delay-2">
          <button
            className="btn-primary"
            onClick={() => scrollToSection("products")}
          >
            Shop Now
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection("contact")}
          >
            Contact Us
          </button>
        </div>
      </div>
      <div className="milk-particles">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="milk-drop"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              "--delay": `${Math.random() * 2}s`, // For the splash effect
            }}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
