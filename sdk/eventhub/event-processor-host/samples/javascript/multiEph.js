/*
  Copyright (c) Microsoft Corporation. All rights reserved.
  Licensed under the MIT Licence.

  This sample demonstrates how to use multiple instances of Event Processor Host in the same process
  to receive events from all partitions. It also shows how to checkpoint metadata for received events
  at regular intervals in an Azure Storage Blob.

  If your Event Hubs instance doesn't have any events, then please run "sendBatch.ts" sample
  to populate Event Hubs before running this sample.

  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-event-processor-host
  to learn about Event Processor Host.
*/

const { EventProcessorHost, delay } = require("@azure/event-processor-host");

// Define Storage and Event Hubs connection strings and related Event Hubs entity name here
const ehConnectionString = "";
const eventHubsName = "";
const storageConnectionString = "";
const ephName1 = "eph-1";
const ephName2 = "eph-2";

// Use `createHostName` to create a unique name based on given prefix to use different storage containers on each run if needed.
const storageContainerName = EventProcessorHost.createHostName("test-container");

async function main() {
  // Start eph-1.
  const eph1 = await startEph(ephName1);
  await delay(20000);
  // After 20 seconds start eph-2.
  const eph2 = await startEph(ephName2);
  await delay(90000);
  // Now, load will be evenly balanced between eph-1 and eph-2. After 90 seconds stop eph-1.
  await stopEph(eph1);
  await delay(40000);
  // Now, eph-1 will regain access to all the partitions and will close after 40 seconds.
  await stopEph(eph2);
}

main().catch((err) => {
  console.log("Error occurred: ", err);
});

/**
 * Creates an EPH with the given name and starts the EPH.
 * @param ephName The name of the EPH.
 * @returns {Promise<EventProcessorHost>} Promise<EventProcessorHost>
 */
async function startEph(ephName) {
  // Create the Event Processor Host
  const eph = EventProcessorHost.createFromConnectionString(
    ephName,
    storageConnectionString,
    storageContainerName,
    ehConnectionString,
    {
      eventHubPath: eventHubsName,
      // This method will provide errors that occur during lease and partition management. The
      // errors that occur while receiving messages will be provided in the onError handler
      // provided in the eph.start() method.
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
    // Checkpointing every 100th event
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
