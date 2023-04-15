import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";

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

  it("Should create a product", async () => {
    const productRepository = new ProductRepository();
    const productUseCase = new CreateProductUseCase(productRepository);
    const input = {
      id: "product1",
      name: "Product 1",
      price: 300
    }
    const result = await productUseCase.execute(input);
    const productDb = await ProductModel.findOne({
      where: { id: input.id }
    });

    expect(productDb.id).toBe(input.id);
    expect(productDb.name).toBe(input.name);
    expect(productDb.price).toBe(input.price);
  });

});