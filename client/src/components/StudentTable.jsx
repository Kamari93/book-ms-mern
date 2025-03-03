import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/StudentTable.css";
import { useNavigate } from "react-router-dom"; // Import navigate

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedStudent, setEditedStudent] = useState({
    username: "",
    grade: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(
        "https://book-ms-server.vercel.app/student/students"
      );
      setStudents(res.data);
    } catch (err) {
      console.error("Failed to fetch students", err);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedStudent({
      username: students[index].username,
      grade: students[index].grade,
    });
  };

  const handleCancel = () => {
    setEditIndex(null);
    setEditedStudent({ username: "", grade: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedStudent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (id) => {
    try {
      await axios.put(
        `https://book-ms-server.vercel.app/student/students/${id}`,
        editedStudent
      );
      fetchStudents();
      setEditIndex(null);
    } catch (err) {
      console.error("Failed to update student", err);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`https://book-ms-server.vercel.app/student/${id}`);
      setStudents(students.filter((student) => student._id !== id));
      alert("Student deleted successfully");
    } catch (err) {
      console.error("Error deleting student", err);
      alert("Failed to delete student");
    }
  };

  const handleViewCheckedOutBooks = (studentId) => {
    navigate(`/studentbookstable/${studentId}`); // Navigate to StudentBooksTable for this student
  };

  // Filter students based on search term
  const filteredStudents = students.filter(
    (student) =>
      student.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-table-container">
      <h2>All Students</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by name or grade..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <table className="student-table">
        <thead>
          <tr>
            <th>Roll No</th>
            <th>Name</th>
            <th>Grade</th>
            <th>Role</th>
            <th>Book Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => (
            <tr key={student._id}>
              <td>{student.roll}</td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="username"
                    value={editedStudent.username}
                    onChange={handleChange}
                  />
                ) : (
                  student.username
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input
                    type="text"
                    name="grade"
                    value={editedStudent.grade}
                    onChange={handleChange}
                  />
                ) : (
                  student.grade
                )}
              </td>
              <td>Student</td>
              <td className="book-status-cell">
                <button
                  className="checked-out-btn"
                  onClick={() => handleViewCheckedOutBooks(student._id)}
                >
                  Checked Out Books
                </button>
              </td>
              <td>
                {editIndex === index ? (
                  <div className="button-group">
                    <button onClick={() => handleSave(student._id)}>
                      Save
                    </button>
                    <button onClick={handleCancel}>Cancel</button>
                  </div>
                ) : (
                  <div className="button-group">
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(student._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentTable;
