import { checkAlert } from "./alerts.js";

const products = [
  {
    name: "Milk A",
    price: 31
  },
  {
    name: "Milk B",
    price: 24
  },
  {
    name: "Milk C",
    price: 18
  }
];

const result =
  checkAlert(products, 30);

console.log(result);