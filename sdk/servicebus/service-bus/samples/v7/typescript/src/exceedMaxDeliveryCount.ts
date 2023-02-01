// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates exceeding the max delivery count for a service bus queue so that
 * excess messages are sent to a dead letter queue. The sample then goes through the dead letter
 * queue and processes the extra messages.
 *
 * Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
 *
 * @summary Demonstrates exceeding the max delivery count, then processing the messages sent to the
 * dead letter queue
 */

import { ServiceBusClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

const sbClient: ServiceBusClient = new ServiceBusClient(connectionString);

export async function main() {
  try {
    await exceedMaxDelivery();
  } finally {
    await sbClient.close();
  }
}

async function exceedMaxDelivery() {
  const receiver = sbClient.createReceiver(queueName);

  while (true) {
    // Ask the broker to return any message readily available or return with no
    // result after 2 seconds (allowing for clients with great network latency)
    var msg = await receiver.receiveMessages(1, {
      maxWaitTimeInMs: 2 * 1000,
    });
    if (msg != null && msg[0] != undefined) {
      // Now we immediately abandon the message, which increments the DeliveryCount
      console.log("Picked up message; DeliveryCount " + msg[0].deliveryCount);
      await receiver.abandonMessage(msg[0]);
    } else {
      // Once the system moves the message to the DLQ, the main queue is empty
      // and the loop exits as receiveMessages returns null.
      break;
    }
  }

  // For picking up the message from a DLQ, we make a receiver just like for a
  // regular queue.
  const deadletterReceiver = sbClient.createReceiver(queueName, { subQueueType: "deadLetter" });
  while (true) {
    // receive a message
    var msg = await deadletterReceiver.receiveMessages(1, {
      maxWaitTimeInMs: 10 * 1000,
    });
    if (msg != null && msg[0] != undefined) {
      // write out the message
      console.log("Deadletter message: " + msg[0].body);

      // complete and therefore remove the message from the DLQ
      await deadletterReceiver.completeMessage(msg[0]);
    } else {
      // DLQ was empty on last receive attempt
      break;
    }
  }
}

main().catch((err) => {
  console.log("Exceed Max Delivery Sample - Error occurred: ", err);
  process.exit(1);
});
