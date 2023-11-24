# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2023-11-23)
    
**Features**

  - Added operation group KubernetesVersions
  - Added operation group ProvisionedClusterInstances
  - Added operation group VirtualNetworks
  - Added operation group VMSkus
  - Added operation AgentPoolOperations.beginDelete
  - Added operation AgentPoolOperations.beginDeleteAndWait
  - Added operation AgentPoolOperations.beginUpdate
  - Added operation AgentPoolOperations.beginUpdateAndWait
  - Added operation HybridIdentityMetadataOperations.beginDelete
  - Added operation HybridIdentityMetadataOperations.beginDeleteAndWait
  - Added Interface AddonStatusProfile
  - Added Interface AgentPoolDeleteHeaders
  - Added Interface AgentPoolPatch
  - Added Interface AgentPoolProvisioningStatusOperationStatus
  - Added Interface AgentPoolProvisioningStatusOperationStatusError
  - Added Interface AgentPoolUpdateHeaders
  - Added Interface AgentPoolUpdateProfile
  - Added Interface CredentialResult
  - Added Interface DeleteKubernetesVersionsOptionalParams
  - Added Interface DeleteVMSkusOptionalParams
  - Added Interface ExtendedLocation
  - Added Interface GetKubernetesVersionsOptionalParams
  - Added Interface GetVMSkusOptionalParams
  - Added Interface HybridContainerServiceClientDeleteKubernetesVersionsHeaders
  - Added Interface HybridContainerServiceClientDeleteVMSkusHeaders
  - Added Interface HybridIdentityMetadataDeleteHeaders
  - Added Interface KubernetesPatchVersions
  - Added Interface KubernetesVersionCapabilities
  - Added Interface KubernetesVersionProfile
  - Added Interface KubernetesVersionProfileList
  - Added Interface KubernetesVersionProfileProperties
  - Added Interface KubernetesVersionProperties
  - Added Interface KubernetesVersionReadiness
  - Added Interface KubernetesVersionsListNextOptionalParams
  - Added Interface KubernetesVersionsListOptionalParams
  - Added Interface ListCredentialResponse
  - Added Interface ListCredentialResponseError
  - Added Interface ListCredentialResponseProperties
  - Added Interface NetworkProfileLoadBalancerProfile
  - Added Interface Operation
  - Added Interface OperationDisplay
  - Added Interface OperationListResult
  - Added Interface ProvisionedClusterInstancesCreateOrUpdateOptionalParams
  - Added Interface ProvisionedClusterInstancesDeleteHeaders
  - Added Interface ProvisionedClusterInstancesDeleteOptionalParams
  - Added Interface ProvisionedClusterInstancesGetOptionalParams
  - Added Interface ProvisionedClusterInstancesGetUpgradeProfileOptionalParams
  - Added Interface ProvisionedClusterInstancesListAdminKubeconfigHeaders
  - Added Interface ProvisionedClusterInstancesListAdminKubeconfigOptionalParams
  - Added Interface ProvisionedClusterInstancesListNextOptionalParams
  - Added Interface ProvisionedClusterInstancesListOptionalParams
  - Added Interface ProvisionedClusterInstancesListUserKubeconfigHeaders
  - Added Interface ProvisionedClusterInstancesListUserKubeconfigOptionalParams
  - Added Interface ProvisionedClusterLicenseProfile
  - Added Interface ProvisionedClusterProperties
  - Added Interface ProvisionedClusterPropertiesStatus
  - Added Interface ProvisionedClusterPropertiesStatusOperationStatus
  - Added Interface ProvisionedClusterPropertiesStatusOperationStatusError
  - Added Interface ProvisionedClustersListResult
  - Added Interface PutKubernetesVersionsOptionalParams
  - Added Interface PutVMSkusOptionalParams
  - Added Interface VirtualNetwork
  - Added Interface VirtualNetworkExtendedLocation
  - Added Interface VirtualNetworkProperties
  - Added Interface VirtualNetworkPropertiesInfraVnetProfile
  - Added Interface VirtualNetworkPropertiesInfraVnetProfileHci
  - Added Interface VirtualNetworkPropertiesInfraVnetProfileVmware
  - Added Interface VirtualNetworkPropertiesStatus
  - Added Interface VirtualNetworkPropertiesStatusOperationStatus
  - Added Interface VirtualNetworkPropertiesStatusOperationStatusError
  - Added Interface VirtualNetworkPropertiesVipPoolItem
  - Added Interface VirtualNetworkPropertiesVmipPoolItem
  - Added Interface VirtualNetworksDeleteHeaders
  - Added Interface VirtualNetworksUpdateHeaders
  - Added Interface VmSkuCapabilities
  - Added Interface VmSkuProfile
  - Added Interface VmSkuProfileList
  - Added Interface VmSkuProfileProperties
  - Added Interface VmSkuProperties
  - Added Interface VMSkusListNextOptionalParams
  - Added Interface VMSkusListOptionalParams
  - Added Type Alias ActionType
  - Added Type Alias AddonPhase
  - Added Type Alias AgentPoolDeleteResponse
  - Added Type Alias AzureHybridBenefit
  - Added Type Alias DeleteKubernetesVersionsResponse
  - Added Type Alias DeleteVMSkusResponse
  - Added Type Alias ExtendedLocationTypes
  - Added Type Alias GetKubernetesVersionsResponse
  - Added Type Alias GetVMSkusResponse
  - Added Type Alias HybridIdentityMetadataDeleteResponse
  - Added Type Alias KubernetesVersionsListNextResponse
  - Added Type Alias KubernetesVersionsListResponse
  - Added Type Alias Origin
  - Added Type Alias Ossku
  - Added Type Alias ProvisionedClusterInstancesCreateOrUpdateResponse
  - Added Type Alias ProvisionedClusterInstancesDeleteResponse
  - Added Type Alias ProvisionedClusterInstancesGetResponse
  - Added Type Alias ProvisionedClusterInstancesGetUpgradeProfileResponse
  - Added Type Alias ProvisionedClusterInstancesListAdminKubeconfigResponse
  - Added Type Alias ProvisionedClusterInstancesListNextResponse
  - Added Type Alias ProvisionedClusterInstancesListResponse
  - Added Type Alias ProvisionedClusterInstancesListUserKubeconfigResponse
  - Added Type Alias PutKubernetesVersionsResponse
  - Added Type Alias PutVMSkusResponse
  - Added Type Alias ResourceProvisioningState
  - Added Type Alias VirtualNetworksDeleteResponse
  - Added Type Alias VMSkusListNextResponse
  - Added Type Alias VMSkusListResponse
  - Interface AgentPool has a new optional parameter osSKU
  - Interface AgentPoolDeleteOptionalParams has a new optional parameter resumeFrom
  - Interface AgentPoolDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Interface AgentPoolProfile has a new optional parameter osSKU
  - Interface AgentPoolProvisioningStatusStatus has a new optional parameter operationStatus
  - Interface AgentPoolUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface AgentPoolUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface HybridIdentityMetadataDeleteOptionalParams has a new optional parameter resumeFrom
  - Interface HybridIdentityMetadataDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Interface Resource has a new optional parameter systemData
  - Interface VirtualNetworksDeleteOptionalParams has a new optional parameter resumeFrom
  - Interface VirtualNetworksDeleteOptionalParams has a new optional parameter updateIntervalInMs
  - Added Enum KnownActionType
  - Added Enum KnownAddonPhase
  - Added Enum KnownAzureHybridBenefit
  - Added Enum KnownExtendedLocationTypes
  - Added Enum KnownOrigin
  - Added Enum KnownOssku
  - Added Enum KnownResourceProvisioningState

**Breaking Changes**

  - Removed operation group HybridContainerService
  - Removed operation group ProvisionedClustersOperations
  - Removed operation group StorageSpacesOperations
  - Removed operation group VirtualNetworksOperations
  - Removed operation AgentPoolOperations.delete
  - Removed operation AgentPoolOperations.update
  - Removed operation HybridIdentityMetadataOperations.delete
  - Operation AgentPoolOperations.beginCreateOrUpdate has a new signature
  - Operation AgentPoolOperations.beginCreateOrUpdateAndWait has a new signature
  - Operation AgentPoolOperations.get has a new signature
  - Operation AgentPoolOperations.listByProvisionedCluster has a new signature
  - Operation HybridIdentityMetadataOperations.get has a new signature
  - Operation HybridIdentityMetadataOperations.listByCluster has a new signature
  - Operation HybridIdentityMetadataOperations.put has a new signature
  - Class HybridContainerServiceClient has a new signature
  - Interface AgentPool no longer has parameter cloudProviderProfile
  - Interface AgentPool no longer has parameter maxCount
  - Interface AgentPool no longer has parameter maxPods
  - Interface AgentPool no longer has parameter minCount
  - Interface AgentPool no longer has parameter mode
  - Interface AgentPool no longer has parameter nodeLabels
  - Interface AgentPool no longer has parameter nodeTaints
  - Interface AgentPoolProfile no longer has parameter cloudProviderProfile
  - Interface AgentPoolProfile no longer has parameter count
  - Interface AgentPoolProfile no longer has parameter maxCount
  - Interface AgentPoolProfile no longer has parameter maxPods
  - Interface AgentPoolProfile no longer has parameter minCount
  - Interface AgentPoolProfile no longer has parameter mode
  - Interface AgentPoolProfile no longer has parameter nodeLabels
  - Interface AgentPoolProfile no longer has parameter nodeTaints
  - Interface AgentPoolProfile no longer has parameter vmSize
  - Interface AgentPoolProvisioningStatusStatus no longer has parameter provisioningStatus
  - Interface AgentPoolProvisioningStatusStatus no longer has parameter replicas
  - Interface CloudProviderProfile no longer has parameter infraStorageProfile
  - Interface HybridIdentityMetadata no longer has parameter identity
  - Interface HybridIdentityMetadata no longer has parameter systemData
  - Interface LinuxProfileProperties no longer has parameter adminUsername
  - Interface NetworkProfile no longer has parameter dnsServiceIP
  - Interface NetworkProfile no longer has parameter loadBalancerSku
  - Interface NetworkProfile no longer has parameter podCidrs
  - Interface NetworkProfile no longer has parameter serviceCidr
  - Interface NetworkProfile no longer has parameter serviceCidrs
  - Interface ProvisionedClusters no longer has parameter identity
  - Interface ProvisionedClusters no longer has parameter systemData
  - Type of parameter extendedLocation of interface AgentPool is changed from AgentPoolExtendedLocation to ExtendedLocation
  - Type of parameter provisioningState of interface AgentPool is changed from AgentPoolProvisioningState to ResourceProvisioningState
  - Type of parameter provisioningState of interface AgentPoolProvisioningStatus is changed from AgentPoolProvisioningState to ResourceProvisioningState
  - Type of parameter readyReplicas of interface AgentPoolProvisioningStatusStatus is changed from number to AgentPoolUpdateProfile[]
  - Type of parameter port of interface ControlPlaneEndpointProfileControlPlaneEndpoint is changed from string to number
  - Type of parameter provisioningState of interface HybridIdentityMetadata is changed from string to ResourceProvisioningState
  - Type of parameter loadBalancerProfile of interface NetworkProfile is changed from LoadBalancerProfile to NetworkProfileLoadBalancerProfile
  - Type of parameter extendedLocation of interface ProvisionedClusters is changed from ProvisionedClustersExtendedLocation to ExtendedLocation
  - Type of parameter properties of interface ProvisionedClusters is changed from ProvisionedClustersAllProperties to ProvisionedClusterProperties
  - Type of parameter provisioningState of interface ProvisionedClusterUpgradeProfile is changed from string to ResourceProvisioningState
  - Type of parameter value of interface VirtualNetworksListResult is changed from VirtualNetworks[] to VirtualNetwork[]
  - Class HybridContainerServiceClient no longer has parameter hybridContainerService
  - Class HybridContainerServiceClient no longer has parameter provisionedClustersOperations
  - Class HybridContainerServiceClient no longer has parameter storageSpacesOperations
  - Class HybridContainerServiceClient no longer has parameter virtualNetworksOperations
  - Removed Enum KnownAgentPoolProvisioningState
  - Removed Enum KnownAutoUpgradeOptions
  - Removed Enum KnownDeploymentState
  - Removed Enum KnownLicenseType
  - Removed Enum KnownLoadBalancerSku
  - Removed Enum KnownMode
    
    
## 1.0.0-beta.2 (2023-03-03)
    
**Features**

  - Added operation ProvisionedClustersOperations.beginUpgradeNodeImageVersionForEntireCluster
  - Added operation ProvisionedClustersOperations.beginUpgradeNodeImageVersionForEntireClusterAndWait
  - Added operation ProvisionedClustersOperations.getUpgradeProfile
  - Added Interface ProvisionedClusterPoolUpgradeProfile
  - Added Interface ProvisionedClusterPoolUpgradeProfileProperties
  - Added Interface ProvisionedClustersGetUpgradeProfileOptionalParams
  - Added Interface ProvisionedClustersUpgradeNodeImageVersionForEntireClusterOptionalParams
  - Added Interface ProvisionedClusterUpgradeProfile
  - Added Interface VirtualNetworksPropertiesInfraVnetProfileNetworkCloud
  - Added Type Alias ProvisionedClustersGetUpgradeProfileResponse
  - Interface VirtualNetworksPropertiesInfraVnetProfile has a new optional parameter networkCloud

**Breaking Changes**

  - Interface VirtualNetworksPropertiesInfraVnetProfile no longer has parameter kubevirt
    
    
## 1.0.0-beta.1 (2022-11-09)

The package of @azure/arm-hybridcontainerservice is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
