/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to use Event Processor Host to receive events from all partitions
  of an IoTHub instance. It also shows how to checkpoint metadata for received events at regular
  intervals in an Azure Storage Blob.
*/

const { EventProcessorHost, delay } = require("@azure/event-processor-host");

// Define IoT Hub and storage connection strings here
const iotConnectionString = "";
const storageConnectionString = "";

// Use `createHostName` to create a unique name based on given prefix to use different storage containers on each run if needed.
const storageContainerName = EventProcessorHost.createHostName("iothub-container");
const ephName = "my-iothub-eph";

async function main() {
  // Start eph.
  const eph = await startEph(ephName);
  // Sleeeping for 90 seconds. This will give time for eph to receive messages.
  await delay(90000);
  // After 90 seconds stop eph.
  await stopEph(eph);
}

main().catch((err) => {
  console.log("Exiting from main() due to an error: %O.", err);
});

/**
 * Creates an EPH with the given name and starts the EPH.
 * @param ephName The name of the EPH.
 * @returns {Promise<EventProcessorHost>} Promise<EventProcessorHost>
 */
async function startEph(ephName) {
  // Create an Event Processor Host from an IotHub ConnectionString
  const eph = await EventProcessorHost.createFromIotHubConnectionString(
    ephName,
    storageConnectionString,
    storageContainerName,
    iotConnectionString,
    {
      onEphError: (error) => {
        console.log("[%s] Error: %O", ephName, error);
      }
    }
  );
  // Message handler
  const partionCount = {};
  const onMessage = async (context, event) => {
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
  const onError = (error) => {
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
async function stopEph(eph) {
  console.log("Stopping the EPH - '%s'.", eph.hostName);
  await eph.stop();
  console.log("Successfully stopped the EPH - '%s'.", eph.hostName);
}
