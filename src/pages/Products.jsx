import React from 'react'
import './Products.css'

function Products() {
  const products = [
    {
      id: 1,
      name: 'Fresh Milk',
      description: 'Pure, organic whole milk from our grass-fed cows',
      price: '$4.99',
      image: '🥛'
    },
    {
      id: 2,
      name: 'Greek Yogurt',
      description: 'Creamy, protein-rich yogurt made with traditional methods',
      price: '$5.99',
      image: '🍶'
    },
    {
      id: 3,
      name: 'Butter',
      description: 'Rich, creamy butter churned from fresh cream',
      price: '$6.99',
      image: '🧈'
    },
    {
      id: 4,
      name: 'Cheese',
      description: 'Aged cheddar cheese with rich, sharp flavor',
      price: '$8.99',
      image: '🧀'
    },
    {
      id: 5,
      name: 'Cream',
      description: 'Heavy whipping cream perfect for cooking and baking',
      price: '$3.99',
      image: '🥛'
    },
    {
      id: 6,
      name: 'Ice Cream',
      description: 'Homemade vanilla ice cream with real vanilla beans',
      price: '$7.99',
      image: '🍦'
    }
  ]

  return (
    <div className="products">
      <div className="container">
        <h1>Our Dairy Products</h1>
        <p className="products-intro">
          Discover our range of fresh, organic dairy products made with care and tradition.
        </p>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">{product.image}</div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-price">{product.price}</div>
                <button className="btn">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Products

