import { ServiceBusClient, SendableMessageInfo } from "../../lib";

const connectionString = "";

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

  sendReceiveMessages();
}

async function sendReceiveMessages(): Promise<void> {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);

  const clients = [];
  for (let i = 0; i < numOfClients; i++) {
    clients[i] = ns.createQueueClient(`t1-queue-new-${i + 1}`);
  }

  try {
    while (!isJobDone) {
      for (let i = 0; i < numOfClients; i++) {
        const sender = clients[i].createSender();
        const message: SendableMessageInfo = {
          messageId: msgId,
          body: "test",
          label: `${msgId}`
        };
        msgId++;
        await sender.send(message);
        const receiver = clients[i].createReceiver();
        const messagesReceived = await receiver.receiveBatch(1);
        await messagesReceived[0].complete();
      }
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
