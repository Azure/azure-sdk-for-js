## Setting up the perf project

1. Build the event-hubs perf test project `pnpm build --filter perf-event-hubs...`.
2. Navigate to `cd sdk/eventhub/event-hubs-perf-tests`.

## Environment setup

Create an event-hubs namespace and populate the `.env` file with the following variables.

- `EVENTHUB_CONNECTION_STRING`,
- `EVENTHUB_NAME` and
- `EVENTHUB_CONSUMER_GROUP_NAME` (defaults to "$Default")

## Running the tests

- To test sending messages in batches

  > `npm run perf-test:node -- SendTest --event-size 1024 --batch-size 100 --warmup 2 --duration 10 --parallel 2`

  _Note: For more default options, refer [Perf-Framework-Default-Options](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perf/README.md#keyconcepts)._

- To test `subscribe` - receiving a stream of messages

  > `npm run perf-test:node -- SubscribeTest --events 100000 --event-size 1024 --partitions 10 --max-batch-size 100 --duration 5`

- To test receiving messages (this test does not use the framework, is a standalone test)

  `ts-node test/receive.spec.ts [eventBodySize] [numberOfEvents]`,

  For example,

  > ts-node test/receive.spec.ts 1024 10000
