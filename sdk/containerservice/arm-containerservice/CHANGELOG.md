# Release History
    
## 15.2.0-beta.1 (2022-03-22)
    
**Features**

  - Added operation group ManagedClusterSnapshots
  - Added Interface AzureKeyVaultKms
  - Added Interface ManagedClusterOidcIssuerProfile
  - Added Interface ManagedClusterPropertiesForSnapshot
  - Added Interface ManagedClusterSnapshotListResult
  - Added Interface ManagedClusterSnapshotsCreateOrUpdateOptionalParams
  - Added Interface ManagedClusterSnapshotsDeleteOptionalParams
  - Added Interface ManagedClusterSnapshotsGetOptionalParams
  - Added Interface ManagedClusterSnapshotsListByResourceGroupNextOptionalParams
  - Added Interface ManagedClusterSnapshotsListByResourceGroupOptionalParams
  - Added Interface ManagedClusterSnapshotsListNextOptionalParams
  - Added Interface ManagedClusterSnapshotsListOptionalParams
  - Added Interface ManagedClusterSnapshotsUpdateTagsOptionalParams
  - Added Interface NetworkProfileForSnapshot
  - Added Type Alias ManagedClusterSnapshot
  - Added Type Alias ManagedClusterSnapshotsCreateOrUpdateResponse
  - Added Type Alias ManagedClusterSnapshotsGetResponse
  - Added Type Alias ManagedClusterSnapshotsListByResourceGroupNextResponse
  - Added Type Alias ManagedClusterSnapshotsListByResourceGroupResponse
  - Added Type Alias ManagedClusterSnapshotsListNextResponse
  - Added Type Alias ManagedClusterSnapshotsListResponse
  - Added Type Alias ManagedClusterSnapshotsUpdateTagsResponse
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter capacityReservationGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter hostGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter messageOfTheDay
  - Interface ManagedClusterSecurityProfile has a new optional parameter azureKeyVaultKms
  - Interface Resource has a new optional parameter systemData
  - Class ContainerServiceClient has a new parameter managedClusterSnapshots
  - Type Alias AgentPool has a new parameter messageOfTheDay
  - Type Alias AgentPool has a new parameter capacityReservationGroupID
  - Type Alias AgentPool has a new parameter hostGroupID
  - Type Alias ManagedCluster has a new parameter currentKubernetesVersion
  - Type Alias ManagedCluster has a new parameter oidcIssuerProfile
  - Type Alias ManagedCluster has a new parameter enableNamespaceResources
  - Enum KnownNetworkPlugin has a new value None
  - Enum KnownSnapshotType has a new value ManagedCluster
    
    
## 15.1.0 (2022-02-24)
    
**Features**

  - Added Type Alias Format
  - Interface ManagedClustersListClusterUserCredentialsOptionalParams has a new optional parameter format
  - Added Enum KnownFormat
    
    
## 15.0.0 (2021-12-09)

The package of @azure/arm-containerservice is using our next generation design principles since version 15.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
