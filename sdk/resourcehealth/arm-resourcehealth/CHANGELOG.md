# Release History

## 5.0.0 (2026-06-24)

### Features Added
  - Added operation EventOperations.fetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingId
  - Class MicrosoftResourceHealth has a new constructor "constructor(credential: TokenCredential, options?: MicrosoftResourceHealthOptionalParams);"
  - Added Interface CustomizedProxyResource
  - Added Interface EmergingIssue
  - Added Interface EventFetchBilllingCommunicationDetailsBySubscriptionIdAndTrackingIdOptionalParams
  - Added Interface EventImpactedResourceProperties
  - Added Interface EventProperties
  - Added Interface MetadataEntityProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Interface Event_2 has a new optional parameter billingId
  - Interface Event_2 has a new optional parameter currencyType
  - Interface Event_2 has a new optional parameter eventSubType
  - Interface Event_2 has a new optional parameter eventTags
  - Interface Event_2 has a new optional parameter isEventSensitive
  - Interface Event_2 has a new optional parameter newRate
  - Interface Event_2 has a new optional parameter oldRate
  - Interface Impact has a new optional parameter impactedServiceGuid
  - Interface MetadataSupportedValueDetail has a new optional parameter previousId
  - Interface MetadataSupportedValueDetail has a new optional parameter priority
  - Interface MetadataSupportedValueDetail has a new optional parameter serviceGuid
  - Interface Update has a new optional parameter eventTags
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias EventSubTypeValues
  - Added Enum AzureClouds
  - Added Enum KnownEventSubTypeValues
  - Added Enum KnownVersions
  - Enum KnownEventTypeValues has a new value Billing

### Breaking Changes
  - Class MicrosoftResourceHealth no longer has parameter apiVersion
  - Class MicrosoftResourceHealth no longer has parameter eventOperations
  - Class MicrosoftResourceHealth no longer has parameter eventsOperations
  - Class MicrosoftResourceHealth no longer has parameter subscriptionId
  - Removed Interface Events
  - Removed Interface ImpactedResourceStatus
  - Removed Type Alias ReasonTypeValues
  - Removed Enum KnownReasonTypeValues

