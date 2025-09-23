# Release History

## 1.2.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.2.1 (2025-08-21)

### Other Changes

  - Other fixes

## 1.2.0 (2024-09-11)
    
### Features Added

  - Added operation group AppAttachPackageInfo
  - Added operation group AppAttachPackageOperations
  - Added operation HostPools.listRegistrationTokens
  - Added Interface AppAttachPackage
  - Added Interface AppAttachPackageCreateOrUpdateOptionalParams
  - Added Interface AppAttachPackageDeleteOptionalParams
  - Added Interface AppAttachPackageGetOptionalParams
  - Added Interface AppAttachPackageInfoImportNextOptionalParams
  - Added Interface AppAttachPackageInfoImportOptionalParams
  - Added Interface AppAttachPackageInfoProperties
  - Added Interface AppAttachPackageList
  - Added Interface AppAttachPackageListByResourceGroupNextOptionalParams
  - Added Interface AppAttachPackageListByResourceGroupOptionalParams
  - Added Interface AppAttachPackageListBySubscriptionNextOptionalParams
  - Added Interface AppAttachPackageListBySubscriptionOptionalParams
  - Added Interface AppAttachPackagePatch
  - Added Interface AppAttachPackagePatchProperties
  - Added Interface AppAttachPackageProperties
  - Added Interface AppAttachPackageUpdateOptionalParams
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface HostPoolsListRegistrationTokensOptionalParams
  - Added Interface ImportPackageInfoRequest
  - Added Interface RegistrationTokenList
  - Added Interface RegistrationTokenMinimal
  - Added Interface TrackedResource
  - Added Type Alias AppAttachPackageArchitectures
  - Added Type Alias AppAttachPackageCreateOrUpdateResponse
  - Added Type Alias AppAttachPackageGetResponse
  - Added Type Alias AppAttachPackageInfoImportNextResponse
  - Added Type Alias AppAttachPackageInfoImportResponse
  - Added Type Alias AppAttachPackageListByResourceGroupNextResponse
  - Added Type Alias AppAttachPackageListByResourceGroupResponse
  - Added Type Alias AppAttachPackageListBySubscriptionNextResponse
  - Added Type Alias AppAttachPackageListBySubscriptionResponse
  - Added Type Alias AppAttachPackageUpdateResponse
  - Added Type Alias FailHealthCheckOnStagingFailure
  - Added Type Alias HostPoolsListRegistrationTokensResponse
  - Added Type Alias PackageTimestamped
  - Added Type Alias ProvisioningState
  - Interface ExpandMsixImage has a new optional parameter certificateExpiry
  - Interface ExpandMsixImage has a new optional parameter certificateName
  - Interface HostPool has a new optional parameter appAttachPackageReferences
  - Interface PrivateEndpointConnection has a new optional parameter groupIds
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownAppAttachPackageArchitectures
  - Added Enum KnownFailHealthCheckOnStagingFailure
  - Added Enum KnownPackageTimestamped
  - Added Enum KnownProvisioningState
  - Interface ApplicationGroup no longer has parameter systemData
  - Interface HostPool no longer has parameter systemData
  - Interface PrivateEndpointConnectionWithSystemData no longer has parameter systemData
  - Interface ResourceModelWithAllowedPropertySet no longer has parameter id
  - Interface ResourceModelWithAllowedPropertySet no longer has parameter name
  - Interface ResourceModelWithAllowedPropertySet no longer has parameter type
  - Interface ScalingPlan no longer has parameter systemData
  - Interface ScalingPlanPersonalSchedule no longer has parameter systemData
  - Interface Workspace no longer has parameter systemData
    
    
## 1.1.0 (2023-10-08)
    
### Features Added

  - Added operation group PrivateEndpointConnections
  - Added operation group PrivateLinkResources
  - Added operation group ScalingPlanPersonalSchedules
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionListResultWithSystemData
  - Added Interface PrivateEndpointConnectionsDeleteByHostPoolOptionalParams
  - Added Interface PrivateEndpointConnectionsDeleteByWorkspaceOptionalParams
  - Added Interface PrivateEndpointConnectionsGetByHostPoolOptionalParams
  - Added Interface PrivateEndpointConnectionsGetByWorkspaceOptionalParams
  - Added Interface PrivateEndpointConnectionsListByHostPoolNextOptionalParams
  - Added Interface PrivateEndpointConnectionsListByHostPoolOptionalParams
  - Added Interface PrivateEndpointConnectionsListByWorkspaceNextOptionalParams
  - Added Interface PrivateEndpointConnectionsListByWorkspaceOptionalParams
  - Added Interface PrivateEndpointConnectionsUpdateByHostPoolOptionalParams
  - Added Interface PrivateEndpointConnectionsUpdateByWorkspaceOptionalParams
  - Added Interface PrivateEndpointConnectionWithSystemData
  - Added Interface PrivateLinkResource
  - Added Interface PrivateLinkResourceListResult
  - Added Interface PrivateLinkResourcesListByHostPoolNextOptionalParams
  - Added Interface PrivateLinkResourcesListByHostPoolOptionalParams
  - Added Interface PrivateLinkResourcesListByWorkspaceNextOptionalParams
  - Added Interface PrivateLinkResourcesListByWorkspaceOptionalParams
  - Added Interface PrivateLinkServiceConnectionState
  - Added Interface ProxyResource
  - Added Interface ScalingPlanPersonalSchedule
  - Added Interface ScalingPlanPersonalScheduleList
  - Added Interface ScalingPlanPersonalSchedulePatch
  - Added Interface ScalingPlanPersonalSchedulesCreateOptionalParams
  - Added Interface ScalingPlanPersonalSchedulesDeleteOptionalParams
  - Added Interface ScalingPlanPersonalSchedulesGetOptionalParams
  - Added Interface ScalingPlanPersonalSchedulesListNextOptionalParams
  - Added Interface ScalingPlanPersonalSchedulesListOptionalParams
  - Added Interface ScalingPlanPersonalSchedulesUpdateOptionalParams
  - Added Type Alias HostpoolPublicNetworkAccess
  - Added Type Alias PrivateEndpointConnectionProvisioningState
  - Added Type Alias PrivateEndpointConnectionsGetByHostPoolResponse
  - Added Type Alias PrivateEndpointConnectionsGetByWorkspaceResponse
  - Added Type Alias PrivateEndpointConnectionsListByHostPoolNextResponse
  - Added Type Alias PrivateEndpointConnectionsListByHostPoolResponse
  - Added Type Alias PrivateEndpointConnectionsListByWorkspaceNextResponse
  - Added Type Alias PrivateEndpointConnectionsListByWorkspaceResponse
  - Added Type Alias PrivateEndpointConnectionsUpdateByHostPoolResponse
  - Added Type Alias PrivateEndpointConnectionsUpdateByWorkspaceResponse
  - Added Type Alias PrivateEndpointServiceConnectionStatus
  - Added Type Alias PrivateLinkResourcesListByHostPoolNextResponse
  - Added Type Alias PrivateLinkResourcesListByHostPoolResponse
  - Added Type Alias PrivateLinkResourcesListByWorkspaceNextResponse
  - Added Type Alias PrivateLinkResourcesListByWorkspaceResponse
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias ScalingPlanPersonalSchedulesCreateResponse
  - Added Type Alias ScalingPlanPersonalSchedulesGetResponse
  - Added Type Alias ScalingPlanPersonalSchedulesListNextResponse
  - Added Type Alias ScalingPlanPersonalSchedulesListResponse
  - Added Type Alias ScalingPlanPersonalSchedulesUpdateResponse
  - Added Type Alias SessionHandlingOperation
  - Added Type Alias SetStartVMOnConnect
  - Added Type Alias StartupBehavior
  - Interface ApplicationGroup has a new optional parameter showInFeed
  - Interface ApplicationGroupPatch has a new optional parameter showInFeed
  - Interface HostPool has a new optional parameter privateEndpointConnections
  - Interface HostPool has a new optional parameter publicNetworkAccess
  - Interface HostPoolPatch has a new optional parameter publicNetworkAccess
  - Interface Workspace has a new optional parameter privateEndpointConnections
  - Interface Workspace has a new optional parameter publicNetworkAccess
  - Interface WorkspacePatch has a new optional parameter publicNetworkAccess
  - Added Enum KnownHostpoolPublicNetworkAccess
  - Added Enum KnownPrivateEndpointConnectionProvisioningState
  - Added Enum KnownPrivateEndpointServiceConnectionStatus
  - Added Enum KnownPublicNetworkAccess
  - Added Enum KnownSessionHandlingOperation
  - Added Enum KnownSetStartVMOnConnect
  - Added Enum KnownStartupBehavior
    
    
## 1.0.0 (2023-03-09)

The package of @azure/arm-desktopvirtualization is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
