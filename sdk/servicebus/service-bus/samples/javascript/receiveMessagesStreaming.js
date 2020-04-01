/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: If you are using version 1.1.x or lower, then please use the link below:
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples

  This sample demonstrates how the receive() function can be used to receive Service Bus messages
  in a stream.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

const { delay, ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();
// Define connection string and related Service Bus entity names here
const connectionString =
  process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";
async function main() {
  const sbClient = new ServiceBusClient(connectionString);
  // - If receiving from a subscription you can use the getReceiver(topic, subscription) overload
  // instead.
  // - See session.ts for how to receive using sessions.
  const receiver = sbClient.getReceiver(queueName, "peekLock");

  const processMessage = async brokeredMessage => {
    console.log(`Received message: ${brokeredMessage.body}`);
    await brokeredMessage.complete();
  };

  const processError = async err => {
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

main().catch(err => {
  console.log("Error occurred: ", err);
});
