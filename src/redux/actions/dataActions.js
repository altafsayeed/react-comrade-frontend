import {
  SET_PINGS,
  LOADING_DATA,
  LIKE_PING,
  UNLIKE_PING,
  DELETE_PING,
  SET_ERRORS,
  CLEAR_ERRORS,
  POST_PING,
  LOADING_UI,
  SET_PING,
  STOP_LOADING_UI,
  SUBMIT_COMMENT,
} from "../types";
import axios from "axios";

//Get all pings
export const getPings = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/pings")
    .then((res) => {
      dispatch({
        type: SET_PINGS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_PINGS,
        payload: [],
      });
    });
};
export const getPing = (pingId) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .get(`/ping/${pingId}`)
    .then((res) => {
      dispatch({
        type: SET_PING,
        payload: res.data,
      });
      dispatch({ type: STOP_LOADING_UI });
    })
    .catch((err) => console.log(err));
};
//Post a ping
export const postPing = (newPing) => (dispatch) => {
  dispatch({ type: LOADING_UI });
  axios
    .post("/ping", newPing)
    .then((res) => {
      dispatch({
        type: POST_PING,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};

//Like a ping
export const likePing = (pingId) => (dispatch) => {
  axios
    .get(`/ping/${pingId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_PING,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//Unlike a ping
export const unlikePing = (pingId) => (dispatch) => {
  axios
    .get(`/ping/${pingId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_PING,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
//Submit a comment
export const submitComment = (pingId, commentData) => (dispatch) => {
  axios
    .post(`/ping/${pingId}/comment`, commentData)
    .then((res) => {
      dispatch({
        type: SUBMIT_COMMENT,
        payload: res.data,
      });
      dispatch(clearErrors());
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    });
};
//Delete a ping
export const deletePing = (pingId) => (dispatch) => {
  axios
    .delete(`/ping/${pingId}`)
    .then(() => {
      dispatch({ type: DELETE_PING, payload: pingId });
    })
    .catch((err) => console.log(err));
};

export const getUserData = (userHandle) => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get(`/user/${userHandle}`)
    .then((res) => {
      dispatch({
        type: SET_PINGS,
        payload: res.data.pings,
      });
    })
    .catch(() => {
      dispatch({
        type: SET_PINGS,
        payload: null,
      });
    });
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
