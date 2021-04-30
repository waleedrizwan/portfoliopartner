export const GET_ALERTS = "GET_ALERTS";
export const ADD_NEW_ALERT = "ADD_NEW_ALERT";
export const REMOVE_ALERT = "REMOVE_ALERT";

export const getAlerts = () => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    let userAlerts;

    try {
      const response = await fetch(
        `https://test2-b42c3-default-rtdb.firebaseio.com/usersAlerts/${userId}.json`,

        {
          method: "GET",
        }
      );

      const resData = await response.json();

      for (const key in resData) {
        userAlerts = resData[key].alerts; // list of alerts
      }

      if (!response.ok) {
        throw new Error("400 bad request on fetchProducts request");
      }

      dispatch({
        type: GET_ALERTS,
        userAlerts: userAlerts,
      });
    } catch (err) {
      // do something when errors occur
      console.log(err);
      throw new Error("400 bad request on fetch alerts request");
    }
  };
};

// overwrites a users current alerts object with updatedAlerts
const overWriteAlerts = async (updatedAlerts, userId) => {
  // first delete the entry, then create a new one at the same location with overridden details
  const response1 = await fetch(
    `https://test2-b42c3-default-rtdb.firebaseio.com/usersAlerts/${userId}.json`,
    {
      // override data with PATCH request
      method: "DELETE",
    }
  );

  const response = await fetch(
    `https://test2-b42c3-default-rtdb.firebaseio.com/usersAlerts/${userId}.json`,

    {
      // create new data using a post request
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        alerts: updatedAlerts,
      }),
    }
  );

  const resData = await response.json();
  const resData1 = await response1.json();
};

export const removeAlert = (stockName, limitPrice) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // current list of alerts the user has created

    const response = await fetch(
      `https://test2-b42c3-default-rtdb.firebaseio.com/usersAlerts/${userId}.json`,

      {
        // create new data using a post request
        method: "GET",
      }
    );

    const resData = await response.json();

    for (const key in resData) {
      var previousAlerts = resData[key].alerts;
    }

    let newAlerts = [];

    for (let i = 0; i < previousAlerts.length; i++) {
      // will give ticker name of object
      if (
        Object.keys(previousAlerts[i])[0] === stockName &&
        previousAlerts[i][Object.keys(previousAlerts[i])[0]] === limitPrice
      ) {
      } else {
        newAlerts.push(previousAlerts[i]);
      }
    }

    const resp = await overWriteAlerts(newAlerts, userId);

    dispatch({
      type: REMOVE_ALERT,
      updatedAlerts: newAlerts,
    });
  };
};

export const addNewAlert = (stockName, limitPrice) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // current list of alerts the user has created

    const response = await fetch(
      `https://test2-b42c3-default-rtdb.firebaseio.com/usersAlerts/${userId}.json`,

      {
        // create new data using a post request
        method: "GET",
      }
    );

    const resData = await response.json();

    // holds portfolio before new addition
    let previousAlerts;

    for (const key in resData) {
      previousAlerts = resData[key].alerts;
    }

    let newAlertObject = {};
    newAlertObject[stockName] = limitPrice;

    // need to add the new alert to the list of objects
    let newAlerts = [...previousAlerts, newAlertObject];
    console.log(newAlerts);

    overWriteAlerts(newAlerts, userId);

    dispatch({
      type: ADD_NEW_ALERT,
      updatedAlerts: newAlerts,
    });
  };
};
