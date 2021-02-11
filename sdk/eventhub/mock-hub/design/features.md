## What is the Mock Event Hubs service?

Currently, a local, in-memory version of Event Hubs.

Supports:

- Receiving and storing events from a client.
- Event partition assignment (based on partition id, partition key, or round robin).
- Sending events to a client.
  - Respects link credits.
  - Respects starting event position (source filter).
  - Respects tracking last enqueued event properties.
- owner level (epoch).
  - Respects owner level per consumer group.
  - Highest/most recent owner level wins.
- Multiple consumer groups.
- Reading Event Hub properties.
- Reading Event Hub partition properties.
- Validation/Errors
  - Client sender invalid partition id.
  - CBS auth requested for invalid entity.
  - Client sender message size exceeded.
  - Owner level validation.
  - Client receiver invalid partition id.
  - Client receiver invalid consumer group.
  - Invalid Event Hub name.
- TLS support

Lacking:

- Better auth support.
  Assumes all CBS requests accepted unless against an invalid entity.
- Receiver redirect.
- Probably more error handling?
- Multiple event-hub support. Currently supports a single Event Hub in a namespace.
- Persistent message storage (not a goal.)
