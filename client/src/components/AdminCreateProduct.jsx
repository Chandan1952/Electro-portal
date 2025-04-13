import React, { useState } from 'react';

const AdminCreateProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [originalPrice, setOriginalPrice] = useState('');
  const [category, setCategory] = useState('Featured');
  const [productCategoryName, setProductCategoryName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !price || !imageFile || !productCategoryName) {
      setStatus('Please fill in all required fields.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('price', price);
    formData.append('originalPrice', originalPrice);
    formData.append('category', category);
    formData.append('productCategoryName', productCategoryName);
    formData.append('image', imageFile);

    try {
      const res = await fetch('https://electro-portal-backend.onrender.com/api/products', {
        method: 'POST',
        body: formData
      });

      if (res.ok) {
        setStatus('Product created successfully!');
        setTitle('');
        setPrice('');
        setOriginalPrice('');
        setProductCategoryName('');
        setImageFile(null);
        setPreview(null);
      } else {
        setStatus('Failed to create product.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Error occurred.');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '30px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2 style={{ textAlign: 'center' }}>Create Product</h2>
      {status && <p style={{ color: 'green', textAlign: 'center' }}>{status}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Title*</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />

        <label>Price*</label>
        <input value={price} onChange={(e) => setPrice(e.target.value)} type="number" required style={inputStyle} />

        <label>Original Price</label>
        <input value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} type="number" style={inputStyle} />

        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={inputStyle}>
          <option value="Featured">Featured</option>
          <option value="On Sale">On Sale</option>
          <option value="Top Rated">Top Rated</option>
        </select>

        <label>Product Category Name*</label>
        <input
          value={productCategoryName}
          onChange={(e) => setProductCategoryName(e.target.value)}
          placeholder="e.g., Headphones, Monitors, Smartphones"
          required
          style={inputStyle}
        />

        <label>Image*</label>
        <input type="file" accept="image/*" onChange={handleImageChange} style={inputStyle} />
        {preview && <img src={preview} alt="Preview" style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }} />}

        <button type="submit" style={btnStyle}>Create Product</button>
      </form>
    </div>
  );
};

const inputStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  margin: '10px 0',
  borderRadius: '5px',
  border: '1px solid #ccc'
};

const btnStyle = {
  width: '100%',
  padding: '12px',
  background: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default AdminCreateProduct;
