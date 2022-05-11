# Release History
    
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
