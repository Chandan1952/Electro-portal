import React, { useEffect, useState } from "react";

const StarRating = ({ rating }) => (
  <div style={{ color: "#ffc107" }}>
    {"★".repeat(rating)}{"☆".repeat(5 - rating)}
  </div>
);

const LatestProductsSidebar = () => {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("Loading...");

  const fetchProducts = async () => {
    try {
      const res = await fetch("https://electro-portal-backend.onrender.com/products");
      const data = await res.json();

      const mergedProducts = [
        ...(data.featured || []),
        ...(data.topSelling || []),
        ...(data.onSale || []),
      ];

      setProducts(mergedProducts);
      setStatus("");
    } catch (err) {
      console.error(err);
      setStatus("❌ Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div style={{ width: 250, padding: 20, borderRight: "1px solid #ccc" }}>
      <h3>Latest Products</h3>
      {status && <p>{status}</p>}
      {!status &&
        products.slice(0, 5).map((product, index) => (
          <div
            key={product._id || index}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 20,
              borderBottom: "1px solid #eee",
              paddingBottom: 10,
            }}
          >
            <img
              src={`https://electro-portal-backend.onrender.com/${product.img}`}
              alt={product.title}
              width={60}
              height={60}
              style={{ objectFit: "cover" }}
            />
            <div>
              <div style={{ fontWeight: "bold", fontSize: 13 }}>
                {product.name}
              </div>
              <StarRating rating={product.rating || 4} />
              <div style={{ color: "#000", fontWeight: "bold" }}>
                ${product.price}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default LatestProductsSidebar;
