# Coming Soon 1.1.1

- When in ReceiveAndDelete mode, skip resolving the promise returned by `receiveMessages` due to a new message not arriving within 1 second of the previous message. This constraint is needed for 
PeekLock mode to avoid the case of earlier messages in the batch from getting their lock expired while
waiting for later messages. This fixes [Bug 5757](https://github.com/Azure/azure-sdk-for-js/issues/5757).
- We do not have retries for errors during receiver set up. User is expected to retry on their own.
There was a misleading retry due to a failed receiver being cached which is now fixed. Related to 
[Bug 5541](https://github.com/Azure/azure-sdk-for-js/issues/5541).
- Errors that arise from receivers failing to automatically reconnect after encountering a transient issue now trigger the user-provided `onError` callback passed to `receiver.registerMessageHandler`.
- Update jsdocs for the `receiveMessages` method to include a note that the number of messages that can
  be received in `PeekLock` mode is capped at 2047. [PR 5758](https://github.com/Azure/azure-sdk-for-js/pull/5758).
- Update jsdocs for user facing apis to include information on possible errors that can be thrown.
  [PR 6088](https://github.com/Azure/azure-sdk-for-js/pull/6088)

# 2019-09-26 1.1.0

- Add browser support. Authentication using Azure Active Directory credentials is not supported yet - use a connection string instead.
  [PR 5128](https://github.com/Azure/azure-sdk-for-js/pull/5128) related to [issue 3373](https://github.com/Azure/azure-sdk-for-js/issues/3373)

# 2019-09-12 1.0.4

- Increase timeout value from 20 seconds to 60 seconds when settling messages.
  [PR 4907](https://github.com/Azure/azure-sdk-for-js/pull/4907) related to [bug 3764](https://github.com/Azure/azure-sdk-for-js/issues/3764)
- Allow time to receive a flow frame from service when sender is not in a sendable state.
  [PR 4908](https://github.com/Azure/azure-sdk-for-js/pull/4908) related to [bug 4764](https://github.com/Azure/azure-sdk-for-js/issues/4764)
- Use user provided timeout value for the entirety of the `receiveMessages()` method.
  [PR 4933](https://github.com/Azure/azure-sdk-for-js/pull/4933) related to [bug 4748](https://github.com/Azure/azure-sdk-for-js/issues/4748)
- Improve logging when not able to settle a message due to not having access to the right receiver. [PR 4943](https://github.com/Azure/azure-sdk-for-js/pull/4943)
- Fix bug where the library consistently fails to settle a message due to having lost reference to the right receiver. [PR 4947](https://github.com/Azure/azure-sdk-for-js/pull/4947)

# 2019-07-18 1.0.3

- Update `amqp-common` dependency version to 1.0.0-preview.6. This includes fix for the [bug 3971](https://github.com/Azure/azure-sdk-for-js/issues/3971) where the token audience in the credential created during [MSI based login](https://www.npmjs.com/package/@azure/ms-rest-nodeauth/v/2.0.2#msi-managed-service-identity-based-login-from-a-virtual-machine-created-in-azure) was being ignored. [PR 4146](https://github.com/Azure/azure-sdk-for-js/pull/4146)
- Added event handlers for `error` and `protocolError` events on the connection object to avoid the case of unhandled exceptions like [bug 4136](https://github.com/Azure/azure-sdk-for-js/issues/4136)

# 2019-05-21 1.0.2

- Added missing package.json file to the npm package to fix issues bundling with webpack and other bundlers.
  This fixes the [bug 2857](https://github.com/Azure/azure-sdk-for-js/issues/2857).

# 2019-05-16 1.0.1

- Readme updated to remove the status about this library being in preview. This library is now out
  of preview.

# 2019-05-16 1.0.0

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

# 2019-04-24 1.0.0-preview.3

- Proxy support added. Please refer to the [useProxy](https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/servicebus/service-bus/samples/javascript/gettingStarted/useProxy.js)
  sample to see how you can use Websockets to run this library with a proxy server
- Standardized error messages on errors thrown on parameter validations
- We now have API reference docs published for this library. Checkout our README which has been updated with the relevant API reference links.

# 2019-04-08 1.0.0-preview.2

### Breaking Changes

The second preview of the @azure/service-bus library has the below breaking changes from the previous
version:

#### Name changes

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

#### Authentication

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

# 2019-02-05 1.0.0-preview.1

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
