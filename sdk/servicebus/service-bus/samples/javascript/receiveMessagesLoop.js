/*
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the MIT Licence.

This sample demonstrates how the receiveMessages() function can be used to receive Service Bus
messages in a loop.

Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);

  // To receive messages from sessions, use getSessionReceiver instead of getReceiver or look at
  // the sample in sessions.ts file
  const receiver = queueClient.createReceiver(ReceiveMode.peekLock);

  try {
    for (let i = 0; i < 10; i++) {
      const messages = await receiver.receiveMessages(1, 5);
      if (!messages.length) {
        console.log("No more messages to receive");
        break;
      }
      console.log(`Received message #${i}: ${messages[0].body}`);
      await messages[0].complete();
    }
    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
