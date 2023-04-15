import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for Customer", () => {

  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    sequelize.close();
  });

  it("Should create a customer", async () => {
    const response = await request(app)
      .post("/customer")
      .send({
        name: "Customer 1",
        address: {
          street: "Street",
          city: "City",
          number: 123,
          zipCode: "12345",
        },
      });

      expect(response.status).toBe(200);
      expect(response.body.name).toBe("Customer 1");
      expect(response.body.address.street).toBe("Street");
      expect(response.body.address.city).toBe("City");
      expect(response.body.address.number).toBe(123);
      expect(response.body.address.zipCode).toBe("12345");
  });

  it("Should not create a customer", async () => {
    const response = await request(app).post("/customer").send({
      name: "Customer 1",
    });
    expect(response.status).toBe(500);
  });

  it("Should list all customers", async () => {

    const listResponse1 = await request(app)
      .get("/customer");

    expect(listResponse1.status).toBe(200);
    expect(listResponse1.body).toEqual({
      customers: []
    });

    const resCustomerCreated1 = await request(app)
      .post("/customer")
      .send({
        name: "Customer 1",
        address: {
          street: "Street 1",
          city: "City",
          number: 123,
          zipCode: "12345",
        },
      });

    const customer1 = {
      id: resCustomerCreated1.body.id,
      name: resCustomerCreated1.body.name,
      address: {
        street: resCustomerCreated1.body.address.street,
        city: resCustomerCreated1.body.address.city,
        number: resCustomerCreated1.body.address.number,
        zipCode: resCustomerCreated1.body.address.zipCode,
      }
    }
    const listResponse2 = await request(app)
    .get("/customer");
    expect(listResponse2.body.customers.length).toBe(1);
    expect(listResponse2.body.customers[0]).toEqual(customer1);

    const resCustomerCreated2 = await request(app)
      .post("/customer")
      .send({
        name: "Customer 2",
        address: {
          street: "Street 2",
          city: "City 2",
          number: 1234,
          zipCode: "123456",
        },
      });

      const customer2 = {
        id: resCustomerCreated2.body.id,
        name: resCustomerCreated2.body.name,
        address: {
          street: resCustomerCreated2.body.address.street,
          city: resCustomerCreated2.body.address.city,
          number: resCustomerCreated2.body.address.number,
          zipCode: resCustomerCreated2.body.address.zipCode,
        }
      }

      const listResponse3 = await request(app)
      .get("/customer");
      expect(listResponse3.body.customers.length).toBe(2);
      expect(listResponse3.body.customers[0]).toEqual(customer1);
      expect(listResponse3.body.customers[1]).toEqual(customer2);

      const listResponseXML = await request(app)
        .get("/customer")
        .set("Accept", "Application/xml")
        .send();

        expect(listResponseXML.status).toBe(200);
        expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
        expect(listResponseXML.text).toContain(`<customers>`);
        expect(listResponseXML.text).toContain(`<customer>`);
        expect(listResponseXML.text).toContain(`<name>Customer 1</name>`);
        expect(listResponseXML.text).toContain(`<address>`);
        expect(listResponseXML.text).toContain(`<street>Street 1</street>`);
        expect(listResponseXML.text).toContain(`<city>City 2</city>`);
        expect(listResponseXML.text).toContain(`<number>123</number>`);
        expect(listResponseXML.text).toContain(`<zipCode>12345</zipCode>`);
        expect(listResponseXML.text).toContain(`</address>`);
        expect(listResponseXML.text).toContain(`</customer>`);
        expect(listResponseXML.text).toContain(`<name>Customer 2</name>`);
        expect(listResponseXML.text).toContain(`<street>Street 2</street>`);
        expect(listResponseXML.text).toContain(`</customers>`);
  });
});