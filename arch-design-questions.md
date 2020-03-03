# Client design

## Principles

- [Connection sharing needs to be considered a first-class activity.](#connection-sharing-via-top-level-object) To support this:
  - There is _one_ top level client - `ServiceBusClient`. It's constructed with a connection string, or a token credential
    but does not take any entity specific (topic/queue/subscription) parameters.
  - It has instance methods to get receivers and senders (getReceiver, getSender) for
    both session and non-session cases.
  - Receivers and senders are [single-use](#single-use-receivers-or-senders) - they are created with a receive mode, session ID 
  (if applicable), queue/topic-subscription baked in and cannot be changed.
- The user can choose between three different methods of message delivery:
  1. "push" (via registered message handlers). This is an "eternal" push - it keeps running until the
    receiver link is terminated (or the client is closed).
  2. Iteration via an actual iterator or Flux. This can be an "eternal" operation as well. 
    * In JS it will be (via an async iterable)
    * In Java you can choose to either .take() off the Flux<> or .subscribe(). `subscribe` is the
      version referenced here.
  3. "pull",  via .receiveBatch()
    * In Java choosing to .take() off the returned Flux<> will act as a finite receive, similar to this.
- [Sessions](#sessions-complications)
- [Different messages for sending vs receiving](#different-messages-for-sending-vs-receiving)
- [Message batching](#message-batching)

# Single use receivers or senders

Receivers/senders are single-use - you cannot change their receive mode, session-id or targeted queue/topic/subscription after they are created.

# Sessions complications

Sessions differ in that the user's application is not tied to a single session - the user
is expected to open up and read from many sessions during the lifetime of their application.

See [connection sharing](##connection-sharing-via-top-level-object) for the current plan
on how to avoid connection explosion.

## The user doesn't necessarily know which sessions exist (round-robin sessions)

**Problem**

One use case with sessions is that the user doesn't necessarily know what sessions
exist ahead of time.

An anticipated common pattern is the user will do something like this:

```
  reusable-connection = create service bus connection

  while:
    // concurrently...
    get next session(reusable-connection)
    read from session until all message exhausted
    close session
```

**get next session** can be handled by simply allowing the [single use client](#single-use-clients)
to take a sentinel value for the session ID, allowing the server to just hand us the next unlocked session.

We anticipate that this will be a fairly common pattern. To simplify the experience for the user each
language will have some form of a **session manager**.

This client is a higher-level client that internally manages the connection on behalf of the user, does
manage state and is distinct from the [single use clients](single-use-clients).

Existing solutions:

- JS: [`SessionManager` (has not been reviewed for production-readiness)](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/src/session/sessionManager.ts)
- .NET: [`ServiceBusProcessor`](https://github.com/Azure/azure-sdk-for-net/blob/master/sdk/servicebus/Azure.Messaging.ServiceBus/src/Processor/ServiceBusProcessorClient.cs)
- Java/Python - no solution currently.

# Connection sharing via top-level object

Connection sharing is enabled by _default_ in our current design by virtue of a 
top level `ServiceBusClient` object.

The `ServiceBusClient` object is created with either connection string
or TokenCredential information but is _not_ entity specific.

So typical usage will be somewhat like this:

```csharp
class ServiceBusClient {
  ServiceBusClient(connectionstring or TokenCredential/host)

  // any receiver/sender instances created through here will share the
  // same AMQP connection which is owned by the ServiceBusClient
  ServiceBusReceiver GetReceiver(queuename);
  ServiceBusReceiver GetReceiver(topicname, subscriptionname);  
  // optional-session-id, if null, means 'get next available session'
  // also, actually locks the session at this point.
  Task<ServiceBusReceiver> GetSessionReceiver(queuename, optional-sessionid);
  ServiceBusSender GetSender(queuename or topic name);
}
```

and the user experience is:

```csharp
ServiceBusClient client = new ServiceBusClient(connectionstring);

var queueReceiver = client.GetReceiver("queue-name");

// shares same link as `queueReceiver`
var topicSender = client.GetSender("topic-name");

// closes the receiver link (but not connection)
await queueReceiver.CloseAsync();
// closes sender link (but not connection)
await topicSender.CloseAsync();

// closes the AMQP connection
await client.CloseAsync();
```

# Different messages for sending vs receiving

Messages will have separate classes/interfaces for messages that are sent (`Message`)
vs messages that are received (`ReceivedMessage`). 

This allows us to avoid including fields or actions (like settling, that only applies 
to received messages).

Messages returned from the peek() API should not contain methods for 
message settlement. (ie, complete(), abandon()).

TBD: do we make this a:
- compile time constraint (ie, new type `PeekMessage`)
- or do we do we just throw an exception at runtime?

We can also omit the following fields:
- TBD

# Message batching

Message batching affects sending _only_. Receiving a fixed set of messages is 
  still done using the equivalent of a IList<T> (either an array, a Flux<T> ,etc...)

To use a message batch (borrowing from what we've done already in EventHubs):

1. The user creates a message batch. This is done as an async operation today
  since we queried EventHubs for the maximum allowed size of the batch.
2. User adds messages via the `tryAdd` method which returns a boolean to indicate
  if the add worked or if the message was too big. This is critical - it allows the user
  a simple way of knowing which message caused the batch to overflow so they
  can decide how to properly split it (or throw it away).
3. User sends the entire message batch object via `sender.sendBatch()`

Sample code:

```javascript
const serviceBusSender= <acquire ServiceBusSender>;

const batch: ServiceBusMessageBatch = await serviceBusSender.createBatch();

const isAdded: boolean = batch.tryAdd(sendable message);

if (!isAdded) {
  console.log(`Message is too big, can't add it`);
}

await serviceBusSender.sendBatch(batch);
```
