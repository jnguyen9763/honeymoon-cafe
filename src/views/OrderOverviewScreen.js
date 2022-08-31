import { STATUSES } from "../constants/statuses";
import FirestoreContext from "../states/FirestoreContext";
import OrderSection from "../components/OrderSection";
import React, { useContext } from "react";
import styled from "styled-components";
import withNavbar from "../hocs/withNavbar";

const EmptyStateContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 25px;
  font-weight: bold;
  height: 100%;
  justify-content: center;
`;

const SECTIONS = [
  { header: "In Progress Orders", status: STATUSES.IN_PROGRESS },
  { header: "Completed Orders", status: STATUSES.COMPLETED },
  { header: "Picked-up Orders", status: STATUSES.PICKED_UP },
  { header: "Canceled Orders", status: STATUSES.CANCELED },
];

const OrderOverviewScreen = () => {
  const { orders = [] } = useContext(FirestoreContext);

  if (!orders.length) {
    return <EmptyStateContainer>No orders yet</EmptyStateContainer>;
  }

  return (
    <div>
      {SECTIONS.map(({ header, status }) => {
        return (
          <OrderSection
            key={`section-${header}`}
            header={header}
            orders={orders.filter(
              ({ status: orderStatus }) => status === orderStatus
            )}
          />
        );
      })}
    </div>
  );
};

export default withNavbar(OrderOverviewScreen);
