import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.css';
import { alert } from '../../utils/alert';
import { signup } from '../../actions';
import { connect } from 'react-redux';
const Register = (props) => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const { name, email, password, passwordConfirm } = user;

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      alert({ message: 'Passwords do not match!', type: 'info' });
    } else if (password.length < 9 || passwordConfirm.length < 9) {
      alert({
        message: 'Password length must atleast 8 characters!',
        type: 'info',
      });
    } else {
      props.signup({ name, email, password, passwordConfirm });
    }
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  return (
    <div className="login">
      <div className="login_container">
        <h4 className="text-center">Register User</h4>

        <form onSubmit={submitHandler} encType="multipart/form-data">
          <div className="from_group">
            <label htmlFor="email_field">Name</label>
            <input
              className="from_input"
              name="name"
              value={name}
              onChange={onChange}
              type="text"
            />
          </div>
          <div className="from_group">
            <label htmlFor="email_field">Email</label>
            <input
              className="from_input"
              name="email"
              value={email}
              onChange={onChange}
              type="email"
            />
          </div>

          <div className="from_group">
            <label htmlFor="password_field">Password</label>
            <input
              className="from_input"
              name="password"
              value={password}
              onChange={onChange}
              type="password"
            />
          </div>
          <div className="from_group">
            <label htmlFor="password_field">Password Confirm</label>
            <input
              className="from_input"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={onChange}
              type="password"
            />
          </div>

          <div className="from_group">
            <button>"Register"</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <span>
            Already have an account ? <Link to="/login">Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { signup })(Register);
