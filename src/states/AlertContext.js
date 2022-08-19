import { ALERT_TYPES } from "../constants/alertTypes";
import { Alert } from "reactstrap";
import React, { createContext, useEffect, useState } from "react";
import styled from "styled-components";

const AlertContainer = styled.div`
  left: 50%;
  max-width: 90%;
  position: fixed;
  top: 30px;
  transform: translateX(-50%);
`;

const AlertContext = createContext({});

const getColor = (type) => {
  switch (type) {
    case ALERT_TYPES.SUCCESS:
      return "success";
    case ALERT_TYPES.ERROR:
      return "danger";
    default:
      return undefined;
  }
};

export const AlertProvider = ({ children }) => {
  const [alertProps, setAlertProps] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (showAlert) {
      timeoutId = setTimeout(() => setShowAlert(false), 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [showAlert]);

  const contextValue = {
    setAlertProps,
    setShowAlert,
  };

  const { type, message } = alertProps;

  return (
    <AlertContext.Provider value={contextValue}>
      {showAlert && (
        <AlertContainer>
          <Alert color={getColor(type)} toggle={() => setShowAlert(false)}>
            {message}
          </Alert>
        </AlertContainer>
      )}
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
