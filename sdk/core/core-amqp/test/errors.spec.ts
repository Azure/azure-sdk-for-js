// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import * as Errors from "../src/errors.js";
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

describe("Errors", function () {
  describe("translate", function () {
    it("Does not touch errors that are neither AmqpError nor SystemError", function () {
      const testError = new Error("Test error");
      const translatedError = Errors.translate(testError);
      assert.deepEqual(translatedError, testError);
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

        assert.equal(translatedError.name, "Error");
        assert.equal(
          translatedError.message,
          cases[i].outputErrorMessage,
          "Unexpected error message.",
        );
      }
    });

    it("Does not touch TypeError", function () {
      const testError = new TypeError("This is a wrong type!!");
      const translatedError = Errors.translate(testError);
      assert.deepEqual(translatedError, testError);
    });

    it("Does not touch RangeError", function () {
      const testError = new RangeError("Out of range!!");
      const translatedError = Errors.translate(testError);
      assert.deepEqual(translatedError, testError);
    });

    it("handles an ErrorEvent", function () {
      const testError = {
        message: "getaddrinfo ENOTFOUND example.invalid",
        error: {
          code: "ENOTFOUND",
          errno: "-3008",
          syscall: "getaddrinfo",
          message: "getaddrinfo ENOTFOUND example.invalid",
          stack:
            "'Error: getaddrinfo ENOTFOUND example.invalid\n    at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:118:26)\n    at GetAddrInfoReqWrap.callbackTrampoline (node:internal/async_hooks:130:17)'",
        },
      };
      const translatedError = Errors.translate(testError) as Errors.MessagingError;
      assert.equal(testError.error.message, translatedError.message);
      assert.equal(translatedError.name, "MessagingError");
      assert.equal(translatedError.code, "ENOTFOUND");
      assert.equal(translatedError.code, testError.error.code);
      assert.equal(translatedError.message, testError.error.message);
      assert.equal(translatedError.stack, testError.error.stack);
      assert.equal(translatedError.retryable, false);
    });

    it("Sets retryable to true, if input is custom error and name is OperationTimeoutError", function () {
      const err = new Error("error message");
      err.name = "OperationTimeoutError";
      const translatedError = Errors.translate(err) as Errors.MessagingError;
      assert.equal(translatedError.name, "MessagingError");
      assert.equal(translatedError.code, "OperationTimeoutError");
      assert.equal(translatedError.message, err.message);
      assert.equal(translatedError.stack, err.stack);
      assert.isTrue(translatedError.retryable);
    });

    it("Sets retryable to true, if input is custom error and name is InsufficientCreditError", function () {
      const err = new Error("error message");
      err.name = "InsufficientCreditError";
      const translatedError = Errors.translate(err) as Errors.MessagingError;
      assert.equal(translatedError.name, "MessagingError");
      assert.equal(translatedError.code, "InsufficientCreditError");
      assert.equal(translatedError.message, err.message);
      assert.equal(translatedError.stack, err.stack);
      assert.isTrue(translatedError.retryable);
    });

    it("Does not sets retryable to true, if input is custom error and name is SendOperationFailedError", function () {
      const err = new Error("error message");
      err.name = "SendOperationFailedError";
      const translatedError = Errors.translate(err) as Errors.MessagingError;
      assert.equal(translatedError.name, "MessagingError");
      assert.equal(translatedError.code, "SendOperationFailedError");
      assert.equal(translatedError.message, err.message);
      assert.equal(translatedError.stack, err.stack);
      assert.isFalse(translatedError.retryable);
    });

    it("Does not set retryable, if input is the custom AbortError", function () {
      const err = new AbortError("error message");
      const translatedError = Errors.translate(err);
      assert.equal(translatedError.name, "AbortError");
      assert.equal(translatedError.message, err.message);
      assert.equal(translatedError.stack, err.stack);
      assert.isUndefined((translatedError as Errors.MessagingError).retryable);
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
          assert.equal(translatedError.code, mapping.to);
        }
        assert.equal(translatedError.name, "MessagingError");
        if (
          translatedError.code === "ServerBusyError" ||
          translatedError.code === "MessagingError" ||
          // eslint-disable-next-line eqeqeq
          translatedError.code == undefined
        ) {
          assert.isTrue(translatedError.retryable);
        } else {
          assert.isFalse(translatedError.retryable);
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
          assert.equal(translatedError.name, "MessagingError");
          assert.equal(translatedError.code, mapping.code);
          if (["ECONNRESET", "ECONNREFUSED", "EBUSY"].indexOf(mapping.code) !== -1) {
            assert.isTrue(translatedError.retryable);
          } else {
            assert.isFalse(translatedError.retryable);
          }
        },
      );
    });
  });
});
