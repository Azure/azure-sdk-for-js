# Guide to migrate from @azure/event-hubs v2 to v5

This guide is intended to assist in the migration from version 2 of the Event Hubs client library `@azure/event-hubs` and version 2 of the Event Processor Host library `@azure/event-processor-host` to version 5 of the `@azure/event-hubs` library.
It will focus on side-by-side comparisons for similar operations between the two packages.

Familiarity with the version 2 of the `@azure/event-hubs` and `@azure/event-processor-host` libraries are assumed.
For those new to the Event Hubs client library, please refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/README.md).
and [Event Hubs samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/samples) for the `@azure/event-hubs` library rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
  - [Cross Service SDK improvements](#cross-service-sdk-improvements)
  - [New features](#new-features)
- [Important changes](#important-changes)

  - [Client hierarchy](#client-hierarchy)
  - [Client constructors](#client-constructors)
  - [Sending events](#sending-events)
    - [Migrating from EventHubClient to EventHubProducerClient for sending events](#migrating-from-eventhubclient-to-eventhubproducerclient-for-sending-events)
  - [Receiving messages](#receiving-messages)
    - [Migrating from EventHubClient to EventHubConsumerClient for receiving events](#migrating-from-eventhubclient-to-eventhubconsumerclient-for-receiving-events)
    - [Migrating from EventProcessorHost to EventHubConsumerClient for receiving events](#migrating-from-eventprocessorhost-to-eventhubconsumerclient-for-receiving-events)
  - [Handling backpressure](#handling-backpressure)
  - [Creating EventPosition](#creating-eventposition)
  - [Granular control over retries](#granular-control-over-retries)
  - [Handling errors](#handling-errors)

- [Additional samples](#additional-samples)

## Migration benefits

A natural question to ask when considering whether or not to adopt a new version or library is what the benefits of doing so would be. As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To try and improve the development experience across Azure services, including Event Hubs, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [TypeScript & JavaScript specific guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) was also introduced to ensure that these libraries have a natural and idiomatic feel. Further details are available in the guidelines for those interested.

### Cross Service SDK improvements

The new version of the Event Hubs library also shares some of the cross-service improvements made to the Azure development experience, such as:

- Using the new `@azure/identity` library to share a single authentication between clients.
- A unified diagnostics pipeline that offers a common view of the activities across each of the client libraries.

### New features

We have a variety of new features in version 5 of the Event Hubs library.

- Ability to create a batch of messages with the `EventHubProducerClient.createBatch()` and `EventDataBatch.tryAdd()` APIs.
  This will help you manage events to be sent in the most optimal way.
- Ability to use backpressure while receiving events to ensure you can finish processing events before getting new ones.
- Ability to configure the retry policy used by operations on the clients.
- Ability to cancel async operations on the clients using the abort signal from `@azure/abort-controller`.
- Authentication with AAD credentials using `@azure/identity`.

Refer to the [changelog](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/CHANGELOG.md) for more new features, changes and bug fixes.

## Important changes

### Client hierarchy

In the interest of simplifying the API surface, we have two distinct clients: the `EventHubProducerClient` for sending events and the `EventHubConsumerClient` for receiving events.
This is in contrast the the single `EventHubClient` that was used to create senders and receivers.
We've also merged the functionality from `EventProcessorHost` from the `@azure/event-processor-host` library into `EventHubConsumerClient`,
allowing the `EventHubConsumerClient` to be the single point of entry for receiving of any type (from single partition, all partitions, or with load balancing and checkpointing features) within Event Hubs.

### Client constructors

| In v2                                             | Equivalent in v5                                                 | Sample                                                                                                                                                                                                                                                                     |
| ------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `EventHubClient.createFromConnectionString()`     | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/receiveEvents.ts), [sendEvents](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/sendEvents.ts) |
| `EventHubClient.createFromAadTokenCredentials()`  | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [usingAadAuth](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/usingAadAuth.ts)                                                                                                                                      |
| `EventProcessorHost.createFromConnectionString()` | `new EventHubConsumerClient(..., checkpointStore)`               | [receiveEventsUsingCheckpointStore](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/eventhubs-checkpointstore-blob/samples/v1/typescript/src/receiveEventsUsingCheckpointStore.ts)                                                                        |

Other noteworthy changes:

- In v5, the `EventHubConsumerClient` class takes the consumer group name as a mandatory argument in its constructor.
  If you havent created any consumer groups explicitly, then use the name of the default consumer group which is `$Default`.
- For a checkpoint store implementation using Azure Storage Blobs, use the
  [@azure/eventhubs-checkpointstore-blob](https://www.npmjs.com/package/@azure/eventhubs-checkpointstore-blob) package.

Important note on checkpoints: `EventHubConsumerClient` does not support legacy checkpoint data.
i.e. the checkpoints made using the package `@azure/event-processor-host`.
In order to support interopability between different programming languages, a unifying checkpoint format was needed.
This and the need to support improvements to the algorithm used for managing partition ownership made breaking changes necessary.

### Sending events

| In v2                              | Equivalent in v5                               | Sample                                                                                                                            |
| ---------------------------------- | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `EventHubClient.sendBatch(events)` | `EventHubProducerClient.sendBatch(eventBatch)` | [sendEvents](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/sendEvents.ts) |

Other noteworthy changes:

- The `send` method on the client that allowed sending single events in each call is removed
  in favor of the `sendBatch` to encourage sending events in batches for better throughput.
- The `sendBatch` method on the client has two overloads. One takes an array of events. The other takes an
  object of type `EventDataBatch` that should be created using the `createBatch` method on the client. This object represents the batch and can be safely filled until the maximum size allowed.

#### Migrating from `EventHubClient` to `EventHubProducerClient` for sending events

In V2, there were multiple options on how to send data.

In V5, this has been consolidated into a more efficient `sendBatch` method.
Batching merges information from multiple messages into a single send, reducing
the amount of network communication needed vs sending messages one at a time.

Note: As of version 5.2.0, `sendBatch` also accepts an array of events to send.
This can be used if you're sure that the events you're sending can fit within a single batch.
Creating a batch using `createBatch` and adding events using `batch.tryAdd()` is the safest way to send events since you can be sure the batch size won't exceed service limits.

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
  console.log(`Sending remaining ${batch.count} messages as a single batch.`);
  await producer.sendBatch(batch);
}
```

### Receiving events

| In v2                                                          | Equivalent in v5                     | Sample                                                                                                                                  |
| -------------------------------------------------------------- | ------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `EventHubClient.receive()` and `EventHubClient.receiveBatch()` | `EventHubConsumerClient.subscribe()` | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/receiveEvents.ts) |

Other noteworthy changes:

- Use the `options` parameter to the `subscribe()` method to specify starting position to receive events from.
- The `subscribe()` method allows you to receive events in batches whose size can be configured using the `options` parameter.
- The user provided `processEvents` function to process events will be invoked only after the previous invocation completes.
  This is different from v2 where the function was invoked for each event without waiting for the previous call to complete.

#### Migrating from `EventHubClient` to `EventHubConsumerClient` for receiving events

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
import { EventHubConsumerClient, earliestEventPosition } from "@azure/event-hubs";

const eventHubConsumerClient = new EventHubConsumerClient(consumerGroupName, connectionString);

const subscription = eventHubConsumerClient.subscribe(
  partitionId,
  {
    processInitialize: (initContext) => {
      initContext.setStartingPosition(earliestEventPosition);
    },
    processEvents: onMessageHandler,
    processError: onErrorHandler
  },
  {
    startPosition: earliestEventPosition
  }
);

await subscription.close();
```

See [`receiveEvents.ts`](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/receiveEvents.ts)
for a sample program demonstrating this.

#### Migrating from `EventProcessorHost` to `EventHubConsumerClient` for receiving events

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
      console.log("Error when running EPH: %O", error);
    }
  }
);

// In V2, you get a single event passed to your callback. If you had asynchronous code running in your callback,
// it is not awaited before the callback is called for the next event.
const onMessage = (context, event) => {
  /** Your code to process the event here **/

  // Note: EventProcessorHost can invoke the onMessage handler
  // before the previous onMessage handler invocation has completed.
  // Special care needs to be taken to ensure that checkpointing happens
  // on events in order.
  context.checkpointFromEventData(event);
};

// This is your error handler for errors occuring when receiving events.
const onError = (error) => {
  console.log("Received Error: %O", error);
};

await eph.start(onMessage, onError);
```

And in V5:

```typescript
import { EventHubConsumerClient, CheckpointStore } from "@azure/event-hubs";
import { ContainerClient } from "@azure/storage-blob";
import { BlobCheckpointStore } from "@azure/eventhubs-checkpointstore-blob";

const containerClient = new ContainerClient(storageConnectionString, storageContainerName);
const checkpointStore: CheckpointStore = new BlobCheckpointStore(containerClient);
const eventHubConsumerClient = new EventHubConsumerClient(
  consumerGroupName,
  ehConnectionString,
  eventHubName
);

const subscription = eventHubConsumerClient.subscribe(partitionId, {
  // In V5 we deliver events in batches, rather than a single message at a time.
  // You can control the batch size via the options passed to the client.
  //
  // If your callback is an async function or returns a promise, it will be awaited before the
  // callback is called for the next batch of events.
  processEvents: (events, context) => {
    /** Your code to process events here **/

    // The events array could be empty, so only checkpoint if it contained events.
    if (events.length) {
      // Save a checkpoint for the last event now that we've processed this batch.
      // Note: EventHubConsumerClient will wait for `processEvents` to return before
      // calling it again for the same partition id.
      // This allows you to safely update your checkpoints while receiving events.
      await context.updateCheckpoint(events[events.length - 1]);
    }
  },

  // Prior to V5, errors were handled by separate callbacks depending
  // on where they were thrown i.e when managing different partitions vs receiving from each partition.
  //
  // In V5, you only need a single error handler for all of those cases.
  processError: (error, context) => {
    if (context.partitionId) {
      console.log("Error when receiving events from partition %s: %O", context.partitionId, error);
    } else {
      console.log("Error from the consumer client: %O", error);
    }
  }
});

await subscription.close();
```

### Handling backpressure

Prior to V5, events were delivered as they were received with no ability
for the user to control the pace. This could result in flooding of downstream
dependencies as well as confusion about which events had been consumed in
what order, making checkpointing difficult to do correctly.

In V5 the model has been simplified so new events are not delivered until the
previous batch has been consumed by your event handler. You can see a sample
demonstrating this [here](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/samples/v5/typescript/src/receiveEvents.ts)

### Creating EventPosition

| In v2                                     | Equivalent in v5            |
| ----------------------------------------- | --------------------------- |
| `EventPosition.fromStart()`               | `earliestEventPosition`     |
| `EventPosition.fromEnd()`                 | `latestEventPosition`       |
| `EventPosition.fromOffset(value)`         | `{ offset: value }`         |
| `EventPosition.fromSequenceNumber(value)` | `{ sequenceNumber: value }` |
| `EventPosition.fromEnqueuedTime(value)`   | `{ enqueuedOn: value }`     |

### Granular control over retries

Retry logic and tuning has been externalized, allowing for better configuration
to better suit your network configuration and reliability.

More information about configuring and tuning retries can be found [here](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs#guidance-around-retries).

### Handling errors

- In v2, the `name` property on an error of class `MessagingError` was used to reflect the different
  error types like `InternalServerError`, `ServiceUnavailableError`, `OperationTimeoutError` etc. In v5,
  the `name` property will always have the value "MessagingError". The new `code` property will contain
  the different error types instead.
- In v2, network related system errors with `code` ENOTFOUND, ECONNREFUSED were passed to the user after
  getting converted to a `MessagingError` with custom names. In v5, such errors will retain their `code`.
- In v2, when receiving events, after calling the user-provided error callback, the `receive()` method
  would stop receiving events and the user was expected to call it again.
  In v5, after calling the user-provided error callback, the `subscribe()` method will resume receiving
  events from the last checkpointed position.

## Additional samples

More examples can be found at [samples for @azure/event-hubs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/samples).

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-hubs%2FMIGRATIONGUIDE.png)
