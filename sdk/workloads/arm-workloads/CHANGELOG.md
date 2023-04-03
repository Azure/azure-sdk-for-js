# Release History

## 1.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 1.0.0-beta.3 (2023-03-02)
    
**Features**

  - Added operation group SapLandscapeMonitorOperations
  - Added operation SAPApplicationServerInstances.beginStartInstance
  - Added operation SAPApplicationServerInstances.beginStartInstanceAndWait
  - Added operation SAPApplicationServerInstances.beginStopInstance
  - Added operation SAPApplicationServerInstances.beginStopInstanceAndWait
  - Added operation SAPCentralInstances.beginStartInstance
  - Added operation SAPCentralInstances.beginStartInstanceAndWait
  - Added operation SAPCentralInstances.beginStopInstance
  - Added operation SAPCentralInstances.beginStopInstanceAndWait
  - Added operation SAPDatabaseInstances.beginStartInstance
  - Added operation SAPDatabaseInstances.beginStartInstanceAndWait
  - Added operation SAPDatabaseInstances.beginStopInstance
  - Added operation SAPDatabaseInstances.beginStopInstanceAndWait
  - Added Interface ApplicationServerFullResourceNames
  - Added Interface ApplicationServerVmDetails
  - Added Interface CentralServerFullResourceNames
  - Added Interface CreateAndMountFileShareConfiguration
  - Added Interface DatabaseServerFullResourceNames
  - Added Interface DiskConfiguration
  - Added Interface DiskDetails
  - Added Interface DiskSku
  - Added Interface DiskVolumeConfiguration
  - Added Interface ExternalInstallationSoftwareConfiguration
  - Added Interface FileShareConfiguration
  - Added Interface LoadBalancerDetails
  - Added Interface LoadBalancerResourceNames
  - Added Interface MountFileShareConfiguration
  - Added Interface NetworkInterfaceResourceNames
  - Added Interface SAPApplicationServerInstancesStartInstanceOptionalParams
  - Added Interface SAPApplicationServerInstancesStopInstanceOptionalParams
  - Added Interface SAPCentralInstancesStartInstanceOptionalParams
  - Added Interface SAPCentralInstancesStopInstanceOptionalParams
  - Added Interface SAPDatabaseInstancesStartInstanceOptionalParams
  - Added Interface SAPDatabaseInstancesStopInstanceOptionalParams
  - Added Interface SapLandscapeMonitor
  - Added Interface SapLandscapeMonitorCreateOptionalParams
  - Added Interface SapLandscapeMonitorDeleteOptionalParams
  - Added Interface SapLandscapeMonitorGetOptionalParams
  - Added Interface SapLandscapeMonitorListOptionalParams
  - Added Interface SapLandscapeMonitorListResult
  - Added Interface SapLandscapeMonitorMetricThresholds
  - Added Interface SapLandscapeMonitorPropertiesGrouping
  - Added Interface SapLandscapeMonitorSidMapping
  - Added Interface SapLandscapeMonitorUpdateOptionalParams
  - Added Interface SharedStorageResourceNames
  - Added Interface SingleServerCustomResourceNames
  - Added Interface SingleServerFullResourceNames
  - Added Interface SkipFileShareConfiguration
  - Added Interface StorageConfiguration
  - Added Interface StorageInformation
  - Added Interface ThreeTierCustomResourceNames
  - Added Interface ThreeTierFullResourceNames
  - Added Interface VirtualMachineResourceNames
  - Added Type Alias ApplicationServerVirtualMachineType
  - Added Type Alias ConfigurationType
  - Added Type Alias DiskSkuName
  - Added Type Alias FileShareConfigurationUnion
  - Added Type Alias NamingPatternType
  - Added Type Alias SAPApplicationServerInstancesStartInstanceResponse
  - Added Type Alias SAPApplicationServerInstancesStopInstanceResponse
  - Added Type Alias SAPCentralInstancesStartInstanceResponse
  - Added Type Alias SAPCentralInstancesStopInstanceResponse
  - Added Type Alias SAPDatabaseInstancesStartInstanceResponse
  - Added Type Alias SAPDatabaseInstancesStopInstanceResponse
  - Added Type Alias SapLandscapeMonitorCreateResponse
  - Added Type Alias SapLandscapeMonitorGetResponse
  - Added Type Alias SapLandscapeMonitorListResponse
  - Added Type Alias SapLandscapeMonitorProvisioningState
  - Added Type Alias SapLandscapeMonitorUpdateResponse
  - Added Type Alias SingleServerCustomResourceNamesUnion
  - Added Type Alias SslPreference
  - Added Type Alias ThreeTierCustomResourceNamesUnion
  - Interface CentralServerVmDetails has a new optional parameter storageDetails
  - Interface DatabaseConfiguration has a new optional parameter diskConfiguration
  - Interface DatabaseVmDetails has a new optional parameter storageDetails
  - Interface DB2ProviderInstanceProperties has a new optional parameter sslCertificateUri
  - Interface DB2ProviderInstanceProperties has a new optional parameter sslPreference
  - Interface DiscoveryConfiguration has a new optional parameter managedRgStorageAccountName
  - Interface HanaDbProviderInstanceProperties has a new optional parameter sapSid
  - Interface HanaDbProviderInstanceProperties has a new optional parameter sslCertificateUri
  - Interface HanaDbProviderInstanceProperties has a new optional parameter sslPreference
  - Interface Monitor has a new optional parameter storageAccountArmId
  - Interface Monitor has a new optional parameter zoneRedundancyPreference
  - Interface MsSqlServerProviderInstanceProperties has a new optional parameter sslCertificateUri
  - Interface MsSqlServerProviderInstanceProperties has a new optional parameter sslPreference
  - Interface PrometheusHaClusterProviderInstanceProperties has a new optional parameter sslCertificateUri
  - Interface PrometheusHaClusterProviderInstanceProperties has a new optional parameter sslPreference
  - Interface PrometheusOSProviderInstanceProperties has a new optional parameter sapSid
  - Interface PrometheusOSProviderInstanceProperties has a new optional parameter sslCertificateUri
  - Interface PrometheusOSProviderInstanceProperties has a new optional parameter sslPreference
  - Interface SAPApplicationServerInstance has a new optional parameter loadBalancerDetails
  - Interface SAPApplicationServerInstance has a new optional parameter vmDetails
  - Interface SAPCentralServerInstance has a new optional parameter loadBalancerDetails
  - Interface SAPDatabaseInstance has a new optional parameter loadBalancerDetails
  - Interface SAPDiskConfiguration has a new optional parameter recommendedConfiguration
  - Interface SAPDiskConfiguration has a new optional parameter supportedConfigurations
  - Interface SAPDiskConfigurationsResult has a new optional parameter volumeConfigurations
  - Interface SapNetWeaverProviderInstanceProperties has a new optional parameter sslCertificateUri
  - Interface SapNetWeaverProviderInstanceProperties has a new optional parameter sslPreference
  - Interface SingleServerConfiguration has a new optional parameter customResourceNames
  - Interface SingleServerConfiguration has a new optional parameter dbDiskConfiguration
  - Interface StopRequest has a new optional parameter softStopTimeoutSeconds
  - Interface ThreeTierConfiguration has a new optional parameter customResourceNames
  - Interface ThreeTierConfiguration has a new optional parameter storageConfiguration
  - Added Enum KnownApplicationServerVirtualMachineType
  - Added Enum KnownConfigurationType
  - Added Enum KnownDiskSkuName
  - Added Enum KnownNamingPatternType
  - Added Enum KnownSapLandscapeMonitorProvisioningState
  - Added Enum KnownSslPreference
  - Enum KnownSAPSoftwareInstallationType has a new value External
  - Enum KnownSAPVirtualInstanceState has a new value SoftwareDetectionFailed
  - Enum KnownSAPVirtualInstanceState has a new value SoftwareDetectionInProgress
  - Enum KnownSAPVirtualInstanceStatus has a new value SoftShutdown
  - Added function getContinuationToken

**Breaking Changes**

  - Removed operation group PhpWorkloads
  - Removed operation group Skus
  - Removed operation group WordpressInstances
  - Interface HanaDbProviderInstanceProperties no longer has parameter dbSslCertificateUri
  - Interface SAPApplicationServerInstance no longer has parameter virtualMachineId
  - Interface SAPDiskConfiguration no longer has parameter diskCount
  - Interface SAPDiskConfiguration no longer has parameter diskIopsReadWrite
  - Interface SAPDiskConfiguration no longer has parameter diskMBpsReadWrite
  - Interface SAPDiskConfiguration no longer has parameter diskSizeGB
  - Interface SAPDiskConfiguration no longer has parameter diskStorageType
  - Interface SAPDiskConfiguration no longer has parameter diskType
  - Interface SAPDiskConfiguration no longer has parameter volume
  - Interface SAPDiskConfigurationsResult no longer has parameter diskConfigurations
  - Interface SapNetWeaverProviderInstanceProperties no longer has parameter sapSslCertificateUri
  - Interface StopRequest no longer has parameter hardStop
  - Type of parameter softwareInstallationType of interface SoftwareConfiguration is changed from "ServiceInitiated" | "SAPInstallWithoutOSConfig" to "ServiceInitiated" | "SAPInstallWithoutOSConfig" | "External"
  - Class WorkloadsClient no longer has parameter phpWorkloads
  - Class WorkloadsClient no longer has parameter skus
  - Class WorkloadsClient no longer has parameter wordpressInstances
  - Removed Enum KnownApplicationProvisioningState
  - Removed Enum KnownAzureFrontDoorEnabled
  - Removed Enum KnownDatabaseType
  - Removed Enum KnownEnableBackup
  - Removed Enum KnownEnableSslEnforcement
  - Removed Enum KnownFileShareStorageType
  - Removed Enum KnownFileShareType
  - Removed Enum KnownHAEnabled
  - Removed Enum KnownLoadBalancerType
  - Removed Enum KnownLocationType
  - Removed Enum KnownOSImageOffer
  - Removed Enum KnownOSImagePublisher
  - Removed Enum KnownOSImageSku
  - Removed Enum KnownOSImageVersion
  - Removed Enum KnownPHPVersion
  - Removed Enum KnownPhpWorkloadProvisioningState
  - Removed Enum KnownRedisCacheFamily
  - Removed Enum KnownSearchType
  - Removed Enum KnownSkuRestrictionReasonCode
  - Removed Enum KnownSkuRestrictionType
  - Removed Enum KnownSkuScaleType
  - Removed Enum KnownWordpressVersions
  - Removed Enum KnownWorkloadKind
    
    
## 1.0.0-beta.2 (2022-07-14)
    
**Features**

  - Added Interface DB2ProviderInstanceProperties
  - Added Interface DeploymentConfiguration
  - Added Interface DeploymentWithOSConfiguration
  - Added Interface DiscoveryConfiguration
  - Added Interface HanaDbProviderInstanceProperties
  - Added Interface LinuxConfiguration
  - Added Interface Monitor
  - Added Interface MonitorPropertiesErrors
  - Added Interface MsSqlServerProviderInstanceProperties
  - Added Interface OperationsContent
  - Added Interface OperationsDefinitionDisplay
  - Added Interface PatchResourceRequestBodyIdentity
  - Added Interface PhpWorkloadResource
  - Added Interface PhpWorkloadResourceIdentity
  - Added Interface PrometheusHaClusterProviderInstanceProperties
  - Added Interface PrometheusOSProviderInstanceProperties
  - Added Interface ProviderInstance
  - Added Interface ProviderInstancePropertiesErrors
  - Added Interface ProxyResource
  - Added Interface SAPApplicationServerInstance
  - Added Interface SAPCentralServerInstance
  - Added Interface SAPDatabaseInstance
  - Added Interface SAPInstallWithoutOSConfigSoftwareConfiguration
  - Added Interface SapNetWeaverProviderInstanceProperties
  - Added Interface SAPVirtualInstance
  - Added Interface SearchProfile
  - Added Interface ServiceInitiatedSoftwareConfiguration
  - Added Interface SingleServerConfiguration
  - Added Interface SingleServerRecommendationResult
  - Added Interface ThreeTierConfiguration
  - Added Interface ThreeTierRecommendationResult
  - Added Interface TrackedResource
  - Added Interface VmssNodesProfile
  - Added Interface WindowsConfiguration
  - Added Interface WordpressInstanceResource
    
    
## 1.0.0-beta.1 (2022-06-09)

The package of @azure/arm-workloads is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
