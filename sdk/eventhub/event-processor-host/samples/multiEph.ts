/*
  This sample demonstrates how to use multiple instances of Event Processor Host in the same process
  to receive events from all partitions. It also shows how to checkpoint metadata for received events
  at regular intervals in an Azure Storage Blob.

  If your Event Hubs instance doesn't have any events, then please run "sendBatch.ts" sample
  to populate Event Hubs before running this sample.

  See https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-event-processor-host
  to learn about Event Processor Host.
*/

import {
  EventProcessorHost, OnReceivedError, OnReceivedMessage, EventData, PartitionContext, delay
} from "@azure/event-processor-host";

// Define Storage and Event Hubs connection strings and related Event Hubs entity name here
const ehConnectionString = "";
const eventHubsName = "";
const storageConnectionString = "";

// set the names of eph and the storage container.
// Use `createHostName` to create a unique name based on given prefix to use different storage containers on each run if needed.
const storageContainerName = EventProcessorHost.createHostName("test-container");
const ephName1 = "eph-1";
const ephName2 = "eph-2";

/**
 * The main function that executes the sample.
 */
async function main(): Promise<void> {
  // 1. Start eph-1.
  const eph1 = await startEph(ephName1);
  await sleep(20);
  // 2. After 20 seconds start eph-2.
  const eph2 = await startEph(ephName2);
  await sleep(90);
  // 3. Now, load will be evenly balanced between eph-1 and eph-2. After 90 seconds stop eph-1.
  await stopEph(eph1);
  await sleep(40);
  // 4. Now, eph-1 will regain access to all the partitions and will close after 40 seconds.
  await stopEph(eph2);
}

// calling the main().
main().catch(err => {
  console.log("Error occurred: ", err);
});

/**
 * Sleeps for the given number of seconds.
 * @param timeInSeconds Time to sleep in seconds.
 */
async function sleep(timeInSeconds: number): Promise<void> {
  console.log(">>>>>> Sleeping for %d seconds..", timeInSeconds);
  await delay(timeInSeconds * 1000);
}

/**
 * Creates an EPH with the given name and starts the EPH.
 * @param ephName The name of the EPH.
 * @returns {Promise<EventProcessorHost>} Promise<EventProcessorHost>
 */
async function startEph(ephName: string): Promise<EventProcessorHost> {
  // Create the Event Processor Host
  const eph = EventProcessorHost.createFromConnectionString(
    ephName,
    storageConnectionString!,
    storageContainerName,
    ehConnectionString!,
    {
      eventHubPath: eventHubsName,
      // This method will provide errors that occur during lease and partition management. The
      // errors that occur while receiving messages will be provided in the onError handler
      // provided in the eph.start() method.
      onEphError: (error: any) => {
        console.log("[%s] Error: %O", ephName, error);
      }
    }
  );
  // Message handler
  const partionCount: { [x: string]: number } = {};
  const onMessage: OnReceivedMessage = async (context: PartitionContext, data: EventData) => {
    (!partionCount[context.partitionId])
      ? partionCount[context.partitionId] = 1
      : partionCount[context.partitionId]++;
    console.log("[%s] %d - Received message from partition: '%s', offset: '%s'", ephName,
      partionCount[context.partitionId], context.partitionId, data.offset);
    // Checkpointing every 100th event
    if (partionCount[context.partitionId] % 100 === 0) {
      try {
        console.log("[%s] EPH is currently receiving messages from partitions: %O", ephName,
          eph.receivingFromPartitions);
        await context.checkpointFromEventData(data);
        console.log("[%s] Successfully checkpointed message number %d", ephName,
          partionCount[context.partitionId]);
      } catch (err) {
        console.log("[%s] An error occurred while checkpointing msg number %d: %O",
          ephName, partionCount[context.partitionId], err);
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
