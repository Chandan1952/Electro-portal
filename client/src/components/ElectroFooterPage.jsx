import React from "react";
import { FaFacebookF, FaPhoneAlt, FaCamera, FaLinkedinIn, FaYoutube, FaInstagram, FaRss } from "react-icons/fa";

const Footer = () => (
  <footer style={{ backgroundColor: '#1e293b', color: '#ffffff', padding: '48px 24px', marginTop: '32px', width: '100%' }}>
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '32px' }}>
      <div style={{ flex: '1 1 250px' }}>
        <h3 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '16px' }}>electro<span style={{ color: '#facc15' }}>.</span></h3>
        <p>Got Questions? Call us 24/7!</p>
        <p style={{ fontWeight: '600', margin: '8px 0' }}>(800) 8001-8588, (0600) 874 548</p>
        <p style={{ marginBottom: '16px' }}>17 Princess Road, London, Greater London NW1 8JR, UK</p>
        <div style={{ display: 'flex', gap: '16px' }}>
          <FaFacebookF size={20} style={{ cursor: 'pointer' }} />
          <FaPhoneAlt size={20} style={{ cursor: 'pointer' }} />
          <FaCamera size={20} style={{ cursor: 'pointer' }} />
          <FaLinkedinIn size={20} style={{ cursor: 'pointer' }} />
          <FaYoutube size={20} style={{ cursor: 'pointer' }} />
          <FaInstagram size={20} style={{ cursor: 'pointer' }} />
          <FaRss size={20} style={{ cursor: 'pointer' }} />
        </div>
      </div>

      <div style={{ flex: '1 1 160px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Find It Fast</h4>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '28px' }}>
          <li>Laptops & Computers</li>
          <li>Cameras & Photography</li>
          <li>Smart Phones & Tablets</li>
          <li>Video Games & Consoles</li>
          <li>TV & Audio</li>
          <li>Gadgets</li>
          <li>Waterproof Headphones</li>
        </ul>
      </div>

      <div style={{ flex: '1 1 160px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Information</h4>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '28px' }}>
          <li>About Us</li>
          <li>Contact Us</li>
          <li>Terms & Conditions</li>
          <li>Privacy Policy</li>
          <li>Orders and Returns</li>
          <li>Support Center</li>
        </ul>
      </div>

      <div style={{ flex: '1 1 160px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Customer Care</h4>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '28px' }}>
          <li>My Account</li>
          <li>Track your Order</li>
          <li>Customer Service</li>
          <li>Returns/Exchange</li>
          <li>FAQs</li>
          <li>Product Support</li>
        </ul>
      </div>

      <div style={{ flex: '1 1 160px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>Working Days/Hours</h4>
        <ul style={{ listStyle: 'none', padding: 0, lineHeight: '28px' }}>
          <li>Mon - Sun / 9:00AM - 8:00PM</li>
        </ul>
      </div>
    </div>
    <p style={{ textAlign: 'center', marginTop: '48px', fontSize: '14px', color: '#9ca3af' }}>© Electro - All Rights Reserved</p>
  </footer>
);

const ElectroFooterPage = () => {
  return (
    <div style={{ minHeight: '100%', width: '97%', backgroundColor: '#ffffff', boxSizing: 'border-box' }}>
      <div style={{ backgroundColor: '#facc15', marginTop: '32px', borderRadius: '12px', padding: '24px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <p style={{ color: '#000000', fontWeight: '500', fontSize: '18px', margin: 0 }}>
          Sign up to Newsletter ...and receive <span style={{ fontWeight: '700' }}>$20 coupon</span> for first shopping
        </p>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <input
            type="email"
            placeholder="Enter your email address"
            style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #d1d5db', minWidth: '250px' }}
          />
          <button style={{ backgroundColor: '#000000', color: '#ffffff', padding: '8px 24px', borderRadius: '6px', cursor: 'pointer' }}>SignUp</button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ElectroFooterPage;
