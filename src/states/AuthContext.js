import React, { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [enteredPassword, setEnteredPassword] = useState(
    localStorage.getItem("HoneymoonCafe:EnteredPassword") === "true"
  );

  const contextValue = {
    enteredPassword,
    setEnteredPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
