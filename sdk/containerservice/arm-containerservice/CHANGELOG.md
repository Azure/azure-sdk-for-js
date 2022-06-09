# Release History
    
## 17.0.0-beta.1 (2022-06-08)
    
**Features**

  - Added operation group ManagedClusterSnapshots
  - Added operation group TrustedAccessRoleBindings
  - Added operation group TrustedAccessRoles
  - Added operation ManagedClusters.beginRotateServiceAccountSigningKeys
  - Added operation ManagedClusters.beginRotateServiceAccountSigningKeysAndWait
  - Added Interface AzureKeyVaultKms
  - Added Interface ManagedClusterIngressProfile
  - Added Interface ManagedClusterIngressProfileWebAppRouting
  - Added Interface ManagedClusterOidcIssuerProfile
  - Added Interface ManagedClusterPropertiesForSnapshot
  - Added Interface ManagedClusterSecurityProfileDefender
  - Added Interface ManagedClusterSecurityProfileDefenderSecurityMonitoring
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
  - Added Interface ManagedClusterStorageProfileBlobCSIDriver
  - Added Interface ManagedClusterWorkloadAutoScalerProfile
  - Added Interface ManagedClusterWorkloadAutoScalerProfileKeda
  - Added Interface NetworkProfileForSnapshot
  - Added Interface TrustedAccessRole
  - Added Interface TrustedAccessRoleBindingListResult
  - Added Interface TrustedAccessRoleBindingsCreateOrUpdateOptionalParams
  - Added Interface TrustedAccessRoleBindingsDeleteOptionalParams
  - Added Interface TrustedAccessRoleBindingsGetOptionalParams
  - Added Interface TrustedAccessRoleBindingsListNextOptionalParams
  - Added Interface TrustedAccessRoleBindingsListOptionalParams
  - Added Interface TrustedAccessRoleListResult
  - Added Interface TrustedAccessRoleRule
  - Added Interface TrustedAccessRolesListNextOptionalParams
  - Added Interface TrustedAccessRolesListOptionalParams
  - Added Type Alias KeyVaultNetworkAccessTypes
  - Added Type Alias ManagedClusterSnapshot
  - Added Type Alias ManagedClusterSnapshotsCreateOrUpdateResponse
  - Added Type Alias ManagedClusterSnapshotsGetResponse
  - Added Type Alias ManagedClusterSnapshotsListByResourceGroupNextResponse
  - Added Type Alias ManagedClusterSnapshotsListByResourceGroupResponse
  - Added Type Alias ManagedClusterSnapshotsListNextResponse
  - Added Type Alias ManagedClusterSnapshotsListResponse
  - Added Type Alias ManagedClusterSnapshotsUpdateTagsResponse
  - Added Type Alias NetworkPluginMode
  - Added Type Alias TrustedAccessRoleBinding
  - Added Type Alias TrustedAccessRoleBindingProvisioningState
  - Added Type Alias TrustedAccessRoleBindingsCreateOrUpdateResponse
  - Added Type Alias TrustedAccessRoleBindingsGetResponse
  - Added Type Alias TrustedAccessRoleBindingsListNextResponse
  - Added Type Alias TrustedAccessRoleBindingsListResponse
  - Added Type Alias TrustedAccessRolesListNextResponse
  - Added Type Alias TrustedAccessRolesListResponse
  - Interface AgentPoolsDeleteOptionalParams has a new optional parameter ignorePodDisruptionBudget
  - Interface ContainerServiceNetworkProfile has a new optional parameter networkPluginMode
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter capacityReservationGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter enableCustomCATrust
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter hostGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter messageOfTheDay
  - Interface ManagedClusterAPIServerAccessProfile has a new optional parameter enableVnetIntegration
  - Interface ManagedClusterAPIServerAccessProfile has a new optional parameter subnetId
  - Interface ManagedClusterHttpProxyConfig has a new optional parameter effectiveNoProxy
  - Interface ManagedClustersDeleteOptionalParams has a new optional parameter ignorePodDisruptionBudget
  - Interface ManagedClusterSecurityProfile has a new optional parameter azureKeyVaultKms
  - Interface ManagedClusterSecurityProfile has a new optional parameter defender
  - Interface ManagedClusterSecurityProfile has a new optional parameter workloadIdentity
  - Interface ManagedClusterStorageProfile has a new optional parameter blobCSIDriver
  - Interface ManagedClusterStorageProfileDiskCSIDriver has a new optional parameter version
  - Class ContainerServiceClient has a new parameter managedClusterSnapshots
  - Class ContainerServiceClient has a new parameter trustedAccessRoleBindings
  - Class ContainerServiceClient has a new parameter trustedAccessRoles
  - Type Alias AgentPool has a new parameter messageOfTheDay
  - Type Alias AgentPool has a new parameter enableCustomCATrust
  - Type Alias AgentPool has a new parameter capacityReservationGroupID
  - Type Alias AgentPool has a new parameter hostGroupID
  - Type Alias ManagedCluster has a new parameter creationData
  - Type Alias ManagedCluster has a new parameter oidcIssuerProfile
  - Type Alias ManagedCluster has a new parameter enableNamespaceResources
  - Type Alias ManagedCluster has a new parameter ingressProfile
  - Type Alias ManagedCluster has a new parameter workloadAutoScalerProfile
  - Added Enum KnownKeyVaultNetworkAccessTypes
  - Added Enum KnownNetworkPluginMode
  - Added Enum KnownTrustedAccessRoleBindingProvisioningState
  - Enum KnownNetworkPlugin has a new value None
  - Enum KnownOssku has a new value Windows2019
  - Enum KnownOssku has a new value Windows2022
  - Enum KnownSnapshotType has a new value ManagedCluster

**Breaking Changes**

  - Interface ManagedClusterSecurityProfile no longer has parameter azureDefender
    
    
## 16.1.0 (2022-05-23)
    
**Features**

  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter currentOrchestratorVersion
  - Type Alias AgentPool has a new parameter currentOrchestratorVersion
  - Type Alias ManagedCluster has a new parameter currentKubernetesVersion
  - Type Alias ManagedCluster has a new parameter storageProfile
    
    
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
