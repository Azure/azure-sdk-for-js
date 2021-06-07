/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to use Event Processor Host to receive events from all partitions
  of an Event Hub instance. It also shows how to checkpoint metadata for received events at regular
  intervals in an Azure Storage Blob.

  If your Event Hubs instance doesn't have any events, then please run "sendBatch.ts" sample
  to populate Event Hubs before running this sample.

  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-event-processor-host
  to learn about Event Processor Host.
*/

import {
  EventProcessorHost,
  OnReceivedError,
  OnReceivedMessage,
  EventData,
  PartitionContext,
  delay
} from "@azure/event-processor-host";

console.warn(
  "The package @azure/event-processor-host is deprecated in favor of @azure/event-hubs and @azure/eventhubs-checkpointstore-blob"
);

// Define storage connection string and Event Hubs connection string and related entity name here
const ehConnectionString = "";
const eventHubsName = "";
const storageConnectionString = "";

// if you want to create a unique storageContainer name for every run, use `createHostName` function, otherwise
// provide storageContainer name here.
// const storageContainerName = "my-container";
const storageContainerName = EventProcessorHost.createHostName("test-container");
const ephName = "my-eph";

export async function main(): Promise<void> {
  // Start eph.
  const eph = await startEph(ephName);
  // Sleeeping for 90 seconds. This will give time for eph to receive messages.
  await delay(90000);
  // After 90 seconds stop eph.
  await stopEph(eph);
}

/**
 * Creates an EPH with the given name and starts the EPH.
 * @param ephName The name of the EPH.
 * @returns {Promise<EventProcessorHost>} Promise<EventProcessorHost>
 */
async function startEph(ephName: string): Promise<EventProcessorHost> {
  // Create the Event Processo Host
  const eph = EventProcessorHost.createFromConnectionString(
    EventProcessorHost.createHostName(ephName),
    storageConnectionString!,
    storageContainerName,
    ehConnectionString!,
    {
      eventHubPath: eventHubsName,
      onEphError: (error: any) => {
        console.log("[%s] Error: %O", ephName, error);
      }
    }
  );
  // Message handler
  const partionCount: { [x: string]: number } = {};
  const onMessage: OnReceivedMessage = async (context: PartitionContext, event: EventData) => {
    !partionCount[context.partitionId]
      ? (partionCount[context.partitionId] = 1)
      : partionCount[context.partitionId]++;
    console.log(
      "[%s] %d - Received message from partition: '%s', offset: '%s'",
      ephName,
      partionCount[context.partitionId],
      context.partitionId,
      event.offset
    );
    // Checkpointing every 100th event received for a given partition.
    if (partionCount[context.partitionId] % 100 === 0) {
      try {
        console.log(
          "[%s] EPH is currently receiving messages from partitions: %O",
          ephName,
          eph.receivingFromPartitions
        );
        await context.checkpointFromEventData(event);
        console.log(
          "[%s] Successfully checkpointed message number %d",
          ephName,
          partionCount[context.partitionId]
        );
      } catch (err) {
        console.log(
          "[%s] An error occurred while checkpointing msg number %d: %O",
          ephName,
          partionCount[context.partitionId],
          err
        );
      }
    }
  };
  // Error handler
  const onError: OnReceivedError = (error: any) => {
    console.log("[%s] Received Error: %O", ephName, error);
  };
  console.log("Starting the EPH - %s", ephName);
  await eph.start(onMessage, onError);
  return eph;
}

/**
 * Stops the given EventProcessorHost.
 * @param eph The event processor host.
 * @returns {Promise<void>} Promise<void>
 */
async function stopEph(eph: EventProcessorHost): Promise<void> {
  console.log("Stopping the EPH - '%s'.", eph.hostName);
  await eph.stop();
  console.log("Successfully stopped the EPH - '%s'.", eph.hostName);
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});
