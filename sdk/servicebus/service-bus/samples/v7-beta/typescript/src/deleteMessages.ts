// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates deleting messages from a queue.
 *
 * @summary Demonstrates deleting messages from a queue.
 */

import type { ServiceBusMessage } from "@azure/service-bus";
import { ServiceBusClient } from "@azure/service-bus";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";
// Define connection string and related Service Bus entity names here
const fqdn = process.env.SERVICEBUS_FQDN || "<your-servicebus-namespace>.servicebus.windows.net";
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

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const sbClient = new ServiceBusClient(fqdn, credential);
  try {
    const sender = sbClient.createSender(queueName);
    // If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
    const queueReceiver = sbClient.createReceiver(queueName, { receiveMode: "receiveAndDelete" });

    let peekedMessages = await queueReceiver.peekMessages(max32BitNumber);
    console.log(`Number of messages in the queue: ${peekedMessages.length}`);
    console.log("Deleting all eligible messages from the queue in portable 500-message batches");
    const purgeResult = await queueReceiver.purgeMessages();
    console.log(`Number of messages actually purged: ${purgeResult.deletedCount}`);
    peekedMessages = await queueReceiver.peekMessages(max32BitNumber);
    console.log(`Number of messages in the queue after clearing: ${peekedMessages.length}`);

    console.log("Sending 10 messages...");
    await sender.sendMessages(messages);

    peekedMessages = await queueReceiver.peekMessages(max32BitNumber);
    console.log(`Peeked messages (1): ${peekedMessages.length}.`); // should be 10

    const requestedCount = 10;
    let { deletedCount } = await queueReceiver.deleteMessages(requestedCount);

    // Any request can return fewer deletions than requested, especially when messages are large.
    console.log(`Requested ${requestedCount}; the service deleted ${deletedCount}.`);

    // Sending 10 messages again
    await sender.sendMessages(messages);
    // This UTC time is used to specify a filter on messages to delete
    const timeMarkUtc = new Date();
    // Sending another 10 messages
    await sender.sendMessages(messages);

    peekedMessages = await queueReceiver.peekMessages(max32BitNumber);
    console.log(`Peeked messages (2): ${peekedMessages.length}.`); // should be 20

    ({ deletedCount } = await queueReceiver.deleteMessages(20, {
      beforeEnqueueTime: timeMarkUtc,
    }));
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
