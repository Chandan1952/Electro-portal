import ProductCard from "./Product";

const ProductGrid = () => {
  const products = [
    {
      category: "Bluetooth Speakers",
      title: "Tablet Thin EliteBook Revolve",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "1347.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Tablet Thin EliteBook Revolve",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "1347.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Wireless Audio System Multiroom",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "69.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Smartphone 6S 32GB LTE",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "799.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Tablet Thin EliteBook Revolve",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "1347.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Tablet Thin EliteBook Revolve",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "1347.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Tablet Thin EliteBook Revolve",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "1347.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Wireless Audio System Multiroom",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "69.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Smartphone 6S 32GB LTE",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "799.00",
    },
    {
      category: "Bluetooth Speakers",
      title: "Tablet Thin EliteBook Revolve",
      image: "https://electro.madrasthemes.com/wp-content/uploads/2021/11/prodcut6-300x300.png",
      price: "1347.00",
    },
  ];

  const styles = {
    section: {
      padding: "2rem 1rem",
      flex: 1,
    },
    heading: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#1f2937",
      borderBottom: "3px solid #facc15",
      display: "inline-block",
      paddingBottom: "0.25rem",
      marginBottom: "1.5rem",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
      gap: "1.5rem",
    },
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.heading}>Value of the Day</h2>
      <div style={styles.grid}>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
