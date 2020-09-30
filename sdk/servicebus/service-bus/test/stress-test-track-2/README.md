### Setup

Before running the code,

- Setup the `SERVICEBUS_CONNECTION_STRING` environment variable. (Queue resource will be created in the beginning for the test period and teared down at the end)
- Install the `@azure/service-bus` package in this folder
  Do `npm install @azure/service-bus@next`

### Scenarios

Here are the scenarios being covered and how you can run them.

1. Single sender that keeps sending messages in series.
   `ts-node scenarioSend.ts` (runs with defaults)
   `ts-node scenarioSend.ts --numberOfMessagesPerSend=100 delayBetweenSendsInMs=50`(with flags)
   Flags that can be set

   - testDurationInMs (default = 3600000) // 60 minutes
   - numberOfMessagesPerSend (default = 1)
   - delayBetweenSendsInMs (default = 0)
   - totalNumberOfMessagesToSend (default = Infinity)

2. Batch receive with a streaming sender
   `ts-node scenarioBatchReceive.ts` (runs with defaults)
   `ts-node scenarioBatchReceive.ts --delayBetweenReceivesInMs=200 --totalNumberOfMessagesToSend=5000` (With flags)
   Flags that can be set

   - testDurationInMs (default = 3600000) // 1hr
   - receiveMode (default = "peekLock")
   - receiveBatchMaxMessageCount (default = 10)
   - receiveBatchMaxWaitTimeInMs (default = 10000)
   - delayBetweenReceivesInMs (default = 0)
   - numberOfMessagesPerSend (default = 1)
   - delayBetweenSendsInMs (default = 0)
   - totalNumberOfMessagesToSend (default = Infinity)
