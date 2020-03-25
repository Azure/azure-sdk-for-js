# Release History

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

- Proxy support added. Please refer to the [useProxy](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples/javascript/gettingStarted/useProxy.js)
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
