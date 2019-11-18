/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to use the EventHubConsumerClient to process events from all partitions
  of a consumer group in an Event Hubs instance. It also demonstrates the process of checkpointing an event
  which helps new instances of your application that may have spun up for scaling or for crash recovery.

  You will see the use of a Partition Manager which is crucial to balance the load of processing events
  across multiple instances of your application.

  If your Event Hub instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate it before running this sample.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

import {
  EventHubConsumerClient, CheckpointStore,
} from "@azure/event-hubs";

import { ContainerClient } from "@azure/storage-blob";
import { BlobPartitionManager } from "@azure/eventhubs-checkpointstore-blob";

const connectionString = "";
const eventHubName = "";
const storageConnectionString = "";
const containerName = "";

async function main() {
  const consumerClient = new EventHubConsumerClient(EventHubConsumerClient.defaultConsumerGroup, connectionString, eventHubName);
  
  // this client will be used by our eventhubs-checkpointstore-blob, which 
  // persists any checkpoints from this session in Azure Storage
  const containerClient = new ContainerClient(storageConnectionString, containerName);

  if (!containerClient.exists()) {
    await containerClient.create();
  }

  const checkpointStore : CheckpointStore = new BlobPartitionManager(containerClient);

  const subscription = consumerClient.subscribe(
    checkpointStore, {
      processEvent: async (event, context) => {
        console.log(`Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`);
    
        try {
          // save a checkpoint now that we've processed this event.
          await context.updateCheckpoint(event)
        } catch (err) {
          console.log(`Error when checkpointing on partition ${context.partitionId}: `, err);
          throw err;
        };

        console.log(
          `Successfully checkpointed event with sequence number: ${event.sequenceNumber} from partition: 'partitionContext.partitionId'`
        );
      }
    }
  );

  // after 30 seconds, stop processing
  await new Promise((resolve) => {
    setInterval(async () => {
      await subscription.close();
      await consumerClient.close();
      resolve();
    }, 30000);
  });
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
