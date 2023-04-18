import Entity from "../../@shared/entity/entity.abstract";
import NotificationError from "../../@shared/notification/notification.error";
import CustomerValidatorFactory from "../factory/customer.validator.factory";
import Address from "../value-object/address";

export default class Customer extends Entity{

  private _name: string;
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

  }

  get id (): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get Address(): Address {
    return this._address;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  set Address(address: Address) {
    this._address = address;
  }

  validate(): void {
    CustomerValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()){
      throw new NotificationError(this.notification.getErrors());
    }

  }

  changeName(name: string): void {
    this._name = name;
    this.validate();
  }

  changeAddress(address: Address): void {
    this._address = address;
  }

  activate(): void {
    if(this._address === undefined){
      this.notification.addError({
        context: "customer",
        message: "Address is mandatory to activate a customer"
      });
    }

    this._active = true;
    this.validate();
  }

  deactivate(): void {
    this._active = false;
  }

  isActive(): boolean {
    return this._active;
  }

  addRewardPoints(points: number): void {
    this._rewardPoints += points;
  }

}