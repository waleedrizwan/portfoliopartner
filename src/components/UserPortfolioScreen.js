import { useState, useEffect } from "react";
import * as stockActions from "../store/actions/stocks";
import { useSelector, useDispatch } from "react-redux";
import StockList from "./StockList";
import BarLoader from "react-spinners/BarLoader";
import { css } from "@emotion/core";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import "./portfolioscreen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ExclamationTriangle } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

import {
  ToggleOff,
  ToggleOn,
  ChatLeftTextFill,
  Plus,
  Bell,
  Pencil,
} from "react-bootstrap-icons";

const UserPortfolioScreen = (props) => {
  const [stockName, setStockName] = useState();
  const [stockQuant, setStockQuant] = useState();
  const [stockObjectList, setStockObjectList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPortfolioAmount, setTotalPortfolioAmount] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(true);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);
  const [showAdd, setShowAdd] = useState(false);
  const handleShowAdd = () => setShowAdd(true);
  const handleCloseAdd = () => setShowAdd(false);
  const [showSure, setShowSure] = useState(false);
  const handleCloseSure = () => setShowSure(false);

  const dispatch = useDispatch();

  // if empty or null should history push to sign in
  const userId = useSelector((state) => state.auth.userId);

  const history = useHistory();

  if (!userId) {
    history.push("/home");
  }

  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  // run once when component is rendered
  useEffect(() => {
    //fetch data from firebase and update userStocks state with data of logged in user
    dispatch(stockActions.getStocks(userId));
  }, [dispatch, userId]);

  let loggedInUserStocks;

  // gets userStocks state from stocks Store
  loggedInUserStocks = useSelector((state) => state.stocks.userStocks); // list of stock names and quantites as objects {'TSLA': 20, 'AAPL': 10}

  // setStockObjectList need to intilaze this state from global state
  let total = useSelector((state) => state.stocks.totalAmount);

  // only run when logged in stocks changes
  useEffect(() => {
    const getStockData = (tickerList) => {
      const yahooFinanceLowLatencyApiKeys = [
        "544437524emsh84a3fabc0f7fbdcp147cdbjsn283f034dbb46",
        "e2c4ffdbecmshc50113c0d08a0f4p1ebdf4jsn519fccffe282",
        "00810ddedemshc5559d9c6a51d85p16abd0jsn7739bf21d0b3",
        "2c213a8709msh9d24c04e213a8aep13acc0jsnb024b8d7dc20",
        "4c93a2e9f8msh2a7b81644bc89ddp189353jsn89a23b46e2bd",
      ];
      let currentKey = Math.floor(Math.random() * 4);
      let currentAPIKey = yahooFinanceLowLatencyApiKeys[currentKey];
      tickerList = tickerList.join("%2C"); // join stock names into one request
      setIsLoading(true);

      fetch(
        `https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=${tickerList}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "544437524emsh84a3fabc0f7fbdcp147cdbjsn283f034dbb46", // 20,000 requests per month
            "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
          },
        }
      ).then((response) => {
        response
          .json()
          .then((res) => {
            let rawData = res["quoteResponse"]["result"]; // rawData is  a list of each stock object in order of ticker list fed into API call
            setStockObjectList(rawData);
            dispatch(stockActions.intializeStockObjects(rawData));
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
          });
      });
    };

    let stockList = [];
    for (let i = 0; i < loggedInUserStocks.length; i += 1) {
      if ("placeholder" in loggedInUserStocks[i]) {
      } else {
        stockList.push(loggedInUserStocks[i]["tickerName"]);
      }
    }
    if (stockList.length >= 1) {
      getStockData(stockList);
    }
  }, [loggedInUserStocks, dispatch]);

  // maybe reformat this, dont need the whole component to rerender every time the user types a character, only on submit
  const onNameChange = (name) => {
    setStockName(name);
  };

  const onQuantChange = (quant) => {
    setStockQuant(quant);
  };

  useEffect(() => {
    if (loggedInUserStocks.length <= 1) {
      setTotalPortfolioAmount(0);
    }
  }, [loggedInUserStocks]);

  useEffect(() => {
    dispatch(stockActions.calculateTotalAmount());
    setTotalPortfolioAmount(total);
  }, [stockObjectList, isLoading, dispatch, total]);

  const stockExists = () => {
    for (let i = 0; i < loggedInUserStocks.length; i++) {
      if (
        loggedInUserStocks[i].tickerName === stockName ||
        loggedInUserStocks[i].tickerName === stockName.toUpperCase()
      ) {
        setErrorMessage("Stock is already in your portfolio");
        handleShow();
        return;
      }
    }

    fetch(
      `https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote?symbols=${stockName}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "544437524emsh84a3fabc0f7fbdcp147cdbjsn283f034dbb46",
          "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
        },
      }
    )
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(function (response) {
        response.json().then((resp) => {
          if (resp.quoteResponse.result.length === 0 || !stockName) {
            setErrorMessage(
              "No stock found for given symbol. Please try again."
            );
            handleShow();
            console.log("no stock found "); // trigger modal here
          } else if (!stockQuant || isNaN(stockQuant)) {
            setErrorMessage("Please enter a valid quantity.");
            handleShow();
          } else {
            dispatch(stockActions.addNewStock(stockName, stockQuant));
            // reset back to null after new stock is entered
            setStockName();
            setStockQuant();
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  var current = new Date();

  const handleAlerts = () => {
    setToggle(!toggle);
  };

  const alertsOff =
    "Message and data rates may apply. Alerts can be disabled anytime by logging in and selecting disable SMS notifications";
  const alertsOn =
    "Are you sure ? You will never receive another text message from us. Alerts can renabled anytime from your portfolio screen.";

  return (
    <div className="center">
      <div style={{ width: "100%", margin: "2px" }}>
        <div>
          <div style={{ color: "white" }}>
            <Card bg="primary" className="text-center">
              <Card.Header as="h3">Portfolio Summary</Card.Header>
              <Card.Body>
                <Card.Title>Greetings,</Card.Title>

                <Card.Title>
                  {`Total Portfolio Value: $${formatNumber(
                    totalPortfolioAmount.toFixed(2)
                  )}`}
                </Card.Title>
                <Card.Text>{`As of ${current}`}</Card.Text>

                <Button
                  size="sm"
                  variant="light"
                  onClick={() => handleShowAdd()}
                >
                  <Plus size="25" /> Add New Stock
                </Button>
                <div
                  onClick={() => setShowSure(true)}
                  style={{ cursor: "pointer", fontSize: "15px" }}
                >
                  <br />
                  <strong>
                    {toggle
                      ? " Disable SMS Notifications "
                      : " Enable SMS Notifications "}
                  </strong>
                  <ChatLeftTextFill size="24" />
                  <br />
                  {toggle ? <ToggleOn size="50" /> : <ToggleOff size="50" />}
                </div>
              </Card.Body>
            </Card>
          </div>
          <div className="text-center">
            {totalPortfolioAmount <= 0 ? (
              <div>
                <br />
                <br />
                <h1>{"Your Portfolio Is Empty"}</h1>
              </div>
            ) : null}
          </div>
          <div className="black">
            {isLoading ? (
              <div>
                <br />
                <BarLoader
                  color={"#47eaff"}
                  loading={isLoading}
                  css={override}
                  size={150}
                />
              </div>
            ) : loggedInUserStocks.length ? (
              loggedInUserStocks.length > 1 ? (
                <StockList stocks={stockObjectList} />
              ) : null
            ) : null}
          </div>
        </div>

        <Modal
          style={{ color: "black" }}
          className="modal"
          show={showAdd}
          onHide={handleCloseAdd}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>
                Add A New Stock <Pencil />
              </h3>
            </Modal.Title>
          </Modal.Header>
          <div style={{ width: "80%", padding: "15px" }}>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Company Ticker</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Symbol"
                  onChange={(e) => onNameChange(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Symbols are usually an abbreviation of the company name
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Number of shares</Form.Label>
                <Form.Control
                  placeholder="# of Shares"
                  onChange={(e) => onQuantChange(e.target.value)}
                />
              </Form.Group>
            </Form>
          </div>
          <Modal.Footer>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                stockExists();
                handleCloseAdd();
              }}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          style={{ color: "black" }}
          className="modal"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h1>
                Warning <ExclamationTriangle />{" "}
              </h1>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="body">
            <p>{errorMessage}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="primary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Modal
        style={{ color: "black" }}
        className="modal"
        show={showSure}
        onHide={handleCloseSure}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <h2>
              Alerts <Bell />
            </h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="body">
          <p>{!toggle ? alertsOff : alertsOn}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button size="sm" variant="secondary" onClick={handleCloseSure}>
            No
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={() => {
              handleAlerts();
              setShowSure(false);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserPortfolioScreen;
