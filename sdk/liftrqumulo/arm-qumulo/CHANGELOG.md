# Release History

## 3.0.0 (2026-06-24)

### Features Added
  - Added operation FileSystemsOperations.createOrUpdate
  - Added operation FileSystemsOperations.delete
  - Added Interface FileSystemResourceProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SimplePollerLike
  - Interface FileSystemResource has a new optional parameter performanceTier
  - Interface FileSystemResourceUpdateProperties has a new optional parameter performanceTier
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Operation FileSystems.beginDeleteAndWait has a new signature
  - Class QumuloStorage no longer has parameter apiVersion
  - Class QumuloStorage no longer has parameter subscriptionId

    
## 2.0.0 (2024-07-17)
    
### Features Added

  - Added Interface FileSystemsCreateOrUpdateHeaders
  - Added Interface FileSystemsDeleteHeaders
  - Added Type Alias FileSystemsDeleteResponse
  - Interface MarketplaceDetails has a new optional parameter termUnit
  - Added Enum KnownMarketplaceSubscriptionStatus
  - Added Enum KnownProvisioningState

### Breaking Changes

  - Interface FileSystemResource no longer has parameter initialCapacity
  - Interface FileSystemResourceUpdateProperties no longer has parameter clusterLoginUrl
  - Interface FileSystemResourceUpdateProperties no longer has parameter privateIPs
  - Type of parameter storageSku of interface FileSystemResource is changed from StorageSku to string
    
    
## 1.0.0 (2023-05-29)

The package of @azure/arm-qumulo is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
