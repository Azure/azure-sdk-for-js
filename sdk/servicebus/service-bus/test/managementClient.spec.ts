import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { delay, QueueClient, ServiceBusClient } from "../src";
import {
  TestClientType,
  getSenderReceiverClients,
  TestMessage,
  getServiceBusClient
} from "./utils/testUtils";
chai.should();
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
