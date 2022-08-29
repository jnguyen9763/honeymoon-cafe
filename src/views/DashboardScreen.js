import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import FirestoreContext from "../states/FirestoreContext";
import OrdersActions from "../components/OrdersActions";
import OrdersStats from "../components/OrdersStats";
import OrdersTable from "../components/OrdersTable";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import withNavbar from "../hocs/withNavbar";

const Container = styled.div`
  margin: 15px 30px;
`;

const EmptyStateContainer = styled.div`
  align-items: center;
  display: flex;
  font-size: 25px;
  font-weight: bold;
  height: 100%;
  justify-content: center;
`;

const DashboardScreen = () => {
  const { orders = [] } = useContext(FirestoreContext);
  const [tabId, setTabId] = useState("1");

  if (!orders.length) {
    return <EmptyStateContainer>No orders yet</EmptyStateContainer>;
  }

  return (
    <Container>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={tabId === "1" && "active"}
            onClick={() => setTabId("1")}
          >
            All orders
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={tabId === "2" && "active"}
            onClick={() => setTabId("2")}
          >
            Stats
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={tabId === "3" && "active"}
            onClick={() => setTabId("3")}
          >
            Actions
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={tabId}>
        <TabPane tabId="1">
          <OrdersTable />
        </TabPane>
        <TabPane tabId="2">
          <OrdersStats />
        </TabPane>
        <TabPane tabId="3">
          <OrdersActions />
        </TabPane>
      </TabContent>
    </Container>
  );
};

export default withNavbar(DashboardScreen);
