import {
  ADD_NEW_STOCK,
  GET_STOCKS,
  INITIALIZE_STOCK_OBJECTS,
  CALCULATE_TOTAL_AMOUNT,
  REMOVE_STOCK,
} from "../actions/stocks";


// user has no stocks until some are added
const initialState = {
  userStocks: [], // state is fetched from usersData table
  stockObjects: [], // list of stock objects fetched from finance api
  totalAmount: 0,
};

// initialize state by fetching data from table with given userId

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_STOCKS:
      let userStocks = action.stocks;
      return {
        userStocks: userStocks,
        stockObjects: state.stockObjects,
        totalAmount: state.totalAmount,
      };

    case ADD_NEW_STOCK:
      let updatedPortfolio = action.updatedPortfolio;
      return {
        userStocks: updatedPortfolio,
        stockObjects: state.stockObjects,
        totalAmount: state.totalAmount,
      };

    case INITIALIZE_STOCK_OBJECTS:
      return {
        userStocks: state.userStocks,
        stockObjects: action.stockObjectList,
        totalAmount: state.totalAmount,
      };

    case REMOVE_STOCK:
      let oldStocks = state.userStocks;
      let oldStockObjectList = state.stockObjects;

      let name = action.name;
      let nameLower = name.toLowerCase();
      let nameUpper = name.toUpperCase();

      // removes the stock object with the given stock name
      let newStocks = oldStocks.filter(function (value, index, arr) {
        return value.tickerName || value.placeholder
          ? (value.tickerName !==nameUpper &&
              value.tickerName !==nameLower &&
              value.tickerName !==name) ||
              value.placeholder
          : false;
      });

      let newStockObjects = oldStockObjectList.filter(function (
        value,
        index,
        arr
      ) {
        return value.symbol
          ? value.symbol !==name &&
              value.symbol !==nameUpper &&
              value.symbol !==nameLower
          : false;
      });

      console.log(newStocks);
      console.log(newStockObjects);
      

      return {
        userStocks: newStocks,
        stockObjects: newStockObjects,
        totalAmount: state.totalAmount,
      };
    // case GET_TOTAL_AMOUNT:
    //   return {
    //     userStocks: state.userStocks,
    //     stockObjects: state.stockObjectList,
    //     totalAmount: action.newTotal,
    //   };
    case CALCULATE_TOTAL_AMOUNT:
      let objectList = action.currentStockObjectList;
      let stockList = action.currentStockList;
      let oldTotal = state.totalAmount;

      // this function is not called on every element of the objectList, it is called once per update

      let newTotal = 0;

      if (objectList && stockList) {
        for (let i = 0; i < stockList.length; i++) {
          if (stockList[i].tickerName) {
            // both are string
            let currentSymbol = stockList[i].tickerName.toUpperCase();

            let currentQuant = stockList[i].quantity;

            let currentStockObject = objectList.find(
              (element) => element["symbol"] === currentSymbol
            );

            let newAddition;

            if (!currentStockObject) {
              newAddition = 0;
            } else {
              let currentStockPrice = currentStockObject["regularMarketPrice"];
              // old state before update

              newAddition =
                parseFloat(currentQuant) * parseFloat(currentStockPrice);

              newTotal += newAddition;
            }
          }
        }
      }

      return {
        userStocks: state.userStocks,
        stockObjects: state.stockObjects,
        totalAmount: newTotal ? newTotal : state.totalAmount,
      };
  }

  return state;
};
