// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
const should = chai.should();

import * as Errors from "../src/errors";

class AMQPError {
  name = "AmqpProtocolError";
  condition: string;
  description: string;
  constructor(conditionStr: string, description: string) {
    this.name = "AmqpProtocolError";
    this.condition = conditionStr;
    this.description = description;
  }
}

describe("Errors", function() {
  describe("translate", function() {
    it("Converts to MessagingError, and acts as a passthrough if the input is not an AmqpProtocolError", function() {
      const MyError: any = function() {};
      const err: any = new MyError();
      const msg: any = undefined;
      const ehError = new Errors.MessagingError(msg);
      const translatedError = <Errors.MessagingError>Errors.translate(err);
      translatedError.name.should.equal(ehError.name);
      translatedError.retryable.should.equal(ehError.retryable);
      translatedError.message.should.equal(ehError.message);
    });

    it("Sets retryable to false, and acts as a passthrough if the input is TypeError", function() {
      const err = new TypeError("This is a wrong type!!");
      const translatedError = Errors.translate(err);
      should.equal(translatedError instanceof TypeError, true);
      translatedError.message.should.equal(err.message);
      translatedError.stack!.should.equal(err.stack);
      translatedError.retryable.should.equal(false);
    });

    it("Sets retryable to false, and acts as a passthrough if the input is RangeError", function() {
      const err = new RangeError("Out of range!!");
      const translatedError = Errors.translate(err);
      should.equal(translatedError instanceof RangeError, true);
      translatedError.message.should.equal(err.message);
      translatedError.stack!.should.equal(err.stack);
      translatedError.retryable.should.equal(false);
    });

    [
      {
        from: "amqp:not-found",
        to: "ServiceCommunicationError",
        message: "some message"
      },
      {
        from: "com.microsoft:server-busy",
        to: "ServerBusyError",
        message: "some message"
      },
      {
        from: "com.microsoft:argument-out-of-range",
        to: "ArgumentOutOfRangeError",
        message: "some message"
      },
      { from: "<unknown>", to: "MessagingError" }
    ].forEach(function(mapping) {
      it("translates " + mapping.from + " into " + mapping.to, function() {
        const err: any = new AMQPError(
          mapping.from as any,
          mapping.message as any
        );
        const translatedError = <Errors.MessagingError>Errors.translate(err);
        translatedError.name.should.equal(mapping.to);
        if (
          translatedError.name === "ServerBusyError" ||
          translatedError.name === "MessagingError"
        ) {
          translatedError.retryable.should.equal(true);
        } else {
          translatedError.retryable.should.equal(false);
        }
      });
    });

    [
      {
        code: "ECONNRESET",
        errno: "ECONNRESET",
        syscall: "read",
        message: "code: ECONNRESET, errno: ECONNRESET, syscall: read"
      },
      {
        code: "ECONNREFUSED",
        errno: "ECONNREFUSED",
        syscall: "read",
        message: "code: ECONNREFUSED, errno: ECONNREFUSED, syscall: read"
      },
      {
        code: "EBUSY",
        errno: "EBUSY",
        syscall: "read",
        message: "code: EBUSY, errno: EBUSY, syscall: read"
      },
      {
        code: "ENOTFOUND",
        errno: "ENOTFOUND",
        syscall: "read",
        message: "code: ENOTFOUND, errno: ENOTFOUND, syscall: read"
      },
      {
        code: "ESOMETHINGRANDOM",
        errno: "ESOMETHINGRANDOM",
        syscall: "read",
        message:
          "code: ESOMETHINGRANDOM, errno: ESOMETHINGRANDOM, syscall: read"
      }
    ].forEach(function(mapping) {
      it(
        "SystemError from node.js  with code: '" +
          mapping.code +
          "' to a MessagingError",
        function() {
          const translatedError = <Errors.MessagingError>(
            Errors.translate(mapping as any)
          );
          if (mapping.code === "ECONNRESET") {
            translatedError.name.should.equal("ServiceUnavailableError");
            translatedError.retryable.should.equal(true);
          } else if (mapping.code === "ECONNREFUSED") {
            translatedError.name.should.equal("ConnectionForcedError");
            translatedError.retryable.should.equal(true);
          } else if (mapping.code === "EBUSY") {
            translatedError.name.should.equal("ServerBusyError");
            translatedError.retryable.should.equal(true);
          } else if (mapping.code === "ENOTFOUND") {
            translatedError.name.should.equal("ServiceCommunicationError");
            translatedError.retryable.should.equal(false);
          } else if (mapping.code === "ESOMETHINGRANDOM") {
            translatedError.name.should.equal("SystemError");
            translatedError.retryable.should.equal(false);
          }
        }
      );
    });
  });
});
