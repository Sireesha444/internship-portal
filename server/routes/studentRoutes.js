const express = require('express');
const router = express.Router();
const Student = require('../models/studentModel');

// POST /api/students/register
router.post('/register', async (req, res) => {
  try {
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
    res.status(500).json({ message: 'Server error during registration', error: err.message });
  }
});

// GET /api/students/search?skill=react
router.get('/search', async (req, res) => {
  const { skill } = req.query;
  if (!skill) {
    return res.status(400).json({ message: 'Skill query is required.' });
  }

  try {
    const students = await Student.find({
      skills: {
        $elemMatch: {
          $regex: new RegExp(skill.trim(), 'i') // case-insensitive partial match
        }
      }
    });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error searching students', error: error.message });
  }
});

module.exports = router;
