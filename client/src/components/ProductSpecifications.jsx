import React from 'react';

const ProductSpecifications = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>
        Technical Specifications
      </h3>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        border: '1px solid #ddd',
        backgroundColor: '#fafafa'
      }}>
        <tbody>
          {[
            ['Brand', 'Apple'],
            ['Item Height', '18 Millimeters'],
            ['Item Width', '31.4 Centimeters'],
            ['Screen Size', '13 Inches'],
            ['Item Weight', '1.6 Kg'],
            ['Product Dimensions', '21.9 x 31.4 x 1.8 cm'],
            ['Item model number', 'MF841HN/A'],
            ['Processor Brand', 'Intel'],
            ['Processor Type', 'Core i5'],
            ['Processor Speed', '2.9 GHz'],
            ['RAM Size', '8 GB'],
            ['Hard Drive Size', '512 GB'],
          ].map(([label, value], index) => (
            <tr
              key={index}
              style={{
                borderBottom: '1px solid #ddd',
                backgroundColor: index % 2 === 0 ? '#fff' : '#f7f7f7'
              }}
            >
              <td style={{ padding: '10px', fontWeight: 'bold', width: '40%' }}>
                {label}
              </td>
              <td style={{ padding: '10px' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecifications;
