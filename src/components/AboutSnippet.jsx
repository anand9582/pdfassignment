import React from 'react';
// import aboutImage from '../assets/about-image.jpg'; // Adjust the path as necessary

const AboutSnippet = () => {
  return (
    <section id="about" className="about-snippet">
      <div className="about-container">
        <div className="about-image">
          <div className="placeholder-image"></div>
        </div>
        <div className="about-content">
          <h2>Young Passion, Pure Tradition</h2>
          <p>Our journey began with a simple belief - that everyone deserves access to pure, unadulterated dairy products. For generations, our family has been crafting dairy the traditional way, preserving both flavor and nutrition.</p>
          <p>Today, we continue this legacy with modern hygiene standards while maintaining our time-tested methods.</p>
          <button className="btn-read-more">Read More →</button>
        </div>
      </div>
    </section>
  );
};

export default AboutSnippet;