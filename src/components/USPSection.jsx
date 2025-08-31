import React from 'react';
import './USPSection.css';

const USPSection = () => {
  const features = [
    { icon: '🥛', title: 'Fresh', desc: 'Daily delivered fresh from our farms' },
    { icon: '🌿', title: 'Pure', desc: '100% natural with no additives' },
    { icon: '🛡️', title: 'Chemical-Free', desc: 'No pesticides or artificial hormones' },
    { icon: '🏺', title: 'Traditional Process', desc: 'Time-honored methods for authentic taste' }
  ];

  return (
    <section id="usps" className="why-choose-us">
      <div className="usp-content-section">
        <div className="usp-header text-center">
          <h2>Why Choose Us</h2>
        </div>
        <div className="usp-grid">
          {features.map((feature, index) => (
            <div key={index} className="usp-card">
              <div className="usp-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <div className="usp-accent"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USPSection;