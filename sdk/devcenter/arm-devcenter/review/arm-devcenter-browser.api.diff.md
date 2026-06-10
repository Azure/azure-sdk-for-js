# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1013,11 +1013,12 @@
 // @public
 export type IdentityType = string;
 
 // @public
-export interface Image extends ProxyResource {
+interface Image_2 extends ProxyResource {
     properties?: ImageProperties;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageCreationErrorDetails {
     code?: string;
@@ -1145,13 +1146,13 @@
 }
 
 // @public
 export interface ImagesOperations {
-    get: (resourceGroupName: string, devCenterName: string, galleryName: string, imageName: string, options?: ImagesGetOptionalParams) => Promise<Image>;
-    getByProject: (resourceGroupName: string, projectName: string, imageName: string, options?: ImagesGetByProjectOptionalParams) => Promise<Image>;
-    listByDevCenter: (resourceGroupName: string, devCenterName: string, options?: ImagesListByDevCenterOptionalParams) => PagedAsyncIterableIterator<Image>;
-    listByGallery: (resourceGroupName: string, devCenterName: string, galleryName: string, options?: ImagesListByGalleryOptionalParams) => PagedAsyncIterableIterator<Image>;
-    listByProject: (resourceGroupName: string, projectName: string, options?: ImagesListByProjectOptionalParams) => PagedAsyncIterableIterator<Image>;
+    get: (resourceGroupName: string, devCenterName: string, galleryName: string, imageName: string, options?: ImagesGetOptionalParams) => Promise<Image_2>;
+    getByProject: (resourceGroupName: string, projectName: string, imageName: string, options?: ImagesGetByProjectOptionalParams) => Promise<Image_2>;
+    listByDevCenter: (resourceGroupName: string, devCenterName: string, options?: ImagesListByDevCenterOptionalParams) => PagedAsyncIterableIterator<Image_2>;
+    listByGallery: (resourceGroupName: string, devCenterName: string, galleryName: string, options?: ImagesListByGalleryOptionalParams) => PagedAsyncIterableIterator<Image_2>;
+    listByProject: (resourceGroupName: string, projectName: string, options?: ImagesListByProjectOptionalParams) => PagedAsyncIterableIterator<Image_2>;
 }
 
 // @public
 export interface ImageValidationErrorDetails {

```