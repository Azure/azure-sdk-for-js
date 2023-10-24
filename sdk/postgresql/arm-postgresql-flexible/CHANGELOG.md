# Release History

## 8.0.0-beta.4 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 8.0.0-beta.3 (2023-10-16)
    
**Features**

  - Added operation group FlexibleServer
  - Added operation group LogFiles
  - Added operation group LtrBackupOperations
  - Added operation group Migrations
  - Added operation group ServerCapabilities
  - Added Interface AdminCredentials
  - Added Interface BackupRequestBase
  - Added Interface BackupSettings
  - Added Interface BackupStoreDetails
  - Added Interface CapabilityBase
  - Added Interface CheckMigrationNameAvailabilityOptionalParams
  - Added Interface DbServerMetadata
  - Added Interface FlexibleServerCapability
  - Added Interface FlexibleServerStartLtrBackupExceptionHeaders
  - Added Interface FlexibleServerStartLtrBackupHeaders
  - Added Interface FlexibleServerStartLtrBackupOptionalParams
  - Added Interface FlexibleServerTriggerLtrPreBackupExceptionHeaders
  - Added Interface FlexibleServerTriggerLtrPreBackupHeaders
  - Added Interface FlexibleServerTriggerLtrPreBackupOptionalParams
  - Added Interface LogFile
  - Added Interface LogFileListResult
  - Added Interface LogFilesListByServerNextOptionalParams
  - Added Interface LogFilesListByServerOptionalParams
  - Added Interface LtrBackupOperationsGetOptionalParams
  - Added Interface LtrBackupOperationsListByServerNextOptionalParams
  - Added Interface LtrBackupOperationsListByServerOptionalParams
  - Added Interface LtrBackupRequest
  - Added Interface LtrBackupResponse
  - Added Interface LtrPreBackupRequest
  - Added Interface LtrPreBackupResponse
  - Added Interface LtrServerBackupOperation
  - Added Interface LtrServerBackupOperationList
  - Added Interface MigrationNameAvailabilityResource
  - Added Interface MigrationResource
  - Added Interface MigrationResourceForPatch
  - Added Interface MigrationResourceListResult
  - Added Interface MigrationsCreateOptionalParams
  - Added Interface MigrationsDeleteOptionalParams
  - Added Interface MigrationSecretParameters
  - Added Interface MigrationsGetOptionalParams
  - Added Interface MigrationsListByTargetServerNextOptionalParams
  - Added Interface MigrationsListByTargetServerOptionalParams
  - Added Interface MigrationStatus
  - Added Interface MigrationSubStateDetails
  - Added Interface MigrationsUpdateOptionalParams
  - Added Interface ServerCapabilitiesListNextOptionalParams
  - Added Interface ServerCapabilitiesListOptionalParams
  - Added Interface ServerSku
  - Added Interface ServerSkuCapability
  - Added Interface StorageMbCapability
  - Added Type Alias AzureManagedDiskPerformanceTiers
  - Added Type Alias CancelEnum
  - Added Type Alias CapabilityStatus
  - Added Type Alias CheckMigrationNameAvailabilityResponse
  - Added Type Alias ExecutionStatus
  - Added Type Alias FastProvisioningSupportedEnum
  - Added Type Alias FlexibleServerStartLtrBackupResponse
  - Added Type Alias FlexibleServerTriggerLtrPreBackupResponse
  - Added Type Alias GeoBackupSupportedEnum
  - Added Type Alias HaMode
  - Added Type Alias KeyStatusEnum
  - Added Type Alias LogFilesListByServerNextResponse
  - Added Type Alias LogFilesListByServerResponse
  - Added Type Alias LogicalReplicationOnSourceDbEnum
  - Added Type Alias LtrBackupOperationsGetResponse
  - Added Type Alias LtrBackupOperationsListByServerNextResponse
  - Added Type Alias LtrBackupOperationsListByServerResponse
  - Added Type Alias MigrationDetailsLevel
  - Added Type Alias MigrationListFilter
  - Added Type Alias MigrationMode
  - Added Type Alias MigrationNameAvailabilityReason
  - Added Type Alias MigrationsCreateResponse
  - Added Type Alias MigrationsGetResponse
  - Added Type Alias MigrationsListByTargetServerNextResponse
  - Added Type Alias MigrationsListByTargetServerResponse
  - Added Type Alias MigrationState
  - Added Type Alias MigrationSubState
  - Added Type Alias MigrationsUpdateResponse
  - Added Type Alias OnlineResizeSupportedEnum
  - Added Type Alias OverwriteDbsInTargetEnum
  - Added Type Alias RestrictedEnum
  - Added Type Alias ServerCapabilitiesListNextResponse
  - Added Type Alias ServerCapabilitiesListResponse
  - Added Type Alias StartDataMigrationEnum
  - Added Type Alias StorageAutoGrow
  - Added Type Alias StorageAutoGrowthSupportedEnum
  - Added Type Alias TriggerCutoverEnum
  - Added Type Alias ZoneRedundantHaAndGeoBackupSupportedEnum
  - Added Type Alias ZoneRedundantHaSupportedEnum
  - Interface DataEncryption has a new optional parameter geoBackupEncryptionKeyStatus
  - Interface DataEncryption has a new optional parameter geoBackupKeyURI
  - Interface DataEncryption has a new optional parameter geoBackupUserAssignedIdentityId
  - Interface DataEncryption has a new optional parameter primaryEncryptionKeyStatus
  - Interface FastProvisioningEditionCapability has a new optional parameter serverCount
  - Interface FastProvisioningEditionCapability has a new optional parameter supportedTier
  - Interface FlexibleServerEditionCapability has a new optional parameter defaultSkuName
  - Interface FlexibleServerEditionCapability has a new optional parameter supportedServerSkus
  - Interface ServerForUpdate has a new optional parameter network
  - Interface Storage_2 has a new optional parameter autoGrow
  - Interface Storage_2 has a new optional parameter iops
  - Interface Storage_2 has a new optional parameter tier
  - Interface StorageEditionCapability has a new optional parameter defaultStorageSizeMb
  - Interface StorageEditionCapability has a new optional parameter supportedStorageMb
  - Interface UserAssignedIdentity has a new optional parameter tenantId
  - Added Enum KnownAzureManagedDiskPerformanceTiers
  - Added Enum KnownCancelEnum
  - Added Enum KnownExecutionStatus
  - Added Enum KnownFastProvisioningSupportedEnum
  - Added Enum KnownGeoBackupSupportedEnum
  - Added Enum KnownHaMode
  - Added Enum KnownKeyStatusEnum
  - Added Enum KnownLogicalReplicationOnSourceDbEnum
  - Added Enum KnownMigrationDetailsLevel
  - Added Enum KnownMigrationListFilter
  - Added Enum KnownMigrationMode
  - Added Enum KnownMigrationNameAvailabilityReason
  - Added Enum KnownMigrationState
  - Added Enum KnownMigrationSubState
  - Added Enum KnownOnlineResizeSupportedEnum
  - Added Enum KnownOverwriteDbsInTargetEnum
  - Added Enum KnownRestrictedEnum
  - Added Enum KnownStartDataMigrationEnum
  - Added Enum KnownStorageAutoGrow
  - Added Enum KnownStorageAutoGrowthSupportedEnum
  - Added Enum KnownTriggerCutoverEnum
  - Added Enum KnownZoneRedundantHaAndGeoBackupSupportedEnum
  - Added Enum KnownZoneRedundantHaSupportedEnum
  - Enum KnownCreateMode has a new value ReviveDropped
  - Enum KnownServerVersion has a new value Fifteen
  - Class PostgreSQLManagementFlexibleServerClient has a new signature

**Breaking Changes**

  - Interface FlexibleServerEditionCapability no longer has parameter supportedServerVersions
  - Interface ServerVersionCapability no longer has parameter supportedVcores
  - Interface StorageEditionCapability no longer has parameter supportedStorageMB
  - Interface StorageTierCapability no longer has parameter isBaseline
  - Interface StorageTierCapability no longer has parameter tierName
  - Type of parameter value of interface CapabilitiesListResult is changed from CapabilityProperties[] to FlexibleServerCapability[]
  - Enum KnownIdentityType no longer has value SystemAssigned
    
    
## 8.0.0-beta.2 (2023-05-26)
    
**Features**

  - Added operation group FlexibleServer
  - Added operation group LogFiles
  - Added operation group LtrBackupOperations
  - Added operation group Migrations
  - Added operation group ServerCapabilities
  - Added Interface AdminCredentials
  - Added Interface BackupRequestBase
  - Added Interface BackupSettings
  - Added Interface BackupStoreDetails
  - Added Interface CapabilityBase
  - Added Interface CheckMigrationNameAvailabilityOptionalParams
  - Added Interface DbServerMetadata
  - Added Interface FlexibleServerCapability
  - Added Interface FlexibleServerStartLtrBackupExceptionHeaders
  - Added Interface FlexibleServerStartLtrBackupHeaders
  - Added Interface FlexibleServerStartLtrBackupOptionalParams
  - Added Interface FlexibleServerTriggerLtrPreBackupExceptionHeaders
  - Added Interface FlexibleServerTriggerLtrPreBackupHeaders
  - Added Interface FlexibleServerTriggerLtrPreBackupOptionalParams
  - Added Interface LogFile
  - Added Interface LogFileListResult
  - Added Interface LogFilesListByServerNextOptionalParams
  - Added Interface LogFilesListByServerOptionalParams
  - Added Interface LtrBackupOperationsGetOptionalParams
  - Added Interface LtrBackupOperationsListByServerNextOptionalParams
  - Added Interface LtrBackupOperationsListByServerOptionalParams
  - Added Interface LtrBackupRequest
  - Added Interface LtrBackupResponse
  - Added Interface LtrPreBackupRequest
  - Added Interface LtrPreBackupResponse
  - Added Interface LtrServerBackupOperation
  - Added Interface LtrServerBackupOperationList
  - Added Interface MigrationNameAvailabilityResource
  - Added Interface MigrationResource
  - Added Interface MigrationResourceForPatch
  - Added Interface MigrationResourceListResult
  - Added Interface MigrationsCreateOptionalParams
  - Added Interface MigrationsDeleteOptionalParams
  - Added Interface MigrationSecretParameters
  - Added Interface MigrationsGetOptionalParams
  - Added Interface MigrationsListByTargetServerNextOptionalParams
  - Added Interface MigrationsListByTargetServerOptionalParams
  - Added Interface MigrationStatus
  - Added Interface MigrationSubStateDetails
  - Added Interface MigrationsUpdateOptionalParams
  - Added Interface ServerCapabilitiesListNextOptionalParams
  - Added Interface ServerCapabilitiesListOptionalParams
  - Added Interface ServerSku
  - Added Interface ServerSkuCapability
  - Added Interface StorageMbCapability
  - Added Type Alias AzureManagedDiskPerformanceTiers
  - Added Type Alias CancelEnum
  - Added Type Alias CapabilityStatus
  - Added Type Alias CheckMigrationNameAvailabilityResponse
  - Added Type Alias ExecutionStatus
  - Added Type Alias FastProvisioningSupportedEnum
  - Added Type Alias FlexibleServerStartLtrBackupResponse
  - Added Type Alias FlexibleServerTriggerLtrPreBackupResponse
  - Added Type Alias GeoBackupSupportedEnum
  - Added Type Alias HaMode
  - Added Type Alias KeyStatusEnum
  - Added Type Alias LogFilesListByServerNextResponse
  - Added Type Alias LogFilesListByServerResponse
  - Added Type Alias LogicalReplicationOnSourceDbEnum
  - Added Type Alias LtrBackupOperationsGetResponse
  - Added Type Alias LtrBackupOperationsListByServerNextResponse
  - Added Type Alias LtrBackupOperationsListByServerResponse
  - Added Type Alias MigrationDetailsLevel
  - Added Type Alias MigrationListFilter
  - Added Type Alias MigrationMode
  - Added Type Alias MigrationNameAvailabilityReason
  - Added Type Alias MigrationsCreateResponse
  - Added Type Alias MigrationsGetResponse
  - Added Type Alias MigrationsListByTargetServerNextResponse
  - Added Type Alias MigrationsListByTargetServerResponse
  - Added Type Alias MigrationState
  - Added Type Alias MigrationSubState
  - Added Type Alias MigrationsUpdateResponse
  - Added Type Alias OnlineResizeSupportedEnum
  - Added Type Alias OverwriteDbsInTargetEnum
  - Added Type Alias RestrictedEnum
  - Added Type Alias ServerCapabilitiesListNextResponse
  - Added Type Alias ServerCapabilitiesListResponse
  - Added Type Alias StartDataMigrationEnum
  - Added Type Alias StorageAutoGrow
  - Added Type Alias StorageAutoGrowthSupportedEnum
  - Added Type Alias TriggerCutoverEnum
  - Added Type Alias ZoneRedundantHaAndGeoBackupSupportedEnum
  - Added Type Alias ZoneRedundantHaSupportedEnum
  - Interface DataEncryption has a new optional parameter geoBackupEncryptionKeyStatus
  - Interface DataEncryption has a new optional parameter geoBackupKeyURI
  - Interface DataEncryption has a new optional parameter geoBackupUserAssignedIdentityId
  - Interface DataEncryption has a new optional parameter primaryEncryptionKeyStatus
  - Interface FastProvisioningEditionCapability has a new optional parameter serverCount
  - Interface FastProvisioningEditionCapability has a new optional parameter supportedTier
  - Interface FlexibleServerEditionCapability has a new optional parameter defaultSkuName
  - Interface FlexibleServerEditionCapability has a new optional parameter supportedServerSkus
  - Interface ServerForUpdate has a new optional parameter network
  - Interface Storage_2 has a new optional parameter autoGrow
  - Interface Storage_2 has a new optional parameter iops
  - Interface Storage_2 has a new optional parameter iopsTier
  - Interface StorageEditionCapability has a new optional parameter defaultStorageSizeMb
  - Interface StorageEditionCapability has a new optional parameter supportedStorageMb
  - Interface UserAssignedIdentity has a new optional parameter tenantId
  - Added Enum KnownAzureManagedDiskPerformanceTiers
  - Added Enum KnownCancelEnum
  - Added Enum KnownExecutionStatus
  - Added Enum KnownFastProvisioningSupportedEnum
  - Added Enum KnownGeoBackupSupportedEnum
  - Added Enum KnownHaMode
  - Added Enum KnownKeyStatusEnum
  - Added Enum KnownLogicalReplicationOnSourceDbEnum
  - Added Enum KnownMigrationDetailsLevel
  - Added Enum KnownMigrationListFilter
  - Added Enum KnownMigrationMode
  - Added Enum KnownMigrationNameAvailabilityReason
  - Added Enum KnownMigrationState
  - Added Enum KnownMigrationSubState
  - Added Enum KnownOnlineResizeSupportedEnum
  - Added Enum KnownOverwriteDbsInTargetEnum
  - Added Enum KnownRestrictedEnum
  - Added Enum KnownStartDataMigrationEnum
  - Added Enum KnownStorageAutoGrow
  - Added Enum KnownStorageAutoGrowthSupportedEnum
  - Added Enum KnownTriggerCutoverEnum
  - Added Enum KnownZoneRedundantHaAndGeoBackupSupportedEnum
  - Added Enum KnownZoneRedundantHaSupportedEnum
  - Enum KnownCreateMode has a new value ReviveDropped
  - Enum KnownServerVersion has a new value Fifteen

**Breaking Changes**

  - Interface FlexibleServerEditionCapability no longer has parameter supportedServerVersions
  - Interface ServerVersionCapability no longer has parameter supportedVcores
  - Interface StorageEditionCapability no longer has parameter supportedStorageMB
  - Interface StorageTierCapability no longer has parameter isBaseline
  - Interface StorageTierCapability no longer has parameter tierName
  - Type of parameter value of interface CapabilitiesListResult is changed from CapabilityProperties[] to FlexibleServerCapability[]
  - Enum KnownIdentityType no longer has value SystemAssigned


## 8.0.0-beta.1 (2023-05-22)
    
**Features**

  - Added operation group FlexibleServer
  - Added operation group LogFiles
  - Added operation group LtrBackupOperations
  - Added operation group Migrations
  - Added operation group ServerCapabilities
  - Added Interface AdminCredentials
  - Added Interface BackupRequestBase
  - Added Interface BackupSettings
  - Added Interface BackupStoreDetails
  - Added Interface CapabilityBase
  - Added Interface CheckMigrationNameAvailabilityOptionalParams
  - Added Interface DbServerMetadata
  - Added Interface FlexibleServerCapability
  - Added Interface FlexibleServerStartLtrBackupExceptionHeaders
  - Added Interface FlexibleServerStartLtrBackupHeaders
  - Added Interface FlexibleServerStartLtrBackupOptionalParams
  - Added Interface FlexibleServerTriggerLtrPreBackupExceptionHeaders
  - Added Interface FlexibleServerTriggerLtrPreBackupHeaders
  - Added Interface FlexibleServerTriggerLtrPreBackupOptionalParams
  - Added Interface LogFile
  - Added Interface LogFileListResult
  - Added Interface LogFilesListByServerNextOptionalParams
  - Added Interface LogFilesListByServerOptionalParams
  - Added Interface LtrBackupOperationsGetOptionalParams
  - Added Interface LtrBackupOperationsListByServerNextOptionalParams
  - Added Interface LtrBackupOperationsListByServerOptionalParams
  - Added Interface LtrBackupRequest
  - Added Interface LtrBackupResponse
  - Added Interface LtrPreBackupRequest
  - Added Interface LtrPreBackupResponse
  - Added Interface LtrServerBackupOperation
  - Added Interface LtrServerBackupOperationList
  - Added Interface MigrationNameAvailabilityResource
  - Added Interface MigrationResource
  - Added Interface MigrationResourceForPatch
  - Added Interface MigrationResourceListResult
  - Added Interface MigrationsCreateOptionalParams
  - Added Interface MigrationsDeleteOptionalParams
  - Added Interface MigrationSecretParameters
  - Added Interface MigrationsGetOptionalParams
  - Added Interface MigrationsListByTargetServerNextOptionalParams
  - Added Interface MigrationsListByTargetServerOptionalParams
  - Added Interface MigrationStatus
  - Added Interface MigrationSubStateDetails
  - Added Interface MigrationsUpdateOptionalParams
  - Added Interface ServerCapabilitiesListNextOptionalParams
  - Added Interface ServerCapabilitiesListOptionalParams
  - Added Interface ServerSku
  - Added Interface ServerSkuAutoGenerated
  - Added Interface StorageMbCapability
  - Added Type Alias AzureManagedDiskPerformanceTiers
  - Added Type Alias CancelEnum
  - Added Type Alias CapabilityStatus
  - Added Type Alias CheckMigrationNameAvailabilityResponse
  - Added Type Alias ExecutionStatus
  - Added Type Alias FastProvisioningSupportedEnum
  - Added Type Alias FlexibleServerStartLtrBackupResponse
  - Added Type Alias FlexibleServerTriggerLtrPreBackupResponse
  - Added Type Alias GeoBackupSupportedEnum
  - Added Type Alias HaMode
  - Added Type Alias KeyStatusEnum
  - Added Type Alias LogFilesListByServerNextResponse
  - Added Type Alias LogFilesListByServerResponse
  - Added Type Alias LogicalReplicationOnSourceDbEnum
  - Added Type Alias LtrBackupOperationsGetResponse
  - Added Type Alias LtrBackupOperationsListByServerNextResponse
  - Added Type Alias LtrBackupOperationsListByServerResponse
  - Added Type Alias MigrationDetailsLevel
  - Added Type Alias MigrationListFilter
  - Added Type Alias MigrationMode
  - Added Type Alias MigrationNameAvailabilityReason
  - Added Type Alias MigrationsCreateResponse
  - Added Type Alias MigrationsGetResponse
  - Added Type Alias MigrationsListByTargetServerNextResponse
  - Added Type Alias MigrationsListByTargetServerResponse
  - Added Type Alias MigrationState
  - Added Type Alias MigrationSubState
  - Added Type Alias MigrationsUpdateResponse
  - Added Type Alias OnlineResizeSupportedEnum
  - Added Type Alias OverwriteDbsInTargetEnum
  - Added Type Alias RestrictedEnum
  - Added Type Alias ServerCapabilitiesListNextResponse
  - Added Type Alias ServerCapabilitiesListResponse
  - Added Type Alias StartDataMigrationEnum
  - Added Type Alias StorageAutoGrow
  - Added Type Alias StorageAutoGrowthSupportedEnum
  - Added Type Alias TriggerCutoverEnum
  - Added Type Alias ZoneRedundantHaAndGeoBackupSupportedEnum
  - Added Type Alias ZoneRedundantHaSupportedEnum
  - Interface DataEncryption has a new optional parameter geoBackupEncryptionKeyStatus
  - Interface DataEncryption has a new optional parameter geoBackupKeyURI
  - Interface DataEncryption has a new optional parameter geoBackupUserAssignedIdentityId
  - Interface DataEncryption has a new optional parameter primaryEncryptionKeyStatus
  - Interface FastProvisioningEditionCapability has a new optional parameter serverCount
  - Interface FastProvisioningEditionCapability has a new optional parameter supportedTier
  - Interface FlexibleServerEditionCapability has a new optional parameter defaultSkuName
  - Interface FlexibleServerEditionCapability has a new optional parameter supportedServerSkus
  - Interface Storage_2 has a new optional parameter autoGrow
  - Interface Storage_2 has a new optional parameter iops
  - Interface Storage_2 has a new optional parameter iopsTier
  - Interface StorageEditionCapability has a new optional parameter defaultStorageSizeMb
  - Interface StorageEditionCapability has a new optional parameter supportedStorageMb
  - Added Enum KnownAzureManagedDiskPerformanceTiers
  - Added Enum KnownCancelEnum
  - Added Enum KnownExecutionStatus
  - Added Enum KnownFastProvisioningSupportedEnum
  - Added Enum KnownGeoBackupSupportedEnum
  - Added Enum KnownHaMode
  - Added Enum KnownKeyStatusEnum
  - Added Enum KnownLogicalReplicationOnSourceDbEnum
  - Added Enum KnownMigrationDetailsLevel
  - Added Enum KnownMigrationListFilter
  - Added Enum KnownMigrationMode
  - Added Enum KnownMigrationNameAvailabilityReason
  - Added Enum KnownMigrationState
  - Added Enum KnownMigrationSubState
  - Added Enum KnownOnlineResizeSupportedEnum
  - Added Enum KnownOverwriteDbsInTargetEnum
  - Added Enum KnownRestrictedEnum
  - Added Enum KnownStartDataMigrationEnum
  - Added Enum KnownStorageAutoGrow
  - Added Enum KnownStorageAutoGrowthSupportedEnum
  - Added Enum KnownTriggerCutoverEnum
  - Added Enum KnownZoneRedundantHaAndGeoBackupSupportedEnum
  - Added Enum KnownZoneRedundantHaSupportedEnum
  - Enum KnownCreateMode has a new value ReviveDropped
  - Enum KnownServerVersion has a new value Fifteen

**Breaking Changes**

  - Interface FlexibleServerEditionCapability no longer has parameter supportedServerVersions
  - Interface ServerVersionCapability no longer has parameter supportedVcores
  - Interface StorageEditionCapability no longer has parameter supportedStorageMB
  - Interface StorageTierCapability no longer has parameter isBaseline
  - Interface StorageTierCapability no longer has parameter tierName
  - Type of parameter value of interface CapabilitiesListResult is changed from CapabilityProperties[] to FlexibleServerCapability[]
  - Enum KnownIdentityType no longer has value SystemAssigned
    
  
## 7.1.0 (2023-04-10)
    
**Features**

  - Enum KnownArmServerKeyType has a new value SystemManaged

**Bugs Fixed**

  - Enum KnownArmServerKeyType no longer has value SystemAssigned
  - Enum KnownReplicationRole no longer has value GeoSyncReplica
  - Enum KnownReplicationRole no longer has value Secondary
  - Enum KnownReplicationRole no longer has value SyncReplica
  - Enum KnownReplicationRole no longer has value WalReplica
    
    
## 7.0.0 (2023-01-09)
    
**Features**

  - Added operation group Administrators
  - Added operation group Backups
  - Added operation group CheckNameAvailabilityWithLocation
  - Added operation group Replicas
  - Added Interface ActiveDirectoryAdministrator
  - Added Interface ActiveDirectoryAdministratorAdd
  - Added Interface AdministratorListResult
  - Added Interface AdministratorsCreateHeaders
  - Added Interface AdministratorsCreateOptionalParams
  - Added Interface AdministratorsDeleteHeaders
  - Added Interface AdministratorsDeleteOptionalParams
  - Added Interface AdministratorsGetOptionalParams
  - Added Interface AdministratorsListByServerNextOptionalParams
  - Added Interface AdministratorsListByServerOptionalParams
  - Added Interface AuthConfig
  - Added Interface BackupsGetOptionalParams
  - Added Interface BackupsListByServerNextOptionalParams
  - Added Interface BackupsListByServerOptionalParams
  - Added Interface CheckNameAvailabilityRequest
  - Added Interface CheckNameAvailabilityResponse
  - Added Interface CheckNameAvailabilityWithLocationExecuteOptionalParams
  - Added Interface ConfigurationForUpdate
  - Added Interface ConfigurationsPutHeaders
  - Added Interface ConfigurationsUpdateHeaders
  - Added Interface DatabasesCreateHeaders
  - Added Interface DatabasesDeleteHeaders
  - Added Interface DataEncryption
  - Added Interface ErrorDetail
  - Added Interface FastProvisioningEditionCapability
  - Added Interface FirewallRulesCreateOrUpdateHeaders
  - Added Interface FirewallRulesDeleteHeaders
  - Added Interface ReplicasListByServerOptionalParams
  - Added Interface ServerBackup
  - Added Interface ServerBackupListResult
  - Added Interface ServersCreateHeaders
  - Added Interface ServersDeleteHeaders
  - Added Interface ServersRestartHeaders
  - Added Interface ServersStartHeaders
  - Added Interface ServersStopHeaders
  - Added Interface ServersUpdateHeaders
  - Added Interface StorageTierCapability
  - Added Interface UserAssignedIdentity
  - Added Interface UserIdentity
  - Added Type Alias ActiveDirectoryAuthEnum
  - Added Type Alias AdministratorsCreateResponse
  - Added Type Alias AdministratorsGetResponse
  - Added Type Alias AdministratorsListByServerNextResponse
  - Added Type Alias AdministratorsListByServerResponse
  - Added Type Alias ArmServerKeyType
  - Added Type Alias BackupsGetResponse
  - Added Type Alias BackupsListByServerNextResponse
  - Added Type Alias BackupsListByServerResponse
  - Added Type Alias CheckNameAvailabilityReason
  - Added Type Alias CheckNameAvailabilityWithLocationExecuteResponse
  - Added Type Alias IdentityType
  - Added Type Alias Origin
  - Added Type Alias PasswordAuthEnum
  - Added Type Alias PrincipalType
  - Added Type Alias ReplicasListByServerResponse
  - Added Type Alias ReplicationRole
  - Interface CapabilityProperties has a new optional parameter fastProvisioningSupported
  - Interface CapabilityProperties has a new optional parameter supportedFastProvisioningEditions
  - Interface CapabilityProperties has a new optional parameter supportedHAMode
  - Interface ErrorResponse has a new optional parameter error
  - Interface Resource has a new optional parameter systemData
  - Interface Server has a new optional parameter authConfig
  - Interface Server has a new optional parameter dataEncryption
  - Interface Server has a new optional parameter identity
  - Interface Server has a new optional parameter replicaCapacity
  - Interface Server has a new optional parameter replicationRole
  - Interface ServerForUpdate has a new optional parameter authConfig
  - Interface ServerForUpdate has a new optional parameter dataEncryption
  - Interface ServerForUpdate has a new optional parameter identity
  - Interface ServerForUpdate has a new optional parameter replicationRole
  - Interface ServerForUpdate has a new optional parameter version
  - Interface ServerVersionCapability has a new optional parameter supportedVersionsToUpgrade
  - Interface StorageMBCapability has a new optional parameter supportedUpgradableTierList
  - Interface VirtualNetworkSubnetUsageResult has a new optional parameter location
  - Interface VirtualNetworkSubnetUsageResult has a new optional parameter subscriptionId
  - Added Enum KnownActiveDirectoryAuthEnum
  - Added Enum KnownArmServerKeyType
  - Added Enum KnownCheckNameAvailabilityReason
  - Added Enum KnownIdentityType
  - Added Enum KnownOrigin
  - Added Enum KnownPasswordAuthEnum
  - Added Enum KnownPrincipalType
  - Added Enum KnownReplicationRole
  - Enum KnownCreateMode has a new value GeoRestore
  - Enum KnownCreateMode has a new value Replica
  - Enum KnownHighAvailabilityMode has a new value SameZone
  - Enum KnownServerVersion has a new value Fourteen

**Breaking Changes**

  - Operation CheckNameAvailability.execute has a new signature
  - Operation Configurations.beginUpdate has a new signature
  - Operation Configurations.beginUpdateAndWait has a new signature
  - Interface Configuration no longer has parameter systemData
  - Interface Database no longer has parameter systemData
  - Interface ErrorResponse no longer has parameter additionalInfo
  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter details
  - Interface ErrorResponse no longer has parameter message
  - Interface ErrorResponse no longer has parameter target
  - Interface FirewallRule no longer has parameter systemData
  - Interface Server no longer has parameter systemData
  - Interface ServerForUpdate no longer has parameter location
  - Removed Enum KnownReason
    
    
## 6.1.0 (2022-12-22)
    
**Features**

  - Added Interface Configuration
  - Added Interface Database
  - Added Interface FirewallRule
  - Added Interface ProxyResource
  - Added Interface Server
  - Added Interface TrackedResource
  - Added function getContinuationToken
    
    
## 6.0.0 (2022-04-28)
    
**Features**

  - Added Interface PostgreSQLManagementFlexibleServerClientOptionalParams
  - Added Class PostgreSQLManagementFlexibleServerClient

**Breaking Changes**

  - Deleted Class PostgreSQLManagementClient
    
    
## 5.0.0 (2022-01-20)

The package of @azure/arm-postgresql-flexible is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
