import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios'; // You must install this


import {
  Heart,
  RefreshCw,
  User,
  ShoppingCart,
  Menu,
  ChevronDown,
} from "lucide-react";

// Import dropdown components
import TVAudioDropdown from "./TVAudioDropdown";
import SmartphoneDropdown from "./SmartphoneDropdown";
import LaptopDesktopDropdown from "./LaptopDesktopDropdown";
import GadgetsDropdown from "./GadgetsDropdown";
import CameraDropdown from "./CameraDropdown";
import GPSCarDropdown from "./GPSCarDropdown";
// import MoviesGamesDropdown from "./MoviesGamesDropdown";

const ElectroHeader = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [user, setUser] = useState(null); // 👈 for logged-in user
  const [userDropdown, setUserDropdown] = useState(false);
  const [cart, setCart] = useState({ items: [], total: 0 });

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = async () => {
    try {
      const res = await fetch('https://electro-portal-backend.onrender.com/api/cart', {
        credentials: 'include',
      });
      const data = await res.json();
      const totalPrice = data.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      setCart({
        items: data.items,
        total: totalPrice,
      });
    } catch (err) {
      console.error('Error loading cart data', err);
    }
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://electro-portal-backend.onrender.com/api/user", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        setUser(null);
      }
    };
  
    fetchUser();
  
    // Refetch every 5 seconds
    const interval = setInterval(fetchUser, 5000);
  
    return () => clearInterval(interval);
  }, []);
  

  const handleLogout = async () => {
    await axios.get('https://electro-portal-backend.onrender.com/logout', { withCredentials: true });
    setUser(null);
  };

  const styles = {
    topBar: {
      backgroundColor: "#f3f4f6",
      fontSize: "14px",
      color: "#4b5563",
      padding: "8px 16px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    topBarLinks: {
      display: "flex",
      gap: "16px",
    },
    hoverLink: {
      color: "#4b5563",
      textDecoration: "none",
      cursor: "pointer",
    },
    middleBar: {
      padding: "16px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
    },
    logo: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#2563eb",
    },
    logoDot: {
      color: "#facc15",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      maxWidth: "600px",
      marginLeft: "16px",
      marginRight: "16px",
      gap: "8px",
    },
    searchBox: {
      display: "flex",
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      overflow: "hidden",
      flexGrow: 1,
    },
    input: {
      flexGrow: 1,
      padding: "8px 12px",
      border: "none",
      outline: "none",
    },
    select: {
      padding: "8px",
      border: "none",
      borderLeft: "1px solid #e5e7eb",
      outline: "none",
    },
    searchButton: {
      backgroundColor: "#facc15",
      padding: "8px 16px",
      border: "none",
      cursor: "pointer",
    },
    menuButton: {
      backgroundColor: "#facc15",
      padding: "8px",
      borderRadius: "4px",
      border: "none",
    },
    icons: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
      color: "#374151",
    },
    cartInfo: {
      display: "flex",
      alignItems: "center",
      gap: "4px",
    },
    cartBadge: {
      backgroundColor: "#facc15",
      color: "#000",
      fontSize: "12px",
      width: "20px",
      height: "20px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
    },
    nav: {
      backgroundColor: "#facc15",
      color: "#000",
      padding: "12px 16px",
      position: "relative",
    },
    navList: {
      display: "flex",
      flexWrap: "wrap",
      gap: "24px",
      fontWeight: "bold",
      fontSize: "14px",
      listStyleType: "none",
      padding: 0,
      margin: 0,
      position: "relative",
    },
    navItem: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      gap: "4px",
    },

    dropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      padding: '10px',
      borderRadius: '4px',
      minWidth: '160px',
      zIndex: 999,
    },
    
    dropdownItem: {
      padding: '8px 12px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      fontSize: '14px',
      color: '#333',
      transition: 'background 0.2s',
    },
    dropdownItemHover: {
      backgroundColor: '#f3f4f6',
    }
        
  };

  // ✅ Dropdown component map
  const renderDropdown = (key) => {
    const dropdownMap = {
      "TV & Audio": <TVAudioDropdown />,
      "Smart Phones": <SmartphoneDropdown />,
      "Laptops & Desktops": <LaptopDesktopDropdown />,
      "Gadgets": <GadgetsDropdown />,
      "GPS & Car": <GPSCarDropdown />,
      "Cameras & Accessories": <CameraDropdown />,
      // "Movies & Games": <MoviesGamesDropdown />,
    };

    return dropdownMap[key] ? (
      <div
        style={{
          position: "fixed", // changed from absolute
          top: "145px", // adjust based on header height
          left: 0,
          zIndex: 10,
          width: "100vw",
          backgroundColor: "#fff",
          margin: "0 40px",
          overflowX: "auto",
          whiteSpace: "nowrap",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <div style={{ minWidth: "1200px", display: "flex" }}>
          {dropdownMap[key]}
        </div>
      </div>
    ) : null;



  };

  return (
    <header>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <span>Welcome to Worldwide Electronics Store</span>
        <div style={styles.topBarLinks}>
          <Link to="/store-locator" style={styles.hoverLink}>Store Locator</Link>
          <Link to="/track-order" style={styles.hoverLink}>Track Your Order</Link>
          <Link to="/shop" style={styles.hoverLink}>Shop</Link>

          {user ? (
            <div
              style={{ position: "relative" }}
              onMouseEnter={() => setUserDropdown(true)}
              onMouseLeave={() => setUserDropdown(false)}
            >
              <span style={styles.hoverLink}>
                {user?.username || user?.email || "My Account"}
              </span>
              {userDropdown && (
                <div style={styles.dropdown}>
                  <Link to="/profile" style={{ ...styles.dropdownItem, textDecoration: "none", color: "#000" }}>My Account</Link>
                  <Link to="/orders" style={{ ...styles.dropdownItem, textDecoration: "none", color: "#000" }}>Orders</Link>
                  <div style={styles.dropdownItem} onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/account" style={styles.hoverLink}>Login & Register</Link>
          )}
        </div>
      </div>

      {/* Middle Bar */}
      <div style={styles.middleBar}>
        <Link to="/" style={{ ...styles.logo, textDecoration: 'none' }}>
          electro<span style={styles.logoDot}>.</span>
        </Link>

        <div style={styles.searchContainer}>
          <button style={styles.menuButton}><Menu size={20} /></button>
          <div style={styles.searchBox}>
            <input type="text" placeholder="Search for Products" style={styles.input} />
            <select style={styles.select}>
              <option>All Categories</option>
              <option>TV & Audio</option>
              <option>Laptops</option>
              <option>Smartphones</option>
            </select>
            <button style={styles.searchButton}>🔍</button>
          </div>
        </div>

        <div style={styles.icons}>
          <RefreshCw />
          <Heart />
          <User />
          <Link to="/cart" style={styles.cartInfo}>
            <ShoppingCart />
            <span>${cart.total.toFixed(2)}</span>
            <span style={styles.cartBadge}>{cart.items.length}</span>
          </Link>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              Home
            </Link>
          </li>
          {[
            "TV & Audio",
            "Smart Phones",
            "Laptops & Desktops",
            "Gadgets",
            "GPS & Car",
            "Cameras & Accessories",
          ].map((key) => (
            <li
              key={key}
              style={styles.navItem}
              onMouseEnter={() => setHoveredMenu(key)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <span>{key}</span> <ChevronDown size={16} />
              {hoveredMenu === key && renderDropdown(key)}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default ElectroHeader;
