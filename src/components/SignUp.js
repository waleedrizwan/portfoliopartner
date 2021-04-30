import React, { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory } from "react-router-dom";

import Modal from "react-bootstrap/Modal";
import ButtonTwo from "react-bootstrap/Button";
import { Document, Page, pdfjs } from "react-pdf";
import PdfFile from "./legalPolicy.pdf";
import {
  ArrowLeftCircle,
  ArrowRightCircle,
  PeopleFill,
} from "react-bootstrap-icons";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const SignUp = (props) => {
  // object holds user log in data
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    // send text message
    history.push("/portfolio");
  };

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState();

  const [accept, setAccept] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showError, setShowError] = useState(false);

  const [registerErrorMessage, setRegisterErrorMessage] = useState(false);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const [modalShow, setModalShow] = React.useState(false);

  function Copyright() {
    return (
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
      ></Typography>
    );
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  // set to true if error with register on firebase
  const [isError, setIsError] = useState(false);

  // gets input from input text
  const onUserDataChange = useCallback((type, value) => {
    let newData = userData;
    newData[type] = value;

    setUserData(newData);
  },[userData]);

  const validateCredentials = () => {
    for (const key in userData) {
      // if there any blank values in userData
      if (!userData[key]) {
        setRegisterErrorMessage("All values are required for registration");
        return false;
      }
    }

    if (userData["password"].length < 8) {
      setRegisterErrorMessage(
        "Password must be at least 8 characters in length"
      );
      return false;
    }

    if (!accept) {
      setRegisterErrorMessage(
        "You must accept our terms and conditions to register"
      );
      return false;
    }

    return true;
  };

  // needs to handle all input fields to ensure correct values
  const authHandler = async () => {
    if (!validateCredentials()) {
      setShowError(true);
      return;
    }

    let action;

    action = authActions.signup(
      userData.email,
      userData.password,
      userData.phone,
      userData.firstName
    );

    try {
      await dispatch(action);

      handleClick();
    } catch (err) {
      setIsError(err.message);
    }
  };

  const classes = useStyles();

  useEffect(() => {
    onUserDataChange("phone", value);
    console.log(userData["phone"]);
  }, [value, onUserDataChange, userData]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => onUserDataChange("firstName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => onUserDataChange("lastName", e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => onUserDataChange("email", e.target.value)}
                helperText={isError ? isError : ""}
                error={isError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => onUserDataChange("password", e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <PhoneInput
                placeholder="Enter phone number"
                value={value}
                onChange={setValue}
                helperText="Currently based on U.S Markets"
              />
            </Grid>

            <Grid item xs={12}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Link onClick={() => setModalShow(true)}>
                  User Agreement
                  <br />
                  <br />
                </Link>
              </div>

              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I have read and accepted the terms and conditions of the user agreement."
                onClick={() => setAccept(true)}
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => (accept ? authHandler() : handleShow())}
          >
            Sign Up
          </Button>

          <Button fullWidth variant=""></Button>

          <Button
            // type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => history.push("/signin")}
          >
            Existing User ? Sign In
          </Button>
          <Grid container justify="flex-end">
            <Grid item></Grid>
          </Grid>
        </form>
        <Modal
          show={modalShow}
          onHide={() => setModalShow(false)}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Agreement
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <p>
                Page {pageNumber} of {numPages}
              </p>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Document file={PdfFile} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} />
              </Document>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
              <br />
              <br />
              <br />
              <Button
                // size="lg"
                variant="primary"
                onClick={() =>
                  pageNumber === 1
                    ? setPageNumber(numPages)
                    : setPageNumber(pageNumber - 1)
                }
              >
                <ArrowLeftCircle size={35} />
              </Button>
              <Button variant=""></Button>
              <Button
                variant="primary"
                onClick={() =>
                  pageNumber === numPages
                    ? setPageNumber(1)
                    : setPageNumber(pageNumber + 1)
                }
              >
                <ArrowRightCircle size={35} />
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <ButtonTwo onClick={() => setModalShow(false)}>Close</ButtonTwo>
          </Modal.Footer>
        </Modal>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Notice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You must accept the user agreement to create an account
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>

        <div>
          <Modal
            style={{ color: "black" }}
            className="modal"
            show={showError}
            onHide={() => setShowError(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h2>
                  Error <PeopleFill variant="primary" />
                </h2>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body">
              <p className="text-center" style={{ fontSize: "17px" }}>
                {registerErrorMessage}
              </p>
            </Modal.Body>
            <Modal.Footer>
              <ButtonTwo
                // size=""
                variant="primary"
                onClick={() => setShowError(false)}
              >
                Ok
              </ButtonTwo>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignUp;
