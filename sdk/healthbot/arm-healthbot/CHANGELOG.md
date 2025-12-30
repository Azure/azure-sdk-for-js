# Release History

## 3.0.0 (2025-12-30)

### Features Added
  - Added operation BotsOperations.create
  - Added operation BotsOperations.delete
  - Added operation BotsOperations.listSecrets
  - Added operation BotsOperations.regenerateApiJwtSecret
  - Added Interface BotsListSecretsOptionalParams
  - Added Interface BotsRegenerateApiJwtSecretOptionalParams
  - Added Interface HealthBotKey
  - Added Interface HealthBotKeysResponse
  - Added Interface KeyVaultProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Interface BotsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface HealthBotProperties has a new optional parameter accessControlMethod
  - Interface HealthBotProperties has a new optional parameter keyVaultProperties
  - Interface HealthBotUpdateParameters has a new optional parameter properties
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias CreatedByType
  - Added Enum AzureClouds
  - Added Enum KnownCreatedByType
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation Bots.beginCreate
  - Removed operation Bots.beginCreateAndWait
  - Removed operation Bots.beginDelete
  - Removed operation Bots.beginDeleteAndWait
  - Operation Bots.get has a new signature
  - Operation Bots.update has a new signature
  - Removed Interface AvailableOperations
  - Removed Interface BotResponseList
  - Removed Type Alias IdentityType
  - Type alias "SkuName" has been changed
  - Removed Enum KnownIdentityType

    
## 2.1.0 (2022-11-25)
    
### Features Added

  - Added Interface HealthBot
  - Added Interface TrackedResource
    
    
## 2.0.0 (2022-01-13)

The package of @azure/arm-healthbot is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
