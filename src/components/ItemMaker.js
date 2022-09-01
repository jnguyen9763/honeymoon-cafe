import { ITEMS } from "../constants/items";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const AddItemButton = styled(Button)`
  margin-top: 1rem;
`;

const geDefaultSelectedToppingsState = (toppings) => {
  return Object.values(toppings).reduce(
    (acc, { key, selected }) => ({
      ...acc,
      [key]: { selected },
    }),
    {}
  );
};

const getSelectedToppingsState = (items) => {
  return Object.values(items).reduce(
    (acc, { key, toppings }) => ({
      ...acc,
      [key]: geDefaultSelectedToppingsState(toppings),
    }),
    {}
  );
};

const ItemMaker = ({ onUpdateItem }) => {
  const itemValues = Object.values(ITEMS);
  const firstItemKey = itemValues[0].key;

  const [selectedItemKey, setSelectedItemKey] = useState(firstItemKey);
  const [selectedToppings, setSelectedToppings] = useState(
    getSelectedToppingsState(ITEMS)
  );

  useEffect(() => {
    setSelectedToppings(getSelectedToppingsState(ITEMS));
  }, [selectedItemKey]);

  const onItemSelectChange = (evt) => {
    setSelectedItemKey(evt.target.value);
  };

  const onToppingSelected = (toppingKey) => {
    const resetToppingsSelected = Object.keys(
      selectedToppings[selectedItemKey]
    ).reduce((acc, topping) => ({ ...acc, [topping]: { selected: false } }));

    setSelectedToppings({
      ...selectedToppings,
      [selectedItemKey]: {
        ...resetToppingsSelected,
        [toppingKey]: {
          selected: !selectedToppings[selectedItemKey][toppingKey].selected,
        },
      },
    });
  };

  const onAddItem = () => {
    const allToppings = selectedToppings[selectedItemKey];
    const toppings = Object.keys(allToppings)
      .filter((key) => allToppings[key].selected)
      .map((key) => ITEMS[selectedItemKey].toppings[key].name.toLowerCase());

    let item = ITEMS[selectedItemKey].name;
    if (toppings.length) {
      item = `${item} with ${toppings
        .sort((a, b) => a.localeCompare(b))
        .join(", ")}`;
    }

    onUpdateItem({ item, price: ITEMS[selectedItemKey].price, quantity: 1 });
  };

  return (
    <Form>
      <FormGroup>
        <Label for="item">Item</Label>
        <Input
          id="item"
          name="select"
          type="select"
          onChange={onItemSelectChange}
        >
          {itemValues.map(({ key, name }) => {
            return (
              <option key={`item-${name}`} value={key}>
                {name}
              </option>
            );
          })}
        </Input>
      </FormGroup>
      {Object.values(ITEMS[selectedItemKey].toppings).map(({ key, name }) => {
        return (
          <FormGroup check key={`topping-${name}`}>
            <Input
              type="checkbox"
              checked={selectedToppings[selectedItemKey][key].selected}
              onChange={() => onToppingSelected(key)}
            />{" "}
            <Label check>{name}</Label>
          </FormGroup>
        );
      })}
      <AddItemButton color="primary" size="sm" block onClick={onAddItem}>
        Add item
      </AddItemButton>
    </Form>
  );
};

export default ItemMaker;
