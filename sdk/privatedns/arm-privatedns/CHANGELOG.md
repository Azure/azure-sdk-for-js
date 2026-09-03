# Release History

## 4.0.0 (2026-07-16)

### Features Added
  - Added operation PrivateZonesOperations.createOrUpdate
  - Added operation PrivateZonesOperations.delete
  - Added operation PrivateZonesOperations.update
  - Added operation VirtualNetworkLinksOperations.createOrUpdate
  - Added operation VirtualNetworkLinksOperations.delete
  - Added operation VirtualNetworkLinksOperations.update
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateZoneProperties
  - Added Interface RecordSetProperties
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SystemData
  - Added Interface VirtualNetworkLinkProperties
  - Interface PrivateZone has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface RecordSet has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface VirtualNetworkLink has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Interface TrackedResource

## 4.0.0-beta.1 (2026-06-10)
Compared with version 3.3.0

### Features Added
  - Added operation PrivateZonesOperations.createOrUpdate
  - Added operation PrivateZonesOperations.delete
  - Added operation PrivateZonesOperations.update
  - Added operation VirtualNetworkLinksOperations.createOrUpdate
  - Added operation VirtualNetworkLinksOperations.delete
  - Added operation VirtualNetworkLinksOperations.update
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PrivateZoneProperties
  - Added Interface RecordSetProperties
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Added Interface SystemData
  - Added Interface VirtualNetworkLinkProperties
  - Interface PrivateZone has a new optional parameter systemData
  - Interface ProxyResource has a new optional parameter systemData
  - Interface RecordSet has a new optional parameter systemData
  - Interface Resource has a new optional parameter systemData
  - Interface VirtualNetworkLink has a new optional parameter systemData
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Interface TrackedResource

    
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
