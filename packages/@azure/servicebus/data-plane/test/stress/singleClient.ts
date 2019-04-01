import { ServiceBusClient, SendableMessageInfo, ReceiveMode } from "../../lib";

const connectionString = "";
const queueName = "";

const testDurationInMilliseconds = 60000 * 5 * 12 * 24 * 7; // 1 week

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

  try {
    while (!isJobDone) {
      const client = ns.createQueueClient(queueName);
      const sender = client.createSender();

      const message: SendableMessageInfo = {
        messageId: msgId,
        body: "test",
        label: `${msgId}`
      };
      msgId++;
      await sender.send(message);
      await sender.close();

      const receiver = await client.createReceiver(ReceiveMode.peekLock);
      const messagesReceived = await receiver.receiveBatch(1);
      await messagesReceived[0].complete();
      await receiver.close();

      await client.close();
    }
  } finally {
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
