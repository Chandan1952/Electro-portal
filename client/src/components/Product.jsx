// ProductCard.js
import React from 'react';

const ProductCard = ({ productCategoryName, title, price, originalPrice, image }) => {
  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '15px',
        textAlign: 'center',
        background: '#fff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.05)';
      }}
    >
      <img
        src={image}
        alt={title}
        style={{
          width: '100%',
          height: '160px',
          objectFit: 'contain',
          borderRadius: '8px',
          marginBottom: '15px',
        }}
        onError={(e) => (e.target.src = 'https://via.placeholder.com/160')}
      />
      <p style={{ fontSize: '13px', color: '#666', margin: '0 0 5px' }}>{productCategoryName}</p>
      <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#222', marginBottom: '10px' }}>{title}</h4>
      <div>
        <span style={{ fontWeight: 'bold', fontSize: '16px', color: '#E91E63' }}>${price}</span>
        {originalPrice && (
          <span
            style={{
              textDecoration: 'line-through',
              color: '#aaa',
              marginLeft: '10px',
              fontSize: '14px',
            }}
          >
            ${originalPrice}
          </span>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
