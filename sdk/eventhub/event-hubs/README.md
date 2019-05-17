# Azure Event Hubs client library for Javascript

Azure Event Hubs is a scalable event processing service that ingests and processes large volumes of events and data, with low latency and high reliability.

Use the client library for Azure Event Hubs in your Node.js application to

- Send events to Event Hub
- Receive events from Event Hub

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs) | [Package (npm)](https://www.npmjs.com/package/@azure/event-hubs) | [API Reference Documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/index?view=azure-node-latest) | [Product documentation](https://azure.microsoft.com/en-us/services/event-hubs/)

## Getting Started

### Install the package

Install the Azure Event Hubs client library using npm

`npm install @azure/event-hubs`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Event Hubs Namespace](https://docs.microsoft.com/en-us/azure/event-hubs/) to use this package.
If you are using this package in a Node.js application, then use Node.js 6.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### Authenticate the client

Interaction with Event Hubs starts with an instance of the [EventHubClient](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest) class. You can instantiate
this class using one of the below static methods on it

- [createFromConnectionString](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#createfromconnectionstring-string--string--clientoptions-)
  - This method takes the connection string and entity name to your Event Hub instance. You can get the connection string
    from the Azure portal
- [createFromTokenProvider](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest#createfromtokenprovider-string--string--tokenprovider--clientoptionsbase-)
  - This method takes the host name and entity name of your Event Hub instance and your custom Token Provider. The
    host name is of the format `name-of-event-hub-instance.servicebus.windows.net`.
- [createFromAADTokenCredentials](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest#createfromaadtokencredentials-string--string--applicationtokencredentials---usertokencredentials---devicetokencredentials---msitokencredentials--clientoptionsbase-)
  - This method takes the host name and entity name of your Event Hub instance and a credentials object that you need
    to generate using the [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth)
    library. The host name is of the format `name-of-event-hub-instance.servicebus.windows.net`.

### Examples

The following sections provide code snippets that cover some of the common tasks using Azure Event Hubs

- [Send events](#send-events)
- [Receive events](#receive-events)
- [Use EventHubClient to work with IotHub](#use-eventHubClient-to-work-with-IotHub)

### Send events

Once you have created an instance of an `EventHubClient` class, send events
using the [send](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#send-eventdata--string---number-) function.

You can also use the [sendBatch](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#sendbatch-eventdata----string---number-) method to send multiple events using a single call.

```javascript
const client = EventHubClient.createFromConnectionString("connectionString", "eventHubName");

await client.send({ body: "my-event-body" });
await client.sendBatch(
  [
    { body: "my-event-body-1" },
    { body: "my-event-body-2" },
    { body: "my-event-body-3" }
  ]
);
```

To send events to a particular partition, use the optional parameter `partitionId` on the `send` and `sendBatch` functions.
You can use the [getPartitionIds](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#getpartitionids--)
function to get the ids of all available partitions in your Event Hub instance.

**Note**: When working with Azure Stream Analytics, the body of the event being sent should be a JSON object as well.
For example: `body: { "message": "Hello World" }`

### Receive events

Once you have created an instance of an `EventHubClient` class, you can receive events in one of 2 ways:

- [Get an array of events](#get-an-array-of-events)
- [Register event handler](#register-event-handler)

Both ways require you to know the id of the partition that you want to receive events from.
You can use the [getPartitionIds](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#getpartitionids--)
function to get the ids of all available partitions in your Event Hub instance.

#### Get an array of events

Use the [receiveBatch](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#receivebatch-string---number--number--number--receiveoptions-) function which returns a promise that resolves to an array of events.

This function takes an optional parameter called `options` of type [ReceiveOptions](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/receiveoptions?view=azure-node-latest)
which you can use to specify the Consumer Group you want to target or the position from where you want to start receiving events.

```javascript
const client = EventHubClient.createFromConnectionString("connectionString", "eventHubName");
const myEvents = await client.receiveBatch("my-partitionId", 10);
```

#### Register event handler

Use the [receive](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#receive-string---number--onmessage--onerror--receiveoptions-) to set up event handlers and have it running as long as you
need. 

This function takes an optional parameter called `options` of type [ReceiveOptions](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/receiveoptions?view=azure-node-latest)
which you can use to specify the Consumer Group you want to target or the position from where you want to start receiving events.

```javascript
const myEventHandler = event => {
  // your code here
};
const myErrorHandler = error => {
  // your error handler here
};
const receiveHandler = client.receive("partitionId", myEventHandler, myErrorHandler);

// When ready to stop receiving
await receiveHandler.stop();

```

### Use EventHubClient to work with IotHub

You can use `EventHubClient` to work with IotHub as well. This is useful for receiving telemetry data of IotHub from the linked EventHub.
Most likely the associated connection string will not have send claims. Hence getting HubRuntimeInfo or PartitionRuntimeInfo and receiving events would be the possible operations.

- Please notice that we are awaiting on the [createFromIotHubConnectionString](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest#createfromiothubconnectionstring-string--clientoptions-) method to get an instance of the EventHubClient. This is different from other static methods on the client. The method talks to the IotHub endpoint to get a redirect error which contains the EventHub endpoint to talk to. It then constructs the right EventHub connection string based on the information in the redirect error and returns an instance of the EventHubClient that you can play with.

```javascript
const client = await EventHubClient.createFromIotHubConnectionString("connectionString");
await client.getHubRuntimeInformation();
await client.getPartitionInformation("partitionId");
```

**Notes:** For scalable and efficient receiving, please take a look at [azure-event-processor-host](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-processor-host). The Event Processor host, internally uses the streaming receiver to receive events.

## Troubleshooting

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

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/eventhub/event-hubs/README.png)
