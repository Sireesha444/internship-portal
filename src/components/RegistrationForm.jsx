import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    year: '',
    skills: '',
    resumeLink: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formattedData = {
        ...formData,
        skills: formData.skills ? formData.skills.split(',').map(s => s.trim()) : [],
        year: parseInt(formData.year, 10),
      };

      const response = await axios.post('http://localhost:5000/api/students/register', formattedData, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert('✅ ' + response.data.message);
    } catch (error) {
      console.error('❌ Registration error:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2 style={styles.title}>Student Registration</h2>
      <form style={styles.form} onSubmit={handleSubmit}>
        <input name="fullName" value={formData.fullName} type="text" placeholder="Full Name" onChange={handleChange} required style={styles.input} />
        <input name="email" value={formData.email} type="email" placeholder="Email" onChange={handleChange} required style={styles.input} />
        <input name="phone" value={formData.phone} type="text" placeholder="Phone" onChange={handleChange} required style={styles.input} />
        <input name="college" value={formData.college} type="text" placeholder="College" onChange={handleChange} required style={styles.input} />
        <input name="department" value={formData.department} type="text" placeholder="Department" onChange={handleChange} required style={styles.input} />
        <input name="year" value={formData.year} type="number" placeholder="Year (1-4)" onChange={handleChange} required style={styles.input} min="1" max="4" />
        <input name="skills" value={formData.skills} type="text" placeholder="Skills (comma-separated)" onChange={handleChange} style={styles.input} />
        <input name="resumeLink" value={formData.resumeLink} type="url" placeholder="Resume Link" onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.submitButton}>Register</button>
      </form>
    </div>
  );
};

const styles = {
  formContainer: {
    width: '100%',
    maxWidth: '500px',
    margin: '60px auto',
    background: '#fff',
    padding: '35px',
    borderRadius: '20px',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.15)',
    fontFamily: 'Segoe UI, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#2980b9',
    fontSize: '28px',
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    width: '100%',
    marginBottom: '16px',
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '15px',
    transition: '0.3s ease',
  },
  submitButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2980b9',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    fontWeight: 'bold',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};

export default RegistrationForm;
