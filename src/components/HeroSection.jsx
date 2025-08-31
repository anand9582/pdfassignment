import React from "react";
import './HeroSection.css';

const HeroSection = ({ scrollToSection }) => {
  return (
    <section id="home" className="hero">
      <div className="hero-background">
        <img 
          src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1920&h=1080&fit=crop&crop=center" 
          alt="Glass milk bottles and fresh lemons background" 
          className="hero-bg-image"
        />
        <div className="hero-overlay"></div>
      </div>
      
      <div className="hero-content">
        <h1 className="fade-in-slide">
          <span className="pure-taste">Pure Taste,</span>
          <span className="pure-tradition">Pure Tradition</span>
        </h1>
        
        <p className="hero-description fade-in-slide delay-1">
          Experience the finest dairy products crafted with <strong>love, tradition,</strong> and <strong>uncompromising quality.</strong> From farm to table, we deliver nature's purest gifts to your doorstep.
        </p>
        
        <div className="feature-badges fade-in-slide delay-2">
          <div className="feature-badge">
            <span className="badge-icon">👑</span>
            <span className="badge-text">Premium Quality</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">🛡️</span>
            <span className="badge-text">100% Safe</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">⭐</span>
            <span className="badge-text">5-Star Rated</span>
          </div>
          <div className="feature-badge">
            <span className="badge-icon">🚚</span>
            <span className="badge-text">Fast Delivery</span>
          </div>
        </div>
        
        <div className="hero-buttons fade-in-slide delay-3">
          <button
            className="btn-primary"
            onClick={() => scrollToSection("products")}
          >
            Shop Premium Products →
          </button>
          <button
            className="btn-secondary"
            onClick={() => scrollToSection("about")}
          >
            Explore Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
