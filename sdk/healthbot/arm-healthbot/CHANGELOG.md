# Release History

## 3.0.0 (2025-08-19)

### Features Added
  - Added operation Bots.beginUpdate
  - Added operation Bots.beginUpdateAndWait
  - Added operation Bots.listSecrets
  - Added operation Bots.regenerateApiJwtSecret
  - Added Interface BotsListSecretsOptionalParams
  - Added Interface BotsRegenerateApiJwtSecretOptionalParams
  - Added Interface HealthBotKey
  - Added Interface HealthBotKeysResponse
  - Added Interface KeyVaultProperties
  - Interface BotsUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface BotsUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface HealthBotProperties has a new optional parameter accessControlMethod
  - Interface HealthBotProperties has a new optional parameter keyVaultProperties
  - Interface HealthBotUpdateParameters has a new optional parameter properties
  - Added Type Alias BotsListSecretsResponse
  - Added Type Alias BotsRegenerateApiJwtSecretResponse

### Breaking Changes
  - Removed operation Bots.update
  - Operation Bots.beginCreate has a new signature
  - Operation Bots.beginCreateAndWait has a new signature
  - Operation Bots.get has a new signature
  - Type alias "SkuName" has been changed

    
## 2.1.0 (2022-11-25)
    
### Features Added

  - Added Interface HealthBot
  - Added Interface TrackedResource
    
    
## 2.0.0 (2022-01-13)

The package of @azure/arm-healthbot is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
