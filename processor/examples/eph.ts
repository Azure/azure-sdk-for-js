import { EventProcessorHost, OnEphMessage, EventData, PartitionContext, OnEphError, delay } from "../lib";
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
      leasecontainerName: "my-container"
    }
  );
  // Message event handler
  const onMessage: OnEphMessage = (context: PartitionContext, data: EventData) => {
    console.log(">>>>> Rx message from '%s': '%s'", context.partitionId, data.body);
    return context.checkpoint();
  };
  // Error event handler
  const onError: OnEphError = (error) => {
    console.log(">>>>> Received Error: %O", error);
  };
  // Register the event handlers
  eph.on(EventProcessorHost.message, onMessage);
  eph.on(EventProcessorHost.error, onError);
  // start the EPH
  await eph.start();
  // After some time let' say 2 minutes
  await delay(120000);
  // This will stop the EPH.
  await eph.stop();
}

main().catch((err) => {
  console.log(err);
});
