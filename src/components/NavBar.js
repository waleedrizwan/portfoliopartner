import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    // backgroundColor: "black",
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const NavBar = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const isSignedIn = useSelector((state) => !state.auth.userID);

  // dispatch signout function, use react-router to pop back to home page (landing page)
  const RedirectLinkSignIn = () => <div>{props.redirectToSignIn}</div>;
  const RedirectLinkHome = () => <div>{props.redirectToHome}</div>;

  const handlePress = () => {
    if (isSignedIn) {
      // dispatch sign out function here and return to home page of website on signout press
      return <RedirectLinkHome>Sign Out</RedirectLinkHome>;
    } else {
      return <RedirectLinkSignIn>Sign In </RedirectLinkSignIn>;
    }
  };

  return (
    <div id="navbar">
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={10}
        className={classes.appBar}
      >
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h4"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          >
            Portfolio Partner
          </Typography>
          <nav>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className={classes.link}
            >
              About
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className={classes.link}
            >
              Privacy
            </Link>
            <Link
              variant="button"
              color="textPrimary"
              href="#"
              className={classes.link}
            >
              Legal
            </Link>
          </nav>
          <Link
            variant="button"
            color="textPrimary"
            href="#"
            className={classes.link}
            onClick={() => console.log('heloo')}
          >
            <RedirectLinkHome>
              {isSignedIn ? "Sign In" : "Sign Out"}
            </RedirectLinkHome>
         
         
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
