import React, { useState } from 'react';

const AdminAdsPost = () => {
  const [formData, setFormData] = useState({
    heading: '',
    sub: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.heading || !formData.sub || !imageFile) {
      setStatus('Please fill in all fields and select an image.');
      return;
    }

    const data = new FormData();
    data.append('heading', formData.heading);
    data.append('sub', formData.sub);
    data.append('image', imageFile);

    try {
      const res = await fetch('https://electro-portal-backend.onrender.com/api/ads', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        setStatus('Ad posted successfully!');
        setFormData({ heading: '', sub: '' });
        setImageFile(null);
      } else {
        const errorData = await res.json();
        setStatus(errorData.message || 'Failed to post ad.');
      }
    } catch (error) {
      console.error(error);
      setStatus('Server error. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin - Post New Ad</h2>
      <form onSubmit={handleSubmit} style={styles.form} encType="multipart/form-data">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={styles.input}
        />
        <input
          type="text"
          name="heading"
          placeholder="Heading"
          value={formData.heading}
          onChange={handleChange}
          style={styles.input}
        />
        <input
          type="text"
          name="sub"
          placeholder="Subtitle (e.g., Shop Now)"
          value={formData.sub}
          onChange={handleChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Post Ad</button>
      </form>
      {status && <p style={styles.status}>{status}</p>}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 0 12px rgba(0,0,0,0.1)',
    backgroundColor: '#f9fafb',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '24px',
    color: '#111827',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '10px 14px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    outline: 'none',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  status: {
    marginTop: '16px',
    textAlign: 'center',
    color: '#6b7280',
  },
};

export default AdminAdsPost;
