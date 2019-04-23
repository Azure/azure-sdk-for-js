/*
Test Scenario summary:
- Creates a single sender and a single receiver on a session enabled queue.
- Receives a message and holds onto it for the duration of test. AutoLockRenewal on session is enabled and set to the test duration.

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

let elapsedTime = 0;
const interval = 60000;
const testDurationInMilliseconds = 60000 * 5 * 12 * 24; // 24 hours

let receivedMessage: ServiceBusMessage;

async function main(): Promise<void> {
  await sendMessage("session-1");
  await receiveMessage("session-1");
}

async function sendMessage(sessionId: string): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);
  const client = ns.createQueueClient(queueName);
  try {
    const sender = client.createSender();

    const message: SendableMessageInfo = {
      messageId: "test",
      body: "test",
      label: `test`,
      sessionId: sessionId
    };

    await sender.send(message);
  } finally {
    await client.close();
    await ns.close();
  }
}

async function receiveMessage(sessionId: string): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);
  const client = ns.createQueueClient(queueName);

  try {
    const receiver = client.createReceiver(ReceiveMode.peekLock, {
      sessionId: sessionId,
      maxSessionAutoRenewLockDurationInSeconds: testDurationInMilliseconds / 1000
    });
    const onMessageHandler: OnMessage = async (brokeredMessage) => {
      receivedMessage = brokeredMessage;
      if (receivedMessage.messageId !== "test") {
        throw new Error("Message is corrupt or unexpected");
      }
      console.log("Received message: ", receivedMessage.messageId);

      while (elapsedTime < testDurationInMilliseconds) {
        // simulate the user making an async call that takes time.
        await delay(interval);
        elapsedTime += interval;

        // log how long we've executed.
        console.log(`still executing after ${elapsedTime}`);

        console.log("Time now: ", Date.now());
        console.log("Processing message:");
        console.log("MessageId: ", receivedMessage.messageId);
        console.log("Delivery count: ", receivedMessage.deliveryCount);
        console.log("LockedUntilUTC: ", receivedMessage.lockedUntilUtc);
        console.log("Sequence number: ", receivedMessage.sequenceNumber);
        console.log("TimeToLive: ", receivedMessage.timeToLive);
        console.log("Message content: ", receivedMessage);
        console.log("\n");
      }

      console.log("Trying to complete message: ", receivedMessage.messageId);
      await brokeredMessage.complete();
      console.log("Completed message: ", receivedMessage.messageId);
    };

    const onErrorHandler: OnError = (err) => {
      // Since implementation of onError handler in SDK is such that it is supposed to be the
      // terminal executing code, any error while processing message will surface by crashing the process
      console.log("Error thrown by user's OnError handler", err);
      throw err;
    };

    receiver.registerMessageHandler(onMessageHandler, onErrorHandler, {
      autoComplete: false
    });

    await delay(testDurationInMilliseconds + 5000);
    await receiver.close();
  } finally {
    await client.close();
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
