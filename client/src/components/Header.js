import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <header className="header">
        <h2 className="logo">Bloomex</h2>

        <nav className="nav">
          <div>
            <Link to="/">Home</Link>
          </div>
          <div>
            <Link to="/monthlyAnalysis">Monthly Analysis</Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
