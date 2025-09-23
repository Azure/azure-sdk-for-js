# Release History

## 1.3.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.3.0-beta.3 (2025-08-22)

### Other Changes

  - Other fixes

## 1.3.0-beta.2 (2024-08-13)
Compared with version 1.2.1
    
### Features Added

  - Added operation Extensions.beginDisableAzureMonitorAgent
  - Added operation Extensions.beginDisableAzureMonitorAgentAndWait
  - Added operation Extensions.beginEnableAzureMonitorAgent
  - Added operation Extensions.beginEnableAzureMonitorAgentAndWait
  - Added operation Extensions.getAzureMonitorAgentStatus
  - Added Interface ExtensionsDisableAzureMonitorAgentOptionalParams
  - Added Interface ExtensionsEnableAzureMonitorAgentOptionalParams
  - Added Interface ExtensionsGetAzureMonitorAgentStatusOptionalParams
  - Added Interface IpTag
  - Added Type Alias ExtensionsGetAzureMonitorAgentStatusResponse
  - Added Type Alias OutboundDependenciesManagedType
  - Interface ClusterPatchParameters has a new optional parameter identity
  - Interface NetworkProperties has a new optional parameter outboundDependenciesManagedType
  - Interface NetworkProperties has a new optional parameter publicIpTag
  - Interface StorageAccount has a new optional parameter enableSecureChannel
  - Added Enum KnownOutboundDependenciesManagedType
    
    
## 1.3.0-beta.1 (2023-07-06)
    
### Features Added

  - Interface StorageAccount has a new optional parameter enableSecureChannel
    
## 1.2.1 (2023-01-10)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 1.2.0 (2022-08-01)

### Features Added

  - Added Interface Application
  - Added Interface Cluster
  - Added Interface ClusterCreateRequestValidationParameters
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkResource
  - Added Interface ProxyResource
  - Added Interface RuntimeScriptActionDetail
  - Added Interface TrackedResource
    
## 1.1.1 (2022-04-26)

### Features Added

  - Bug fix

## 1.1.0 (2021-12-29)

The package of @azure/arm-hdinsight is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
