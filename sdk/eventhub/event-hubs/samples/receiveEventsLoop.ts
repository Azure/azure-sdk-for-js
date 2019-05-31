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
const eventHubName = "";

async function main(): Promise<void> {
  const client = EventHubClient.createFromConnectionString(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  const receiver = client.createReceiver(partitionIds[0], {
    eventPosition: EventPosition.fromFirstAvailableEvent(),
    consumerGroup: "$Default"
  });
  const batchSize = 1;

  try {
    for (let i = 0; i < 5; i++) {
      const events = await receiver.receiveBatch(batchSize, 5);
      if (!events.length) {
        console.log("No more events to receive");
        break;
      }
      console.log(`Received events: ${events.map(event => event.body)}`);
    }

    let iteratorCount = 0;
    for await (const events of receiver.getEventIterator({ preFetchCount: 5 })) {
      iteratorCount++;
      console.log(`Received event: ${events.body}`);
      if (iteratorCount === 5) {
        break;
      }
    }

    await receiver.close();
  } finally {
    await client.close();
  }
}

main().catch(err => {
  console.log("Error occurred: ", err);
});
