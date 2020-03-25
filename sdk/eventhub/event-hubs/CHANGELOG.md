# Release History

## 5.1.0 (Unreleased)

- Addresses [issue #7801](https://github.com/Azure/azure-sdk-for-js/pull/7973) by moving known AMQP message properties to received events' `systemProperties`.
  ([PR #7973](https://github.com/Azure/azure-sdk-for-js/pull/7973))

## 5.0.2 (2020-03-09)

- Fixes an issue that caused the `getPartitionIds`, `getEventHubProperties`,
  and `getPartitionProperties` methods to throw an error when run against an
  Event Hub in Azure Stack due to missing security token on the outgoing request.
  ([PR #7463](https://github.com/Azure/azure-sdk-for-js/pull/7463))

## 5.0.1 (2020-02-11)

- Fixed a potential issue with deadlock where greedy consumers could
  starve out other consumers, preventing us from properly balancing.
- Fixed an issue where calling `subscription.close()` immediately
  after calling `subscribe` would cause events to still be read.
- Updated to use the latest version of the `@azure/core-amqp` package which in
  turn uses the latest version of the `rhea` package.
  This update improves support for [bundling](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/Bundling.md) this library.
  ([Pull Request](https://github.com/amqp/rhea/pull/274))

## 5.0.0 (2020-01-09)

- This release marks the general availability of the `@azure/event-hubs` package.
- Fixed potential issues with claims being mismanaged when subscriptions terminate.
- Improved reporting of errors that occur when attempting to claim partitions from CheckpointStores.
- Updated to use the latest version of the `@azure/core-amqp` package.
  This update allows the SDK to detect when a connection has gone idle for 60 seconds and attempt to reconnect.

### Breaking changes:

- Starting event positions are now passed in the `options` to the `subscribe()` method instead of using
  the `processInitialize()` callback.
- If no position is passed and no checkpoints are available for the partition,
  the `subscribe()` method will start receiving events that are queued after the method invocation.
  This is different from the last preview, where events were received from the beginning of the partition.
- The `MessagingError` class is updated to have the `code` property instead of `name` to contain the error
  type that the user can use to differentiate errors that can occur during communication with the service.
  The `name` property of this class will always have the value "MessagingError" and will not change based
  on the error type.
- System errors around network issues like ENOTFOUND, ECONNREFUSED will retain their `code` value even after
  getting converted to a `MessagingError` object and being passed to the user.

## 5.0.0-preview.7 (2019-12-03)

- Improves load-balancing capabilities to reduce the frequency that partitions are claimed by other running
  instances of `EventHubConsumerClient.subscribe` after all partitions are being read.
  ([PR #6294](https://github.com/Azure/azure-sdk-for-js/pull/6294))
- Updated to use OpenTelemetry 0.2 via `@azure/core-tracing`

### Breaking changes:

- CheckpointStore and consumer group are now passed to the EventHubConsumerClient
  constructor rather than being passed to subscribe().

## 5.0.0-preview.6 (2019-11-04)

- Updated to use the latest version of the `@azure/core-tracing` & `@azure/core-amqp` package.

### Breaking changes

`EventHubsClient` has been split into two separate clients: `EventHubProducerClient` and `EventHubConsumerClient`

The `EventHubConsumerClient` provides several overloads for `subscribe` which all take event handlers rather than
requiring an `EventProcessor`. There are no longer any methods that directly return `ReceivedEventData` - all
receiving is done via event handlers.

The `EventHubProducerClient` has standardized on only providing sending via `sendBatch`.

Construction of both objects is the same as it was for the previous client.

## 5.0.0-preview.5 (2019-10-08)

- Updated to use the latest version of the `@azure/core-tracing` package.

## 5.0.0-preview.4 (2019-10-07)

- Current implementation of the Partition Manager takes the event hub name, consumer group name and partition id to ensure uniqueness for the checkpoint and ownership.
  Since the same event hub name and consumer group name can exist in another namespace, we added `fullyQualifiedNamespace` as well to ensure uniqueness.
  ([PR #5153](https://github.com/Azure/azure-sdk-for-js/pull/5153))
- Adds preview capabilities for `@azure/core-tracing`.
  ([PR #5207](https://github.com/Azure/azure-sdk-for-js/pull/5207)

### Breaking changes

- Removed the `createFromIotHubConnectionString` method from `EventHubClient`. ([PR #5311](https://github.com/Azure/azure-sdk-for-js/pull/5311)).
  Instead, pass an [Event Hubs-compatible connection string](https://docs.microsoft.com/en-us/azure/iot-hub/iot-hub-devguide-messages-read-builtin)
  when instantiating an `EventHubClient` to read properties or events from an IoT Hub.

  Previously:

  ```javascript
  const client = await EventHubClient.createFromIotHubConnectionString(iotConnectionString);
  ```

  Current:

  ```javascript
  const client = new EventHubClient(iotEventHubsCompatibleConnectionString);
  ```

- The `PartitionContext` properties have been merged into the `PartitionProcessor` class.
  The `PartitionProcessor` now exposes an `updateCheckpoint` method that can be called to checkpoint events.

## 5.0.0-preview.3 (2019-09-09)

### Features

- Adds load-balancing capabilities to `EventProcessor`. `EventProcesor` will use the data from `PartitionManager` to regulate how many partitions it should read from.
  ([PR #4839](https://github.com/Azure/azure-sdk-for-js/pull/4839)).
- Adds `lastEnqueuedEventInfo` property on `EventHubConsumer`. When the consumer is created with `trackLastEnqueuedEventInfo` set to `true`, the `lastEnqueuedEventInfo`
  field is updated everytime a message is received and provides details about the last enqueued event in the partition the `EventHubConsumer` is reading from.
  ([PR #5036](https://github.com/Azure/azure-sdk-for-js/pull/5036))
- Received event data will now expose `systemProperties` for message annotations set by the service. ([PR #5008](https://github.com/Azure/azure-sdk-for-js/pull/5008)).
- Improved error messages when constructing an `EventHubClient` with an invalid connection string and Event Hub name combo. ([PR #4899](https://github.com/Azure/azure-sdk-for-js/pull/4899)).
- Adds client-side type-checking for `EventPosition` static helper methods. ([PR #5052](https://github.com/Azure/azure-sdk-for-js/pull/5052)).

### Breaking changes

- The `PartitionProcessor` interface is now a class with default implementations of `initialize`, `close`, `processEvents`, and `processError`.
  ([PR #4994](https://github.com/Azure/azure-sdk-for-js/pull/4994)).
  - Users should extend the `PartitionProcessor` class and override any of the methods that need custom logic.
  - All 4 methods now accept `PartitionContext` as the last parameter.
    `PartitionContext` contains information about the partition being processed, as well as the `updateCheckpoint` method that can be used to persist a checkpoint.
- The `EventProcessor` constructor was changed to no longer accept a `PartitionProcessorFactory` function that returns a `PartitionProcessor`.
  Instead, users should extend the `PartitionProcessor` class and pass the class (not an instance of the class) to the `EventProcessor` constructor.
  ([PR #4994](https://github.com/Azure/azure-sdk-for-js/pull/4994)).

## 5.0.0-preview.2 (2019-08-06)

### General

- The sender is refactored to avoid the warning around too may listeners being attached which would occur before if too many send requests were in flight at the same time from the same sender.
- The receiver is refactored to allow the same underlying AMQP link to be shared between streaming and batching mode. This results in seamless transition between the three different receive methods on the `EventHubConsumer`
- All time related entites have been updated to use milli seconds as the unit of time for consistency.
- New error `InsufficientCreditError` is introduced for the scenario where [rhea](https://www.npmjs.com/package/rhea) is unable to send events due to its internal buffer being full. This is a transient error and so is treated as retryable.
- The error `OperationTimeoutError` was previously mistakenly classified as an AMQP error which is now corrected. Since this can also be a transient error, it is treated as retryable.

### Publishing events

- Added method `createBatch()` on the `EventHubProducer` to create an `EventDataBatch` that can then be used to add events until the maximum size is reached.
  - This batch object can then be used in the `send()` method to send all the added events to Event Hubs.
  - This allows publishers to build batches without the possibility of encountering the error around the message size exceeding the supported limit when sending events.
  - It also allows publishers with bandwidth concerns to control the size of each batch published.

### Consuming events

- Introduced a new class `EventProcessor` which replaces the older concept of [Event Processor Host](https://www.npmjs.com/package/@azure/event-processor-host).
  - This early preview is intended to allow users to test the new design using a single instance of `EventProcessor`. The ability to store checkpoints to a durable store will be added in future updates

### Retries and timeouts

- The properties on the `RetryOptions` interface have been renamed for ease of use.
- New property `timeoutInMs` on `RetryOptions` to configure the time to wait before declaring an attempt to have failed with `OperationTimeoutError` error which is retryable.
- New properties `mode` and `maxRetryDelayInMs` on `RetryOptions` to configure the exponential retry mode that is now supported

## 5.0.0-preview.1 (2019-06-28)

Version 5.0.0-preview.1 is a preview of our efforts to create a client library that is user friendly and
idiomatic to the Javascript ecosystem. The reasons for most of the changes in this update can be found in the
[Azure SDK Design Guidelines for TypeScript](https://azuresdkspecs.z5.web.core.windows.net/TypeScriptSpec.html).
For more information, please visit https://aka.ms/azure-sdk-preview1-js

### Breaking changes

- Creating an instance of [EventHubClient](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubclient.html)
  is now done using construtor overloads instead of static helpers. - If you previously used the `createFromTokenProvider` static helper to provide your own custom token provider,
  you will now need to update the provider to follow the new `TokenCredential` interface instead. - If you previously used the `@azure/ms-rest-nodeauth` library to provide AAD credentials, you will now need to use the new
  [@azure/identity](https://www.npmjs.com/package/@azure/identity) library instead.
- The send methods are moved from the `EventHubClient` class to the new [EventHubProducer](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubproducer.html) class.
  - Use the [createProducer()](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubclient.html#createproducer)
    function on the `EventHubClient` to create an instance of a `EventHubProducer`.
  - Each producer represents a dedicated AMQP sender link to Azure Event Hubs.
  - The [EventData](https://azure.github.io/azure-sdk-for-js/event-hubs/interfaces/eventdata.html) type used for
    the data being sent only supports a `body` for the content being sent and a
    `properties` bag to hold any custom metadata you want to send. The properties corresponding to a received event are
    removed from this type and a separate type [ReceivedEventData](https://azure.github.io/azure-sdk-for-js/event-hubs/interfaces/receivedeventdata.html)
    is used for received events.
- The receive methods are moved from the `EventHubClient` class to the new [EventHubConsumer](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubconsumer.html) class.
  - Use the [createConsumer()](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubclient.html#createconsumer)
    function on the `EventHubClient` to create an instance of a `EventHubConsumer`.
  - Each consumer represents a dedicated AMQP receiver link to Azure Event Hubs based
    on the flavor of receive function being used i.e `receiveBatch()` that receives events in a batch vs `receive()` that provides
    a streaming receiver.
  - The static methods `EventPosition.fromStart()` and `EventPosition.fromEnd()` are renamed to `EventPosition.earliest()` and `EventPosition.latest()` respectively.
- Inspecting Event Hub
  - The methods `getHubRuntimeInformation()` and `getPartitionInformation()` on the `EventHubClient` are renamed to
    [getProperties()](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubclient.html#getproperties) and
    [getPartitionProperties()](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubclient.html#getpartitionproperties)
    respectively. Please refer to the return types of these functions to ensure you are using the right property names.

### New features

- You can now configure retry options that are used to govern retry attempts when a retryable error occurs. These can be
  set when creating the `EventHubClient`, `EventHubProducer` and `EventHubConsumer`
- You can now pass an abort signal to any of the async operations. This signal can be used to cancel such operations. Use
  the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to create such abort signals.
- An async iterator is now available to receive events after you create an instance of `EventHubConsumer`. Use the function
  [getEventIterator()](https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubconsumer.html#geteventiterator) on the consumer to get a `AsyncIterableIterator` which you can then use in a loop or use it's `next()` function to receive events.

### Next Steps

- Refer to the [API reference documentation](https://azure.github.io/azure-sdk-for-js/event-hubs/index.html) to get
  an overview of the entire API surface.
- Refer to our [samples](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/eventhub/event-hubs/samples) to understand the usage of the new APIs.

## 2.1.0 (2019-06-10)

- Added support for WebSockets. WebSockets enable Event Hubs to work over an HTTP proxy and in environments where the standard AMQP port 5671 is blocked.
  Refer to the [websockets](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/eventhub/event-hubs/samples/websockets.ts) sample to see how to use WebSockets.
- `@types/async-lock` has been moved to being a dependency from a dev-dependency. This fixes the [bug 3240](https://github.com/Azure/azure-sdk-for-js/issues/3240)

## 2.0.0 (2019-03-26)

### Breaking Changes

- If you have been using the `createFromAadTokenCredentials` function to create an instance of the
  `EventHubClient`, you will now need to use the [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth)
  library instead of [ms-rest-azure](https://www.npmjs.com/package/ms-rest-azure) library to create
  the credentials that are needed by the `createFromAadTokenCredentials` function. - Typescript: Replace `import * from "ms-rest-azure";` with `import * from "@azure/ms-rest-nodeauth";` - Javascript: Replace `require("ms-rest-azure")` with `require("@azure/ms-rest-nodeauth")`
- If you have been passing a non string value in the `partitionKey` property on the message when
  sending it using the `EventHubClient`, an error will now be thrown. This property only supports string values.

### Bug fixes and other changes

- A network connection lost error is now treated as retryable error. A new error with name `ConnectionLostError`
  is introduced for this scenario which you can see if you enable the [logs](https://github.com/Azure/azure-sdk-for-js/sdk/eventhub/event-hubs/README.md#debug-logs).
- When recovering from an error that caused the underlying AMQP connection to get disconnected,
  [rhea](https://github.com/amqp/rhea/issues/205) reconnects all the older AMQP links on the connection
  resulting in the below 2 errors in the logs. We now clear rhea's internal map to avoid such reconnections.
  We already have code in place to create new AMQP links to resume send/receive operations. - InvalidOperationError: A link to connection '.....' \$cbs node has already been opened. - UnauthorizedError: Unauthorized access. 'Listen' claim(s) are required to perform this operation.
- Enabled the `esModuleInterop` compilerOption in the `tsconfig.json` file for this library to be
  compliant with the [best practices](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-7.html#support-for-import-d-from-cjs-form-commonjs-modules-with---esmoduleinterop).

## 1.0.8 (2018-12-14)

- Use `isItselfClosed()` instead of `isClosed()` in rhea to correctly determine if the sdk initiated close on receiver/sender.
  This ensures that on connection issues like the ECONNRESET error, the receivers get re-connected properly thus fixing the [bug 174](https://github.com/Azure/azure-event-hubs-node/issues/174)

## 1.0.7 (2018-10-25)

- Only set `message_id` while sending the message, when provided by caller [PR](https://github.com/Azure/azure-event-hubs-node/pull/169).

## 1.0.6 (2018-10-01)

- export `EventHubConnectionConfig` from the library.

## 1.0.5 (2018-10-01)

- Moved `lib/amqp-common` to `"@azure/amqp-common"` package and took a dependency on it.
- Moved `lib/rhea-promise` to `"rhea-promise"` package and took a dependency on it.
- Fixed issues where the private instance of `rhea receiver or sender` were undefined when `*_open`
  and `*_close` events happened instantaneously.

## 1.0.4 (2018-09-26)

- update the version of ms-rest-azure to "2.5.9"

## 1.0.3 (2018-09-19)

- `EventPosition.fromSequenceNumber()` accepts `0` as a valid argument.
- `client.receive()` and `client.receiveBatch()` accept partitionId as a `string | number`.
- User's error handler in `client.receive()` will only be notified if the user did not close the receiver and the error is not retryable.

## 1.0.2 (2018-09-14)

- `client.getPartitionInformation()` should works as expected when partitionId is of type `number | string`.

## 1.0.1 (2018-09-12)

- Stable version of the libray.

## 0.2.10 (2018-09-11)

- Added support to provide custom user-agent string that will be appended to the default user agent string.

## 0.2.9 (2018-09-11)

- Updated examples and content in README.md

## 0.2.8 (2018-08-31)

- Fixed [issue](https://github.com/Azure/azure-event-hubs-node/issues/135)
  - Added error handlers to the \$management sender/receiver links.
  - Added error handlers to the amqp session of the $management and $cbs sender/receiver links.
- Exported `AadTokenProvider` and `SasTokenProvider` from the client.

## 0.2.7 (2018-08-29)

- Improved logging statements to the connection context.
- Added timeout to promisifed creation/closing of rhea sender, receiver, session, connection.
- Fixed a bug in the EventData deserialization logic by checking for `!= undefined` check rather than the `!` check.
- While handling disconnects we retry for 150 times at an interval of 15 seconds as long the error is `retryable`.

## 0.2.6 (2018-08-07)

- Improved log statements.
- Documented different mechanisms of getting the debug logs in [README](https://github.com/Azure/azure-sdk-for-js/tree/master/eventhub/event-hubs/#debug-logs).
- Minimum dependency on `"rhea": "^0.2.18"`.
- Fixed bugs in recovery logic
- Added support to recover from session close for sender and receiver
- Added a new property `isConnecting` that provides information whether a linkEntity is currently in the process of establishing itself.
- Using `is_closed()` method of sender, receiver and session in rhea to determine whether the sdk initiated the close.
- MessagingError is retryable by default.
- Added support to translate node.js [`SystemError`](https://nodejs.org/api/errors.html#errors_class_systemerror) into AmqpError.
- Added a new static method `createFromTokenProvider()` on the EventHubClient where customers can provide their own [TokenProvider](https://github.com/Azure/azure-event-hubs-node/blob/master/client/lib/amqp-common/auth/token.ts#L42).

## 0.2.5 (2018-07-17)

- Improved log statements
- Updated README.md
- Updated dependency rhea to "^0.2.16" instead of github dependency.

## 0.2.4 (2018-07-16)

- Added support to handle disconnects and link timeout errors.
- Fixed client examples link in README.
- Updated issue templates
- Improvised the example structure
- Moved the common stuff to `amqp-common` and added `Connection`, `Session`, `Sender`, `Receiver` objects to `rhea-promise`.
- Improved tsconfig.json and tslint.json config files.
- Added `import "mocha"` to all the test files, inorder to get rid of red squiggles in vscode.
- Replaced crypto with jssha which is browser compatible

## 0.2.3 (2018-06-13)

- Minor doc fixes and sample updates.
- Add a listener for the disconnected event after opening the connection.

## 0.2.2 (2018-05-23)

- Fixed the partitionkey issue while sending events. #73.
- Bumped the minimum dependency on rhea to 0.2.13. This gives us type definitions for rhea.
- rpc.open() returns the connection object. This makes it easy to extract common functionality to a
  separate library.

## 0.2.1 (2018-05-09)

- Added support to create EventHubClient from an IotHub connectionstring. The following can be done

```javascript
const client = await EventHubClient.createFromIotHubConnectionString(
  process.env.IOTHUB_CONNECTION_STRING
);
```

- Internal design changes:
  - ManagementClient also does cbs auth before making the management request.
  - EventHubSender, EventHubReceiver, ManagementClient inherit from a base class ClientEntity.
  - Moved opening the connection to CbSClient as that is the first thing that should happen after opening the connection. This reduces calls to `rpc.open()` all over the sdk and puts them at one place in the `init()` method on the CbsClient.

## 0.2.0 (2018-05-02)

- Added functionality to encode/decode the messages sent and received.
- Created an options object in the `client.createFromConnectionString()` and the `EventHubClient` constructor. This is a breaking change. However moving to an options object design reduces the chances of breaking changes in the future.
  This options object will:
- have the existing optional `tokenProvider` property
- and a new an optional property named `dataTransformer`. You can provide your own transformer. If not provided then we will use the [DefaultDataTransformer](./client/lib/dataTransformer.ts). This should be applicable for majority of the scenarios and will ensure that messages are interoperable between different Azure services. It fixes issue #60.

## 0.1.2 (2018-04-26)

- Added missing dependency for `uuid` package and nit fixes in the README.md

## 0.1.1 (2018-04-24)

- Changing `client.receiveOnMessage()` to `client.receive()` as that is a better naming convention and is in sync with other language sdks.

## 0.1.0 (2018-04-23)

- Previously we were depending on [amqp10](https://npmjs.com/package/amqp10) package for the amqp protocol. Moving forward we will be depending on [rhea](https://npmjs.com/package/rhea).
- The public facing API of this library has major breaking changes from the previous version 0.0.8. Please take a look at the [Readme](./README.md) and the [samples](./samples) directory for detailed samples.
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

## 0.0.8 (2017-05-18)

- Fixed a race condition within the AMQP redirection code when using an IoT Hub connection string.
- Disabled auto-retry of AMQP connections in amqp10 since the current client is not built to handle them and fails when retrying.

## 0.0.7 (2017-03-31)

- Pulled changes for #14 and #20/#21.
- Special thanks to @kurtb and @ali92hm for their contributions!

## 0.0.6 (2017-01-13)

- Added support for message properties in the EventData structure.
