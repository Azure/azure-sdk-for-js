# Migration Guide (EventHubs 2 to 5)

## Class changes

`EventHubClient` has been split into two clients - `EventHubProducerClient` (for sending
messages) and `EventHubConsumerClient` (for receiving messages).

| In v2                                          | Equivalent in v5                                                 | Sample |
|------------------------------------------------|------------------------------------------------------------------|--------|
| `EventHubClient.createFromConnectionString`    | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [All](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/)
| `EventHubClient.createFromAadTokenCredentials` | `new EventHubProducerClient()` or `new EventHubConsumerClient()` | [usingAadAuth](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/usingAadAuth.ts)
| `EventHubClient.receive`                       | `EventHubConsumerClient.subscribe`                               | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts) |
| `EventHubClient.receiveBatch`                  | Removed in favor of `EventHubConsumerClient.subscribe`           | [receiveEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/receiveEvents.ts) |
| `EventHubClient.send`                          | `EventHubConsumerClient.sendBatch`                               | [sendEvents](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/sendEvents.ts) |

### Migrating code from `EventHubClient` to `EventHubConsumerClient`

In V2, event handlers were passed as positional arguments to `receive`.

In V5, event handlers are passed as part of a `SubscriptionEventHandlers` shaped object.

For example, this code which receives from a partition in V2:

```typescript
const rcvHandler = client.receive(partitionId, onMessageHandler, onErrorHandler, {
  eventPosition: EventPosition.fromStart(),
  consumerGroup: "$Default"
});
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

### Migrating code from `EventHubClient` to `EventHubProducerClient`

In V2, there were multiple options on how to send data.

In V5, this has been consolidated into a more efficient `sendBatch` method.

So in V2:
```typescript
console.log(`Sending event: ${eventData.body}`);
await client.send(eventData, partitionId);
```

In V5:
```typescript
const eventHubProducerClient = new EventHubProducerClient(connectionString);
console.log(`Sending event: ${eventData.body}`);

// note that the partition ID is now specified as part of the 
// batch, rather than as part of the sendBatch call.
const batch = await eventHubProducerClient.createBatch({
  partitionId: partitionId
});

const added = batch.tryAdd(eventData);

if (!added) {
  throw new Error("Failed to add event - larger than maximum allowed size");
}

await eventHubProducerClient.sendBatch(batch);
```
