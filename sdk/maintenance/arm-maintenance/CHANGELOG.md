# Release History

## 1.0.0-beta.5 (2026-09-23)
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
  - Added Interface ScheduledEventsAcknowledgeErrorDetails
  - Added Interface ScheduledEventsAcknowledgeListOptionalParams
  - Added Interface ScheduledEventsAcknowledgeOptionalParams
  - Added Interface ScheduledEventsApproveResponse
  - Added Interface ScheduledEventsIdList
  - Added Interface ScheduledEventsListAcknowledgeError
  - Added Interface ScheduledEventsListAcknowledgeErrorDetails
  - Added Interface UpdateProperties
  - Interface ApplyUpdateForResourceGroupListOptionalParams has a new optional parameter abortSignal
  - Interface ApplyUpdateForResourceGroupListOptionalParams has a new optional parameter requestOptions
  - Interface ApplyUpdateForResourceGroupListOptionalParams has a new optional parameter tracingOptions
  - Interface ApplyUpdateForResourceGroupListOptionalParams has a new optional parameter onResponse
  - Interface ApplyUpdatesCreateOrUpdateOptionalParams has a new optional parameter abortSignal
  - Interface ApplyUpdatesCreateOrUpdateOptionalParams has a new optional parameter requestOptions
  - Interface ApplyUpdatesCreateOrUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface ApplyUpdatesCreateOrUpdateOptionalParams has a new optional parameter onResponse
  - Interface ApplyUpdatesCreateOrUpdateOrCancelOptionalParams has a new optional parameter abortSignal
  - Interface ApplyUpdatesCreateOrUpdateOrCancelOptionalParams has a new optional parameter requestOptions
  - Interface ApplyUpdatesCreateOrUpdateOrCancelOptionalParams has a new optional parameter tracingOptions
  - Interface ApplyUpdatesCreateOrUpdateOrCancelOptionalParams has a new optional parameter onResponse
  - Interface ApplyUpdatesCreateOrUpdateParentOptionalParams has a new optional parameter abortSignal
  - Interface ApplyUpdatesCreateOrUpdateParentOptionalParams has a new optional parameter requestOptions
  - Interface ApplyUpdatesCreateOrUpdateParentOptionalParams has a new optional parameter tracingOptions
  - Interface ApplyUpdatesCreateOrUpdateParentOptionalParams has a new optional parameter onResponse
  - Interface ApplyUpdatesGetOptionalParams has a new optional parameter abortSignal
  - Interface ApplyUpdatesGetOptionalParams has a new optional parameter requestOptions
  - Interface ApplyUpdatesGetOptionalParams has a new optional parameter tracingOptions
  - Interface ApplyUpdatesGetOptionalParams has a new optional parameter onResponse
  - Interface ApplyUpdatesGetParentOptionalParams has a new optional parameter abortSignal
  - Interface ApplyUpdatesGetParentOptionalParams has a new optional parameter requestOptions
  - Interface ApplyUpdatesGetParentOptionalParams has a new optional parameter tracingOptions
  - Interface ApplyUpdatesGetParentOptionalParams has a new optional parameter onResponse
  - Interface ApplyUpdatesListOptionalParams has a new optional parameter abortSignal
  - Interface ApplyUpdatesListOptionalParams has a new optional parameter requestOptions
  - Interface ApplyUpdatesListOptionalParams has a new optional parameter tracingOptions
  - Interface ApplyUpdatesListOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsCreateOrUpdateOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsCreateOrUpdateOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsCreateOrUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsCreateOrUpdateOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsCreateOrUpdateParentOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsCreateOrUpdateParentOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsCreateOrUpdateParentOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsCreateOrUpdateParentOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsDeleteOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsDeleteOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsDeleteOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsDeleteOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsDeleteParentOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsDeleteParentOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsDeleteParentOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsDeleteParentOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsForResourceGroupCreateOrUpdateOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsForResourceGroupDeleteOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsForResourceGroupDeleteOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsForResourceGroupDeleteOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsForResourceGroupDeleteOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsForResourceGroupGetOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsForResourceGroupGetOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsForResourceGroupGetOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsForResourceGroupGetOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsForResourceGroupUpdateOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsForResourceGroupUpdateOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsForResourceGroupUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsForResourceGroupUpdateOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsForSubscriptionsCreateOrUpdateOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsForSubscriptionsDeleteOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsForSubscriptionsGetOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsForSubscriptionsGetOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsForSubscriptionsGetOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsForSubscriptionsGetOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsForSubscriptionsUpdateOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsGetOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsGetOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsGetOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsGetOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsGetParentOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsGetParentOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsGetParentOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsGetParentOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsListOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsListOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsListOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsListOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsListParentOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsListParentOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsListParentOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsListParentOptionalParams has a new optional parameter onResponse
  - Interface ConfigurationAssignmentsWithinSubscriptionListOptionalParams has a new optional parameter abortSignal
  - Interface ConfigurationAssignmentsWithinSubscriptionListOptionalParams has a new optional parameter requestOptions
  - Interface ConfigurationAssignmentsWithinSubscriptionListOptionalParams has a new optional parameter tracingOptions
  - Interface ConfigurationAssignmentsWithinSubscriptionListOptionalParams has a new optional parameter onResponse
  - Interface MaintenanceConfiguration has a new optional parameter maintenanceWindow
  - Interface MaintenanceConfigurationsCreateOrUpdateOptionalParams has a new optional parameter abortSignal
  - Interface MaintenanceConfigurationsCreateOrUpdateOptionalParams has a new optional parameter requestOptions
  - Interface MaintenanceConfigurationsCreateOrUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface MaintenanceConfigurationsCreateOrUpdateOptionalParams has a new optional parameter onResponse
  - Interface MaintenanceConfigurationsDeleteOptionalParams has a new optional parameter abortSignal
  - Interface MaintenanceConfigurationsDeleteOptionalParams has a new optional parameter requestOptions
  - Interface MaintenanceConfigurationsDeleteOptionalParams has a new optional parameter tracingOptions
  - Interface MaintenanceConfigurationsDeleteOptionalParams has a new optional parameter onResponse
  - Interface MaintenanceConfigurationsForResourceGroupListOptionalParams has a new optional parameter abortSignal
  - Interface MaintenanceConfigurationsForResourceGroupListOptionalParams has a new optional parameter requestOptions
  - Interface MaintenanceConfigurationsForResourceGroupListOptionalParams has a new optional parameter tracingOptions
  - Interface MaintenanceConfigurationsForResourceGroupListOptionalParams has a new optional parameter onResponse
  - Interface MaintenanceConfigurationsGetOptionalParams has a new optional parameter abortSignal
  - Interface MaintenanceConfigurationsGetOptionalParams has a new optional parameter requestOptions
  - Interface MaintenanceConfigurationsGetOptionalParams has a new optional parameter tracingOptions
  - Interface MaintenanceConfigurationsGetOptionalParams has a new optional parameter onResponse
  - Interface MaintenanceConfigurationsListOptionalParams has a new optional parameter abortSignal
  - Interface MaintenanceConfigurationsListOptionalParams has a new optional parameter requestOptions
  - Interface MaintenanceConfigurationsListOptionalParams has a new optional parameter tracingOptions
  - Interface MaintenanceConfigurationsListOptionalParams has a new optional parameter onResponse
  - Interface MaintenanceConfigurationsUpdateOptionalParams has a new optional parameter abortSignal
  - Interface MaintenanceConfigurationsUpdateOptionalParams has a new optional parameter requestOptions
  - Interface MaintenanceConfigurationsUpdateOptionalParams has a new optional parameter tracingOptions
  - Interface MaintenanceConfigurationsUpdateOptionalParams has a new optional parameter onResponse
  - Interface Operation has a new optional parameter actionType
  - Interface OperationsListOptionalParams has a new optional parameter abortSignal
  - Interface OperationsListOptionalParams has a new optional parameter requestOptions
  - Interface OperationsListOptionalParams has a new optional parameter tracingOptions
  - Interface OperationsListOptionalParams has a new optional parameter onResponse
  - Interface PublicMaintenanceConfigurationsGetOptionalParams has a new optional parameter abortSignal
  - Interface PublicMaintenanceConfigurationsGetOptionalParams has a new optional parameter requestOptions
  - Interface PublicMaintenanceConfigurationsGetOptionalParams has a new optional parameter tracingOptions
  - Interface PublicMaintenanceConfigurationsGetOptionalParams has a new optional parameter onResponse
  - Interface PublicMaintenanceConfigurationsListOptionalParams has a new optional parameter abortSignal
  - Interface PublicMaintenanceConfigurationsListOptionalParams has a new optional parameter requestOptions
  - Interface PublicMaintenanceConfigurationsListOptionalParams has a new optional parameter tracingOptions
  - Interface PublicMaintenanceConfigurationsListOptionalParams has a new optional parameter onResponse
  - Interface UpdatesListOptionalParams has a new optional parameter abortSignal
  - Interface UpdatesListOptionalParams has a new optional parameter requestOptions
  - Interface UpdatesListOptionalParams has a new optional parameter tracingOptions
  - Interface UpdatesListOptionalParams has a new optional parameter onResponse
  - Interface UpdatesListParentOptionalParams has a new optional parameter abortSignal
  - Interface UpdatesListParentOptionalParams has a new optional parameter requestOptions
  - Interface UpdatesListParentOptionalParams has a new optional parameter tracingOptions
  - Interface UpdatesListParentOptionalParams has a new optional parameter onResponse
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias Origin
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Operation ConfigurationAssignments.delete has a new signature
  - Operation ConfigurationAssignments.deleteParent has a new signature
  - Operation ConfigurationAssignmentsForResourceGroup.delete has a new signature
  - Operation ConfigurationAssignmentsForSubscriptions.delete has a new signature
  - Operation MaintenanceConfigurations.delete has a new signature
  - Class MaintenanceManagementClient no longer has parameter scheduledEvent
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

## 1.0.0-beta.4 (2026-05-29)
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
  - Removed Interface ListApplyUpdate
  - Removed Interface OperationInfo
  - Interface MaintenanceConfiguration no longer has parameter duration
  - Interface MaintenanceConfiguration no longer has parameter expirationDateTime
  - Interface MaintenanceConfiguration no longer has parameter recurEvery
  - Interface MaintenanceConfiguration no longer has parameter startDateTime
  - Interface MaintenanceConfiguration no longer has parameter timeZone
  - Interface Operation no longer has parameter properties

    
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
