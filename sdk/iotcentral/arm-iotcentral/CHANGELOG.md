# Release History

## 7.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 7.0.0-beta.1 (2022-04-06)
    
**Features**

  - Added operation group PrivateEndpointConnections
  - Added operation group PrivateLinks
  - Added Interface AppsCreateOrUpdateHeaders
  - Added Interface AppsDeleteHeaders
  - Added Interface AppsUpdateHeaders
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface NetworkRuleSetIpRule
  - Added Interface NetworkRuleSets
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnectionListResult
  - Added Interface PrivateEndpointConnectionsCreateHeaders
  - Added Interface PrivateEndpointConnectionsCreateOptionalParams
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface PrivateEndpointConnectionsDeleteOptionalParams
  - Added Interface PrivateEndpointConnectionsGetOptionalParams
  - Added Interface PrivateEndpointConnectionsListOptionalParams
  - Added Interface PrivateLinkResourceListResult
  - Added Interface PrivateLinkServiceConnectionState
  - Added Interface PrivateLinksGetOptionalParams
  - Added Interface PrivateLinksListOptionalParams
  - Added Interface SystemData
  - Added Type Alias AppsDeleteResponse
  - Added Type Alias CreatedByType
  - Added Type Alias NetworkAction
  - Added Type Alias PrivateEndpointConnection
  - Added Type Alias PrivateEndpointConnectionProvisioningState
  - Added Type Alias PrivateEndpointConnectionsCreateResponse
  - Added Type Alias PrivateEndpointConnectionsDeleteResponse
  - Added Type Alias PrivateEndpointConnectionsGetResponse
  - Added Type Alias PrivateEndpointConnectionsListResponse
  - Added Type Alias PrivateEndpointServiceConnectionStatus
  - Added Type Alias PrivateLinkResource
  - Added Type Alias PrivateLinksGetResponse
  - Added Type Alias PrivateLinksListResponse
  - Added Type Alias ProvisioningState
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias TrackedResource
  - Interface AppPatch has a new optional parameter networkRuleSets
  - Interface AppPatch has a new optional parameter privateEndpointConnections
  - Interface AppPatch has a new optional parameter provisioningState
  - Interface AppPatch has a new optional parameter publicNetworkAccess
  - Interface Resource has a new optional parameter systemData
  - Class IotCentralClient has a new parameter privateEndpointConnections
  - Class IotCentralClient has a new parameter privateLinks
  - Add parameters of TrackedResource to TypeAlias App
  - Add parameters of AppsCreateOrUpdateHeaders to TypeAlias AppsCreateOrUpdateResponse
  - Type Alias App has a new parameter provisioningState
  - Type Alias App has a new parameter publicNetworkAccess
  - Type Alias App has a new parameter networkRuleSets
  - Type Alias App has a new parameter privateEndpointConnections
  - Added Enum KnownCreatedByType
  - Added Enum KnownNetworkAction
  - Added Enum KnownPrivateEndpointConnectionProvisioningState
  - Added Enum KnownPrivateEndpointServiceConnectionStatus
  - Added Enum KnownProvisioningState
  - Added Enum KnownPublicNetworkAccess

**Breaking Changes**

  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Delete parameters of Resource in TypeAlias App
    
    
## 6.0.0 (2022-01-19)

The package of @azure/arm-iotcentral is using our next generation design principles since version 6.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
