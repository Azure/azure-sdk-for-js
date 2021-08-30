### Guide

1. Navigate to `sdk\servicebus\perf-tests\service-bus-track-1`
2. Do `rush update`.
3. Run `npm run setup`.
4. Create a service-bus namespace and populate the .env file with `SERVICEBUS_CONNECTION_STRING` variable.
6. Run the tests as follows
   - batch send
     - `npm run perf-test:node -- BatchSendTest --warmup 2 --duration 7 --parallel 2`
