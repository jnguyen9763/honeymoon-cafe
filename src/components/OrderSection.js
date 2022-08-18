import OrderCard from "./OrderCard";
import React from "react";
import styled from "styled-components";

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 10px;
`;

const Header = styled.h3`
  margin: 20px;
  padding-bottom: 10px;
  border-bottom: solid black 2px;
`;

const OrderSection = ({ header, orders = [] }) => {
  if (!orders.length) {
    return null;
  }

  return (
    <>
      <Header>{header}</Header>
      <CardsContainer>
        {orders.map((order) => {
          return (
            <OrderCard
              key={`${header}-order-${order.orderNumber}`}
              order={order}
            />
          );
        })}
      </CardsContainer>
    </>
  );
};

export default OrderSection;
