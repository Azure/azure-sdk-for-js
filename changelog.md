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