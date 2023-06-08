import React, { useContext } from "react";
import { AlertContext } from "../context/alert";

const Alert = () => {
  const context = useContext(AlertContext);
  const { alertMsg } = context;
  // console.log(alertMsg)

  return (
  
      <div style={{ height: "58px" }}>
        {alertMsg && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>{alertMsg}</strong>
          </div>
        )}
      </div>  
  );
};

export default Alert;
