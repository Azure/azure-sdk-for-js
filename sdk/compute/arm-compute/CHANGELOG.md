## 17.0.0-beta.3 (2021-11-25)
    
**Features**

  - Added Type Alias Image_2
  - Class ComputeManagementClient has a new parameter $host
  - Class ComputeManagementClient has a new parameter subscriptionId
  - Type Alias RestorePoint has a new parameter timeCreated

**Breaking Changes**

  - Operation Images.beginCreateOrUpdate has a new signature
  - Operation Images.beginCreateOrUpdateAndWait has a new signature
  - Type Alias RestorePoint no longer has parameter provisioningDetails
    
## 17.0.0-beta.2 (2021-10-18)
    
**Features**

  - Added operation group CommunityGalleries
  - Added operation group CommunityGalleryImages
  - Added operation group CommunityGalleryImageVersions
  - Added Interface CommunityGalleriesGetOptionalParams
  - Added Interface CommunityGalleryImagesGetOptionalParams
  - Added Interface CommunityGalleryImageVersionsGetOptionalParams
  - Added Interface DiskRestorePointGetOptionalParams
  - Added Interface DiskRestorePointGrantAccessOptionalParams
  - Added Interface DiskRestorePointListByRestorePointNextOptionalParams
  - Added Interface DiskRestorePointListByRestorePointOptionalParams
  - Added Interface DiskRestorePointRevokeAccessOptionalParams
  - Added Interface PirCommunityGalleryResource
  - Added Interface SupportedCapabilities
  - Added Interface UsageListNextOptionalParams
  - Added Interface UsageListOptionalParams
  - Added Type Alias CommunityGalleriesGetResponse
  - Added Type Alias CommunityGallery
  - Added Type Alias CommunityGalleryImage
  - Added Type Alias CommunityGalleryImagesGetResponse
  - Added Type Alias CommunityGalleryImageVersion
  - Added Type Alias CommunityGalleryImageVersionsGetResponse
  - Added Type Alias DiskRestorePointGetResponse
  - Added Type Alias DiskRestorePointGrantAccessResponse
  - Added Type Alias DiskRestorePointListByRestorePointNextResponse
  - Added Type Alias DiskRestorePointListByRestorePointResponse
  - Added Type Alias Image
  - Added Type Alias PublicNetworkAccess
  - Added Type Alias UsageListNextResponse
  - Added Type Alias UsageListResponse
  - Interface DiskUpdate has a new optional parameter publicNetworkAccess
  - Interface DiskUpdate has a new optional parameter supportedCapabilities
  - Interface SnapshotUpdate has a new optional parameter publicNetworkAccess
  - Class ComputeManagementClient has a new parameter communityGalleries
  - Class ComputeManagementClient has a new parameter communityGalleryImages
  - Class ComputeManagementClient has a new parameter communityGalleryImageVersions
  - Type Alias Disk has a new parameter supportedCapabilities
  - Type Alias Disk has a new parameter completionPercent
  - Type Alias Disk has a new parameter publicNetworkAccess
  - Type Alias DiskAccess has a new parameter extendedLocation
  - Type Alias DiskEncryptionSet has a new parameter autoKeyRotationError
  - Type Alias DiskRestorePoint has a new parameter supportedCapabilities
  - Type Alias DiskRestorePoint has a new parameter networkAccessPolicy
  - Type Alias DiskRestorePoint has a new parameter publicNetworkAccess
  - Type Alias DiskRestorePoint has a new parameter diskAccessId
  - Type Alias DiskRestorePoint has a new parameter completionPercent
  - Type Alias Snapshot has a new parameter supportedCapabilities
  - Type Alias Snapshot has a new parameter publicNetworkAccess
  - Type Alias Snapshot has a new parameter completionPercent
  - Added Enum KnownPublicNetworkAccess
  - Enum KnownDiskCreateOption has a new value CopyStart
  - Enum KnownDiskState has a new value ActiveSASFrozen
  - Enum KnownDiskState has a new value Frozen

**Breaking Changes**

  - Operation DiskRestorePointOperations.beginGrantAccess has a new signature
  - Operation DiskRestorePointOperations.beginGrantAccessAndWait has a new signature
  - Operation DiskRestorePointOperations.beginRevokeAccess has a new signature
  - Operation DiskRestorePointOperations.beginRevokeAccessAndWait has a new signature
  - Operation DiskRestorePointOperations.get has a new signature
  - Operation DiskRestorePointOperations.listByRestorePoint has a new signature
  - Operation Images.beginCreateOrUpdate has a new signature
  - Operation Images.beginCreateOrUpdateAndWait has a new signature
  - Operation UsageOperations.list has a new signature
    
# Release History

## 17.0.0-beta.1 (2021-10-09)

This is the first preview for the new version of the `@azure/arm-compute` package that follows the new [guidelines for TypeScript SDKs](https://azure.github.io/azure-sdk/typescript_introduction.html) for Azure services.

While this package remains auto generated, the SDK generator itself has undergone changes to comply with the above guidelines in order to generate packages that are idiomatic to the JavaScript/TypeScript ecosystem and consistent with other packages for Azure services. For more on this, please see [State of the Azure SDK 2021](https://devblogs.microsoft.com/azure-sdk/state-of-the-azure-sdk-2021/).

Please note that this version has breaking changes, all of which were made after careful consideration during the authoring of the guidelines and user studies.

**Noteworthy changes and features**
- Authentication: The packages `@azure/ms-rest-nodeauth` or `@azure/ms-rest-browserauth` are no longer supported. Use package [@azure/identity](https://www.npmjs.com/package/@azure/identity) instead. Select a credential from Azure Identity examples based on the authentication method of your choice.
- Callbacks: Method overloads that used callbacks have been removed and the use of promises is encouraged instead.
- List operations now return an iterable result that follows the `PagedAsyncIterableIterator` interface as opposed to the previous model where you had to make a new request using the link to the next page.
- Long running operations i.e. the methods whose names started with `begin` now return a poller object that gives you a better control over the operation. To get the final result like before use the corresponding method that will have the suffix `AndWait`.
- The SDK only supports ECMAScript 2015 (ES6) and beyond, all projects that referenced this SDK should be upgraded to use ES6.
