// import Stock from "../../models/Stock";
export const DELETE_STOCK = "DELETE_STOCK";
export const GET_STOCKS = "GET_STOCKS";
export const ADD_NEW_STOCK = "ADD_NEW_STOCK";
export const INITIALIZE_STOCK_OBJECTS = "INITIALIZE_STOCK_OBJECTS";
export const REMOVE_STOCK = "REMOVE_STOCK";
export const CALCULATE_TOTAL_AMOUNT = "CALCULATE_TOTAL_AMOUNT";

const idGen = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

class Stock {
  constructor(tickerName, quantity) {
    this.id = idGen();
    this.tickerName = tickerName;
    this.quantity = quantity;
  }
}

export const getStocks = (loggedInUserId) => {
  return async (dispatch, getState) => {
    // id of logged in user
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        `https://test2-b42c3-default-rtdb.firebaseio.com/usersPortfolio/${userId}.json`,

        {
          // create new data using a post request_
          method: "GET",
        }
      );

      const resData = await response.json();

      let loggedInStocks;

      for (const key in resData) {
        loggedInStocks = resData[key].portfolio; // list of stock objects
      }

      // false is repsonse returns not 200
      if (!response.ok) {
        throw new Error("400 bad request on fetchProducts request");
      }

      dispatch({
        type: GET_STOCKS,
        stocks: loggedInStocks,
      });
    } catch (err) {
      // do something when errors occur
      throw new Error("400 bad request on fetchProducts request");
    }
  };
};

// overwrites a users current portfolio with a new portfolio
const overWritePortfolio = async (updatedStocks, userId, name, phoneNumber) => {
  // first delete the entry, then create a new one at the same location with overridden details

  const response1 = await fetch(
    `https://test2-b42c3-default-rtdb.firebaseio.com/usersPortfolio/${userId}.json`,
    {
      // override data with PATCH request
      method: "DELETE",
    }
  );

  const response = await fetch(
    `https://test2-b42c3-default-rtdb.firebaseio.com/usersPortfolio/${userId}.json`,

    {
      // create new data using a post request
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName:name,
        phoneNumber: phoneNumber,
        portfolio: updatedStocks,
      }),
    }
  );

  const resData = await response.json();
};

export const intializeStockObjects = (stockObjectList) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // stockObjectList
    dispatch({
      type: INITIALIZE_STOCK_OBJECTS,
      stockObjectList: stockObjectList,
    });
  };
};

export const calculateTotalAmount = () => {
  return async (dispatch, getState) => {
    const currentStockObjectList = getState().stocks.stockObjects;
    const currentStockList = getState().stocks.userStocks;
    const currentTotalAmount = getState().stocks.totalAmount;

    dispatch({
      type: CALCULATE_TOTAL_AMOUNT,
      currentStockObjectList: currentStockObjectList,
      currentStockList: currentStockList,
      totalAmount: currentTotalAmount,
    });
  };
};

export const removeStock = (name) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // current list of stocks the user has created

    const response = await fetch(
      `https://test2-b42c3-default-rtdb.firebaseio.com/usersPortfolio/${userId}.json`,

      {
        // create new data using a post request_
        method: "GET",
      }
    );

    const resData = await response.json();

    // holds portfolio before new addition
    let loggedInStocks;
    let userFullName;
    let userPhoneNumber;


    for (const key in resData) {
      loggedInStocks = resData[key].portfolio;
      userFullName = resData[key].firstName; 
      userPhoneNumber = resData[key].phoneNumber;
    }

    let nameCopy = name.toLowerCase();
    let upperName = name.toUpperCase();

    // removes the stock object with the given stock name
    let newStocks = loggedInStocks.filter(function (value, index, arr) {
      return((value.tickerName || value.placeholder) ? (value.placeholder || (value.tickerName !== name && value.tickerName !== upperName && value.tickerName !== nameCopy)) : false);
    });


    // overwrites the firebase portfolio after removing it
    overWritePortfolio(newStocks, userId, userFullName, userPhoneNumber);

    // overWritePortfolio(newStocks, userId);
    dispatch({
      type: REMOVE_STOCK,
      updatedPortfolio: newStocks,
      name: name
    });
  };
};

export const addNewStock = (name, quantity) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userId = getState().auth.userId;
    // current list of stocks the user has created

    const response = await fetch(
      `https://test2-b42c3-default-rtdb.firebaseio.com/usersPortfolio/${userId}.json`,

      {
        // create new data using a post request_
        method: "GET",
      }
    );

    const resData = await response.json();

    // holds portfolio before new addition
    let loggedInStocks;
    let userFullName;
    let userPhoneNumber;

    for (const key in resData) {
      loggedInStocks = resData[key].portfolio;
      userFullName = resData[key].firstName; // can remove these 
      userPhoneNumber = resData[key].phoneNumber;
    }

    // HERE NAME SHOULD BE THE TIKCER STRING NOT A NAME ITSELF
    let newStock = new Stock(name, quantity);

    // take old portfolio and merge with new stock object
    loggedInStocks.push(newStock);

    overWritePortfolio(loggedInStocks, userId, userFullName, userPhoneNumber);

    dispatch({
      type: ADD_NEW_STOCK,
      updatedPortfolio: loggedInStocks,
    });
  };
};
