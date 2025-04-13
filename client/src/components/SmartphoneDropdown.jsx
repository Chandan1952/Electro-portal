import React from "react";

const SmartphoneDropdown = () => {
  const styles = {
    container: {
      display: "flex",
      padding: "30px 40px",
      backgroundColor: "#fff",
      boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
      borderRadius: 12,
      gap: "50px",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    column: {
      flex: 1,
      minWidth: 200,
    },
    heading: {
      fontWeight: "bold",
      fontSize: 16,
      color: "#111827",
      marginBottom: 10,
    },
    listItem: {
      color: "#374151",
      fontSize: 12,
      marginBottom: 6,
      cursor: "pointer",
    },
    imageColumn: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      gap: 20,
    },
    image: {
      width: 300,
      borderRadius: 10,
      objectFit: "cover",
    },
  };

  return (
    <>
      <style>
        {`
          .smartphone-item:hover {
            color: #2563eb;
            text-decoration: underline;
          }
        `}
      </style>

      <div style={styles.container}>
        {/* Column 1: Categories */}
        <div style={styles.column}>
          <div style={styles.heading}>Smartphone Categories</div>
          <div className="smartphone-item" style={styles.listItem}>Android Phones</div>
          <div className="smartphone-item" style={styles.listItem}>iPhones</div>
          <div className="smartphone-item" style={styles.listItem}>Gaming Phones</div>
          <div className="smartphone-item" style={styles.listItem}>Foldable Phones</div>
          <div className="smartphone-item" style={styles.listItem}>5G Phones</div>
          <div className="smartphone-item" style={styles.listItem}>Budget Phones</div>
          <div className="smartphone-item" style={styles.listItem}>Refurbished Phones</div>
          <div className="smartphone-item" style={styles.listItem}>Flagship Phones</div>
        </div>

        {/* Column 2: Shop by Brand */}
        <div style={styles.column}>
          <div style={styles.heading}>Shop by Brand</div>
          <div className="smartphone-item" style={styles.listItem}>Apple</div>
          <div className="smartphone-item" style={styles.listItem}>Samsung</div>
          <div className="smartphone-item" style={styles.listItem}>OnePlus</div>
          <div className="smartphone-item" style={styles.listItem}>Google Pixel</div>
          <div className="smartphone-item" style={styles.listItem}>Xiaomi</div>
          <div className="smartphone-item" style={styles.listItem}>Realme</div>
          <div className="smartphone-item" style={styles.listItem}>Motorola</div>
          <div className="smartphone-item" style={styles.listItem}>Asus</div>
          <div className="smartphone-item" style={styles.listItem}>Infinix</div>
          <div className="smartphone-item" style={styles.listItem}>Tecno</div>
        </div>

        {/* Column 3: Shop by Price */}
        <div style={styles.column}>
          <div style={styles.heading}>Shop by Price</div>
          <div className="smartphone-item" style={styles.listItem}>Under $100</div>
          <div className="smartphone-item" style={styles.listItem}>$101 - $199</div>
          <div className="smartphone-item" style={styles.listItem}>$200 - $299</div>
          <div className="smartphone-item" style={styles.listItem}>$300 - $399</div>
          <div className="smartphone-item" style={styles.listItem}>$400 - $499</div>
          <div className="smartphone-item" style={styles.listItem}>$500 - $599</div>
          <div className="smartphone-item" style={styles.listItem}>$600 and Above</div>

          <div style={{ ...styles.heading, marginTop: 20 }}>Other Options</div>
          <div className="smartphone-item" style={styles.listItem}>With Wireless Charging</div>
          <div className="smartphone-item" style={styles.listItem}>Water Resistant Phones</div>
          <div className="smartphone-item" style={styles.listItem}>Phones with Fast Charging</div>
          <div className="smartphone-item" style={styles.listItem}>High Refresh Rate Display</div>
        </div>

        {/* Column 4: Images */}
        <div style={styles.imageColumn}>
          <img
            src="https://electro.madrasthemes.com/wp-content/uploads/2021/03/main_photo_-_crystal_2048x2048-1024x10241-1.png"
            alt="Smartphone Banner"
            style={styles.image}
          />
          
        </div>
      </div>
    </>
  );
};

export default SmartphoneDropdown;
