# Release History
    
## 2.0.0-beta.1 (2025-07-16)
Compared with version 1.1.0
    
### Features Added
  - Added operation ElasticSansOperations.create
  - Added operation ElasticSansOperations.delete
  - Added operation ElasticSansOperations.update
  - Added operation PrivateEndpointConnectionsOperations.create
  - Added operation PrivateEndpointConnectionsOperations.delete
  - Added operation VolumeGroupsOperations.create
  - Added operation VolumeGroupsOperations.delete
  - Added operation VolumeGroupsOperations.update
  - Added operation VolumesOperations.create
  - Added operation VolumesOperations.delete
  - Added operation VolumesOperations.preBackup
  - Added operation VolumesOperations.preRestore
  - Added operation VolumesOperations.update
  - Added operation VolumeSnapshotsOperations.create
  - Added operation VolumeSnapshotsOperations.delete
  - Added Class ElasticSanClient
  - Added Interface AutoScaleProperties
  - Added Interface DeleteRetentionPolicy
  - Added Interface DiskSnapshotList
  - Added Interface ElasticSanClientOptionalParams
  - Added Interface PageSettings
  - Added Interface PreValidationResponse
  - Added Interface RestoreVolumeOptionalParams
  - Added Interface ScaleUpProperties
  - Added Interface VolumeNameList
  - Added Interface VolumesPreBackupOptionalParams
  - Added Interface VolumesPreRestoreOptionalParams
  - Interface ElasticSanProperties has a new optional parameter autoScaleProperties
  - Interface ElasticSanUpdateProperties has a new optional parameter autoScaleProperties
  - Interface VolumeGroupProperties has a new optional parameter deleteRetentionPolicy
  - Interface VolumeGroupsListByElasticSanOptionalParams has a new optional parameter xMsAccessSoftDeletedResources
  - Interface VolumeGroupUpdateProperties has a new optional parameter deleteRetentionPolicy
  - Interface VolumesDeleteOptionalParams has a new optional parameter deleteType
  - Interface VolumesListByVolumeGroupOptionalParams has a new optional parameter xMsAccessSoftDeletedResources
  - Added Type Alias AutoScalePolicyEnforcement
  - Added Type Alias DeleteType
  - Added Type Alias PolicyState
  - Added Type Alias XMsAccessSoftDeletedResources
  - Added Enum KnownAutoScalePolicyEnforcement
  - Added Enum KnownDeleteType
  - Added Enum KnownPolicyState
  - Added Enum KnownVersions
  - Added Enum KnownXMsAccessSoftDeletedResources
  - Enum KnownProvisioningStates has a new value Deleted
  - Enum KnownProvisioningStates has a new value Restoring
  - Enum KnownProvisioningStates has a new value SoftDeleting
### Breaking Changes
  - Removed operation ElasticSans.beginCreate
  - Removed operation ElasticSans.beginCreateAndWait
  - Removed operation ElasticSans.beginDelete
  - Removed operation ElasticSans.beginDeleteAndWait
  - Removed operation ElasticSans.beginUpdate
  - Removed operation ElasticSans.beginUpdateAndWait
  - Removed operation PrivateEndpointConnections.beginCreate
  - Removed operation PrivateEndpointConnections.beginCreateAndWait
  - Removed operation PrivateEndpointConnections.beginDelete
  - Removed operation PrivateEndpointConnections.beginDeleteAndWait
  - Removed operation VolumeGroups.beginCreate
  - Removed operation VolumeGroups.beginCreateAndWait
  - Removed operation VolumeGroups.beginDelete
  - Removed operation VolumeGroups.beginDeleteAndWait
  - Removed operation VolumeGroups.beginUpdate
  - Removed operation VolumeGroups.beginUpdateAndWait
  - Removed operation Volumes.beginCreate
  - Removed operation Volumes.beginCreateAndWait
  - Removed operation Volumes.beginDelete
  - Removed operation Volumes.beginDeleteAndWait
  - Removed operation Volumes.beginUpdate
  - Removed operation Volumes.beginUpdateAndWait
  - Removed operation VolumeSnapshots.beginCreate
  - Removed operation VolumeSnapshots.beginCreateAndWait
  - Removed operation VolumeSnapshots.beginDelete
  - Removed operation VolumeSnapshots.beginDeleteAndWait
  - Deleted Class ElasticSanManagement
  - Removed Interface ElasticSanList
  - Removed Interface ElasticSanManagementOptionalParams
  - Removed Interface ElasticSansDeleteHeaders
  - Removed Interface ElasticSansUpdateHeaders
  - Removed Interface OperationListResult
  - Removed Interface PrivateEndpointConnectionListResult
  - Removed Interface PrivateEndpointConnectionsDeleteHeaders
  - Removed Interface SkuInformationList
  - Removed Interface SnapshotList
  - Removed Interface VolumeGroupList
  - Removed Interface VolumeGroupsDeleteHeaders
  - Removed Interface VolumeGroupsUpdateHeaders
  - Removed Interface VolumeList
  - Removed Interface VolumesDeleteHeaders
  - Removed Interface VolumeSnapshotsDeleteHeaders
  - Removed Interface VolumesUpdateHeaders
  - Type of parameter info of interface ErrorAdditionalInfo is changed from Record<string, unknown> to any
  - Interface ElasticSansCreateOptionalParams no longer has parameter resumeFrom
  - Interface ElasticSansDeleteOptionalParams no longer has parameter resumeFrom
  - Interface ElasticSansUpdateOptionalParams no longer has parameter resumeFrom
  - Interface PrivateEndpointConnectionsCreateOptionalParams no longer has parameter resumeFrom
  - Interface PrivateEndpointConnectionsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface VolumeGroupsCreateOptionalParams no longer has parameter resumeFrom
  - Interface VolumeGroupsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface VolumeGroupsUpdateOptionalParams no longer has parameter resumeFrom
  - Interface VolumesCreateOptionalParams no longer has parameter resumeFrom
  - Interface VolumesDeleteOptionalParams no longer has parameter resumeFrom
  - Interface VolumeSnapshotsCreateOptionalParams no longer has parameter resumeFrom
  - Interface VolumeSnapshotsDeleteOptionalParams no longer has parameter resumeFrom
  - Interface VolumesUpdateOptionalParams no longer has parameter resumeFrom
  - Parameter value of interface PrivateLinkResourceListResult is now required
  - Removed Type Alias ElasticSansCreateResponse
  - Removed Type Alias ElasticSansGetResponse
  - Removed Type Alias ElasticSansListByResourceGroupNextResponse
  - Removed Type Alias ElasticSansListByResourceGroupResponse
  - Removed Type Alias ElasticSansListBySubscriptionNextResponse
  - Removed Type Alias ElasticSansListBySubscriptionResponse
  - Removed Type Alias ElasticSansUpdateResponse
  - Removed Type Alias OperationsListResponse
  - Removed Type Alias PrivateEndpointConnectionsCreateResponse
  - Removed Type Alias PrivateEndpointConnectionsGetResponse
  - Removed Type Alias PrivateEndpointConnectionsListResponse
  - Removed Type Alias PrivateLinkResourcesListByElasticSanResponse
  - Removed Type Alias SkusListResponse
  - Removed Type Alias VolumeGroupsCreateResponse
  - Removed Type Alias VolumeGroupsGetResponse
  - Removed Type Alias VolumeGroupsListByElasticSanNextResponse
  - Removed Type Alias VolumeGroupsListByElasticSanResponse
  - Removed Type Alias VolumeGroupsUpdateResponse
  - Removed Type Alias VolumesCreateResponse
  - Removed Type Alias VolumesGetResponse
  - Removed Type Alias VolumesListByVolumeGroupNextResponse
  - Removed Type Alias VolumesListByVolumeGroupResponse
  - Removed Type Alias VolumeSnapshotsCreateResponse
  - Removed Type Alias VolumeSnapshotsGetResponse
  - Removed Type Alias VolumeSnapshotsListByVolumeGroupNextResponse
  - Removed Type Alias VolumeSnapshotsListByVolumeGroupResponse
  - Removed Type Alias VolumesUpdateResponse
  - Removed function getContinuationToken

    
    
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
