const PRICE = 6;
export const DISCOUNT = 2;

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
    name: "Gold Moon",
    price: PRICE,
    toppings: DRINK_TOPPINGS,
  },
  DRINK_TWO: {
    key: "DRINK_TWO",
    name: "Pink Moon",
    price: PRICE,
    toppings: DRINK_TOPPINGS,
  },
  DRINK_THREE: {
    key: "DRINK_THREE",
    name: "Blue Moon",
    price: PRICE,
    toppings: DRINK_TOPPINGS,
  },
  FOOD_ONE: {
    key: "FOOD_ONE",
    name: "Moonettes",
    price: PRICE,
    toppings: FOOD_TOPPINGS,
  },
});
