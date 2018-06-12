azure-event-processor-host
================

_This SDK is currently in preview._

Azure Event Processor Host helps you efficiently receive events from an EventHub. It will create EventHub Receivers
across all the partitions in the consumer group of an EventHub and provide you messages received across
all the partitions. It will checkpoint metadata about the received messages at regular interval in an
Azure Storage Blob. This makes it easy to continue receiving messages from where you left at a later time.

- **Node.js version: 6.x or higher.** We would encourage you to install the latest available LTS version from https://nodejs.org.

## Installation ##
```bash
npm install azure-event-processor-host
```

## Examples
- Examples can be found over [here](./examples).

## Usage

```js
const { EventProcessorHost, delay } = require("azure-event-processor-host");

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
  const onMessage = (context/*PartitionContext*/, data /*EventData*/) => {
    console.log(">>>>> Rx message from '%s': '%s'", context.partitionId, data.body);
    return context.checkpoint();
  };
  // Error event handler
  const onError = (error) => {
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
```


