# Release History

## 3.0.0 (2025-08-18)

### Features Added
  - Added operation BackupInstances.beginValidateForModifyBackup
  - Added operation BackupInstances.beginValidateForModifyBackupAndWait
  - Added Interface AdlsBlobBackupDatasourceParameters
  - Added Interface BackupInstancesValidateForModifyBackupHeaders
  - Added Interface BackupInstancesValidateForModifyBackupOptionalParams
  - Added Interface ValidateForModifyBackupRequest
  - Interface ItemPathBasedRestoreCriteria has a new optional parameter renameTo
  - Interface KubernetesClusterBackupDatasourceParameters has a new optional parameter includedVolumeTypes
  - Added Type Alias AKSVolumeTypes
  - Added Type Alias BackupInstancesValidateForModifyBackupResponse
  - Added Type Alias BlobBackupDatasourceParametersUnion
  - Added Enum KnownAKSVolumeTypes

### Breaking Changes
  - Operation BackupInstances.beginCreateOrUpdate has a new signature
  - Operation BackupInstances.beginCreateOrUpdateAndWait has a new signature
  - Operation BackupInstances.beginValidateForBackup has a new signature
  - Operation BackupInstances.beginValidateForBackupAndWait has a new signature
  - Operation BackupInstances.get has a new signature
  - Operation BackupInstances.getBackupInstanceOperationResult has a new signature
  - Operation DeletedBackupInstances.get has a new signature
  - Type of parameter objectType of interface BackupDatasourceParameters is changed from "KubernetesClusterBackupDatasourceParameters" | "BlobBackupDatasourceParameters" to "KubernetesClusterBackupDatasourceParameters" | "BlobBackupDatasourceParameters" | "AdlsBlobBackupDatasourceParameters"
  - Type of parameter objectType of interface BlobBackupDatasourceParameters is changed from "BlobBackupDatasourceParameters" to "BlobBackupDatasourceParameters" | "AdlsBlobBackupDatasourceParameters"
  - Type alias "BackupDatasourceParametersUnion" has been changed

    
## 2.1.0 (2024-07-08)
    
### Features Added

  - Added operation group BackupInstancesExtensionRouting
  - Added Interface BackupInstancesExtensionRoutingListNextOptionalParams
  - Added Interface BackupInstancesExtensionRoutingListOptionalParams
  - Added Interface CmkKekIdentity
  - Added Interface CmkKeyVaultProperties
  - Added Interface EncryptionSettings
  - Added Interface StopProtectionRequest
  - Added Interface SuspendBackupRequest
  - Added Type Alias BackupInstancesExtensionRoutingListNextResponse
  - Added Type Alias BackupInstancesExtensionRoutingListResponse
  - Added Type Alias BcdrSecurityLevel
  - Added Type Alias EncryptionState
  - Added Type Alias IdentityType
  - Added Type Alias InfrastructureEncryptionState
  - Interface AzureBackupRestoreRequest has a new optional parameter resourceGuardOperationRequests
  - Interface BackupInstance has a new optional parameter resourceGuardOperationRequests
  - Interface BackupInstancesCreateOrUpdateOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface BackupInstancesDeleteOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface BackupInstancesStopProtectionOptionalParams has a new optional parameter parameters
  - Interface BackupInstancesStopProtectionOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface BackupInstancesSuspendBackupsOptionalParams has a new optional parameter parameters
  - Interface BackupInstancesSuspendBackupsOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface BackupInstancesTriggerRestoreOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface BackupVault has a new optional parameter bcdrSecurityLevel
  - Interface BackupVault has a new optional parameter resourceGuardOperationRequests
  - Interface BackupVaultsCreateOrUpdateOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface BackupVaultsUpdateOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface DppResourceGuardProxyUnlockDeleteOptionalParams has a new optional parameter xMsAuthorizationAuxiliary
  - Interface KubernetesClusterRestoreCriteria has a new optional parameter resourceModifierReference
  - Interface KubernetesClusterVaultTierRestoreCriteria has a new optional parameter resourceModifierReference
  - Interface PatchBackupVaultInput has a new optional parameter resourceGuardOperationRequests
  - Interface SecuritySettings has a new optional parameter encryptionSettings
  - Added Enum KnownBcdrSecurityLevel
  - Added Enum KnownEncryptionState
  - Added Enum KnownIdentityType
  - Added Enum KnownInfrastructureEncryptionState
    
    
## 2.0.0 (2023-12-05)
    
### Features Added

  - Added operation group FetchCrossRegionRestoreJob
  - Added operation group FetchCrossRegionRestoreJobs
  - Added operation group FetchSecondaryRecoveryPoints
  - Added operation BackupInstances.beginTriggerCrossRegionRestore
  - Added operation BackupInstances.beginTriggerCrossRegionRestoreAndWait
  - Added operation BackupInstances.beginValidateCrossRegionRestore
  - Added operation BackupInstances.beginValidateCrossRegionRestoreAndWait
  - Added Interface BackupInstancesTriggerCrossRegionRestoreHeaders
  - Added Interface BackupInstancesTriggerCrossRegionRestoreOptionalParams
  - Added Interface BackupInstancesValidateCrossRegionRestoreHeaders
  - Added Interface BackupInstancesValidateCrossRegionRestoreOptionalParams
  - Added Interface CrossRegionRestoreDetails
  - Added Interface CrossRegionRestoreJobRequest
  - Added Interface CrossRegionRestoreJobsRequest
  - Added Interface CrossRegionRestoreRequestObject
  - Added Interface DefaultResourceProperties
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface FetchCrossRegionRestoreJobGetOptionalParams
  - Added Interface FetchCrossRegionRestoreJobsListNextOptionalParams
  - Added Interface FetchCrossRegionRestoreJobsListOptionalParams
  - Added Interface FetchSecondaryRecoveryPointsListNextOptionalParams
  - Added Interface FetchSecondaryRecoveryPointsListOptionalParams
  - Added Interface FetchSecondaryRPsRequestParameters
  - Added Interface KubernetesClusterVaultTierRestoreCriteria
  - Added Interface UserFacingWarningDetail
  - Added Interface ValidateCrossRegionRestoreRequestObject
  - Added Type Alias BackupInstancesTriggerCrossRegionRestoreResponse
  - Added Type Alias BackupInstancesValidateCrossRegionRestoreResponse
  - Added Type Alias BaseResourcePropertiesUnion
  - Added Type Alias FetchCrossRegionRestoreJobGetResponse
  - Added Type Alias FetchCrossRegionRestoreJobsListNextResponse
  - Added Type Alias FetchCrossRegionRestoreJobsListResponse
  - Added Type Alias FetchSecondaryRecoveryPointsListNextResponse
  - Added Type Alias FetchSecondaryRecoveryPointsListResponse
  - Added Type Alias RecoveryPointCompletionState
  - Added Type Alias ResourcePropertiesObjectType
  - Interface AzureBackupDiscreteRecoveryPoint has a new optional parameter recoveryPointState
  - Interface BackupVault has a new optional parameter replicatedRegions
  - Interface JobExtendedInfo has a new optional parameter warningDetails
  - Type of parameter objectType of interface ItemLevelRestoreCriteria is changed from "ItemPathBasedRestoreCriteria" | "RangeBasedItemLevelRestoreCriteria" | "KubernetesStorageClassRestoreCriteria" | "KubernetesPVRestoreCriteria" | "KubernetesClusterRestoreCriteria" to "ItemPathBasedRestoreCriteria" | "RangeBasedItemLevelRestoreCriteria" | "KubernetesStorageClassRestoreCriteria" | "KubernetesPVRestoreCriteria" | "KubernetesClusterRestoreCriteria" | "KubernetesClusterVaultTierRestoreCriteria"
  - Added Enum KnownRecoveryPointCompletionState
  - Added Enum KnownResourcePropertiesObjectType

### Breaking Changes

  - Type of parameter objectType of interface BaseResourceProperties is changed from "BaseResourceProperties" to "DefaultResourceProperties"
  - Type of parameter resourceProperties of interface Datasource is changed from BaseResourceProperties to BaseResourcePropertiesUnion
  - Type of parameter resourceProperties of interface DatasourceSet is changed from BaseResourceProperties to BaseResourcePropertiesUnion
    
    
## 1.2.0 (2023-07-10)
    
### Features Added

  - Added Interface BaseResourceProperties
  - Added Interface CrossRegionRestoreSettings
  - Added Interface IdentityDetails
  - Added Interface NamespacedNameResource
  - Added Interface UserAssignedIdentity
  - Added Type Alias CrossRegionRestoreState
  - Added Type Alias SecureScoreLevel
  - Interface AzureBackupJob has a new optional parameter rehydrationPriority
  - Interface AzureBackupRestoreRequest has a new optional parameter identityDetails
  - Interface BackupInstance has a new optional parameter identityDetails
  - Interface BackupVault has a new optional parameter secureScore
  - Interface Datasource has a new optional parameter resourceProperties
  - Interface DatasourceSet has a new optional parameter resourceProperties
  - Interface DppIdentityDetails has a new optional parameter userAssignedIdentities
  - Interface FeatureSettings has a new optional parameter crossRegionRestoreSettings
  - Interface KubernetesClusterBackupDatasourceParameters has a new optional parameter backupHookReferences
  - Interface KubernetesClusterRestoreCriteria has a new optional parameter restoreHookReferences
  - Added Enum KnownCrossRegionRestoreState
  - Added Enum KnownSecureScoreLevel
  - Class DataProtectionClient has a new signature
    
    
## 1.1.0 (2023-06-12)
    
### Features Added

  - Added operation group DppResourceGuardProxy
  - Added Interface DppResourceGuardProxyCreateOrUpdateOptionalParams
  - Added Interface DppResourceGuardProxyDeleteOptionalParams
  - Added Interface DppResourceGuardProxyGetOptionalParams
  - Added Interface DppResourceGuardProxyListNextOptionalParams
  - Added Interface DppResourceGuardProxyListOptionalParams
  - Added Interface DppResourceGuardProxyUnlockDeleteOptionalParams
  - Added Interface ResourceGuardOperationDetail
  - Added Interface ResourceGuardProxyBase
  - Added Interface ResourceGuardProxyBaseResource
  - Added Interface ResourceGuardProxyBaseResourceList
  - Added Interface UnlockDeleteRequest
  - Added Interface UnlockDeleteResponse
  - Added Type Alias DppResourceGuardProxyCreateOrUpdateResponse
  - Added Type Alias DppResourceGuardProxyGetResponse
  - Added Type Alias DppResourceGuardProxyListNextResponse
  - Added Type Alias DppResourceGuardProxyListResponse
  - Added Type Alias DppResourceGuardProxyUnlockDeleteResponse
    
    
## 1.0.0 (2023-03-08)

The package of @azure/arm-dataprotection is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
