import { STATUSES } from "../constants/statuses";
import React, { createContext, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc, updateDoc } from "@firebase/firestore"; 

const FirestoreContext = createContext({});

export const FirestoreProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [orderNumber, setOrderNumber] = useState(1);


  // TODO:
  // Button to reset currently in Dashboard
  // Delete all documents in orders
  const initializeDb = () => {
    const orderNumRef = doc(db, "orderNumber", "orderNumber");
    setDoc(orderNumRef, { orderNumber: 1 });
  };

  const createOrder = async ({ items, notes, paymentMethod, totalAmount }) => {
    const orderRef = doc(db, "orders", orderNumber.toString());
    const orderNumRef = doc(db, "orderNumber", "orderNumber");
    
    const orderNumSnap = await getDoc(orderNumRef);
    let orderNum = orderNumSnap.get("orderNumber");
  
    let newOrder = {
      items: Object.keys(items).map((name) => ({
          name,
          quantity: items[name].quantity,
        })),
      notes,
      orderNum,
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
      await setDoc(orderNumRef, {orderNumber : ++orderNum});
    } catch (e) {
      console.log("Error updating order number: ", e);
    }

    setOrders([...orders, newOrder]);
    setOrderNumber(orderNum);
  };

  // UPDATE orders SET status == newStatus where orderNumber == orderNum
  // TODO: the updates button currently not working - orderNumber might not be in sync
  // might need to figure out how to initialize the db first or just do it manually
  // in the firebase browser
  // - figure out a more efficient way to update the "global" order array without having
  // to loop through the whole list of orders
  const updateOrderStatus = async (orderNumber, newStatus) => {
    console.log("OrderNumber: ", orderNumber, "\t OrderStatus: ", newStatus);
    const orderRef = doc(db, "orders", orderNumber.toString());
    const orderNumRef = doc(db, "orderNumber", "orderNumber");
    
    let updateResult = await updateDoc(orderRef, { status: newStatus });
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
    initializeDb,
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
