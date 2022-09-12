import axios from 'axios';
import { alert } from '../utils/alert/index';
import createBrowserHistory from '../history';

export const deleteEntry = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/api/v1/bloomex/deleteShipment`, {
        data,
      });
      dispatch({
        type: 'DELETE_ENTRY',
        payload: response.data.shipment,
      });
      alert({ message: 'Delete Shipment!', type: 'success' });
    } catch (error) {
      alert({
        message: 'Please wait before trying again!',
        type: 'info',
      });
      console.log(error);
    }
  };
};
export const editEntry = (data) => {
  return async (dispatch) => {
    try {
      data = { ...data, tableData: undefined };
      ///////////// Delete Already existing files
      let removeFiles = [];
      let responseData = {};

      if (data.files.length > 0) {
        /// File Exists
        let changedFiles = data.changeFiles;

        for (let i = 0; changedFiles.length > i; i++) {
          //   /// Go through all files in changed
          let el = changedFiles[i];
          if (el) {
            let check = data.files.some((file) => {
              let filename = file[1].split(' ')[0];

              return el.startsWith(`${filename}-`);
            });
            if (check) {
              removeFiles.push(el);
            }
          }
        }

        data = { ...data, changeFiles: undefined, deleteFiles: removeFiles };
      }

      responseData = await axios.patch(`/api/v1/bloomex/updateShipment`, data);
      if (data.files.length > 0) {
        let formData = new FormData();
        formData.append('id', data.id);

        for (let i = 0; data.files.length > i; i++) {
          for (let z = 0; data.file[i].length > z; z++) {
            console.log(data.files[i][1], z);
            formData.append(data.files[i][1], data.files[i][0]);
          }
        }
        const response = await axios.post(
          `/api/v1/bloomex/postImage`,
          formData
        );
        responseData = {
          ...responseData.data.updatedShipment,
          ...response.data.names,
        };
      }

      if (responseData.data) responseData = responseData.data.updatedShipment;

      dispatch({ type: 'EDIT_ENTRY', payload: responseData });
      alert({ message: 'Edited Successfully', type: 'success' });
      createBrowserHistory.push('/');
    } catch (error) {
      alert({
        message: 'Something went wrong. Please try again later',
        type: 'error',
      });
      console.log(error);
    }
  };
};

export const createEntry = (data) => {
  return async (dispatch) => {
    try {
      let responseData = await axios.post(
        `/api/v1/bloomex/createShipment`,
        data
      );
      const id = responseData.data.shipment._id;
      let response;

      if (data.files.length > 0) {
        let formData = new FormData();
        formData.append('id', id);
        for (let i = 0; data.files.length > i; i++) {
          // data.files.map(async (arr) => {
          for (let z = 0; data.files[i].length > z; z++) {
            console.log(data.files[i][0].z, z, data.files[i][0]);
            formData.append(data.files[i][0], data.files[i]);
          }
        }
        response = await axios.post(`/api/v1/bloomex/postImage`, formData);
        responseData = {
          ...responseData.data.shipment,
          ...response.data.names,
        };
      }

      if (responseData.data) {
        responseData = { ...responseData.data.shipment };
      }

      dispatch({
        type: 'CREATE_ENTRY',
        payload: responseData,
      });
      alert({ message: 'Created Successfully', type: 'success' });
      createBrowserHistory.push('/');
    } catch (error) {
      alert({
        message: 'Something went wrong. Please try again later',
        type: 'error',
      });
      console.log(error);
    }
  };
};

export const getData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/v1/bloomex/fetchShipments`);

      dispatch({
        type: 'GET_SHIPMENTS_DATA',
        payload: response.data.shipments,
      });
      alert({ message: 'Fetched Data', type: 'success' });
    } catch (error) {
      alert({
        message: 'Something went wrong. Please try again later',
        type: 'error',
      });

      console.log(error);
    }
  };
};

////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////
//////////////////////////
//Login

export const signup = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);
      const response = await axios.post(`/api/v1/bloomex/signup`, data);
      console.log(response.data, 'from acrtion');
      dispatch({
        type: 'SIGN_UP',
        payload: response.data,
      });
      alert({ message: 'Created Account', type: 'success' });
      createBrowserHistory.push('/');
    } catch (error) {
      alert({
        message: `${error.response.data.message} SIGN_UP`,

        type: 'error',
      });

      console.log(error);
    }
  };
};

export const login = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);
      const response = await axios.post(`/api/v1/bloomex/login`, data);
      console.log(response.data);
      dispatch({
        type: 'LOG_IN',
        payload: response.data.data.user,
      });
      alert({ message: 'Logged In!', type: 'success' });
      console.log(response.data);
      createBrowserHistory.push('/');
    } catch (error) {
      alert({
        message: `${error.response.data.message} LOG_IN`,

        type: 'error',
      });

      console.log(error.message);
    }
  };
};

export const logout = (data) => {
  return async (dispatch) => {
    try {
      console.log(data);
      const response = await axios.get(`/api/v1/bloomex/logout`);
      dispatch({
        type: 'LOG_OUT',
        payload: response.data,
      });
      alert({ message: 'Logged Out', type: 'success' });
      createBrowserHistory.push('/login');
    } catch (error) {
      alert({
        message: `${error.response.data.message} LOG_OUT`,
        type: 'error',
      });

      console.log(error);
    }
  };
};

export const getMe = (data) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/v1/bloomex/me`, {
        withCredentials: true,
      });
      console.log(response, 'refresh user');

      dispatch({
        type: 'GET_ME',
        payload: response.data.user,
      });
    } catch (error) {
      console.log('will push from action');
      createBrowserHistory.push('/login');
      console.log(error);
    }
  };
};

export const createAdmin = (email) => {
  return async (dispatch) => {
    try {
      console.log(email, 'e');
      const response = await axios.patch(
        `/api/v1/bloomex/createAdmin/${email}`,
        {
          withCredentials: true,
        }
      );
      console.log('done');
      alert({
        message: `${email} was set to Admin!`,
        type: 'success',
      });
    } catch (error) {
      alert({
        message: `${error.response.data.message} CRATE_ADMIN`,
        type: 'error',
      });
      console.log(error);
    }
  };
};
