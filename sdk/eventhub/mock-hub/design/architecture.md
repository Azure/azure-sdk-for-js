## How does it work?

### Local AMQP server

The local AMQP server is used by the mock Event Hubs service
to handle peer connections and message normalization.

It's an event emitter that simplifies some of the AMQP dance e.g. responding to received messages.

It currently supports the following configuration options:

- port
- max message size
- idle timeout
- max channels
- max frame size
- tlsOptions
  - ca - certificate authority
  - cert - certificate chain in PEM format.
  - key - private key for certificate chain.
  - pfx - private key and certificate chain.
  - passphrase - secret used when creating PFX or private key.

### Mock Event Hubs

Handles all the business logic of reacting to messages and connection/link creation/tear-down.

Has an instance of the AMQP server.
In theory it could hold multiple AMQP server instances to support receiver redirect.

Supports the following configuration options as instantiation:

- partition count
- name (event hub name)
- list of consumer groups (\$default always supported)
- connectionInactivityTimeoutInMs

### Message Store

This is the in-memory storage for any events the service receives.

The MessageStore does 3 things:

- Stores messages as MessageRecords that are associated with a partition id.
- Can return partition properties.
- Can return a message iterator for a given partitionId and start position.

### Streaming Partition Sender

This sender pushes messages to a client-side receiver.

The streaming partition sender respects the starting event position.
It also is smart enough to only send events when the client-side receiver
has put credits on the link.

It gets an AsyncIterableIterator from the `MessageStore` so anytime a new
event is received by the service, the sender can immediately push it to
the client-side receiver.
