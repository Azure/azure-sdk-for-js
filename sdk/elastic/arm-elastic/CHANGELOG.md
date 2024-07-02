# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2023-05-15)
    
### Features Added

  - Added operation group ElasticVersions
  - Added Interface ElasticVersionListFormat
  - Added Interface ElasticVersionListProperties
  - Added Interface ElasticVersionsListNextOptionalParams
  - Added Interface ElasticVersionsListOptionalParams
  - Added Interface ElasticVersionsListResponse
  - Added Interface UserApiKeyResponseProperties
  - Added Type Alias ElasticVersionsListNextResponse
  - Added Type Alias ElasticVersionsListOperationResponse
  - Interface MonitorProperties has a new optional parameter generateApiKey
  - Interface UserApiKeyResponse has a new optional parameter properties

### Breaking Changes

  - Operation Organizations.getApiKey has a new signature
  - Interface ElasticMonitorResource no longer has parameter generateApiKey
  - Interface UserApiKeyResponse no longer has parameter apiKey
    
    
## 1.0.0-beta.2 (2023-04-03)
    
### Features Added

  - Added operation group Organizations
  - Added Interface MarketplaceSaaSInfo
  - Added Interface MarketplaceSaaSInfoMarketplaceSubscription
  - Added Interface OrganizationsGetApiKeyOptionalParams
  - Added Interface UserApiKeyResponse
  - Added Interface UserEmailId
  - Added Type Alias OrganizationsGetApiKeyResponse
  - Interface DeploymentInfoResponse has a new optional parameter deploymentUrl
  - Interface DeploymentInfoResponse has a new optional parameter marketplaceSaasInfo
  - Interface ElasticMonitorResource has a new optional parameter generateApiKey

### Breaking Changes

  - Removed Enum KnownApiVersionParameter
    
    
## 1.0.0-beta.1 (2022-11-08)

The package of @azure/arm-elastic is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
