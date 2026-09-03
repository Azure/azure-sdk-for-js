# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -79,9 +79,9 @@
     type?: "SystemAssigned";
 }
 
 // @public
-export interface Image extends ProxyResource {
+interface Image_2 extends ProxyResource {
     readonly author?: string;
     availableRegions?: string[];
     readonly description?: string;
     readonly displayName?: string;
@@ -98,8 +98,9 @@
     readonly systemData?: SystemData;
     readonly termsStatus?: EnableState;
     readonly version?: string;
 }
+export { Image_2 as Image }
 
 // @public
 export interface ImageProperties extends ImageUpdateProperties {
     readonly author?: string;
@@ -130,27 +131,27 @@
 }
 
 // @public
 export interface Images {
-    createOrUpdate(resourceGroupName: string, labPlanName: string, imageName: string, body: Image, options?: ImagesCreateOrUpdateOptionalParams): Promise<ImagesCreateOrUpdateResponse>;
+    createOrUpdate(resourceGroupName: string, labPlanName: string, imageName: string, body: Image_2, options?: ImagesCreateOrUpdateOptionalParams): Promise<ImagesCreateOrUpdateResponse>;
     get(resourceGroupName: string, labPlanName: string, imageName: string, options?: ImagesGetOptionalParams): Promise<ImagesGetResponse>;
-    listByLabPlan(resourceGroupName: string, labPlanName: string, options?: ImagesListByLabPlanOptionalParams): PagedAsyncIterableIterator<Image>;
+    listByLabPlan(resourceGroupName: string, labPlanName: string, options?: ImagesListByLabPlanOptionalParams): PagedAsyncIterableIterator<Image_2>;
     update(resourceGroupName: string, labPlanName: string, imageName: string, body: ImageUpdate, options?: ImagesUpdateOptionalParams): Promise<ImagesUpdateResponse>;
 }
 
 // @public
 export interface ImagesCreateOrUpdateOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type ImagesCreateOrUpdateResponse = Image;
+export type ImagesCreateOrUpdateResponse = Image_2;
 
 // @public
 export interface ImagesGetOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type ImagesGetResponse = Image;
+export type ImagesGetResponse = Image_2;
 
 // @public
 export interface ImagesListByLabPlanNextOptionalParams extends coreClient.OperationOptions {
 }
@@ -170,9 +171,9 @@
 export interface ImagesUpdateOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type ImagesUpdateResponse = Image;
+export type ImagesUpdateResponse = Image_2;
 
 // @public
 export interface ImageUpdate {
     enabledState?: EnableState;
@@ -682,9 +683,9 @@
 
 // @public
 export interface PagedImages {
     readonly nextLink?: string;
-    readonly value?: Image[];
+    readonly value?: Image_2[];
 }
 
 // @public
 export interface PagedLabPlans {

```