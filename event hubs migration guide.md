# Migration Guide (EventHubs 2 to 5)

## Class changes

`EventHubClient` has been split into two clients - `EventHubProducerClient` (for sending
messages) and `EventHubConsumerClient` (for receiving messages).

`EventProcessorHost`'s functionality has been merged into `EventHubConsumerClient` as well.

| In v2                                          | Equivalent in v5                                                 | Sample |
|------------------------------------------------|------------------------------------------------------------------|--------|
| `EventHubClient.createFromConnectionString`    | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [All](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/) |
| `EventHubClient.createFromAadTokenCredentials` | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [usingAadAuth](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/usingAadAuth.ts)
| `EventHubClient.receive`                       | `EventHubConsumerClient.subscribe`                               | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts) |
| `EventHubClient.receiveBatch`                  | Removed in favor of `EventHubConsumerClient.subscribe`           | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts) |
| `EventProcessorHost`                           | `new EventHubConsumerClient(with checkpointStore)`               | [receiveEventsUsingCheckpointStore](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEventsUsingCheckpointStore.ts) |
| `EventHubClient.send`                          | `EventHubConsumerClient.sendBatch`                               | [sendEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/sendEvents.ts) |

### Migrating code from `EventHubClient` to `EventHubConsumerClient` for receiving events

In V2, event handlers were passed as positional arguments to `receive`.

In V5, event handlers are passed as part of a `SubscriptionEventHandlers` shaped object.

For example, this code which receives from a partition in V2:

```typescript
const client = EventHubClient.createFromConnectionString(connectionString);
const rcvHandler = client.receive(partitionId, onMessageHandler, onErrorHandler, {
  eventPosition: EventPosition.fromStart(),
  consumerGroup: "$Default"
});
await rcvHandler.stop();
```

Becomes this in V5:

```typescript
const eventHubConsumerClient = new EventHubConsumerClient("$Default", connectionString);

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
      // To fix this you'll need to potentially split the message up across multiple batches or 
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
