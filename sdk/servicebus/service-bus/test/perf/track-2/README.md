### Guide

1. Build the service-bus package `rush build -t service-bus`.
2. Navigate to `service-bus` folder `cd sdk\servicebus\service-bus\`.
3. Create a service-bus namespace and populate the .env file at `servicebus\service-bus` folder with `SERVICEBUS_CONNECTION_STRING` variables.
4. Run the tests as follows

   - simple send
     - `npm run perf-test:node -- SimpleSendTest --warmup 2 --duration 7 --iterations 2 --parallel 2`
   - batch send
     - `npm run perf-test:node -- BatchSendTest --warmup 2 --duration 7 --parallel 2`
