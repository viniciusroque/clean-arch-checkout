import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";

describe("Integration test create a product use case", () => {

  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: {force: true}
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("Should throw error not found when update a product", async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new UpdateProductUseCase(productRepository);
    const input = {
      id: "product1",
      name: "Product 1",
      price: 300
    }
    await expect(productUseCase.execute(input)).rejects.toThrow("Product not found");

  });

  it("Should update a product", async () => {
    const product = new Product("product1", "Product 1", 100);
    const productRepository = new ProductRepository();
    const productUseCase = new UpdateProductUseCase(productRepository);

    productRepository.create(product);

    const input = {
      id: "product1",
      name: "Product 1 updated",
      price: 300
    }

    await productUseCase.execute(input);
    const productDb = await productRepository.find(input.id);

    expect(productDb.id).toBe(input.id);
    expect(productDb.name).toBe(input.name);
    expect(productDb.price).toBe(input.price);


  });

});