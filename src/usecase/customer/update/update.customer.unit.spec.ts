import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

describe("Unit test for customer update use case", () => {
  const customer = CustomerFactory.createWithAddress(
    "Customer 1",
    new Address(
      "Street 1",
      123,
      "04107-020",
      "City 1"
    )
  );

  const input = {
    id: customer.id,
    name: "Customer Updated",
    address: {
      street: "Street Updated",
      number: 1234,
      zipCode: "Zip Updated",
      city: "City Updated"
    }
  }
  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(customer)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }
  it("Should update a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.create(customer);
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);
    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });

});