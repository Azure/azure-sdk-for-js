/*
  This sample demonstrates how the peek() function can be used to browse a Service Bus message.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-browsing to learn
  about message browsing.

  Setup: Please run "sendMessages.js" sample before running this to populate the queue/topic
*/

const { ServiceBusClient } = require("@azure/service-bus");

// Define connection string and related Service Bus entity names here
const connectionString = "";
const queueName = "";

async function main() {
  const ns = ServiceBusClient.createFromConnectionString(connectionString);

  // If using Topics & Subscription, use createSubscriptionClient to peek from the subscription
  const client = ns.createQueueClient(queueName);

  try {
    for (let i = 0; i < 20; i++) {
      const messages = await client.peek();
      if (!messages.length) {
        console.log("No more messages to peek");
        break;
      }
      console.log(`Peeking message #${i}: ${messages[0].body}`);
    }
    await client.close();
  } finally {
    await ns.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
