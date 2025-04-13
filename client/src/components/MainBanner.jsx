import React from "react";

const MainBanner = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://electro.madrasthemes.com/wp-content/uploads/2022/06/two-banner-1.jpeg"
        alt="Banner 1"
        style={styles.image}
      />
      <img
        src="https://electro.madrasthemes.com/wp-content/uploads/2022/06/two-banner-2.jpeg"
        alt="Banner 2"
        style={styles.image}
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    padding: "1rem",
    width: "100%",
    boxSizing: "border-box",
    justifyContent: "center",
  },
  image: {
    flex: "1 1 45%", // 2 items in a row with space
    borderRadius: "10px",
    objectFit: "cover",
    height: "140px",
    width: "100%",
    maxWidth: "630px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  },
};

export default MainBanner;
