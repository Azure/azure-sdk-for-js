# Release History

## 2.0.0 (2026-11-05)

### Features Added
  - Added Interface CloudAccountIdentityUpdate
  - Added Interface CloudAccountIdentityUpdateUpdate
  - Added Interface CloudAccountMarketplaceUpdate
  - Added Interface CloudAccountOfferDetailsUpdate
  - Added Interface CloudAccountUpdateProperties
  - Added Interface CloudAccountUpdateUpdate
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
  - Type of parameter identity of interface CloudAccountUpdate is changed from ManagedServiceIdentityUpdate to CloudAccountIdentityUpdate
  - Type of parameter properties of interface CloudAccountUpdate is changed from CloudAccountPropertiesUpdate to CloudAccountUpdateProperties
  - Enum KnownStorageClassType member Cool now has the value "COOL" (previously "COLD"); the new member Cold carries "COLD". Callers that relied on Cool sending "COLD" must use Cold

    
## 1.0.0 (2026-10-09)

### Features Added

This is the first stable release of the @azure/arm-commvaultcontentstore package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.
