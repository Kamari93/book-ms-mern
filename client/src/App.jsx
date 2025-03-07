import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Books from "./components/Books";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import AddBook from "./components/AddBook";
import EditBook from "./components/EditBook";
import DeleteBook from "./components/DeleteBook";
import RegisterAdmin from "./components/RegisterAdmin";
import ViewBook from "./components/ViewBook";
import StudentTable from "./components/StudentTable";
import AdminTable from "./components/AdminTable";
import StudentBooksTable from "./components/StudentBooksTable";
import axios from "axios";

function App() {
  const [role, setRole] = useState("");
  axios.defaults.withCredentials = true; //lets us access the cookies
  useEffect(() => {
    axios
      .get("https://book-ms-server.vercel.app/auth/verify")
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books role={role} />} />
        <Route path="/login" element={<Login setRoleVar={setRole} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addstudent" element={<AddStudent />} />
        <Route path="/logout" element={<Logout setRole={setRole} />} />
        <Route path="/addbook" element={<AddBook />} />
        <Route path="/book/:id" element={<EditBook />} />
        <Route path="/delete/:id" element={<DeleteBook />} />
        <Route path="/registeradmin" element={<RegisterAdmin />} />
        <Route path="/viewbook/:id" element={<ViewBook />} />
        <Route path="/studenttable" element={<StudentTable />} />
        <Route path="/admintable" element={<AdminTable />} />
        <Route path="/studentbookstable" element={<StudentBooksTable />} />
        <Route
          path="/studentbookstable/:studentId"
          element={<StudentBooksTable />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
