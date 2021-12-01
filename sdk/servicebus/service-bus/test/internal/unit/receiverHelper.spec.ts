// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Receiver, ReceiverEvents } from "rhea-promise";
import { ReceiverHelper } from "../../../src/core/receiverHelper";
import { assertThrows } from "../../public/utils/testUtils";
import { createRheaReceiverForTests } from "./unittestUtils";
chai.use(chaiAsPromised);
const assert = chai.assert;

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
    }
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
      }
    };

    return (fakeOpenReceiver as any) as Receiver & { _addedCredits: number };
  };

  it("addCredit works with a non-suspended open receiver", () => {
    const receiver = openReceiver();
    const helper = new ReceiverHelper(() => ({
      receiver,
      logPrefix: "whatever"
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
      logPrefix: "whatever"
    }));

    await assertThrows(async () => helper.addCredit(101), {
      name: "ServiceBusError",
      code: "GeneralError",
      message: "Cannot request messages on the receiver since it is undefined.",
      retryable: true
    });

    helper = new ReceiverHelper(() => ({
      receiver: closedReceiver,
      logPrefix: "whatever"
    }));

    await assertThrows(async () => helper.addCredit(101), {
      name: "ServiceBusError",
      code: "GeneralError",
      message: "Cannot request messages on the receiver since it is not open.",
      retryable: true
    });

    const receiver = openReceiver();
    helper = new ReceiverHelper(() => ({
      receiver: receiver,
      logPrefix: "whatever"
    }));

    await helper.suspend();

    await assertThrows(async () => helper.addCredit(101), {
      name: "AbortError",
      message: "Cannot request messages on the receiver since it is suspended.",
      retryable: undefined
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
});
