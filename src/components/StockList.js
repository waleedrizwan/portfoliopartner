import React, { useState } from "react";
import StockItem from "./StockItem";
import "./StockList.css";

const StockList = (props) => {
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    console.log("run");
    setRefresh(!refresh);
  };

  return (
    <div>
      <div style={{ "padding-bottom": "10px" }}>
        {props.stocks.length
          ? props.stocks.map((item, index) => (
              <div>
                <StockItem
                  refresh={() => handleRefresh()}
                  key={index}
                  stockDetail={item}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default StockList;
