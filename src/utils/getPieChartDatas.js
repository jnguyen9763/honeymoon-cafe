import { PAYMENT_METHODS } from "../constants/paymentMethods";
import { STATUSES } from "../constants/statuses";

const getItemCount = (items, { itemName }) => {
  return items.reduce((acc, { name }) => {
    if (name.includes(itemName)) {
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
      title: "Drink #1",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Drink #1",
      }),
      color: "#E74C3C",
    },
    {
      title: "Drink #2",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Drink #2",
      }),
      color: "#F1C40F",
    },
    {
      title: "Drink #3",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Drink #3",
      }),
      color: "#3498DB",
    },
    {
      title: "Food #1",
      value: getItemsCount(processedOrders, getItemCount, {
        itemName: "Food #1",
      }),
      color: "#27AE60",
    },
  ];

  const drinkToppingsData = [
    {
      title: "Jelly",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemName: "Drink",
        toppingName: "jelly",
      }),
      color: "#F39C12",
    },
    {
      title: "No Toppings",
      value: getItemsCount(processedOrders, getNoToppingsCount, {
        itemName: "Drink",
      }),
      color: "#BDC3C7",
    },
  ];

  const foodToppingsData = [
    {
      title: "Topping #1",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemName: "Food #1",
        toppingName: "topping #1",
      }),
      color: "#2ECC71",
    },
    {
      title: "Topping #2",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemName: "Food #1",
        toppingName: "topping #2",
      }),
      color: "#F39C12",
    },
    {
      title: "Topping #3",
      value: getItemsCount(processedOrders, getToppingCount, {
        itemName: "Food #1",
        toppingName: "topping #3",
      }),
      color: "#8E44AD",
    },
    {
      title: "No Toppings",
      value: getItemsCount(processedOrders, getNoToppingsCount, {
        itemName: "Food #1",
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
