import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../actions';
import { connect } from 'react-redux';
const Header = (props) => {
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
          {props.state.auth.user.role === 'admin' ? (
            <div>
              <Link to="/createAdmin">Create Admin</Link>
            </div>
          ) : (
            ''
          )}

          <div className="fixed-button">
            <button
              onClick={(e) => {
                e.preventDefault();
                props.logout();
              }}
              className="logout__button"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { state: state };
};
export default connect(mapStateToProps, { logout })(Header);
