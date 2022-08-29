import { STATUSES } from "../constants/statuses";
import {
  collection,
  doc,
  increment,
  deleteDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore } from "../firebase";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import ErrorScreen from "../views/ErrorScreen";
import LoadingScreen from "../views/LoadingScreen";
import React, { createContext } from "react";

const FirestoreContext = createContext({});

const orderNumRef = doc(firestore, "orderNumber", "orderNumber");

export const FirestoreProvider = ({ children }) => {
  const [orderNumValue, orderNumLoading, orderNumError] = useDocument(
    doc(firestore, "orderNumber", "orderNumber")
  );
  const [ordersValue, ordersLoading, ordersError] = useCollection(
    collection(firestore, "orders")
  );

  if (orderNumError || ordersError) {
    return (
      <ErrorScreen orderNumError={orderNumError} ordersError={ordersError} />
    );
  }

  if (orderNumLoading || ordersLoading) {
    return <LoadingScreen />;
  }

  const { orderNumber } = orderNumValue.data();

  const orders = ordersValue.docs.map((doc) => doc.data());

  const createOrder = async ({ items, notes, paymentMethod, totalAmount }) => {
    const orderRef = doc(firestore, "orders", `${orderNumber}`);

    const newOrder = {
      barista: null,
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
    };

    await setDoc(orderRef, newOrder);
    await updateDoc(orderNumRef, { orderNumber: increment(1) });
  };

  const resetDatabase = async () => {
    await updateDoc(orderNumRef, { orderNumber: 1 });
    for (const doc of ordersValue.docs) {
      await deleteDoc(doc.ref);
    }
  };

  const updateOrderProperties = async (orderId, newProperties) => {
    const orderRef = doc(firestore, "orders", `${orderId}`);
    await updateDoc(orderRef, newProperties);
  };

  const contextValue = {
    orders,
    orderNumber,
    createOrder,
    resetDatabase,
    updateOrderProperties,
  };

  return (
    <FirestoreContext.Provider value={contextValue}>
      {children}
    </FirestoreContext.Provider>
  );
};

export default FirestoreContext;
