# Release History

## 1.0.0-beta.5 (2026-06-25)
Compared with version 1.0.0-beta.2

### Features Added
  - Added operation group ScheduledEventsOperations
  - Class MaintenanceManagementClient has a new constructor "constructor(credential: TokenCredential, options?: MaintenanceManagementClientOptionalParams);"
  - Added Interface ApplyUpdateProperties
  - Added Interface ConfigurationAssignmentProperties
  - Added Interface MaintenanceConfigurationProperties
  - Added Interface MaintenanceWindow
  - Added Interface OperationDisplay
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface ScheduledEventsAcknowledgeOptionalParams
  - Added Interface ScheduledEventsApproveResponse
  - Added Interface UpdateProperties
  - Interface MaintenanceConfiguration has a new optional parameter maintenanceWindow
  - Interface Operation has a new optional parameter actionType
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias Origin
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Class MaintenanceManagementClient no longer has parameter apiVersion
  - Class MaintenanceManagementClient no longer has parameter scheduledEvent
  - Class MaintenanceManagementClient no longer has parameter subscriptionId
  - Removed Interface ListApplyUpdate
  - Removed Interface OperationInfo
  - Removed Interface ScheduledEvent
  - Removed Interface ScheduledEventAcknowledgeOptionalParams
  - Removed Interface ScheduledEventApproveResponse
  - Interface MaintenanceConfiguration no longer has parameter duration
  - Interface MaintenanceConfiguration no longer has parameter expirationDateTime
  - Interface MaintenanceConfiguration no longer has parameter recurEvery
  - Interface MaintenanceConfiguration no longer has parameter startDateTime
  - Interface MaintenanceConfiguration no longer has parameter timeZone
  - Interface Operation no longer has parameter properties

