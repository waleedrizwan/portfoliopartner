import { useHistory } from "react-router-dom";
import GraphImg from "../img/svg/graphs.svg";
import Button from "react-bootstrap/Button";
import './LandingPage.css'

const LandingPage = (props) => {
  const history = useHistory();
  return (
    <div
      className="center"
      style={{ display: "flex", flexDirection: "column", zoom:'80%'}}
      id="landing-page-container"
    >
      
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "100px",
          padding: "200px",
        }}
      >
        <div style={{ marginRight: "auto" }}>
          <br />
          <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
           Welcome To Portfolio Partner
          </h1>
          <nav>
            <div>
              <br />
              <p style={{ fontSize: "20px", wordWrap: "break-word" }}>
                We help streamline your portfolio management routine with SMS
                notifications throughout the day so you can focus on what
                matters
              </p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "start",
              }}
            >
              <Button
                variant="primary"
                onClick={() => history.push("/signup")}
                size="lg"
              >
                Register Now
              </Button>
              <Button variant=""></Button>
              <Button
                variant="secondary"
                onClick={() => history.push("/signin")}
                size="lg"
              >
                Log In
              </Button>
            </div>
          </nav>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <img width="700" height="300" src={GraphImg} alt='404 Img Not Found' ></img>
        </div>
      </div>

      {/*  */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "200px",
        }}
      
      >
        <div style={{ marginLeft: "auto" }}>
          <img
            width="700"
            height="300"
            src="https://landy.website/img/svg/developer.svg"
            alt='404 Img Not Found'
          ></img>
        </div>
        <div style={{ marginRight: "auto" }}>
          <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
            Get Started Today
          </h1>
          <br />
          <br />

          <div style={{ display: "flex" }}>
            <div>
              <img
                width="50"
                height="50"
                src="https://landy.website/img/svg/notes.svg"
                alt='404 Img Not Found'
              ></img>

              <p
                style={{
                  fontSize: "15px",
                  wordWrap: "break-word",
                  fontWeight: "bold",
                }}
              >
                Why use Portfolio Partner ?
              </p>

              <p
                style={{
                  fontSize: "15px",
                  wordWrap: "break-word",
                }}
              >
                This service is completely free, just signup and choose your
                investments and thats it!
              </p>
            </div>

            <div>
              <img
                width="50"
                height="50"
                src="https://landy.website/img/svg/notes.svg"
                alt='404 Img Not Found'
              ></img>
              <br />
              <p
                style={{
                  fontSize: "15px",
                  wordWrap: "break-word",
                  fontWeight: "bold",
                }}
              >
                We respect our users privacy
              </p>

              <p
                style={{
                  fontSize: "15px",
                  wordWrap: "break-word",
                }}
              >
                We will never share/sell your information to any one.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "200px",
        }}
      >
        <div>
          <br />
          <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
            For Canadians, By Canadians
          </h1>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              width="600"
              height="300"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/1200px-Flag_of_Canada_%28Pantone%29.svg.png"
              alt='404 Img Not Found'
            />
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <p style={{ fontSize: "17px" }}>
              This website was created to support new Canadian investors who
              have busy schedules
            </p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              size="lg"
              variant="primary"
              onClick={() => history.push("/signup")}
            >
              Get Started
            </Button>
          </div>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <br />
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "200px",
        }}
      >
        <div style={{ marginRight: "auto" }}>
          <br />
          <br />

          <br />

          <h1 style={{ fontSize: "50px", fontWeight: "bold" }}>
            How Does It Work ?
          </h1>
          <nav>
            <div>
              <br />
              <p style={{ fontSize: "20px", wordWrap: "break-word" }}>
                You receive a short portfolio anaylsis at market open, mid-day
                and at market close, as a text message. This makes it easier to
                keep track of the movements of each of your investments
                throughtout the day. Your portfolio partner account does not
                need to be connected to your actual investment account for
                security and privacy reasons.
              </p>
              <br />

              <p style={{ fontSize: "20px", wordWrap: "break-word" }}>
                Our service also allows you to create limit-order notifications,
                such as when a stock reaches a certain price level, so you can
                buy or sell at the right time.
              </p>
            </div>

            <div
              style={{
                display: "flex",
              }}
            >
              <Button
                size="lg"
                variant="primary"
                onClick={() => history.push("/signup")}
              >
                Sign Up
              </Button>
            </div>
          </nav>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <img
            width="700"
            height="300"
            src="https://landy.website/img/svg/waving.svg"
            alt='404 Img Not Found'
          ></img>{" "}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
