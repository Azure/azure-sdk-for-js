# Azure Event Hubs Checkpoint Store library for Javascript using Storage Blobs

An Azure Blob storage based solution to store checkpoints and to aid in load balancing when using `EventProcessor` from the [@azure/event-hubs](https://www.npmjs.com/package/@azure/event-hubs) library

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/eventhubs-checkpointstore-blob) | [Package (npm)](https://www.npmjs.com/package/@azure/eventhubs-checkpointstore-blob) | [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/eventhubs-checkpointstore-blob/index.html) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples)

## Getting started

### Install the package

Install the Azure Event Hubs Checkpoint Store Blob library using npm

`npm install @azure/eventhubs-checkpointstore-blob@latest`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Event Hubs Namespace](https://docs.microsoft.com/en-us/azure/event-hubs/) to use this package, and a [Storage account](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction)
If you are using this package in a Node.js application, then use Node.js 8.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

## Key concepts

## Examples

### Persistent event checkpointing with Azure Blob storage

To consume events from all the partitions of an Event Hub, you'll create an [EventProcessor](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventprocessor.html)
for a specific consumer group. When an Event Hub is created, it provides a default consumer group that can be 
used to get started.

The `EventProcessor` will delegate the processing of events to a [PartitionProcessor](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/partitionprocessor.html)
that you provide, allowing you to focus on business logic while the processor holds responsibility for managing the underlying consumer
operations including checkpointing and load balancing.

If you want to store checkpoints in [Azure Storage Blobs](https://azure.microsoft.com/en-us/services/storage/blobs/), you can provide an instance of [BlobPartitionManager](https://azure.github.io/azure-sdk-for-js/eventhubs-checkpointstore-blob/classes/blobpartitionmanager.html) to your Event Processor. `BlobPartitionManager` uses Storage Blobs to store checkpoints and balance partition load among all instances of Event Processors.

you can see how to use the `EventProcessor` in the below
example, where we use `BlobPartitionManager` that does 
checkpointing in [Azure Storage Blobs](https://azure.microsoft.com/en-us/services/storage/blobs/).

```javascript
const client = new EventHubClient("my-connection-string", "my-event-hub");
const containerClient = new ContainerClient("storage-connection-string", "container-name");
await containerClient.create();

const processor = new EventProcessor(
  EventHubClient.defaultConsumerGroupName,
  client,
PartitionProcessor,
  new BlobPartitionManager(containerClient)
);
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Eventhubs Checkpointstore Blob

```bash
export DEBUG=azure:eventhubs-checkpointstore-blob*
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:event-hubs:error,azure:eventhubs-checkpointstore-blob:error
```

### Logging to a file

- Set the `DEBUG` environment variable as shown above and then run your test script as follows:

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

## Next Steps

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/eventhub/eventhubs-checkpointstore-blob/README.png)

