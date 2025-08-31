import React from 'react';
import './AboutSnippet.css';

const AboutSnippet = () => {
  return (
    <section id="about" className="about-snippet">
      <div className="about-container">
        <div className="about-image">
          <img src="/dairy-main.jpg" alt="Traditional dairy farming - family tradition" />
        </div>
        <div className="about-content">
          <h2>Young Passion, Pure Tradition</h2>
          <div className="about-separator"></div>
          <p>Our journey began with a simple belief - that everyone deserves access to pure, unadulterated dairy products. For generations, our family has been crafting dairy the traditional way, preserving both flavor and nutrition.</p>
          <button className="btn-read-more">Read More →</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;