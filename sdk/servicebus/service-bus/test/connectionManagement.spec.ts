// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const assert = chai.assert;
import chaiAsPromised from "chai-as-promised";
import { delay } from "../src";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { defaultLock } from "@azure/core-amqp";
import { TestClientType } from "./utils/testUtils";
import { ServiceBusSenderImpl } from "../src/sender";
import { AbortController } from "@azure/abort-controller";

chai.use(chaiAsPromised);

describe("controlled connection initialization", () => {
  let sender: ServiceBusSenderImpl;
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

    // casting because I need access to 'open' and the return type of createSender() is an
    // interface.
    sender = serviceBusClient.createSender(queue!) as ServiceBusSenderImpl;
    senderEntityPath = queue!;
  });

  afterEach(async () => {
    await serviceBusClient.test.afterEach();
    // Cleaning the client as well since we are using a new client for each test
    await serviceBusClient.test.after();
  });

  it("open() properly locks to prevent multiple in-flight open() calls", async () => {
    // open uses a lock (at the sender level) that helps us not to have overlapping open() calls.
    let secondOpenCallPromise: Promise<void> | undefined;

    // acquire the same lock that open() uses and then, while it's 100% locked,
    // attempt to call .open() and see that it just blocks...
    await defaultLock.acquire(sender["_sender"]["_openLock"], async () => {
      // we need to fake the connection being closed or else `open()` won't attempt to acquire
      // the lock.
      sender["_sender"]["isOpen"] = () => false;

      sender["_sender"]["_negotiateClaim"] = async () => {
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

  it("open() doesn't re-open a sender when it's been close()'d", async () => {
    // we can't revive a sender.
    await sender.close();

    try {
      await sender.open();
      assert.fail("Should have thrown once we reached our stubbed out _negotiateClaim() call");
    } catch (err) {
      assert.equal(
        err.message,
        `The sender for "${senderEntityPath}" has been closed and can no longer be used. Please create a new sender using the "createSender" method on the ServiceBusClient.`
      );
    }
  });
});

function delayThatReturns999(): Promise<void> | Promise<number> {
  const ac = new AbortController();
  return delay(1000, ac.signal, "ignored", 999);
}
