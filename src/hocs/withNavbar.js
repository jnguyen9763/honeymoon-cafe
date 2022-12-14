import { Link } from "react-router-dom";
import AuthContext from "../states/AuthContext";
import PasswordScreen from "../views/PasswordScreen";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";

const ComponentContainer = styled.div`
  flex: 1;
`;

const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
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
  return (props) => {
    const { enteredPassword } = useContext(AuthContext);

    return (
      <Container>
        <Navbar>
          <Link to="/">
            <Logo src={logo} />
          </Link>
        </Navbar>
        <ComponentContainer>
          {enteredPassword ? <Component {...props} /> : <PasswordScreen />}
        </ComponentContainer>
      </Container>
    );
  };
};

export default withNavbar;
