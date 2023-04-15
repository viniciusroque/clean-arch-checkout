export interface InputListCustomerDto {}

type Customers = {
  name: string,
  address: {
    street: string,
    number: number,
    zipCode: string,
    city: string
  }
}

export interface OutputListCustomerDto {
  customers: Customers[]
}