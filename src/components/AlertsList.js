import AlertItem from "./AlertItem.js";

const AlertsList = (props) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexBasis: "100%",
          height: "0",
          flexWrap:'wrap'
        }}
      >
        {props.alerts.length
          ? props.alerts.map((item, index) => (
              <div style={{ margin: "10px", padding: "10px" }}>
                <AlertItem key={index} alertDetail={item} />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
export default AlertsList;
