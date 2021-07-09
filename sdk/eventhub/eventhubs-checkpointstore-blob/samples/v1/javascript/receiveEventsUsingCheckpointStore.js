// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates how to use the EventHubConsumerClient to process events from all partitions
 * of a consumer group in an Event Hubs instance, as well as checkpointing along the way.
 *
 * Checkpointing using a durable store allows your application to be more resilient. When you restart
 * your application after a crash (or an intentional stop), your application can continue consuming
 * events from where it last checkpointed.
 */

const { EventHubConsumerClient } = require("@azure/event-hubs");

const { ContainerClient, StorageSharedKeyCredential } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");

const connectionString =
  process.env["EVENT_HUB_CONNECTION_STRING"] || "<event-hub-connection-string>";
const eventHubName = process.env["EVENT_HUB_NAME"] || "<eventHubName>";
const consumerGroup =
  process.env["EVENT_HUB_CONSUMER_GROUP"] || EventHubConsumerClient.defaultConsumerGroupName;
const storageContainerUrl =
  process.env["STORAGE_CONTAINER_URL"] ||
  "https://<storageaccount>.blob.core.windows.net/<containername>";
const storageAccountName = process.env["STORAGE_ACCOUNT_NAME"] || "<storageaccount>";
const storageAccountKey = process.env["STORAGE_ACCOUNT_KEY"] || "<key>";

async function main() {
  // this client will be used by our eventhubs-checkpointstore-blob, which
  // persists any checkpoints from this session in Azure Storage
  const storageCredential = new StorageSharedKeyCredential(storageAccountName, storageAccountKey);
  const containerClient = new ContainerClient(storageContainerUrl, storageCredential);

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

  // The below code will set up your program to listen to events from your Event Hub instance.
  // If your Event Hub instance doesn't have any events, then please run "sendEvents.ts" from the event-hubs project
  // located here: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/sendEvents.ts

  const subscription = consumerClient.subscribe({
    processEvents: async (events, context) => {
      if (events.length === 0) {
        // If the wait time expires (configured via options in maxWaitTimeInSeconds) Event Hubs
        // will pass you an empty array.
        return;
      }

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
        `Successfully checkpointed event with sequence number: ${
          events[events.length - 1].sequenceNumber
        } from partition: 'partitionContext.partitionId'`
      );
    },
    processError: async (err, context) => {
      console.log(`Error on partition "${context.partitionId}": ${err}`);
    }
  });

  // after 30 seconds, stop processing
  await new Promise((resolve) => {
    setTimeout(async () => {
      await subscription.close();
      await consumerClient.close();
      resolve();
    }, 30000);
  });
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
