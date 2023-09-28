# Release History
    
## 19.4.0 (2023-09-27)
    
**Features**

  - Added operation ManagedClusters.getMeshRevisionProfile
  - Added operation ManagedClusters.getMeshUpgradeProfile
  - Added operation ManagedClusters.listMeshRevisionProfiles
  - Added operation ManagedClusters.listMeshUpgradeProfiles
  - Added Interface CompatibleVersions
  - Added Interface IstioCertificateAuthority
  - Added Interface IstioComponents
  - Added Interface IstioEgressGateway
  - Added Interface IstioIngressGateway
  - Added Interface IstioPluginCertificateAuthority
  - Added Interface IstioServiceMesh
  - Added Interface ManagedClustersGetMeshRevisionProfileOptionalParams
  - Added Interface ManagedClustersGetMeshUpgradeProfileOptionalParams
  - Added Interface ManagedClustersListMeshRevisionProfilesNextOptionalParams
  - Added Interface ManagedClustersListMeshRevisionProfilesOptionalParams
  - Added Interface ManagedClustersListMeshUpgradeProfilesNextOptionalParams
  - Added Interface ManagedClustersListMeshUpgradeProfilesOptionalParams
  - Added Interface MeshRevision
  - Added Interface MeshRevisionProfile
  - Added Interface MeshRevisionProfileList
  - Added Interface MeshRevisionProfileProperties
  - Added Interface MeshUpgradeProfile
  - Added Interface MeshUpgradeProfileList
  - Added Interface MeshUpgradeProfileProperties
  - Added Interface ProxyResource
  - Added Interface ServiceMeshProfile
  - Added Type Alias IstioIngressGatewayMode
  - Added Type Alias ManagedClustersGetMeshRevisionProfileResponse
  - Added Type Alias ManagedClustersGetMeshUpgradeProfileResponse
  - Added Type Alias ManagedClustersListMeshRevisionProfilesNextResponse
  - Added Type Alias ManagedClustersListMeshRevisionProfilesResponse
  - Added Type Alias ManagedClustersListMeshUpgradeProfilesNextResponse
  - Added Type Alias ManagedClustersListMeshUpgradeProfilesResponse
  - Added Type Alias ServiceMeshMode
  - Interface ManagedCluster has a new optional parameter resourceUID
  - Interface ManagedCluster has a new optional parameter serviceMeshProfile
  - Added Enum KnownIstioIngressGatewayMode
  - Added Enum KnownServiceMeshMode
    
    
## 19.3.0 (2023-08-21)
    
**Features**

  - Added Interface ClusterUpgradeSettings
  - Added Interface UpgradeOverrideSettings
  - Interface ManagedCluster has a new optional parameter upgradeSettings
    
    
## 19.2.0 (2023-08-14)
    
**Features**

  - Added Interface DelegatedResource
  - Added Interface ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler
  - Added Type Alias NodeOSUpgradeChannel
  - Interface AgentPoolUpgradeSettings has a new optional parameter drainTimeoutInMinutes
  - Interface ManagedClusterAutoUpgradeProfile has a new optional parameter nodeOSUpgradeChannel
  - Interface ManagedClusterIdentity has a new optional parameter delegatedResources
  - Interface ManagedClusterWorkloadAutoScalerProfile has a new optional parameter verticalPodAutoscaler
  - Added Enum KnownNodeOSUpgradeChannel
    
    
## 19.1.0 (2023-07-03)
    
**Features**

  - Added Interface AbsoluteMonthlySchedule
  - Added Interface DailySchedule
  - Added Interface DateSpan
  - Added Interface MaintenanceWindow
  - Added Interface RelativeMonthlySchedule
  - Added Interface Schedule
  - Added Interface WeeklySchedule
  - Added Type Alias Type
  - Interface MaintenanceConfiguration has a new optional parameter maintenanceWindow
  - Added Enum KnownType
    
    
## 19.0.0 (2023-05-19)
    
**Features**

  - Enum KnownOssku has a new value AzureLinux

**Breaking Changes**

  - Interface ContainerServiceNetworkProfile no longer has parameter dockerBridgeCidr
    
    
## 18.0.0 (2023-04-23)
    
**Features**

  - Added operation ManagedClusters.listKubernetesVersions
  - Added Interface KubernetesPatchVersion
  - Added Interface KubernetesVersion
  - Added Interface KubernetesVersionCapabilities
  - Added Interface KubernetesVersionListResult
  - Added Interface ManagedClusterSecurityProfileImageCleaner
  - Added Interface ManagedClusterSecurityProfileWorkloadIdentity
  - Added Interface ManagedClustersListKubernetesVersionsOptionalParams
  - Added Type Alias KubernetesSupportPlan
  - Added Type Alias ManagedClustersListKubernetesVersionsResponse
  - Added Type Alias NetworkDataplane
  - Added Type Alias NetworkPluginMode
  - Interface ContainerServiceNetworkProfile has a new optional parameter networkDataplane
  - Interface ContainerServiceNetworkProfile has a new optional parameter networkPluginMode
  - Interface ManagedCluster has a new optional parameter supportPlan
  - Interface ManagedClusterSecurityProfile has a new optional parameter imageCleaner
  - Interface ManagedClusterSecurityProfile has a new optional parameter workloadIdentity
  - Added Enum KnownKubernetesSupportPlan
  - Added Enum KnownNetworkDataplane
  - Added Enum KnownNetworkPluginMode
  - Enum KnownManagedClusterSKUTier has a new value Premium
  - Enum KnownNetworkPolicy has a new value Cilium

**Breaking Changes**

  - Removed Enum KnownContainerServiceStorageProfileTypes
  - Removed Enum KnownContainerServiceVMSizeTypes
  - Enum KnownManagedClusterSKUName no longer has value Basic
  - Enum KnownManagedClusterSKUTier no longer has value Paid
    
    
## 17.4.0 (2023-03-09)
    
**Features**

  - Added operation AgentPools.beginAbortLatestOperation
  - Added operation AgentPools.beginAbortLatestOperationAndWait
  - Added operation ManagedClusters.beginAbortLatestOperation
  - Added operation ManagedClusters.beginAbortLatestOperationAndWait
  - Added Interface AgentPoolsAbortLatestOperationHeaders
  - Added Interface AgentPoolsAbortLatestOperationOptionalParams
  - Added Interface ManagedClusterAzureMonitorProfile
  - Added Interface ManagedClusterAzureMonitorProfileKubeStateMetrics
  - Added Interface ManagedClusterAzureMonitorProfileMetrics
  - Added Interface ManagedClustersAbortLatestOperationHeaders
  - Added Interface ManagedClustersAbortLatestOperationOptionalParams
  - Added Type Alias AgentPoolsAbortLatestOperationResponse
  - Added Type Alias ManagedClustersAbortLatestOperationResponse
  - Interface ManagedCluster has a new optional parameter azureMonitorProfile
  - Enum KnownManagedClusterSKUName has a new value Base
  - Enum KnownManagedClusterSKUTier has a new value Standard
    
    
## 17.3.0 (2023-01-06)
    
**Features**

  - Added Interface AgentPoolsDeleteHeaders
  - Added Interface ManagedClustersDeleteHeaders
  - Added Interface ManagedClustersGetCommandResultHeaders
  - Added Interface ManagedClustersResetAADProfileHeaders
  - Added Interface ManagedClustersResetServicePrincipalProfileHeaders
  - Added Interface ManagedClustersRotateClusterCertificatesHeaders
  - Added Interface ManagedClustersRunCommandHeaders
  - Added Interface ManagedClustersStartHeaders
  - Added Interface ManagedClustersStopHeaders
  - Added Interface ManagedClusterWorkloadAutoScalerProfile
  - Added Interface ManagedClusterWorkloadAutoScalerProfileKeda
  - Added Type Alias AgentPoolsDeleteResponse
  - Added Type Alias ManagedClustersDeleteResponse
  - Added Type Alias ManagedClustersRotateClusterCertificatesResponse
  - Added Type Alias ManagedClustersStartResponse
  - Added Type Alias ManagedClustersStopResponse
  - Interface ManagedCluster has a new optional parameter workloadAutoScalerProfile
  - Enum KnownManagedClusterPodIdentityProvisioningState has a new value Canceled
  - Enum KnownManagedClusterPodIdentityProvisioningState has a new value Succeeded
  - Enum KnownPrivateEndpointConnectionProvisioningState has a new value Canceled
  - Added function getContinuationToken
    
    
## 17.2.0 (2022-11-02)
    
**Features**

  - Added operation ManagedClusters.beginRotateServiceAccountSigningKeys
  - Added operation ManagedClusters.beginRotateServiceAccountSigningKeysAndWait
  - Added Interface ManagedClusterOidcIssuerProfile
  - Added Interface ManagedClustersRotateServiceAccountSigningKeysHeaders
  - Added Interface ManagedClustersRotateServiceAccountSigningKeysOptionalParams
  - Added Interface ManagedClusterStorageProfileBlobCSIDriver
  - Added Type Alias ManagedClustersRotateServiceAccountSigningKeysResponse
  - Interface ManagedCluster has a new optional parameter oidcIssuerProfile
  - Interface ManagedClusterStorageProfile has a new optional parameter blobCSIDriver
    
    
## 17.1.0 (2022-08-25)
    
**Features**

  - Enum KnownOssku has a new value Windows2019
  - Enum KnownOssku has a new value Windows2022
    
    
## 17.0.0 (2022-07-22)
    
**Features**

  - Added Interface AgentPool
  - Added Interface AzureKeyVaultKms
  - Added Interface MaintenanceConfiguration
  - Added Interface ManagedCluster
  - Added Interface ManagedClusterAccessProfile
  - Added Interface ManagedClusterAddonProfileIdentity
  - Added Interface ManagedClusterAgentPoolProfile
  - Added Interface ManagedClusterSecurityProfileDefender
  - Added Interface ManagedClusterSecurityProfileDefenderSecurityMonitoring
  - Added Interface Snapshot
  - Added Interface TrackedResource
  - Added Type Alias KeyVaultNetworkAccessTypes
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter hostGroupID
  - Interface ManagedClusterSecurityProfile has a new optional parameter azureKeyVaultKms
  - Interface ManagedClusterSecurityProfile has a new optional parameter defender
  - Added Enum KnownKeyVaultNetworkAccessTypes
  - Enum KnownNetworkPlugin has a new value None

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
