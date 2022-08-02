# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2022-08-01)
    
**Features**

  - Added operation group PacketCoreControlPlaneVersions
  - Added operation group SimGroups
  - Added operation Sims.listBySimGroup
  - Added Interface AttachedDataNetwork
  - Added Interface AzureStackEdgeDeviceResourceId
  - Added Interface ConnectedClusterResourceId
  - Added Interface DataNetwork
  - Added Interface KeyVaultCertificate
  - Added Interface KeyVaultKey
  - Added Interface LocalDiagnosticsAccessConfiguration
  - Added Interface ManagedServiceIdentity
  - Added Interface MobileNetwork
  - Added Interface PacketCoreControlPlane
  - Added Interface PacketCoreControlPlaneVersion
  - Added Interface PacketCoreControlPlaneVersionListResult
  - Added Interface PacketCoreControlPlaneVersionsGetOptionalParams
  - Added Interface PacketCoreControlPlaneVersionsListByResourceGroupNextOptionalParams
  - Added Interface PacketCoreControlPlaneVersionsListByResourceGroupOptionalParams
  - Added Interface PacketCoreDataPlane
  - Added Interface PccRuleQosPolicy
  - Added Interface PlatformConfiguration
  - Added Interface ProxyResource
  - Added Interface Service
  - Added Interface Sim
  - Added Interface SimGroup
  - Added Interface SimGroupListResult
  - Added Interface SimGroupResourceId
  - Added Interface SimGroupsCreateOrUpdateOptionalParams
  - Added Interface SimGroupsDeleteOptionalParams
  - Added Interface SimGroupsGetOptionalParams
  - Added Interface SimGroupsListByResourceGroupNextOptionalParams
  - Added Interface SimGroupsListByResourceGroupOptionalParams
  - Added Interface SimGroupsListBySubscriptionNextOptionalParams
  - Added Interface SimGroupsListBySubscriptionOptionalParams
  - Added Interface SimGroupsUpdateTagsOptionalParams
  - Added Interface SimPolicy
  - Added Interface SimsListBySimGroupNextOptionalParams
  - Added Interface SimsListBySimGroupOptionalParams
  - Added Interface Site
  - Added Interface Slice
  - Added Interface TrackedResource
  - Added Interface UserAssignedIdentity
  - Added Type Alias BillingSku
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias PacketCoreControlPlaneVersionsGetResponse
  - Added Type Alias PacketCoreControlPlaneVersionsListByResourceGroupNextResponse
  - Added Type Alias PacketCoreControlPlaneVersionsListByResourceGroupResponse
  - Added Type Alias PlatformType
  - Added Type Alias RecommendedVersion
  - Added Type Alias SimGroupsCreateOrUpdateResponse
  - Added Type Alias SimGroupsGetResponse
  - Added Type Alias SimGroupsListByResourceGroupNextResponse
  - Added Type Alias SimGroupsListByResourceGroupResponse
  - Added Type Alias SimGroupsListBySubscriptionNextResponse
  - Added Type Alias SimGroupsListBySubscriptionResponse
  - Added Type Alias SimGroupsUpdateTagsResponse
  - Added Type Alias SimsListBySimGroupNextResponse
  - Added Type Alias SimsListBySimGroupResponse
  - Added Type Alias VersionState
  - Class MobileNetworkManagementClient has a new parameter packetCoreControlPlaneVersions
  - Class MobileNetworkManagementClient has a new parameter simGroups
  - Added Enum KnownBillingSku
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownPlatformType
  - Added Enum KnownRecommendedVersion
  - Added Enum KnownVersionState

**Breaking Changes**

  - Removed operation Sims.listByResourceGroup
  - Removed operation Sims.listBySubscription
  - Removed operation Sims.updateTags
  - Operation Sims.beginCreateOrUpdate has a new signature
  - Operation Sims.beginCreateOrUpdateAndWait has a new signature
  - Operation Sims.beginDelete has a new signature
  - Operation Sims.beginDeleteAndWait has a new signature
  - Operation Sims.get has a new signature
    
    
## 1.0.0-beta.2 (2022-03-23)
    
**Features**

  - Added Interface SystemData
  - Added Type Alias SimState
  - Interface InterfaceProperties has a new optional parameter ipv4Address
  - Interface InterfaceProperties has a new optional parameter ipv4Gateway
  - Interface InterfaceProperties has a new optional parameter ipv4Subnet
  - Interface Resource has a new optional parameter systemData
  - Type Alias Sim has a new parameter simState
  - Added Enum KnownSimState

**Breaking Changes**

  - Type Alias AttachedDataNetwork no longer has parameter createdBy
  - Type Alias AttachedDataNetwork no longer has parameter createdByType
  - Type Alias AttachedDataNetwork no longer has parameter createdAt
  - Type Alias AttachedDataNetwork no longer has parameter lastModifiedBy
  - Type Alias AttachedDataNetwork no longer has parameter lastModifiedByType
  - Type Alias AttachedDataNetwork no longer has parameter lastModifiedAt
  - Type Alias DataNetwork no longer has parameter createdBy
  - Type Alias DataNetwork no longer has parameter createdByType
  - Type Alias DataNetwork no longer has parameter createdAt
  - Type Alias DataNetwork no longer has parameter lastModifiedBy
  - Type Alias DataNetwork no longer has parameter lastModifiedByType
  - Type Alias DataNetwork no longer has parameter lastModifiedAt
  - Type Alias MobileNetwork no longer has parameter createdBy
  - Type Alias MobileNetwork no longer has parameter createdByType
  - Type Alias MobileNetwork no longer has parameter createdAt
  - Type Alias MobileNetwork no longer has parameter lastModifiedBy
  - Type Alias MobileNetwork no longer has parameter lastModifiedByType
  - Type Alias MobileNetwork no longer has parameter lastModifiedAt
  - Type Alias PacketCoreControlPlane no longer has parameter createdBy
  - Type Alias PacketCoreControlPlane no longer has parameter createdByType
  - Type Alias PacketCoreControlPlane no longer has parameter createdAt
  - Type Alias PacketCoreControlPlane no longer has parameter lastModifiedBy
  - Type Alias PacketCoreControlPlane no longer has parameter lastModifiedByType
  - Type Alias PacketCoreControlPlane no longer has parameter lastModifiedAt
  - Type Alias PacketCoreDataPlane no longer has parameter createdBy
  - Type Alias PacketCoreDataPlane no longer has parameter createdByType
  - Type Alias PacketCoreDataPlane no longer has parameter createdAt
  - Type Alias PacketCoreDataPlane no longer has parameter lastModifiedBy
  - Type Alias PacketCoreDataPlane no longer has parameter lastModifiedByType
  - Type Alias PacketCoreDataPlane no longer has parameter lastModifiedAt
  - Type Alias Service no longer has parameter createdBy
  - Type Alias Service no longer has parameter createdByType
  - Type Alias Service no longer has parameter createdAt
  - Type Alias Service no longer has parameter lastModifiedBy
  - Type Alias Service no longer has parameter lastModifiedByType
  - Type Alias Service no longer has parameter lastModifiedAt
  - Type Alias Sim no longer has parameter createdBy
  - Type Alias Sim no longer has parameter createdByType
  - Type Alias Sim no longer has parameter createdAt
  - Type Alias Sim no longer has parameter lastModifiedBy
  - Type Alias Sim no longer has parameter lastModifiedByType
  - Type Alias Sim no longer has parameter lastModifiedAt
  - Type Alias Sim no longer has parameter configurationState
  - Type Alias SimPolicy no longer has parameter createdBy
  - Type Alias SimPolicy no longer has parameter createdByType
  - Type Alias SimPolicy no longer has parameter createdAt
  - Type Alias SimPolicy no longer has parameter lastModifiedBy
  - Type Alias SimPolicy no longer has parameter lastModifiedByType
  - Type Alias SimPolicy no longer has parameter lastModifiedAt
  - Type Alias Site no longer has parameter createdBy
  - Type Alias Site no longer has parameter createdByType
  - Type Alias Site no longer has parameter createdAt
  - Type Alias Site no longer has parameter lastModifiedBy
  - Type Alias Site no longer has parameter lastModifiedByType
  - Type Alias Site no longer has parameter lastModifiedAt
  - Type Alias Slice no longer has parameter createdBy
  - Type Alias Slice no longer has parameter createdByType
  - Type Alias Slice no longer has parameter createdAt
  - Type Alias Slice no longer has parameter lastModifiedBy
  - Type Alias Slice no longer has parameter lastModifiedByType
  - Type Alias Slice no longer has parameter lastModifiedAt
  - Removed Enum KnownConfigurationState
    
    
## 1.0.0-beta.1 (2022-02-21)

The package of @azure/arm-mobilenetwork is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
