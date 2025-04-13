import React from 'react';

const ProductDescriptionPage = () => {
  const product = {
    title: 'Apple MacBook Pro 13-inch',
    description: `The Apple MacBook Pro is a powerful and elegant notebook for professionals and creatives alike. 
    Equipped with a high-resolution Retina display, long battery life, and the performance of Intel's Core i5 processor, 
    it's ideal for coding, editing, and designing. Experience smooth multitasking and a premium aluminum unibody build.`,
    highlights: [
      '13-inch Retina Display',
      'Intel Core i5 Processor',
      '8GB RAM, 512GB SSD',
      'Intel Iris Graphics 6100',
      'Backlit Keyboard',
      'macOS Operating System'
    ]
  };

  return (
    <div style={{ padding: 30, maxWidth: 900, margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: 10 }}>{product.title}</h2>

      <p style={{ fontSize: 16, color: '#444', lineHeight: 1.6, marginBottom: 20 }}>
        {product.description}
      </p>

      <h3 style={{ fontSize: 18, marginBottom: 10 }}>Key Highlights</h3>
      <ul style={{ paddingLeft: 20 }}>
        {product.highlights.map((point, index) => (
          <li key={index} style={{ marginBottom: 8, fontSize: 15 }}>
            ✅ {point}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDescriptionPage;
