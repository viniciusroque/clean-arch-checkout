import request from "supertest";
import { app, sequelize } from "../express";
import { string } from "yup";

describe("E2E test for Product", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    sequelize.close();
  });

  it("Should create a product", async () => {
    const input = {
      name: "Product 1",
      price: 100
    }
    const res = await request(app).post("/product")
      .send(input);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: input.name,
      price: input.price
    });
  });

  it("Should list all products", async () => {

    const res1 = await request(app).get("/product").send();

    expect(res1.body.products.length).toBe(0);
    const input1 = {
      name: "Product 1",
      price: 100
    }

    const input2 = {
      name: "Product 2",
      price: 100
    }

    const product1 = await request(app).post("/product")
      .send(input1);

    const product2 = await request(app).post("/product")
      .send(input2);

    const res2 = await request(app).get("/product").send();
    expect(res2.body.products).toHaveLength(2);
    expect(res2.body.products).toEqual([
      {
        id: product1.body.id,
        name: product1.body.name,
        price: product1.body.price,
      },
      {
        id: product2.body.id,
        name: product2.body.name,
        price: product2.body.price,
      }
    ]);

  });
});