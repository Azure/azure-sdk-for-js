# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -859,14 +859,15 @@
 // @public
 export type HyperVGenerationTypes = string;
 
 // @public
-export interface Image extends Resource {
+interface Image_2 extends Resource {
     hyperVGeneration?: HyperVGenerationTypes;
     readonly provisioningState?: string;
     sourceVirtualMachine?: SubResource;
     storageProfile?: ImageStorageProfile;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageDataDisk extends ImageDisk {
     lun: number;
@@ -891,9 +892,9 @@
 
 // @public
 export interface ImageListResult {
     nextLink?: string;
-    value: Image[];
+    value: Image_2[];
 }
 
 // @public
 export interface ImageOSDisk extends ImageDisk {
@@ -911,17 +912,17 @@
 }
 
 // @public
 export interface Images {
-    beginCreateOrUpdate(resourceGroupName: string, imageName: string, parameters: Image, options?: ImagesCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<ImagesCreateOrUpdateResponse>, ImagesCreateOrUpdateResponse>>;
-    beginCreateOrUpdateAndWait(resourceGroupName: string, imageName: string, parameters: Image, options?: ImagesCreateOrUpdateOptionalParams): Promise<ImagesCreateOrUpdateResponse>;
+    beginCreateOrUpdate(resourceGroupName: string, imageName: string, parameters: Image_2, options?: ImagesCreateOrUpdateOptionalParams): Promise<PollerLike<PollOperationState<ImagesCreateOrUpdateResponse>, ImagesCreateOrUpdateResponse>>;
+    beginCreateOrUpdateAndWait(resourceGroupName: string, imageName: string, parameters: Image_2, options?: ImagesCreateOrUpdateOptionalParams): Promise<ImagesCreateOrUpdateResponse>;
     beginDelete(resourceGroupName: string, imageName: string, options?: ImagesDeleteOptionalParams): Promise<PollerLike<PollOperationState<void>, void>>;
     beginDeleteAndWait(resourceGroupName: string, imageName: string, options?: ImagesDeleteOptionalParams): Promise<void>;
     beginUpdate(resourceGroupName: string, imageName: string, parameters: ImageUpdate, options?: ImagesUpdateOptionalParams): Promise<PollerLike<PollOperationState<ImagesUpdateResponse>, ImagesUpdateResponse>>;
     beginUpdateAndWait(resourceGroupName: string, imageName: string, parameters: ImageUpdate, options?: ImagesUpdateOptionalParams): Promise<ImagesUpdateResponse>;
     get(resourceGroupName: string, imageName: string, options?: ImagesGetOptionalParams): Promise<ImagesGetResponse>;
-    list(options?: ImagesListOptionalParams): PagedAsyncIterableIterator<Image>;
-    listByResourceGroup(resourceGroupName: string, options?: ImagesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Image>;
+    list(options?: ImagesListOptionalParams): PagedAsyncIterableIterator<Image_2>;
+    listByResourceGroup(resourceGroupName: string, options?: ImagesListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Image_2>;
 }
 
 // @public
 export interface ImagesCreateOrUpdateOptionalParams extends coreClient.OperationOptions {
@@ -929,9 +930,9 @@
     updateIntervalInMs?: number;
 }
 
 // @public
-export type ImagesCreateOrUpdateResponse = Image;
+export type ImagesCreateOrUpdateResponse = Image_2;
 
 // @public
 export interface ImagesDeleteOptionalParams extends coreClient.OperationOptions {
     resumeFrom?: string;
@@ -943,9 +944,9 @@
     expand?: string;
 }
 
 // @public
-export type ImagesGetResponse = Image;
+export type ImagesGetResponse = Image_2;
 
 // @public
 export interface ImagesListByResourceGroupNextOptionalParams extends coreClient.OperationOptions {
 }
@@ -987,9 +988,9 @@
     updateIntervalInMs?: number;
 }
 
 // @public
-export type ImagesUpdateResponse = Image;
+export type ImagesUpdateResponse = Image_2;
 
 // @public
 export interface ImageUpdate extends UpdateResource {
     hyperVGeneration?: HyperVGenerationTypes;

```