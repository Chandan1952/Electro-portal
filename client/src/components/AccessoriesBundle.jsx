import React, { useEffect, useState } from "react";

const AccessoriesBundle = () => {
  const [mainProduct, setMainProduct] = useState(null);
  const [accessories, setAccessories] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://electro-portal-backend.onrender.com/api/products");
        const data = await res.json();

        // Get 1 Featured product
        const featured = data.filter((p) => p.category === "Featured");
        const main = featured[0];

        // Get 2 accessories from On Sale or Top Rated
        const accessories = data
          .filter((p) => p.category === "On Sale" || p.category === "Top Rated")
          .slice(0, 2);

        setMainProduct(main);
        setAccessories(accessories);
        setSelectedIds(accessories.map((item) => item._id));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching products:", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  if (loading) return <p>Loading accessories bundle...</p>;
  if (!mainProduct || accessories.length < 2)
    return <p>Not enough products to create a bundle.</p>;

  const selectedAccessories = accessories.filter((item) =>
    selectedIds.includes(item._id)
  );

  const totalPrice =
    mainProduct.price +
    selectedAccessories.reduce((acc, item) => acc + item.price, 0);

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ marginBottom: 20 }}>Accessories</h2>
      <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
        {/* Main Product */}
        <div style={{ textAlign: "center" }}>
          <img
            src={`https://electro-portal-backend.onrender.com/${mainProduct.imageUrl}`}
            alt={mainProduct.title}
            style={{ width: 120, marginBottom: 10 }}
          />
          <p style={{ fontSize: 14 }}>{mainProduct.title}</p>
          <strong>${mainProduct.price.toFixed(2)}</strong>
        </div>

        {/* Plus sign */}
        <span style={{ fontSize: 24, fontWeight: "bold" }}>+</span>

        {/* Accessories */}
        {accessories.map((acc) => (
          <React.Fragment key={acc._id}>
            <div style={{ textAlign: "center" }}>
              <img
                src={`https://electro-portal-backend.onrender.com/${acc.imageUrl}`}
                alt={acc.title}
                style={{ width: 120, marginBottom: 10 }}
              />
              <p style={{ fontSize: 14 }}>{acc.title}</p>
              <strong>${acc.price.toFixed(2)}</strong>
            </div>
            {acc !== accessories[accessories.length - 1] && (
              <span style={{ fontSize: 24, fontWeight: "bold" }}>+</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Options */}
      <div style={{ marginTop: 20 }}>
        <p>
          <strong>This product:</strong> {mainProduct.title} -{" "}
          <span style={{ color: "red" }}>${mainProduct.price.toFixed(2)}</span>
        </p>
        {accessories.map((acc) => (
          <p key={acc._id}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(acc._id)}
                onChange={() => toggleSelect(acc._id)}
              />{" "}
              <span style={{ color: "blue", textDecoration: "underline" }}>
                {acc.title}
              </span>{" "}
              - <span style={{ color: "red" }}>${acc.price.toFixed(2)}</span>
            </label>
          </p>
        ))}
      </div>

      {/* Total */}
      <div
        style={{
          marginTop: 30,
          fontSize: 20,
          fontWeight: "bold",
          color: "red"
        }}
      >
        ${totalPrice.toFixed(2)}{" "}
        <span style={{ fontSize: 14, color: "#666" }}>
          for {1 + selectedIds.length} item(s)
        </span>
      </div>
      <button
        style={{
          marginTop: 15,
          padding: "10px 20px",
          border: "none",
          borderRadius: 20,
          background: "#ddd",
          fontWeight: "bold",
          cursor: "pointer"
        }}
      >
        Add all to cart
      </button>
    </div>
  );
};

export default AccessoriesBundle;
