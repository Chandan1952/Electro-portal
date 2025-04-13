import React, { useState } from 'react';

const products = [
  {
    category: 'Accessories, Headphone',
    title: 'Universal Headphones Case in',
    price: '$159.00',
    image: 'https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase-300x300.png'
  },
  {
    category: 'Accessories, Headphone',
    title: 'Headphones USB Wires',
    price: '$50.00',
    image: 'https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase-300x300.png'
  },
  {
    category: 'Accessories',
    title: 'Ultra Wireless S50 Headphones S50',
    price: '$350.00',
    image: 'https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase-300x300.png'
  },
  {
    category: 'Game Consoles, Video',
    title: 'Game Console Controller + USB 3.0',
    price: '$99.00',
    image: 'https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase-300x300.png'
  },
  {
    category: 'Audio Speakers, TV & Audio',
    title: 'Wireless Audio System Multiroom',
    price: '$2,299.00',
    image: 'https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase-300x300.png'
  },
  {
    category: 'Laptops, Laptops & Computers',
    title: 'Tablet White EliteBook Revolve',
    price: '$1,300.00',
    image: 'https://electro.madrasthemes.com/wp-content/uploads/2016/03/headphonecase-300x300.png'
  }
];

const RecentlyAdded = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 5;
  const totalSlides = Math.ceil(products.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };

  const getSlideItems = () => {
    const start = currentSlide * itemsPerSlide;
    return products.slice(start, start + itemsPerSlide);
  };

  return (
    <>
      <style>{`
        .recent-container {
          padding: 30px;
          background: #fff;
          font-family: 'Segoe UI', sans-serif;
        }
        .recent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .recent-title {
          font-size: 24px;
          border-bottom: 2px solid gold;
        }
        .arrow-btn {
          font-size: 20px;
          border: none;
          background: gold;
          color: #fff;
          border-radius: 50%;
          width: 35px;
          height: 35px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .arrow-btn:hover {
          background: #e0b200;
        }
        .carousel {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }
        .product-card {
          width: calc(16.66% - 17px);
          background: #fff;
          border: 1px solid #eee;
          padding: 10px;
          border-radius: 8px;
          text-align: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .product-card:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .product-card img {
          width: 100%;
          height: 160px;
          object-fit: contain;
          margin-bottom: 10px;
        }
        .product-card .category {
          font-size: 12px;
          color: #666;
          margin-bottom: 5px;
        }
        .product-card .title {
          font-size: 14px;
          font-weight: bold;
          color: #0056b3;
          margin-bottom: 5px;
          transition: color 0.3s ease;
        }
        .product-card:hover .title {
          color: #ff9800;
        }
        .product-card .price {
          font-size: 14px;
          color: #222;
        }
        .dots {
          display: flex;
          justify-content: center;
          margin-top: 15px;
        }
        .dot {
          height: 10px;
          width: 10px;
          margin: 0 5px;
          background-color: #ddd;
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
        }
        .dot.active {
          background-color: gold;
        }
      `}</style>

      <div className="recent-container">
        <div className="recent-header">
          <h2 className="recent-title">Recently Added</h2>
          <div>
            <button className="arrow-btn" onClick={prevSlide}>&lt;</button>
            <button className="arrow-btn" onClick={nextSlide} style={{ marginLeft: '10px' }}>&gt;</button>
          </div>
        </div>

        <div className="carousel">
          {getSlideItems().map((item, index) => (
            <div className="product-card" key={index}>
              <div className="category">{item.category}</div>
              <img src={item.image} alt={item.title} />
              <div className="title">{item.title}</div>
              <div className="price">{item.price}</div>
            </div>
          ))}
        </div>

        <div className="dots">
          {[...Array(totalSlides)].map((_, idx) => (
            <span
              key={idx}
              className={`dot ${idx === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default RecentlyAdded;

