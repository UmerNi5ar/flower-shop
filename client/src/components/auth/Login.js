import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../actions';
import { connect } from 'react-redux';
import './auth.css';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  const submitHandler = (e) => {
    e.preventDefault();
    props.login({ email, password });
  };
  return (
    <div className="login">
      <div className="login_container">
        <h3 className="text-center">Login</h3>

        <form onSubmit={submitHandler}>
          <div className="from_group">
            <label htmlFor="email_field">Email</label>
            <input
              className="from_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
            />
          </div>
          <div className="from_group">
            <label htmlFor="password_field">Password</label>
            <input
              className="from_input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="from_group">
            <button>{'Login'}</button>
          </div>
        </form>
        <div className="text-center mt-3">
          <div className="mt-3">
            Dont Have an account ? <Link to="/register">Signup</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { login })(Login);
