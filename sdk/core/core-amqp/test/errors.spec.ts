// Copyright (c) Microsoft. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as chai from "chai";
const should = chai.should();

import * as Errors from "../src/errors";
import { AbortError } from "@azure/abort-controller";

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
    it("Does not touch errors that are neither AmqpError or SystemError", function() {
      const testError = new Error("Test error");
      const translatedError = Errors.translate(testError);
      translatedError.name.should.equal(testError.name);
      translatedError.message.should.equal(testError.message);
    });

    it("Does not touch TypeError", function() {
      const testError = new TypeError("This is a wrong type!!");
      const translatedError = Errors.translate(testError);
      translatedError.name.should.equal(testError.name);
      translatedError.message.should.equal(testError.message);
    });

    it("Does not touch RangeError", function() {
      const testError = new RangeError("Out of range!!");
      const translatedError = Errors.translate(testError);
      translatedError.name.should.equal(testError.name);
      translatedError.message.should.equal(testError.message);
    });

    it("Sets retryable to true, if input is custom error and name is OperationTimeoutError", function() {
      const err = new Error("error message");
      err.name = "OperationTimeoutError";
      const translatedError = Errors.translate(err) as Errors.MessagingError;
      should.equal(translatedError.name === "OperationTimeoutError", true);
      translatedError.message.should.equal(err.message);
      translatedError.stack!.should.equal(err.stack);
      translatedError.retryable.should.equal(true);
    });

    it("Sets retryable to true, if input is custom error and name is InsufficientCreditError", function() {
      const err = new Error("error message");
      err.name = "InsufficientCreditError";
      const translatedError = Errors.translate(err) as Errors.MessagingError;
      should.equal(translatedError.name === "InsufficientCreditError", true);
      translatedError.message.should.equal(err.message);
      translatedError.stack!.should.equal(err.stack);
      translatedError.retryable.should.equal(true);
    });

    it("Does not set retryable, if input is the custom AbortError", function() {
      const err = new AbortError("error message");
      const translatedError = Errors.translate(err);
      should.equal(translatedError.name === "AbortError", true);
      translatedError.message.should.equal(err.message);
      translatedError.stack!.should.equal(err.stack);
      should.equal((translatedError as Errors.MessagingError).retryable, undefined);
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
      { from: "<unknown>", to: "MessagingError", message: "some message" }
    ].forEach(function(mapping) {
      it("translates " + mapping.from + " into " + mapping.to, function() {
        const err: any = new AMQPError(mapping.from, mapping.message);
        const translatedError = <Errors.MessagingError>Errors.translate(err);
        // <unknown> won't have a code since it has no matching condition
        if (translatedError.code) {
          translatedError.code.should.equal(mapping.to);
        }
        translatedError.name.should.equal("MessagingError");
        if (
          translatedError.code === "ServerBusyError" ||
          translatedError.code === "MessagingError" ||
          translatedError.code == undefined
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
        message: "code: ESOMETHINGRANDOM, errno: ESOMETHINGRANDOM, syscall: read"
      }
    ].forEach(function(mapping) {
      it(
        "SystemError from node.js  with code: '" + mapping.code + "' to a MessagingError",
        function() {
          const translatedError = <Errors.MessagingError>Errors.translate(mapping as any);
          if (mapping.code === "ECONNRESET") {
            translatedError.name.should.equal("MessagingError");
            translatedError.code!.should.equal("ECONNRESET");
            translatedError.retryable.should.equal(true);
          } else if (mapping.code === "ECONNREFUSED") {
            translatedError.name.should.equal("MessagingError");
            translatedError.code!.should.equal("ECONNREFUSED");
            translatedError.retryable.should.equal(true);
          } else if (mapping.code === "EBUSY") {
            translatedError.name.should.equal("MessagingError");
            translatedError.code!.should.equal("EBUSY");
            translatedError.retryable.should.equal(true);
          } else if (mapping.code === "ENOTFOUND") {
            translatedError.name.should.equal("MessagingError");
            translatedError.code!.should.equal("ENOTFOUND");
            translatedError.retryable.should.equal(false);
          } else if (mapping.code === "ESOMETHINGRANDOM") {
            translatedError.name.should.equal("MessagingError");
            translatedError.code!.should.equal("ESOMETHINGRANDOM");
            translatedError.retryable.should.equal(false);
          }
        }
      );
    });
  });
});
