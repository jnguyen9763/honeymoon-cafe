import React from "react";
import withNavbar from "../hocs/withNavbar";
import styled from "styled-components";

const Container = styled.div`
  padding: 30px;
`;

const ErrorScreen = ({ orderNumError, ordersError }) => {
  return (
    <Container>
      {orderNumError && (
        <h1>
          ERROR: Unable to fetch order number ({JSON.stringify(orderNumError)})
        </h1>
      )}
      {ordersError && (
        <h1>ERROR: Unable to fetch orders ({JSON.stringify(ordersError)})</h1>
      )}
    </Container>
  );
};

export default withNavbar(ErrorScreen);
