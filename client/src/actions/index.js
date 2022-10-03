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
      alert({ message: 'Deleted Shipment!', type: 'success' });
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
      alert({
        message: 'Working on your request. Please wait....',
        type: 'info',
      });
      createBrowserHistory.push('/');
      if (data.files.length > 0) {
        /// File Exists
        let changedFiles = data.changeFiles;

        for (let i = 0; changedFiles.length > i; i++) {
          //   /// Go through all files in changed
          let el = changedFiles[i];
          if (el) {
            let check = data.files.some((file) => {
              let filename = file[1].split(' ')[0];
              let insideCheck;
              el.forEach((elmnt) => {
                insideCheck = elmnt.startsWith(`${filename}-`);
              });
              return insideCheck;
            });
            if (check) {
              removeFiles.push(...el);
            }
          }
        }

        data = { ...data, changeFiles: undefined, deleteFiles: removeFiles };
      }

      responseData = await axios.patch(`/api/v1/bloomex/updateShipment`, data);
      // if (data.files.length > 0) {
      //   let formData = new FormData();
      //   formData.append('id', data.id);

      //   for (let i = 0; data.files.length > i; i++) {
      //     for (let z = 0; data.file[i].length > z; z++) {
      //       console.log(data.files[i][1], z);
      //       formData.append(data.files[i][1], data.files[i][0]);
      //     }
      //   }
      if (data.files.length > 0) {
        let formData = new FormData();
        formData.append('id', data.id);
        for (let i = 0; data.files.length > i; i++) {
          // data.files.map(async (arr) => {
          // eslint-disable-next-line no-loop-func
          Object.values(data.files[i][0]).map((el) => {
            formData.append(data.files[i][1], el);
          });
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
    } catch (error) {
      alert({
        message: 'Something went wrong. Please try again later',
        type: 'error',
      });
    }
  };
};
// export const editEntry = (data) => {
//   return async (dispatch) => {
//     try {
//       data = { ...data, tableData: undefined };
//       ///////////// Delete Already existing files
//       console.log(data.changeFiles, 'data.fiels');
//       let removeFiles = [];
//       let responseData = {};
//       alert({
//         message: 'Working on your request. Please wait....',
//         type: 'info',
//       });
//       if (data.files.length > 0) {
//         /// File Exists
//         let changedFiles = data.changeFiles;

//         for (let i = 0; changedFiles.length > i; i++) {
//           //   /// Go through all files in changed
//           let el = changedFiles[i];
//           if (el) {
//             let check = data.files.some((file) => {
//               let filename = file[1].split(' ')[0];
//               let insideCheck;
//               el.forEach((elmnt) => {
//                 insideCheck = elmnt.startsWith(`${filename}-`);
//               });
//               return insideCheck;
//             });
//             if (check) {
//               removeFiles.push(...el);
//             }
//           }
//         }

//         data = { ...data, changeFiles: undefined, deleteFiles: removeFiles };
//       }
//       console.log(data, 'sending data');

//       responseData = await axios.patch(`/api/v1/bloomex/updateShipment`, data);
//       // if (data.files.length > 0) {
//       //   let formData = new FormData();
//       //   formData.append('id', data.id);

//       //   for (let i = 0; data.files.length > i; i++) {
//       //     for (let z = 0; data.file[i].length > z; z++) {
//       //       console.log(data.files[i][1], z);
//       //       formData.append(data.files[i][1], data.files[i][0]);
//       //     }
//       //   }
//       if (data.files.length > 0) {
//         let formData = new FormData();
//         formData.append('id', data.id);
//         for (let i = 0; data.files.length > i; i++) {
//           // data.files.map(async (arr) => {
//           console.log(Object.values(data.files[i][0]));
//           // eslint-disable-next-line no-loop-func
//           Object.values(data.files[i][0]).map((el) => {
//             console.log(data.files[i][1], el, '............--------------');
//             formData.append(data.files[i][1], el);
//           });
//         }
//         const response = await axios.post(
//           `/api/v1/bloomex/postImage`,
//           formData
//         );

//         responseData = {
//           ...responseData.data.updatedShipment,
//           ...response.data.names,
//         };
//       }
//       console.log(responseData, 'action.payload 0');

//       if (responseData.data) responseData = responseData.data.updatedShipment;
//       console.log(responseData, 'action.payload');

//       dispatch({ type: 'EDIT_ENTRY', payload: responseData });
//       alert({ message: 'Edited Successfully', type: 'success' });
//     } catch (error) {
//       alert({
//         message: 'Something went wrong. Please try again later',
//         type: 'error',
//       });
//       console.log(error);
//     }
//   };
// };

export const createEntry = (data) => {
  return async (dispatch) => {
    try {
      let responseData = await axios.post(
        `/api/v1/bloomex/createShipment`,
        data
      );
      const id = responseData.data.shipment._id;
      let response;
      alert({
        message: 'Working on your request. Please wait....',
        type: 'info',
      });
      createBrowserHistory.push('/');

      if (data.files.length > 0) {
        let formData = new FormData();
        formData.append('id', id);
        for (let i = 0; data.files.length > i; i++) {
          // data.files.map(async (arr) => {

          // eslint-disable-next-line no-loop-func
          //   Object.values(data.files[i][0]).map((el) => {
          //     formData.append(data.files[i][1], el);
          //   });
          // }
          // const response = await axios.post(
          //   `/api/v1/bloomex/postImage`,
          //   formData
          // );
          Object.values(data.files[i][0]).forEach(async (el) => {
            formData.append(data.files[i][1], el);
          });
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
      const response = await axios.post(`/api/v1/bloomex/signup`, data);
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
      const response = await axios.post(`/api/v1/bloomex/login`, data);
      dispatch({
        type: 'LOG_IN',
        payload: response.data.data.user,
      });
      alert({ message: 'Logged In!', type: 'success' });
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

      dispatch({
        type: 'GET_ME',
        payload: response.data.user,
      });
    } catch (error) {
      createBrowserHistory.push('/login');
      console.log(error);
    }
  };
};

export const createAdmin = (email) => {
  return async (dispatch) => {
    try {
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
