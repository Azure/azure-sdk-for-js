// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how the sendMessages() method can be used to send messages to Service Bus
 * Queue/Topic. You can send all messages at once with risk of the operation failing if they don't fit
 * in a batch or you can use one or batch objects directly to safely send all your messages.
 *
 * See https://docs.microsoft.com/azure/service-bus-messaging/service-bus-queues-topics-subscriptions
 * to learn about Queues, Topics and Subscriptions.
 *
 *
 * @summary Demonstrates how to send messages to Service Bus Queue/Topic
 */

const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

const firstSetOfMessages = [
  { body: "Albert Einstein" },
  { body: "Werner Heisenberg" },
  { body: "Marie Curie" },
  { body: "Steven Hawking" },
  { body: "Isaac Newton" },
];

const secondSetOfMessages = [
  { body: "Niels Bohr" },
  { body: "Michael Faraday" },
  { body: "Galileo Galilei" },
  { body: "Johannes Kepler" },
  { body: "Nikolaus Kopernikus" },
];

async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // createSender() can also be used to create a sender for a topic.
  const sender = sbClient.createSender(queueName);

  try {
    // Tries to send all messages in a single batch.
    // Will fail if the messages cannot fit in a batch.
    console.log(`Sending the first 5 scientists (as an array)`);
    await sender.sendMessages(firstSetOfMessages);

    // Sends all messages using one or more ServiceBusMessageBatch objects as required
    let batch = await sender.createMessageBatch();

    for (const message of secondSetOfMessages) {
      if (!batch.tryAddMessage(message)) {
        // Send the current batch as it is full and create a new one
        await sender.sendMessages(batch);
        batch = await sender.createMessageBatch();

        if (!batch.tryAddMessage(message)) {
          throw new Error("Message too big to fit in a batch");
        }
      }
    }
    // Send the batch
    console.log(`Sending the last 5 scientists (as a ServiceBusMessageBatch)`);
    await sender.sendMessages(batch);

    // Close the sender
    console.log(`Done sending, closing...`);
    await sender.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("sendMessages Sample: Error occurred: ", err);
  process.exit(1);
});

module.exports = { main };
