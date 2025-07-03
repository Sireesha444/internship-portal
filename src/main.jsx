import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // ✅ Importing App component
import './index.css';    // Optional: for global styles

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* ✅ This renders your router-based pages like LoginPage and HomePage */}
  </React.StrictMode>
);
