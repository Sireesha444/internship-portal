import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin"));

  if (!admin) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>Access Denied</h2>
        <p>You must log in as admin to view this page.</p>
        <button onClick={() => navigate('/admin-login')}>Go to Admin Login</button>
      </div>
    );
  }

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate('/admin-login');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome, Admin</h1>
      <p>Email: {admin.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminDashboard;
