import { PieChart } from "react-minimal-pie-chart";
import React from "react";
import styled from "styled-components";

const PieChartContainer = styled.div`
  padding: 20px;

  /* Extra small devices (phones, 600px and down) */
  @media only screen and (max-width: 600px) {
    width: 100%;
  }

  /* Small devices (portrait tablets and large phones, 600px and up) */
  @media only screen and (min-width: 600px) {
    width: 50%;
  }

  /* Large devices (laptops/desktops, 992px and up) */
  @media only screen and (min-width: 992px) {
    width: 33%;
  }

  /* Extra large devices (large laptops and desktops, 1200px and up) */
  @media only screen and (min-width: 1200px) {
    width: 25%;
  }
`;

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const PieChartStat = ({ data, header }) => {
  return (
    <PieChartContainer>
      <Container>
        <h6>{header}</h6>
        <PieChart
          data={data}
          label={({ dataEntry }) =>
            dataEntry.value
              ? `${dataEntry.title} (${dataEntry.value})`
              : undefined
          }
          labelStyle={() => ({
            fontSize: "5px",
            fontWeight: 600,
          })}
          animate
        />
      </Container>
    </PieChartContainer>
  );
};

export default PieChartStat;
