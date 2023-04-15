import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import Product from "../../../domain/product/entity/product";

describe("Integration test find a product use case", () => {

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

  it("Should throw error not found when find a product", async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new FindProductUseCase(productRepository);
    const input = {
      id: "product1",
      name: "Product 1",
      price: 300
    }
    await expect(productUseCase.execute(input)).rejects.toThrow("Product not found");

  });

  it("Should find a product", async () => {
    const input = {
      id: "product1",
      name: "Product 1",
      price: 300
    }
    const product = new Product(input.id, input.name, input.price);
    const productRepository = new ProductRepository();
    const productUseCase = new FindProductUseCase(productRepository);

    productRepository.create(product);

    const output = await productUseCase.execute(input);

    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);
  });

});