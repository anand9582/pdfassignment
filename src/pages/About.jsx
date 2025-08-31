import React from 'react';
import './About.css';

function About() {
  return (
    <div className="about-page">
      {/* Main Banner Section */}
      <section className="about-banner">
        <div className="banner-background">
          <img 
            src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=1920&h=600&fit=crop&crop=center" 
            alt="Beautiful Dairy Farm Landscape" 
          />
          <div className="banner-overlay"></div>
        </div>
        <div className="banner-content">
          <div className="container">
            <h1 className="banner-title">About Our Dairy Farm</h1>
            <p className="banner-subtitle">Young Passion, Pure Tradition</p>
            <div className="banner-description">
              <p>Discover the story behind our commitment to organic dairy farming, sustainable practices, and delivering the highest quality products to your family.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-section">
        {/* Brand Story Section */}
        <div className="container">
          <div className="about-section brand-story">
            <div className="section-header">
              <h2>Brand Story</h2>
              <p className="section-subtitle">Young Passion, Pure Tradition</p>
            </div>
            <div className="brand-story-content">
              <div className="brand-story-text">
                <p>
                  Our journey began in 1985 when our grandfather, a passionate dairy farmer, 
                  started with just 5 cows and a dream. Today, we continue his legacy with 
                  the same dedication and love for dairy farming that he instilled in us.
                </p>
                <p>
                  What makes us unique is our blend of traditional farming wisdom with 
                  modern sustainable practices. We believe that the best dairy products 
                  come from happy, healthy cows that graze on organic pastures and are 
                  treated with the care they deserve.
                </p>
              </div>
              <div className="brand-story-image">
                <img 
                  src="https://images.unsplash.com/photo-1550583724-b2692b85b150?w=800&h=600&fit=crop&crop=center" 
                  alt="Beautiful Dairy Farm Landscape with Green Pastures" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dairy Process Section */}
      <section className="process-section">
        <div className="container">
          <div className="about-section dairy-process">
            <div className="section-header">
              <h2>Our Dairy Process</h2>
              <p className="section-subtitle">From Farm to Table</p>
            </div>
            <div className="process-timeline">
              <div className="process-step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Organic Grazing</h3>
                  <p>Our cows graze freely on organic pastures, ensuring the highest quality milk.</p>
                </div>
                <div className="step-connector"></div>
              </div>
              <div className="process-step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Gentle Milking</h3>
                  <p>We use modern, gentle milking techniques that prioritize cow comfort.</p>
                </div>
                <div className="step-connector"></div>
              </div>
              <div className="process-step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Quality Testing</h3>
                  <p>Every batch undergoes rigorous quality testing for safety and nutrition.</p>
                </div>
                <div className="step-connector"></div>
              </div>
              <div className="process-step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Fresh Delivery</h3>
                  <p>Products are delivered fresh to maintain maximum nutritional value.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founder's Story Section */}
      <section className="founder-section">
        <div className="container">
          <div className="about-section founders-story">
            <div className="section-header">
              <h2>Founder's Story</h2>
              <p className="section-subtitle">The Heart Behind Our Farm</p>
            </div>
            <div className="founder-content">
              <div className="founder-image">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face" 
                  alt="Our Founder - A Dedicated Dairy Farmer" 
                />
              </div>
              <div className="founder-text">
                <h3>Meet Our Founder</h3>
                <p>
                  Our grandfather, a third-generation farmer, started this dairy farm with 
                  nothing but determination and a deep love for the land. His philosophy was simple: 
                  "Treat your cows like family, and they'll give you the best milk."
                </p>
                <p>
                  Today, we honor his legacy by maintaining the same values and commitment 
                  to quality. His passion for dairy farming lives on in every product we produce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Started Section */}
      <section className="why-started-section">
        <div className="container">
          <div className="about-section why-started">
            <div className="section-header">
              <h2>Why We Started</h2>
              <p className="section-subtitle">Our Story of Purpose</p>
            </div>
            <div className="why-started-content">
              <div className="why-started-text">
                <h3>The Beginning</h3>
                <p>
                  We started this dairy farm because we believe that everyone deserves access 
                  to pure, wholesome dairy products. In a world where food quality is often 
                  compromised, we wanted to create something different.
                </p>
                <p>
                  Our commitment to organic farming, animal welfare, and community support 
                  drives everything we do. We're not just producing dairy products; we're 
                  building a sustainable future for our children and grandchildren.
                </p>
              </div>
              <div className="why-started-values">
                <div className="value-item">
                  <div className="value-icon">🌱</div>
                  <h4>Organic Commitment</h4>
                  <p>100% organic farming practices</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">❤️</div>
                  <h4>Animal Welfare</h4>
                  <p>Happy, healthy cows</p>
                </div>
                <div className="value-item">
                  <div className="value-icon">🌍</div>
                  <h4>Environmental Care</h4>
                  <p>Sustainable farming methods</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

