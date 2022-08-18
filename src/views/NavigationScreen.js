import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import React from "react";
import withNavbar from "../hocs/withNavbar";
import styled from "styled-components";

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;

  button {
    padding: 10px 25px;
    width: 100%;
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
`;

const LINKS = [
  { text: "Take order", path: "/take-order" },
  { text: "Order overview", path: "/order-overview" },
  { text: "Pickup status", path: "/pickup" },
  { text: "Dashboard", path: "/" },
];

const NavigationScreen = () => {
  return (
    <Container>
      <ButtonsContainer>
        {LINKS.map(({ text, path }) => {
          return (
            <Link to={path} key={`link-${text}`}>
              <Button color="primary">{text}</Button>
            </Link>
          );
        })}
      </ButtonsContainer>
    </Container>
  );
};

export default withNavbar(NavigationScreen);
