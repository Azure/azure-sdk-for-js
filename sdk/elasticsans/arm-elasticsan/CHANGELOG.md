# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2023-10-09)

The package of @azure/arm-elasticsan is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).

## 1.0.0-beta.2 (2023-07-12)
    
**Features**

  - Added operation group PrivateEndpointConnections
  - Added operation group PrivateLinkResources
  - Added Interface ElasticSansDeleteHeaders
  - Added Interface ElasticSansUpdateHeaders
  - Added Interface ErrorDetail
  - Added Interface Operation
  - Added Interface OperationDisplay
  - Added Interface OperationListResult
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionListResult
  - Added Interface PrivateEndpointConnectionsCreateOptionalParams
  - Added Interface PrivateEndpointConnectionsDeleteHeaders
  - Added Interface PrivateEndpointConnectionsDeleteOptionalParams
  - Added Interface PrivateEndpointConnectionsGetOptionalParams
  - Added Interface PrivateEndpointConnectionsListOptionalParams
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkResourceListResult
  - Added Interface PrivateLinkResourcesListByElasticSanOptionalParams
  - Added Interface PrivateLinkServiceConnectionState
  - Added Interface ProxyResource
  - Added Interface VolumeGroupsDeleteHeaders
  - Added Interface VolumeGroupsUpdateHeaders
  - Added Interface VolumesDeleteHeaders
  - Added Interface VolumesUpdateHeaders
  - Added Type Alias ActionType
  - Added Type Alias Origin
  - Added Type Alias PrivateEndpointConnectionsCreateResponse
  - Added Type Alias PrivateEndpointConnectionsGetResponse
  - Added Type Alias PrivateEndpointConnectionsListResponse
  - Added Type Alias PrivateEndpointServiceConnectionStatus
  - Added Type Alias PrivateLinkResourcesListByElasticSanResponse
  - Interface ElasticSan has a new optional parameter privateEndpointConnections
  - Interface ErrorResponse has a new optional parameter error
  - Interface Resource has a new optional parameter systemData
  - Interface SkuInformationList has a new optional parameter nextLink
  - Interface TrackedResource has a new optional parameter tags
  - Interface VolumeGroup has a new optional parameter privateEndpointConnections
  - Added Enum KnownActionType
  - Added Enum KnownOrigin
  - Added Enum KnownPrivateEndpointServiceConnectionStatus
  - Added function getContinuationToken
  - Interface ElasticSan no longer has parameter systemData
  - Interface ErrorResponse no longer has parameter additionalInfo
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter details
  - Interface ErrorResponse no longer has parameter message
  - Interface ErrorResponse no longer has parameter target
  - Interface Resource no longer has parameter tags
  - Interface Volume no longer has parameter systemData
  - Interface VolumeGroup no longer has parameter systemData
  - Interface VolumeGroupUpdate no longer has parameter tags
  - Interface VolumeUpdate no longer has parameter tags
  
**Breaking Changes**

  - Parameter location of interface TrackedResource is now required
  - Parameter sizeGiB of interface Volume is now required
    
    
## 1.0.0-beta.1 (2022-10-21)

The package of @azure/arm-elasticsan is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
