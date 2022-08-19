import { STATUSES } from "../constants/statuses";
import { Badge } from "reactstrap";
import React from "react";

const BADGES = Object.freeze({
  [STATUSES.NEW]: { color: "primary", text: "New" },
  [STATUSES.IN_PROGRESS]: { color: "warning", text: "In progress" },
  [STATUSES.COMPLETED]: { color: "success", text: "Completed" },
  [STATUSES.PICKED_UP]: { color: "dark", text: "Picked up" },
  [STATUSES.CANCELED]: { color: "danger", text: "Canceled" },
});

const StatusBadge = ({ status }) => {
  const badgeProps = BADGES[status];

  if (!badgeProps) {
    return null;
  }

  return (
    <Badge color={badgeProps.color} tag="h6">
      {badgeProps.text}
    </Badge>
  );
};

export default StatusBadge;
