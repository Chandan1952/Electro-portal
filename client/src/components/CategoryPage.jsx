import React, { useState } from "react";

const CategoryPage = () => {
  const categories = [
    "All",
    "Accessories",
    "Cameras & Photography",
    "Computer Components",
    "Gadgets",
    "Headphones",
    "Home Entertainment",
    "Home Theatre",
    "Laptops & Computers",
    "Printers & Ink",
    "Smart Phones & Tablets",
    "Speakers",
    "Stereo",
    "TV & Audio",
    "Video Games & Consoles",
  ];

  const products = [
    { id: 1, name: "Notebook Widescreen", category: "Speakers", price: 159.0 },
    { id: 2, name: "Smartphone 6S 32GB LTE", category: "Smart Phones & Tablets", price: 799.0 },
    { id: 3, name: "Tablet Thin EliteBook Revolve", category: "Speakers", price: 1347.0 },
    { id: 4, name: "Wireless Audio System Multiroom", category: "Speakers", price: 69.0 },
    { id: 5, name: "Pendrive USB 3.0 Flash 64 GB", category: "Accessories", price: 110.0 },
  ];

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          borderRight: "1px solid #e5e7eb",
          paddingRight: "20px",
        }}
      >
        <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}>
          Show All Categories
        </h3>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {categories.map((cat) => (
            <li
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: "8px 0",
                cursor: "pointer",
                color: selectedCategory === cat ? "#2563eb" : "#111827",
                fontWeight: selectedCategory === cat ? "bold" : "normal",
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, paddingLeft: "20px" }}>
        {/* Breadcrumb */}
        <nav style={{ fontSize: "14px", color: "#6b7280", marginBottom: "8px" }}>
          Home /{" "}
          <span style={{ color: "#111" }}>
            {selectedCategory === "All" ? "All Products" : selectedCategory}
          </span>
        </nav>

        {/* Category Heading */}
        <h2 style={{ fontSize: "24px", marginBottom: "20px", color: "#111" }}>
          {selectedCategory === "All" ? "All Products" : selectedCategory}
        </h2>

        {/* Products Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                  padding: "16px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontWeight: "bold", marginBottom: "8px", color: "#2563eb" }}>
                  {product.name}
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280" }}>{product.category}</div>
                <div style={{ fontSize: "16px", marginTop: "12px", fontWeight: "600" }}>
                  ${product.price.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default CategoryPage;

