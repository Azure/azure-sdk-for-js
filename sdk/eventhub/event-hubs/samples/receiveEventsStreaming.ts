/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the receive() function can be used to receive events in a stream.

  If your Event Hubs instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate Event Hubs before running this sample.
*/

import { EventHubClient, EventPosition, OnMessage, OnError, MessagingError, delay, EventData } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  const partitionIds = await client.getPartitionIds();

  const onMessageHandler: OnMessage = (brokeredMessage: EventData) => {
    console.log(`Received event: ${brokeredMessage.body}`);
  };
  const onErrorHandler: OnError = (err: MessagingError | Error) => {
    console.log("Error occurred: ", err);
  };

  const rcvHandler = client.receive(partitionIds[0], onMessageHandler, onErrorHandler, {
    eventPosition: EventPosition.fromStart(),
    consumerGroup: "$Default"
  });

  // Waiting long enough before closing the receiver to receive event
  await delay(5000);
  await rcvHandler.stop();
  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
