import React, { useState, useEffect } from 'react';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch('https://electro-portal-backend.onrender.com/api/banners');
        const data = await response.json();
        setBanners(data);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
      }
    };

    fetchBanners();
    setIsVisible(true);

    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);

    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => {
      clearInterval(slideInterval);
      window.removeEventListener('resize', handleResize);
    };
  }, [banners.length]);

  if (banners.length === 0) return null;

  const {
    smallHeading,
    mainHeading,
    discount,
    imageSrc,
    buttonText,
  } = banners[currentSlide];

  const styles = {
    container: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '30px 20px' : '60px 80px',
      background: 'linear-gradient(to right, #fefce8, #fef9c3)',
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
      maxWidth: '1200px',
      margin: '0px auto',
      borderRadius: '16px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
      gap: isMobile ? '30px' : '40px',
    },
    textContent: {
      flex: 1,
      textAlign: isMobile ? 'center' : 'left',
    },
    headingSmall: {
      color: '#0ea5e9',
      fontWeight: 600,
      marginBottom: '10px',
      fontSize: isMobile ? '14px' : '16px',
    },
    headingLarge: {
      fontSize: isMobile ? '24px' : '36px',
      fontWeight: 700,
      color: '#111827',
      lineHeight: '1.3',
      marginBottom: '16px',
    },
    discountText: {
      fontSize: isMobile ? '18px' : '22px',
      fontWeight: 500,
      color: '#374151',
    },
    button: {
      marginTop: '20px',
      padding: '12px 24px',
      backgroundColor: '#facc15',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 'bold',
      fontSize: '15px',
      cursor: 'pointer',
      transition: 'background 0.3s ease',
    },
    highlight: {
      color: '#1f2937',
    },
    imageWrapper: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: isMobile ? 'center' : 'flex-end',
    },
    phoneImage: {
      width: isMobile ? '200px' : '100%',
      height: 'auto',
      maxHeight: isMobile ? '180px' : '300px',
      objectFit: 'contain',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.textContent}>
        <div style={styles.headingSmall}>{smallHeading}</div>
        <div style={styles.headingLarge}>
          {mainHeading.split(' ').map((word, i) =>
            ['STATEMENT', 'SMARTPHONES', 'SALE'].includes(word.toUpperCase()) ? (
              <strong key={i}>{word} </strong>
            ) : (
              word + ' '
            )
          )}
        </div>
        <div style={styles.discountText}>
          {discount.split(' ').map((part, i) =>
            part.includes('%') ? (
              <span style={styles.highlight} key={i}>
                {part}{' '}
              </span>
            ) : (
              part + ' '
            )
          )}
        </div>
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#eab308')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#facc15')}
        >
          {buttonText}
        </button>
      </div>

      <div style={styles.imageWrapper}>
        <img
          style={styles.phoneImage}
          src={`https://electro-portal-backend.onrender.com${imageSrc}`}
          alt="Banner visual"
        />
      </div>
    </div>
  );
};

export default Banner;
