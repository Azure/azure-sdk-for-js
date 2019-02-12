// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  EventProcessorHost, OnReceivedError, OnReceivedMessage, EventData, PartitionContext, delay
} from "../lib";
import dotenv from "dotenv";
dotenv.config();

const path = process.env.EVENTHUB_NAME;
const storageCS = process.env.STORAGE_CONNECTION_STRING;
const ehCS = process.env.EVENTHUB_CONNECTION_STRING;
// creates a unique storageContainer name for every run
// if you wish to keep the name same between different runs then use the following then that is fine as well.
const storageContainerName = EventProcessorHost.createHostName("test-container");
const ephName = "my-eph";

/**
 * The main function that executes the sample.
 */
async function main(): Promise<void> {
  // Please feel free to use the `./sendBatch.ts` sample to send messages to an EventHub.
  // Post that you can run this sample to start the EPH and see it in action.
  // 1. Start eph.
  const eph = await startEph(ephName);
  // 2. Sleeeping for 90 seconds. This will give time for eph to receive messages.
  await sleep(90);
  // 3. After 90 seconds stop eph.
  await stopEph(eph);
}

// calling the main().
main().catch((err) => {
  console.log("Exiting from main() due to an error: %O.", err);
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
  // Create the Event Processo Host
  const eph = EventProcessorHost.createFromConnectionString(
    EventProcessorHost.createHostName(ephName),
    storageCS!,
    storageContainerName,
    ehCS!,
    {
      eventHubPath: path,
      onEphError: (error) => {
        console.log(">>>>>>> [%s] Error: %O", ephName, error);
      }
    }
  );
  // Message handler
  const partionCount: { [x: string]: number } = {};
  const onMessage: OnReceivedMessage = async (context: PartitionContext, data: EventData) => {
    (!partionCount[context.partitionId])
      ? partionCount[context.partitionId] = 1
      : partionCount[context.partitionId]++;
    console.log("##### [%s] %d - Rx message from partition: '%s', offset: '%s'", ephName,
      partionCount[context.partitionId], context.partitionId, data.offset);
    // Checkpointing every 100th event received for a given partition.
    if (partionCount[context.partitionId] % 100 === 0) {
      const num = partionCount[context.partitionId];
      try {
        console.log("***** [%s] Number of partitions: %O", ephName, eph.receivingFromPartitions.length);
        console.log("***** [%s] EPH is currently receiving messages from partitions: %s", ephName,
          eph.receivingFromPartitions.toString());
        console.log("$$$$ [%s] Attempting to checkpoint message number %d", ephName, num);
        await context.checkpoint();
        console.log("$$$$ [%s] Successfully checkpointed message number %d", ephName, num);
      } catch (err) {
        console.log(">>>>> [%s] An error occurred while checkpointing msg number %d: %O", ephName, num, err);
      }
    }
  };
  // Error handler
  const onError: OnReceivedError = (error) => {
    console.log(">>>>> [%s] Received Error: %O", ephName, error);
  };
  console.log(">>>>>> Starting the EPH - %s", ephName);
  await eph.start(onMessage, onError);
  return eph;
}

/**
 * Stops the given EventProcessorHost.
 * @param eph The event processor host.
 * @returns {Promise<void>} Promise<void>
 */
async function stopEph(eph: EventProcessorHost): Promise<void> {
  console.log(">>>>>> Stopping the EPH - '%s'.", eph.hostName);
  await eph.stop();
  console.log(">>>>>> Successfully stopped the EPH - '%s'.", eph.hostName);
}
