import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./portfolioscreen.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import { PersonX } from "react-bootstrap-icons";
import * as authActions from "../store/actions/auth";
import { Trash } from "react-bootstrap-icons";

const ProfilePage = (props) => {
  // if empty or null should history push to sign in
  const userId = useSelector((state) => state.auth.userId);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [showSure, setShowSure] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();

  const getUserData = useCallback(async () => {
    try {
      const response = await fetch(
        `https://test2-b42c3-default-rtdb.firebaseio.com/usersPortfolio/${userId}.json`,

        {
          method: "GET",
        }
      );

      const resData = await response.json();

      let userFirstName;
      let userPhoneNumber;

      for (const key in resData) {
        userFirstName = resData[key].firstName; // list of stock objects
        userPhoneNumber = resData[key].phoneNumber; // list of stock objects
      }

      setName(userFirstName);
      setNumber(userPhoneNumber);

      // false is repsonse returns not 200
      if (!response.ok) {
        throw new Error("400 bad request on fetchProducts request");
      }
    } catch (err) {
      // do something when errors occur
      throw new Error("400 bad request on fetchProducts request");
    }
  });

  useEffect(() => {
    getUserData();
  }, [userId, getUserData]);

  const handleDelete = () => {
    dispatch(authActions.deleteAccount(userId));
    history.push("/home");
  };

  return (
    <div style={{ color: "white" }}>
      <Card bg="primary" className="text-center">
        <Card.Header as="h3">{`Greetings, ${name}`}</Card.Header>
        <Card.Body>
          <Card.Title>{`Number: ${number}`}</Card.Title>

          <Button size="sm" variant="light" onClick={() => setShowSure(true)}>
            Delete My Account <PersonX color="blue" size="30" />
          </Button>
          <div style={{ cursor: "pointer", fontSize: "15px" }}>
            <br />
          </div>
        </Card.Body>
      </Card>
      <div>
        <Modal style={{ color: "black" }} className="modal" show={showSure}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h2>
                Delete my account <Trash />
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="body">
            <p>
              Are you sure you want to delete your account? Your information
              will be completely wiped and you will not receive any more
              messages/alerts.
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
                setShowSure(false);
                handleDelete();
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

export default ProfilePage;
