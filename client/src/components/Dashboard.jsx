import { React, useEffect, useState } from "react";
import "../css/Dashboard.css";
import axios from "axios";

const Dashboard = () => {
  const [students, setStudents] = useState(0);
  const [admin, setAdmin] = useState(0);
  const [books, setBooks] = useState(0);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://book-ms-server.vercel.app/dashboard")
      .then((res) => {
        if (res.data.ok) {
          setStudents(res.data.students);
          setAdmin(res.data.admins);
          setBooks(res.data.books);
          // console.log(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="dashboard">
      <h1>Dashboard Overview</h1>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Total Books</h2>
          <h3>{books}</h3>
        </div>
        <div className="dashboard-card">
          <h2>Total Students</h2>
          <h3>{students}</h3>
        </div>
        <div className="dashboard-card">
          <h2>Total Admin</h2>
          <h3>{admin}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
