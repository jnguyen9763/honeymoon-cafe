import { STATUSES } from "../constants/statuses";
import React, { createContext } from "react";
import { doc, collection } from 'firebase/firestore';
import { useDocument, useCollection } from 'react-firebase-hooks/firestore'
import { firestore } from "../firebase";
import { useAlert } from "../hooks/useAlert";
import { Spinner } from 'reactstrap'
import LoadingScreen from '../views/LoadingScreen'

const FirestoreContext = createContext({});

export const FirestoreProvider = ({ children }) => {
  const [orderNumVal, orderNumLoading, orderNumError] = useDocument(
    doc(firestore, 'orderNumber', 'orderNumber'),
  );

  const [ordersVal, ordersLoading, ordersError] = useCollection(
    collection(firestore, 'orders'),
  );
    
  if (orderNumError || ordersError ) {
    return <div>
          {ordersError && <strong>Error: {JSON.stringify(ordersError)}</strong>}
          {orderNumError && <strong>Error: {JSON.stringify(orderNumError)}</strong>}
    </div>
  }  


  if (ordersLoading || orderNumLoading) {
    return <LoadingScreen/>
  }

  const { orderNumber } = orderNumVal.data()

  const orders = ordersVal.docs.map((doc) => doc.data())

  console.log(orders)

  const createOrder = ({ items, notes, paymentMethod, totalAmount }) => {
    // setOrders([
    //   ...orders,
    //   {
    //     barista: undefined,
    //     items: Object.keys(items)
    //       .map((name) => ({
    //         name,
    //         quantity: items[name].quantity,
    //       }))
    //       .sort((a, b) => a.name.localeCompare(b.name)),
    //     notes,
    //     orderNumber,
    //     paymentMethod,
    //     status: STATUSES.NEW,
    //     totalAmount,
    //   },
    // ]);
    // setOrderNumber(orderNumber + 1);
  };

  const updateOrderProperties = (orderNumber, newProperties) => {
    const newOrders = orders.map((order) => {
      if (order.orderNumber === orderNumber) {
        return { ...order, ...newProperties };
      }

      return order;
    });

    // setOrders(newOrders);
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
