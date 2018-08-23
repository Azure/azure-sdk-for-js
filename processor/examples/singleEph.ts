import { EventProcessorHost, OnReceivedError, OnReceivedMessage, EventData, PartitionContext, delay } from "../lib";
import * as dotenv from "dotenv";
dotenv.config();

const storageConnectionString = "STORAGE_CONNECTION_STRING";
const ehconnectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const path = process.env[entityPath] || "";
const storageCS = process.env[storageConnectionString];
const ehCS = process.env[ehconnectionString];

async function main() {
  // Create the Event Processo Host
  const eph = EventProcessorHost.createFromConnectionString(
    EventProcessorHost.createHostName("my-host"),
    storageCS!,
    ehCS!,
    {
      eventHubPath: path,
      leasecontainerName: "my-container",
      onEphError: (error) => {
        console.log(">>>>>>> EPH Error: %O", error);
      }
    }
  );
  // Message handler
  let count: number = 0;
  const onMessage: OnReceivedMessage = async (context: PartitionContext, data: EventData) => {
    count++;
    console.log("##### %d - Rx message from '%s': '%s'", count, context.partitionId, data.body);
    if (count % 200 === 0) {
      try {
        await context.checkpoint();
        console.log("$$$$ Successfully checkpointed message number %d", count);
      } catch (err) {
        console.log(">>>>>>> An error occurred while checkpointing msg number %d: %O", count, err);
      }
    }
  };
  // Error handler
  const onError: OnReceivedError = (error) => {
    console.log(">>>>> Received Error: %O", error);
  };
  console.log(">>>>>> Starting the EPH");
  await eph.start(onMessage, onError);
  console.log(">>>>>> Sleeping for 80 seconds..");
  await delay(80000);
  console.log(">>>>>> Stopping the EPH");
  await eph.stop();
  console.log(">>>>>> Successfully stopped the EPH");
}

main().catch((err) => {
  console.log(err);
});
