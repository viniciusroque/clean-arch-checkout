import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const address = new Address("Street 1", 12, "04011-060", "City 1");
const customer = CustomerFactory.createWithAddress("Client 1", address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

 describe("Unit test find customer", () => {

  it("Should find a customer", async () => {
    const customerRepository = MockRepository();
    const findCustomerUseCase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: customer.id
    }

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

  it("Should thrown error not found when find a customer", async () => {
    const customerRepository = MockRepository();
    customerRepository.find.mockImplementation(() => {
      throw new Error("Customer not found");
    });
    const useCase = new FindCustomerUseCase(customerRepository);
    const input = {
      id: "123"
    }

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Customer not found");
  })

});