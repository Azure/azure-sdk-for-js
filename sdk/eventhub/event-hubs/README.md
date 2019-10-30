# Azure Event Hubs client library for Javascript

Azure Event Hubs is a highly scalable publish-subscribe service that can ingest millions of events per second and stream them to multiple consumers. This lets you process and analyze the massive amounts of data produced by your connected devices and applications. If you would like to know more about Azure Event Hubs, you may wish to review: [What is Event Hubs](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about)?

The Azure Event Hubs client library allows you to send and receive events in your Node.js application.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs) | [Package (npm)](https://www.npmjs.com/package/@azure/event-hubs/v/next) | [API Reference Documentation](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/index.html) | [Product documentation](https://azure.microsoft.com/en-us/services/event-hubs/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples)

**NOTE**: If you are using version 2.1.0 or lower, then please use the below links instead

[Source code for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs) | [Package for v2.1.0 (npm)](https://www.npmjs.com/package/@azure/event-hubs/v/2.1.0) | [Samples for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples)

## Getting Started

### Install the package

Install the Azure Event Hubs client library using npm

`npm install @azure/event-hubs@next`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Event Hubs Namespace](https://docs.microsoft.com/en-us/azure/event-hubs/) to use this package.
If you are using this package in a Node.js application, then use Node.js 8.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### Key concepts

- An **Event Hub client** is the primary interface for developers interacting with the Event Hubs client library, allowing for inspection of Event Hub metadata and providing a guided experience towards specific Event Hub operations such as the creation of producers and consumers.

- An **Event Hub producer** is a source of telemetry data, diagnostics information, usage logs, or other log data, as part of an embedded device solution, a mobile device application, a game title running on a console or other device, some client or server based business solution, or a web site.

- An **Event Hub consumer** picks up such information from the Event Hub and processes it. Processing may involve aggregation, complex computation and filtering. Processing may also involve distribution or storage of the information in a raw or transformed fashion. Event Hub consumers are often robust and high-scale platform infrastructure parts with built-in analytics capabilities, like Azure Stream Analytics, Apache Spark, or Apache Storm.

- A **partition** is an ordered sequence of events that is held in an Event Hub. Partitions are a means of data organization associated with the parallelism required by event consumers. Azure Event Hubs provides message streaming through a partitioned consumer pattern in which each consumer only reads a specific subset, or partition, of the message stream. As newer events arrive, they are added to the end of this sequence. The number of partitions is specified at the time an Event Hub is created and cannot be changed.

- A **consumer group** is a view of an entire Event Hub. Consumer groups enable multiple consuming applications to each have a separate view of the event stream, and to read the stream independently at their own pace and from their own position. There can be at most 5 concurrent readers on a partition per consumer group; however it is recommended that there is only one active consumer for a given partition and consumer group pairing. Each active reader receives all of the events from its partition; If there are multiple readers on the same partition, then they will receive duplicate events.

For more concepts and deeper discussion, see: [Event Hubs Features](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features)

### Authenticate the client

Interaction with Event Hubs starts with an instance of the [EventHubConsumerClient](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html) class. You can instantiate
this class using one of the below

```javascript
const client = new EventHubConsumerClient("my-consumer-group-name", "my-connection-string", "my-event-hub");
```

- This constructor takes a consumer group, a connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;' and entity name to your Event Hub instance. You can create a consumer group, get the connection string as well as the entity name from the [Azure portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-get-connection-string#get-connection-string-from-the-portal).

```javascript
const client = new EventHubConsumerClient("my-consumer-group-name", "my-connection-string-with-entity-path");
```

- The [connection string from the Azure Portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-get-connection-string#get-connection-string-from-the-portal) is for the entire Event Hubs namespace and will not contain the path to the desired Event Hub instance which is needed for this constructor overload. In this case, the path can be added manually by adding ";EntityPath=[[ EVENT HUB NAME ]]" to the end of the connection string. For example, ";EntityPath=my-event-hub-name".

If you have defined a shared access policy directly on the Event Hub itself, then copying the connection string from that Event Hub will result in a connection string that contains the path.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const credential = new DefaultAzureCredential();
const client = new EventHubConsumerClient("my-consumer-group-name", "my-host-name", "my-event-hub", credential);
```

- This constructor takes the host name and entity name of your Event Hub instance and credential that implements the TokenCredential interface. There are implementations of the `TokenCredential` interface available in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package. The host name is of the format `<yournamespace>.servicebus.windows.net`.

### Examples

The following sections provide code snippets that cover some of the common tasks using Azure Event Hubs

- [Inspect an Event Hub](#inspect-an-event-hub)
- [Publish events to an Event Hub](#publish-events-to-an-event-hub)
- [Consume events from an Event Hub partition](#consume-events-from-an-event-hub-partition)
- [Consume events using an Event Processor](#consume-events-using-an-event-processor)
- [Use EventHubConsumerClient to work with IotHub](#use-eventHubConsumerClient-to-work-with-IotHub)

### Inspect an Event Hub

Many Event Hub operations take place within the scope of a specific partition.
Because partitions are owned by the Event Hub, their names are assigned at the time of creation.
To understand what partitions are available, you query the Event Hub using the client.

```javascript
const client = new EventHubConsumerClient("consumerGroup", "connectionString", "eventHubName");
const partitionIds = await client.getPartitionIds();
```

### Publish events to an Event Hub

In order to publish events, you'll need to create an `EventHubProducer`. Producers may be dedicated to a specific partition, or allow the Event Hubs service to decide which partition events should be published to. It is recommended to use automatic routing when the publishing of events needs to be highly available or when event data should be distributed evenly among the partitions. In the below examples, we will take advantage of automatic routing.

#### Send a single event or an array of events

Use the [send](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubproducer.html#send) method to send a single event or multiple events using a single call.

```javascript
const client = new EventHubClient("connectionString", "eventHubName");
const producer = client.createProducer();
await producer.send({ body: "my-event-body" });
await producer.send([{ body: "foo" }, { body: "bar" }]);
```

#### Send a batch of events

Use the [createBatch](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubproducer.html#createbatch) method to create
an `EventDataBatch` object which can then be sent using the [send](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubproducer.html#send) method.
Events may be added to the `EventDataBatch` using the [tryAdd](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventdatabatch.html#tryadd)
method until the maximum batch size limit in bytes has been reached.

```javascript
const client = new EventHubClient("connectionString", "eventHubName");
const producer = client.createProducer();
const eventDataBatch = await producer.createBatch();
let wasAdded = eventDataBatch.tryAdd({ body: "my-event-body" });
wasAdded = eventDataBatch.tryAdd({ body: "my-event-body-2" });
await producer.send(eventDataBatch);
```

The [Inspect an Event Hub](#inspect-an-event-hub) example shows how to get the list of partition ids should you wish to specify one for a producer.

The `createProducer` method takes an optional parameter of type [EventHubProducerOptions](https://azure.github.io/azure-sdk-for-js/event-hubs/interfaces/eventhubproduceroptions.html) which you can use to specify the retry options and partition id for the send operation.

The `send` method takes an optional parameter of type [SendOptions](https://azure.github.io/azure-sdk-for-js/event-hubs/interfaces/sendoptions.html) which you can use to specify `abortSignal` to cancel current operation.
You can also specify `partitionKey` if you did not specify a partition id when creating the producer.
All events that use the same partition key will be sent to the same partition.

**Note**: When working with Azure Stream Analytics, the body of the event being sent should be a JSON object as well.
For example: `body: { "message": "Hello World" }`

### Consume events from an Event Hub partition

To consume events from a single Event Hub partition in a consumer group, create an `EventHubConsumerClient` for that partition and consumer group combination. You will need to provide a position in the event stream from where to begin receiving events; in our example, we will read new events as they are published.

```javascript
const client = new EventHubConsumerClient(EventHubClient.defaultConsumerGroupName, "connectionString", "eventHubName");
const subscription = client.subscribe(
  (receivedEvents, context) => { },
  [ partitionIds[0] ], {
    defaultEventPosition: EventPosition.latest()
  }
);
```

The [Inspect an Event Hub](#inspect-an-event-hub) example shows how to get the list of partition ids.

The `subscribe` method takes an optional parameter of type [SubscriptionOptions](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/interfaces/subscriptionoptions.html) which you can use to specify options like the maxBatchSize (number of events to wait for) and maxWaitTimeInSeconds (amount of time to wait for maxBatchSize events to arrive).

You can use this consumer in one of 3 ways to receive events:

- [Get an array of events](#get-an-array-of-events)
- [Register event handler](#register-event-handler)

#### Subscribe with an event handler

Use the [subscribe](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html#subscribe) to set up event handlers and have it running as long as you need.

This function takes an optional parameter called `abortSignal` to cancel current operation.

```javascript
const myEventHandler = (events) => {
  // your code here
};
const myErrorHandler = (error) => {
  // your error handler here
};
const subscription = consumer.subscribe(myEventHandler, {
  onError: myErrorHandler
});

// When ready to stop receiving
await subscription.stop();
```

### Consume events using a partition manager

[EventHubConsumerClient](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html) is a high level construct which allows you to receive events from multiple partitions at once 
and load balance with other consumers using the same Event Hub and consumer group

This also allows the user to track progress when events are processed using checkpoints.

A checkpoint is meant to represent the last successfully processed event by the user from a particular
partition of a consumer group in an Event Hub instance. The `EventHubConsumerClient` uses an instance of `PartitionManager`
to update checkpoints and to store the relevant information required by the load balancing algorithm.

For early development, we provide the [InMemoryPartitionManager](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/inmemorypartitionmanager.html) which will allow you to bootstrap your project. This implementation
is not suitable for production usage - it does not persist checkpoints and does not allow separate processes to 
coordinate with each other.

In production, it is recommended to use a persistent store to allow multiple service instances (or processes) to 
coordinate their work, even in the face of shutdowns or restarts.

Search npm with the prefix `@azure/eventhubs-checkpointstore-` to find packages that support this and use the
`PartitionManager` implementation from one such package.

In the below example, we create two subscriptions using the same Event Hub and consumer group,
using an `InMemoryPartitionManager`.

```javascript
const client = new EventHubConsumerClient("my-consumer-group", "my-connection-string", "my-event-hub");
const partitionManager = new InMemoryPartitionManager();

const subscription1 = client.subscribe(
  (events, context) => { /* code for handling events should go here */ },
  partitionManager
);

const subscription2 = client.subscribe(
  (events, context) => { /* code for handling events should go here */ },
  partitionManager
);

// At this point, both subscriptions are consuming events from different partitions of the Event Hub.
// The subscribers will load-balance automatically without any intervention.
// This processing takes place in the background and will not block.
//
// In this example, we'll stop processing after thirty seconds.
await delay(30000);

await subscription1.stop();
await subscription2.stop();

// close the client itself
await client.close();
```

To control the number of events passed to processEvents, use the options argument for `subscribe`.

### Use EventHubConsumerClient to work with IotHub

You can use `EventHubConsumerClient` to work with IotHub as well. This is useful for receiving telemetry data of IotHub from the linked EventHub.
The associated connection string will not have send claims,
hence sending events is not possible.

- Please notice that the connection string needs to be for an
  [Event Hub-compatible endpoint](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-messages-read-builtin)
  e.g. "Endpoint=sb://my-iothub-namespace-[uid].servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-iot-hub-name"

```javascript
const client = new EventHubConsumerClient(
  "consumer-group",
  "Endpoint=sb://my-iothub-namespace-[uid].servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-iot-hub-name"
);
await client.getProperties();
// retrieve partitionIds from client.getProperties() or client.getPartitionIds()
const partitionId = "0";
await client.getPartitionProperties(partitionId);
```

## Troubleshooting

### AMQP Dependencies

The Event Hubs library depends on the [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving events over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Event Hubs SDK

```bash
export DEBUG=azure*
```

- Getting debug logs from the Event Hubs SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the event transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:event-hubs:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples)
directory for detailed examples on how to use this library to send and receive events to/from
[Event Hubs](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/eventhub/event-hubs/README.png)
