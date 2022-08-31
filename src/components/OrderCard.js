import { STATUSES } from "../constants/statuses";
import { Button, Card, CardBody, CardTitle, List } from "reactstrap";
import { useAlert } from "../hooks/useAlert";
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

const CardContainer = styled.div`
  padding: 10px;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    width: 50%;
  }

  /* Medium devices (landscape tablets, 768px and up) */
  @media only screen and (min-width: 768px) {
    width: 33%;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 25%;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 20%;
  }
`;

const Container = styled(Card)`
  display: inline-flex;
  height: 100%;
  width: 100%;
`;

const NotesContainer = styled.div`
  margin-bottom: 16px;
`;

const OrderHeader = styled.h5`
  margin-right: 30px;
`;

const Text = styled.div`
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
  const { alertMessage } = useAlert();
  const { updateOrderProperties } = useContext(FirestoreContext);
  const { items = [], notes, orderNumber, status } = order;

  const onProgressOrder = async () => {
    try {
      switch (status) {
        case STATUSES.IN_PROGRESS:
          await updateOrderProperties(orderNumber, {
            status: STATUSES.COMPLETED,
          });
          return;
        case STATUSES.COMPLETED:
          await updateOrderProperties(orderNumber, {
            status: STATUSES.PICKED_UP,
          });
          return;
        default:
          return;
      }
    } catch (e) {
      alertMessage({
        message: "Error: Unable to update order status.",
      });
    }
  };

  const onUndoProgress = async () => {
    try {
      switch (status) {
        case STATUSES.COMPLETED:
          await updateOrderProperties(orderNumber, {
            status: STATUSES.IN_PROGRESS,
          });
          return;
        case STATUSES.PICKED_UP:
          await updateOrderProperties(orderNumber, {
            status: STATUSES.COMPLETED,
          });
          return;
        default:
          return;
      }
    } catch (e) {
      alertMessage({
        message: "Error: Unable to update order status.",
      });
    }
  };

  return (
    <CardContainer>
      <Container>
        <Body>
          <Title>
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
                {status !== STATUSES.IN_PROGRESS && (
                  <UndoButton size="sm" block onClick={onUndoProgress}>
                    Undo
                  </UndoButton>
                )}
              </div>
            )}
          </Text>
        </Body>
      </Container>
    </CardContainer>
  );
};

export default OrderCard;
