// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ServiceBusClient,
  ServiceBusMessage,
  ServiceBusMessageBatch,
} from "@azure/service-bus";
import { WebSocketWrapper } from "./wsWrapper";

// Define connection string and related Service Bus entity names here
const connectionString =
  process.env.EXPO_PUBLIC_SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.EXPO_PUBLIC_QUEUE_NAME || "<queue name>";

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
  const sbClient = new ServiceBusClient(connectionString, {
    webSocketOptions: {
      webSocket: WebSocketWrapper,
    },
  });

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
