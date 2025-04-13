import React, { useEffect, useState } from 'react';

const AdminManageProduct = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const [editImage, setEditImage] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/products');
      const data = await res.json();

      const mergedProducts = [
        ...(data.featured || []),
        ...(data.topSelling || []),
        ...(data.onSale || []),
      ];

      setProducts(mergedProducts);
    } catch (err) {
      console.error(err);
      setStatus('❌ Failed to load products');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`http://localhost:5000/products/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setProducts(products.filter((p) => p._id !== id));
        setStatus('✅ Product deleted');
      } else {
        setStatus('❌ Failed to delete');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error');
    }
  };

  const startEdit = (product) => {
    setEditingId(product._id);
    setEditData(product);
    setEditImage(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
    setEditImage(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setEditImage(file);
  };

  const saveEdit = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editData.name);
      formData.append('price', editData.price);
      formData.append('oldPrice', editData.oldPrice);
      formData.append('rating', editData.rating);
      formData.append('category', editData.category);
      if (editImage) formData.append('img', editImage);

      const res = await fetch(`http://localhost:5000/products/${editingId}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        setProducts(products.map(p => (p._id === editingId ? updated : p)));
        setStatus('✅ Product updated');
        cancelEdit();
      } else {
        setStatus('❌ Update failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('❌ Server error during update');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin - Manage Products</h2>
      {status && <p style={styles.status}>{status}</p>}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Old Price</th>
              <th>Rating</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) && products.map((p) =>
              editingId === p._id ? (
                <tr key={p._id}>
                  <td>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                    {editData.img && (
                      <img
                        src={
                          typeof editData.img === 'string'
                            ? `http://localhost:5000/${editData.img}`
                            : URL.createObjectURL(editImage)
                        }
                        alt="preview"
                        style={styles.image}
                      />
                    )}
                  </td>
                  <td><input type="text" name="name" value={editData.name} onChange={handleEditChange} style={styles.input} /></td>
                  <td><input type="text" name="price" value={editData.price} onChange={handleEditChange} style={styles.input} /></td>
                  <td><input type="text" name="oldPrice" value={editData.oldPrice} onChange={handleEditChange} style={styles.input} /></td>
                  <td><input type="text" name="rating" value={editData.rating} onChange={handleEditChange} style={styles.input} /></td>
                  <td><input type="text" name="category" value={editData.category} onChange={handleEditChange} style={styles.input} /></td>
                  <td>
                    <button onClick={saveEdit} style={styles.saveBtn}>Save</button>
                    <button onClick={cancelEdit} style={styles.cancelBtn}>Cancel</button>
                  </td>
                </tr>
              ) : (
                <tr key={p._id}>
                  <td><img src={`http://localhost:5000/${p.img}`} alt={p.name} style={styles.image} /></td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>${p.oldPrice}</td>
                  <td>{p.rating} ★</td>
                  <td>{p.category}</td>
                  <td>
                    <button onClick={() => startEdit(p)} style={styles.editBtn}>Edit</button>
                    <button onClick={() => handleDelete(p._id)} style={styles.deleteBtn}>Delete</button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '30px auto',
    padding: '20px',
  },
  heading: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  status: {
    marginBottom: '10px',
    color: '#f59e0b',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  image: {
    width: '60px',
    borderRadius: '8px',
  },
  input: {
    padding: '6px',
    width: '100px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  editBtn: {
    background: '#3b82f6',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    marginRight: '5px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  saveBtn: {
    background: '#10b981',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    marginRight: '5px',
    cursor: 'pointer',
  },
  cancelBtn: {
    background: '#6b7280',
    color: '#fff',
    border: 'none',
    padding: '6px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default AdminManageProduct;
