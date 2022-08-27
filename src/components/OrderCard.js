import { BARISTAS } from "../constants/baristas";
import { STATUSES } from "../constants/statuses";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Input,
  List,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import FirestoreContext from "../states/FirestoreContext";
import ItemDisplay from "./ItemDisplay";
import React, { useContext, useState } from "react";
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
  const firstBarista = BARISTAS[0];
  const { updateOrderProperties } = useContext(FirestoreContext);
  const { barista, items = [], notes, orderNumber, status } = order;
  const [openModal, setOpenModal] = useState(false);
  const [selectedBarista, setSelectedBarista] = useState(firstBarista);

  const toggle = () => setOpenModal(!openModal);

  const onProgressOrder = () => {
    switch (status) {
      case STATUSES.NEW:
        toggle();
        return;
      case STATUSES.IN_PROGRESS:
        updateOrderProperties(orderNumber, { status: STATUSES.COMPLETED });
        return;
      case STATUSES.COMPLETED:
        updateOrderProperties(orderNumber, { status: STATUSES.PICKED_UP });
        return;
      default:
        return;
    }
  };

  const onUndoProgress = () => {
    switch (status) {
      case STATUSES.IN_PROGRESS:
        updateOrderProperties(orderNumber, {
          barista: undefined,
          status: STATUSES.NEW,
        });
        return;
      case STATUSES.COMPLETED:
        updateOrderProperties(orderNumber, { status: STATUSES.IN_PROGRESS });
        return;
      case STATUSES.PICKED_UP:
        updateOrderProperties(orderNumber, { status: STATUSES.COMPLETED });
        return;
      default:
        return;
    }
  };

  const onSelectBarista = () => {
    updateOrderProperties(orderNumber, {
      barista: selectedBarista,
      status: STATUSES.IN_PROGRESS,
    });
  };

  return (
    <CardContainer>
      <Container>
        <Body>
          <Title>
            <OrderHeader>Order #{orderNumber}</OrderHeader>{" "}
            <StatusBadge status={status} />
          </Title>
          {barista && <h6>Barista: {barista}</h6>}
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
      <Modal isOpen={openModal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Choose barista</ModalHeader>
        <ModalBody>
          <Input
            id="item"
            name="select"
            type="select"
            onChange={(evt) => setSelectedBarista(evt.target.value)}
          >
            {BARISTAS.map((baristaName) => {
              return (
                <option key={`barista-${baristaName}`} value={baristaName}>
                  {baristaName}
                </option>
              );
            })}
          </Input>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onSelectBarista}>
            Select
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </CardContainer>
  );
};

export default OrderCard;
