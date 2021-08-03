# Release History

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
