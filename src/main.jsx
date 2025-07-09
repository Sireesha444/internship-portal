import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// ✅ Import the provider
import { GoogleOAuthProvider } from '@react-oauth/google';

// ✅ Replace with your actual client ID from Google Console
const clientId = "557361839546-2ujvb40hcr5m2mqgsqbrng6pr0si0ue7.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
