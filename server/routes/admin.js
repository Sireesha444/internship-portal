const express = require('express');
const router = express.Router();

// Dummy admin credentials
const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "admin123";

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    res.json({
      status: 'success',
      admin: { email }
    });
  } else {
    res.json({ status: 'error', message: 'Invalid credentials' });
  }
});

module.exports = router;
