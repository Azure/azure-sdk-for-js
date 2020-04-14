# `SessionManager` for @azure/service-bus v7

## Introduction

Sessions allow a user to logically subdivide a queue or subscription
into multiple smaller queues. This is useful for customers that would
like to allow for **many** smaller streams of messages within a single
queue or subscription.

## Use case

A simple use case would be having a set of documents. Users can "edit"
documents, and each edit is stored as a message within Service Bus.

```javascript
{
  sessionId: "the document name"
  body: {
    mode: "edit",
    content: "content of the edit"
  }
}
```

Multiple edits or transformations could be sent for a document, at any time.

To handle this the user would need to write code similar to this:

```javascript
while (true) {
  // some sort of check to make sure we're not processing
  // too many sessions at a time. The odds of having more documents
  // than available processors is _high_.
  acquireSemaphore();

  // by not specifying a session id we will get the next unlocked session from service bus.
  const sessionReceiver: SessionReceiver = serviceBusClient.getSessionReceiver(
    "queue",
    "peekLock"
  );
  startSessionLockAutoRenewal(sessionReceiver);

  sessionReceiver.subscribe(messageHandlers);

  // ...after some predefined period of time
  sessionReceiver.close();

  stopSessionLockRenewal(sessionReceiver);
  releaseSemaphore();
}
```

## Proposal

In the same vein as what we provide in `Receiver.subscribe()` we can provide a
`SessionManager` that would support the use case where the user would like
to read messages, in parallel, from a number of sessions while controlling
the amount of parallelism.

This would simplify session usage to the point where it becomes more accessible,
allowing more customers to use this powerful feature.

The proposed interface for this change:

```javascript
class ServiceBusClient {
  // a session manager is conceptually a receiver, but does not have to
  // obey the same interface.
  createSessionManager("queue", "peekLock", sessionManagerOptions): SessionManager;
  createSessionManager("topic", "subscription", "peekLock", sessionManagerOptions): SessionManager;
}

interface SessionManagerOptions {
  // amount of time we will wait for messages to arrive in a session before
  // it is `close()`d
  idleTimeoutMs: number;

  // the maximum number of receivers that can be active at any
  // time. Allows the customer to avoid getting steamrolled by too many
  // sessions.
  maxConcurrentReceivers: number;

  // new feature (and probably pushed down to SessionReceiver as well) to enable auto-renewal
  // of the session lock.
  maxSessionAutoRenewLockDurationInMs?: number;

  // quite a few of the options available in MessageHandler (used for normal Receiver subscribe)
  // would also apply here.
  autoComplete?: boolean;
}

interface SessionManager {
  // the handlers
  subscribe(handlers: MessageHandler);    // same message handler type as existing Receiver/SessionReceiver

  // managing session state can be done by session id. This flows similarly
  // to what developers would do with `SessionReceiver`
  setState(sessionId: string);
  getState(sessionId: string);
}

```

### Can this interface be a Receiver<MessageT>

Originally - yes!

However, as we discuss this there are parts that don't conform to our existing model
with our receivers.

Sessions allow you to store and retrieve state for the session itself. `SessionReceiver`
provides these methods, which any user that is reading from or dealing with a session can use but
these would not be available in the same signature with the `SesssionManager`.

There are also a variety of other methods like`receiveDeferredMessages`,`peek`,`receiveBatch`
that make sense when taken against a single receiver but not, as this class would be, in aggregate.

So some changes:

- We'll have a specific type for message handlers for the SessionManager
- That type will pass a 'context' to the processMessage callback that has session specific methods.
- Support only `subscribe()`

This does make it source-incompatible with `Receiver` but it'll still be conceptually similar.
