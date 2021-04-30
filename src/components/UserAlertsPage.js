import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Jumbotron from "react-bootstrap/Jumbotron";
import AlertList from "./AlertsList";
import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as alertActions from "../store/actions/alerts";
import { Bell, Pencil, ExclamationTriangle } from "react-bootstrap-icons";

const UserAlertsPage = (props) => {
  const dispatch = useDispatch();
  const handleAlerts = () => dispatch(alertActions.getAlerts());
  const [showAdd, setShowAdd] = useState(false);
  const [show, setShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    handleAlerts();
  }, []);

  let userAlerts = useSelector((state) => state.alerts.alerts);

  let userAlertsData;

  if (userAlerts) {
    userAlertsData = userAlerts.filter((elm) => !elm["placeholder"]);
  } else {
    userAlertsData = [];
  }

  console.log(userAlertsData);

  let stockName;
  let alertPrice;

  const handleStockNameChange = (name) => (stockName = name);
  const handleAlertPriceChange = (price) => (alertPrice = price);
  const handleNewAlert = (name, price) => {
    dispatch(
      alertActions.addNewAlert(name.toUpperCase(), parseFloat(price).toFixed(2))
    );
  };

  const stockExists = () => {
    console.log("stockName", stockName, "typeof", typeof stockName);
    console.log("alertPrice", alertPrice, "typeof", typeof alertPrice);

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
          if (resp.quoteResponse.result.length == 0 || !stockName) {
            setErrorMessage(
              "No stock found for given symbol. Please try again."
            );
            console.log(errorMessage);
            setShow(true);
            return;
          } else if (!alertPrice || isNaN(alertPrice)) {
            setErrorMessage("Please enter a valid quantity.");
            setShow(true);
            console.log(errorMessage);
            return;
          } else {
            // if no errors then dispatch the add new alert action here
            handleNewAlert(stockName, alertPrice);
          }
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Jumbotron variant="primary">
        <h1>
          Alerts <Bell size="50" />
        </h1>
        <p style={{ fontSize: "20px" }}>
          {`Waiting for the perfect time to buy or sell something ?`}
        </p>
        <p style={{ fontSize: "20px" }}>
          With our alerts you'll get a text when a price is reached
        </p>
        <p>
          <Button variant="primary" onClick={() => setShowAdd(!showAdd)}>
            Add New Alert{" "}
          </Button>
        </p>
      </Jumbotron>
      <div>
        <h1 className='text-center'  >{userAlertsData.length < 1 ? "You Currently Have No Alerts" : null}</h1>
        <AlertList alerts={userAlertsData} />
      </div>

      <div>
        <Modal
          style={{ color: "black" }}
          className="modal"
          show={showAdd}
          onHide={() => setShowAdd(!showAdd)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>
                Add A New Alert <Pencil />
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
                  onChange={(e) => handleStockNameChange(e.target.value)}
                />
                <Form.Text className="text-muted">
                  Symbols are usually an abbreviation of the company name
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  placeholder="Price to 2 decimal places (28.39)"
                  onChange={(e) => handleAlertPriceChange(e.target.value)}
                />
                <Form.Text className="text-muted">
                  At what price would you like to receive a message
                </Form.Text>
              </Form.Group>
            </Form>
          </div>
          <Modal.Footer>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                setShowAdd(!showAdd);
                stockExists();
              }}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <div>
        <Modal
          style={{ color: "black" }}
          className="modal"
          show={show}
          onHide={() => setShow(false)}
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
            <Button size="sm" variant="primary" onClick={() => setShow(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default UserAlertsPage;
