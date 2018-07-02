const express = require("express");
const bodyParser = require("body-parser");
const PORT = 3000;

const app = express();
app.use(bodyParser());

var pizzas = [
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

sendPizzas = (req, res) => {
  res.send(pizzas);
};
sendPizzaById = (req, res) => {
  const targetPizza = getPizzaById(req.params.id);
  console.log(`Getting pizza... Requested Id: ${req.params.id}
      pizza retrieved: {
          id: ${targetPizza.id}
          name: ${targetPizza.name}
          price: ${targetPizza.price}
      }
  `);
  res.send(targetPizza);
};
app.get("/pizzas", sendPizzas);
app.get("/pizzas/:id", sendPizzaById);

createPizza = (req, res) => {
  console.log(req.body);
  const newPizza = {
    id: "" + id++,
    ...req.body
  };
  pizzas = [...pizzas, newPizza];
  res.send(newPizza);
};
app.post("/pizzas", createPizza);

updatePizza = (req, res) => {
  const targetPizza = getPizzaById(req.params.id);
  console.log(`Updating pizza... Requested Id: ${req.params.id}`);
  console.log(`Requested new information:`, req.body);
  console.log(`Pizza retrieved:
    id: ${targetPizza.id}
    name: ${targetPizza.name}
    price: ${targetPizza.price}
  `);
  const indexToUpdate = pizzas.indexOf(targetPizza);
  const updatedPizza = { ...targetPizza, ...req.body };
  pizzas[indexToUpdate] = updatedPizza;
  res.send(updatedPizza);
};
app.put("/pizzas/:id", updatePizza);

deletePizza = (req, res) => {
    const targetPizza = getPizzaById(req.params.id);
    if(targetPizza === undefined) {
        res.send(`Unable to retrieve pizza with id ${req.params.id}`);
        return;
    }
    const indexToDelete = pizzas.indexOf(targetPizza);
    pizzas = [
        ...pizzas.slice(0, indexToDelete),
        ...pizzas.slice(indexToDelete + 1)
    ];
    res.send(`${targetPizza.name}, id ${req.params.id} deleted successfully`);
};
app.delete('/pizzas/:id', deletePizza);
