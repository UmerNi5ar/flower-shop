import React, { useEffect } from 'react';

// import { activeEmail, clearErrors } from "../../actions/userActions";

const ActivationEmail = ({ history }) => {
  return (
    <div className="mt-5">
      <div className="container">
        <div className="d-flex flex-column align-items-center justify-content-center">
          <h3>
            If you want to active your account. Please hit the active button.
          </h3>
          <button className="btn btn-success mt-5">Active</button>
        </div>
      </div>
    </div>
  );
};

export default ActivationEmail;
