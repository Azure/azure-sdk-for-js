azure-event-hubs
================

_This SDK is currently in preview._

- **Node.js version: 6.x or higher.** We would encourage you to install the latest available LTS version from https://nodejs.org.

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
- You can use `await client.receiveBatch(...)` to receive desired number of events for specified amount of time. **Note this is a blocking call**. 
That is it will return an array of EventData objects once it receives the desired number of events or the max wait time occurs (which ever happens first). 
This is very useful when you want to know how the received events look like or for testing/debugging purposes.
- For production we would expect customers would simply want to receive events and process them. Hence we have a `client.receive(. . .)` method on the receiver.
This message takes the `messageHandler()` and the `errorHandler()` amongst other parameters and registers them to the receiver. 
This method returns a `ReceiverHandler` that can be used to stop receiving further events `await receiverHandler.stop()`

## IDE ##
This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com) or any other IDE that provides better intellisense and exposes the full power of source code documentation.

## Debug logs ##

You can set the following environment variable to get the debug logs.
- Getting the debug logs from the Event Hub SDK
```
export DEBUG=azure*
```
- Getting the debug logs from the Event Hub SDK and the protocol level library.
```
export DEBUG=azure*,rhea*
```

## Examples ##

Please take a look at the [examples](https://github.com/Azure/azure-event-hubs-node/tree/master/examples) directory for detailed examples.

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
  const eventData: EventData = { body: "Hello World", partitionKey: "pk12345"};
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
  const data: EventData = { body: "Hello World 1", message_id: "343-0909-5454-23423-54543" };
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
