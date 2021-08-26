### Guide

1. Build the event-hubs package `rush build -t event-hubs`.
2. Navigate to `event-hubs` folder `cd sdk\eventhub\event-hubs\`.
3. Create an event-hubs namespace and populate the .env file at `eventhub\event-hubs` folder with `EVENTHUB_CONNECTION_STRING`, `EVENTHUB_NAME` and `CONSUMER_GROUP_NAME` variables.
4. Run the tests as follows from the `event-hubs` folder.
   - batch send
     - `npm run perf-test:node -- SendTest --warmup 2 --duration 7 --parallel 2`
   - receive(Standalone test - doesn't use the framework)
     - `tsc -p . --module "commonjs" && node dist-esm\test\perf\track-2\receive.spec.js`
