# Release History
    
## 4.0.0 (2023-08-10)
    
**Features**

  - Added Interface ErrorDetail
  - Interface ErrorResponse has a new optional parameter error
  - Interface PrivateCloud has a new optional parameter extendedNetworkBlocks
  - Interface PrivateCloudUpdate has a new optional parameter extendedNetworkBlocks
  - Interface PrivateCloudUpdateProperties has a new optional parameter extendedNetworkBlocks
  - Added function getContinuationToken

**Breaking Changes**

  - Interface ErrorResponse no longer has parameter additionalInfo
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter details
  - Interface ErrorResponse no longer has parameter message
  - Interface ErrorResponse no longer has parameter target
    
    
## 3.2.0 (2022-10-20)
    
**Features**

  - Added operation Clusters.listZones
  - Added operation WorkloadNetworks.get
  - Added operation WorkloadNetworks.list
  - Added Interface AddonArcProperties
  - Added Interface ClustersListZonesOptionalParams
  - Added Interface ClusterZone
  - Added Interface ClusterZoneList
  - Added Interface WorkloadNetwork
  - Added Interface WorkloadNetworkList
  - Added Interface WorkloadNetworksGetOptionalParams
  - Added Interface WorkloadNetworksListNextOptionalParams
  - Added Interface WorkloadNetworksListOptionalParams
  - Added Type Alias AffinityStrength
  - Added Type Alias AzureHybridBenefitType
  - Added Type Alias ClustersListZonesResponse
  - Added Type Alias NsxPublicIpQuotaRaisedEnum
  - Added Type Alias WorkloadNetworkName
  - Added Type Alias WorkloadNetworksGetResponse
  - Added Type Alias WorkloadNetworksListNextResponse
  - Added Type Alias WorkloadNetworksListResponse
  - Interface EncryptionKeyVaultProperties has a new optional parameter autoDetectedKeyVersion
  - Interface LocationsCheckTrialAvailabilityOptionalParams has a new optional parameter sku
  - Interface PlacementPolicyUpdate has a new optional parameter affinityStrength
  - Interface PlacementPolicyUpdate has a new optional parameter azureHybridBenefitType
  - Interface PrivateCloud has a new optional parameter nsxPublicIpQuotaRaised
  - Interface PrivateCloudProperties has a new optional parameter nsxPublicIpQuotaRaised
  - Interface ScriptPackage has a new optional parameter company
  - Interface ScriptPackage has a new optional parameter uri
  - Interface VmHostPlacementPolicyProperties has a new optional parameter affinityStrength
  - Interface VmHostPlacementPolicyProperties has a new optional parameter azureHybridBenefitType
  - Added Enum KnownAffinityStrength
  - Added Enum KnownAzureHybridBenefitType
  - Added Enum KnownNsxPublicIpQuotaRaisedEnum
  - Added Enum KnownWorkloadNetworkName
  - Enum KnownAddonProvisioningState has a new value Canceled
  - Enum KnownAddonType has a new value Arc
  - Enum KnownClusterProvisioningState has a new value Canceled
  - Enum KnownDatastoreProvisioningState has a new value Canceled
  - Enum KnownExpressRouteAuthorizationProvisioningState has a new value Canceled
  - Enum KnownGlobalReachConnectionProvisioningState has a new value Canceled
  - Enum KnownPlacementPolicyProvisioningState has a new value Canceled
  - Enum KnownPrivateCloudProvisioningState has a new value Canceled
  - Enum KnownScriptExecutionProvisioningState has a new value Canceled
  - Enum KnownWorkloadNetworkDhcpProvisioningState has a new value Canceled
  - Enum KnownWorkloadNetworkDnsServiceProvisioningState has a new value Canceled
  - Enum KnownWorkloadNetworkDnsZoneProvisioningState has a new value Canceled
  - Enum KnownWorkloadNetworkPortMirroringProvisioningState has a new value Canceled
  - Enum KnownWorkloadNetworkPublicIPProvisioningState has a new value Canceled
  - Enum KnownWorkloadNetworkSegmentProvisioningState has a new value Canceled
  - Enum KnownWorkloadNetworkVMGroupProvisioningState has a new value Canceled
    
## 3.1.2 (2022-10-08)

**Bugs Fixed**

  -  revert credential scopes

## 3.1.1 (2022-09-30)

**Bugs Fixed**

  -  fix better user experience of credential scopes in government cloud

## 3.1.0 (2022-07-05)
    
**Features**

  - Added Interface Addon
  - Added Interface AddonHcxProperties
  - Added Interface AddonSrmProperties
  - Added Interface AddonVrProperties
  - Added Interface CloudLink
  - Added Interface Cluster
  - Added Interface ClusterProperties
  - Added Interface Datastore
  - Added Interface ExpressRouteAuthorization
  - Added Interface GlobalReachConnection
  - Added Interface HcxEnterpriseSite
  - Added Interface ManagementCluster
  - Added Interface PlacementPolicy
  - Added Interface PrivateCloud
  - Added Interface PrivateCloudProperties
  - Added Interface ProxyResource
  - Added Interface PSCredentialExecutionParameter
  - Added Interface ScriptCmdlet
  - Added Interface ScriptExecution
  - Added Interface ScriptPackage
  - Added Interface ScriptSecureStringExecutionParameter
  - Added Interface ScriptStringExecutionParameter
  - Added Interface TrackedResource
  - Added Interface VirtualMachine
  - Added Interface VmHostPlacementPolicyProperties
  - Added Interface VmPlacementPolicyProperties
  - Added Interface WorkloadNetworkDhcp
  - Added Interface WorkloadNetworkDhcpRelay
  - Added Interface WorkloadNetworkDhcpServer
  - Added Interface WorkloadNetworkDnsService
  - Added Interface WorkloadNetworkDnsZone
  - Added Interface WorkloadNetworkGateway
  - Added Interface WorkloadNetworkPortMirroring
  - Added Interface WorkloadNetworkPublicIP
  - Added Interface WorkloadNetworkSegment
  - Added Interface WorkloadNetworkVirtualMachine
  - Added Interface WorkloadNetworkVMGroup
    
    
## 3.0.0 (2022-01-10)

The package of @azure/arm-avs is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
