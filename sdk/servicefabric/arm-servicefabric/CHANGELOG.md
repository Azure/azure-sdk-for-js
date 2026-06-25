# Release History

## 4.0.0-beta.2 (2026-06-25)
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
  - Class ServiceFabricManagementClient has a new constructor "constructor(credential: TokenCredential, options?: ServiceFabricManagementClientOptionalParams);"
  - Added Interface ApplicationTypeResourceProperties
  - Added Interface ApplicationTypeVersionResourceProperties
  - Added Interface ArmProxyResource
  - Added Interface ClusterProperties
  - Added Interface ClusterPropertiesUpdateParameters
  - Added Interface Notification
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PatchProxyResource
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
  - Class ServiceFabricManagementClient no longer has parameter apiVersion
  - Class ServiceFabricManagementClient no longer has parameter subscriptionId
  - Removed Interface ApplicationResourceList
  - Removed Interface ApplicationTypeResourceList
  - Removed Interface ApplicationTypeVersionResourceList
  - Removed Interface Notification_2
  - Removed Interface ProxyResource
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

