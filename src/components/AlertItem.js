import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Trash } from "react-bootstrap-icons";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as alertActions from "../store/actions/alerts";

const AlertItem = (props) => {
  const alerts = props.alertDetail;
  const stockName = Object.keys(alerts)[0];
  const priceLimit = alerts[stockName];
  const dispatch = useDispatch();

  const [showSure, setShowSure] = useState(false);

  console.log(typeof priceLimit);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{stockName.toUpperCase()}</Card.Title>
          <Card.Text>
            {`Text message when ${stockName.toUpperCase()} reaches $${parseFloat(
              priceLimit
            ).toFixed(2)} USD`}
          </Card.Text>
          <Button variant="primary" onClick={() => setShowSure(true)}>
            Remove
          </Button>
        </Card.Body>
      </Card>
      <div>
        <Modal
          style={{ color: "black" }}
          className="modal"
          show={showSure}
          onHide={() => setShowSure(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>
                Remove Alert <Trash />{" "}
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="body">
            <p>
              Are you sure you want to delete this alert ? You will not receive
              a message when the price is reached.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setShowSure(false)}
            >
              No
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={() => {
                dispatch(alertActions.removeAlert(stockName, priceLimit));
                setShowSure(false);
              }}
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AlertItem;
