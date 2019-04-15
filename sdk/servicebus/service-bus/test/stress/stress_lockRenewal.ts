/*
Test Scenario summary:
- Creates a single sender and a single receiver on a queue.
- Receives a message and holds onto it for the duration of test. AutoLockRenewal is enabled and set to the test duration.

The test assumes no other process is working with the queues defined in here,
but the queues must be empty and use default configurations before running the test.

For running this test, connection string of the Service Bus namespace and queue name
must be supplied.
*/

import {
  ServiceBusClient,
  SendableMessageInfo,
  OnMessage,
  OnError,
  delay,
  ReceiveMode,
  ServiceBusMessage
} from "../../src";

const connectionString = "";
const queueName = "";

const testDurationInMilliseconds = 60000 * 10;

let snapshotIntervalID: any;

let receivedMessage: ServiceBusMessage;

async function main(): Promise<void> {
  snapshotIntervalID = setInterval(snapshot, 60000); // Every 60 seconds
  await sendMessage();
  await receiveMessage();
}

async function sendMessage(): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);
  const client = ns.createQueueClient(queueName);
  try {
    const sender = client.createSender();

    const message: SendableMessageInfo = {
      messageId: "test",
      body: "test",
      label: `test`
    };

    await sender.send(message);
  } finally {
    await client.close();
    await ns.close();
  }
}

async function receiveMessage(): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);
  const client = ns.createQueueClient(queueName);

  try {
    const receiver = client.createReceiver(ReceiveMode.peekLock);
    const onMessageHandler: OnMessage = async (brokeredMessage) => {
      receivedMessage = brokeredMessage;
      if (receivedMessage.messageId !== "test") {
        throw new Error("Message is corrupt or unexpected");
      }
      console.log("Received message: ", receivedMessage.messageId);

      await delay(testDurationInMilliseconds);
      await brokeredMessage.complete();
      console.log("Completed message: ", receivedMessage.messageId);
    };

    const onErrorHandler: OnError = (err) => {
      throw err;
    };

    receiver.registerMessageHandler(onMessageHandler, onErrorHandler, {
      autoComplete: false,
      maxMessageAutoRenewLockDurationInSeconds: testDurationInMilliseconds / 1000
    });

    await delay(testDurationInMilliseconds + 5000);
    await receiver.close();
  } finally {
    await client.close();
    await ns.close();
    clearInterval(snapshotIntervalID);
  }
}

function snapshot(): void {
  console.log("Time : ", new Date());
  console.log("Processing message:");
  console.log("MessageId: ", receivedMessage.messageId);
  console.log("Delivery count: ", receivedMessage.deliveryCount);
  console.log("LockedUntilUTC: ", receivedMessage.lockedUntilUtc);
  console.log("Sequence number: ", receivedMessage.sequenceNumber);
  console.log("TimeToLive: ", receivedMessage.timeToLive);
  console.log("Message content: ", receivedMessage);
  console.log("\n");
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
