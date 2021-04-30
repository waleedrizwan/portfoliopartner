import { GET_ALERTS, ADD_NEW_ALERT, REMOVE_ALERT } from "../actions/alerts";

// user has no alerts until some are added
const initialState = {
  alerts: [], // state is fetched from firebase
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALERTS:
      let userAlerts = action.userAlerts;
      return {
        alerts: userAlerts,
      };
    case ADD_NEW_ALERT:
      return {
        alerts: action.updatedAlerts,
      };
    case REMOVE_ALERT:
      return {
        alerts: action.updatedAlerts,
      };
    default:
      return state;
  }

};
