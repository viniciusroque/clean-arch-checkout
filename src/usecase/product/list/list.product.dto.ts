export interface InputFindAllProductDto {}


type product =  {
  id: string,
  name: string,
  price: number
}
export interface OutputFindAllProductDto {
  products: product[]
}