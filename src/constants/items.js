const DRINK_PRICE = 5;
const FOOD_PRICE = 5;

const DRINK_TOPPINGS = Object.freeze({
  TOPPING_ONE: { key: "TOPPING_ONE", name: "Lychee Jelly", selected: true },
});

const FOOD_TOPPINGS = Object.freeze({
  TOPPING_ONE: {
    key: "TOPPING_ONE",
    name: "Cookies and Creme",
    selected: false,
  },
  TOPPING_TWO: { key: "TOPPING_TWO", name: "Graham Crackers", selected: false },
  TOPPING_THREE: {
    key: "TOPPING_THREE",
    name: "Fruit Pebbles",
    selected: false,
  },
});

export const ITEMS = Object.freeze({
  DRINK_ONE: {
    key: "DRINK_ONE",
    name: "Lavender Moon",
    price: DRINK_PRICE,
    toppings: DRINK_TOPPINGS,
  },
  DRINK_TWO: {
    key: "DRINK_TWO",
    name: "Pink Moon",
    price: DRINK_PRICE,
    toppings: DRINK_TOPPINGS,
  },
  DRINK_THREE: {
    key: "DRINK_THREE",
    name: "Blue Moon",
    price: DRINK_PRICE,
    toppings: DRINK_TOPPINGS,
  },
  FOOD_ONE: {
    key: "FOOD_ONE",
    name: "Donut Hole Skewers",
    price: FOOD_PRICE,
    toppings: FOOD_TOPPINGS,
  },
});
