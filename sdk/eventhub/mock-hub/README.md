## Mock Event Hubs service

This package exposes a mock Event Hubs service for use in testing.

Currently the mock service represents a single Event Hub within a namespace.

### Goals

This project was spun up for the following reasons:

1. Avoid hitting the live service for tests.
2. Deterministically trigger 'bad' service behavior.
3. Simplify tests that rely on state. (populate events, change consumer groups/partition ids)
4. Extend to support record & playback.

Currently, the project only fulfills the 1st goal.
It is possible to start this service locally either in a separate process or in the same process as
the event-hubs tests and run the live tests against the local service instead.

### How to use the service in Event Hubs live tests

First, the `mock-hub` needs to be configured with a cert to support TLS.

Next, the `event-hubs` unit-test scripts can be updated to start the mock event hubs service
and run the live tests against the service using the `NODE_EXTRA_CA_CERTS` environment variable pointing to the CA that mock-hub's cert was signed with.

### Next steps

Here's a list of some features that would be helpful for the `event-hubs` live tests:

- Support multiple Event Hubs.
  This would allow us to create a new Event Hub for each test and let us run all our tests in parallel.

- Expose listeners on mock service.
  This could be useful so we don't need to perform as many steps as we do today for tests.
  For instance, instead of sending events then creating a consumer to make sure those events were sent,
  we could listen on the mock service so it can tell us if the messages were received.

- Expose APIs to trigger errors.
  For example, it would be useful to be able to tell the service to do something like 'send 5 messages then throw an error'.

### Additional details

Some details on what features the mock service supports can be found [here](design/features.md).

Some details on the overal architecture of this project can be found [here](design/architecture.md).

To see a quick example of how to start the mock service, look at [sample/ehSample.ts](sample/ehSample.ts).
