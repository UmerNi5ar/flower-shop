import React, { useState } from 'react';
import { createAdmin } from '../../actions';

import { connect } from 'react-redux';

const CreateAdmin = (props) => {
  const [email, setEmail] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    props.createAdmin(email);
  };
  return (
    <div className="login">
      <div className="login_container">
        <h4 className="text-center">Create Admin</h4>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (props.state.user.role !== 'admin') {
              alert({
                message: 'You are not authorized to perform this action!',
                type: 'info',
              });
            } else submitHandler(e);
          }}
          className="mt-3"
        >
          <div className="from_group">
            <label htmlFor="email_field">Email</label>
            <input
              className="from_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required="true"
            />
          </div>

          <div className="from_group">
            <button type="submit">{'Send'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { state: state.auth };
};
export default connect(mapStateToProps, { createAdmin })(CreateAdmin);
