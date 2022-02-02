# Release History

## 3.1.0 (2022-02-03)

### Features Added

- Changed TS compilation target to ES2017 in order to produce smaller bundles and use more native platform features
- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.
- Updated to use the latest version of the `rhea` package.
- Add a constant `messageState` with value of `"x-opt-message-state"` which is the name for the new message state property in the message annotations. [PR 18938](https://github.com/Azure/azure-sdk-for-js/pull/18938)

## 3.0.0 (2021-06-09)

### Breaking changes

- Updates the `rhea-promise` and `rhea` dependencies to version 2.x. `rhea` contains a breaking change that changes deserialization of timestamps from numbers to Date objects.
- Removes the `AsyncLock` and `defaultLock` exports. `defaultCancellableLock` should be used instead.

## 2.3.0 (2021-04-29)

- Updates `AmqpAnnotatedMessage` to identify the AMQP section where body data was decoded from. [PR 14703](https://github.com/Azure/azure-sdk-for-js/pull/14703).

- Adds `CancellableAsyncLock` as an alternative to `AsyncLock` that supports cancellation via the abort signal. [PR 14844](https://github.com/Azure/azure-sdk-for-js/pull/14844).

## 2.2.0 (2021-03-30)

- Updates `translateError` to convert non-object type parameters to errors.
  The parameter will be part of the error's `message` property unless the parameter is null or undefined.
  Fixes issue [14499](https://github.com/Azure/azure-sdk-for-js/issues/14499).

- Addresses issue [9988](https://github.com/Azure/azure-sdk-for-js/issues/9988)
  by updating the following operations to accept an `abortSignal` to allow cancellation:
  - CbsClient.init()
  - CbsClient.negotiateClaim()
  - RequestResponseLink.create()
- Exporting `StandardAbortMessage` that is the standard error message accompanying the `AbortError`.

## 2.1.0 (2021-02-08)

- Fixes the bug reported in issue [13048](https://github.com/Azure/azure-sdk-for-js/issues/13048).
  Now an informative error is thrown describing the circumstance that led to the error.
- Adds the ability to configure the `amqpHostname` and `port` that a `ConnectionContextBase` will use when connecting to a service.
  The `host` field refers to the DNS host or IP address of the service, whereas the `amqpHostname`
  is the fully qualified host name of the service. Normally `host` and `amqpHostname` will be the same.
  However if your network does not allow connecting to the service via the public host,
  you can specify a custom host (e.g. an application gateway) via the `host` field and continue
  using the public host as the `amqpHostname`.

## 2.0.1 (2021-01-07)

- Fixes the bug reported in issue [12610](https://github.com/Azure/azure-sdk-for-js/issues/12610).
  Previously, `retry` would still sleep one more time after all retry attempts were exhausted before returning.
  Now, `retry` will return immediately after all retry attempts are completed as necessary.

## 2.0.0 (2020-11-12)

- This release marks the general availability of the `@azure/core-amqp` version 2 package.

### Breaking changes

- Continuing our work to clean the public API surface that we started in 2.0.0-beta.1 we no longer export

  - `DataTransformer` and `DefaultDataTransformer`.
    `dataTransformer` has been removed from `ConnectionContextBase` and `ConnectionContextBaseParameters`.
    This allows us to consider other forms of implementing serializers in the future.
  - `ConditionStatusMapper` and `MessagingErrorCodes` as these are only used internally by this package.

- Previously, `ConnectionConfig.validate()` overridden entityPath if `undefined` with `String(undefined) = "undefined"`. This has been updated to retain `undefined` in the validation.
  [PR 12321](https://github.com/Azure/azure-sdk-for-js/pull/12321)

## 2.0.0-beta.1 (2020-11-03)

- `AmqpAnnotatedMessage` interface that closely represents the AMQP annotated message from the [AMQP spec](https://docs.oasis-open.org/amqp/core/v1.0/os/amqp-core-messaging-v1.0-os.html#section-message-format) has been added. New `AmqpMessageHeaders` and `AmqpMessageProperties` interfaces(properties with camelCasing) have been added in the place of re-exports from "rhea" library(properties with snake_casing).
  [PR 12091](https://github.com/Azure/azure-sdk-for-js/pull/12091)

### Breaking changes

- `satusDescription` in `CbsResponse` which is the output for `CbsClient.negotiateClaim()` is renamed to `statusDescription` to fix the spelling error.
- The `CbsClient.negotiateClaim()` method now takes the token string directly instead of the `AccessToken` object.

We are cleaning the public API surface by

- removing exports that are either not used by either `@azure/event-hubs` and `@azure/service-bus` packages (which are the two main consumers of this package)
  - AsyncLockOptions
  - executePromisesSequentially
  - Func
  - getNewAsyncLock
  - isNode
  - randomNumberFromInterval
  - Timeout
- moving the clases/methods/interfaces that are very specific to Event Hubs/Service Bus to their corresponding packages.
  - SharedKeyCredential
  - EventHubConnectionConfig
- avoid re-exporting things from `rhea-promise` and `@azure/core-auth`
  - Dictionary
  - isAmqpError
  - Message
  - TokenCredential
  - isTokenCredential
  - AccessToken
- removing all IotHub related artifacts. These existed to support the IotHub support we had in Event Hubs v2 which has since been removed in Event Hubs v5 for a better separation of concerns
  - IotHubConnectionConfig
  - IotHubConnectionStringModel
  - IotSharedKeyCredential
  - isIotHubConnectionString
- removing all Event Hubs, Storage and Service Bus interfaces meant to be used with the `parseConnectionString()` method
  - ServiceBusConnectionStringModel
  - StorageConnectionStringModel
  - EventHubsConnectionStringModel

## 1.1.7 (2020-10-28)

- Internal improvement - Previously, each `RequestResponseLink.sendRequest` call adds an "onMessage" listener to the `ReceiverEvents.message` event and keeps discarding the responses that did not match the request-id and returns the response if matched. Adding many listeners would also result in a warning such as `MaxListenersExceededWarning: Possible EventEmitter memory leak detected. 11 message listeners added to [Receiver]. Use emittr.setMaxListeners() to increase limit`.
  This has been improved to reuse a single listener for all the requests by maintaining a map of deferred promises that would be resolved(or rejected) upon receiving a message event.
  [PR 11749](https://github.com/Azure/azure-sdk-for-js/pull/11749)

## 1.1.6 (2020-09-08)

- Support using the SharedAccessSignature from the connection string.
  ([PR 10951](https://github.com/Azure/azure-sdk-for-js/pull/10951)).

## 1.1.5 (2020-08-04)

- Fixes issue [9615](https://github.com/Azure/azure-sdk-for-js/issues/9615)
  where closing the `RequestResponseLink` session before closing the receiver
  could cause the service to report a missing session channel.

## 1.1.4 (2020-06-30)

- Fixes issue [9287](https://github.com/Azure/azure-sdk-for-js/issues/9287)
  where operations that used the `RequestResponseLink` and encountered an error
  would fail to cleanup their internal timer.
  This caused exiting the process to be delayed until the timer reached its timeout.
- If none is present, add a unique id to `message_id` on the request to be sent when using the `RequestResponseLink`. This helps in determining the right response for the request when multiple send requests are made in parallel.
  [PR 9503](https://github.com/Azure/azure-sdk-for-js/pull/9503)

## 1.1.3 (2020-06-02)

- Updated to use the latest version of the `rhea` package.
  This update fixes an issue where an uncaught exception could be thrown some time after a connection was disconnected.
  [PR 8758](https://github.com/Azure/azure-sdk-for-js/pull/8758)

## 1.1.2 (2020-04-28)

- Adds compatibility with TypeScript versions 3.1 through 3.6+.
  [PR 8540](https://github.com/Azure/azure-sdk-for-js/pull/8540)
- Add a new method `refreshConnection()` on the `ConnectionContextBase` to replace the `connection` property on it with a new rhea-promise `Connection` object.
  [PR 8563](https://github.com/Azure/azure-sdk-for-js/pull/8563)

## 1.1.1 (2020-03-31)

- Removes direct dependency on `@azure/identity` as it is not used directly by this package.
  [PR 7669](https://github.com/Azure/azure-sdk-for-js/pull/7669)

## 1.1.0 (2020-02-28)

- Exports `WebSocketOptions` interface to configure the channelling of the AMQP connection over Web Sockets. [PR 7368](https://github.com/Azure/azure-sdk-for-js/pull/7368)

## 1.0.1 (2020-02-06)

- Updated to use the latest version of the `rhea` package.
  This update improves support for [bundling](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/Bundling.md) this library.

## 1.0.0 (2020-01-08)

- This release marks the general availability of the `@azure/core-amqp` package.
- Improved detection of when an established socket is no longer receiving data from the service.
- Added logging around the network connectivity check.
- Updated the translate() utility function used to convert AmqpError or system errors to MessagingError as below:
  - Non-messaging errors like TypeError, RangeError or any Node.js system errors not related to network issues
    are returned as is instead of being converted to a MessagingError.
  - If a MessagingError is returned by translate(), use code instead of the name property to
    differentiate between different kinds of messaging errors.
    The name property henceforth will always be "MessagingError" on this error class.

## 1.0.0-preview.6 (2019-12-03)

- Treat ETIMEOUT error from dns.resolve as network disconnected.

## 1.0.0-preview.5 (2019-10-29)

- Updated to use the latest version of the `@azure/abort-controller` and `@azure/core-auth` packages.

## 1.0.0-preview.4 (2019-10-07)

- Fixes bug where calling `sendRequest` from a `RequestResponseLink` multiple
  times in parallel would result in all but 1 calls being retried.

## 1.0.0-preview.3 (2019-09-09)

Updates types for better compatibility with TypeScript 3.6.x. (PR #4928)

## 1.0.0-preview.2 (2019-08-05)

- Retry updates
  - The properties on the `RetryConfig` interface have been refactored for ease of use. The new `RetryOptions` in it will hold configurations like the number of retries, delay between retries, per try timeout etc.
  - Support for exponential retry has been added
  - Support for cancellation has been added via an optional `AbortSignal` from the [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) package.
  - The `RequestResponseLink` class has been updated to not have retries anymore for the `sendRequest()` method. The caller of this method is expected to add the relevant retries.
- All time related entities have been updated to use milliseconds as the unit of time for consistency.
- New error `InsufficientCreditError` is introduced for the scenario where [rhea](https://www.npmjs.com/package/rhea) is unable to send events due to its internal buffer being full. This is a transient error and so is treated as retryable.
- The error `OperationTimeoutError` was previously mistakenly classified as an AMQP error which is now corrected. Since this can also be a transient error, it is treated as retryable.

## 1.0.0-preview.1 (2019-06-28)

This library is based off of the [@azure/amqp-common](https://www.npmjs.com/package/@azure/amqp-common)
library. Both are meant to contain common functionality required by Azure Javascript libraries that
use the [AMQP protocol](https://docs.microsoft.com/azure/service-bus-messaging/service-bus-amqp-protocol-guide)
like the ones for Azure Service Bus and Azure Event Hubs.

Key differences between this library and the older @azure/amqp-common are:

- Supports the new [@azure/identity](https://www.npmjs.com/package/@azure/identity) library instead of
  the [@azure/ms-restnodeauth](https://www.npmjs.com/package/@azure/ms-rest-nodeauth). Therefore, the
  `AADTokenProvider` class no longer exists as the credentials from the @azure/identity library can be
  directly used to get the tokens.
- The `SASTokenProvider` is renamed to `SharedKeyCredential` to keep in sync with the use of the term
  "credential" as used by @azure/identity to get tokens.

New features in this library compared to the older @azure/amqp-common are:

- The `sendRequest()` function in the `RequestResponseLink` class now supports the use of an abort
  signal via the `SendRequestOptions` so that the request can be cancelled.
