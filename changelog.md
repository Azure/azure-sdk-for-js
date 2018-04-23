## 2018-04-23 0.1.0
- Previously we were depending on [amqp10](https://npmjs.com/package/amqp10) package for the amqp protocol. Moving forward we will be depending on [rhea](https://npmjs.com/package/rhea).
- The public facing API of this library has major breaking changes from the previous version 0.0.8. Please take a look at the [Readme](./README.md) and the [examples](./examples) directory for detailed samples.
- Removed the need to say `client.open.then()`. First call to create a sender, receiver or get metadata about the hub or partition will establish the AMQP connection.
- Added support to authenticate via Service Principal credentials, MSITokenCredentials, DeviceTokenCredentials.
  - This should make it easy for customers to login once using the above mentioned credentials, 
    - Create the EventHubs infrastructure on the Azure management/control plane programmatically using (azure-arm-eventhubs) package over HTTPS prtocol.
    - Use the same credentials to send and receive messages to the EventHub using this library over AMQP protocol.
- Provided a promise based API to create senders/receivers off the `EventHubClient`.
- Added capability to send multiple messages by batching them together.
- Added capability to receive predefined number of messages for a specified amount of time. Note that this method will receive all the messages and return an array of EventData objects.
- Added capability to create an epoch receiver.
- Simplified the mechanism to specify the `EventPosition` from which to receive messages from the EventHub.
- Added proper TypeScript type definitions to the library that improves the intellisense experience for our customers.

## 2017-05-18 0.0.8
- Fixed a race condition within the AMQP redirection code when using an IoT Hub connection string.
- Disabled auto-retry of AMQP connections in amqp10 since the current client is not built to handle them and fails when retrying.

## 2017-03-31 0.0.7
- Pulled changes for #14 and #20/#21.
- Special thanks to @kurtb and @ali92hm for their contributions!

## 2017-01-13 0.0.6
- Added support for message properties in the EventData structure.