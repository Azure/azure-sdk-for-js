# Release History

## 4.0.0 (2025-10-13)

### Features Added
  - Added operation group DataProtectionOperations
  - Added operation BackupInstancesOperations.adhocBackup
  - Added operation BackupInstancesOperations.createOrUpdate
  - Added operation BackupInstancesOperations.delete
  - Added operation BackupInstancesOperations.resumeBackups
  - Added operation BackupInstancesOperations.resumeProtection
  - Added operation BackupInstancesOperations.stopProtection
  - Added operation BackupInstancesOperations.suspendBackups
  - Added operation BackupInstancesOperations.syncBackupInstance
  - Added operation BackupInstancesOperations.triggerCrossRegionRestore
  - Added operation BackupInstancesOperations.triggerRehydrate
  - Added operation BackupInstancesOperations.triggerRestore
  - Added operation BackupInstancesOperations.validateCrossRegionRestore
  - Added operation BackupInstancesOperations.validateForBackup
  - Added operation BackupInstancesOperations.validateForModifyBackup
  - Added operation BackupInstancesOperations.validateForRestore
  - Added operation BackupVaultsOperations.createOrUpdate
  - Added operation BackupVaultsOperations.delete
  - Added operation BackupVaultsOperations.update
  - Added operation DeletedBackupInstancesOperations.undelete
  - Added operation ExportJobsOperations.trigger
  - Added Interface BackupVaultsListInResourceGroupOptionalParams
  - Added Interface BackupVaultsListInSubscriptionOptionalParams
  - Added Interface Operation
  - Added Interface OperationDisplay
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface ProxyResource
  - Added Interface Resource
  - Added Interface ResourceGuardsListBackupSecurityPINRequestsObjectsOptionalParams
  - Added Interface ResourceGuardsListDeleteProtectedItemRequestsObjectsOptionalParams
  - Added Interface ResourceGuardsListDeleteResourceGuardProxyRequestsObjectsOptionalParams
  - Added Interface ResourceGuardsListDisableSoftDeleteRequestsObjectsOptionalParams
  - Added Interface ResourceGuardsListResourcesInResourceGroupOptionalParams
  - Added Interface ResourceGuardsListResourcesInSubscriptionOptionalParams
  - Added Interface ResourceGuardsListUpdateProtectedItemRequestsObjectsOptionalParams
  - Added Interface ResourceGuardsListUpdateProtectionPolicyRequestsObjectsOptionalParams
  - Added Interface RestorePollerOptions
  - Added Interface TrackedResource
  - Interface DppBaseResource has a new optional parameter systemData
  - Added Type Alias ActionType
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias Origin
  - Added Enum AzureClouds
  - Added Enum KnownActionType
  - Added Enum KnownOrigin
  - Added Enum KnownVersions

### Breaking Changes
  - Removed operation BackupInstances.beginAdhocBackup
  - Removed operation BackupInstances.beginAdhocBackupAndWait
  - Removed operation BackupInstances.beginCreateOrUpdate
  - Removed operation BackupInstances.beginCreateOrUpdateAndWait
  - Removed operation BackupInstances.beginDelete
  - Removed operation BackupInstances.beginDeleteAndWait
  - Removed operation BackupInstances.beginResumeBackups
  - Removed operation BackupInstances.beginResumeBackupsAndWait
  - Removed operation BackupInstances.beginResumeProtection
  - Removed operation BackupInstances.beginResumeProtectionAndWait
  - Removed operation BackupInstances.beginStopProtection
  - Removed operation BackupInstances.beginStopProtectionAndWait
  - Removed operation BackupInstances.beginSuspendBackups
  - Removed operation BackupInstances.beginSuspendBackupsAndWait
  - Removed operation BackupInstances.beginSyncBackupInstance
  - Removed operation BackupInstances.beginSyncBackupInstanceAndWait
  - Removed operation BackupInstances.beginTriggerCrossRegionRestore
  - Removed operation BackupInstances.beginTriggerCrossRegionRestoreAndWait
  - Removed operation BackupInstances.beginTriggerRehydrate
  - Removed operation BackupInstances.beginTriggerRehydrateAndWait
  - Removed operation BackupInstances.beginTriggerRestore
  - Removed operation BackupInstances.beginTriggerRestoreAndWait
  - Removed operation BackupInstances.beginValidateCrossRegionRestore
  - Removed operation BackupInstances.beginValidateCrossRegionRestoreAndWait
  - Removed operation BackupInstances.beginValidateForBackup
  - Removed operation BackupInstances.beginValidateForBackupAndWait
  - Removed operation BackupInstances.beginValidateForModifyBackup
  - Removed operation BackupInstances.beginValidateForModifyBackupAndWait
  - Removed operation BackupInstances.beginValidateForRestore
  - Removed operation BackupInstances.beginValidateForRestoreAndWait
  - Removed operation BackupVaults.beginCreateOrUpdate
  - Removed operation BackupVaults.beginCreateOrUpdateAndWait
  - Removed operation BackupVaults.beginDelete
  - Removed operation BackupVaults.beginDeleteAndWait
  - Removed operation BackupVaults.beginUpdate
  - Removed operation BackupVaults.beginUpdateAndWait
  - Removed operation DataProtectionOperations.checkFeatureSupport
  - Removed operation DeletedBackupInstances.beginUndelete
  - Removed operation DeletedBackupInstances.beginUndeleteAndWait
  - Removed operation ExportJobs.beginTrigger
  - Removed operation ExportJobs.beginTriggerAndWait
  - Operation BackupInstances.get has a new signature
  - Operation BackupInstances.getBackupInstanceOperationResult has a new signature
  - Operation BackupPolicies.createOrUpdate has a new signature
  - Operation BackupPolicies.get has a new signature
  - Operation DeletedBackupInstances.get has a new signature
  - Operation OperationStatus.get has a new signature
  - Operation OperationStatusBackupVaultContext.get has a new signature
  - Operation OperationStatusResourceGroupContext.get has a new signature
  - Operation RecoveryPoints.get has a new signature
  - Removed Interface AzureBackupFindRestorableTimeRangesRequestResource
  - Removed Interface AzureBackupJobResourceList
  - Removed Interface AzureBackupRecoveryPointResourceList
  - Removed Interface BackupInstanceResourceList
  - Removed Interface BackupVaultResourceList
  - Removed Interface BackupVaultsGetInResourceGroupOptionalParams
  - Removed Interface BackupVaultsGetInSubscriptionOptionalParams
  - Removed Interface BaseBackupPolicyResourceList
  - Removed Interface ClientDiscoveryDisplay
  - Removed Interface ClientDiscoveryForLogSpecification
  - Removed Interface ClientDiscoveryForProperties
  - Removed Interface ClientDiscoveryForServiceSpecification
  - Removed Interface ClientDiscoveryResponse
  - Removed Interface ClientDiscoveryValueForSingleApi
  - Removed Interface DeletedBackupInstanceResourceList
  - Removed Interface DppBaseResourceList
  - Removed Interface DppBaseTrackedResource
  - Removed Interface DppProxyResource
  - Removed Interface DppTrackedResource
  - Removed Interface DppWorkerRequest
  - Removed Interface RecoveryPointsFilters
  - Removed Interface ResourceGuardProxyBaseResourceList
  - Removed Interface ResourceGuardResourceList
  - Removed Interface ResourceGuardsGetBackupSecurityPINRequestsObjectsOptionalParams
  - Removed Interface ResourceGuardsGetDeleteProtectedItemRequestsObjectsOptionalParams
  - Removed Interface ResourceGuardsGetDeleteResourceGuardProxyRequestsObjectsOptionalParams
  - Removed Interface ResourceGuardsGetDisableSoftDeleteRequestsObjectsOptionalParams
  - Removed Interface ResourceGuardsGetResourcesInResourceGroupOptionalParams
  - Removed Interface ResourceGuardsGetResourcesInSubscriptionOptionalParams
  - Removed Interface ResourceGuardsGetUpdateProtectedItemRequestsObjectsOptionalParams
  - Removed Interface ResourceGuardsGetUpdateProtectionPolicyRequestsObjectsOptionalParams
  - Type of parameter objectType of interface AuthCredentials is changed from "SecretStoreBasedAuthCredentials" to string
  - Type of parameter objectType of interface AzureBackupRecoveryPoint is changed from "AzureBackupDiscreteRecoveryPoint" to string
  - Type of parameter objectType of interface AzureBackupRestoreRequest is changed from "AzureBackupRecoveryPointBasedRestoreRequest" | "AzureBackupRestoreWithRehydrationRequest" | "AzureBackupRecoveryTimeBasedRestoreRequest" to string
  - Type of parameter objectType of interface BackupCriteria is changed from "ScheduleBasedBackupCriteria" to string
  - Type of parameter objectType of interface BackupDatasourceParameters is changed from "KubernetesClusterBackupDatasourceParameters" | "BlobBackupDatasourceParameters" | "AdlsBlobBackupDatasourceParameters" to string
  - Type of parameter objectType of interface BackupParameters is changed from "AzureBackupParams" to string
  - Type of parameter objectType of interface BaseBackupPolicy is changed from "BackupPolicy" to string
  - Type of parameter objectType of interface BasePolicyRule is changed from "AzureBackupRule" | "AzureRetentionRule" to string
  - Type of parameter objectType of interface BaseResourceProperties is changed from "DefaultResourceProperties" to ResourcePropertiesObjectType
  - Type of parameter objectType of interface CopyOption is changed from "CopyOnExpiryOption" | "CustomCopyOption" | "ImmediateCopyOption" to string
  - Type of parameter objectType of interface DataStoreParameters is changed from "AzureOperationalStoreParameters" to string
  - Type of parameter objectType of interface DeleteOption is changed from "AbsoluteDeleteOption" to string
  - Type of parameter objectType of interface FeatureValidationRequestBase is changed from "FeatureValidationRequest" to string
  - Type of parameter objectType of interface FeatureValidationResponseBase is changed from "FeatureValidationResponse" to string
  - Type of parameter objectType of interface ItemLevelRestoreCriteria is changed from "ItemPathBasedRestoreCriteria" | "RangeBasedItemLevelRestoreCriteria" | "KubernetesStorageClassRestoreCriteria" | "KubernetesPVRestoreCriteria" | "KubernetesClusterRestoreCriteria" | "KubernetesClusterVaultTierRestoreCriteria" to string
  - Type of parameter objectType of interface OperationExtendedInfo is changed from "OperationJobExtendedInfo" to string
  - Type of parameter objectType of interface RestoreTargetInfoBase is changed from "ItemLevelRestoreTargetInfo" | "RestoreFilesTargetInfo" | "RestoreTargetInfo" to string
  - Type of parameter objectType of interface TriggerContext is changed from "AdhocBasedTriggerContext" | "ScheduleBasedTriggerContext" to string
  - Parameter location of interface BackupVaultResource is now required
  - Parameter location of interface ResourceGuardResource is now required
  - Type alias "AuthCredentialsUnion" has been changed
  - Type alias "AzureBackupRecoveryPointBasedRestoreRequestUnion" has been changed
  - Type alias "AzureBackupRecoveryPointUnion" has been changed
  - Type alias "AzureBackupRestoreRequestUnion" has been changed
  - Type alias "BackupCriteriaUnion" has been changed
  - Type alias "BackupDatasourceParametersUnion" has been changed
  - Type alias "BackupParametersUnion" has been changed
  - Type alias "BaseBackupPolicyUnion" has been changed
  - Type alias "BasePolicyRuleUnion" has been changed
  - Type alias "BaseResourcePropertiesUnion" has been changed
  - Type alias "CopyOptionUnion" has been changed
  - Type alias "DataStoreParametersUnion" has been changed
  - Type alias "DeleteOptionUnion" has been changed
  - Type alias "FeatureValidationRequestBaseUnion" has been changed
  - Type alias "FeatureValidationResponseBaseUnion" has been changed
  - Type alias "ItemLevelRestoreCriteriaUnion" has been changed
  - Type alias "OperationExtendedInfoUnion" has been changed
  - Type alias "RestoreTargetInfoBaseUnion" has been changed
  - Type alias "TriggerContextUnion" has been changed

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
