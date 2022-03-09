# Release History

## 7.5.1 (2022-03-08)

### Bugs Fixed

- Fix an issue where we don't respect user request to close the receiver if the connection is disconnected when using the `subscribe()` method. [PR #20427](https://github.com/Azure/azure-sdk-for-js/pull/20427)

## 7.5.0 (2022-02-14)

### Features Added

- Add `state` property to `ServiceBusReceivedMessage`. Its value is one of `"active"`, `"deferred"`, or `"scheduled"`. [PR #18938](https://github.com/Azure/azure-sdk-for-js/pull/18938)
- Add optional boolean `skipParsingBodyAsJson` property to `ServiceBusReceiverOptions` and `ServiceBusSessionReceiverOptions`. By default, the client attempts to parse message body as JSON object, and this new parameter controls whether the client should skip performing this parsing. [PR #18692](https://github.com/Azure/azure-sdk-for-js/pull/18692)

### Bugs Fixed

- The `processError` callback to `subscribe()` was previously called only for errors on setting up the receiver, errors on message settlement or message lock renewal and not for errors on AMQP link or session. This is now fixed. [PR #19189](https://github.com/Azure/azure-sdk-for-js/pull/19189)
- Fix an issue where we don't respect retry options before starting the next retry cycle when using the `subscribe()` method. [PR #20316](https://github.com/Azure/azure-sdk-for-js/pull/20316)

## 7.4.0 (2021-11-08)

### Features Added

- Allowing the service API version to be configurable when using `ServiceBusAdministrationClient` as part of the constructor client options.
  Supported versions being "2021-05" and "2017-04".
  [#18254](https://github.com/Azure/azure-sdk-for-js/pull/18254)

### Bugs Fixed

- Resolves an issue ([#17932](https://github.com/Azure/azure-sdk-for-js/issues/17932)) of receivers not being closed correctly when service bus client is closed.

## 7.4.0-beta.1 (2021-10-04)

### Features Added

- Adds new get/set property `maxMessageSizeInKilobytes` to `QueueProperties`, `TopicProperties`, `CreateQueueOptions`, and `CreateTopicOptions`. Only applicable for premium namespaces. Use this when creating or updating queues and topics. Added in [#17953](https://github.com/Azure/azure-sdk-for-js/pull/17953)

## 7.3.0 (2021-07-07)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated our internal core package dependencies to their latest versions in order to add support for Opentelemetry 1.0.0 which is compatible with the latest versions of our other client libraries.
- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features

### Key Bugs Fixed

- Fixed a bug that could lead to message loss in certain conditions when using `receiver.receiveMessages()`.
  [PR#15989](https://github.com/Azure/azure-sdk-for-js/pull/15989)

### Fixed

- Fixing an issue where the internal link cache would not properly remove closed links.
  [PR#15929](https://github.com/Azure/azure-sdk-for-js/pull/15929)

## 7.2.0 (2021-06-10)

### New Features

- Enable encoding the body of a message to the 'value' or 'sequence' sections (via AmqpAnnotatedMessage.bodyType). Using this encoding is not required but does allow you to take advantage of native AMQP serialization for supported primitives or sequences.

  More information about the AMQP message body type can be found in the AMQP specification: [link](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#section-message-format)

- Improves cancellation support when sending messages or initializing a connection to the service.
  Resolves [#15311](https://github.com/Azure/azure-sdk-for-js/issues/15311) and [#13504](https://github.com/Azure/azure-sdk-for-js/issues/13504).

### Bug fixes

- ServiceBusSender could throw an error (`TypeError: Cannot read property 'maxMessageSize' of undefined`) if a link was being restarted while calling sendMessages().
  [PR#15409](https://github.com/Azure/azure-sdk-for-js/pull/15409)
- Fixes issue [#13500](https://github.com/Azure/azure-sdk-for-js/issues/13500) where a `TypeError: Cannot read property '_process' of undefined` could be thrown in rare cases.

## 7.2.0-beta.1 (2021-05-18)

### New Features

- Enable encoding the body of a message to the 'value' or 'sequence' sections (via AmqpAnnotatedMessage.bodyType). Using this encoding is not required but does allow you to take advantage of native AMQP serialization for supported primitives or sequences.

## 7.1.0 (2021-05-11)

### New Features

- Adds support for passing `NamedKeyCredential` as the credential type to `ServiceBusClient` and `ServiceBusAdminstrationClient`. Also adds support for passing `SASCredential` to `ServiceBusClient`.
  These credential types support rotation via their `update` methods and are an alternative to using the `SharedAccessKeyName/SharedAccessKey` or `SharedAccessSignature` properties in a connection string.
  Resolves [#11891](https://github.com/Azure/azure-sdk-for-js/issues/11891).

### Bug fixes

- [Bug Fix] `expiresAtUtc` is `Invalid Date` in the received message when the ttl is not defined. Has been fixed in [#13543](https://github.com/Azure/azure-sdk-for-js/pull/13543)
- Some of the queue properties such as "forwardTo" and "autoDeleteOnIdle" were not being set as requested through the `ServiceBusAdministrationClient.createQueue` method because of a bug w.r.t the ordering of XML properties. The issue has been fixed in [#14692](https://github.com/Azure/azure-sdk-for-js/pull/14692).
- Settling messages now use the `retryOptions` passed to `ServiceBusClient`, making it more resilient against network failures.
  [PR#14867](https://github.com/Azure/azure-sdk-for-js/pull/14867)
- Fixes an issue where receiver link recovery/creation could fail, resulting in a receiver that was no longer receiving messages.
  [PR#15098](https://github.com/Azure/azure-sdk-for-js/pull/15098)

## 7.0.5 (2021-04-06)

### Bug fixes

- Some of the queue properties such as "forwardTo" and "autoDeleteOnIdle" were not being set as requested through the `ServiceBusAdministrationClient.createQueue` method because of a bug with regards to the ordering of XML properties. The issue has been fixed in [#14692](https://github.com/Azure/azure-sdk-for-js/pull/14692).

## 7.0.4 (2021-03-31)

### Bug fixes

- `ServiceBusSessionReceiver.receiveMessages` and `ServiceBusSessionReceiver.subscribe` methods are updated to handle errors on the AMQP connection like a network disconnect in [#13956](https://github.com/Azure/azure-sdk-for-js/pull/13956). Previously, these methods only handled errors on the AMQP link or session.

  - This previously resulted in the promise returned by the `receiveMessages` method never getting fulfilled and the `subscribe` method not calling the user provided error handler.
  - The `receiveMessages` method will now throw `SessionLockLostError` when used in `peekLock` mode and return messages collected so far when used in `receiveAndDelete` mode to avoid data loss if errors on the AMQP connection are encountered.
  - When using the `subscribe`, the user provided `processError` callback will now be called with `SessionLockLostError` if errors on the AMQP connection are encountered.

- Allow null as a value for the properties in `ServiceBusMessage.applicationProperties`.
  Fixes [#14329](https://github.com/Azure/azure-sdk-for-js/issues/14329)
- Re-exports `RetryMode` for use when setting the `RetryOptions.mode` field
  in `ServiceBusClientOptions`.
  Resolves [#13166](https://github.com/Azure/azure-sdk-for-js/issues/13166).

### Tracing updates

- Tracing options for `ServiceBusMessageBatch.tryAdd` now match the shape of `OperationOptions`.

## 7.0.3 (2021-01-26)

- [Bug Fix] Uncaught error "OperationTimeoutError" thrown inside a setTimeout can potentially cause the program to crash.
  Fixed in [#13264](https://github.com/Azure/azure-sdk-for-js/pull/13264)
- [Bug Fix] Response from the `ServiceBusAdministrationClient.getSubscriptionRuntimeProperties()` method had the message count properties to be zero.
  The bug has been fixed in [#13229](https://github.com/Azure/azure-sdk-for-js/pull/13229)
- [Bug Fix] Fixed a race condition where the `ServiceBusReceiver.receiveMessages` might lose messages and not return any if triggered right after the recovery from a network disruption.
  The same race condition could also have led to an OperationTimeout error if attempted the message settlement.
  [#13374](https://github.com/Azure/azure-sdk-for-js/pull/13374)

## 7.0.2 (2021-01-13)

- [Bug Fix] Receiving messages from sessions in "receiveAndDelete" mode using the `subscribe()` method stops after receiving 2048 of them and leaves the receiver not responding. The bug has been fixed in [PR 13178](https://github.com/Azure/azure-sdk-for-js/pull/13178). Also fixes the same issue that is seen with the `receiveMessages` API when large number of messages are requested or if the API is called in a loop.

## 7.0.1 (2021-01-11)

- Fix the `isNode` check to allow the package to be usable in Electron. [Bug 12983](https://github.com/Azure/azure-sdk-for-js/issues/12983)
- Fix issue where receiveMessages might return fewer messages than were received, causing them to be potentially locked or lost.
  [PR 12772](https://github.com/Azure/azure-sdk-for-js/pull/12772)
  [PR 12908](https://github.com/Azure/azure-sdk-for-js/pull/12908)
  [PR 13073](https://github.com/Azure/azure-sdk-for-js/pull/13073)
- Updates documentation for `ServiceBusMessage` to call out that the `body` field
  must be converted to a byte array or `Buffer` when cross-language
  compatibility while receiving events is required.
- [Bug Fix] Correlation Rule Filter with the "label" set using the `createRule()` method doesn't filter the messages to the subscription.
  The bug has been fixed in [PR 13069](https://github.com/Azure/azure-sdk-for-js/pull/13069), also fixes the related issues where the messages are not filtered when a subset of properties are set in the correlation filter.

## 7.0.0 (2020-11-23)

- This release marks the general availability of the `@azure/service-bus` package.
- If you are using version 1.1.10 or lower and want to migrate to the latest version
  of this package please look at our [migration guide to move from Service Bus V1 to Service Bus V7](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/migrationguide.md)

### Breaking changes

**Note:** The following breaking changes are with respect to version `7.0.0-preview.8`.
If migrating from version 1.1.10 or lower, look at our [migration guide to move from Service Bus V1 to Service Bus V7](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/migrationguide.md).

- The `ServiceBusError.reason` field has been renamed `ServiceBusError.code`.
  The `code` field can be used to differentiate what caused a `ServiceBusError` to be thrown.
- Numbers passed in `applicationProperties` of the correlation rule filter and `sqlParameters` under SQLRuleFilter will now be serialized as "double"(used to be "int") while sending the requests. The "double" and "int" values in the response will now be deserialized as "number"("double" wasn't supported before).
  [PR 12349](https://github.com/Azure/azure-sdk-for-js/pull/12349)
- `ServiceBusAdministrationClient.createSubscription` now supports configuring default rule at the time of creating the subscription.
  [PR 12495](https://github.com/Azure/azure-sdk-for-js/pull/12495)
- `_amqpAnnotatedMessage` under `ServiceBusReceivedMessage` has been renamed to `_rawAmqpMessage`.
  [PR 12635](https://github.com/Azure/azure-sdk-for-js/pull/12635)
- `claimValue` property under `AuthorizationRule` has been removed since it is not settable.
  [PR 12608](https://github.com/Azure/azure-sdk-for-js/pull/12608)
- `ServiceBusSender.open()` method has been removed in favor of adding it back in the future with better semantics
  [PR 12608](https://github.com/Azure/azure-sdk-for-js/pull/12608)

## 7.0.0-preview.8 (2020-11-04)

### New features:

- A helper method `parseServiceBusConnectionString` has been added which validates and parses a given connection string for Azure Service Bus. You can use this to extract the namespace and entityPath details from the connection string.
  [PR 11949](https://github.com/Azure/azure-sdk-for-js/pull/11949)
- All methods that take an array as input are updated to ensure they gracefully do a no-op rather than throw errors. For example: `receiveDeferredMessages()`, `scheduleMessages()` and `cancelScheduledMessages()`.
- Tracing, using [@azure/core-tracing](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-tracing/README.md), has been added for sending and receiving of messages.
  [PR 11651](https://github.com/Azure/azure-sdk-for-js/pull/11651)
  and
  [PR 11810](https://github.com/Azure/azure-sdk-for-js/pull/11810)
- Internal improvement - For the operations depending on `$management` link such as peek or lock renewals, the listeners for the "sender_error" and "receiver_error" events were added to the link for each new request made before the link is initialized which would have resulted in too many listeners and a warning such as `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 sender_error listeners added to [Sender]. Use emittr.setMaxListeners() to increase limit`(same for `receiver_error`). This has been improved such that the listeners are reused.
  [PR 11738](https://github.com/Azure/azure-sdk-for-js/pull/11738)

### Breaking changes

- The `processError` passed to `Receiver.subscribe` now receives a `ProcessErrorArgs` instead of just an error. This parameter provides additional context that can make it simpler to distinguish
  errors that were thrown from your callback (via the `errorSource` member of `ProcessErrorArgs`) as well as giving you some information about the entity that generated the error.
  [PR 11927](https://github.com/Azure/azure-sdk-for-js/pull/11927)
- The methods to complete, abandon, defer and deadletter a message along with the method to renew message lock have been moved from the message to the receiver. With this, we now have additional validation to ensure that a peeked message cannot be used with these methods.
- Method and interface renames based on user studies and internal reviews:

  - The word "Message" is added to all methods and interfaces related to creating and sending a batch of messages for clarity based on user studies:
    - The `createBatch` method on the sender is renamed to `createMessageBatch`.
    - The interface `CreateBatchOptions` followed by the options that are passed to the `createBatch` method is renamed to `CreateMessageBatchOptions`.
    - The `tryAdd` method on the message batch object is renamed to `tryAddMessage`.
  - Renames to `ServiceBusMessage` and `CorrelationRuleFilter` fields to better align with the AMQP spec:
    - "properties" renamed to "applicationProperties".
  - "label" renamed to "subject".
  - The interface `CreateReceiverOptions` followed by options that are passed to `ServiceBusClient.createReceiver` method is renamed to `ServiceBusReceiverOptions`.
  - The interface `AcceptSessionOptions` followed by options that are passed to `ServiceBusClient` `acceptSession` and `acceptNextSession` methods is renamed to `ServiceBusSessionReceiverOptions`.
  - The property `maxAutoRenewLockDurationInMs` of interface `ServiceBusSessionReceiverOptions` is renamed to `maxAutoLockRenewalDurationInMs` to be consistent with a similar option for renewing messages.
  - The property `subQueue` in the options passed to the `createReceiver()` method is renamed to `subQueueType` to reflect that the value is restricted and not meant to contain any queue names. The corresponding type `SubQueue` is removed in favor of inlining the string literals that represent valid values.

- `SqlRuleFilter` interface "sqlExpression" changed from optional to required.
- `ServiceBusSender.scheduleMessages` method signature updated: `scheduledEnqueueTimeUtc` and `messages` parameters are swapped as the messages are the primary object that is being worked with.
- `NamespaceProperties` interface property "messageSku" type changed from "string" to string literal type "Basic" | "Premium" | "Standard" to reflect the limited types it supports.
- `NamespaceProperties` interface property "namespaceType" has been removed as it does not provide any value.
- Interfaces corresponding to the returned responses from the methods under the `ServiceBusAdministrationClient` such as `NamespacePropertiesResponse`, `QueueResponse`, `TopicRuntimePropertiesResponse` have been removed in favor of using generic type `WithResponse<T>` for a cleaner API surface.
  [PR 10491](https://github.com/Azure/azure-sdk-for-js/pull/10491)
- Updated the `update{Entity}` methods under `ServiceBusAdministrationClient` with relevant param names and types, more docs.
  [PR 12013](https://github.com/Azure/azure-sdk-for-js/pull/12013)
- The raw responses(`_response`) in the returned objects from any of the methods under the `ServiceBusAdministrationClient` have been updated to return only the `{request, status, headers}`, properties such as `parsedHeaders`, `parsedBody` have been removed.
  [PR 12015](https://github.com/Azure/azure-sdk-for-js/pull/12015)
- `viaPartitionKey` property of interface `ServiceMessageBus` has been removed until we implement the [Transactions feature of Service Bus](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-transactions).
- Removed `AmqpAnnotatedMessage`, `AmqpMessageHeaders`, `AmqpMessageProperties` interfaces in favour of the ones from `@azure/core-amqp`. This is part of the move from `@azure/core-amqp` version update from 1.1.x to 2.0.0-beta.y. As part of this, `userId` will not be made available as part of `AmqpMessageProperties` until its type is fixed in the upstream `rhea` library.
  [PR 12091](https://github.com/Azure/azure-sdk-for-js/pull/12091)

## 7.0.0-preview.7 (2020-10-07)

- [Bug Fix] `sendMessages` method on the sender would have previously thrown an error for sending a batch or an array of messages upon a network disconnect, the issue has been fixed now.
  [PR 11651](https://github.com/Azure/azure-sdk-for-js/pull/11651/commits/f262e4562eb78828ee816a54f9a9778692e0eff9)

### New features:

- Message locks can be auto-renewed in all receive methods (receiver.receiveMessages, receiver.subcribe
  and receiver.getMessageIterator). This can be configured in options when calling `ServiceBusClient.createReceiver()`.
  [PR 11658](https://github.com/Azure/azure-sdk-for-js/pull/11658)
- `ServiceBusClient` now supports authentication with AAD credentials in the browser(can use `InteractiveBrowserCredential` from `@azure/identity`).
  [PR 11250](https://github.com/Azure/azure-sdk-for-js/pull/11250)
- Options to create/update a queue, topic and subscription now support `availabilityStatus` property. `availabilityStatus` indicates the status of entity availability. Possible values are: Available, Limited, Renaming, Restoring and Unknown.
  [PR 11152](https://github.com/Azure/azure-sdk-for-js/pull/11152)
- "properties" in the correlation rule filter now supports `Date`.
  [PR 11117](https://github.com/Azure/azure-sdk-for-js/pull/11117)

### Breaking changes

- `ServiceBusClient.createSessionReceiver` has been split into two methods:
  - `acceptSession`, which opens a session by name
  - `acceptNextSession`, which opens the next available session, determined by Service Bus.
  - as part of this `CreateSessionReceiverOptions` has been renamed to `AcceptSessionReceiverOptions` to conform to guidelines.
- The `processError` handler passed to `Receiver.subscribe` now takes a `ProcessErrorArgs` instead of just an error.

## 1.1.10 (2020-09-14)

- Fixes [bug 10943](https://github.com/Azure/azure-sdk-for-js/issues/10943) where accessing the address
  field when timing out could cause a fatal error.

## 7.0.0-preview.6 (2020-09-10)

### New features:

- Support using the SharedAccessSignature from the connection string.
  [PR 10951](https://github.com/Azure/azure-sdk-for-js/pull/10951)
- Added a new field `amqpAnnotatedMessage` to the received message which will hold the received
  message in its raw form, complete with all parts of the message as per the [AMQP spec](https://www.amqp.org/sites/amqp.org/files/amqp.pdf).
- Added `ServiceBusAdministrationClient.ruleExists()`
- Options to create a queue and topic now support `enableExpress` boolean property. `enableExpress` indicates whether Express Entities are enabled on a queue or topic. An express queue holds a message in memory temporarily before writing it to persistent storage.
  [PR 10984](https://github.com/Azure/azure-sdk-for-js/pull/10984)

### Breaking Changes

#### API changes

- `SessionReceiver.sessionLockedUntilUtc` is readonly and never undefined.
  [PR 10625](https://github.com/Azure/azure-sdk-for-js/pull/10625)
- `ServiceBusClient.createDeadLetterReceiver()` has been absorbed into `createReceiver()`.
  To create a dead letter receiver:

  ```typescript
  // this same method will work with subscriptions as well.
  serviceBusClient.createReceiver(<queue>, {
    subQueue: "deadLetter"
  });
  ```

#### Renames

- The `ServiceBusManagementClient` has been renamed to `ServiceBusAdministrationClient`. See
  [Issue 11012](https://github.com/Azure/azure-sdk-for-js/issues/11012) for more details.
- Sender, Receivers and the ReceivedMessage interfaces are now prefixed with `ServiceBus`: `ServiceBusSender`, `ServiceBusReceiver`, `ServiceBusSessionReceiver`, `ServiceBusReceivedMessage` and `ServiceBusReceivedMessageWithLock`.
- Lock duration fields for receivers have been renamed to apply to message locks and session locks:
  - `maxMessageAutoRenewLockDurationInMs` to `maxAutoRenewLockDurationInMs`
  - `autoRenewLockDurationInMs` -> `maxAutoRenewLockDurationInMs`
- `SessionReceiver.{get,set}State` has been renamed to `SessionReceiver.{get,set}SessionState`
- Administration API:
  - Property `defaultMessageTtl` renamed to `defaultMessageTimeToLive` (Wherever applicable)
  - `updatedAt` renamed to `modifiedAt`
  - `ServiceBusManagementClientOptions` for `ServiceBusManagementClient` is replaced by `PipelineOptions` from `@azure/core-http`
  - `AuthorizationRule.accessRights` type has been changed to be a string union with the available rights.

## 1.1.9 (2020-08-19)

- Fixes [bug 10641](https://github.com/Azure/azure-sdk-for-js/issues/10641) where parallel requests
  on the management link would fail with a `ServiceUnavailableError`.
- Fixes [bug 9287](https://github.com/Azure/azure-sdk-for-js/issues/9287)
  where operations that used the `RequestResponseLink` and encountered an error
  would fail to cleanup their internal timer.
  This caused exiting the process to be delayed until the timer reached its timeout.

## 7.0.0-preview.5 (2020-08-10)

- User agent details can now be added to the outgoing requests by passing the user-agent prefixes to the `ServiceBusClient` and the `ServiceBusManagementClient` through options.
  Example user-agent string if the prefix `SampleApp` is provided to `ServiceBusManagementClient`:
  `SampleApp azsdk-js-azureservicebus/7.0.0-preview.5 core-http/1.1.5 Node/v12.16.0 OS/(x64-Windows_NT-10.0.18363)`
  [PR 10092](https://github.com/Azure/azure-sdk-for-js/pull/10092)
- Added `deadLetterErrorDescription` and `deadLetterReason` properties on the received messages. Previously, they were under the `properties` in the message.

  OLD: `message.properties["DeadLetterReason"]` and `message.properties["DeadLetterErrorDescription"]`
  NEW: `message.deadLetterReason` and `message.deadLetterErrorDescription`

  [PR 10106](https://github.com/Azure/azure-sdk-for-js/pull/10106)

- Added tracing support to the methods under `ServiceBusManagementClient`.
  [PR 9987](https://github.com/Azure/azure-sdk-for-js/pull/9987)

### Breaking Changes

- `receiveMode` parameter in the `createReceiver()`, `createSessionReceiver()` and `createDeadletterReceiver()` methods has been moved into the options bag with the default value `"peekLock"` mode.

  Example:

  - OLD: `createReceiver(<queue-name>, "peekLock")` and `createReceiver(<queue-name>, "receiveAndDelete")`
  - NEW: `createReceiver(<queue-name>)` and `createReceiver(<queue-name>, {receiveMode: "receiveAndDelete"})`

  [PR 10102](https://github.com/Azure/azure-sdk-for-js/pull/10102)

- Added Async iterable iterators with pagination support for all the listing methods like `getQueues()`, `getTopics()`, `getQueuesRuntimeInfo()`, etc. and renamed them to use the `list` verb.
  [PR 9951](https://github.com/Azure/azure-sdk-for-js/pull/9951)
  [PR 10223](https://github.com/Azure/azure-sdk-for-js/pull/10223)
  - Please refer to the examples in the `samples` folder - [listingEntities](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7/typescript/src/advanced/listingEntities.ts)
- `receiveMessages()`'s optional `maxWaitTimeInMs` parameter now controls how long to wait for the _first_
  message, rather than how long to wait for an entire set of messages. This change allows for a faster return
  of messages to your application.
  [PR 9968](https://github.com/Azure/azure-sdk-for-js/pull/9968)
  [PR 10107](https://github.com/Azure/azure-sdk-for-js/pull/10107)
- `userProperties` attribute under the `ServiceBusMessage`(and `ReceivedMessage`, `ReceivedMessageWithLock`) has been renamed to `properties`. Same change has been made to the `userProperties` attribute in the correlation-rule filter.
  [PR 10003](https://github.com/Azure/azure-sdk-for-js/pull/10003)
- Fixed [bug 9926](https://github.com/Azure/azure-sdk-for-js/issues/9926)
  where attempting to create AMQP links when the AMQP connection was in the
  process of closing resulted in a `TypeError` in an uncaught exception.

- The terms `RuntimeInfo` and `Description` are replaced with `RuntimeProperties` and `Properties` to better align with guidelines around the kind of suffixes we use for naming methods and interfaces.

## 1.1.8 (2020-07-15)

- Fixes [bug 9926](https://github.com/Azure/azure-sdk-for-js/issues/9926)
  where attempting to create AMQP links when the AMQP connection was in the
  process of closing resulted in a `TypeError` in an uncaught exception.

## 7.0.0-preview.4 (2020-07-07)

- Adds abortSignal support throughout Sender and non-session Receivers.
  [PR 9233](https://github.com/Azure/azure-sdk-for-js/pull/9233)
  [PR 9284](https://github.com/Azure/azure-sdk-for-js/pull/9284)
- (Receiver|SessionReceiver).subscribe() now returns a closeable object which will stop new messages from arriving
  but still leave the receiver open so they can be settled via methods like complete().
  [PR 9802](https://github.com/Azure/azure-sdk-for-js/pull/9802)
  [PR 9849](https://github.com/Azure/azure-sdk-for-js/pull/9849)
- Bug - Messages scheduled in parallel with the `scheduleMessage` method have the same sequence number in response.
  Fixed in [PR 9503](https://github.com/Azure/azure-sdk-for-js/pull/9503)
- Management api updates
  - Following return types are changed to improve the API surface.
    - [Create,Get,Update]QueueResponse as QueueResponse, DeleteQueueResponse as Response, GetQueueRuntimeInfoResponse as QueueRuntimeInfoResponse.
      Similarly for topics, subscriptions, and rules.
      [PR 9432](https://github.com/Azure/azure-sdk-for-js/pull/9432)
  - `OperationOptions` has been added for all the methods under `ServiceBusManagementClient`, this adds support for abortSignal, requestOptions when creating and sending HTTP requests.
    [PR 9654](https://github.com/Azure/azure-sdk-for-js/pull/9654)
  - Fixed the bug where one cannot set `userProperties` in a correlation filter while using the `createRule()` method. [PR 9794](https://github.com/Azure/azure-sdk-for-js/pull/9794)

### Breaking Changes

- Standardized methods on senders and receivers to use the `Messages` suffix and deal with multiple messages rather than have dedicated methods to deal with a single message.
  [PR 9678](https://github.com/Azure/azure-sdk-for-js/pull/9678)
- Standardized methods that peek and receive a given number of messages to use a similar signature.
  [PR 9798](https://github.com/Azure/azure-sdk-for-js/pull/9798)
- Removed `isReceivingMessages` method on the `Receiver` as per discussions in [Issue 9746](https://github.com/Azure/azure-sdk-for-js/issues/9746)
  [PR 9875](https://github.com/Azure/azure-sdk-for-js/pull/9875)

- Management api updates

  - Renamed `createdOn`, `accessedOn` and `modifiedOn` properties to `createdAt`, `accessedAt` and `modifiedAt`, updated the corresponding type from `ISO-8601 timestamp string` to the `Date` type in the responses for the `runtimeInfo` methods for Queue, Topic and Subscription.
    [PR 9434](https://github.com/Azure/azure-sdk-for-js/pull/9434)
    [PR 9807](https://github.com/Azure/azure-sdk-for-js/pull/9807)
  - The property `top` in the options passed to any of the methods that get information for multiple entities like `getQueues` or `getQueuesRuntimeInfo` is renamed to `maxCount`.
    [PR 9664](https://github.com/Azure/azure-sdk-for-js/pull/9664)
  - The "update" methods (`updateQueue`, `updateTopic`, and `updateSubscription`) now require all properties on the given queue/topic/subscription object to be set even though only a subset of them are updatable. Therefore, the suggested flow is to use the "get" methods to get the queue/topic/subscription object, update as needed and then pass it to the "update" methods.
    [PR 9751](https://github.com/Azure/azure-sdk-for-js/pull/9751)

    See [update queue](https://docs.microsoft.com/rest/api/servicebus/update-queue) and [update-topic](https://docs.microsoft.com/rest/api/servicebus/update-queue) for list of updatable properties.

## 7.0.0-preview.3 (2020-06-08)

- Improves the performance of the `ServiceBusMessageBatch.tryAdd` method.
  [PR 8772](https://github.com/Azure/azure-sdk-for-js/pull/8772)
- Added management api features which allows CRUD operations on the entities of a namespace.
  [PR 9116](https://github.com/Azure/azure-sdk-for-js/pull/9116)
  [PR 9221](https://github.com/Azure/azure-sdk-for-js/pull/9221)

### Breaking Changes

- `ServiceBusClient.createSender()` which was made async in the previous preview to include the link initialization is no longer async. Instead, the sender now has an `open()` method that can be used to proactively initialize the link.
  [PR 9302](https://github.com/Azure/azure-sdk-for-js/pull/9302)
- `Receiver/SessionReceiver.browseMessages()` has been renamed to `Receiver/SessionReceiver.peekMessages()`.
  [PR 9280](https://github.com/Azure/azure-sdk-for-js/pull/9280)

## 1.1.7 (2020-05-13)

- Relaxes the scheme check for the endpoint while parsing the connection string.
  This allows "\<anything\>://" as the scheme as opposed to the "sb://" scheme suggested by the connection string in the portal.
  Fixes [bug 7907](https://github.com/Azure/azure-sdk-for-js/issues/7907).
- Provides down-leveled type declaration files to support older TypeScript versions 3.1 to 3.6.
  [PR 8515](https://github.com/Azure/azure-sdk-for-js/pull/8515)
- Updates `@azure/amqp-common` to version 1.0.0-preview.15, fixing an issue with 'OperationTimeoutError's not being considered retryable.
- Ensures the promise returned by `receiveMessages()` is rejected appropriately when the connection disconnects in the midst of
  draining credits. This fixes [bug 7689](https://github.com/Azure/azure-sdk-for-js/issues/7689) with [PR 8552](https://github.com/Azure/azure-sdk-for-js/pull/8552)
- Fixes [bug 8673](https://github.com/Azure/azure-sdk-for-js/issues/8673) where a user application would crash with ECONNRESET error due to the underlying AMQP library
  `rhea` not cleaning up sockets on connection going idle. Details can be found in [PR amqp/rhea#300](https://github.com/amqp/rhea/pull/300)

## 7.0.0-preview.2 (2020-05-05)

- Fixes reconnection issues by creating a new connection object rather than re-using the existing one.
  [PR 8580](https://github.com/Azure/azure-sdk-for-js/pull/8580)
- Bug - Unable to settle previously received messages when a receiver recovers from a broken link or connection.
  Fixed in [PR 8340](https://github.com/Azure/azure-sdk-for-js/pull/8340)
  Please note that if using sessions, this behavior doesn't change with this release.
- Provided down-leveled type declaration files to support older TypeScript versions 3.1 to 3.6.
  [PR 8619](https://github.com/Azure/azure-sdk-for-js/pull/8619)
- The `ServiceBusSender.send()` method now has an overload that takes an array of events.
  If you know beforehand that your messages would fit under the message size restrictions, this is an easier way to send events instead of creating an `ServiceBusMessageBatch` and filling it one by one.
- New sample to demonstrate how to receive messages from multiple sessions in a queue or subscription using session receivers.

### Breaking Changes

- The `createSender` and `createSessionReceiver` methods are now async. The promise returned by them are resolved after the link is successfully established with the service. The same will be done to the `createReceiver` method in the next preview.
- Remove rule operations from `ServiceBusClient` in favor of having similar operations via the management apis
  which would apply to queues, topics, subscriptions and rules in the upcoming previews.
  [PR 8660](https://github.com/Azure/azure-sdk-for-js/pull/8660)

## 1.1.6 (2020-04-23)

- Removes the `@azure/ms-rest-nodeauth` dependency.
  This allows users to use any version of `@azure/ms-rest-nodeauth` directly with `@azure/service-bus` without TypeScript compilation errors.
  Fixes [bug 8041](https://github.com/Azure/azure-sdk-for-js/issues/8041).
- Fixes for the below bugs when settling a message with [PR 8406](https://github.com/Azure/azure-sdk-for-js/pull/8406)
  - Not setting user provided deadletter error reason and description when deadlettering a deferred message.
  - Not setting user provided custom properties when deadlettering a non deferred message.
  - Not able to settle previously received messages when a receiver recovers from a broken link or connection. Please note that if using sessions, this behavior doesn't change with this release.
- Fixes an issue where non-retryable errors caused by a connection disconnecting were not getting surfaced to the user's registered error handler
  when using the `registerMessageHandler` method on a receiver.
  [PR 8401](https://github.com/Azure/azure-sdk-for-js/pull/8401)
- Fixes reconnection issues by creating a new connection object rather than re-using the existing one.
  [PR 8447](https://github.com/Azure/azure-sdk-for-js/pull/8447)
- Adds a new method `open()` on the sender to allow you to front load the work of setting up the underlying AMQP links. Use this if you want to avoid having your first `send()` operation pay the tax of link set up.
  [PR 8329](https://github.com/Azure/azure-sdk-for-js/pull/8329). This PR also fixes a bug where a sender recovering from connection loss does not report the error back to the user from ongoing send operations in expected time.

## 7.0.0-preview.1 (2020-04-07)

- This release is a preview of our efforts to create a client library that is user friendly and
  idiomatic to the JavaScript ecosystem. The reasons for most of the changes in this update can be found in the
  [Azure SDK Design Guidelines for TypeScript](https://azure.github.io/azure-sdk/typescript_introduction.html).

  We also provide a migration guide for users familiar with the stable package that would like to try the preview: [migration guide to move from Service Bus V1 to Service Bus V7 Preview](https://github.com/azure/azure-sdk-for-js/blob/%40azure/service-bus_7.0.0-preview.1/sdk/servicebus/service-bus/migrationguide.md).

- Fixes [bug 7598][https://github.com/azure/azure-sdk-for-js/issues/7958] where the dead letter error and description could be populated incorrectly.

### Breaking Changes

- Fixes [bug 6816](https://github.com/Azure/azure-sdk-for-js/issues/6816) affecting messages sent using the `scheduleMessage()` and `scheduleMessages()` methods. [PR 7372](https://github.com/Azure/azure-sdk-for-js/pull/7372).
  - Users on version-`1.x.x` of `@azure/service-bus` library had to rely on the [workaround of encoding the message body with `DefaultDataTransformer`](https://github.com/Azure/azure-sdk-for-js/pull/6983) before calling `scheduleMessage()`/`scheduleMessages()` methods. The workaround is no longer needed since the bug has been fixed here starting from version-`7.0.0-preview.1`. [PR 7372](https://github.com/Azure/azure-sdk-for-js/pull/7372).

## 1.1.5 (2020-03-24)

- Removed interfaces related to unreleased management api features from the API surface that were accidentally exported in version 1.1.3
  [PR 7992](https://github.com/Azure/azure-sdk-for-js/issues/7992).

## 1.1.4 (2020-03-17)

- Updated to use the latest version of `@azure/amqp-common` where the timeout for authorization requests sent to the service is increased from 10s to 60s to reduce the frequency of timeout errors.
  [PR 7823](https://github.com/Azure/azure-sdk-for-js/issues/7823).

## 1.1.3 (2020-02-11)

- Fixes issue where the promise returned by `receiveMessages` would sometimes fail to settle when the underlying connection
  was disconnected while receiving messages.
  [PR 6601](https://github.com/Azure/azure-sdk-for-js/pull/6601)
- A workaround for the [bug 6816](https://github.com/Azure/azure-sdk-for-js/issues/6816) affecting messages sent using the `scheduleMessage()` and `scheduleMessages()` methods has been added to the docs - [PR 6983](https://github.com/Azure/azure-sdk-for-js/pull/6983)
- Improves bundling support by updating `rhea` and `@azure/amqp-common` dependencies.
  Fixes [bug 5364](https://github.com/Azure/azure-sdk-for-js/issues/5364).

## 1.1.2 (2019-12-12)

- Updates `@azure/amqp-common` to version 1.0.0-preview.9.
  This update allows the SDK to detect when a connection has gone idle for 60 seconds and attempt to reconnect.

## 1.1.1 (2019-11-27)

- Fix [bug 5757](https://github.com/Azure/azure-sdk-for-js/issues/5757) where `receiveMessages` used in `ReceiveAndDelete` mode results in data loss. [PR 6265](https://github.com/Azure/azure-sdk-for-js/pull/6265).
- Updated network status detection to treat DNS timeouts as a `ConnectionLostError` by using the latest version
  of the `@azure/amqp-common` package.
- We do not have retries for errors during receiver set up. User is expected to retry on their own.
  There was a misleading retry due to a failed receiver being cached which is now fixed. Related to
  [bug 5541](https://github.com/Azure/azure-sdk-for-js/issues/5541).
- Errors that arise from receivers failing to automatically reconnect after encountering a transient issue now trigger the user-provided `onError` callback passed to `receiver.registerMessageHandler`. Related to [bug 2540](https://github.com/Azure/azure-sdk-for-js/issues/2540)
- Update jsdocs for the `receiveMessages` method to include a note that the number of messages that can
  be received in `PeekLock` mode is capped at 2047. [PR 5758](https://github.com/Azure/azure-sdk-for-js/pull/5758).
- Update jsdocs for user facing apis to include information on possible errors that can be thrown.
  [PR 6088](https://github.com/Azure/azure-sdk-for-js/pull/6088)

## 1.1.0 (2019-09-26)

- Add browser support. Authentication using Azure Active Directory credentials is not supported yet - use a connection string instead.
  [PR 5128](https://github.com/Azure/azure-sdk-for-js/pull/5128) related to [issue 3373](https://github.com/Azure/azure-sdk-for-js/issues/3373)

## 1.0.4 (2019-09-12)

- Increase timeout value from 20 seconds to 60 seconds when settling messages.
  [PR 4907](https://github.com/Azure/azure-sdk-for-js/pull/4907) related to [bug 3764](https://github.com/Azure/azure-sdk-for-js/issues/3764)
- Allow time to receive a flow frame from service when sender is not in a sendable state.
  [PR 4908](https://github.com/Azure/azure-sdk-for-js/pull/4908) related to [bug 4764](https://github.com/Azure/azure-sdk-for-js/issues/4764)
- Use user provided timeout value for the entirety of the `receiveMessages()` method.
  [PR 4933](https://github.com/Azure/azure-sdk-for-js/pull/4933) related to [bug 4748](https://github.com/Azure/azure-sdk-for-js/issues/4748)
- Improve logging when not able to settle a message due to not having access to the right receiver. [PR 4943](https://github.com/Azure/azure-sdk-for-js/pull/4943)
- Fix bug where the library consistently fails to settle a message due to having lost reference to the right receiver. [PR 4947](https://github.com/Azure/azure-sdk-for-js/pull/4947)

## 1.0.3 (2019-07-18)

- Update `amqp-common` dependency version to 1.0.0-preview.6. This includes fix for the [bug 3971](https://github.com/Azure/azure-sdk-for-js/issues/3971) where the token audience in the credential created during [MSI based login](https://www.npmjs.com/package/@azure/ms-rest-nodeauth/v/2.0.2#msi-managed-service-identity-based-login-from-a-virtual-machine-created-in-azure) was being ignored. [PR 4146](https://github.com/Azure/azure-sdk-for-js/pull/4146)
- Added event handlers for `error` and `protocolError` events on the connection object to avoid the case of unhandled exceptions like [bug 4136](https://github.com/Azure/azure-sdk-for-js/issues/4136)

## 1.0.2 (2019-05-21)

- Added missing package.json file to the npm package to fix issues bundling with webpack and other bundlers.
  This fixes the [bug 2857](https://github.com/Azure/azure-sdk-for-js/issues/2857).

## 1.0.1 (2019-05-16)

- Readme updated to remove the status about this library being in preview. This library is now out
  of preview.

## 1.0.0 (2019-05-16)

- `receiveMessages()` now returns rejected promise when network connection is lost.
- Receiving messages from a session whose id is an empty string is now allowed.
- Errors thrown explicitly by the library for the user facing apis are documented in jsdocs.

### Breaking changes

- When Service Bus does not acknowledge a message settlement/disposition request in time, the error
  `ServiceUnavailbleError` is thrown. This is consistent with send requests and requests over the \$management link.
- The error `MessageLockLostError` or `SessionLockLostError` (based on whether the entity has sessions enabled
  or not) is thrown for a message settlement/disposition request when the AMQP receiver link that was used to receive
  the message has died.
- User agent string which is passed as a AMQP connection property is updated to follow the new standard.
  For example: `azsdk-js-azureservicebus/1.0.0/(NODE-VERSION v10.15.0) Windows_NT 10.0.17763`

## 1.0.0-preview.3 (2019-04-24)

- Proxy support added. Please refer to the [useProxy](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/servicebus/service-bus/samples/v7/javascript/useProxy.js)
  sample to see how you can use Websockets to run this library with a proxy server
- Standardized error messages on errors thrown on parameter validations
- We now have API reference docs published for this library. Checkout our README which has been updated with the relevant API reference links.

## 1.0.0-preview.2 (2019-04-08)

### Breaking Changes

The second preview of the @azure/service-bus library has the below breaking changes from the previous
version:

### Name changes

Some of our classes and functions have undergone a naming change to better describe what they are
meant to do.

- The `Namespace` class is renamed to `ServiceBusClient`
- The function to get a sender, `getSender` is renamed to `createSender`. It will now throw an error
  if an open sender already exists on the `QueueClient`/`SubscriptionClient`. If a previously created
  sender was closed, then this will create a new sender.
- The function to get a receiver, `getReceiver` is renamed to `createReceiver`. It will now throw an error
  if an open receiver already exists on the `QueueClient`/`SubscriptionClient`. If a previously created
  receiver was closed, then this will create a new receiver.
- The function to get a receiver for a session enabled Queue/Subsciption, `getSessionReceiver` is no
  longer supported. Use `createReceiver` instead and pass the `sessionOptions` parameter to provide
  `sessionId` and the duration until which you want to lock the session.
- `receive` and `receiveBatch` functions on the reciever are renamed to `registerMessageHandler` and
  `receiveMessages`
- `renewLock` on the receiver is renamed to `renewMessageLock`. In case of receiver from sessions,
  this is renamed to `renewSessionLock`.
- A third way of receiving messages is introduced on the receiver via `getMessageIterator` function
  which returns an async iterator over messages.

### Authentication

- If you have been using the `createFromAadTokenCredentials` function to create an instance of the
  `Namespace` class (which is now `ServiceBusClient`), you will now need to use the
  [@azure/ms-rest-nodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth)
  library instead of [ms-rest-azure](https://www.npmjs.com/package/ms-rest-azure) library to create
  the credentials that are needed by the `createFromAadTokenCredentials` function. - Typescript: Replace `import * from "ms-rest-azure";` with `import * from "@azure/ms-rest-nodeauth";` - Javascript: Replace `require("ms-rest-azure")` with `require("@azure/ms-rest-nodeauth")`

### Bug fixes

- Fixed [Bug 1611](https://github.com/Azure/azure-sdk-for-js/issues/1611) where we could not receive
  more than 2047 messages in a single receiver when in `ReceiveAndDelete` mode.
- Fixed [Bug 1098](https://github.com/Azure/azure-sdk-for-js/issues/1098) where precision was lost
  on the messageId when a number is passed.
- A network connection lost error is now treated as retryable error. A new error with name `ConnectionLostError`
  is introduced for this scenario which you can see if you enable the [logs](https://github.com/Azure/azure-sdk-for-js/tree/main/sdk/servicebus/service-bus#enable-logs).
- When recovering from an error that caused the underlying AMQP connection to get disconnected,
  [rhea](https://github.com/amqp/rhea/issues/205) reconnects all the older AMQP links on the connection
  resulting in the below 2 errors in the logs. We now clear rhea's internal map to avoid such reconnections.
  We already have code in place to create new AMQP links to resume send/receive operations. Fixes
  [Bug 1268](https://github.com/Azure/azure-sdk-for-js/issues/1268) - InvalidOperationError: A link to connection '.....' \$cbs node has already been opened. - UnauthorizedError: Unauthorized access. 'Listen' claim(s) are required to perform this operation.

## 1.0.0-preview.1 (2019-02-05)

The first preview of the @azure/service-bus library has the below features

- Send messages to Queues and Topics
- Schedule to send messages at a later time to Queues and Topics
- Cancel such scheduled messages
- Peek messages from Queues and Subscriptions
- Receive messages from Queues and Subscriptions, settle them in 1 of 4 ways
  - `complete()`
  - `abandon()`
  - `defer()`
  - `deadletter()`
- Receive messages that were deferred or deadletter from Queues and Subscriptions
