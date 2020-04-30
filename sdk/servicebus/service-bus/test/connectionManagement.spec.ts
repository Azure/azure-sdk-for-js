// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const assert = chai.assert;
import chaiAsPromised from "chai-as-promised";
import { delay, Receiver, ReceivedMessageWithLock } from "../src";
import { createServiceBusClientForTests, ServiceBusClientForTests } from "./utils/testutils2";
import { defaultLock } from "@azure/core-amqp";
import { TestClientType } from "./utils/testUtils";
import { SenderImpl } from "../src/sender";
import { AbortController } from "@azure/abort-controller";

const should = chai.should();
chai.use(chaiAsPromised);

describe("controlled connection initialization", () => {
  let closeAll: () => Promise<void>;
  let sender: SenderImpl;
  let receiver: Receiver<ReceivedMessageWithLock>;
  let senderEntityPath: string;
  let serviceBusClient: ServiceBusClientForTests;

  beforeEach(async () => {
    serviceBusClient = createServiceBusClientForTests();

    // there's nothing entity specific about what I'm doing here so it can be any
    // entity...
    const { queue } = await serviceBusClient.test.createTestEntities(
      TestClientType.UnpartitionedQueue
    );

    if (queue == null) {
      throw new Error("queue name should not be null");
    }

    sender = (await serviceBusClient.createSender(queue!)) as SenderImpl;
    senderEntityPath = queue!;

    receiver = serviceBusClient.createReceiver(queue!, "peekLock");

    closeAll = async () => {
      await sender.close();
      await sender.close();
      await receiver.close();
      await serviceBusClient?.close();
    };
  });

  afterEach(async () => {
    if (closeAll) {
      await closeAll();
    }
  });

  it("non-lazy init", async () => {
    should.equal(sender["_context"].sender?.isOpen(), true);
    await checkThatInitializationDoesntReoccur(sender);
  });

  it("open() early exits if the connection is already open (avoid taking unnecessary lock)", async () => {
    // open uses a lock (at the sender level) that helps us not call open() multiple times.

    // open it just to initialize everything.
    // I'd like to migrate these tests into MessageSender but the cost of "faking" a ClientEntityContext is a bit too high.
    await sender.open();

    await defaultLock.acquire(sender["_context"]!.sender!["openLock"], async () => {
      // the connection is _already_ open so it doesn't attempt to take a lock
      // or actually try to open the connection.
      const secondOpenCallPromise = sender.open();

      sender["_context"].sender!["_negotiateClaim"] = async () => {
        // this is a decent way to tell that we tried to open the connection
        throw new Error(
          "We won't get here at all - the connection is already open so we'll early exit."
        );
      };

      const ret = await Promise.race([delayThatReturns999(), secondOpenCallPromise]);

      // ie, the Promise<void> from sender.open() 'won' because we don't
      // acquire the lock when we early-exit.
      assert.notExists(ret);
    });
  });

  it("open() properly locks to prevent multiple in-flight open() calls", async () => {
    // open uses a lock (at the sender level) that helps us not call open() multiple times.

    // open it just to initialize everything.
    // I'd like to migrate these tests into MessageSender but the cost of "faking" a ClientEntityContext is a bit too high.
    await sender.open();

    let secondOpenCallPromise: Promise<void> | undefined;

    // acquire the same lock that open() uses and then, while it's 100% locked,
    // attempt to call .open() and see that it just blocks...
    await defaultLock.acquire(sender["_context"]!.sender!["openLock"], async () => {
      // we need to fake the connection being closed or else `open()` won't attempt to acquire
      // the lock.
      sender["_context"].sender!["isOpen"] = () => false;
      sender["_context"].sender!["_negotiateClaim"] = async () => {
        // this is a decent way to tell that we tried to open the connection
        throw new Error("We won't get here until _after_ the lock has been released");
      };

      secondOpenCallPromise = sender.open();
      const ret = await Promise.race([delayThatReturns999(), secondOpenCallPromise]);

      // this time the delay() call wins since our open() call is blocked on the lock internally
      assert.equal(typeof ret, "number");
    });

    // now that we're outside of the lock we can await on the Promise and it should proceed
    try {
      await secondOpenCallPromise;
      assert.fail("Should have thrown once we reached our stubbed out _negotiateClaim() call");
    } catch (err) {
      assert.equal(err.message, "We won't get here until _after_ the lock has been released");
    }
  });

  it("open() doesn't re-open a sender (or anything)", async () => {
    // open it just to initialize everything.
    // I'd like to migrate these tests into MessageSender but the cost of "faking" a ClientEntityContext is a bit too high.
    await sender.open();

    // we can't revive a sender.
    await sender.close();

    try {
      await sender.open();
      assert.fail("Should have thrown once we reached our stubbed out _negotiateClaim() call");
    } catch (err) {
      assert.equal(
        err.message,
        `The sender for "${senderEntityPath}" has been closed and can no longer be used. Please create a new sender using the "getSender" method on the ServiceBusClient.`
      );
    }
  });
});

function delayThatReturns999(): Promise<void> | Promise<number> {
  const ac = new AbortController();
  return delay(1000, ac.signal, "ignored", 999);
}

async function checkThatInitializationDoesntReoccur(sender: SenderImpl) {
  should.exist(sender["_context"].sender!["_negotiateClaim"]);
  assert.isTrue(sender["_context"].sender!["isOpen"](), "The connection is actually open()");

  // stub out the `MessageSender` methods that handle initializing the
  // connection - now that everything is up we should always see that it
  // takes the "early exit" path when it sees that the connection is open
  let negotiateClaimWasCalled = false;

  // now we'll just fake the rest
  let isOpenWasCalled = false;

  sender["_context"].sender!["isOpen"] = () => {
    isOpenWasCalled = true;
    return true;
  };

  sender["_context"].sender!["_negotiateClaim"] = async () => {
    negotiateClaimWasCalled = true;
  };

  await sender.send({
    body: "sending another message just to prove the connection checks work"
  });

  assert.isTrue(isOpenWasCalled, "we should have checked that the connection was open");
  assert.isFalse(
    negotiateClaimWasCalled,
    "we should NOT have tried to _negotiateClaim since the connection was open"
  );
}
