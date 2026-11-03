# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -75,10 +75,10 @@
     beginCreateOrUpdate(resourceGroupName: string, catalogName: string, resource: Catalog, options?: CatalogsCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<CatalogsCreateOrUpdateResponse>, CatalogsCreateOrUpdateResponse>>;
     beginCreateOrUpdateAndWait(resourceGroupName: string, catalogName: string, resource: Catalog, options?: CatalogsCreateOrUpdateOptionalParams): Promise<CatalogsCreateOrUpdateResponse>;
     beginDelete(resourceGroupName: string, catalogName: string, options?: CatalogsDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
     beginDeleteAndWait(resourceGroupName: string, catalogName: string, options?: CatalogsDeleteOptionalParams): Promise<void>;
-    beginUploadImage(resourceGroupName: string, catalogName: string, uploadImageRequest: Image, options?: CatalogsUploadImageOptionalParams): Promise<SimplePollerLike<OperationState<CatalogsUploadImageResponse>, CatalogsUploadImageResponse>>;
-    beginUploadImageAndWait(resourceGroupName: string, catalogName: string, uploadImageRequest: Image, options?: CatalogsUploadImageOptionalParams): Promise<CatalogsUploadImageResponse>;
+    beginUploadImage(resourceGroupName: string, catalogName: string, uploadImageRequest: Image_2, options?: CatalogsUploadImageOptionalParams): Promise<SimplePollerLike<OperationState<CatalogsUploadImageResponse>, CatalogsUploadImageResponse>>;
+    beginUploadImageAndWait(resourceGroupName: string, catalogName: string, uploadImageRequest: Image_2, options?: CatalogsUploadImageOptionalParams): Promise<CatalogsUploadImageResponse>;
     countDevices(resourceGroupName: string, catalogName: string, options?: CatalogsCountDevicesOptionalParams): Promise<CatalogsCountDevicesResponse>;
     get(resourceGroupName: string, catalogName: string, options?: CatalogsGetOptionalParams): Promise<CatalogsGetResponse>;
     listByResourceGroup(resourceGroupName: string, options?: CatalogsListByResourceGroupOptionalParams): PagedAsyncIterableIterator<Catalog>;
     listBySubscription(options?: CatalogsListBySubscriptionOptionalParams): PagedAsyncIterableIterator<Catalog>;
@@ -368,9 +368,9 @@
 }
 
 // @public
 export interface DeploymentProperties {
-    deployedImages?: Image[];
+    deployedImages?: Image_2[];
     readonly deploymentDateUtc?: Date;
     deploymentId?: string;
     readonly provisioningState?: ProvisioningState;
 }
@@ -737,16 +737,17 @@
 // @public
 export function getContinuationToken(page: unknown): string | undefined;
 
 // @public
-export interface Image extends ProxyResource {
+interface Image_2 extends ProxyResource {
     properties?: ImageProperties;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageListResult {
     readonly nextLink?: string;
-    value: Image[];
+    value: Image_2[];
 }
 
 // @public
 export interface ImageProperties {
@@ -762,14 +763,14 @@
 }
 
 // @public
 export interface Images {
-    beginCreateOrUpdate(resourceGroupName: string, catalogName: string, imageName: string, resource: Image, options?: ImagesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ImagesCreateOrUpdateResponse>, ImagesCreateOrUpdateResponse>>;
-    beginCreateOrUpdateAndWait(resourceGroupName: string, catalogName: string, imageName: string, resource: Image, options?: ImagesCreateOrUpdateOptionalParams): Promise<ImagesCreateOrUpdateResponse>;
+    beginCreateOrUpdate(resourceGroupName: string, catalogName: string, imageName: string, resource: Image_2, options?: ImagesCreateOrUpdateOptionalParams): Promise<SimplePollerLike<OperationState<ImagesCreateOrUpdateResponse>, ImagesCreateOrUpdateResponse>>;
+    beginCreateOrUpdateAndWait(resourceGroupName: string, catalogName: string, imageName: string, resource: Image_2, options?: ImagesCreateOrUpdateOptionalParams): Promise<ImagesCreateOrUpdateResponse>;
     beginDelete(resourceGroupName: string, catalogName: string, imageName: string, options?: ImagesDeleteOptionalParams): Promise<SimplePollerLike<OperationState<void>, void>>;
     beginDeleteAndWait(resourceGroupName: string, catalogName: string, imageName: string, options?: ImagesDeleteOptionalParams): Promise<void>;
     get(resourceGroupName: string, catalogName: string, imageName: string, options?: ImagesGetOptionalParams): Promise<ImagesGetResponse>;
-    listByCatalog(resourceGroupName: string, catalogName: string, options?: ImagesListByCatalogOptionalParams): PagedAsyncIterableIterator<Image>;
+    listByCatalog(resourceGroupName: string, catalogName: string, options?: ImagesListByCatalogOptionalParams): PagedAsyncIterableIterator<Image_2>;
 }
 
 // @public
 export interface ImagesCreateOrUpdateHeaders {
@@ -782,9 +783,9 @@
     updateIntervalInMs?: number;
 }
 
 // @public
-export type ImagesCreateOrUpdateResponse = Image;
+export type ImagesCreateOrUpdateResponse = Image_2;
 
 // @public
 export interface ImagesDeleteHeaders {
     location?: string;
@@ -801,9 +802,9 @@
 export interface ImagesGetOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type ImagesGetResponse = Image;
+export type ImagesGetResponse = Image_2;
 
 // @public
 export interface ImagesListByCatalogNextOptionalParams extends coreClient.OperationOptions {
 }

```