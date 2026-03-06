# Release History

## 2.0.0 (2026-02-25)

### Features Added
  - Added operation ElasticSansOperations.create
  - Added operation ElasticSansOperations.delete
  - Added operation ElasticSansOperations.update
  - Added operation PrivateEndpointConnectionsOperations.create
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation VolumeGroupsOperations.create
  - Added operation VolumeGroupsOperations.delete
  - Added operation VolumeGroupsOperations.update
  - Added operation VolumesOperations.beginPreBackup
  - Added operation VolumesOperations.beginPreBackupAndWait
  - Added operation VolumesOperations.beginPreRestore
  - Added operation VolumesOperations.beginPreRestoreAndWait
  - Added operation VolumesOperations.create
  - Added operation VolumesOperations.delete
  - Added operation VolumesOperations.preBackup
  - Added operation VolumesOperations.preRestore
  - Added operation VolumesOperations.update
  - Added operation VolumeSnapshotsOperations.create
  - Added operation VolumeSnapshotsOperations.delete
  - Added Interface AutoScaleProperties
  - Added Interface DiskSnapshotList
  - Added Interface PagedAsyncIterableIterator
  - Added Interface PageSettings
  - Added Interface PreValidationResponse
  - Added Interface RestorePollerOptions
  - Added Interface ScaleUpProperties
  - Added Interface SimplePollerLike
  - Added Interface VolumeNameList
  - Added Interface VolumesPreBackupOptionalParams
  - Added Interface VolumesPreRestoreOptionalParams
  - Interface ElasticSanProperties has a new optional parameter autoScaleProperties
  - Interface ElasticSanUpdateProperties has a new optional parameter autoScaleProperties
  - Added Type Alias AutoScalePolicyEnforcement
  - Added Type Alias AzureSupportedClouds
  - Added Enum AzureClouds
  - Added Enum KnownAutoScalePolicyEnforcement
  - Added Enum KnownVersions
  - Enum KnownProvisioningStates has a new value Deleted
  - Enum KnownProvisioningStates has a new value Restoring

### Breaking Changes
  - Removed Interface ElasticSanList
  - Removed Interface SkuInformationList
  - Removed Interface SnapshotList
  - Removed Interface VolumeGroupList
  - Removed Interface VolumeList
  - Parameter value of interface PrivateLinkResourceListResult is now required

    
## 1.2.0-beta.2 (2025-04-18)
Compared with version 1.1.0
    
### Features Added

  - Added operation Volumes.beginPreBackup
  - Added operation Volumes.beginPreBackupAndWait
  - Added operation Volumes.beginPreRestore
  - Added operation Volumes.beginPreRestoreAndWait
  - Added Interface AutoScaleProperties
  - Added Interface DeleteRetentionPolicy
  - Added Interface DiskSnapshotList
  - Added Interface ElasticSanManagementRestoreVolumeHeaders
  - Added Interface PreValidationResponse
  - Added Interface RestoreVolumeOptionalParams
  - Added Interface ScaleUpProperties
  - Added Interface VolumeNameList
  - Added Interface VolumesPreBackupHeaders
  - Added Interface VolumesPreBackupOptionalParams
  - Added Interface VolumesPreRestoreHeaders
  - Added Interface VolumesPreRestoreOptionalParams
  - Added Type Alias AutoScalePolicyEnforcement
  - Added Type Alias DeleteType
  - Added Type Alias PolicyState
  - Added Type Alias RestoreVolumeResponse
  - Added Type Alias VolumesPreBackupResponse
  - Added Type Alias VolumesPreRestoreResponse
  - Added Type Alias XMsAccessSoftDeletedResources
  - Interface ElasticSanProperties has a new optional parameter autoScaleProperties
  - Interface ElasticSanUpdateProperties has a new optional parameter autoScaleProperties
  - Interface VolumeGroupProperties has a new optional parameter deleteRetentionPolicy
  - Interface VolumeGroupsListByElasticSanNextOptionalParams has a new optional parameter xMsAccessSoftDeletedResources
  - Interface VolumeGroupsListByElasticSanOptionalParams has a new optional parameter xMsAccessSoftDeletedResources
  - Interface VolumeGroupUpdateProperties has a new optional parameter deleteRetentionPolicy
  - Interface VolumesDeleteOptionalParams has a new optional parameter deleteType
  - Interface VolumesListByVolumeGroupNextOptionalParams has a new optional parameter xMsAccessSoftDeletedResources
  - Interface VolumesListByVolumeGroupOptionalParams has a new optional parameter xMsAccessSoftDeletedResources
  - Added Enum KnownAutoScalePolicyEnforcement
  - Added Enum KnownDeleteType
  - Added Enum KnownPolicyState
  - Added Enum KnownXMsAccessSoftDeletedResources
  - Enum KnownProvisioningStates has a new value Deleted
  - Enum KnownProvisioningStates has a new value Restoring
  - Enum KnownProvisioningStates has a new value SoftDeleting
    
    
## 1.2.0-beta.1 (2024-10-18)
Compared with version 1.1.0
    
### Features Added

  - Added Interface AutoScaleProperties
  - Added Interface ScaleUpProperties
  - Added Type Alias AutoScalePolicyEnforcement
  - Interface ElasticSanProperties has a new optional parameter autoScaleProperties
  - Interface ElasticSanUpdateProperties has a new optional parameter autoScaleProperties
  - Added Enum KnownAutoScalePolicyEnforcement
    
    
## 1.1.0 (2024-08-12)
    
### Features Added

  - Interface VolumeGroupProperties has a new optional parameter enforceDataIntegrityCheckForIscsi
  - Interface VolumeGroupUpdateProperties has a new optional parameter enforceDataIntegrityCheckForIscsi
    
    
## 1.0.0 (2024-01-19)

The package of @azure/arm-elasticsan is using our next generation design principles. To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
