# Guide to migrate from @azure/service-bus v1 to v7.preview.3

This document is intended for users that would like to try out preview 7
for @azure/service-bus. As the package is in preview, these details might
change as the package is developed before its final release.

## General changes

Version 7 of `@azure/service-bus` provides some "under-the-hood" changes
by standardizing on common infrastructure with `@azure/event-hubs`. This change
brings this package in line with the [Azure SDK Design Guidelines for Typescript](https://azure.github.io/azure-sdk/typescript_introduction.html#design-principles).

## API changes from V1 to V7

### Creating ServiceBusClient

- `ServiceBusClient` can now be constructed using new(). The static methods to
  construct it have been removed.

  In V1:

  ```typescript
  const serviceBusClient = ServiceBusClient.fromConnectionString("connection string");
  ```

  In V7:

  ```typescript
  const serviceBusClient = new ServiceBusClient("connection string");
  ```

### Creating senders and receivers

- `QueueClient`, `TopicClient` and `SubscriptionClient` have been replaced with methods to
  create receivers and senders directly from `ServiceBusClient`.

  In V1:

  ```typescript
  const serviceBusClient = ServiceBusClient.fromConnectionString("connection string");

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
  const queueReceiver = serviceBusClient.createReceiver("queue", "peekLock");

  // for topics
  const topicSender = serviceBusClient.createSender("topic");

  // for subscriptions
  const subscriptionReceiver = serviceBusClient.createReceiver("topic", "subscription", "peekLock");
  ```

- `createSessionReceiver()` is now an async method. 
  - The promise returned by this method is resolved when a receiver link has been initialized with a session in the service.
  - Prior to v7 `createSessionReceiver()` worked using lazy-initialization, where the
receiver link to the session was only initialized when the async methods on the `SessionReceiver`
were first called.

### Receiving messages

* `peek()` and `peekBySequenceNumber()` methods are collapsed into a single method `peekMessages()`. 
The options passed to this new method accomodates both number of messages to be peeked and the sequence number to peek from.

* `receiveBatch()` method is renamed to `receiveMessages()` to be consistent in usage of the `Messages` suffix in other methods
on the receiver and the sender.

* `registerMessageHandler` on `Receiver` has been renamed to `subscribe` and takes different arguments.

  In V1:

  ```typescript
  queueOrSubscriptionReceiver.registerMessageHandler(onMessageFn, onErrorFn);
  ```

  In V7:

  ```typescript
  queueOrSubscriptionReceiver.registerMessageHandler({
    processMessage: onMessageFn,
    // `processError` is now declared as async and should return a promise.
    processError: async (err) => {
      onErrorFn(err);
    }
  });
  ```

### Rule management

* The add/get/remove rule operations on the older `SubscriptionClient` have moved to the new `ServiceBusManagementClient` class which will be supporting 
Create, Get, Update and Delete operations on Queues, Topics, Subscriptions and Rules.

  In V1:

  ```typescript
  await subscriptionClient.addRule();
  await subscriptionClient.getRules();
  await subscriptionClient.removeRule();
  ```

  In V7:

  ```typescript
  const serviceBusManagementClient = new ServiceBusManagementClient(connectionString);
  await serviceBusManagementClient.createRule();
  await serviceBusManagementClient.getRules();
  await serviceBusManagementClient.deleteRule();
  ```



![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2FMIGRATIONGUIDE.png)
