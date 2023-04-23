# Release History

## 10.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 10.1.0 (2023-03-10)
    
**Features**

  - Added Interface ExtendedLocation
  - Added Interface SecuredVMDetails
  - Added Interface TargetDiskNetworkAccessSettings
  - Added Type Alias TargetDiskNetworkAccessOption
  - Interface BmsrpQueryObject has a new optional parameter includeSoftDeletedRP
  - Interface IaasVMRecoveryPoint has a new optional parameter isPrivateAccessEnabledOnAnyDisk
  - Interface IaasVMRecoveryPoint has a new optional parameter securityType
  - Interface IaasVMRestoreRequest has a new optional parameter extendedLocation
  - Interface IaasVMRestoreRequest has a new optional parameter securedVMDetails
  - Interface IaasVMRestoreRequest has a new optional parameter targetDiskNetworkAccessSettings
  - Interface RecoveryPointProperties has a new optional parameter isSoftDeleted
    
    
## 10.0.0 (2023-01-18)
    
**Features**

  - Added operation group DeletedProtectionContainers
  - Added Interface AzureBackupGoalFeatureSupportRequest
  - Added Interface AzureBackupServerContainer
  - Added Interface AzureBackupServerEngine
  - Added Interface AzureFileShareBackupRequest
  - Added Interface AzureFileShareProtectableItem
  - Added Interface AzureFileshareProtectedItem
  - Added Interface AzureFileShareProtectionPolicy
  - Added Interface AzureFileShareProvisionILRRequest
  - Added Interface AzureFileShareRecoveryPoint
  - Added Interface AzureFileShareRestoreRequest
  - Added Interface AzureIaaSClassicComputeVMContainer
  - Added Interface AzureIaaSClassicComputeVMProtectableItem
  - Added Interface AzureIaaSClassicComputeVMProtectedItem
  - Added Interface AzureIaaSComputeVMContainer
  - Added Interface AzureIaaSComputeVMProtectableItem
  - Added Interface AzureIaaSComputeVMProtectedItem
  - Added Interface AzureIaaSVMHealthDetails
  - Added Interface AzureIaaSVMJob
  - Added Interface AzureIaaSVMJobV2
  - Added Interface AzureIaaSVMProtectedItem
  - Added Interface AzureIaaSVMProtectionPolicy
  - Added Interface AzureRecoveryServiceVaultProtectionIntent
  - Added Interface AzureResourceProtectionIntent
  - Added Interface AzureSqlagWorkloadContainerProtectionContainer
  - Added Interface AzureSqlContainer
  - Added Interface AzureSqlProtectedItem
  - Added Interface AzureSqlProtectionPolicy
  - Added Interface AzureStorageContainer
  - Added Interface AzureStorageJob
  - Added Interface AzureStorageProtectableContainer
  - Added Interface AzureVMAppContainerProtectableContainer
  - Added Interface AzureVMAppContainerProtectionContainer
  - Added Interface AzureVMResourceFeatureSupportRequest
  - Added Interface AzureVmWorkloadItem
  - Added Interface AzureVmWorkloadProtectableItem
  - Added Interface AzureVmWorkloadProtectedItem
  - Added Interface AzureVmWorkloadProtectionPolicy
  - Added Interface AzureVmWorkloadSAPAseDatabaseProtectedItem
  - Added Interface AzureVmWorkloadSAPAseDatabaseWorkloadItem
  - Added Interface AzureVmWorkloadSAPAseSystemProtectableItem
  - Added Interface AzureVmWorkloadSAPAseSystemWorkloadItem
  - Added Interface AzureVmWorkloadSAPHanaDatabaseProtectableItem
  - Added Interface AzureVmWorkloadSAPHanaDatabaseProtectedItem
  - Added Interface AzureVmWorkloadSAPHanaDatabaseWorkloadItem
  - Added Interface AzureVmWorkloadSAPHanaDBInstance
  - Added Interface AzureVmWorkloadSAPHanaDBInstanceProtectedItem
  - Added Interface AzureVmWorkloadSAPHanaHSR
  - Added Interface AzureVmWorkloadSAPHanaSystemProtectableItem
  - Added Interface AzureVmWorkloadSAPHanaSystemWorkloadItem
  - Added Interface AzureVmWorkloadSQLAvailabilityGroupProtectableItem
  - Added Interface AzureVmWorkloadSQLDatabaseProtectableItem
  - Added Interface AzureVmWorkloadSQLDatabaseProtectedItem
  - Added Interface AzureVmWorkloadSQLDatabaseWorkloadItem
  - Added Interface AzureVmWorkloadSQLInstanceProtectableItem
  - Added Interface AzureVmWorkloadSQLInstanceWorkloadItem
  - Added Interface AzureWorkloadAutoProtectionIntent
  - Added Interface AzureWorkloadBackupRequest
  - Added Interface AzureWorkloadContainer
  - Added Interface AzureWorkloadContainerAutoProtectionIntent
  - Added Interface AzureWorkloadJob
  - Added Interface AzureWorkloadPointInTimeRecoveryPoint
  - Added Interface AzureWorkloadPointInTimeRestoreRequest
  - Added Interface AzureWorkloadRecoveryPoint
  - Added Interface AzureWorkloadRestoreRequest
  - Added Interface AzureWorkloadSAPHanaPointInTimeRecoveryPoint
  - Added Interface AzureWorkloadSAPHanaPointInTimeRestoreRequest
  - Added Interface AzureWorkloadSAPHanaPointInTimeRestoreWithRehydrateRequest
  - Added Interface AzureWorkloadSAPHanaRecoveryPoint
  - Added Interface AzureWorkloadSAPHanaRestoreRequest
  - Added Interface AzureWorkloadSAPHanaRestoreWithRehydrateRequest
  - Added Interface AzureWorkloadSQLAutoProtectionIntent
  - Added Interface AzureWorkloadSQLPointInTimeRecoveryPoint
  - Added Interface AzureWorkloadSQLPointInTimeRestoreRequest
  - Added Interface AzureWorkloadSQLPointInTimeRestoreWithRehydrateRequest
  - Added Interface AzureWorkloadSQLRecoveryPoint
  - Added Interface AzureWorkloadSQLRestoreRequest
  - Added Interface AzureWorkloadSQLRestoreWithRehydrateRequest
  - Added Interface BackupEngineBaseResource
  - Added Interface BackupEngineBaseResourceList
  - Added Interface BackupRequestResource
  - Added Interface BackupResourceConfigResource
  - Added Interface BackupResourceEncryptionConfigExtended
  - Added Interface BackupResourceEncryptionConfigExtendedResource
  - Added Interface BackupResourceEncryptionConfigResource
  - Added Interface BackupResourceVaultConfigResource
  - Added Interface DeletedProtectionContainersListNextOptionalParams
  - Added Interface DeletedProtectionContainersListOptionalParams
  - Added Interface DpmBackupEngine
  - Added Interface DpmContainer
  - Added Interface DpmJob
  - Added Interface DPMProtectedItem
  - Added Interface ExportJobsOperationResultInfo
  - Added Interface GenericContainer
  - Added Interface GenericProtectedItem
  - Added Interface GenericProtectionPolicy
  - Added Interface GenericRecoveryPoint
  - Added Interface IaasVMBackupRequest
  - Added Interface IaaSVMContainer
  - Added Interface IaasVmilrRegistrationRequest
  - Added Interface IaaSVMProtectableItem
  - Added Interface IaasVMRecoveryPoint
  - Added Interface IaasVMRestoreRequest
  - Added Interface IaasVMRestoreWithRehydrationRequest
  - Added Interface ILRRequestResource
  - Added Interface JobResource
  - Added Interface JobResourceList
  - Added Interface LogSchedulePolicy
  - Added Interface LongTermRetentionPolicy
  - Added Interface LongTermSchedulePolicy
  - Added Interface MabContainer
  - Added Interface MabFileFolderProtectedItem
  - Added Interface MabJob
  - Added Interface MabProtectionPolicy
  - Added Interface OperationResultInfo
  - Added Interface OperationResultInfoBaseResource
  - Added Interface OperationStatusJobExtendedInfo
  - Added Interface OperationStatusJobsExtendedInfo
  - Added Interface OperationStatusProvisionILRExtendedInfo
  - Added Interface OperationStatusValidateOperationExtendedInfo
  - Added Interface PrepareDataMoveResponse
  - Added Interface PrivateEndpointConnectionResource
  - Added Interface ProtectableContainerResource
  - Added Interface ProtectableContainerResourceList
  - Added Interface ProtectedItemResource
  - Added Interface ProtectedItemResourceList
  - Added Interface ProtectionContainerResource
  - Added Interface ProtectionContainerResourceList
  - Added Interface ProtectionIntentResource
  - Added Interface ProtectionIntentResourceList
  - Added Interface ProtectionPolicyResource
  - Added Interface ProtectionPolicyResourceList
  - Added Interface RecoveryPointProperties
  - Added Interface RecoveryPointResource
  - Added Interface RecoveryPointResourceList
  - Added Interface RecoveryPointTierInformationV2
  - Added Interface ResourceGuardProxyBaseResource
  - Added Interface ResourceGuardProxyBaseResourceList
  - Added Interface RestoreRequestResource
  - Added Interface SimpleRetentionPolicy
  - Added Interface SimpleSchedulePolicy
  - Added Interface SimpleSchedulePolicyV2
  - Added Interface TieringPolicy
  - Added Interface ValidateIaasVMRestoreOperationRequest
  - Added Interface ValidateRestoreOperationRequest
  - Added Interface VaultJob
  - Added Interface WorkloadItemResource
  - Added Interface WorkloadItemResourceList
  - Added Interface WorkloadProtectableItemResource
  - Added Interface WorkloadProtectableItemResourceList
  - Added Type Alias DeletedProtectionContainersListNextResponse
  - Added Type Alias DeletedProtectionContainersListResponse
  - Added Type Alias ProtectableContainerType
  - Added Type Alias TieringMode
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter newestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInVault
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter newestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInVault
  - Interface ProtectedItem has a new optional parameter softDeleteRetentionPeriod
  - Interface SubProtectionPolicy has a new optional parameter tieringPolicy
  - Added Enum KnownTieringMode
  - Enum KnownBackupItemType has a new value SAPHanaDBInstance
  - Enum KnownBackupType has a new value SnapshotCopyOnlyFull
  - Enum KnownBackupType has a new value SnapshotFull
  - Enum KnownContainerType has a new value HanaHSRContainer
  - Enum KnownDataSourceType has a new value SAPHanaDBInstance
  - Enum KnownPolicyType has a new value SnapshotCopyOnlyFull
  - Enum KnownPolicyType has a new value SnapshotFull
  - Enum KnownProtectedItemState has a new value BackupsSuspended
  - Enum KnownProtectionState has a new value BackupsSuspended
  - Enum KnownRestorePointQueryType has a new value SnapshotCopyOnlyFull
  - Enum KnownRestorePointQueryType has a new value SnapshotFull
  - Enum KnownRestorePointType has a new value SnapshotCopyOnlyFull
  - Enum KnownRestorePointType has a new value SnapshotFull
  - Enum KnownWorkloadItemType has a new value SAPHanaDBInstance
  - Enum KnownWorkloadType has a new value SAPHanaDBInstance
  - Added function getContinuationToken
  - Interface BackupEnginesListNextOptionalParams no longer has parameter filter
  - Interface BackupEnginesListNextOptionalParams no longer has parameter skipToken
  - Interface BackupJobsListNextOptionalParams no longer has parameter filter
  - Interface BackupJobsListNextOptionalParams no longer has parameter skipToken
  - Interface BackupPoliciesListNextOptionalParams no longer has parameter filter
  - Interface BackupProtectableItemsListNextOptionalParams no longer has parameter filter
  - Interface BackupProtectableItemsListNextOptionalParams no longer has parameter skipToken
  - Interface BackupProtectedItemsListNextOptionalParams no longer has parameter filter
  - Interface BackupProtectedItemsListNextOptionalParams no longer has parameter skipToken
  - Interface BackupProtectionContainersListNextOptionalParams no longer has parameter filter
  - Interface BackupProtectionIntentListNextOptionalParams no longer has parameter filter
  - Interface BackupProtectionIntentListNextOptionalParams no longer has parameter skipToken
  - Interface BackupWorkloadItemsListNextOptionalParams no longer has parameter filter
  - Interface BackupWorkloadItemsListNextOptionalParams no longer has parameter skipToken
  - Interface ProtectableContainersListNextOptionalParams no longer has parameter filter
  - Interface RecoveryPointsListNextOptionalParams no longer has parameter filter
  - Type of parameter protectedItemType of interface ProtectedItem is changed from "AzureFileShareProtectedItem" | "AzureIaaSVMProtectedItem" | "Microsoft.ClassicCompute/virtualMachines" | "Microsoft.Compute/virtualMachines" | "Microsoft.Sql/servers/databases" | "AzureVmWorkloadProtectedItem" | "AzureVmWorkloadSAPAseDatabase" | "AzureVmWorkloadSAPHanaDatabase" | "AzureVmWorkloadSQLDatabase" | "DPMProtectedItem" | "GenericProtectedItem" | "MabFileFolderProtectedItem" to "AzureFileShareProtectedItem" | "AzureIaaSVMProtectedItem" | "Microsoft.ClassicCompute/virtualMachines" | "Microsoft.Compute/virtualMachines" | "Microsoft.Sql/servers/databases" | "AzureVmWorkloadProtectedItem" | "AzureVmWorkloadSAPAseDatabase" | "AzureVmWorkloadSAPHanaDatabase" | "AzureVmWorkloadSAPHanaDBInstance" | "AzureVmWorkloadSQLDatabase" | "DPMProtectedItem" | "GenericProtectedItem" | "MabFileFolderProtectedItem"
  - Type of parameter protectableItemType of interface WorkloadProtectableItem is changed from "AzureFileShare" | "IaaSVMProtectableItem" | "Microsoft.ClassicCompute/virtualMachines" | "Microsoft.Compute/virtualMachines" | "AzureVmWorkloadProtectableItem" | "SAPAseSystem" | "SAPHanaDatabase" | "SAPHanaSystem" | "SQLAvailabilityGroupContainer" | "SQLDataBase" | "SQLInstance" to "AzureFileShare" | "IaaSVMProtectableItem" | "Microsoft.ClassicCompute/virtualMachines" | "Microsoft.Compute/virtualMachines" | "AzureVmWorkloadProtectableItem" | "SAPAseSystem" | "SAPHanaDatabase" | "SAPHanaSystem" | "SAPHanaDBInstance" | "SAPHanaHSR" | "SQLAvailabilityGroupContainer" | "SQLDataBase" | "SQLInstance"

**Breaking Changes**

  - Operation ResourceGuardProxy.put has a new signature
  - Enum KnownContainerType no longer has value AzureWorkloadContainer
  - Enum KnownContainerType no longer has value MicrosoftClassicComputeVirtualMachines
  - Enum KnownContainerType no longer has value MicrosoftComputeVirtualMachines
    
    
## 9.0.0 (2022-05-16)
    
**Breaking Changes**

  - Interface AzureIaaSVMProtectedItemExtendedInfo no longer has parameter newestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo no longer has parameter oldestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo no longer has parameter oldestRecoveryPointInVault
  - Interface AzureVmWorkloadProtectedItemExtendedInfo no longer has parameter newestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo no longer has parameter oldestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo no longer has parameter oldestRecoveryPointInVault
  - Interface SubProtectionPolicy no longer has parameter tieringPolicy
  - Removed Enum KnownTieringMode
    
    
## 8.2.0 (2022-05-11)
    
**Features**

  - Added Interface TieringPolicy
  - Added Type Alias TieringMode
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter newestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInArchive
  - Interface AzureIaaSVMProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInVault
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter newestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInArchive
  - Interface AzureVmWorkloadProtectedItemExtendedInfo has a new optional parameter oldestRecoveryPointInVault
  - Interface SubProtectionPolicy has a new optional parameter tieringPolicy
  - Added Enum KnownTieringMode
    
## 8.1.1 (2022-04-29)

**Features**

  - Bug fix
    
## 8.1.0 (2022-02-14)
    
**Features**

  - Added Interface DailySchedule
  - Added Interface WeeklySchedule
  - Added Type Alias IaasvmPolicyType
  - Added Type Alias SimpleSchedulePolicyV2
  - Type Alias AzureIaaSVMProtectionPolicy has a new parameter policyType
  - Added Enum KnownIaasvmPolicyType
  - Enum KnownContainerType has a new value AzureWorkloadContainer
  - Enum KnownContainerType has a new value MicrosoftClassicComputeVirtualMachines
  - Enum KnownContainerType has a new value MicrosoftComputeVirtualMachines
  - Enum KnownProtectionIntentItemType has a new value AzureWorkloadAutoProtectionIntent
  - Enum KnownProtectionIntentItemType has a new value AzureWorkloadSQLAutoProtectionIntent
    
    
## 8.0.0 (2022-01-20)

The package of @azure/arm-recoveryservicesbackup is using our next generation design principles since version 8.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
