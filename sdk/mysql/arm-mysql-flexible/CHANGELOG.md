# Release History

## 4.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 4.0.0-beta.3 (2025-08-22)

### Other Changes

  - Other fixes

## 4.0.0-beta.2 (2024-06-28)
Compared with version 3.1.0
    
### Features Added

  - Added operation group AdvancedThreatProtectionSettings
  - Added operation group AzureADAdministrators
  - Added operation group BackupAndExport
  - Added operation group CheckNameAvailabilityWithoutLocation
  - Added operation group LocationBasedCapabilitySet
  - Added operation group LogFiles
  - Added operation group LongRunningBackup
  - Added operation group LongRunningBackups
  - Added operation group Maintenances
  - Added operation group OperationProgress
  - Added operation group OperationResults
  - Added operation group ServersMigration
  - Added operation Backups.put
  - Added operation Configurations.beginCreateOrUpdate
  - Added operation Configurations.beginCreateOrUpdateAndWait
  - Added operation Servers.beginResetGtid
  - Added operation Servers.beginResetGtidAndWait
  - Added operation Servers.validateEstimateHighAvailability
  - Added Interface AdministratorListResult
  - Added Interface AdvancedThreatProtection
  - Added Interface AdvancedThreatProtectionForUpdate
  - Added Interface AdvancedThreatProtectionListResult
  - Added Interface AdvancedThreatProtectionSettingsGetOptionalParams
  - Added Interface AdvancedThreatProtectionSettingsListNextOptionalParams
  - Added Interface AdvancedThreatProtectionSettingsListOptionalParams
  - Added Interface AdvancedThreatProtectionSettingsUpdateHeaders
  - Added Interface AdvancedThreatProtectionSettingsUpdateOptionalParams
  - Added Interface AdvancedThreatProtectionSettingsUpdatePutHeaders
  - Added Interface AdvancedThreatProtectionSettingsUpdatePutOptionalParams
  - Added Interface AzureADAdministrator
  - Added Interface AzureADAdministratorsCreateOrUpdateOptionalParams
  - Added Interface AzureADAdministratorsDeleteOptionalParams
  - Added Interface AzureADAdministratorsGetOptionalParams
  - Added Interface AzureADAdministratorsListByServerNextOptionalParams
  - Added Interface AzureADAdministratorsListByServerOptionalParams
  - Added Interface BackupAndExportCreateHeaders
  - Added Interface BackupAndExportCreateOptionalParams
  - Added Interface BackupAndExportRequest
  - Added Interface BackupAndExportResponse
  - Added Interface BackupAndExportResponseType
  - Added Interface BackupAndExportValidateBackupOptionalParams
  - Added Interface BackupRequestBase
  - Added Interface BackupSettings
  - Added Interface BackupsPutOptionalParams
  - Added Interface BackupStoreDetails
  - Added Interface Capability
  - Added Interface CapabilitySetsList
  - Added Interface CheckNameAvailabilityWithoutLocationExecuteOptionalParams
  - Added Interface ConfigurationsCreateOrUpdateHeaders
  - Added Interface ConfigurationsCreateOrUpdateOptionalParams
  - Added Interface DataEncryption
  - Added Interface ErrorDetail
  - Added Interface FullBackupStoreDetails
  - Added Interface HighAvailabilityValidationEstimation
  - Added Interface ImportFromStorageResponseType
  - Added Interface ImportSourceProperties
  - Added Interface LocationBasedCapabilitySetGetOptionalParams
  - Added Interface LocationBasedCapabilitySetListNextOptionalParams
  - Added Interface LocationBasedCapabilitySetListOptionalParams
  - Added Interface LogFile
  - Added Interface LogFileListResult
  - Added Interface LogFilesListByServerNextOptionalParams
  - Added Interface LogFilesListByServerOptionalParams
  - Added Interface LongRunningBackupCreateHeaders
  - Added Interface LongRunningBackupCreateOptionalParams
  - Added Interface LongRunningBackupsGetOptionalParams
  - Added Interface LongRunningBackupsListNextOptionalParams
  - Added Interface LongRunningBackupsListOptionalParams
  - Added Interface Maintenance
  - Added Interface MaintenanceListResult
  - Added Interface MaintenancesListNextOptionalParams
  - Added Interface MaintenancesListOptionalParams
  - Added Interface MaintenancesReadOptionalParams
  - Added Interface MaintenancesUpdateHeaders
  - Added Interface MaintenancesUpdateOptionalParams
  - Added Interface MaintenanceUpdate
  - Added Interface MySQLServerIdentity
  - Added Interface MySQLServerSku
  - Added Interface OperationProgressGetOptionalParams
  - Added Interface OperationProgressResponseType
  - Added Interface OperationProgressResult
  - Added Interface OperationResultsGetOptionalParams
  - Added Interface OperationStatusExtendedResult
  - Added Interface OperationStatusResult
  - Added Interface PrivateEndpoint
  - Added Interface PrivateEndpointConnection
  - Added Interface PrivateLinkServiceConnectionState
  - Added Interface Provisioning
  - Added Interface ServerBackupV2
  - Added Interface ServerBackupV2ListResult
  - Added Interface ServerEditionCapabilityV2
  - Added Interface ServerGtidSetParameter
  - Added Interface ServersCreateHeaders
  - Added Interface ServersDeleteHeaders
  - Added Interface ServersFailoverHeaders
  - Added Interface ServersMigrationCutoverMigrationHeaders
  - Added Interface ServersMigrationCutoverMigrationOptionalParams
  - Added Interface ServersResetGtidHeaders
  - Added Interface ServersResetGtidOptionalParams
  - Added Interface ServersRestartHeaders
  - Added Interface ServersStartHeaders
  - Added Interface ServersStopHeaders
  - Added Interface ServersUpdateHeaders
  - Added Interface ServersValidateEstimateHighAvailabilityOptionalParams
  - Added Interface ServerVersionCapabilityV2
  - Added Interface SkuCapabilityV2
  - Added Interface UserAssignedIdentity
  - Added Interface ValidateBackupResponse
  - Added Type Alias AdministratorName
  - Added Type Alias AdministratorType
  - Added Type Alias AdvancedThreatProtectionName
  - Added Type Alias AdvancedThreatProtectionProvisioningState
  - Added Type Alias AdvancedThreatProtectionSettingsGetResponse
  - Added Type Alias AdvancedThreatProtectionSettingsListNextResponse
  - Added Type Alias AdvancedThreatProtectionSettingsListResponse
  - Added Type Alias AdvancedThreatProtectionSettingsUpdatePutResponse
  - Added Type Alias AdvancedThreatProtectionSettingsUpdateResponse
  - Added Type Alias AdvancedThreatProtectionState
  - Added Type Alias AzureADAdministratorsCreateOrUpdateResponse
  - Added Type Alias AzureADAdministratorsGetResponse
  - Added Type Alias AzureADAdministratorsListByServerNextResponse
  - Added Type Alias AzureADAdministratorsListByServerResponse
  - Added Type Alias BackupAndExportCreateResponse
  - Added Type Alias BackupAndExportValidateBackupResponse
  - Added Type Alias BackupFormat
  - Added Type Alias BackupsPutResponse
  - Added Type Alias BackupStoreDetailsUnion
  - Added Type Alias BackupType
  - Added Type Alias CheckNameAvailabilityWithoutLocationExecuteResponse
  - Added Type Alias ConfigurationsCreateOrUpdateResponse
  - Added Type Alias DataEncryptionType
  - Added Type Alias ImportSourceStorageType
  - Added Type Alias LocationBasedCapabilitySetGetResponse
  - Added Type Alias LocationBasedCapabilitySetListNextResponse
  - Added Type Alias LocationBasedCapabilitySetListResponse
  - Added Type Alias LogFilesListByServerNextResponse
  - Added Type Alias LogFilesListByServerResponse
  - Added Type Alias LongRunningBackupCreateResponse
  - Added Type Alias LongRunningBackupsGetResponse
  - Added Type Alias LongRunningBackupsListNextResponse
  - Added Type Alias LongRunningBackupsListResponse
  - Added Type Alias MaintenanceProvisioningState
  - Added Type Alias MaintenancesListNextResponse
  - Added Type Alias MaintenancesListResponse
  - Added Type Alias MaintenancesReadResponse
  - Added Type Alias MaintenanceState
  - Added Type Alias MaintenancesUpdateResponse
  - Added Type Alias MaintenanceType
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias ObjectType
  - Added Type Alias OperationProgressGetResponse
  - Added Type Alias OperationProgressResponseTypeUnion
  - Added Type Alias OperationResultsGetResponse
  - Added Type Alias OperationStatus
  - Added Type Alias PrivateEndpointConnectionProvisioningState
  - Added Type Alias PrivateEndpointServiceConnectionStatus
  - Added Type Alias ProvisioningState
  - Added Type Alias ResetAllToDefault
  - Added Type Alias ServerSkuTier
  - Added Type Alias ServersMigrationCutoverMigrationResponse
  - Added Type Alias ServersValidateEstimateHighAvailabilityResponse
  - Interface Backup has a new optional parameter backupIntervalHours
  - Interface Configuration has a new optional parameter currentValue
  - Interface Configuration has a new optional parameter documentationLink
  - Interface ConfigurationListForBatchUpdate has a new optional parameter resetAllToDefault
  - Interface ConfigurationsListByServerOptionalParams has a new optional parameter keyword
  - Interface ConfigurationsListByServerOptionalParams has a new optional parameter page
  - Interface ConfigurationsListByServerOptionalParams has a new optional parameter pageSize
  - Interface ConfigurationsListByServerOptionalParams has a new optional parameter tags
  - Interface ErrorResponse has a new optional parameter error
  - Interface Resource has a new optional parameter systemData
  - Interface Server has a new optional parameter dataEncryption
  - Interface Server has a new optional parameter identity
  - Interface Server has a new optional parameter importSourceProperties
  - Interface Server has a new optional parameter privateEndpointConnections
  - Interface ServerForUpdate has a new optional parameter dataEncryption
  - Interface ServerForUpdate has a new optional parameter identity
  - Interface ServerForUpdate has a new optional parameter network
  - Interface ServerForUpdate has a new optional parameter version
  - Interface Storage_2 has a new optional parameter autoIoScaling
  - Interface Storage_2 has a new optional parameter logOnDisk
  - Interface StorageEditionCapability has a new optional parameter maxBackupIntervalHours
  - Interface StorageEditionCapability has a new optional parameter minBackupIntervalHours
  - Interface VirtualNetworkSubnetUsageResult has a new optional parameter location
  - Interface VirtualNetworkSubnetUsageResult has a new optional parameter subscriptionId
  - Added Enum KnownAdministratorName
  - Added Enum KnownAdministratorType
  - Added Enum KnownAdvancedThreatProtectionName
  - Added Enum KnownAdvancedThreatProtectionProvisioningState
  - Added Enum KnownAdvancedThreatProtectionState
  - Added Enum KnownBackupFormat
  - Added Enum KnownBackupType
  - Added Enum KnownImportSourceStorageType
  - Added Enum KnownMaintenanceProvisioningState
  - Added Enum KnownMaintenanceState
  - Added Enum KnownMaintenanceType
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownObjectType
  - Added Enum KnownPrivateEndpointConnectionProvisioningState
  - Added Enum KnownPrivateEndpointServiceConnectionStatus
  - Added Enum KnownProvisioningState
  - Added Enum KnownResetAllToDefault
  - Added Enum KnownServerSkuTier

### Breaking Changes

  - Class MySQLManagementFlexibleServerClient has a new signature
  - Interface Configuration no longer has parameter systemData
  - Interface Database no longer has parameter systemData
  - Interface ErrorResponse no longer has parameter additionalInfo
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter details
  - Interface ErrorResponse no longer has parameter message
  - Interface ErrorResponse no longer has parameter target
  - Interface FirewallRule no longer has parameter systemData
  - Interface MySQLManagementFlexibleServerClientOptionalParams no longer has parameter apiVersion
  - Interface Server no longer has parameter systemData
  - Interface ServerBackup no longer has parameter systemData
  - Type of parameter sku of interface Server is changed from Sku to MySQLServerSku
  - Type of parameter sku of interface ServerForUpdate is changed from Sku to MySQLServerSku
  - Class MySQLManagementFlexibleServerClient no longer has parameter apiVersion
  - Removed Enum KnownSkuTier
    
    
## 4.0.0-beta.1 (2023-05-06)
    
### Features Added

  - Added operation group AzureADAdministrators
  - Added operation group BackupAndExport
  - Added operation group CheckNameAvailabilityWithoutLocation
  - Added operation group LogFiles
  - Added operation Backups.put
  - Added operation Configurations.beginCreateOrUpdate
  - Added operation Configurations.beginCreateOrUpdateAndWait
  - Added operation Servers.beginResetGtid
  - Added operation Servers.beginResetGtidAndWait
  - Added Interface AdministratorListResult
  - Added Interface AzureADAdministrator
  - Added Interface AzureADAdministratorsCreateOrUpdateOptionalParams
  - Added Interface AzureADAdministratorsDeleteOptionalParams
  - Added Interface AzureADAdministratorsGetOptionalParams
  - Added Interface AzureADAdministratorsListByServerNextOptionalParams
  - Added Interface AzureADAdministratorsListByServerOptionalParams
  - Added Interface BackupAndExportCreateHeaders
  - Added Interface BackupAndExportCreateOptionalParams
  - Added Interface BackupAndExportRequest
  - Added Interface BackupAndExportResponse
  - Added Interface BackupAndExportValidateBackupOptionalParams
  - Added Interface BackupRequestBase
  - Added Interface BackupSettings
  - Added Interface BackupsPutOptionalParams
  - Added Interface BackupStoreDetails
  - Added Interface CheckNameAvailabilityWithoutLocationExecuteOptionalParams
  - Added Interface ConfigurationsCreateOrUpdateHeaders
  - Added Interface ConfigurationsCreateOrUpdateOptionalParams
  - Added Interface DataEncryption
  - Added Interface FullBackupStoreDetails
  - Added Interface Identity
  - Added Interface LogFile
  - Added Interface LogFileListResult
  - Added Interface LogFilesListByServerNextOptionalParams
  - Added Interface LogFilesListByServerOptionalParams
  - Added Interface ServerGtidSetParameter
  - Added Interface ServersCreateHeaders
  - Added Interface ServersDeleteHeaders
  - Added Interface ServersFailoverHeaders
  - Added Interface ServersResetGtidHeaders
  - Added Interface ServersResetGtidOptionalParams
  - Added Interface ServersRestartHeaders
  - Added Interface ServersStartHeaders
  - Added Interface ServersStopHeaders
  - Added Interface ServersUpdateHeaders
  - Added Interface UserAssignedIdentity
  - Added Interface ValidateBackupResponse
  - Added Type Alias AdministratorName
  - Added Type Alias AdministratorType
  - Added Type Alias AzureADAdministratorsCreateOrUpdateResponse
  - Added Type Alias AzureADAdministratorsGetResponse
  - Added Type Alias AzureADAdministratorsListByServerNextResponse
  - Added Type Alias AzureADAdministratorsListByServerResponse
  - Added Type Alias BackupAndExportCreateResponse
  - Added Type Alias BackupAndExportValidateBackupResponse
  - Added Type Alias BackupFormat
  - Added Type Alias BackupsPutResponse
  - Added Type Alias BackupStoreDetailsUnion
  - Added Type Alias CheckNameAvailabilityWithoutLocationExecuteResponse
  - Added Type Alias ConfigurationsCreateOrUpdateResponse
  - Added Type Alias DataEncryptionType
  - Added Type Alias LogFilesListByServerNextResponse
  - Added Type Alias LogFilesListByServerResponse
  - Added Type Alias ManagedServiceIdentityType
  - Added Type Alias OperationStatus
  - Added Type Alias ResetAllToDefault
  - Interface Configuration has a new optional parameter currentValue
  - Interface Configuration has a new optional parameter documentationLink
  - Interface ConfigurationListForBatchUpdate has a new optional parameter resetAllToDefault
  - Interface ConfigurationsListByServerOptionalParams has a new optional parameter keyword
  - Interface ConfigurationsListByServerOptionalParams has a new optional parameter page
  - Interface ConfigurationsListByServerOptionalParams has a new optional parameter pageSize
  - Interface ConfigurationsListByServerOptionalParams has a new optional parameter tags
  - Interface Server has a new optional parameter dataEncryption
  - Interface Server has a new optional parameter identity
  - Interface ServerForUpdate has a new optional parameter dataEncryption
  - Interface ServerForUpdate has a new optional parameter identity
  - Interface ServerForUpdate has a new optional parameter version
  - Interface Storage_2 has a new optional parameter autoIoScaling
  - Interface Storage_2 has a new optional parameter logOnDisk
  - Interface VirtualNetworkSubnetUsageResult has a new optional parameter location
  - Interface VirtualNetworkSubnetUsageResult has a new optional parameter subscriptionId
  - Added Enum KnownAdministratorName
  - Added Enum KnownAdministratorType
  - Added Enum KnownBackupFormat
  - Added Enum KnownManagedServiceIdentityType
  - Added Enum KnownResetAllToDefault
  - Interface MySQLManagementFlexibleServerClientOptionalParams no longer has parameter apiVersion

### Breaking Changes

  - Class MySQLManagementFlexibleServerClient no longer has parameter apiVersion
    
    
## 3.1.0 (2022-12-22)
    
### Features Added

  - Added Interface Configuration
  - Added Interface Database
  - Added Interface FirewallRule
  - Added Interface ProxyResource
  - Added Interface Server
  - Added Interface ServerBackup
  - Added Interface TrackedResource
  - Added function getContinuationToken
    
    
## 3.0.0 (2022-04-25)
    
### Breaking Changes

  - Interface ServerForUpdate no longer has parameter dataEncryption
  - Interface ServerForUpdate no longer has parameter identity
  - Type Alias Server no longer has parameter identity
  - Type Alias Server no longer has parameter dataEncryption
    
    
## 2.0.0 (2022-03-07)

The package of @azure/arm-mysql-flexible is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
