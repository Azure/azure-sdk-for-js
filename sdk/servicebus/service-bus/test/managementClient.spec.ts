// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ReceivedMessageWithLock, Receiver, Sender, delay } from "../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { isNode } from "@azure/core-amqp";
chai.should();
chai.use(chaiAsPromised);

describe("ManagementClient - disconnects", function(): void {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock>;

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

    sender = serviceBusClient.test.addToCleanup(
      await serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }
  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  beforeEach(function() {
    if (!isNode) {
      // Skipping the "disconnect" tests in the browser since they fail.
      // More info - https://github.com/Azure/azure-sdk-for-js/pull/8664#issuecomment-622651713
      this.skip();
    }
  });

  function afterEachTest(): Promise<void> {
    return serviceBusClient.test.afterEach();
  }
  afterEach(async () => {
    await afterEachTest();
  });

  it("can receive and settle messages after a disconnect", async function(): Promise<void> {
    // Create the sender and receiver.
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    // Send a message so we have something to peek.

    await sender.send(TestMessage.getSample());
    await sender.send(TestMessage.getSample());

    let peekedMessageCount = 0;
    let messages = await receiver.browseMessages({ maxMessageCount: 1 });
    peekedMessageCount += messages.length;

    peekedMessageCount.should.equal(1, "Unexpected number of peeked messages.");

    const connectionContext = (receiver as any)["_context"].namespace;
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args: any) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    connectionContext.connection["_connection"].idle();

    // Allow rhea to clear internal setTimeouts (since we're triggering idle manually).
    // Otherwise, it will get into a bad internal state with uncaught exceptions.
    await delay(2000);

    // peek additional messages
    messages = await receiver.browseMessages({ maxMessageCount: 1 });
    peekedMessageCount += messages.length;
    peekedMessageCount.should.equal(2, "Unexpected number of peeked messages.");

    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });

  it("schedule can receive and settle messages after a disconnect", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    // Send a message so we have something to peek.

    const deliveryIds = [];
    let deliveryId = await sender.scheduleMessage(
      new Date("2020-04-25T12:00:00Z"),
      TestMessage.getSample()
    );
    deliveryIds.push(deliveryId);

    deliveryIds.length.should.equal(1, "Unexpected number of scheduled messages.");

    const connectionContext = (receiver as any)["_context"].namespace;
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args: any) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    connectionContext.connection["_connection"].idle();

    // Allow rhea to clear internal setTimeouts (since we're triggering idle manually).
    // Otherwise, it will get into a bad internal state with uncaught exceptions.
    await delay(2000);

    // peek additional messages
    deliveryId = await sender.scheduleMessage(
      new Date("2020-04-25T12:00:00Z"),
      TestMessage.getSample()
    );
    deliveryIds.push(deliveryId);
    deliveryIds.length.should.equal(2, "Unexpected number of scheduled messages.");

    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });
});
