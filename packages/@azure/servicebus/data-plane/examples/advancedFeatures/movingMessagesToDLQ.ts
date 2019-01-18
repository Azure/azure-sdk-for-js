/*
    This sample demonstrates scenarios as to how a Service Bus message can be explicitly moved to
    the DLQ. For other implicit ways when Service Bus messages get moved to DLQ, refer to -
    https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-dead-letter-queues

    Run processMessagesInDLQ example after this to see how the messages in DLQ can be reprocessed.
*/

import { Namespace } from "../../lib";

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

let ns: Namespace;

async function main(): Promise<void> {
  ns = Namespace.createFromConnectionString(connectionString);
  try {
    // Sending a message to ensure that there is atleast one message in the main queue
    await sendMessage();

    await receiveMessage();
  } finally {
    await ns.close();
  }
}

async function sendMessage(): Promise<void> {
  // If using Topics, use createTopicClient to send to a topic
  const client = ns.createQueueClient(queueName);

  const message = {
    body: { name: "Creamy Chicken Pasta", type: "Dinner" },
    contentType: "application/json",
    label: "Recipe"
  };
  await client.send(message);
  await client.close();
}

async function receiveMessage(): Promise<void> {
  // If using Topics, use createSubscriptionClient to receive from a topic subscription
  const client = ns.createQueueClient(queueName);

  const message = await client.receiveBatch(1);
  console.log(">>>>> Receiving one message from the main queue - ", message);

  if (message) {
    // Deadletter the message received
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
  console.log("Error occurred: ", err);
});
