# Release History

## 1.0.0-beta.4 (2025-11-03)
Compared with version 1.0.0-beta.2

### Features Added
  - Added Interface ApplyUpdateProperties
  - Added Interface ConfigurationAssignmentProperties
  - Added Interface MaintenanceConfigurationProperties
  - Added Interface MaintenanceWindow
  - Added Interface OperationDisplay
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface UpdateProperties
  - Interface ApplyUpdate has a new optional parameter properties
  - Interface ConfigurationAssignment has a new optional parameter properties
  - Interface MaintenanceConfiguration has a new optional parameter properties
  - Interface Operation has a new optional parameter actionType
  - Interface Update has a new optional parameter properties
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias Origin
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Interface ListApplyUpdate
  - Removed Interface OperationInfo
  - Interface ApplyUpdate no longer has parameter lastUpdateTime
  - Interface ApplyUpdate no longer has parameter resourceId
  - Interface ApplyUpdate no longer has parameter status
  - Interface ConfigurationAssignment no longer has parameter filter
  - Interface ConfigurationAssignment no longer has parameter maintenanceConfigurationId
  - Interface ConfigurationAssignment no longer has parameter resourceId
  - Interface MaintenanceConfiguration no longer has parameter duration
  - Interface MaintenanceConfiguration no longer has parameter expirationDateTime
  - Interface MaintenanceConfiguration no longer has parameter extensionProperties
  - Interface MaintenanceConfiguration no longer has parameter installPatches
  - Interface MaintenanceConfiguration no longer has parameter maintenanceScope
  - Interface MaintenanceConfiguration no longer has parameter namespace
  - Interface MaintenanceConfiguration no longer has parameter recurEvery
  - Interface MaintenanceConfiguration no longer has parameter startDateTime
  - Interface MaintenanceConfiguration no longer has parameter timeZone
  - Interface MaintenanceConfiguration no longer has parameter visibility
  - Interface Operation no longer has parameter properties
  - Interface Update no longer has parameter resourceId

    
## 1.0.0-beta.2 (2024-05-10)
    
### Features Added

  - Added operation group ScheduledEvent
  - Added operation ApplyUpdates.createOrUpdateOrCancel
  - Added Interface ApplyUpdatesCreateOrUpdateOrCancelOptionalParams
  - Added Interface ScheduledEventAcknowledgeOptionalParams
  - Added Interface ScheduledEventApproveResponse
  - Added Type Alias ApplyUpdatesCreateOrUpdateOrCancelResponse
  - Added Type Alias ScheduledEventAcknowledgeResponse
  - Enum KnownUpdateStatus has a new value Cancel
  - Enum KnownUpdateStatus has a new value Cancelled
  - Enum KnownUpdateStatus has a new value NoUpdatesPending
    
    
## 1.0.0-beta.1 (2023-08-02)

The package of @azure/arm-maintenance is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
