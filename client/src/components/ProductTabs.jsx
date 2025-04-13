import React, { useState } from 'react';
import ProductSpecifications from './ProductSpecifications';
import CustomerReview from './CustomerReview';
import MoreProducts from './MoreProducts';
import AccessoriesBundle from './AccessoriesBundle';
import ProductDescriptionPage from './ProductDescriptionPage';


const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('Specification');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Accessories':
        return <AccessoriesBundle />;
      case 'Description':
        return <ProductDescriptionPage />;
      case 'Specification':
        return <ProductSpecifications />;
      case 'Reviews':
        return <CustomerReview />;
      case 'More Products':
        return <MoreProducts />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', padding: '30px', backgroundColor: '#fff' }}>

      {/* Right - Tabs + Content */}
      <div style={{ flex: 1 }}>
        {/* Tabs */}
        <div style={{ display: 'flex', gap: '30px', marginBottom: '0px' }}>
          {['Accessories', 'Description', 'Specification', 'Reviews', 'More Products'].map(tab => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                borderBottom: activeTab === tab ? '3px solid gold' : '1px solid transparent',
                paddingBottom: 8,
                color: activeTab === tab ? '#000' : '#888'
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Content */}
        <div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default ProductTabs;
