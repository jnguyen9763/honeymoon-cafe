import { DISCOUNT } from "../constants/items";
import { PAYMENT_METHODS } from "../constants/paymentMethods";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { getTotalQuantity } from "../utils/getPieChartDatas";
import { useAlert } from "../hooks/useAlert";
import FirestoreContext from "../states/FirestoreContext";
import ItemList from "../components/ItemList";
import ItemMaker from "../components/ItemMaker";
import ItemsPricing from "../components/ItemsPricing";
import React, { useContext, useState } from "react";
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

const getTotal = (items, discount) => {
  return Object.values(items)
    .reduce((acc, { price, quantity }) => acc + price * quantity, -discount)
    .toFixed(2);
};

const TakeOrderScreen = () => {
  const { alertMessage, ALERT_TYPES } = useAlert();
  const { createOrder, orderNumber } = useContext(FirestoreContext);
  const [customerAmount, setCustomerAmount] = useState("");
  const [items, setItems] = useState({});
  const [notes, setNotes] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const quantity = getTotalQuantity(Object.values(items));
  const discount = Math.floor(quantity / 2) * DISCOUNT;
  const totalAmount = getTotal(items, discount);

  const toggle = () => setOpenModal(!openModal);

  const onResetOrderState = () => {
    setCustomerAmount("");
    setNotes("");
    setItems({});
  };

  const onCreateOrder = async (paymentMethod) => {
    try {
      await createOrder({ items, notes, paymentMethod, totalAmount });
      alertMessage({
        type: ALERT_TYPES.SUCCESS,
        message: "Created order successfully!",
      });
      onResetOrderState();
    } catch (e) {
      alertMessage({
        message: "Error: Unable to create order.",
      });
    }
  };

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
    onResetOrderState();
    toggle();
  };

  const change = customerAmount ? customerAmount - totalAmount : 0;
  const disablePaymentButtons =
    !customerAmount || change < 0 || totalAmount == 0;

  return (
    <Container>
      <h1>Order #{orderNumber}</h1>
      <ItemMaker onUpdateItem={onUpdateItem} />
      <ItemList items={items} onUpdateItem={onUpdateItem} />
      <NotesInput
        type="textarea"
        placeholder="Notes"
        value={notes}
        onChange={(evt) => setNotes(evt.target.value)}
      />
      <ItemsPricing
        change={change}
        discount={discount.toFixed(2)}
        customerAmount={customerAmount}
        setCustomerAmount={setCustomerAmount}
        total={totalAmount}
      />
      <ButtonGroup>
        <Button
          color="success"
          disabled={disablePaymentButtons}
          size="lg"
          onClick={() => onCreateOrder(PAYMENT_METHODS.CASH)}
        >
          Paid Cash
        </Button>
        <div />
        <Button
          color="primary"
          disabled={disablePaymentButtons}
          size="lg"
          onClick={() => onCreateOrder(PAYMENT_METHODS.VENMO)}
        >
          Paid Venmo
        </Button>
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
