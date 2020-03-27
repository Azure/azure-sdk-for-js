/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: If you are using version 1.1.x or lower, then please use the link below:
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples
  
  This sample demonstrates how the peek() function can be used to browse a Service Bus message.

  See https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-browsing to learn
  about message browsing.

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
  // In this case since we're using `diagnostics.peek()` that any lock mode will work.
  // `diagnostics.peek()` does not lock messages in either lock mode.
  const queueReceiver = sbClient.getReceiver(queueName, "receiveAndDelete");

  try {
    for (let i = 0; i < 20; i++) {
      const messages = await queueReceiver.diagnostics.peek();
      if (!messages.length) {
        console.log("No more messages to peek");
        break;
      }
      console.log(`Peeking message #${i}: ${messages[0].body}`);
    }
    await queueReceiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
