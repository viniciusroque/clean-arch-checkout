export default class Address{

  private _street: string = "";
  private _number: number = 0;
  private _zipCode: string = "";
  private _city: string = "";

  constructor(street: string, number: number, zipCode: string, city: string){
    this._street = street;
    this._number = number;
    this._zipCode = zipCode;
    this._city = city;

    this.validate();
  }

  validate(): void{
    if (this._street.length == 0) {
      throw new Error("Street is required");
    }

    if (this._number == undefined) {
      throw new Error("Number is required");
    }

    if (this._zipCode.length == 0) {
      throw new Error("ZipCode is required");
    }

    if (this._city.length == 0) {
      throw new Error("City is required");
    }
  }

  get street(): string{
    return this._street;
  }

  get number(): number{
    return this._number;
  }

  get city(): string{
    return this._city;
  }

  get zipCode(): string{
    return this._zipCode;
  }
}