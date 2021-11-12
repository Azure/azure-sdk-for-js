# Release History

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
