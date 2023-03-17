# Release History
    
## 6.0.0 (2023-02-10)
    
**Features**

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

**Breaking Changes**

  - Removed operation Caches.update
  - Operation Caches.beginCreateOrUpdate has a new signature
  - Operation Caches.beginCreateOrUpdateAndWait has a new signature
  - Operation StorageTargets.beginCreateOrUpdate has a new signature
  - Operation StorageTargets.beginCreateOrUpdateAndWait has a new signature
    
## 5.2.1 (2023-02-02)

**Features**

  - Exposes `getContinuationToken` helper function to extract continuation token

**Bugs Fixed**

  - A series of small bug fixs relevant to authentication and apiVersion policy

## 5.2.0 (2022-07-15)
    
**Features**

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
    
**Features**

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

To learn more, please refer to our documentation [Quick Start](https://aka.ms/js-track2-quickstart).
