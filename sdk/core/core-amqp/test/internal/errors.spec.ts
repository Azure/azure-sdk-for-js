// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import * as Errors from "../../src/errors.js";
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
        code: "EADDRNOTAVAIL",
        errno: "EADDRNOTAVAIL",
        syscall: "read",
        message: "code: EADDRNOTAVAIL, errno: EADDRNOTAVAIL, syscall: read",
      },
      {
        code: "EAI_AGAIN",
        errno: "EAI_AGAIN",
        syscall: "read",
        message: "code: EAI_AGAIN, errno: EAI_AGAIN, syscall: read",
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
          if (
            ["ECONNRESET", "ECONNREFUSED", "EBUSY", "EAI_AGAIN", "EADDRNOTAVAIL"].indexOf(
              mapping.code,
            ) !== -1
          ) {
            assert.isTrue(translatedError.retryable);
          } else {
            assert.isFalse(translatedError.retryable);
          }
        },
      );
    });

    describe("AggregateError handling (Node.js 20+ Happy Eyeballs)", function () {
      it("translates AggregateError containing ENOTFOUND into an AggregateError of MessagingErrors", function () {
        const innerError = {
          code: "ENOTFOUND",
          errno: "ENOTFOUND",
          syscall: "getaddrinfo",
          message: "getaddrinfo ENOTFOUND example.invalid",
        };
        const aggregateError = new AggregateError(
          [innerError],
          "getaddrinfo ENOTFOUND example.invalid",
        );
        const result = Errors.translate(aggregateError);
        assert.instanceOf(result, AggregateError);
        const aggResult = result as AggregateError & { retryable: boolean };
        assert.isFalse(aggResult.retryable);
        assert.equal(aggResult.errors.length, 1);
        const inner = aggResult.errors[0] as Errors.MessagingError;
        assert.equal(inner.name, "MessagingError");
        assert.equal(inner.code, "ENOTFOUND");
        assert.isFalse(inner.retryable);
      });

      it("translates AggregateError containing EAI_AGAIN with retryable=true", function () {
        const innerError = {
          code: "EAI_AGAIN",
          errno: "EAI_AGAIN",
          syscall: "getaddrinfo",
          message: "getaddrinfo EAI_AGAIN example.invalid",
        };
        const aggregateError = new AggregateError(
          [innerError],
          "getaddrinfo EAI_AGAIN example.invalid",
        );
        const result = Errors.translate(aggregateError);
        assert.instanceOf(result, AggregateError);
        const aggResult = result as AggregateError & { retryable: boolean };
        assert.isTrue(aggResult.retryable);
        const inner = aggResult.errors[0] as Errors.MessagingError;
        assert.equal(inner.name, "MessagingError");
        assert.equal(inner.code, "EAI_AGAIN");
        assert.isTrue(inner.retryable);
      });

      it("translates all inner errors and sets retryable=true if any inner error is retryable", function () {
        const enotfound = {
          code: "ENOTFOUND",
          errno: "ENOTFOUND",
          syscall: "getaddrinfo",
          message: "getaddrinfo ENOTFOUND example.invalid",
        };
        const econnrefused = {
          code: "ECONNREFUSED",
          errno: "ECONNREFUSED",
          syscall: "connect",
          message: "connect ECONNREFUSED 127.0.0.1:5671",
        };
        const result = Errors.translate(new AggregateError([enotfound, econnrefused]));
        assert.instanceOf(result, AggregateError);
        const aggResult = result as AggregateError & { retryable: boolean };
        // ECONNREFUSED is retryable, so the aggregate should be retryable
        assert.isTrue(aggResult.retryable);
        assert.equal(aggResult.errors.length, 2);
        assert.equal((aggResult.errors[0] as Errors.MessagingError).code, "ENOTFOUND");
        assert.equal((aggResult.errors[1] as Errors.MessagingError).code, "ECONNREFUSED");
      });

      it("sets retryable=false when no inner error is retryable", function () {
        const enotfound1 = {
          code: "ENOTFOUND",
          errno: "ENOTFOUND",
          syscall: "getaddrinfo",
          message: "getaddrinfo ENOTFOUND example.invalid (IPv6)",
        };
        const enotfound2 = {
          code: "ENOTFOUND",
          errno: "ENOTFOUND",
          syscall: "getaddrinfo",
          message: "getaddrinfo ENOTFOUND example.invalid (IPv4)",
        };
        const result = Errors.translate(new AggregateError([enotfound1, enotfound2]));
        assert.instanceOf(result, AggregateError);
        const aggResult = result as AggregateError & { retryable: boolean };
        assert.isFalse(aggResult.retryable);
      });

      it("handles nested AggregateError recursively and propagates retryable", function () {
        const innerError = {
          code: "EAI_AGAIN",
          errno: "EAI_AGAIN",
          syscall: "getaddrinfo",
          message: "getaddrinfo EAI_AGAIN example.invalid",
        };
        const innerAggregate = new AggregateError([innerError]);
        const outerAggregate = new AggregateError([innerAggregate]);
        const result = Errors.translate(outerAggregate);
        assert.instanceOf(result, AggregateError);
        const aggResult = result as AggregateError & { retryable: boolean };
        // retryable must propagate through nested AggregateErrors
        assert.isTrue(aggResult.retryable);
        // The inner AggregateError was also translated
        const innerResult = aggResult.errors[0] as AggregateError & { retryable: boolean };
        assert.instanceOf(innerResult, AggregateError);
        assert.isTrue(innerResult.retryable);
      });

      it("preserves the original stack trace", function () {
        const innerError = {
          code: "ENOTFOUND",
          errno: "ENOTFOUND",
          syscall: "getaddrinfo",
          message: "getaddrinfo ENOTFOUND example.invalid",
        };
        const aggregateError = new AggregateError([innerError], "DNS failure");
        const originalStack = aggregateError.stack;
        const result = Errors.translate(aggregateError);
        assert.equal(result.stack, originalStack);
        assert.equal(result.cause, aggregateError);
      });

      it("returns the original AggregateError for an empty errors array", function () {
        const aggregateError = new AggregateError([]);
        const result = Errors.translate(aggregateError);
        assert.equal(result, aggregateError);
      });
    });
  });
});
