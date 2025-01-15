import React, { useEffect } from 'react';
// import './../assets/styles/employeeDetailModal.css';
import avatar from './../assets/images/account_circle.png';

const EmployeeDetailModal = React.forwardRef(({ employee, onClose }, ref) => {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Format the joining date
    const formatJoiningDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div
            className="modal-overlay"
            role="dialog"
            aria-labelledby="employee-name"
            aria-describedby="employee-details"
            onClick={onClose}
        >
            <div
                className="modal"
                onClick={(e) => e.stopPropagation()}
                tabIndex="0"
                ref={ref}
            >
                <button onClick={onClose} aria-label="Close modal" className="close-btn">
                    &times;
                </button>
                <div className="modal-content">
                    <div className="profile-header">
                        <div className="profile-image">
                            <img
                                src={avatar}
                                alt={`${employee?.firstName} ${employee?.lastName}`}
                            />
                        </div>
                        <div className="profile-info">
                            <h2 id="employee-name">
                                {employee?.firstName} {employee?.lastName}
                            </h2>
                            <p className="age">Age: {employee?.age}</p>
                        </div>
                    </div>
                    <div className="bottom-info">
                        <p className="job-title">{employee?.jobTitle}</p>
                        <p className="joining-date">Joined: {formatJoiningDate(employee?.dateJoined)}</p>
                    </div>
                    <p id="employee-details">{employee?.bio}</p>
                </div>
            </div>
        </div>
    );
});

export default EmployeeDetailModal;
