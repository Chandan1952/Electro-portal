import React, { useEffect, useState } from 'react';

const Ads = () => {
  const [adsData, setAdsData] = useState([]);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/ads');
        const data = await res.json();
        setAdsData(data);
      } catch (err) {
        console.error('Failed to fetch ads:', err);
      }
    };

    fetchAds();
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      padding: '20px',
      background: '#f9f9f9',
      flexWrap: 'wrap'
    }}>
      {adsData.map((ad, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#fff',
            padding: '10px 20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
            minWidth: '300px',
            maxWidth: '350px'
          }}
        >
          <img
            src={`http://localhost:5000${ad.img}`}
            alt={`Banner ${index + 1}`}
            onError={(e) => (e.target.src = 'https://via.placeholder.com/100')}
            style={{ width: '100px', height: 'auto', marginRight: '15px' }}
          />
          <div>
            <h4 style={{ fontSize: '16px', marginBottom: '5px' }}>{ad.heading}</h4>
            <p style={{ color: '#f3b700', fontWeight: 'bold', margin: 0 }}>{ad.sub} ➤</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Ads;
