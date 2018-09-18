@azure/event-processor-host
================

Azure Event Processor Host helps you efficiently receive events from an EventHub. It will create EventHub Receivers
across all the partitions in the provided consumer group of an EventHub and provide you messages received across
all the partitions. It will checkpoint metadata about the received messages at regular interval in an
Azure Storage Blob. This makes it easy to continue receiving messages from where you left at a later time.

#### Conceptual Overview
![overview](https://raw.githubusercontent.com/Azure/azure-event-hubs-node/master/processor/eph.png)

- More information about Azure Event Processor Host can be found over [here](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-event-processor-host).
- General overview of how the Event Processor Host SDK works internally can be found over [here](https://github.com/Azure/azure-event-hubs-node/blob/master/processor/overview.md).

## Pre-requisite ##
- **Node.js version: 8.x or higher.** We would encourage you to install the latest available LTS version at any given time from https://nodejs.org. **Please do not use older LTS versions of node.js.**

## Installation ##
```bash
npm install @azure/event-processor-host
```
## IDE ##
This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com) 
or any other IDE that provides better intellisense and exposes the full power of source code documentation.

## Debug logs ##

You can set the following environment variable to get the debug logs.

- Getting debug logs **only** from the Event Processor Host SDK
```bash
export DEBUG=azure:eph*
```
- Getting debug logs from the Event Processor Host SDK **and** the protocol level library.
```bash
export DEBUG=azure:eph*,rhea*
```
- Getting debug logs from the **Event Processor Host SDK, the Event Hub SDK and the protocol level library.**
```bash
export DEBUG=azure*,rhea*
```
- If you are **not interested in viewing the message transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:
```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```
- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:
```bash
export DEBUG=azure:eph:error,azure:event-hubs:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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
- Examples can be found over [here](https://github.com/Azure/azure-event-hubs-node/tree/master/processor/examples).

## Usage

### NOTE
The following samples focus on EPH (Event Processor Host) which is responsible for receiving messages.
For sending messages to the EventHub, please use the `azure-event-hubs` package from npm. More
information about the event hub client can be found over [here](https://github.com/Azure/azure-event-hubs-node/tree/master/client).
You can also use [this example](https://github.com/Azure/azure-event-hubs-node/tree/master/processor/examples/sendBatch.ts) that sends
multiple messages batched together. You should be able to run the `send` example from one terminal window and see those messages
being received in the `singleEph` or `multipleEph` example being run in the second terminal window.

### Single EPH instance.

```js
const { EventProcessorHost, delay } = require("@azure/event-processor-host");

const path = process.env.EVENTHUB_NAME;
const storageCS = process.env.STORAGE_CONNECTION_STRING;
const ehCS = process.env.EVENTHUB_CONNECTION_STRING;
const storageContainerName = "test-container";

async function main() {
  // Create the Event Processo Host
  const eph = EventProcessorHost.createFromConnectionString(
    EventProcessorHost.createHostName("my-host"),
    storageCS,
    storageContainerName,
    ehCS,
    {
      eventHubPath: path
    },
    onEphError: (error) => {
      console.log("This handler will notify you of any internal errors that happen " +
      "during partition and lease management: %O", error);
    }
  );
  let count = 0;
  // Message event handler
  const onMessage = async (context/*PartitionContext*/, data /*EventData*/) => {
    console.log(">>>>> Rx message from '%s': '%s'", context.partitionId, data.body);
    count++;
    // let us checkpoint every 100th message that is received across all the partitions.
    if (count % 100 === 0) {
      return await context.checkpoint();
    }
  };
  // Error event handler
  const onError = (error) => {
    console.log(">>>>> Received Error: %O", error);
  };
  // start the EPH
  await eph.start(onMessage, onError);
  // After some time let' say 2 minutes
  await delay(120000);
  // This will stop the EPH.
  await eph.stop();
}

main().catch((err) => {
  console.log(err);
});
```

### Multiple EPH instances in the same process.
This example creates 2 instances of EPH in the same process. It is also perfectly fine to create
multiple EPH instances in different processes on the same or different machine.

```js
const { EventProcessorHost, delay } = require("@azure/event-processor-host");

// set the values from environment variables.
const path = process.env.EVENTHUB_NAME || "";
const storageCS = process.env.STORAGE_CONNECTION_STRING;
const ehCS = process.env.EVENTHUB_CONNECTION_STRING;

// set the names of eph and the lease container.
const storageContainerName = "test-container";
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
async function sleep(timeInSeconds /**number**/) {
  console.log(">>>>>> Sleeping for %d seconds..", timeInSeconds);
  await delay(timeInSeconds * 1000);
}

/**
 * Creates an EPH with the given name and starts the EPH.
 * @param ephName The name of the EPH.
 * @returns {Promise<EventProcessorHost>} Promise<EventProcessorHost>
 */
async function startEph(ephName /**string**/) {
  // Create the Event Processor Host
  const eph = EventProcessorHost.createFromConnectionString(
    ephName,
    storageCS,
    storageContainerName,
    ehCS,
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
  let count = 0;
  const onMessage /**OnReceivedMessage**/ = async (context /**PartitionContext**/, data /**EventData**/) => {
    count++;
    console.log("##### [%s] %d - Rx message from '%s': '%s'", ephName, count, context.partitionId,
      data.body);
    // Checkpointing every 200th event that is received acrosss all the partitions.
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
  const onError /**OnReceivedError**/ = (error) => {
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
async function stopEph(eph /**EventProcessorHost**/) {
  console.log(">>>>>> Stopping the EPH - '%s'.", eph.hostName);
  await eph.stop();
  console.log(">>>>>> Successfully stopped the EPH - '%s'.", eph.hostName);
}
```

### EPH with IotHub connection string

```js
const { EventProcessorHost, delay } = require("@azure/event-processor-host");

const path = process.env.EVENTHUB_NAME || "";
const storageCS = process.env.STORAGE_CONNECTION_STRING;
const iothubCS = process.env.IOTHUB_CONNECTION_STRING;
const storageContainerName = "test-container";

async function main() {
  // Create the Event Processo Host
  const eph = await EventProcessorHost.createFromIotHubConnectionString(
    EventProcessorHost.createHostName("my-host"),
    storageCS,
    storageContainerName,
    iothubCS,
    {
      eventHubPath: path
    }
  );
  let count = 0;
  // Message event handler
  const onMessage = async (context/*PartitionContext*/, data /*EventData*/) => {
    console.log(">>>>> Rx message from '%s': '%s'", context.partitionId, data.body);
    count++;
    // let us checkpoint every 100th message that is received across all the partitions.
    if (count % 100 === 0) {
      return await context.checkpoint();
    }
  };
  // Error event handler
  const onError = (error) => {
    console.log(">>>>> Received Error: %O", error);
  };
  // start the EPH
  await eph.start(onMessage, onError);
  // After some time let' say 2 minutes
  await delay(120000);
  // This will stop the EPH.
  await eph.stop();
}

main().catch((err) => {
  console.log(err);
});
```

## AMQP Dependencies ##
It depends on [rhea](https://github.com/amqp/rhea) library for managing connections, sending and receiving events over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.
