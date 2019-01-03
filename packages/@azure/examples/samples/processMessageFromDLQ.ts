import { ServiceBusMessage, ReceiveMode, Namespace } from "../../lib";
import * as dotenv from "dotenv";
dotenv.config();

const str = process.env.SERVICEBUS_CONNECTION_STRING || "";
const queuePath = process.env.QUEUE_NAME || "";
const deadLetterQueuePath = Namespace.getDeadLetterQueuePathForQueue(queuePath);
console.log("str: ", str);
console.log("queue path: ", queuePath);
console.log("deadletter queue path: ", deadLetterQueuePath);

let ns: Namespace;

/*
  This sample demonstrates retrieving a message from a dead letter queue, editing it and
  sending it back to the main queue.

  Prior to running this sample, run the sample in movingMessagesToDLQ.ts file to move a message
  to the Dead Letter Queue
*/
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);

  await processDeadletterMessageQueue();

  console.log("\n>>>> Calling close....");
  await ns.close();
  console.log("\n>>>> sample Done!!!!");
}

async function processDeadletterMessageQueue(): Promise<void> {
  const client = ns.createQueueClient(deadLetterQueuePath, { receiveMode: ReceiveMode.peekLock });

  const message = await client.receiveBatch(1);
  console.log(">>>>> Reprocessing the message in DLQ - ", message);

  if (message.length > 0) {
    // Do something with the message retrieved from DLQ
    await fixAndResendMessage(message[0]);

    // Mark message as complete/processed.
    await message[0].complete();
  } else {
    console.log(">>>> Error: No messages were received from the DLQ.");
  }

  await client.close();
}

async function fixAndResendMessage(oldMessage: ServiceBusMessage): Promise<void> {
  // Inspect given message and make any changes if necessary
  const repairedMessage = oldMessage.clone();

  // Send repaired message back to the current queue
  const client = ns.createQueueClient(queuePath);
  await client.send(repairedMessage);
  await client.close();
}

main().catch((err) => {
  console.log(">>>>> Error occurred: ", err);
  return ns.close();
});
