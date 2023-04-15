export default interface ProductInterface {
  get id(): string;
  get name(): string;
  get price(): number;

  changeName(input: string): void;
  changePrice(input: number): void;
}