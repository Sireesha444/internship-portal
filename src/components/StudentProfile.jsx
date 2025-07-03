// StudentProfile.jsx
import React, { useState } from "react";
import axios from "axios";

function StudentProfile() {
  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/students/${studentId}`);
      setStudent(res.data);
    } catch (err) {
      alert("Student not found");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        placeholder="Enter Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button onClick={handleSearch} className="bg-green-600 text-white px-4 py-2 rounded">Search</button>

      {student && (
        <div className="mt-4 border p-4 rounded">
          <h2 className="text-lg font-bold">Student Profile</h2>
          <p><strong>ID:</strong> {student.studentId}</p>
          <p><strong>Name:</strong> {student.name}</p>
          <p><strong>Email:</strong> {student.email}</p>
          <p><strong>Phone:</strong> {student.phone}</p>
          <p><strong>Department:</strong> {student.department}</p>
        </div>
      )}
    </div>
  );
}

export default StudentProfile;
