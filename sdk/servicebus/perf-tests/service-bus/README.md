### Guide

1. Build the service-bus package `rush build -t service-bus`.
2. Navigate to `service-bus` folder `cd sdk\servicebus\service-bus\`.
3. Create a service-bus namespace and populate the .env file at `servicebus\service-bus` folder with `SERVICEBUS_CONNECTION_STRING` variables.
4. Run the tests as follows

   - batch send
     - `npm run perf-test:node -- BatchSendTest --warmup 2 --duration 7 --parallel 2`
     - `npm run perf-test:node -- BatchSendTest --warmup 1 --duration 25 --iterations 2 --parallel 32 --messageBodySize 10240 --numberOfMessages 10`
