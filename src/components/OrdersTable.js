import { STATUSES } from "../constants/statuses";
import { Button, List, Table } from "reactstrap";
import FirestoreContext from "../states/FirestoreContext";
import React, { useContext } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 15px;
`;

const ItemDisplay = styled.span`
  font-weight: 600;
`;

const ItemList = styled(List)`
  margin: 0;
`;

const OrdersTable = () => {
  const { orders = [], updateOrderStatus } = useContext(FirestoreContext);

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
            const {
              id,
              items,
              orderNumber,
              paymentMethod,
              status,
              totalAmount,
            } = order;

            return (
              <tr key={`order-overview-${orderNumber}`}>
                <th scope="row">{orderNumber}</th>
                <td>
                  <ItemList>
                    {items.map(({ name, quantity }) => {
                      return (
                        <li key={`order-overview-${orderNumber}-${name}`}>
                          <ItemDisplay>{name}</ItemDisplay> (Qty. {quantity})
                        </li>
                      );
                    })}
                  </ItemList>
                </td>
                <td>${totalAmount}</td>
                <td>{paymentMethod}</td>
                <td>{status}</td>
                <td>
                  <Button
                    color="danger"
                    disabled={status === STATUSES.CANCELED}
                    size="sm"
                    onClick={() => updateOrderStatus(id, STATUSES.CANCELED)}
                  >
                    Cancel
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
};

export default OrdersTable;
