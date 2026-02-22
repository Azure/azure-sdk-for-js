# Release History

## 3.0.0 (2026-01-22)

### Features Added
  - Added operation BotsOperations.beginUpdate
  - Added operation BotsOperations.beginUpdateAndWait
  - Added operation BotsOperations.create
  - Added operation BotsOperations.delete
  - Added operation BotsOperations.listSecrets
  - Added operation BotsOperations.regenerateApiJwtSecret
  - Added interface HealthBotKey
  - Added interface HealthBotKeysResponse
  - Added interface KeyVaultProperties
  - Interface HealthBotProperties has a new optional parameter accessControlMethod
  - Interface HealthBotProperties has a new optional parameter keyVaultProperties
  - Interface HealthBotUpdateParameters has a new optional parameter properties
  - Added support for Azure cloud environment selection
  - Added type CreatedByType

### Breaking Changes
  - Operation Bots.beginCreate has a new signature
  - Operation Bots.beginCreateAndWait has a new signature
  - Operation Bots.get has a new signature
  - Operation Bots.update has a new signature
  - Removed interface AvailableOperations
  - Removed interface BotResponseList
  - Removed type alias IdentityType
  - Type alias SkuName has been changed
  - Removed enum KnownIdentityType
  - Long-running operations now return PollerLike instead of SimplePollerLike
  - Rehydration moved from an operation option (resumeFrom) to a client-level helper restorePoller function
  - Replaced getContinuationToken helper with direct continuationToken property

**Note:** This release includes migration-related changes. See the [migration guide](https://github.com/Azure/azure-sdk-for-js/blob/main/documentation/migration-guide-for-libraries-generated-from-TypeSpec.md) for details on migrating from previous versions.

    
## 2.1.0 (2022-11-25)
    
### Features Added

  - Added Interface HealthBot
  - Added Interface TrackedResource
    
    
## 2.0.0 (2022-01-13)

The package of @azure/arm-healthbot is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
