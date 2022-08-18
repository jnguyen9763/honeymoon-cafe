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
  font-size: 30px;
`;

const NumberDisplay = styled.div`
  display: inline-block;
  padding-right: 40px;
`;

const NumbersContainer = styled.div`
  color: #ffffff;
  font-size: 60px;
  overflow: auto;
  margin-top: 30px;
`;

const PickupDisplay = ({ heading, orderNumbers = [] }) => {
  return (
    <Container>
      <Heading>{heading}</Heading>
      <NumbersContainer>
        {orderNumbers.map((orderNumber) => {
          return (
            <NumberDisplay key={`${heading}-${orderNumber}`}>
              {orderNumber}
            </NumberDisplay>
          );
        })}
      </NumbersContainer>
    </Container>
  );
};

export default PickupDisplay;
