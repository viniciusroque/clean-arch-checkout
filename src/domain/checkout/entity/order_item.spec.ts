import OrderItem from "./order_item";

describe("OrderItem unit test", () => {

  it("should throw error when ID is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("", "Item 1", 10, "product1", 2);
    }).toThrowError("ID is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "", 10, "product1", 2);
    }).toThrowError("Name is required");
  });

  it("should throw error when price less then 0", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "Product name", -10, "product1", 2);
    }).toThrowError("Price must be greater than or equal to 0");
  });

  it("should throw error when productId is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "Product name", 10, "", 2);
    }).toThrowError("ProductId is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "", 10, "product1", 2);
    }).toThrowError("Name is required");
  });

  it("should throw error if quantity is less or equal 0", () => {
    expect(() => {
      const orderItem = new OrderItem("1", "Product Name", 10, "product1", 0);
    }).toThrowError("Quantity must be greater than 0");
  });
});