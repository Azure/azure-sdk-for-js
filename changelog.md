### 2018-09-29 0.1.3
- Added a new method `EventHubConnectionConfig.createFromConnectionConfig()` to create an 
eventhub connection config from the base connection config.
- Added `IotHubConnectionConfig` that parses an iothub connection string and provided an 
iothub connection config.

### 2018-09-28 0.1.2
- connection property should be "user-agent".
- `"rhea-promise"` will be a peer dependency rather than a direct dependency. This ensures,
that only one copy of `"rhea-promise"` is present and avoids type encoding issues.
- Added examples for send and receive along with cbs authentication.
- Added `EventHubConnectionConfig` to make it easy for customers to get sender/receiver audience/address.

### 2018-09-26 0.1.1
- Update min versions of dependencies "rhea-promise", "ms-rest-azure" and remove "ms-rest" from dependencies.
- export function `randomNumberFromInterval()`.

### 2018-09-23 0.1.0
- Initial version of the library