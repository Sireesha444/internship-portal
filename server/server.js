const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/students', studentRoutes);

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/internshipPortal')
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // Serve static files only in production
    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '../client/dist')));
      app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
      });
    }

    app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
