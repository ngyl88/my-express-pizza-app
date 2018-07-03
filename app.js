const express = require("express");

const app = express();
app.use(express.json());

let pizzas = [
  { id: "1", name: "Hawaiian Pizza", price: 20.99 },
  { id: "2", name: "Vegetarian Pizza", price: 22.99 },
  { id: "3", name: "New York Pizza", price: 24.99 },
  { id: "4", name: "Seafood Pizza", price: 30.99 }
];
var id = 5;

getPizzaById = id => pizzas.find(pizza => pizza.id === id);

// GET method
sendPizzas = (req, res) => {
  res.json(pizzas);
};
sendPizzaById = (req, res) => {
  const targetPizza = getPizzaById(req.params.id);
  res.json(targetPizza);
};
app.get("/pizzas", sendPizzas);
app.get("/pizzas/:id", sendPizzaById);

// POST method
createPizza = (req, res) => {
  const newPizza = {
    ...req.body,
    id: "" + id++
  };
  pizzas = [...pizzas, newPizza];
  res.json(newPizza);
};
app.post("/pizzas", createPizza);

// PUT method
updatePizza = (req, res) => {
  // AFTER CLASS DISCUSSION: derek's solution
  // pizzas = pizzas.map(pizza => {
  //   if (pizza.id === req.params.id) return Object.assign(pizza, req.body);
  //   return pizza;
  // });
  // res.json(pizzas);

  // Mine
  const targetPizza = getPizzaById(req.params.id);
  const indexToUpdate = pizzas.indexOf(targetPizza);
  const updatedPizza = { ...targetPizza, ...req.body };
  pizzas[indexToUpdate] = updatedPizza;
  res.json(updatedPizza);
};
app.put("/pizzas/:id", updatePizza);

// DELETE method
deletePizza = (req, res) => {
  // AFTER CLASS DISCUSSION: mayuri's solution
  // pizzas = pizzas.filter(pizza => pizza.id !== req.params.id);
  // res.json(pizzas);

  // Mine
  const targetPizza = getPizzaById(req.params.id);
  if(targetPizza === undefined) {
      res.json(`Unable to retrieve pizza with id ${req.params.id}`);
      return;
  }
  const indexToDelete = pizzas.indexOf(targetPizza);
  pizzas = [
      ...pizzas.slice(0, indexToDelete),
      ...pizzas.slice(indexToDelete + 1)
  ];
  res.json(`Pizza id ${req.params.id} deleted successfully`);
};
app.delete("/pizzas/:id", deletePizza);

module.exports = {
  app: app,
  originPizzas: pizzas
};
