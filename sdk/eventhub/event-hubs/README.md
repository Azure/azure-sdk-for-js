# Azure Event Hubs client library for Javascript

Azure Event Hubs is a scalable event processing service that ingests and processes large volumes of events and data, with low latency and high reliability.

Use the client library for Azure Event Hubs in your Node.js application to

- Send messages to an Event Hub
- Receive messages from an Event Hub

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

Interaction with Event Hubs start with an instance of the [EventHubClient](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest) class. You can instantiate
this class using one of the 4 static methods on it

- [createFromConnectionString](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest#createfromconnectionstring-string--ClientOptions-)
  - This method takes the connection string and entity name to your Event Hub instance. You can get the connection string
    from the Azure portal
- [createFromIotHubConnectionString](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest#createfromiothubconnectionstring-string--clientoptions-)
  - This method takes an IotHub Connection string. You can get the connection string from the Azure portal. This is useful for receiving telemetry data
    of IotHub from the linked EventHub. Most likely the associated connection string will not have send claims. Hence getting HubRuntimeInfo or PartitionRuntimeInfo
    and receiving messages would be the possible operations.
- [createFromTokenProvider](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest#createfromtokenprovider-string--string--tokenprovider--clientoptionsbase-)
  - This method takes the host name and entity name of your Event Hub instance and your custom Token Provider. The
    host name is of the format `name-of-event-hub-instance.servicebus.windows.net`.
- [createFromAADTokenCredentials](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest#createfromaadtokencredentials-string--string--applicationtokencredentials---usertokencredentials---devicetokencredentials---msitokencredentials--clientoptionsbase-)
  - This method takes the host name and entity name of your Event Hub instance and a credentials object that you need
    to generate using the [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth)
    library. The host name is of the format `name-of-event-hub-instance.servicebus.windows.net`.

### Examples

The following sections provide code snippets that cover some of the common tasks using Azure Event Hubs

- [Get the partition Ids](#get-the-partition-ids)
- [Send messages](#send-messages)
- [Receive messages](#receive-messages)]
 - You can use this receiver in one of 2 ways to receive messages
   - [Get an array of messages](#get-an-array-of-messages)
   - [Register message handler](#register-message-handler)
- [Get an event hub runtime info](#get-an-event-hub-runtime-info)
- [Get info about the specified partition](#get-info-about-the-specified-partition)

### Get the partition Ids

Once you have created an instance of an `EventHubClient` class, get the partition IDs
using the [getPartitionIds](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#getpartitionids--) function.

```javascript
const client = EventHubClient.createFromConnectionString("connectionString" , "eventHubName");
const partitionIds = await client.getPartitionIds();
```

### Send messages

Once you have created an instance of an `EventHubClient` class, send messages 
using the [send](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#send-eventdata--string---number-) function.

```javascript
const client = EventHubClient.createFromConnectionString("connectionString" , "eventHubName");
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub where the body is a JSON object.
  // const eventData = { body: { "message": "Hello World" }};
  await client.send({
  body: "my-message-body"
}, "partitionId");
```

### Receive messages

Once you have created an instance of an `EventHubClient` class, you can receive messages in one of 2 ways:

#### Get an array of messages

Use the [receiveBatch](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#sendbatch-eventdata----string---number-) function which returns a promise that resolves to an array of messages.

```javascript
const myMessages = await client.receiveBatch("partitionId", 10);
```

#### Register message handler

Use the [receive](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#receive-string---number--onmessage--onerror--receiveoptions-) to set up message handlers and have it running as long as you
need. When you are done, call `receiveHandler.close()` to stop receiving any more messages.

```javascript
const myMessageHandler = async (message) => {
  // your code here
};
const myErrorHandler = (error) => {
  console.log(error);
};
client.receive("partitionId", myMessageHandler, myErrorHandler);
```

### Get an event hub runtime info

Once you have created an instance of an `EventHubClient` class, get an event hub run time information 
using the [getHubRuntimeInformation](https://docs.microsoft.com/en-us/javascript/api/%40azure/event-hubs/eventhubclient?view=azure-node-latest#gethubruntimeinformation--) function.

```javascript
const client = EventHubClient.createFromConnectionString("connectionString");
await client.getHubRuntimeInformation();  
```

### Get info about the specified partition

Once you have created an instance of an `EventHubClient` class, get information about the specified partition
using the [getPartitionInformation](https://docs.microsoft.com/en-us/javascript/api/@azure/event-hubs/eventhubclient?view=azure-node-latest#send-eventdata--string---number-) function.

```javascript
const client = EventHubClient.createFromConnectionString("connectionString");
await client.getPartitionInformation("partitionId);  
```

**Note:** For scalable and efficient receiving, please take a look at [azure-event-processor-host](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-processor-host). The Event Processor host, internally uses the streaming receiver
to receive messages.

## IDE ##
This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com) 
or any other IDE that provides better intellisense and exposes the full power of source code documentation.

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

- If you are **not interested in viewing the message transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

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

## AMQP Dependencies ##
It depends on [rhea](https://github.com/amqp/rhea) library for managing connections, sending and receiving events over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.

## Next Steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples)
directory for detailed examples on how to use this library to send and receive messages to/from
[Event Hubs](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-about).


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/eventhub/event-hubs/README.png)
