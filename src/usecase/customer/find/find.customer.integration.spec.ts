import { Sequelize } from "sequelize-typescript";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import FindCustomerUseCase from "./find.customer.usecase";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";

describe("Integration test find customer", () => {
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

  it("Should thrown error not found when find a customer", async () => {
    const address = new Address("Street 1", 12, "04011-060", "City 1");
    const customer = CustomerFactory.createWithAddress("Client 1", address);

    const customerRepository = new CustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: customer.id
    }

    expect(() => {
      return findCustomerUseCase.execute(input);
    }).rejects.toThrow("Customer not found");

  })

  it("Should find a customer", async () => {
    const address = new Address("Street 1", 12, "04011-060", "City 1");
    const customer = CustomerFactory.createWithAddress("Client 1", address);
    const customerRepository = new CustomerRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);

    const input = {
      id: customer.id
    }

    await customerRepository.create(customer);

    const output = await findCustomerUseCase.execute(input);
    expect(output).toEqual({
      id: input.id,
      name: "Client 1",
      address: {
        street: "Street 1",
        number: 12,
        zipCode: "04011-060",
        city: "City 1"
      }
    })
  })
});