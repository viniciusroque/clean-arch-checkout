
import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressCustomerChangedEvent from "../customer-address-changed.events";

export default class SendConsoleLog1Handler
  implements EventHandlerInterface<AddressCustomerChangedEvent> {

    handler(event: AddressCustomerChangedEvent): void {
      const eventData = event.eventData
      console.log(
      `Endereço do cliente: ${eventData.id}, \
${eventData.name} alterado para: \
${eventData.address.street}, ${eventData.address.number} - \
${eventData.address.city} - ${eventData.address.zipCode}`
      );

    }
}