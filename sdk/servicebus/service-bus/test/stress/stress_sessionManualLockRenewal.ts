/*
Test Scenario summary:
- Creates a single sender and a single receiver on a session enabled queue.
- Receives a message and holds onto it for the duration of test.
- Autolockrenewal is disabled on session and lock renewal is manually done on the session periodically in user code.

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
import { InternalSessionReceiver } from "../../src/internalReceivers";
import { ServiceBusClient } from "../../src/old/serviceBusClient";

const connectionString = "";
const queueName = "";

let elapsedTime = 0;
const interval = 10000;
const testDurationInMilliseconds = 60000 * 5 * 12 * 24; // 24 hours

let receivedMessage: ServiceBusMessage;

async function main(): Promise<void> {
  await sendMessage("sessionId-1");
  await receiveMessage("sessionId-1");
}

async function sendMessage(sessionId: string): Promise<void> {
  const ns = new ServiceBusClient(connectionString);
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
  const ns = new ServiceBusClient(connectionString);
  const client = ns.createQueueClient(queueName);

  try {
    const receiver = <InternalSessionReceiver>client.createReceiver(ReceiveMode.peekLock, {
      sessionId: sessionId,
      autoRenewLockDurationInMs: 0
    });
    const onMessageHandler: OnMessage = async (brokeredMessage) => {
      receivedMessage = brokeredMessage;
      if (receivedMessage.messageId !== "test") {
        throw new Error("Message is corrupt or unexpected");
      }
      console.log("Received message: ", receivedMessage.messageId);

      const startTime = Date.now();
      while (elapsedTime < testDurationInMilliseconds) {
        // simulate the user making an async call that takes time.
        await delay(interval);
        await receiver.renewSessionLock();
        elapsedTime = Date.now() - startTime;

        // log how long we've executed.
        console.log(`still executing after ${elapsedTime}`);

        console.log("Time now: ", new Date().getUTCDate());
        console.log("Session LockedUntilUTC: ", receiver.sessionLockedUntilUtc);

        console.log("Processing message:");
        console.log("MessageId: ", receivedMessage.messageId);
        console.log("Delivery count: ", receivedMessage.deliveryCount);
        console.log("Message LockedUntilUTC: ", receivedMessage.lockedUntilUtc);
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

    await delay(testDurationInMilliseconds + 30000);
    await receiver.close();
  } finally {
    await client.close();
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
