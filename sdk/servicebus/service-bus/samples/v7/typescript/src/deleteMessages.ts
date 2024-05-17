// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

/**
 * This sample demonstrates deleting messages from a queue.
 *
 * @summary Demonstrates deleting messages from a queue.
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

const max32BitNumber = 2147483647;

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  try {
    const sender = sbClient.createSender(queueName);
    // If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
    const queueReceiver = sbClient.createReceiver(queueName, { receiveMode: "receiveAndDelete" });

    let peekedMessages = await queueReceiver.peekMessages(max32BitNumber);
    console.log(`Number of messages in the queue: ${peekedMessages.length}`);
    console.log("Deleting all messages from the queue");
    await queueReceiver.purgeMessages();
    peekedMessages = await queueReceiver.peekMessages(max32BitNumber);
    console.log(`Number of messages in the queue after clearing: ${peekedMessages.length}`);

    console.log("Sending 10 messages...");
    await sender.sendMessages(messages);

    peekedMessages = await queueReceiver.peekMessages(max32BitNumber);
    console.log(`Peeked messages (1): ${peekedMessages.length}.`); // should be 10

    let deletedCount = await queueReceiver.deleteMessages({ maxMessageCount: 10 });

    console.log(`Number of messages deleted: ${deletedCount}.`);

    // Sending 10 messages again
    await sender.sendMessages(messages);
    // This UTC time is used to specify a filter on messages to delete
    const timeMarkUtc = new Date();
    // Sending another 10 messages
    await sender.sendMessages(messages);

    peekedMessages = await queueReceiver.peekMessages(max32BitNumber);
    console.log(`Peeked messages (2): ${peekedMessages.length}.`); // should be 20

    deletedCount = await queueReceiver.deleteMessages({
      maxMessageCount: 20,
      beforeEnqueueTime: timeMarkUtc,
    });
    console.log(`Number of messages deleted this time: ${deletedCount}.`); // should be 10

    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("deleteMessages Sample - Error occurred: ", err);
  process.exit(1);
});
