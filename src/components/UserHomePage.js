import UserPortfolioScreen from "./UserPortfolioScreen";
import ProfilePage from "./ProfilePage";
import UserAlertPage from "./UserAlertsPage";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const UserHomePage = (props) => {
  return (
    <div className="center">
      <div style={{ width: "70%", margin: "2px" }}>
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
          <Tab eventKey="home" title="Portfolio">
            <UserPortfolioScreen />
          </Tab>
          <Tab eventKey="profile" title="Profile">
            <ProfilePage />
          </Tab>
          <Tab eventKey="alerts" title="Alerts">
            <UserAlertPage />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default UserHomePage;
