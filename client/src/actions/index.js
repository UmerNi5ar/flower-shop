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
      alert({ message: error.message, type: 'error' });
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
          formData.append(data.files[i][1], data.files[i][0]);
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
      console.error(error);
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
          formData.append(data.files[i][1], data.files[i][0]);
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
      console.log(error.name);
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

      console.log(error.name);
    }
  };
};
