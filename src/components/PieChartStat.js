import { PieChart } from "react-minimal-pie-chart";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 20px;
  max-width: 300px;
`;

const PieChartStat = ({ data, header }) => {
  return (
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
  );
};

export default PieChartStat;
