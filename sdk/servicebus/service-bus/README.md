# Azure Service Bus client library for Javascript

Azure Service Bus is a highly-reliable cloud messaging service from Microsoft

Use the client library for Azure Service Bus in your Node.js application to
- Send messages to a Queue or Topic
- Receive messages from a Queue or Subscription

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus) | [Package (npm)](https://www.npmjs.com/package/@azure/service-bus) | [Product documentation](https://azure.microsoft.com/en-us/services/service-bus/)

## Status

This library is currently in preview and the APIs may change prior to release.

## Getting Started

### Install the package

Install the Azure Service Bus client library using npm

`npm install @azure/service-bus`

**Prerequisites**: You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Service Bus Namespace](https://docs.microsoft.com/en-us/azure/service-bus-messaging/) to use this package.
If you are using this package in a Node.js application, then use Node.js 6.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.


### Authenticate the client

Interaction with Service Bus starts with an instance of the `ServiceBusClient` class. You can instantiate
this class using one of the 3 static methods on it
- `createFromConnectionString`
  - This method takes the connection string to your Service Bus instance. You can get the connection string
  from the Azure portal
- `createFromTokenProvider`
  - This method takes the host name of your Service Bus instance and your custom Token Provider. The
  host name is of the format `name-of-service-bus-instance.servicebus.windows.net`.
- `createFromAADTokenCredentials`
  - This method takes the host name of your Service Bus instance and a credentials object that you need
  to generate using the [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth)
  library. The host name is of the format `name-of-service-bus-instance.servicebus.windows.net`.

### Key concepts

Once you have initialized the `ServiceBusClient` class, use the below methods to create client
objects for Queues, Topics and Subscriptions to interact with existing Service Bus entities. Please
note that the Queues, Topics and Subscriptions should already have been created prior to using this
library.
- `createQueueClient`
  - Takes the name of an existing Service Bus Queue instance, returns a QueueClient that you can use
   to send to and receive messages from the queue.
- `createTopicClient`
  - Takes the name of an existing Service Bus Topic instance, returns a TopicClient that you can use
   to send messages to the topic
- `createSubscriptionClient`
  - Takes the name of existing Service Bus Topic and Subscription instances, returns a SubscriptionClient
  that you can use to receive messages from the subscription.

Next, using the client object created in the previous step, create a sender or a receiver based on
whether you want to send or receive messages

### Examples

The following sections provide code snippets that cover some of the common tasks using Azure Service Bus

- [Send messages](#send-messages)
- [Receive messages](#receive-messages)
- [Send messages using Sessions](#send-messages-using-sessions)
- [Receive messages using Sessions](#receive-messages-using-sessions)

### Send messages

Once you have created an instance of a `QueueClient` class, create a sender and use the `send`
function to send messages.

```javascript
const queueClient = serviceBusClient.createQueueClient("my-queue");
const sender = queueClient.createSender();
await sender.send({
  body: "my-message-body"
});
```

### Receive messages

Once you have created an instance of a `QueueClient` class, create a receiver and use the `receiveBatch`
function to receive messages in a batch.

Once you receive a message you can call `complete()`, `abandon()`, `defer()` or `deadletter()` on it
based on how you want to settle the message. To learn more, please read [Settling Received Messages](https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#settling-receive-operations)

```javascript
const queueClient = serviceBusClient.createQueueClient("my-queue");
const receiver = queueClient.createReceiver(ReceiveMode.peekLock);
const myMessages = await receiver.receiveBatch(10);
for(let i = 0; i < myMessages.length; i++) {
  console.log(myMessages[i].body);
  await myMessages[i].complete();
}
```

Another way to receive messages is by setting up message handlers and have it running as long as you
need. When you are done, call `receiver.close()` to stop receiving any more messages.

```javascript
const myMessageHandler = async (message) => {
  myOtherCode(message);
}
const myErrorHandler = (error) => {
  console.log(error);
}
receiver.receive(myMessageHandler, myErrorHandler);
```

### Send messages using Sessions

To send messages using sessions, you first need to create a session enabled Queue. You can do this
in the Azure portal. Then, use an instance of `QueueClient` to create a sender. When sending the
message, set the `sessionId` property in the message body to ensure your message lands in the right session.

```javascript
const queueClient = serviceBusClient.createQueueClient("my-session-queue");
const sender = queueClient.createSender();
await sender.send({
  body: "my-message-body",
  sessionId: "my-session"
});
```

### Receive messages from Sessions

To receive messages from sessions, you first need to create a session enabled Queue and send messages
to it. Then, use an instance of `QueueClient` to create a receiver. Note that you will need to specify
the session from which you want to receive messages.

```javascript
const queueClient = serviceBusClient.createQueueClient("my-session-queue");
const receiver = queueClient.createReceiver(ReceiveMode.peekLock, { sessionId: "my-session"});
const myMessages = await receiver.receiveBatch(10);
for(let i = 0; i < myMessages.length; i++) {
  console.log(myMessages[i].body);
  await myMessages[i].complete();
}
```

## Troubleshooting

### Enable logs

You can set the following environment variable to get the debug logs when using this library.

- Getting debug logs from the Service Bus SDK

```bash
export DEBUG=azure*
```

- Getting debug logs from the Service Bus SDK and the protocol level library.

```bash
export DEBUG=azure*,rhea*
```

- If you are **not interested in viewing the message transformation** (which consumes lot of console/disk space) then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:amqp-common:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:service-bus:error,azure-amqp-common:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples)
directory for detailed examples on how to use this library to send and receive messages to/from
[Service Bus Queues, Topics and Subscriptions](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview).


![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js/sdk/servicebus/service-bus/README.png)

