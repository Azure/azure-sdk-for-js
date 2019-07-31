# Azure Event Hubs client library for Javascript

Azure Event Hubs is a highly scalable publish-subscribe service that can ingest millions of events per second and stream them to multiple consumers. This lets you process and analyze the massive amounts of data produced by your connected devices and applications. If you would like to know more about Azure Event Hubs, you may wish to review: [What is Event Hubs](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about)?

The Azure Event Hubs client library allows you to send and receive events in your Node.js application.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs) | [Package (npm)](https://www.npmjs.com/package/@azure/event-hubs) | [API Reference Documentation](https://azure.github.io/azure-sdk-for-js/event-hubs/index.html) | [Product documentation](https://azure.microsoft.com/en-us/services/event-hubs/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples)

**NOTE**: If you are using version 2.1.0 or lower, then please use the below links instead

[Source code for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs) | [Package for v2.1.0 (npm)](https://www.npmjs.com/package/@azure/event-hubs/v/2.1.0) | [Samples for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples)

## Getting Started

### Install the package

Install the Azure Event Hubs client library using npm

`npm install @azure/event-hubs@5.0.0-preview.1`

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

Interaction with Event Hubs starts with an instance of the [EventHubClient](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubclient.html#constructor) class. You can instantiate
this class using one of the below

```javascript
const client = new EventHubClient("my-connection-string", "my-event-hub");
```

- This constructor takes the connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;' and entity name to your Event Hub instance. You can get the connection string from the [Azure portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-get-connection-string#get-connection-string-from-the-portal).

```javascript
const client = new EventHubClient("my-connection-string-with-entity-path");
```

- The [connection string from the Azure Portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-get-connection-string#get-connection-string-from-the-portal) is for the entire Event Hubs namespace and will not contain the path to the desired Event Hub instance which is needed for this constructor overload. In this case, the path can be added manually by adding ";EntityPath=[[ EVENT HUB NAME ]]" to the end of the connection string. For example, ";EntityPath=my-event-hub-name".

If you have defined a shared access policy directly on the Event Hub itself, then copying the connection string from that Event Hub will result in a connection string that contains the path.

```javascript
const { DefaultAzureCredential } = require("@azure/identity");
const credential = new DefaultAzureCredential();
const client = new EventHubClient("my-host-name", "my-event-hub", credential);
```

- This constructor takes the host name and entity name of your Event Hub instance and credential that implements the TokenCredential interface. There are implementations of the `TokenCredential` interface available in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package. The host name is of the format `<yournamespace>.servicebus.windows.net`.

### Examples

The following sections provide code snippets that cover some of the common tasks using Azure Event Hubs

- [Inspect an Event Hub](#inspect-an-event-hub)
- [Publish events to an Event Hub](#publish-events-to-an-event-hub)
- [Consume events from an Event Hub](#consume-events-from-an-event-hub)
- [Use EventHubClient to work with IotHub](#use-eventHubClient-to-work-with-IotHub)

### Inspect an Event Hub

Many Event Hub operations take place within the scope of a specific partition.
Because partitions are owned by the Event Hub, their names are assigned at the time of creation.
To understand what partitions are available, you query the Event Hub using the client.

```javascript
const client = new EventHubCLient("connectionString", "eventHubName");
const partitionIds = await client.getPartitionIds();
```

### Publish events to an Event Hub

In order to publish events, you'll need to create an `EventHubProducer`. Producers may be dedicated to a specific partition, or allow the Event Hubs service to decide which partition events should be published to. It is recommended to use automatic routing when the publishing of events needs to be highly available or when event data should be distributed evenly among the partitions. In the our example, we will take advantage of automatic routing.

You can also use the [send](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubproducer.html#send) method to send multiple events using a single call.

```javascript
const client = new EventHubClient("connectionString", "eventHubName");
const producer = client.createProducer();
await producer.send({ body: "my-event-body" });
```

The [Inspect an Event Hub](#inspect-an-event-hub) example shows how to get the list of partition ids should you wish to specify one for a producer.

The `createProducer` method takes an optional parameter of type [EventHubProducerOptions](https://azure.github.io/azure-sdk-for-js/event-hubs/interfaces/eventhubproduceroptions.html) which you can use to specify the retry options and partition id for the send operation.

The `send` method takes an optional parameter of type [SendOptions](https://azure.github.io/azure-sdk-for-js/event-hubs/interfaces/sendoptions.html) which you can use to specify `abortSignal` to cancel current operation.
You can also specify `partitionKey` if you did not specify a partition id when creating the producer.
All events that use the same partition key will be sent to the same partition.

**Note**: When working with Azure Stream Analytics, the body of the event being sent should be a JSON object as well.
For example: `body: { "message": "Hello World" }`

### Consume events from an Event Hub

In order to consume events, you'll need to create an `EventHubConsumer` for a specific partition and consumer group combination. When an Event Hub is created, it starts with a default consumer group that can be used to get started. A consumer also needs to specify where in the event stream to begin receiving events; in our example, we will focus on reading new events as they are published.

```javascript
const client = new EventHubClient("connectionString", "eventHubName");
const consumer = client.createConsumer(
  EventHubClient.defaultConsumerGroupName,
  partitionIds[0],
  EventPosition.latest()
);
```

The [Inspect an Event Hub](#inspect-an-event-hub) example shows how to get the list of partition ids.

The `createConsumer` method takes an optional parameter of type [EventHubConsumerOptions](https://azure.github.io/azure-sdk-for-js/event-hubs/interfaces/eventhubconsumeroptions.html) which you can use to specify the ownerLevel, the level that this consumer is currently using for partition ownership. If another consumer is currently active for the same partition with no or lower level, then it will get disconnected. If another consumer is currently active with a higher level, then this consumer will fail to connect. You can also specify retryOptions for the receive operation on the consumer.

You can use this consumer in one of 3 ways to receive events:

- [Get an array of events](#get-an-array-of-events)
- [Register event handler](#register-event-handler)
- [Use async iterator](#use-async-iterator)

#### Get an array of events

Use the [receiveBatch](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubconsumer.html#receivebatch) function which returns a promise that resolves to an array of events.

This function takes an optional parameter called `abortSignal` to cancel current operation.

```javascript
const maxMessageCount = 10;
const myEvents = await consumer.receiveBatch(maxMessageCount);
```

#### Register event handler

Use the [receive](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubconsumer.html#receive) to set up event handlers and have it running as long as you need.

This function takes an optional parameter called `abortSignal` to cancel current operation.

```javascript
const myEventHandler = event => {
  // your code here
};
const myErrorHandler = error => {
  // your error handler here
};
const receiveHandler = consumer.receive(myEventHandler, myErrorHandler);

// When ready to stop receiving
await receiveHandler.stop();
```

#### Use async iterator

Use the [getMessageIterator](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubconsumer.html#geteventiterator) to get an async iterator over events.

This function takes an optional [EventIteratorOptions](https://azure.github.io/azure-sdk-for-js/event-hubs/interfaces/eventiteratoroptions.html) parameter that includes `abortSignal` to cancel the current operation.

```javascript
for await (const events of consumer.getEventIterator()){
  // your code here
}
```

### Use EventHubClient to work with IotHub

You can use `EventHubClient` to work with IotHub as well. This is useful for receiving telemetry data of IotHub from the linked EventHub.
Most likely the associated connection string will not have send claims. Hence getting HubRuntimeInfo or PartitionRuntimeInfo and receiving events would be the possible operations.

- Please notice that we are awaiting on the [createFromIotHubConnectionString](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubclient.html#createfromiothubconnectionstring) method to get an instance of the EventHubClient. This is different from other static methods on the client. The method talks to the IotHub endpoint to get a redirect error which contains the EventHub endpoint to talk to. It then constructs the right EventHub connection string based on the information in the redirect error and returns an instance of the EventHubClient that you can play with.

```javascript
const client = await EventHubClient.createFromIotHubConnectionString("connectionString");
await client.getHubRuntimeInformation();
await client.getPartitionInformation("partitionId");
```

**Notes:** For scalable and efficient receiving, please take a look at [azure-event-processor-host](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-processor-host). The Event Processor host, internally uses the streaming receiver to receive events.

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
