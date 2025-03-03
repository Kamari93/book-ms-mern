import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/StudentBooksTable.css";

const StudentBooksTable = () => {
  const { studentId } = useParams(); // Get studentId from URL (for admin)
  const [checkedOutBooks, setCheckedOutBooks] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const fetchBooks = async () => {
    try {
      let res;
      if (studentId) {
        // Admin viewing specific student's books
        res = await axios.get(
          `https://book-ms-server.vercel.app/student/${studentId}/books`,
          {
            withCredentials: true,
          }
        );
        // setUsername(res.data.username);
        setCheckedOutBooks(res.data.checkedOutBooks);
        setStudentName(res.data.username);
      } else {
        // Student viewing their own books
        res = await axios.get(
          "https://book-ms-server.vercel.app/student/my-books",
          {
            withCredentials: true,
          }
        );
        setCheckedOutBooks(res.data);
      }

      setLoading(false);
    } catch (err) {
      setMessage("Error fetching books");
      setLoading(false);
    }
  };

  // Ensure fetchBooks runs on component mount and whenever studentId changes
  useEffect(() => {
    fetchBooks();
  }, [studentId]);

  const handleReturnBook = async (bookId) => {
    try {
      await axios.post(
        `https://book-ms-server.vercel.app/book/return/${studentId}/${bookId}`,
        {},
        { withCredentials: true }
      );

      // Re-fetch the updated list from the backend
      fetchBooks();
    } catch (error) {
      console.error("Error returning book:", error);
      setMessage("Failed to return book. Please try again.");
    }
  };

  return (
    <div className="student-books-container">
      {studentId ? (
        <h2>Books Checked Out by {studentName}</h2>
      ) : (
        <h2>My Checked Out Books</h2>
      )}
      {loading && <p>Loading books...</p>}
      {message && <p className="error-message">{message}</p>}

      {checkedOutBooks.length === 0 && !loading ? (
        <p>No books currently checked out.</p>
      ) : (
        <table className="student-books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              {studentId && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {checkedOutBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                {studentId && (
                  <td>
                    <button
                      className="return-book-button"
                      onClick={() => handleReturnBook(book._id)}
                    >
                      Returned
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Back Button (Only for Admin) */}
      {studentId && (
        <button
          className="back-button"
          onClick={() => navigate("/studenttable")}
        >
          ← Back
        </button>
      )}
    </div>
  );
};

export default StudentBooksTable;
