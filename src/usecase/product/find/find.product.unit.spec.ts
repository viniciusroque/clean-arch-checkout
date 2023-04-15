import Product from "../../../domain/product/entity/product";
import FindProductUseCase from "./find.product.usecase";

describe("Unit test find product", () => {

  const product = new Product("product1", "Product 1", 100);
  const MockRepository = () => {
    return {
      create: jest.fn(),
      update: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
    }
  }

  it("Should find a product", async () => {
    const productRepository = MockRepository();
    const findUseCase = new FindProductUseCase(productRepository);
    const result = await findUseCase.execute({id: "product1"});

    expect(productRepository.find).toBeCalled();
    expect(result.id).toBe(product.id);
    expect(result.name).toBe(product.name);
    expect(result.price).toBe(product.price);

  });

  it("Should thrown error not found when find a product", async () => {
    const productRepository = MockRepository();
    productRepository.find.mockImplementation(() => {
      throw new Error("Product not found");
    });
    const useCase = new FindProductUseCase(productRepository);
    const input = {
      id: "123"
    }

    expect(() => {
      return useCase.execute(input);
    }).rejects.toThrow("Product not found");
  })

});