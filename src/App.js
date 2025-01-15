import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmployeesRequest } from './store/slices/employeeInfoSlice';
import EmployeesList from './components/EmployeesList';
import "./App.css";

export const App = () => {
  const dispatch = useDispatch();
  const { company: companyInfo, employees, loading, error } = useSelector((state) => {
    console.log(state);
    return state.data.data
  });
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    console.log("component");
    dispatch(getEmployeesRequest());
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="App">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search employees..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          aria-label="Search employees"
        />
      </div>
      <main id="main-content">
        <EmployeesList
          employees={employees}
          onEmployeeClick={(employee) => setSelectedEmp(employee)}
          selectedEmp={selectedEmp}
          searchValue={searchValue}
        />
      </main>
    </div>
  );
};


