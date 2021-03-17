/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the peekMessages() function can be used to browse a Service Bus message.

  See https://docs.microsoft.com/azure/service-bus-messaging/message-browsing to learn
  about message browsing.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
  const queueReceiver = sbClient.createReceiver(queueName);

  try {
    for (let i = 0; i < 20; i++) {
      const [message] = await queueReceiver.peekMessages(1);
      if (!message) {
        console.log("No more messages to peek");
        break;
      }
      console.log(`Peeking message #${i}: ${message.body}`);
    }
    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
