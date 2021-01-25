/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: This sample uses the preview of the next version (v7) of the @azure/service-bus package.
  For samples using the current stable version (v1) of the package, please use the link below:
  https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1
  
  This sample demonstrates how the sendMessages() method can be used to send messages to Service Bus
  Queue/Topic. You can send all messages at once with risk of the operation failing if they don't fit
  in a batch or you can use one or batch objects directly to safely send all your messages.

  See https://docs.microsoft.com/azure/service-bus-messaging/service-bus-queues-topics-subscriptions
  to learn about Queues, Topics and Subscriptions.
*/

import { ServiceBusClient, ServiceBusMessage } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

const messages: ServiceBusMessage[] = [
  { body: "Albert Einstein" },
  { body: "Werner Heisenberg" },
  { body: "Marie Curie" },
  { body: "Steven Hawking" },
  { body: "Isaac Newton" },
  { body: "Niels Bohr" },
  { body: "Michael Faraday" },
  { body: "Galileo Galilei" },
  { body: "Johannes Kepler" },
  { body: "Nikolaus Kopernikus" }
];

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // createSender() can also be used to create a sender for a topic.
  const sender = sbClient.createSender(queueName);

  try {
    // Tries to send all messages in a single batch.
    // Will fail if the messages cannot fit in a batch.
    await sender.sendMessages(messages);

    // Sends all messages using one or more ServiceBusMessageBatch objects as required
    let batch = await sender.createMessageBatch();

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      if (!batch.tryAddMessage(message)) {
        // Send the current batch as it is full and create a new one
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();

        if (!batch.tryAddMessage(messages[i])) {
          throw new Error("Message too big to fit in a batch");
        }
      }
    }
    // Send the batch
    await sender.sendMessages(batch);

    // Close the sender
    await sender.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
