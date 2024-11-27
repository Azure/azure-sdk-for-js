// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceBusClient } from "@azure/service-bus";
import { WebSocketWrapper } from "./wsWrapper";

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString, {
    webSocketOptions: {
      webSocket: WebSocketWrapper,
    },
  });

  const queueReceiver = sbClient.createReceiver(queueName);

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
