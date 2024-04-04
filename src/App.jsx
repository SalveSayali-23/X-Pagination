import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchEmployeeData = async () => {
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const data = await res.json();
      // console.log(data);
      setEmployees(data);
      setTotalPages(Math.ceil(employees.length / 10));
    } catch (error) {
      console.error("failed to fetch data", error);
      alert('failed to fetch data');
    }
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // calculate total no. of pages
  // const totalPages = Math.ceil(employees.length / 10);
  // console.log(totalPages);

  const startIdx = (currentPage - 1) * 10;
  const endIdx = startIdx + 10;
  const currentEmployees = employees.slice(startIdx, endIdx);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="container">
      <h1> Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="button-container">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="button"
        >
          Previous
        </button>
        <button>
          <span>{currentPage}</span>
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
