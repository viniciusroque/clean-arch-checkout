import Notification from "./notification";

describe("Unit test for notifications", () => {

  it("Should create errors", () => {
    const notification = new Notification();

    const error1 = {
      context: "customer",
      message: "error message1"
    }

    const error2 = {
      context: "customer",
      message: "error message2"
    }

    const error3 = {
      context: "product",
      message: "error message3"
    }

    notification.addError(error1);
    expect(notification.messages("customer")).toBe("customer: error message1,");

    notification.addError(error2);
    expect(notification.messages("customer")).toBe("customer: error message1,customer: error message2,");

    notification.addError(error3);
    expect(notification.messages("product")).toBe("product: error message3,");
    expect(notification.messages()).toBe("customer: error message1,customer: error message2,product: error message3,");

  });

  it("Should check if notification has at least on error", () => {
    const notification = new Notification();

    expect(notification.hasErrors()).toBe(false);

    const error = {
      context: "customer",
      message: "error message1"
    }

    notification.addError(error);
    expect(notification.hasErrors()).toBe(true);

  });

  it("Should get all errors props", () => {
    const notification = new Notification();

    expect(notification.getErrors()).toEqual([]);
    const error = {
      context: "customer",
      message: "error message1"
    }
    notification.addError(error);
    expect(notification.getErrors()).toEqual([error]);
  });
});