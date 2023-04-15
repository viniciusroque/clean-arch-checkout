import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {

  it("Should create a customer", () => {
    const name = "Customer 1";
    const customer = CustomerFactory.create(name);
    expect(customer.id).toBeDefined();
    expect(customer.Address).toBeUndefined();
    expect(customer.name).toBe("Customer 1");
  });

  it("Should create a customer with address", () => {
    const address = new Address(
        "Street 1",
        100,
        "04107-020",
        "City 1",
    );
    const customer = CustomerFactory.createWithAddress("Customer 1", address);
    expect(customer.id).toBeDefined();
    expect(customer.Address).toBeDefined();
    expect(customer.name).toBe("Customer 1");
    expect(customer.Address.zipCode).toBe("04107-020")
  });
});