import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import ItemList from "../components/ItemList";
import ItemMaker from "../components/ItemMaker";
import ItemsPricing from "../components/ItemsPricing";
import React, { useState } from "react";
import withNavbar from "../hocs/withNavbar";
import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  margin-bottom: 10px;

  button {
    flex: 1;
  }

  div {
    width: 10px;
  }
`;

const Container = styled.div`
  height: 100%;
  padding: 30px;

  h1 {
    text-align: center;
  }
`;

const NotesInput = styled(Input)`
  margin-top: 30px;
`;

const getTotal = (items) => {
  return Object.values(items)
    .reduce((acc, { price, quantity }) => acc + price * quantity, 0)
    .toFixed(2);
};

const TakeOrderScreen = () => {
  const [customerAmount, setCustomerAmount] = useState("");
  const [items, setItems] = useState({});
  const [notes, setNotes] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const toggle = () => setOpenModal(!openModal);

  const onUpdateItem = ({ item, price, quantity }) => {
    const existingQuantity = items[item]?.quantity || 0;
    const newQuantity = existingQuantity + quantity;

    if (newQuantity === 0) {
      const newItems = { ...items };
      delete newItems[item];
      setItems(newItems);
    } else {
      setItems({
        ...items,
        [item]: {
          price,
          quantity: newQuantity,
        },
      });
    }
  };

  const onResetOrder = () => {
    toggle();
    setItems({});
    setCustomerAmount("");
  };

  return (
    <Container>
      <h1>Order #1</h1>
      <ItemMaker onUpdateItem={onUpdateItem} />
      <ItemList items={items} onUpdateItem={onUpdateItem} />
      <NotesInput
        type="textarea"
        placeholder="Notes"
        value={notes}
        onChange={(evt) => setNotes(evt.target.value)}
      />
      <ItemsPricing
        customerAmount={customerAmount}
        setCustomerAmount={setCustomerAmount}
        total={getTotal(items)}
      />
      <ButtonGroup>
        <Button color="success">Paid Cash</Button>
        <div />
        <Button color="primary">Paid Venmo</Button>
      </ButtonGroup>
      <Button color="danger" block onClick={toggle}>
        Reset order
      </Button>
      <Modal isOpen={openModal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Reset order</ModalHeader>
        <ModalBody>Are you sure you want to delete this order?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onResetOrder}>
            Reset order
          </Button>{" "}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default withNavbar(TakeOrderScreen);
