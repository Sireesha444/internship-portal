import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Info:", decoded);

    // Save to localStorage and state
    localStorage.setItem("user", JSON.stringify(decoded));
    setUser(decoded);

    // Optional: Send to backend
    try {
      const res = await fetch("http://localhost:5000/api/users/google-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(decoded),
      });
      const data = await res.json();
      console.log("Backend response:", data);
    } catch (err) {
      console.error("Error sending to backend:", err);
    }

    navigate("/home");
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Login with Google</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => console.log("Login Failed")}
      />
    </div>
  );
};

export default LoginPage;
