import { generateUuid, SendableMessageInfo, ReceiveMode, Namespace } from "../../lib";
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
    This sample demonstrates scenarios as to how a messages can be explicitly moved to the DLQ.
    For other implicit ways when messages get moved to DLQ, refer to -
    https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues

    Run processMessagesInDLQ example after this to see how the messages in DLQ can be reprocessed.
*/
async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(str);

  // Sending a message to ensure that there is atleast one message in the main queue
  await sendMessage();

  await receiveMessage();

  console.log("\n>>>> Calling close....");
  await ns.close();
  console.log("\n>>>> sample Done!!!!");
}

async function sendMessage(): Promise<void> {
  const client = ns.createQueueClient(queuePath);
  const message: SendableMessageInfo = {
    body: { name: "Creamy Chicken Pasta", type: "Dinner" },
    contentType: "application/json",
    label: "Recipe",
    timeToLive: 2 * 60 * 1000, // 2 minutes
    messageId: generateUuid()
  };
  await client.send(message);
  await client.close();
}

async function receiveMessage(): Promise<void> {
  const client = ns.createQueueClient(queuePath, { receiveMode: ReceiveMode.peekLock });

  const message = await client.receiveBatch(1);
  console.log(">>>>> Receiving one message from the main queue - ", message);

  if (message) {
    // Deadletter the message received
    // TODO: Fix https://github.com/Azure/azure-service-bus-node/issues/137
    await message[0].deadLetter({
      deadletterReason: "Incorrect Recipe type",
      deadLetterErrorDescription: "Recipe type does not  match preferences."
    });

    // Mark message as complete/processed.
    await message[0].complete();
  } else {
    console.log(">>>> Error: No messages were received from the main queue.");
  }

  await client.close();
}

main().catch((err) => {
  console.log(">>>>> Error occurred: ", err);
  ns.close();
});
