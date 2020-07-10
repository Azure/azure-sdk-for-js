# Release History

## 1.1.5 (Unreleased)

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
  This update improves support for [bundling](https://github.com/Azure/azure-sdk-for-js/blob/master/documentation/Bundling.md) this library.

## 1.0.0 (2019-01-08)

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
use the [AMQP protocol](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-protocol-guide)
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
