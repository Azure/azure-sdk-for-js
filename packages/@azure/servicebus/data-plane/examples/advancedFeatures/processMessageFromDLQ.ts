/*
  This sample demonstrates retrieving a message from a dead letter queue, editing it and
  sending it back to the main queue.

  Prior to running this sample, run the sample in movingMessagesToDLQ.ts file to move a message
  to the Dead Letter Queue
*/

import { ServiceBusMessage, Namespace } from "../../lib";

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

const deadLetterQueueName = Namespace.getDeadLetterQueuePathForQueue(queueName);
// const deadLetterQueueName = Namespace.getDeadLetterSubcriptionPathForSubcription(topicName, subscriptionName);

let ns: Namespace;

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(connectionString);
  try {
    await processDeadletterMessageQueue();
  } finally {
    await ns.close();
  }
}

async function processDeadletterMessageQueue(): Promise<void> {
  const client = ns.createQueueClient(deadLetterQueueName);

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

// Send repaired message back to the current queue / topic
async function fixAndResendMessage(oldMessage: ServiceBusMessage): Promise<void> {
  // If using Topics, use createTopicClient to send to a topic
  const client = ns.createQueueClient(queueName);

  // Inspect given message and make any changes if necessary
  const repairedMessage = oldMessage.clone();

  await client.send(repairedMessage);
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
