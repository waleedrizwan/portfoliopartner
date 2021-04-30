import { DELETE_ACCOUNT, LOGIN, LOGOUT, SIGNUP } from "../actions/auth";

const initialState = {
  token: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        token: action.token,
        userId: action.userId,
      };
    case SIGNUP:
      return {
        token: action.token,
        userId: action.userId,
      };

    case LOGOUT:
      return {
        token: null,
        userId: null,
      };
    case DELETE_ACCOUNT:
      return {
        token: null,
        userId: null,
      };

    default:
      return state;
  }
};
