# Release History

## 1.0.0-beta.6 (2025-07-24)
Compared with version 1.0.0-beta.5

### Features Added
  - Added operation group CheckNameAvailability
  - Added operation group DataConnectors
  - Added operation group DataManagerForAgricultureExtensions
  - Added operation group DataManagerForAgricultureResources
  - Added operation group OperationResults
  - Added operation group Solutions
  - Added operation group SolutionsDiscoverability
  - Added operation Extensions.createOrUpdate
  - Added operation Extensions.listByDataManagerForAgriculture
  - Class AgriFoodMgmtClient has a new constructor "constructor(credentials: coreAuth.TokenCredential, options?: AgriFoodMgmtClientOptionalParams);"
  - Added Interface ApiKeyAuthCredentials
  - Added Interface ApiProperties
  - Added Interface ArmAsyncOperationError
  - Added Interface AuthCredentials
  - Added Interface CheckNameAvailabilityCheckNameAvailabilityOptionalParams
  - Added Interface DataConnector
  - Added Interface DataConnectorListResponse
  - Added Interface DataConnectorProperties
  - Added Interface DataConnectorsCreateOrUpdateOptionalParams
  - Added Interface DataConnectorsDeleteOptionalParams
  - Added Interface DataConnectorsGetOptionalParams
  - Added Interface DataConnectorsListOptionalParams
  - Added Interface DataManagerForAgriculture
  - Added Interface DataManagerForAgricultureExtension
  - Added Interface DataManagerForAgricultureExtensionListResponse
  - Added Interface DataManagerForAgricultureExtensionProperties
  - Added Interface DataManagerForAgricultureExtensionsGetOptionalParams
  - Added Interface DataManagerForAgricultureExtensionsListOptionalParams
  - Added Interface DataManagerForAgricultureListResponse
  - Added Interface DataManagerForAgricultureResourcesCreateOrUpdateOptionalParams
  - Added Interface DataManagerForAgricultureResourcesDeleteOptionalParams
  - Added Interface DataManagerForAgricultureResourcesGetOptionalParams
  - Added Interface DataManagerForAgricultureResourcesListByResourceGroupOptionalParams
  - Added Interface DataManagerForAgricultureResourcesListBySubscriptionOptionalParams
  - Added Interface DataManagerForAgricultureResourcesUpdateHeaders
  - Added Interface DataManagerForAgricultureResourcesUpdateOptionalParams
  - Added Interface DataManagerForAgricultureSolution
  - Added Interface DataManagerForAgricultureSolutionListResponse
  - Added Interface DataManagerForAgricultureSolutionProperties
  - Added Interface DataManagerForAgricultureUpdateProperties
  - Added Interface DataManagerForAgricultureUpdateRequestModel
  - Added Interface ExtensionInstallationRequest
  - Added Interface ExtensionsCreateOrUpdateOptionalParams
  - Added Interface ExtensionsListByDataManagerForAgricultureOptionalParams
  - Added Interface KeyVaultProperties
  - Added Interface MarketplaceOfferDetails
  - Added Interface OAuthClientCredentials
  - Added Interface OperationResultsGetOptionalParams
  - Added Interface Solution
  - Added Interface SolutionListResponse
  - Added Interface SolutionProperties
  - Added Interface SolutionsCreateOrUpdateOptionalParams
  - Added Interface SolutionsDeleteOptionalParams
  - Added Interface SolutionsDiscoverabilityGetOptionalParams
  - Added Interface SolutionsDiscoverabilityListOptionalParams
  - Added Interface SolutionsGetOptionalParams
  - Added Interface SolutionsListOptionalParams
  - Interface ArmAsyncOperation has a new optional parameter error
  - Interface DetailedInformation has a new optional parameter apiDefaultInputParameters
  - Interface DetailedInformation has a new optional parameter apiDocsLink
  - Interface DetailedInformation has a new optional parameter apiType
  - Interface Extension has a new optional parameter additionalApiProperties
  - Interface ExtensionListResponse has a new optional parameter skipToken
  - Interface PrivateEndpointConnection has a new optional parameter groupIds
  - Added Type Alias AuthCredentialsKind
  - Added Type Alias AuthCredentialsUnion
  - Added Type Alias CheckNameAvailabilityCheckNameAvailabilityResponse
  - Added Type Alias DataConnectorsCreateOrUpdateResponse
  - Added Type Alias DataConnectorsGetResponse
  - Added Type Alias DataConnectorsListNextResponse
  - Added Type Alias DataConnectorsListResponse
  - Added Type Alias DataManagerForAgricultureExtensionsGetResponse
  - Added Type Alias DataManagerForAgricultureExtensionsListNextResponse
  - Added Type Alias DataManagerForAgricultureExtensionsListResponse
  - Added Type Alias DataManagerForAgricultureResourcesCreateOrUpdateResponse
  - Added Type Alias DataManagerForAgricultureResourcesGetResponse
  - Added Type Alias DataManagerForAgricultureResourcesListByResourceGroupNextResponse
  - Added Type Alias DataManagerForAgricultureResourcesListByResourceGroupResponse
  - Added Type Alias DataManagerForAgricultureResourcesListBySubscriptionNextResponse
  - Added Type Alias DataManagerForAgricultureResourcesListBySubscriptionResponse
  - Added Type Alias DataManagerForAgricultureResourcesUpdateResponse
  - Added Type Alias ExtensionsCreateOrUpdateResponse
  - Added Type Alias ExtensionsListByDataManagerForAgricultureNextResponse
  - Added Type Alias ExtensionsListByDataManagerForAgricultureResponse
  - Added Type Alias OperationResultsGetResponse
  - Added Type Alias SolutionsCreateOrUpdateResponse
  - Added Type Alias SolutionsDiscoverabilityGetResponse
  - Added Type Alias SolutionsDiscoverabilityListNextResponse
  - Added Type Alias SolutionsDiscoverabilityListResponse
  - Added Type Alias SolutionsGetResponse
  - Added Type Alias SolutionsListNextResponse
  - Added Type Alias SolutionsListResponse
  - Added Enum KnownAuthCredentialsKind
  - Enum KnownProvisioningState has a new value Running
  - Enum KnownPublicNetworkAccess has a new value Disabled

### Breaking Changes
  - Removed operation group FarmBeatsExtensions
  - Removed operation group FarmBeatsModels
  - Removed operation group Locations
  - Removed operation Extensions.create
  - Removed operation Extensions.listByFarmBeats
  - Removed operation Extensions.update
  - Class AgriFoodMgmtClient no longer has parameter farmBeatsExtensions
  - Class AgriFoodMgmtClient no longer has parameter farmBeatsModels
  - Class AgriFoodMgmtClient no longer has parameter locations
  - Removed Interface ExtensionsCreateOptionalParams
  - Removed Interface ExtensionsListByFarmBeatsOptionalParams
  - Removed Interface ExtensionsUpdateOptionalParams
  - Removed Interface FarmBeats
  - Removed Interface FarmBeatsExtension
  - Removed Interface FarmBeatsExtensionListResponse
  - Removed Interface FarmBeatsExtensionsGetOptionalParams
  - Removed Interface FarmBeatsExtensionsListOptionalParams
  - Removed Interface FarmBeatsListResponse
  - Removed Interface FarmBeatsModelsCreateOrUpdateOptionalParams
  - Removed Interface FarmBeatsModelsDeleteOptionalParams
  - Removed Interface FarmBeatsModelsGetOperationResultOptionalParams
  - Removed Interface FarmBeatsModelsGetOptionalParams
  - Removed Interface FarmBeatsModelsListByResourceGroupOptionalParams
  - Removed Interface FarmBeatsModelsListBySubscriptionOptionalParams
  - Removed Interface FarmBeatsModelsUpdateHeaders
  - Removed Interface FarmBeatsModelsUpdateOptionalParams
  - Removed Interface FarmBeatsUpdateProperties
  - Removed Interface FarmBeatsUpdateRequestModel
  - Removed Interface LocationsCheckNameAvailabilityOptionalParams
  - Parameter value of interface ExtensionListResponse is now required
  - Removed Type Alias ExtensionsCreateResponse
  - Removed Type Alias ExtensionsListByFarmBeatsNextResponse
  - Removed Type Alias ExtensionsListByFarmBeatsResponse
  - Removed Type Alias ExtensionsUpdateResponse
  - Removed Type Alias FarmBeatsExtensionsGetResponse
  - Removed Type Alias FarmBeatsExtensionsListNextResponse
  - Removed Type Alias FarmBeatsExtensionsListResponse
  - Removed Type Alias FarmBeatsModelsCreateOrUpdateResponse
  - Removed Type Alias FarmBeatsModelsGetOperationResultResponse
  - Removed Type Alias FarmBeatsModelsGetResponse
  - Removed Type Alias FarmBeatsModelsListByResourceGroupNextResponse
  - Removed Type Alias FarmBeatsModelsListByResourceGroupResponse
  - Removed Type Alias FarmBeatsModelsListBySubscriptionNextResponse
  - Removed Type Alias FarmBeatsModelsListBySubscriptionResponse
  - Removed Type Alias FarmBeatsModelsUpdateResponse
  - Removed Type Alias LocationsCheckNameAvailabilityResponse
  - Enum KnownPublicNetworkAccess no longer has value Hybrid

## 1.0.0-beta.5 (2024-04-08)
 
### Bugs Fixed

- Release a beta version to fix latest tag issue

## 1.0.0-beta.4 (2022-11-14)

### Features Added

- Bugs Fixed

## 1.0.0-beta.3 (2022-10-08)

### Bugs Fixed

- revert credential scopes

## 1.0.0-beta.2 (2022-09-30)

### Bugs Fixed

- fix better user experience of credential scopes in government cloud

## 1.0.0-beta.1 (2022-08-31)

The package of @azure/arm-agrifood is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
