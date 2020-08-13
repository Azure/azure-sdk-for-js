/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: This sample uses the preview of the next version of the @azure/service-bus package.
  For samples using the current stable version of the package, please use the link below:
  https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1
  
  This sample demonstrates how the receive() function can be used to receive Service Bus messages
  in a stream.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

import { delay, ServiceBusClient } from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // - If receiving from a subscription you can use the createReceiver(topic, subscription) overload
  // instead.
  // - See session.ts for how to receive using sessions.
  const receiver = sbClient.createReceiver(queueName);

  const processMessage = async (brokeredMessage) => {
    console.log(`Received message: ${brokeredMessage.body}`);
    await brokeredMessage.complete();
  };
  const processError = async (err) => {
    console.log("Error occurred: ", err);
  };

  try {
    receiver.subscribe(
      {
        processMessage,
        processError
      },
      {
        autoComplete: false
      }
    );

    // Waiting long enough before closing the receiver to receive messages
    await delay(5000);

    await receiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
