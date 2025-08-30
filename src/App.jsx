import React, { useState, useRef } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import USPSection from './components/USPSection';
import MissionVision from './components/MissionVision';
import FeaturedProducts from './components/FeaturedProducts';
import AboutSnippet from './components/AboutSnippet';
import TestimonialsSlider from './components/TestimonialsSlider';
import Footer from './components/Footer';

const App = () => {
  const [cartItems, setCartItems] = useState(0);
  const [isCartAnimating, setIsCartAnimating] = useState(false);
  const cartIconRef = useRef(null);

  // Handle scroll to sections
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
      
      {/* Hero Section */}
      <HeroSection scrollToSection={scrollToSection} />
      
      {/* Why Choose Us Section */}
      <USPSection />
      
      {/* Mission & Vision Section */}
      <MissionVision />
      
      {/* Featured Products Section */}
      <FeaturedProducts animateCart={animateCart} />
      
      {/* About Snippet Section */}
      <AboutSnippet />
      
      {/* Testimonials Section */}
      <TestimonialsSlider />
      
      {/* Footer */}
      <Footer scrollToSection={scrollToSection} />
    </div>
  );
};

export default App;