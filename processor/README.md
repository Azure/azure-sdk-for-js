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
## IDE ##
This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com) 
or any other IDE that provides better intellisense and exposes the full power of source code documentation.

## Debug logs ##

You can set the following environment variable to get the debug logs.

- Getting debug logs from the Event Processor Host SDK
```bash
export DEBUG=azure:eph*
```
- Getting debug logs from the Event Processor Host SDK and the protocol level library.
```bash
export DEBUG=azure:eph*,rhea*
```
- Getting debug logs from the Event Processor Host SDK, the Event Hub SDK and the protocol level library.
```bash
export DEBUG=azure*,rhea*
```
- If you are **not interested in viewing the message transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:
```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```
- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:
```bash
export DEBUG=azure:eph:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

#### Logging to a file
- Set the `DEBUG` environment variable as shown above and then run your test script as follows:
  - Logging statements from you test script go to `out.log` and logging statement from the sdk go to `debug.log`.
    ```bash
    node your-test-script.js > out.log 2>debug.log
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log` by redirecting stderr to stdout (&1), and then redirect stdout to a file:
    ```bash
    node your-test-script.js >out.log 2>&1
    ```
  - Logging statements from your test script and the sdk go to the same file `out.log`.
    ```bash
      node your-test-script.js &> out.log
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


