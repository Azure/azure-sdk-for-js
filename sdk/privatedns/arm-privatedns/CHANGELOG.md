# Release History
    
## 4.0.0 (2025-07-07)
    
### Features Added
  - Added operation PrivateZonesOperations.createOrUpdate
  - Added operation PrivateZonesOperations.delete
  - Added operation PrivateZonesOperations.update
  - Added operation VirtualNetworkLinksOperations.createOrUpdate
  - Added operation VirtualNetworkLinksOperations.delete
  - Added operation VirtualNetworkLinksOperations.update
  - Added Class NetworkClient
  - Added Interface NetworkClientOptionalParams
  - Added Interface PageSettings
  - Added Interface PrivateZoneProperties
  - Added Interface RecordSetProperties
  - Added Interface SystemData
  - Added Interface VirtualNetworkLinkProperties
  - Interface PrivateZone has a new optional parameter properties
  - Interface PrivateZone has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface RecordSet has a new optional parameter properties
  - Interface RecordSet has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface VirtualNetworkLink has a new optional parameter properties
  - Interface VirtualNetworkLink has a new optional parameter systemData
  - Added Type Alias CreatedByType
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions
### Breaking Changes
  - Removed operation PrivateZones.beginCreateOrUpdate
  - Removed operation PrivateZones.beginCreateOrUpdateAndWait
  - Removed operation PrivateZones.beginDelete
  - Removed operation PrivateZones.beginDeleteAndWait
  - Removed operation PrivateZones.beginUpdate
  - Removed operation PrivateZones.beginUpdateAndWait
  - Removed operation VirtualNetworkLinks.beginCreateOrUpdate
  - Removed operation VirtualNetworkLinks.beginCreateOrUpdateAndWait
  - Removed operation VirtualNetworkLinks.beginDelete
  - Removed operation VirtualNetworkLinks.beginDeleteAndWait
  - Removed operation VirtualNetworkLinks.beginUpdate
  - Removed operation VirtualNetworkLinks.beginUpdateAndWait
  - Deleted Class PrivateDnsManagementClient
  - Removed Interface PrivateDnsManagementClientOptionalParams
  - Removed Interface PrivateZoneListResult
  - Removed Interface RecordSetListResult
  - Removed Interface TrackedResource
  - Removed Interface VirtualNetworkLinkListResult
  - Interface PrivateZone no longer has parameter internalId
  - Interface PrivateZone no longer has parameter maxNumberOfRecordSets
  - Interface PrivateZone no longer has parameter maxNumberOfVirtualNetworkLinks
  - Interface PrivateZone no longer has parameter maxNumberOfVirtualNetworkLinksWithRegistration
  - Interface PrivateZone no longer has parameter numberOfRecordSets
  - Interface PrivateZone no longer has parameter numberOfVirtualNetworkLinks
  - Interface PrivateZone no longer has parameter numberOfVirtualNetworkLinksWithRegistration
  - Interface PrivateZone no longer has parameter provisioningState
  - Interface PrivateZonesCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface PrivateZonesDeleteOptionalParams no longer has parameter resumeFrom
  - Interface PrivateZonesUpdateOptionalParams no longer has parameter resumeFrom
  - Interface RecordSet no longer has parameter aaaaRecords
  - Interface RecordSet no longer has parameter aRecords
  - Interface RecordSet no longer has parameter cnameRecord
  - Interface RecordSet no longer has parameter fqdn
  - Interface RecordSet no longer has parameter isAutoRegistered
  - Interface RecordSet no longer has parameter metadata
  - Interface RecordSet no longer has parameter mxRecords
  - Interface RecordSet no longer has parameter ptrRecords
  - Interface RecordSet no longer has parameter soaRecord
  - Interface RecordSet no longer has parameter srvRecords
  - Interface RecordSet no longer has parameter ttl
  - Interface RecordSet no longer has parameter txtRecords
  - Interface VirtualNetworkLink no longer has parameter provisioningState
  - Interface VirtualNetworkLink no longer has parameter registrationEnabled
  - Interface VirtualNetworkLink no longer has parameter resolutionPolicy
  - Interface VirtualNetworkLink no longer has parameter virtualNetwork
  - Interface VirtualNetworkLink no longer has parameter virtualNetworkLinkState
  - Interface VirtualNetworkLinksCreateOrUpdateOptionalParams no longer has parameter resumeFrom
  - Interface VirtualNetworkLinksDeleteOptionalParams no longer has parameter resumeFrom
  - Interface VirtualNetworkLinksUpdateOptionalParams no longer has parameter resumeFrom
  - Removed Type Alias PrivateZonesCreateOrUpdateResponse
  - Removed Type Alias PrivateZonesGetResponse
  - Removed Type Alias PrivateZonesListByResourceGroupNextResponse
  - Removed Type Alias PrivateZonesListByResourceGroupResponse
  - Removed Type Alias PrivateZonesListNextResponse
  - Removed Type Alias PrivateZonesListResponse
  - Removed Type Alias PrivateZonesUpdateResponse
  - Removed Type Alias RecordSetsCreateOrUpdateResponse
  - Removed Type Alias RecordSetsGetResponse
  - Removed Type Alias RecordSetsListByTypeNextResponse
  - Removed Type Alias RecordSetsListByTypeResponse
  - Removed Type Alias RecordSetsListNextResponse
  - Removed Type Alias RecordSetsListResponse
  - Removed Type Alias RecordSetsUpdateResponse
  - Removed Type Alias VirtualNetworkLinksCreateOrUpdateResponse
  - Removed Type Alias VirtualNetworkLinksGetResponse
  - Removed Type Alias VirtualNetworkLinksListNextResponse
  - Removed Type Alias VirtualNetworkLinksListResponse
  - Removed Type Alias VirtualNetworkLinksUpdateResponse
  - Removed function getContinuationToken

    
    
## 3.3.0 (2024-09-12)
    
### Features Added

  - Added Type Alias ResolutionPolicy
  - Interface VirtualNetworkLink has a new optional parameter resolutionPolicy
  - Added Enum KnownResolutionPolicy
    
    
## 3.2.0 (2023-05-10)
    
### Features Added

  - Interface PrivateZonesListByResourceGroupNextOptionalParams no longer has parameter top
  - Interface PrivateZonesListNextOptionalParams no longer has parameter top
  - Interface RecordSetsListByTypeNextOptionalParams no longer has parameter recordsetnamesuffix
  - Interface RecordSetsListByTypeNextOptionalParams no longer has parameter top
  - Interface RecordSetsListNextOptionalParams no longer has parameter recordsetnamesuffix
  - Interface RecordSetsListNextOptionalParams no longer has parameter top
  - Interface VirtualNetworkLinksListNextOptionalParams no longer has parameter top
    
    
## 3.1.0 (2022-12-02)
    
### Features Added

  - Added Interface PrivateZone
  - Added Interface ProxyResource
  - Added Interface RecordSet
  - Added Interface TrackedResource
  - Added Interface VirtualNetworkLink
    
    
## 3.0.1 (2022-04-28)

### Features Added

  - Bug fix
  
## 3.0.0 (2022-01-24)

The package of @azure/arm-privatedns is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
