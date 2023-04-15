import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";
import { toXML } from "jstoxml";

export default class CustomerPresent {
  static listXML(data: OutputListCustomerDto): string {
    const xmlOption = {
      header: true,
      indent: " ",
      newLine: "\n",
      allowEmpty: true
    };

    const res = {
      customers: data.customers.map((customer) => ({
          customer: {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              zipCode: customer.address.zipCode,
              city: customer.address.city,
            },
          }
        })
      )
    }
    return toXML(
      res,
      xmlOption
    );

  }
}