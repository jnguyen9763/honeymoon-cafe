import React from "react";
import styled from "styled-components";

const NameContainer = styled.span`
  font-weight: 600;
`;

const ItemDisplay = ({ name, quantity }) => {
  return (
    <>
      ({quantity}) <NameContainer>{name}</NameContainer>
    </>
  );
};

export default ItemDisplay;
