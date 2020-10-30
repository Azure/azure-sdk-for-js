/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the registerMessageHandler() function can be used to receive Service Bus messages
  in a stream.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);

  // To receive messages from sessions, use createSessionReceiver instead of createReceiver or look at
  // the sample in sessions.ts file

  do {
    const receiver = queueClient.createReceiver(ReceiveMode.peekLock);

    const receiverPromise = new Promise((resolve, reject) => {
      const onMessageHandler = async (brokeredMessage) => {
        console.log(`Received message: ${brokeredMessage.body}`);
        await brokeredMessage.complete();
      };

      const onErrorHandler = (err) => {
        if (err.retryable === true) {
          console.log("Receiver will be recreated. A recoverable error occurred:", err);
          resolve();
        } else {
          // Break out of the loop for a non-retryable error
          // since the error might be hinting at a deeper issue such as faulty configuration
          // or a non-existent queue which requires attention from the user.
          console.log("Error occurred: ", err);
          reject(err);
        }
      };

      receiver.registerMessageHandler(onMessageHandler, onErrorHandler, { autoComplete: false });
    });

    // This will only resolve if our receiver has failed in a way that is not recoverable.
    await receiverPromise;

    // the Service Bus package is intended to be resilient in the face of transitive issues, like network
    // interruptions. If there are continual restarts this might indicate a more serious issue, like a network
    // outage.
    console.log(`Closing previous receiver and recreating - a fatal error has occurred.`);

    // we can close the old receiver and just let the loop start again.
    await receiver.close();
  } while (true);

  await queueClient.close();
  await sbClient.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
