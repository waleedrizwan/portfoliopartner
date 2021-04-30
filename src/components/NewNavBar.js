import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as authActions from "../store/actions/auth";

const NewNavBar = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const isSignedIn = useSelector((state) => state.auth.userId);

  const handleClick = () => {
    let route;

    if (isSignedIn) {
      dispatch(authActions.logout());
      route = "/home";
    } else {
      route = "/signin";
    }
    history.push(route);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>Portfolio Partner</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => history.push("/home")}> Home </Nav.Link>
          <Nav.Link onClick={() => history.push("/privacy")}> Privacy</Nav.Link>
          <Nav.Link onClick={() => history.push("/legal")}> Legal</Nav.Link>
        </Nav>
        <Form inline>
          <Button
            size="lg"
            variant="outline-info"
            onClick={() => handleClick()}
          >
            {isSignedIn ? "Sign Out" : "Sign In"}
          </Button>
        </Form>
      </Navbar>
    </div>
  );
};

export default NewNavBar;
