# Release History
    
## 18.0.0-beta.3 (2023-04-20)
    
**Features**

  - Added operation group ManagedClusterSnapshots
  - Added operation group TrustedAccessRoleBindings
  - Added operation group TrustedAccessRoles
  - Added operation ManagedClusters.listKubernetesVersions
  - Added Interface AbsoluteMonthlySchedule
  - Added Interface AgentPoolNetworkProfile
  - Added Interface AgentPoolWindowsProfile
  - Added Interface ClusterUpgradeSettings
  - Added Interface ContainerServiceNetworkProfileKubeProxyConfig
  - Added Interface ContainerServiceNetworkProfileKubeProxyConfigIpvsConfig
  - Added Interface DailySchedule
  - Added Interface DateSpan
  - Added Interface GuardrailsProfile
  - Added Interface IPTag
  - Added Interface IstioComponents
  - Added Interface IstioIngressGateway
  - Added Interface IstioServiceMesh
  - Added Interface KubernetesPatchVersion
  - Added Interface KubernetesVersion
  - Added Interface KubernetesVersionCapabilities
  - Added Interface KubernetesVersionListResult
  - Added Interface MaintenanceWindow
  - Added Interface ManagedClusterIngressProfile
  - Added Interface ManagedClusterIngressProfileWebAppRouting
  - Added Interface ManagedClusterNodeResourceGroupProfile
  - Added Interface ManagedClusterPropertiesForSnapshot
  - Added Interface ManagedClusterSecurityProfileImageCleaner
  - Added Interface ManagedClusterSecurityProfileNodeRestriction
  - Added Interface ManagedClusterSecurityProfileWorkloadIdentity
  - Added Interface ManagedClustersListKubernetesVersionsOptionalParams
  - Added Interface ManagedClusterSnapshot
  - Added Interface ManagedClusterSnapshotListResult
  - Added Interface ManagedClusterSnapshotsCreateOrUpdateOptionalParams
  - Added Interface ManagedClusterSnapshotsDeleteOptionalParams
  - Added Interface ManagedClusterSnapshotsGetOptionalParams
  - Added Interface ManagedClusterSnapshotsListByResourceGroupNextOptionalParams
  - Added Interface ManagedClusterSnapshotsListByResourceGroupOptionalParams
  - Added Interface ManagedClusterSnapshotsListNextOptionalParams
  - Added Interface ManagedClusterSnapshotsListOptionalParams
  - Added Interface ManagedClusterSnapshotsUpdateTagsOptionalParams
  - Added Interface ManagedClusterWorkloadAutoScalerProfileVerticalPodAutoscaler
  - Added Interface NetworkProfileForSnapshot
  - Added Interface PortRange
  - Added Interface RelativeMonthlySchedule
  - Added Interface Schedule
  - Added Interface ServiceMeshProfile
  - Added Interface TrustedAccessRole
  - Added Interface TrustedAccessRoleBinding
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
  - Added Interface UpgradeOverrideSettings
  - Added Interface WeeklySchedule
  - Added Type Alias BackendPoolType
  - Added Type Alias ControlledValues
  - Added Type Alias ControlPlaneUpgradeOverride
  - Added Type Alias IpvsScheduler
  - Added Type Alias IstioIngressGatewayMode
  - Added Type Alias KubernetesSupportPlan
  - Added Type Alias Level
  - Added Type Alias ManagedClustersListKubernetesVersionsResponse
  - Added Type Alias ManagedClusterSnapshotsCreateOrUpdateResponse
  - Added Type Alias ManagedClusterSnapshotsGetResponse
  - Added Type Alias ManagedClusterSnapshotsListByResourceGroupNextResponse
  - Added Type Alias ManagedClusterSnapshotsListByResourceGroupResponse
  - Added Type Alias ManagedClusterSnapshotsListNextResponse
  - Added Type Alias ManagedClusterSnapshotsListResponse
  - Added Type Alias ManagedClusterSnapshotsUpdateTagsResponse
  - Added Type Alias Mode
  - Added Type Alias NetworkDataplane
  - Added Type Alias NetworkPluginMode
  - Added Type Alias NodeOSUpgradeChannel
  - Added Type Alias Protocol
  - Added Type Alias RestrictionLevel
  - Added Type Alias ServiceMeshMode
  - Added Type Alias TrustedAccessRoleBindingProvisioningState
  - Added Type Alias TrustedAccessRoleBindingsCreateOrUpdateResponse
  - Added Type Alias TrustedAccessRoleBindingsGetResponse
  - Added Type Alias TrustedAccessRoleBindingsListNextResponse
  - Added Type Alias TrustedAccessRoleBindingsListResponse
  - Added Type Alias TrustedAccessRolesListNextResponse
  - Added Type Alias TrustedAccessRolesListResponse
  - Added Type Alias Type
  - Added Type Alias UpdateMode
  - Interface AgentPool has a new optional parameter capacityReservationGroupID
  - Interface AgentPool has a new optional parameter enableCustomCATrust
  - Interface AgentPool has a new optional parameter messageOfTheDay
  - Interface AgentPool has a new optional parameter networkProfile
  - Interface AgentPool has a new optional parameter windowsProfile
  - Interface AgentPoolsDeleteOptionalParams has a new optional parameter ignorePodDisruptionBudget
  - Interface ContainerServiceNetworkProfile has a new optional parameter kubeProxyConfig
  - Interface ContainerServiceNetworkProfile has a new optional parameter networkDataplane
  - Interface ContainerServiceNetworkProfile has a new optional parameter networkPluginMode
  - Interface MaintenanceConfiguration has a new optional parameter maintenanceWindow
  - Interface ManagedCluster has a new optional parameter creationData
  - Interface ManagedCluster has a new optional parameter enableNamespaceResources
  - Interface ManagedCluster has a new optional parameter guardrailsProfile
  - Interface ManagedCluster has a new optional parameter ingressProfile
  - Interface ManagedCluster has a new optional parameter nodeResourceGroupProfile
  - Interface ManagedCluster has a new optional parameter serviceMeshProfile
  - Interface ManagedCluster has a new optional parameter supportPlan
  - Interface ManagedCluster has a new optional parameter upgradeSettings
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter capacityReservationGroupID
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter enableCustomCATrust
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter messageOfTheDay
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter networkProfile
  - Interface ManagedClusterAgentPoolProfileProperties has a new optional parameter windowsProfile
  - Interface ManagedClusterAPIServerAccessProfile has a new optional parameter enableVnetIntegration
  - Interface ManagedClusterAPIServerAccessProfile has a new optional parameter subnetId
  - Interface ManagedClusterAutoUpgradeProfile has a new optional parameter nodeOSUpgradeChannel
  - Interface ManagedClusterHttpProxyConfig has a new optional parameter effectiveNoProxy
  - Interface ManagedClusterLoadBalancerProfile has a new optional parameter backendPoolType
  - Interface ManagedClustersDeleteOptionalParams has a new optional parameter ignorePodDisruptionBudget
  - Interface ManagedClusterSecurityProfile has a new optional parameter customCATrustCertificates
  - Interface ManagedClusterSecurityProfile has a new optional parameter imageCleaner
  - Interface ManagedClusterSecurityProfile has a new optional parameter nodeRestriction
  - Interface ManagedClusterSecurityProfile has a new optional parameter workloadIdentity
  - Interface ManagedClusterStorageProfileDiskCSIDriver has a new optional parameter version
  - Interface ManagedClusterWorkloadAutoScalerProfile has a new optional parameter verticalPodAutoscaler
  - Added Enum KnownBackendPoolType
  - Added Enum KnownControlledValues
  - Added Enum KnownControlPlaneUpgradeOverride
  - Added Enum KnownIpvsScheduler
  - Added Enum KnownIstioIngressGatewayMode
  - Added Enum KnownKubernetesSupportPlan
  - Added Enum KnownLevel
  - Added Enum KnownMode
  - Added Enum KnownNetworkDataplane
  - Added Enum KnownNetworkPluginMode
  - Added Enum KnownNodeOSUpgradeChannel
  - Added Enum KnownProtocol
  - Added Enum KnownRestrictionLevel
  - Added Enum KnownServiceMeshMode
  - Added Enum KnownTrustedAccessRoleBindingProvisioningState
  - Added Enum KnownType
  - Added Enum KnownUpdateMode
  - Enum KnownManagedClusterSKUTier has a new value Premium
  - Enum KnownNetworkPolicy has a new value Cilium
  - Enum KnownOssku has a new value Mariner
  - Enum KnownPublicNetworkAccess has a new value SecuredByPerimeter
  - Enum KnownSnapshotType has a new value ManagedCluster
  - Enum KnownWorkloadRuntime has a new value KataMshvVmIsolation

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
