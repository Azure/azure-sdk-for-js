/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to receive a given number of events using two different apis.
  We receive events from the first partition in the default consumer group of an Event Hubs instance
  in this sample.

  If your Event Hubs instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate Event Hubs before running this sample.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import { EventHubClient, EventPosition } from "@azure/event-hubs";

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main(): Promise<void> {
  const client = new EventHubClient(connectionString, eventHubName);
  const partitionIds = await client.getPartitionIds();
  const consumerGroupName = "$Default";
  const earliestEventPosition = EventPosition.earliest();
  const consumer = client.createConsumer(consumerGroupName, partitionIds[0], earliestEventPosition);

  try {
    console.log("Receiving 10 events in one go, while waiting a maximum of 5 seconds...");
    const events = await consumer.receiveBatch(10, 5);
    console.log(`Received events: ${events.map((event) => event.body)}`);

    console.log("Receiving 10 events using async iterator...");
    let count = 0;
    for await (const event of consumer.getEventIterator()) {
      count++;
      console.log(`Received event: ${event.body}`);
      if (count === 10) {
        break;
      }
    }
  } catch (err) {
    console.log("Error receiving events: ", err);
  }

  await consumer.close();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
