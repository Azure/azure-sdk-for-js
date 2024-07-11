# Release History

## 5.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 5.0.0 (2024-06-28)
    
### Features Added

  - Added operation group IscsiPaths
  - Added Interface AddonListResult
  - Added Interface AddonsCreateOrUpdateHeaders
  - Added Interface AddonsDeleteHeaders
  - Added Interface AuthorizationsCreateOrUpdateHeaders
  - Added Interface AuthorizationsDeleteHeaders
  - Added Interface CloudLinkListResult
  - Added Interface CloudLinksCreateOrUpdateHeaders
  - Added Interface CloudLinksDeleteHeaders
  - Added Interface ClusterListResult
  - Added Interface ClustersCreateOrUpdateHeaders
  - Added Interface ClustersDeleteHeaders
  - Added Interface ClustersUpdateHeaders
  - Added Interface DatastoreListResult
  - Added Interface DatastoresCreateOrUpdateHeaders
  - Added Interface DatastoresDeleteHeaders
  - Added Interface ElasticSanVolume
  - Added Interface ExpressRouteAuthorizationListResult
  - Added Interface GlobalReachConnectionListResult
  - Added Interface GlobalReachConnectionsCreateOrUpdateHeaders
  - Added Interface GlobalReachConnectionsDeleteHeaders
  - Added Interface HcxEnterpriseSiteListResult
  - Added Interface IscsiPath
  - Added Interface IscsiPathListResult
  - Added Interface IscsiPathsCreateOrUpdateHeaders
  - Added Interface IscsiPathsCreateOrUpdateOptionalParams
  - Added Interface IscsiPathsDeleteHeaders
  - Added Interface IscsiPathsDeleteOptionalParams
  - Added Interface IscsiPathsGetOptionalParams
  - Added Interface IscsiPathsListByPrivateCloudNextOptionalParams
  - Added Interface IscsiPathsListByPrivateCloudOptionalParams
  - Added Interface OperationListResult
  - Added Interface PlacementPoliciesCreateOrUpdateHeaders
  - Added Interface PlacementPoliciesDeleteHeaders
  - Added Interface PlacementPoliciesUpdateHeaders
  - Added Interface PlacementPolicyListResult
  - Added Interface PrivateCloudListResult
  - Added Interface PrivateCloudsCreateOrUpdateHeaders
  - Added Interface PrivateCloudsDeleteHeaders
  - Added Interface PrivateCloudsRotateNsxtPasswordHeaders
  - Added Interface PrivateCloudsRotateVcenterPasswordHeaders
  - Added Interface PrivateCloudsUpdateHeaders
  - Added Interface ScriptCmdletListResult
  - Added Interface ScriptExecutionListResult
  - Added Interface ScriptExecutionsCreateOrUpdateHeaders
  - Added Interface ScriptExecutionsDeleteHeaders
  - Added Interface ScriptPackageListResult
  - Added Interface SystemAssignedServiceIdentity
  - Added Interface SystemData
  - Added Interface VirtualMachineListResult
  - Added Interface VirtualMachinesRestrictMovementHeaders
  - Added Interface WorkloadNetworkDhcpEntityUpdate
  - Added Interface WorkloadNetworkDhcpListResult
  - Added Interface WorkloadNetworkDhcpRelayUpdate
  - Added Interface WorkloadNetworkDhcpServerUpdate
  - Added Interface WorkloadNetworkDhcpUpdate
  - Added Interface WorkloadNetworkDnsServiceListResult
  - Added Interface WorkloadNetworkDnsServiceUpdate
  - Added Interface WorkloadNetworkDnsZoneListResult
  - Added Interface WorkloadNetworkDnsZoneUpdate
  - Added Interface WorkloadNetworkGatewayListResult
  - Added Interface WorkloadNetworkListResult
  - Added Interface WorkloadNetworkPortMirroringListResult
  - Added Interface WorkloadNetworkPortMirroringUpdate
  - Added Interface WorkloadNetworkPublicIPListResult
  - Added Interface WorkloadNetworksCreateDhcpHeaders
  - Added Interface WorkloadNetworksCreateDnsServiceHeaders
  - Added Interface WorkloadNetworksCreateDnsZoneHeaders
  - Added Interface WorkloadNetworksCreatePortMirroringHeaders
  - Added Interface WorkloadNetworksCreatePublicIPHeaders
  - Added Interface WorkloadNetworksCreateSegmentsHeaders
  - Added Interface WorkloadNetworksCreateVMGroupHeaders
  - Added Interface WorkloadNetworksDeleteDhcpHeaders
  - Added Interface WorkloadNetworksDeleteDnsServiceHeaders
  - Added Interface WorkloadNetworksDeleteDnsZoneHeaders
  - Added Interface WorkloadNetworksDeletePortMirroringHeaders
  - Added Interface WorkloadNetworksDeletePublicIPHeaders
  - Added Interface WorkloadNetworksDeleteSegmentHeaders
  - Added Interface WorkloadNetworksDeleteVMGroupHeaders
  - Added Interface WorkloadNetworkSegmentListResult
  - Added Interface WorkloadNetworkSegmentUpdate
  - Added Interface WorkloadNetworksUpdateDhcpHeaders
  - Added Interface WorkloadNetworksUpdateDnsServiceHeaders
  - Added Interface WorkloadNetworksUpdateDnsZoneHeaders
  - Added Interface WorkloadNetworksUpdatePortMirroringHeaders
  - Added Interface WorkloadNetworksUpdateSegmentsHeaders
  - Added Interface WorkloadNetworksUpdateVMGroupHeaders
  - Added Interface WorkloadNetworkVirtualMachineListResult
  - Added Interface WorkloadNetworkVMGroupListResult
  - Added Interface WorkloadNetworkVMGroupUpdate
  - Added Type Alias ActionType
  - Added Type Alias CloudLinkProvisioningState
  - Added Type Alias CreatedByType
  - Added Type Alias DnsZoneType
  - Added Type Alias HcxEnterpriseSiteProvisioningState
  - Added Type Alias IscsiPathProvisioningState
  - Added Type Alias IscsiPathsCreateOrUpdateResponse
  - Added Type Alias IscsiPathsGetResponse
  - Added Type Alias IscsiPathsListByPrivateCloudNextResponse
  - Added Type Alias IscsiPathsListByPrivateCloudResponse
  - Added Type Alias Origin
  - Added Type Alias PrivateCloudsRotateNsxtPasswordResponse
  - Added Type Alias PrivateCloudsRotateVcenterPasswordResponse
  - Added Type Alias ScriptCmdletAudience
  - Added Type Alias ScriptCmdletProvisioningState
  - Added Type Alias ScriptPackageProvisioningState
  - Added Type Alias SkuTier
  - Added Type Alias SystemAssignedServiceIdentityType
  - Added Type Alias VirtualMachineProvisioningState
  - Added Type Alias VirtualMachinesRestrictMovementResponse
  - Added Type Alias WorkloadNetworkDhcpEntityUpdateUnion
  - Added Type Alias WorkloadNetworkProvisioningState
  - Interface CloudLink has a new optional parameter provisioningState
  - Interface Cluster has a new optional parameter vsanDatastoreName
  - Interface ClusterUpdate has a new optional parameter sku
  - Interface Datastore has a new optional parameter elasticSanVolume
  - Interface Endpoints has a new optional parameter hcxCloudManagerIp
  - Interface Endpoints has a new optional parameter nsxtManagerIp
  - Interface Endpoints has a new optional parameter vcenterIp
  - Interface HcxEnterpriseSite has a new optional parameter provisioningState
  - Interface ManagementCluster has a new optional parameter clusterId
  - Interface ManagementCluster has a new optional parameter clusterSize
  - Interface ManagementCluster has a new optional parameter hosts
  - Interface ManagementCluster has a new optional parameter provisioningState
  - Interface ManagementCluster has a new optional parameter vsanDatastoreName
  - Interface Operation has a new optional parameter actionType
  - Interface PrivateCloud has a new optional parameter dnsZoneType
  - Interface PrivateCloud has a new optional parameter virtualNetworkId
  - Interface PrivateCloudUpdate has a new optional parameter dnsZoneType
  - Interface PrivateCloudUpdate has a new optional parameter sku
  - Interface Resource has a new optional parameter systemData
  - Interface ScriptCmdlet has a new optional parameter audience
  - Interface ScriptCmdlet has a new optional parameter provisioningState
  - Interface ScriptPackage has a new optional parameter provisioningState
  - Interface Sku has a new optional parameter capacity
  - Interface Sku has a new optional parameter family
  - Interface Sku has a new optional parameter size
  - Interface Sku has a new optional parameter tier
  - Interface VirtualMachine has a new optional parameter provisioningState
  - Interface WorkloadNetwork has a new optional parameter provisioningState
  - Interface WorkloadNetworkGateway has a new optional parameter provisioningState
  - Interface WorkloadNetworkVirtualMachine has a new optional parameter provisioningState
  - Type of parameter addonType of interface AddonProperties is changed from "SRM" | "VR" | "HCX" | "Arc" to "Arc" | "HCX" | "SRM" | "VR"
  - Type of parameter type of interface PlacementPolicyProperties is changed from "VmVm" | "VmHost" to "VmHost" | "VmVm"
  - Type of parameter type of interface ScriptExecutionParameter is changed from "SecureValue" | "Value" | "Credential" to "Credential" | "SecureValue" | "Value"
  - Type of parameter dhcpType of interface WorkloadNetworkDhcpEntity is changed from "SERVER" | "RELAY" to "RELAY" | "SERVER"
  - Added Enum KnownActionType
  - Added Enum KnownCloudLinkProvisioningState
  - Added Enum KnownCreatedByType
  - Added Enum KnownDnsZoneType
  - Added Enum KnownHcxEnterpriseSiteProvisioningState
  - Added Enum KnownIscsiPathProvisioningState
  - Added Enum KnownOrigin
  - Added Enum KnownScriptCmdletAudience
  - Added Enum KnownScriptCmdletProvisioningState
  - Added Enum KnownScriptPackageProvisioningState
  - Added Enum KnownSystemAssignedServiceIdentityType
  - Added Enum KnownVirtualMachineProvisioningState
  - Added Enum KnownWorkloadNetworkProvisioningState

### Breaking Changes

  - Operation WorkloadNetworks.beginUpdateDhcp has a new signature
  - Operation WorkloadNetworks.beginUpdateDhcpAndWait has a new signature
  - Operation WorkloadNetworks.beginUpdateDnsService has a new signature
  - Operation WorkloadNetworks.beginUpdateDnsServiceAndWait has a new signature
  - Operation WorkloadNetworks.beginUpdateDnsZone has a new signature
  - Operation WorkloadNetworks.beginUpdateDnsZoneAndWait has a new signature
  - Operation WorkloadNetworks.beginUpdatePortMirroring has a new signature
  - Operation WorkloadNetworks.beginUpdatePortMirroringAndWait has a new signature
  - Operation WorkloadNetworks.beginUpdateSegments has a new signature
  - Operation WorkloadNetworks.beginUpdateSegmentsAndWait has a new signature
  - Operation WorkloadNetworks.beginUpdateVMGroup has a new signature
  - Operation WorkloadNetworks.beginUpdateVMGroupAndWait has a new signature
  - Operation WorkloadNetworks.get has a new signature
  - Interface Operation no longer has parameter properties
  - Parameter location of interface TrackedResource is now required
  - Type of parameter origin of interface Operation is changed from string to Origin
  - Type of parameter identity of interface PrivateCloud is changed from PrivateCloudIdentity to SystemAssignedServiceIdentity
  - Type of parameter identity of interface PrivateCloudUpdate is changed from PrivateCloudIdentity to SystemAssignedServiceIdentity
  - Removed Enum KnownResourceIdentityType
  - Removed Enum KnownWorkloadNetworkName
    
    
## 4.0.0 (2023-08-10)
    
### Features Added

  - Added Interface ErrorDetail
  - Interface ErrorResponse has a new optional parameter error
  - Interface PrivateCloud has a new optional parameter extendedNetworkBlocks
  - Interface PrivateCloudUpdate has a new optional parameter extendedNetworkBlocks
  - Interface PrivateCloudUpdateProperties has a new optional parameter extendedNetworkBlocks
  - Added function getContinuationToken

### Breaking Changes

  - Interface ErrorResponse no longer has parameter additionalInfo
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter details
  - Interface ErrorResponse no longer has parameter message
  - Interface ErrorResponse no longer has parameter target
    
    
## 3.2.0 (2022-10-20)
    
### Features Added

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

### Bugs Fixed

  -  revert credential scopes

## 3.1.1 (2022-09-30)

### Bugs Fixed

  -  fix better user experience of credential scopes in government cloud

## 3.1.0 (2022-07-05)
    
### Features Added

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
