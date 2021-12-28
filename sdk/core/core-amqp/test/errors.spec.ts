// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as Errors from "../src/errors";
import * as chai from "chai";
import { AbortError } from "@azure/abort-controller";

const should = chai.should();

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

describe("Errors", function () {
  describe("translate", function () {
    it("Does not touch errors that are neither AmqpError nor SystemError", function () {
      const testError = new Error("Test error");
      const translatedError = Errors.translate(testError);
      translatedError.should.deep.equal(testError);
    });

    it("Wraps non-object inputs in errors", function () {
      const cases = [
        { input: "test", outputErrorMessage: "test" },
        { input: 1234, outputErrorMessage: "1234" },
        { input: null, outputErrorMessage: "Unknown error encountered." },
        { input: undefined, outputErrorMessage: "Unknown error encountered." },
      ];

      for (let i = 0; i < cases.length; i++) {
        const translatedError = Errors.translate(cases[i].input as any);

        should.equal(translatedError.name, "Error");
        should.equal(
          translatedError.message,
          cases[i].outputErrorMessage,
          "Unexpected error message."
        );
      }
    });

    it("Does not touch TypeError", function () {
      const testError = new TypeError("This is a wrong type!!");
      const translatedError = Errors.translate(testError);
      translatedError.should.deep.equal(testError);
    });

    it("Does not touch RangeError", function () {
      const testError = new RangeError("Out of range!!");
      const translatedError = Errors.translate(testError);
      translatedError.should.deep.equal(testError);
    });

    it("Sets retryable to true, if input is custom error and name is OperationTimeoutError", function () {
      const err = new Error("error message");
      err.name = "OperationTimeoutError";
      const translatedError = Errors.translate(err) as Errors.MessagingError;
      should.equal(translatedError.name === "MessagingError", true);
      should.equal(translatedError.code === "OperationTimeoutError", true);
      translatedError.message.should.equal(err.message);
      translatedError.stack!.should.equal(err.stack);
      translatedError.retryable.should.equal(true);
    });

    it("Sets retryable to true, if input is custom error and name is InsufficientCreditError", function () {
      const err = new Error("error message");
      err.name = "InsufficientCreditError";
      const translatedError = Errors.translate(err) as Errors.MessagingError;
      should.equal(translatedError.name === "MessagingError", true);
      should.equal(translatedError.code === "InsufficientCreditError", true);
      translatedError.message.should.equal(err.message);
      translatedError.stack!.should.equal(err.stack);
      translatedError.retryable.should.equal(true);
    });

    it("Does not sets retryable to true, if input is custom error and name is SendOperationFailedError", function () {
      const err = new Error("error message");
      err.name = "SendOperationFailedError";
      const translatedError = Errors.translate(err) as Errors.MessagingError;
      should.equal(translatedError.name === "MessagingError", true);
      should.equal(translatedError.code === "SendOperationFailedError", true);
      translatedError.message.should.equal(err.message);
      translatedError.stack!.should.equal(err.stack);
      translatedError.retryable.should.equal(false);
    });

    it("Does not set retryable, if input is the custom AbortError", function () {
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
        message: "some message",
      },
      {
        from: "com.microsoft:server-busy",
        to: "ServerBusyError",
        message: "some message",
      },
      {
        from: "com.microsoft:argument-out-of-range",
        to: "ArgumentOutOfRangeError",
        message: "some message",
      },
      { from: "<unknown>", to: "MessagingError", message: "some message" },
    ].forEach(function (mapping) {
      it("translates " + mapping.from + " into " + mapping.to, function () {
        const err: any = new AMQPError(mapping.from, mapping.message);
        const translatedError = Errors.translate(err) as Errors.MessagingError;
        // <unknown> won't have a code since it has no matching condition
        if (translatedError.code) {
          translatedError.code.should.equal(mapping.to);
        }
        translatedError.name.should.equal("MessagingError");
        if (
          translatedError.code === "ServerBusyError" ||
          translatedError.code === "MessagingError" ||
          // eslint-disable-next-line eqeqeq
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
        message: "code: ECONNRESET, errno: ECONNRESET, syscall: read",
      },
      {
        code: "ECONNREFUSED",
        errno: "ECONNREFUSED",
        syscall: "read",
        message: "code: ECONNREFUSED, errno: ECONNREFUSED, syscall: read",
      },
      {
        code: "EBUSY",
        errno: "EBUSY",
        syscall: "read",
        message: "code: EBUSY, errno: EBUSY, syscall: read",
      },
      {
        code: "ENOTFOUND",
        errno: "ENOTFOUND",
        syscall: "read",
        message: "code: ENOTFOUND, errno: ENOTFOUND, syscall: read",
      },
      {
        code: "ESOMETHINGRANDOM",
        errno: "ESOMETHINGRANDOM",
        syscall: "read",
        message: "code: ESOMETHINGRANDOM, errno: ESOMETHINGRANDOM, syscall: read",
      },
    ].forEach(function (mapping) {
      it(
        "SystemError from node.js  with code: '" + mapping.code + "' to a MessagingError",
        function () {
          const translatedError = Errors.translate(mapping as any) as Errors.MessagingError;
          translatedError.name.should.equal("MessagingError");
          translatedError.code!.should.equal(mapping.code);
          if (["ECONNRESET", "ECONNREFUSED", "EBUSY"].indexOf(mapping.code) !== -1) {
            translatedError.retryable.should.equal(true);
          } else {
            translatedError.retryable.should.equal(false);
          }
        }
      );
    });
  });
});
