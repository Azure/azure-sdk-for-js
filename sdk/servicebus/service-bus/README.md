# Azure Service Bus client library for Javascript

Azure Service Bus is a highly-reliable cloud messaging service from Microsoft

Use the client library for Azure Service Bus in your Node.js application to

- Send messages to a Queue or Topic
- Receive messages from a Queue or Subscription

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus) | [Package (npm)](https://www.npmjs.com/package/@azure/service-bus) | [API Reference Documentation](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/) | [Product documentation](https://azure.microsoft.com/en-us/services/service-bus/) | [Samples](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples)

**NOTE**: If you are using version 1.1.x or lower, then please use the below links instead

[Source code for v1.1.3](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.3/sdk/servicebus/service-bus) |
[Package for v1.1.3 (npm)](https://www.npmjs.com/package/@azure/service-bus/v/1.1.3) |
[Samples for v1.1.3](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.3/sdk/servicebus/service-bus/samples)

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

Interaction with Service Bus starts with an instance of the [ServiceBusClient](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/servicebusclient) class. You can instantiate
this class using one of the 3 static methods on it

- [createFromConnectionString](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/servicebusclient#createfromconnectionstring-string--servicebusclientoptions-)
  - This method takes the connection string to your Service Bus instance. You can get the connection string
    from the Azure portal.
- [createFromTokenProvider](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/servicebusclient#createfromtokenprovider-string--tokenprovider--servicebusclientoptions-)
  - This method takes the host name of your Service Bus instance and your custom implementation of the [TokenProvider](https://github.com/Azure/amqp-common-js/blob/master/lib/auth/token.ts) interface.The host name is of the format `name-of-service-bus-instance.servicebus.windows.net`.
- [createFromAADTokenCredentials](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/servicebusclient#createfromaadtokencredentials-string--applicationtokencredentials---usertokencredentials---devicetokencredentials---msitokencredentials--servicebusclientoptions-)
  - This method takes the host name of your Service Bus instance and a credentials object that you need
    to generate using the [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth)
    library. The host name is of the format `name-of-service-bus-instance.servicebus.windows.net`.
  - Refer to the samples that use an [Azure account](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/service-bus_1.0.0/sdk/servicebus/service-bus/samples/javascript/gettingStarted/loginWithAzureAccount.js), [interactive login](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples/javascript/interactiveLogin.js) or [service principal](https://github.com/Azure/azure-sdk-for-js/blob/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples/javascript/servicePrincipalLogin.js)

### Key concepts

Once you have initialized the [ServiceBusClient](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/servicebusclient) class, use the below methods to create client
objects for Queues, Topics and Subscriptions to interact with existing Service Bus entities. Please
note that the Queues, Topics and Subscriptions should already have been created prior to using this
library.

- [createQueueClient](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/servicebusclient#createqueueclient-string-)
  - Takes the name of an existing Service Bus Queue instance, returns a QueueClient that you can use
    to send to and receive messages from the queue.
- [createTopicClient](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/servicebusclient#createtopicclient-string-)
  - Takes the name of an existing Service Bus Topic instance, returns a TopicClient that you can use
    to send messages to the topic
- [createSubscriptionClient](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/servicebusclient#createsubscriptionclient-string--string-)
  - Takes the name of existing Service Bus Topic and Subscription instances, returns a SubscriptionClient
    that you can use to receive messages from the subscription.

Next, using the client object created in the previous step, create a sender or a receiver based on
whether you want to send or receive messages

### Examples

The following sections provide code snippets that cover some of the common tasks using Azure Service Bus

- [Send messages](#send-messages)
- [Receive messages](#receive-messages)
- [Settle a message](#settle-a-message)
- [Send messages using Sessions](#send-messages-using-sessions)
- [Receive messages using Sessions](#receive-messages-using-sessions)

### Send messages

Once you have created an instance of a `QueueClient` or `SubscriptionClient` class, create a sender
using the [createSender](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/queueclient#createsender--)
function. This gives you a sender which you can use to [send](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/sender#send-sendablemessageinfo-) messages.

You can also use the [sendBatch](https://docs.microsoft.com/en-us/javascript/api/@azure/service-bus/sender#sendbatch-sendablemessageinfo---) method to send multiple messages using a single call.

```javascript
const queueClient = serviceBusClient.createQueueClient("my-queue");
const sender = queueClient.createSender();
await sender.send({
  body: "my-message-body"
});
await sender.sendBatch([
  { body: "my-message-body-1" },
  { body: "my-message-body-2" },
  { body: "my-message-body-3" }
]);
```

### Receive messages

Once you have created an instance of a `QueueClient` or `SubscriptionClient` class, create a receiver
using the [createReceiver](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/queueclient#createreceiver-receivemode-) function.

```javascript
const queueClient = serviceBusClient.createQueueClient("my-queue");
const receiver = queueClient.createReceiver(ReceiveMode.peekLock);
```

You can use this receiver in one of 3 ways to receive messages:

#### Get an array of messages

Use the [receiveMessages](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/receiver#receivemessages-number--number-) function which returns a promise that
resolves to an array of messages.

```javascript
const myMessages = await receiver.receiveMessages(10);
```

#### Register message handler

Use the [registerMessageHandler](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/receiver#registermessagehandler-onmessage--onerror--messagehandleroptions-) to set up
message handlers and have it running as long as you
need. When you are done, call `receiver.close()` to stop receiving any more messages.

```javascript
const myMessageHandler = async (message) => {
  // your code here
};
const myErrorHandler = (error) => {
  console.log(error);
};
receiver.registerMessageHandler(myMessageHandler, myErrorHandler);
```

#### Use async iterator

Use the [getMessageIterator](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/receiver#getmessageiterator--) to get an async iterator over messages

```javascript
for await (let message of receiver.getMessageIterator()) {
  // your code here
}
```

### Settle a message

Once you receive a message you can call `complete()`, `abandon()`, `defer()` or `deadletter()` on it
based on how you want to settle the message. To learn more, please read [Settling Received Messages](https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#settling-receive-operations)

### Send messages using Sessions

To send messages using sessions, you first need to create a session enabled Queue. You can do this
in the Azure portal. Then, use an instance of `QueueClient` to create a sender
using the [createSender](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/queueclient#createsender--)
function. This gives you a sender which you can use to [send](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/sender#send-sendablemessageinfo-) messages.

When sending the message, set the `sessionId` property in the message body to ensure your message
lands in the right session.

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
to it. Then, use an instance of `QueueClient` or `SubscriptionClient` to create a receiver
using the [createReceiver](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/queueclient#createreceiver-receivemode--sessionreceiveroptions-) function. Note
that you will need to specify the session from which you want to receive messages.

```javascript
const queueClient = serviceBusClient.createQueueClient("my-session-queue");
const receiver = queueClient.createReceiver(ReceiveMode.peekLock, { sessionId: "my-session" });
```

You can use this receiver in one of 3 ways to receive messages

- [Get an array of messages](#get-an-array-of-messages)
- [Register message handler](#register-message-handler)
- [Use async iterator](#use-async-iterator)

## Troubleshooting

## AMQP Dependencies

The Service Bus library depends on the [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving messages over the [AMQP](http://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.

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
export DEBUG=azure*,rhea*,-rhea:raw,-rhea:message,-azure:core-amqp:datatransformer
```

- If you are interested only in **errors**, then you can set the `DEBUG` environment variable as follows:

```bash
export DEBUG=azure:service-bus:error,azure-core-amqp:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples)
directory for detailed examples on how to use this library to send and receive messages to/from
[Service Bus Queues, Topics and Subscriptions](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2FREADME.png)
