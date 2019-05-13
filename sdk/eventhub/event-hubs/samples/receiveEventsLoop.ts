/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how the receiveBatch() function can be used to receive events in a loop.

  If your Event Hubs instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate Event Hubs before running this sample.
*/

import { EventHubClient, EventPosition } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubsName = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubsName);
  const partitionIds = await client.getPartitionIds();
  let eventPosition = EventPosition.fromStart();
  const batchSize = 1;

  for (let i = 0; i < 10; i++) {
    const events = await client.receiveBatch(partitionIds[0], batchSize, 5, {
      eventPosition: eventPosition,
      consumerGroup: "$Default"
    });
    if (!events.length) {
      console.log("No more events to receive");
      break;
    }
    eventPosition = EventPosition.fromSequenceNumber(events[events.length - 1].sequenceNumber!);
    console.log(`Received events #${i}: ${events.map(event => event.body)}`);
  }
  await client.close();
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
