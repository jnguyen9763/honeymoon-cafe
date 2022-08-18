import { STATUSES } from "../constants/statuses";
import { Button } from "reactstrap";
import React from "react";

const BUTTONS = Object.freeze({
  [STATUSES.NEW]: { color: "warning", text: "In progress" },
  [STATUSES.IN_PROGRESS]: { color: "success", text: "Completed" },
  [STATUSES.COMPLETED]: { color: "dark", text: "Picked up" },
});

const StatusButton = ({ status, onClick }) => {
  const buttonProps = BUTTONS[status];

  if (!buttonProps) {
    return null;
  }

  return (
    <Button color={buttonProps.color} size="sm" block onClick={onClick}>
      {buttonProps.text}
    </Button>
  );
};

export default StatusButton;
