import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MoreProducts = () => {
  const [allProducts, setAllProducts] = useState({
    Featured: [],
    "On Sale": [],
    "Top Rated": []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/products");
        const data = await res.json();

        const grouped = {
          Featured: [],
          "On Sale": [],
          "Top Rated": []
        };

        data.forEach((product) => {
          if (grouped[product.category]) {
            grouped[product.category].push(product);
          }
        });

        setAllProducts(grouped);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const mergedProducts = [
    ...allProducts.Featured,
    ...allProducts["On Sale"],
    ...allProducts["Top Rated"]
  ].slice(0, 8);

  if (loading) return <p>Loading more products...</p>;

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ marginBottom: 20 }}>More Products</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 30
        }}
      >
        {mergedProducts.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <div
              style={{
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 10,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                position: "relative",
                background: "#fff",
                transition: "transform 0.2s ease-in-out",
                cursor: "pointer"
              }}
            >
              <img
                src={`http://localhost:5000/${product.imageUrl}`}
                alt={product.title}
                style={{
                  width: "100%",
                  height: 200,
                  objectFit: "contain",
                  marginBottom: 10
                }}
              />
              <p style={{ color: "#999", fontSize: 12, marginBottom: 5 }}>
                {product.productCategoryName}
              </p>
              <h4 style={{ fontSize: 14, marginBottom: 8 }}>{product.title}</h4>
              <div style={{ fontSize: 16, fontWeight: "bold", color: "#c00" }}>
                ${product.price.toFixed(2)}
                {product.originalPrice && (
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: "normal",
                      color: "#888",
                      textDecoration: "line-through",
                      marginLeft: 5
                    }}
                  >
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  fontSize: 20,
                  color: "#ccc"
                }}
              >
                🛒
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MoreProducts;
