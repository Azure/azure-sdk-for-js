# Guide to migrate from @azure/service-bus v1 to v7

This guide is intended to assist in the migration from version 1 of the Service Bus client library `@azure/service-bus` to version 7 of the same library. It will focus on side-by-side comparisons for similar operations between the two packages.

Familiarity with the version 1 of the `@azure/service-bus` library is assumed. For those new to the Service Bus client library for JavaScript, please refer to the [README](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/README.md) and [Service Bus samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples) for the `@azure/service-bus` library rather than this guide.

## Table of contents

- [Migration benefits](#migration-benefits)
  - [Cross Service SDK improvements](#cross-service-sdk-improvements)
  - [New features](#new-features)
  - [Performance improvements](#performance-improvements)
- [Important changes](#important-changes)
  - [Client hierarchy](#client-hierarchy)
  - [Client constructors](#client-constructors)
  - [Creating senders and receivers](#creating-senders-and-receivers)
  - [Message format changes](#message-format-changes)
  - [Receiving messages](#receiving-messages)
  - [Rule management](#rule-management)
- [Upcoming features](#upcoming-features)
- [Additional samples](#additional-samples)

## Migration benefits

A natural question to ask when considering whether or not to adopt a new version or library is what the benefits of doing so would be. As Azure has matured and been embraced by a more diverse group of developers, we have been focused on learning the patterns and practices to best support developer productivity and to understand the gaps that the JavaScript client libraries have.

There were several areas of consistent feedback expressed across the Azure client library ecosystem. One of the most important is that the client libraries for different Azure services have not had a consistent approach to organization, naming, and API structure. Additionally, many developers have felt that the learning curve was difficult, and the APIs did not offer a good, approachable, and consistent onboarding story for those learning Azure or exploring a specific Azure service.

To try and improve the development experience across Azure services, a set of uniform [design guidelines](https://azure.github.io/azure-sdk/general_introduction.html) was created for all languages to drive a consistent experience with established API patterns for all services. A set of [TypeScript & JavaScript specific guidelines](https://azure.github.io/azure-sdk/typescript_introduction.html) was also introduced to ensure that these libraries have a natural and idiomatic feel. Further details are available in the guidelines for those interested.

### Cross Service SDK improvements

The new version of the Service Bus library also shares some of the cross-service improvements made to the Azure development experience, such as:

- Using the new `@azure/identity` library to share a single authentication approach between clients.
- A unified logging and diagnostics pipeline that offers a common view of the activities across each of the client libraries.
- The use of promises rather than callbacks for a simplified programming experience.
- The use of async iterators in paging APIs.

### New features

We have a variety of new features in the version 7 of the Service Bus library.

- A new `ServiceBusAdministrationClient` to perform operations like create/get/list/update/delete on queues/topics/subscriptions/rules. These were already available as part of a separate package `@azure/arm-servicebus` that uses Azure Resource Manager APIs but had the drawback of not supporting connection strings.
- Ability to create a batch of messages with the smarter `ServiceBusSender.createMessageBatch()` and `ServiceBusMessageBatch.tryAddMessage()` APIs. This will help you manage the messages to be sent in the most optimal way.
- Ability to configure the retry policy used by the operations on the client, sender and receivers.
- Ability to cancel async operations on the client, sender and receivers and the management operations using the abort signal from `@azure/abort-controller`.
- Authentication with AAD credentials using `@azure/identity`.
  Refer to the [Changelog.md](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/CHANGELOG.md) for more new features, changes and bug fixes.

### Performance Improvements

Notable performance improvements:

- Number of messages that can be sent in a certain duration using a single sender has been improved 4-5 times from v1.x (excluding the effects of batch message API).
- Memory usage for message lock renewals, session lock renewals and peeking has been made more efficient.

## Important changes

### Client hierarchy

In the interest of simplifying the API surface we've made a single top level client called `ServiceBusClient`, rather than one for each of queue, topic, and subscription. This acts as the single entry point in contrast with multiple entry points from before. You can create senders and receivers from this client to the queue/topic/subscription/session of your choice and start sending/receiving messages.

#### Approachability

By having a single entry point, the `ServiceBusClient` helps with the discoverability of the API as you can explore all available features through methods from a single client, as opposed to searching through documentation or exploring namespace for the types that you can instantiate. Whether sending or receiving, using sessions or not, you will start your applications by constructing the same client.

#### Consistency

We now have methods with similar names, signature and location to create senders and receivers. This provides consistency and predictability on the various features of the library.

### Client constructors

While previously, you would use the static method `createFromConnectionString` on the client to create it using connection string, now you can use the client constructor directly.

In V1:

```javascript
const serviceBusClient = ServiceBusClient.createFromConnectionString("connection string");
```

In V7:

```javascript
const serviceBusClient = new ServiceBusClient("connection string");
```

While previously, you would use the static method `createFromAadTokenCredentials` on the client to create it using Azure Active Directory, now you can use the new [@azure/identity](https://www.npmjs.com/package/@azure/identity) library to share a single authentication solution between clients of different Azure services.

In V1:

```javascript
const { ServiceBusClient } = require("@azure/service-bus");
const { interactiveLogin } = require("@azure/ms-rest-nodeauth");

const credential = await interactiveLogin({
  tokenAudience: "https://servicebus.azure.net/"
});

const serviceBusClient = ServiceBusClient.createFromAadTokenCredentials(
  "my-namespace.servicebus.windows.net",
  credential
);
```

In V7:

```javascript
const { ServiceBusClient } = require("@azure/service-bus");
const { DefaultAzureCredential } = require("@azure/identity");

const credential = new DefaultAzureCredential();
const serviceBusClient = new ServiceBusClient("my-namespace.servicebus.windows.net", credential);
```

### Creating senders and receivers

- `QueueClient`, `TopicClient` and `SubscriptionClient` have been replaced with methods to
  create receivers and senders directly from `ServiceBusClient`.

  In V1:

  ```typescript
  const serviceBusClient = ServiceBusClient.createFromConnectionString("connection string");

  // for queues
  const queueClient = serviceBusClient.createQueueClient("queue");
  const queueSender = queueClient.createSender();
  const queueReceiver = queueClient.createReceiver(ReceiveMode.peekLock);

  // for topics
  const topicClient = serviceBusClient.createTopicClient("topic");
  const topicSender = topicClient.createSender();

  // for subscriptions
  const subscriptionClient = serviceBusClient.createSubscriptionClient("topic", "subscription");
  const subscriptionReceiver = subscriptionClient.createReceiver(ReceiveMode.peekLock);
  ```

  And now in V7:

  ```typescript
  // note that we've migrated to just allowing plain constructors, rather than
  // using static methods.
  const serviceBusClient = new ServiceBusClient("connection string");

  // for queues
  const queueSender = serviceBusClient.createSender("queue");
  // receiveMode is optional, with "peekLock" as the default mode
  const queueReceiver = serviceBusClient.createReceiver("queue");

  // for topics
  const topicSender = serviceBusClient.createSender("topic");

  // for subscriptions
  // receiveMode is optional, with "peekLock" as the default mode
  const subscriptionReceiver = serviceBusClient.createReceiver("topic", "subscription");
  ```

- The `createReceiver()` overload that took session options is replaced by two async methods `acceptSession()` and `acceptNextSession()`
  - The promise returned by these methods is resolved when a receiver link has been initialized with a session in the service.
  - Prior to v7, `createReceiver()` worked using lazy-initialization, where the
    receiver link to the session was only initialized when the async methods on the `ServiceBusSessionReceiver`
    were first called.

### Message format changes

In version 1 of this library, we had the below to represent a Service Bus message

- `SendableMessageInfo` - An interface representing the message when you need to send it.
- `ReceivedMessageInfo` - An interface representing the message when you use the peek operation. This extends the `SendableMessageInfo` with data set by the service.
- `ServiceBusMessage` - A class representing the message when receive it using the receiver. This extends the `ReceivedMessageInfo` with methods on it to settle the message.

In version 7 of this library, we simplified this as below:

- `ServiceBusMessage` is now the name of the interface representing the message when you need to send it with the below changes to better align with the [AMQP spec](https://www.amqp.org/sites/amqp.org/files/amqp.pdf):
  - `label` has been renamed to `subject`
  - `userProperties` has been renamed to `applicationProperties`
- `ServiceBusReceivedMessage` is the name of the interface representing the message when you get it from the service, regardless of whether you used the peek operation or receivied it using the receiver.
- The methods to settle the message have been moved from the message to the receiver to better represent the nature of the message settlement feature which is an attribute of the receiver.

### Receiving messages

- `peek()` and `peekBySequenceNumber()` methods are collapsed into a single method `peekMessages()`.
  The options passed to this new method accommodates both number of messages to be peeked and the sequence number to peek from.

- `receiveBatch()` method is renamed to `receiveMessages()` to be consistent in usage of the `Messages` suffix in other methods
  on the receiver and the sender.

- `registerMessageHandler` on `Receiver` has been renamed to `subscribe`(on `ServiceBusReceiver` and `ServiceBusSessionReceiver`) and takes different arguments.

  In V1:

  ```typescript
  queueOrSubscriptionReceiver.registerMessageHandler(onMessageFn, onErrorFn);
  ```

  In V7:

  ```typescript
  queueOrSubscriptionReceiver.subscribe({
    processMessage: onMessageFn,
    // `processError` is now declared as async and should return a promise.
    processError: async (args: ProcessErrorArgs) => {
      // additional information is in 'args' to provide context for the error.
      onErrorFn(args.error);
    }
  });
  ```

### Settling messages

Previously, the methods to settle messages (`complete()`, `abandon()`, `defer()` and `deadLetter()`) were on the messages themselves.

```typescript
// legacy
const serviceBusReceivedMessage: ServiceBusReceivedMessage;
serviceBusReceivedMessage.complete();
// or .abandon(), .defer(), deadLetter()
```

These have been moved to the receiver in the new version, take the message as input and have the `Message` suffix in their name.

```typescript
// current
const serviceBusReceivedMessage: ServiceBusReceivedMessage;
const serviceBusReceiver: ServiceBusReceiver;

serviceBusReceiver.completeMessage(serviceBusReceivedMessage);
// or .abandonMessage(), .deferMessage(), deadLetterMessage()
```

The idea is to have the message represents just the data and not have the responsibility of any operation on the service side.
Additionally, since a message cannot be settled if the receiver that was used to receive it is not alive, tying these operations to the receiver drives the message home better.

### Rule management

- The add/get/remove rule operations on the older `SubscriptionClient` have moved to the new `ServiceBusAdministrationClient` class which will be supporting
  Create, Get, Update and Delete operations on Queues, Topics, Subscriptions and Rules.

  In V1:

  ```typescript
  await subscriptionClient.addRule();
  await subscriptionClient.getRules();
  await subscriptionClient.removeRule();
  ```

  In V7:

  ```typescript
  const serviceBusAdministrationClient = new ServiceBusAdministrationClient(connectionString);
  await serviceBusAdministrationClient.createRule();
  await serviceBusAdministrationClient.getRules();
  await serviceBusAdministrationClient.deleteRule();
  ```

## Upcoming features

- [Transactions](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-transactions#transactions-in-service-bus) to group two or more operations together into an execution scope to ensure that all operations belonging to a given group of operations either succeed or fail jointly.
- Optional [prefetch](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-prefetch) support to speed up the message flow by having a message readily available for local retrieval when and before the application asks for one.
- An optional method on `ServiceBusSender` to allow pre-initializing the sender link to remove the upfront cost from the first send operation.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2FMIGRATIONGUIDE.png)

## Additional samples

More examples can be found at [Samples for @azure/service-bus](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus/samples/)
