import { React, useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

  // axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://book-ms-server.vercel.app/book/add", {
        title,
        author,
        imageUrl,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.added) {
          navigate("/books");
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Add Book</h2>
        <div className="form-group">
          <label htmlFor="book">Book Title:</label>
          <input
            type="text"
            id="book"
            name="book"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddBook;
