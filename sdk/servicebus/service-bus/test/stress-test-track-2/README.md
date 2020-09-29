### Setup

Before running the code,

- Setup the `SERVICEBUS_CONNECTION_STRING` environment variable. (Queue resource will be created in the beginning for the test period and teared down at the end)
- Install the `@azure/service-bus` package in this folder
  Do `npm install @azure/service-bus@next`

### Scenarios

Here are the scenarios being covered and how you can run them.

1. Single sender keeps sending messages in series.
   `ts-node single-sender.ts` (runs with defaults)
   `ts-node single-sender.ts 1 100 0.1 10000`
   Command-line arguments in order

   - test duration in minutes (default = 60 min)
   - number of messages to send in each send (default = 1)
   - delay between sends in seconds (default = 0 seconds)
   - total number of messages to send (default = Infinite... meaning program stops after the specified testDuration)

2.
