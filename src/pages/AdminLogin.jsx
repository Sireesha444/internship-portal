// AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Typography,
  Button,
  Paper
} from '@mui/material';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Replace with real admin login logic later
    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('admin', JSON.stringify({ email }));
      navigate('/admin');
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={10}>
        <Paper elevation={4} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Admin Email"
              type="email"
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Container>
  );
}
