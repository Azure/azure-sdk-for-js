// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/*
  This sample demonstrates how to use the EventHubConsumerClient to process events from all partitions
  of a consumer group in an Event Hubs instance, as well as checkpointing along the way.

  Checkpointing using a durable store allows your application to be more resilient. When you restart
  your application after a crash (or an intentional stop), your application can continue consuming
  events from where it last checkpointed.
  
  If your Event Hub instance doesn't have any events, then please run "sendEvents.ts" sample
  to populate it before running this sample.

  Note: If you are using version 2.1.0 or lower of @azure/event-hubs library, then please use the samples at
  https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples instead.
*/

const { EventHubConsumerClient } = require("@azure/event-hubs");
const { ContainerClient } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");

// Load the .env file if it exists
require("dotenv").config({ path: "../.env" });

const connectionString = process.env["EVENTHUB_CONNECTION_STRING"] || "";
const eventHubName = process.env["EVENTHUB_NAME"] || "";
const consumerGroup = process.env["CONSUMER_GROUP_NAME"] || "";
const storageConnectionString = process.env["STORAGE_CONNECTION_STRING"] || "";
const containerName = process.env["STORAGE_CONTAINER_NAME"] || "";

export async function main() {
  console.log(`Running receiveEventsUsingCheckpointStore sample`);

  // this client will be used by our eventhubs-checkpointstore-blob, which
  // persists any checkpoints from this session in Azure Storage
  const containerClient = new ContainerClient(storageConnectionString, containerName);

  if (!(await containerClient.exists())) {
    await containerClient.create();
  }

  const checkpointStore = new BlobCheckpointStore(containerClient);

  const consumerClient = new EventHubConsumerClient(
    consumerGroup,
    connectionString,
    eventHubName,
    checkpointStore
  );

  const subscription = consumerClient.subscribe({
    processEvents: async (events, context) => {
      for (const event of events) {
        console.log(
          `Received event: '${event.body}' from partition: '${context.partitionId}' and consumer group: '${context.consumerGroup}'`
        );
      }

      try {
        // save a checkpoint for the last event now that we've processed this batch.
        await context.updateCheckpoint(events[events.length - 1]);
      } catch (err) {
        console.log(`Error when checkpointing on partition ${context.partitionId}: `, err);
        throw err;
      }

      console.log(
        `Successfully checkpointed event with sequence number: ${events[events.length - 1].sequenceNumber} from partition: '${context.partitionId}'`
      );
    },
    processError: async (err, context) => {
      console.log(`Error : ${err}`);
    }
  });

  // Wait for a bit before cleaning up the sample
  setTimeout(async () => {
    await subscription.close();
    await consumerClient.close();
    console.log(`Exiting receiveEventsUsingCheckpointStore sample`);
  }, 30 * 1000);
}

main().catch((error) => {
  console.error("Error running sample:", error);
});
