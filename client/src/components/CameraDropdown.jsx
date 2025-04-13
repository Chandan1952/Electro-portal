import React from "react";

const CameraDropdown = () => {
  const styles = {
    container: {
      display: "flex",
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      gap: "50px",
      minWidth: "1000px",
      flexWrap: "nowrap",
      alignItems: "flex-start",
      zIndex: 100,
    },
    column: {
      flex: 1,
      minWidth: "180px",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 10,
      fontSize: 16,
      color: "#111827",
    },
    listItem: {
      color: "#374151",
      marginBottom: 6,
      cursor: "pointer",
      fontSize: 12,
      transition: "color 0.3s ease, text-decoration 0.3s ease",
    },
    imageColumn: {
      maxWidth: "250px",
    },
    image: {
      width: "100%",
      borderRadius: "10px",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      {/* Cameras */}
      <div style={styles.column}>
        <div style={styles.heading}>Cameras</div>
        <div className="listItem" style={styles.listItem}>DSLR Cameras</div>
        <div className="listItem" style={styles.listItem}>Digital Cameras</div>
        <div className="listItem" style={styles.listItem}>Security & Surveillance</div>
        <div className="listItem" style={styles.listItem}>Camcorders</div>
        <div className="listItem" style={styles.listItem}>Consoles</div>


        <div style={{ ...styles.heading, marginTop: 20 }}>Shop By Focal Length</div>
        <div className="listItem" style={styles.listItem}>8mm - 24mm</div>
        <div className="listItem" style={styles.listItem}>24mm - 35mm</div>
        <div className="listItem" style={styles.listItem}>35mm - 85mm</div>
        <div className="listItem" style={styles.listItem}>85mm - 135mm</div>
        <div className="listItem" style={styles.listItem}>135mm+</div>
      </div>



      {/* Shop By Price & Trending */}
      <div style={styles.column}>
        <div style={styles.heading}>Shop By Price</div>
        <div className="listItem" style={styles.listItem}>Below Rs. 100$</div>
        <div className="listItem" style={styles.listItem}>101$ - 199$</div>
        <div className="listItem" style={styles.listItem}>200$ - 299$</div>
        <div className="listItem" style={styles.listItem}>300$ - 399$</div>
        <div className="listItem" style={styles.listItem}>400$ and Above</div>

        <div style={{ ...styles.heading, marginTop: 20 }}>#Trending</div>
        <div className="listItem" style={styles.listItem}>Sony</div>
        <div className="listItem" style={styles.listItem}>Nikon</div>
        <div className="listItem" style={styles.listItem}>Canon</div>
        <div className="listItem" style={styles.listItem}>Sanyo</div>
        <div className="listItem" style={styles.listItem}>Samsung</div>
      </div>

      {/* Accessories & Brands */}
      <div style={styles.column}>
        <div style={styles.heading}>Accessories</div>
        <div className="listItem" style={styles.listItem}>Headphones</div>
        <div className="listItem" style={styles.listItem}>Mouses</div>
        <div className="listItem" style={styles.listItem}>Hardrives</div>
        <div className="listItem" style={styles.listItem}>Speakers</div>

        <div style={{ ...styles.heading, marginTop: 20 }}>Add-ons</div>
        <div className="listItem" style={styles.listItem}>Data Cables</div>
        <div className="listItem" style={styles.listItem}>Keypads</div>
        <div className="listItem" style={styles.listItem}>Earphones</div>
        <div className="listItem" style={styles.listItem}>Lenses</div>
        <div className="listItem" style={styles.listItem}>Camera Accessories</div>
      </div>

      {/* Brands */}
      <div style={styles.column}>
        <div style={styles.heading}>Shop By Brands</div>
        <div className="listItem" style={styles.listItem}>Canon</div>
        <div className="listItem" style={styles.listItem}>Nikon</div>
        <div className="listItem" style={styles.listItem}>Pentax</div>
        <div className="listItem" style={styles.listItem}>Sony</div>
        <div className="listItem" style={styles.listItem}>Apple</div>
        <div className="listItem" style={styles.listItem}>Leica</div>
        <div className="listItem" style={styles.listItem}>Samsung</div>
        <div className="listItem" style={styles.listItem}>Panasonic</div>
        <div className="listItem" style={styles.listItem}>LG</div>
        <div className="listItem" style={styles.listItem}>Oppo</div>
        <div className="listItem" style={styles.listItem}>Olympus</div>
        <div className="listItem" style={styles.listItem}>Sanyo</div>
      </div>

      {/* Featured Image */}
      <div style={styles.imageColumn}>
        <img
          src="https://electro.madrasthemes.com/wp-content/uploads/2018/04/camera.png"
          alt="Canon Camera"
          style={styles.image}
        />
      </div>

      {/* Hover Styles */}
      <style>{`
        .listItem:hover {
          color: #2563eb;
          text-decoration: underline;
        }
       
      `}</style>
    </div>
  );
};

export default CameraDropdown;
