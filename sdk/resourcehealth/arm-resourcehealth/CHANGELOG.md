# Release History

## 4.1.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 4.1.0-beta.1 (2023-10-17)
    
**Features**

  - Added Type Alias EventSubTypeValues
  - Interface Event_2 has a new optional parameter argQuery
  - Interface Event_2 has a new optional parameter eventSubType
  - Interface Event_2 has a new optional parameter maintenanceId
  - Interface Event_2 has a new optional parameter maintenanceType
  - Interface EventImpactedResource has a new optional parameter maintenanceEndTime
  - Interface EventImpactedResource has a new optional parameter maintenanceStartTime
  - Interface EventImpactedResource has a new optional parameter resourceGroup
  - Interface EventImpactedResource has a new optional parameter resourceName
  - Interface EventImpactedResource has a new optional parameter status
  - Added Enum KnownEventSubTypeValues
  - Class MicrosoftResourceHealth has a new signature
    
    
## 4.0.0 (2023-05-12)
    
**Features**

  - Added operation group EventOperations
  - Added operation group EventsOperations
  - Added operation group ImpactedResources
  - Added operation group Metadata
  - Added operation group SecurityAdvisoryImpactedResources
  - Added Interface AvailabilityStatusPropertiesRecentlyResolved
  - Added Interface Event_2
  - Added Interface EventFetchDetailsBySubscriptionIdAndTrackingIdOptionalParams
  - Added Interface EventFetchDetailsByTenantIdAndTrackingIdOptionalParams
  - Added Interface EventGetBySubscriptionIdAndTrackingIdOptionalParams
  - Added Interface EventGetByTenantIdAndTrackingIdOptionalParams
  - Added Interface EventImpactedResource
  - Added Interface EventImpactedResourceListResult
  - Added Interface EventPropertiesAdditionalInformation
  - Added Interface EventPropertiesArticle
  - Added Interface EventPropertiesRecommendedActions
  - Added Interface EventPropertiesRecommendedActionsItem
  - Added Interface Events
  - Added Interface EventsListBySingleResourceNextOptionalParams
  - Added Interface EventsListBySingleResourceOptionalParams
  - Added Interface EventsListBySubscriptionIdNextOptionalParams
  - Added Interface EventsListBySubscriptionIdOptionalParams
  - Added Interface EventsListByTenantIdNextOptionalParams
  - Added Interface EventsListByTenantIdOptionalParams
  - Added Interface Faq
  - Added Interface Impact
  - Added Interface ImpactedResourcesGetByTenantIdOptionalParams
  - Added Interface ImpactedResourcesGetOptionalParams
  - Added Interface ImpactedResourcesListBySubscriptionIdAndEventIdNextOptionalParams
  - Added Interface ImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams
  - Added Interface ImpactedResourcesListByTenantIdAndEventIdNextOptionalParams
  - Added Interface ImpactedResourcesListByTenantIdAndEventIdOptionalParams
  - Added Interface ImpactedResourceStatus
  - Added Interface ImpactedServiceRegion
  - Added Interface KeyValueItem
  - Added Interface Link
  - Added Interface LinkDisplayText
  - Added Interface MetadataEntity
  - Added Interface MetadataEntityListResult
  - Added Interface MetadataGetEntityOptionalParams
  - Added Interface MetadataListNextOptionalParams
  - Added Interface MetadataListOptionalParams
  - Added Interface MetadataSupportedValueDetail
  - Added Interface ProxyResource
  - Added Interface SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdNextOptionalParams
  - Added Interface SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdOptionalParams
  - Added Interface SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdNextOptionalParams
  - Added Interface SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdOptionalParams
  - Added Interface SystemData
  - Added Interface Update
  - Added Type Alias CreatedByType
  - Added Type Alias EventFetchDetailsBySubscriptionIdAndTrackingIdResponse
  - Added Type Alias EventFetchDetailsByTenantIdAndTrackingIdResponse
  - Added Type Alias EventGetBySubscriptionIdAndTrackingIdResponse
  - Added Type Alias EventGetByTenantIdAndTrackingIdResponse
  - Added Type Alias EventLevelValues
  - Added Type Alias EventsListBySingleResourceNextResponse
  - Added Type Alias EventsListBySingleResourceResponse
  - Added Type Alias EventsListBySubscriptionIdNextResponse
  - Added Type Alias EventsListBySubscriptionIdResponse
  - Added Type Alias EventsListByTenantIdNextResponse
  - Added Type Alias EventsListByTenantIdResponse
  - Added Type Alias EventSourceValues
  - Added Type Alias EventStatusValues
  - Added Type Alias EventTypeValues
  - Added Type Alias ImpactedResourcesGetByTenantIdResponse
  - Added Type Alias ImpactedResourcesGetResponse
  - Added Type Alias ImpactedResourcesListBySubscriptionIdAndEventIdNextResponse
  - Added Type Alias ImpactedResourcesListBySubscriptionIdAndEventIdResponse
  - Added Type Alias ImpactedResourcesListByTenantIdAndEventIdNextResponse
  - Added Type Alias ImpactedResourcesListByTenantIdAndEventIdResponse
  - Added Type Alias IssueNameParameter
  - Added Type Alias LevelValues
  - Added Type Alias LinkTypeValues
  - Added Type Alias MetadataGetEntityResponse
  - Added Type Alias MetadataListNextResponse
  - Added Type Alias MetadataListResponse
  - Added Type Alias ReasonTypeValues
  - Added Type Alias Scenario
  - Added Type Alias SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdNextResponse
  - Added Type Alias SecurityAdvisoryImpactedResourcesListBySubscriptionIdAndEventIdResponse
  - Added Type Alias SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdNextResponse
  - Added Type Alias SecurityAdvisoryImpactedResourcesListByTenantIdAndEventIdResponse
  - Interface AvailabilityStatusProperties has a new optional parameter articleId
  - Interface AvailabilityStatusProperties has a new optional parameter category
  - Interface AvailabilityStatusProperties has a new optional parameter context
  - Interface AvailabilityStatusProperties has a new optional parameter recentlyResolved
  - Interface AvailabilityStatusProperties has a new optional parameter title
  - Interface RecommendedAction has a new optional parameter actionUrlComment
  - Interface Resource has a new optional parameter systemData
  - Added Enum KnownAvailabilityStateValues
  - Added Enum KnownCreatedByType
  - Added Enum KnownEventLevelValues
  - Added Enum KnownEventSourceValues
  - Added Enum KnownEventStatusValues
  - Added Enum KnownEventTypeValues
  - Added Enum KnownIssueNameParameter
  - Added Enum KnownLevelValues
  - Added Enum KnownLinkTypeValues
  - Added Enum KnownReasonChronicityTypes
  - Added Enum KnownReasonTypeValues
  - Added Enum KnownScenario

**Breaking Changes**

  - Operation EmergingIssues.get has a new signature
  - Interface AvailabilityStatusProperties no longer has parameter recentlyResolvedState
    
    
## 3.2.0 (2023-02-01)
    
**Features**

  - Interface AvailabilityStatusesListByResourceGroupNextOptionalParams no longer has parameter expand
  - Interface AvailabilityStatusesListByResourceGroupNextOptionalParams no longer has parameter filter
  - Interface AvailabilityStatusesListBySubscriptionIdNextOptionalParams no longer has parameter expand
  - Interface AvailabilityStatusesListBySubscriptionIdNextOptionalParams no longer has parameter filter
  - Interface AvailabilityStatusesListNextOptionalParams no longer has parameter expand
  - Interface AvailabilityStatusesListNextOptionalParams no longer has parameter filter
  - Interface ChildAvailabilityStatusesListNextOptionalParams no longer has parameter expand
  - Interface ChildAvailabilityStatusesListNextOptionalParams no longer has parameter filter
  - Interface ChildResourcesListNextOptionalParams no longer has parameter expand
  - Interface ChildResourcesListNextOptionalParams no longer has parameter filter
    
    
## 3.1.0 (2022-07-14)
    
**Features**

  - Added Interface EmergingIssuesGetResult
    
## 3.0.1 (2022-04-29)

**Features**

  - Bug fix

## 3.0.0 (2021-12-22)

The package of @azure/arm-resourcehealth is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
