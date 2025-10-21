# Release History

## 1.0.0-beta.5 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.4 (2025-08-22)

### Other Changes

  - Other fixes

## 1.0.0-beta.3 (2024-08-23)
Compared with version 1.0.0-beta.2
    
### Features Added

  - Added operation group ClusterLibraries
  - Added operation group ClusterPoolUpgradeHistories
  - Added operation group ClusterUpgradeHistories
  - Added operation Clusters.beginUpgradeManualRollback
  - Added operation Clusters.beginUpgradeManualRollbackAndWait
  - Added Interface ClusterAksPatchUpgradeHistoryProperties
  - Added Interface ClusterAvailableInPlaceUpgradeProperties
  - Added Interface ClusterAvailableUpgradePatchVersionUpgradeProperties
  - Added Interface ClusterHotfixUpgradeHistoryProperties
  - Added Interface ClusterHotfixUpgradeRollbackHistoryProperties
  - Added Interface ClusterInPlaceUpgradeHistoryProperties
  - Added Interface ClusterInPlaceUpgradeProperties
  - Added Interface ClusterLibrariesListNextOptionalParams
  - Added Interface ClusterLibrariesListOptionalParams
  - Added Interface ClusterLibrariesManageLibrariesHeaders
  - Added Interface ClusterLibrariesManageLibrariesOptionalParams
  - Added Interface ClusterLibrary
  - Added Interface ClusterLibraryList
  - Added Interface ClusterLibraryManagementOperation
  - Added Interface ClusterLibraryManagementOperationProperties
  - Added Interface ClusterLibraryProperties
  - Added Interface ClusterPatchVersionUpgradeHistoryProperties
  - Added Interface ClusterPatchVersionUpgradeProperties
  - Added Interface ClusterPatchVersionUpgradeRollbackHistoryProperties
  - Added Interface ClusterPoolAksPatchUpgradeHistoryProperties
  - Added Interface ClusterPoolNodeOsUpgradeHistoryProperties
  - Added Interface ClusterPoolUpgradeHistoriesListNextOptionalParams
  - Added Interface ClusterPoolUpgradeHistoriesListOptionalParams
  - Added Interface ClusterPoolUpgradeHistory
  - Added Interface ClusterPoolUpgradeHistoryListResult
  - Added Interface ClusterPoolUpgradeHistoryProperties
  - Added Interface ClustersUpgradeManualRollbackHeaders
  - Added Interface ClustersUpgradeManualRollbackOptionalParams
  - Added Interface ClusterUpgradeHistoriesListNextOptionalParams
  - Added Interface ClusterUpgradeHistoriesListOptionalParams
  - Added Interface ClusterUpgradeHistory
  - Added Interface ClusterUpgradeHistoryListResult
  - Added Interface ClusterUpgradeHistoryProperties
  - Added Interface ClusterUpgradeRollback
  - Added Interface ClusterUpgradeRollbackProperties
  - Added Interface IpTag
  - Added Interface ManagedIdentityProfile
  - Added Interface ManagedIdentitySpec
  - Added Interface MavenLibraryProperties
  - Added Interface PyPiLibraryProperties
  - Added Type Alias Category
  - Added Type Alias ClusterAvailableInPlaceUpgradePropertiesUnion
  - Added Type Alias ClusterInPlaceUpgradeHistoryPropertiesUnion
  - Added Type Alias ClusterInPlaceUpgradePropertiesUnion
  - Added Type Alias ClusterLibrariesListNextResponse
  - Added Type Alias ClusterLibrariesListResponse
  - Added Type Alias ClusterLibrariesManageLibrariesResponse
  - Added Type Alias ClusterLibraryPropertiesUnion
  - Added Type Alias ClusterPoolUpgradeHistoriesListNextResponse
  - Added Type Alias ClusterPoolUpgradeHistoriesListResponse
  - Added Type Alias ClusterPoolUpgradeHistoryPropertiesUnion
  - Added Type Alias ClusterPoolUpgradeHistoryType
  - Added Type Alias ClusterPoolUpgradeHistoryUpgradeResultType
  - Added Type Alias ClustersUpgradeManualRollbackResponse
  - Added Type Alias ClusterUpgradeHistoriesListNextResponse
  - Added Type Alias ClusterUpgradeHistoriesListResponse
  - Added Type Alias ClusterUpgradeHistoryPropertiesUnion
  - Added Type Alias ClusterUpgradeHistorySeverityType
  - Added Type Alias ClusterUpgradeHistoryType
  - Added Type Alias ClusterUpgradeHistoryUpgradeResultType
  - Added Type Alias LibraryManagementAction
  - Added Type Alias ManagedIdentityType
  - Added Type Alias Status
  - Added Type Alias Type
  - Interface ClusterPoolComputeProfile has a new optional parameter availabilityZones
  - Interface ClusterPoolProfile has a new optional parameter publicIpTag
  - Interface ClusterProfile has a new optional parameter managedIdentityProfile
  - Interface ComputeProfile has a new optional parameter availabilityZones
  - Interface SshProfile has a new optional parameter vmSize
  - Interface UpdatableClusterProfile has a new optional parameter secretsProfile
  - Interface UpdatableClusterProfile has a new optional parameter trinoProfile
  - Type of parameter upgradeType of interface ClusterAvailableUpgradeProperties is changed from "AKSPatchUpgrade" | "HotfixUpgrade" to "AKSPatchUpgrade" | "ClusterAvailableInPlaceUpgradeProperties" | "HotfixUpgrade" | "PatchVersionUpgrade"
  - Type of parameter upgradeType of interface ClusterUpgradeProperties is changed from "AKSPatchUpgrade" | "HotfixUpgrade" to "AKSPatchUpgrade" | "ClusterInPlaceUpgradeProperties" | "HotfixUpgrade" | "PatchVersionUpgrade"
  - Added Enum KnownCategory
  - Added Enum KnownClusterPoolUpgradeHistoryType
  - Added Enum KnownClusterPoolUpgradeHistoryUpgradeResultType
  - Added Enum KnownClusterUpgradeHistorySeverityType
  - Added Enum KnownClusterUpgradeHistoryType
  - Added Enum KnownClusterUpgradeHistoryUpgradeResultType
  - Added Enum KnownLibraryManagementAction
  - Added Enum KnownManagedIdentityType
  - Added Enum KnownStatus
  - Added Enum KnownType
  - Enum KnownClusterAvailableUpgradeType has a new value PatchVersionUpgrade
  - Enum KnownClusterUpgradeType has a new value PatchVersionUpgrade

### Breaking Changes

  - Interface KafkaProfile no longer has parameter clusterIdentity
    
    
## 1.0.0-beta.2 (2024-04-03)
    
### Features Added

  - Added operation group ClusterAvailableUpgrades
  - Added operation group ClusterPoolAvailableUpgrades
  - Added operation ClusterPools.beginUpgrade
  - Added operation ClusterPools.beginUpgradeAndWait
  - Added operation Clusters.beginUpgrade
  - Added operation Clusters.beginUpgradeAndWait
  - Added Interface ClusterAccessProfile
  - Added Interface ClusterAKSPatchVersionUpgradeProperties
  - Added Interface ClusterAvailableUpgrade
  - Added Interface ClusterAvailableUpgradeAksPatchUpgradeProperties
  - Added Interface ClusterAvailableUpgradeHotfixUpgradeProperties
  - Added Interface ClusterAvailableUpgradeList
  - Added Interface ClusterAvailableUpgradeProperties
  - Added Interface ClusterAvailableUpgradesListNextOptionalParams
  - Added Interface ClusterAvailableUpgradesListOptionalParams
  - Added Interface ClusterHotfixUpgradeProperties
  - Added Interface ClusterPatchProperties
  - Added Interface ClusterPoolAKSPatchVersionUpgradeProperties
  - Added Interface ClusterPoolAvailableUpgrade
  - Added Interface ClusterPoolAvailableUpgradeAksPatchUpgradeProperties
  - Added Interface ClusterPoolAvailableUpgradeList
  - Added Interface ClusterPoolAvailableUpgradeNodeOsUpgradeProperties
  - Added Interface ClusterPoolAvailableUpgradeProperties
  - Added Interface ClusterPoolAvailableUpgradesListNextOptionalParams
  - Added Interface ClusterPoolAvailableUpgradesListOptionalParams
  - Added Interface ClusterPoolNodeOsImageUpdateProperties
  - Added Interface ClusterPoolResourceProperties
  - Added Interface ClusterPoolsUpgradeHeaders
  - Added Interface ClusterPoolsUpgradeOptionalParams
  - Added Interface ClusterPoolUpgrade
  - Added Interface ClusterPoolUpgradeProperties
  - Added Interface ClusterPoolVersionProperties
  - Added Interface ClusterRangerPluginProfile
  - Added Interface ClusterResizeProperties
  - Added Interface ClusterResourceProperties
  - Added Interface ClustersUpgradeHeaders
  - Added Interface ClustersUpgradeOptionalParams
  - Added Interface ClusterUpgrade
  - Added Interface ClusterUpgradeProperties
  - Added Interface ClusterVersionProperties
  - Added Interface DiskStorageProfile
  - Added Interface FlinkJobProfile
  - Added Interface KafkaConnectivityEndpoints
  - Added Interface KafkaProfile
  - Added Interface RangerAdminSpec
  - Added Interface RangerAdminSpecDatabase
  - Added Interface RangerAuditSpec
  - Added Interface RangerProfile
  - Added Interface RangerUsersyncSpec
  - Added Interface TrinoDebugConfig
  - Added Type Alias ClusterAvailableUpgradePropertiesUnion
  - Added Type Alias ClusterAvailableUpgradesListNextResponse
  - Added Type Alias ClusterAvailableUpgradesListResponse
  - Added Type Alias ClusterAvailableUpgradeType
  - Added Type Alias ClusterPoolAvailableUpgradePropertiesUnion
  - Added Type Alias ClusterPoolAvailableUpgradesListNextResponse
  - Added Type Alias ClusterPoolAvailableUpgradesListResponse
  - Added Type Alias ClusterPoolAvailableUpgradeType
  - Added Type Alias ClusterPoolsUpgradeResponse
  - Added Type Alias ClusterPoolUpgradePropertiesUnion
  - Added Type Alias ClusterPoolUpgradeType
  - Added Type Alias ClustersUpgradeResponse
  - Added Type Alias ClusterUpgradePropertiesUnion
  - Added Type Alias ClusterUpgradeType
  - Added Type Alias CurrentClusterAksVersionStatus
  - Added Type Alias CurrentClusterPoolAksVersionStatus
  - Added Type Alias DataDiskType
  - Added Type Alias DbConnectionAuthenticationMode
  - Added Type Alias DeploymentMode
  - Added Type Alias MetastoreDbConnectionAuthenticationMode
  - Added Type Alias OutboundType
  - Added Type Alias RangerUsersyncMode
  - Added Type Alias Severity
  - Added Type Alias UpgradeMode
  - Interface Cluster has a new optional parameter properties
  - Interface ClusterJobsListOptionalParams has a new optional parameter filter
  - Interface ClusterPatch has a new optional parameter properties
  - Interface ClusterPatch has a new optional parameter tags
  - Interface ClusterPool has a new optional parameter properties
  - Interface ClusterPoolNetworkProfile has a new optional parameter apiServerAuthorizedIpRanges
  - Interface ClusterPoolNetworkProfile has a new optional parameter enablePrivateApiServer
  - Interface ClusterPoolNetworkProfile has a new optional parameter outboundType
  - Interface ClusterPoolVersion has a new optional parameter properties
  - Interface ClusterProfile has a new optional parameter clusterAccessProfile
  - Interface ClusterProfile has a new optional parameter rangerPluginProfile
  - Interface ClusterProfile has a new optional parameter rangerProfile
  - Interface ClusterResizeData has a new optional parameter properties
  - Interface ClusterVersion has a new optional parameter properties
  - Interface FlinkHiveCatalogOption has a new optional parameter metastoreDbConnectionAuthenticationMode
  - Interface FlinkJobProperties has a new optional parameter runId
  - Interface FlinkProfile has a new optional parameter deploymentMode
  - Interface FlinkProfile has a new optional parameter jobSpec
  - Interface HiveCatalogOption has a new optional parameter metastoreDbConnectionAuthenticationMode
  - Interface ServiceConfigResult has a new optional parameter properties
  - Interface SparkMetastoreSpec has a new optional parameter dbConnectionAuthenticationMode
  - Interface SshConnectivityEndpoint has a new optional parameter privateSshEndpoint
  - Interface TrinoCoordinator has a new optional parameter debug
  - Interface TrinoWorker has a new optional parameter debug
  - Interface UpdatableClusterProfile has a new optional parameter rangerPluginProfile
  - Interface UpdatableClusterProfile has a new optional parameter rangerProfile
  - Interface WebConnectivityEndpoint has a new optional parameter privateFqdn
  - Added Enum KnownClusterAvailableUpgradeType
  - Added Enum KnownClusterPoolAvailableUpgradeType
  - Added Enum KnownClusterPoolUpgradeType
  - Added Enum KnownClusterUpgradeType
  - Added Enum KnownCurrentClusterAksVersionStatus
  - Added Enum KnownCurrentClusterPoolAksVersionStatus
  - Added Enum KnownDataDiskType
  - Added Enum KnownDbConnectionAuthenticationMode
  - Added Enum KnownDeploymentMode
  - Added Enum KnownMetastoreDbConnectionAuthenticationMode
  - Added Enum KnownOutboundType
  - Added Enum KnownRangerUsersyncMode
  - Added Enum KnownSeverity
  - Added Enum KnownUpgradeMode
  - Enum KnownAction has a new value LastStateUpdate
  - Enum KnownAction has a new value RELaunch

### Breaking Changes

  - Interface Cluster no longer has parameter clusterProfile
  - Interface Cluster no longer has parameter clusterType
  - Interface Cluster no longer has parameter computeProfile
  - Interface Cluster no longer has parameter deploymentId
  - Interface Cluster no longer has parameter provisioningState
  - Interface Cluster no longer has parameter status
  - Interface ClusterInstanceViewResult no longer has parameter serviceStatuses
  - Interface ClusterInstanceViewResult no longer has parameter status
  - Interface ClusterPatch no longer has parameter clusterProfile
  - Interface ClusterPool no longer has parameter aksClusterProfile
  - Interface ClusterPool no longer has parameter aksManagedResourceGroupName
  - Interface ClusterPool no longer has parameter clusterPoolProfile
  - Interface ClusterPool no longer has parameter computeProfile
  - Interface ClusterPool no longer has parameter deploymentId
  - Interface ClusterPool no longer has parameter logAnalyticsProfile
  - Interface ClusterPool no longer has parameter managedResourceGroupName
  - Interface ClusterPool no longer has parameter networkProfile
  - Interface ClusterPool no longer has parameter provisioningState
  - Interface ClusterPool no longer has parameter status
  - Interface ClusterPoolVersion no longer has parameter aksVersion
  - Interface ClusterPoolVersion no longer has parameter clusterPoolVersion
  - Interface ClusterPoolVersion no longer has parameter isPreview
  - Interface ClusterResizeData no longer has parameter targetWorkerNodeCount
  - Interface ClusterVersion no longer has parameter clusterPoolVersion
  - Interface ClusterVersion no longer has parameter clusterType
  - Interface ClusterVersion no longer has parameter clusterVersion
  - Interface ClusterVersion no longer has parameter components
  - Interface ClusterVersion no longer has parameter isPreview
  - Interface ClusterVersion no longer has parameter ossVersion
  - Interface ServiceConfigResult no longer has parameter componentName
  - Interface ServiceConfigResult no longer has parameter content
  - Interface ServiceConfigResult no longer has parameter customKeys
  - Interface ServiceConfigResult no longer has parameter defaultKeys
  - Interface ServiceConfigResult no longer has parameter fileName
  - Interface ServiceConfigResult no longer has parameter path
  - Interface ServiceConfigResult no longer has parameter serviceName
  - Interface ServiceConfigResult no longer has parameter type
  - Interface TrinoCoordinator no longer has parameter enable
  - Interface TrinoCoordinator no longer has parameter port
  - Interface TrinoCoordinator no longer has parameter suspend
  - Interface TrinoWorker no longer has parameter enable
  - Interface TrinoWorker no longer has parameter port
  - Interface TrinoWorker no longer has parameter suspend
  - Interface ClusterInstanceViewResult has a new required parameter properties
  - Type of parameter kafkaProfile of interface ClusterProfile is changed from {
        [propertyName: string]: any;
    } to KafkaProfile
    
    
## 1.0.0-beta.1 (2023-08-23)

The package of @azure/arm-hdinsightcontainers is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
