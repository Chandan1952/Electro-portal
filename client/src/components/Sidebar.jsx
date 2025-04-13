import { useState } from "react";
import { ChevronRight } from "lucide-react";

const Sidebar = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const categories = [
        {
            name: "Value of the Day",
            sub: ["Flash Deals", "Limited Offers", "Bundles"],
        },
        {
            name: "Top 100 Offers",
            sub: ["Best Sellers", "Top Discounts", "Top Rated"],
        },
        {
            name: "New Arrivals",
            sub: ["Latest Phones", "New Laptops", "Trending Gadgets"],
        },
        {
            name: "Computers & Accessories",
            sub: ["Laptops", "Monitors", "Mice & Keyboards"],
        },
        {
            name: "Cameras, Audio & Video",
            sub: ["Cameras", "Microphones", "Speakers"],
        },
        {
            name: "Mobiles & Tablets",
            sub: ["Smartphones", "Tablets", "Accessories"],
        },
        {
            name: "Movies, Music & Video Games",
            sub: ["Blu-rays", "Music CDs", "Game Consoles"],
        },
        {
            name: "Watches & Eyewear",
            sub: ["Smartwatches", "Sunglasses", "Eyeglasses"],
        },
        {
            name: "Car, Motorbike & Industrial",
            sub: ["Car Accessories", "Tools", "Parts"],
        },
        {
            name: "TV & Audio",
            sub: ["LED TVs", "Sound Systems", "Home Theater"],
        },
    ];

    return (
        <aside
            style={{
                width: "250px",
                padding: "1rem",
                backgroundColor: "#f3f4f6",
                borderRight: "1px solid #e5e7eb",
                fontFamily: "sans-serif",
                position: "relative",
            }}
        >
            <h3
                style={{
                    fontWeight: "bold",
                    marginBottom: "1rem",
                    fontSize: "18px",
                    color: "#111827",
                }}
            >
                Assortment
            </h3>

            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {categories.map((cat, i) => (
                    <li
                        key={i}
                        style={{ marginBottom: "0.3rem", position: "relative" }}
                        onMouseEnter={() => setHoveredIndex(i)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <div
                            style={{
                                padding: "0.6rem 0.8rem",
                                backgroundColor: hoveredIndex === i ? "#e5e7eb" : "transparent",
                                borderRadius: "6px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                color: "#1f2937",
                                cursor: "pointer",
                                transition: "all 0.25s ease",
                            }}
                        >
                            {cat.name}
                            {cat.sub && <ChevronRight size={16} color="#6b7280" />}
                        </div>

                        {/* Subcategory Dropdown */}
                        {hoveredIndex === i && (
                            <ul
                                style={{
                                    listStyle: "none", // 🔥 This removes the dots
                                    position: "absolute",
                                    top: 0,
                                    left: "100%",
                                    marginLeft: "8px",
                                    background: "#ffffff",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    padding: "0.75rem 0",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                                    zIndex: 10,
                                    minWidth: "200px",
                                }}
                            >
                                <li
                                    style={{
                                        padding: "0.5rem 1rem",
                                        fontWeight: "bold",
                                        color: "#111827",
                                        borderBottom: "1px solid #e5e7eb",
                                        marginBottom: "0.5rem",
                                    }}
                                >
                                    {cat.name}
                                </li>
                                {cat.sub.map((sub, idx) => (
                                    <li
                                        key={idx}
                                        style={{
                                            padding: "0.5rem 1rem",
                                            color: "#374151",
                                            cursor: "pointer",
                                            transition: "background-color 0.2s ease",
                                            whiteSpace: "nowrap",
                                            borderRadius: "4px",
                                        }}
                                        onClick={() => alert(`Clicked on ${sub}`)}
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.backgroundColor = "#f3f4f6")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.backgroundColor = "transparent")
                                        }
                                    >
                                        {sub}
                                    </li>
                                ))}
                            </ul>
                        )}

                    </li>
                ))}
            </ul>
        </aside>
    );
};

export default Sidebar;
