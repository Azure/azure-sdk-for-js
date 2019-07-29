/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to receive events from multiple partitions.

  If your Event Hubs instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate Event Hubs before running this sample.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import {
  EventHubClient,
  EventData,
  EventPosition,
  delay,
  EventProcessor,
  PartitionContext
} from "@azure/event-hubs";

class TestEventProcessor {
  async processEvents(events: EventData[]) {
    for (const event of events) {
      console.log("Received event", event.body);
    }
    // try {
    //   // checkpoint using the last event in the batch
    //      await checkpointContext.checkpoint(events[events.length - 1]);
    // } catch (err) {
    //   console.error(`Encountered an error while checkpointing on: ${err.message}`);
    // }
  }

  async processError(error: Error) {
    console.log(`Encountered an error: ${error.message}`);
  }

  async initialize() {
    console.log(`Started processing`);
  }

  async close() {
    console.log(`Stopped processing`);
  }
}

// Define connection string and related Event Hubs entity name here
const connectionString = "";
const eventHubName = "";

async function main() {
  const client = new EventHubClient(connectionString, eventHubName);

  const eventProcessorFactory = (context: PartitionContext) => {
    return new TestEventProcessor();
  };

  const eph = new EventProcessor(
    "$Default",
    client,
    eventProcessorFactory,
    "partitionManager" as any,
    {
      initialEventPosition: EventPosition.earliest(),
      maxBatchSize: 10,
      maxWaitTime: 20
    }
  );
  await eph.start();
  // after 20 seconds, stop processing
  await delay(2000);

  await eph.stop();
  await client.close();
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
