import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/AdminTable.css";

const AdminTable = () => {
  const [admins, setAdmins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 5;

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

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(
    indexOfFirstAdmin,
    indexOfLastAdmin
  );
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  // Pagination Handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () =>
    setCurrentPage(
      (prev) =>
        Math.min(prev + 1, Math.ceil(filteredAdmins.length / adminsPerPage)) //Math.ceil returns the smallest integer greater than or equal to the given number
    );
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1)); //the second param on the Math.max is the min value

  // Function to display pages with ellipsis
  const getPaginationNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      // Show all pages if 5 or fewer pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show the first page
      pageNumbers.push(1);

      if (currentPage > 3) {
        pageNumbers.push("...");
      }

      // Show 2 pages before and after current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(currentPage + 1, totalPages - 1);
        i++
      ) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push("...");
      }

      // Always show the last page
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

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
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Previous
          </button>

          {getPaginationNumbers().map((number, index) => (
            <button
              key={index}
              onClick={() => typeof number === "number" && paginate(number)}
              className={currentPage === number ? "active-page" : ""}
              disabled={number === "..."}
            >
              {number}
            </button>
          ))}

          <button onClick={nextPage} disabled={currentPage === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminTable;
