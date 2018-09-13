// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  EventProcessorHost, OnReceivedError, OnReceivedMessage, EventData, PartitionContext, delay
} from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

// set the values from environment variables.
const storageConnectionString = "STORAGE_CONNECTION_STRING";
const ehconnectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const path = process.env[entityPath] || "";
const storageCS = process.env[storageConnectionString];
const ehCS = process.env[ehconnectionString];

// set the names of eph and the storage container.
// creates a unique storageContainer name for every run
// if you wish to keep the name same between different runs then use the following then that is fine as well.
const storageContainerName = EventProcessorHost.createHostName("test-container");
console.log(">>>> The storage container name is: %s.", storageContainerName);
const ephName1 = "eph-1";
const ephName2 = "eph-2";

/**
 * The main function that executes the sample.
 */
async function main() {
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
  // Create the Event Processor Host
  const eph = EventProcessorHost.createFromConnectionString(
    ephName,
    storageCS!,
    storageContainerName,
    ehCS!,
    {
      eventHubPath: path,
      // This method will provide errors that occur during lease and partition management. The
      // errors that occur while receiving messages will be provided in the onError handler
      // provided in the eph.start() method.
      onEphError: (error) => {
        console.log(">>>>>>> [%s] Error: %O", ephName, error);
      }
    }
  );
  // Message handler
  let partionCount: { [x: string]: number } = {};
  const onMessage: OnReceivedMessage = async (context: PartitionContext, data: EventData) => {
    (!partionCount[context.partitionId])
      ? partionCount[context.partitionId] = 1
      : partionCount[context.partitionId]++;
    console.log("##### [%s] %d - Rx message from partition: '%s', offset: '%s'", ephName,
      partionCount[context.partitionId], context.partitionId, data.offset);
    // Checkpointing every 100th event
    if (partionCount[context.partitionId] % 100 === 0) {
      try {
        console.log("***** [%s] EPH is currently receiving messages from partitions: %O", ephName,
          eph.receivingFromPartitions);
        await context.checkpoint();
        console.log("$$$$ [%s] Successfully checkpointed message number %d", ephName,
          partionCount[context.partitionId]);
      } catch (err) {
        console.log(">>>>>>> [%s] An error occurred while checkpointing msg number %d: %O",
          ephName, partionCount[context.partitionId], err);
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
