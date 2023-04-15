import EventDispatcher from "../../../@shared/event/event-dispatcher";
import CustomerAddressChangedEvent from "../customer-address-changed.events";
import CustomerCreatedEvent from "../customer-created.events";
import SendConsoleLog1Handler from "./sendConsoleLog1.handler";
import SendConsoleLog2Handler from "./sendConsoleLog2.handler";
import SendConsoleLogHandler from "./sendConsoleLog.handler";

describe("Customer handlers test", () => {


  it("Should register 2 handlers for event when customer has created", () => {
    const eventDispatcher = new EventDispatcher();
    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1"
    });
    const sendConsoleLog1Handler = new SendConsoleLog1Handler();
    const sendConsoleLog2Handler = new SendConsoleLog2Handler();

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

  });

  it("Should notify when customer has created", () => {
    const eventDispatcher = new EventDispatcher();
    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Customer 1"
    });
    const sendConsoleLog1Handler = new SendConsoleLog1Handler();
    const sendConsoleLog2Handler = new SendConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(sendConsoleLog1Handler, "handler");
    const spyEventHandler2 = jest.spyOn(sendConsoleLog2Handler, "handler");

    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog1Handler);
    eventDispatcher.register("CustomerCreatedEvent", sendConsoleLog2Handler);

    expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

    eventDispatcher.notify(customerCreatedEvent);
    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();

  });

  it("Should notify when address customer has changed", () => {
    const eventDispatcher = new EventDispatcher();
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: "customer1",
      name: "Customer 1",
      address: {
        street: "Street 1",
        number: "10",
        zipCode: "04107-020",
        city: "São Paulo"

      }
    });
    const sendConsoleLogHandler = new SendConsoleLogHandler();

    const spyEventHandler1 = jest.spyOn(sendConsoleLogHandler, "handler");

    eventDispatcher.register("CustomerAddressChangedEvent", sendConsoleLogHandler);

    expect(eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"].length).toBe(1);

    eventDispatcher.notify(customerAddressChangedEvent);
    expect(spyEventHandler1).toHaveBeenCalled();

  });

});