import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import AdminPostBanner from "./components/AdminPostBanner";
import AdminManageBanner from "./components/AdminManageBanner";
import AdminAdsPost from "./components/AdminAdsPost";
import AdminManageAds from "./components/AdminManageAds";
import AdminCreateProduct from "./components/AdminCreateProduct";
import AdminProductList from "./components/AdminProductList";
import AdminCreateProducts from "./components/AdminCreateProducts";
import AdminManageProduct from "./components/AdminManageProduct";
import Home from "./components/Home";
import ProductDetailPage from "./components/ProductDetailPage";
import CartPage from "./components/CartPage";
import AuthPage from "./components/AuthPage";











function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/forget-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AuthPage />} />









        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-postbanner" element={<AdminPostBanner />} />
        <Route path="/admin-managebanner" element={<AdminManageBanner />} />
        <Route path="/admin-postads" element={<AdminAdsPost />} />
        <Route path="/admin-manageads" element={<AdminManageAds />} />
        <Route path="/admin-postproduct" element={<AdminCreateProduct />} />
        <Route path="/admin-manageproduct" element={<AdminProductList />} />
        <Route path="/admin-postproducts" element={<AdminCreateProducts />} />
        <Route path="/admin-manageproducts" element={<AdminManageProduct />} />






      </Routes>
    </Router>
  );
}

export default App;
