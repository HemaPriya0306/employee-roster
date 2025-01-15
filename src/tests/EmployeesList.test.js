import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmployeesList from '../components/EmployeesList';

// Mock employee data for testing
const employees = [
  {
    id: 1,
    firstName: 'Test',
    lastName: 'User',
    contactNo: '1234567890',
    address: '123 xyz St',
  },
  {
    id: 2,
    firstName: 'Test',
    lastName: 'UserTwo',
    contactNo: '9876543210',
    address: '456 abc St',
  },
];

// Mock function for employee click
const mockEmployeeClick = jest.fn();

describe('EmployeesList component', () => {
  it('renders with no employees', () => {
    const { getByText } = render(
      <EmployeesList employees={[]} onEmployeeClick={mockEmployeeClick} selectedEmp={null} searchValue="" />
    );
    const noEmployeesMessage = getByText('No employees found.');
    expect(noEmployeesMessage).toBeInTheDocument();
  });

  it('renders with employees and matches snapshot', () => {
    const { container } = render(
      <EmployeesList employees={employees} onEmployeeClick={mockEmployeeClick} selectedEmp={null} searchValue="" />
    );
    expect(container).toMatchSnapshot();
  });

  it('renders filtered employees based on searchValue', () => {
    const { getByText, queryByText } = render(
      <EmployeesList employees={employees} onEmployeeClick={mockEmployeeClick} selectedEmp={null} searchValue="Two" />
    );
    expect(getByText('Test UserTwo')).toBeInTheDocument();
    expect(queryByText('Test User')).not.toBeInTheDocument();
  });

  it('calls onEmployeeClick when an employee row is clicked', () => {
    const { getByText } = render(
      <EmployeesList employees={employees} onEmployeeClick={mockEmployeeClick} selectedEmp={null} searchValue="" />
    );
    const johnDoeRow = getByText('Test User');
    fireEvent.click(johnDoeRow);
    expect(mockEmployeeClick).toHaveBeenCalledWith(employees[0]);
  });

  it('calls onEmployeeClick when Enter key is pressed on an employee row', () => {
    const { getByText } = render(
      <EmployeesList employees={employees} onEmployeeClick={mockEmployeeClick} selectedEmp={null} searchValue="" />
    );
    const johnDoeRow = getByText('Test User');
    fireEvent.keyDown(johnDoeRow, { key: 'Enter', code: 'Enter' });
    expect(mockEmployeeClick).toHaveBeenCalledWith(employees[0]);
  });

  it('calls onEmployeeClick when Space key is pressed on an employee row', () => {
    const { getByText } = render(
      <EmployeesList employees={employees} onEmployeeClick={mockEmployeeClick} selectedEmp={null} searchValue="" />
    );
    const johnDoeRow = getByText('Test User');
    fireEvent.keyDown(johnDoeRow, { key: ' ', code: 'Space' });
    expect(mockEmployeeClick).toHaveBeenCalledWith(employees[0]);
  });
});
