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
  const modalRef = useRef();

  useEffect(() => {
    dispatch(getEmployeesRequest());
  }, [dispatch]);

  useEffect(() => {
    if (selectedEmp && modalRef.current) {
      modalRef.current.focus();
    }
  }, [selectedEmp]);

  if (loading) {
    return (
      <div className="loading-block">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-block">
        <p>Error: {error}</p>
      </div>
    );
  }

  const handleRowClick = (employee) => {
    setSelectedEmp(employee);
  };

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
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search employees"
          />
        </div>
        <EmployeesList
          employees={employees}
          onEmployeeClick={(employee) => handleRowClick(employee)}
          selectedEmp={selectedEmp}
          searchValue={searchValue}
        />
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
};


