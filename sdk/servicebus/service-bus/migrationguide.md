# Guide to migrate from @azure/service-bus v1 to v7.preview.2

This document is intended for users that would like to try out preview 7
for @azure/service-bus. As the package is in preview, these details might
change as the package is developed before its final release.

## General changes

Version 7 of `@azure/service-bus` provides some "under-the-hood" changes
by standardizing on common infrastructure with `@azure/event-hubs`. This change
brings this package in line with the [Azure SDK Design Guidelines for Typescript](https://azure.github.io/azure-sdk/typescript_introduction.html#design-principles).

## API changes from V1 to V7

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

* `peekBySequenceNumber()`is removed in favor of an overload to `peek()` that would take the sequence number to start peeking from in the options.

* Subscription rule management has been moved to its own class, rather than being part of the now-removed `SubscriptionClient`

  In V1:

  ```typescript
  subscriptionClient.addRule();
  subscriptionClient.getRules();
  subscriptionClient.removeRule();
  ```

  In V7:

  ```typescript
  const ruleManager = serviceBusClient.getSubscriptionRuleManager("topic", "subscription");
  ruleManager.addRule();
  ruleManager.getRules();
  ruleManager.removeRule();
  ```

* createSender() and createSessionReceiver() are now async methods and initialize the connection

Prior to v7 `createSender()` and `createSessionReceiver()` worked using lazy-initialization, where the
AMQP connection would only be initialized on first send or receiving of a message.

The connection and link are now initialized after calling either method.

![Impressions](https://azure-sdk-impressions.azurewebsites.net/api/impressions/azure-sdk-for-js%2Fsdk%2Fservicebus%2Fservice-bus%2FMIGRATIONGUIDE.png)
