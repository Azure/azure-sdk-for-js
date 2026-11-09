# Release History

## 2.0.0 (2026-11-09)

### Features Added
  - Added Interface CloudAccountIdentityUpdate
  - Added Interface CloudAccountMarketplaceUpdate
  - Added Interface CloudAccountOfferDetailsUpdate
  - Added Interface CloudAccountUpdateProperties
  - Added Interface CloudAccountUserAssignedIdentity
  - Added Interface CloudAccountUserUpdate
  - Enum KnownStorageClassType has a new value Cold
  - Enum KnownVersions has a new value V20261103

### Breaking Changes
  - Operation CloudAccountsOperations.update has a new signature
  - Removed Interface CloudAccountPropertiesUpdate
  - Removed Interface ManagedServiceIdentityUpdate
  - Removed Interface MarketplaceDetailsUpdate
  - Removed Interface ResourceUpdate
  - Removed Interface TrackedResourceUpdate
  - Removed Interface UserAssignedIdentityUpdate
  - Type of parameter identity of interface CloudAccountUpdate is changed from ManagedServiceIdentityUpdate to CloudAccountIdentityUpdate
  - Type of parameter properties of interface CloudAccountUpdate is changed from CloudAccountPropertiesUpdate to CloudAccountUpdateProperties

    
## 1.0.0 (2026-10-09)

### Features Added

This is the first stable release of the @azure/arm-commvaultcontentstore package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.
