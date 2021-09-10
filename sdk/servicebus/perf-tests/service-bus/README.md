## Setting up the perf project

1. Build the service-bus perf test project `rush build -t perf-service-bus`.
2. Navigate to `cd sdk/servicebus/perf-tests/service-bus`.

## Environment setup

Create a service-bus namespace and populate the .env file with `SERVICEBUS_CONNECTION_STRING` variable.

## Running the tests

To test sending messages in batches

> `npm run perf-test:node -- BatchSendTest --warmup 2 --duration 7 --parallel 2`

> `npm run perf-test:node -- BatchSendTest --warmup 1 --duration 25 --iterations 2 --parallel 32 --messageBodySize 10240 --numberOfMessages 10`

_Note: For more default options, refer [Perf-Framework-Default-Options](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/test-utils/perfstress/README.md#keyconcepts)._
