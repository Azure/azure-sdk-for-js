# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -849,11 +849,12 @@
     reason: string;
 }
 
 // @public
-export interface Storage extends ProxyResource {
+interface Storage_2 extends ProxyResource {
     properties?: StorageProperties;
 }
+export { Storage_2 as Storage }
 
 // @public
 export type StorageClassType = string;
 
@@ -897,12 +898,12 @@
 }
 
 // @public
 export interface StoragesOperations {
-    createOrUpdate: (resourceGroupName: string, cloudAccountName: string, storageName: string, resource: Storage, options?: StoragesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Storage>, Storage>;
+    createOrUpdate: (resourceGroupName: string, cloudAccountName: string, storageName: string, resource: Storage_2, options?: StoragesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Storage_2>, Storage_2>;
     delete: (resourceGroupName: string, cloudAccountName: string, storageName: string, options?: StoragesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
-    get: (resourceGroupName: string, cloudAccountName: string, storageName: string, options?: StoragesGetOptionalParams) => Promise<Storage>;
-    listByCloudAccount: (resourceGroupName: string, cloudAccountName: string, options?: StoragesListByCloudAccountOptionalParams) => PagedAsyncIterableIterator<Storage>;
+    get: (resourceGroupName: string, cloudAccountName: string, storageName: string, options?: StoragesGetOptionalParams) => Promise<Storage_2>;
+    listByCloudAccount: (resourceGroupName: string, cloudAccountName: string, options?: StoragesListByCloudAccountOptionalParams) => PagedAsyncIterableIterator<Storage_2>;
 }
 
 // @public
 export type StorageType = string;

```