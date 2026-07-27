# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -2724,15 +2724,16 @@
 // @public
 export type HyperVGenerationTypes = string;
 
 // @public
-export interface Image extends TrackedResource {
+interface Image_2 extends TrackedResource {
     extendedLocation?: ExtendedLocation;
     hyperVGeneration?: HyperVGenerationTypes;
     readonly provisioningState?: string;
     sourceVirtualMachine?: SubResource;
     storageProfile?: ImageStorageProfile;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageDataDisk extends ImageDisk {
     lun: number;
@@ -2821,25 +2822,25 @@
 
 // @public
 export interface ImagesOperations {
     // @deprecated (undocumented)
-    beginCreateOrUpdate: (resourceGroupName: string, imageName: string, parameters: Image, options?: ImagesCreateOrUpdateOptionalParams) => Promise<SimplePollerLike<OperationState<Image>, Image>>;
+    beginCreateOrUpdate: (resourceGroupName: string, imageName: string, parameters: Image_2, options?: ImagesCreateOrUpdateOptionalParams) => Promise<SimplePollerLike<OperationState<Image_2>, Image_2>>;
     // @deprecated (undocumented)
-    beginCreateOrUpdateAndWait: (resourceGroupName: string, imageName: string, parameters: Image, options?: ImagesCreateOrUpdateOptionalParams) => Promise<Image>;
+    beginCreateOrUpdateAndWait: (resourceGroupName: string, imageName: string, parameters: Image_2, options?: ImagesCreateOrUpdateOptionalParams) => Promise<Image_2>;
     // @deprecated (undocumented)
     beginDelete: (resourceGroupName: string, imageName: string, options?: ImagesDeleteOptionalParams) => Promise<SimplePollerLike<OperationState<void>, void>>;
     // @deprecated (undocumented)
     beginDeleteAndWait: (resourceGroupName: string, imageName: string, options?: ImagesDeleteOptionalParams) => Promise<void>;
     // @deprecated (undocumented)
-    beginUpdate: (resourceGroupName: string, imageName: string, parameters: ImageUpdate, options?: ImagesUpdateOptionalParams) => Promise<SimplePollerLike<OperationState<Image>, Image>>;
+    beginUpdate: (resourceGroupName: string, imageName: string, parameters: ImageUpdate, options?: ImagesUpdateOptionalParams) => Promise<SimplePollerLike<OperationState<Image_2>, Image_2>>;
     // @deprecated (undocumented)
-    beginUpdateAndWait: (resourceGroupName: string, imageName: string, parameters: ImageUpdate, options?: ImagesUpdateOptionalParams) => Promise<Image>;
-    createOrUpdate: (resourceGroupName: string, imageName: string, parameters: Image, options?: ImagesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Image>, Image>;
+    beginUpdateAndWait: (resourceGroupName: string, imageName: string, parameters: ImageUpdate, options?: ImagesUpdateOptionalParams) => Promise<Image_2>;
+    createOrUpdate: (resourceGroupName: string, imageName: string, parameters: Image_2, options?: ImagesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Image_2>, Image_2>;
     delete: (resourceGroupName: string, imageName: string, options?: ImagesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
-    get: (resourceGroupName: string, imageName: string, options?: ImagesGetOptionalParams) => Promise<Image>;
-    list: (options?: ImagesListOptionalParams) => PagedAsyncIterableIterator<Image>;
-    listByResourceGroup: (resourceGroupName: string, options?: ImagesListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<Image>;
-    update: (resourceGroupName: string, imageName: string, parameters: ImageUpdate, options?: ImagesUpdateOptionalParams) => PollerLike<OperationState<Image>, Image>;
+    get: (resourceGroupName: string, imageName: string, options?: ImagesGetOptionalParams) => Promise<Image_2>;
+    list: (options?: ImagesListOptionalParams) => PagedAsyncIterableIterator<Image_2>;
+    listByResourceGroup: (resourceGroupName: string, options?: ImagesListByResourceGroupOptionalParams) => PagedAsyncIterableIterator<Image_2>;
+    update: (resourceGroupName: string, imageName: string, parameters: ImageUpdate, options?: ImagesUpdateOptionalParams) => PollerLike<OperationState<Image_2>, Image_2>;
 }
 
 // @public
 export type ImageState = string;

```