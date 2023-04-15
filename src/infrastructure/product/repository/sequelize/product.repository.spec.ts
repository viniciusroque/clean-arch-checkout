import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true}
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should create a product", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Product 1", 100);
    await productRepository.create(product1);

    const productModel = await ProductModel.findOne({where: { id: "product1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "product1",
      name: "Product 1",
      price: 100
    })
  });

  it("Should update a product", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Product 1", 100);
    await productRepository.create(product1);

    product1.changeName("Products 1 v2");
    product1.changePrice(200);

    await productRepository.update(product1);

    const productModel = await ProductModel.findOne({where: { id: "product1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "product1",
      name: "Products 1 v2",
      price: 200
    })
  });

  it("Should find a product", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Product 1", 100);
    await productRepository.create(product1);

    const foundProduct = await productRepository.find("product1");

    const productModel = await ProductModel.findOne({where: { id: "product1" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price
    });
  });

  it("Should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product("product1", "Product 1", 100);
    await productRepository.create(product1);

    const product2 = new Product("product2", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();

    const products = [product1, product2]

    expect(products).toEqual(foundProducts);
  });

});