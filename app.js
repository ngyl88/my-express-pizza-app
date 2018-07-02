const express = require("express");
// const bodyParser = require("body-parser");
const PORT = 3000;

const app = express();
// app.use(bodyParser.json());
app.use(express.json());

let pizzas = [
  { id: "1", name: "Hawaiian Pizza", price: 20.99 },
  { id: "2", name: "Vegetarian Pizza", price: 22.99 },
  { id: "3", name: "New York Pizza", price: 24.99 },
  { id: "4", name: "Seafood Pizza", price: 30.99 }
];
var id = 5;

app.listen(PORT, () => {
  console.log(`App has started at port ${PORT}`);
});

getPizzaById = id => pizzas.find(pizza => pizza.id === id);

// GET method
sendPizzas = (req, res) => {
  res.send(pizzas);
};
sendPizzaById = (req, res) => {
  const targetPizza = getPizzaById(req.params.id);
  res.send(targetPizza);
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
  res.send(newPizza);
};
app.post("/pizzas", createPizza);

// PUT method
updatePizza = (req, res) => {
  pizzas = pizzas.map(pizza => {
    if(pizza.id === req.params.id) return Object.assign(pizza, req.body);
    return pizza;
  })
  res.send(pizzas);
  // const targetPizza = getPizzaById(req.params.id);
  // const indexToUpdate = pizzas.indexOf(targetPizza);
  // const updatedPizza = { ...targetPizza, ...req.body };
  // pizzas[indexToUpdate] = updatedPizza;
  // res.send(updatedPizza);
};
app.put("/pizzas/:id", updatePizza);

// DELETE method
deletePizza = (req, res) => {
  pizzas = pizzas.filter(pizza => pizza.id !== req.params.id);
  res.send(pizzas);
    // const targetPizza = getPizzaById(req.params.id);
    // if(targetPizza === undefined) {
    //     res.send(`Unable to retrieve pizza with id ${req.params.id}`);
    //     return;
    // }
    // const indexToDelete = pizzas.indexOf(targetPizza);
    // pizzas = [
    //     ...pizzas.slice(0, indexToDelete),
    //     ...pizzas.slice(indexToDelete + 1)
    // ];
    // res.send(`${targetPizza.name}, (pizza id ${req.params.id}) deleted successfully`);
};
app.delete('/pizzas/:id', deletePizza);
