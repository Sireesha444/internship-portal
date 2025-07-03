import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import StudentProfile from './components/StudentProfile';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
