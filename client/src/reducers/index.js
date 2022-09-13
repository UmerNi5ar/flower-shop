import { combineReducers } from 'redux';
import _ from 'lodash';

const shipments = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_ENTRY':
      return {
        ...state,
        data: { ...state.data, ...{ [action.payload._id]: action.payload } },
      };
    case 'EDIT_ENTRY':
      const newD = { [action.payload._id]: action.payload };
      const prevD = state.data;

      Object.assign(prevD, newD);

      return {
        ...state,
        data: prevD,
      };
    case 'GET_SHIPMENTS_DATA':
      return {
        ...state,
        data: { ..._.mapKeys(action.payload, '_id') },
        isLoading: false,
      };

    case 'LOADING':
      return { ...state, isLoading: true };
    case 'DELETE_ENTRY':
      let data = _.omit(state.data, action.payload._id);
      let stateData = { ...state, data: undefined };

      return { stateData, data, isLoading: false };
    default:
      if (!state.data)
        return {
          ...state,

          isLoading: true,
        };

      return { ...state };
  }
};
const monthlyData = (state = [], action) => {
  switch (action.type) {
    case 'GET_MONTHLY_DATA':
      return {
        ...state,
        monthlyData: action.payload,
      };

    default:
      if (!state.monthlyData)
        return {
          ...state,
          isLoading: true,
        };
  }
};

const auth = (state = [], action) => {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOG_OUT':
      return {
        ...state,
        user: undefined,
      };
    case 'SIGN_UP':
      return {
        ...state,
        user: action.payload,
      };
    case 'GET_ME':
      let a = 'gett in';
      return {
        ...state,
        user: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default combineReducers({
  shipments,
  monthlyData,
  auth,
});
