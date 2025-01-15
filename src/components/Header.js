import React from 'react';
import './../assets/styles/header-footer.css';

const Header = ({ companyInfo}) => {
  const formatCompEst = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
};
  return (
    <header className="fixed-header">
      <div className="company-info">
        <h1>{companyInfo?.companyName}</h1>
        <p>{companyInfo?.companyMotto}</p>
        
      </div>
      <p>Since: {formatCompEst(companyInfo?.companyEst)}</p>
    </header>
  );
};

export default Header;
