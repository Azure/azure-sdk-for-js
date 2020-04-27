import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Long from "long";
import {
  delay,
  QueueClient,
  ServiceBusClient,
  TopicClient,
  SubscriptionClient,
  Receiver,
  Sender,
  ReceiveMode
} from "../src";
import {
  TestClientType,
  getSenderReceiverClients,
  TestMessage,
  getServiceBusClient
} from "./utils/testUtils";
const should = chai.should();
chai.use(chaiAsPromised);
let sbClient: ServiceBusClient;

async function afterEachTest(): Promise<void> {
  await sbClient.close();
}

describe("ManagementClient", function(): void {
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

      // Allow rhea to clear internal setTimeouts (since we're triggering idle manually).
      // Otherwise, it will get into a bad internal state with uncaught exceptions.
      await delay(2000);

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

  describe("Management operations should throw error if the Client is closed", function(): void {
    afterEach(async () => {
      return afterEachTest();
    });

    let senderClient: QueueClient | TopicClient;
    let receiverClient: QueueClient | SubscriptionClient;
    let sender: Sender;
    let receiver: Receiver;
    async function beforeEachTest(senderType: TestClientType, receiverType: TestClientType) {
      // Create the sender and receiver.
      sbClient = getServiceBusClient();
      const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
      senderClient = clients.senderClient;
      receiverClient = clients.receiverClient;
      sender = senderClient.createSender();
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
      sender;
      receiver;
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
    it.only("peek throws error after the client is closed", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await verifyClientClosedError(async () => {
        await receiverClient.close();
        await receiverClient.peek();
      }, "has been closed and can no longer be used. Please create a new client using an instance of ServiceBusClient.");
    });
    it.only("peekBySequenceNumber throws error after the client is closed", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await verifyClientClosedError(async () => {
        await receiverClient.close();
        await receiverClient.peekBySequenceNumber(new Long(0));
      }, "has been closed and can no longer be used. Please create a new client using an instance of ServiceBusClient.");
    });
    it.only("receiveDeferredMessage throws error after the client is closed", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await verifyClientClosedError(async () => {
        await receiverClient.close();
        await receiver.receiveDeferredMessage(new Long(0));
      }, "has been closed. The receiver created by it can no longer be used. Please create a new client using an instance of ServiceBusClient.");
    });
    it.only("receiveDeferredMessages throws error after the client is closed", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await verifyClientClosedError(async () => {
        await receiverClient.close();
        await receiver.receiveDeferredMessages([new Long(0)]);
      }, "has been closed. The receiver created by it can no longer be used. Please create a new client using an instance of ServiceBusClient.");
    });
    it.only("renewMessageLock throws error after the client is closed", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue, TestClientType.UnpartitionedQueue);
      await verifyClientClosedError(async () => {
        await receiverClient.close();
        await receiver.renewMessageLock();
      }, "has been closed. The receiver created by it can no longer be used. Please create a new client using an instance of ServiceBusClient.");
    });
  });
});
