# Release History

## 1.1.0-beta.2 (2022-04-25)

### Features Added

- Migrated from using `@azure/core-http` to `@azure/core-rest-pipeline` for the handling of HTTP requests. See [Azure Core v1 vs v2](https://github.com/Azure/azure-sdk-for-js/blob/main/sdk/core/core-rest-pipeline/documentation/core2.md) for more on the difference and benefits of the move.

## 1.1.0-beta.1 (2022-03-10)

### Features Added

- Adding optional parameter to GetRelayConfiguration to choose credential Time-To-Live in seconds of max 48 hours.
  The default value will be used if given value exceeds it.

### Breaking Changes

- Making User, RouteType and Ttl part of the options parameter
- getRelayConfiguration can be called without parameters or passing the GetRelayConfigurationOptions parameter

## 1.0.0 (2022-02-04) (Deprecated)

### Other Changes

Stable version of NetworkTraversal

## 1.0.0-beta.3 (2021-11-18)

### Features Added

- Making user identity an optional argument when calling GetRelayConfiguration and GetRelayConfigurationAsync
- Adding optional parameter to GetRelayConfiguration to choose a RouteType

## 1.0.0-beta.2 (2021-07-22)

### Features Added

- With the dropping of support for Node.js versions that are no longer in LTS, the dependency on `@types/node` has been updated to version 12. Read our [support policy](https://github.com/Azure/azure-sdk-for-js/blob/main/SUPPORT.md) for more details.

### Breaking Changes

- Renamed `CommunicationTurnServer` to `CommunicationIceServer`
- Renamed `turnServers` to `iceServers`
- Renamed `CommunicationNetworkTraversalIssueTurnCredentialsResponse` to `CommunicationNetworkTraversalIssueRelayConfigurationResponse`
- Renamed `issueTurnCredentials` to `issueRelayConfiguration`

## 1.0.0-beta.1 (2021-05-24)

The first preview of the Azure Communication Relay Client has the following features:

- get a Relay Configuration by creating a `CommunicationRelayClient`

### Added

- Added `CommunicationRelayClient` in preview.
- Added `CommunicationRelayClient.getRelayConfiguration` in preview.
