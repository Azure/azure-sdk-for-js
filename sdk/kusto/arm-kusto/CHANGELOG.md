# Release History
    
## 7.3.0 (2023-02-07)
    
**Features**

  - Added operation group Skus
  - Added Interface CosmosDbDataConnection
  - Added Interface ResourceSkuCapabilities
  - Added Interface ResourceSkuZoneDetails
  - Added Interface SkusListOptionalParams
  - Added Type Alias LanguageExtensionImageName
  - Added Type Alias SkusListResponse
  - Interface LanguageExtension has a new optional parameter languageExtensionImageName
  - Interface SkuLocationInfoItem has a new optional parameter zoneDetails
  - Interface TableLevelSharingProperties has a new optional parameter functionsToExclude
  - Interface TableLevelSharingProperties has a new optional parameter functionsToInclude
  - Added Enum KnownLanguageExtensionImageName
  - Enum KnownAzureSkuName has a new value StandardL32AsV3
  - Enum KnownAzureSkuName has a new value StandardL32SV3
  - Enum KnownDataConnectionKind has a new value CosmosDb
  - Enum KnownProvisioningState has a new value Canceled
    
## 7.2.1 (2023-01-11)

**Features**

  - Exposes `getContinuationToken` helper function to extract continuation token

**Bugs Fixed**

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 7.2.0 (2022-09-15)

**Features**

  - Added Interface AttachedDatabaseConfiguration
  - Added Interface Cluster
  - Added Interface ClusterPrincipalAssignment
  - Added Interface ClusterUpdate
  - Added Interface Database
  - Added Interface DatabasePrincipalAssignment
  - Added Interface DataConnection
  - Added Interface EventGridDataConnection
  - Added Interface EventHubDataConnection
  - Added Interface IotHubDataConnection
  - Added Interface ManagedPrivateEndpoint
  - Added Interface OutboundNetworkDependenciesEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface ReadOnlyFollowingDatabase
  - Added Interface ReadWriteDatabase
  - Added Interface Script
  - Added Interface TrackedResource
  - Added Type Alias CallerRole
  - Added Type Alias DatabaseShareOrigin
  - Interface DatabasesCreateOrUpdateOptionalParams has a new optional parameter callerRole
  - Interface DatabasesUpdateOptionalParams has a new optional parameter callerRole
  - Interface FollowerDatabaseDefinition has a new optional parameter databaseShareOrigin
  - Interface FollowerDatabaseDefinition has a new optional parameter tableLevelSharingProperties
  - Added Enum KnownCallerRole
  - Added Enum KnownDatabaseShareOrigin
  - Enum KnownAzureSkuName has a new value StandardE16DV4
  - Enum KnownAzureSkuName has a new value StandardE16DV5
  - Enum KnownAzureSkuName has a new value StandardE2DV4
  - Enum KnownAzureSkuName has a new value StandardE2DV5
  - Enum KnownAzureSkuName has a new value StandardE4DV4
  - Enum KnownAzureSkuName has a new value StandardE4DV5
  - Enum KnownAzureSkuName has a new value StandardE8DV4
  - Enum KnownAzureSkuName has a new value StandardE8DV5
  - Enum KnownAzureSkuName has a new value StandardEC16AdsV5
  - Enum KnownAzureSkuName has a new value StandardEC16AsV53TBPS
  - Enum KnownAzureSkuName has a new value StandardEC16AsV54TBPS
  - Enum KnownAzureSkuName has a new value StandardEC8AdsV5
  - Enum KnownAzureSkuName has a new value StandardEC8AsV51TBPS
  - Enum KnownAzureSkuName has a new value StandardEC8AsV52TBPS
  - Enum KnownAzureSkuName has a new value StandardL16AsV3
  - Enum KnownAzureSkuName has a new value StandardL16SV3
  - Enum KnownAzureSkuName has a new value StandardL8AsV3
  - Enum KnownAzureSkuName has a new value StandardL8SV3
    
## 7.1.2 (2022-06-17)

**Features**

  - Bug fix   
 
## 7.1.1 (2022-04-24)

**Features**

  - Bug fix   

## 7.1.0 (2022-02-23)
    
**Features**

  - Added operation group OperationsResultsLocation
  - Added Interface ClustersUpdateHeaders
  - Added Interface DatabasesUpdateHeaders
  - Added Interface DataConnectionsUpdateHeaders
  - Added Interface ManagedPrivateEndpointsUpdateHeaders
  - Added Interface OperationsResultsLocationGetOptionalParams
  - Added Interface ScriptsUpdateHeaders
  - Added Type Alias DatabaseRouting
  - Added Type Alias PublicIPType
  - Interface OperationResult has a new optional parameter provisioningState
  - Class KustoManagementClient has a new parameter operationsResultsLocation
  - Type Alias Cluster has a new parameter publicIPType
  - Type Alias Cluster has a new parameter virtualClusterGraduationProperties
  - Type Alias Cluster has a new parameter privateEndpointConnections
  - Type Alias ClusterPrincipalAssignment has a new parameter aadObjectId
  - Type Alias ClusterUpdate has a new parameter publicIPType
  - Type Alias ClusterUpdate has a new parameter virtualClusterGraduationProperties
  - Type Alias ClusterUpdate has a new parameter privateEndpointConnections
  - Type Alias DatabasePrincipalAssignment has a new parameter aadObjectId
  - Type Alias EventGridDataConnection has a new parameter eventGridResourceId
  - Type Alias EventGridDataConnection has a new parameter managedIdentityResourceId
  - Type Alias EventGridDataConnection has a new parameter managedIdentityObjectId
  - Type Alias EventGridDataConnection has a new parameter databaseRouting
  - Type Alias EventHubDataConnection has a new parameter managedIdentityObjectId
  - Type Alias EventHubDataConnection has a new parameter databaseRouting
  - Type Alias IotHubDataConnection has a new parameter databaseRouting
  - Type Alias Script has a new parameter scriptContent
  - Added Enum KnownDatabaseRouting
  - Added Enum KnownPublicIPType
  - Enum KnownAzureSkuName has a new value StandardD16DV5
  - Enum KnownAzureSkuName has a new value StandardD32DV4
  - Enum KnownAzureSkuName has a new value StandardD32DV5
  - Enum KnownAzureSkuName has a new value StandardE16AdsV5
  - Enum KnownAzureSkuName has a new value StandardE16AsV53TBPS
  - Enum KnownAzureSkuName has a new value StandardE16AsV54TBPS
  - Enum KnownAzureSkuName has a new value StandardE16SV43TBPS
  - Enum KnownAzureSkuName has a new value StandardE16SV44TBPS
  - Enum KnownAzureSkuName has a new value StandardE16SV53TBPS
  - Enum KnownAzureSkuName has a new value StandardE16SV54TBPS
  - Enum KnownAzureSkuName has a new value StandardE2AdsV5
  - Enum KnownAzureSkuName has a new value StandardE4AdsV5
  - Enum KnownAzureSkuName has a new value StandardE8AdsV5
  - Enum KnownAzureSkuName has a new value StandardE8AsV51TBPS
  - Enum KnownAzureSkuName has a new value StandardE8AsV52TBPS
  - Enum KnownAzureSkuName has a new value StandardE8SV41TBPS
  - Enum KnownAzureSkuName has a new value StandardE8SV42TBPS
  - Enum KnownAzureSkuName has a new value StandardE8SV51TBPS
  - Enum KnownAzureSkuName has a new value StandardE8SV52TBPS
    
    
## 7.0.0 (2022-01-24)

The package of @azure/arm-kusto is using our next generation design principles since version 7.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
