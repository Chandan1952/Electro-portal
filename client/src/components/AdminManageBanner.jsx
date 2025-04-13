import React, { useEffect, useState } from 'react';

const AdminManageBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [editingBanner, setEditingBanner] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);

  const fetchBanners = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/banners');
      const data = await res.json();
      setBanners(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching banners:', err);
      setStatus('Failed to load banners.');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this banner?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/banners/${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (res.ok) {
        setStatus('Banner deleted successfully.');
        setBanners((prev) => prev.filter((banner) => banner._id !== id));
      } else {
        setStatus(result.message || 'Failed to delete banner.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error while deleting.');
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/banners/${editingBanner._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBanner),
      });
      const result = await res.json();
      if (res.ok) {
        setStatus('Banner updated successfully.');
        fetchBanners();
        setShowEditForm(false);
      } else {
        setStatus(result.message || 'Failed to update banner.');
      }
    } catch (error) {
      console.error('Error updating banner:', error);
      setStatus('Server error while updating.');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  if (loading) return <p>Loading banners...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Banners</h2>
      {status && <p style={styles.status}>{status}</p>}

      <div style={styles.grid}>
        {banners.map((banner) => (
          <div key={banner._id} style={styles.card}>
            <img src={`http://localhost:5000${banner.imageSrc}`} alt="Banner" style={styles.image} />
            <h4>{banner.smallHeading}</h4>
            <h3>{banner.mainHeading}</h3>
            <p>{banner.discount}</p>
            <p><strong>{banner.buttonText}</strong></p>
            <button onClick={() => handleDelete(banner._id)} style={styles.deleteBtn}>Delete</button>
            <button onClick={() => {
              setEditingBanner(banner);
              setShowEditForm(true);
            }} style={styles.editBtn}>Edit</button>
          </div>
        ))}
      </div>

      {showEditForm && editingBanner && (
        <div style={styles.editForm}>
          <h3>Edit Banner</h3>
          <form onSubmit={handleEditSubmit}>
            <input
              type="text"
              value={editingBanner.smallHeading}
              onChange={(e) => setEditingBanner({ ...editingBanner, smallHeading: e.target.value })}
              placeholder="Small Heading"
              style={styles.input}
            />
            <input
              type="text"
              value={editingBanner.mainHeading}
              onChange={(e) => setEditingBanner({ ...editingBanner, mainHeading: e.target.value })}
              placeholder="Main Heading"
              style={styles.input}
            />
            <input
              type="text"
              value={editingBanner.discount}
              onChange={(e) => setEditingBanner({ ...editingBanner, discount: e.target.value })}
              placeholder="Discount"
              style={styles.input}
            />
            <input
              type="text"
              value={editingBanner.imageSrc}
              onChange={(e) => setEditingBanner({ ...editingBanner, imageSrc: e.target.value })}
              placeholder="Image URL"
              style={styles.input}
            />
            <input
              type="text"
              value={editingBanner.buttonText}
              onChange={(e) => setEditingBanner({ ...editingBanner, buttonText: e.target.value })}
              placeholder="Button Text"
              style={styles.input}
            />
            <button type="submit" style={styles.saveBtn}>Save Changes</button>
            <button type="button" onClick={() => setShowEditForm(false)} style={styles.cancelBtn}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1000px',
    margin: '40px auto',
    padding: '20px',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
    textAlign: 'center',
    color: '#111827',
  },
  status: {
    textAlign: 'center',
    color: '#f43f5e',
    marginBottom: '12px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px',
  },
  card: {
    padding: '16px',
    backgroundColor: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 0 10px rgba(0,0,0,0.05)',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    maxHeight: '150px',
    objectFit: 'contain',
    marginBottom: '12px',
  },
  deleteBtn: {
    marginTop: '10px',
    padding: '8px 16px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  editBtn: {
    marginTop: '10px',
    marginLeft: '10px',
    padding: '8px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  editForm: {
    marginTop: '30px',
    padding: '20px',
    backgroundColor: '#f3f4f6',
    borderRadius: '12px',
    boxShadow: '0 0 8px rgba(0,0,0,0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  saveBtn: {
    padding: '10px 20px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    marginRight: '10px',
    cursor: 'pointer',
  },
  cancelBtn: {
    padding: '10px 20px',
    backgroundColor: '#9ca3af',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default AdminManageBanner;
