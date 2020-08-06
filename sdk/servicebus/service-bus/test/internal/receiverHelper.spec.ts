// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { Receiver, ReceiverEvents } from "rhea-promise";
import { ReceiverHelper } from "../../src/core/receiverHelper";
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
    }
  } as Receiver;

  [undefined, closedReceiver].forEach((invalidReceiver: Receiver | undefined) => {
    /**
     * Even if the underlying receiver is invalid we still track the logical state of the receiver.
     *
     * Note that since all the relevant methods are non-existent that any usage of the receiver
     * in an invalid way would just result in a crash in this test which is why I don't have much
     * checking.
     */
    it(`operations on an invalid receiver should just no-op harmlessly: ${invalidReceiver}`, async () => {
      const helper = new ReceiverHelper(() => invalidReceiver);

      assert.isFalse(helper.addCredit(101));
      await helper.drain();

      await helper.suspend();
      assert.isTrue(helper["_isSuspended"]);

      helper.resume();
      // our internal state is now set so we can receive messages but...
      assert.isFalse(helper["_isSuspended"]);
      // ...we still won't _because_ the receiver is not open.
      assert.isFalse(
        helper.canReceiveMessages(),
        "We still can't receive messages because the receiver is either invalid _or_ isn't open"
      );

      // should still do nothing.
      helper.addCredit(101);
    });
  });

  it("operations on an open receiver", async () => {
    const receiver = createRheaReceiverForTests();
    const helper = new ReceiverHelper(() => receiver);

    let drainWasCalled = false;

    receiver.on(ReceiverEvents.receiverDrained, () => {
      drainWasCalled = true;
    });

    // we can explicitly drain
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

    // if we suspend() a receiver it will no longer have credits added.
    helper.addCredit(101);
    assert.equal(
      receiver.credit,
      0,
      "when a receiver is suspended the addCredit() calls do nothing"
    );

    helper.resume();
    assert.isFalse(helper["_isSuspended"]);
    helper.addCredit(101);
    assert.equal(receiver.credit, 101);
  });
});
