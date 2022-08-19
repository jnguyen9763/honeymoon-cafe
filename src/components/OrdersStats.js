import { getItemsCount, getPieChartDatas } from "../utils/getPieChartDatas";
import FirestoreContext from "../states/FirestoreContext";
import React, { useContext } from "react";
import styled from "styled-components";
import PieChartStat from "./PieChartStat";

const Container = styled.div`
  margin-top: 15px;
`;

const Header = styled.h3`
  padding-bottom: 10px;
  border-bottom: solid black 2px;
`;

const PieChartsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Section = styled.div`
  margin-bottom: 30px;
`;

const getRevenue = (orders) => {
  return orders
    .reduce((acc, { totalAmount }) => acc + parseFloat(totalAmount), 0)
    .toFixed(2);
};

const getTotalQuantity = (items) => {
  return items.reduce((acc, { quantity }) => acc + parseInt(quantity), 0);
};

const OrdersStats = () => {
  const { orders = [] } = useContext(FirestoreContext);
  const {
    paymentMethodData,
    statusData,
    drinkData,
    drinkToppingsData,
    foodToppingsData,
  } = getPieChartDatas(orders);

  return (
    <Container>
      <Section>
        <Header>General Stats</Header>
        <h5>Total orders: {orders.length}</h5>
        <h5>Total items sold: {getItemsCount(orders, getTotalQuantity)}</h5>
        <h5>Total revenue: ${getRevenue(orders)}</h5>
      </Section>
      <Section>
        <Header>Charts</Header>
        <PieChartsContainer>
          <PieChartStat header="Payment Method" data={paymentMethodData} />
          <PieChartStat header="Status" data={statusData} />
          <PieChartStat header="Drinks" data={drinkData} />
          <PieChartStat header="Drink Toppings" data={drinkToppingsData} />
          <PieChartStat header="Food Toppings" data={foodToppingsData} />
        </PieChartsContainer>
      </Section>
    </Container>
  );
};

export default OrdersStats;
