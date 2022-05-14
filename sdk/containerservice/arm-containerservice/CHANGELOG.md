# Release History

## 16.1.0-beta.1 (2022-05-06)
    
**Features**

  - Added operation group ManagedClusterSnapshots
  - Added operation ManagedClusters.beginRotateServiceAccountSigningKeys
  - Added operation ManagedClusters.beginRotateServiceAccountSigningKeysAndWait
  - Added Interface AzureKeyVaultKms
  - Added Interface ManagedClusterIngressProfile
  - Added Interface ManagedClusterIngressProfileWebAppRouting
  - Added Interface ManagedClusterOidcIssuerProfile
  - Added Interface ManagedClusterPropertiesForSnapshot
  - Added Interface ManagedClusterSecurityProfileWorkloadIdentity
  - Added Interface ManagedClusterSnapshotListResult
  - Added Interface ManagedClusterSnapshotsCreateOrUpdateOptionalParams
  - Added Interface ManagedClusterSnapshotsDeleteOptionalParams
  - Added Interface ManagedClusterSnapshotsGetOptionalParams
  - Added Interface ManagedClusterSnapshotsListByResourceGroupNextOptionalParams
  - Added Interface ManagedClusterSnapshotsListByResourceGroupOptionalParams
  - Added Interface ManagedClusterSnapshotsListNextOptionalParams
  - Added Interface ManagedClusterSnapshotsListOptionalParams
  - Added Interface ManagedClusterSnapshotsUpdateTagsOptionalParams
  - Added Interface ManagedClustersRotateServiceAccountSigningKeysOptionalParams
  - Added Interface NetworkProfileForSnapshot
  - Added Type Alias ManagedClusterSnapshot
  - Added Type Alias ManagedClusterSnapshotsCreateOrUpdateResponse
  - Added Type Alias ManagedClusterSnapshotsGetResponse
  - Added Type Alias ManagedClusterSnapshotsListByResourceGroupNextResponse
  - Added Type Alias ManagedClusterSnapshotsListByResourceGroupResponse
  - Added Type Alias ManagedClusterSnapshotsListNextResponse
  - Added Type Alias ManagedClusterSnapshotsListResponse
  - Added Type Alias ManagedClusterSnapshotsUpdateTagsResponse
  - Interface AgentPoolsDeleteOptionalParams has a new optional parameter ignorePodDisruptionBudget
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter capacityReservationGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter currentOrchestratorVersion
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter hostGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter messageOfTheDay
  - Interface ManagedClusterHttpProxyConfig has a new optional parameter effectiveNoProxy
  - Interface ManagedClustersDeleteOptionalParams has a new optional parameter ignorePodDisruptionBudget
  - Interface ManagedClusterSecurityProfile has a new optional parameter azureKeyVaultKms
  - Interface ManagedClusterSecurityProfile has a new optional parameter workloadIdentity
  - Interface ManagedClusterStorageProfileDiskCSIDriver has a new optional parameter version
  - Class ContainerServiceClient has a new parameter managedClusterSnapshots
  - Type Alias AgentPool has a new parameter messageOfTheDay
  - Type Alias AgentPool has a new parameter currentOrchestratorVersion
  - Type Alias AgentPool has a new parameter capacityReservationGroupID
  - Type Alias AgentPool has a new parameter hostGroupID
  - Type Alias ManagedCluster has a new parameter creationData
  - Type Alias ManagedCluster has a new parameter currentKubernetesVersion
  - Type Alias ManagedCluster has a new parameter oidcIssuerProfile
  - Type Alias ManagedCluster has a new parameter enableNamespaceResources
  - Type Alias ManagedCluster has a new parameter ingressProfile
  - Enum KnownNetworkPlugin has a new value None
  - Enum KnownSnapshotType has a new value ManagedCluster  
    
## 16.0.0 (2022-04-20)
    
**Features**

  - Added Interface ManagedClusterStorageProfile
  - Added Interface ManagedClusterStorageProfileDiskCSIDriver
  - Added Interface ManagedClusterStorageProfileFileCSIDriver
  - Added Interface ManagedClusterStorageProfileSnapshotController
  - Added Type Alias TrackedResource
  - Add parameters of TrackedResource to TypeAlias ManagedCluster
  - Add parameters of TrackedResource to TypeAlias ManagedClusterAccessProfile
  - Add parameters of TrackedResource to TypeAlias Snapshot

**Breaking Changes**

  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Delete parameters of Resource in TypeAlias ManagedCluster
  - Delete parameters of Resource in TypeAlias ManagedClusterAccessProfile
  - Delete parameters of Resource in TypeAlias Snapshot
    
    
## 15.2.0 (2022-03-23)
    
**Features**

  - Interface Resource has a new optional parameter systemData
    
    
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
