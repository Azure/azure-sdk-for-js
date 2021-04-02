### Setup

Before running the code,

- Setup the `SERVICEBUS_CONNECTION_STRING` environment variable. (Queue resource will be created in the beginning for the test period and teared down at the end)
- Run `rushx pack` at `sdk/servicebus/service-bus` folder to generate the current version of service-bus package. (Or skip this step and install the version that you prefer)
- Run `npm install` in this folder to install the Service Bus package that should be stress tested.

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
   - useScheduleApi (default = false)

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

3. Renew message locks for a duration
   `ts-node scenarioRenewMessageLock.ts` (runs with defaults)
   `ts-node scenarioRenewMessageLock.ts --delayBetweenReceivesInMs=200 --totalNumberOfMessagesToSend=5000` (With flags)
   Flags that can be set

   - testDurationInMs (default = 3600000) // 1hr
   - receiveBatchMaxMessageCount (default = 10)
   - receiveBatchMaxWaitTimeInMs (default = 10000)
   - delayBetweenReceivesInMs (default = 0)
   - numberOfMessagesPerSend (default = 1)
   - delayBetweenSendsInMs (default = 0)
   - totalNumberOfMessagesToSend (default = Infinity)

4. Renew session locks for a duration
   `ts-node scenarioRenewSessionLock.ts` (runs with defaults)
   `ts-node scenarioRenewSessionLock.ts --delayBetweenReceivesInMs=200 --totalNumberOfMessagesToSend=5000` (With flags)
   Flags that can be set

   - testDurationInMs (default = 3600000) // 1hr
   - receiveBatchMaxMessageCount (default = 10)
   - receiveBatchMaxWaitTimeInMs (default = 10000)
   - delayBetweenReceivesInMs (default = 0)
   - numberOfMessagesPerSend (default = 100)
   - delayBetweenSendsInMs (default = 0)
   - totalNumberOfMessagesToSend (default = Infinity)
   - autoLockRenewal (default = false)

5. Streaming Receive
   `ts-node scenarioStreamingReceive.ts` (runs with defaults)
   `ts-node scenarioStreamingReceive.ts --manualLockRenewal=false --totalNumberOfMessagesToSend=5000` (With flags)
   Flags that can be set

   - testDurationInMs (default = 3600000) // 1hr
   - receiveMode (default = "peekLock")
   - autoComplete (default = true)
   - maxConcurrentCalls (default = 100)
   - maxAutoRenewLockDurationInMs (default = 0)
   - manualLockRenewal (default = true)
   - numberOfMessagesPerSend (default = 1)
   - delayBetweenSendsInMs (default = 0)
   - totalNumberOfMessagesToSend (default = Infinity)
   - completeMessageAfterDuration (default = true)

6. Management client - peek messages
   `ts-node scenarioPeekMessages.ts` (runs with defaults)
   `ts-node scenarioPeekMessages.ts --delayBetweenPeeksInMs=200 --totalNumberOfMessagesToSend=5000` (With flags)
   Flags that can be set

   - testDurationInMs (default = 3600000) // 1hr
   - peekMaxMessageCount (default = 10)
   - delayBetweenPeeksInMs (default = 0)
   - numberOfMessagesPerSend (default = 1)
   - delayBetweenSendsInMs (default = 0)
   - totalNumberOfMessagesToSend (default = Infinity)
