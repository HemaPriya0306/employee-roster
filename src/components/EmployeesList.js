import React from 'react';
import './../assets/styles/employeesList.css';
import avatar from './../assets/images/account_circle.png';

const EmployeesList = ({ currentEmployees, onEmployeeClick, onSortClick, sortConfig, selectedEmp }) => {
  return (
    <div className="emp-list-container" aria-live="polite">
      <table className="emp-table">
        <thead>
          <tr>
            <th onClick={() => onSortClick('id')}>ID {sortConfig.key === 'id' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
            <th>Avatar</th>
            <th onClick={() => onSortClick('name')}>Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
            <th onClick={() => onSortClick('contactNo')}>Contact Number {sortConfig.key === 'contactNo' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
            <th onClick={() => onSortClick('address')}>Address {sortConfig.key === 'address' && (sortConfig.direction === 'asc' ? '↑' : '↓')}</th>
          </tr>
        </thead>
        <tbody>
          {currentEmployees?.length > 0 ? (currentEmployees?.map((employee) => (
            <tr
              key={employee.id}
              className={selectedEmp?.id === employee.id ? 'selected-row' : ''}
              onClick={() => onEmployeeClick(employee)}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onEmployeeClick(employee);
                }
              }}
              role="button"
              aria-label={`View details for ${employee.firstName} ${employee.lastName}`}
            >
              <td>{employee.id}</td>
              <td className="emp-avatar-cell">
                <img alt={`${employee.firstName} ${employee.lastName}'s avatar`}
                  className="emp-avatar" src={avatar} />
              </td>
              <td>{employee.firstName} {employee.lastName}</td>
              <td>{employee.contactNo}</td>
              <td>{employee.address}</td>
            </tr>
          ))
          ) : (
            <tr>
              <td colSpan="5" style={{textAlign: "center"}}>No employees found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeesList;
