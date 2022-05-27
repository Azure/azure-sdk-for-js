# Release History
    
## 7.2.0 (2022-05-27)
    
**Features**

  - Added operation PrivateEndpointConnectionOperations.beginDelete
  - Added operation PrivateEndpointConnectionOperations.beginDeleteAndWait
  - Added Interface EndpointAccessProfile
  - Added Interface IPRule
  - Added Interface NetworkProfile
  - Added Interface PrivateEndpointConnectionDeleteHeaders
  - Added Interface PrivateEndpointConnectionDeleteOptionalParams
  - Added Type Alias EndpointAccessDefaultAction
  - Added Type Alias PrivateEndpointConnectionDeleteResponse
  - Interface BatchAccountCreateParameters has a new optional parameter networkProfile
  - Interface BatchAccountUpdateParameters has a new optional parameter networkProfile
  - Interface BatchAccountUpdateParameters has a new optional parameter publicNetworkAccess
  - Type Alias BatchAccount has a new parameter nodeManagementEndpoint
  - Type Alias BatchAccount has a new parameter networkProfile
  - Type Alias PrivateEndpointConnection has a new parameter groupIds
    
## 7.1.1 (2022-04-11)

**features**

  - Bug fix
    
## 7.1.0 (2022-03-02)
    
**Features**

  - Added operation BatchAccountOperations.getDetector
  - Added operation BatchAccountOperations.listDetectors
  - Added Interface BatchAccountGetDetectorOptionalParams
  - Added Interface BatchAccountListDetectorsNextOptionalParams
  - Added Interface BatchAccountListDetectorsOptionalParams
  - Added Interface DetectorListResult
  - Added Type Alias BatchAccountGetDetectorResponse
  - Added Type Alias BatchAccountListDetectorsNextResponse
  - Added Type Alias BatchAccountListDetectorsResponse
  - Added Type Alias DetectorResponse
  - Added Type Alias DynamicVNetAssignmentScope
  - Interface NetworkConfiguration has a new optional parameter dynamicVNetAssignmentScope
    
    
## 7.0.0 (2021-12-24)

The package of @azure/arm-batch is using our next generation design principles since version 7.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
