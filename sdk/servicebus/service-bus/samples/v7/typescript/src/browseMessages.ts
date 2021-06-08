// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how the peekMessages() function can be used to browse a Service Bus message.
 *
 * See https://docs.microsoft.com/azure/service-bus-messaging/message-browsing to learn about message browsing.
 *
 * Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
 *
 * @summary Demonstrates how to browse a Service Bus message
 */

import { ServiceBusClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
  const queueReceiver = sbClient.createReceiver(queueName);

  try {
    // peeking messages does not lock or remove messages from a queue or subscription.
    // For locking and/or removal, look at the `receiveMessagesLoop` or `receiveMessagesStreaming` samples,
    // which cover using a receiver with a `receiveMode`.
    console.log(`Attempting to peek 10 messages at a time`);
    const peekedMessages = await queueReceiver.peekMessages(10);

    console.log(`Got ${peekedMessages.length} messages.`);

    for (let i = 0; i < peekedMessages.length; ++i) {
      console.log(`Peeked message #${i}: ${peekedMessages[i].body}`);
    }

    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("BrowseMessages Sample - Error occurred: ", err);
  process.exit(1);
});
