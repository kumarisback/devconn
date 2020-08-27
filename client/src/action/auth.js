import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'
import { setAlert } from './alert';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  //LOGIN_SUCCESS,
 // LOGIN_FAIL,
 // LOGOUT
} from './types';
// Load User
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try {
      const res = await axios.get('/api/auth');
  
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
        //console.log(err.message);
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

// Register User
export const register = formData => async dispatch => {
  try {
    const res = await axios.post('/api/users', formData);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};
