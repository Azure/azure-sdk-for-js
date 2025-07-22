# Release History

## 1.0.0-beta.3 (2025-07-22)
Compared with version 1.0.0-beta.2

### Features Added
  - Added Interface ApplyUpdateProperties
  - Added Interface ConfigurationAssignmentProperties
  - Added Interface MaintenanceConfigurationProperties
  - Added Interface MaintenanceWindow
  - Added Interface OperationDisplay
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface TrackedResource
  - Added Interface UpdateProperties
  - Interface ApplyUpdate has a new optional parameter properties
  - Interface ConfigurationAssignment has a new optional parameter properties
  - Interface MaintenanceConfiguration has a new optional parameter properties
  - Interface Operation has a new optional parameter actionType
  - Interface Update has a new optional parameter properties
  - Added Type Alias ActionType
  - Added Type Alias Origin
  - Added Enum KnownActionType
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Class MaintenanceManagementClient no longer has parameter $host
  - Class MaintenanceManagementClient no longer has parameter apiVersion
  - Class MaintenanceManagementClient no longer has parameter subscriptionId
  - Removed Interface ListApplyUpdate
  - Removed Interface ListConfigurationAssignmentsResult
  - Removed Interface ListMaintenanceConfigurationsResult
  - Removed Interface ListUpdatesResult
  - Removed Interface OperationInfo
  - Removed Interface OperationsListResult
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
  - Interface MaintenanceManagementClientOptionalParams no longer has parameter $host
  - Interface MaintenanceManagementClientOptionalParams no longer has parameter endpoint
  - Interface Operation no longer has parameter properties
  - Interface Update no longer has parameter resourceId
  - Parameter location of interface MaintenanceConfiguration is now required
  - Removed Type Alias ApplyUpdateForResourceGroupListResponse
  - Removed Type Alias ApplyUpdatesCreateOrUpdateOrCancelResponse
  - Removed Type Alias ApplyUpdatesCreateOrUpdateParentResponse
  - Removed Type Alias ApplyUpdatesCreateOrUpdateResponse
  - Removed Type Alias ApplyUpdatesGetParentResponse
  - Removed Type Alias ApplyUpdatesGetResponse
  - Removed Type Alias ApplyUpdatesListResponse
  - Removed Type Alias ConfigurationAssignmentsCreateOrUpdateParentResponse
  - Removed Type Alias ConfigurationAssignmentsCreateOrUpdateResponse
  - Removed Type Alias ConfigurationAssignmentsDeleteParentResponse
  - Removed Type Alias ConfigurationAssignmentsDeleteResponse
  - Removed Type Alias ConfigurationAssignmentsForResourceGroupCreateOrUpdateResponse
  - Removed Type Alias ConfigurationAssignmentsForResourceGroupDeleteResponse
  - Removed Type Alias ConfigurationAssignmentsForResourceGroupGetResponse
  - Removed Type Alias ConfigurationAssignmentsForResourceGroupUpdateResponse
  - Removed Type Alias ConfigurationAssignmentsForSubscriptionsCreateOrUpdateResponse
  - Removed Type Alias ConfigurationAssignmentsForSubscriptionsDeleteResponse
  - Removed Type Alias ConfigurationAssignmentsForSubscriptionsGetResponse
  - Removed Type Alias ConfigurationAssignmentsForSubscriptionsUpdateResponse
  - Removed Type Alias ConfigurationAssignmentsGetParentResponse
  - Removed Type Alias ConfigurationAssignmentsGetResponse
  - Removed Type Alias ConfigurationAssignmentsListParentResponse
  - Removed Type Alias ConfigurationAssignmentsListResponse
  - Removed Type Alias ConfigurationAssignmentsWithinSubscriptionListResponse
  - Removed Type Alias MaintenanceConfigurationsCreateOrUpdateResponse
  - Removed Type Alias MaintenanceConfigurationsDeleteResponse
  - Removed Type Alias MaintenanceConfigurationsForResourceGroupListResponse
  - Removed Type Alias MaintenanceConfigurationsGetResponse
  - Removed Type Alias MaintenanceConfigurationsListResponse
  - Removed Type Alias MaintenanceConfigurationsUpdateResponse
  - Removed Type Alias OperationsListResponse
  - Removed Type Alias PublicMaintenanceConfigurationsGetResponse
  - Removed Type Alias PublicMaintenanceConfigurationsListResponse
  - Removed Type Alias ScheduledEventAcknowledgeResponse
  - Removed Type Alias UpdatesListParentResponse
  - Removed Type Alias UpdatesListResponse
  - Removed function getContinuationToken

    
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
