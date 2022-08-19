import { PAYMENT_METHODS } from "../constants/paymentMethods";
import { STATUSES } from "../constants/statuses";

const getDrinkCount = (items, { drinkName }) => {
  return items.reduce((acc, { name }) => {
    if (name.includes(drinkName)) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const getToppingCount = (items, { itemName, toppingName }) => {
  return items.reduce((acc, { name }) => {
    if (name.includes(itemName) && name.includes(toppingName)) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const getNoToppingsCount = (items, { itemName }) => {
  return items.reduce((acc, { name }) => {
    if (name.includes(itemName) && !name.includes("with")) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const getPieChartValue = (orders, filterFunc) => {
  return orders.filter(filterFunc).length;
};

export const getItemsCount = (orders, getItemsCountFunc, options) => {
  return orders.reduce(
    (acc, { items }) => acc + getItemsCountFunc(items, options),
    0
  );
};

// TODO: clean this up and update
export const getPieChartDatas = (orders) => {
  const paymentMethodData = [
    {
      title: "Cash",
      value: getPieChartValue(
        orders,
        (order) => order.paymentMethod === PAYMENT_METHODS.CASH
      ),
      color: "#2ECC71",
    },
    {
      title: "Venmo",
      value: getPieChartValue(
        orders,
        (order) => order.paymentMethod === PAYMENT_METHODS.VENMO
      ),
      color: "#3498DB",
    },
  ];

  const statusData = [
    {
      title: "New",
      value: getPieChartValue(orders, (order) => order.status === STATUSES.NEW),
      color: "#5DADE2",
    },
    {
      title: "In Progress",
      value: getPieChartValue(
        orders,
        (order) => order.status === STATUSES.IN_PROGRESS
      ),
      color: "#F4D03F",
    },
    {
      title: "Completed",
      value: getPieChartValue(
        orders,
        (order) => order.status === STATUSES.COMPLETED
      ),
      color: "#52BE80",
    },
    {
      title: "Picked-up",
      value: getPieChartValue(
        orders,
        (order) => order.status === STATUSES.PICKED_UP
      ),
      color: "#CACFD2",
    },
    {
      title: "Canceled",
      value: getPieChartValue(
        orders,
        (order) => order.status === STATUSES.CANCELED
      ),
      color: "#EC7063",
    },
  ];

  const drinkData = [
    {
      title: "Drink #1",
      value: getItemsCount(orders, getDrinkCount, { drinkName: "Drink #1" }),
      color: "#E74C3C",
    },
    {
      title: "Drink #2",
      value: getItemsCount(orders, getDrinkCount, { drinkName: "Drink #2" }),
      color: "#F1C40F",
    },
    {
      title: "Drink #3",
      value: getItemsCount(orders, getDrinkCount, { drinkName: "Drink #3" }),
      color: "#3498DB",
    },
  ];

  const drinkToppingsData = [
    {
      title: "Jelly",
      value: getItemsCount(orders, getToppingCount, {
        itemName: "Drink",
        toppingName: "jelly",
      }),
      color: "#F39C12",
    },
    {
      title: "No Toppings",
      value: getItemsCount(orders, getNoToppingsCount, { itemName: "Drink" }),
      color: "#BDC3C7",
    },
  ];

  const foodToppingsData = [
    {
      title: "Topping #1",
      value: getItemsCount(orders, getToppingCount, {
        itemName: "Food #1",
        toppingName: "topping #1",
      }),
      color: "#2ECC71",
    },
    {
      title: "Topping #2",
      value: getItemsCount(orders, getToppingCount, {
        itemName: "Food #1",
        toppingName: "topping #2",
      }),
      color: "#F39C12",
    },
    {
      title: "Topping #3",
      value: getItemsCount(orders, getToppingCount, {
        itemName: "Food #1",
        toppingName: "topping #3",
      }),
      color: "#8E44AD",
    },
    {
      title: "No Toppings",
      value: getItemsCount(orders, getNoToppingsCount, { itemName: "Food #1" }),
      color: "#BDC3C7",
    },
  ];

  return {
    paymentMethodData,
    statusData,
    drinkData,
    drinkToppingsData,
    foodToppingsData,
  };
};
