import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className="home">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Dairy Farm</h1>
          <p>Fresh, organic dairy products from our family farm</p>
          <Link to="/products" className="btn btn-primary">
            View Our Products
          </Link>
        </div>
      </div>
      
      <div className="features">
        <div className="container">
          <h2>Why Choose Our Dairy?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🥛</div>
              <h3>Fresh Daily</h3>
              <p>Our products are collected and processed fresh every day</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🌱</div>
              <h3>Organic</h3>
              <p>100% organic and natural farming practices</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🏠</div>
              <h3>Family Owned</h3>
              <p>Three generations of dairy farming expertise</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

