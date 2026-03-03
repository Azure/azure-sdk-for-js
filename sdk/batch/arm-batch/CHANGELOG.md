# Release History

## 11.0.0 (2026-02-11)

### Features Added
  - Added operation group ApplicationOperations
  - Added operation group ApplicationPackageOperations
  - Added operation group BatchAccountOperations
  - Added operation group LocationOperations
  - Added operation group NetworkSecurityPerimeterOperations
  - Added operation group PoolOperations
  - Added operation group PrivateEndpointConnectionOperations
  - Added operation group PrivateLinkResourceOperations
  - Added Interface ApplicationPackageProperties
  - Added Interface ApplicationProperties
  - Added Interface BatchAccountCreateProperties
  - Added Interface BatchAccountProperties
  - Added Interface BatchAccountUpdateProperties
  - Added Interface DetectorResponseProperties
  - Added Interface DiskCustomerManagedKey
  - Added Interface DiskEncryptionSetParameters
  - Added Interface HostEndpointSettings
  - Added Interface IPTag
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PoolProperties
  - Added Interface PrivateEndpointConnectionProperties
  - Added Interface PrivateLinkResourceProperties
  - Added Interface ProxyAgentSettings
  - Added Interface RestorePollerOptions
  - Added Interface TrackedResource
  - Interface Application has a new optional parameter systemData
  - Interface ApplicationPackage has a new optional parameter systemData
  - Interface BatchAccount has a new optional parameter systemData
  - Interface DataDisk has a new optional parameter managedDisk
  - Interface DetectorResponse has a new optional parameter systemData
  - Interface DiskEncryptionConfiguration has a new optional parameter customerManagedKey
  - Interface ManagedDisk has a new optional parameter diskEncryptionSet
  - Interface Pool has a new optional parameter systemData
  - Interface PrivateEndpointConnection has a new optional parameter systemData
  - Interface PrivateLinkResource has a new optional parameter systemData
  - Interface PublicIPAddressConfiguration has a new optional parameter ipFamilies
  - Interface PublicIPAddressConfiguration has a new optional parameter ipTags
  - Interface SecurityProfile has a new optional parameter proxyAgentSettings
  - Interface TaskSchedulingPolicy has a new optional parameter jobDefaultOrder
  - Interface VMDiskSecurityProfile has a new optional parameter diskEncryptionSet
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias DiffDiskPlacement
  - Added Type Alias HostEndpointSettingsModeTypes
  - Added Type Alias IPFamily
  - Added Type Alias IPRuleAction
  - Added Type Alias JobDefaultOrder
  - Added Type Alias ResourceType
  - Added Enum AzureClouds
  - Added Enum KnownHostEndpointSettingsModeTypes
  - Added Enum KnownIPFamily
  - Added Enum KnownJobDefaultOrder
  - Added Enum KnownVersions
  - Enum KnownSecurityEncryptionTypes has a new value DiskWithVMGuestState

### Breaking Changes
  - Removed Interface AccessRulePropertiesSubscriptionsItem
  - Removed Interface ApplicationOperationsOperations
  - Removed Interface ApplicationPackageOperationsOperations
  - Removed Interface AzureProxyResource
  - Removed Interface AzureResource
  - Removed Interface BatchAccountOperationsOperations
  - Removed Interface Certificate
  - Removed Interface CertificateBaseProperties
  - Removed Interface CertificateCancelDeletionOptionalParams
  - Removed Interface CertificateCreateOptionalParams
  - Removed Interface CertificateCreateOrUpdateParameters
  - Removed Interface CertificateCreateOrUpdateProperties
  - Removed Interface CertificateDeleteOptionalParams
  - Removed Interface CertificateGetOptionalParams
  - Removed Interface CertificateListByBatchAccountOptionalParams
  - Removed Interface CertificateOperationsOperations
  - Removed Interface CertificateProperties
  - Removed Interface CertificateReference
  - Removed Interface CertificateUpdateOptionalParams
  - Removed Interface DeleteCertificateError
  - Removed Interface Location_2Operations
  - Removed Interface NetworkSecurityPerimeterOperationsOperations
  - Removed Interface OutboundEnvironmentEndpointCollection
  - Removed Interface PoolOperationsOperations
  - Removed Interface PrivateEndpointConnectionOperationsOperations
  - Removed Interface PrivateLinkResourceOperationsOperations
  - Interface DataDisk no longer has parameter storageAccountType
  - Interface Pool no longer has parameter applicationLicenses
  - Interface Pool no longer has parameter certificates
  - Interface Pool no longer has parameter currentNodeCommunicationMode
  - Interface Pool no longer has parameter resourceTags
  - Interface Pool no longer has parameter targetNodeCommunicationMode
  - Parameter location of interface BatchAccount is now required
  - Removed Type Alias CertificateFormat
  - Removed Type Alias CertificateProvisioningState
  - Removed Type Alias CertificateStoreLocation
  - Removed Type Alias CertificateVisibility
  - Removed Type Alias NodeCommunicationMode

    
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
