import { ALERT_TYPES } from "../constants/alertTypes";
import { useContext, useRef } from "react";
import AlertContext from "../states/AlertContext";

export const useAlert = () => {
  const { setAlertProps, setShowAlert } = useContext(AlertContext);
  const timeoutId = useRef(null);

  const alertMessage = ({ type, message }) => {
    clearTimeout(timeoutId.current);
    setShowAlert(false);

    timeoutId.current = setTimeout(() => {
      setAlertProps({ type, message });
      setShowAlert(true);
    }, 500);
  };

  return { alertMessage, ALERT_TYPES };
};
