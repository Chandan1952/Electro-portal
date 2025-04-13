import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './Product';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Featured');
  const [allProducts, setAllProducts] = useState({
    Featured: [],
    'On Sale': [],
    'Top Rated': []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://electro-portal-backend.onrender.com/api/products');
        const data = await res.json();

        // Group by category
        const grouped = {
          Featured: [],
          'On Sale': [],
          'Top Rated': []
        };

        data.forEach((product) => {
          if (grouped[product.category]) {
            grouped[product.category].push(product);
          }
        });

        setAllProducts(grouped);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const products = allProducts[activeTab] || [];

  return (
    <div style={{ display: 'flex', gap: '30px', padding: '20px', background: '#f9f9f9' }}>

      {/* Left side - Special Offer */}
      <div
        style={{
          flex: '0 0 250px',
          background: '#fff',
          padding: '15px',
          border: '2px solid gold',
          borderRadius: '8px',
          textAlign: 'center',
          alignSelf: 'flex-start'
        }}
      >
        <h3 style={{ marginBottom: '15px' }}>Special Offer</h3>
        <img
          src="https://electro.madrasthemes.com/wp-content/uploads/2016/03/consal-300x300.png"
          alt="Special Offer"
          style={{ maxWidth: '100%', marginBottom: '10px' }}
        />
        <p style={{ color: '#007bff', fontWeight: 'bold', fontSize: '14px' }}>
          Game Console Controller + USB 3.0 Cable
        </p>
      </div>

      {/* Right side - Tabs + Products */}
      <div style={{ flex: 1 }}>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '10px', cursor: 'pointer' }}>
          {['Featured', 'On Sale', 'Top Rated'].map(tab => (
            <h4
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                borderBottom: activeTab === tab ? '2px solid gold' : 'none',
                color: activeTab === tab ? '#000' : '#999'
              }}
            >
              {tab}
            </h4>
          ))}
        </div>

        {/* Loading or Product Grid */}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {products.slice(0, 6).map((product) => (
              <div key={product._id} style={{ flex: '0 0 calc(33.33% - 14px)' }}>
                <Link to={`/product/${product._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <ProductCard
                    productCategoryName={product.productCategoryName}
                    title={product.title}
                    price={product.price}
                    originalPrice={product.originalPrice}
                    image={`https://electro-portal-backend.onrender.com/${product.imageUrl}`}
                  />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tabs;
