/*
  This sample demonstrates how the start() function can be used for Iot hub to Start the
  event processor host and provide messages received across all the partitions. It also describes
  how the checkpointFromEventData() function can be used to checkpoint metadata about the received
  messages at regular interval in an Azure Storage Blob.
*/

import {
  EventProcessorHost,
  OnReceivedError,
  OnReceivedMessage,
  EventData,
  PartitionContext,
  delay
} from "@azure/event-processor-host";

// Define IoT Hub connection string and storage connection string here
const iotConnectionString = "";
const storageConnectionString = "";

// if you want to create a unique storageContainer name for every run, use `createHostName` function, otherwise
// provide storageContainer name here.
// const storageContainerName = "my-iothub-container";
const storageContainerName = EventProcessorHost.createHostName("iothub-container");
const ephName = "my-iothub-eph";

async function main(): Promise<void> {
  // Start eph.
  const eph = await startEph(ephName);
  // Sleeeping for 90 seconds. This will give time for eph to receive messages.
  await delay(90000);
  // After 90 seconds stop eph.
  await stopEph(eph);
}

main().catch(err => {
  console.log("Exiting from main() due to an error: %O.", err);
});

/**
 * Creates an EPH with the given name and starts the EPH.
 * @param ephName The name of the EPH.
 * @returns {Promise<EventProcessorHost>} Promise<EventProcessorHost>
 */
async function startEph(ephName: string): Promise<EventProcessorHost> {
  // Create an Event Processor Host from an IotHub ConnectionString
  const eph = await EventProcessorHost.createFromIotHubConnectionString(
    ephName,
    storageConnectionString!,
    storageContainerName,
    iotConnectionString!,
    {
      onEphError: error => {
        console.log("[%s] Error: %O", ephName, error);
      }
    }
  );
  // Message handler
  const partionCount: { [x: string]: number } = {};
  const onMessage: OnReceivedMessage = async (context: PartitionContext, event: EventData) => {
    !partionCount[context.partitionId] ? (partionCount[context.partitionId] = 1) : partionCount[context.partitionId]++;
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
        console.log("[%s] Successfully checkpointed message number %d", ephName, partionCount[context.partitionId]);
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
  const onError: OnReceivedError = error => {
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
