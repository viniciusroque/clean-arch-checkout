import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

describe("Unit test update product use case", () => {
  const product = new Product("product1", "Product 1", 100);
  const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  };

  it("Should update a product", async () => {
    const productRepository = MockRepository();
    const productUseCase = new UpdateProductUseCase(productRepository);
    const input = {
      id: "product1",
      name: "Product updated",
      price: 200
    }
    const result = await productUseCase.execute(input);
    expect(productRepository.update).toBeCalled();
    expect(result.id).toBe(input.id);
    expect(result.name).toBe(input.name);
    expect(result.price).toBe(input.price);
  });
});