# Release History

## 15.1.1 (Unreleased)

### Features Added

### Breaking Changes

### Bugs Fixed

### Other Changes

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
