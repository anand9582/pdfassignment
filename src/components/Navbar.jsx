import React, { useState, useEffect } from 'react';
import Logo from './Logo';

const Navbar = ({ cartItems, scrollToSection, cartIconRef, isCartAnimating }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    closeMobileMenu();
  };

  return (
    <>
      <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          {/* Logo */}
          <div className="nav-logo">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <nav className="nav-menu desktop-menu">
            <a href="#home" onClick={() => handleNavClick('home')}>Home</a>
            <a href="#products" onClick={() => handleNavClick('products')}>Products</a>
            <a href="#about" onClick={() => handleNavClick('about')}>About Us</a>
            <a href="#reviews" onClick={() => handleNavClick('reviews')}>Reviews</a>
            <a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a>
          </nav>

          {/* Utility Icons */}
          <div className="nav-utilities">
            <button className="nav-icon-btn" aria-label="Search">
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </button>
            <button className="nav-icon-btn" aria-label="User Account">
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <div className={`nav-cart ${isCartAnimating ? 'animate' : ''}`} ref={cartIconRef}>
              <svg className="nav-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItems > 0 && <span className="cart-count">{cartItems}</span>}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Menu */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <Logo />
          <button className="close-btn" onClick={closeMobileMenu} aria-label="Close menu">
            <span>×</span>
          </button>
        </div>
        
        <nav className="sidebar-menu">
          <a href="#home" onClick={() => handleNavClick('home')}>Home</a>
          <a href="#products" onClick={() => handleNavClick('products')}>Products</a>
          <a href="#about" onClick={() => handleNavClick('about')}>About Us</a>
          <a href="#reviews" onClick={() => handleNavClick('reviews')}>Reviews</a>
          <a href="#contact" onClick={() => handleNavClick('contact')}>Contact</a>
        </nav>

        <div className="sidebar-utilities">
          <button className="sidebar-icon-btn" aria-label="Search">
            <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <span>Search</span>
          </button>
          <button className="sidebar-icon-btn" aria-label="User Account">
            <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span>Account</span>
          </button>
          <div className="sidebar-cart">
            <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Cart ({cartItems})</span>
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  );
};

export default Navbar;