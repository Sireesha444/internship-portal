import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  CssBaseline,
  Paper,
  Grid,
  Avatar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage({ user }) {
  const navigate = useNavigate();

  const admin = JSON.parse(localStorage.getItem("admin")); // Check if admin is logged in
  const isAdmin = !!admin;

  const handleLogout = () => {
    localStorage.removeItem('user');  // logout student
    localStorage.removeItem('admin'); // logout admin (just in case)
    navigate('/');
  };

  const features = [
    {
      title: "🎓 Student Registration",
      description: "Register and apply for internships.",
      button: "Register Now",
      onClick: () => navigate('/register'),
    },
    {
      title: "🏢 Company Access",
      description: "Search and view skilled student profiles.",
      button: "Access Students",
      onClick: () => navigate('/company-access'),
    },
  ];

  return (
    <>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="static" sx={{ backgroundColor: '#003366' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Centralized Internship Portal
          </Typography>

          {/* Admin Info */}
          {isAdmin && (
            <>
              <Typography variant="body1" sx={{ mr: 2 }}>Admin</Typography>
              <Button color="inherit" onClick={() => navigate('/admin')}>Dashboard</Button>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}

          {/* Student Info */}
          {user && !isAdmin && (
            <>
              <Avatar src={user.picture} alt={user.name} sx={{ width: 32, height: 32, mr: 1 }} />
              <Typography variant="body1" sx={{ mr: 2 }}>{user.name}</Typography>
              <Button color="inherit" onClick={handleLogout}>Logout</Button>
            </>
          )}

          {/* Not logged in */}
          {!user && !isAdmin && (
            <>
              <Button color="inherit" onClick={() => navigate('/admin-login')}>Admin Login</Button>
              <Button color="inherit" onClick={() => navigate('/')}>Login</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(to right, #0052D4, #6FB1FC)',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Welcome to the Internship Portal
        </Typography>
        <Typography variant="h6">
          A centralized system to connect students and companies
        </Typography>
      </Box>

      {/* Features */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Portal Features
        </Typography>
        <Grid columns={12} gap={4} justifyContent="center">
          {features.map((item, index) => (
            <Grid key={index} span={{ xs: 12, sm: 6, md: 4 }}>
              <Paper elevation={4} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {item.description}
                </Typography>
                <Button variant="contained" sx={{ mt: 2 }} onClick={item.onClick}>
                  {item.button}
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: '#003366', py: 3, textAlign: 'center' }}>
        <Typography variant="body2" color="white">
          © {new Date().getFullYear()} Internship Portal — Empowering Students & Companies
        </Typography>
      </Box>
    </>
  );
}
