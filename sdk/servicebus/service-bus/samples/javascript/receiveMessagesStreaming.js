/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  **NOTE**: This sample uses the preview of the next version (v7) of the @azure/service-bus package.
For samples using the current stable version (v1) of the package, please use the link below:
  https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples-v1

  This sample demonstrates how the receive() function can be used to receive Service Bus messages
  in a stream.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

const { delay, isServiceBusError, ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();
// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // - If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
  // instead.
  // - See session.ts for how to receive using sessions.
  const receiver = sbClient.createReceiver(queueName);

  try {
    const subscription = receiver.subscribe({
      processMessage: async (brokeredMessage) => {
        console.log(`Received message: ${brokeredMessage.body}`);

        // autoComplete, which is enabled by default, will automatically call
        // receiver.completeMessage() on your message after awaiting on your processMessage
        // handler so long as your handler does not throw an error.
        //
        // If your handler _does_ throw an error then the message will automatically
        // be abandoned using receiver.abandonMessage()
        //
        // autoComplete can be disabled in the options for subscribe().
      },
      processError: async (args) => {
        console.log(`Error from source ${args.errorSource} occurred: `, args.error);

        // the `subscribe() call will not stop trying to receive messages without explicit intervention from you.
        if (isServiceBusError(args.error)) {
          switch (args.error.reason) {
            case "MessagingEntityDisabled":
            case "MessagingEntityNotFound":
            case "Unauthorized":
              // It's possible you have a temporary infrastructure change (for instance, the entity being
              // temporarily disabled). The handler will continue to retry if `close()` is not called on the subscription - it is completely up to you
              // what is considered fatal for your program.
              console.log(
                `An unrecoverable error occurred. Stopping processing. ${args.error.reason}`,
                args.error
              );
              await subscription.close();
              break;
            case "MessageLockLost":
              console.log(`Message lock lost for message`, args.error);
              break;
            case "ServiceBusy":
              // choosing an arbitrary amount of time to wait.
              await delay(1000);
              break;
          }
        }
      }
    });

    // Waiting long enough before closing the receiver to receive messages
    console.log(`Receiving messages for 20 seconds before exiting...`);
    await delay(20000);

    console.log(`Closing...`);
    await receiver.close();
  } finally {
    await sbClient.close();
  }
}

main().catch((err) => {
  console.log("Error occurred: ", err);
  process.exit(1);
});
