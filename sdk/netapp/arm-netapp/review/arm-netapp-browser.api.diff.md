# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -525,13 +525,14 @@
     updateIntervalInMs?: number;
 }
 
 // @public
-export interface Cache extends TrackedResource {
+interface Cache_2 extends TrackedResource {
     readonly etag?: string;
     properties: CacheProperties;
     zones?: string[];
 }
+export { Cache_2 as Cache }
 
 // @public
 export type CacheFileAccessLogs = string;
 
@@ -605,16 +606,16 @@
 }
 
 // @public
 export interface CachesOperations {
-    createOrUpdate: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: Cache, options?: CachesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Cache>, Cache>;
+    createOrUpdate: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: Cache_2, options?: CachesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Cache_2>, Cache_2>;
     delete: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
-    get: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesGetOptionalParams) => Promise<Cache>;
-    list: (resourceGroupName: string, accountName: string, poolName: string, options?: CachesListOptionalParams) => PagedAsyncIterableIterator<Cache>;
+    get: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesGetOptionalParams) => Promise<Cache_2>;
+    list: (resourceGroupName: string, accountName: string, poolName: string, options?: CachesListOptionalParams) => PagedAsyncIterableIterator<Cache_2>;
     listPeeringPassphrases: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesListPeeringPassphrasesOptionalParams) => Promise<PeeringPassphrases>;
-    poolChange: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: PoolChangeRequest, options?: CachesPoolChangeOptionalParams) => PollerLike<OperationState<Cache>, Cache>;
-    resetSmbPassword: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesResetSmbPasswordOptionalParams) => PollerLike<OperationState<Cache>, Cache>;
-    update: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: CacheUpdate, options?: CachesUpdateOptionalParams) => PollerLike<OperationState<Cache>, Cache>;
+    poolChange: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: PoolChangeRequest, options?: CachesPoolChangeOptionalParams) => PollerLike<OperationState<Cache_2>, Cache_2>;
+    resetSmbPassword: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesResetSmbPasswordOptionalParams) => PollerLike<OperationState<Cache_2>, Cache_2>;
+    update: (resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: CacheUpdate, options?: CachesUpdateOptionalParams) => PollerLike<OperationState<Cache_2>, Cache_2>;
 }
 
 // @public
 export interface CachesPoolChangeOptionalParams extends OperationOptions {

```