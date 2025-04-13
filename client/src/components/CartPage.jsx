import React, { useEffect, useState } from 'react';
import MainBanner from './MainBanner';
import ProductHighlightsSection from './ProductHighlightsSection';
import ElectroFooterPage from './ElectroFooterPage';
import ElectroHeader from './ElectroHeader';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch('https://electro-portal-backend.onrender.com/api/cart', {
        credentials: 'include',
      });
      const data = await res.json();
      setCartItems(data.items || []);
      calculateSubtotal(data.items || []);
    } catch (err) {
      console.error('Failed to load cart:', err);
    }
  };

  const calculateSubtotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setSubtotal(sum);
  };

  const handleQuantityChange = (index, newQty) => {
    const updated = [...cartItems];
    updated[index].quantity = parseInt(newQty) || 1;
    setCartItems(updated);
    calculateSubtotal(updated);
  };

  const handleUpdateCart = async () => {
    try {
      await fetch('https://electro-portal-backend.onrender.com/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            productId: item.product._id,
            quantity: item.quantity,
          })),
        }),
      });
      alert('Cart updated!');
    } catch (err) {
      console.error('Failed to update cart:', err);
      alert('Error updating cart');
    }
  };

  const shippingCost = 50;
  const total = subtotal + shippingCost;

  return (
    <div>
      <ElectroHeader />
      <div style={styles.container}>
        <h2 style={styles.title}>Cart</h2>

        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item, index) => (
              <div key={item.product._id} style={styles.cartItem}>
                <div style={styles.productInfo}>
                  <img
                    src={`https://electro-portal-backend.onrender.com/${item.product.imageUrl || item.product.img}`}
                    alt={item.product.title}
                    style={styles.image}
                  />
                  <div>
                    <div style={styles.productName}>{item.product.title}</div>
                    <div><strong>Vendor:</strong> {item.product.vendor || 'Unknown'}</div>
                  </div>
                </div>
                <div style={styles.price}>${item.product.price.toFixed(2)}</div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  style={styles.qtyInput}
                />
                <div style={styles.price}>${(item.product.price * item.quantity).toFixed(2)}</div>
              </div>
            ))}

            <div style={styles.actions}>
              <input type="text" placeholder="Coupon code" style={styles.couponInput} />
              <button style={styles.applyBtn}>Apply coupon</button>
              <button style={styles.updateBtn} onClick={handleUpdateCart}>Update cart</button>
              <button style={styles.checkoutBtn}>Proceed to checkout</button>
            </div>

            <div style={styles.summary}>
              <h3>Cart totals</h3>
              <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
              <p><strong>Shipping:</strong> Flat rate: ${shippingCost.toFixed(2)}</p>
              <p>Shipping to <strong>CA.</strong> <a href="#">Change address</a></p>
              <h4>Total: <strong>${total.toFixed(2)}</strong></h4>
            </div>
          </>
        )}
      </div>
      <MainBanner />
      <ProductHighlightsSection />
      <ElectroFooterPage />
    </div>
  );
};


const styles = {
  container: {
    padding: '30px 60px',
    fontFamily: 'sans-serif',
  },
  title: {
    fontSize: '32px',
    marginBottom: '30px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    borderBottom: '1px solid #ccc',
    paddingBottom: '20px',
    marginBottom: '20px',
  },
  productInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: 2,
  },
  image: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: '5px',
  },
  price: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  qtyInput: {
    width: '50px',
    padding: '5px',
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    marginBottom: '30px',
  },
  couponInput: {
    padding: '10px',
    width: '200px',
  },
  applyBtn: {
    background: '#2d2d2d',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  updateBtn: {
    background: '#f1f1f1',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
  },
  checkoutBtn: {
    background: '#ffd600',
    border: 'none',
    padding: '10px 20px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  summary: {
    background: '#fafafa',
    padding: '20px',
    border: '1px solid #eee',
    maxWidth: '400px',
  },
};

export default CartPage;
