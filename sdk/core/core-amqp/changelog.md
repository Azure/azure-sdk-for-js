## 1.0.0-preview.7 - TBD

- Improved detection of when an established socket is no longer receiving data from the service.
- Added logging around the network connectivity check.

## 1.0.0-preview.6 - 3rd December, 2019

- Treat ETIMEOUT error from dns.resolve as network disconnected.

## 1.0.0-preview.5 - 29th October, 2019

- Updated to use the latest version of the `@azure/abort-controller` and `@azure/core-auth` packages.

## 1.0.0-preview.4 - 7th October, 2019

- Fixes bug where calling `sendRequest` from a `RequestResponseLink` mulitple
  times in parallel would result in all but 1 calls being retried.

## 1.0.0-preview.3 - 9th September, 2019

Updates types for better compatibility with TypeScript 3.6.x. (PR #4928)

## 1.0.0-preview.2 - 5th August, 2019

- Retry updates
  - The properties on the `RetryConfig` interface have been refactored for ease of use. The new `RetryOptions` in it will hold configurations like the number of retries, delay between retries, per try timeout etc.
  - Support for exponential retry has been added
  - Support for cancellation has been added via an optional `AbortSignal` from the [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) package.
  - The `RequestResponseLink` class has been updated to not have retries anymore for the `sendRequest()` method. The caller of this method is expected to add the relevant retries.
- All time related entites have been updated to use milli seconds as the unit of time for consistency.
- New error `InsufficientCreditError` is introduced for the scenario where [rhea](https://www.npmjs.com/package/rhea) is unable to send events due to its internal buffer being full. This is a transient error and so is treated as retryable.
- The error `OperationTimeoutError` was previously mistakenly classified as an AMQP error which is now corrected. Since this can also be a transient error, it is treated as retryable.

## 1.0.0-preview.1 - 28th June, 2019

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
