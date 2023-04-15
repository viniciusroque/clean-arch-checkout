import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

describe("Unit test to list customers", () => {
  const customer1 = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address("Street 1", 123, "04107-020", "City 1")
  );

  const customer2 = CustomerFactory.createWithAddress(
    "Customer 2",
    new Address("Street 2", 1234, "04107-021", "City 2")
  );

  const mockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
      create: jest.fn(),
      update: jest.fn()
    }
  }

  it("Should list all customer", async () => {
    const customerRepository = mockRepository();
    const listCustomerUseCase = new ListCustomerUseCase(customerRepository);
    const output = await listCustomerUseCase.execute({});
    expect(output.customers.length).toBe(2);
    expect(output.customers[0]).toEqual({
      id: expect.any(String),
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 123,
        zipCode: "04107-020",
        city: "City 1"
      }
    });

    expect(output.customers[1]).toEqual({
      id: expect.any(String),
      name: "Customer 2",
      address: {
        street: "Street 2",
        number: 1234,
        zipCode: "04107-021",
        city: "City 2"
      }
    });
  });
});