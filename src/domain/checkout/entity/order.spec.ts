import Order from "./order"
import OrderItem from "./order_item";

describe("Order unit test", () => {

  it("Should throw error when id is empty", () => {
    expect(() => {
      const order = new Order("", "customer1", []);
    }).toThrowError("ID is required");

  })

  it("Should throw error when customerId is empty", () => {
    expect(() => {
      const order = new Order("orderId1", "", []);
    }).toThrowError("CustomerId is required");

  })

  it("Should throw error when Items is empty", () => {
    expect(() => {
      const order = new Order("orderId1", "customer1", []);
    }).toThrowError("Items is required");

  })

  it("should calculate total", () => {
    const item1 = new OrderItem("itemId1", "Product 1", 10, "productId1", 2);
    const order1 = new Order("orderId1", "customer1", [item1]);
    const total1 = order1.total();
    expect(total1).toBe(20);

    const item2 = new OrderItem("itemId2", "Product 2", 20, "productId1", 3);
    const order2 = new Order("orderId2", "customer1", [item1, item2]);
    const total2 = order2.total();
    expect(total2).toBe(80);
  })

})