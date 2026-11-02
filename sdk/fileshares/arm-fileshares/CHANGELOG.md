# Release History

## 1.0.0-beta.2 (Unreleased)

### Features Added

- Updated to API version `2026-09-01`.
- Added operations `FileSharesOperations.startRedundancyConversion` and `FileSharesOperations.getRedundancyConversionStatus`.
- Added managed identity support: `FileShare.identity` and `FileShareUpdate.identity`.
- Added encryption settings: `FileShareProperties.encryption` and `FileShareUpdateProperties.encryption`, covering customer-managed keys and infrastructure encryption.
- Added offer options: `InformationalOperationsGetLimitsOptionalParams.body`, and `mediaTier`, `protocol` and `scaleMode` on `FileShareProvisioningRecommendationInput`.
- Added `FileShareProperties.scaleMode`, `FileShareProperties.migrationState` and `KnownMediaTier.HDD`.
- Added interfaces `CustomerManagedKeyEncryption`, `FileShareEncryption`, `FileShareLimitsRequest`, `FileShareOfferInput`, `KeyEncryptionKeyIdentity`, `ManagedServiceIdentity`, `MigrationState`, `RedundancyConversionStatusOutput`, `RedundancyConversionStatusResponse`, `StartRedundancyConversionInput`, `StartRedundancyConversionRequest` and `UserAssignedIdentity`.
- Added enums `KnownInfrastructureEncryption`, `KnownKeyEncryptionKeyIdentityType`, `KnownManagedServiceIdentityType`, `KnownRedundancyConversionStatus` and `KnownScaleMode`.

## 1.0.0-beta.1 (2026-05-07)

### Features Added

- Initial release of the Azure FileShares management SDK for JavaScript/TypeScript.
- Support for managing File Share resources, snapshots, and operations.
- Support for Private Endpoint Connections and Private Link Resources.