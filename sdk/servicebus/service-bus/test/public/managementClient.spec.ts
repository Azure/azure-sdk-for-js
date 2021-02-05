// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { ServiceBusSender, ServiceBusReceiver } from "../../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
chai.should();
chai.use(chaiAsPromised);

describe("ManagementClient - disconnects", function(): void {
  let serviceBusClient: ServiceBusClientForTests;
  let sender: ServiceBusSender;
  let receiver: ServiceBusReceiver;

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }
  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
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

    await sender.sendMessages(TestMessage.getSample());
    await sender.sendMessages(TestMessage.getSample());

    let peekedMessageCount = 0;
    let messages = await receiver.peekMessages(1);
    peekedMessageCount += messages.length;

    peekedMessageCount.should.equal(1, "Unexpected number of peeked messages.");

    const connectionContext = (receiver as any)["_context"];
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args: any) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    connectionContext.connection["_connection"].idle();

    // peek additional messages
    messages = await receiver.peekMessages(1);
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

    const deliveryIds = await sender.scheduleMessages(
      TestMessage.getSample(),
      new Date("2020-04-25T12:00:00Z")
    );

    deliveryIds.length.should.equal(1, "Unexpected number of scheduled messages.");

    const connectionContext = (receiver as any)["_context"];
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args: any) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    connectionContext.connection["_connection"].idle();

    // peek additional messages
    const [deliveryId] = await sender.scheduleMessages(
      TestMessage.getSample(),
      new Date("2020-04-25T12:00:00Z")
    );
    deliveryIds.push(deliveryId);
    deliveryIds.length.should.equal(2, "Unexpected number of scheduled messages.");

    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });
});
