import { Link } from "react-router-dom";
import PickupDisplay from "../components/PickupDisplay";
import React from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  background-color: #050a30;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Divider = styled.div`
  background-color: #ebbe00;
  width: 5px;
`;

const Logo = styled.img`
  height: 100%;
  width: 100%;
`;

const LogoLink = styled(Link)`
  max-height: 25%;
  max-width: 100%;
`;

const TableContainer = styled.div`
  display: flex;
  flex-grow: 1;
  margin-bottom: 30px;
  overflow: hidden;
  width: 100%;
`;

const PickupScreen = () => {
  return (
    <Container>
      <LogoLink to="/">
        <Logo src={logo} />
      </LogoLink>
      <TableContainer>
        <PickupDisplay
          heading="IN PROGRESS"
          orderNumbers={[
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
          ]}
        />
        <Divider />
        <PickupDisplay heading="READY FOR PICK-UP" />
      </TableContainer>
    </Container>
  );
};

export default PickupScreen;
