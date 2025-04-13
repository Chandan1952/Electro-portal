import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaCar,
  FaBook,
  FaUsers,
  FaRegFileAlt,
  FaClipboardList,
  FaCog,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";

const AdminSidebar = () => {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [adsOpen, setAdsOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const styles = {
    sidebar: {
      width: "220px",
      height: "100vh",
      backgroundColor: "#333",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      position: "fixed",
      left: "0",
      top: "0",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    },
    title: {
      fontSize: "18px",
      fontWeight: "bold",
      padding: "15px 10px",
      textAlign: "center",
      borderBottom: "1px solid #444",
    },
    link: {
      textDecoration: "none",
      color: "white",
      padding: "12px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      transition: "background 0.3s",
      borderRadius: "5px",
      cursor: "pointer",
    },
    dropdown: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      cursor: "pointer",
      padding: "12px",
      borderRadius: "5px",
    },
    dropdownMenu: {
      display: "flex",
      flexDirection: "column",
      marginLeft: "20px",
    },
    dropdownLink: {
      textDecoration: "none",
      color: "#ddd",
      padding: "8px",
      transition: "background 0.3s",
      borderRadius: "5px",
    },
  };

  return (
    <div style={styles.sidebar}>
      <h2 style={styles.title}>Car Rental Portal</h2>

      <NavLink to="/admin-dashboard" style={styles.link}>
        <FaTachometerAlt /> Dashboard
      </NavLink>

      {/* Banner Dropdown */}
      <div style={styles.dropdown} onClick={() => setBannerOpen(!bannerOpen)}>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCar /> Banner
        </span>
        {bannerOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {bannerOpen && (
        <div style={styles.dropdownMenu}>
          <NavLink to="/admin-postbanner" style={styles.dropdownLink}>
            Post Banner
          </NavLink>
          <NavLink to="/admin-managebanner" style={styles.dropdownLink}>
            Manage Banner
          </NavLink>
        </div>
      )}

      {/* Ads Dropdown */}
      <div style={styles.dropdown} onClick={() => setAdsOpen(!adsOpen)}>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCar /> Ads
        </span>
        {adsOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {adsOpen && (
        <div style={styles.dropdownMenu}>
          <NavLink to="/admin-postads" style={styles.dropdownLink}>
            Post Ads
          </NavLink>
          <NavLink to="/admin-manageads" style={styles.dropdownLink}>
            Manage Ads
          </NavLink>
        </div>
      )}

      {/* Product Dropdown */}
      <div style={styles.dropdown} onClick={() => setProductOpen(!productOpen)}>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCar /> Product
        </span>
        {productOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {productOpen && (
        <div style={styles.dropdownMenu}>
          <NavLink to="/admin-postproduct" style={styles.dropdownLink}>
            Post Product
          </NavLink>
          <NavLink to="/admin-manageproduct" style={styles.dropdownLink}>
            Manage Product
          </NavLink>
        </div>
      )}

      {/* Products Dropdown */}
      <div style={styles.dropdown} onClick={() => setProductsOpen(!productsOpen)}>
        <span style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <FaCar /> Products
        </span>
        {productsOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {productsOpen && (
        <div style={styles.dropdownMenu}>
          <NavLink to="/admin-postproducts" style={styles.dropdownLink}>
            Post Products
          </NavLink>
          <NavLink to="/admin-manageproducts" style={styles.dropdownLink}>
            Manage Products
          </NavLink>
        </div>
      )}

      <NavLink to="/admin-managebookings" style={styles.link}>
        <FaBook /> Manage Bookings
      </NavLink>

      <NavLink to="/admin-managetestimonials" style={styles.link}>
        <FaClipboardList /> Manage Testimonials
      </NavLink>

      <NavLink to="/admin-managequery" style={styles.link}>
        <FaUsers /> Manage Contact Query
      </NavLink>

      <NavLink to="/admin-manageusers" style={styles.link}>
        <FaUsers /> Registered Users
      </NavLink>

      <NavLink to="/admin-managefaqs" style={styles.link}>
        <FaRegFileAlt /> Updated FAQs Info
      </NavLink>

      <NavLink to="/admin-updatedcontactinfo" style={styles.link}>
        <FaCog /> Updated Contact Info
      </NavLink>

      <NavLink to="/admin-managesubscriptions" style={styles.link}>
        <FaUsers /> Manage Subscribers
      </NavLink>
    </div>
  );
};

export default AdminSidebar;
