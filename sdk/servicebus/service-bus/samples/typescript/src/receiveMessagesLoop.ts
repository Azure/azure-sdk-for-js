/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: If you are using version 1.1.x or lower, then please use the link below:
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples
  
  This sample demonstrates how the receiveBatch() function can be used to receive Service Bus
  messages in a loop.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

import { ServiceBusClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString =
  process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // If receiving from a subscription you can use the getReceiver(topic, subscription) overload
  // instead.
  const queueReceiver = sbClient.getReceiver(queueName, "peekLock");

  // To receive messages from sessions, use getSessionReceiver instead of getReceiver or look at
  // the sample in sessions.ts file
  try {
    for (let i = 0; i < 10; i++) {
      const messages = await queueReceiver.receiveBatch(1, {
        maxWaitTimeSeconds: 5
      });

      if (!messages.length) {
        console.log("No more messages to receive");
        break;
      }

      console.log(`Received message #${i}: ${messages[0].body}`);
      await messages[0].complete();
    }
    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
