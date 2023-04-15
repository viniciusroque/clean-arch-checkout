import { Sequelize } from "sequelize-typescript";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("customer1", "Customer 1");
    const address = new Address("Street 1", 123, "04107-020", "City 1");
    customer1.Address = address;
    await customerRepository.create(customer1);

    const customerModel = await CustomerModel.findOne({where: { id: "customer1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "customer1",
      name: "Customer 1",
      active: false,
      rewardPoints: 0,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zipCode
    });
  });

  it("Should update a client", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("customer1", "Customer 1");
    let address = new Address('Street 1', 123, "04107-030", "City 1");
    customer1.Address = address;
    await customerRepository.create(customer1);

    address = new Address('Street 2', 123, "04107-030", "City 2");
    customer1.changeName("Customer 1 v2");
    customer1.changeAddress(address);
    customer1.activate();
    await customerRepository.update(customer1);

    const customerModel = await CustomerModel.findOne({where: { id: "customer1" } });

    expect(customerModel.toJSON()).toStrictEqual({
      id: "customer1",
      name: customer1.name,
      active: true,
      rewardPoints: 0,
      street: address.street,
      number: address.number,
      city: address.city,
      zipcode: address.zipCode
    });

  });

  it("Should find a client", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer("customer1", "Customer 1");
    let address = new Address('Street 1', 123, "04107-030", "City 1");
    customer1.Address = address;
    await customerRepository.create(customer1);

    const foundCustomer = await customerRepository.find("customer1");

    expect(foundCustomer).toStrictEqual(customer1);

  });

  it("Should thrown error when customer not found", () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("customer123");
    }).rejects.toThrow("Customer not found");
  });

  it("Should find all customers", async () => {
    const customerRepository = new CustomerRepository();

    const customer1 = new Customer("customer1", "Customer 1");
    const address = new Address("Street 1", 123, "04107-020", "City 1");
    customer1.Address = address;
    customer1.activate();
    customer1.addRewardPoints(10);
    await customerRepository.create(customer1);

    const customer2 = new Customer("customer2", "Customer 2");
    customer2.Address = address;
    await customerRepository.create(customer2);

    const customers = [customer1, customer2];

    const foundsCustomer = await customerRepository.findAll();

    expect(foundsCustomer).toHaveLength(2);
    expect(foundsCustomer).toContainEqual(customer1);
    expect(foundsCustomer).toContainEqual(customer2);
    expect(foundsCustomer).toEqual(customers);
  });

});