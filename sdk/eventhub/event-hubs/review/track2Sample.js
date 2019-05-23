const { EventHubClient, EventPosition } = require("../src");

// 3 Ways to create EventHubClient
var client = EventHubClient.createFromConnectionString("connection-string-here", "my-event-hub");
client = new EventHubClient("my-namespace.servicebus.windows.net", "my-event-hub", customTokenProvider);
client = new EventHubClient("my-namespace.servicebus.windows.net", "my-event-hub", credentials);

// Create sender
var sender = client.createSender();

// Create receiver
var receiver = client.createReceiver("my-partitionId");

// Create receiver with options
receiver = client.createReceiver("my-partitionId", {
  eventPosition: EventPosition.fromOffset("123"),
  consumerGroup: "my-consumer-group"
});
// ======================================== Sending sample starts ======================================

// Send events to a random partition
await sender.send(myEvents);

// Overload: Send events to particular partition as specified by the id
await sender.send(myEvents, "my-partition-id");

// Send events to the same partition, but don't care which exact partition
await sender.send(myEvents, { batchLabel: "my-partition-key" });

// ======================================== Sending sample ends ======================================

// ======================================== Receiving sample starts ======================================

// Receive at most 25 events but within 60 seconds in each iteration
for await (let events of receiver.getEventIterator("my-partition-id", 25, 60)){
  // your code here
}

// Set up streaming receiver
var handler = client.receive("my-partition-id", console.log, console.log);
// When you want to stop receiving
await handler.stop();

console.log(receiver.partitionId, receiver.consumerGroup);

if (receiver.lastEnqueuedInfo) {
  console.log(
    receiver.lastEnqueuedInfo.lastEnqueuedSequenceNumber,
    receiver.lastEnqueuedInfo.lastEnqueuedOffset,
    receiver.lastEnqueuedInfo.lastEnqueuedTimeUtc,
    receiver.lastEnqueuedInfo.retrievalTime
  );
}

// ======================================== Receiving sample ends ======================================
