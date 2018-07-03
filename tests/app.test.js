const request = require("supertest");
const app = require("../app").app;
const originPizzas = require("../app").originPizzas;

describe("GET", () => {
  test("GET / should return status NOT OK", async () => {
      const response = await request(app).get("/");
      expect(response.ok).toEqual(false);
  });
  
  test("GET /pizzas should return seeded pizzas", async () => {
    const response = await request(app).get("/pizzas");
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toEqual(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toEqual(originPizzas);
  });
  
  test("GET /pizzas/:id should return pizza with requested id", async () => {
    const idToGet = "1";
    const response = await request(app).get(`/pizzas/${idToGet}`);
    expect(response.status).toEqual(200);
    expect(response.body.id).toEqual(idToGet);
  });
});

describe('POST', () => {
  test("POST / should return status NOT OK", async () => {
      const response = await request(app).post("/");
      expect(response.ok).toEqual(false);
  });

  test('POST /pizzas should return the newly created pizza', async () => {
    const TEST_DATA = {
      name: "test pizza",
      price: 5
    };
    const response = await request(app).post("/pizzas").send(TEST_DATA);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject(TEST_DATA);
  });
});

describe('PUT', () => {
  test("PUT / should return status NOT OK", async () => {
      const response = await request(app).put("/");
      expect(response.ok).toEqual(false);
  });

  test('PUT /pizzas/:id should return the updated pizza with requested id', async () => {
    const idToPut = "1";
    const TEST_DATA = {
      price: 5
    };
    const response = await request(app).put(`/pizzas/${idToPut}`).send(TEST_DATA);
    expect(response.status).toEqual(200);
    expect(response.body).toMatchObject(TEST_DATA);
    expect(response.body.price).toEqual(TEST_DATA.price);
  });
});

describe('DELETE', () => {
  test("DELETE / should return status NOT OK", async () => {
      const response = await request(app).delete("/");
      expect(response.ok).toEqual(false);
  });

  test('DELETE /pizzas/:id should return the pizzas after removing pizza with requested id', async () => {
    const idToDelete = "4";
    // const PIZZA_TO_DELETE = originPizzas.find(pizza => pizza.id === idToDelete);
    // const response = await request(app).delete(`/pizzas/${idToDelete}`);
    // expect(response.status).toEqual(200);
    // expect(response.body).not.toContainEqual(PIZZA_TO_DELETE);

    const response = await request(app).delete(`/pizzas/${idToDelete}`);
    expect(response.body).toMatch(`Pizza id ${idToDelete} deleted successfully`);
  });
});
