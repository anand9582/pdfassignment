import React, { useState } from 'react';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import './FAQSection.css';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqs = [
    {
      question: "How long does delivery take?",
      answer: "We deliver fresh dairy products within 2-4 hours of milking. Local deliveries arrive same day, while outstation orders take 1-2 days with proper refrigeration."
    },
    {
      question: "What is your refund policy?",
      answer: "We offer 100% refund if products arrive damaged or spoiled. For quality issues, we provide replacement or full refund within 24 hours. Contact us immediately if you're not satisfied."
    },
    {
      question: "How should I store dairy products?",
      answer: "Store milk and dairy products at 2-4°C (35-39°F). Keep them in the coldest part of your refrigerator. Consume within 5-7 days for best freshness. Never freeze milk as it affects taste and texture."
    },
    {
      question: "Do you deliver on weekends and holidays?",
      answer: "Yes! We deliver 7 days a week, including weekends and most holidays. Our delivery team works year-round to ensure you never run out of fresh dairy products."
    },
    {
      question: "What if I'm not home during delivery?",
      answer: "We'll leave your order in a cool, shaded area if you're not home. For sensitive items, we'll call you to arrange a convenient delivery time. We never leave products in direct sunlight."
    },
    {
      question: "Can I customize my order?",
      answer: "Absolutely! You can customize quantities, delivery times, and even request specific products. We also offer subscription plans for regular customers with flexible scheduling options."
    }
  ];

  return (
    <section id="faq-policies" className="faq-policies-section">
      <div className="container">
        <div className="section-header">
          <h2 className="fade-in-slide">Frequently Asked Questions</h2>
          <p className="fade-in-slide delay-1">
            Get answers to common questions about our dairy products, delivery, and services. 
            We're here to help ensure you have the best experience with our products.
          </p>
        </div>

        <div className="content-container">
          {/* FAQ Section - Full Width */}
          <div className="faq-section fade-in-slide delay-2">
            <div className="faq-list">
              {faqs.map((faq, index) => (
                <div key={index} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={openFAQ === index}
                  >
                    <span>{faq.question}</span>
                    {openFAQ === index ? <MdExpandLess /> : <MdExpandMore />}
                  </button>
                  <div className={`faq-answer ${openFAQ === index ? 'open' : ''}`}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Contact */}
        <div className="quick-contact fade-in-slide delay-3">
          <div className="quick-contact-content">
            <h3>Still Have Questions?</h3>
            <p>Can't find what you're looking for? Our support team is here to help!</p>
            <div className="quick-contact-buttons">
              <a href="#contact-form" className="faq-btn-primary">Contact Support</a>
              <a href="tel:+919876543210" className="faq-btn-secondary">Call Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
