### Guide

1. Build the event-hubs perf project `rush build -t perf-event-hubs`.
2. Navigate to `cd sdk\eventhub\perf-tests\event-hubs\`.
3. Create an event-hubs namespace and populate the .env file with `EVENTHUB_CONNECTION_STRING`, `EVENTHUB_NAME` and `CONSUMER_GROUP_NAME` variables.
4. Run the tests as follows from the `event-hubs` folder.
   - batch send
     - `npm run perf-test:node -- SendTest --warmup 2 --duration 7 --parallel 2`
   - receive(Standalone test - doesn't use the framework)
     - `ts-node test/receive.spec.ts [eventBodySize] [numberOfEvents]`
     - `ts-node test/receive.spec.ts 1024 10000`
