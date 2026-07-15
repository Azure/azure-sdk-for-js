# Release History

## 5.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 5.0.0-beta.1 (2026-05-29)
Compared with version 4.0.1

### Features Added
  - Added operation CapacitiesOperations.create
  - Added operation CapacitiesOperations.delete
  - Added operation CapacitiesOperations.resume
  - Added operation CapacitiesOperations.suspend
  - Added operation CapacitiesOperations.update
  - Added Interface LogSpecification
  - Added Interface MetricSpecification
  - Added Interface MetricSpecificationDimensionsItem
  - Added Interface OperationProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface ServiceSpecification
  - Added Interface SimplePollerLike
  - Added Interface TrackedResource
  - Interface CapacitySku has a new optional parameter capacity
  - Interface DedicatedCapacity has a new optional parameter friendlyName
  - Interface DedicatedCapacity has a new optional parameter tenantId
  - Interface DedicatedCapacityMutableProperties has a new optional parameter friendlyName
  - Interface DedicatedCapacityMutableProperties has a new optional parameter tenantId
  - Interface DedicatedCapacityProperties has a new optional parameter friendlyName
  - Interface DedicatedCapacityProperties has a new optional parameter tenantId
  - Interface DedicatedCapacityUpdateParameters has a new optional parameter friendlyName
  - Interface DedicatedCapacityUpdateParameters has a new optional parameter tenantId
  - Interface Operation has a new optional parameter origin
  - Interface Operation has a new optional parameter properties
  - Interface SkuDetailsForExistingResource has a new optional parameter resourceType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed Interface DedicatedCapacities
  - Removed Interface ErrorResponseError
  - Removed Interface OperationDisplay
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Removed Type Alias IdentityType
  - Removed Enum KnownIdentityType

## 4.0.1 (2023-01-31)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 4.0.0 (2022-07-07)
    
### Features Added

  - Added Interface AutoScaleVCore
  - Added Interface AutoScaleVCoreProperties
  - Added Interface DedicatedCapacity
  - Added Interface DedicatedCapacityProperties

### Breaking Changes

  - Interface CapacitySku no longer has parameter capacity
  - Interface DedicatedCapacityMutableProperties no longer has parameter friendlyName
  - Interface DedicatedCapacityMutableProperties no longer has parameter tenantId
  - Interface DedicatedCapacityUpdateParameters no longer has parameter friendlyName
  - Interface DedicatedCapacityUpdateParameters no longer has parameter tenantId
  - Interface Operation no longer has parameter origin
  - Interface Operation no longer has parameter properties
  - Interface OperationDisplay no longer has parameter description
  - Interface SkuDetailsForExistingResource no longer has parameter resourceType
    
## 3.0.1 (2022-04-28)

### Features Added

  - Bug fix
    
## 3.0.0 (2022-01-20)

The package of @azure/arm-powerbidedicated is using our next generation design principles since version 3.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
