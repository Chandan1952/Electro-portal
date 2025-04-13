import React, { useEffect, useState } from 'react';

const AdminManageAds = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [editingAd, setEditingAd] = useState(null);

  const fetchAds = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/ads');
      const data = await res.json();
      setAds(data);
    } catch (err) {
      console.error(err);
      setStatus('Failed to load ads');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this ad?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/ads/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setStatus('Ad deleted successfully.');
        setAds((prev) => prev.filter((ad) => ad._id !== id));
      } else {
        const result = await res.json();
        setStatus(result.message || 'Failed to delete ad.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Server error while deleting.');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingAd((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditImage = (e) => {
    setEditingAd((prev) => ({ ...prev, newImage: e.target.files[0] }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('heading', editingAd.heading);
    formData.append('sub', editingAd.sub);
    if (editingAd.newImage) {
      formData.append('image', editingAd.newImage);
    }

    try {
      const res = await fetch(`http://localhost:5000/api/ads/${editingAd._id}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        setStatus('Ad updated successfully!');
        setEditingAd(null);
        fetchAds();
      } else {
        const result = await res.json();
        setStatus(result.message || 'Failed to update ad.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error updating ad.');
    }
  };

  if (loading) return <p>Loading ads...</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Manage Ads</h2>
      {status && <p style={styles.status}>{status}</p>}

      <div style={styles.grid}>
        {ads.map((ad) =>
          editingAd?._id === ad._id ? (
            <form key={ad._id} onSubmit={handleEditSubmit} style={styles.card}>
              <input
                type="text"
                name="heading"
                value={editingAd.heading}
                onChange={handleEditChange}
                placeholder="Heading"
                style={styles.input}
              />
              <input
                type="text"
                name="sub"
                value={editingAd.sub}
                onChange={handleEditChange}
                placeholder="Sub"
                style={styles.input}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleEditImage}
                style={styles.input}
              />
              <button type="submit" style={styles.updateBtn}>Update</button>
              <button type="button" onClick={() => setEditingAd(null)} style={styles.cancelBtn}>Cancel</button>
            </form>
          ) : (
            <div key={ad._id} style={styles.card}>
              <img src={`http://localhost:5000${ad.img}`} alt="Ad" style={styles.image} />
              <h4>{ad.heading}</h4>
              <p>{ad.sub}</p>
              <div style={styles.actions}>
                <button onClick={() => setEditingAd(ad)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(ad._id)} style={styles.deleteBtn}>Delete</button>
              </div>
            </div>
          )
        )}
      </div>
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
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
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
  actions: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  editBtn: {
    padding: '8px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    padding: '8px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  updateBtn: {
    padding: '8px 12px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  cancelBtn: {
    padding: '8px 12px',
    backgroundColor: '#6b7280',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    marginTop: '10px',
    cursor: 'pointer',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
  },
};

export default AdminManageAds;
