# Release History

## 1.2.0-beta.1 (2025-08-28)

Compared with version 1.1.0

### Features Added

- Added operation group OccurrenceExtensionOperations
- Added operation group OccurrencesOperations
- Added operation group ScheduledActionExtensionOperations
- Added operation ScheduledActionsOperations.attachResources
- Added operation ScheduledActionsOperations.cancelNextOccurrence
- Added operation ScheduledActionsOperations.createOrUpdate
- Added operation ScheduledActionsOperations.delete
- Added operation ScheduledActionsOperations.detachResources
- Added operation ScheduledActionsOperations.disable
- Added operation ScheduledActionsOperations.enable
- Added operation ScheduledActionsOperations.get
- Added operation ScheduledActionsOperations.listByResourceGroup
- Added operation ScheduledActionsOperations.listBySubscription
- Added operation ScheduledActionsOperations.listResources
- Added operation ScheduledActionsOperations.patchResources
- Added operation ScheduledActionsOperations.triggerManualOccurrence
- Added operation ScheduledActionsOperations.update
- Added Interface CancelOccurrenceRequest
- Added Interface DelayRequest
- Added Interface ExtensionResource
- Added Interface NotificationProperties
- Added Interface Occurrence
- Added Interface OccurrenceExtensionListOccurrenceByVmsOptionalParams
- Added Interface OccurrenceExtensionProperties
- Added Interface OccurrenceExtensionResource
- Added Interface OccurrenceProperties
- Added Interface OccurrenceResource
- Added Interface OccurrenceResultSummary
- Added Interface OccurrencesCancelOptionalParams
- Added Interface OccurrencesDelayOptionalParams
- Added Interface OccurrencesGetOptionalParams
- Added Interface OccurrencesListByScheduledActionOptionalParams
- Added Interface OccurrencesListResourcesOptionalParams
- Added Interface ProxyResource
- Added Interface RecurringActionsResourceOperationResult
- Added Interface Resource
- Added Interface ResourceAttachRequest
- Added Interface ResourceDetachRequest
- Added Interface ResourcePatchRequest
- Added Interface ResourceResultSummary
- Added Interface ResourceStatus
- Added Interface ScheduledAction
- Added Interface ScheduledActionExtensionListByVmsOptionalParams
- Added Interface ScheduledActionProperties
- Added Interface ScheduledActionResource
- Added Interface ScheduledActionResourceCreate
- Added Interface ScheduledActionResources
- Added Interface ScheduledActionsAttachResourcesOptionalParams
- Added Interface ScheduledActionsCancelNextOccurrenceOptionalParams
- Added Interface ScheduledActionsCreateOrUpdateOptionalParams
- Added Interface ScheduledActionsDeleteOptionalParams
- Added Interface ScheduledActionsDetachResourcesOptionalParams
- Added Interface ScheduledActionsDisableOptionalParams
- Added Interface ScheduledActionsEnableOptionalParams
- Added Interface ScheduledActionsGetOptionalParams
- Added Interface ScheduledActionsListByResourceGroupOptionalParams
- Added Interface ScheduledActionsListBySubscriptionOptionalParams
- Added Interface ScheduledActionsListResourcesOptionalParams
- Added Interface ScheduledActionsPatchResourcesOptionalParams
- Added Interface ScheduledActionsSchedule
- Added Interface ScheduledActionsTriggerManualOccurrenceOptionalParams
- Added Interface ScheduledActionsUpdateOptionalParams
- Added Interface ScheduledActionUpdate
- Added Interface ScheduledActionUpdateProperties
- Added Interface SystemData
- Added Interface TrackedResource
- Interface ComputeScheduleClientOptionalParams has a new optional parameter cloudSetting
- Added Type Alias AzureSupportedClouds
- Added Type Alias CreatedByType
- Added Type Alias Language
- Added Type Alias Month
- Added Type Alias NotificationType
- Added Type Alias OccurrenceState
- Added Type Alias ProvisioningState
- Added Type Alias ResourceOperationStatus
- Added Type Alias ResourceProvisioningState
- Added Type Alias ResourceType
- Added Type Alias ScheduledActionType
- Added Type Alias WeekDay
- Added Enum AzureClouds
- Added Enum KnownCreatedByType
- Added Enum KnownLanguage
- Added Enum KnownMonth
- Added Enum KnownNotificationType
- Added Enum KnownOccurrenceState
- Added Enum KnownProvisioningState
- Added Enum KnownResourceOperationStatus
- Added Enum KnownResourceProvisioningState
- Added Enum KnownResourceType
- Added Enum KnownScheduledActionType
- Added Enum KnownWeekDay
- Enum KnownVersions has a new value V20240815Preview
- Enum KnownVersions has a new value V20250415Preview

## 1.1.0 (2025-06-06)

### Features Added

- Added operation ScheduledActionsOperations.virtualMachinesExecuteCreate
- Added operation ScheduledActionsOperations.virtualMachinesExecuteDelete
- Added Interface CreateResourceOperationResponse
- Added Interface DeleteResourceOperationResponse
- Added Interface ErrorAdditionalInfo
- Added Interface ErrorDetail
- Added Interface ErrorResponse
- Added Interface ExecuteCreateRequest
- Added Interface ExecuteDeleteRequest
- Added Interface ResourceProvisionPayload
- Added Interface ScheduledActionsVirtualMachinesExecuteCreateOptionalParams
- Added Interface ScheduledActionsVirtualMachinesExecuteDeleteOptionalParams
- Enum KnownVersions has a new value V20250501

## 1.0.0 (2025-01-24)

### Features Added

This is the first stable version with the package of @azure/arm-computeschedule
