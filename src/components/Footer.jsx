import React from 'react';

const Footer = ({ scrollToSection }) => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Rama Dairy Products</h3>
          <p>Pure traditional dairy products delivered fresh to your doorstep.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About Us</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>📞 +91 9876543210</p>
          <p>✉️ ramadairyproducts@gmail.com</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📸</a>
            <a href="#" aria-label="WhatsApp">💬</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2025 Rama Dairy Products. All rights reserved.</p>
      </div>
    </footer>
  );
};


export default Footer;