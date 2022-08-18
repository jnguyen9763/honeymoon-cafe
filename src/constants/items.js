const DRINK_PRICE = 5;
const FOOD_PRICE = 4;

const DRINK_TOPPINGS = Object.freeze({
  TOPPING_ONE: { key: "TOPPING_ONE", name: "Jelly", selected: true },
});

const FOOD_TOPPINGS = Object.freeze({
  TOPPING_ONE: { key: "TOPPING_ONE", name: "Topping #1", selected: false },
  TOPPING_TWO: { key: "TOPPING_TWO", name: "Topping #2", selected: false },
  TOPPING_THREE: { key: "TOPPING_THREE", name: "Topping #3", selected: false },
});

export const ITEMS = Object.freeze({
  DRINK_ONE: {
    key: "DRINK_ONE",
    name: "Drink #1",
    price: DRINK_PRICE,
    toppings: DRINK_TOPPINGS,
  },
  DRINK_TWO: {
    key: "DRINK_TWO",
    name: "Drink #2",
    price: DRINK_PRICE,
    toppings: DRINK_TOPPINGS,
  },
  DRINK_THREE: {
    key: "DRINK_THREE",
    name: "Drink #3",
    price: DRINK_PRICE,
    toppings: DRINK_TOPPINGS,
  },
  FOOD_ONE: {
    key: "FOOD_ONE",
    name: "Food #1",
    price: FOOD_PRICE,
    toppings: FOOD_TOPPINGS,
  },
});
