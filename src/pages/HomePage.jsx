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
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  // Simulate user type — replace this with real logic later
  const isAdmin = false; // Change this to true if the user is admin

  const features = [
    {
      title: "🎓 Student Registration",
      description: "Register and apply for internships.",
      button: "Register Now",
      onClick: () => navigate('/register'),
    },
    {
      title: "🏢 Company Access",
      description: "Post internships and view applicants.",
      button: "Company Login",
      onClick: () => navigate('/company-login'),
    },
  ];

  // Admin-only feature
  if (isAdmin) {
    features.push({
      title: "🧑‍💼 Admin Dashboard",
      description: "Track all users and data reports.",
      button: "Admin Access",
      onClick: () => navigate('/admin'),
    });
  }

  return (
    <>
      <CssBaseline />

      {/* Navigation */}
      <AppBar position="static" sx={{ backgroundColor: '#003366' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Centralized Internship Portal
          </Typography>
          <Button color="inherit" onClick={() => navigate('/')}>Home</Button>
          <Button color="inherit" onClick={() => navigate('/register')}>Students</Button>
          <Button color="inherit" onClick={() => navigate('/company-login')}>Companies</Button>
          <Button color="inherit" onClick={() => navigate('/admin')}>Admin</Button>
        </Toolbar>
      </AppBar>

      {/* Hero */}
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
        <Grid container columns={12} spacing={4} justifyContent="center">
          {features.map((item, index) => (
            <Grid key={index} span={4}>
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
