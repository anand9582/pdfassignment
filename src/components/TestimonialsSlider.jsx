import React, {useState, useEffect} from 'react';


const TestimonialsSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Priya S.',
      text: 'The taste of Rama ghee takes me back to my childhood. Nothing compares to its purity and aroma!',
      rating: 5
    },
    {
      id: 2,
      name: 'Rahul M.',
      text: 'As someone who values organic food, I appreciate their chemical-free process. Truly exceptional quality.',
      rating: 5
    },
    {
      id: 3,
      name: 'Anjali K.',
      text: 'Regular customer for over 2 years. Consistent quality and prompt delivery. Highly recommended!',
      rating: 4
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-slider">
        {testimonials.map((testimonial, index) => (
          <div 
            key={testimonial.id} 
            className={`testimonial ${index === currentTestimonial ? 'active' : ''}`}
          >
            <div className="stars">
              {'★'.repeat(testimonial.rating)}{'☆'.repeat(5 - testimonial.rating)}
            </div>
            <p>"{testimonial.text}"</p>
            <div className="testimonial-author">- {testimonial.name}</div>
          </div>
        ))}
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentTestimonial ? 'active' : ''}`}
            onClick={() => setCurrentTestimonial(index)}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default TestimonialsSlider;