# Release History

## 22.0.0-beta.2 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 22.0.0-beta.1 (2025-10-16)
Compared with version 21.7.0

### Features Added
  - Added operation group BucketsOperations
  - Added operation group NetAppResourceQuotaLimitsAccountOperations
  - Added operation AccountsOperations.changeKeyVault
  - Added operation AccountsOperations.createOrUpdate
  - Added operation AccountsOperations.delete
  - Added operation AccountsOperations.getChangeKeyVaultInformation
  - Added operation AccountsOperations.renewCredentials
  - Added operation AccountsOperations.transitionToCmk
  - Added operation AccountsOperations.update
  - Added operation BackupPoliciesOperations.create
  - Added operation BackupPoliciesOperations.delete
  - Added operation BackupPoliciesOperations.update
  - Added operation BackupsOperations.create
  - Added operation BackupsOperations.delete
  - Added operation BackupsOperations.update
  - Added operation BackupsUnderAccountOperations.migrateBackups
  - Added operation BackupsUnderBackupVaultOperations.restoreFiles
  - Added operation BackupsUnderVolumeOperations.migrateBackups
  - Added operation BackupVaultsOperations.createOrUpdate
  - Added operation BackupVaultsOperations.delete
  - Added operation BackupVaultsOperations.update
  - Added operation NetAppResourceOperations.updateNetworkSiblingSet
  - Added operation PoolsOperations.createOrUpdate
  - Added operation PoolsOperations.delete
  - Added operation PoolsOperations.update
  - Added operation SnapshotPoliciesOperations.delete
  - Added operation SnapshotPoliciesOperations.update
  - Added operation SnapshotsOperations.create
  - Added operation SnapshotsOperations.delete
  - Added operation SnapshotsOperations.restoreFiles
  - Added operation SnapshotsOperations.update
  - Added operation SubvolumesOperations.create
  - Added operation SubvolumesOperations.delete
  - Added operation SubvolumesOperations.getMetadata
  - Added operation SubvolumesOperations.update
  - Added operation VolumeGroupsOperations.create
  - Added operation VolumeGroupsOperations.delete
  - Added operation VolumeQuotaRulesOperations.create
  - Added operation VolumeQuotaRulesOperations.delete
  - Added operation VolumeQuotaRulesOperations.update
  - Added operation VolumesOperations.authorizeExternalReplication
  - Added operation VolumesOperations.authorizeReplication
  - Added operation VolumesOperations.breakFileLocks
  - Added operation VolumesOperations.breakReplication
  - Added operation VolumesOperations.createOrUpdate
  - Added operation VolumesOperations.delete
  - Added operation VolumesOperations.deleteReplication
  - Added operation VolumesOperations.finalizeExternalReplication
  - Added operation VolumesOperations.finalizeRelocation
  - Added operation VolumesOperations.listGetGroupIdListForLdapUser
  - Added operation VolumesOperations.listQuotaReport
  - Added operation VolumesOperations.peerExternalCluster
  - Added operation VolumesOperations.performReplicationTransfer
  - Added operation VolumesOperations.poolChange
  - Added operation VolumesOperations.populateAvailabilityZone
  - Added operation VolumesOperations.reestablishReplication
  - Added operation VolumesOperations.reInitializeReplication
  - Added operation VolumesOperations.relocate
  - Added operation VolumesOperations.resetCifsPassword
  - Added operation VolumesOperations.resyncReplication
  - Added operation VolumesOperations.revert
  - Added operation VolumesOperations.revertRelocation
  - Added operation VolumesOperations.splitCloneFromParent
  - Added operation VolumesOperations.update
  - Added Interface AccountProperties
  - Added Interface BackupPatchProperties
  - Added Interface BackupPolicyProperties
  - Added Interface BackupProperties
  - Added Interface BackupVaultProperties
  - Added Interface Bucket
  - Added Interface BucketCredentialsExpiry
  - Added Interface BucketGenerateCredentials
  - Added Interface BucketPatch
  - Added Interface BucketPatchProperties
  - Added Interface BucketProperties
  - Added Interface BucketsCreateOrUpdateOptionalParams
  - Added Interface BucketsDeleteOptionalParams
  - Added Interface BucketServerPatchProperties
  - Added Interface BucketServerProperties
  - Added Interface BucketsGenerateCredentialsOptionalParams
  - Added Interface BucketsGetOptionalParams
  - Added Interface BucketsListOptionalParams
  - Added Interface BucketsUpdateOptionalParams
  - Added Interface CifsUser
  - Added Interface FileSystemUser
  - Added Interface GetKeyVaultStatusResponseProperties
  - Added Interface LdapConfiguration
  - Added Interface ListQuotaReportResponse
  - Added Interface NetAppResourceQuotaLimitsAccountGetOptionalParams
  - Added Interface NetAppResourceQuotaLimitsAccountListOptionalParams
  - Added Interface NfsUser
  - Added Interface OperationProperties
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PoolPatchProperties
  - Added Interface PoolProperties
  - Added Interface QuotaItem
  - Added Interface QuotaItemProperties
  - Added Interface QuotaReport
  - Added Interface RestorePollerOptions
  - Added Interface SnapshotPatch
  - Added Interface SnapshotPolicyProperties
  - Added Interface SnapshotProperties
  - Added Interface SubvolumeModelProperties
  - Added Interface SubvolumePatchParams
  - Added Interface SubvolumeProperties
  - Added Interface UsageProperties
  - Added Interface VolumeGroupListProperties
  - Added Interface VolumeGroupProperties
  - Added Interface VolumePatchProperties
  - Added Interface VolumeProperties
  - Added Interface VolumeQuotaRulesProperties
  - Added Interface VolumesListQuotaReportOptionalParams
  - Interface BackupPatch has a new optional parameter properties
  - Interface BackupPolicyPatch has a new optional parameter properties
  - Interface BackupVault has a new optional parameter properties
  - Interface CapacityPoolPatch has a new optional parameter properties
  - Interface GetKeyVaultStatusResponse has a new optional parameter properties
  - Interface NetAppAccount has a new optional parameter properties
  - Interface NetAppAccountPatch has a new optional parameter properties
  - Interface Operation has a new optional parameter properties
  - Interface RegionInfoResource has a new optional parameter properties
  - Interface ReplicationObject has a new optional parameter externalReplicationSetupInfo
  - Interface ReplicationObject has a new optional parameter externalReplicationSetupStatus
  - Interface ReplicationObject has a new optional parameter mirrorState
  - Interface ReplicationObject has a new optional parameter relationshipStatus
  - Interface Snapshot has a new optional parameter properties
  - Interface SnapshotPolicyPatch has a new optional parameter properties
  - Interface SnapshotPolicyVolumeList has a new optional parameter nextLink
  - Interface SubvolumeInfo has a new optional parameter properties
  - Interface SubvolumeModel has a new optional parameter properties
  - Interface SubvolumePatchRequest has a new optional parameter properties
  - Interface VolumeGroup has a new optional parameter properties
  - Interface VolumeGroupDetails has a new optional parameter properties
  - Interface VolumeGroupDetails has a new optional parameter systemData
  - Interface VolumePatch has a new optional parameter properties
  - Interface VolumeQuotaRule has a new optional parameter properties
  - Interface VolumeQuotaRulePatch has a new optional parameter properties
  - Added Type Alias AzureSupportedClouds
  - Added Type Alias BucketPatchPermissions
  - Added Type Alias BucketPermissions
  - Added Type Alias CredentialsStatus
  - Added Type Alias ExternalReplicationSetupStatus
  - Added Type Alias LdapServerType
  - Added Type Alias NetAppProvisioningState
  - Added Type Alias VolumeBackupRelationshipStatus
  - Added Type Alias VolumeLanguage
  - Added Type Alias VolumeReplicationRelationshipStatus
  - Added Type Alias VolumeRestoreRelationshipStatus
  - Added Enum AzureClouds
  - Added Enum KnownBucketPatchPermissions
  - Added Enum KnownBucketPermissions
  - Added Enum KnownCredentialsStatus
  - Added Enum KnownExternalReplicationSetupStatus
  - Added Enum KnownLdapServerType
  - Added Enum KnownNetAppProvisioningState
  - Added Enum KnownVersions
  - Added Enum KnownVolumeBackupRelationshipStatus
  - Added Enum KnownVolumeLanguage
  - Added Enum KnownVolumeReplicationRelationshipStatus
  - Added Enum KnownVolumeRestoreRelationshipStatus

### Breaking Changes
  - Removed operation Accounts.beginChangeKeyVault
  - Removed operation Accounts.beginChangeKeyVaultAndWait
  - Removed operation Accounts.beginCreateOrUpdate
  - Removed operation Accounts.beginCreateOrUpdateAndWait
  - Removed operation Accounts.beginDelete
  - Removed operation Accounts.beginDeleteAndWait
  - Removed operation Accounts.beginGetChangeKeyVaultInformation
  - Removed operation Accounts.beginGetChangeKeyVaultInformationAndWait
  - Removed operation Accounts.beginRenewCredentials
  - Removed operation Accounts.beginRenewCredentialsAndWait
  - Removed operation Accounts.beginTransitionToCmk
  - Removed operation Accounts.beginTransitionToCmkAndWait
  - Removed operation Accounts.beginUpdate
  - Removed operation Accounts.beginUpdateAndWait
  - Removed operation BackupPolicies.beginCreate
  - Removed operation BackupPolicies.beginCreateAndWait
  - Removed operation BackupPolicies.beginDelete
  - Removed operation BackupPolicies.beginDeleteAndWait
  - Removed operation BackupPolicies.beginUpdate
  - Removed operation BackupPolicies.beginUpdateAndWait
  - Removed operation Backups.beginCreate
  - Removed operation Backups.beginCreateAndWait
  - Removed operation Backups.beginDelete
  - Removed operation Backups.beginDeleteAndWait
  - Removed operation Backups.beginUpdate
  - Removed operation Backups.beginUpdateAndWait
  - Removed operation BackupsUnderAccount.beginMigrateBackups
  - Removed operation BackupsUnderAccount.beginMigrateBackupsAndWait
  - Removed operation BackupsUnderBackupVault.beginRestoreFiles
  - Removed operation BackupsUnderBackupVault.beginRestoreFilesAndWait
  - Removed operation BackupsUnderVolume.beginMigrateBackups
  - Removed operation BackupsUnderVolume.beginMigrateBackupsAndWait
  - Removed operation BackupVaults.beginCreateOrUpdate
  - Removed operation BackupVaults.beginCreateOrUpdateAndWait
  - Removed operation BackupVaults.beginDelete
  - Removed operation BackupVaults.beginDeleteAndWait
  - Removed operation BackupVaults.beginUpdate
  - Removed operation BackupVaults.beginUpdateAndWait
  - Removed operation NetAppResource.beginUpdateNetworkSiblingSet
  - Removed operation NetAppResource.beginUpdateNetworkSiblingSetAndWait
  - Removed operation Pools.beginCreateOrUpdate
  - Removed operation Pools.beginCreateOrUpdateAndWait
  - Removed operation Pools.beginDelete
  - Removed operation Pools.beginDeleteAndWait
  - Removed operation Pools.beginUpdate
  - Removed operation Pools.beginUpdateAndWait
  - Removed operation SnapshotPolicies.beginDelete
  - Removed operation SnapshotPolicies.beginDeleteAndWait
  - Removed operation SnapshotPolicies.beginUpdate
  - Removed operation SnapshotPolicies.beginUpdateAndWait
  - Removed operation Snapshots.beginCreate
  - Removed operation Snapshots.beginCreateAndWait
  - Removed operation Snapshots.beginDelete
  - Removed operation Snapshots.beginDeleteAndWait
  - Removed operation Snapshots.beginRestoreFiles
  - Removed operation Snapshots.beginRestoreFilesAndWait
  - Removed operation Snapshots.beginUpdate
  - Removed operation Snapshots.beginUpdateAndWait
  - Removed operation Subvolumes.beginCreate
  - Removed operation Subvolumes.beginCreateAndWait
  - Removed operation Subvolumes.beginDelete
  - Removed operation Subvolumes.beginDeleteAndWait
  - Removed operation Subvolumes.beginGetMetadata
  - Removed operation Subvolumes.beginGetMetadataAndWait
  - Removed operation Subvolumes.beginUpdate
  - Removed operation Subvolumes.beginUpdateAndWait
  - Removed operation VolumeGroups.beginCreate
  - Removed operation VolumeGroups.beginCreateAndWait
  - Removed operation VolumeGroups.beginDelete
  - Removed operation VolumeGroups.beginDeleteAndWait
  - Removed operation VolumeQuotaRules.beginCreate
  - Removed operation VolumeQuotaRules.beginCreateAndWait
  - Removed operation VolumeQuotaRules.beginDelete
  - Removed operation VolumeQuotaRules.beginDeleteAndWait
  - Removed operation VolumeQuotaRules.beginUpdate
  - Removed operation VolumeQuotaRules.beginUpdateAndWait
  - Removed operation Volumes.beginAuthorizeExternalReplication
  - Removed operation Volumes.beginAuthorizeExternalReplicationAndWait
  - Removed operation Volumes.beginAuthorizeReplication
  - Removed operation Volumes.beginAuthorizeReplicationAndWait
  - Removed operation Volumes.beginBreakFileLocks
  - Removed operation Volumes.beginBreakFileLocksAndWait
  - Removed operation Volumes.beginBreakReplication
  - Removed operation Volumes.beginBreakReplicationAndWait
  - Removed operation Volumes.beginCreateOrUpdate
  - Removed operation Volumes.beginCreateOrUpdateAndWait
  - Removed operation Volumes.beginDelete
  - Removed operation Volumes.beginDeleteAndWait
  - Removed operation Volumes.beginDeleteReplication
  - Removed operation Volumes.beginDeleteReplicationAndWait
  - Removed operation Volumes.beginFinalizeExternalReplication
  - Removed operation Volumes.beginFinalizeExternalReplicationAndWait
  - Removed operation Volumes.beginFinalizeRelocation
  - Removed operation Volumes.beginFinalizeRelocationAndWait
  - Removed operation Volumes.beginListGetGroupIdListForLdapUser
  - Removed operation Volumes.beginListGetGroupIdListForLdapUserAndWait
  - Removed operation Volumes.beginPeerExternalCluster
  - Removed operation Volumes.beginPeerExternalClusterAndWait
  - Removed operation Volumes.beginPerformReplicationTransfer
  - Removed operation Volumes.beginPerformReplicationTransferAndWait
  - Removed operation Volumes.beginPoolChange
  - Removed operation Volumes.beginPoolChangeAndWait
  - Removed operation Volumes.beginPopulateAvailabilityZone
  - Removed operation Volumes.beginPopulateAvailabilityZoneAndWait
  - Removed operation Volumes.beginReestablishReplication
  - Removed operation Volumes.beginReestablishReplicationAndWait
  - Removed operation Volumes.beginReInitializeReplication
  - Removed operation Volumes.beginReInitializeReplicationAndWait
  - Removed operation Volumes.beginRelocate
  - Removed operation Volumes.beginRelocateAndWait
  - Removed operation Volumes.beginResetCifsPassword
  - Removed operation Volumes.beginResetCifsPasswordAndWait
  - Removed operation Volumes.beginResyncReplication
  - Removed operation Volumes.beginResyncReplicationAndWait
  - Removed operation Volumes.beginRevert
  - Removed operation Volumes.beginRevertAndWait
  - Removed operation Volumes.beginRevertRelocation
  - Removed operation Volumes.beginRevertRelocationAndWait
  - Removed operation Volumes.beginSplitCloneFromParent
  - Removed operation Volumes.beginSplitCloneFromParentAndWait
  - Removed operation Volumes.beginUpdate
  - Removed operation Volumes.beginUpdateAndWait
  - Operation Backups.get has a new signature
  - Operation NetAppResource.checkFilePathAvailability has a new signature
  - Operation NetAppResource.checkNameAvailability has a new signature
  - Operation NetAppResource.checkQuotaAvailability has a new signature
  - Operation NetAppResource.queryNetworkSiblingSet has a new signature
  - Operation Pools.get has a new signature
  - Operation SnapshotPolicies.listVolumes has a new signature
  - Operation Volumes.get has a new signature
  - Removed Interface BackupPoliciesList
  - Removed Interface BackupsList
  - Removed Interface BackupVaultsList
  - Removed Interface CapacityPoolList
  - Removed Interface CloudError
  - Removed Interface CloudErrorBody
  - Removed Interface ListReplications
  - Removed Interface MountTarget
  - Removed Interface NetAppAccountList
  - Removed Interface RegionInfosList
  - Removed Interface ResourceIdentity
  - Removed Interface SnapshotPoliciesList
  - Removed Interface SnapshotPolicyDetails
  - Removed Interface SnapshotsList
  - Removed Interface SubscriptionQuotaItem
  - Removed Interface SubscriptionQuotaItemList
  - Removed Interface SubvolumesList
  - Removed Interface VolumeGroupList
  - Removed Interface VolumeList
  - Removed Interface VolumeQuotaRulesList
  - Interface Backup has a new required parameter properties
  - Interface BackupPolicy has a new required parameter properties
  - Interface CapacityPool has a new required parameter properties
  - Interface SnapshotPolicy has a new required parameter properties
  - Interface Volume has a new required parameter properties
  - Interface VolumeGroupVolumeProperties has a new required parameter properties
  - Interface Backup no longer has parameter backupId
  - Interface Backup no longer has parameter backupPolicyResourceId
  - Interface Backup no longer has parameter backupType
  - Interface Backup no longer has parameter completionDate
  - Interface Backup no longer has parameter creationDate
  - Interface Backup no longer has parameter failureReason
  - Interface Backup no longer has parameter isLargeVolume
  - Interface Backup no longer has parameter label
  - Interface Backup no longer has parameter provisioningState
  - Interface Backup no longer has parameter size
  - Interface Backup no longer has parameter snapshotCreationDate
  - Interface Backup no longer has parameter snapshotName
  - Interface Backup no longer has parameter useExistingSnapshot
  - Interface Backup no longer has parameter volumeResourceId
  - Interface BackupPatch no longer has parameter label
  - Interface BackupPolicy no longer has parameter backupPolicyId
  - Interface BackupPolicy no longer has parameter dailyBackupsToKeep
  - Interface BackupPolicy no longer has parameter enabled
  - Interface BackupPolicy no longer has parameter monthlyBackupsToKeep
  - Interface BackupPolicy no longer has parameter provisioningState
  - Interface BackupPolicy no longer has parameter volumeBackups
  - Interface BackupPolicy no longer has parameter volumesAssigned
  - Interface BackupPolicy no longer has parameter weeklyBackupsToKeep
  - Interface BackupPolicyPatch no longer has parameter backupPolicyId
  - Interface BackupPolicyPatch no longer has parameter dailyBackupsToKeep
  - Interface BackupPolicyPatch no longer has parameter enabled
  - Interface BackupPolicyPatch no longer has parameter monthlyBackupsToKeep
  - Interface BackupPolicyPatch no longer has parameter provisioningState
  - Interface BackupPolicyPatch no longer has parameter volumeBackups
  - Interface BackupPolicyPatch no longer has parameter volumesAssigned
  - Interface BackupPolicyPatch no longer has parameter weeklyBackupsToKeep
  - Interface BackupVault no longer has parameter provisioningState
  - Interface CapacityPool no longer has parameter coolAccess
  - Interface CapacityPool no longer has parameter customThroughputMibps
  - Interface CapacityPool no longer has parameter encryptionType
  - Interface CapacityPool no longer has parameter poolId
  - Interface CapacityPool no longer has parameter provisioningState
  - Interface CapacityPool no longer has parameter qosType
  - Interface CapacityPool no longer has parameter serviceLevel
  - Interface CapacityPool no longer has parameter size
  - Interface CapacityPool no longer has parameter totalThroughputMibps
  - Interface CapacityPool no longer has parameter utilizedThroughputMibps
  - Interface CapacityPoolPatch no longer has parameter coolAccess
  - Interface CapacityPoolPatch no longer has parameter customThroughputMibps
  - Interface CapacityPoolPatch no longer has parameter qosType
  - Interface CapacityPoolPatch no longer has parameter size
  - Interface GetKeyVaultStatusResponse no longer has parameter keyName
  - Interface GetKeyVaultStatusResponse no longer has parameter keyVaultPrivateEndpoints
  - Interface GetKeyVaultStatusResponse no longer has parameter keyVaultResourceId
  - Interface GetKeyVaultStatusResponse no longer has parameter keyVaultUri
  - Interface NetAppAccount no longer has parameter activeDirectories
  - Interface NetAppAccount no longer has parameter disableShowmount
  - Interface NetAppAccount no longer has parameter encryption
  - Interface NetAppAccount no longer has parameter multiAdStatus
  - Interface NetAppAccount no longer has parameter nfsV4IDDomain
  - Interface NetAppAccount no longer has parameter provisioningState
  - Interface NetAppAccountPatch no longer has parameter activeDirectories
  - Interface NetAppAccountPatch no longer has parameter disableShowmount
  - Interface NetAppAccountPatch no longer has parameter encryption
  - Interface NetAppAccountPatch no longer has parameter multiAdStatus
  - Interface NetAppAccountPatch no longer has parameter nfsV4IDDomain
  - Interface NetAppAccountPatch no longer has parameter provisioningState
  - Interface NetAppResourceCheckFilePathAvailabilityOptionalParams no longer has parameter availabilityZone
  - Interface Operation no longer has parameter serviceSpecification
  - Interface RegionInfoResource no longer has parameter availabilityZoneMappings
  - Interface RegionInfoResource no longer has parameter storageToNetworkProximity
  - Interface Snapshot no longer has parameter created
  - Interface Snapshot no longer has parameter provisioningState
  - Interface Snapshot no longer has parameter snapshotId
  - Interface SnapshotPolicy no longer has parameter dailySchedule
  - Interface SnapshotPolicy no longer has parameter enabled
  - Interface SnapshotPolicy no longer has parameter hourlySchedule
  - Interface SnapshotPolicy no longer has parameter monthlySchedule
  - Interface SnapshotPolicy no longer has parameter provisioningState
  - Interface SnapshotPolicy no longer has parameter weeklySchedule
  - Interface SnapshotPolicyPatch no longer has parameter dailySchedule
  - Interface SnapshotPolicyPatch no longer has parameter enabled
  - Interface SnapshotPolicyPatch no longer has parameter hourlySchedule
  - Interface SnapshotPolicyPatch no longer has parameter monthlySchedule
  - Interface SnapshotPolicyPatch no longer has parameter provisioningState
  - Interface SnapshotPolicyPatch no longer has parameter weeklySchedule
  - Interface SubvolumeInfo no longer has parameter parentPath
  - Interface SubvolumeInfo no longer has parameter path
  - Interface SubvolumeInfo no longer has parameter provisioningState
  - Interface SubvolumeInfo no longer has parameter size
  - Interface SubvolumeModel no longer has parameter accessedTimeStamp
  - Interface SubvolumeModel no longer has parameter bytesUsed
  - Interface SubvolumeModel no longer has parameter changedTimeStamp
  - Interface SubvolumeModel no longer has parameter creationTimeStamp
  - Interface SubvolumeModel no longer has parameter modifiedTimeStamp
  - Interface SubvolumeModel no longer has parameter parentPath
  - Interface SubvolumeModel no longer has parameter path
  - Interface SubvolumeModel no longer has parameter permissions
  - Interface SubvolumeModel no longer has parameter provisioningState
  - Interface SubvolumeModel no longer has parameter size
  - Interface SubvolumePatchRequest no longer has parameter path
  - Interface SubvolumePatchRequest no longer has parameter size
  - Interface Volume no longer has parameter acceptGrowCapacityPoolForShortTermCloneSplit
  - Interface Volume no longer has parameter actualThroughputMibps
  - Interface Volume no longer has parameter avsDataStore
  - Interface Volume no longer has parameter backupId
  - Interface Volume no longer has parameter baremetalTenantId
  - Interface Volume no longer has parameter capacityPoolResourceId
  - Interface Volume no longer has parameter cloneProgress
  - Interface Volume no longer has parameter coolAccess
  - Interface Volume no longer has parameter coolAccessRetrievalPolicy
  - Interface Volume no longer has parameter coolAccessTieringPolicy
  - Interface Volume no longer has parameter coolnessPeriod
  - Interface Volume no longer has parameter creationToken
  - Interface Volume no longer has parameter dataProtection
  - Interface Volume no longer has parameter dataStoreResourceId
  - Interface Volume no longer has parameter defaultGroupQuotaInKiBs
  - Interface Volume no longer has parameter defaultUserQuotaInKiBs
  - Interface Volume no longer has parameter deleteBaseSnapshot
  - Interface Volume no longer has parameter effectiveNetworkFeatures
  - Interface Volume no longer has parameter enableSubvolumes
  - Interface Volume no longer has parameter encrypted
  - Interface Volume no longer has parameter encryptionKeySource
  - Interface Volume no longer has parameter exportPolicy
  - Interface Volume no longer has parameter fileAccessLogs
  - Interface Volume no longer has parameter fileSystemId
  - Interface Volume no longer has parameter inheritedSizeInBytes
  - Interface Volume no longer has parameter isDefaultQuotaEnabled
  - Interface Volume no longer has parameter isLargeVolume
  - Interface Volume no longer has parameter isRestoring
  - Interface Volume no longer has parameter kerberosEnabled
  - Interface Volume no longer has parameter keyVaultPrivateEndpointResourceId
  - Interface Volume no longer has parameter ldapEnabled
  - Interface Volume no longer has parameter maximumNumberOfFiles
  - Interface Volume no longer has parameter mountTargets
  - Interface Volume no longer has parameter networkFeatures
  - Interface Volume no longer has parameter networkSiblingSetId
  - Interface Volume no longer has parameter originatingResourceId
  - Interface Volume no longer has parameter placementRules
  - Interface Volume no longer has parameter protocolTypes
  - Interface Volume no longer has parameter provisionedAvailabilityZone
  - Interface Volume no longer has parameter provisioningState
  - Interface Volume no longer has parameter proximityPlacementGroup
  - Interface Volume no longer has parameter securityStyle
  - Interface Volume no longer has parameter serviceLevel
  - Interface Volume no longer has parameter smbAccessBasedEnumeration
  - Interface Volume no longer has parameter smbContinuouslyAvailable
  - Interface Volume no longer has parameter smbEncryption
  - Interface Volume no longer has parameter smbNonBrowsable
  - Interface Volume no longer has parameter snapshotDirectoryVisible
  - Interface Volume no longer has parameter snapshotId
  - Interface Volume no longer has parameter storageToNetworkProximity
  - Interface Volume no longer has parameter subnetId
  - Interface Volume no longer has parameter t2Network
  - Interface Volume no longer has parameter throughputMibps
  - Interface Volume no longer has parameter unixPermissions
  - Interface Volume no longer has parameter usageThreshold
  - Interface Volume no longer has parameter volumeGroupName
  - Interface Volume no longer has parameter volumeSpecName
  - Interface Volume no longer has parameter volumeType
  - Interface VolumeGroup no longer has parameter groupMetaData
  - Interface VolumeGroup no longer has parameter provisioningState
  - Interface VolumeGroupDetails no longer has parameter groupMetaData
  - Interface VolumeGroupDetails no longer has parameter provisioningState
  - Interface VolumeGroupDetails no longer has parameter volumes
  - Interface VolumeGroupVolumeProperties no longer has parameter acceptGrowCapacityPoolForShortTermCloneSplit
  - Interface VolumeGroupVolumeProperties no longer has parameter actualThroughputMibps
  - Interface VolumeGroupVolumeProperties no longer has parameter avsDataStore
  - Interface VolumeGroupVolumeProperties no longer has parameter backupId
  - Interface VolumeGroupVolumeProperties no longer has parameter baremetalTenantId
  - Interface VolumeGroupVolumeProperties no longer has parameter capacityPoolResourceId
  - Interface VolumeGroupVolumeProperties no longer has parameter cloneProgress
  - Interface VolumeGroupVolumeProperties no longer has parameter coolAccess
  - Interface VolumeGroupVolumeProperties no longer has parameter coolAccessRetrievalPolicy
  - Interface VolumeGroupVolumeProperties no longer has parameter coolAccessTieringPolicy
  - Interface VolumeGroupVolumeProperties no longer has parameter coolnessPeriod
  - Interface VolumeGroupVolumeProperties no longer has parameter creationToken
  - Interface VolumeGroupVolumeProperties no longer has parameter dataProtection
  - Interface VolumeGroupVolumeProperties no longer has parameter dataStoreResourceId
  - Interface VolumeGroupVolumeProperties no longer has parameter defaultGroupQuotaInKiBs
  - Interface VolumeGroupVolumeProperties no longer has parameter defaultUserQuotaInKiBs
  - Interface VolumeGroupVolumeProperties no longer has parameter deleteBaseSnapshot
  - Interface VolumeGroupVolumeProperties no longer has parameter effectiveNetworkFeatures
  - Interface VolumeGroupVolumeProperties no longer has parameter enableSubvolumes
  - Interface VolumeGroupVolumeProperties no longer has parameter encrypted
  - Interface VolumeGroupVolumeProperties no longer has parameter encryptionKeySource
  - Interface VolumeGroupVolumeProperties no longer has parameter exportPolicy
  - Interface VolumeGroupVolumeProperties no longer has parameter fileAccessLogs
  - Interface VolumeGroupVolumeProperties no longer has parameter fileSystemId
  - Interface VolumeGroupVolumeProperties no longer has parameter inheritedSizeInBytes
  - Interface VolumeGroupVolumeProperties no longer has parameter isDefaultQuotaEnabled
  - Interface VolumeGroupVolumeProperties no longer has parameter isLargeVolume
  - Interface VolumeGroupVolumeProperties no longer has parameter isRestoring
  - Interface VolumeGroupVolumeProperties no longer has parameter kerberosEnabled
  - Interface VolumeGroupVolumeProperties no longer has parameter keyVaultPrivateEndpointResourceId
  - Interface VolumeGroupVolumeProperties no longer has parameter ldapEnabled
  - Interface VolumeGroupVolumeProperties no longer has parameter maximumNumberOfFiles
  - Interface VolumeGroupVolumeProperties no longer has parameter mountTargets
  - Interface VolumeGroupVolumeProperties no longer has parameter networkFeatures
  - Interface VolumeGroupVolumeProperties no longer has parameter networkSiblingSetId
  - Interface VolumeGroupVolumeProperties no longer has parameter originatingResourceId
  - Interface VolumeGroupVolumeProperties no longer has parameter placementRules
  - Interface VolumeGroupVolumeProperties no longer has parameter protocolTypes
  - Interface VolumeGroupVolumeProperties no longer has parameter provisionedAvailabilityZone
  - Interface VolumeGroupVolumeProperties no longer has parameter provisioningState
  - Interface VolumeGroupVolumeProperties no longer has parameter proximityPlacementGroup
  - Interface VolumeGroupVolumeProperties no longer has parameter securityStyle
  - Interface VolumeGroupVolumeProperties no longer has parameter serviceLevel
  - Interface VolumeGroupVolumeProperties no longer has parameter smbAccessBasedEnumeration
  - Interface VolumeGroupVolumeProperties no longer has parameter smbContinuouslyAvailable
  - Interface VolumeGroupVolumeProperties no longer has parameter smbEncryption
  - Interface VolumeGroupVolumeProperties no longer has parameter smbNonBrowsable
  - Interface VolumeGroupVolumeProperties no longer has parameter snapshotDirectoryVisible
  - Interface VolumeGroupVolumeProperties no longer has parameter snapshotId
  - Interface VolumeGroupVolumeProperties no longer has parameter storageToNetworkProximity
  - Interface VolumeGroupVolumeProperties no longer has parameter subnetId
  - Interface VolumeGroupVolumeProperties no longer has parameter t2Network
  - Interface VolumeGroupVolumeProperties no longer has parameter throughputMibps
  - Interface VolumeGroupVolumeProperties no longer has parameter unixPermissions
  - Interface VolumeGroupVolumeProperties no longer has parameter usageThreshold
  - Interface VolumeGroupVolumeProperties no longer has parameter volumeGroupName
  - Interface VolumeGroupVolumeProperties no longer has parameter volumeSpecName
  - Interface VolumeGroupVolumeProperties no longer has parameter volumeType
  - Interface VolumePatch no longer has parameter coolAccess
  - Interface VolumePatch no longer has parameter coolAccessRetrievalPolicy
  - Interface VolumePatch no longer has parameter coolAccessTieringPolicy
  - Interface VolumePatch no longer has parameter coolnessPeriod
  - Interface VolumePatch no longer has parameter dataProtection
  - Interface VolumePatch no longer has parameter defaultGroupQuotaInKiBs
  - Interface VolumePatch no longer has parameter defaultUserQuotaInKiBs
  - Interface VolumePatch no longer has parameter exportPolicy
  - Interface VolumePatch no longer has parameter isDefaultQuotaEnabled
  - Interface VolumePatch no longer has parameter protocolTypes
  - Interface VolumePatch no longer has parameter serviceLevel
  - Interface VolumePatch no longer has parameter smbAccessBasedEnumeration
  - Interface VolumePatch no longer has parameter smbNonBrowsable
  - Interface VolumePatch no longer has parameter snapshotDirectoryVisible
  - Interface VolumePatch no longer has parameter throughputMibps
  - Interface VolumePatch no longer has parameter unixPermissions
  - Interface VolumePatch no longer has parameter usageThreshold
  - Interface VolumeQuotaRule no longer has parameter provisioningState
  - Interface VolumeQuotaRule no longer has parameter quotaSizeInKiBs
  - Interface VolumeQuotaRule no longer has parameter quotaTarget
  - Interface VolumeQuotaRule no longer has parameter quotaType
  - Interface VolumeQuotaRulePatch no longer has parameter provisioningState
  - Interface VolumeQuotaRulePatch no longer has parameter quotaSizeInKiBs
  - Interface VolumeQuotaRulePatch no longer has parameter quotaTarget
  - Interface VolumeQuotaRulePatch no longer has parameter quotaType
  - Parameter value of interface SnapshotPolicyVolumeList is now required
  - Removed Type Alias ProvisioningState
  - Removed Type Alias RelationshipStatus
  - Removed Enum KnownRelationshipStatus

## 21.7.0 (2025-08-14)

### Features Added
  - Added operation Volumes.beginSplitCloneFromParent
  - Added operation Volumes.beginSplitCloneFromParentAndWait
  - Added Interface VolumesSplitCloneFromParentHeaders
  - Added Interface VolumesSplitCloneFromParentOptionalParams
  - Interface CapacityPool has a new optional parameter customThroughputMibps
  - Interface CapacityPoolPatch has a new optional parameter customThroughputMibps
  - Interface Volume has a new optional parameter acceptGrowCapacityPoolForShortTermCloneSplit
  - Interface Volume has a new optional parameter inheritedSizeInBytes
  - Interface VolumeGroupVolumeProperties has a new optional parameter acceptGrowCapacityPoolForShortTermCloneSplit
  - Interface VolumeGroupVolumeProperties has a new optional parameter inheritedSizeInBytes
  - Added Type Alias AcceptGrowCapacityPoolForShortTermCloneSplit
  - Added Type Alias VolumesSplitCloneFromParentResponse
  - Added Enum KnownAcceptGrowCapacityPoolForShortTermCloneSplit
  - Enum KnownServiceLevel has a new value Flexible

## 21.6.0 (2025-07-25)

### Features Added
  - Interface SubscriptionQuotaItemList has a new optional parameter nextLink
  - Added Type Alias NetAppResourceQuotaLimitsListNextResponse

    
## 21.6.0-beta.1 (2025-05-14)
Compared with version 21.5.0
    
### Features Added

  - Added operation group Buckets
  - Added operation group NetAppResourceQuotaLimitsAccount
  - Added operation Volumes.beginListQuotaReport
  - Added operation Volumes.beginListQuotaReportAndWait
  - Added operation Volumes.beginSplitCloneFromParent
  - Added operation Volumes.beginSplitCloneFromParentAndWait
  - Added Interface Bucket
  - Added Interface BucketCredentialsExpiry
  - Added Interface BucketGenerateCredentials
  - Added Interface BucketList
  - Added Interface BucketPatch
  - Added Interface BucketsCreateOrUpdateHeaders
  - Added Interface BucketsCreateOrUpdateOptionalParams
  - Added Interface BucketsDeleteHeaders
  - Added Interface BucketsDeleteOptionalParams
  - Added Interface BucketServerPatchProperties
  - Added Interface BucketServerProperties
  - Added Interface BucketsGenerateCredentialsOptionalParams
  - Added Interface BucketsGetOptionalParams
  - Added Interface BucketsListNextOptionalParams
  - Added Interface BucketsListOptionalParams
  - Added Interface BucketsUpdateHeaders
  - Added Interface BucketsUpdateOptionalParams
  - Added Interface CifsUser
  - Added Interface FileSystemUser
  - Added Interface LdapConfiguration
  - Added Interface ListQuotaReportResponse
  - Added Interface NetAppResourceQuotaLimitsAccountGetOptionalParams
  - Added Interface NetAppResourceQuotaLimitsAccountListNextOptionalParams
  - Added Interface NetAppResourceQuotaLimitsAccountListOptionalParams
  - Added Interface NfsUser
  - Added Interface QuotaItem
  - Added Interface QuotaItemList
  - Added Interface QuotaReport
  - Added Interface VolumesListQuotaReportHeaders
  - Added Interface VolumesListQuotaReportOptionalParams
  - Added Interface VolumesSplitCloneFromParentHeaders
  - Added Interface VolumesSplitCloneFromParentOptionalParams
  - Added Type Alias AcceptGrowCapacityPoolForShortTermCloneSplit
  - Added Type Alias BucketsCreateOrUpdateResponse
  - Added Type Alias BucketsDeleteResponse
  - Added Type Alias BucketsGenerateCredentialsResponse
  - Added Type Alias BucketsGetResponse
  - Added Type Alias BucketsListNextResponse
  - Added Type Alias BucketsListResponse
  - Added Type Alias BucketsUpdateResponse
  - Added Type Alias CredentialsStatus
  - Added Type Alias ExternalReplicationSetupStatus
  - Added Type Alias LdapServerType
  - Added Type Alias NetappProvisioningState
  - Added Type Alias NetAppResourceQuotaLimitsAccountGetResponse
  - Added Type Alias NetAppResourceQuotaLimitsAccountListNextResponse
  - Added Type Alias NetAppResourceQuotaLimitsAccountListResponse
  - Added Type Alias VolumeLanguage
  - Added Type Alias VolumesListQuotaReportResponse
  - Added Type Alias VolumesSplitCloneFromParentResponse
  - Interface CapacityPool has a new optional parameter customThroughputMibps
  - Interface CapacityPoolPatch has a new optional parameter customThroughputMibps
  - Interface NetAppAccount has a new optional parameter ldapConfiguration
  - Interface NetAppAccountPatch has a new optional parameter ldapConfiguration
  - Interface ReplicationObject has a new optional parameter externalReplicationSetupInfo
  - Interface ReplicationObject has a new optional parameter externalReplicationSetupStatus
  - Interface Volume has a new optional parameter acceptGrowCapacityPoolForShortTermCloneSplit
  - Interface Volume has a new optional parameter inheritedSizeInBytes
  - Interface Volume has a new optional parameter language
  - Interface Volume has a new optional parameter ldapServerType
  - Interface VolumeGroupVolumeProperties has a new optional parameter acceptGrowCapacityPoolForShortTermCloneSplit
  - Interface VolumeGroupVolumeProperties has a new optional parameter inheritedSizeInBytes
  - Interface VolumeGroupVolumeProperties has a new optional parameter language
  - Interface VolumeGroupVolumeProperties has a new optional parameter ldapServerType
  - Added Enum KnownAcceptGrowCapacityPoolForShortTermCloneSplit
  - Added Enum KnownCredentialsStatus
  - Added Enum KnownExternalReplicationSetupStatus
  - Added Enum KnownLdapServerType
  - Added Enum KnownNetappProvisioningState
  - Added Enum KnownVolumeLanguage
  - Enum KnownServiceLevel has a new value Flexible
    
    
## 21.5.0 (2025-04-18)
    
### Features Added

  - Added operation group NetAppResourceUsages
  - Added Interface DestinationReplication
  - Added Interface NetAppResourceUsagesGetOptionalParams
  - Added Interface NetAppResourceUsagesListNextOptionalParams
  - Added Interface NetAppResourceUsagesListOptionalParams
  - Added Interface OperationsListNextOptionalParams
  - Added Interface UsageName
  - Added Interface UsageResult
  - Added Interface UsagesListResult
  - Added Type Alias MultiAdStatus
  - Added Type Alias NetAppResourceUsagesGetResponse
  - Added Type Alias NetAppResourceUsagesListNextResponse
  - Added Type Alias NetAppResourceUsagesListResponse
  - Added Type Alias OperationsListNextResponse
  - Added Type Alias ReplicationType
  - Interface Backup has a new optional parameter completionDate
  - Interface Backup has a new optional parameter isLargeVolume
  - Interface Backup has a new optional parameter snapshotCreationDate
  - Interface EncryptionIdentity has a new optional parameter federatedClientId
  - Interface NetAppAccount has a new optional parameter multiAdStatus
  - Interface NetAppAccount has a new optional parameter nfsV4IDDomain
  - Interface NetAppAccountPatch has a new optional parameter multiAdStatus
  - Interface NetAppAccountPatch has a new optional parameter nfsV4IDDomain
  - Interface OperationListResult has a new optional parameter nextLink
  - Interface ReplicationObject has a new optional parameter destinationReplications
  - Added Enum KnownMultiAdStatus
  - Added Enum KnownReplicationType
    
    
## 21.4.0 (2025-02-17)
    
### Features Added

  - Added operation Accounts.beginChangeKeyVault
  - Added operation Accounts.beginChangeKeyVaultAndWait
  - Added operation Accounts.beginGetChangeKeyVaultInformation
  - Added operation Accounts.beginGetChangeKeyVaultInformationAndWait
  - Added operation Accounts.beginTransitionToCmk
  - Added operation Accounts.beginTransitionToCmkAndWait
  - Added Interface AccountsChangeKeyVaultHeaders
  - Added Interface AccountsChangeKeyVaultOptionalParams
  - Added Interface AccountsGetChangeKeyVaultInformationHeaders
  - Added Interface AccountsGetChangeKeyVaultInformationOptionalParams
  - Added Interface AccountsTransitionToCmkHeaders
  - Added Interface AccountsTransitionToCmkOptionalParams
  - Added Interface ChangeKeyVault
  - Added Interface EncryptionTransitionRequest
  - Added Interface GetKeyVaultStatusResponse
  - Added Interface KeyVaultPrivateEndpoint
  - Added Type Alias AccountsChangeKeyVaultResponse
  - Added Type Alias AccountsGetChangeKeyVaultInformationResponse
  - Added Type Alias AccountsTransitionToCmkResponse
  - Added Type Alias CoolAccessTieringPolicy
  - Interface Volume has a new optional parameter coolAccessTieringPolicy
  - Interface VolumeGroupVolumeProperties has a new optional parameter coolAccessTieringPolicy
  - Interface VolumePatch has a new optional parameter coolAccessTieringPolicy
  - Added Enum KnownCoolAccessTieringPolicy
    
    
## 21.4.0-beta.1 (2024-11-18)
Compared with version 21.3.0
    
### Features Added

  - Added operation Accounts.beginChangeKeyVault
  - Added operation Accounts.beginChangeKeyVaultAndWait
  - Added operation Accounts.beginGetChangeKeyVaultInformation
  - Added operation Accounts.beginGetChangeKeyVaultInformationAndWait
  - Added operation Accounts.beginTransitionToCmk
  - Added operation Accounts.beginTransitionToCmkAndWait
  - Added operation Volumes.beginListQuotaReport
  - Added operation Volumes.beginListQuotaReportAndWait
  - Added operation Volumes.beginSplitCloneFromParent
  - Added operation Volumes.beginSplitCloneFromParentAndWait
  - Added Interface AccountsChangeKeyVaultHeaders
  - Added Interface AccountsChangeKeyVaultOptionalParams
  - Added Interface AccountsGetChangeKeyVaultInformationHeaders
  - Added Interface AccountsGetChangeKeyVaultInformationOptionalParams
  - Added Interface AccountsTransitionToCmkHeaders
  - Added Interface AccountsTransitionToCmkOptionalParams
  - Added Interface ChangeKeyVault
  - Added Interface DestinationReplication
  - Added Interface EncryptionTransitionRequest
  - Added Interface KeyVaultPrivateEndpoint
  - Added Interface ListQuotaReportResponse
  - Added Interface QuotaReport
  - Added Interface VolumesListQuotaReportHeaders
  - Added Interface VolumesListQuotaReportOptionalParams
  - Added Interface VolumesSplitCloneFromParentHeaders
  - Added Interface VolumesSplitCloneFromParentOptionalParams
  - Added Type Alias AcceptGrowCapacityPoolForShortTermCloneSplit
  - Added Type Alias AccountsChangeKeyVaultResponse
  - Added Type Alias AccountsGetChangeKeyVaultInformationResponse
  - Added Type Alias AccountsTransitionToCmkResponse
  - Added Type Alias ReplicationType
  - Added Type Alias VolumeLanguage
  - Added Type Alias VolumesListQuotaReportResponse
  - Added Type Alias VolumesSplitCloneFromParentResponse
  - Interface Backup has a new optional parameter isLargeVolume
  - Interface CapacityPool has a new optional parameter customThroughputMibps
  - Interface CapacityPoolPatch has a new optional parameter customThroughputMibps
  - Interface EncryptionIdentity has a new optional parameter federatedClientId
  - Interface NetAppAccount has a new optional parameter isMultiAdEnabled
  - Interface NetAppAccount has a new optional parameter nfsV4IDDomain
  - Interface NetAppAccountPatch has a new optional parameter isMultiAdEnabled
  - Interface NetAppAccountPatch has a new optional parameter nfsV4IDDomain
  - Interface ReplicationObject has a new optional parameter destinationReplications
  - Interface Volume has a new optional parameter acceptGrowCapacityPoolForShortTermCloneSplit
  - Interface Volume has a new optional parameter inheritedSizeInBytes
  - Interface Volume has a new optional parameter language
  - Interface VolumeGroupVolumeProperties has a new optional parameter acceptGrowCapacityPoolForShortTermCloneSplit
  - Interface VolumeGroupVolumeProperties has a new optional parameter inheritedSizeInBytes
  - Interface VolumeGroupVolumeProperties has a new optional parameter language
  - Added Enum KnownAcceptGrowCapacityPoolForShortTermCloneSplit
  - Added Enum KnownReplicationType
  - Added Enum KnownVolumeLanguage
  - Enum KnownServiceLevel has a new value Flexible
    
    
## 21.3.0 (2024-10-24)
    
### Features Added

  - Added operation Volumes.beginAuthorizeExternalReplication
  - Added operation Volumes.beginAuthorizeExternalReplicationAndWait
  - Added operation Volumes.beginFinalizeExternalReplication
  - Added operation Volumes.beginFinalizeExternalReplicationAndWait
  - Added operation Volumes.beginPeerExternalCluster
  - Added operation Volumes.beginPeerExternalClusterAndWait
  - Added operation Volumes.beginPerformReplicationTransfer
  - Added operation Volumes.beginPerformReplicationTransferAndWait
  - Added Interface ClusterPeerCommandResponse
  - Added Interface PeerClusterForVolumeMigrationRequest
  - Added Interface RemotePath
  - Added Interface SvmPeerCommandResponse
  - Added Interface VolumesAuthorizeExternalReplicationHeaders
  - Added Interface VolumesAuthorizeExternalReplicationOptionalParams
  - Added Interface VolumesFinalizeExternalReplicationHeaders
  - Added Interface VolumesFinalizeExternalReplicationOptionalParams
  - Added Interface VolumesPeerExternalClusterHeaders
  - Added Interface VolumesPeerExternalClusterOptionalParams
  - Added Interface VolumesPerformReplicationTransferHeaders
  - Added Interface VolumesPerformReplicationTransferOptionalParams
  - Added Type Alias VolumesAuthorizeExternalReplicationResponse
  - Added Type Alias VolumesFinalizeExternalReplicationResponse
  - Added Type Alias VolumesPeerExternalClusterResponse
  - Added Type Alias VolumesPerformReplicationTransferResponse
  - Interface FilePathAvailabilityRequest has a new optional parameter availabilityZone
  - Interface NetAppResourceCheckFilePathAvailabilityOptionalParams has a new optional parameter availabilityZone
  - Interface ReplicationObject has a new optional parameter remotePath
  - Interface Volume has a new optional parameter effectiveNetworkFeatures
  - Interface VolumeGroupVolumeProperties has a new optional parameter effectiveNetworkFeatures
    
    
## 21.2.0 (2024-08-12)
    
### Features Added

  - Interface Replication has a new optional parameter replicationId
    
    
## 21.1.0 (2024-07-17)
    
### Features Added

  - Interface VolumePatch has a new optional parameter protocolTypes
    
    
## 21.0.0 (2024-05-14)
    
### Features Added

  - Added operation group BackupsUnderAccount
  - Added operation group BackupsUnderBackupVault
  - Added operation group BackupsUnderVolume
  - Added operation group BackupVaults
  - Added operation group NetAppResourceRegionInfos
  - Added operation Backups.beginCreate
  - Added operation Backups.beginCreateAndWait
  - Added operation Backups.beginDelete
  - Added operation Backups.beginDeleteAndWait
  - Added operation Backups.beginUpdate
  - Added operation Backups.beginUpdateAndWait
  - Added operation Backups.get
  - Added operation Backups.getLatestStatus
  - Added operation Backups.getVolumeLatestRestoreStatus
  - Added operation Backups.listByVault
  - Added Interface Backup
  - Added Interface BackupPatch
  - Added Interface BackupRestoreFiles
  - Added Interface BackupsCreateOptionalParams
  - Added Interface BackupsDeleteHeaders
  - Added Interface BackupsDeleteOptionalParams
  - Added Interface BackupsGetLatestStatusOptionalParams
  - Added Interface BackupsGetOptionalParams
  - Added Interface BackupsGetVolumeLatestRestoreStatusOptionalParams
  - Added Interface BackupsList
  - Added Interface BackupsListByVaultNextOptionalParams
  - Added Interface BackupsListByVaultOptionalParams
  - Added Interface BackupsMigrationRequest
  - Added Interface BackupStatus
  - Added Interface BackupsUnderAccountMigrateBackupsHeaders
  - Added Interface BackupsUnderAccountMigrateBackupsOptionalParams
  - Added Interface BackupsUnderBackupVaultRestoreFilesHeaders
  - Added Interface BackupsUnderBackupVaultRestoreFilesOptionalParams
  - Added Interface BackupsUnderVolumeMigrateBackupsHeaders
  - Added Interface BackupsUnderVolumeMigrateBackupsOptionalParams
  - Added Interface BackupsUpdateHeaders
  - Added Interface BackupsUpdateOptionalParams
  - Added Interface BackupVault
  - Added Interface BackupVaultPatch
  - Added Interface BackupVaultsCreateOrUpdateOptionalParams
  - Added Interface BackupVaultsDeleteHeaders
  - Added Interface BackupVaultsDeleteOptionalParams
  - Added Interface BackupVaultsGetOptionalParams
  - Added Interface BackupVaultsList
  - Added Interface BackupVaultsListByNetAppAccountNextOptionalParams
  - Added Interface BackupVaultsListByNetAppAccountOptionalParams
  - Added Interface BackupVaultsUpdateHeaders
  - Added Interface BackupVaultsUpdateOptionalParams
  - Added Interface NetAppResourceRegionInfosGetOptionalParams
  - Added Interface NetAppResourceRegionInfosListNextOptionalParams
  - Added Interface NetAppResourceRegionInfosListOptionalParams
  - Added Interface RegionInfoResource
  - Added Interface RegionInfosList
  - Added Interface VolumeBackupProperties
  - Added Type Alias BackupsCreateResponse
  - Added Type Alias BackupsDeleteResponse
  - Added Type Alias BackupsGetLatestStatusResponse
  - Added Type Alias BackupsGetResponse
  - Added Type Alias BackupsGetVolumeLatestRestoreStatusResponse
  - Added Type Alias BackupsListByVaultNextResponse
  - Added Type Alias BackupsListByVaultResponse
  - Added Type Alias BackupsUnderAccountMigrateBackupsResponse
  - Added Type Alias BackupsUnderBackupVaultRestoreFilesResponse
  - Added Type Alias BackupsUnderVolumeMigrateBackupsResponse
  - Added Type Alias BackupsUpdateResponse
  - Added Type Alias BackupType
  - Added Type Alias BackupVaultsCreateOrUpdateResponse
  - Added Type Alias BackupVaultsDeleteResponse
  - Added Type Alias BackupVaultsGetResponse
  - Added Type Alias BackupVaultsListByNetAppAccountNextResponse
  - Added Type Alias BackupVaultsListByNetAppAccountResponse
  - Added Type Alias BackupVaultsUpdateResponse
  - Added Type Alias NetAppResourceRegionInfosGetResponse
  - Added Type Alias NetAppResourceRegionInfosListNextResponse
  - Added Type Alias NetAppResourceRegionInfosListResponse
  - Interface VolumeBackups has a new optional parameter volumeResourceId
  - Interface VolumePatchPropertiesDataProtection has a new optional parameter backup
  - Interface VolumePropertiesDataProtection has a new optional parameter backup
  - Added Enum KnownBackupType

### Breaking Changes

  - Removed operation Backups.getVolumeRestoreStatus
    
    
## 20.0.0 (2024-03-05)
    
### Features Added

  - Added Interface VolumesResetCifsPasswordHeaders
  - Added Type Alias VolumesResetCifsPasswordResponse
  - Enum KnownRelationshipStatus has a new value Failed
  - Enum KnownRelationshipStatus has a new value Unknown

### Breaking Changes

  - Interface VolumeGroupMetaData no longer has parameter deploymentSpecId
  - Type of parameter userAssignedIdentities of interface ManagedServiceIdentity is changed from {
        [propertyName: string]: UserAssignedIdentity;
    } to {
        [propertyName: string]: UserAssignedIdentity | null;
    }
    
    
## 20.0.0-beta.1 (2023-12-14)
    
### Features Added

  - Added operation group AccountBackups
  - Added operation group BackupsUnderAccount
  - Added operation group BackupsUnderBackupVault
  - Added operation group BackupsUnderVolume
  - Added operation group BackupVaults
  - Added operation group NetAppResourceRegionInfos
  - Added operation Accounts.beginMigrateEncryptionKey
  - Added operation Accounts.beginMigrateEncryptionKeyAndWait
  - Added operation Backups.beginCreate
  - Added operation Backups.beginCreateAndWait
  - Added operation Backups.beginDelete
  - Added operation Backups.beginDeleteAndWait
  - Added operation Backups.beginUpdate
  - Added operation Backups.beginUpdateAndWait
  - Added operation Backups.get
  - Added operation Backups.getLatestStatus
  - Added operation Backups.listByVault
  - Added operation Volumes.beginSplitCloneFromParent
  - Added operation Volumes.beginSplitCloneFromParentAndWait
  - Added Interface AccountBackupsDeleteHeaders
  - Added Interface AccountBackupsDeleteOptionalParams
  - Added Interface AccountBackupsGetOptionalParams
  - Added Interface AccountBackupsListByNetAppAccountOptionalParams
  - Added Interface AccountsMigrateEncryptionKeyHeaders
  - Added Interface AccountsMigrateEncryptionKeyOptionalParams
  - Added Interface Backup
  - Added Interface BackupPatch
  - Added Interface BackupRestoreFiles
  - Added Interface BackupsCreateOptionalParams
  - Added Interface BackupsDeleteHeaders
  - Added Interface BackupsDeleteOptionalParams
  - Added Interface BackupsGetLatestStatusOptionalParams
  - Added Interface BackupsGetOptionalParams
  - Added Interface BackupsList
  - Added Interface BackupsListByVaultNextOptionalParams
  - Added Interface BackupsListByVaultOptionalParams
  - Added Interface BackupsMigrationRequest
  - Added Interface BackupStatus
  - Added Interface BackupsUnderAccountMigrateBackupsHeaders
  - Added Interface BackupsUnderAccountMigrateBackupsOptionalParams
  - Added Interface BackupsUnderBackupVaultRestoreFilesHeaders
  - Added Interface BackupsUnderBackupVaultRestoreFilesOptionalParams
  - Added Interface BackupsUnderVolumeMigrateBackupsHeaders
  - Added Interface BackupsUnderVolumeMigrateBackupsOptionalParams
  - Added Interface BackupsUpdateHeaders
  - Added Interface BackupsUpdateOptionalParams
  - Added Interface BackupVault
  - Added Interface BackupVaultPatch
  - Added Interface BackupVaultsCreateOrUpdateOptionalParams
  - Added Interface BackupVaultsDeleteHeaders
  - Added Interface BackupVaultsDeleteOptionalParams
  - Added Interface BackupVaultsGetOptionalParams
  - Added Interface BackupVaultsList
  - Added Interface BackupVaultsListByNetAppAccountNextOptionalParams
  - Added Interface BackupVaultsListByNetAppAccountOptionalParams
  - Added Interface BackupVaultsUpdateHeaders
  - Added Interface BackupVaultsUpdateOptionalParams
  - Added Interface EncryptionMigrationRequest
  - Added Interface NetAppResourceRegionInfosGetOptionalParams
  - Added Interface NetAppResourceRegionInfosListNextOptionalParams
  - Added Interface NetAppResourceRegionInfosListOptionalParams
  - Added Interface RegionInfoResource
  - Added Interface RegionInfosList
  - Added Interface RemotePath
  - Added Interface VolumeBackupProperties
  - Added Interface VolumesResetCifsPasswordHeaders
  - Added Interface VolumesSplitCloneFromParentHeaders
  - Added Interface VolumesSplitCloneFromParentOptionalParams
  - Added Type Alias AccountBackupsDeleteResponse
  - Added Type Alias AccountBackupsGetResponse
  - Added Type Alias AccountBackupsListByNetAppAccountResponse
  - Added Type Alias AccountsMigrateEncryptionKeyResponse
  - Added Type Alias BackupsCreateResponse
  - Added Type Alias BackupsDeleteResponse
  - Added Type Alias BackupsGetLatestStatusResponse
  - Added Type Alias BackupsGetResponse
  - Added Type Alias BackupsListByVaultNextResponse
  - Added Type Alias BackupsListByVaultResponse
  - Added Type Alias BackupsUnderAccountMigrateBackupsResponse
  - Added Type Alias BackupsUnderBackupVaultRestoreFilesResponse
  - Added Type Alias BackupsUnderVolumeMigrateBackupsResponse
  - Added Type Alias BackupsUpdateResponse
  - Added Type Alias BackupType
  - Added Type Alias BackupVaultsCreateOrUpdateResponse
  - Added Type Alias BackupVaultsDeleteResponse
  - Added Type Alias BackupVaultsGetResponse
  - Added Type Alias BackupVaultsListByNetAppAccountNextResponse
  - Added Type Alias BackupVaultsListByNetAppAccountResponse
  - Added Type Alias BackupVaultsUpdateResponse
  - Added Type Alias NetAppResourceRegionInfosGetResponse
  - Added Type Alias NetAppResourceRegionInfosListNextResponse
  - Added Type Alias NetAppResourceRegionInfosListResponse
  - Added Type Alias VolumesResetCifsPasswordResponse
  - Added Type Alias VolumesSplitCloneFromParentResponse
  - Interface NetAppAccount has a new optional parameter isMultiAdEnabled
  - Interface NetAppAccount has a new optional parameter nfsV4IDDomain
  - Interface NetAppAccountPatch has a new optional parameter isMultiAdEnabled
  - Interface NetAppAccountPatch has a new optional parameter nfsV4IDDomain
  - Interface ReplicationObject has a new optional parameter remotePath
  - Interface Volume has a new optional parameter inheritedSizeInBytes
  - Interface VolumeGroupVolumeProperties has a new optional parameter inheritedSizeInBytes
  - Interface VolumePatchPropertiesDataProtection has a new optional parameter backup
  - Interface VolumePropertiesDataProtection has a new optional parameter backup
  - Added Enum KnownBackupType

### Breaking Changes

  - Interface VolumeGroupMetaData no longer has parameter deploymentSpecId
  - Type of parameter userAssignedIdentities of interface ManagedServiceIdentity is changed from {
        [propertyName: string]: UserAssignedIdentity;
    } to {
        [propertyName: string]: UserAssignedIdentity | null;
    }
    
   
## 19.0.0 (2023-09-25)
    
### Features Added

  - Added operation NetAppResource.beginUpdateNetworkSiblingSet
  - Added operation NetAppResource.beginUpdateNetworkSiblingSetAndWait
  - Added operation NetAppResource.queryNetworkSiblingSet
  - Added operation Volumes.beginPopulateAvailabilityZone
  - Added operation Volumes.beginPopulateAvailabilityZoneAndWait
  - Added Interface NetAppResourceQueryNetworkSiblingSetOptionalParams
  - Added Interface NetAppResourceUpdateNetworkSiblingSetHeaders
  - Added Interface NetAppResourceUpdateNetworkSiblingSetOptionalParams
  - Added Interface NetworkSiblingSet
  - Added Interface NicInfo
  - Added Interface QueryNetworkSiblingSetRequest
  - Added Interface UpdateNetworkSiblingSetRequest
  - Added Interface VolumesPopulateAvailabilityZoneHeaders
  - Added Interface VolumesPopulateAvailabilityZoneOptionalParams
  - Added Type Alias CoolAccessRetrievalPolicy
  - Added Type Alias NetAppResourceQueryNetworkSiblingSetResponse
  - Added Type Alias NetAppResourceUpdateNetworkSiblingSetResponse
  - Added Type Alias NetworkSiblingSetProvisioningState
  - Added Type Alias VolumesPopulateAvailabilityZoneResponse
  - Interface Volume has a new optional parameter coolAccessRetrievalPolicy
  - Interface VolumeGroupVolumeProperties has a new optional parameter coolAccessRetrievalPolicy
  - Interface VolumeGroupVolumeProperties has a new optional parameter zones
  - Interface VolumePatch has a new optional parameter coolAccessRetrievalPolicy
  - Interface VolumePatch has a new optional parameter smbAccessBasedEnumeration
  - Interface VolumePatch has a new optional parameter smbNonBrowsable
  - Added Enum KnownCoolAccessRetrievalPolicy
  - Added Enum KnownNetworkSiblingSetProvisioningState
  - Enum KnownApplicationType has a new value Oracle
  - Enum KnownNetworkFeatures has a new value BasicStandard
  - Enum KnownNetworkFeatures has a new value StandardBasic

### Breaking Changes

  - Removed operation group AccountBackups
  - Removed operation Backups.beginCreate
  - Removed operation Backups.beginCreateAndWait
  - Removed operation Backups.beginDelete
  - Removed operation Backups.beginDeleteAndWait
  - Removed operation Backups.beginRestoreFiles
  - Removed operation Backups.beginRestoreFilesAndWait
  - Removed operation Backups.beginUpdate
  - Removed operation Backups.beginUpdateAndWait
  - Removed operation Backups.get
  - Removed operation Backups.getStatus
  - Removed operation Backups.list
  - Interface VolumePatchPropertiesDataProtection no longer has parameter backup
  - Interface VolumePropertiesDataProtection no longer has parameter backup
  - Class NetAppManagementClient no longer has parameter accountBackups
  - Removed Enum KnownBackupType
    
    
## 18.1.0 (2023-07-03)
    
### Features Added

  - Added operation Volumes.beginListGetGroupIdListForLdapUser
  - Added operation Volumes.beginListGetGroupIdListForLdapUserAndWait
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ErrorResponse
  - Added Interface GetGroupIdListForLdapUserRequest
  - Added Interface GetGroupIdListForLdapUserResponse
  - Added Interface VolumesListGetGroupIdListForLdapUserHeaders
  - Added Interface VolumesListGetGroupIdListForLdapUserOptionalParams
  - Added Type Alias VolumesListGetGroupIdListForLdapUserResponse
  - Interface NetAppAccountPatch has a new optional parameter identity
  - Interface Volume has a new optional parameter actualThroughputMibps
  - Interface Volume has a new optional parameter originatingResourceId
  - Interface VolumeGroupVolumeProperties has a new optional parameter actualThroughputMibps
  - Interface VolumeGroupVolumeProperties has a new optional parameter originatingResourceId
  - Interface VolumePatch has a new optional parameter snapshotDirectoryVisible
  - Enum KnownRegionStorageToNetworkProximity has a new value AcrossT2
  - Enum KnownRegionStorageToNetworkProximity has a new value T1AndAcrossT2
  - Enum KnownRegionStorageToNetworkProximity has a new value T1AndT2AndAcrossT2
  - Enum KnownRegionStorageToNetworkProximity has a new value T2AndAcrossT2
  - Enum KnownVolumeStorageToNetworkProximity has a new value AcrossT2
    
    
## 18.0.0 (2023-03-08)
    
### Features Added

  - Added operation Backups.beginRestoreFiles
  - Added operation Backups.beginRestoreFilesAndWait
  - Added operation Volumes.beginBreakFileLocks
  - Added operation Volumes.beginBreakFileLocksAndWait
  - Added Interface BackupRestoreFiles
  - Added Interface BackupsRestoreFilesHeaders
  - Added Interface BackupsRestoreFilesOptionalParams
  - Added Interface BreakFileLocksRequest
  - Added Interface ManagedServiceIdentity
  - Added Interface VolumesBreakFileLocksHeaders
  - Added Interface VolumesBreakFileLocksOptionalParams
  - Added Type Alias FileAccessLogs
  - Added Type Alias ManagedServiceIdentityType
  - Interface ActiveDirectory has a new optional parameter preferredServersForLdapClient
  - Interface Volume has a new optional parameter dataStoreResourceId
  - Interface Volume has a new optional parameter fileAccessLogs
  - Interface Volume has a new optional parameter isLargeVolume
  - Interface Volume has a new optional parameter provisionedAvailabilityZone
  - Interface VolumeGroupVolumeProperties has a new optional parameter dataStoreResourceId
  - Interface VolumeGroupVolumeProperties has a new optional parameter fileAccessLogs
  - Interface VolumeGroupVolumeProperties has a new optional parameter isLargeVolume
  - Interface VolumeGroupVolumeProperties has a new optional parameter provisionedAvailabilityZone
  - Interface VolumePropertiesDataProtection has a new optional parameter volumeRelocation
  - Interface VolumeQuotaRulePatch has a new optional parameter tags
  - Interface VolumeRelocationProperties has a new optional parameter readyToBeFinalized
  - Added Enum KnownFileAccessLogs
  - Added Enum KnownManagedServiceIdentityType

### Breaking Changes

  - Removed operation group Vaults
  - Operation NetAppResource.checkNameAvailability has a new signature
  - Operation NetAppResource.checkQuotaAvailability has a new signature
  - Interface Backup no longer has parameter id
  - Interface Backup no longer has parameter name
  - Interface Backup no longer has parameter type
  - Interface BackupPolicyDetails no longer has parameter id
  - Interface BackupPolicyDetails no longer has parameter name
  - Interface BackupPolicyDetails no longer has parameter type
  - Interface Snapshot no longer has parameter id
  - Interface Snapshot no longer has parameter name
  - Interface Snapshot no longer has parameter type
  - Interface VolumeBackupProperties no longer has parameter vaultId
  - Interface VolumeRelocationProperties no longer has parameter oldBareMetalTenantId
  - Interface VolumeRelocationProperties no longer has parameter oldVolumeId
  - Type of parameter identity of interface NetAppAccount is changed from Identity to ManagedServiceIdentity
  - Class NetAppManagementClient no longer has parameter vaults
  - Removed Enum KnownIdentityType
    
    
## 17.0.1 (2023-02-01)
    
### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy
    
## 17.0.0 (2022-09-21)
    
### Features Added

  - Added operation Accounts.beginRenewCredentials
  - Added operation Accounts.beginRenewCredentialsAndWait
  - Added operation NetAppResource.queryRegionInfo
  - Added Interface AccountsRenewCredentialsOptionalParams
  - Added Interface EncryptionIdentity
  - Added Interface Identity
  - Added Interface KeyVaultProperties
  - Added Interface NetAppResourceQueryRegionInfoOptionalParams
  - Added Interface RegionInfo
  - Added Interface RegionInfoAvailabilityZoneMappingsItem
  - Added Interface RelocateVolumeRequest
  - Added Interface UserAssignedIdentity
  - Added Type Alias IdentityType
  - Added Type Alias KeySource
  - Added Type Alias KeyVaultStatus
  - Added Type Alias NetAppResourceQueryRegionInfoResponse
  - Added Type Alias RegionStorageToNetworkProximity
  - Added Type Alias SmbAccessBasedEnumeration
  - Added Type Alias SmbNonBrowsable
  - Interface AccountEncryption has a new optional parameter identity
  - Interface AccountEncryption has a new optional parameter keyVaultProperties
  - Interface NetAppAccount has a new optional parameter disableShowmount
  - Interface NetAppAccount has a new optional parameter identity
  - Interface NetAppAccountPatch has a new optional parameter disableShowmount
  - Interface Volume has a new optional parameter deleteBaseSnapshot
  - Interface Volume has a new optional parameter smbAccessBasedEnumeration
  - Interface Volume has a new optional parameter smbNonBrowsable
  - Interface VolumeGroupVolumeProperties has a new optional parameter deleteBaseSnapshot
  - Interface VolumeGroupVolumeProperties has a new optional parameter smbAccessBasedEnumeration
  - Interface VolumeGroupVolumeProperties has a new optional parameter smbNonBrowsable
  - Interface VolumesRelocateOptionalParams has a new optional parameter body
  - Added Enum KnownIdentityType
  - Added Enum KnownKeySource
  - Added Enum KnownKeyVaultStatus
  - Added Enum KnownRegionStorageToNetworkProximity
  - Added Enum KnownSmbAccessBasedEnumeration
  - Added Enum KnownSmbNonBrowsable

### Breaking Changes

  - Interface Vault no longer has parameter location
    
    
## 16.1.0 (2022-07-21)
    
### Features Added

  - Added operation Volumes.beginReestablishReplication
  - Added operation Volumes.beginReestablishReplicationAndWait
  - Added Interface BackupPolicy
  - Added Interface CapacityPool
  - Added Interface NetAppAccount
  - Added Interface ProxyResource
  - Added Interface ReestablishReplicationRequest
  - Added Interface SnapshotPolicy
  - Added Interface SubscriptionQuotaItem
  - Added Interface SubvolumeInfo
  - Added Interface TrackedResource
  - Added Interface Volume
  - Added Interface VolumeQuotaRule
  - Added Interface VolumesReestablishReplicationOptionalParams
  - Interface CapacityPoolPatch has a new optional parameter coolAccess
  - Interface VolumeGroupVolumeProperties has a new optional parameter keyVaultPrivateEndpointResourceId
  - Interface VolumePatch has a new optional parameter coolAccess
  - Interface VolumePatch has a new optional parameter coolnessPeriod
  - Enum KnownEncryptionKeySource has a new value MicrosoftKeyVault
    
    
## 16.0.0 (2022-06-13)
    
### Features Added

  - Added operation group VolumeQuotaRules
  - Added operation Volumes.beginFinalizeRelocation
  - Added operation Volumes.beginFinalizeRelocationAndWait
  - Added operation Volumes.beginRelocate
  - Added operation Volumes.beginRelocateAndWait
  - Added operation Volumes.beginResetCifsPassword
  - Added operation Volumes.beginResetCifsPasswordAndWait
  - Added operation Volumes.beginRevertRelocation
  - Added operation Volumes.beginRevertRelocationAndWait
  - Added operation Volumes.listReplications
  - Added Interface ListReplications
  - Added Interface Replication
  - Added Interface VolumeQuotaRulePatch
  - Added Interface VolumeQuotaRulesCreateOptionalParams
  - Added Interface VolumeQuotaRulesDeleteOptionalParams
  - Added Interface VolumeQuotaRulesGetOptionalParams
  - Added Interface VolumeQuotaRulesList
  - Added Interface VolumeQuotaRulesListByVolumeOptionalParams
  - Added Interface VolumeQuotaRulesUpdateOptionalParams
  - Added Interface VolumeRelocationProperties
  - Added Interface VolumesFinalizeRelocationOptionalParams
  - Added Interface VolumesListReplicationsOptionalParams
  - Added Interface VolumesRelocateOptionalParams
  - Added Interface VolumesResetCifsPasswordOptionalParams
  - Added Interface VolumesRevertRelocationOptionalParams
  - Added Type Alias BackupPolicy
  - Added Type Alias CapacityPool
  - Added Type Alias EncryptionKeySource
  - Added Type Alias NetAppAccount
  - Added Type Alias ProvisioningState
  - Added Type Alias SnapshotPolicy
  - Added Type Alias TrackedResource
  - Added Type Alias Type
  - Added Type Alias Volume
  - Added Type Alias VolumeQuotaRule
  - Added Type Alias VolumeQuotaRulesCreateResponse
  - Added Type Alias VolumeQuotaRulesGetResponse
  - Added Type Alias VolumeQuotaRulesListByVolumeResponse
  - Added Type Alias VolumeQuotaRulesUpdateResponse
  - Added Type Alias VolumesListReplicationsResponse
  - Interface Resource has a new optional parameter systemData
  - Interface VolumeGroupVolumeProperties has a new optional parameter encrypted
  - Class NetAppManagementClient has a new parameter volumeQuotaRules
  - Added Enum KnownEncryptionKeySource
  - Added Enum KnownType

### Breaking Changes

  - Interface VolumeGroup no longer has parameter tags
  - Interface VolumeGroupDetails no longer has parameter tags
  - Type Alias SubscriptionQuotaItem no longer has parameter systemData
  - Type Alias SubvolumeInfo no longer has parameter systemData
    
## 15.1.1 (2022-04-27)

### Features Added

  - Bug fix

## 15.1.0 (2022-03-02)
    
### Features Added

  - Added operation group Subvolumes
  - Added operation Snapshots.beginRestoreFiles
  - Added operation Snapshots.beginRestoreFilesAndWait
  - Added Interface LdapSearchScopeOpt
  - Added Interface SnapshotRestoreFiles
  - Added Interface SnapshotsRestoreFilesOptionalParams
  - Added Interface SubvolumeModel
  - Added Interface SubvolumePatchRequest
  - Added Interface SubvolumesCreateOptionalParams
  - Added Interface SubvolumesDeleteOptionalParams
  - Added Interface SubvolumesGetMetadataOptionalParams
  - Added Interface SubvolumesGetOptionalParams
  - Added Interface SubvolumesList
  - Added Interface SubvolumesListByVolumeNextOptionalParams
  - Added Interface SubvolumesListByVolumeOptionalParams
  - Added Interface SubvolumesUpdateOptionalParams
  - Added Type Alias EnableSubvolumes
  - Added Type Alias SubvolumeInfo
  - Added Type Alias SubvolumesCreateResponse
  - Added Type Alias SubvolumesGetMetadataResponse
  - Added Type Alias SubvolumesGetResponse
  - Added Type Alias SubvolumesListByVolumeNextResponse
  - Added Type Alias SubvolumesListByVolumeResponse
  - Added Type Alias SubvolumesUpdateResponse
  - Interface ActiveDirectory has a new optional parameter ldapSearchScope
  - Interface BackupPolicy has a new optional parameter systemData
  - Interface CapacityPool has a new optional parameter systemData
  - Interface SnapshotPolicy has a new optional parameter systemData
  - Interface Volume has a new optional parameter enableSubvolumes
  - Interface Volume has a new optional parameter maximumNumberOfFiles
  - Interface Volume has a new optional parameter systemData
  - Interface VolumeGroupVolumeProperties has a new optional parameter enableSubvolumes
  - Interface VolumeGroupVolumeProperties has a new optional parameter maximumNumberOfFiles
  - Interface VolumePatch has a new optional parameter unixPermissions
  - Interface VolumesDeleteOptionalParams has a new optional parameter forceDelete
  - Class NetAppManagementClient has a new parameter subvolumes
  - Added Enum KnownEnableSubvolumes
    
    
## 15.0.0 (2022-01-20)

The package of @azure/arm-netapp is using our next generation design principles since version 15.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart ).
