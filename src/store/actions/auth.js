export const SIGNUP = "SIGNUP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const DELETE_ACCOUNT = "DELETE_ACCOUNT";

export const deleteAccount = (userId) => {
  return async (dispatch) => {
    const response1 = await fetch(
      `https://test2-b42c3-default-rtdb.firebaseio.com/usersPortfolio/${userId}.json`,
      {
        // override data with PATCH request
        method: "DELETE",
      }
    );

    // set all state of user back to null or empty
    dispatch({ type: DELETE_ACCOUNT });
  };
};

export const signup = (email, password, phone, firstName) => {
  return async (dispatch, getState) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDimdNnAFjoffrSPP0H71zEKyimaw7J8SU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let errorMessage = "Something went wrong :(";

      if (errorId === "EMAIL_EXISTS") {
        errorMessage = "Email Address is already in use";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        errorMessage =
          "Too many incorrect sign in attempts, please try again later";
      } else if (errorId === "USER_DISABLED") {
        errorMessage = "This account has been disabled";
      }
      throw new Error(errorMessage);
    }

    const resData = await response.json();

    const createNewPortfolioResponse = await fetch(
      `https://test2-b42c3-default-rtdb.firebaseio.com/usersPortfolio/${resData.localId}.json`,

      {
        // create new data using a post request
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portfolio: [{ placeholder: 1 }],
          phoneNumber: phone,
          firstName: firstName,
        }),
      }
    );
    const createNewPortfolioResponseData = await createNewPortfolioResponse.json();
    console.log(createNewPortfolioResponseData);

    const createNewAlertsResponse = await fetch(
      `https://test2-b42c3-default-rtdb.firebaseio.com/usersAlerts/${resData.localId}.json`,

      {
        // create new data using a post request
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          alerts: [{ placeholder: 1 }],
        }),
      }
    );
    const createNewAlertsResponseData = await createNewAlertsResponse.json();
    console.log(createNewAlertsResponseData);

    dispatch({ type: SIGNUP, token: resData.idToken, userId: resData.localId });
  };
};

export const login = (email, password) => {
  return async (dispatch) => {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDimdNnAFjoffrSPP0H71zEKyimaw7J8SU",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      const errorResData = await response.json();
      const errorId = errorResData.error.message;
      let errorMessage = "Something went wrong :(";

      if (errorId === "EMAIL_NOT_FOUND") {
        errorMessage = "Email does not exist";
      } else if (errorId === "INVALID_PASSWORD") {
        errorMessage = "Incorrect Password";
      } else if (errorId === "USER_DISABLED") {
        errorMessage = "This account has been disabled";
      } else if (errorId === "TOO_MANY_ATTEMPTS_TRY_LATER") {
        errorMessage =
          "Too many incorrect sign in attempts, please try again later";
      }

      throw new Error(errorMessage);
    }

    const resData = await response.json();

    console.log(resData.localId);

    dispatch({ type: LOGIN, token: resData.idToken, userId: resData.localId });
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
