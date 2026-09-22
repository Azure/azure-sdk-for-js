# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -302,11 +302,12 @@
     listByParent: (resourceGroupName: string, name: string, options?: HardwareSettingsListByParentOptionalParams) => PagedAsyncIterableIterator<HardwareSetting>;
 }
 
 // @public
-export interface Image extends ProxyResource {
+interface Image_2 extends ProxyResource {
     properties?: ImageProperties;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageDownloadResult {
     readonly compatibleVersions?: string[];
@@ -350,10 +351,10 @@
 }
 
 // @public
 export interface ImagesOperations {
-    get: (resourceGroupName: string, name: string, imageName: string, options?: ImagesGetOptionalParams) => Promise<Image>;
-    listByDisconnectedOperation: (resourceGroupName: string, name: string, options?: ImagesListByDisconnectedOperationOptionalParams) => PagedAsyncIterableIterator<Image>;
+    get: (resourceGroupName: string, name: string, imageName: string, options?: ImagesGetOptionalParams) => Promise<Image_2>;
+    listByDisconnectedOperation: (resourceGroupName: string, name: string, options?: ImagesListByDisconnectedOperationOptionalParams) => PagedAsyncIterableIterator<Image_2>;
     listDownloadUri: (resourceGroupName: string, name: string, imageName: string, options?: ImagesListDownloadUriOptionalParams) => Promise<ImageDownloadResult>;
 }
 
 // @public

```