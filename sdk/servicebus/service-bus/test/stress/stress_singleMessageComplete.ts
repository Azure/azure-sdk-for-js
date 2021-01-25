/*
Test Scenario summary:
Creates a single sender and a single receiver on a queue.
Runs following sequence of steps in a long running loop.
Sends a message -> receives a message -> completes the message.

The test assumes no other process is working with the queues defined in here,
but the queues must be empty and use default configurations before running the test.

For running this test, connection string of the Service Bus namespace and queue name
must be supplied.
*/

import { SendableMessageInfo, OnMessage, OnError, delay, ReceiveMode } from "../../src";
import { ServiceBusClient } from "../../src/old/serviceBusClient";

const connectionString = "";
const queueName = "";

const testDurationInMilliseconds = 60000 * 5 * 12 * 24 * 7; // 1 week

const messageMap: Set<number> = new Set<number>();
let msgId = 1;

let snapshotIntervalID: any;

let isJobDone = false;

async function main(): Promise<void> {
  snapshotIntervalID = setInterval(snapshot, 5000); // Every 5 seconds
  const sendPromise = sendMessages();
  const receivePromise = receiveMessages();
  await Promise.all([sendPromise, receivePromise]);
}

async function sendMessages(): Promise<void> {
  const ns = new ServiceBusClient(connectionString);
  const client = ns.createQueueClient(queueName);
  try {
    const sender = client.createSender();

    while (!isJobDone) {
      const message: SendableMessageInfo = {
        messageId: msgId,
        body: "test",
        label: `${msgId}`
      };
      messageMap.add(msgId);
      msgId++;
      await sender.send(message);
      await delay(2000); // Throttling send to not increase queue size
    }
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
      const receivedMsgId = brokeredMessage.messageId;

      if (typeof receivedMsgId !== "number") {
        throw new Error("MessageId is corrupt or is of unexpected type");
      }

      if (!messageMap.has(receivedMsgId)) {
        throw new Error("Received message that is not recorded in internal map.");
      }

      messageMap.delete(receivedMsgId);

      await brokeredMessage.complete();
    };
    const onErrorHandler: OnError = (err) => {
      throw err;
    };

    receiver.registerMessageHandler(onMessageHandler, onErrorHandler, { autoComplete: false });
    await delay(testDurationInMilliseconds);

    isJobDone = true;

    await receiver.close();
    clearInterval(snapshotIntervalID);
  } finally {
    await client.close();
    await ns.close();
  }
}

function snapshot(): void {
  console.log("Time : ", new Date());
  console.log("Map Size : ", messageMap.size);
  console.log("Number of messages sent and received successfully so far : ", msgId);
  console.log("\n");
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
