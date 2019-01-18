/*
  This sample demonstrates how the peek() function can be used to browse a Service Bus message.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-browsing to learn
  about message browsing.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

import { Namespace } from "../../lib";

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

async function main(): Promise<void> {
  const ns = Namespace.createFromConnectionString(connectionString);

  // If using Topics, use createSubscriptionClient to peek from a topic subscription
  const client = ns.createQueueClient(queueName);

  try {
    const messages = await client.peek(10);
    for (let i = 0; i < messages.length; i++) {
      console.log(`Peeking message #${i}: ${messages[i].body}`);
    }
    await client.close();
  } finally {
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
