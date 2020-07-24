# Azure Service Bus client library for Javascript (Preview)

[Azure Service Bus](https://azure.microsoft.com/en-us/services/service-bus/) is a highly-reliable cloud messaging service from Microsoft.

Use the client library `@azure/service-bus` in your application to

- Send messages to an Azure Service Bus Queue or Topic
- Receive messages from an Azure Service Bus Queue or Subscription

Resources for the v7.0.0-preview.4 of `@azure/service-bus`:

[Source code](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus) |
[Package (npm)](https://www.npmjs.com/package/@azure/service-bus) |
[API Reference Documentation][apiref] |
[Product documentation](https://azure.microsoft.com/en-us/services/service-bus/) |
[Samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples)

> **NOTE**: This document has instructions, links and code snippets for the **preview** of the next version of the `@azure/service-bus` package
> which has different APIs than the stable version. To use the stable version of the library use the below resources.

[Source code or Readme for v1.1.5](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus) |
[Package for v1.1.5 (npm)](https://www.npmjs.com/package/@azure/service-bus/v/1.1.5) |
[API Reference Documentation for v1.1.5](https://docs.microsoft.com/en-us/javascript/api/%40azure/service-bus/?view=azure-node-latest) |
[Samples for v1.1.5](https://github.com/Azure/azure-sdk-for-js/tree/%40azure/service-bus_1.1.5/sdk/servicebus/service-bus/samples)

We also provide a migration guide for users familiar with the stable package that would like to try the preview: [migration guide to move from Service Bus V1 to Service Bus V7 Preview][migrationguide]

## Getting Started

### Install the package

Install the preview version for the Azure Service Bus client library using npm

`npm install @azure/service-bus@next`

### Prerequisites

You must have an [Azure subscription](https://azure.microsoft.com/free/) and a
[Service Bus Namespace](https://docs.microsoft.com/en-us/azure/service-bus-messaging/) to use this package.
If you are using this package in a Node.js application, then use Node.js 8.x or higher.

### Configure Typescript

TypeScript users need to have Node type definitions installed:

```bash
npm install @types/node
```

You also need to enable `compilerOptions.allowSyntheticDefaultImports` in your tsconfig.json. Note that if you have enabled `compilerOptions.esModuleInterop`, `allowSyntheticDefaultImports` is enabled by default. See [TypeScript's compiler options handbook](https://www.typescriptlang.org/docs/handbook/compiler-options.html) for more information.

### Authenticate the client

Interaction with Service Bus starts with an instance of the [ServiceBusClient][sbclient] class.

You can instantiate this class using its constructors:

- [Create using a connection string][sbclient_constructor]
  - This method takes the connection string to your Service Bus instance. You can get the connection string
    from the Azure portal.
- [Create using a TokenCredential][sbclient_constructor]
  - This method takes the host name of your Service Bus instance and a credentials object that you need
    to generate using the [@azure/identity](https://www.npmjs.com/package/@azure/identity)
    library. The host name is of the format `name-of-service-bus-instance.servicebus.windows.net`.
    If you're using an own implementation of the `TokenCredential` interface against AAD, then set the "scopes" for service-bus to be `["https://servicebus.azure.net//user_impersonation"]` to get the appropriate token.

### Key concepts

Once you've initialized a `ServiceBusClient`, you can interact with these resources within a
Service Bus Namespace:

- [Queues][queue_concept]: Allows for sending and receiving messages. Often used for point-to-point communication.
- [Topics][topic_concept]: As opposed to Queues, Topics are better suited to publish/subscribe scenarios. A topic can be sent to, but requires a subscription, of which there can be multiple in parallel, to consume from.
- [Subscriptions][subscription_concept]: The mechanism to consume from a Topic. Each subscription is independent, and receives a copy of each message sent to the topic. Rules and Filters can be used to tailor which messages are received by a specific subscription.

For more information about these resources, see [What is Azure Service Bus?][service_bus_overview].

To interact with these resources, one should be familiar with the following SDK concepts:

- Send messages, to a queue or topic, using a [`Sender`][sender] created using [`ServiceBusClient.createSender()`][sbclient_createsender].
- Receive messages, from either a queue or a subscription, using a [`Receiver`][receiver] created using [`ServiceBusClient.createReceiver()`][sbclient_createreceiver].
- Receive messages, from session enabled queues or subscriptions, using a [`SessionReceiver`][sessionreceiver] created using [`ServiceBusClient.createSessionReceiver()`][sbclient_createsessionreceiver].

Please note that the Queues, Topics and Subscriptions should be created prior to using this library.

### Examples

The following sections provide code snippets that cover some of the common tasks using Azure Service Bus

- [Send messages](#send-messages)
- [Receive messages](#receive-messages)
- [Settle a message](#settle-a-message)
- [Send messages using Sessions](#send-messages-using-sessions)
- [Receive messages from Sessions](#receive-messages-from-sessions)
- [Manage resources of a service bus namespace](#manage-resources-of-a-service-bus-namespace)
- [Additional samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples)

### Send messages

Once you have created an instance of a `ServiceBusClient` class, you can get a `Sender`
using the [createSender][sbclient_createsender] method.

This gives you a sender which you can use to [send][sender_send] messages.

```javascript
const sender = serviceBusClient.createSender("my-queue");

// sending a single message
await sender.sendMessages({
  body: "my-message-body"
});

// sending multiple messages
await sender.sendMessages([
  {
    body: "my-message-body"
  },
  {
    body: "another-message-body"
  }
]);
```

### Receive messages

Once you have created an instance of a `ServiceBusClient` class, you can get a `Receiver`
using the [createReceiver][sbclient_createreceiver] method.

```javascript
const receiver = serviceBusClient.createReceiver("my-queue", "peekLock");
```

You can use this receiver in one of 3 ways to receive messages:

#### Get an array of messages

Use the [receiveMessages][receiverreceivebatch] function which returns a promise that
resolves to an array of messages.

```javascript
const myMessages = await receiver.receiveMessages(10);
```

#### Subscribe using a message handler

Use the [subscribe][receiver_subscribe] method to set up message handlers and have
it running as long as you need.

When you are done, call `receiver.close()` to stop receiving any more messages.

```javascript
const myMessageHandler = async (message) => {
  // your code here
};
const myErrorHandler = async (error) => {
  console.log(error);
};
receiver.subscribe({
  processMessage: myMessageHandler,
  processError: myErrorHandler
});
```

#### Use async iterator

Use the [getMessageIterator][receiver_getmessageiterator] to get an async iterator over messages

```javascript
for await (let message of receiver.getMessageIterator()) {
  // your code here
}
```

### Settle a message

Once you receive a message you can call `complete()`, `abandon()`, `defer()` or `deadletter()` on it
based on how you want to settle the message.

To learn more, please read [Settling Received Messages](https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-transfers-locks-settlement#settling-receive-operations)

### Send messages using Sessions

> Using sessions requires you to create a session enabled Queue or Subscription. You can
> read more about how to configure this feature in the portal [here][docsms_messagesessions_fifo].

In order to send messages to a session, use the `ServiceBusClient` to create a sender using
[createSender][sbclient_createsender]. This gives you a sender which you can use to [send][sender_send] messages.

When sending the message, set the `sessionId` property in the message to ensure
your message lands in the right session.

```javascript
const sender = serviceBusClient.createSender("my-session-queue");
await sender.sendMessages({
  body: "my-message-body",
  sessionId: "my-session"
});
```

You can read more about how sessions work [here][docsms_messagesessions].

### Receive messages from Sessions

> Using sessions requires you to create a session enabled Queue or Subscription. You can
> read more about how to configure this feature in the portal [here][docsms_messagesessions_fifo].

Unlike non-session-enabled Queues or Subscriptions, only a single receiver
can read from a session at any time. This is enforced by _locking_ a session,
which is handled by Service Bus. Conceptually, this is similar to how message
locking works when using `peekLock` mode - when a message (or session) is
locked your receiver has exclusive access to it.

In order to open and lock a session, use an instance of `ServiceBusClient` to create a [SessionReceiver][sessionreceiver] using [createSessionReceiver][sbclient_createsessionreceiver].

There are two ways of choosing which session to open:

1. Specify a `sessionId`, which locks a named session.

   ```javascript
   const receiver = await serviceBusClient.createSessionReceiver("my-session-queue", "peekLock", {
     sessionId: "my-session"
   });
   ```

2. Do not specify a session id. In this case Service Bus will find the next available session
   that is not already locked.

   ```javascript
   const receiver = await serviceBusClient.createSessionReceiver("my-session-queue", "peekLock");
   ```

   You can find the name of the session via the `sessionId` property on the `SessionReceiver`.

Once the receiver is created you can use choose between 3 ways to receive messages:

- [Get an array of messages](#get-an-array-of-messages)
- [Subscribe using a message handler](#subscribe-using-a-message-handler)
- [Use async iterator](#use-async-iterator)

You can read more about how sessions work [here][docsms_messagesessions].

### Manage resources of a service bus namespace

`ServiceBusManagementClient` lets you manage a namespace with CRUD operations on the entities(queues, topics, and subscriptions) and on the rules of a subscription.

- Supports authentication with a service bus connection string as well as with the AAD credentials from `@azure/identity` similar to the `ServiceBusClient`.

```js
// Get the connection string from the portal
// OR
// use the token credential overload, provide the host name of your Service Bus instance and the AAD credentials from the @azure/identity library
const serviceBusManagementClient = new ServiceBusManagementClient("<connectionString>");

// Similarly, you can create topics and subscriptions as well.
const createQueueResponse = await serviceBusManagementClient.createQueue(queueName);
console.log("Created queue with name - ", createQueueResponse.name);

const queueRuntimeProperties = await serviceBusManagementClient.getQueueRuntimeProperties(queueName);
console.log("Number of messages in the queue = ", queueRuntimeProperties.totalMessageCount);

await serviceBusManagementClient.deleteQueue(queueName);
```

- Sample for reference - [managementClient.ts](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/managementClient.ts)

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

1. Set the `DEBUG` environment variable as shown above
2. Run your test script as follows:

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

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](../../../CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2FREADME.png)

[apiref]: https://aka.ms/azsdk/js/service-bus/docs
[sbclient]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/classes/servicebusclient.html
[sbclient_constructor]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/classes/servicebusclient.html#constructor
[sbclient_createsender]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/classes/servicebusclient.html#createsender
[sbclient_createreceiver]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/classes/servicebusclient.html#createreceiver
[sbclient_createsessionreceiver]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/classes/servicebusclient.html#createsessionreceiver
[sender]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/interfaces/sender.html
[sender_send]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/interfaces/sender.html#sendmessages
[receiver]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/interfaces/receiver.html
[receiverreceivebatch]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/interfaces/receiver.html#receivemessages
[receiver_subscribe]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/interfaces/receiver.html#subscribe
[receiver_getmessageiterator]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/interfaces/receiver.html#getmessageiterator
[sessionreceiver]: https://azuresdkdocs.blob.core.windows.net/$web/javascript/azure-service-bus/7.0.0-preview.4/interfaces/sessionreceiver.html
[migrationguide]: https://github.com/Azure/azure-sdk-for-js/blob/%40azure/service-bus_7.0.0-preview.4/sdk/servicebus/service-bus/migrationguide.md
[docsms_messagesessions]: https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions
[docsms_messagesessions_fifo]: https://docs.microsoft.com/en-us/azure/service-bus-messaging/message-sessions#first-in-first-out-fifo-pattern
[queue_concept]: https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview#queues
[topic_concept]: https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview#topics
[subscription_concept]: https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-queues-topics-subscriptions#topics-and-subscriptions
[service_bus_overview]: https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview
