// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { MessagingError, ServiceBusError, ServiceBusErrorCode } from "../../src";

const should = chai.should();
chai.use(chaiAsPromised);

describe("ServiceBusError", () => {
  describe("constructor", () => {
    it("accepts message and code", () => {
      const expectedCode: ServiceBusErrorCode = "MessageNotFound";
      const expectedMessage = "Where is the message?";
      const error = new ServiceBusError(expectedMessage, expectedCode);
      should.equal(error.name, "ServiceBusError");
      should.equal(error.code, expectedCode);
      should.equal(error.message, expectedMessage);
    });

    it("accepts MessagingError", () => {
      const expectedMessage = "This service is busy!";
      const messagingError = new MessagingError(expectedMessage);
      messagingError.code = "ServerBusyError";

      const error = new ServiceBusError(messagingError);
      should.equal(error.name, "ServiceBusError");
      should.equal(error.code, "ServiceBusy");
      should.equal(error.message, expectedMessage);
    });

    it("prefixes message with MessagingError code for if it exists and is GeneralError", () => {
      const message = "Just some general error.";
      const messagingErrorCode = "TotallyUnexpectedError";
      const messagingError = new MessagingError(message);
      messagingError.code = messagingErrorCode;

      const error = new ServiceBusError(messagingError);
      should.equal(error.name, "ServiceBusError");
      should.equal(error.code, "GeneralError");
      should.equal(error.message, `${messagingErrorCode}: ${message}`);
    });
  });
});
