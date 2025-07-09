import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
} from '@mui/material';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const CompanyAccessPage = () => {
  const [skill, setSkill] = useState('');
  const [students, setStudents] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!skill.trim()) {
      setError('Please enter a skill');
      setStudents([]);
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/students/search?skill=${skill}`);
      if (res.data.length === 0) {
        setError('No students found with that skill.');
        setStudents([]);
      } else {
        setError('');
        setStudents(res.data);
      }
    } catch (err) {
      setError('Error fetching students. Please try again.');
      setStudents([]);
    }
  };

  const exportToExcel = () => {
    if (!students.length) return;

    const data = students.map((student) => ({
      'Full Name': student.fullName,
      Email: student.email,
      Phone: student.phone,
      College: student.college,
      Department: student.department,
      Year: student.year,
      Skills: student.skills.join(', '),
      'Resume Link': student.resumeLink,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, `Students_Skilled_in_${skill}.xlsx`);
  };

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Search Students by Skill
      </Typography>

      <Box display="flex" justifyContent="center" gap={2} mt={4}>
        <TextField
          variant="outlined"
          label="Enter Skill (e.g., React, Data Science)"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          sx={{ width: 400 }}
        />
        <Button variant="contained" onClick={handleSearch}>
          SEARCH
        </Button>
      </Box>

      {error && (
        <Typography color="error" align="center" mt={4}>
          {error}
        </Typography>
      )}

      {students.length > 0 && (
        <>
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <Button variant="outlined" onClick={exportToExcel}>
              Export to Excel
            </Button>
          </Box>

          <Paper sx={{ mt: 2, p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Matching Students
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>College</TableCell>
                  <TableCell>Department</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Skills</TableCell>
                  <TableCell>Resume</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell>{student.fullName}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.phone}</TableCell>
                    <TableCell>{student.college}</TableCell>
                    <TableCell>{student.department}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>{student.skills.join(', ')}</TableCell>
                    <TableCell>
                      <a href={student.resumeLink} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </>
      )}
    </Container>
  );
};

export default CompanyAccessPage;
