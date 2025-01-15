import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import EmployeeDetailModal from '../components/EmployeeDetailModal';

const employee = {
  firstName: 'Test',
  lastName: 'User',
  age: 30,
  jobTitle: 'Software Engineer',
  dateJoined: '2021-01-01',
  bio: 'Software engineer.',
};

describe('EmployeeDetailModal component', () => {
  // Mock function for closing the modal
  const mockOnClose = jest.fn();

  afterEach(() => {
    mockOnClose.mockClear();
  });

  it('renders the modal with employee details', () => {
    const { getByText, getByAltText } = render(
      <EmployeeDetailModal employee={employee} onClose={mockOnClose} />
    );

    expect(getByText('Test User')).toBeInTheDocument();
    expect(getByText('Age: 30')).toBeInTheDocument();
    expect(getByText('Software Engineer')).toBeInTheDocument();
    expect(getByText('Joined: January 1, 2021')).toBeInTheDocument();
    expect(getByText('Software engineer.')).toBeInTheDocument();
    expect(getByAltText('Test User')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const { getByLabelText } = render(
      <EmployeeDetailModal employee={employee} onClose={mockOnClose} />
    );

    const closeButton = getByLabelText('Close modal');
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when clicking outside the modal', () => {
    const { getByRole } = render(
      <EmployeeDetailModal employee={employee} onClose={mockOnClose} />
    );

    const modalOverlay = getByRole('dialog');
    fireEvent.click(modalOverlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('prevents closing when clicking inside the modal', () => {
    const { getByText } = render(
      <EmployeeDetailModal employee={employee} onClose={mockOnClose} />
    );

    const modalContent = getByText('Software Engineer');
    fireEvent.click(modalContent);

    expect(mockOnClose).toHaveBeenCalledTimes(0); // The onClose shouldn't be called
  });

  it('calls onClose when the Escape key is pressed', () => {
    const { container } = render(
      <EmployeeDetailModal employee={employee} onClose={mockOnClose} />
    );

    fireEvent.keyDown(container, { key: 'Escape', code: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
