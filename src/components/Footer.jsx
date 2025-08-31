import React from 'react';

const Footer = ({ scrollToSection }) => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🐄</span>
            <div className="logo-text">
              <span className="logo-main">Rama</span>
              <span className="logo-sub">Dairy Products</span>
            </div>
          </div>
          <p>Bringing you the finest dairy products crafted with love and tradition. From farm to table, we ensure quality and freshness.</p>
          <div className="social-icons">
            <a href="#" aria-label="Facebook" className="social-icon">f</a>
            <a href="#" aria-label="Instagram" className="social-icon">📷</a>
            <a href="#" aria-label="Twitter" className="social-icon">🐦</a>
            <a href="#" aria-label="YouTube" className="social-icon">▶️</a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#products" onClick={() => scrollToSection('products')}>Products</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}>About Us</a></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#contact" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Our Products</h4>
          <ul>
            <li><a href="#ghee">Desi Ghee</a></li>
            <li><a href="#milk">Fresh Milk</a></li>
            <li><a href="#paneer">Paneer</a></li>
            <li><a href="#curd">Curd</a></li>
            <li><a href="#butter">Butter</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <div className="contact-item">
            <span className="contact-icon">📍</span>
            <span>123 Dairy Farm Road, Green Valley, Mumbai 400001</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">📞</span>
            <span>+91 98765 43210</span>
          </div>
          <div className="contact-item">
            <span className="contact-icon">✉️</span>
            <span>info@ramadairy.com</span>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2024 Rama Dairy Products. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#">Terms of Service</a>
            <span className="separator">|</span>
            <a href="#">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
