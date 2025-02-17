import React from "react";
import "../css/Book.css";
import { Link } from "react-router-dom";

const BookCard = ({ book, role }) => {
  const { title, author, imageUrl } = book;
  const truncateTitle = (title) => {
    return title.length > 15 ? title.slice(0, 15) + "..." : title;
  };
  // console.log(`--------${book}`);
  return (
    <div className="book-card">
      <img src={imageUrl} alt={title} className="book-image" />
      <div className="book-details">
        <h3>{truncateTitle(title)}</h3>
        <p>Author: {author}</p>
      </div>
      {role === "admin" && (
        <div className="book-actions">
          <Link to={`/book/${book._id}`} className="btn-link">
            <button>Edit</button>
          </Link>

          <Link to={`/delete/${book._id}`} className="btn-link">
            <button>Delete</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default BookCard;
