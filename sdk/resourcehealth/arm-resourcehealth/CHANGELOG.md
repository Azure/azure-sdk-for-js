# Release History
    
## 4.0.0 (2022-04-12)
    
**Features**

  - Added Interface AvailabilityStatusPropertiesRecentlyResolved
  - Added Interface ErrorResponseError
  - Added Type Alias ImpactedResourceStatus
  - Added Type Alias ReasonTypeValues
  - Interface AvailabilityStatusProperties has a new optional parameter occurredTime
  - Interface AvailabilityStatusProperties has a new optional parameter recentlyResolved
  - Interface AvailabilityStatusProperties has a new optional parameter title
  - Interface ErrorResponse has a new optional parameter error
  - Added Enum KnownAvailabilityStateValues
  - Added Enum KnownReasonChronicityTypes
  - Added Enum KnownReasonTypeValues

**Breaking Changes**

  - Removed operation group ChildAvailabilityStatuses
  - Removed operation group ChildResources
  - Removed operation group EmergingIssues
  - Interface AvailabilityStatusProperties no longer has parameter occuredTime
  - Interface AvailabilityStatusProperties no longer has parameter recentlyResolvedState
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter details
  - Interface ErrorResponse no longer has parameter message
  - Class MicrosoftResourceHealth no longer has parameter childAvailabilityStatuses
  - Class MicrosoftResourceHealth no longer has parameter childResources
  - Class MicrosoftResourceHealth no longer has parameter emergingIssues
  - Removed Enum KnownSeverityValues
  - Removed Enum KnownStageValues
    
    
## 3.0.0 (2021-12-22)

The package of @azure/arm-resourcehealth is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
