import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesRequest } from './store/slices/employeeInfoSlice';
import EmployeesList from './components/EmployeesList';
import "./App.css";
import EmployeeDetailModal from './components/EmployeeDetailModal';
import Footer from './components/Footer';
import Header from './components/Header';

export const App = () => {
  const dispatch = useDispatch();
  const { data: { companyInfo }, data: { employees }, error, loading } = useSelector((state) => {
    return state.data
  });
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(1);  // Current page
  const [employeesPerPage] = useState(5);
  const modalRef = useRef();

  // Calculate the total number of pages
  const filteredEmployees = employees?.filter((emp) => emp?.firstName?.toLowerCase().includes(searchValue.toLowerCase()) ||
    emp?.lastName?.toLowerCase().includes(searchValue?.toLowerCase()));

  const totalPages = Math.ceil(filteredEmployees?.length / employeesPerPage);

  // Calculate the index of the first and last employee on the current page
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  // Slice the employee list to only show the employees for the current page
  const currentEmployees = filteredEmployees?.slice(indexOfFirstEmployee, indexOfLastEmployee);

  useEffect(() => {
    dispatch(getEmployeesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEmp && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedEmp]);

  const handleSearch = (searchValue) => {
    setSearchValue(searchValue);
    setCurrentPage(1);
  }

  const handleRowClick = (employee) => {
    setSelectedEmp(employee);
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle next page click
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="loading-block">
        <p>Loading...</p>
      </div>
    );
  } else if (error) {
    return (
      <div className="error-block">
        <p>Error: {error}</p>
      </div>
    );
  } else {
    return (
      <div className="App">
        <Header
          companyInfo={companyInfo}
        />
        <main id="main-content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchValue}
              onChange={(e) => handleSearch(e.target.value)}
              aria-label="Search employees"
            />
          </div>
          <EmployeesList
            currentEmployees={currentEmployees}
            onEmployeeClick={(employee) => handleRowClick(employee)}
            selectedEmp={selectedEmp}
            searchValue={searchValue}
          />

          {currentEmployees && <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>

            {/* Display page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}

            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>}
        </main>
        {selectedEmp && (
          <EmployeeDetailModal
            ref={modalRef}
            employee={selectedEmp}
            onClose={() => setSelectedEmp(null)}
          />
        )}
        <Footer />
      </div>
    );
  }

};
