// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  waitForTimeoutOrAbortOrResolve,
  checkAndRegisterWithAbortSignal
} from "../../src/util/utils";
import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { delay, AmqpError } from "rhea-promise";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ErrorNameConditionMapper } from "@azure/core-amqp";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe.only("utils", () => {
  describe("waitForTimeoutAbortOrResolve", () => {
    let abortController: AbortController;
    let abortSignal: ReturnType<typeof getAbortSignalWithTracking>;
    let ourTimerId: NodeJS.Timer | undefined;
    let timerWasCleared: boolean;

    let _internalSetTimeout: typeof setTimeout;
    let _internalClearTimeout: typeof clearTimeout;

    const neverFireMs = 10 * 1000;

    beforeEach(() => {
      abortController = new AbortController();
      abortSignal = getAbortSignalWithTracking(abortController);
      ourTimerId = undefined;
      timerWasCleared = false;

      const globalObject = getGlobalsForMocking();

      _internalSetTimeout = globalObject.setTimeout;
      _internalClearTimeout = globalObject.clearTimeout;

      globalObject.setTimeout = (
        callback: (...args: any[]) => void,
        ms: number,
        ...args: any[]
      ): any => {
        const id = _internalSetTimeout.call(globalObject, callback, ms, ...args);

        if (callback.name === "timeoutCallback") {
          assert.notExists(
            ourTimerId,
            "Definitely shouldn't schedule our timeout callback more than once"
          );

          ourTimerId = id;
        }

        return id;
      };

      globalObject.clearTimeout = (timerIdToClear: NodeJS.Timer): any => {
        assert.exists(timerIdToClear, "All timers that are cleared actually exist");

        if (timerIdToClear === ourTimerId) {
          assert.isFalse(timerWasCleared, "Timer should not be cleared multiple times");
          timerWasCleared = true;
        }

        return _internalClearTimeout.call(globalObject, timerIdToClear);
      };
    });

    afterEach(() => {
      const globalObject = getGlobalsForMocking();

      globalObject.setTimeout = _internalSetTimeout;
      globalObject.clearTimeout = _internalClearTimeout;
    });

    it("abortSignal cancelled in mid-flight", async () => {
      const prm = waitForTimeoutOrAbortOrResolve({
        actionFn: async () => {
          await delay(neverFireMs);
        },
        timeoutMessage: "the message for the timeout",
        timeoutMs: neverFireMs,
        abortSignal,
        abortMessage: "the message for aborting"
      });

      await delay(500);
      abortController.abort();

      try {
        await prm;
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, "the message for aborting");
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
          abortMessage: "the message for aborting"
        });

        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.message, "the message for aborting");
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
          timeoutMessage: "the message for the timeout"
        });

        assert.fail("Should have thrown an TimeoutError");
      } catch (err) {
        assert.equal(
          (err as AmqpError).condition,
          ErrorNameConditionMapper.ServiceUnavailableError
        );
        assert.equal((err as AmqpError).description, "the message for the timeout");
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
          abortMessage: "the message for aborting"
        });

        assert.fail("Should have thrown an TimeoutError");
      } catch (err) {
        assert.equal(
          (err as AmqpError).condition,
          ErrorNameConditionMapper.ServiceUnavailableError
        );
        assert.equal((err as AmqpError).description, "the message for the timeout");
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
        abortMessage: "the message for aborting"
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
          abortMessage: "the message for aborting"
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
  });

  describe("checkAndRegisterWithAbortSignal", () => {
    let abortController: AbortController;
    let abortSignal: ReturnType<typeof getAbortSignalWithTracking>;

    beforeEach(() => {
      abortController = new AbortController();
      abortSignal = getAbortSignalWithTracking(abortController);
    });

    it("abortSignal is undefined", () => {
      const cleanupFn = checkAndRegisterWithAbortSignal(
        () => {
          throw new Error("Will never be called");
        },
        "the message for aborting",
        undefined
      );
      assert.notExists(cleanupFn);
    });

    it("abortSignal is already aborted", () => {
      abortController.abort();

      try {
        checkAndRegisterWithAbortSignal(
          () => {
            throw new Error("Will never be called");
          },
          "the message for aborting",
          abortSignal
        );
        assert.fail("Should have thrown an AbortError");
      } catch (err) {
        assert.equal(err.name, "AbortError");
        assert.equal(err.message, "the message for aborting");
      }

      assert.isTrue(abortSignal.ourListenersWereRemoved());
    });

    it("abortSignal abort calls handlers", async () => {
      let callbackWasCalled = false;
      const cleanupFn = checkAndRegisterWithAbortSignal(
        () => {
          callbackWasCalled = true;
        },
        "the message for aborting",
        abortSignal
      );
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
      const cleanupFn = checkAndRegisterWithAbortSignal(
        () => {
          callbackWasCalled = true;
        },
        "the message for aborting",
        abortSignal
      );
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
});

function getGlobalsForMocking(): any {
  if (typeof global !== "undefined") {
    // Node
    return global;
  } else if (typeof window !== "undefined") {
    // Browser
    return window;
  }
}

function getAbortSignalWithTracking(
  abortController: AbortController
): AbortSignalLike & { ourListenersWereRemoved(): boolean } {
  const signal = (abortController.signal as any) as ReturnType<typeof getAbortSignalWithTracking>;

  const allFunctions = new Set<Function>();

  const origAddEventListener = signal.addEventListener;
  const origRemoveEventListener = signal.removeEventListener;

  signal.addEventListener = (name, handler) => {
    allFunctions.add(handler);
    origAddEventListener.call(signal, name, handler);
  };

  signal.removeEventListener = (name, handler) => {
    allFunctions.delete(handler);
    origRemoveEventListener.call(signal, name, handler);
  };

  signal.ourListenersWereRemoved = () => {
    return allFunctions.size === 0;
  };
  return signal;
}
