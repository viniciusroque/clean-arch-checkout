import Product from "./product";

describe("Product unit test", () =>{

  it("should throw error when Id is empty", () => {
    expect(() => {
      const product = new Product("", "Product 1", 23);
    }).toThrowError("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      const product = new Product("product1", "", 23);
    }).toThrowError("Name is required");
  });

  it("should throw error when price less than 0", () => {
    expect(() => {
      const product = new Product("product1", "Product 1", -23);
    }).toThrowError("Price must be greater than 0");
  });

  it("should change name", () => {
    const product = new Product("product1", "Product 1", 23);
    product.changeName("Product 1 v2");

    expect(product.name).toBe("Product 1 v2");
  });

  it("should change price", () => {
    const product = new Product("product1", "Product 1", 23);
    product.changePrice(30);

    expect(product.price).toBe(30);
  });

});