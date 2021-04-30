import { useState } from "react";
import "./StockItem.css";
import Button from "react-bootstrap/Button";
import "reactjs-popup/dist/index.css";
import { useSelector, useDispatch } from "react-redux";
import * as stockActions from "../store/actions/stocks";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { Trash, GraphUp, GraphDown } from "react-bootstrap-icons";

const StockItem = (props) => {
  const {
    longName,
    symbol,
    regularMarketPrice,
    financialCurrency,
    regularMarketChangePercent,
  } = props.stockDetail;

  const dispatch = useDispatch();
  const [showSure, setShowSure] = useState(false);
  const handleCloseSure = () => setShowSure(false);

  let loggedInUserStocks = useSelector((state) => state.stocks.userStocks); // list of stock names and quantites as objects {'TSLA': 20, 'AAPL': 10}

  function formatNumber(num) {
    if (!num) {
      return "-";
    }

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  // loop over loggedinStokcs and find tickernAME MATCHES symbol
  let currentQuant = loggedInUserStocks.find((x) =>
    x.tickerName ? x.tickerName.toUpperCase() === symbol : false
  );
  if (!currentQuant) {
    currentQuant = "Unknown";
  } else {
    currentQuant = currentQuant["quantity"];
  }

  const handleRemoveFromPortfolio = () => setShowSure(true);

  return (
    <div style={{ margin: "10px" }}>
      <Card>
        <Card.Header as="h4">
          {`${longName} ${symbol}`}
          <Card.Text style={{ fontSize: 15 }}>
            <Card.Text
              style={{ fontSize: 12 }}
            >{`${props.stockDetail.quoteSourceName} ${props.stockDetail.fullExchangeName} `}</Card.Text>
          </Card.Text>
        </Card.Header>
        <CardGroup>
          <Card border="light">
            <Card.Body>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`Previous Close `}</div>
                  <div
                    style={{ marginLeft: "auto" }}
                  >{`${props.stockDetail.regularMarketPreviousClose}`}</div>
                </div>
              </Card.Title>

              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`Open`}</div>
                  <div
                    style={{ marginLeft: "auto" }}
                  >{`${props.stockDetail.regularMarketOpen}`}</div>
                </div>
              </Card.Title>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`Bid`}</div>
                  <div
                    style={{ marginLeft: "auto" }}
                  >{`${props.stockDetail.bid}`}</div>
                </div>
              </Card.Title>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`Ask`}</div>
                  <div
                    style={{ marginLeft: "auto" }}
                  >{`${props.stockDetail.ask}`}</div>
                </div>
              </Card.Title>
            </Card.Body>
          </Card>

          <Card border="light">
            <Card.Body>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`Day's Range`}</div>
                  <div
                    style={{ marginLeft: "auto" }}
                  >{`${props.stockDetail.regularMarketDayRange}`}</div>
                </div>
              </Card.Title>

              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`52 Week Range`}</div>
                  <div
                    style={{ marginLeft: "auto" }}
                  >{`${props.stockDetail.fiftyTwoWeekRange}`}</div>
                </div>
              </Card.Title>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`Volume`}</div>
                  <div style={{ marginLeft: "auto" }}>{`${formatNumber(
                    props.stockDetail.regularMarketVolume
                  )}`}</div>
                </div>
              </Card.Title>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`Market Cap`}</div>
                  <div style={{ marginLeft: "auto" }}>{`${formatNumber(
                    props.stockDetail.marketCap
                  )}`}</div>
                </div>
              </Card.Title>
            </Card.Body>
          </Card>

          <Card border="light">
            <Card.Body>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`P/E Ratio`}</div>
                  <div style={{ marginLeft: "auto" }}>{`${(
                    regularMarketPrice / props.stockDetail.epsCurrentYear
                  ).toFixed(2)}`}</div>
                </div>
              </Card.Title>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{ marginRight: "auto" }}
                  >{`Earnings Per Share`}</div>
                  <div
                    style={{ marginLeft: "auto" }}
                  >{`${props.stockDetail.epsCurrentYear.toFixed(2)}`}</div>
                </div>
              </Card.Title>
              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div
                    style={{ marginRight: "auto" }}
                  >{`Avg Analyst Rating`}</div>
                  <div
                    style={{ marginLeft: "auto" }}
                  >{`${props.stockDetail.averageAnalystRating}`}</div>
                </div>
              </Card.Title>

              <Card.Title
                style={{ "border-bottom": "1px dotted black", fontSize: 15 }}
              >
                <div style={{ display: "flex" }}>
                  <div style={{ marginRight: "auto" }}>{`Dividend Yield`}</div>
                  <div style={{ marginLeft: "auto" }}>{`${
                    !props.stockDetail.trailingDividendYield
                      ? "0"
                      : props.stockDetail.trailingDividendYield
                  }`}</div>
                </div>
              </Card.Title>
            </Card.Body>
          </Card>

          <Card border="light" className="text-center">
            <div>
              <div>
                <Card.Body>
                  <Card.Title>
                    <div style={{ display: "flex" }}>
                      <div style={{ marginRight: "auto" }}>
                        {` Total Invested $${formatNumber(
                          (
                            parseFloat(currentQuant) *
                            regularMarketPrice.toFixed(2)
                          ).toFixed(2)
                        )} ${
                          (parseFloat(regularMarketChangePercent) > 0
                            ? "+"
                            : "") +
                          parseFloat(regularMarketChangePercent).toFixed(2) +
                          "%"
                        }`}
                      </div>

                      <div style={{ marginLeft: "auto" }}>
                        {regularMarketChangePercent > 0 ? (
                          <GraphUp color="green" size="30" />
                        ) : (
                          <GraphDown color="red" size="30" />
                        )}
                      </div>
                    </div>
                  </Card.Title>

                  <Card.Title>{`  ${currentQuant} Share${
                    currentQuant > 1 ? "s" : ""
                  } @ $${formatNumber(
                    regularMarketPrice.toFixed(2)
                  )} ${financialCurrency}`}</Card.Title>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      handleRemoveFromPortfolio();
                      props.refresh();
                    }}
                  >
                    Remove
                  </Button>
                </Card.Body>
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
                      Remove <Trash />{" "}
                    </h2>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="body">
                  <p>
                    Are you sure you want to remove this item from your
                    portfolio?
                  </p>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleCloseSure}
                  >
                    No
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() => {
                      dispatch(stockActions.removeStock(symbol));
                      setShowSure(false);
                    }}
                  >
                    Yes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </Card>
        </CardGroup>
      </Card>
    </div>
  );
};

export default StockItem;
