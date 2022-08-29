import { STATUSES } from "../constants/statuses";
import { Link } from "react-router-dom";
import PickupDisplay from "../components/PickupDisplay";
import React, { useContext } from "react";
import logo from "../assets/logo.png";
import styled from "styled-components";
import FirestoreContext from "../states/FirestoreContext";

const Container = styled.div`
  align-items: center;
  background-color: #050a30;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Divider = styled.div`
  background-color: #ebbe00;

  @media (orientation: landscape) {
    width: 5px;
  }

  @media (orientation: portrait) {
    height: 5px;
    margin: 30px;
  }
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

  @media (orientation: landscape) {
    flex-direction: row;
  }

  @media (orientation: portrait) {
    flex-direction: column;
  }
`;

const PickupScreen = () => {
  const { orders } = useContext(FirestoreContext);

  const inProgressOrderNumbers = orders
    .filter(({ status }) => status === STATUSES.IN_PROGRESS)
    .map(({ orderNumber }) => orderNumber);

  const pickupOrderNumbers = orders
    .filter(({ status }) => status === STATUSES.COMPLETED)
    .map(({ orderNumber }) => orderNumber);

  return (
    <Container>
      <LogoLink to="/">
        <Logo src={logo} />
      </LogoLink>
      <TableContainer>
        <PickupDisplay
          heading="IN PROGRESS"
          orderNumbers={inProgressOrderNumbers}
        />
        <Divider />
        <PickupDisplay
          heading="READY FOR PICK-UP"
          orderNumbers={pickupOrderNumbers}
        />
      </TableContainer>
    </Container>
  );
};

export default PickupScreen;
