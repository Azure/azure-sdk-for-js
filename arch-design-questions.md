# Client design

## Principles

- There are two top level clients - `ServiceBusReceiverClient` and `ServiceBusSenderClient`.
- Clients are [single-use](#single-use-clients) - they are created with a receive mode, session ID (if applicable), queue/topic-subscription
  baked in and cannot be changed.
- The user can choose between two different methods of message delivery - push (via registered message handlers)
  or pull (via an iterator/reactor pattern or .receiveBatch()-style)
- Sessions have two different methods for interacting with them:
  1. [single-use](#single-use-clients)
  2. [session manager](#sessions-design)
- Different message types will be used for sending messages vs receiving messages. This is less confusing for
  the user since we can remove fields that are non-sensical for sending (for instance, `locktoken`).

# Single use clients

Clients are single-use - you cannot change their receive mode or targeted queue/topic/subscription after
they are created.

This also means that calling .receive() (or registering multiple handlers) isn't a useful activity - the user
would only be competing against _themselves_ since calling receive() multiple times would just result
in multiple links, in the same mode, to the same entity, on the same _connection_.

# Sessions design

The primary use case for non-session bus users when receiving is opening
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

- Java (keeping the service bus client builder alive + sharedConnection(true). Not required for sessions?
- .NET (create ServiceBusConnection class, share. Not required though but should be for sessions.)
- JS - { sessionConnections: } property when client is initialized (required if specifying a session)
- Python - top level service bus client instance?

## The user doesn't necessarily know which sessions exist

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
language will have some form of a **session manager**..

This client is a higher-level client that internally manages the connection on behalf of the user, does
manage state and is distinct from the [single use clients](single-use-clients).

Existing solutions:

- JS: `SessionManager` class (hasn't been reviewed)
