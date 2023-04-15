import { Sequelize } from "sequelize-typescript";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindAllProductUseCase from "./list.product.usecase";
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


  it("Should find all products", async () => {
    const input1 = {
      id: "product1",
      name: "Product 1",
      price: 100
    }

    const input2 = {
      id: "product2",
      name: "Product 2",
      price: 200
    }
    const product1 = new Product(
      input1.id,
      input1.name,
      input1.price
    );

    const product2 = new Product(
      input2.id,
      input2.name,
      input2.price
    );

    const productRepository = new ProductRepository();
    const productUseCase = new FindAllProductUseCase(productRepository);

    productRepository.create(product1);
    productRepository.create(product2);

    const output = await productUseCase.execute({});

    expect(output).toEqual({products: [input1, input2]});
    expect(output.products[0].id).toBe(product1.id);
    expect(output.products[0].name).toBe(product1.name);
    expect(output.products[0].price).toBe(product1.price);
  });

});