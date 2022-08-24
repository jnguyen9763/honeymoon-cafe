import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  font-family: "Libre Franklin", sans-serif;
  padding: 0 30px;
`;

const Heading = styled.div`
  color: #ebbe00;
  font-size: 4vw;
`;

const NumbersContainer = styled.div`
  color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  font-size: 8vw;
  gap: 0 5.5vw;
  overflow: auto;
`;

const PickupDisplay = ({ heading, orderNumbers = [] }) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <NumbersContainer>
        {orderNumbers.map((orderNumber) => {
          return <span key={`${heading}-${orderNumber}`}>{orderNumber}</span>;
        })}
      </NumbersContainer>
    </Container>
  );
};

export default PickupDisplay;
