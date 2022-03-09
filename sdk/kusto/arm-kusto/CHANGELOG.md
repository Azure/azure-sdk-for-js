# Release History
    
## 7.1.1 (Unreleased)
Update generated samples from swagger examples
    

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
