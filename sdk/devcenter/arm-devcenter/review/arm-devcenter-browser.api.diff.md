# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1075,22 +1075,23 @@
 // @public
 export type IdentityType = string;
 
 // @public
-export interface Image extends ProxyResource {
+interface Image_2 extends ProxyResource {
     readonly description?: string;
     readonly hibernateSupport?: HibernateSupport;
     readonly offer?: string;
     readonly provisioningState?: ProvisioningState;
     readonly publisher?: string;
     readonly recommendedMachineConfiguration?: RecommendedMachineConfiguration;
     readonly sku?: string;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageListResult {
     readonly nextLink?: string;
-    readonly value?: Image[];
+    readonly value?: Image_2[];
 }
 
 // @public
 export interface ImageReference {
@@ -1100,18 +1101,18 @@
 
 // @public
 export interface Images {
     get(resourceGroupName: string, devCenterName: string, galleryName: string, imageName: string, options?: ImagesGetOptionalParams): Promise<ImagesGetResponse>;
-    listByDevCenter(resourceGroupName: string, devCenterName: string, options?: ImagesListByDevCenterOptionalParams): PagedAsyncIterableIterator<Image>;
-    listByGallery(resourceGroupName: string, devCenterName: string, galleryName: string, options?: ImagesListByGalleryOptionalParams): PagedAsyncIterableIterator<Image>;
+    listByDevCenter(resourceGroupName: string, devCenterName: string, options?: ImagesListByDevCenterOptionalParams): PagedAsyncIterableIterator<Image_2>;
+    listByGallery(resourceGroupName: string, devCenterName: string, galleryName: string, options?: ImagesListByGalleryOptionalParams): PagedAsyncIterableIterator<Image_2>;
 }
 
 // @public
 export interface ImagesGetOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type ImagesGetResponse = Image;
+export type ImagesGetResponse = Image_2;
 
 // @public
 export interface ImagesListByDevCenterNextOptionalParams extends coreClient.OperationOptions {
 }

```