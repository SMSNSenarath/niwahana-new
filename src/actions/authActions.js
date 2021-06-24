import axios from "axios";
import setAuthToken from "../utills/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";
// Register Worker
export const registerWorker = (workerData, history) => (dispatch) => {
  console.log(workerData);
  axios
    .post("/workers/register", workerData)
    .then((res) => {
      console.log(res);
      history.push("/worker-login");
    }) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Register Hirer
export const registerHirer = (hirerData, history) => (dispatch) => {
  axios
    .post("/hirers/register", hirerData)
    .then((res) => history.push("/hirer-login")) // re-direct to login on successful register
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
      })
    );
};

// Worker Login - get user token
export const loginWorker = (workerData) => (dispatch) => {
  axios
    .post("/workers/login", workerData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;

      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decodedW = jwt_decode(token);
      // Set current user
      console.log(decodedW);
      dispatch(setCurrentWorker(decodedW));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const setCurrentWorker = (decodedW) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedW,
  };
};

export const setWorkerLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Worker Login - get user token
export const loginHirer = (hirerData) => (dispatch) => {
  axios
    .post("/hirers/login", hirerData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decodedH = jwt_decode(token);
      // Set current user
      dispatch(setCurrentHirer(decodedH));
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// // Set logged in user
export const setCurrentHirer = (decodedH) => {
  return {
    type: SET_CURRENT_USER,
    payload: decodedH,
  };
};
// User loading
export const setHirerLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log worker out
export const logoutWorker = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentWorker({}));
};

// Log hirer out
export const logoutHirer = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentHirer({}));
};

//Reset Password
export const resetPasswordWorker = (userData, history) => (dispatch) => {
  console.log(userData);
  axios
    .post("/workers/reset-password", userData)
    .then((res) => {
      alert("Email Sent!");
      console.log(res);
    }) // re-direct to login on successful reset password
    .catch((err) => console.log(err));
};

export const resetPasswordHirer = (userData, history) => (dispatch) => {
  console.log(userData);
  axios
    .post("/hirers/reset-password", userData)
    .then((res) => {
      alert("Email Sent!");
      console.log(res);
    }) // re-direct to login on successful reset password
    .catch((err) => console.log(err));
};

//Update Password
export const newPasswordWorker = () => (userData) => {
  console.log(userData);
  axios
    .post("/workers/new-password", userData)
    .then((res) => {
      alert("Password Updated");
      console.log(res);
    })
    .catch((err) => console.log(err));
};

export const newPasswordHirer = () => (userData) => {
  axios
    .post("/hirers/new-password", userData)
    .then((res) => {
      alert("Password Updated");
      console.log(res);
    })
    .catch((err) => console.log(err));
};
