# Azure Event Hubs client library for Javascript

Azure Event Hubs is a highly scalable publish-subscribe service that can ingest millions of events per second and stream them to multiple consumers. This lets you process and analyze the massive amounts of data produced by your connected devices and applications. If you would like to know more about Azure Event Hubs, you may wish to review: [What is Event Hubs](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about)?

The Azure Event Hubs client library allows you to send and receive events in your Node.js application.

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs) | 
[Package (npm)](https://www.npmjs.com/package/@azure/event-hubs/v/next) | 
[API Reference Documentation](https://azure.github.io/azure-sdk-for-js/eventhub.html) |
[Product documentation](https://azure.microsoft.com/en-us/services/event-hubs/) | 
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples)

**NOTE**: If you are using version 2.1.0 or lower, then please use the below links instead

[Source code for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs) |
[Package for v2.1.0 (npm)](https://www.npmjs.com/package/@azure/event-hubs/v/2.1.0) |
[Samples for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples)

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

Interaction with Event Hubs starts with either an instance of the 
[EventHubConsumerClient](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html) class
or an instance of the [EventHubProducerClient](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubproducerclient.html) class. 
There are constructor overloads to support different ways of instantiating these classes as shown below:


```javascript
const { EventHubProducerClient, EventHubConsumerClient } = require("@azure/event-hubs");

const producerClient = new EventHubProducerClient("my-connection-string", "my-event-hub");
const consumerClient = new EventHubConsumerClient("my-connection-string", "my-event-hub");
```

- This constructor takes a connection string of the form 'Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;' and entity name to your Event Hub instance. You can create a consumer group, get the connection string as well as the entity name from the [Azure portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-get-connection-string#get-connection-string-from-the-portal).

```javascript
const { EventHubProducerClient, EventHubConsumerClient } = require("@azure/event-hubs");

const producerClient = new EventHubProducerClient("my-connection-string-with-entity-path");
const consumerClient = new EventHubConsumerClient("my-connection-string-with-entity-path");
```

- The [connection string from the Azure Portal](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-get-connection-string#get-connection-string-from-the-portal) is for the entire Event Hubs namespace and will not contain the path to the desired Event Hub instance which is needed for this constructor overload. In this case, the path can be added manually by adding ";EntityPath=[[ EVENT HUB NAME ]]" to the end of the connection string. For example, ";EntityPath=my-event-hub-name".

If you have defined a shared access policy directly on the Event Hub itself, then copying the connection string from that Event Hub will result in a connection string that contains the path.

```javascript
const { EventHubProducerClient, EventHubConsumerClient } = require("@azure/event-hubs");

const { DefaultAzureCredential } = require("@azure/identity");
const credential = new DefaultAzureCredential();
const producerClient = new EventHubProducerClient("my-host-name", "my-event-hub", credential);
const consumerClient = new EventHubConsumerClient("my-host-name", "my-event-hub", credential);
```

- This constructor takes the host name and entity name of your Event Hub instance and credential that implements the TokenCredential interface. There are implementations of the `TokenCredential` interface available in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package. The host name is of the format `<yournamespace>.servicebus.windows.net`.

### Examples

The following sections provide code snippets that cover some of the common tasks using Azure Event Hubs

- [Inspect an Event Hub](#inspect-an-event-hub)
- [Publish events to an Event Hub](#publish-events-to-an-event-hub)
- [Consume events from an Event Hub](#consume-events-from-an-event-hub)
- [Use EventHubConsumerClient to work with IotHub](#use-eventHubConsumerClient-to-work-with-IotHub)

### Inspect an Event Hub

Many Event Hub operations take place within the scope of a specific partition.
Because partitions are owned by the Event Hub, their names are assigned at the time of creation.
To understand what partitions are available, you query the Event Hub using either of the two clients available: `EventHubProducerClient` or `EventHubConsumerClient`

In the below example, we are using an `EventHubProducerClient`.

```javascript
const { EventHubProducerClient } = require("@azure/event-hubs");

async function main() {
  const client = new EventHubProducerClient("connectionString", "eventHubName");

  const partitionIds = await client.getPartitionIds();

  await client.close();
}

main();
```

### Publish events to an Event Hub

In order to publish events, you'll need to create an `EventHubProducerClient`. While the below example shows one way to create the client, see the
[Authenticate the client](#authenticate-the-client) section to learn other ways to instantiate the client.

You may publish events to a specific partition, or allow the Event Hubs service to decide which partition events should be published to. It is recommended to use automatic routing when the publishing of events needs to be highly available or when event data should be distributed evenly among the partitions. In the example below, we will take advantage of automatic routing.

- Create an `EventDataBatch` object using the [createBatch](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubproducer.html#createbatch) 
- Add events to the batch using the [tryAdd](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventdatabatch.html#tryadd)
method. You can do this until the maximum batch size limit is reached or until you are done adding the number of events you liked, whichever comes first. This method would return `false` to indicate that no more events can be added to the batch due to the max batch size being reached.
- Send the batch of events using the [sendBatch](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubproducerclient.html#sendbatch) method.

In the below example, we attempt to send 10 events to Azure Event Hubs.

```javascript
const { EventHubProducerClient } = require("@azure/event-hubs");

async function main() {
  const producerClient = new EventHubProducerClient("connectionString", "eventHubName");

  const eventDataBatch = await producerClient.createBatch();
  let numberOfEventsToSend = 10;

  while (numberOfEventsToSend > 0) {
    let wasAdded = eventDataBatch.tryAdd({ body: "my-event-body" });
    if (!wasAdded) {
      break;
    }
    numberOfEventsToSend--;
  }

  await producerClient.sendBatch(eventDataBatch);
  await producerClient.close();
}

main();
```

There are options you can pass at different stages to control the process of sending events to Azure Event Hubs.

- The `EventHubProducerClient` constructor takes an optional parameter of type `EventHubClientOptions` which you can use to specify options like number of retries.
- The `createBatch` method takes an optional parameter of type `CreateBatchOptions` which you can use to speicify the max batch size supported by the batch being created.
- The `sendBatch` method takes an optional parameter of type `SendBatchOptions` which you can use to specify `abortSignal` to cancel current operation.
- In case you want to send to a specific partition, an overload of the `sendBatch` method allows you to pass the id of the partition to send events to. 
The [Inspect an Event Hub](#inspect-an-event-hub) example above shows how to fetch the available partitions ids.


**Note**: When working with Azure Stream Analytics, the body of the event being sent should be a JSON object as well.
For example: `body: { "message": "Hello World" }`

### Consume events from an Event Hub

To consume events from an Event Hub instance, you also need to know which consumer group you want to target. 
Once you know this, you are ready to create an [EventHubConsumerClient](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html). While the below example shows one way to create the client, see the
[Authenticate the client](#authenticate-the-client) section to learn other ways to instantiate the client.

The [subscribe](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html#subscribe)
method on the client has 3 overloads to cater to the 3 ways you can consume events.

- [Consume events in a single process](consume-events-in-a-single-process)
- [Consume events with load balanced across multiple processes](consume-events-with-load-balanced-across-multiple-processes)
- [Consume events from a single partition](consume-events-from-a-single-partition)

The `subscribe` method takes an optional parameter of type [SubscriptionOptions](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/interfaces/subscriptionoptions.html) which you can use to specify options like the maxBatchSize (number of events to wait for) and maxWaitTimeInSeconds (amount of time to wait for maxBatchSize events to arrive).


#### Consume events in a single process

Begin by creating an instance of the `EventHubConsumerClient`, and then call the `subscribe()` method on it to start
consuming events.

The [subscribe](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html#subscribe) 
method takes callbacks to process events as they are receivied from Azure Event Hubs.
To stop receiving events, you can call `close()` on the object returned by the `subscribe()` method.

```javascript
const { EventHubConsumerClient } = require("@azure/event-hubs");

async function main() {
  const client = new EventHubConsumerClient("connectionString", "eventHubName");
  const myEventHandler = (events, context) => {
    // your code here
  };
  const subscription = consumer.subscribe({
    processEvents: myEventHandler,
    processError: myErrorHandler
  });

  // When ready to stop receiving
  await subscription.close();
  await client.close();
}

main();
```

#### Consume events with load balanced across multiple processes

Azure Event Hubs is capable of dealing with millions of events per second. 
To scale your processing application, you can run multiple instances of your application and have it balance the load among themselves.

Begin by creating an instance of the `EventHubConsumerClient`, and then call the `subscribe()` method on it to start
consuming events. Pass an instance of a `PartitionManager` to the `subscribe()` method which the `EventHubConsumerClient` can 
use to co-ordinate the processing between the multiple instances of your application.

In this example, we will use the `PartitionManger` from the `@azure/eventhubs-checkpointstore-blob` package
which implements the required read/writes to a durable store by using Azure Blob Storage.

The [subscribe](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html#subscribe) 
method takes callbacks to process events as they are receivied from Azure Event Hubs.
To stop receiving events, you can call `close()` on the object returned by the `subscribe()` method.

```javascript
const { EventHubConsumerClient } = require("@azure/event-hubs");
const { ContainerClient } = require("@azure/storage-blob");
const { BlobPartitionManager } = require("@azure/eventhubs-checkpointstore-blob");

async function main() {
  const consumerClient = new EventHubConsumerClient("connectionString", "eventHubName");
  const blobContainerClient = new ContainerClient("storage-connection-string", "container-name");
  await blobContainerClient.create(); // This can be skipped if the container already exists
  const partitionManager =  new BlobPartitionManager(blobContainerClient);

  const myEventHandler = (events, context) => {
    // your code here
  };
  const subscription = consumer.subscribe(partitionManager, {
    processEvents: myEventHandler
  });

  // When ready to stop receiving
  await subscription.close();
  await client.close();
}

main();
```


#### Consume events from a single partition

Begin by creating an instance of the `EventHubConsumerClient`, and then call the `subscribe()` method on it to start
consuming events. Pass the id of the partition you want to target to the `subscribe()` method to consume only from that partition.

In the below example, we are using the first partition.

The [subscribe](https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-event-hubs/5.0.0-preview.6/classes/eventhubconsumerclient.html#subscribe) 
method takes callbacks to process events as they are receivied from Azure Event Hubs.
To stop receiving events, you can call `close()` on the object returned by the `subscribe()` method.


```javascript
const { EventHubConsumerClient } = require("@azure/event-hubs");

async function main() {
  const client = new EventHubConsumerClient("connectionString", "eventHubName");
  const partitionIds = await client.getPartitionIds();
  const myEventHandler = (events, context) => {
    // your code here
  };
  const subscription = consumer.subscribe(partitionIds[0], {
    processEvents: myEventHandler,
    onError: myErrorHandler
  });

  // When ready to stop receiving
  await subscription.close();
  await client.close();
}

main();
```

### Use EventHubConsumerClient to work with IotHub

You can use `EventHubConsumerClient` to work with IotHub as well. This is useful for receiving telemetry data of IotHub from the linked EventHub.
The associated connection string will not have send claims,
hence sending events is not possible.

- Please notice that the connection string needs to be for an
  [Event Hub-compatible endpoint](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-messages-read-builtin)
  e.g. "Endpoint=sb://my-iothub-namespace-[uid].servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-iot-hub-name"

```javascript
const { EventHubConsumerClient } = require("@azure/event-hubs");

async function main() {
  const client = new EventHubConsumerClient(
    "Endpoint=sb://my-iothub-namespace-[uid].servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-iot-hub-name"
  );
  await client.getProperties();
  // retrieve partitionIds from client.getProperties() or client.getPartitionIds()
  const partitionId = "0";
  await client.getPartitionProperties(partitionId);

  await client.close();
}

main();
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

### More sample code

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples)
directory for detailed examples of how to use this library to send and receive events to/from
[Event Hubs](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about).

## Contributing

This project welcomes contributions and suggestions. Most contributions require you to agree to a
Contributor License Agreement (CLA) declaring that you have the right to, and actually do, grant us
the rights to use your contribution. For details, visit https://cla.microsoft.com.

When you submit a pull request, a CLA-bot will automatically determine whether you need to provide
a CLA and decorate the PR appropriately (e.g., label, comment). Simply follow the instructions
provided by the bot. You will only need to do this once across all repos using our CLA.

This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/).
For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or
contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/master/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-hubs%2FREADME.png)
