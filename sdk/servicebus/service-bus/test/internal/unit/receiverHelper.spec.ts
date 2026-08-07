// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import type { Receiver } from "rhea-promise";
import { OperationTimeoutError, ReceiverEvents, delay } from "rhea-promise";
import { ReceiverHelper } from "../../../src/core/receiverHelper.js";
import { assertThrows } from "../../public/utils/testUtils.js";
import { createRheaReceiverForTests } from "./unittestUtils.js";
import { describe, it } from "vitest";
import { assert } from "../../public/utils/chai.js";

describe("ReceiverHelper unit tests", () => {
  const closedReceiver = {
    isOpen(): boolean {
      return false;
    },
    toString(): string {
      return "a closed receiver";
    },
    addCredit: (_credits: number): void => {
      throw new Error("Should never be called");
    },
  } as Receiver;

  const openReceiver = (): Receiver & { _addedCredits: number } => {
    const fakeOpenReceiver = {
      _addedCredits: 0,
      credit: 0,
      isOpen(): boolean {
        return true;
      },
      addCredit: (credits: number): void => {
        fakeOpenReceiver._addedCredits += credits;
      },
    };

    return fakeOpenReceiver as any as Receiver & { _addedCredits: number };
  };

  it("addCredit works with a non-suspended open receiver", () => {
    const receiver = openReceiver();
    const helper = new ReceiverHelper(() => ({
      receiver,
      logPrefix: "whatever",
    }));

    // the one case that should work
    helper.resume();
    helper.addCredit(101);
    assert.equal(receiver._addedCredits, 101);
  });

  it("addCredit throws if the underlying receiver is invalid for a variety of conditions", async () => {
    // and now the various failure cases.
    let helper = new ReceiverHelper(() => ({
      receiver: undefined,
      logPrefix: "whatever",
    }));

    await assertThrows(async () => helper.addCredit(101), {
      name: "ServiceBusError",
      code: "GeneralError",
      message: "Cannot request messages on the receiver since it is undefined.",
      retryable: true,
    });

    helper = new ReceiverHelper(() => ({
      receiver: closedReceiver,
      logPrefix: "whatever",
    }));

    await assertThrows(async () => helper.addCredit(101), {
      name: "ServiceBusError",
      code: "GeneralError",
      message: "Cannot request messages on the receiver since it is not open.",
      retryable: true,
    });

    const receiver = openReceiver();
    helper = new ReceiverHelper(() => ({
      receiver: receiver,
      logPrefix: "whatever",
    }));

    await helper.suspend();

    await assertThrows(async () => helper.addCredit(101), {
      name: "AbortError",
      message: "Cannot request messages on the receiver since it is suspended.",
      retryable: undefined,
    });
  });

  it("operations on an open receiver", async () => {
    const receiver = createRheaReceiverForTests();
    const helper = new ReceiverHelper(() => ({ receiver, logPrefix: "hello" }));

    let drainWasCalled = false;

    receiver.on(ReceiverEvents.receiverDrained, () => {
      drainWasCalled = true;
    });

    // we can explicitly drain
    helper.resume();
    helper.addCredit(101);

    await helper.drain();
    assert.isTrue(drainWasCalled);
    assert.isFalse(receiver.drain);

    assert.equal(receiver.credit, 0, "Credits should be completely drained.");

    // or we can drain as part of suspending a receiver.
    drainWasCalled = false;
    helper.addCredit(101);

    await helper.suspend();
    assert.isTrue(helper["_isSuspended"]);
    assert.isTrue(drainWasCalled);
    assert.isFalse(receiver.drain);
    assert.equal(receiver.credit, 0);

    helper.resume();
    assert.isFalse(helper["_isSuspended"]);
    helper.addCredit(101);
    assert.equal(receiver.credit, 101);
  });

  it("resolves from suspend() when drain is blocking ", async () => {
    const receiver = createRheaReceiverForTests();
    const helper = new ReceiverHelper(() => ({ receiver, logPrefix: "hello" }));

    (receiver as any)["_link"]["drain_credit"] = () => {
      (receiver as any).credit = 0;
      // not emitting the `receiverDrained` event
    };
    let drainWasCalled = false;

    receiver.on(ReceiverEvents.receiverDrained, () => {
      drainWasCalled = true;
    });

    // we can explicitly drain
    helper.resume();
    helper.addCredit(101);

    await Promise.race([
      helper.drain(),
      delay(2000).then(() => {
        throw new Error("Test failed. helper.drain() should have already resolved.");
      }),
    ]);

    assert.isFalse(drainWasCalled);
  });

  it("does not leak an unhandled rejection when close() rejects after a drain timeout (#39348)", async () => {
    const receiver = createRheaReceiverForTests();
    const helper = new ReceiverHelper(() => ({ receiver, logPrefix: "hello" }));

    // Force the drain-timeout path: draining never emits `receiverDrained`, so the
    // timeout callback that closes the receiver runs.
    (receiver as any)["_link"]["drain_credit"] = () => {
      (receiver as any).credit = 0;
      // not emitting the `receiverDrained` event
    };

    // Simulate a real AMQP session-close timeout.
    const closeError = new OperationTimeoutError(
      "Unable to close the amqp session local-1_remote-1_connection-2 due to operation timeout.",
    );
    let closeCalled = false;
    receiver.close = async (): Promise<void> => {
      closeCalled = true;
      throw closeError;
    };

    const unhandled: unknown[] = [];
    const onUnhandled = (reason: unknown): void => {
      unhandled.push(reason);
    };
    process.on("unhandledRejection", onUnhandled);
    try {
      helper.resume();
      helper.addCredit(101);

      // drain() must still resolve (not hang) even though close() rejects inside the
      // drain-timeout callback. Pre-fix, resolve() sat after the unguarded `await close()`,
      // so a rejection left drainPromise unresolved and this raced to the delay() failure.
      await Promise.race([
        helper.drain(),
        delay(2000).then(() => {
          throw new Error(
            "Test failed. helper.drain() should have resolved despite close() rejecting.",
          );
        }),
      ]);

      // Give any floating rejection a chance to surface before asserting.
      await delay(50);
    } finally {
      process.removeListener("unhandledRejection", onUnhandled);
    }

    assert.isTrue(closeCalled, "close() should be attempted after the drain timeout");
    assert.deepEqual(
      unhandled,
      [],
      "close() rejection must be caught, not leaked as an unhandled rejection (#39348)",
    );
  });
});
