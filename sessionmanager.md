# `SessionManager` for @azure/service-bus v7

## Introduction

Sessions allow a user to logically subdivide a queue or subscription
into multiple smaller queues. This is useful for customers that would 
like to allow for many smaller streams of messages within a single 
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
    const sessionReceiver: SessionReceiver = serviceBusClient.getSessionReceiver("queue", "peekLock");
    startSessionLockRenewal(sessionReceiver);

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
  concurrentReceivers: number;

  // TODO: I'd be curious about other potential options here.
}

interface SessionManager {
  // the handlers 
  subscribe(handlers);
}

```

Some design considerations:
- Would we like SessionManager to also conform to the `Receiver<MessageT>` interface? It seems
  like a nice way to let the user leverage their knowledge for using Service Bus in this scenario
  as well, even if they're not necessarily needed to be interchangable.
- Would a SessionManager need any additional methods beyond what is already provided in 
  `Receiver`? For instance, in `SessionReceiver` we provide a method to renew a session lock.

