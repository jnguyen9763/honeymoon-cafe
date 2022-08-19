import React from "react";
import styled from "styled-components";

const NameContainer = styled.span`
  font-weight: 600;
`;

const ItemDisplay = ({ name, quantity }) => {
  return (
    <>
      <NameContainer>{name}</NameContainer> (Qty. {quantity})
    </>
  );
};

export default ItemDisplay;
