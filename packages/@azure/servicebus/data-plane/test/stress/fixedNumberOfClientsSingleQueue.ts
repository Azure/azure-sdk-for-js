/*
Test Scenario summary:
Creates 10 clients against single queue.
On each, single sender/receiver are created and kept alive.
Runs following sequence of steps in a long running loop:
Single client is created -> single sender is created ->
message is sent -> message received -> message completed ->
receiver closed -> client closed

The test assumes no other process is working with the queues defined in here,
but the queues must be empty and use default configurations before running the test.

For running this test, connection string of the Service Bus namespace and queue name
must be supplied.
*/

import { ServiceBusClient, SendableMessageInfo, ReceiveMode } from "../../lib";

const connectionString = "";
const queueName = "";

const testDurationInMilliseconds = 60000 * 5 * 12 * 24 * 7; // 1 week

const numOfClients = 10;

let msgId = 1;

let snapshotIntervalID: any;

let isJobDone = false;

async function main(): Promise<void> {
  snapshotIntervalID = setInterval(snapshot, 5000); // Every 5 seconds
  setTimeout(() => {
    isJobDone = true;
  }, testDurationInMilliseconds);

  await sendReceiveMessages();
}

async function sendReceiveMessages(): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);

  const clients = [];
  const senders = [];
  const receivers = [];
  for (let i = 0; i < numOfClients; i++) {
    clients[i] = ns.createQueueClient(queueName);
    senders[i] = clients[i].createSender();
    receivers[i] = await clients[i].createReceiver(ReceiveMode.peekLock);
  }

  try {
    while (!isJobDone) {
      for (let i = 0; i < numOfClients; i++) {
        const message: SendableMessageInfo = {
          messageId: msgId,
          body: "test",
          label: `${msgId}`
        };
        msgId++;
        await senders[i].send(message);
        const messagesReceived = await receivers[i].receiveBatch(1);
        await messagesReceived[0].complete();
      }
    }
  } finally {
    for (let i = 0; i < numOfClients; i++) {
      await senders[i].close();
      await receivers[i].close();
      await clients[i].close();
    }
    await ns.close();
    clearInterval(snapshotIntervalID);
  }
}

function snapshot(): void {
  console.log("Time : ", new Date());
  console.log("Number of clients opened, closed successfully so far : ", msgId);
  console.log("\n");
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
