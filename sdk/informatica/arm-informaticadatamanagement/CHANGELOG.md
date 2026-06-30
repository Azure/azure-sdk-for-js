# Release History

## 2.0.0 (2026-06-30)

### Features Added
  - Added operation OrganizationsOperations.createOrUpdate
  - Added operation OrganizationsOperations.delete
  - Added operation ServerlessRuntimesOperations.createOrUpdate
  - Added operation ServerlessRuntimesOperations.delete
  - Added Interface ManagedServiceIdentity
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface ServerlessRuntimeDataDisk
  - Added Interface SimplePollerLike
  - Added Interface UserAssignedIdentity
  - Interface InfaServerlessFetchConfigProperties has a new optional parameter serverlessRuntimeDataDisks
  - Interface InformaticaOrganizationResource has a new optional parameter identity
  - Interface InformaticaOrganizationResourceUpdate has a new optional parameter identity
  - Interface InformaticaServerlessRuntimeProperties has a new optional parameter serverlessRuntimeDataDisks
  - Interface InformaticaServerlessRuntimeResource has a new optional parameter identity
  - Interface InformaticaServerlessRuntimeResourceUpdate has a new optional parameter identity
  - Interface MarketplaceDetails has a new optional parameter marketplaceSubscriptionStatus
  - Interface MarketplaceDetailsUpdate has a new optional parameter marketplaceSubscriptionStatus
  - Interface ServerlessRuntimePropertiesCustomUpdate has a new optional parameter serverlessRuntimeDataDisks
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias MarketplaceSubscriptionStatus
  - Added Enum AzureClouds
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownMarketplaceSubscriptionStatus
  - Added Enum KnownVersions

### Breaking Changes
  - Operation Organizations.beginDeleteAndWait has a new signature
  - Operation ServerlessRuntimes.beginDeleteAndWait has a new signature
  - Class InformaticaDataManagement no longer has parameter apiVersion
  - Class InformaticaDataManagement no longer has parameter subscriptionId
  - Parameter networkInterfaceConfiguration of interface ServerlessRuntimeNetworkProfileUpdate is now required

    
## 1.0.0 (2024-07-15)

### Features Added

The package of @azure/arm-informaticadatamanagement is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
