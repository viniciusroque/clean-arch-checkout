import CreateCustomerUseCase from "./create.customer.usecase";

describe("Unit test for customer create use case", () => {

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    }
  }
  it("Should create a customer", async () => {
    const input = {
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: 123,
        zipCode: "04107-060",
        city: "City 1"
      }
    }

    const customerRepository = MockRepository();
    const useCase = new CreateCustomerUseCase(customerRepository);

    const output = await useCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        zipCode: input.address.zipCode,
        city: input.address.city,
      },
    });
  });

  it("Should throw an error when name is empty", async () => {
    const input = {
      name: "",
      address: {
        street: "Street 1",
        number: 123,
        zipCode: "04107-060",
        city: "City 1"
      }
    }

    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Name is required");

  });

  it("Should throw an error when street is empty", async () => {
    const input = {
      name: "Customer 1",
      address: {
        street: "",
        number: 123,
        zipCode: "04107-060",
        city: "City 1"
      }
    }

    const customerRepository = MockRepository();
    const createCustomerUseCase = new CreateCustomerUseCase(customerRepository);

    await expect(createCustomerUseCase.execute(input)).rejects.toThrow("Street is required");

  });
});