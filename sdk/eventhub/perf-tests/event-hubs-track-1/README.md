### Guide

1. Navigate to `sdk\eventhub\perf-tests\event-hubs-track-1`
2. Do `rush update`.
3. Run `npm run setup`.
4. Create an event-hubs namespace and populate the .env file with `EVENTHUB_CONNECTION_STRING`, `EVENTHUB_NAME` and `CONSUMER_GROUP_NAME` variables.
7.  Run the tests as follows.
   - batch send
     - `npm run perf-test:node -- SendTest --warmup 2 --duration 7 --parallel 2`
   - receive(Standalone test - doesn't use the framework)
     - `ts-node receive.spec.ts`
