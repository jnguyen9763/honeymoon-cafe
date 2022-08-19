import { PAYMENT_METHODS } from "../constants/paymentMethods";
import { STATUSES } from "../constants/statuses";
import { getItemsCount, getPieChartDatas } from "../utils/getPieChartDatas";
import FirestoreContext from "../states/FirestoreContext";
import PieChartStat from "./PieChartStat";
import React, { useContext, useMemo } from "react";
import styled from "styled-components";

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

  const processedOrders = useMemo(
    () => orders.filter(({ status }) => status !== STATUSES.CANCELED),
    [orders]
  );
  const pieChartDatas = useMemo(
    () => getPieChartDatas(orders, processedOrders),
    [orders, processedOrders]
  );

  const totalItemsSold = getItemsCount(processedOrders, getTotalQuantity);
  const cashAmount = getRevenue(
    processedOrders.filter(
      ({ paymentMethod }) => paymentMethod === PAYMENT_METHODS.CASH
    )
  );
  const venmoAmount = getRevenue(
    processedOrders.filter(
      ({ paymentMethod }) => paymentMethod === PAYMENT_METHODS.VENMO
    )
  );
  const totalRevenue = getRevenue(processedOrders);

  return (
    <Container>
      <Section>
        <Header>General Stats</Header>
        <h5>Total orders: {processedOrders.length}</h5>
        <h5>Total items sold: {totalItemsSold}</h5>
        <h5>Cash amount: ${cashAmount}</h5>
        <h5>Venmo amount: ${venmoAmount}</h5>
        <h5>Total revenue: ${totalRevenue}</h5>
      </Section>
      <Section>
        <Header>Charts</Header>
        <PieChartsContainer>
          {pieChartDatas.map(({ header, data }) => {
            return (
              <PieChartStat
                key={`piechart-${header}`}
                header={header}
                data={data}
              />
            );
          })}
        </PieChartsContainer>
      </Section>
    </Container>
  );
};

export default OrdersStats;
