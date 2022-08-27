import { STATUSES } from "../constants/statuses";
import React, { createContext, useState } from "react";

const FirestoreContext = createContext({});

export const FirestoreProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);

  const createOrder = ({ items, notes, paymentMethod, totalAmount }) => {
    setOrders([
      ...orders,
      {
        barista: undefined,
        items: Object.keys(items)
          .map((name) => ({
            name,
            quantity: items[name].quantity,
          }))
          .sort((a, b) => a.name.localeCompare(b.name)),
        notes,
        orderNumber,
        paymentMethod,
        status: STATUSES.NEW,
        totalAmount,
      },
    ]);
    setOrderNumber(orderNumber + 1);
  };

  const updateOrderProperties = (orderNumber, newProperties) => {
    const newOrders = orders.map((order) => {
      if (order.orderNumber === orderNumber) {
        return { ...order, ...newProperties };
      }

      return order;
    });

    setOrders(newOrders);
  };

  const contextValue = {
    orders,
    orderNumber,
    createOrder,
    updateOrderProperties,
  };

  return (
    <FirestoreContext.Provider value={contextValue}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreContext;
