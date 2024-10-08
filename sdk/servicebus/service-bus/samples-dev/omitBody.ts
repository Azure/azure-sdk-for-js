// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to omit the message body when peek messages.
 * NOTE: this feature is experimental.
 *
 * Setup: Please run "sendMessages" sample before running this to populate the queue/topic
 *
 * @summary Demonstrates how to browse a Service Bus message
 * @azsdk-weight 80
 */

import { ServiceBusClient } from "@azure/service-bus";
import { peekMessages } from "@azure/service-bus/experimental";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const fqdn = process.env.SERVICEBUS_FQDN || "<your-servicebus-namespace>.servicebus.windows.net";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const credential = new DefaultAzureCredential();
  const sbClient = new ServiceBusClient(fqdn, credential);

  // If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
  const queueReceiver = sbClient.createReceiver(queueName);

  try {
    // peeking messages does not lock or remove messages from a queue or subscription.
    // For locking and/or removal, look at the `receiveMessagesLoop` or `receiveMessagesStreaming` samples,
    // which cover using a receiver with a `receiveMode`.
    console.log(`Attempting to peek 10 messages at a time`);
    const peekedMessages = await peekMessages(queueReceiver, 10, {
      omitMessageBody: true,
    });

    console.log(`Got ${peekedMessages.length} messages.`);

    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("BrowseMessages Sample - Error occurred: ", err);
  process.exit(1);
});
