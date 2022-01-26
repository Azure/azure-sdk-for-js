## Setting up the perf project

1. Navigate to `sdk/servicebus/perf-tests/service-bus-track-1`.
2. Do `rush update`.
3. Run `npm run setup`.

   _Note: Since this is an independent npm project as opposed to being managed by rush, steps 2 & 3 help in building the perf framework and installing it in this track-1 perf test project._

## Environment setup

Create a service-bus namespace and populate the .env file with `SERVICEBUS_CONNECTION_STRING` variable.

## Running the tests

To test sending messages in batches:

> `npm run perf-test:node -- BatchSendTest --warmup 2 --duration 7 --parallel 2`

To test receiving messages in batches:

> `npm run perf-test:node -- BatchReceiveTest --warmup 1 --duration 25 --iterations 2 --parallel 32 --size-in-bytes 2000 --number-of-messages 50`

To test `receiveMessages` - receiving messages in batches

> `npm run perf-test:node -- BatchReceiveTest --duration 5 --size 2000`

_Note: For more default options, refer [Perf-Framework-Default-Options](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perf/README.md#keyconcepts)._
