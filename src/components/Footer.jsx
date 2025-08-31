import React from 'react';
import { 
  MdHome, 
  MdInfo, 
  MdShoppingBag, 
  MdHelp, 
  MdPhone, 
  MdEmail, 
  MdLocationOn,
  MdRefresh,
  MdLocalShipping,
  MdSecurity,
  MdLock,
  MdDescription,
  MdFacebook,
  MdCameraAlt,
  MdChat,
  MdPlayArrow
} from 'react-icons/md';
import logo from '../assets/logo.png';
import './Footer.css';

const Footer = ({ scrollToSection }) => {
  return (
    <footer id="contact" className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo-main">
            <div className="logo-container">
              <img src={logo} alt="Dairy Logo" className="footer-logo-image" />
            </div>
          </div>
          <p>Pure traditional dairy products delivered fresh to your doorstep.</p>
          <div className="footer-motto">
            <span className="motto-icon">⭐</span>
            <span className="motto-text">Traditional Excellence</span>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home" onClick={() => scrollToSection('home')}><MdHome className="footer-icon" />Home</a></li>
            <li><a href="#about" onClick={() => scrollToSection('about')}><MdInfo className="footer-icon" />About Us</a></li>
            <li><a href="#products" onClick={() => scrollToSection('products')}><MdShoppingBag className="footer-icon" />Products</a></li>
            <li><a href="#faq-policies" onClick={() => scrollToSection('faq-policies')}><MdHelp className="footer-icon" />FAQ & Policies</a></li>
            <li><a href="#contact-form" onClick={() => scrollToSection('contact-form')}><MdPhone className="footer-icon" />Contact</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Policies & Support</h4>
          <ul>
            <li><a href="#refund-policy"><MdRefresh className="footer-icon" />Refund Policy</a></li>
            <li><a href="#shipping-info"><MdLocalShipping className="footer-icon" />Shipping & Delivery</a></li>
            <li><a href="#quality-assurance"><MdSecurity className="footer-icon" />Quality Assurance</a></li>
            <li><a href="#privacy-policy"><MdLock className="footer-icon" />Privacy Policy</a></li>
            <li><a href="#terms-service"><MdDescription className="footer-icon" />Terms of Service</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact & Follow Us</h4>
          <div className="contact-item">
            <MdPhone className="contact-icon" />
            <span>+91 9876543210</span>
          </div>
          <div className="contact-item">
            <MdEmail className="contact-icon" />
            <span>ramadairyproducts@gmail.com</span>
          </div>
          <div className="contact-item">
            <MdLocationOn className="contact-icon" />
            <span>Traditional Dairy Farm, India</span>
          </div>
          
          <div className="social-section">
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="#" aria-label="Facebook" className="social-icon"><MdFacebook /></a>
              <a href="#" aria-label="Instagram" className="social-icon"><MdCameraAlt /></a>
              <a href="#" aria-label="WhatsApp" className="social-icon"><MdChat /></a>
              <a href="#" aria-label="YouTube" className="social-icon"><MdPlayArrow /></a>
            </div>
            <p className="social-text">Stay connected for updates and offers</p>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>© 2025 Rama Dairy Products. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#privacy-policy">Privacy Policy</a>
            <span className="separator">|</span>
            <a href="#terms-service">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
