// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how the receiveMessages() function can be used to receive Service Bus
 * messages in a loop.
 *
 * Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
 *
 * @summary Demonstrates how to receive Service Bus messages in a loop
 */

const { ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

async function main() {
  const sbClient = new ServiceBusClient(connectionString);

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

module.exports = { main };
