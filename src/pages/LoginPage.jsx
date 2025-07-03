import React, { useState } from 'react';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Avatar,
  Paper,
  Alert
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { styled, keyframes } from '@mui/system';

// 🔹 Background fade animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 🔹 Styled container with background
const BackgroundBox = styled(Box)({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundImage: 'linear-gradient(to right, #6a11cb, #2575fc)', // gradient background
});

// 🔹 Styled login card
const AnimatedPaper = styled(Paper)({
  padding: '40px',
  borderRadius: '16px',
  maxWidth: '400px',
  width: '100%',
  animation: `${fadeIn} 1s ease-out`,
  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
});

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (trimmedEmail && trimmedPassword) {
      setError('');
      navigate('/home');
    } else {
      setError('Please enter both email and password');
    }
  };

  return (
    <BackgroundBox>
      <AnimatedPaper elevation={10}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ bgcolor: '#1976d2', mb: 1 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Internship Portal Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} width="100%">
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ backgroundColor: '#f9f9f9', borderRadius: 1 }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 2,
                py: 1,
                fontWeight: 'bold',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#125ea4' },
              }}
            >
              Login
            </Button>
          </Box>
        </Box>
      </AnimatedPaper>
    </BackgroundBox>
  );
}
