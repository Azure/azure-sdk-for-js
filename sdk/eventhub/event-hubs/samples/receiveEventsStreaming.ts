/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the receive() function can be used to receive events in a stream.

  If your Event Hubs instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate Event Hubs before running this sample.
*/

import { EventHubClient, OnMessage, OnError, MessagingError, delay, EventData, EventPosition } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main(): Promise<void> {
  const client = new EventHubClient(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  const consumer = client.createConsumer("$Default", partitionIds[0], EventPosition.earliest());

  const onMessageHandler: OnMessage = (brokeredMessage: EventData) => {
    console.log(`Received event: ${brokeredMessage.body}`);
  };
  const onErrorHandler: OnError = (err: MessagingError | Error) => {
    console.log("Error occurred: ", err);
  };

  try {
    const rcvHandler = consumer.receive(onMessageHandler, onErrorHandler);

    // Waiting long enough before closing the consumer to receive event
    await delay(5000);
    await rcvHandler.stop();
  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
