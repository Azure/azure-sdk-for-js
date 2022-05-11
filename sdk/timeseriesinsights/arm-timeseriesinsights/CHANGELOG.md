# Release History

## 2.1.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.1.0-beta.1 (2022-05-05)
    
**Features**

  - Added operation group PrivateEndpointConnections
  - Added operation group PrivateLinkResources
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnectionListResult
  - Added Interface PrivateEndpointConnectionsCreateOrUpdateOptionalParams
  - Added Interface PrivateEndpointConnectionsDeleteOptionalParams
  - Added Interface PrivateEndpointConnectionsGetOptionalParams
  - Added Interface PrivateEndpointConnectionsListByEnvironmentOptionalParams
  - Added Interface PrivateLinkResourceListResult
  - Added Interface PrivateLinkResourcesListSupportedOptionalParams
  - Added Interface PrivateLinkServiceConnectionState
  - Added Type Alias PrivateEndpointConnection
  - Added Type Alias PrivateEndpointConnectionProvisioningState
  - Added Type Alias PrivateEndpointConnectionsCreateOrUpdateResponse
  - Added Type Alias PrivateEndpointConnectionsGetResponse
  - Added Type Alias PrivateEndpointConnectionsListByEnvironmentResponse
  - Added Type Alias PrivateEndpointServiceConnectionStatus
  - Added Type Alias PrivateLinkResource
  - Added Type Alias PrivateLinkResourcesListSupportedResponse
  - Added Type Alias PublicNetworkAccess
  - Class TimeSeriesInsightsClient has a new parameter privateEndpointConnections
  - Class TimeSeriesInsightsClient has a new parameter privateLinkResources
  - Type Alias Gen2EnvironmentCreateOrUpdateParameters has a new parameter publicNetworkAccess
  - Type Alias Gen2EnvironmentCreateOrUpdateParameters has a new parameter privateEndpointConnections
  - Type Alias Gen2EnvironmentResource has a new parameter publicNetworkAccess
  - Type Alias Gen2EnvironmentResource has a new parameter privateEndpointConnections
  - Type Alias Gen2EnvironmentResourceProperties has a new parameter publicNetworkAccess
  - Type Alias Gen2EnvironmentResourceProperties has a new parameter privateEndpointConnections
  - Added Enum KnownPrivateEndpointConnectionProvisioningState
  - Added Enum KnownPrivateEndpointServiceConnectionStatus
  - Added Enum KnownPublicNetworkAccess
    
    
## 2.0.0 (2022-01-21)

The package of @azure/arm-timeseriesinsights is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
