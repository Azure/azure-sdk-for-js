# Release History

## 5.0.0 (2026-06-25)

### Features Added
  - Added operation CapacitiesOperations.create
  - Added operation CapacitiesOperations.delete
  - Added operation CapacitiesOperations.resume
  - Added operation CapacitiesOperations.suspend
  - Added operation CapacitiesOperations.update
  - Class PowerBIDedicated has a new constructor "constructor(credential: TokenCredential, options?: PowerBIDedicatedOptionalParams);"
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
  - Class PowerBIDedicated no longer has parameter apiVersion
  - Class PowerBIDedicated no longer has parameter subscriptionId
  - Removed Interface DedicatedCapacities
  - Removed Interface ErrorResponseError
  - Removed Interface OperationDisplay
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Removed Type Alias IdentityType
  - Removed Enum KnownIdentityType

