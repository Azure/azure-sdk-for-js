# Release History

## 10.0.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 10.0.1 (2025-08-22)

### Other Changes

  - Other fixes

## 10.0.0 (2024-09-11)
    
### Features Added

  - Added operation group NetworkSecurityPerimeterOperations
  - Added Interface AccessRule
  - Added Interface AccessRuleProperties
  - Added Interface AccessRulePropertiesSubscriptionsItem
  - Added Interface AzureProxyResource
  - Added Interface AzureResource
  - Added Interface ContainerHostBatchBindMountEntry
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface NetworkSecurityPerimeter
  - Added Interface NetworkSecurityPerimeterConfiguration
  - Added Interface NetworkSecurityPerimeterConfigurationListResult
  - Added Interface NetworkSecurityPerimeterConfigurationProperties
  - Added Interface NetworkSecurityPerimeterGetConfigurationOptionalParams
  - Added Interface NetworkSecurityPerimeterListConfigurationsNextOptionalParams
  - Added Interface NetworkSecurityPerimeterListConfigurationsOptionalParams
  - Added Interface NetworkSecurityPerimeterReconcileConfigurationHeaders
  - Added Interface NetworkSecurityPerimeterReconcileConfigurationOptionalParams
  - Added Interface NetworkSecurityProfile
  - Added Interface ProvisioningIssue
  - Added Interface ProvisioningIssueProperties
  - Added Interface ResourceAssociation
  - Added Interface SystemData
  - Added Interface VMDiskSecurityProfile
  - Added Type Alias AccessRuleDirection
  - Added Type Alias ContainerHostDataPath
  - Added Type Alias CreatedByType
  - Added Type Alias IssueType
  - Added Type Alias NetworkSecurityPerimeterConfigurationProvisioningState
  - Added Type Alias NetworkSecurityPerimeterGetConfigurationResponse
  - Added Type Alias NetworkSecurityPerimeterListConfigurationsNextResponse
  - Added Type Alias NetworkSecurityPerimeterListConfigurationsResponse
  - Added Type Alias NetworkSecurityPerimeterReconcileConfigurationResponse
  - Added Type Alias ResourceAssociationAccessMode
  - Added Type Alias SecurityEncryptionTypes
  - Added Type Alias SecurityTypes
  - Added Type Alias Severity
  - Interface ImageReference has a new optional parameter communityGalleryImageId
  - Interface ImageReference has a new optional parameter sharedGalleryImageId
  - Interface ManagedDisk has a new optional parameter securityProfile
  - Interface Resource has a new optional parameter systemData
  - Interface TaskContainerSettings has a new optional parameter containerHostBatchBindMounts
  - Added Enum KnownAccessRuleDirection
  - Added Enum KnownContainerHostDataPath
  - Added Enum KnownCreatedByType
  - Added Enum KnownIssueType
  - Added Enum KnownNetworkSecurityPerimeterConfigurationProvisioningState
  - Added Enum KnownResourceAssociationAccessMode
  - Added Enum KnownSecurityEncryptionTypes
  - Added Enum KnownSeverity

### Breaking Changes

  - Removed operation Location_2.listSupportedCloudServiceSkus
  - Interface DeploymentConfiguration no longer has parameter cloudServiceConfiguration
  - Interface ProxyResource no longer has parameter etag
  - Interface Resource no longer has parameter location
  - Interface Resource no longer has parameter tags
  - Type of parameter securityType of interface SecurityProfile is changed from "trustedLaunch" to SecurityTypes
    
    
## 9.2.0 (2024-03-13)
    
### Features Added

  - Added Interface AutomaticOSUpgradePolicy
  - Added Interface RollingUpgradePolicy
  - Added Interface UpgradePolicy
  - Added Type Alias UpgradeMode
  - Interface Pool has a new optional parameter upgradePolicy
  - Interface SupportedSku has a new optional parameter batchSupportEndOfLife
    
    
## 9.1.0 (2023-12-08)
    
### Features Added

  - Added Interface ManagedDisk
  - Added Interface SecurityProfile
  - Added Interface ServiceArtifactReference
  - Added Interface UefiSettings
  - Interface OSDisk has a new optional parameter caching
  - Interface OSDisk has a new optional parameter diskSizeGB
  - Interface OSDisk has a new optional parameter managedDisk
  - Interface OSDisk has a new optional parameter writeAcceleratorEnabled
  - Interface Pool has a new optional parameter resourceTags
  - Interface VirtualMachineConfiguration has a new optional parameter securityProfile
  - Interface VirtualMachineConfiguration has a new optional parameter serviceArtifactReference
    
    
## 9.0.0 (2023-06-30)
    
### Features Added

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

### Breaking Changes

  - Type of parameter type of interface ContainerConfiguration is changed from "DockerCompatible" to ContainerType

   
## 8.0.0 (2022-11-10)
    
### Features Added

  - Added Type Alias NodeCommunicationMode
  - Interface NetworkConfiguration has a new optional parameter dynamicVnetAssignmentScope
  - Interface Pool has a new optional parameter currentNodeCommunicationMode
  - Interface Pool has a new optional parameter targetNodeCommunicationMode
  - Interface PrivateLinkServiceConnectionState has a new optional parameter actionsRequired

### Breaking Changes

  - Interface CifsMountConfiguration no longer has parameter username
  - Interface NetworkConfiguration no longer has parameter dynamicVNetAssignmentScope
  - Interface PrivateLinkServiceConnectionState no longer has parameter actionRequired
  - Interface CifsMountConfiguration has a new required parameter userName
    
    
## 7.2.0 (2022-07-19)
    
### Features Added

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

### Features Added

  - Bug fix
    
## 7.1.0 (2022-03-02)
    
### Features Added

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
