import { STATUSES } from "../constants/statuses";
import { Button, Card, CardBody, CardText, CardTitle, List } from "reactstrap";
import FirestoreContext from "../states/FirestoreContext";
import ItemDisplay from "./ItemDisplay";
import React, { useContext } from "react";
import StatusBadge from "./StatusBadge";
import StatusButton from "./StatusButton";
import styled from "styled-components";

const Body = styled(CardBody)`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Card)`
  display: inline-flex;
  margin: 10px;
  max-width: 250px;
`;

const NotesContainer = styled.div`
  margin-bottom: 16px;
`;

const OrderHeader = styled.span`
  margin-right: 30px;
`;

const Text = styled(CardText)`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-size: 15px;
  justify-content: space-between;
`;

const Title = styled(CardTitle)`
  display: flex;
  justify-content: space-between;
`;

const UndoButton = styled(Button)`
  margin-top: 10px;
`;

const OrderCard = ({ order }) => {
  const { updateOrderStatus } = useContext(FirestoreContext);
  const { items = [], notes, orderNumber, status } = order;

  const onProgressOrder = () => {
    switch (status) {
      case STATUSES.NEW:
        updateOrderStatus(orderNumber, STATUSES.IN_PROGRESS);
        return;
      case STATUSES.IN_PROGRESS:
        updateOrderStatus(orderNumber, STATUSES.COMPLETED);
        return;
      case STATUSES.COMPLETED:
        updateOrderStatus(orderNumber, STATUSES.PICKED_UP);
        return;
      default:
        return;
    }
  };

  const onUndoProgress = () => {
    switch (status) {
      case STATUSES.IN_PROGRESS:
        updateOrderStatus(orderNumber, STATUSES.NEW);
        return;
      case STATUSES.COMPLETED:
        updateOrderStatus(orderNumber, STATUSES.IN_PROGRESS);
        return;
      case STATUSES.PICKED_UP:
        updateOrderStatus(orderNumber, STATUSES.COMPLETED);
        return;
      default:
        return;
    }
  };

  return (
    <Container>
      <Body>
        <Title tag="h5">
          <OrderHeader>Order #{orderNumber}</OrderHeader>{" "}
          <StatusBadge status={status} />
        </Title>
        <Text>
          <div>
            <List>
              {items.map(({ name, quantity }) => {
                return (
                  <li key={`order-${orderNumber}-${name}`}>
                    <ItemDisplay name={name} quantity={quantity} />
                  </li>
                );
              })}
            </List>
            {notes && (
              <NotesContainer>
                <h6>Notes:</h6>
                <div>{notes}</div>
              </NotesContainer>
            )}
          </div>
          {status !== STATUSES.CANCELED && (
            <div>
              <StatusButton status={status} onClick={onProgressOrder} />
              {status !== STATUSES.NEW && (
                <UndoButton size="sm" block onClick={onUndoProgress}>
                  Undo
                </UndoButton>
              )}
            </div>
          )}
        </Text>
      </Body>
    </Container>
  );
};

export default OrderCard;
