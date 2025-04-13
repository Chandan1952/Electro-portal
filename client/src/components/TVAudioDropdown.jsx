import React from 'react';

const TVAudioDropdown = () => {
  const style = {
    container: {
      display: 'flex',
      padding: '30px 40px',
      backgroundColor: '#fff',
      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
      borderRadius: '12px',
      gap: '40px',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      minWidth: '1000px',
      zIndex: 100,
    },
    column: {
      flex: '1',
      minWidth: '180px',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: '10px',
      fontSize: '16px',
      color: '#111827',
    },
    listItem: {
      color: '#374151',
      marginBottom: '6px',
      cursor: 'pointer',
      fontSize: '12px',
    },
    imageColumn: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: '20px',
    },
    image: {
      width: '180px',
      borderRadius: '10px',
      objectFit: 'cover',
    },
  };

  // All menu items for dynamic mapping
  const sections = [
    {
      heading: 'Televisions',
      items: ['Smart TVs', '4K TVs', 'Full HD TVs', 'Large Screen TVs', '32 inch TVs', '39-43 inch TV', '48 & Above'],
    },
    {
      heading: 'Home Audio/Video',
      items: ['Speakers', 'Home Theaters', 'Projectors', 'Headphones', 'Noise Cancelling Headphones', 'Soundbars', 'Headphones with Mic'],
    },
    {
      heading: 'Shop by Brand',
      items: ['VU', 'Mi LED Smart TVs', 'Samsung', 'Panasonic', 'TCL', 'Sanyo', 'Micromax'],
    },
    {
      heading: 'Audio Brands',
      items: ['JBL', 'Sony', 'Ultimate Ears', 'Philips', 'Portronics', 'Saregama', 'Harman Kardon'],
    },
    {
      heading: 'Other Entertainment',
      items: ['Home Theater Systems', 'Projectors & Accessories', 'Set Top Boxes', 'Streaming Media Players', 'DVD & Blu-ray Players', 'Cables', 'Audio-video Accessories'],
    },
    {
      heading: 'Shop by Price',
      items: ['Below $100', '$101 - $199', '$200 - $299', '$300 - $399', '$400 - $499', '$500 - $599', '$600 and Above'],
    },
  ];

  return (
    <>
      <style>
        {`
          .dropdown-item:hover {
            color: #2563eb;
            text-decoration: underline;
          }
        `}
      </style>
      <div style={style.container}>
        {/* Column 1 */}
        <div style={style.column}>
          <div style={style.heading}>{sections[0].heading}</div>
          {sections[0].items.map((item) => (
            <div key={item} className="dropdown-item" style={style.listItem}>{item}</div>
          ))}
          <div style={{ ...style.heading, marginTop: '20px' }}>{sections[1].heading}</div>
          {sections[1].items.map((item) => (
            <div key={item} className="dropdown-item" style={style.listItem}>{item}</div>
          ))}
        </div>

        {/* Column 2 */}
        <div style={style.column}>
          <div style={style.heading}>{sections[2].heading}</div>
          {sections[2].items.map((item) => (
            <div key={item} className="dropdown-item" style={style.listItem}>{item}</div>
          ))}
          <div style={{ ...style.heading, marginTop: '20px' }}>{sections[3].heading}</div>
          {sections[3].items.map((item) => (
            <div key={item} className="dropdown-item" style={style.listItem}>{item}</div>
          ))}
        </div>

        {/* Column 3 */}
        <div style={style.column}>
          <div style={style.heading}>{sections[4].heading}</div>
          {sections[4].items.map((item) => (
            <div key={item} className="dropdown-item" style={style.listItem}>{item}</div>
          ))}
          <div style={{ ...style.heading, marginTop: '20px' }}>{sections[5].heading}</div>
          {sections[5].items.map((item) => (
            <div key={item} className="dropdown-item" style={style.listItem}>{item}</div>
          ))}
        </div>

        {/* Column 4: Images */}
        <div style={style.imageColumn}>
          <img
            src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/megamenu-image0-1.png"
            alt="TV Promo"
            style={style.image}
          />
          <img
            src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/megamenu-image1-1.png"
            alt="Audio Promo"
            style={style.image}
          />
        </div>
      </div>
    </>
  );
};

export default TVAudioDropdown;
