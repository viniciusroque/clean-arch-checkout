import { Sequelize } from "sequelize-typescript";

import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Product from "../../../../domain/product/entity/product";
import Address from "../../../../domain/customer/value-object/address";

import OrderRepository from "./order.repository";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";

import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";


describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([
      CustomerModel, OrderModel, OrderItemModel, ProductModel]
    );
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customer1", "Customer 1");
    const address = new Address("Street 1", 123, "04011-060", "City 1");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("product1", "Products 1", 100);
    await productRepository.create(product);

    const orderItem = new OrderItem("item1", "Item 1", 100, "product1", 1);

    const order = new Order("order1", "customer1", [orderItem]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id
      },
      include: [
        "items"
      ]
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "order1",
      customer_id: "customer1",
      total: order.total(),
      items: [{
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        product_id: orderItem.productId,
        order_id: "order1"
      }]

    });
  });

  it("Should increment items of order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customer1", "Customer 1");
    const address = new Address("Street 1", 123, "04011-060", "City 1");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Products 1", 100);
    await productRepository.create(product1);
    const product2 = new Product("product2", "Products 2", 100);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem("item1", "Item 1", 100, "product1", 1);
    const orderItem2 = new OrderItem("item2", "Item 2", 200, "product2", 2);
    const orderItem3 = new OrderItem("item3", "Item 1", 100, "product2", 3);

    let order = new Order("order1", "customer1", [orderItem1]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order = new Order("order1", "customer1", [orderItem1, orderItem2, orderItem3]);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "order1" },
      include: [{ model: OrderItemModel }]
    });

    expect(order.total()).toBe(800);
    expect(orderModel.toJSON()).toStrictEqual({
      id: "order1",
      customer_id: "customer1",
      total: order.total(),
      items: [
        {
          id: orderItem1.id,
          order_id: order.id,
          name: orderItem1.name,
          price: orderItem1.price,
          product_id: orderItem1.productId,
          quantity: orderItem1.quantity
        },
        {
          id: orderItem2.id,
          order_id: order.id,
          name: orderItem2.name,
          price: orderItem2.price,
          product_id: orderItem2.productId,
          quantity: orderItem2.quantity
        },
        {
          id: orderItem3.id,
          order_id: order.id,
          name: orderItem3.name,
          price: orderItem3.price,
          product_id: orderItem3.productId,
          quantity: orderItem3.quantity
        },
      ]
    });

  });

  it("Should decrement items of order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customer1", "Customer 1");
    const address = new Address("Street 1", 123, "04011-060", "City 1");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Products 1", 100);
    await productRepository.create(product1);
    const product2 = new Product("product2", "Products 2", 100);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem("item1", "Item 1", 100, "product1", 1);
    const orderItem2 = new OrderItem("item2", "Item 2", 200, "product2", 2);
    const orderItem3 = new OrderItem("item3", "Item 1", 100, "product2", 3);

    let order = new Order("order1", "customer1", [orderItem1, orderItem2, orderItem3]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    order = new Order("order1", "customer1", [orderItem2]);
    await orderRepository.update(order);

    const orderModel = await OrderModel.findOne({
      where: { id: "order1" },
      include: [{ model: OrderItemModel }]
    });

    expect(order.total()).toBe(400);
    expect(orderModel.toJSON()).toStrictEqual({
      id: "order1",
      customer_id: "customer1",
      total: order.total(),
      items: [
        {
          id: orderItem2.id,
          order_id: order.id,
          name: orderItem2.name,
          price: orderItem2.price,
          product_id: orderItem2.productId,
          quantity: orderItem2.quantity
        },
      ]
    });

  });

  it("Should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customer1", "Customer 1");
    const address = new Address("Street 1", 123, "04011-060", "City 1");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Products 1", 100);
    await productRepository.create(product1);

    const product2 = new Product("product2", "Products 2", 100);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem("item1", "Item 1", 100, "product1", 1);
    const orderItem2 = new OrderItem("item2", "Item 2", 200, "product2", 2);

    let order = new Order("order1", "customer1", [orderItem1, orderItem2]);
    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFound = await orderRepository.find("order1");

    expect(orderFound).toStrictEqual(order);
  });

  it("Should find all order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("customer1", "Customer 1");
    const address = new Address("Street 1", 123, "04011-060", "City 1");
    customer.changeAddress(address);
    customer.activate();
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Products 1", 100);
    await productRepository.create(product1);

    const product2 = new Product("product2", "Products 2", 100);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem("item1", "Item 1", 100, "product1", 1);
    const orderItem2 = new OrderItem("item2", "Item 2", 200, "product2", 2);
    const orderItem3 = new OrderItem("item3", "Item 3", 200, "product2", 3);
    const orderItem4 = new OrderItem("item4", "Item 4", 200, "product1", 2);

    const orderRepository = new OrderRepository();
    const order1 = new Order("order1", "customer1", [orderItem1, orderItem2]);
    await orderRepository.create(order1);

    const order2 = new Order("order2", "customer1", [orderItem3, orderItem4]);
    await orderRepository.create(order2);

    const orderFounds = await orderRepository.findAll();

    expect(orderFounds).toStrictEqual([order1, order2]);
  });

});