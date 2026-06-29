# Release History

## 2.0.0-beta.1 (2026-06-29)
Compared with version 1.0.0

### Features Added
  - Added operation group ApiSourcesOperations
  - Added operation group DeletedServicesOperations
  - Added operation ApiDefinitionsOperations.exportSpecification
  - Added operation ApiDefinitionsOperations.importSpecification
  - Added operation ServicesOperations.exportMetadataSchema
  - Added Class ApiCenterClient
  - Added Interface ApiCenterClientOptionalParams
  - Added Interface ApiSource
  - Added Interface ApiSourceProperties
  - Added Interface ApiSourcesCreateOrUpdateOptionalParams
  - Added Interface ApiSourcesDeleteOptionalParams
  - Added Interface ApiSourcesGetOptionalParams
  - Added Interface ApiSourcesHeadOptionalParams
  - Added Interface ApiSourcesListOptionalParams
  - Added Interface AzureApiManagementSource
  - Added Interface CustomProperties
  - Added Interface DeletedService
  - Added Interface DeletedServiceProperties
  - Added Interface DeletedServicesDeleteOptionalParams
  - Added Interface DeletedServicesGetOptionalParams
  - Added Interface DeletedServicesListBySubscriptionOptionalParams
  - Added Interface DeletedServicesListOptionalParams
  - Added Interface LinkState
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface RestorePollerOptions
  - Added Interface ServiceUpdateProperties
  - Added Interface SimplePollerLike
  - Interface ServiceProperties has a new optional parameter restore
  - Interface ServiceUpdate has a new optional parameter properties
  - Added Type Alias ApiSourceLinkState
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ImportSpecificationOptions
  - Added Enum AzureClouds
  - Added Enum KnownApiSourceLinkState
  - Added Enum KnownImportSpecificationOptions
  - Enum KnownVersions has a new value V20240315Preview
  - Enum KnownVersions has a new value V20240601Preview

### Breaking Changes
  - Operation ApiDefinitions.head has a new signature
  - Operation Apis.createOrUpdate has a new signature
  - Operation Apis.get has a new signature
  - Operation Apis.head has a new signature
  - Operation ApiVersions.head has a new signature
  - Operation Deployments.createOrUpdate has a new signature
  - Operation Deployments.get has a new signature
  - Operation Deployments.head has a new signature
  - Operation Environments.createOrUpdate has a new signature
  - Operation Environments.get has a new signature
  - Operation Environments.head has a new signature
  - Operation MetadataSchemas.head has a new signature
  - Operation Workspaces.head has a new signature
  - Deleted Class AzureAPICenter
  - Removed Interface AzureAPICenterOptionalParams
  - Type of parameter customProperties of interface ApiProperties is changed from Record<string, unknown> to CustomProperties
  - Type of parameter customProperties of interface DeploymentProperties is changed from Record<string, unknown> to CustomProperties
  - Type of parameter customProperties of interface EnvironmentProperties is changed from Record<string, unknown> to CustomProperties
  - Removed Type Alias Versions

    
## 1.0.0 (2024-02-21)

The package of @azure/arm-apicenter is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
