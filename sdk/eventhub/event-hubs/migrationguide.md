# Migration Guide (EventHubs v2 to v5)

This document is intended for users that are familiar with V2 of the JavaScript SDK for Event Hubs library (`@azure/event-hubs@2.x.x` & `@azure/event-processor-host@2.x.x`) and wish 
to migrate their application to V5 of the same library.

For users new to the JavaScript SDK for Event Hubs, please see the [readme file for the @azure/event-hubs package](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/README.md).

## General changes

In the interest of simplifying the API surface we've made two distinct
clients, rather than having a single `EventHubClient`:
* [EventHubProducerClient](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubproducerclient?view=azure-node-preview)
  for sending messages.
* [EventHubConsumerClient](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubconsumerclient?view=azure-node-preview) 
  for receiving messages.

We've also merged the functionality from `EventProcessorHost` in the `@azure/event-processor-host` package into 
`EventHubConsumerClient` in the `@azure/event-hubs` package, allowing `EventHubConsumerClient` to be the single
point of entry for receiving of any type (from single partition, all partitions, or with load balancing and checkpointing features) within Event Hubs.


### Client constructors

| In v2                                          | Equivalent in v5                                                 | Sample |
|------------------------------------------------|------------------------------------------------------------------|--------|
| `EventHubClient.createFromConnectionString()`    | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts),  [sendEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/sendEvents.ts) |
| `EventHubClient.createFromAadTokenCredentials()` | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [usingAadAuth](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/usingAadAuth.ts)
| `EventProcessorHost.createFromConnectionString()`                           | `new EventHubConsumerClient(..., checkpointStore)`               | [receiveEventsUsingCheckpointStore](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEventsUsingCheckpointStore.ts) |

### Receiving events 

| In v2                                          | Equivalent in v5                                                 | Sample |
|------------------------------------------------|------------------------------------------------------------------|--------|
| `EventHubClient.receive()` and `EventHubClient.receiveBatch()`                       | `EventHubConsumerClient.subscribe()`                               | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts) |

### Sending events

| In v2                                          | Equivalent in v5                                                 | Sample |
|------------------------------------------------|------------------------------------------------------------------|--------|
| `EventHubClient.send()`                          | `EventHubConsumerClient.sendBatch()`                               | [sendEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/sendEvents.ts) |

### Minor renames

| In v2                                          | Equivalent in v5            |
|------------------------------------------------|-----------------------------|
| `EventPosition.fromStart()`                    | `EventPosition.earliest()`  |
| `EventPosition.fromEnd()`                      | `EventPosition.latest()`    |

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

// Would fail if the total size of events exceed the max size supported by the library.
await client.sendBatch(eventsToSend, partitionId);
```

In V5:
```typescript
const producer = new EventHubProducerClient(connectionString);

const eventsToSend = [
  // events go here
];

let batch = await producer.createBatch();
let i = 0;

while (i < eventsToSend.length) {
  // messages can fail to be added to the batch if they exceed the maximum size configured for
  // the EventHub.
  const isAdded = batch.tryAdd(eventsToSend[i]);

  if (isAdded) {
    console.log(`Added event number ${i} to the batch`);
    ++i;
    continue;
  }
  
  if (batch.count === 0) {
    // If we can't add it and the batch is empty that means the message we're trying to send
    // is too large, even when it would be the _only_ message in the batch.
    //
    // At this point you'll need to decide if you're okay with skipping this message entirely
    // or find some way to shrink it.
    console.log(`Message was too large and can't be sent until it's made smaller. Skipping...`);
    ++i;
    continue;
  }

  // otherwise this just signals a good spot to send our batch
  console.log(`Batch is full - sending ${batch.count} messages as a single batch.`);
  await producer.sendBatch(batch);

  // and create a new one to house the next set of messages
  batch = await producer.createBatch();
}

// send any remaining messages, if any.
if (batch.count > 0) {
  console.log(`Sending remaining ${batch.count} messages as a single batch.`)
  await producer.sendBatch(batch);
}
```

### Migrating code from `EventProcessorHost` to `EventHubConsumerClient` for receiving events

In V2, `EventProcessorHost` allowed you to balance the load between multiple instances of 
your program when receiving events.

In V5, `EventHubConsumerClient` allows you to do the same with the `subscribe()` method if you
pass a `CheckpointStore` to the constructor.

So in V2:
```typescript
const eph = EventProcessorHost.createFromConnectionString(
  EventProcessorHost.createHostName(ephName),
  storageConnectionString,
  storageContainerName,
  ehConnectionString,
  {
    eventHubPath: eventHubName,
    onEphError: (error) => {
      // This is your error handler for errors occuring during load balancing.
      console.log("[%s] Error: %O", ephName, error);
    }
  }
);

// In V2, you get a single event passed to your callback. If you had asynchronous code running in your callback,
// it is not awaited before the callback is called for the next event.
const onMessage = (context, event) => { /** your code here **/ }

// This is your error handler for errors occuring when receiving events.
const onError = (error) => {
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
    // In V5 we deliver events in batches, rather than a single message at a time.
    // You can control the batch size via the options passed to the client.
    //
    // If you have asynchronous code running in your callback, it will be awaited before the
    // callback is called for the next batch of events. 
    processEvents: (events, context) => {},

    // Prior to V5 errors were handled by separate callbacks depending 
    // on where they were thrown i.e when managing different partitions vs receiving from each partition.
    // 
    // In V5 you only need a single error handler for all of those cases.
    processError: onErrorHandler
});
  
await subscription.close();
```
