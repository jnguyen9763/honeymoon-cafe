import { STATUSES } from "../constants/statuses";
import { Button, List, Table } from "reactstrap";
import FirestoreContext from "../states/FirestoreContext";
import ItemDisplay from "./ItemDisplay";
import React, { useContext } from "react";
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
  const { orders = [], updateOrderProperties } = useContext(FirestoreContext);

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
                    onClick={() =>
                      updateOrderProperties(id, { status: STATUSES.CANCELED })
                    }
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
