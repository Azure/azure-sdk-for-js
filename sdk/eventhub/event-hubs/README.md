# Azure Event Hubs client library for JavaScript

Azure Event Hubs is a highly scalable publish-subscribe service that can ingest millions of events per second and stream them to multiple consumers. This lets you process and analyze the massive amounts of data produced by your connected devices and applications. If you would like to know more about Azure Event Hubs, you may wish to review: [What is Event Hubs](https://docs.microsoft.com/azure/event-hubs/event-hubs-about)?

The Azure Event Hubs client library allows you to send and receive events in your Node.js application.

Key links:
- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs)
- [Package (npm)](https://www.npmjs.com/package/@azure/event-hubs)
- [API Reference Documentation](https://docs.microsoft.com/javascript/api/@azure/event-hubs)
- [Product documentation](https://azure.microsoft.com/services/event-hubs/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/samples)

**NOTE**: If you are using version 2.1.0 or lower and want to migrate to the latest version
of this package please look at our [migration guide to move from EventHubs V2 to EventHubs V5](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/migrationguide.md)

Samples for v2 and documentation are still available here:

[Source code for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs) |
[Package for v2.1.0 (npm)](https://www.npmjs.com/package/@azure/event-hubs/v/2.1.0) |
[Samples for v2.1.0](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples)

## Getting started

### Install the package

Install the Azure Event Hubs client library using npm

`npm install @azure/event-hubs`

### Currently supported environments

- [LTS versions of Node.js](https://nodejs.org/about/releases/)
- Latest versions of Safari, Chrome, Edge, and Firefox.

See our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- An [Event Hubs Namespace](https://docs.microsoft.com/azure/event-hubs/)

#### Configure TypeScript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### JavaScript Bundle

To use this client library in the browser, first you need to use a bundler. For details on how to do this, please refer to our [bundling documentation](https://aka.ms/AzureSDKBundling).

In addition to what is described there, this library also needs additional polyfills for the following NodeJS core built-in modules in order to work properly in the browsers:

- `buffer`
- `os`
- `path`
- `process`

For example, if you are using Webpack v5, you can install the following dev dependencies

- `npm install --save-dev buffer os-browserify path-browserify process`

then add the following into your webpack.config.js

```diff
 const path = require("path");
+const webpack = require("webpack");

 module.exports = {
   entry: "./src/index.ts",
@@ -12,8 +13,21 @@ module.exports = {
       },
     ],
   },
+  plugins: [
+    new webpack.ProvidePlugin({
+      process: "process/browser",
+    }),
+    new webpack.ProvidePlugin({
+      Buffer: ["buffer", "Buffer"],
+    }),
+  ],
   resolve: {
     extensions: [".ts", ".js"],
+    fallback: {
+      buffer: require.resolve("buffer/"),
+      os: require.resolve("os-browserify"),
+      path: require.resolve("path-browserify"),
+    },
   },
```

Please consult the documentation of your favorite bundler for more information on using polyfills.

### Authenticate the client

Interaction with Event Hubs starts with either an instance of the
[EventHubConsumerClient](https://docs.microsoft.com/javascript/api/@azure/event-hubs/eventhubconsumerclient) class
or an instance of the [EventHubProducerClient](https://docs.microsoft.com/javascript/api/@azure/event-hubs/eventhubproducerclient) class.
There are constructor overloads to support different ways of instantiating these classes as shown below:

#### Use connection string for the Event Hubs namespace

One of the constructor overloads takes a connection string of the form `Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;` and entity name to your Event Hub instance. You can create a consumer group and get the connection string as well as the entity name from the [Azure portal](https://docs.microsoft.com/azure/event-hubs/event-hubs-get-connection-string#get-connection-string-from-the-portal).

```javascript
const { EventHubProducerClient, EventHubConsumerClient } = require("@azure/event-hubs");

const producerClient = new EventHubProducerClient("my-connection-string", "my-event-hub");
const consumerClient = new EventHubConsumerClient(
  "my-consumer-group",
  "my-connection-string",
  "my-event-hub"
);
```

#### Use connection string for policy on the Event Hub

Another constructor overload takes the connection string corresponding to the shared access policy you have defined directly on the Event Hub instance (and not the Event Hubs namespace).
This connection string will be of the form `Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-event-hub-name`.
The key difference in the connection string format from the previous constructor overload is the `;EntityPath=my-event-hub-name`.

```javascript
const { EventHubProducerClient, EventHubConsumerClient } = require("@azure/event-hubs");

const producerClient = new EventHubProducerClient("my-connection-string-with-entity-path");
const consumerClient = new EventHubConsumerClient(
  "my-consumer-group",
  "my-connection-string-with-entity-path"
);
```

#### Use the Event Hubs namespace and Azure Identity

This constructor overload takes the host name and entity name of your Event Hub instance and credential that implements the TokenCredential interface. This allows you to authenticate using an Azure Active Directory principal. There are implementations of the `TokenCredential` interface available in the [@azure/identity](https://www.npmjs.com/package/@azure/identity) package. The host name is of the format `<yournamespace>.servicebus.windows.net`. When using Azure Active Directory, your principal must be assigned a role which allows access to Event Hubs, such as the Azure Event Hubs Data Owner role. For more information about using Azure Active Directory authorization with Event Hubs, please refer to [the associated documentation](https://docs.microsoft.com/azure/event-hubs/authorize-access-azure-active-directory).

```javascript
const { EventHubProducerClient, EventHubConsumerClient } = require("@azure/event-hubs");

const { DefaultAzureCredential } = require("@azure/identity");
const credential = new DefaultAzureCredential();
const producerClient = new EventHubProducerClient("my-host-name", "my-event-hub", credential);
const consumerClient = new EventHubConsumerClient(
  "my-consumer-group",
  "my-host-name",
  "my-event-hub",
  credential
);
```

## Key concepts

- An **Event Hub producer** is a source of telemetry data, diagnostics information, usage logs, or other log data, as part of an embedded device solution, a mobile device application, a game title running on a console or other device, some client or server based business solution, or a web site.

- An **Event Hub consumer** picks up such information from the Event Hub and processes it. Processing may involve aggregation, complex computation and filtering. Processing may also involve distribution or storage of the information in a raw or transformed fashion. Event Hub consumers are often robust and high-scale platform infrastructure parts with built-in analytics capabilities, like Azure Stream Analytics, Apache Spark, or Apache Storm.

- A **partition** is an ordered sequence of events that is held in an Event Hub. Partitions are a means of data organization associated with the parallelism required by event consumers. Azure Event Hubs provides message streaming through a partitioned consumer pattern in which each consumer only reads a specific subset, or partition, of the message stream. As newer events arrive, they are added to the end of this sequence. The number of partitions is specified at the time an Event Hub is created and cannot be changed.

- A **consumer group** is a view of an entire Event Hub. Consumer groups enable multiple consuming applications to each have a separate view of the event stream, and to read the stream independently at their own pace and from their own position. There can be at most 5 concurrent readers on a partition per consumer group; however it is recommended that there is only one active consumer for a given partition and consumer group pairing. Each active reader receives all of the events from its partition; If there are multiple readers on the same partition, then they will receive duplicate events.

For more concepts and deeper discussion, see: [Event Hubs Features](https://docs.microsoft.com/azure/event-hubs/event-hubs-features)

### Guidance around retries

The `EventHubConsumerClient` and `EventHubProducerClient` accept `options` where you can set the `retryOptions`
that allow you to tune how the SDK handles transient errors.
Examples of transient errors include temporary network or service issues.

#### Retries when consuming events

If a transient error (e.g. a temporary network issue) is encountered while the SDK is receiving events,
it will retry receiving events based on the retry options passed into the `EventHubConsumerClient`.
If the maximum retry attempts are exhausted, the `processError` function will be invoked.

You can use the retry settings to control how quickly you are informed about temporary issues such as a
network connection issue.
For example, if you need to know when there is a network issue right away you can lower the
values for `maxRetries` and `retryDelayInMs`.

After executing the `processError` function, the client continues to receive events from the partition as long
as the error was a retryable one. Otherwise, the client invokes the user-provided `processClose` function.
This function is also invoked when either you stop the subscription or when the client stops reading
events from the current partition due to it being picked up by another instance of your application
as part of load balancing.

The `processClose` function provides an opportunity to update checkpoints if needed.
After executing `processClose`, the client (or in the case of load balancing,
a client from another instance of you application) will invoke the user-provided
`processInitialize` function to resume reading events from the last updated checkpoint for the same partition.

If you wish to stop attempting to read events, you must call `close()` on the `subscription` returned
by the `subscribe` method.

## Examples

The following sections provide code snippets that cover some of the common tasks using Azure Event Hubs

- [Inspect an Event Hub](#inspect-an-event-hub)
- [Publish events to an Event Hub](#publish-events-to-an-event-hub)
- [Consume events from an Event Hub](#consume-events-from-an-event-hub)
- [Use EventHubConsumerClient to work with IotHub](#use-eventhubconsumerclient-to-work-with-iothub)

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

- Create an `EventDataBatch` object using the [createBatch](https://docs.microsoft.com/javascript/api/@azure/event-hubs/eventhubproducerclient#createbatch-createbatchoptions-)
- Add events to the batch using the [tryAdd](https://docs.microsoft.com/javascript/api/@azure/event-hubs/eventdatabatch#tryadd-eventdata--tryaddoptions-)
  method. You can do this until the maximum batch size limit is reached or until you are done adding the number of events you liked, whichever comes first. This method would return `false` to indicate that no more events can be added to the batch due to the max batch size being reached.
- Send the batch of events using the [sendBatch](https://docs.microsoft.com/javascript/api/@azure/event-hubs/eventhubproducerclient#sendbatch-eventdatabatch--sendbatchoptions-) method.

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
Once you know this, you are ready to create an [EventHubConsumerClient](https://docs.microsoft.com/javascript/api/@azure/event-hubs/eventhubconsumerclient). While the below example shows one way to create the client, see the
[Authenticate the client](#authenticate-the-client) section to learn other ways to instantiate the client.

The `subscribe` method on the client has overloads which, combined with the constructor, can cater to several
ways to consume events:

- [Consume events in a single process](#consume-events-in-a-single-process)
- [Consume events with load balanced across multiple processes](#consume-events-with-load-balanced-across-multiple-processes)
- [Consume events from a single partition](#consume-events-from-a-single-partition)

The `subscribe` method takes an optional parameter of type `SubscriptionOptions` which you can use to specify options like the maxBatchSize (number of events to wait for) and maxWaitTimeInSeconds (amount of time to wait for maxBatchSize events to arrive).

#### Consume events in a single process

Begin by creating an instance of the `EventHubConsumerClient`, and then call the `subscribe()` method on it to start
consuming events.

The `subscribe` method takes callbacks to process events as they are received from Azure Event Hubs.
To stop receiving events, you can call `close()` on the object returned by the `subscribe()` method.

```javascript
const { EventHubConsumerClient, earliestEventPosition } = require("@azure/event-hubs");

async function main() {
  const client = new EventHubConsumerClient(
    "my-consumer-group",
    "connectionString",
    "eventHubName"
  );

  // In this sample, we use the position of earliest available event to start from
  // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
  const subscriptionOptions = {
    startPosition: earliestEventPosition
  };

  const subscription = client.subscribe(
    {
      processEvents: async (events, context) => {
        // event processing code goes here
      },
      processError: async (err, context) => {
        // error reporting/handling code here
      }
    },
    subscriptionOptions
  );

  // Wait for a few seconds to receive events before closing
  setTimeout(async () => {
    await subscription.close();
    await client.close();
    console.log(`Exiting sample`);
  }, 3 * 1000);
}

main();
```

#### Consume events with load balanced across multiple processes

Azure Event Hubs is capable of dealing with millions of events per second.
To scale your processing application, you can run multiple instances of your application and have it balance the load among themselves.

Begin by creating an instance of the `EventHubConsumerClient` using one of the
constructor overloads that take a `CheckpointStore`, and then call the `subscribe()`
method to start consuming events. The checkpoint store will enable the subscribers
within a consumer group to coordinate the processing between multiple instances
of your application.

In this example, we will use the `BlobCheckpointStore` from the `@azure/eventhubs-checkpointstore-blob` package
which implements the required read/writes to a durable store by using Azure Blob Storage.

The `subscribe` method takes callbacks to process events as they are received from Azure Event Hubs.
To stop receiving events, you can call `close()` on the object returned by the `subscribe()` method.

```javascript
const { EventHubConsumerClient } = require("@azure/event-hubs");
const { ContainerClient } = require("@azure/storage-blob");
const { BlobCheckpointStore } = require("@azure/eventhubs-checkpointstore-blob");

const storageAccountConnectionString = "storage-account-connection-string";
const containerName = "container-name";
const eventHubConnectionString = "eventhub-connection-string";
const consumerGroup = "my-consumer-group";
const eventHubName = "eventHubName";

async function main() {
  const blobContainerClient = new ContainerClient(storageAccountConnectionString, containerName);

  if (!(await blobContainerClient.exists())) {
    await blobContainerClient.create();
  }

  const checkpointStore = new BlobCheckpointStore(blobContainerClient);
  const consumerClient = new EventHubConsumerClient(
    consumerGroup,
    eventHubConnectionString,
    eventHubName,
    checkpointStore
  );

  const subscription = consumerClient.subscribe({
    processEvents: async (events, context) => {
      // event processing code goes here
      if (events.length === 0) {
        // If the wait time expires (configured via options in maxWaitTimeInSeconds) Event Hubs
        // will pass you an empty array.
        return;
      }

      // Checkpointing will allow your service to pick up from
      // where it left off when restarting.
      //
      // You'll want to balance how often you checkpoint with the
      // performance of your underlying checkpoint store.
      await context.updateCheckpoint(events[events.length - 1]);
    },
    processError: async (err, context) => {
      // handle any errors that occur during the course of
      // this subscription
      console.log(`Errors in subscription to partition ${context.partitionId}: ${err}`);
    }
  });

  // Wait for a few seconds to receive events before closing
  await new Promise((resolve) => setTimeout(resolve, 10 * 1000));

  await subscription.close();
  await consumerClient.close();
  console.log(`Exiting sample`);
}

main();
```

Please see [Balance partition load across multiple instances of your application](https://docs.microsoft.com/azure/event-hubs/event-processor-balance-partition-load)
to learn more.

#### Consume events from a single partition

Begin by creating an instance of the `EventHubConsumerClient`, and then call the `subscribe()` method on it to start
consuming events. Pass the id of the partition you want to target to the `subscribe()` method to consume only from that partition.

In the below example, we are using the first partition.

The `subscribe` method takes callbacks to process events as they are received from Azure Event Hubs.
To stop receiving events, you can call `close()` on the object returned by the `subscribe()` method.

```javascript
const { EventHubConsumerClient, earliestEventPosition } = require("@azure/event-hubs");

async function main() {
  const client = new EventHubConsumerClient(
    "my-consumer-group",
    "connectionString",
    "eventHubName"
  );
  const partitionIds = await client.getPartitionIds();

  // In this sample, we use the position of earliest available event to start from
  // Other common options to configure would be `maxBatchSize` and `maxWaitTimeInSeconds`
  const subscriptionOptions = {
    startPosition: earliestEventPosition
  };

  const subscription = client.subscribe(
    partitionIds[0],
    {
      processEvents: async (events, context) => {
        // event processing code goes here
      },
      processError: async (err, context) => {
        // error reporting/handling code here
      }
    },
    subscriptionOptions
  );

  // Wait for a few seconds to receive events before closing
  setTimeout(async () => {
    await subscription.close();
    await client.close();
    console.log(`Exiting sample`);
  }, 3 * 1000);
}

main();
```

### Use EventHubConsumerClient to work with IotHub

You can use `EventHubConsumerClient` to work with IotHub as well. This is useful for receiving telemetry data of IotHub from the linked EventHub.
The associated connection string will not have send claims,
hence sending events is not possible.

- Please notice that the connection string needs to be for an
  [Event Hub-compatible endpoint](https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messages-read-builtin)
  (e.g. "Endpoint=sb://my-iothub-namespace-[uid].servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-iot-hub-name")

```javascript
const { EventHubConsumerClient } = require("@azure/event-hubs");

async function main() {
  const client = new EventHubConsumerClient(
    "my-consumer-group",
    "Endpoint=sb://my-iothub-namespace-[uid].servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key;EntityPath=my-iot-hub-name"
  );
  await client.getEventHubProperties();
  // retrieve partitionIds from client.getEventHubProperties() or client.getPartitionIds()
  const partitionId = "0";
  await client.getPartitionProperties(partitionId);

  await client.close();
}

main();
```

## Troubleshooting

### AMQP Dependencies

The Event Hubs library depends on the [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving events over the [AMQP](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.

### Logging

You can set the `AZURE_LOG_LEVEL` environment variable to enable logging to `stderr`:

```bash
export AZURE_LOG_LEVEL=verbose
```

For more detailed instructions on how to enable logs, you can look at the
[@azure/logger package docs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/core/logger).

You can alternatively set the `DEBUG` environment variable to get logs when using this library.
This can be useful if you also want to emit logs from the dependencies `rhea-promise` and `rhea` as well.

**Note:** AZURE_LOG_LEVEL, if set, takes precedence over DEBUG.
Do not specify any `azure` libraries via DEBUG when also specifying
AZURE_LOG_LEVEL or calling setLogLevel.

- Getting only info level debug logs from the Event Hubs SDK.

```bash
export DEBUG=azure:*:info
```

- Getting debug logs from the Event Hubs SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the raw event data** (which consumes a large amount of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message
```

- If you are interested only in **errors** and SDK **warnings**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:*:(error|warning),rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
```

## Next steps

### More sample code

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/samples)
directory for detailed examples of how to use this library to send and receive events to/from
[Event Hubs](https://docs.microsoft.com/azure/event-hubs/event-hubs-about).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Feventhub%2Fevent-hubs%2FREADME.png)
