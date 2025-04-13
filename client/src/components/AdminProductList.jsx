import React, { useEffect, useState } from 'react';

const AdminProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [status, setStatus] = useState('');
  const [editProduct, setEditProduct] = useState(null);
  const [editImage, setEditImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (categoryFilter === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(p => p.category === categoryFilter);
      setFilteredProducts(filtered);
    }
  }, [categoryFilter, products]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://electro-portal-backend.onrender.com/api/products');
      const data = await res.json();
      console.log('Fetched products:', data); // Debug
      setProducts(data);
    } catch (err) {
      console.error(err);
      setStatus('Failed to load products');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`https://electro-portal-backend.onrender.com/api/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setStatus('Product deleted successfully');
        setProducts(products.filter(product => product._id !== id));
      } else {
        setStatus('Failed to delete product');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error while deleting');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', editProduct.title);
    formData.append('price', editProduct.price);
    formData.append('originalPrice', editProduct.originalPrice);
    formData.append('category', editProduct.category);
    if (editImage) formData.append('image', editImage);

    try {
      const res = await fetch(`https://electro-portal-backend.onrender.com/api/products/${editProduct._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        setStatus('Product updated successfully');
        setEditProduct(null);
        fetchProducts();
      } else {
        setStatus('Failed to update product');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error while updating');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin - Manage Products</h2>
      {status && <p style={styles.status}>{status}</p>}

      <div style={{ marginBottom: '15px' }}>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          style={styles.input}
        >
          <option value="">All Categories</option>
          <option value="Featured">Featured</option>
          <option value="On Sale">On Sale</option>
          <option value="Top Rated">Top Rated</option>
        </select>
      </div>

      {editProduct && (
        <div style={styles.modal}>
          <form onSubmit={handleEditSubmit} style={styles.modalForm}>
            <h3>Edit Product</h3>
            <input name="title" value={editProduct.title} onChange={handleEditChange} placeholder="Title" style={styles.input} />
            <input name="price" value={editProduct.price} onChange={handleEditChange} placeholder="Price" type="number" style={styles.input} />
            <input name="originalPrice" value={editProduct.originalPrice} onChange={handleEditChange} placeholder="Original Price" type="number" style={styles.input} />
            <select name="category" value={editProduct.category} onChange={handleEditChange} style={styles.input}>
              <option value="">Select Category</option>
              <option value="Featured">Featured</option>
              <option value="On Sale">On Sale</option>
              <option value="Top Rated">Top Rated</option>
            </select>
            <input type="file" accept="image/*" onChange={(e) => setEditImage(e.target.files[0])} style={styles.input} />
            <button type="submit" style={styles.saveBtn}>Save</button>
            <button type="button" style={styles.cancelBtn} onClick={() => setEditProduct(null)}>Cancel</button>
          </form>
        </div>
      )}

      <div style={styles.tableWrapper}>
        {filteredProducts.length > 0 ? (
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Price</th>
                <th>Original Price</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={`https://electro-portal-backend.onrender.com/${product.imageUrl}`}
                      alt={product.title}
                      style={styles.image}
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/60')}
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>${Number(product.originalPrice).toFixed(2)}</td>
                  <td>{product.category}</td>
                  <td>
                    <button style={styles.editBtn} onClick={() => setEditProduct(product)}>Edit</button>
                    <button style={styles.deleteBtn} onClick={() => handleDelete(product._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No products found for selected category.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '1200px', margin: '30px auto', padding: '20px' },
  heading: { fontSize: '24px', marginBottom: '20px' },
  status: { marginBottom: '10px', color: '#f59e0b' },
  tableWrapper: { overflowX: 'auto', backgroundColor: '#fff', padding: '10px', borderRadius: '10px' },
  table: { width: '100%', borderCollapse: 'collapse' },
  image: { width: '60px', borderRadius: '8px', objectFit: 'cover' },
  editBtn: {
    background: '#3b82f6', color: '#fff', border: 'none',
    padding: '6px 10px', marginRight: '5px', borderRadius: '6px', cursor: 'pointer',
  },
  deleteBtn: {
    background: '#ef4444', color: '#fff', border: 'none',
    padding: '6px 10px', borderRadius: '6px', cursor: 'pointer',
  },
  modal: {
    position: 'fixed', top: 0, left: 0, width: '100%',
    height: '100%', backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
  },
  modalForm: {
    backgroundColor: '#fff', padding: '20px', borderRadius: '10px',
    display: 'flex', flexDirection: 'column', gap: '10px', width: '400px',
  },
  input: {
    padding: '8px 12px', borderRadius: '6px', border: '1px solid #ddd',
  },
  saveBtn: {
    background: '#22c55e', color: 'white', padding: '10px', borderRadius: '6px', border: 'none',
  },
  cancelBtn: {
    background: '#9ca3af', color: 'white', padding: '10px', borderRadius: '6px', border: 'none',
  },
};

export default AdminProductList;
