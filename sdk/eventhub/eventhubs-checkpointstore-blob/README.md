# Azure Event Hubs Checkpoint Store client library for JavaScript

An Azure Blob storage based solution to store checkpoints and to aid in load balancing when using `EventHubConsumerClient` from the [@azure/event-hubs](https://www.npmjs.com/package/@azure/event-hubs) library

Key links:
- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/eventhubs-checkpointstore-blob)
- [Package (npm)](https://www.npmjs.com/package/@azure/eventhubs-checkpointstore-blob)
- [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/eventhubs-checkpointstore-blob/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/eventhubs-checkpointstore-blob/samples)

## Getting started

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Event Hubs Namespace](https://docs.microsoft.com/azure/event-hubs/)
- A [Storage account](https://docs.microsoft.com/azure/storage/blobs/storage-blobs-introduction)

### Install the package

Install the Azure Event Hubs Checkpoint Store Blob library using npm

`npm install @azure/eventhubs-checkpointstore-blob`

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

## Key concepts

- **Scale:** Create multiple consumers, with each consumer taking ownership of reading from a few Event Hubs partitions.

- **Load balance:** Applications that support load balancing consist of one or more instances of
  `EventHubConsumerClient` which have been configured to consume events from the same Event Hub and consumer group
  and the same `CheckpointStore`.
  They balance the workload across different instances by distributing the partitions to be processed among themselves.

- **Checkpointing:** It is a process by which readers mark or commit their position within a partition event sequence. Checkpointing is the responsibility of the consumer and
  occurs on a per-partition basis within a consumer group. This responsibility means that for each consumer group, each partition reader must keep track of its current position
  in the event stream, and can inform the service when it considers the data stream complete.

  If a reader disconnects from a partition, when it reconnects it begins reading at the checkpoint that was previously submitted by the last reader of that partition in that consumer group.
  When the reader connects, it passes the offset to the event hub to specify the location at which to start reading. In this way, you can use checkpointing to both mark events as "complete" by downstream applications,
  and to provide resiliency if a failover between readers running on different machines occurs. It is possible to return to older data by specifying a lower offset from this checkpointing process.
  Through this mechanism, checkpointing enables both failover resiliency and event stream replay.

  A [BlobCheckpointStore](https://docs.microsoft.com/javascript/api/@azure/eventhubs-checkpointstore-blob/blobcheckpointstore)
  is a class that implements key methods required by the EventHubConsumerClient to balance load and update checkpoints.

## Examples

- [Create a CheckpointStore using Azure Blob Storage](#create-a-checkpointstore-using-azure-blob-storage)
- [Checkpoint events using Azure Blob storage](#checkpoint-events-using-azure-blob-storage)

### Create a `CheckpointStore` using Azure Blob Storage

Use the below code snippet to create a `CheckpointStore`. You will need to provide the connection string to your storage account.

```javascript
const { ContainerClient } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");

const containerClient = new ContainerClient("storage-connection-string", "container-name");

if (!containerClient.exists()) {
  await containerClient.create(); // This can be skipped if the container already exists
}

const checkpointStore =  new BlobCheckpointStore(containerClient);
```

### Checkpoint events using Azure Blob storage

To checkpoint events received using Azure Blob Storage, you will need to pass an object
that is compatible with the [SubscriptionEventHandlers](https://docs.microsoft.com/javascript/api/@azure/event-hubs/subscriptioneventhandlers)
interface along with code to call the `updateCheckpoint()` method.

In this example, `SubscriptionHandlers` implements [SubscriptionEventHandlers](https://docs.microsoft.com/javascript/api/@azure/event-hubs/subscriptioneventhandlers) and also handles checkpointing.

```javascript
const { EventHubConsumerClient } = require("@azure/event-hubs");
const { ContainerClient } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");

const storageAccountConnectionString = "storage-account-connection-string";
const containerName = "container-name";
const eventHubConnectionString = "eventhub-connection-string";
const consumerGroup = "my-consumer-group";
const eventHubName = "eventHubName";

async function main() {
  const blobContainerClient = new ContainerClient(storageAccountConnectionString, containerName);

  if (!(await blobContainerClient.exists())) {
    await blobContainerClient.create();
  }

  const checkpointStore = new BlobCheckpointStore(blobContainerClient);
  const consumerClient = new EventHubConsumerClient(
    consumerGroup,
    eventHubConnectionString,
    eventHubName,
    checkpointStore
  );

  const subscription = consumerClient.subscribe({
    processEvents: async (events, context) => {
      // event processing code goes here
      if (events.length === 0) {
        // If the wait time expires (configured via options in maxWaitTimeInSeconds) Event Hubs
        // will pass you an empty array.
        return;
      }

      // Checkpointing will allow your service to pick up from
      // where it left off when restarting.
      //
      // You'll want to balance how often you checkpoint with the
      // performance of your underlying checkpoint store.
      await context.updateCheckpoint(events[events.length - 1]);
    },
    processError: async (err, context) => {
      // handle any errors that occur during the course of
      // this subscription
      console.log(`Errors in subscription to partition ${context.partitionId}: ${err}`);
    }
  });

  // Wait for a few seconds to receive events before closing
  await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

  await subscription.close();
  await consumerClient.close();
  console.log(`Exiting sample`);
}

main();
```

## Troubleshooting

### Logging

You can set the `AZURE_LOG_LEVEL` environment variable to one of the following values to enable logging to `stderr`:

- verbose
- info
- warning
- error

You can also set the log level programatically by importing the
[@azure/logger](https://www.npmjs.com/package/@azure/logger) package and calling the
`setLogLevel` function with one of the log level values.

When setting a log level either programatically or via the `AZURE_LOG_LEVEL` environment variable,
any logs that are written using a log level equal to or less than the one you choose will be emitted.
For example, when you set the log level to `info`, the logs that are written for levels
`warning` and `error` are also emitted.
This SDK follows the Azure SDK for TypeScript [guidelines](https://azure.github.io/azure-sdk/typescript_implementation.html#general-logging)
when determining which level to log to.

You can alternatively set the `DEBUG` environment variable to get logs when using this library.
This can be useful if you also want to emit logs from the dependencies `rhea-promise` and `rhea` as well.

**Note:** AZURE_LOG_LEVEL, if set, takes precedence over DEBUG.
Do not specify any `azure` libraries via DEBUG when also specifying
AZURE_LOG_LEVEL or calling setLogLevel.

You can set the following environment variable to get the debug logs when using this library.

- Getting only info level debug logs from the Eventhubs Checkpointstore Blob.

```bash
export DEBUG=azure:eventhubs-checkpointstore-blob:info
```

### Logging to a file

- Enable logging as shown above and then run your test script as follows:

  - Logging statements from your test script go to `out.log` and logging statements from the sdk go to `debug.log`.
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

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/eventhubs-checkpointstore-blob/samples)
directory for detailed example.

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Feventhubs-checkpointstore-blob%2FREADME.png)
