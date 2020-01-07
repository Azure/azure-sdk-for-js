# Consuming events

The `EventHubConsumerClient` lets you subscribe to events from one or all partitions of an Event Hub.
You do this by invoking the `subscribe()` method on the client, which returns a `subscription`.
Calling `close()` on the subscription stops reading of any more events.

Calling `subscribe` immediately starts the subscription.
Once the subscription starts, the following things happen for **each** partition being read.

1.  The user-provided `partitionInitialize` function is invoked each time the subscription is
    about to begin reading from a partition.

    The `PartitionContext` passed to this function can be used to determine which partition
    is about to be read from.
    The client will start receiving events for the partition only after completing the execution of this function (if provided).
    Therefore, you can use this function to carry out any partition specific set up work you need including async tasks.
    Example:

```js
async processInitialize(context) {
 console.log(`Initializing partition "${context.partitionId}".`);
}
```

2.  The `processEvents` function is invoked with an array of events as they are received.
    The maximum number of events returned in an array, as well as the maximum amount of time to wait for
    events to be received are configurable through the `SubscribeOptions` passed to `subscribe`.

    A `PartitionContext` is also passed to `processEvents` that can be used to determine which partition
    is being read from.
    The `updateCheckpoint()` method on this context can be used to update checkpoints in the `CheckpointStore`
    (if one was provided to the client).
    Use this in frequent intervals to mark events that have been processed so that the client can
    restart from such checkpoints in the event of a restart or error recovery.
    Example:

```js
async processEvents(events, context) {
 console.log(`Received ${events.length} events from partition "${context.partitionId}".`);
 if (events.length) {
   const lastEvent = events.pop();
   console.log(`Checkpointing event ${lastEvent.sequenceNumber} on partition ${context.partitionId}`);
   await context.updateCheckpoint(lastEvent);
 }
}
```

3.  The `processError` function is invoked whenever one of the user-provided functions throws an error
    or if the subscription encounters a problem while receiving events.
    The `PartitionContext` passed to `processError` will indicate the partition that was being processed
    when the error was thrown.
    In cases where an error is thrown outside of processing events from a partition (e.g. failure to perform load balancing),
    the `partitionId` will be an empty string.
    After `processError` returns, the user-provided `processClose` function will be invoked if it was supplied.
    Example:

```js
async processError(err, context) {
 if (!context.partitionId) {
   console.log(`Unexpected error unrelated to partition processing: ${err.name}, ${err.message}`);
 } else {
   console.log(`Error on partition "${context.partitionId}": ${err.name}, ${err.message}`);
 }
}
```

4.  If supplied, the `processClose` function is invoked each time the subscription **stops** reading events
    from a partition.
    The `PartitionContext` passed to `partitionClose` can be used to determine which partition is no longer being read from.
    The `CloseReason` is also passed to `partitionClose` and is either `OwnershipLost` or `Shutdown`.
    If the `CloseReason` is `OwnershipLost`, then another subscription is reading from the same partition using the same
    consumer group and has taken over reading the partition.
    This is expected when passing a `CheckpointStore` into the `EventHubConsumerClient` constructor as part of load balancing.
    When the `CloseReason` is `Shutdown`, this indicates that either `subscription.close()` was called, or an error occured.
    Unless the subscription was explicitly closed via `subscription.close()`, the subscription will attempt to resume reading
    events based on the last event passed to `updateCheckpoint` for each partition.
    As part of this resumption, the subscription will again trigger `partitionInitialize`.
    Example:

```js
async processClose(reason, context) {
 console.log(`Stopped receiving from partition "${context.partitionId}" because ${reason}.`);
}
```
