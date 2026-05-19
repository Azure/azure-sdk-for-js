# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -49,15 +49,15 @@
     updateIntervalInMs?: number;
 }
 
 // @public
-export function createOrUpdate(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: Cache, options?: CachesCreateOrUpdateOptionalParams): PollerLike<OperationState<Cache>, Cache>;
+export function createOrUpdate(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: Cache_2, options?: CachesCreateOrUpdateOptionalParams): PollerLike<OperationState<Cache_2>, Cache_2>;
 
 // @public
-export function get(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesGetOptionalParams): Promise<Cache>;
+export function get(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesGetOptionalParams): Promise<Cache_2>;
 
 // @public
-export function list(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, options?: CachesListOptionalParams): PagedAsyncIterableIterator<Cache>;
+export function list(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, options?: CachesListOptionalParams): PagedAsyncIterableIterator<Cache_2>;
 
 // @public
 export function listPeeringPassphrases(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesListPeeringPassphrasesOptionalParams): Promise<PeeringPassphrases>;
 
@@ -67,9 +67,9 @@
 // @public
 export function resetSmbPassword(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, cacheName: string, options?: CachesResetSmbPasswordOptionalParams): PollerLike<OperationState<void>, void>;
 
 // @public
-export function update(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: CacheUpdate, options?: CachesUpdateOptionalParams): PollerLike<OperationState<Cache>, Cache>;
+export function update(context: NetAppManagementContext, resourceGroupName: string, accountName: string, poolName: string, cacheName: string, body: CacheUpdate, options?: CachesUpdateOptionalParams): PollerLike<OperationState<Cache_2>, Cache_2>;
 
 // (No @packageDocumentation comment for this package)
 
 ```

```