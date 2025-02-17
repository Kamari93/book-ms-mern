import { React, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const DeleteBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .delete(`https://book-ms-server.vercel.app/book/book/${id}`)
      .then((res) => {
        if (res.data.deleted) {
          navigate("/books");
        }
      })
      .catch((err) => console.log(err));
  }, []);
};

export default DeleteBook;
