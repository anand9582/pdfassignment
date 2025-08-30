import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';

const Logo = () => {
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`logo ${animate ? 'splash' : ''}`}>
      <div className="logo-container">
        <img src={logo} alt="Dairy Logo" className="logo-image" />
      </div>
    </div>
  );
};

export default Logo;