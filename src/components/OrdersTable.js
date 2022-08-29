import { STATUSES } from "../constants/statuses";
import {
  Button,
  List,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import { useAlert } from "../hooks/useAlert";
import FirestoreContext from "../states/FirestoreContext";
import ItemDisplay from "./ItemDisplay";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 15px;
`;

const ItemsCell = styled.li`
  white-space: nowrap;
`;

const ItemsList = styled(List)`
  margin: 0;
`;

const OrdersTable = () => {
  const { alertMessage } = useAlert();
  const { orders = [], updateOrderProperties } = useContext(FirestoreContext);
  const [openModal, setOpenModal] = useState(false);
  const [cancelOrderNumber, setCancelOrderNumber] = useState(undefined);

  const toggle = () => {
    const newOpenModal = !openModal;

    if (!newOpenModal) {
      setCancelOrderNumber(undefined);
    }

    setOpenModal(newOpenModal);
  };

  const onOpenModal = (orderNumber) => {
    setCancelOrderNumber(orderNumber);
    toggle();
  };

  const onCancelOrder = async () => {
    try {
      await updateOrderProperties(cancelOrderNumber, {
        status: STATUSES.CANCELED,
      });
    } catch (e) {
      alertMessage({
        message: "Error: Unable to cancel order.",
      });
    } finally {
      toggle();
    }
  };

  return (
    <Container>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Items</th>
            <th>Total Amount</th>
            <th>Payment Method</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => {
            const { items, orderNumber, paymentMethod, status, totalAmount } =
              order;

            return (
              <tr key={`order-overview-${orderNumber}`}>
                <th scope="row">{orderNumber}</th>
                <td>
                  <ItemsList>
                    {items.map(({ name, quantity }) => {
                      return (
                        <ItemsCell
                          key={`order-overview-${orderNumber}-${name}`}
                        >
                          <ItemDisplay name={name} quantity={quantity} />
                        </ItemsCell>
                      );
                    })}
                  </ItemsList>
                </td>
                <td>${totalAmount}</td>
                <td>{paymentMethod}</td>
                <td>{status}</td>
                <td>
                  <Button
                    color="danger"
                    disabled={status === STATUSES.CANCELED}
                    size="sm"
                    onClick={() => onOpenModal(orderNumber)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal isOpen={openModal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Cancel order</ModalHeader>
        <ModalBody>
          Are you sure you want to cancel Order #{cancelOrderNumber}?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onCancelOrder}>
            Reset order
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default OrdersTable;
