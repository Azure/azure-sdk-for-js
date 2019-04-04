# General Overview of Microsoft Azure Event Processor Host (@azure/event-processor-host) for JS

Event Processor Host is built on top of the Microsoft Azure Event Hubs Client `@azure/event-hubs` for JS and provides a number of features not present in that lower layer:

1. Event Processor Host removes the need to think about partitions. By default, it creates one instance of the event
   hub client for each partition. Each instance will only ever handle
   events from one partition, further simplifying the processing code.
2. Event Processor Host allows easy load balancing. Utilizing a shared persistent store for leases on partitions
   (by default based on Azure Storage), instances of Event Processor Host receiving from the same consumer group
   of the same Event Hub can be spread across multiple machines and partitions will be distributed across those
   machines as evenly as possible. These instances can be started and stopped at any time, and partitions will be
   redistributed as needed. It is even allowed to have more instances than partitions as a form of hot standby. (Note that
   partition distribution is based solely on the number of partitions per instance, not event flow rate or any other metric.)
3. Event Processor Host allows the event processor to create a persistent "checkpoint" that describes a position in
   the partition's event stream, and if restarted it automatically begins receiving at the next event after the checkpoint.
   Because checkpointing is usually an expensive operation, it is up to you to create
   them from within the `onMessage` hander, at whatever interval is suitable for your application. For example, an application with relatively infrequent messages might checkpoint after processing each one, whereas an application that requires high performance in the processing code in order to keep up with event flow might checkpoint once every hundred messages, or once
   per second.

## Using Event Processor Host

### Step 1: Instantiate the Event Processor Host and provide a general error notification handler

Instantiate the EPH using one of the many static methods that is the best fit for you. You can also
provide a general error notification handler. It will let you know about internal errors that happen
while managing partitions.

```js
import {
  EventProcessorHost, OnReceivedError, OnReceivedMessage, EventData, PartitionContext, delay
} from "@azure/event-processor-host";

const path = process.env.EVENTHUB_NAME;
const storageCS = process.env.STORAGE_CONNECTION_STRING; // you can get this from https://portal.azure.com
const ehCS = process.env.EVENTHUB_CONNECTION_STRING;
// creates a unique storageContainer name for every run
// if you wish to keep the name same between different runs then use the following then that is fine as well.
const storageContainerName = EventProcessorHost.createHostName("test-container");
const ephName = "my-eph";

// Create the Event Processo Host
const eph = EventProcessorHost.createFromConnectionString(
  EventProcessorHost.createHostName(ephName),
  storageCS!,
  storageContainerName,
  ehCS!,
  {
      eventHubPath: path,
      onEphError: (error) => {
      console.log(">>>>>>> [%s] Error: %O", ephName, error);
      }
  }
);
```

### Step 2: Implement the message handler and the error handler and start the EPH
The `onMessage` handler processes all the received events from different partitions. It provides,
the partition context and the EventData. PartitionContext provides the means to create a checkpoint for the partition. Please make sure to checkpoint within a `try/catch` block.

```js
const onMessage: OnReceivedMessage = async (context: PartitionContext, data: EventData) => {
  console.log("##### [%s] - Rx message from partition: '%s', offset: '%s'", ephName, context.partitionId, data.offset);
  // Checkpointing every 100th event received for a given partition.
  if (partionCount[context.partitionId] % 100 === 0) {
    const num = partionCount[context.partitionId];
    try {
       console.log("$$$$ [%s] Attempting to checkpoint message number %d", ephName, num);
       await context.checkpoint();
       console.log("$$$$ [%s] Successfully checkpointed message number %d", ephName, num);
    } catch (err) {
       console.log(">>>>> [%s] An error occurred while checkpointing msg number %d: %O", ephName, num, err);
    }
  }
};

// Error handler
const onError: OnReceivedError = (error) => {
  console.log(">>>>> [%s] Received Error: %O", ephName, error);
};

try {
  await eph.start(onMessage, onError);
} catch (err) {
  console.log("An error occurred while starting the EPH: %O", err);
}
```
### Step 3: Graceful Shutdown

```js
try {
  await eph.stop();
  console.log(">>>>>> Successfully stopped the EPH - '%s'.", eph.hostName);
} catch (err) {
  console.log("An error occurred while stopping the EPH: %O", err);
}
```

## Checkpointing, Partition Ownership, and Reprocessing Messages

In a system using Event Processor Host, there are one or more hosts processing events from a particular event hub+consumer group combination, and ownership of the partitions of the event hub are split up between the hosts. When a host takes ownership of a partition, it starts a receiver on that partition, and when doing so it must specify the position in the stream of events at which the receiver will begin consuming. If there is a checkpoint for that event hub+consumer group+partition combination available via the checkpoint manager (by default, in Azure Storage), the receiver will begin consuming at the position indicated by the checkpoint.

Any time a host takes ownership of a partition, reprocessing of events may occur. Exactly how many messages may be reprocessed depends on how often checkpoints are written. Writing a checkpoint with the default checkpoint manager is expensive, since it makes at least one HTTPS call to Azure Storage. The obvious strategy to minimize reprocessing of events is to checkpoint after processing each event, but we advise against this due to the performance hit.
In a low-throughput scenario it may be OK, but as the event rate goes up, checkpointing too often could prevent a processor from being able to keep up with the flow. Also, event checkpointing after each event cannot completely prevent event reprocessing, since there will always be some time between finishing
processing and writing the checkpoint, during which the processor could fail. Customer applications must be able to detect and handle some amount of reprocessing, and the customer needs to study their particular scenario and application to balance the cost of handling the reprocessing against the performance hit of checkpointing more frequently.

What can cause ownership of a partition to change:
1. Bringing a host online: it will steal ownership of partitions from already-running hosts until the distribution of partitions among hosts is as even as possible.
2. A host crashing/losing power/losing network connection/going offline for any reason: the leases on the partitions that the downed host owned will expire and the remaining hosts will find the expired leases and take ownership. This may result in unbalanced distribution to start with which will cause additional ownership changes until the distribution is balanced.
3. Azure Storage latency or failures which result in a partition lease expiring because it cannot be renewed in time: other hosts (or even the same host) will find the expired lease and take ownership. Again, this can result in unbalanced distribution and additional ownership changes. This scenario can occur even if there is only one host.
4. Certain event hub client errors can cause the processor for a partition to shut down, with the same effects as case 3. This scenario can also occur even with only one host.

## Internal working of Event Processor Host

EventHubs supports creating receivers with an `epoch value`. Epoch is of type `number`. At any given point in time, the receiver with the `highest epoch` value can receive messages from an EventHub for a given partition. Already connected receivers with `lower epoch` value or receivers `without an epoch` value will be disconnected. This ensures, that at any given time, there is `only one` receiver receiving messages from a partition in an EventHub. EPH makes use of this key functionality to receive messages from an EventHub.

### Lease Acquisition:
Whenever a lease is acquired for the specified leaseDuration (default 30 seconds), it reads the epoch value  and the offset from the blob. It creates the receiver with a higher epoch value (+1) than what was read from the blob, and with an offset read from the blob as the starting point. If there is no offset in the blob, then it starts from the beginning (-1, default value).

### Lease Renewal:
While it is receiving messages, it keeps on renewing the lease at a regular interval (default 10 seconds). If an error occurs while renewing the lease, then it simply logs the error. It does not disconnect the receiver, since the receiver will be automatically disconnected when the lease expires or someone steals the lease.

The EPH will keep on scanning across all the partitions at some interval. If it was able to steal leases, in the previous scan then it will sleep for lesser time before scanning again. If it did not steal any leases in the previous scan then it sleeps for more time before scanning again.

When a new instance of EPH comes online, it starts scanning partitions by reading the contents of the LeaseStore. This helps the EPH understand the state of things in it's world.

During each scan:
- It tries to find the number of unique hosts. This helps the EPH determine the ideal number of leases (1 per partition) that it should aim for.
- If the number of leases that it owns is less than the desired count, then it attempts to acquire any expired leases (done concurrently, to make full use of async nature of node.js)
    - If it is able to acquire the lease, then it starts the receiver as described above.
- If it still needs more leases, then it will try stealing leases
    - It decides to steal leases only from those owners that own leases more than the desired count.
    - It randomly picks one of the biggest owners and tries to steal the desired number of leases from that owner.
- While stealing leases (done concurrently, to make full use of async nature of node.js)
    - If the lease is successfully stolen, then it starts the receiver as described above. This means that some other EPH instance's lease was lost. That EPH instance would have received a disconnect error from that receiver and the receiver would be closed.
    - Else, logs an error that it was not able to steal the lease and does nothing about it
- If it does not steal any leases, it returns false. This drives the amount of time, the EPH will sleep before it starts scanning again.