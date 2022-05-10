# Release History

## 5.8.0 (2022-05-10)

### Breaking Changes

- The `enableIdempotentPartitions` flag has been renamed to `enableIdempotentRetries`

## 5.8.0-beta.3 (2022-04-05)

### Breaking Changes
- `MessageWithMetadata` has been renamed to `MessageContent`.
- `MessageContent`'s `body` has been renamed to `data`.
- `MessageAdapter`'s `consumeMessage` and `produceMessage` have been renamed to `consume` and `produce`.

### Bugs Fixed
- The Uint8Array payload was being stringified first before it gets sent which caused the receiver to treat it as an object instead of a Uint8Array. This is now fixed and Uint8Array is being treated the same as a Buffer.
- The hashing algorithm used to map partition keys to IDs in the buffered producer is no longer sensitive to the endianness of the local machine [Issue #21190](https://github.com/Azure/azure-sdk-for-js/issues/21190).

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0). There are no changes from the previous beta; however, please see below for changes from the previous minor version:
  - Notable changes include Removal of `@opentelemetry/api` as a transitive dependency and ensuring that the active context is properly propagated.
  - Customers who would like to continue using OpenTelemetry driven tracing should visit our [OpenTelemetry Instrumentation](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk) package for instructions.

## 5.8.0-beta.2 (2022-03-11)

### Bugs Fixed

- `createEventDataAdapter` is updated so that `consumeMessage` returns the original binary payload instead of the Buffer representation of it.

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0-preview.14)
  - Notable changes include Removal of `@opentelemetry/api` as a transitive dependency and ensuring that the active context is properly propagated.
  - Customers who would like to continue using OpenTelemetry driven tracing should visit our [OpenTelemetry Instrumentation](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk) package for instructions.

## 5.8.0-beta.1 (2022-02-08)

### Features Added

- A new function `createEventDataAdapter` is exported that can convert an `EventData` to a simple message with `body` and `contentType` fields. This adapter can be used with the Avro encoder in `@azure/schema-registry-avro` starting from version 1.0.0-beta.6 to create `EventData` messages with Avro-encoded bodies.

- When publishing events to Event Hubs, timeouts or other transient failures may introduce ambiguity into the understanding of whether a batch of events was received by the service. To assist in this scenario, the option to publish events idempotently has been added to `EventHubBufferedProducerClient`. The functionality can be enabled by setting the `enableIdempotentPartitions` client option to `true`. If enabled, retries during publishing will attempt to avoid duplication with a minor cost to throughput. Duplicates are still possible but the chance of them occurring is much lower when idempotent retries are enabled. [PR #20156](https://github.com/Azure/azure-sdk-for-js/pull/20156)

## 5.7.0-beta.1 (2021-11-12)

### Features Added

- Added `EventHubBufferedProducerClient` with functionality to manage batching, concurrency, and sending of events implicitly. This abstracts the complexity away from applications regarding publishing events in an optimal fashion. See issue [#17699](https://github.com/Azure/azure-sdk-for-js/issues/17699) for more details.
- Added `skipParsingBodyAsJson` optional parameter to `EventHubConsumerClient.subscribe` method. When set to `true` it will disable the client from running `JSON.parse()` on the message body when receiving the message. Not applicable if the message was sent with AMQP body type `value` or `sequence`.

### Other Changes

- Prevent empty spans from being created when tracing is disabled. Fixes issue [#14063](https://github.com/Azure/azure-sdk-for-js/issues/14063)
- Updated to use the version `1.0.0-preview.13` of the `@azure/core-tracing` dependency.

## 5.6.0 (2021-07-07)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- Adds the `contentType`, `correlationId`, and `messageId` AMQP properties as top-level fields on `EventData` and `ReceivedEventData`.

- Enable encoding the body of a message to the 'value' or 'sequence' sections (via AmqpAnnotatedMessage.bodyType). Using this encoding is not required but does allow you to take advantage of native AMQP serialization for supported primitives or sequences.

  More information about the AMQP message body type can be found in the AMQP specification: [link](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#section-message-format)

## 5.5.2 (2021-06-10)

### Bug fixes

- Fixes issue [#13500](https://github.com/Azure/azure-sdk-for-js/issues/13500) where a `TypeError: Cannot read property '_process' of undefined` could be thrown in rare cases.

## 5.5.1 (2021-04-29)

- Fixes a race condition that would cause connection recovery to sometimes fail if a consumer or producer was closed at the same time a connection was disconnected.

- Fixes issue [#14606](https://github.com/Azure/azure-sdk-for-js/issues/14606) where the `EventHubConsumerClient` could call subscribe's `processError` callback with a "Too much pending tasks" error. This could occur if the consumer was unable to connect to the service for an extended period of time.

- Fixes issue [#15002](https://github.com/Azure/azure-sdk-for-js/issues/15002) where in rare cases an unexpected `TypeError` could be thrown from `EventHubProducerClient.sendBatch` when the connection was disconnected while sending events was in progress.

## 5.5.0 (2021-04-06)

- Updates the methods on the `CheckpointStore` interface to accept
  an optional `options` parameter that can be used to pass in an
  `abortSignal` and `tracingOptions`.

### New features:

- Allows passing `NamedKeyCredential` and `SASCredential` as the credential type to `EventHubConsumerClient` and `EventHubProducerClient`.
  These credential types support rotation via their `update` methods and are an alternative to using the `SharedAccessKeyName/SharedAccessKey` or `SharedAccessSignature` properties in a connection string.

### Tracing updates

- Tracing options for `EventDataBatch.tryAdd` now match the shape of `OperationOptions`.

## 5.4.0 (2021-02-09)

- Adds the `customEndpointAddress` field to `EventHubClientOptions`.
  This allows for specifying a custom endpoint to use when communicating
  with the Event Hubs service, which is useful when your network does not
  allow communicating to the standard Event Hubs endpoint.
  Resolves [#12901](https://github.com/Azure/azure-sdk-for-js/issues/12901).

- A helper method `parseEventHubConnectionString` has been added which validates and
  parses a given connection string for Azure Event Hubs.
  Resolves [#11894](https://github.com/Azure/azure-sdk-for-js/issues/11894)

- Re-exports `RetryMode` for use when setting the `RetryOptions.mode` field
  in `EventHubConsumerClientOptions` or `EventHubClientOptions`.
  Resolves [#13166](https://github.com/Azure/azure-sdk-for-js/issues/13166).

- Updates documentation for `EventData` to call out that the `body` field
  must be converted to a byte array or `Buffer` when cross-language
  compatibility while receiving events is required.

## 5.3.1 (2020-11-12)

- Fixes issue [#12278](https://github.com/Azure/azure-sdk-for-js/issues/12278)
  where the `processEvents` handler could ignore the `maxWaitTimeInSeconds`
  parameter after a disconnection.

## 5.3.0 (2020-09-08)

### New features:

- Adds `loadBalancingOptions` to the `EventHubConsumerClient` to add control around
  how aggressively the client claims partitions while load balancing.
  ([PR 9706](https://github.com/Azure/azure-sdk-for-js/pull/9706)).
- Support using the SharedAccessSignature from the connection string.
  ([PR 10951](https://github.com/Azure/azure-sdk-for-js/pull/10951)).

### Bug fixes:

- Fixes issue [#9704](https://github.com/Azure/azure-sdk-for-js/issues/9704)
  where events could be _skipped_ while receiving messages.
  Previously this could occur when a retryable error was encountered and retries were exhausted while receiving a batch of events.

### Tracing updates:

- Fixes issue [#10298](https://github.com/Azure/azure-sdk-for-js/issues/10298)
  where spans had inconsistent `peer.address` attributes by removing the scheme
  (i.e. `sb://`) from EventHub `peer.address` span attributes
- Addresses [#10276](https://github.com/Azure/azure-sdk-for-js/issues/10276): adds
  `message_bus.destination` and `peer.address` attributes to `Azure.EventHubs.message` spans.
  ([PR 10389](https://github.com/Azure/azure-sdk-for-js/pull/10389))

## 5.3.0-preview.1 (2020-07-07)

- Adds `loadBalancingOptions` to the `EventHubConsumerClient` to add control around
  how aggressively the client claims partitions while load balancing.
  ([PR 9706](https://github.com/Azure/azure-sdk-for-js/pull/9706))

## 5.2.2 (2020-06-30)

- Fixes issue [#9289](https://github.com/Azure/azure-sdk-for-js/issues/9289)
  where calling `await subscription.close()` inside of a subscription's `processError`
  handler would cause the subscription to deadlock.
- Fixes issue [#9083](https://github.com/Azure/azure-sdk-for-js/issues/9083)
  where calling `EventHubConsumerClient.close()` would not stop any actively
  running `Subscriptions`.
- Fixes issue [#8598](https://github.com/Azure/azure-sdk-for-js/issues/8598)
  where the EventHubConsumerClient would remain open in the background beyond
  when `subscription.close()` was called. This would prevent the process from
  exiting until the `maxWaitTimeInSeconds` (default 60) was reached.
- Updated to use the latest version of the `@azure/core-amqp` package.
  This update fixes issue [#9287](https://github.com/Azure/azure-sdk-for-js/issues/9287)
  where some failed operations would delay the process exiting.

## 5.2.1 (2020-06-08)

- Fixes issue [#8584](https://github.com/Azure/azure-sdk-for-js/issues/8584)
  where attempting to create AMQP links when the AMQP connection was in the
  process of closing resulted in a `TypeError` in an uncaught exception.
  ([PR 8884](https://github.com/Azure/azure-sdk-for-js/pull/8884))
- Fixes reconnection issues by creating a new connection object rather than re-using the existing one. ([PR 8884](https://github.com/Azure/azure-sdk-for-js/pull/8884))

### Tracing updates:

Tracing functionality is still in preview status and the APIs may have breaking
changes between patch and minor updates.

- Updates the `peer.address` attribute on "Azure.EventHubs.send" spans to refer
  to the fully qualified namespace instead of the endpoint.
  Fixes [#7109](https://github.com/Azure/azure-sdk-for-js/issues/7109)

- Adds a new attribute - `enqueuedTime` - to the links on "Azure.EventHubs.process" spans.
  `enqueuedTime` maps to the enqueuedTimeUtc field from received events, represented as
  Unix epoch time in milliseconds.
  Address [#7112](https://github.com/Azure/azure-sdk-for-js/issues/7112)

## 5.2.0 (2020-05-05)

- Updates the `EventHubProducerClient.sendBatch` API to accept an array of events.
  ([PR #8622](https://github.com/Azure/azure-sdk-for-js/pull/8622))
- Adds compatibility with TypeScript versions 3.1 through 3.6+.
  ([PR #8654](https://github.com/Azure/azure-sdk-for-js/pull/8654))
- Improves the performance of the `EventDataBatch.tryAdd` method.
  ([PR #8637](https://github.com/Azure/azure-sdk-for-js/pull/8637))

## 5.1.0 (2020-04-07)

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
  This update improves support for [bundling](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md) this library.
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
  Instead, pass an [Event Hubs-compatible connection string](https://docs.microsoft.com/azure/iot-hub/iot-hub-devguide-messages-read-builtin)
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
[Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).
For more information, please visit https://aka.ms/azsdk/releases/july2019preview

### Breaking changes

- Creating an instance of `EventHubClient` is now done using constructor overloads instead of static helpers.
  - If you previously used the `createFromTokenProvider` static helper to provide your own custom token provider,
    you will now need to update the provider to follow the new `TokenCredential` interface instead.
  - If you previously used the `@azure/ms-rest-nodeauth` library to provide AAD credentials, you will now need to use the new
    [@azure/identity](https://www.npmjs.com/package/@azure/identity) library instead.
- The send methods are moved from the `EventHubClient` class to the new `EventHubProducer` class.
  - Use the `createProducer()` function on the `EventHubClient` to create an instance of a `EventHubProducer`.
  - Each producer represents a dedicated AMQP sender link to Azure Event Hubs.
  - The `EventData` type used for the data being sent only supports a `body` for the content being sent and a
    `properties` bag to hold any custom metadata you want to send. The properties corresponding to a received event are
    removed from this type and a separate type ReceivedEventData is used for received events.
- The receive methods are moved from the `EventHubClient` class to the new `EventHubConsumer` class.
  - Use the `createConsumer()` function on the `EventHubClient` to create an instance of a `EventHubConsumer`.
  - Each consumer represents a dedicated AMQP receiver link to Azure Event Hubs based
    on the flavor of receive function being used i.e `receiveBatch()` that receives events in a batch vs `receive()` that provides
    a streaming receiver.
  - The static methods `EventPosition.fromStart()` and `EventPosition.fromEnd()` are renamed to `EventPosition.earliest()` and `EventPosition.latest()` respectively.
- Inspecting Event Hub
  - The methods `getHubRuntimeInformation()` and `getPartitionInformation()` on the `EventHubClient` are renamed to
    `getProperties()` and `getPartitionProperties()` respectively. Please refer to the return types of these functions
    to ensure you are using the right property names.

### New features

- You can now configure retry options that are used to govern retry attempts when a retryable error occurs. These can be
  set when creating the `EventHubClient`, `EventHubProducer` and `EventHubConsumer`
- You can now pass an abort signal to any of the async operations. This signal can be used to cancel such operations. Use
  the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to create such abort signals.
- An async iterator is now available to receive events after you create an instance of `EventHubConsumer`. Use the function
  `getEventIterator()` on the consumer to get a `AsyncIterableIterator` which you can then use in a loop or use it's `next()`
  function to receive events.

### Next Steps

- Refer to the `API reference documentation` to get an overview of the entire API surface.
- Refer to our [samples](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs/samples) to understand the usage of the new APIs.

## 2.1.0 (2019-06-10)

- Added support for WebSockets. WebSockets enable Event Hubs to work over an HTTP proxy and in environments where the standard AMQP port 5671 is blocked.
  Refer to the [websockets](https://github.com/Azure/azure-sdk-for-js/blob/@azure/event-hubs_2.1.0/sdk/eventhub/event-hubs/samples/websockets.ts) sample to see how to use WebSockets.
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
  is introduced for this scenario which you can see if you enable the [logs](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/eventhub/event-hubs/README.md#debug-logs).
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
- Documented different mechanisms of getting the debug logs in [README](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/eventhub/event-hubs//#debug-logs).
- Minimum dependency on `"rhea": "^0.2.18"`.
- Fixed bugs in recovery logic
- Added support to recover from session close for sender and receiver
- Added a new property `isConnecting` that provides information whether a linkEntity is currently in the process of establishing itself.
- Using `is_closed()` method of sender, receiver and session in rhea to determine whether the sdk initiated the close.
- MessagingError is retryable by default.
- Added support to translate node.js [`SystemError`](https://nodejs.org/api/errors.html#errors_class_systemerror) into AmqpError.
- Added a new static method `createFromTokenProvider()` on the EventHubClient where customers can provide their own [TokenProvider](https://github.com/Azure/azure-event-hubs-node/blob/v0.2.6-EH-August2018/client/lib/amqp-common/auth/token.ts#L42).

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
- and a new an optional property named `dataTransformer`. You can provide your own transformer. If not provided then we will use the [DefaultDataTransformer](https://github.com/Azure/azure-event-hubs-node/blob/v0.2.0-EH-May2018/client/lib/dataTransformer.ts). This should be applicable for majority of the scenarios and will ensure that messages are interoperable between different Azure services. It fixes issue #60.

## 0.1.2 (2018-04-26)

- Added missing dependency for `uuid` package and nit fixes in the README.md

## 0.1.1 (2018-04-24)

- Changing `client.receiveOnMessage()` to `client.receive()` as that is a better naming convention and is in sync with other language sdks.

## 0.1.0 (2018-04-23)

- Previously we were depending on [amqp10](https://npmjs.com/package/amqp10) package for the amqp protocol. Moving forward we will be depending on [rhea](https://npmjs.com/package/rhea).
- The public facing API of this library has major breaking changes from the previous version 0.0.8. Please take a look at the [Readme](https://github.com/Azure/azure-event-hubs-node/blob/v0.1.0-April2018/README.md) and the [examples](https://github.com/Azure/azure-event-hubs-node/tree/v0.1.0-April2018/examples) directory for detailed samples.
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
