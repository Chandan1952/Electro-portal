import React from 'react';
// import Header from './Header';
import HeroSection from './HeroSection';
// import Sidebar from './Sidebar';
// import ProductGrid from './ProductGrid';
import MainBanner from './MainBanner';
import ProductHighlightsSection from './ProductHighlightsSection';
import ElectroFooterPage from './ElectroFooterPage';
import Ads from './Ads';
import Tabs from './Tabs';
import ElectroHeader from './ElectroHeader';

export default function Home() {
  return (
    <div>
      {/* <Header /> */}
      <ElectroHeader />
      <HeroSection />
      <Ads></Ads>
      <Tabs></Tabs>

      {/* <div style={{ display: 'flex', padding: '1.5rem' }}> */}
        {/* Sidebar */}
        {/* <div style={{ width: '250px', marginRight: '1.5rem' }}>
          <Sidebar />
        </div> */}

        {/* Product Grid */}
        {/* <div style={{ flexGrow: 1 }}>
          <ProductGrid />
        </div>
      </div> */}
    <MainBanner></MainBanner>
    <ProductHighlightsSection></ProductHighlightsSection>
    <ElectroFooterPage></ElectroFooterPage>
    </div>
  );
}
