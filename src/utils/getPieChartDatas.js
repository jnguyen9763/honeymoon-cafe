import { PAYMENT_METHODS } from "../constants/paymentMethods";
import { STATUSES } from "../constants/statuses";

const ALL_DRINKS = ["Lavender Moon", "Pink Moon", "Blue Moon"];
const ALL_FOODS = ["Donut Hole Skewers"];

const getItemCount = (items, { itemName }) => {
  return items.reduce((acc, { name }) => {
    if (name.includes(itemName)) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const getToppingCount = (items, { itemNames, toppingName }) => {
  return items.reduce((acc, { name }) => {
    if (
      itemNames.some((itemName) => name.includes(itemName)) &&
      name.includes(toppingName)
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);
};

const getNoToppingsCount = (items, { itemNames }) => {
  return items.reduce((acc, { name }) => {
    if (
      itemNames.some((itemName) => name.includes(itemName)) &&
      !name.includes("with")
    ) {
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
export const getPieChartDatas = (allOrders, processedOrders) => {
  const paymentMethodData = [
    {
      title: "Cash",
      value: getPieChartValue(
        processedOrders,
        (order) => order.paymentMethod === PAYMENT_METHODS.CASH
      ),
      color: "#2ECC71",
    },
    {
      title: "Venmo",
      value: getPieChartValue(
        processedOrders,
        (order) => order.paymentMethod === PAYMENT_METHODS.VENMO
      ),
      color: "#3498DB",
    },
  ];

  const statusData = [
    {
      title: "New",
      value: getPieChartValue(
        allOrders,
        (order) => order.status === STATUSES.NEW
      ),
      color: "#5DADE2",
    },
    {
      title: "In Progress",
      value: getPieChartValue(
        allOrders,
        (order) => order.status === STATUSES.IN_PROGRESS
      ),
      color: "#F4D03F",
    },
    {
      title: "Completed",
      value: getPieChartValue(
        allOrders,
        (order) => order.status === STATUSES.COMPLETED
      ),
      color: "#52BE80",
    },
    {
      title: "Picked-up",
      value: getPieChartValue(
        allOrders,
        (order) => order.status === STATUSES.PICKED_UP
      ),
      color: "#CACFD2",
    },
    {
      title: "Canceled",
      value: getPieChartValue(
        allOrders,
        (order) => order.status === STATUSES.CANCELED
      ),
      color: "#EC7063",
    },
  ];

  const itemsData = [
    {
      title: "Lavender Moon",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Lavender Moon",
      }),
      color: "#E74C3C",
    },
    {
      title: "Pink Moon",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Pink Moon",
      }),
      color: "#F1C40F",
    },
    {
      title: "Blue Moon",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Blue Moon",
      }),
      color: "#3498DB",
    },
    {
      title: "Donut Hole Skewers",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Donut Hole Skewers",
      }),
      color: "#27AE60",
    },
  ];

  const drinkToppingsData = [
    {
      title: "Lychee Jelly",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemNames: ALL_DRINKS,
        toppingName: "lychee jelly",
      }),
      color: "#F39C12",
    },
    {
      title: "No Toppings",
      value: getItemsCount(processedOrders, getNoToppingsCount, {
        itemNames: ALL_DRINKS,
      }),
      color: "#BDC3C7",
    },
  ];

  const foodToppingsData = [
    {
      title: "Cookies and Creme",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemNames: ALL_FOODS,
        toppingName: "cookies and creme",
      }),
      color: "#2ECC71",
    },
    {
      title: "Graham Crackers",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemNames: ALL_FOODS,
        toppingName: "graham crackers",
      }),
      color: "#F39C12",
    },
    {
      title: "Fruit Pebbles",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemNames: ALL_FOODS,
        toppingName: "fruit pebbles",
      }),
      color: "#8E44AD",
    },
    {
      title: "No Toppings",
      value: getItemsCount(processedOrders, getNoToppingsCount, {
        itemNames: ALL_FOODS,
      }),
      color: "#BDC3C7",
    },
  ];

  return [
    { header: "Payment Method", data: paymentMethodData },
    { header: "Status", data: statusData },
    { header: "Items", data: itemsData },
    { header: "Drink Toppings", data: drinkToppingsData },
    { header: "Food Toppings", data: foodToppingsData },
  ];
};
