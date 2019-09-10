# Azure Checkpoint Store client library for Javascript using Storage Blobs

An Azure Blob storage based solution to store checkpoints and to aid in load balancing when using `EventProcessor` from the [@azure/event-hubs](https://www.npmjs.com/package/@azure/event-hubs) library

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/eventhubs-checkpointstore-blob) | [Package (npm)](https://www.npmjs.com/package/@azure/eventhubs-checkpointstore-blob) | [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/eventhubs-checkpointstore-blob/index.html) | [Product documentation](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-event-processor-host) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/eventhubs-checkpointstore-blob/samples)

## Getting started

### Install the package

Install the Azure Event Hubs Checkpoint Store Blob library using npm

`npm install @azure/eventhubs-checkpointstore-blob@1.0.0-preview.1`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Event Hubs Namespace](https://docs.microsoft.com/en-us/azure/event-hubs/) to use this package.
If you are using this package in a Node.js application, then use Node.js 8.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

## Key concepts

## Examples

- [Consume events from all Event Hub partitions](#consume-events-from-all-event-hub-partitions)

### Consume events from all Event Hub partitions

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
class SamplePartitionProcessor extends PartitionProcessor {
  // Gets called once before the processing of events from current partition starts.
  async initialize(partitionContext) {
    /* your code here */
  }

  // Gets called for each batch of events that are received.
  // You may choose to use the checkpoint manager to update checkpoints.
  async processEvents(events, partitionContext) {
    /* your code here */
  }

  // Gets called for any error when receiving events.
  async processError(error, partitionContext) {
    /* your code here */
  }

  // Gets called when Event Processor stops processing events for current partition.
  async close(reason, partitionContext) {
    /* your code here */
  }
}

const client = new EventHubClient("my-connection-string", "my-event-hub");
const containerClient = new ContainerClient("storage-connection-string", "container-name");
await containerClient.create();

const processor = new EventProcessor(
  EventHubClient.defaultConsumerGroupName,
  client,
PartitionProcessor,
  new BlobPartitionManager(containerClient)
);
await processor.start();
// At this point, the processor is consuming events from each partition of the Event Hub and
// delegating them to the SamplePartitionProcessor instance created for that partition.  This
// processing takes place in the background and will not block.
//
// In this example, we'll stop processing after five seconds.
await delay(5000);
await processor.stop();
```

## Troubleshooting

### AMQP Dependencies

The Event Hubs library depends on the [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving events over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Eventhubs Checkpointstore Blob

```bash
export DEBUG=azure*
```

- Getting debug logs from the Eventhubs Checkpointstore Blob, Event Hubs SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the event transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:event-hubs:error,azure:eventhubs-checkpointstore-blob:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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

