import { Button, Table } from "reactstrap";
import React from "react";
import styled from "styled-components";

const ItemTable = styled(Table)`
  margin-top: 30px;
`;

const QuantityButton = styled(Button)`
  align-items: center;
  border-radius: 50%;
  display: inline-flex;
  height: 20px;
  justify-content: center;
  line-height: 0px;
  width: 20px;
`;

const QuantityCell = styled.td`
  min-width: 90px;
`;

const QuantityText = styled.span`
  margin: 0 15px;
`;

const ItemList = ({ items = {}, onUpdateItem }) => {
  if (!Object.keys(items).length) {
    return null;
  }

  return (
    <ItemTable size="sm" borderless striped>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(items).map((item) => {
          const { price, quantity } = items[item];

          return (
            <tr key={`item-${item}`}>
              <td>{item}</td>
              <QuantityCell>
                <QuantityButton
                  color="primary"
                  size="sm"
                  onClick={() => onUpdateItem({ item, price, quantity: -1 })}
                >
                  -
                </QuantityButton>
                <QuantityText>{quantity}</QuantityText>
                <QuantityButton
                  color="primary"
                  size="sm"
                  onClick={() => onUpdateItem({ item, price, quantity: 1 })}
                >
                  +
                </QuantityButton>
              </QuantityCell>
            </tr>
          );
        })}
      </tbody>
    </ItemTable>
  );
};

export default ItemList;
