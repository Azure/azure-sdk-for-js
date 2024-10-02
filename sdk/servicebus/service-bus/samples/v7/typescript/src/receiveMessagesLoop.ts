// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how the receiveMessages() function can be used to receive Service Bus
 * messages in a loop.
 *
 * Setup: Please run "sendMessages" sample before running this to populate the queue/topic
 *
 * @summary Demonstrates how to receive Service Bus messages in a loop
 */

import { ServiceBusClient } from "@azure/service-bus";
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
  // instead.
  const queueReceiver = sbClient.createReceiver(queueName);

  // To receive messages from sessions, use getSessionReceiver instead of getReceiver or look at
  // the sample in sessions.ts file
  try {
    let allMessages = [];

    console.log(`Receiving 10 messages...`);

    while (allMessages.length < 10) {
      // NOTE: asking for 10 messages does not guarantee that we will return
      // all 10 at once so we must loop until we get all the messages we expected.
      const messages = await queueReceiver.receiveMessages(10, {
        maxWaitTimeInMs: 60 * 1000,
      });

      if (!messages.length) {
        console.log("No more messages to receive");
        break;
      }

      console.log(`Received ${messages.length} messages`);
      allMessages.push(...messages);

      for (let message of messages) {
        console.log(`  Message: '${message.body}'`);

        // completing the message will remove it from the remote queue or subscription.
        await queueReceiver.completeMessage(message);
      }
    }

    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("ReceiveMessageLoop Sample - Error occurred: ", err);
  process.exit(1);
});
