### azure-event-hubs


Deprecation warning
================
**This package has been deprecated. Please use [@azure/event-hubs](https://www.npmjs.com/package/@azure/event-hubs) instead.**

Please install:

```
npm i @azure/event-hubs
```

Azure Event Hubs is a scalable event processing service that ingests and processes large volumes of events and data, with low latency and high reliability. More information about Azure Event Hubs can be found over [here](https://docs.microsoft.com/en-us/azure/event-hubs/event-hubs-features).

This sdk provides a convenient way to interact with the Azure Event Hubs service.

## Pre-requisite ##
- **Node.js version: 8.x or higher.** We would encourage you to install the latest available LTS version at any given time from https://nodejs.org. **Please do not use older LTS versions of node.js.**

## Installation ##
```bash
npm install azure-event-hubs
```

### Client creation
The simplest usage is to use the static factory method `EventHubClient.createFromConnectionString(_connection-string_, _event-hub-path_)`. Once you have a client, you can use it for:

### Sending events
- You can send a single event using `client.send()` method.
- You can even batch multiple events together using `client.sendBatch()` method.

### Receiving events
There are two ways to receive events using the EventHub Client.

#### Streaming receiver
The `EventHubClient` has a `client.receive(. . .)` method on the receiver.
This message takes the `messageHandler()` and the `errorHandler()` amongst other parameters and registers them to the receiver. 
This method returns a `ReceiverHandler` that can be used to stop receiving further events `await receiverHandler.stop()`
This mechanism can be useful in a scenario, where you want to continuously receive events/messages at a high speed.

#### Batching receiver
You can use `await client.receiveBatch(...)` to receive desired number of events for specified amount of time.
It will return an array of EventData objects once it receives the desired number of events or the max wait time occurs (which ever happens first). This mechanism can be useful when you want to receive events/messages in a batch. If your in a scenario where you
would like to receive some messages and process them (since message processing is time consuming), and later get some more messages,
then this mechanism will suite your needs better.

**Note:** For scalable and efficient receiving, please take a look at [azure-event-processor-host](https://github.com/Azure/azure-event-hubs-node/tree/master/processor). The Event Processor host, internally uses the streaming receiver
to receive messages.

## IDE ##
This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com) 
or any other IDE that provides better intellisense and exposes the full power of source code documentation.

## Debug logs ##

You can set the following environment variable to get the debug logs.

- Getting debug logs from the Event Hub SDK
```bash
export DEBUG=azure*
```
- Getting debug logs from the Event Hub SDK and the protocol level library.
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

#### Logging to a file
- Set the `DEBUG` environment variable as shown above and then run your test script as follows:
  - Logging statements from you test script go to `out.log` and logging statement from the sdk go to `debug.log`.
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

## Examples ##

Please take a look at the [examples](https://github.com/Azure/azure-event-hubs-node/tree/master/client/examples) directory for detailed examples.

## Example 1 - Get the partition IDs.

```js
const { EventHubClient } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  const partitionIds = await client.getPartitionIds();
}

main().catch((err) => {
  console.log(err);
});
```

## Example 2.1 - Receive events with handlers
This mechanism is useful for receiving events for a longer duration.

Receive events from partition ID 1 after the current time.
```js
const { EventHubClient, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  const onError = (err) => {
    console.log("An error occurred on the receiver ", err);
  };
  
  const onMessage = (eventData) => {
    console.log(eventData.body);
    const enqueuedTime = eventData.annotations["x-opt-enqueued-time"];
    console.log("Enqueued Time: ", enqueuedTime);
  };

  const receiveHandler = client.receive("1", onMessage, onError, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });

  // To stop receiving events later on...
  await receiveHandler.stop();
}

main().catch((err) => {
  console.log(err);
});
```

## Example 2.2 - Receive specified number of events for a given time
This mechanism is useful when you want to see how the received events look like. It can also be useful for debugging purpose.

Receive events from partitionId `"1"` after the current time.
```js
const { EventHubClient, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  const datas = await client.receiveBatch("1", 100 /*number of events*/, 20 /*amount of time in seconds the receiver should run. Default 60 seconds.*/, { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  console.log("Array of EventData objects", datas);
}

main().catch((err) => {
  console.log(err);
});
```

## Example 3 - Send an event with partition key.

Send an event with a given "partition-key" which is then hashed to a partition ID (so all events with the same key will go to the same ID, but load is balanced between partitions). 

```js
const { EventHubClient, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub where the body is a JSON object.
  // const eventData = { body: { "message": "Hello World" }, partitionKey: "pk12345"};
  const eventData = { body: "Hello World", partitionKey: "pk12345"};
  const delivery = await client.send(eventData);
  console.log("message sent successfully.");
}

main().catch((err) => {
  console.log(err);
});
```

## Example 4 - Send an event to a specific partition id.

Send an event to a specific partition ID if needed. If not specified then EventHub will store the events in the partition in a round-robin pattern.

```js
const { EventHubClient, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub where the body is a JSON object/array.
  // const eventData = { body: { "message": "Hello World" } };
  const data = { body: "Hello World 1", message_id: "343-0909-5454-23423-54543" };
  const delivery = await client.send(data, "1");
  console.log("message sent successfully.");
}

main().catch((err) => {
  console.log(err);
});
```

## Example 5 - Send multiple events as a batch. 

Send multiple events grouped together.

```js
const { EventHubClient, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString(process.env["EVENTHUB_CONNECTION_STRING"], process.env["EVENTHUB_NAME"]);

async function main() {
  const datas = [
    { body: "Hello World 1", applicationProperties: { id: "Some id" }, partitionKey: "pk786" },
    { body: "Hello World 2" },
    { body: "Hello World 3" }
  ];
  // NOTE: For receiving events from Azure Stream Analytics, please send Events to an EventHub
  // where the body is a JSON object/array.
  // const datas = [
  //   { body: { "message": "Hello World 1" }, applicationProperties: { id: "Some id" }, partitionKey: "pk786" },
  //   { body: { "message": "Hello World 2" } },
  //   { body: { "message": "Hello World 3" } }
  // ];
  const delivery = await client.sendBatch(datas);
  console.log("message sent successfully.");
}

main().catch((err) => {
  console.log(err);
});
```

## Example 6 - Create an EventHubClient from an IotHub connection string.

Create EventHub Client from an IotHub Connection string. This is useful for receiving telemetry data
of IotHub from the linked EventHub. Most likely the associated connection string will not have send
claims. Hence getting HubRuntimeInfo or PartitionRuntimeInfo and receiving messages would be the
possible operations.

- Please notice that we are awaiting on the `createFromIotHubConnectionString()` method to get an
instance of the `EventHubClient`. This is different from other static methods on the client. The method
talks to the IotHub endpoint to get a redirect error which contains the EventHub endpoint to talk to.
It then constructs the right EventHub connection string based on the information in the redirect error
and returns an instance of the EventHubClient that you can play with.
```js
const { EventHubClient } = require('azure-event-hubs');

async function main() {
  const client = await EventHubClient.createFromIotHubConnectionString(process.env["IOTHUB_CONNECTION_STRING"]);
  const hubInfo = await client.getHubRuntimeInformation();
  console.log(hubInfo);
  await client.close();
}

main().catch((err) => {
  console.log(err);
});
```

## AMQP Dependencies ##
It depends on [rhea](https://github.com/amqp/rhea) library for managing connections, sending and receiving events over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.
