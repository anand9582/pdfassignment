import React from 'react'
import './About.css'

function About() {
  return (
    <div className="about">
      <div className="container">
        <h1>About Our Dairy Farm</h1>
        
        <div className="about-content">
          <div className="about-section">
            <h2>Our Story</h2>
            <p>
              Founded in 1985, our family dairy farm has been producing high-quality dairy products 
              for over three generations. What started as a small family operation has grown into a 
              respected name in organic dairy farming, while maintaining the same values and commitment 
              to quality that our grandparents established.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              We are committed to providing the freshest, most nutritious dairy products while 
              maintaining the highest standards of animal welfare and environmental sustainability. 
              Our cows are treated with care and respect, grazing on organic pastures and producing 
              milk that's rich in flavor and nutrients.
            </p>
          </div>
          
          <div className="about-section">
            <h2>Our Values</h2>
            <div className="values-grid">
              <div className="value">
                <h3>Quality</h3>
                <p>We never compromise on the quality of our products or the care of our animals.</p>
              </div>
              <div className="value">
                <h3>Sustainability</h3>
                <p>We practice sustainable farming methods that protect our environment for future generations.</p>
              </div>
              <div className="value">
                <h3>Community</h3>
                <p>We're proud to be part of our local community and support local businesses.</p>
              </div>
            </div>
          </div>
          
          <div className="about-section">
            <h2>Our Team</h2>
            <p>
              Our farm is run by a dedicated team of family members and local workers who share 
              our passion for dairy farming. Each team member brings unique skills and experience, 
              contributing to the success and growth of our operation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
