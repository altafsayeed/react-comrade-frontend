import {
  SET_PINGS,
  LIKE_PING,
  UNLIKE_PING,
  LOADING_DATA,
  DELETE_PING,
  POST_PING,
  SET_PING,
  SUBMIT_COMMENT,
} from "../types";

const initialState = {
  pings: [],
  ping: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_PINGS:
      return {
        ...state,
        pings: action.payload,
        loading: false,
      };
    case SET_PING:
      return {
        ...state,
        ping: action.payload,
      };
    case LIKE_PING:
    case UNLIKE_PING:
      let index = state.pings.findIndex(
        (ping) => ping.pingId === action.payload.pingId
      );
      state.pings[index] = action.payload;
      if (state.ping.pingId === action.payload.pingId) {
        state.ping = action.payload;
      }
      return {
        ...state,
      };
    case DELETE_PING:
      index = state.ping.findIndex((ping) => ping.pingId === action.payload);
      state.pings.splice(index, 1);
      return {
        ...state,
      };
    case POST_PING:
      return {
        ...state,
        pings: [action.payload, ...state.pings],
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        ping: {
          ...state.ping,
          comments: [action.payload, ...state.ping.comments],
        },
      };
    default:
      return state;
  }
}
