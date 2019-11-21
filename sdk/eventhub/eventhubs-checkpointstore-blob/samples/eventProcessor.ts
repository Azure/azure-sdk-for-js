/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to use the EventProcessor to process events from all partitions
  of a consumer group in an Event Hubs instance. It also demonstrates the process of checkpointing an event
  which helps new instances of Event Processors that may have spun up for scaling or for crash recovery.

  If your Event Hub instance doesn't have any events, then please run https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/sendEvents.ts sample
  to populate it before running this sample.
*/

import {
  EventHubConsumerClient,
  ReceivedEventData,
  PartitionContext,
  PartitionCheckpointer
} from "@azure/event-hubs";

import { ContainerClient } from "@azure/storage-blob";
import { BlobPartitionManager } from "@azure/eventhubs-checkpointstore-blob";

const connectionString = "";
const eventHubName = "";
const storageConnectionString = "";
const containerName = "";

async function main() {
  const consumerClient = new EventHubConsumerClient(connectionString, eventHubName);
  const containerClient = new ContainerClient(storageConnectionString, containerName);
  await containerClient.create();

  const processEvents = async (events: ReceivedEventData[], context: PartitionContext & PartitionCheckpointer) => {
    // events can be empty if no events were recevied in the last 60 seconds.
    // This interval can be configured when creating the EventProcessor
    if (events.length === 0) {
      return;
    }

    for (const event of events) {
      console.log(
        `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroupName}'`
      );
    }

    // checkpoint using the last event in the batch
    const lastEvent = events[events.length - 1];
    await context.updateCheckpoint(lastEvent).catch((err) => {
      console.log(`Error when checkpointing on partition ${context.partitionId}: `, err);
    });
    console.log(
      `Successfully checkpointed event with sequence number: ${lastEvent.sequenceNumber} from partition: 'partitionContext.partitionId'`
    );
  }

  const subscription = consumerClient.subscribe(EventHubConsumerClient.defaultConsumerGroupName, processEvents, new BlobPartitionManager(containerClient))

  // after 30 seconds, stop processing
  await new Promise(resolve => {
    setInterval(async () => {
      await subscription.close();
      await consumerClient.close();
      resolve();
    }, 30000)
  });
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
