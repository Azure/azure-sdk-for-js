# Release History

## 3.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 3.0.0-beta.1 (2026-06-15)
Compared with version 2.1.0

### Features Added
  - Added operation group DeviceCapacityCheckOperations
  - Added operation group DeviceCapacityInfoOperations
  - Added operation AddonsOperations.createOrUpdate
  - Added operation AddonsOperations.delete
  - Added operation BandwidthSchedulesOperations.createOrUpdate
  - Added operation BandwidthSchedulesOperations.delete
  - Added operation ContainersOperations.createOrUpdate
  - Added operation ContainersOperations.delete
  - Added operation ContainersOperations.refresh
  - Added operation DevicesOperations.createOrUpdateSecuritySettings
  - Added operation DevicesOperations.delete
  - Added operation DevicesOperations.downloadUpdates
  - Added operation DevicesOperations.installUpdates
  - Added operation DevicesOperations.scanForUpdates
  - Added operation DiagnosticSettingsOperations.updateDiagnosticProactiveLogCollectionSettings
  - Added operation DiagnosticSettingsOperations.updateDiagnosticRemoteSupportSettings
  - Added operation MonitoringConfigOperations.createOrUpdate
  - Added operation MonitoringConfigOperations.delete
  - Added operation OrdersOperations.createOrUpdate
  - Added operation OrdersOperations.delete
  - Added operation RolesOperations.createOrUpdate
  - Added operation RolesOperations.delete
  - Added operation SharesOperations.createOrUpdate
  - Added operation SharesOperations.delete
  - Added operation SharesOperations.refresh
  - Added operation StorageAccountCredentialsOperations.createOrUpdate
  - Added operation StorageAccountCredentialsOperations.delete
  - Added operation StorageAccountsOperations.createOrUpdate
  - Added operation StorageAccountsOperations.delete
  - Added operation SupportPackagesOperations.triggerSupportPackage
  - Added operation TriggersOperations.createOrUpdate
  - Added operation TriggersOperations.delete
  - Added operation UsersOperations.createOrUpdate
  - Added operation UsersOperations.delete
  - Class DataBoxEdgeManagementClient has a new constructor "constructor(credential: TokenCredential, options?: DataBoxEdgeManagementClientOptionalParams);"
  - Added Interface AlertProperties
  - Added Interface ArcAddonProperties
  - Added Interface BandwidthScheduleProperties
  - Added Interface CloudEdgeManagementRoleProperties
  - Added Interface ClusterCapacityViewData
  - Added Interface ClusterGpuCapacity
  - Added Interface ClusterMemoryCapacity
  - Added Interface ClusterStorageViewData
  - Added Interface ContainerProperties
  - Added Interface DataBoxEdgeDeviceExtendedInfoProperties
  - Added Interface DataBoxEdgeDeviceProperties
  - Added Interface DataBoxEdgeDevicePropertiesPatch
  - Added Interface DCAccessCodeProperties
  - Added Interface DeviceCapacityCheckCheckResourceCreationFeasibilityOptionalParams
  - Added Interface DeviceCapacityInfo
  - Added Interface DeviceCapacityInfoGetDeviceCapacityInfoOptionalParams
  - Added Interface DeviceCapacityInfoProperties
  - Added Interface DeviceCapacityRequestInfo
  - Added Interface DeviceCapacityRequestInfoProperties
  - Added Interface DiagnosticRemoteSupportSettingsProperties
  - Added Interface FileTriggerProperties
  - Added Interface HostCapacity
  - Added Interface IoTAddonProperties
  - Added Interface IoTRoleProperties
  - Added Interface JobProperties
  - Added Interface KubernetesRoleProperties
  - Added Interface MECRoleProperties
  - Added Interface MonitoringMetricConfigurationProperties
  - Added Interface NetworkSettingsProperties
  - Added Interface Node
  - Added Interface NodeProperties
  - Added Interface NumaNodeData
  - Added Interface OperationProperties
  - Added Interface OrderProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PeriodicTimerProperties
  - Added Interface ProactiveLogCollectionSettingsProperties
  - Added Interface ProxyResource
  - Added Interface RawCertificateData
  - Added Interface Resource
  - Added Interface RestorePollerOptions
  - Added Interface SecuritySettingsProperties
  - Added Interface ShareProperties
  - Added Interface SimplePollerLike
  - Added Interface StorageAccountCredentialProperties
  - Added Interface StorageAccountProperties
  - Added Interface SubscriptionProperties
  - Added Interface SupportPackageRequestProperties
  - Added Interface TrackedResource
  - Added Interface UpdateSummaryProperties
  - Added Interface UserProperties
  - Added Interface VmMemory
  - Added Interface VmPlacementRequestResult
  - Interface DataBoxEdgeDevice has a new optional parameter kubernetesWorkloadProfile
  - Interface DataBoxEdgeDeviceExtendedInfo has a new optional parameter cloudWitnessContainerName
  - Interface DataBoxEdgeDeviceExtendedInfo has a new optional parameter cloudWitnessStorageAccountName
  - Interface DataBoxEdgeDeviceExtendedInfo has a new optional parameter cloudWitnessStorageEndpoint
  - Interface DataBoxEdgeDeviceExtendedInfo has a new optional parameter clusterWitnessType
  - Interface DataBoxEdgeDeviceExtendedInfo has a new optional parameter fileShareWitnessLocation
  - Interface DataBoxEdgeDeviceExtendedInfo has a new optional parameter fileShareWitnessUsername
  - Interface DataBoxEdgeDeviceExtendedInfo has a new optional parameter systemData
  - Interface Job has a new optional parameter systemData
  - Interface LoadBalancerConfig has a new optional parameter ipRange
  - Interface Order has a new optional parameter kind
  - Interface Order has a new optional parameter orderId
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias ClusterWitnessType
  - Added Enum AzureClouds
  - Added Enum KnownClusterWitnessType
  - Added Enum KnownVersions
  - Enum KnownSkuName has a new value EdgeMRTCP
  - Enum KnownSkuName has a new value EP2128GPU1Mx1W
  - Enum KnownSkuName has a new value EP2256GPU2Mx1
  - Enum KnownSkuName has a new value EP264Mx1W

### Breaking Changes
  - Removed Interface AddonList
  - Removed Interface AlertList
  - Removed Interface BandwidthSchedulesList
  - Removed Interface ContainerList
  - Removed Interface DataBoxEdgeDeviceList
  - Removed Interface DataBoxEdgeMoveRequest
  - Removed Interface DataBoxEdgeSkuList
  - Removed Interface MonitoringMetricConfigurationList
  - Removed Interface Node_2
  - Removed Interface NodeList_2
  - Removed Interface OperationsList
  - Removed Interface OrderList
  - Removed Interface ResourceTypeSku
  - Removed Interface RoleList
  - Removed Interface ShareList
  - Removed Interface SkuInformation
  - Removed Interface SkuInformationList
  - Removed Interface StorageAccountCredentialList
  - Removed Interface StorageAccountList
  - Removed Interface TriggerList
  - Removed Interface UserList

    
## 2.1.0 (2022-11-21)
    
### Features Added

  - Added Interface Addon
  - Added Interface Alert
  - Added Interface ArcAddon
  - Added Interface BandwidthSchedule
  - Added Interface CloudEdgeManagementRole
  - Added Interface Container
  - Added Interface DataBoxEdgeDevice
  - Added Interface DataBoxEdgeDeviceExtendedInfo
  - Added Interface DiagnosticProactiveLogCollectionSettings
  - Added Interface DiagnosticRemoteSupportSettings
  - Added Interface FileEventTrigger
  - Added Interface IoTAddon
  - Added Interface IoTRole
  - Added Interface KubernetesRole
  - Added Interface MECRole
  - Added Interface MonitoringMetricConfiguration
  - Added Interface NetworkSettings
  - Added Interface Node_2
  - Added Interface Order
  - Added Interface PeriodicTimerEventTrigger
  - Added Interface Role
  - Added Interface SecuritySettings
  - Added Interface Share
  - Added Interface StorageAccount
  - Added Interface StorageAccountCredential
  - Added Interface Trigger
  - Added Interface TriggerSupportPackageRequest
  - Added Interface UpdateSummary
  - Added Interface User
    
## 2.0.1 (2022-04-15)

### Features Added

  - Bug fix

## 2.0.0 (2022-01-12)

The package of @azure/arm-databoxedge is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
