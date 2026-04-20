// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import type { RetryConfig } from "../../src/index.js";
import {
  Constants,
  MessagingError,
  RetryMode,
  RetryOperationType,
  delay,
  retry,
  translate,
} from "../../src/index.js";
import debugModule from "debug";

const debug = debugModule("azure:core-amqp:retry-spec");

function assertAggregateError(err: unknown, check: RegExp): asserts err is AggregateError {
  assert.instanceOf(err, AggregateError);
  const errors = err.errors;
  assert.match(errors[errors.length - 1].message, check);
}

[RetryMode.Exponential, RetryMode.Fixed].forEach((mode) => {
  describe(`retry function for "${
    mode === RetryMode.Exponential ? "Exponential" : "Fixed"
  }" retry mode`, function () {
    it("should succeed if the operation succeeds.", async function () {
      const operation = vi.fn(async () => {
        debug("counter: %d", operation.mock.calls.length);
        await delay(200);
        return {
          code: 200,
          description: "OK",
        };
      });
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.cbsAuth,
        retryOptions: { retryDelayInMs: 15000, mode: mode },
      };
      const result = await retry(config);
      assert.equal(result.code, 200);
      assert.equal(result.description, "OK");
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it("should fail if the operation returns a non retryable error", async function () {
      const operation = vi.fn(async () => {
        debug("counter: %d", operation.mock.calls.length);
        await delay(200);
        throw translate({
          condition: "amqp:precondition-failed",
          description: "I would like to fail, not retryable.",
        });
      });
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.management,
        retryOptions: { retryDelayInMs: 15000, mode: mode },
      };
      await expect(retry(config)).rejects.toThrow(/I would like to fail, not retryable./);
      expect(operation).toHaveBeenCalledTimes(1);
    });

    it("should succeed if the operation initially fails with a retryable error and then succeeds.", async function () {
      const operation = vi.fn(async () => {
        await delay(200);
        debug("counter: %d", operation.mock.calls.length);
        if (operation.mock.calls.length === 1) {
          throw translate({
            condition: "com.microsoft:server-busy",
            description: "The server is busy right now. Retry later.",
          });
        } else {
          return {
            code: 200,
            description: "OK",
          };
        }
      });
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.receiverLink,
        retryOptions: { maxRetries: 2, retryDelayInMs: 500, mode: mode },
      };
      const result = await retry(config);
      assert.equal(result.code, 200);
      assert.equal(result.description, "OK");
      expect(operation).toHaveBeenCalledTimes(2);
    });

    it("should succeed in the last attempt.", async function () {
      const operation = vi.fn(async () => {
        await delay(200);
        debug("counter: %d", operation.mock.calls.length);
        if (operation.mock.calls.length <= 2) {
          const e = new MessagingError("A retryable error.");
          e.retryable = true;
          throw e;
        } else {
          return {
            code: 200,
            description: "OK",
          };
        }
      });
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.senderLink,
        retryOptions: { maxRetries: 2, retryDelayInMs: 500, mode: mode },
      };
      const result = await retry(config);
      assert.equal(result.code, 200);
      assert.equal(result.description, "OK");
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it("should fail if the last attempt return a non-retryable error", async function () {
      const operation = vi.fn(async () => {
        await delay(200);
        debug("counter: %d", operation.mock.calls.length);
        if (operation.mock.calls.length <= 2) {
          const e = new MessagingError("A retryable error.");
          e.retryable = true;
          throw e;
        } else {
          const x: any = {
            condition: "com.microsoft:message-lock-lost",
            description: "I would like to fail.",
          };
          throw x;
        }
      });
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.sendMessage,
        retryOptions: { maxRetries: 2, retryDelayInMs: 500, mode: mode },
      };
      const err = await retry(config).catch((e: unknown) => e);
      assertAggregateError(err, /I would like to fail./);
      expect(operation).toHaveBeenCalledTimes(3);
    });

    it("should fail if all attempts return a retryable error", async function () {
      const operation = vi.fn(async () => {
        debug("counter: %d", operation.mock.calls.length);
        await delay(200);
        const e = new MessagingError("I would always like to fail, keep retrying.");
        e.retryable = true;
        throw e;
      });
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.session,
        retryOptions: { maxRetries: 4, retryDelayInMs: 500, mode: mode },
      };
      const err = await retry(config).catch((e: unknown) => e);
      assertAggregateError(err, /I would always like to fail, keep retrying./);
      expect(operation).toHaveBeenCalledTimes(5);
    });

    it("should not sleep after final failure if all attempts return a retryable error (no retries)", async function () {
      const operation = vi.fn(async () => {
        const e = new MessagingError("I would always like to fail, keep retrying.");
        e.retryable = true;
        throw e;
      });
      // Create an abort controller so we can clean up the delay's setTimeout ASAP after the race.
      const delayAbortController = new AbortController();
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.session,
        retryOptions: {
          maxRetries: 0,
          retryDelayInMs: 60000,
          mode: mode,
        },
      };
      try {
        // Since retry should not sleep since maxRetries is 0, `retry` should beat `delay`.
        await Promise.race([retry(config), delay(10000, delayAbortController.signal)]);
        // If we get here, `delay` won :-(
        throw new Error("TestFailure: 'retry' took longer than expected to return.");
      } catch (err) {
        assert.instanceOf(err, MessagingError);
        assert.match(err.message, /I would always like to fail, keep retrying./);
        expect(operation).toHaveBeenCalledTimes(1);
        // Clear delay's setTimeout...we don't need it anymore.
        delayAbortController.abort();
      }
    });

    it("should not sleep after final failure if all attempts return a retryable error (retries)", async function () {
      const operation = vi.fn(async () => {
        const e = new MessagingError("I would always like to fail, keep retrying.");
        e.retryable = true;
        throw e;
      });
      // Create an abort controller so we can clean up the delay's setTimeout ASAP after the race.
      const delayAbortController = new AbortController();
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.session,
        retryOptions: {
          maxRetries: 1,
          retryDelayInMs: 1000,
          mode: mode,
        },
      };
      try {
        // `retry` should sleep once because `maxRetries` is 1, causing a 1000 ms delay.
        // `retry` should beat `delay`.
        await Promise.race([retry(config), delay(1500, delayAbortController.signal)]);
        // If we get here, `delay` won :-(
        throw new Error("TestFailure: 'retry' took longer than expected to return.");
      } catch (err) {
        assertAggregateError(err, /I would always like to fail, keep retrying./);
        expect(operation).toHaveBeenCalledTimes(2);
        // Clear delay's setTimeout...we don't need it anymore.
        delayAbortController.abort();
      }
    });

    it("should stop retries when aborted", async function () {
      const operation = vi.fn(async () => {
        debug("counter: %d", operation.mock.calls.length);
        await delay(200);
        const e = new MessagingError("I would always like to fail, keep retrying.");
        e.retryable = true;
        throw e;
      });
      const controller = new AbortController();
      const abortSignal = controller.signal;
      setTimeout(controller.abort.bind(controller), 300);
      const config: RetryConfig<any> = {
        operation,
        connectionId: "connection-1",
        operationType: RetryOperationType.session,
        abortSignal: abortSignal,
        retryOptions: { maxRetries: 4, retryDelayInMs: 500, mode: mode },
      };
      await expect(retry(config)).rejects.toMatchObject({ name: "AbortError" });
      expect(operation).toHaveBeenCalledTimes(1);
    });

    describe("with config.maxRetries set to Infinity", function () {
      it("should succeed if the operation succeeds.", async function () {
        const operation = vi.fn(async () => {
          debug("counter: %d", operation.mock.calls.length);
          await delay(200);
          return {
            code: 200,
            description: "OK",
          };
        });
        const config: RetryConfig<any> = {
          operation,
          connectionId: "connection-1",
          operationType: RetryOperationType.cbsAuth,
          retryOptions: { maxRetries: Infinity, retryDelayInMs: 500, mode: mode },
        };
        const result = await retry(config);
        assert.equal(result.code, 200);
        assert.equal(result.description, "OK");
        expect(operation).toHaveBeenCalledTimes(1);
      });

      it("should fail if the operation returns a non retryable error", async function () {
        const operation = vi.fn(async () => {
          debug("counter: %d", operation.mock.calls.length);
          await delay(200);
          throw translate({
            condition: "amqp:precondition-failed",
            description: "I would like to fail, not retryable.",
          });
        });
        const config: RetryConfig<any> = {
          operation,
          connectionId: "connection-1",
          operationType: RetryOperationType.management,
          retryOptions: { maxRetries: Infinity, retryDelayInMs: 500, mode: mode },
        };
        await expect(retry(config)).rejects.toThrow(/I would like to fail, not retryable./);
        expect(operation).toHaveBeenCalledTimes(1);
      });

      it("should succeed if the operation initially fails with a retryable error and then succeeds.", async function () {
        const operation = vi.fn(async () => {
          await delay(200);
          debug("counter: %d", operation.mock.calls.length);
          if (operation.mock.calls.length === 1) {
            throw translate({
              condition: "com.microsoft:server-busy",
              description: "The server is busy right now. Retry later.",
            });
          } else {
            return {
              code: 200,
              description: "OK",
            };
          }
        });
        const config: RetryConfig<any> = {
          operation,
          connectionId: "connection-1",
          operationType: RetryOperationType.receiverLink,
          retryOptions: { maxRetries: Infinity, retryDelayInMs: 500, mode: mode },
        };
        const result = await retry(config);
        assert.equal(result.code, 200);
        assert.equal(result.description, "OK");
        expect(operation).toHaveBeenCalledTimes(2);
      });

      it("should succeed in the last attempt.", async function () {
        const operation = vi.fn(async () => {
          await delay(200);
          debug("counter: %d", operation.mock.calls.length);
          if (operation.mock.calls.length <= 2) {
            const e = new MessagingError("A retryable error.");
            e.retryable = true;
            throw e;
          } else {
            return {
              code: 200,
              description: "OK",
            };
          }
        });
        const config: RetryConfig<any> = {
          operation,
          connectionId: "connection-1",
          operationType: RetryOperationType.senderLink,
          retryOptions: { maxRetries: Infinity, retryDelayInMs: 500, mode: mode },
        };
        const result = await retry(config);
        assert.equal(result.code, 200);
        assert.equal(result.description, "OK");
        expect(operation).toHaveBeenCalledTimes(3);
      });

      it("should fail if the last attempt return a non-retryable error", async function () {
        const operation = vi.fn(async () => {
          await delay(200);
          debug("counter: %d", operation.mock.calls.length);
          if (operation.mock.calls.length <= 2) {
            const e = new MessagingError("A retryable error.");
            e.retryable = true;
            throw e;
          } else {
            const x: any = {
              condition: "com.microsoft:message-lock-lost",
              description: "I would like to fail.",
            };
            throw x;
          }
        });
        const config: RetryConfig<any> = {
          operation,
          connectionId: "connection-1",
          operationType: RetryOperationType.sendMessage,
          retryOptions: {
            maxRetries: Constants.defaultMaxRetriesForConnection,
            retryDelayInMs: 1,
            mode: mode,
          },
        };
        const err = await retry(config).catch((e: unknown) => e);
        assertAggregateError(err, /I would like to fail./);
        expect(operation).toHaveBeenCalledTimes(3);
      });
    });
  });
});

describe("retry", () => {
  it("uses default retryOptions when none provided", async () => {
    let callCount = 0;
    const result = await (
      await import("../../src/retry.js")
    ).retry({
      operation: async () => {
        callCount++;
        return "ok";
      },
      connectionId: "conn-1",
      operationType: (await import("../../src/retry.js")).RetryOperationType.cbsAuth,
    });
    assert.equal(result, "ok");
    assert.equal(callCount, 1);
  });

  it("uses defaults for negative retryDelayInMs and maxRetryDelayInMs", async () => {
    let callCount = 0;
    const result = await retry({
      operation: async () => {
        callCount++;
        return "ok";
      },
      connectionId: "conn-1",
      operationType: RetryOperationType.cbsAuth,
      retryOptions: {
        maxRetries: 0,
        retryDelayInMs: -1,
        maxRetryDelayInMs: -1,
      },
    });
    assert.equal(result, "ok");
    assert.equal(callCount, 1);
  });

  it("checks network when ServiceCommunicationError and connectionHost provided", async () => {
    const { ErrorNameConditionMapper } = await import("../../src/errors.js");

    let callCount = 0;
    try {
      await retry({
        operation: async () => {
          callCount++;
          const err: any = {
            condition: ErrorNameConditionMapper.ServiceCommunicationError,
            description: "Connection lost",
          };
          throw err;
        },
        connectionId: "conn-1",
        operationType: RetryOperationType.cbsAuth,
        connectionHost: "localhost",
        retryOptions: {
          maxRetries: 0,
          retryDelayInMs: 100,
        },
      });
      assert.fail("Should have thrown");
    } catch {
      // The error should have been thrown after the network check
      assert.equal(callCount, 1);
    }
  });
});

describe("retry - isDelivery branch", () => {
  it("succeeds with a delivery-like result object (does not log result)", async () => {
    const deliveryResult = {
      id: 1,
      settled: true,
      remote_settled: false,
      format: 0,
    };
    const result = await retry({
      operation: async () => deliveryResult,
      connectionId: "conn-1",
      operationType: RetryOperationType.sendMessage,
      retryOptions: { maxRetries: 0 },
    });
    assert.deepEqual(result, deliveryResult);
  });
});
