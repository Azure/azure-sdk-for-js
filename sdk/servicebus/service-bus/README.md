# Azure Service Bus client library for JavaScript

[Azure Service Bus](https://azure.microsoft.com/services/service-bus/) is a highly-reliable cloud messaging service from Microsoft.

Use the client library `@azure/service-bus` in your application to

- Send messages to an Azure Service Bus Queue or Topic
- Receive messages from an Azure Service Bus Queue or Subscription
- Create/Get/Delete/Update/List Queues/Topics/Subscriptions/Rules in an Azure Service Bus namespace.

Resources for `@azure/service-bus` version 7:

Key links:
- [Source code](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicebus/service-bus)
- [Package (npm)](https://www.npmjs.com/package/@azure/service-bus)
- [API Reference Documentation][apiref]
- [Product documentation](https://azure.microsoft.com/services/service-bus/)
- [Samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicebus/service-bus/samples)
- [Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/TROUBLESHOOTING.md)

**NOTE**: If you are using version 1.1.10 or lower and want to migrate to the latest version
of this package please look at our [migration guide to move from Service Bus V1 to Service Bus V7][migrationguide]

## Getting started

### Install the package

Install the latest version for the Azure Service Bus client library using npm.

`npm install @azure/service-bus`

### Currently supported environments

- [LTS versions of Node.js](https://github.com/nodejs/release#release-schedule)

### Prerequisites

- An [Azure subscription](https://azure.microsoft.com/free/)
- A [Service Bus Namespace](https://docs.microsoft.com/azure/service-bus-messaging/) 

### Configure TypeScript

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

#### Bundling with Webpack

If you are using Webpack v5, you can install the following dev dependencies

- `npm install --save-dev os-browserify path-browserify`

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

#### Bundling with Rollup

If you are using Rollup bundler, install the following dev dependencies

- `npm install --save-dev @rollup/plugin-commonjs @rollup/plugin-inject @rollup/plugin-node-resolve`

Then include the following in your rollup.config.js

```diff
+import nodeResolve from "@rollup/plugin-node-resolve";
+import cjs from "@rollup/plugin-commonjs";
+import shim from "rollup-plugin-shim";
+import inject from "@rollup/plugin-inject";

export default {
  // other configs
  plugins: [
+    shim({
+      fs: `export default {}`,
+      net: `export default {}`,
+      tls: `export default {}`,
+      path: `export default {}`,
+      dns: `export function resolve() { }`,
+    }),
+    nodeResolve({
+      mainFields: ["module", "browser"],
+      preferBuiltins: false,
+    }),
+    cjs(),
+    inject({
+      modules: {
+        Buffer: ["buffer", "Buffer"],
+        process: "process",
+      },
+      exclude: ["./**/package.json"],
+    }),
  ]
};
```

Please consult the documentation of your favorite bundler for more information on using polyfills.

### React Native Support

Similar to browsers, React Native does not support some JavaScript api used by this SDK library so you need to provide polyfills for them.  Please see the [Messaging React Native sample with Expo](https://github.com/Azure/azure-sdk-for-js/blob/main/samples/frameworks/react-native-expo/ts/messaging/README.md) for more details.

### Authenticate the client

Interaction with Service Bus starts with an instance of the [ServiceBusClient][sbclient] class. You can
authenticate to Service Bus using a connection string or using an Azure Active Directory credential.

#### Using a connection string

This method takes the connection string to your Service Bus instance. You can get
the connection string from the Azure portal.

```javascript
const { ServiceBusClient } = require("@azure/service-bus");

const serviceBusClient = new ServiceBusClient("<connectionString>");
```

More information about this constructor is available in the [API documentation][sbclient_constructor].

#### Using an Azure Active Directory Credential

Authentication with Azure Active Directory uses the [Azure Identity library][azure_identity].

The example below uses the [DefaultAzureCredential][defaultazurecredential], one of many
available credential providers from the `@azure/identity` library.

```javascript
const { ServiceBusClient } = require("@azure/service-bus");
const { DefaultAzureCredential } = require("@azure/identity");

const fullyQualifiedNamespace = "<name-of-service-bus-namespace>.servicebus.windows.net";
const credential = new DefaultAzureCredential();
const serviceBusClient = new ServiceBusClient(fullyQualifiedNamespace, credential);
```

> NOTE: If you're using your own implementation of the `TokenCredential` interface
> against AAD, then set the "scopes" for service-bus to the following to get
> the appropriate token:

> ```typescript
> ["https://servicebus.azure.net//user_impersonation"];
> ```

More information about this constructor is available in the [API documentation][sbclient_tokencred_overload]

## Key concepts

Once you've initialized a `ServiceBusClient`, you can interact with these resources within a
Service Bus Namespace:

- [Queues][queue_concept]: Allows for sending and receiving messages. Often used for point-to-point communication.
- [Topics][topic_concept]: As opposed to Queues, Topics are better suited to publish/subscribe scenarios. A topic can be sent to, but requires a subscription, of which there can be multiple in parallel, to consume from.
- [Subscriptions][subscription_concept]: The mechanism to consume from a Topic. Each subscription is independent, and receives a copy of each message sent to the topic. Rules and Filters can be used to tailor which messages are received by a specific subscription.

For more information about these resources, see [What is Azure Service Bus?][service_bus_overview].

To interact with these resources, one should be familiar with the following SDK concepts:

- Send messages, to a queue or topic, using a [`ServiceBusSender`][sender] created using [`ServiceBusClient.createSender()`][sbclient_createsender].
- Receive messages, from either a queue or a subscription, using a [`ServiceBusReceiver`][receiver] created using [`ServiceBusClient.createReceiver()`][sbclient_createreceiver].
- Receive messages, from session enabled queues or subscriptions, using a [`ServiceBusSessionReceiver`][sessionreceiver] created using [`ServiceBusClient.acceptSession()`][sbclient_acceptsession] or `ServiceBusClient.acceptNextSession()`.

Please note that the Queues, Topics and Subscriptions should be created prior to using this library.

## Examples

The following sections provide code snippets that cover some of the common tasks using Azure Service Bus

- [Send messages](#send-messages)
- [Receive messages](#receive-messages)
- [Settle a message](#settle-a-message)
- [Dead letter queues](#dead-letter-queues)
- [Send messages using Sessions](#send-messages-using-sessions)
- [Receive messages from Sessions](#receive-messages-from-sessions)
- [Manage resources of a service bus namespace](#manage-resources-of-a-service-bus-namespace)
- [Additional samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicebus/service-bus/samples)

### Send messages

Once you have created an instance of a `ServiceBusClient` class, you can get a `ServiceBusSender`
using the [createSender][sbclient_createsender] method which you can use to [send][sender_sendmessages] messages.

```javascript
const sender = serviceBusClient.createSender("my-queue");

const messages = [
  { body: "Albert Einstein" },
  { body: "Werner Heisenberg" },
  { body: "Marie Curie" },
  { body: "Steven Hawking" },
  { body: "Isaac Newton" },
  { body: "Niels Bohr" },
  { body: "Michael Faraday" },
  { body: "Galileo Galilei" },
  { body: "Johannes Kepler" },
  { body: "Nikolaus Kopernikus" }
];

// sending a single message
await sender.sendMessages(messages[0]);

// sending multiple messages in a single call
// this will fail if the messages cannot fit in a batch
await sender.sendMessages(messages);

// Sends multiple messages using one or more ServiceBusMessageBatch objects as required
let batch = await sender.createMessageBatch();

for (let i = 0; i < messages.length; i++) {
  const message = messages[i];
  if (!batch.tryAddMessage(message)) {
    // Send the current batch as it is full and create a new one
    await sender.sendMessages(batch);
    batch = await sender.createMessageBatch();

    if (!batch.tryAddMessage(messages[i])) {
      throw new Error("Message too big to fit in a batch");
    }
  }
}
// Send the batch
await sender.sendMessages(batch);
```

### Receive messages

Once you have created an instance of a `ServiceBusClient` class, you can get a `ServiceBusReceiver`
using the [createReceiver][sbclient_createreceiver] method.

```javascript
const receiver = serviceBusClient.createReceiver("my-queue");
```

There are two `receiveMode`s available.

- "peekLock" - In peekLock mode, the receiver has a lock on the message for the duration specified on the queue.
- "receiveAndDelete" - In receiveAndDelete mode, messages are deleted from Service Bus as they are received.

If the receiveMode is not provided in the options, it defaults to the "peekLock" mode.
You can also [settle the messages](#settle-a-message) received in "peekLock" mode.

You can use this receiver in one of 3 ways to receive messages:

#### Get an array of messages

Use the [receiveMessages][receiver_receivemessages] function which returns a promise that
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
  console.log(`message.body: ${message.body}`);
};
const myErrorHandler = async (args) => {
  console.log(
    `Error occurred with ${args.entityPath} within ${args.fullyQualifiedNamespace}: `,
    args.error
  );
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

Once you receive a message you can call [`completeMessage()`][receiver_complete], [`abandonMessage()`][receiver_abandon], [`deferMessage()`][receiver_defer] or [`deadLetterMessage()`][receiver_deadletter] on the receiver based on how you want to settle the message.

To learn more, please read [Settling Received Messages](https://docs.microsoft.com/azure/service-bus-messaging/message-transfers-locks-settlement#settling-receive-operations)

## Dead letter queues

The dead letter queue is a **sub-queue**. Each queue or subscription has its own dead letter queue. Dead letter queues store
messages that have been explicitly dead lettered (via [`receiver.deadLetterMessage()`][receiver_deadletter]), or messages that have exceeded
their maximum delivery count.

Creating a receiver for a dead letter sub-queue is similar to creating a receiver for a subscription or queue:

```javascript
// To receive from a queue's dead letter sub-queue
const deadLetterReceiverForQueue = serviceBusClient.createReceiver("queue", {
  subQueueType: "deadLetter"
});

// To receive from a subscription's dead letter sub-queue
const deadLetterReceiverForSubscription = serviceBusClient.createReceiver("topic", "subscription", {
  subQueueType: "deadLetter"
});

// Dead letter receivers work like any other receiver connected to a queue
// ex:
const messages = await deadLetterReceiverForQueue.receiveMessages(5);

for (const message of messages) {
  console.log(`Dead lettered message: ${message.body}`);
}
```

Full samples demonstrating dead letter queues more thoroughly:

- [Using receiver.deadLetterMessage() to explicitly send messages to the dead letter sub-queue](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7/typescript/src/advanced/movingMessagesToDLQ.ts)
- [Receiving messages from the dead letter sub-queue](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7/typescript/src/advanced/processMessageFromDLQ.ts)

### Send messages using Sessions

> Using sessions requires you to create a session enabled Queue or Subscription. You can
> read more about how to configure this feature in the portal [here][docsms_messagesessions_fifo].

In order to send messages to a session, use the `ServiceBusClient` to create a sender using
[createSender][sbclient_createsender].

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

In order to open and lock a session, use an instance of `ServiceBusClient` to create a [SessionReceiver][sessionreceiver].

There are two ways of choosing which session to open:

1. Specify a `sessionId`, which locks a named session.

   ```javascript
   const receiver = await serviceBusClient.acceptSession("my-session-queue", "my-session");
   ```

2. Do not specify a session id. In this case Service Bus will find the next available session
   that is not already locked.

   ```javascript
   const receiver = await serviceBusClient.acceptNextSession("my-session-queue");
   ```

   You can find the name of the session via the `sessionId` property on the `SessionReceiver`.
   If the receiveMode is not provided in the options, it defaults to the "peekLock" mode.
   You can also [settle the messages](#settle-a-message) received in "peekLock" mode.

Once the receiver is created you can use choose between 3 ways to receive messages:

- [Get an array of messages](#get-an-array-of-messages)
- [Subscribe using a message handler](#subscribe-using-a-message-handler)
- [Use async iterator](#use-async-iterator)

You can read more about how sessions work [here][docsms_messagesessions].

### Manage resources of a service bus namespace

`ServiceBusAdministrationClient` lets you manage a namespace with CRUD operations on the entities(queues, topics, and subscriptions) and on the rules of a subscription.

- Supports authentication with a service bus connection string as well as with the AAD credentials from `@azure/identity` similar to the `ServiceBusClient`.

Note: Service Bus doesn't support setting CORS rules for namespaces yet, hence `ServiceBusAdministrationClient` won't work in the browser without disabling web-security. For more info, refer [here](https://github.com/Azure/azure-sdk-for-js/issues/4983).

```js
// Get the connection string from the portal
// OR
// use the token credential overload, provide the host name of your Service Bus instance and the AAD credentials from the @azure/identity library
const serviceBusAdministrationClient = new ServiceBusAdministrationClient("<connectionString>");

// Similarly, you can create topics and subscriptions as well.
const createQueueResponse = await serviceBusAdministrationClient.createQueue(queueName);
console.log("Created queue with name - ", createQueueResponse.name);

const queueRuntimeProperties = await serviceBusAdministrationClient.getQueueRuntimeProperties(
  queueName
);
console.log("Number of messages in the queue = ", queueRuntimeProperties.totalMessageCount);

await serviceBusAdministrationClient.deleteQueue(queueName);
```

- Sample for reference - [administrationClient.ts](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicebus/service-bus/samples/v7/typescript/src/advanced/administrationClient.ts)

## Troubleshooting

Here's some initial steps to start diagnosing issues. For more information please refer to the [Service Bus Troubleshooting Guide](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/TROUBLESHOOTING.md).

### AMQP Dependencies

The Service Bus library depends on the [rhea-promise](https://github.com/amqp/rhea-promise) library for managing connections, sending and receiving messages over the [AMQP](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-complete-v1.0-os.pdf) protocol.

### Logging

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
export DEBUG=azure:service-bus:error,azure:core-amqp:error,rhea-promise:error,rhea:events,rhea:frames,rhea:io,rhea:flow
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

## Next steps

Please take a look at the [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicebus/service-bus/samples)
directory for detailed examples on how to use this library to send and receive messages to/from
[Service Bus Queues, Topics and Subscriptions](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messaging-overview).

## Contributing

If you'd like to contribute to this library, please read the [contributing guide](https://github.com/Azure/azure-sdk-for-js/blob/main/CONTRIBUTING.md) to learn more about how to build and test the code.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2FREADME.png)

[apiref]: https://docs.microsoft.com/javascript/api/@azure/service-bus/
[azure_identity]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/identity/identity/README.md
[defaultazurecredential]: https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/identity/identity#defaultazurecredential
[sbclient]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusclient
[sbclient_constructor]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusclient#ServiceBusClient_string__ServiceBusClientOptions_
[sbclient_tokencred_overload]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusclient#ServiceBusClient_string__TokenCredential__ServiceBusClientOptions_
[sbclient_createsender]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusclient#createSender_string_
[sbclient_createreceiver]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusclient#createReceiver_string__CreateReceiverOptions__peekLock___
[sbclient_acceptsession]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusclient#acceptSession_string__string__AcceptSessionOptions__peekLock___
[sender]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebussender
[sender_sendmessages]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebussender#sendMessages_ServiceBusMessage___ServiceBusMessage_____ServiceBusMessageBatch__OperationOptionsBase_
[receiver]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver
[receiver_receivemessages]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#receiveMessages_number__ReceiveMessagesOptions_
[receiver_subscribe]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#subscribe_MessageHandlers_ReceivedMessageT___SubscribeOptions_
[receiver_getmessageiterator]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#getMessageIterator_GetMessageIteratorOptions_
[receiver_abandon]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#abandonMessage_ServiceBusReceivedMessage___key__string___any_
[receiver_complete]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#completeMessage_ServiceBusReceivedMessage_
[receiver_deadletter]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#deadLetterMessage_ServiceBusReceivedMessage__DeadLetterOptions____key__string___any_
[receiver_defer]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebusreceiver#deferMessage_ServiceBusReceivedMessage___key__string___any_
[sessionreceiver]: https://docs.microsoft.com/javascript/api/@azure/service-bus/servicebussessionreceiver
[migrationguide]: https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/migrationguide.md
[docsms_messagesessions]: https://docs.microsoft.com/azure/service-bus-messaging/message-sessions
[docsms_messagesessions_fifo]: https://docs.microsoft.com/azure/service-bus-messaging/message-sessions#first-in-first-out-fifo-pattern
[queue_concept]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messaging-overview#queues
[topic_concept]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messaging-overview#topics
[subscription_concept]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-queues-topics-subscriptions#topics-and-subscriptions
[service_bus_overview]: https://docs.microsoft.com/azure/service-bus-messaging/service-bus-messaging-overview
