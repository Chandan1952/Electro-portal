const PromoCard = ({ image }) => {
    const styles = {
      card: {
        borderRadius: "12px",
        overflow: "hidden",
        flex: "1 1 250px",
        minHeight: "120px",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      },
      image: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      },
    };
  
    return (
      <div
        style={styles.card}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <img src={image} alt="promo" style={styles.image} />
      </div>
    );
  };
  
  export default PromoCard;
  