# Release History
    
## 9.0.0 (2023-06-30)
    
**Features**

  - Added Type Alias ContainerType
  - Interface NetworkConfiguration has a new optional parameter enableAcceleratedNetworking
  - Interface VMExtension has a new optional parameter enableAutomaticUpgrade
  - Added Enum KnownContainerType
  - Interface ApplicationListNextOptionalParams no longer has parameter maxresults
  - Interface ApplicationPackageListNextOptionalParams no longer has parameter maxresults
  - Interface CertificateListByBatchAccountNextOptionalParams no longer has parameter filter
  - Interface CertificateListByBatchAccountNextOptionalParams no longer has parameter maxresults
  - Interface CertificateListByBatchAccountNextOptionalParams no longer has parameter select
  - Interface LocationListSupportedCloudServiceSkusNextOptionalParams no longer has parameter filter
  - Interface LocationListSupportedCloudServiceSkusNextOptionalParams no longer has parameter maxresults
  - Interface LocationListSupportedVirtualMachineSkusNextOptionalParams no longer has parameter filter
  - Interface LocationListSupportedVirtualMachineSkusNextOptionalParams no longer has parameter maxresults
  - Interface PoolListByBatchAccountNextOptionalParams no longer has parameter filter
  - Interface PoolListByBatchAccountNextOptionalParams no longer has parameter maxresults
  - Interface PoolListByBatchAccountNextOptionalParams no longer has parameter select
  - Interface PrivateEndpointConnectionListByBatchAccountNextOptionalParams no longer has parameter maxresults
  - Interface PrivateLinkResourceListByBatchAccountNextOptionalParams no longer has parameter maxresults

**Breaking Changes**

  - Type of parameter type of interface ContainerConfiguration is changed from "DockerCompatible" to ContainerType

   
## 8.0.0 (2022-11-10)
    
**Features**

  - Added Type Alias NodeCommunicationMode
  - Interface NetworkConfiguration has a new optional parameter dynamicVnetAssignmentScope
  - Interface Pool has a new optional parameter currentNodeCommunicationMode
  - Interface Pool has a new optional parameter targetNodeCommunicationMode
  - Interface PrivateLinkServiceConnectionState has a new optional parameter actionsRequired

**Breaking Changes**

  - Interface CifsMountConfiguration no longer has parameter username
  - Interface NetworkConfiguration no longer has parameter dynamicVNetAssignmentScope
  - Interface PrivateLinkServiceConnectionState no longer has parameter actionRequired
  - Interface CifsMountConfiguration has a new required parameter userName
    
    
## 7.2.0 (2022-07-19)
    
**Features**

  - Added operation PrivateEndpointConnectionOperations.beginDelete
  - Added operation PrivateEndpointConnectionOperations.beginDeleteAndWait
  - Added Interface Application
  - Added Interface ApplicationPackage
  - Added Interface AutoStorageProperties
  - Added Interface BatchAccount
  - Added Interface Certificate
  - Added Interface CertificateCreateOrUpdateParameters
  - Added Interface CertificateCreateOrUpdateProperties
  - Added Interface CertificateProperties
  - Added Interface DetectorResponse
  - Added Interface EndpointAccessProfile
  - Added Interface IPRule
  - Added Interface NetworkProfile
  - Added Interface Pool
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateEndpointConnectionDeleteHeaders
  - Added Interface PrivateEndpointConnectionDeleteOptionalParams
  - Added Interface PrivateLinkResource
  - Added Type Alias EndpointAccessDefaultAction
  - Added Type Alias PrivateEndpointConnectionDeleteResponse
  - Interface BatchAccountCreateParameters has a new optional parameter networkProfile
  - Interface BatchAccountUpdateParameters has a new optional parameter networkProfile
  - Interface BatchAccountUpdateParameters has a new optional parameter publicNetworkAccess
    
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
