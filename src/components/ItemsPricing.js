import { Input } from "reactstrap";
import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px 0;
`;

const CustomerAmount = styled(Input)`
  margin-left: 10px;
  text-align: right;
`;

const LabelCell = styled.span`
  font-weight: bold;
`;

const NumberCell = styled.span`
  width: 100px;
  text-align: right;
`;

const Row = styled.div`
  display: flex;
  justify-content: end;
  height: 35px;
`;

const ItemsPricing = ({ customerAmount, setCustomerAmount, total }) => {
  const onBlur = () => {
    if (customerAmount && !isNaN(customerAmount)) {
      setCustomerAmount(parseFloat(customerAmount).toFixed(2));
    }
  };

  const onChange = (evt) => {
    const value = evt.target.value;

    if (!isNaN(value)) {
      setCustomerAmount(value);
    }
  };

  const change = customerAmount ? (customerAmount - total).toFixed(2) : "0.00";

  return (
    <Container>
      <Row>
        <LabelCell>Total:</LabelCell>
        <NumberCell>${total}</NumberCell>
      </Row>
      <Row>
        <LabelCell>Customer paid:</LabelCell>
        <NumberCell>
          <CustomerAmount
            size="sm"
            value={customerAmount}
            placeholder="$0.00"
            onBlur={onBlur}
            onChange={onChange}
          />
        </NumberCell>
      </Row>
      <Row>
        <LabelCell>Change:</LabelCell>
        <NumberCell>
          {change < 0 ? `-$${Math.abs(change)}` : `$${change}`}
        </NumberCell>
      </Row>
    </Container>
  );
};

export default ItemsPricing;
