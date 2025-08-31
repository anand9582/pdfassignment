import React, { useState, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  const [cartItems, setCartItems] = useState(0);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const cartIconRef = useRef(null);

  // Handle scroll to sections for footer links
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Fly to cart animation simulation
  const animateCart = () => {
    setIsCartAnimating(true);
    setTimeout(() => {
      setCartItems(prev => prev + 1);
      setIsCartAnimating(false);
    }, 800);
  };

  return (
    <div className="App">
      <Navbar 
        cartItems={cartItems} 
        scrollToSection={scrollToSection}
        cartIconRef={cartIconRef}
        isCartAnimating={isCartAnimating}
      />
      
      <Routes>
        <Route path="/" element={<Home scrollToSection={scrollToSection} animateCart={animateCart} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      
      <Footer scrollToSection={scrollToSection} />
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};

export default App;