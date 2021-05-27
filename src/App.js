import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import authReducer from "./store/reducers/auth";
import stocksReducer from "./store/reducers/stocks";
import alertsReducer from "./store/reducers/alerts";

import UserHomePage from "./components/UserHomePage";
import PrivacyPage from "./components/PrivacyPage";
import LegalPage from "./components/LegalPage";
import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

import NewNavBar from "./components/NewNavBar";
import LandingPage from "./components/LandingPage";

// merge all stores
const rootReducer = combineReducers({
  auth: authReducer,
  stocks: stocksReducer,
  alerts: alertsReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

function App() {
  // when user id global state is null, we can assume that no user is logged-in
  return (
    <Provider store={store}>
      <Router>
        <NewNavBar />
        <br />
        <br />
        <br />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>

          <Route path="/signup">
            <SignUp
              redirectToSignIn={
                <Link to="/signin"> Existing User ? Sign In </Link>
              }
            />
          </Route>

          <Route path="/home">
            <LandingPage />
          </Route>

          <Route path="/legal">
            <LegalPage />
          </Route>

          <Route path="/privacy">
            <PrivacyPage />
          </Route>

          <Route path="/signin">
            <SignIn redirectToSignUp={<Link to="/signup"> Sign up </Link>} />
          </Route>

          {/* make portfolio a protected path */}
          <Route path="/portfolio">
            <UserHomePage />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
