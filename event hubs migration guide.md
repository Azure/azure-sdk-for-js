# Migration Guide (EventHubs v2 to v5)

This document is intended for users that are familiar with EventHubs V2 (`@azure/event-hubs@2.x.x` & `@azure/event-processor-host@2.x.x`) and wish 
to migrate their application to EventHubs V5.

For a more general introduction to Event Hubs, see the [readme.md](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/README.md) 
for the @azure/event-hubs package.

## General changes

In the interest of simplifying the API surface we've made two distinct
clients, rather than having a single `EventHubClient`:
* [EventHubProducerClient](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubproducerclient?view=azure-node-preview)
  for sending messages.
* [EventHubConsumerClient](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubconsumerclient?view=azure-node-preview) 
  for receiving messages.

We've also merged the functionality from `EventProcessorHost` into 
`EventHubConsumerClient`, allowing `EventHubConsumerClient` to be the single
point of entry for receiving of any type (from single partition, all partitions, or with load balancing and checkpointing features) within Event Hubs.


### Client constructors

| In v2                                          | Equivalent in v5                                                 | Sample |
|------------------------------------------------|------------------------------------------------------------------|--------|
| `EventHubClient.createFromConnectionString()`    | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts),  [sendEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/sendEvents.ts) |
| `EventHubClient.createFromAadTokenCredentials()` | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [usingAadAuth](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/usingAadAuth.ts)


### Receiving events 

| In v2                                          | Equivalent in v5                                                 | Sample |
|------------------------------------------------|------------------------------------------------------------------|--------|
| `EventHubClient.receive()` and `EventHubClient.receiveBatch()`                       | `EventHubConsumerClient.subscribe()`                               | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts) |
| `EventProcessorHost.createFromConnectionString()`                           | `new EventHubConsumerClient(..., checkpointStore)`               | [receiveEventsUsingCheckpointStore](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEventsUsingCheckpointStore.ts) |

### Sending events

| In v2                                          | Equivalent in v5                                                 | Sample |
|------------------------------------------------|------------------------------------------------------------------|--------|
| `EventHubClient.send()`                          | `EventHubConsumerClient.sendBatch()`                               | [sendEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/sendEvents.ts) |

## Migration samples

* [Receiving events](#migrating-code-from-eventhubclient-to-eventhubconsumerclient-for-receiving-events)
* [Receiving events with checkpointing](#migrating-code-from-eventprocessorhost-to-eventhubconsumerclient-for-receiving-events)
* [Sending events](#migrating-code-from-eventhubclient-to-eventhubproducerclient-for-sending-events)

### Migrating code from `EventHubClient` to `EventHubConsumerClient` for receiving events

In V2, event handlers were passed as positional arguments to `receive`.

In V5, event handlers are passed as part of a `SubscriptionEventHandlers` shaped object.

For example, this code which receives from a partition in V2:

```typescript
const client = EventHubClient.createFromConnectionString(connectionString);
const rcvHandler = client.receive(partitionId, onMessageHandler, onErrorHandler, {
  eventPosition: EventPosition.fromStart(),
  consumerGroup: consumerGroupName
});
await rcvHandler.stop();
```

Becomes this in V5:

```typescript
const eventHubConsumerClient = new EventHubConsumerClient(consumerGroupName, connectionString);

const subscription = eventHubConsumerClient.subscribe(
  partitionId, {
    processInitialize: (initContext) => {
      initContext.setStartingPosition(EventPosition.fromStart());
    },
    processEvents: onMessageHandler,
    processError: onErrorHandler
});
  
await subscription.close();
```

See [`receiveEvents.ts`](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts) 
for a sample program demonstrating this.

### Migrating code from `EventHubClient` to `EventHubProducerClient` for sending events

In V2, there were multiple options on how to send data.

In V5, this has been consolidated into a more efficient `sendBatch` method. 
Batching merges information from multiple messages into a single send, reducing
the amount of network communication needed vs sending messages one at a time.

So in V2:
```typescript
const eventsToSend = [
  // events go here
];

const client = EventHubClient.createFromConnectionString(connectionString);
console.log(`Sending event: ${eventData.body}`);

// Would fail if the total size of events exceed the max size supported by the library.
await client.send(eventsToSend, partitionId);
```

In V5:
```typescript
const producer = new EventHubProducerClient(connectionString);

const eventsToSend = [
  // events go here
];

let batch = await producer.createBatch();

for (const event of eventsToSend) {
  // messages can fail to be added to the batch if they exceed the maximum size configured for
  // the EventHub.
  const isAdded = batch.tryAdd({ body: event });
  
  if (!isAdded) {
    if (batch.count === 0) {
      // if we can't add it and the batch is empty that means the message we're trying to send
      // is too large, even when it would be the _only_ message in the batch.
      //
      // To fix this you'll need to split the message up across multiple batches or 
      // skip it. In this example, we'll skip the message.
      console.log(`Message was too large and can't be sent until it's made smaller. Skipping...`);
      continue;
    }

    // otherwise this just signals a good spot to send our batch
    console.log(`Batch is full - sending ${batch.count} messages as a single batch.`)
    await producer.sendBatch(batch);

    // and create a new one to house the next set of messages
    batch = await producer.createBatch();
    continue;
  }
}

// send any remaining messages, if any.
if (batch.count > 0) {
  console.log(`Sending remaining ${batch.count} messages as a single batch.`)
  await producer.sendBatch(batch);
}
```

### Migrating code from `EventProcessorHost` to `EventHubConsumerClient` for receiving events

In V2, `EventProcessorHost` allowed you to start receiving events, delivered via callbacks.

In V5, `EventHubConsumerClient` allows you to do the same with `subscribe()` and the 
`SubscriptionEventHandlers` interface.

So in V2:
```typescript
const eph = EventProcessorHost.createFromConnectionString(
  EventProcessorHost.createHostName(ephName),
  storageConnectionString,
  storageContainerName,
  ehConnectionString,
  {
    eventHubPath: eventHubName,
    onEphError: (error: any) => {
      console.log("[%s] Error: %O", ephName, error);
    }
  }
);

const onMessage: OnReceivedMessage = async (context: PartitionContext, event: EventData) => { }

const onError: OnReceivedError = (error: any) => {
  console.log("[%s] Received Error: %O", ephName, error);
};

await eph.start(onMessage, onError);
```

And in V5:
```typescript
import { EventHubConsumerClient, CheckpointStore } from "@azure/event-hubs";
import { ContainerClient } from "@azure/storage-blob";
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";

const containerClient = new ContainerClient(storageConnectionString, storageContainerName);
const checkpointStore : CheckpointStore = new BlobCheckpointStore(containerClient);
const eventHubConsumerClient = new EventHubConsumerClient(consumerGroupName, ehConnectionString, eventHubName);

const subscription = eventHubConsumerClient.subscribe(
  partitionId, {
    // In V5 we deliver messages in batches, rather than a single message 
    // at a time. You can control the batch size via the options passed to the client.
    processEvents: (messages, context) => {},

    // Prior to V5 errors were handled by separate callbacks depending 
    // on where they were thrown.
    // 
    // In V5 you only need a single error handler for all of those cases.
    processError: onErrorHandler
});
  
await subscription.close();
```
