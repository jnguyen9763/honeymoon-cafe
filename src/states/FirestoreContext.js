import { STATUSES } from "../constants/statuses";
import React, { createContext, useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "@firebase/firestore"

const FirestoreContext = createContext({});

export const FirestoreProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const ref = collection(db, "orders");

  const createOrder = async ({ items, notes, paymentMethod, totalAmount }) => {
    let newOrder = {
      id: orderNumber, 
      items: Object.keys(items).map((name) => ({
          name,
          quantity: items[name].quantity,
        })),
      notes,
      orderNumber,
      paymentMethod,
      status: STATUSES.NEW,
      totalAmount,
    };

    try {
      await addDoc(ref, newOrder);
    } catch (e) {
      console.log(e);
    }

    setOrders([...orders, newOrder]);
    setOrderNumber(orderNumber + 1);
    
    
    // The original JS way
    /*
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
    */
  };

  const updateOrderStatus = (orderNumber, newStatus) => {
    const newOrders = orders.map((order) => {
      if (order.orderNumber === orderNumber) {
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
