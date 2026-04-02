# Release History

## 4.0.0-beta.1 (2026-04-02)
Compared with version 3.0.0

### Features Added
  - Added operation group UnsupportedVmSizesOperations
  - Added operation ApplicationsOperations.createOrUpdate
  - Added operation ApplicationsOperations.delete
  - Added operation ApplicationsOperations.update
  - Added operation ApplicationTypesOperations.delete
  - Added operation ApplicationTypeVersionsOperations.createOrUpdate
  - Added operation ApplicationTypeVersionsOperations.delete
  - Added operation ClustersOperations.createOrUpdate
  - Added operation ClustersOperations.update
  - Added operation ServicesOperations.createOrUpdate
  - Added operation ServicesOperations.delete
  - Added operation ServicesOperations.update
  - Added Interface ApplicationTypeResourceProperties
  - Added Interface ApplicationTypeVersionResourceProperties
  - Added Interface ArmProxyResource
  - Added Interface ClusterProperties
  - Added Interface ClusterPropertiesUpdateParameters
  - Added Interface Notification
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface TrackedResource
  - Added Interface UnsupportedVmSizesGetOptionalParams
  - Added Interface UnsupportedVmSizesListOptionalParams
  - Added Interface VMSize
  - Added Interface VMSizeResource
  - Interface Cluster has a new optional parameter enableHttpGatewayExclusiveAuthMode
  - Interface ClusterUpdateParameters has a new optional parameter enableHttpGatewayExclusiveAuthMode
  - Interface NodeTypeDescription has a new optional parameter httpGatewayTokenAuthEndpointPort
  - Interface ServiceResource has a new optional parameter properties
  - Interface ServiceResourceUpdate has a new optional parameter properties
  - Interface StatelessServiceProperties has a new optional parameter minInstanceCount
  - Interface StatelessServiceProperties has a new optional parameter minInstancePercentage
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Interface ApplicationResourceList
  - Removed Interface ApplicationTypeResourceList
  - Removed Interface ApplicationTypeVersionResourceList
  - Removed Interface Notification_2
  - Removed Interface ServiceResourceList
  - Type of parameter partitionScheme of interface PartitionSchemeDescription is changed from "Named" | "Singleton" | "UniformInt64Range" to PartitionScheme
  - Type of parameter type of interface ServicePlacementPolicyDescription is changed from "ServicePlacementPolicyDescription" to ServicePlacementPolicyType
  - Interface Resource no longer has parameter etag
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Interface ServiceResource no longer has parameter correlationScheme
  - Interface ServiceResource no longer has parameter defaultMoveCost
  - Interface ServiceResource no longer has parameter partitionDescription
  - Interface ServiceResource no longer has parameter placementConstraints
  - Interface ServiceResource no longer has parameter provisioningState
  - Interface ServiceResource no longer has parameter serviceDnsName
  - Interface ServiceResource no longer has parameter serviceKind
  - Interface ServiceResource no longer has parameter serviceLoadMetrics
  - Interface ServiceResource no longer has parameter servicePackageActivationMode
  - Interface ServiceResource no longer has parameter servicePlacementPolicies
  - Interface ServiceResource no longer has parameter serviceTypeName
  - Interface ServiceResourceUpdate no longer has parameter correlationScheme
  - Interface ServiceResourceUpdate no longer has parameter defaultMoveCost
  - Interface ServiceResourceUpdate no longer has parameter placementConstraints
  - Interface ServiceResourceUpdate no longer has parameter serviceKind
  - Interface ServiceResourceUpdate no longer has parameter serviceLoadMetrics
  - Interface ServiceResourceUpdate no longer has parameter servicePlacementPolicies
  - Parameter value of interface ClusterCodeVersionsListResult is now required
  - Type alias "PartitionSchemeDescriptionUnion" has been changed
  - Type alias "ServiceResourcePropertiesUnion" has been changed
  - Type alias "ServiceResourceUpdatePropertiesUnion" has been changed

    
## 3.0.0 (2023-12-05)
    
### Features Added

  - Added Interface ApplicationsListNextOptionalParams
  - Added Interface ApplicationTypesListNextOptionalParams
  - Added Interface ApplicationTypeVersionsListNextOptionalParams
  - Added Interface ClustersListByResourceGroupNextOptionalParams
  - Added Interface ClustersListNextOptionalParams
  - Added Interface ServicesListNextOptionalParams
  - Added Type Alias ApplicationsListNextResponse
  - Added Type Alias ApplicationTypesListNextResponse
  - Added Type Alias ApplicationTypeVersionsListNextResponse
  - Added Type Alias ClustersListByResourceGroupNextResponse
  - Added Type Alias ClustersListNextResponse
  - Added Type Alias ClusterVersionsEnvironment
  - Added Type Alias ServicesListNextResponse
  - Added Enum KnownClusterVersionsEnvironment

### Breaking Changes

  - Operation ClusterVersions.getByEnvironment has a new signature
  - Operation ClusterVersions.listByEnvironment has a new signature
  - Removed Enum KnownEnum14
    
    
## 2.1.0 (2022-12-12)
    
### Features Added

  - Added Interface ApplicationResource
  - Added Interface ApplicationResourceProperties
  - Added Interface ApplicationResourceUpdate
  - Added Interface ApplicationTypeResource
  - Added Interface ApplicationTypeVersionResource
  - Added Interface Cluster
  - Added Interface NamedPartitionSchemeDescription
  - Added Interface ServiceResource
  - Added Interface ServiceResourceProperties
  - Added Interface ServiceResourceUpdate
  - Added Interface ServiceResourceUpdateProperties
  - Added Interface SingletonPartitionSchemeDescription
  - Added Interface StatefulServiceProperties
  - Added Interface StatefulServiceUpdateProperties
  - Added Interface StatelessServiceProperties
  - Added Interface StatelessServiceUpdateProperties
  - Added Interface UniformInt64RangePartitionSchemeDescription
    
## 2.0.1 (2022-05-01)

### Features Added

  - Bug fix


## 2.0.0 (2021-12-13)

The package of @azure/arm-servicefabric is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
