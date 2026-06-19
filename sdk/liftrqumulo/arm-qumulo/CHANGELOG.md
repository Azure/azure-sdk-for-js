# Release History

## 3.0.0 (2026-06-19)

### Features Added
  - Added operation FileSystemsOperations.createOrUpdate
  - Added operation FileSystemsOperations.delete
  - Added Interface FileSystemResourceProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Interface FileSystemResource has a new optional parameter properties
  - Interface FileSystemResourceUpdateProperties has a new optional parameter performanceTier
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation FileSystems.beginCreateOrUpdate
  - Removed operation FileSystems.beginCreateOrUpdateAndWait
  - Removed operation FileSystems.beginDelete
  - Removed operation FileSystems.beginDeleteAndWait
  - Class QumuloStorage no longer has parameter apiVersion
  - Class QumuloStorage no longer has parameter subscriptionId
  - Interface FileSystemResource no longer has parameter adminPassword
  - Interface FileSystemResource no longer has parameter availabilityZone
  - Interface FileSystemResource no longer has parameter clusterLoginUrl
  - Interface FileSystemResource no longer has parameter delegatedSubnetId
  - Interface FileSystemResource no longer has parameter marketplaceDetails
  - Interface FileSystemResource no longer has parameter privateIPs
  - Interface FileSystemResource no longer has parameter provisioningState
  - Interface FileSystemResource no longer has parameter storageSku
  - Interface FileSystemResource no longer has parameter userDetails

    
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
