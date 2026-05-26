# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -636,9 +636,9 @@
     writeBackTimer?: number;
 }
 
 // @public
-export interface Cache {
+interface Cache_2 {
     cacheSizeGB?: number;
     directoryServicesSettings?: CacheDirectorySettings;
     encryptionSettings?: CacheEncryptionSettings;
     readonly health?: CacheHealth;
@@ -662,8 +662,9 @@
     upgradeSettings?: CacheUpgradeSettings;
     readonly upgradeStatus?: CacheUpgradeStatus;
     zones?: string[];
 }
+export { Cache_2 as Cache }
 
 // @public
 export interface CacheActiveDirectorySettings {
     cacheNetBiosName: string;
@@ -723,10 +724,10 @@
 }
 
 // @public
 export interface Caches {
-    beginCreateOrUpdate(resourceGroupName: string, cacheName: string, cache: Cache, options?: CachesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<CachesCreateOrUpdateResponse>, CachesCreateOrUpdateResponse>>;
-    beginCreateOrUpdateAndWait(resourceGroupName: string, cacheName: string, cache: Cache, options?: CachesCreateOrUpdateOptionalParams): Promise<CachesCreateOrUpdateResponse>;
+    beginCreateOrUpdate(resourceGroupName: string, cacheName: string, cache: Cache_2, options?: CachesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<CachesCreateOrUpdateResponse>, CachesCreateOrUpdateResponse>>;
+    beginCreateOrUpdateAndWait(resourceGroupName: string, cacheName: string, cache: Cache_2, options?: CachesCreateOrUpdateOptionalParams): Promise<CachesCreateOrUpdateResponse>;
     beginDebugInfo(resourceGroupName: string, cacheName: string, options?: CachesDebugInfoOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
     beginDebugInfoAndWait(resourceGroupName: string, cacheName: string, options?: CachesDebugInfoOptionalParams): Promise<void>;
     beginDelete(resourceGroupName: string, cacheName: string, options?: CachesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
     beginDeleteAndWait(resourceGroupName: string, cacheName: string, options?: CachesDeleteOptionalParams): Promise<void>;
@@ -750,10 +751,10 @@
     beginUpdateAndWait(resourceGroupName: string, cacheName: string, options?: CachesUpdateOptionalParams): Promise<CachesUpdateResponse>;
     beginUpgradeFirmware(resourceGroupName: string, cacheName: string, options?: CachesUpgradeFirmwareOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
     beginUpgradeFirmwareAndWait(resourceGroupName: string, cacheName: string, options?: CachesUpgradeFirmwareOptionalParams): Promise<void>;
     get(resourceGroupName: string, cacheName: string, options?: CachesGetOptionalParams): Promise<CachesGetResponse>;
-    list(options?: CachesListOptionalParams): PagedAsyncIterableIterator<Cache>;
-    listByResourceGroup(resourceGroupName: string, options?: CachesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Cache>;
+    list(options?: CachesListOptionalParams): PagedAsyncIterableIterator<Cache_2>;
+    listByResourceGroup(resourceGroupName: string, options?: CachesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Cache_2>;
 }
 
 // @public
 export interface CachesCreateOrUpdateOptionalParams extends coreClient.OperationOptions {
@@ -761,9 +762,9 @@
     updateIntervalInMs?: number;
 }
 
 // @public
-export type CachesCreateOrUpdateResponse = Cache;
+export type CachesCreateOrUpdateResponse = Cache_2;
 
 // @public
 export interface CachesDebugInfoHeaders {
     azureAsyncOperation?: string;
@@ -809,9 +810,9 @@
 export interface CachesGetOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type CachesGetResponse = Cache;
+export type CachesGetResponse = Cache_2;
 
 // @public
 export interface CacheSku {
     name?: string;
@@ -847,9 +848,9 @@
 
 // @public
 export interface CachesListResult {
     nextLink?: string;
-    value?: Cache[];
+    value?: Cache_2[];
 }
 
 // @public
 export interface CachesPausePrimingJobHeaders {
@@ -962,15 +963,15 @@
 }
 
 // @public
 export interface CachesUpdateOptionalParams extends coreClient.OperationOptions {
-    cache?: Cache;
+    cache?: Cache_2;
     resumeFrom?: string;
     updateIntervalInMs?: number;
 }
 
 // @public
-export type CachesUpdateResponse = Cache;
+export type CachesUpdateResponse = Cache_2;
 
 // @public
 export interface CachesUpgradeFirmwareHeaders {
     azureAsyncOperation?: string;

```