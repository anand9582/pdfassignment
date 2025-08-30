import React from 'react';
import jar from "../assets/dairy.jpeg"

const FeaturedProducts = ({ animateCart }) => {
  const products = [
    {
      id: 1,
      name: 'Desi Ghee',
      size: '500ml',
      price: '₹599',
      image:  jar,
      desc: 'Authentic homemade ghee from grass-fed cows'
    },
    {
      id: 2,
      name: 'Desi Ghee',
      size: '1L',
      price: '₹1099',
      image: jar,
      desc: 'Pure traditional ghee with rich aroma and taste'
    }
  ];

  return (
    <section id="products" className="featured-products">
      <h2>Our Premium Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
              <div className={`jar`}>
                <img className='product-image' src={product.image} alt={product.name} />
              </div>
            <div className="product-info">
              <h3>{product.name} - {product.size}</h3>
              <p>{product.desc}</p>
              <div className="product-price">{product.price}</div>
              <button 
                className="btn-view-details"
                onClick={animateCart}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;