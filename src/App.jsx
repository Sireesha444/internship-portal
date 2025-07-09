import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import StudentProfile from './components/StudentProfile';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard'; // if you have one
import CompanyAccessPage from './pages/CompanyAccessPage';

function App() {
  const [user, setUser] = useState(null);

  // On app load, restore user from localStorage if available
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setUser={setUser} />} />
        <Route path="/home" element={<HomePage user={user} />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<StudentProfile user={user} />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} /> 
        <Route path="/company-access" element={<CompanyAccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
