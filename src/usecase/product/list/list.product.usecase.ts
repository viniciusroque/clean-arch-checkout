import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindAllProductDto, OutputFindAllProductDto } from "./list.product.dto";

export default class ListProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(input: InputFindAllProductDto): Promise<OutputFindAllProductDto>{
    const products = await this.productRepository.findAll();
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}