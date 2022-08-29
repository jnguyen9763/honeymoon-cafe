import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { useAlert } from "../hooks/useAlert";
import FirestoreContext from "../states/FirestoreContext";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 15px;
`;

const OrdersActions = () => {
  const { alertMessage } = useAlert();
  const { resetDatabase } = useContext(FirestoreContext);
  const [openModal, setOpenModal] = useState(false);

  const toggle = () => setOpenModal(!openModal);

  const onResetDatabase = async () => {
    try {
      await resetDatabase();
    } catch (e) {
      alertMessage({
        message: "Error: Unable to reset orders.",
      });
    } finally {
      toggle();
    }
  };

  return (
    <Container>
      <Button color="danger" onClick={toggle}>
        Reset orders
      </Button>
      <Modal isOpen={openModal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Reset orders</ModalHeader>
        <ModalBody>Are you sure you want to delete all orders?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onResetDatabase}>
            Reset orders
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default OrdersActions;
