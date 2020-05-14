import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { delay, Sender, Receiver, ReceivedMessageWithLock, SessionReceiver } from "../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  EntityName
} from "./utils/testutils2";
import { isNode } from "@azure/core-amqp";
import Long from "long";
import { ReceiveMode, DispositionType } from "../src/serviceBusMessage";
import { ReceiverImpl } from "../src/receivers/receiver";
import {
  getReceiverClosedErrorMsg,
  getSubscriptionRuleManagerClosedErrorMsg,
  getSenderClosedErrorMsg
} from "../src/util/errors";
import { SenderImpl } from "../src/sender";
const should = chai.should();
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

describe("Management operations should throw error if the ClientEntityContext is closed", function(): void {
  afterEach(async () => {
    await sbClient.test.after();
  });
  let sbClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock> | SessionReceiver<ReceivedMessageWithLock>;
  let entityNames: EntityName;
  async function beforeEachTest(entityType: TestClientType) {
    // Create the sender and receiver.
    sbClient = createServiceBusClientForTests();
    entityNames = await sbClient.test.createTestEntities(entityType);
    receiver = await sbClient.test.getPeekLockReceiver(entityNames);

    sender = sbClient.test.addToCleanup(
      await sbClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }
  async function verifyClientClosedError(func: Function, partialErrorMsg: string) {
    let errorWasThrown = false;
    try {
      await func();
    } catch (error) {
      should.equal(
        (error.message as string).includes(partialErrorMsg),
        true,
        `Unexpected Error Message - ${error.message}`
      );
      errorWasThrown = true;
    }
    should.equal(errorWasThrown, true, "Error wasn't thrown");
  }

  it("peek throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.peek();
    }, getReceiverClosedErrorMsg(entityNames.queue!));

    // Just to make sure that the new managementClient is usable
    receiver = sbClient.test.addToCleanup(sbClient.createReceiver(entityNames.queue!, "peekLock"));
    sender = sbClient.test.addToCleanup(await sbClient.createSender(entityNames.queue!));
    await sender.send({ body: "random-message" });
    (await receiver.browseMessages()).length.should.equal(
      1,
      "BrowseMessages gave unexpected number of messages"
    );
    await (await receiver.receiveBatch(1))[0].complete();
  });

  it("peekBySequenceNumber throws error after the client is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.peekBySequenceNumber(new Long(0));
    }, getReceiverClosedErrorMsg(entityNames.queue!));
  });

  it("receiveDeferredMessages throws error after the client is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.receiveDeferredMessages([new Long(0)], ReceiveMode.peekLock);
    }, getReceiverClosedErrorMsg(entityNames.queue!));
  });

  it("renewSessionLock throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.renewSessionLock(TestMessage.sessionId);
    }, getReceiverClosedErrorMsg(entityNames.queue!, TestMessage.sessionId));
  });

  it("getState throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.getSessionState(TestMessage.sessionId);
    }, getReceiverClosedErrorMsg(entityNames.queue!, TestMessage.sessionId));
  });

  it("setState throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.setSessionState(TestMessage.sessionId, "random");
    }, getReceiverClosedErrorMsg(entityNames.queue!, TestMessage.sessionId));
  });

  it("addRule throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.addRule("random", "1=1");
    }, getSubscriptionRuleManagerClosedErrorMsg(`${entityNames.topic!}/Subscriptions/${entityNames.subscription!}`));
  });

  it("removeRule throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.removeRule("random");
    }, getSubscriptionRuleManagerClosedErrorMsg(`${entityNames.topic!}/Subscriptions/${entityNames.subscription!}`));
  });

  it("getRule throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await verifyClientClosedError(async () => {
      const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
      const preservedMgmtClient = receiverContext.managementClient;
      const clientId = receiverContext.clientId;
      await receiverContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.getRules();
    }, getSubscriptionRuleManagerClosedErrorMsg(`${entityNames.topic!}/Subscriptions/${entityNames.subscription!}`));
  });

  it("renewMessageLock should not throw error after the client is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await sender.send({ body: "random message" });
    const msg = (await receiver.receiveBatch(1))[0];
    const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
    const preservedMgmtClient = receiverContext.managementClient;
    const clientId = receiverContext.clientId;
    await receiverContext.namespace.clientContexts[clientId].close();
    await preservedMgmtClient!.renewLock(msg.lockToken!);
  });

  it("updateDispositionStatus should not throw error after the client is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await sender.send({ body: "random message" });
    const msg = (await receiver.receiveBatch(1))[0];
    const receiverContext = (receiver as ReceiverImpl<ReceivedMessageWithLock>)["_context"];
    const preservedMgmtClient = receiverContext.managementClient;
    const clientId = receiverContext.clientId;
    await receiverContext.namespace.clientContexts[clientId].close();
    await preservedMgmtClient!.updateDispositionStatus(msg.lockToken!, DispositionType.complete);
  });

  // TODO: Fix this test, not sure why the error isn't thrown
  it("schedule throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const senderContext = (sender as SenderImpl)["_context"];
      const preservedMgmtClient = senderContext.managementClient;
      const clientId = senderContext.clientId;
      await senderContext.namespace.clientContexts[clientId].close();
      console.log(sender.isClosed);
      await preservedMgmtClient!.scheduleMessages(new Date(), [{ body: "random message" }]);
    }, getSenderClosedErrorMsg(entityNames.queue!));
  });

  // TODO: Fix this test, not sure why the error isn't thrown
  it("cancel-scheduled throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const senderContext = (sender as SenderImpl)["_context"];
      const preservedMgmtClient = senderContext.managementClient;
      const clientId = senderContext.clientId;
      await senderContext.namespace.clientContexts[clientId].close();
      await preservedMgmtClient!.cancelScheduledMessages([new Long(0)]);
    }, getSenderClosedErrorMsg(entityNames.queue!));
  });
});
