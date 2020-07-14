import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Long from "long";
import {
  QueueClient,
  ServiceBusClient,
  TopicClient,
  SubscriptionClient,
  Receiver,
  Sender,
  ReceiveMode,
  SessionReceiver
} from "../src";
import {
  TestClientType,
  getSenderReceiverClients,
  TestMessage,
  getServiceBusClient,
  isSessionfulEntity
} from "./utils/testUtils";
import { ManagementClient } from "../src/core/managementClient";
import { DispositionStatus } from "../src/serviceBusMessage";
const should = chai.should();
chai.use(chaiAsPromised);
let sbClient: ServiceBusClient;

async function afterEachTest(): Promise<void> {
  await sbClient.close();
}

describe("ManagementClient - disconnects", function(): void {
  afterEach(async () => {
    return afterEachTest();
  });

  it("can receive and settle messages after a disconnect", async function(): Promise<void> {
    // Create the sender and receiver.
    sbClient = getServiceBusClient();
    const { receiverClient, senderClient } = await getSenderReceiverClients(
      sbClient,
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue
    );
    const sender = senderClient.createSender();
    // Send a message so we have something to peek.

    await sender.sendBatch([TestMessage.getSample(), TestMessage.getSample()]);

    let peekedMessageCount = 0;
    let messages = await receiverClient.peek(1);
    peekedMessageCount += messages.length;

    peekedMessageCount.should.equal(1, "Unexpected number of peeked messages.");

    const connectionContext = (receiverClient as QueueClient)["_context"].namespace;
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    connectionContext.connection["_connection"].idle();

    // peek additional messages
    messages = await receiverClient.peek(1);
    peekedMessageCount += messages.length;
    peekedMessageCount.should.equal(2, "Unexpected number of peeked messages.");

    refreshConnectionCalled.should.be.greaterThan(0, "refreshConnection was not called.");
  });

  it("schedule can receive and settle messages after a disconnect", async function(): Promise<
    void
  > {
    // Create the sender and receiver.
    sbClient = getServiceBusClient();
    const { receiverClient, senderClient } = await getSenderReceiverClients(
      sbClient,
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue
    );
    const sender = senderClient.createSender();
    // Send a message so we have something to peek.

    const deliveryIds = [];
    let deliveryId = await sender.scheduleMessage(
      new Date("2020-04-25T12:00:00Z"),
      TestMessage.getSample()
    );
    deliveryIds.push(deliveryId);

    deliveryIds.length.should.equal(1, "Unexpected number of scheduled messages.");

    const connectionContext = (receiverClient as QueueClient)["_context"].namespace;
    const refreshConnection = connectionContext.refreshConnection;
    let refreshConnectionCalled = 0;
    connectionContext.refreshConnection = function(...args) {
      refreshConnectionCalled++;
      refreshConnection.apply(this, args);
    };

    // Simulate a disconnect being called with a non-retryable error.
    connectionContext.connection["_connection"].idle();

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

describe("Management operations should throw error if the Client is closed", function(): void {
  afterEach(async () => {
    return afterEachTest();
  });

  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;

  const clientClosedErrMessage =
    "has been closed and can no longer be used. Please create a new client using an instance of ServiceBusClient.";
  async function beforeEachTest(senderType: TestClientType, receiverType: TestClientType) {
    // Create the sender and receiver.
    sbClient = getServiceBusClient();
    const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;
    sender = senderClient.createSender();
    receiver = isSessionfulEntity(receiverType)
      ? receiverClient.createReceiver(ReceiveMode.peekLock, { sessionId: "session-id" })
      : receiverClient.createReceiver(ReceiveMode.peekLock);
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
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.peek();
    }, clientClosedErrMessage);
  });

  it("peekBySequenceNumber throws error after the client is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.peekBySequenceNumber(new Long(0));
    }, clientClosedErrMessage);
  });

  it("receiveDeferredMessages throws error after the client is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.receiveDeferredMessages([new Long(0)], ReceiveMode.peekLock);
    }, clientClosedErrMessage);
  });

  it("renewMessageLock throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.renewLock("");
    }, clientClosedErrMessage);
  });

  it("renewSessionLock throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.renewSessionLock(TestMessage.sessionId);
    }, clientClosedErrMessage);
  });

  it("getState throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.getSessionState(TestMessage.sessionId);
    }, clientClosedErrMessage);
  });

  it("setState throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedQueueWithSessions,
      TestClientType.UnpartitionedQueueWithSessions
    );
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.setSessionState(TestMessage.sessionId, "random");
    }, clientClosedErrMessage);
  });

  it("addRule throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.addRule("random", "1=1");
    }, clientClosedErrMessage);
  });

  it("removeRule throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.removeRule("random");
    }, clientClosedErrMessage);
  });

  it("getRule throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.getRules();
    }, clientClosedErrMessage);
  });

  it("updateDispositionStatus throws error after the client is closed", async function(): Promise<
    void
  > {
    await beforeEachTest(
      TestClientType.UnpartitionedTopic,
      TestClientType.UnpartitionedSubscription
    );
    await verifyClientClosedError(async () => {
      await sender.send({ body: "random message" });
      const msg = (await receiver.receiveMessages(1))[0];
      const preservedMgmtClient: ManagementClient = (receiverClient as any)["_context"]
        .managementClient;
      await receiverClient.close();
      await preservedMgmtClient.updateDispositionStatus(
        msg.lockToken!,
        DispositionStatus.completed
      );
    }, clientClosedErrMessage);
  });

  it("schedule throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (senderClient as any)["_context"]
        .managementClient;
      await senderClient.close();
      await preservedMgmtClient.scheduleMessages(new Date(), [{ body: "random message" }]);
    }, clientClosedErrMessage);
  });

  it("cancel-scheduled throws error after the client is closed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
    await verifyClientClosedError(async () => {
      const preservedMgmtClient: ManagementClient = (senderClient as any)["_context"]
        .managementClient;
      await senderClient.close();
      await preservedMgmtClient.cancelScheduledMessages([new Long(0)]);
    }, clientClosedErrMessage);
  });
});
