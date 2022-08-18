import { STATUSES } from "../constants/statuses";
import { Button, Card, CardBody, CardText, CardTitle, List } from "reactstrap";
import React from "react";
import StatusBadge from "./StatusBadge";
import styled from "styled-components";
import StatusButton from "./StatusButton";

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
  const { items = [], notes, orderNumber, status } = order;

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
                    {name} ({quantity})
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
              <StatusButton status={status} />
              {status !== STATUSES.NEW && (
                <UndoButton size="sm" block>
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
