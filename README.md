azure-event-hubs
================

_This SDK is currently in preview._

## Usage ##

See [examples](./examples) directory for some examples.
It depends on [rhea](https://github.com/amqp/rhea) library for managing connections, sending and receiving messages over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.

### Client creation
The simplest usage is to use the static factory method `EventHubClient.createFromConnectionString(_connection-string_, _event-hub-path_)`. Once you have a client, you can use it for:

### Sender creation
- Create an EventHubSender using the `client.createSender()` method.
- Sender object has methods to `send()` a single message that allows you to easily send messages (with an optional partition key).
- You can even batch multiple messages together using `sendBatch()` method.

### Receiver creation
- Create an EventHubReceiver using `client.createReceiver()` method.
- You can use the convenience method `client.receive(...)` to receive a desired number of messages for a specified amount of time. Note this is a blocking call. That is it will return an array of EventData objects
once it receives the desired number of messages or the max wait time occurs (which ever happens first). This is a useful method for testing/debugging purposes.
- For production we would expect the customers would simply want to receive messages and process them. Hence we have a `start(onMessage, onError)` method on the receiver.
This message takes the `messageHandler()` and the `errorHandler()` as parameters and registers them to the receiver.

**NOTE:** The `receive()` and `start()` methods are mutually exclusive. Both of them cannot be run at the same time. Moreover, once the `receiver.start()` method is called you can only call
the `receiver.receive()` method **after** closing the receiver `receiver.close()`.

## IDE ##
This sdk has been developed in [TypeScript](https://typescriptlang.org) and has good source code documentation. It is highly recommended to use [vscode](https://code.visualstudio.com) or any other IDE 
that provides better intellisense and exposes the full power of source code documentation.

## Example 1 - Get the partition IDs.

```js
const { EventHubClient } = require('azure-event-hubs');

const client = EventHubClient.createFromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub');

function async main() {
  const partitionIds = await client.getPartitionIds();
}

main().catch((err) => {
  console.log(err);
});
```

## Example 2 - Create a receiver

Creates a receiver on partition ID 1, for messages that come in after "now".

```js
const { EventHubClient, EventHubReceiver, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.fromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub');

function async main() {
  const receiver = client.createReceiver("1", { eventPosition: EventPosition.fromEnqueuedTime(Date.now()) });
  // For receiving messages:

  // Option 1: Add handlers for message and error and provide them to the start(). <<<<<<<<<<<<<<<
  const onError = (err) => {
    console.log("An error occurred on the receiver ", err);
  });
  
  const onMessage = (eventData) => {
    console.log(eventData.body);
    const enqueuedTime = eventData.annotations["x-opt-enqueued-time"];
    console.log("Enqueued Time: ", enqueuedTime);
  });

  receiver.start(onMessage, onError);

  // Option 2: Use a convenience method.
  const datas = await receiver.receive(100 /*number of messages*/, 20 /*amount of time in seconds the receiver should run. Default 60 seconds.*/);
  console.log("Array of EventData objects", datas);
}

main().catch((err) => {
  console.log(err);
});
```

## Example 3 - Create a sender

Creates a sender, sends message with a given partition "key" which is then hashed to a partition ID (so all messages with the same key will go to the same ID, but load is balanced between partitions). 

```js
const { EventHubClient, EventHubReceiver, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.fromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub');

function async main() {
  const sender = client.createSender();
  const delivery = await sender.send({ body: "Hello World" }, "pk12345");
  console.log("message sent successfully.");
}

main().catch((err) => {
  console.log(err);
});
```

## Example 4 - Create a sender to a specific partition id.

Creates a sender against a given partition ID. You _should_ use send to a given partition _key_, but if you _need_ to send to a given partition ID we'll let you do it. 

```js
const { EventHubClient, EventHubReceiver, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.fromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub');

function async main() {
  const sender = client.createSender("1");
  const delivery = await sender.send({ body: "Hello World 1" });
  console.log("message sent successfully.");
}

main().catch((err) => {
  console.log(err);
});
```

## Example 5 - Send multiple messages as a batch. 

Creates a sender, sends a batch message. 

```js
const { EventHubClient, EventHubReceiver, EventPosition } = require('azure-event-hubs');

const client = EventHubClient.fromConnectionString('Endpoint=sb://my-servicebus-namespace.servicebus.windows.net/;SharedAccessKeyName=my-SA-name;SharedAccessKey=my-SA-key', 'myeventhub');

function async main() {
  const sender = client.createSender();
  const datas = [
    { body: "Hello World 1", applicationProperties: { id: "Some id" }},
    { body: "Hello World 2" },
    { body: "Hello World 3" }
  ];
  const delivery = await sender.sendBatch(datas, "pk989898");
  console.log("message sent successfully.");
}

main().catch((err) => {
  console.log(err);
});
```
