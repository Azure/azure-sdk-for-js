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

const { delay, ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();
// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // - If receiving from a subscription you can use the createReceiver(topic, subscription) overload
  // instead.
  // - See session.ts for how to receive using sessions.
  const receiver = sbClient.createReceiver(queueName);

  try {
    const subscription = receiver.subscribe(
      {
        processMessage: async (brokeredMessage) => {
          console.log(`Received message: ${brokeredMessage.body}`);
          await receiver.completeMessage(brokeredMessage);
        },
        processError: async (args) => {
          console.log(`Error from source ${args.errorSource} occurred: `, args.error);

          // the handler will not stop without explicit intervention from you.
          if (isMessagingError(args.error)) {
            switch (args.error.code) {
              case "MessagingEntityDisabledError":
              case "MessagingEntityNotFoundError":
              case "UnauthorizedError":
                // It's possible you have a temporary infrastructure change (for instance, the entity being
                // temporarily disabled). The handler will continue to retry - it is completely up to you
                // what is considered fatal for your program.
                console.log(
                  `An unrecoverable error occurred. Stopping processing. ${args.error.code}`,
                  args.error
                );
                await subscription.close();
                break;
              case "MessageLockLostError":
                console.log(`Message lock lost for message`, args.error);
                break;
              case "ServerBusyError":
                // choosing an arbitrary amount of time to wait.
                await delay(1000);
                break;
            }
          }
        }
      },
      {
        autoComplete: false
      }
    );

    // Waiting long enough before closing the receiver to receive messages
    console.log(`Receiving messages for  5 seconds before exiting...`);
    await delay(5000);

    await receiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
