import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import ElectroHeader from './ElectroHeader';
import Sidebar from './Sidebar';
import MainBanner from './MainBanner';
import ProductHighlightsSection from './ProductHighlightsSection';
import ElectroFooterPage from './ElectroFooterPage';
import ProductTabs from './ProductTabs';
import LatestProducts from './LatestProducts';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const location = useLocation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Set loading to true when fetching the product
        const res = await fetch(`https://electro-portal-backend.onrender.com/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (err) {
        console.error('Failed to fetch product', err);
        setLoading(false);
        setError('Failed to load product details');
      }
    };
    fetchProduct();
  }, [id, location.key]);

  const handleAddToCart = async () => {
    try {
      setLoading(true);
  
      const userId = localStorage.getItem('userId'); // ✅ Get userId from localStorage
      const productId = product._id;
  
      if (!userId) {
        alert('Please log in to add items to your cart.');
        setLoading(false);
        return;
      }
  
      const res = await fetch('https://electro-portal-backend.onrender.com/api/cart/add', {
        method: 'POST',
        credentials: 'include', // Only needed if you're using cookies for auth
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, productId, quantity }),
      });
  
      const data = await res.json();
      setLoading(false);
  
      if (res.ok) {
        alert(`Added ${quantity} item(s) to cart!`);
      } else {
        alert(data.message || 'Failed to add to cart');
      }
    } catch (err) {
      setLoading(false);
      console.error('Error adding to cart:', err);
      alert('Something went wrong while adding to cart');
    }
  };
  

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  if (!product) return <p>Product not found</p>;

  return (
    <div>
      <ElectroHeader />

      <div style={{ display: 'flex', padding: '40px', gap: '40px', backgroundColor: '#f8f8f8' }}>
        {/* Sidebar */}
        <div style={{ width: '250px' }}>
          <Sidebar />
          <LatestProducts />
        </div>

        {/* Product Detail Content */}
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}
        >
          {/* Breadcrumb */}
          <div style={{ fontSize: '14px', marginBottom: '20px', color: '#555' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#007bff' }}>Home</Link> &gt;{' '}
            <Link to="/category/smartphones" style={{ textDecoration: 'none', color: '#007bff' }}>
              Smart Phones & Tablets
            </Link>{' '}
            &gt; <span style={{ color: '#333' }}>{product.title || product.name}</span>
          </div>

          <div style={{ display: 'flex', gap: '40px' }}>
            {/* Image */}
            <div>
              <img
                src={`https://electro-portal-backend.onrender.com/${product.imageUrl || product.img}`}
                alt={product.title}
                style={{ width: 300, borderRadius: 10 }}
              />
            </div>

            {/* Details */}
            <div>
              <h2>{product.title || product.name}</h2>
              <p style={{ color: '#888' }}>{product.productCategoryName}</p>
              <p style={{ margin: '15px 0' }}>
                <strong style={{ fontSize: '24px', color: '#111' }}>${product.price}</strong>{' '}
                <del style={{ color: '#999', marginLeft: 10 }}>${product.originalPrice || product.oldPrice}</del>
              </p>
              <p>{product.description || 'No description available.'}</p>

              {/* Quantity Selector */}
              <div style={{ marginTop: '20px' }}>
                <label style={{ marginRight: '10px' }}>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  style={{
                    width: '60px',
                    padding: '6px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={loading || quantity < 1}
                style={{
                  marginTop: 20,
                  padding: '10px 20px',
                  backgroundColor: '#ffc107',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: loading || quantity < 1 ? 'not-allowed' : 'pointer',
                  opacity: loading || quantity < 1 ? 0.6 : 1,
                }}
              >
                {loading ? 'Adding to Cart...' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* Tabs Component */}
          <div style={{ marginTop: '40px' }}>
            <ProductTabs />
          </div>
        </div>
      </div>

      <MainBanner />
      <ProductHighlightsSection />
      <ElectroFooterPage />
    </div>
  );
};

export default ProductDetailPage;
