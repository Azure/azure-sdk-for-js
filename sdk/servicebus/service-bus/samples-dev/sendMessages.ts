// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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
 * @azsdk-weight 100
 */

import { ServiceBusClient, ServiceBusMessage, ServiceBusMessageBatch } from "@azure/service-bus";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const fqdn = process.env.SERVICEBUS_FQDN || "<your-servicebus-namespace>.servicebus.windows.net";
const queueName = process.env.QUEUE_NAME || "<queue name>";

const firstSetOfMessages: ServiceBusMessage[] = [
  { body: "Albert Einstein" },
  { body: "Werner Heisenberg" },
  { body: "Marie Curie" },
  { body: "Steven Hawking" },
  { body: "Isaac Newton" },
];

const secondSetOfMessages: ServiceBusMessage[] = [
  { body: "Niels Bohr" },
  { body: "Michael Faraday" },
  { body: "Galileo Galilei" },
  { body: "Johannes Kepler" },
  { body: "Nikolaus Kopernikus" },
];

export async function main() {
  const credential = new DefaultAzureCredential();
  const sbClient = new ServiceBusClient(fqdn, credential);

  // createSender() can also be used to create a sender for a topic.
  const sender = sbClient.createSender(queueName);

  try {
    // Tries to send all messages in a single batch.
    // Will fail if the messages cannot fit in a batch.
    console.log(`Sending the first 5 scientists (as an array)`);
    await sender.sendMessages(firstSetOfMessages);

    // Sends all messages using one or more ServiceBusMessageBatch objects as required
    let batch: ServiceBusMessageBatch = await sender.createMessageBatch();

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

    // Send a single message
    console.log(`Sending one scientists`);
    const message: ServiceBusMessage = {
      contentType: "application/json",
      subject: "Scientist",
      body: { firstName: "Albert", lastName: "Einstein" },
      timeToLive: 2 * 60 * 1000, // message expires in 2 minutes
    };
    await sender.sendMessages(message);

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
