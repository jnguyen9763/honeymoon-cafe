import { PAYMENT_METHODS } from "../constants/paymentMethods";

const ALL_DRINKS = ["Gold Moon", "Pink Moon", "Blue Moon"];
const ALL_FOODS = ["Moonettes"];

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

export const getTotalQuantity = (items) => {
  return items.reduce((acc, { quantity }) => acc + parseInt(quantity), 0);
};

// TODO: clean this up and update
export const getPieChartDatas = (processedOrders) => {
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

  const itemsData = [
    {
      title: "Gold Moon",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Gold Moon",
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
      title: "Moonettes",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Moonettes",
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
      title: "Cocoa Pebbles",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemNames: ALL_FOODS,
        toppingName: "cocoa pebbles",
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
    { header: "Items", data: itemsData },
    { header: "Drink Toppings", data: drinkToppingsData },
    { header: "Food Toppings", data: foodToppingsData },
  ];
};
