# Release History

## 1.0.0-beta.2 (2026-09-16)
Compared with version 1.0.0-beta.1

### Features Added
  - Added operation group CustomAIModelsOperations
  - Added Interface BaseModelReference
  - Added Interface CustomAIModel
  - Added Interface CustomAIModelProperties
  - Added Interface CustomAIModelsCalculateCostOptionalParams
  - Added Interface CustomAIModelsCreateOrUpdateOptionalParams
  - Added Interface CustomAIModelsDeleteOptionalParams
  - Added Interface CustomAIModelsGetOptionalParams
  - Added Interface CustomAIModelsListOptionalParams
  - Added Interface CustomAIModelSpec
  - Added Interface ManagedIdentityCredential
  - Added Interface MicrosoftFoundrySource
  - Interface AIManagerProperties has a new optional parameter clusterResourceId
  - Interface CredentialValue has a new optional parameter managedIdentity
  - Interface ModelSourceProperties has a new optional parameter microsoftFoundry
  - Added Type Alias CustomAIModelProvisioningState
  - Added Enum KnownCustomAIModelProvisioningState
  - Enum KnownModelSourceType has a new value MicrosoftFoundry
  - Enum KnownVersions has a new value V20260902Preview

### Breaking Changes
  - Operation AIModelsOperations.calculateCost has a new signature
  - Removed Interface CalculateCostRequest
  - Enum KnownVersions no longer has value V20260402Preview
  - Enum KnownVersions no longer has value V20260502Preview

    
## 1.0.0-beta.1 (2026-08-05)

### Features Added

This is the first preview release of the @azure/arm-containerserviceaimanager package. It introduces a new SDK generation with layered APIs, smaller bundles, and improved ergonomics. For more details, see the https://aka.ms/azsdk/js/sdk/quickstart.
