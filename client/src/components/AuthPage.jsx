import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ElectroHeader from './ElectroHeader';
import MainBanner from './MainBanner';
import ProductHighlightsSection from './ProductHighlightsSection';
import ElectroFooterPage from './ElectroFooterPage';

const AuthPage = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [registerData, setRegisterData] = useState({ username: '', email: '', password: '' });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://electro-portal-backend.onrender.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(loginData),
      });
      const result = await res.json();
      if (res.ok) {
        // ✅ Save userId to localStorage
        localStorage.setItem('userId', result.userId);
        alert('Login successful!');
        navigate('/');
        setTimeout(() => window.location.reload(), 100);
      } else {
        alert(result.message || 'Login failed.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during login.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://electro-portal-backend.onrender.com/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(registerData),
      });
      const result = await res.json();
      if (res.ok) {
        // ✅ Save userId to localStorage
        localStorage.setItem('userId', result.userId);
        alert('Registration successful!');
        navigate('/');
        setTimeout(() => window.location.reload(), 100);
      } else {
        alert(result.message || 'Registration failed.');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred during registration.');
    }
  };

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      padding: "40px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    section: {
      flex: "1 1 500px",
      padding: "20px",
      borderRight: "1px solid #e5e7eb",
    },
    rightSection: {
      flex: "1 1 500px",
      padding: "20px",
    },
    title: {
      fontSize: "24px",
      fontWeight: "600",
      marginBottom: "10px",
      borderBottom: "2px solid #facc15",
      display: "inline-block",
      paddingBottom: "4px",
    },
    description: {
      marginBottom: "20px",
      color: "#4b5563",
    },
    label: {
      display: "block",
      fontWeight: "500",
      marginBottom: "6px",
      marginTop: "12px",
    },
    input: {
      width: "90%",
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #d1d5db",
      marginBottom: "10px",
    },
    checkboxContainer: {
      display: "flex",
      alignItems: "center",
      margin: "10px 0",
    },
    checkbox: {
      marginRight: "8px",
    },
    button: {
      backgroundColor: "#111827",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "24px",
      border: "none",
      cursor: "pointer",
      marginTop: "10px",
    },
  };

  return (
    <>
      <ElectroHeader />
      <div style={styles.container}>
        {/* Login Section */}
        <div style={styles.section}>
          <h2 style={styles.title}>Login</h2>
          <p style={styles.description}>Welcome back! Sign in to your account.</p>
          <form onSubmit={handleLoginSubmit}>
            <label style={styles.label}>Username or email address *</label>
            <input
              type="text"
              placeholder="Enter username or email"
              style={styles.input}
              value={loginData.username}
              onChange={(e) => setLoginData({ ...loginData, username: e.target.value })}
            />
            <label style={styles.label}>Password *</label>
            <input
              type="password"
              placeholder="Enter password"
              style={styles.input}
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
            <div style={styles.checkboxContainer}>
              <input type="checkbox" id="remember" style={styles.checkbox} />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type="submit" style={styles.button}>Log in</button>
          </form>
        </div>

        {/* Register Section */}
        <div style={styles.rightSection}>
          <h2 style={styles.title}>Register</h2>
          <p style={styles.description}>
            Create new account today to reap the benefits of a personalized shopping experience.
          </p>
          <form onSubmit={handleRegisterSubmit}>
            <label style={styles.label}>Username *</label>
            <input
              type="text"
              placeholder="Choose a username"
              style={styles.input}
              value={registerData.username}
              onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })}
            />
            <label style={styles.label}>Email address *</label>
            <input
              type="email"
              placeholder="Enter your email"
              style={styles.input}
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            />
            <label style={styles.label}>Password *</label>
            <input
              type="password"
              placeholder="Create a password"
              style={styles.input}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            />
            <button type="submit" style={styles.button}>Register</button>
          </form>
        </div>
      </div>
      <MainBanner />
      <ProductHighlightsSection />
      <ElectroFooterPage />
    </>
  );
};

export default AuthPage;
