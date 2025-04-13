import React, { useState } from 'react';

const AdminCreateProducts = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    oldPrice: '',
    rating: '',
    category: '', // featured | topSelling | onSale
  });

  const [imageFile, setImageFile] = useState(null);
  const [imgPreview, setImgPreview] = useState('');
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('oldPrice', formData.oldPrice);
      data.append('rating', formData.rating);
      data.append('category', formData.category);
      if (imageFile) data.append('img', imageFile);

      const res = await fetch('http://localhost:5000/products', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setStatus('✅ Product created successfully!');
        setFormData({
          name: '',
          price: '',
          oldPrice: '',
          rating: '',
          category: '',
        });
        setImageFile(null);
        setImgPreview('');
      } else {
        setStatus('❌ Failed to create product.');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create New Product</h2>
      {status && <p style={styles.status}>{status}</p>}
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
          style={styles.input}
        />
        <input
          type="text"
          name="oldPrice"
          placeholder="Old Price"
          value={formData.oldPrice}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="rating"
          placeholder="Rating (1-5)"
          value={formData.rating}
          onChange={handleChange}
          style={styles.input}
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={styles.input}
          required
        >
          <option value="">Select Category</option>
          <option value="featured">Featured Products</option>
          <option value="topSelling">Top Selling Products</option>
          <option value="onSale">On-sale Products</option>
        </select>
        <input
          type="file"
          name="img"
          accept="image/*"
          onChange={handleImageChange}
          style={styles.input}
          required
        />
        {imgPreview && (
          <div style={{ marginBottom: '10px' }}>
            <img src={imgPreview} alt="Preview" style={{ width: '80px', borderRadius: '6px' }} />
          </div>
        )}
        <button type="submit" style={styles.submitBtn}>Create Product</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '40px auto',
    padding: '20px',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  status: {
    marginBottom: '10px',
    fontWeight: 'bold',
    color: '#2563eb',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#3b82f6',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '10px',
  },
};

export default AdminCreateProducts;
