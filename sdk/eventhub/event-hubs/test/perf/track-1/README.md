### Guide

1. Navigate to `test-utils\perfstress` folder `cd sdk\test-utils\perfstress\`
2. Build the package `rush update && rush build -t test-utils-perfstress`
3. Pack the perf package `rushx pack`
4. Navigate to `event-hubs\perf\track-1` folder `cd sdk\eventhub\event-hubs\perf\track-1`.
5. Install the perf package `npm i ..\..\..\..\..\test-utils\perfstress\azure-test-utils-perfstress-1.0.0.tgz`
6. Run `npm install` to get `event-hubs V2`.
7. Create an event-hubs namespace and populate the .env file at `eventhub\event-hubs` folder with `EVENTHUB_CONNECTION_STRING` and `EVENTHUB_NAME` variables.
8. Run the tests as follows from the `event-hubs` folder.
   - batch send
     - `npm run perf-test:node -- SendTest --warmup 2 --duration 7 --parallel 2`
   - receive(Standalone test - doesn't use the framework)
     - `ts-node receive.spec.ts`
