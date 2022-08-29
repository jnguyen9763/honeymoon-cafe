import { Button, Input, Label } from "reactstrap";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import AuthContext from "../states/AuthContext";

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;

  button {
    margin-top: 15px;
  }
`;

const PASSWORD = "hoony";

const PasswordScreen = () => {
  const { setEnteredPassword } = useContext(AuthContext);
  const [password, setPassword] = useState("");

  const onClick = () => {
    if (password === PASSWORD) {
      localStorage.setItem("HoneymoonCafe:EnteredPassword", "true");
      setEnteredPassword(true);
    }
  };

  return (
    <Container>
      <div>
        <Label for="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <Button color="primary" size="sm" block onClick={onClick}>
          Enter
        </Button>
      </div>
    </Container>
  );
};

export default PasswordScreen;
