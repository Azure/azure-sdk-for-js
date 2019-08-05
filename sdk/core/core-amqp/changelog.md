## 1.0.0-preview.2.0 - 5th August, 2019

- `sendRequest()` function in the `RequestResponseLink` now excludes default retries and leaves it up to the users to implement it as necessary.
- Parameter `retryCount` is now renamed to `maxRetries` in `RetryOptions` and this would specifically count the number of retry attempts and will exclude counting the initial attempt.
- Now we support exponential retry mechanism instead of linear retry mechanism.
- Now we use milliseconds as the unit of time for the user facing inputs.
- You can now pass an abort signal in `retry` operation. This signal can be used to cancel the operation. Use
  the package [@azure/abort-controller](https://www.npmjs.com/package/@azure/abort-controller) to create such abort signals.
- Insufficient credit error is now treated as retryable error. A new error with name `InsufficientCreditError` 
  is introduced for this scenario which you can see if you enable the [logs](https://github.com/Azure/azure-sdk-for-js/tree/master/sdk/core/core-amqp#troubleshooting). 
  It occurs when the number of credits available on Rhea link is insufficient.
- `OperationTimeoutError` is now treated as retryable error.
- Update the version of rhea-promise to "^1.0.0".

## 1.0.0-preview.1.0 - 28th June, 2019

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
