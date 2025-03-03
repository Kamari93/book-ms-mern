import { React, useState, useEffect } from "react";
import "../css/ViewBook.css"; // New CSS file for specific styling
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const ViewBook = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get(`https://book-ms-server.vercel.app/book/book/${id}`)
      .then((res) => {
        setBook(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!book) {
    return <p className="loading-text">Loading book details...</p>;
  }

  return (
    <div className="view-book-container">
      <div className="view-book-card">
        <img src={book.imageUrl} alt={book.title} className="view-book-image" />
        <div className="view-book-details">
          <h2 className="view-book-title">{book.title}</h2>
          <p className="view-book-author">
            <strong>Author:</strong> {book.author}
          </p>
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
