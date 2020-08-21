# Release History

## 7.0.0-preview.6 (Unreleased)


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
  - Please refer to the examples in the `samples` folder - [listingEntities](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples/typescript/src/advanced/listingEntities.ts)
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

- Proxy support added. Please refer to the [useProxy](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples/javascript/useProxy.js)
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
  is introduced for this scenario which you can see if you enable the [logs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/servicebus/service-bus#enable-logs).
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
