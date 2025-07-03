// 📁 backend/routes/studentRoutes.js
const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// POST /api/students/register
router.post('/register', async (req, res) => {
  try {
    console.log("📥 Incoming data:", req.body);

    const {
      fullName,
      email,
      phone,
      college,
      department,
      year,
      skills,
      resumeLink,
    } = req.body;

    if (!fullName || !email || !phone || !college || !department || !year || !resumeLink) {
      return res.status(400).json({ message: 'All required fields must be filled.' });
    }

    const parsedYear = Number(year);
    if (isNaN(parsedYear) || parsedYear < 1 || parsedYear > 4) {
      return res.status(400).json({ message: 'Year must be a number between 1 and 4.' });
    }

    const formattedSkills = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map(s => s.trim())
      : [];

    const newStudent = new Student({
      fullName,
      email,
      phone,
      college,
      department,
      year: parsedYear,
      skills: formattedSkills,
      resumeLink,
    });

    const savedStudent = await newStudent.save();
    res.status(201).json({ message: 'Student registered successfully', student: savedStudent });
  } catch (err) {
    console.error('❌ Registration error:', err);
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
});

module.exports = router;