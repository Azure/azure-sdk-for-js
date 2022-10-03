// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT Licence.

/**
 * This sample demonstrates how the receive() function can be used to receive Service Bus messages
 * in a stream.
 *
 * Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
 *
 * @summary Demonstrates how to receive Service Bus messages in a stream
 */

const { delay, isServiceBusError, ServiceBusClient } = require("@azure/service-bus");

// Load the .env file if it exists
require("dotenv").config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICEBUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

async function main() {
  const sbClient = new ServiceBusClient(connectionString);

  // - If receiving from a subscription you can use the createReceiver(topicName, subscriptionName) overload
  // instead.
  // - See session.ts for how to receive using sessions.
  const receiver = sbClient.createReceiver(queueName);

  try {
    const subscription = receiver.subscribe({
      // After executing this callback you provide, the receiver will remove the message from the queue if you
      // have not already settled the message in your callback.
      // You can disable this by passing `false` to the `autoCompleteMessages` option in the `subscribe()` method.
      // If your callback _does_ throw an error before the message is settled, then it will be abandoned.
      processMessage: async (brokeredMessage) => {
        console.log(`Received message: ${brokeredMessage.body}`);
      },
      // This callback will be called for any error that occurs when either in the receiver when receiving the message
      // or when executing your `processMessage` callback or when the receiver automatically completes or abandons the message.
      processError: async (args) => {
        console.log(`Error from source ${args.errorSource} occurred: `, args.error);

        // the `subscribe() call will not stop trying to receive messages without explicit intervention from you.
        if (isServiceBusError(args.error)) {
          switch (args.error.code) {
            case "MessagingEntityDisabled":
            case "MessagingEntityNotFound":
            case "UnauthorizedAccess":
              // It's possible you have a temporary infrastructure change (for instance, the entity being
              // temporarily disabled). The handler will continue to retry if `close()` is not called on the subscription - it is completely up to you
              // what is considered fatal for your program.
              console.log(
                `An unrecoverable error occurred. Stopping processing. ${args.error.code}`,
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
      },
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
  console.log("ReceiveMessagesStreaming - Error occurred: ", err);
  process.exit(1);
});

module.exports = { main };
