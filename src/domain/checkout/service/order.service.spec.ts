
import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit test", () => {

  it("Should get total of all orders", () => {
    const item1 = new OrderItem("item1", "Item 1", 100, 'product1', 1);
    const item2 = new OrderItem("item2", "Item 2", 200, 'product1', 2);

    const order1 = new Order('order1', 'client1', [item1]);
    const order2 = new Order('order2', 'client1', [item2]);

    const total = OrderService.total([order1, order2]);
    expect(total).toBe(500);

  });

  it("Should place order and add customer rewards points", () => {
    const customer1 = new Customer("customer1", "Customer 1");
    const item1 = new OrderItem("item1", "Item 1", 10, "product1", 1);

    const order1 = OrderService.placeOrder(customer1, [item1]);

    expect(customer1.rewardPoints).toBe(5);
    expect(order1.total()).toBe(10);
  });
});