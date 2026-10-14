# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -135,9 +135,9 @@
     listDeviceGroups: (resourceGroupName: string, catalogName: string, listDeviceGroupsRequest: ListDeviceGroupsRequest, options?: CatalogsListDeviceGroupsOptionalParams) => PagedAsyncIterableIterator<DeviceGroup>;
     listDeviceInsights: (resourceGroupName: string, catalogName: string, options?: CatalogsListDeviceInsightsOptionalParams) => PagedAsyncIterableIterator<DeviceInsight>;
     listDevices: (resourceGroupName: string, catalogName: string, options?: CatalogsListDevicesOptionalParams) => PagedAsyncIterableIterator<Device>;
     update: (resourceGroupName: string, catalogName: string, properties: CatalogUpdate, options?: CatalogsUpdateOptionalParams) => Promise<Catalog>;
-    uploadImage: (resourceGroupName: string, catalogName: string, uploadImageRequest: Image, options?: CatalogsUploadImageOptionalParams) => PollerLike<OperationState<void>, void>;
+    uploadImage: (resourceGroupName: string, catalogName: string, uploadImageRequest: Image_2, options?: CatalogsUploadImageOptionalParams) => PollerLike<OperationState<void>, void>;
 }
 
 // @public
 export interface CatalogsUpdateOptionalParams extends OperationOptions {
@@ -233,9 +233,9 @@
 }
 
 // @public
 export interface DeploymentProperties {
-    deployedImages?: Image[];
+    deployedImages?: Image_2[];
     readonly deploymentDateUtc?: Date;
     deploymentId?: string;
     readonly provisioningState?: ProvisioningState;
 }
@@ -452,11 +452,12 @@
     capabilities: CapabilityType[];
 }
 
 // @public
-export interface Image extends ProxyResource {
+interface Image_2 extends ProxyResource {
     properties?: ImageProperties;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageProperties {
     readonly componentId?: string;
@@ -493,12 +494,12 @@
 }
 
 // @public
 export interface ImagesOperations {
-    createOrUpdate: (resourceGroupName: string, catalogName: string, imageName: string, resource: Image, options?: ImagesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Image>, Image>;
+    createOrUpdate: (resourceGroupName: string, catalogName: string, imageName: string, resource: Image_2, options?: ImagesCreateOrUpdateOptionalParams) => PollerLike<OperationState<Image_2>, Image_2>;
     delete: (resourceGroupName: string, catalogName: string, imageName: string, options?: ImagesDeleteOptionalParams) => PollerLike<OperationState<void>, void>;
-    get: (resourceGroupName: string, catalogName: string, imageName: string, options?: ImagesGetOptionalParams) => Promise<Image>;
-    listByCatalog: (resourceGroupName: string, catalogName: string, options?: ImagesListByCatalogOptionalParams) => PagedAsyncIterableIterator<Image>;
+    get: (resourceGroupName: string, catalogName: string, imageName: string, options?: ImagesGetOptionalParams) => Promise<Image_2>;
+    listByCatalog: (resourceGroupName: string, catalogName: string, options?: ImagesListByCatalogOptionalParams) => PagedAsyncIterableIterator<Image_2>;
 }
 
 // @public
 export type ImageType = string;

```