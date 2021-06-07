### Guide

1. Navigate to `test-utils\perfstress` folder `cd sdk\test-utils\perfstress\`
2. Build the package `rush update && rush build -t test-utils-perfstress`
3. Pack the perf package `rushx pack`
4. Navigate to `service-bus\perf\track-1` folder `cd sdk\servicebus\service-bus\perf\track-1`.
5. Install the perf package `npm i ..\..\..\..\..\test-utils\perfstress\azure-test-utils-perfstress-1.0.0.tgz`
6. Run `npm install` to get `service-bus V1`.
7. Create a service-bus namespace and populate the .env file at `servicebus\service-bus` folder with `SERVICEBUS_CONNECTION_STRING` and `QUEUE_NAME` variables.
8. Run the tests as follows
   - batch send
     - `npm run perf-test:node -- BatchSendTest --warmup 2 --duration 7 --parallel 2`
