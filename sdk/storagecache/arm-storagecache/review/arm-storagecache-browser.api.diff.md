# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -599,9 +599,9 @@
     writeBackTimer?: number;
 }
 
 // @public
-export interface Cache extends ProxyResource {
+interface Cache_2 extends ProxyResource {
     cacheSizeGB?: number;
     directoryServicesSettings?: CacheDirectorySettings;
     encryptionSettings?: CacheEncryptionSettings;
     readonly health?: CacheHealth;
@@ -619,8 +619,9 @@
     upgradeSettings?: CacheUpgradeSettings;
     readonly upgradeStatus?: CacheUpgradeStatus;
     zones?: string[];
 }
+export { Cache_2 as Cache }
 
 // @public
 export interface CacheActiveDirectorySettings {
     cacheNetBiosName: string;
@@ -739,11 +740,11 @@
 
 // @public
 export interface CachesOperations {
     // @deprecated (undocumented)
-    beginCreateOrUpdate: (resourceGroupName: string, cacheName: string, cache: Cache, options?: CachesCreateOrUpdateOptionalParams) => Promise<SimplePollerLike<OperationState<Cache>, Cache>>;
+    beginCreateOrUpdate: (resourceGroupName: string, cacheName: string, cache: Cache_2, options?: CachesCreateOrUpdateOptionalParams) => Promise<SimplePollerLike<OperationState<Cache_2>, Cache_2>>;
     // @deprecated (undocumented)
-    beginCreateOrUpdateAndWait: (resourceGroupName: string, cacheName: string, cache: Cache, options?: CachesCreateOrUpdateOptionalParams) => Promise<Cache>;
+    beginCreateOrUpdateAndWait: (resourceGroupName: string, cacheName: string, cache: Cache_2, options?: CachesCreateOrUpdateOptionalParams) => Promise<Cache_2>;
     // @deprecated (undocumented)
     beginDebugInfo: (resourceGroupName: string, cacheName: string, options?: CachesDebugInfoOptionalParams) => Promise<SimplePollerLike<OperationState<void>, void>>;
     // @deprecated (undocumented)
     beginDebugInfoAndWait: (resourceGroupName: string, cacheName: string, options?: CachesDebugInfoOptionalParams) => Promise<void>;
@@ -783,30 +784,30 @@
     beginStopPrimingJob: (resourceGroupName: string, cacheName: string, options?: CachesStopPrimingJobOptionalParams) => Promise<SimplePollerLike<OperationState<void>, void>>;
     // @deprecated (undocumented)
     beginStopPrimingJobAndWait: (resourceGroupName: string, cacheName: string, options?: CachesStopPrimingJobOptionalParams) => Promise<void>;
     // @deprecated (undocumented)
-    beginUpdate: (resourceGroupName: string, cacheName: string, options?: CachesUpdateOptionalParams) => Promise<SimplePollerLike<OperationState<Cache>, Cache>>;
+    beginUpdate: (resourceGroupName: string, cacheName: string, options?: CachesUpdateOptionalParams) => Promise<SimplePollerLike<OperationState<Cache_2>, Cache_2>>;
     // @deprecated (undocumented)
-    beginUpdateAndWait: (resourceGroupName: string, cacheName: string, options?: CachesUpdateOptionalParams) => Promise<Cache>;
+    beginUpdateAndWait: (resourceGroupName: string, cacheName: string, options?: CachesUpdateOptionalParams) => Promise<Cache_2>;
     // @deprecated (undocumented)
     beginUpgradeFirmware: (resourceGroupName: string, cacheName: string, options?: CachesUpgradeFirmwareOptionalParams) => Promise<SimplePollerLike<OperationState<void>, void>>;
     // @deprecated (undocumented)
     beginUpgradeFirmwareAndWait: (resourceGroupName: string, cacheName: string, options?: CachesUpgradeFirmwareOptionalParams) => Promise<void>;
-    createOrUpdate: (resourceGroupName: string, cacheName: string, cache: Cache, options?: CachesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Cache>, Cache>;
+    createOrUpdate: (resourceGroupName: string, cacheName: string, cache: Cache_2, options?: CachesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Cache_2>, Cache_2>;
     debugInfo: (resourceGroupName: string, cacheName: string, options?: CachesDebugInfoOptionalParams) => PollerLike<OperationState<void>, void>;
     delete: (resourceGroupName: string, cacheName: string, options?: CachesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
     flush: (resourceGroupName: string, cacheName: string, options?: CachesFlushOptionalParams) => PollerLike<OperationState<void>, void>;
-    get: (resourceGroupName: string, cacheName: string, options?: CachesGetOptionalParams) => Promise<Cache>;
-    list: (options?: CachesListOptionalParams) => PagedAsyncIterableIterator<Cache>;
-    listByResourceGroup: (resourceGroupName: string, options?: CachesListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<Cache>;
+    get: (resourceGroupName: string, cacheName: string, options?: CachesGetOptionalParams) => Promise<Cache_2>;
+    list: (options?: CachesListOptionalParams) => PagedAsyncIterableIterator<Cache_2>;
+    listByResourceGroup: (resourceGroupName: string, options?: CachesListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<Cache_2>;
     pausePrimingJob: (resourceGroupName: string, cacheName: string, options?: CachesPausePrimingJobOptionalParams) => PollerLike<OperationState<void>, void>;
     resumePrimingJob: (resourceGroupName: string, cacheName: string, options?: CachesResumePrimingJobOptionalParams) => PollerLike<OperationState<void>, void>;
     spaceAllocation: (resourceGroupName: string, cacheName: string, options?: CachesSpaceAllocationOptionalParams) => PollerLike<OperationState<void>, void>;
     start: (resourceGroupName: string, cacheName: string, options?: CachesStartOptionalParams) => PollerLike<OperationState<void>, void>;
     startPrimingJob: (resourceGroupName: string, cacheName: string, options?: CachesStartPrimingJobOptionalParams) => PollerLike<OperationState<void>, void>;
     stop: (resourceGroupName: string, cacheName: string, options?: CachesStopOptionalParams) => PollerLike<OperationState<void>, void>;
     stopPrimingJob: (resourceGroupName: string, cacheName: string, options?: CachesStopPrimingJobOptionalParams) => PollerLike<OperationState<void>, void>;
-    update: (resourceGroupName: string, cacheName: string, options?: CachesUpdateOptionalParams) => PollerLike<OperationState<Cache>, Cache>;
+    update: (resourceGroupName: string, cacheName: string, options?: CachesUpdateOptionalParams) => PollerLike<OperationState<Cache_2>, Cache_2>;
     upgradeFirmware: (resourceGroupName: string, cacheName: string, options?: CachesUpgradeFirmwareOptionalParams) => PollerLike<OperationState<void>, void>;
 }
 
 // @public
@@ -850,9 +851,9 @@
 }
 
 // @public
 export interface CachesUpdateOptionalParams extends OperationOptions {
-    cache?: Cache;
+    cache?: Cache_2;
     updateIntervalInMs?: number;
 }
 
 // @public

```