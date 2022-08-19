import { AlertProvider } from "./states/AlertContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { FirestoreProvider } from "./states/FirestoreContext";
import DashboardScreen from "./views/DashboardScreen";
import NavigationScreen from "./views/NavigationScreen";
import OrderOverviewScreen from "./views/OrderOverviewScreen";
import PickupScreen from "./views/PickupScreen";
import React from "react";
import TakeOrderScreen from "./views/TakeOrderScreen";
import Test from "./views/Test";

const App = () => {
  return (
    <AlertProvider>
      <FirestoreProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<NavigationScreen />} />
            <Route path="/take-order" element={<TakeOrderScreen />} />
            <Route path="/order-overview" element={<OrderOverviewScreen />} />
            <Route path="/pickup" element={<PickupScreen />} />
            <Route path="/dashboard" element={<DashboardScreen />} />
            <Route path="/test" element={<Test />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </FirestoreProvider>
    </AlertProvider>
  );
};

export default App;
