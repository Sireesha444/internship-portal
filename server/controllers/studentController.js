import Student from "../models/studentModel.js";

// @desc Register a new student
export const registerStudent = async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Error registering student:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};
