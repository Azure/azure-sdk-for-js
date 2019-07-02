
### 2019-7-3 1.0.0-preview.6

- Include bug fix where token audience was being set to work only with Event Hubs. The appropriate token audience now needs to be explicitly set on the credentials at time of creation. [PR 4098](https://github.com/Azure/azure-sdk-for-js/pull/4098)
- Document usage of AAD tokens and known issue with token expiry usage on MSI based credentials with AAD authentication. [PR 4148](https://github.com/Azure/azure-sdk-for-js/pull/4148)

### 2019-5-6 1.0.0-preview.5

- Updated dependencies to include @types/async-lock to fix Typescript compile error "TS7016: Could not find a declaration file for module 'async-lock'". [PR 2703](https://github.com/Azure/azure-sdk-for-js/pull/2703)

### 2019-4-22 1.0.0-preview.3

- Update the `isNode` utility to return `true` when run in Electron applications. [PR 40](https://github.com/Azure/amqp-common-js/pull/40)
- Add `webSocketConstructorOptions` as a property in `ConnectionConfig` object, so that the relevant options can be set by the user to enable the use of proxy. [PR 43](https://github.com/Azure/amqp-common-js/pull/43)
- Change the size limit on the User Agent string from 128 to 512. [PR 42](https://github.com/Azure/amqp-common-js/pull/42)
- Export new constant `aadServiceBusAudience` to fix [Bug 30](https://github.com/Azure/amqp-common-js/issues/30). [PR 46](https://github.com/Azure/amqp-common-js/pull/46)
- Export new constant `associatedLinkName` which holds the property name for `assocaited-link-name` which should be set in order to enable Service Bus to do optimizations on it's end. [PR 47](https://github.com/Azure/amqp-common-js/pull/47)
- In the `translate` method, built-in errors like `TypeError` and `RangeError` are now treated as non-retryable errors and do not get converted into new `MessagingError` objects as they are related to user input issues and not messaging problems. This allows the caller of this method to use `instanceOf` on such errors and get the right error types. [PR 51](https://github.com/Azure/amqp-common-js/pull/51) and [PR 54](https://github.com/Azure/amqp-common-js/pull/54)

### 2019-3-22 1.0.0-preview.2

- Added support for browser and websockets.
- A network connection lost error is now treated as retryable error. A new error with name `ConnectionLostError` is introduced for this scenario.

### 2019-1-15 1.0.0-preview.1

- Enabled esModuleInterop flag for the TypeScript compiler.

### 2018-12-15 0.1.9

- Added constants for rule and filter descriptors as defined in the [service bus docs](https://docs.microsoft.com/en-us/azure/service-bus-messaging/service-bus-amqp-request-response#rule-operations)

### 2018-12-10 0.1.8

- Exposed `operationTimeoutInSeconds` as an optional property of `CreateConnectionContextBaseParameters`.

### 2018-10-19 0.1.7

- message_id in the request for `RequestResponseLink.sendRequest()` should be different in every attempt.

### 2018-10-19 0.1.6

- Fixed error stack propagation
- Added more constants

### 2018-10-17 0.1.5

- Updated error code mappers
- Added more constants
- Added support for handling servicebus response properties in the request/response operations
- Fixed a bug in the `sendRequest()` method which ensures that the operation will actually be
  retried, rather than returning the previously rejected promise.
- Removed dependency from `uuid`, since `rhea` supports basic uuid operations.

### 2018-10-03 0.1.4

- `ConnectionConfig.entityPath` is optional. Hence, `ConnectionConfig.create()` and
  `ConnectionConfig.validate()` will not throw an error if `entityPath` is not defined. However,
  other connection configs (EventHubConnectionConfig) that extend the base `ConnectionConfig` can have
  `entityPath` as a required property.

### 2018-09-29 0.1.3

- Added a new method `EventHubConnectionConfig.createFromConnectionConfig()` to create an
  eventhub connection config from the base connection config.
- Added `IotHubConnectionConfig` that parses an iothub connection string and provided an
  iothub connection config.
- Exported `AsyncLock` from the package.

### 2018-09-28 0.1.2

- connection property should be "user-agent" and not "userAgent".
- `"rhea-promise"` will be a peer dependency rather than a direct dependency. This ensures,
  that only one copy of `"rhea-promise"` is present and avoids type encoding issues.
- Added examples for send and receive along with cbs authentication.
- Added `EventHubConnectionConfig` to make it easy for customers to get sender/receiver audience/address.

### 2018-09-26 0.1.1

- Update min versions of dependencies "rhea-promise", "ms-rest-azure" and remove "ms-rest" from dependencies.
- export function `randomNumberFromInterval()`.

### 2018-09-23 0.1.0

- Initial version of the library
