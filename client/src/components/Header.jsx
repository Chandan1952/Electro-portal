import React, { useState } from 'react';
import { Search, ShoppingCart, User, Heart, RefreshCcw } from 'lucide-react';

const Header = () => {
  const [showDepartments, setShowDepartments] = useState(false);

  const styles = {
    topBar: {
      backgroundColor: '#f8f9fa',
      fontSize: '14px',
      padding: '10px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      fontSize: '30px',
      fontWeight: 'bold',
      color: '#333',
    },
    yellowDot: {
      color: '#facc15',
    },
    mainHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '20px 30px',
      backgroundColor: '#fff',
    },
    searchContainer: {
      display: 'flex',
      flexGrow: 1,
      maxWidth: '600px',
      margin: '0 40px',
    },
    searchInput: {
      flexGrow: 1,
      padding: '10px',
      border: '1px solid #ccc',
      borderRight: 'none',
      borderRadius: '6px 0 0 6px',
      outline: 'none',
    },
    categorySelect: {
      padding: '10px',
      border: '1px solid #ccc',
      borderRight: 'none',
      outline: 'none',
    },
    searchButton: {
      backgroundColor: '#facc15',
      border: 'none',
      padding: '0 16px',
      borderRadius: '0 6px 6px 0',
      cursor: 'pointer',
    },
    iconGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    cartWrapper: {
      position: 'relative',
    },
    cartCount: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      backgroundColor: '#facc15',
      color: '#000',
      fontSize: '12px',
      borderRadius: '50%',
      padding: '2px 6px',
    },
    navBar: {
      backgroundColor: '#facc15',
      padding: '15px 30px',
      display: 'flex',
      alignItems: 'center',
      gap: '25px',
      fontWeight: '500',
      position: 'relative',
    },
    allDeptButton: {
      backgroundColor: '#eab308',
      color: '#fff',
      border: 'none',
      padding: '8px 16px',
      borderRadius: '6px',
      cursor: 'pointer',
    },
    rightNote: {
      marginLeft: 'auto',
      fontSize: '14px',
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      left: '30px',
      backgroundColor: '#fff',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      zIndex: 10,
      borderRadius: '6px',
      width: '250px',
      marginTop: '4px',
      overflow: 'hidden',
    },
    dropdownItem: {
      padding: '10px 16px',
      borderBottom: '1px solid #eee',
      cursor: 'pointer',
      fontSize: '14px',
      color: '#333',
      backgroundColor: '#fff',
    },
  };

  return (
    <>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <span>Welcome to Worldwide Electronics Store</span>
        <div>
          <span style={{ marginRight: '15px' }}> Store Locator |</span>
          <span style={{ marginRight: '15px' }}> Track Your Order |</span>
          <span style={{ marginRight: '15px' }}> Shop |</span>
          <span> My Account</span>
        </div>
      </div>

      {/* Main Header */}
      <div style={styles.mainHeader}>
        {/* Logo */}
        <div style={styles.logo}>
          electro<span style={styles.yellowDot}>.</span>
        </div>

        {/* Search */}
        <div style={styles.searchContainer}>
          <input type="text" placeholder="Search for Products" style={styles.searchInput} />
          <select style={styles.categorySelect}>
            <option>All Categories</option>
          </select>
          <button style={styles.searchButton}>
            <Search size={20} />
          </button>
        </div>

        {/* Icons */}
        <div style={styles.iconGroup}>
          <RefreshCcw size={20} />
          <Heart size={20} />
          <User size={20} />
          <div style={styles.cartWrapper}>
            <ShoppingCart size={20} />
            <span style={styles.cartCount}>0</span>
          </div>
          <span style={{ fontWeight: 'bold' }}>$0.00</span>
        </div>
      </div>

      {/* Nav Bar */}
      <div style={styles.navBar}>
        {/* All Departments Dropdown */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowDepartments(true)}
          onMouseLeave={() => setShowDepartments(false)}
        >
          <button style={styles.allDeptButton}>All Departments</button>

          {showDepartments && (
            <div style={styles.dropdownMenu}>
              <div style={styles.dropdownItem}>Value of the Day</div>
              <div style={styles.dropdownItem}>Top 100 Offers</div>
              <div style={styles.dropdownItem}>New Arrivals</div>
              <div style={styles.dropdownItem}>Computers & Accessories</div>
              <div style={styles.dropdownItem}>Cameras, Audio & Video</div>
              <div style={styles.dropdownItem}>Mobiles & Tablets</div>
              <div style={styles.dropdownItem}>Movies, Music & Video Games</div>
              <div style={styles.dropdownItem}>TV & Audio</div>
              <div style={styles.dropdownItem}>Watches & Eyewear</div>
              <div style={styles.dropdownItem}>Car, Motorbike & Industrial</div>
              <div style={styles.dropdownItem}>Accessories</div>
            </div>
          )}
        </div>

        {/* Static Links */}
        <span>Home</span>
        <span>Featured Brands</span>
        <span>Trending Styles</span>
        <span>Gift Cards</span>
        <span style={styles.rightNote}>Free Shipping on Orders $50+</span>
      </div>
    </>
  );
};

export default Header;
