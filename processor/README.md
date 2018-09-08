azure-event-processor-host
================

_This SDK is currently in preview._

Azure Event Processor Host helps you efficiently receive events from an EventHub. It will create EventHub Receivers
across all the partitions in the consumer group of an EventHub and provide you messages received across
all the partitions. It will checkpoint metadata about the received messages at regular interval in an
Azure Storage Blob. This makes it easy to continue receiving messages from where you left at a later time.

- **Node.js version: 8.x or higher.** We would encourage you to install the latest available LTS version from https://nodejs.org.

## Installation ##
```bash
npm install azure-event-processor-host
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

### Single EPH instance.

```js
const { EventProcessorHost, delay } = require("azure-event-processor-host");

const storageConnectionString = "STORAGE_CONNECTION_STRING";
const ehconnectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const path = process.env[entityPath] || "";
const storageCS = process.env[storageConnectionString];
const ehCS = process.env[ehconnectionString];
const leasecontainerName = "test-container";

async function main() {
  // Create the Event Processo Host
  const eph = EventProcessorHost.createFromConnectionString(
    EventProcessorHost.createHostName("my-host"),
    storageCS,
    ehCS,
    {
      eventHubPath: path,
      leasecontainerName: leasecontainerName
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

```js
const { EventProcessorHost, delay } = require("azure-event-processor-host");

// set the values from environment variables.
const storageConnectionString = "STORAGE_CONNECTION_STRING";
const ehconnectionString = "EVENTHUB_CONNECTION_STRING";
const entityPath = "EVENTHUB_NAME";
const path = process.env[entityPath] || "";
const storageCS = process.env[storageConnectionString];
const ehCS = process.env[ehconnectionString];

// set the names of eph and the lease container.
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
    ehCS,
    {
      eventHubPath: path,
      // If the lease container name is not provided, then the EPH will use it's name to create
      // a new container. It is important to provide the same container name across different EPH
      // instances for the paritions to be load balanced.
      leasecontainerName: leasecontainerName,
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

## AMQP Dependencies ##
It depends on [rhea](https://github.com/amqp/rhea) library for managing connections, sending and receiving events over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.