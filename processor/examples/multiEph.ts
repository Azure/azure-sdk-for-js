import {
  EventProcessorHost, OnReceivedError, OnReceivedMessage, EventData, PartitionContext, delay
} from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const storageConnectionString = "STORAGE_CONNECTION_STRING";
const ehconnectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const path = process.env[entityPath] || "";
const storageCS = process.env[storageConnectionString];
const ehCS = process.env[ehconnectionString];
const leasecontainerName = "test-container";
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
  // Create the Event Processo Host
  const eph = EventProcessorHost.createFromConnectionString(
    ephName,
    storageCS!,
    ehCS!,
    {
      eventHubPath: path,
      // If the lease container name is not provided, then the EPH will use it's name to create
      // a new container. It is important to provide the same container name across different EPH
      // instances for the paritions to be load balanced.
      leasecontainerName: leasecontainerName,
      onEphError: (error) => {
        console.log(">>>>>>> [%s] Error: %O", ephName, error);
      }
    }
  );
  // Message handler
  let count: number = 0;
  const onMessage: OnReceivedMessage = async (context: PartitionContext, data: EventData) => {
    count++;
    console.log("##### [%s] %d - Rx message from '%s': '%s'", ephName, count, context.partitionId,
      data.body);
    // Checkpointing every 200th event
    if (count % 200 === 0) {
      try {
        console.log("***** [%s] EPH is currently receiving messages from partitions: %O", ephName,
          eph.receivingFromPartitions);
        await context.checkpoint();
        console.log("$$$$ [%s] Successfully checkpointed message number %d", ephName, count);
      } catch (err) {
        console.log(">>>>>>> [%s] An error occurred while checkpointing msg number %d: %O",
          ephName, count, err);
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
