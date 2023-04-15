import CreateProductUseCase from "./create.product.usecase";

describe("Unit test create a product use case", () => {

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn()
    }
  };

  it("Should create a product", async () => {
    const productRepository = MockRepository();
    const productUseCase = new CreateProductUseCase(productRepository);
    const input = {
      id: "product1",
      name: "Product 1",
      price: 300
    }
    const result = await productUseCase.execute(input);

    expect(productRepository.create).toBeCalled();
    expect(result).toStrictEqual(input);
  });

  it("Should throw an error when name is empty", async () => {
    const productRepository = MockRepository();
    const productUseCase = new CreateProductUseCase(productRepository);
    const input = {
      id: "product1",
      name: "",
      price: 300
    }
    await expect(productUseCase.execute(input)).rejects.toThrow("Name is required");
  });

  it("Should throw an error when price is less than zero", async () => {
    const productRepository = MockRepository();
    const productUseCase = new CreateProductUseCase(productRepository);
    const input = {
      id: "product1",
      name: "Product 1",
      price: -300
    }
    await expect(productUseCase.execute(input)).rejects.toThrow("Price must be greater than 0");
  });

});