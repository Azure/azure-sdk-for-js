/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the receive() function can be used to receive events in a stream.

  If your Event Hub instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate it before running this sample.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import { EventHubClient, OnMessage, OnError, delay, EventPosition } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main(): Promise<void> {
  const client = new EventHubClient(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  const consumerGroupName = "$Default";
  const earliestEventPosition = EventPosition.earliest();
  const consumer = client.createConsumer(consumerGroupName, partitionIds[0], earliestEventPosition);

  const onMessageHandler: OnMessage = (brokeredMessage) => {
    console.log(`Received event: ${brokeredMessage.body}`);
  };
  const onErrorHandler: OnError = (err) => {
    console.log("Error occurred: ", err);
  };

  const rcvHandler = consumer.receive(onMessageHandler, onErrorHandler);

  // Waiting long enough before closing the consumer to receive event
  await delay(5000);
  await rcvHandler.stop();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
