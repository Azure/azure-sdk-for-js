/*
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the MIT Licence.

This sample demonstrates how the peek() function can be used to browse a Service Bus message.

See https://docs.microsoft.com/azure/service-bus-messaging/message-browsing to learn
about message browsing.

Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If using Topics & Subscription, use createSubscriptionClient to peek from the subscription
  const queueClient = sbClient.createQueueClient(queueName);

  try {
    for (let i = 0; i < 20; i++) {
      const messages = await queueClient.peek();
      if (!messages.length) {
        console.log("No more messages to peek");
        break;
      }
      console.log(`Peeking message #${i}: ${messages[0].body}`);
    }
    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
