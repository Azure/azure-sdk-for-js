# Release History

## 2.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 2.0.0-beta.1 (2024-11-18)
Compared with version 1.0.0
    
### Features Added

  - Added operation group KubernetesClusterFeatures
  - Added operation Clusters.beginContinueUpdateVersion
  - Added operation Clusters.beginContinueUpdateVersionAndWait
  - Added operation Clusters.beginScanRuntime
  - Added operation Clusters.beginScanRuntimeAndWait
  - Added Interface AdministratorConfigurationPatch
  - Added Interface ClusterContinueUpdateVersionParameters
  - Added Interface ClusterScanRuntimeParameters
  - Added Interface ClustersContinueUpdateVersionHeaders
  - Added Interface ClustersContinueUpdateVersionOptionalParams
  - Added Interface ClusterSecretArchive
  - Added Interface ClustersScanRuntimeHeaders
  - Added Interface ClustersScanRuntimeOptionalParams
  - Added Interface ClusterUpdateStrategy
  - Added Interface CommandOutputSettings
  - Added Interface IdentitySelector
  - Added Interface KubernetesClusterFeature
  - Added Interface KubernetesClusterFeatureList
  - Added Interface KubernetesClusterFeaturePatchParameters
  - Added Interface KubernetesClusterFeaturesCreateOrUpdateHeaders
  - Added Interface KubernetesClusterFeaturesCreateOrUpdateOptionalParams
  - Added Interface KubernetesClusterFeaturesDeleteHeaders
  - Added Interface KubernetesClusterFeaturesDeleteOptionalParams
  - Added Interface KubernetesClusterFeaturesGetOptionalParams
  - Added Interface KubernetesClusterFeaturesListByKubernetesClusterNextOptionalParams
  - Added Interface KubernetesClusterFeaturesListByKubernetesClusterOptionalParams
  - Added Interface KubernetesClusterFeaturesUpdateHeaders
  - Added Interface KubernetesClusterFeaturesUpdateOptionalParams
  - Added Interface L2ServiceLoadBalancerConfiguration
  - Added Interface ManagedServiceIdentity
  - Added Interface NodePoolAdministratorConfigurationPatch
  - Added Interface RuntimeProtectionConfiguration
  - Added Interface RuntimeProtectionStatus
  - Added Interface SecretArchiveReference
  - Added Interface SecretRotationStatus
  - Added Interface StringKeyValuePair
  - Added Interface UserAssignedIdentity
  - Added Type Alias AgentPoolsDeleteResponse
  - Added Type Alias BareMetalMachineKeySetsDeleteResponse
  - Added Type Alias BareMetalMachinesDeleteResponse
  - Added Type Alias BmcKeySetsDeleteResponse
  - Added Type Alias CloudServicesNetworksDeleteResponse
  - Added Type Alias ClusterContinueUpdateVersionMachineGroupTargetingMode
  - Added Type Alias ClusterManagersDeleteResponse
  - Added Type Alias ClusterScanRuntimeParametersScanActivity
  - Added Type Alias ClustersContinueUpdateVersionResponse
  - Added Type Alias ClustersDeleteResponse
  - Added Type Alias ClusterSecretArchiveEnabled
  - Added Type Alias ClustersScanRuntimeResponse
  - Added Type Alias ClusterUpdateStrategyType
  - Added Type Alias ConsolesDeleteResponse
  - Added Type Alias KubernetesClusterFeatureAvailabilityLifecycle
  - Added Type Alias KubernetesClusterFeatureDetailedStatus
  - Added Type Alias KubernetesClusterFeatureProvisioningState
  - Added Type Alias KubernetesClusterFeatureRequired
  - Added Type Alias KubernetesClusterFeaturesCreateOrUpdateResponse
  - Added Type Alias KubernetesClusterFeaturesDeleteResponse
  - Added Type Alias KubernetesClusterFeaturesGetResponse
  - Added Type Alias KubernetesClusterFeaturesListByKubernetesClusterNextResponse
  - Added Type Alias KubernetesClusterFeaturesListByKubernetesClusterResponse
  - Added Type Alias KubernetesClusterFeaturesUpdateResponse
  - Added Type Alias KubernetesClustersDeleteResponse
  - Added Type Alias L2NetworksDeleteResponse
  - Added Type Alias L3NetworksDeleteResponse
  - Added Type Alias ManagedServiceIdentitySelectorType
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias MetricsConfigurationsDeleteResponse
  - Added Type Alias RacksDeleteResponse
  - Added Type Alias RuntimeProtectionEnforcementLevel
  - Added Type Alias StorageAppliancesDeleteResponse
  - Added Type Alias TrunkedNetworksDeleteResponse
  - Added Type Alias VirtualMachinesDeleteResponse
  - Added Type Alias VolumesDeleteResponse
  - Interface AgentPoolPatchParameters has a new optional parameter administratorConfiguration
  - Interface AgentPoolsUpdateHeaders has a new optional parameter location
  - Interface AgentPoolUpgradeSettings has a new optional parameter drainTimeout
  - Interface AgentPoolUpgradeSettings has a new optional parameter maxUnavailable
  - Interface BareMetalMachine has a new optional parameter machineClusterVersion
  - Interface BareMetalMachine has a new optional parameter machineRoles
  - Interface BareMetalMachine has a new optional parameter runtimeProtectionStatus
  - Interface BareMetalMachine has a new optional parameter secretRotationStatus
  - Interface BareMetalMachineKeySetsUpdateHeaders has a new optional parameter location
  - Interface BareMetalMachinesUpdateHeaders has a new optional parameter location
  - Interface BmcKeySetsUpdateHeaders has a new optional parameter location
  - Interface CloudServicesNetworksUpdateHeaders has a new optional parameter location
  - Interface Cluster has a new optional parameter commandOutputSettings
  - Interface Cluster has a new optional parameter identity
  - Interface Cluster has a new optional parameter runtimeProtectionConfiguration
  - Interface Cluster has a new optional parameter secretArchive
  - Interface Cluster has a new optional parameter updateStrategy
  - Interface ClusterManager has a new optional parameter identity
  - Interface ClusterManagerPatchParameters has a new optional parameter identity
  - Interface ClusterPatchParameters has a new optional parameter commandOutputSettings
  - Interface ClusterPatchParameters has a new optional parameter identity
  - Interface ClusterPatchParameters has a new optional parameter runtimeProtectionConfiguration
  - Interface ClusterPatchParameters has a new optional parameter secretArchive
  - Interface ClusterPatchParameters has a new optional parameter updateStrategy
  - Interface ClustersUpdateHeaders has a new optional parameter location
  - Interface ConsolesUpdateHeaders has a new optional parameter location
  - Interface ControlPlaneNodePatchConfiguration has a new optional parameter administratorConfiguration
  - Interface KeySetUser has a new optional parameter userPrincipalName
  - Interface KubernetesClusterPatchParameters has a new optional parameter administratorConfiguration
  - Interface KubernetesClustersUpdateHeaders has a new optional parameter location
  - Interface MetricsConfigurationsUpdateHeaders has a new optional parameter location
  - Interface NetworkConfiguration has a new optional parameter l2ServiceLoadBalancerConfiguration
  - Interface OperationStatusResult has a new optional parameter exitCode
  - Interface OperationStatusResult has a new optional parameter outputHead
  - Interface OperationStatusResult has a new optional parameter resultRef
  - Interface OperationStatusResult has a new optional parameter resultUrl
  - Interface RacksUpdateHeaders has a new optional parameter location
  - Interface StorageAppliance has a new optional parameter manufacturer
  - Interface StorageAppliance has a new optional parameter model
  - Interface StorageAppliance has a new optional parameter secretRotationStatus
  - Interface StorageAppliance has a new optional parameter version
  - Interface StorageAppliancesUpdateHeaders has a new optional parameter location
  - Interface VirtualMachinesUpdateHeaders has a new optional parameter location
  - Added Enum KnownClusterContinueUpdateVersionMachineGroupTargetingMode
  - Added Enum KnownClusterScanRuntimeParametersScanActivity
  - Added Enum KnownClusterSecretArchiveEnabled
  - Added Enum KnownClusterUpdateStrategyType
  - Added Enum KnownKubernetesClusterFeatureAvailabilityLifecycle
  - Added Enum KnownKubernetesClusterFeatureDetailedStatus
  - Added Enum KnownKubernetesClusterFeatureProvisioningState
  - Added Enum KnownKubernetesClusterFeatureRequired
  - Added Enum KnownManagedServiceIdentitySelectorType
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownRuntimeProtectionEnforcementLevel
  - Enum KnownClusterConnectionStatus has a new value Disconnected
  - Enum KnownClusterDetailedStatus has a new value UpdatePaused
  - Enum KnownRackSkuProvisioningState has a new value Canceled
  - Enum KnownRackSkuProvisioningState has a new value Failed
    
### Breaking Changes

  - the return type of AgentPools.beginDelete operation has been changed from void into AgentPoolsDeleteResponse
  - the return type of AgentPools.beginDeleteAndWait operation has been changed from void into AgentPoolsDeleteResponse
  - the return type of BareMetalMachineKeySets.beginDelete operation has been changed from void into BareMetalMachineKeySetsDeleteResponse
  - the return type of BareMetalMachineKeySets.beginDeleteAndWait operation has been changed from void into BareMetalMachineKeySetsDeleteResponse
  - the return type of BareMetalMachines.beginDelete operation has been changed from void into BareMetalMachinesDeleteResponse
  - the return type of BareMetalMachines.beginDeleteAndWait operation has been changed from void into BareMetalMachinesDeleteResponse
  - the return type of BmcKeySets.beginDelete operation has been changed from void into BmcKeySetsDeleteResponse
  - the return type of BmcKeySets.beginDeleteAndWait operation has been changed from void into BmcKeySetsDeleteResponse
  - the return type of CloudServicesNetworks.beginDelete operation has been changed from void into CloudServicesNetworksDeleteResponse
  - the return type of CloudServicesNetworks.beginDeleteAndWait operation has been changed from void into CloudServicesNetworksDeleteResponse
  - the return type of ClusterManagers.beginDelete operation has been changed from void into ClusterManagersDeleteResponse
  - the return type of ClusterManagers.beginDeleteAndWait operation has been changed from void into ClusterManagersDeleteResponse
  - the return type of Clusters.beginDelete operation has been changed from void into ClustersDeleteResponse
  - the return type of Clusters.beginDeleteAndWait operation has been changed from void into ClustersDeleteResponse
  - the return type of Consoles.beginDelete operation has been changed from void into ConsolesDeleteResponse
  - the return type of Consoles.beginDeleteAndWait operation has been changed from void into ConsolesDeleteResponse
  - the return type of KubernetesClusters.beginDelete operation has been changed from void into KubernetesClustersDeleteResponse
  - the return type of KubernetesClusters.beginDeleteAndWait operation has been changed from void into KubernetesClustersDeleteResponse
  - the return type of L2Networks.beginDelete operation has been changed from void into L2NetworksDeleteResponse
  - the return type of L2Networks.beginDeleteAndWait operation has been changed from void into L2NetworksDeleteResponse
  - the return type of L3Networks.beginDelete operation has been changed from void into L3NetworksDeleteResponse
  - the return type of L3Networks.beginDeleteAndWait operation has been changed from void into L3NetworksDeleteResponse
  - the return type of MetricsConfigurations.beginDelete operation has been changed from void into MetricsConfigurationsDeleteResponse
  - the return type of MetricsConfigurations.beginDeleteAndWait operation has been changed from void into MetricsConfigurationsDeleteResponse
  - the return type of Racks.beginDelete operation has been changed from void into RacksDeleteResponse
  - the return type of Racks.beginDeleteAndWait operation has been changed from void into RacksDeleteResponse
  - the return type of StorageAppliances.beginDelete operation has been changed from void into StorageAppliancesDeleteResponse
  - the return type of StorageAppliances.beginDeleteAndWait operation has been changed from void into StorageAppliancesDeleteResponse
  - the return type of TrunkedNetworks.beginDelete operation has been changed from void into TrunkedNetworksDeleteResponse
  - the return type of TrunkedNetworks.beginDeleteAndWait operation has been changed from void into TrunkedNetworksDeleteResponse
  - the return type of VirtualMachines.beginDelete operation has been changed from void into VirtualMachinesDeleteResponse
  - the return type of VirtualMachines.beginDeleteAndWait operation has been changed from void into VirtualMachinesDeleteResponse
  - the return type of Volumes.beginDelete operation has been changed from void into VolumesDeleteResponse
  - the return type of Volumes.beginDeleteAndWait operation has been changed from void into VolumesDeleteResponse


## 1.0.0 (2023-08-22)

The package of @azure/arm-networkcloud is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
