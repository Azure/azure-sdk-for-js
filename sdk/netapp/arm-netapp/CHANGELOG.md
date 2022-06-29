# Release History

## 16.0.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

## 16.0.0 (2022-06-13)
    
**Features**

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

**Breaking Changes**

  - Interface VolumeGroup no longer has parameter tags
  - Interface VolumeGroupDetails no longer has parameter tags
  - Type Alias SubscriptionQuotaItem no longer has parameter systemData
  - Type Alias SubvolumeInfo no longer has parameter systemData
    
## 15.1.1 (2022-04-27)

**Features**

  - Bug fix

## 15.1.0 (2022-03-02)
    
**Features**

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
