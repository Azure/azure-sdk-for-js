// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates how deleteMessages() method can be used to delete messages in batch.
 *
 * @summary Demonstrates how to delete messages in batch mode
 * @azsdk-weight 80
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
  try {
    const sender = sbClient.createSender(queueName);
    await sender.sendMessages(messages);

    // If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
    const queueReceiver = sbClient.createReceiver(queueName, { receiveMode: "receiveAndDelete" });

    let peekedMessages = await queueReceiver.peekMessages(10);
    console.log(`Peeked messages: ${peekedMessages.length}.`);

    let deletedCount = await queueReceiver.deleteMessages({ maxMessageCount: 10 });

    console.log(`${deletedCount} messages has been deleted.`);

    // Sending the same messages again
    await sender.sendMessages(messages);
    peekedMessages = await queueReceiver.peekMessages(10);
    console.log(`Peeked messages (2): ${peekedMessages.length}.`);

    // This time specifying a filter on messages to batch-delete
    deletedCount = await queueReceiver.deleteMessages({
      maxMessageCount: 10,
      enqueuedTimeUtcOlderThan: new Date(1970, 1, 1),
    });
    console.log(`${deletedCount} messages has been deleted this time.`); // Should be 0

    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("deleteMessages Sample - Error occurred: ", err);
  process.exit(1);
});
