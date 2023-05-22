# Release History

## 4.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 4.0.0-beta.1 (2023-05-06)
    
**Features**

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

**Breaking Changes**

  - Class MySQLManagementFlexibleServerClient no longer has parameter apiVersion
    
    
## 3.1.0 (2022-12-22)
    
**Features**

  - Added Interface Configuration
  - Added Interface Database
  - Added Interface FirewallRule
  - Added Interface ProxyResource
  - Added Interface Server
  - Added Interface ServerBackup
  - Added Interface TrackedResource
  - Added function getContinuationToken
    
    
## 3.0.0 (2022-04-25)
    
**Breaking Changes**

  - Interface ServerForUpdate no longer has parameter dataEncryption
  - Interface ServerForUpdate no longer has parameter identity
  - Type Alias Server no longer has parameter identity
  - Type Alias Server no longer has parameter dataEncryption
    
    
## 2.0.0 (2022-03-07)

The package of @azure/arm-mysql-flexible is using our next generation design principles since version 2.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
