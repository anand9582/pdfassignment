import React from 'react';
import './Home.css';
import HeroSection from '../components/HeroSection';
import USPSection from '../components/USPSection';
import MissionVision from '../components/MissionVision';
import FeaturedProducts from '../components/FeaturedProducts';
import AboutSnippet from '../components/AboutSnippet';
import TestimonialsSlider from '../components/TestimonialsSlider';
import FAQSection from '../components/FAQSection';
import ContactForm from '../components/ContactForm';

function Home({ scrollToSection, animateCart }) {
  return (
    <div className="home">
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
      
      {/* FAQ & Policies Section */}
      <FAQSection />
      
      {/* Contact Form Section */}
      <ContactForm />
    </div>
  );
}

export default Home;

