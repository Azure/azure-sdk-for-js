// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how batchDeleteMessages() method can be used to delete messages in batch.
 *
 * @summary Demonstrates how to delete messages in batch mode
 */

import { ServiceBusClient, ServiceBusMessage } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
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
  { body: "Nikolaus Kopernikus" },
];

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  const sender = sbClient.createSender(queueName);
  await sender.sendMessages(messages);

  // If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
  const queueReceiver = sbClient.createReceiver(queueName, { receiveMode: "receiveAndDelete" });

  try {
    const peekedMessages = await queueReceiver.peekMessages(10);
    console.log(`Peeked messages: ${peekedMessages.length}.`);

    const deletedCount = await queueReceiver.batchDeleteMessages(10);

    console.log(`${deletedCount} messages has been deleted.`);

    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("batchDeleteMessages Sample - Error occurred: ", err);
  process.exit(1);
});
