import Product from "../../../domain/product/entity/product";
import ListProductUseCase from "./list.product.usecase";

describe("Unit test product use case", () =>{

  const product1 = new Product("product1", "Product 1", 100);
  const product2 = new Product("product2", "Product 2", 200);

  const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
      create: jest.fn(),
      update: jest.fn(),
    }
  };
  it("Should list all products", async ()=> {
    const productRepository = MockRepository();
    const productUseCase = new ListProductUseCase(productRepository);
    const result = await productUseCase.execute({});

    expect(productRepository.findAll).toBeCalled();
    expect(result.products).toHaveLength(2);
    expect(result.products[0].id).toBe(product1.id);
    expect(result.products[0].name).toBe(product1.name);
    expect(result.products[0].price).toBe(product1.price);
    expect(result.products[1].id).toBe(product2.id);
    expect(result.products[1].name).toBe(product2.name);
    expect(result.products[1].price).toBe(product2.price);
  });
});