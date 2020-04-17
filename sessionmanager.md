# `SessionManager` for @azure/service-bus v7

## Introduction

Sessions allow a user to logically subdivide a queue or subscription
into multiple smaller queues. This is useful for users that would
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
allowing more users to use this powerful feature.

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
  // time. Allows the user to avoid getting steamrolled by too many
  // sessions.
  maxConcurrentReceivers: number;

  // new feature (and probably pushed down to SessionReceiver as well) to enable auto-renewal
  // of the session lock.
  maxSessionAutoRenewLockDurationInMs?: number;

  // quite a few of the options available in MessageHandler (used for normal Receiver subscribe)
  // would also apply here.
  autoComplete?: boolean;
}

// implicit to this - this is specific to a single session.
interface SessionContext {
  // managing session state is implicit to the context where it is called. This flows
  // similarly to what developers would do with `SessionReceiver`
  setState();
  getState();

  sessionId: string;
}

interface SessionMessageHandler {
  // tentatively suggesting proposal #2 for error handling below.
  processMessage(message: ReceivedMessage|ReceivedMessageWithLock, context: SessionContext);
  processError(err: Error, context: { sessionId: string });

  // these names are consistent with EventHubs and seem like they'd be okay with ServiceBus as well.
  processInitialize(context: { sessionId: string });
  processClose(context: { sessionId: string });
}

interface SessionManager {
  // the handlers
  subscribe(handlers: SessionMessageHandler);
}

```

### processError() and SessionContext

Following from what we've learned in EventHubs, passing in a context object can be a
convenient place to put information that would not otherwise be present in the object.

In Service Bus's case the `sessionId` field as well as the settlement methods are already
on the `ReceivedMessage|ReceivedMessageWithLock` instance so, at least for `processMessage`,
there is no need.

However, with `processError` we do not pass the session ID along with the error. To solve this we
can do a few things:

1.  Add a `sessionId` field to the errors we pass in. This field could potentially be optional if we have errors that occur at a context higher than an individual receiver (for instance, connection errors).

    The user will need a typeguard (or similar function) to properly check and extract the error (in TypeScript) or just have the existence of it documented (for JavaScript) but otherwise
    this is a possible path.

2.  Add a `context` parameter to `processError` that would contain the `sessionId` (still optionally).

    If we want to remain signature compatible with `MessageHandler` (used for `Receiver`) then #1 is a good option.

    If we want believe that we have some extra fields that need to be passed in (for instance if we decide to move the message settlement methods back onto the receiver) then #2 becomes
    a more clear winner.

    #2 is also the way that .NET currently handles passing in settlement methods, etc... in their `ServiceBusProcessor`.

### Lifetime management of underlying SessionReceivers

One idea floated was to allow users to `close()` the underlying receivers to indicate that
the processing of the session was "complete" rather than reading all messages from a session.

This pattern will not work within Service Bus as-is. When asking for sessions from Service Bus
it will return (with equal precedence) _any_ session that still has messages in it. This means
that a user could `close()` a session in order to stop reading from it and then, on next accept,
get the _same_ session again.

Based on this our design should encourage users to read a session to completion (relying more on
max session lock time + max idle time per session).

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
