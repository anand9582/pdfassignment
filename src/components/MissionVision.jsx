import React, { useEffect, useRef } from 'react';

const MissionVision = () => {
  const missionRef = useRef(null);
  const visionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      },
      { threshold: 0.3 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (visionRef.current) observer.observe(visionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section id="mission-vision" className="mission-vision">
      <div className="container">
        <h2>Our Mission & Vision</h2>
        <div className="mission-vision-grid">
          <div ref={missionRef} className="mission-card">
            <div className="card-header">
              <div className="icon-container">
                <span className="mission-icon">🎯</span>
              </div>
              <h3>Our Mission</h3>
            </div>
            <div className="card-content">
              <p>
                At Rama Dairy Products, our mission is to provide families with fresh, 
                chemical-free dairy products made using traditional methods and sourced 
                directly from local farms. We are committed to upholding purity, supporting 
                rural farmers, and bringing the taste of authentic, wholesome dairy to every home.
              </p>
            </div>
            <div className="card-decoration">
              <div className="milk-drop"></div>
              <div className="milk-drop"></div>
              <div className="milk-drop"></div>
            </div>
          </div>

          <div ref={visionRef} className="vision-card">
            <div className="card-header">
              <div className="icon-container">
                <span className="vision-icon">🌟</span>
              </div>
              <h3>Our Vision</h3>
            </div>
            <div className="card-content">
              <p>
                To become a trusted household name by delivering pure, traditional, and 
                wholesome dairy products straight from farm to home — nurturing health, 
                preserving heritage, and enriching lives with every drop.
              </p>
            </div>
            <div className="card-decoration">
              <div className="star"></div>
              <div className="star"></div>
              <div className="star"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
