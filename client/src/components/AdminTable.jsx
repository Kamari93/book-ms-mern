import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminTable.css";

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get(
          "https://book-ms-server.vercel.app/admin/all"
        );
        setAdmins(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmins();
  }, []);

  // Filter admins based on search input
  const filteredAdmins = admins.filter((admin) =>
    admin.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-table-container">
      <h2>Admin List</h2>
      <input
        type="text"
        placeholder="Search by username..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="admin-table">
        <thead>
          <tr>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.length > 0 ? (
            filteredAdmins.map((admin) => (
              <tr key={admin._id}>
                <td>{admin.username}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="1">No admins found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
