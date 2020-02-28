# Client design

## Principles

- There are two required top level clients - `ServiceBusReceiverClient` and `ServiceBusSenderClient`.
- Clients are [single-use](#single-use-clients) - they are created with a receive mode, session ID 
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
- Sessions have two different use cases for interacting with them:
  1. [single-use with a known session name](#single-use-clients)
  2. [session manager, ie "round robin sessions"](#sessions-design)
- Different message types will be used for sending messages vs receiving messages. This is less confusing for
  the user since we can remove fields that are non-sensical for sending (for instance, `locktoken`).
- [Connection sharing is a first class scenario](connection-sharing)

# Single use clients

Clients are single-use - you cannot change their receive mode or targeted queue/topic/subscription after
they are created.

# Sessions design

The primary use case for service bus users that are NOT using sessions is opening
up a single client instance, connecting to a targeted queue (or topic/subscription)
and receiving from it.

In this case the lifetime of the client is essentially the lifetime of their application which makes
connection management a non-issue.

Sessions differ in that the user's application is not tied to a single session - the user
is expected to open up and read from many sessions during the lifetime of their application.

This requires a few design considerations:

## Connection "explosion"

**Problem**

The user opening multiple instances of a client means we need a way to limit the number of
physical connections to service bus.

Opening multiple receive _links_ is fine with service bus (it's a cheap abstraction within
the physical connection itself). However, a user creating a standalone client instance (without
any form of sharing) will inadvertantly create many physical connections.

**Solution**

Create a higher-lifetime object that the user can hold onto that represents the connection.
This higher-lifetime object **must be required** when the user is working with sessions
due to the higher likelihood of failure (via connection explosion).

**Existing solutions:**

See [connection sharing](#connection-sharing) for brainstorming around current ideas.

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

# Connection sharing

Connection sharing is tricky for some of the SDKs due to the lack of a top-level object. This means
that individual clients that are created need to have some method for receiving a "shared" object 
that can contain an AMQP connection (or equivalent).

There are a few proposals in play, which we will revisit after preview.1:

## Connection sharing via shared object

.NET currently has the ServiceBusConnection class to facilitate connection sharing. 
The constructor for the individual clients take either the service bus connection object 
_or_ the individual connection parameters.

This solution allows for the simple path (creating directly via connection string/token credential) while
also allowing a more savvy user to share connections. 

The downside to this approach (mostly in implementation) is that the same overloads that exist for
both the sender _and_ receiver must be present on the ServiceBusConnection object. 

As this is considered an advanced scenario (and thus useful for advanced users) this downside 
is trivial to work around.

## Connection sharing via top level factory

Python, with it's top level ServiceBusClient, is in connection-sharing mode by _default_. 

```python
client = new ServiceBusClient()
queueClient = client.createQueueClient()
topicClient = client.createTopicClient()
```

All instances spawned from the `client` above would share an AMQP connection implicitly
without any additional work to the user.

The downsides of this approach is that having a top level object is considered non-idiomatic 
for the other languages, which makes this a non-universal solution.

## Connection sharing by requiring a shared object

One possibility to address the constructor-pattern duplication of  ["connection sharing via shared object"](#connection-sharing-via-shared-object)
is to _require_ the `ServiceBusConnection` class as an argument. 

This would mean the individual clients could not be instantiated without first instantiating a connection class.

The downsides to this approach are that users will be forced (even in the "common" case) to create two objects,
rather than one. 

The positives are that it is consistent - the user has one path thorugh for both advanced and non-advanced 
scenarios.

## Connection sharing via "cache"

**not recommended via group consensus**

Another option that is a variant of the [connection sharing via shared object](#connection-sharing-via-shared-object)
pattern above is to treat the connection object as opaque. The connection object would become
a 'cache' that we use to store a connection in but would require no construction parameters.

Initialization of the cache (and maintenance) would occur through the individual client constructors.

For instance:

```typescript
const conn = new ServiceBusConnection();
const client = new ServiceBusReceiverClient(<connection info>, { conn: conn });
```

A benefit of this approach is that connection information is not duplicated. However, the downside of this
is that the connection object is now less logically constrained. It could _technically_ contain connections
from multiple namespaces, multiple topics, multiple queues, etc..

This can cut the other direction as well - the user might believe they are doing the efficient thing by passing
the cache but, due to criteria that might be less obvious, not realize that aren't. (for instance, using a queue
specific connection string, but trying to connect to a topic, etc..).
