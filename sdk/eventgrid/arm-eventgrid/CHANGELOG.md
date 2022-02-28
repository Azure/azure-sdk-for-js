# Release History
    
## 14.0.0 (2022-02-28)
    
**Features**

  - Added Type Alias IsNotNullAdvancedFilter
  - Added Type Alias IsNullOrUndefinedAdvancedFilter
  - Added Type Alias NumberInRangeAdvancedFilter
  - Added Type Alias NumberNotInRangeAdvancedFilter
  - Added Type Alias PrivateEndpointConnectionsParentType
  - Added Type Alias StringNotBeginsWithAdvancedFilter
  - Added Type Alias StringNotContainsAdvancedFilter
  - Added Type Alias StringNotEndsWithAdvancedFilter
  - Added Enum KnownPrivateEndpointConnectionsParentType
  - Enum KnownAdvancedFilterOperatorType has a new value IsNotNull
  - Enum KnownAdvancedFilterOperatorType has a new value IsNullOrUndefined
  - Enum KnownAdvancedFilterOperatorType has a new value NumberInRange
  - Enum KnownAdvancedFilterOperatorType has a new value NumberNotInRange
  - Enum KnownAdvancedFilterOperatorType has a new value StringNotBeginsWith
  - Enum KnownAdvancedFilterOperatorType has a new value StringNotContains
  - Enum KnownAdvancedFilterOperatorType has a new value StringNotEndsWith

**Breaking Changes**

  - Operation PrivateEndpointConnections.beginDelete has a new signature
  - Operation PrivateEndpointConnections.beginDeleteAndWait has a new signature
  - Operation PrivateEndpointConnections.beginUpdate has a new signature
  - Operation PrivateEndpointConnections.beginUpdateAndWait has a new signature
  - Operation PrivateEndpointConnections.get has a new signature
  - Operation PrivateEndpointConnections.listByResource has a new signature
  - Removed Enum KnownEnum18
  - Removed Enum KnownEnum19
  - Removed Enum KnownEnum20
  - Removed Enum KnownEnum21
    
    
## 13.0.0 (2021-12-09)

The package of @azure/arm-eventgrid is using our next generation design principles since version 13.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
