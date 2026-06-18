# Release History

## 4.0.0-beta.3 (2026-06-18)
Compared with version 3.3.0

### Features Added
  - Added operation group OfferingsOperations
  - Added operation NetworkSecurityPerimeterConfigurationsOperations.reconcile
  - Added operation ServicesOperations.createOrUpdate
  - Added operation ServicesOperations.upgrade
  - Added operation SharedPrivateLinkResourcesOperations.createOrUpdate
  - Added operation SharedPrivateLinkResourcesOperations.delete
  - Added Interface AzureActiveDirectoryApplicationCredentials
  - Added Interface DataIdentity
  - Added Interface DataNoneIdentity
  - Added Interface DataUserAssignedIdentity
  - Added Interface FeatureOffering
  - Added Interface OfferingsByRegion
  - Added Interface OfferingsListOptionalParams
  - Added Interface OfferingsListResult
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface SearchResourceEncryptionKey
  - Added Interface SearchServiceProperties
  - Added Interface SimplePollerLike
  - Added Interface SkuLimits
  - Added Interface SkuOffering
  - Interface EncryptionWithCmk has a new optional parameter serviceLevelEncryptionKey
  - Interface SearchService has a new optional parameter knowledgeRetrieval
  - Interface SearchServiceUpdate has a new optional parameter knowledgeRetrieval
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias DataIdentityUnion
  - Added Type Alias KnowledgeRetrieval
  - Added Enum AzureClouds
  - Added Enum KnownKnowledgeRetrieval
  - Added Enum KnownVersions
  - Enum KnownSearchBypass has a new value AzurePortal
  - Enum KnownSkuName has a new value Serverless

### Breaking Changes
  - Operation NetworkSecurityPerimeterConfigurations.beginReconcileAndWait has a new signature
  - Operation Services.beginCreateOrUpdate has a new signature
  - Operation Services.beginCreateOrUpdateAndWait has a new signature
  - Operation Services.beginUpgradeAndWait has a new signature
  - Operation Services.get has a new signature
  - Operation Services.update has a new signature
  - Removed Type Alias SharedPrivateLinkResourceAsyncOperationResult
  - Type alias "HostingMode" has been changed
  - Removed Enum KnownSharedPrivateLinkResourceAsyncOperationResult

