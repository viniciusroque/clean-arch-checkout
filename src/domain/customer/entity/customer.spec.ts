import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

  it("should throw error when ID is empty", () => {
    expect(() => {
      const customer = new Customer('', 'Name 1');
    }).toThrowError('ID is required');

  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const customer = new Customer('1', '');
    }).toThrowError('Name is required');

  });

  it("should change name", () => {
    const customer = new Customer("1", "Name 1");

    customer.changeName("Name 2");

    expect(customer.name).toBe("Name 2");
  });

  it("should throw error when name is empty on change name", () => {
    const customer = new Customer("1", "Name 1");

    expect(() => {
      customer.changeName("");
    }).toThrowError("Name is required");
  });

  it("should active customer", () => {
    const customer =  new Customer("1", "Name 1");
    const address = new Address("Street 1", 1, "4010-060", "São Paulo");
    customer.changeAddress(address);
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should throw error when address is empty", () => {
    expect(() => {
      const customer =  new Customer("1", "Name 1");
      customer.activate();
    }).toThrowError("Address is mandatory to activate a customer");

  });

  it("should deactivate customer", () => {
    const customer =  new Customer("1", "Name 1");
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should add reward points", () => {
    const customer = new Customer("1", "Name 1");
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(10);
    expect(customer.rewardPoints).toBe(10);

    customer.addRewardPoints(20);
    expect(customer.rewardPoints).toBe(30);

  });

});