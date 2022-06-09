// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates retrieving a message from a dead letter queue, editing it and
 * sending it back to the main queue.
 *
 * Prior to running this sample, run the sample in movingMessagesToDLQ.ts file to move a message
 * to the Dead Letter Queue
 *
 * @summary Demonstrates retrieving a message from a dead letter queue, editing it and
 * sending it back to the main queue
 */

import { ServiceBusMessage, ServiceBusClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

const sbClient: ServiceBusClient = new ServiceBusClient(connectionString);

export async function main() {
  try {
    await processDeadletterMessageQueue();
  } finally {
    await sbClient.close();
  }
}

async function processDeadletterMessageQueue() {
  // If connecting to a subscription's dead letter queue you can use the createReceiver(topicName, subscriptionName) overload
  const receiver = sbClient.createReceiver(queueName, { subQueueType: "deadLetter" });

  const messages = await receiver.receiveMessages(1);

  if (messages.length > 0) {
    console.log(">>>>> Received the message from DLQ - ", messages[0].body);

    // Do something with the message retrieved from DLQ
    await fixAndResendMessage(messages[0]);

    // Mark message as complete/processed.
    await receiver.completeMessage(messages[0]);
  } else {
    console.log(">>>> Error: No messages were received from the DLQ.");
  }

  await receiver.close();
}

// Send repaired message back to the current queue / topic
async function fixAndResendMessage(oldMessage: ServiceBusMessage) {
  // createSender() can also be used to create a sender for a topic.
  const sender = sbClient.createSender(queueName);

  // Inspect given message and make any changes if necessary
  const repairedMessage = { ...oldMessage };

  console.log(">>>>> Cloning the message from DLQ and resending it - ", oldMessage.body);

  await sender.sendMessages(repairedMessage);
  await sender.close();
}

main().catch((err) => {
  console.log("Moving from DLQ Sample - Error occurred: ", err);
  process.exit(1);
});
