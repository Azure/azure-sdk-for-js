## Setting up the perf project

1. Build the event-hubs perf test project `rush build -t perf-event-hubs`.
2. Navigate to `cd sdk/eventhub/perf-tests/event-hubs`.

## Environment setup

Create an event-hubs namespace and populate the `.env` file with the following variables.

- `EVENTHUB_CONNECTION_STRING`,
- `EVENTHUB_NAME` and
- `CONSUMER_GROUP_NAME`

## Running the tests

- To test sending messages in batches

  > npm run perf-test:node -- SendTest --warmup 2 --duration 7 --parallel 2

  _Note: For more default options, refer [Perf-Framework-Default-Options](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perf/README.md#keyconcepts)._

- To test `subscribe` - receiving a stream of messages

  > `npm run perf-test:node -- SubscribeTest --duration 5`

- To test receiving messages (this test does not use the framework, is a standalone test)

  `ts-node test/receive.spec.ts [eventBodySize] [numberOfEvents]`,

  For example,

  > ts-node test/receive.spec.ts 1024 10000
