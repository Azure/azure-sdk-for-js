const { EventHubClient, EventPosition } = require("../src");

// 3 Ways to create EventHubClient
var client = EventHubClient.createFromConnectionString("connection-string-here", "my-event-hub");
client = new EventHubClient("my-namespace.servicebus.windows.net", "my-event-hub", customTokenProvider);
client = new EventHubClient("my-namespace.servicebus.windows.net", "my-event-hub", credentials);

// ======================================== Sending sample starts ======================================

// Send events to a random partition
await client.send(myEvents);

// Overload: Send events to particular partition as specified by the id
await client.send(myEvents, "my-partition-id");

// Send events to the same partition, but don't care which exact partition
await client.send(myEvents, { batchLabel: "my-partition-key" });

// ======================================== Sending sample ends ======================================

// ======================================== Receiving sample starts ======================================

// Receive 25 events at most
var events = await client.receiveBatch("my-partition-id", 25);

// Receive 25 events at most from given event position and consumer group
events = await client.receiveBatch("my-partition-id", 25, {
  eventPosition: EventPosition.fromOffset("123"),
  consumerGroup: "my-consumer-group"
});

// Overload: Receive 25 events at most, but within 60 seconds
events = await client.receiveBatch("my-partition-id", 25, 60);

// Overload: Receive 25 events at most, but within 60 seconds from given event position and consumer group
events = await client.receiveBatch("my-partition-id", 25, 60, {
  eventPosition: EventPosition.fromOffset("123"),
  consumerGroup: "my-consumer-group"
});

// ======================================== Receiving sample ends ======================================

// ======================================== Streaming sample starts ======================================

// Set up streaming receiver
var handler = client.receive("my-partition-id", console.log, console.log);
console.log(handler.consumerGroup, handler.partitionId);
// When you want to stop receiving
await handler.stop();

// Set up streaming receiver for given event position and consumer group and opt in to get receiver info updated.
handler = client.receive("my-partition-id", console.log, console.log, {
  eventPosition: EventPosition.fromOffset("123"),
  consumerGroup: "my-consumer-group",
  enableReceiverRuntimeMetric: true
});
console.log(
  handler.runtimeInfo.lastEnqueuedSequenceNumber,
  handler.runtimeInfo.lastEnqueuedOffset,
  handler.runtimeInfo.lastEnqueuedTimeUtc
);

// Overload: Set up streaming receiver with cap on maxConcurrentCalls made to user's callback
handler = client.receive("my-partition-id", console.log, console.log, 50);

// ======================================== Streaming sample ends ======================================
