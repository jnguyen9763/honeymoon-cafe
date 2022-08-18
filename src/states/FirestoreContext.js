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
        id: orderNumber, // <== should be firestore id
        items: Object.keys(items).map((name) => ({
          name,
          quantity: items[name].quantity,
        })),
        notes,
        orderNumber,
        paymentMethod,
        status: STATUSES.NEW,
        totalAmount,
      },
    ]);
    setOrderNumber(orderNumber + 1);
  };

  const updateOrderStatus = (firestoreId, newStatus) => {
    const newOrders = orders.map((order) => {
      if (order.orderNumber === firestoreId) {
        return { ...order, status: newStatus };
      }

      return order;
    });

    setOrders(newOrders);
  };

  const contextValue = {
    orders,
    orderNumber,
    createOrder,
    updateOrderStatus,
  };

  return (
    <FirestoreContext.Provider value={contextValue}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreContext;
