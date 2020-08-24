/*
Test Scenario summary:
- Creates a single sender and a single receiver on a queue.
- Send 2 messages
- Receive message using batching receiver
- Receives second message and hold onto it for the duration of test. AutoLockRenewal is enabled and set to the test duration.

The test assumes no other process is working with the queues defined in here,
but the queues must be empty and use default configurations before running the test.

For running this test, connection string of the Service Bus namespace and queue name
must be supplied.
*/

import {
  SendableMessageInfo,
  OnMessage,
  OnError,
  delay,
  ReceiveMode,
  ServiceBusMessage
} from "../../src";
import { ServiceBusClient } from "../../src/old/serviceBusClient";

const connectionString = "";
const queueName = "";

let elapsedTime = 0;
const interval = 60000;
const testDurationInMilliseconds = 60000 * 20; // 20 min

let receivedMessage: ServiceBusMessage;

async function main(): Promise<void> {
  await sendMessage("message-for-batching");
  await sendMessage("message-for-streaming");
  await receiveMessages();
}

async function sendMessage(messageId: string): Promise<void> {
  const ns = new ServiceBusClient(connectionString);
  const client = ns.createQueueClient(queueName);
  try {
    const sender = client.createSender();

    const message: SendableMessageInfo = {
      messageId: messageId,
      body: "test",
      label: `test`
    };

    await sender.send(message);
  } finally {
    await client.close();
    await ns.close();
  }
}

async function receiveMessages(): Promise<void> {
  const ns = new ServiceBusClient(connectionString);
  const client = ns.createQueueClient(queueName);

  try {
    const receiver = client.createReceiver(ReceiveMode.peekLock);
    const onMessageHandler: OnMessage = async (brokeredMessage) => {
      receivedMessage = brokeredMessage;

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

      await brokeredMessage.complete();
      console.log("Completed message: ", receivedMessage.messageId);
    };

    const onErrorHandler: OnError = (err) => {
      // Since implementation of onError handler in SDK is such that it is supposed to be the
      // terminal executing code, any error while processing message will surface by crashing the process
      console.log("Error thrown by user's OnError handler", err);
      throw err;
    };

    const receivedBatchMessages = await receiver.receiveMessages(1);
    if (receivedBatchMessages.length !== 1) {
      throw new Error("Test failed: Could not receive message for batching receiver as intended");
    }
    await receivedBatchMessages[0].complete();

    receiver.registerMessageHandler(onMessageHandler, onErrorHandler, {
      autoComplete: false,
      maxAutoRenewLockDurationInMs: testDurationInMilliseconds
    });

    await delay(testDurationInMilliseconds + 60000);
    await receiver.close();
  } finally {
    await client.close();
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
