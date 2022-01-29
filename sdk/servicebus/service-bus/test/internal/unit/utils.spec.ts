// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  checkAndRegisterWithAbortSignal,
  waitForTimeoutOrAbortOrResolve,
} from "../../../src/util/utils";
import { StandardAbortMessage } from "@azure/core-amqp";
import { AbortController, AbortError, AbortSignalLike } from "@azure/abort-controller";
import { delay } from "rhea-promise";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  extractSpanContextFromServiceBusMessage,
  TRACEPARENT_PROPERTY,
} from "../../../src/diagnostics/instrumentServiceBusMessage";
import { ServiceBusReceivedMessage } from "../../../src";
import { TraceFlags } from "@azure/core-tracing";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("utils", () => {
  describe("waitForTimeoutAbortOrResolve", () => {
    let abortController: AbortController;
    let abortSignal: ReturnType<typeof getAbortSignalWithTracking>;
    let ourTimerId: NodeJS.Timer | undefined;
    let timerWasCleared: boolean;

    let timeoutFunctions: {
      setTimeoutFn: (callback: (...args: any[]) => void, ms: number, ...args: any[]) => any;
      clearTimeoutFn: (timeoutId: NodeJS.Timer) => void;
    };

    const neverFireMs = 10 * 1000;

    beforeEach(() => {
      abortController = new AbortController();
      abortSignal = getAbortSignalWithTracking(abortController);
      ourTimerId = undefined;
      timerWasCleared = false;

      const setTimeoutFn = (
        callback: (...args: any[]) => void,
        ms: number,
        ...args: any[]
      ): any => {
        const id = setTimeout(callback, ms, ...args);

        assert.notExists(
          ourTimerId,
          "Definitely shouldn't schedule our timeout callback more than once"
        );

        ourTimerId = id;
        return id;
      };

      const clearTimeoutFn = (timerIdToClear: NodeJS.Timer): any => {
        assert.exists(timerIdToClear);
        assert.isFalse(timerWasCleared, "Timer should not be cleared multiple times");
        timerWasCleared = true;

        return clearTimeout(timerIdToClear);
      };

      timeoutFunctions = {
        setTimeoutFn,
        clearTimeoutFn,
      };
    });

    it("abortSignal cancelled in mid-flight", async () => {
      const prm = waitForTimeoutOrAbortOrResolve({
        actionFn: async () => {
          await delay(neverFireMs);
        },
        timeoutMessage: "the message for the timeout",
        timeoutMs: neverFireMs,
        abortSignal,
        timeoutFunctions,
      });

      await delay(500);
      abortController.abort();

      try {
        await prm;
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isTrue(
        abortSignal.ourListenersWereRemoved(),
        "All paths should properly clean up any event listeners on the signal"
      );
      assert.isTrue(timerWasCleared);
    });

    it("abortSignal already aborted", async () => {
      abortController.abort();

      try {
        await waitForTimeoutOrAbortOrResolve({
          actionFn: async () => {
            await delay(neverFireMs);
          },
          timeoutMessage: "the message for the timeout",
          timeoutMs: neverFireMs,
          abortSignal,
          timeoutFunctions,
        });

        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
        assert.equal(err.name, "AbortError");
      }

      assert.isTrue(
        abortSignal.ourListenersWereRemoved(),
        "All paths should properly clean up any event listeners on the signal"
      );
      // the abort signal is checked early, so the timeout never gets set up here.
      assert.notExists(ourTimerId);
    });

    it("abortSignal is optional", async () => {
      try {
        await waitForTimeoutOrAbortOrResolve({
          actionFn: async () => {
            await delay(neverFireMs);
          },
          timeoutMs: 500,
          timeoutMessage: "the message for the timeout",
          timeoutFunctions,
        });

        assert.fail("Should have thrown an TimeoutError");
      } catch (err) {
        assert.equal(err.message, "the message for the timeout");
        assert.equal(err.name, "OperationTimeoutError");
      }

      assert.isTrue(timerWasCleared);
    });

    it("timeout expires", async () => {
      try {
        await waitForTimeoutOrAbortOrResolve({
          actionFn: async () => {
            await delay(neverFireMs);
          },
          timeoutMessage: "the message for the timeout",
          timeoutMs: 500,
          abortSignal,
          timeoutFunctions,
        });

        assert.fail("Should have thrown an TimeoutError");
      } catch (err) {
        assert.equal(err.message, "the message for the timeout");
        assert.equal(err.name, "OperationTimeoutError");
      }

      assert.isTrue(
        abortSignal.ourListenersWereRemoved(),
        "All paths should properly clean up any event listeners on the signal"
      );
      assert.isTrue(timerWasCleared);
    });

    it("nothing expires", async () => {
      const result = await waitForTimeoutOrAbortOrResolve({
        actionFn: async () => {
          await delay(500);
          return 100;
        },
        timeoutMessage: "the message for the timeout",
        timeoutMs: neverFireMs,
        abortSignal,
        timeoutFunctions,
      });

      assert.equal(result, 100);
      assert.isTrue(
        abortSignal.ourListenersWereRemoved(),
        "All paths should properly clean up any event listeners on the signal"
      );
      assert.isTrue(timerWasCleared);
    });

    it("actionFn throws an error", async () => {
      try {
        await waitForTimeoutOrAbortOrResolve({
          actionFn: async () => {
            throw new Error("Error thrown from action");
          },
          timeoutMessage: "the message for the timeout",
          timeoutMs: neverFireMs,
          abortSignal,
          timeoutFunctions,
        });

        assert.fail("Should have thrown");
      } catch (err) {
        assert.equal(err.message, "Error thrown from action");
      }

      assert.isTrue(
        abortSignal.ourListenersWereRemoved(),
        "All paths should properly clean up any event listeners on the signal"
      );
      assert.isTrue(timerWasCleared);
    });

    it("sanity check - the real timeout methods do get used if we don't provide fake ones", async () => {
      try {
        await waitForTimeoutOrAbortOrResolve({
          actionFn: async () => {
            await delay(5000);
          },
          timeoutMessage: "the message for the timeout",
          timeoutMs: 1,
          abortSignal,
        });
      } catch (err) {
        assert.equal(err.message, "the message for the timeout");
      }

      try {
        abortController.abort();

        await waitForTimeoutOrAbortOrResolve({
          actionFn: async () => {
            await delay(5000);
          },
          timeoutMessage: "the message for the timeout",
          timeoutMs: neverFireMs,
          abortSignal,
        });
      } catch (err) {
        assert.equal(err.message, StandardAbortMessage);
      }
    });
  });

  describe("checkAndRegisterWithAbortSignal", () => {
    let abortController: AbortController;
    let abortSignal: ReturnType<typeof getAbortSignalWithTracking>;

    beforeEach(() => {
      abortController = new AbortController();
      abortSignal = getAbortSignalWithTracking(abortController);
    });

    it("abortSignal is undefined", () => {
      const cleanupFn = checkAndRegisterWithAbortSignal(() => {
        throw new Error("Will never be called");
      }, undefined);

      // we just return a no-op function in this case.
      assert.exists(cleanupFn);
      cleanupFn();
    });

    it("abortSignal is already aborted", () => {
      abortController.abort();

      try {
        checkAndRegisterWithAbortSignal(() => {
          throw new Error("Will never be called");
        }, abortSignal);
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.name, "AbortError");
        assert.equal(err.message, StandardAbortMessage);
      }

      assert.isTrue(abortSignal.ourListenersWereRemoved());
    });

    it("abortSignal abort calls handlers", async () => {
      let callbackWasCalled = false;
      const cleanupFn = checkAndRegisterWithAbortSignal((abortError: AbortError) => {
        callbackWasCalled = true;
        assert.equal(abortError.message, StandardAbortMessage);
      }, abortSignal);
      assert.exists(cleanupFn);

      assert.isFalse(abortSignal.ourListenersWereRemoved());
      assert.isFalse(callbackWasCalled);

      abortController.abort();
      await delay(0);

      assert.isTrue(abortSignal.ourListenersWereRemoved());
      assert.isTrue(callbackWasCalled);

      // and cleanupFn is harmless to call here.
      cleanupFn!();
    });

    it("calling cleanup removes handlers from abortSignal", async () => {
      let callbackWasCalled = false;
      const cleanupFn = checkAndRegisterWithAbortSignal(() => {
        callbackWasCalled = true;
      }, abortSignal);
      assert.exists(cleanupFn);

      assert.isFalse(abortSignal.ourListenersWereRemoved());
      assert.isFalse(callbackWasCalled);

      if (cleanupFn == null) {
        throw new Error("No cleanup function!");
      }

      cleanupFn();

      assert.isTrue(abortSignal.ourListenersWereRemoved());
      // sanity check - let's make sure we're not accidentally triggering their abort handler!
      assert.isFalse(callbackWasCalled);
    });
  });

  describe("extractSpanContextFromServiceBusMessage", function () {
    it("should extract a SpanContext from a properly instrumented ServiceBusMessage", function () {
      const traceId = "11111111111111111111111111111111";
      const spanId = "2222222222222222";
      const flags = "00";
      const receivedMessage: ServiceBusReceivedMessage = {
        body: "This is a test.",
        state: "active",
        enqueuedTimeUtc: new Date(),
        applicationProperties: {
          [TRACEPARENT_PROPERTY]: `00-${traceId}-${spanId}-${flags}`,
        },
        _rawAmqpMessage: { body: "This is a test." },
      };

      const spanContext = extractSpanContextFromServiceBusMessage(receivedMessage);

      assert.exists(spanContext, "Extracted spanContext should be defined.");
      assert.equal(spanContext!.traceId, traceId, "Extracted traceId does not match expectation.");
      assert.equal(spanContext!.spanId, spanId, "Extracted spanId does not match expectation.");
      assert.equal(
        spanContext!.traceFlags,
        TraceFlags.NONE,
        "Extracted traceFlags do not match expectations."
      );
    });

    it("should return undefined when ServiceBusMessage is not properly instrumented", function () {
      const traceId = "11111111111111111111111111111111";
      const spanId = "2222222222222222";
      const flags = "00";
      const receivedMessage: ServiceBusReceivedMessage = {
        body: "This is a test.",
        state: "active",
        enqueuedTimeUtc: new Date(),
        applicationProperties: {
          [TRACEPARENT_PROPERTY]: `99-${traceId}-${spanId}-${flags}`,
        },
        _rawAmqpMessage: { body: "This is a test." },
      };

      const spanContext = extractSpanContextFromServiceBusMessage(receivedMessage);

      assert.notExists(
        spanContext,
        "Invalid diagnosticId version should return undefined spanContext."
      );
    });

    it("should return undefined when ServiceBusMessage is not instrumented", function () {
      const receivedMessage: ServiceBusReceivedMessage = {
        body: "This is a test.",
        state: "active",
        enqueuedTimeUtc: new Date(),
        _rawAmqpMessage: { body: "This is a test." },
      };

      const spanContext = extractSpanContextFromServiceBusMessage(receivedMessage);

      assert.notExists(
        spanContext,
        `Missing property "${TRACEPARENT_PROPERTY}" should return undefined spanContext.`
      );
    });
  });
});

function getAbortSignalWithTracking(
  abortController: AbortController
): AbortSignalLike & { ourListenersWereRemoved(): boolean } {
  const signal = abortController.signal as any as ReturnType<typeof getAbortSignalWithTracking>;

  const allFunctions = new Set<(signal: AbortSignalLike, ev: any) => any>();

  const origAddEventListener = signal.addEventListener;
  const origRemoveEventListener = signal.removeEventListener;

  signal.addEventListener = (name, handler) => {
    assert.isFalse(allFunctions.has(handler), "Handler should not have already been added");
    allFunctions.add(handler);
    origAddEventListener.call(signal, name, handler);
  };

  signal.removeEventListener = (name, handler) => {
    // being less stringent about potentially removing it more than once since it simplifies
    // our error handling code.
    allFunctions.delete(handler);
    origRemoveEventListener.call(signal, name, handler);
  };

  signal.ourListenersWereRemoved = () => {
    return allFunctions.size === 0;
  };
  return signal;
}
