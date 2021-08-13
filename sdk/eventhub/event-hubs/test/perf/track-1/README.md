### Guide

1. Navigate to `test-utils\perfstress` folder `cd sdk\test-utils\perfstress\`
2. Build the package `rush update && rush build -t test-utils-perfstress`
3. Pack the perf package `rushx pack`. This step would create a `azure-test-utils-perfstress-1.0.0.tgz` file at `test-utils\perfstress` folder.
4. Navigate to `event-hubs\perf\track-1` folder `cd sdk\eventhub\event-hubs\perf\track-1`.
5. Run `npm install` to get `event-hubs V2` and the perf package at `test-utils\perfstress` folder.
6. Create an event-hubs namespace and populate the .env file at `eventhub\event-hubs` folder with `EVENTHUB_CONNECTION_STRING`, `EVENTHUB_NAME` and `CONSUMER_GROUP_NAME` variables.
7. Run the tests as follows from the `event-hubs` folder.
   - batch send
     - `npm run perf-test:node -- SendTest --warmup 2 --duration 7 --parallel 2`
   - receive(Standalone test - doesn't use the framework)
     - `ts-node receive.spec.ts`
