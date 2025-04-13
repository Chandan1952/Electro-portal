import React, { useState } from 'react';

const AdminPostBanner = () => {
  const [formData, setFormData] = useState({
    smallHeading: '',
    mainHeading: '',
    discount: '',
    buttonText: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile || Object.values(formData).some((field) => !field)) {
      setStatus('Please fill in all fields and upload an image.');
      return;
    }

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append('image', imageFile);

    try {
      const response = await fetch('https://electro-portal-backend.onrender.com/api/banners', {
        method: 'POST',
        body: data,
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('Banner posted successfully!');
        setFormData({ smallHeading: '', mainHeading: '', discount: '', buttonText: '' });
        setImageFile(null);
      } else {
        setStatus(result.message || 'Failed to post banner.');
      }
    } catch (error) {
      console.error('Error posting banner:', error);
      setStatus('Server error. Please try again later.');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin - Post New Banner</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="smallHeading" placeholder="Small Heading" value={formData.smallHeading} onChange={handleChange} style={styles.input} />
        <input type="text" name="mainHeading" placeholder="Main Heading" value={formData.mainHeading} onChange={handleChange} style={styles.input} />
        <input type="text" name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} style={styles.input} />
        <input type="text" name="buttonText" placeholder="Button Text" value={formData.buttonText} onChange={handleChange} style={styles.input} />
        <input type="file" accept="image/*" onChange={handleImageChange} style={styles.input} />
        <button type="submit" style={styles.button}>Post Banner</button>
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

export default AdminPostBanner;
