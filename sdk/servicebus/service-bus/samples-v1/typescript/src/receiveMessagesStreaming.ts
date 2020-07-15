/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the registerMessageHandler() function can be used to receive Service Bus messages
  in a stream.

  Setup: Please run "sendMessages.ts" sample before running this to populate the queue/topic
*/

import {
  OnMessage,
  OnError,
  ServiceBusClient,
  ReceiveMode,
  MessagingError
} from "@azure/service-bus";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// Define connection string and related Service Bus entity names here
const connectionString = process.env.SERVICE_BUS_CONNECTION_STRING || "<connection string>";
const queueName = process.env.QUEUE_NAME || "<queue name>";

export async function main() {
  const sbClient = ServiceBusClient.createFromConnectionString(connectionString);

  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);

  // To receive messages from sessions, use createSessionReceiver instead of createReceiver or look at
  // the sample in sessions.ts file

  // controls whether we continue to recover from fatal Receiver failures.
  let enableReceiverRecovery = true;

  do {
    const receiver = queueClient.createReceiver(ReceiveMode.peekLock);

    const receiverPromise = new Promise((resolve, _reject) => {
      const onMessageHandler: OnMessage = async (brokeredMessage) => {
        console.log(`Received message: ${brokeredMessage.body}`);
        await brokeredMessage.complete();
      };

      const onErrorHandler: OnError = (err) => {
        if ((err as MessagingError).retryable === true) {
          console.log("Receiver will be recreated. A recoverable error occurred:", err);
          resolve();
        } else {
          console.log("Error occurred: ", err);
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
  } while (enableReceiverRecovery);

  await queueClient.close();
  await sbClient.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
