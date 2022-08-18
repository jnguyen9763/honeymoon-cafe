import React from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";

const ComponentContainer = styled.div`
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
`;

const Logo = styled.img`
  height: 100%;
  padding: 5px;
`;

const Navbar = styled.div`
  background-color: #050a30;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  height: 60px;
`;

const withNavbar = (Component) => {
  return (props) => (
    <Container>
      <Navbar>
        <Logo src={logo} />
      </Navbar>
      <ComponentContainer>
        <Component {...props} />
      </ComponentContainer>
    </Container>
  );
};

export default withNavbar;
