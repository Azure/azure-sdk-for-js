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
