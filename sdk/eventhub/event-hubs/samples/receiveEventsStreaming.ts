/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the subscribe() function can be used to receive events in a stream.

  If your Event Hub instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate it before running this sample.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import { EventHubConsumerClient, delay, EventPosition, OnReceivedEvents, PartitionContext } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main(): Promise<void> {
  const client = new EventHubConsumerClient(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  const consumerGroupName = "$Default";

  const onReceivedEventsHandler: OnReceivedEvents = async (events, context) => {
    for (const message of events) {
      console.log(`Received event: ${message.body}`);
    }
  };

  const subscription = client.subscribe(consumerGroupName, onReceivedEventsHandler,
    // for simplicity we'll just target a single partition for our demo
    [partitionIds[0]], {
    onError: async (err: Error, partitionContext: PartitionContext) => {
      console.log(`Error occurred in the subscription for ${partitionContext.partitionId}: ${err}`);
    },
    // if this subscription happens tob e the first
    defaultEventPosition: EventPosition.earliest()
  });

  // const rcvHandler = consumer.receive(onMessageHandler, onErrorHandler);

  // Waiting long enough before closing the consumer to receive event
  await delay(5000);
  await subscription.close();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
