# Release History

## 1.1.4 (Unreleased)

### Features Added
- Added a `clientProtocol` option to `GenerateClientTokenOptions` to specify the type of client protocol when generating token. This option can be used to generate token and client connection URL for a specific client protocol type, such as `Default` or `MQTT`.
- Update API version to `2024-01-01`

## 1.1.3 (Unreleased)

### Features Added
- Added a `messageTtlSeconds` option to `serviceClient.sendToAll`, `serviceClient.sendToUser`, `serviceClient.sendToConnection` and `groupClient.sendToAll`. This option defines the expiration time for a message. Messages that are not consumed by the client within the specified TTL will be dropped by the service. This parameter helps when the client's bandwidth is limited.
- Added method `serviceClient.addConnectionsToGroups` to add connections to multiple groups. Target connections are specified by a filter string.
- Added method `serviceClient.removeConnectionsFromGroups` to remove connections from multiple groups. Target connections are specified by a filter string.

## 1.1.2 (2023-04-18)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.1.1 (2023-01-03)

### Other Changes

- Bumped the version of the jsonwebtoken dependency to v9.

## 1.1.0 (2022-11-11)

### Features Added
- Added method `serviceClient.removeConnectionFromAllGroups` to remove the connection from all the groups it is in.
- Added a `groups` option in `serviceClient.generateClientToken`, to enable connections join initial groups once it is connected.
- Added a `filter` parameter when sending messages to connections in a hub/group/user to filter out the connections recieving message, details about `filter` syntax please see [OData filter syntax for Azure Web PubSub](https://aka.ms/awps/filter-syntax).
- Provided a utility method `odata` to generate the `filter` parameter

### Other Changes

- Updated our `@azure/core-tracing` dependency to the latest version (1.0.0).
  - Notable changes include Removal of `@opentelemetry/api` as a transitive dependency and ensuring that the active context is properly propagated.
  - Customers who would like to continue using OpenTelemetry driven tracing should visit our [OpenTelemetry Instrumentation](https://www.npmjs.com/package/@azure/opentelemetry-instrumentation-azure-sdk) package for instructions.

## 1.0.0 (2021-11-11)

No changes.

## 1.0.0-beta.4 (2021-11-09)

### Features Added

- Support for DefaultAzureCredential
- Added support for reverse proxies, enabling usage of Web Pubsub with Azure API Management.
- Added method to close all connections in a hub `serviceClient.closeAllConnections`,
- Added method to close all connections in a group `groupClient.closeAllConnections`
- Added method to close all connections for a user `serviceClient.closeUserConnections`.

### Breaking Changes

- Renamed method `getAuthenticationToken` to `getClientAccessToken`
- Renamed method `hasUser` to `userExists`
- Renamed method `hasGroup` to `groupExists`
- Renamed method `hasConnection` to `connnectionExists`

## 1.0.0-beta.3 (2021-07-07)

### Breaking Changes

- `hasUser` has been removed from `GroupClient` as that operation is no longer supported by the service.
- Updated to have void returns for most operations. If you were previously using `RestResponse`, you can instead use the `onResponse` callback in the operation options. See README for an example.

## 1.0.0-beta.2 (2021-05-19)

Remove "url" dependency

## 1.0.0-beta.1 (2021-04-23)

This is the first release of the @azure/web-pubsub package.
