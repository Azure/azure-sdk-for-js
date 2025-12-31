# Release History

## 8.1.0 (2025-09-26)

### Features Added
  - Added operation group AutoExportJobs
  - Added operation group AutoImportJobs
  - Added Interface AutoExportJob
  - Added Interface AutoExportJobsCreateOrUpdateHeaders
  - Added Interface AutoExportJobsCreateOrUpdateOptionalParams
  - Added Interface AutoExportJobsDeleteHeaders
  - Added Interface AutoExportJobsDeleteOptionalParams
  - Added Interface AutoExportJobsGetOptionalParams
  - Added Interface AutoExportJobsListByAmlFilesystemOptionalParams
  - Added Interface AutoExportJobsListResult
  - Added Interface AutoExportJobsUpdateHeaders
  - Added Interface AutoExportJobsUpdateOptionalParams
  - Added Interface AutoExportJobUpdate
  - Added Interface AutoImportJob
  - Added Interface AutoImportJobPropertiesStatusBlobSyncEvents
  - Added Interface AutoImportJobsCreateOrUpdateHeaders
  - Added Interface AutoImportJobsCreateOrUpdateOptionalParams
  - Added Interface AutoImportJobsDeleteHeaders
  - Added Interface AutoImportJobsDeleteOptionalParams
  - Added Interface AutoImportJobsGetOptionalParams
  - Added Interface AutoImportJobsListByAmlFilesystemOptionalParams
  - Added Interface AutoImportJobsListResult
  - Added Interface AutoImportJobsUpdateHeaders
  - Added Interface AutoImportJobsUpdateOptionalParams
  - Added Interface AutoImportJobUpdate
  - Added Interface Cache
  - Interface ImportJob has a new optional parameter adminStatus
  - Interface ImportJob has a new optional parameter importedDirectories
  - Interface ImportJob has a new optional parameter importedFiles
  - Interface ImportJob has a new optional parameter importedSymlinks
  - Interface ImportJob has a new optional parameter preexistingDirectories
  - Interface ImportJob has a new optional parameter preexistingFiles
  - Interface ImportJob has a new optional parameter preexistingSymlinks
  - Interface ImportJobUpdate has a new optional parameter adminStatus
  - Added Type Alias AutoExportJobAdminStatus
  - Added Type Alias AutoExportJobProvisioningStateType
  - Added Type Alias AutoExportJobsCreateOrUpdateResponse
  - Added Type Alias AutoExportJobsDeleteResponse
  - Added Type Alias AutoExportJobsGetResponse
  - Added Type Alias AutoExportJobsListByAmlFilesystemNextResponse
  - Added Type Alias AutoExportJobsListByAmlFilesystemResponse
  - Added Type Alias AutoExportJobsUpdateResponse
  - Added Type Alias AutoExportStatusType
  - Added Type Alias AutoImportJobPropertiesAdminStatus
  - Added Type Alias AutoImportJobPropertiesProvisioningState
  - Added Type Alias AutoImportJobsCreateOrUpdateResponse
  - Added Type Alias AutoImportJobsDeleteResponse
  - Added Type Alias AutoImportJobsGetResponse
  - Added Type Alias AutoImportJobsListByAmlFilesystemNextResponse
  - Added Type Alias AutoImportJobsListByAmlFilesystemResponse
  - Added Type Alias AutoImportJobState
  - Added Type Alias AutoImportJobsUpdateResponse
  - Added Type Alias AutoImportJobUpdatePropertiesAdminStatus
  - Added Type Alias ImportJobAdminStatus
  - Added Enum KnownAutoExportJobAdminStatus
  - Added Enum KnownAutoExportJobProvisioningStateType
  - Added Enum KnownAutoExportStatusType
  - Added Enum KnownAutoImportJobPropertiesAdminStatus
  - Added Enum KnownAutoImportJobPropertiesProvisioningState
  - Added Enum KnownAutoImportJobState
  - Added Enum KnownAutoImportJobUpdatePropertiesAdminStatus
  - Added Enum KnownImportJobAdminStatus


## 8.0.1 (2025-08-21)

### Other Changes

  - Other fixes

## 8.0.0 (2024-05-13)
    
### Features Added

  - Added operation group ImportJobs
  - Added Interface AmlFilesystemRootSquashSettings
  - Added Interface AscOperationErrorResponse
  - Added Interface ErrorAdditionalInfo
  - Added Interface ErrorDetail
  - Added Interface ImportJob
  - Added Interface ImportJobsCreateOrUpdateHeaders
  - Added Interface ImportJobsCreateOrUpdateOptionalParams
  - Added Interface ImportJobsDeleteHeaders
  - Added Interface ImportJobsDeleteOptionalParams
  - Added Interface ImportJobsGetOptionalParams
  - Added Interface ImportJobsListByAmlFilesystemNextOptionalParams
  - Added Interface ImportJobsListByAmlFilesystemOptionalParams
  - Added Interface ImportJobsListResult
  - Added Interface ImportJobsUpdateHeaders
  - Added Interface ImportJobsUpdateOptionalParams
  - Added Interface ImportJobUpdate
  - Added Type Alias AmlFilesystemSquashMode
  - Added Type Alias ConflictResolutionMode
  - Added Type Alias ImportJobProvisioningStateType
  - Added Type Alias ImportJobsCreateOrUpdateResponse
  - Added Type Alias ImportJobsDeleteResponse
  - Added Type Alias ImportJobsGetResponse
  - Added Type Alias ImportJobsListByAmlFilesystemNextResponse
  - Added Type Alias ImportJobsListByAmlFilesystemResponse
  - Added Type Alias ImportJobsUpdateResponse
  - Added Type Alias ImportStatusType
  - Interface AmlFilesystem has a new optional parameter rootSquashSettings
  - Interface AmlFilesystemHsmSettings has a new optional parameter importPrefixesInitial
  - Interface AmlFilesystemUpdate has a new optional parameter rootSquashSettings
  - Interface ErrorResponse has a new optional parameter error
  - Added Enum KnownAmlFilesystemSquashMode
  - Added Enum KnownConflictResolutionMode
  - Added Enum KnownImportJobProvisioningStateType
  - Added Enum KnownImportStatusType

### Breaking Changes

  - Interface ErrorResponse no longer has parameter code
  - Interface ErrorResponse no longer has parameter message
  - Type of parameter error of interface AscOperation is changed from ErrorResponse to AscOperationErrorResponse
    
    
## 7.1.0-beta.1 (2024-02-01)
    
### Features Added

  - Added Interface AmlFilesystemRootSquashSettings
  - Added Type Alias AmlFilesystemSquashMode
  - Interface AmlFilesystem has a new optional parameter rootSquashSettings
  - Interface AmlFilesystemUpdate has a new optional parameter rootSquashSettings
  - Added Enum KnownAmlFilesystemSquashMode
    
    
## 7.0.0 (2023-06-09)
    
### Features Added

  - Added operation group AmlFilesystems
  - Added Interface AmlFilesystem
  - Added Interface AmlFilesystemArchive
  - Added Interface AmlFilesystemArchiveInfo
  - Added Interface AmlFilesystemArchiveStatus
  - Added Interface AmlFilesystemCheckSubnetError
  - Added Interface AmlFilesystemCheckSubnetErrorFilesystemSubnet
  - Added Interface AmlFilesystemClientInfo
  - Added Interface AmlFilesystemContainerStorageInterface
  - Added Interface AmlFilesystemEncryptionSettings
  - Added Interface AmlFilesystemHealth
  - Added Interface AmlFilesystemHsmSettings
  - Added Interface AmlFilesystemIdentity
  - Added Interface AmlFilesystemPropertiesHsm
  - Added Interface AmlFilesystemPropertiesMaintenanceWindow
  - Added Interface AmlFilesystemsArchiveOptionalParams
  - Added Interface AmlFilesystemsCancelArchiveOptionalParams
  - Added Interface AmlFilesystemsCreateOrUpdateHeaders
  - Added Interface AmlFilesystemsCreateOrUpdateOptionalParams
  - Added Interface AmlFilesystemsDeleteHeaders
  - Added Interface AmlFilesystemsDeleteOptionalParams
  - Added Interface AmlFilesystemsGetOptionalParams
  - Added Interface AmlFilesystemsListByResourceGroupNextOptionalParams
  - Added Interface AmlFilesystemsListByResourceGroupOptionalParams
  - Added Interface AmlFilesystemsListNextOptionalParams
  - Added Interface AmlFilesystemsListOptionalParams
  - Added Interface AmlFilesystemsListResult
  - Added Interface AmlFilesystemSubnetInfo
  - Added Interface AmlFilesystemsUpdateHeaders
  - Added Interface AmlFilesystemsUpdateOptionalParams
  - Added Interface AmlFilesystemUpdate
  - Added Interface AmlFilesystemUpdatePropertiesMaintenanceWindow
  - Added Interface CheckAmlFSSubnetsOptionalParams
  - Added Interface GetRequiredAmlFSSubnetsSizeOptionalParams
  - Added Interface RequiredAmlFilesystemSubnetsSize
  - Added Interface RequiredAmlFilesystemSubnetsSizeInfo
  - Added Interface Resource
  - Added Interface SkuName
  - Added Interface TrackedResource
  - Added Type Alias AmlFilesystemHealthStateType
  - Added Type Alias AmlFilesystemIdentityType
  - Added Type Alias AmlFilesystemProvisioningStateType
  - Added Type Alias AmlFilesystemsCreateOrUpdateResponse
  - Added Type Alias AmlFilesystemsGetResponse
  - Added Type Alias AmlFilesystemsListByResourceGroupNextResponse
  - Added Type Alias AmlFilesystemsListByResourceGroupResponse
  - Added Type Alias AmlFilesystemsListNextResponse
  - Added Type Alias AmlFilesystemsListResponse
  - Added Type Alias AmlFilesystemsUpdateResponse
  - Added Type Alias ArchiveStatusType
  - Added Type Alias FilesystemSubnetStatusType
  - Added Type Alias GetRequiredAmlFSSubnetsSizeResponse
  - Added Type Alias MaintenanceDayOfWeekType
  - Added Enum KnownAmlFilesystemHealthStateType
  - Added Enum KnownAmlFilesystemProvisioningStateType
  - Added Enum KnownArchiveStatusType
  - Added Enum KnownFilesystemSubnetStatusType
  - Enum KnownProvisioningStateType has a new value Canceled

### Breaking Changes

  - Remove interface UserAssignedIdentitiesValueAutoGenerated
  - Enum KnownProvisioningStateType no longer has value Cancelled
    
    
## 6.0.0 (2023-02-10)
    
### Features Added

  - Added operation Caches.beginUpdate
  - Added operation Caches.beginUpdateAndWait
  - Added operation StorageTargets.beginRestoreDefaults
  - Added operation StorageTargets.beginRestoreDefaultsAndWait
  - Added Interface CachesDebugInfoHeaders
  - Added Interface CachesDeleteHeaders
  - Added Interface CachesFlushHeaders
  - Added Interface CachesStartHeaders
  - Added Interface CachesStopHeaders
  - Added Interface CachesUpdateHeaders
  - Added Interface CachesUpgradeFirmwareHeaders
  - Added Interface StorageTargetFlushHeaders
  - Added Interface StorageTargetInvalidateHeaders
  - Added Interface StorageTargetResumeHeaders
  - Added Interface StorageTargetsDeleteHeaders
  - Added Interface StorageTargetsDnsRefreshHeaders
  - Added Interface StorageTargetsRestoreDefaultsHeaders
  - Added Interface StorageTargetsRestoreDefaultsOptionalParams
  - Added Interface StorageTargetSuspendHeaders
  - Interface BlobNfsTarget has a new optional parameter verificationTimer
  - Interface BlobNfsTarget has a new optional parameter writeBackTimer
  - Interface CachesUpdateOptionalParams has a new optional parameter resumeFrom
  - Interface CachesUpdateOptionalParams has a new optional parameter updateIntervalInMs
  - Interface Nfs3Target has a new optional parameter verificationTimer
  - Interface Nfs3Target has a new optional parameter writeBackTimer
  - Interface CachesCreateOrUpdateOptionalParams no longer has parameter cache
  - Interface StorageTargetsCreateOrUpdateOptionalParams no longer has parameter storagetarget

### Breaking Changes

  - Removed operation Caches.update
  - Operation Caches.beginCreateOrUpdate has a new signature
  - Operation Caches.beginCreateOrUpdateAndWait has a new signature
  - Operation StorageTargets.beginCreateOrUpdate has a new signature
  - Operation StorageTargets.beginCreateOrUpdateAndWait has a new signature
    
## 5.2.1 (2023-02-02)

### Features Added

  - Exposes `getContinuationToken` helper function to extract continuation token

### Bugs Fixed

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 5.2.0 (2022-07-15)
    
### Features Added

  - Added operation Caches.beginPausePrimingJob
  - Added operation Caches.beginPausePrimingJobAndWait
  - Added operation Caches.beginResumePrimingJob
  - Added operation Caches.beginResumePrimingJobAndWait
  - Added operation Caches.beginSpaceAllocation
  - Added operation Caches.beginSpaceAllocationAndWait
  - Added operation Caches.beginStartPrimingJob
  - Added operation Caches.beginStartPrimingJobAndWait
  - Added operation Caches.beginStopPrimingJob
  - Added operation Caches.beginStopPrimingJobAndWait
  - Added Interface CachesPausePrimingJobHeaders
  - Added Interface CachesPausePrimingJobOptionalParams
  - Added Interface CachesResumePrimingJobHeaders
  - Added Interface CachesResumePrimingJobOptionalParams
  - Added Interface CachesSpaceAllocationHeaders
  - Added Interface CachesSpaceAllocationOptionalParams
  - Added Interface CachesStartPrimingJobHeaders
  - Added Interface CachesStartPrimingJobOptionalParams
  - Added Interface CachesStopPrimingJobHeaders
  - Added Interface CachesStopPrimingJobOptionalParams
  - Added Interface CacheUpgradeSettings
  - Added Interface LogSpecification
  - Added Interface PrimingJob
  - Added Interface PrimingJobIdParameter
  - Added Interface StorageTarget
  - Added Interface StorageTargetSpaceAllocation
  - Added Type Alias CachesPausePrimingJobResponse
  - Added Type Alias CachesResumePrimingJobResponse
  - Added Type Alias CachesSpaceAllocationResponse
  - Added Type Alias CachesStartPrimingJobResponse
  - Added Type Alias CachesStopPrimingJobResponse
  - Added Type Alias PrimingJobState
  - Interface ApiOperationPropertiesServiceSpecification has a new optional parameter logSpecifications
  - Interface Cache_2 has a new optional parameter primingJobs
  - Interface Cache_2 has a new optional parameter spaceAllocation
  - Interface Cache_2 has a new optional parameter upgradeSettings
  - Added Enum KnownPrimingJobState
  - Enum KnownHealthStateType has a new value StartFailed
  - Enum KnownHealthStateType has a new value UpgradeFailed
  - Enum KnownHealthStateType has a new value WaitingForKey
    
    
## 5.1.0 (2022-03-15)
    
### Features Added

  - Added operation group AscUsages
  - Added operation StorageTargetOperations.beginInvalidate
  - Added operation StorageTargetOperations.beginInvalidateAndWait
  - Added Interface AscUsagesListNextOptionalParams
  - Added Interface AscUsagesListOptionalParams
  - Added Interface ResourceUsage
  - Added Interface ResourceUsageName
  - Added Interface ResourceUsagesListResult
  - Added Interface StorageTargetInvalidateOptionalParams
  - Added Type Alias AscUsagesListNextResponse
  - Added Type Alias AscUsagesListResponse
  - Interface Cache_2 has a new optional parameter zones
  - Class StorageCacheManagementClient has a new parameter ascUsages
    
    
## 5.0.0 (2022-01-21)

The package of @azure/arm-storagecache is using our next generation design principles since version 5.0.0, which contains breaking changes.

To understand the detail of the change, please refer to [Changelog](https://aka.ms/js-track2-changelog).

To migrate the existing applications to the latest version, please refer to [Migration Guide](https://aka.ms/js-track2-migration-guide).

To learn more, please refer to our documentation [Quick Start](https://aka.ms/azsdk/js/mgmt/quickstart).
