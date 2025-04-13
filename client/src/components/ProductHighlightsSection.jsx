import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const ProductList = ({ title, items }) => (
  <div style={{ padding: '16px', width: '100%', maxWidth: '33%', boxSizing: 'border-box' }}>
    <h2 style={{ fontSize: '20px', fontWeight: '600', borderBottom: '2px solid #facc15', marginBottom: '16px' }}>{title}</h2>
    {(items || []).map((item, index) => (
      <Link to={`/product/${item._id}`} key={index} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div
        key={index}
        style={{
          marginBottom: '16px',
          border: '1px solid #e5e7eb',
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        {item.img && (
          <img
src={`https://electro-portal-backend.onrender.com/${item.img}`}
            alt={item.name}
            style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
          />
        )}
        <div>
          <p style={{ fontWeight: '500', margin: 0 }}>{item.name}</p>
          {item.rating && (
            <p style={{ color: '#facc15', margin: '4px 0' }}>{'★'.repeat(Math.floor(item.rating))}</p>
          )}
          <p style={{ fontSize: '18px', color: '#1f2937', margin: 0 }}>${item.price}</p>
          {item.oldPrice && (
            <p
              style={{
                textDecoration: 'line-through',
                color: '#9ca3af',
                fontSize: '14px',
                margin: 0,
              }}
            >
              ${item.oldPrice}
            </p>
          )}
        </div>
      </div>
      </Link>

    ))}
  </div>
);

const SidebarAds = () => (
  <div style={{ width: '100%', maxWidth: '250px', padding: '16px', boxSizing: 'border-box' }}>
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '16px',
        marginBottom: '16px',
        backgroundColor: '#f9fafb',
      }}
    >
      <img
        src="https://electro.madrasthemes.com/wp-content/uploads/2019/04/footer-widget-img-01.jpg"
        alt="Ad 1"
        style={{ width: '100%', borderRadius: '8px' }}
      />
    </div>
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        padding: '16px',
        backgroundColor: '#f9fafb',
      }}
    >
      <img
        src="https://electro.madrasthemes.com/wp-content/uploads/2016/02/shop-sidebar-ad-banner.jpg"
        alt="Ad 2"
        style={{ width: '100%', borderRadius: '8px' }}
      />
    </div>
  </div>
);

const ElectroHome = () => {
  const [products, setProducts] = useState({ featured: [], topSelling: [], onSale: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://electro-portal-backend.onrender.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched products:', data);
        setProducts({
          featured: data.featured || [],
          topSelling: data.topSelling || [],
          onSale: data.onSale || [],
        });
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', padding: '24px', boxSizing: 'border-box' }}>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', flex: '1' }}>
            <ProductList title="Featured Products" items={products.featured} />
            <ProductList title="Top Selling Products" items={products.topSelling} />
            <ProductList title="On-sale Products" items={products.onSale} />
          </div>
          <SidebarAds />
        </div>
      )}
    </div>
  );
};

export default ElectroHome;
