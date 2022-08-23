import { STATUSES } from "../constants/statuses";
import React, { createContext, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "@firebase/firestore"; 

const FirestoreContext = createContext({});

export const FirestoreProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);
  const orderRef = doc(db, "orders", orderNumber.toString());
  const orderNumRef = doc(db, "orderNumber", "orderNumber");

  // TODO: figure out when we want to initialize this DB
  // Maybe have it in the dashboard to reset everything?
  //  i.e delete all documents in orders, set order number to 0
  const initializeDb = () => {
    setDoc(orderNumRef, { orderNumber: 0 });
  };

  const createOrder = async ({ items, notes, paymentMethod, totalAmount }) => {
    const orderNumSnap = await getDoc(orderNumRef);
    let orderNum = orderNumSnap.get("orderNumber") + 1;
  
    let newOrder = {
      id: orderNum, 
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
      await setDoc(orderRef, newOrder);
    } catch (e) {
      console.log("Error creating new order: ", e);
    }

    try {
      await setDoc(orderNumRef, {orderNumber : orderNum});
    } catch (e) {
      console.log("Error updating order number: ", e);
    }

    setOrders([...orders, newOrder]);
    setOrderNumber(orderNum);
    
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

  // UPDATE orders SET status == newStatus where orderNumber == orderNum
  // TODO: the updates button currently not working - orderNumber might not be in sync
  // might need to figure out how to initialize the db first or just do it manually
  // in the firebase browser
  // - figure out a more efficient way to update the "global" order array without having
  // to loop through the whole list of orders
  const updateOrderStatus = async (orderNumber, newStatus) => {
    const orderRef = doc(db, "orders", orderNumber);
    await updateDoc(orderRef, { status: newStatus });

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
