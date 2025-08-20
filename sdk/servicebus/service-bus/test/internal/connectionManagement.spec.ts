// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/* to be enable if sender.open() comes back to life;
import { afterEach, beforeEach, describe, it } from "vitest";
import { delay } from "@azure/core-amqp";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
} from "../public/utils/testutils2.js";
import { defaultCancellableLock } from "@azure/core-amqp";
import { TestClientType } from "../public//utils/testUtils.js";
import { ServiceBusSenderImpl } from "$internal/sender.js";
import { assert } from "../public/utils/chai.js";

describe("controlled connection initialization", () => {
  let sender: ServiceBusSenderImpl;
  let senderEntityPath: string;
  let serviceBusClient: ServiceBusClientForTests;

  beforeEach(async () => {
    serviceBusClient = createServiceBusClientForTests();

    // there's nothing entity specific about what I'm doing here so it can be any
    // entity...
    const { queue } = await serviceBusClient.test.createTestEntities(
      TestClientType.UnpartitionedQueue,
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
    await defaultCancellableLock.acquire(
      sender["_sender"]["_openLock"],
      async () => {
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
      },
      {
        abortSignal: undefined,
        timeoutInMs: undefined,
      },
    );

    // now that we're outside of the lock we can await on the Promise and it should proceed
    try {
      await secondOpenCallPromise;
      assert.fail("Should have thrown once we reached our stubbed out _negotiateClaim() call");
    } catch (err: any) {
      assert.equal(err.message, "We won't get here until _after_ the lock has been released");
    }
  });

  it("open() doesn't re-open a sender when it's been close()'d", async () => {
    // we can't revive a sender.
    await sender.close();

    try {
      await sender.open();
      assert.fail("Should have thrown once we reached our stubbed out _negotiateClaim() call");
    } catch (err: any) {
      assert.equal(
        err.message,
        `The sender for "${senderEntityPath}" has been closed and can no longer be used. Please create a new sender using the "createSender" method on the ServiceBusClient.`,
      );
    }
  });
});

function delayThatReturns999(): Promise<number | void> {
  const ac = new AbortController();
  return delay(1000, ac.signal, "ignored", 999);
}
*/
