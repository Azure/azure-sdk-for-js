# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -7,9 +7,9 @@
 import type { Client } from '@azure-rest/core-client';
 import type { OperationOptions } from '@azure-rest/core-client';
 
 // @public
-export function get(context: DisconnectedOperationsManagementContext, resourceGroupName: string, name: string, imageName: string, options?: ImagesGetOptionalParams): Promise<Image>;
+export function get(context: DisconnectedOperationsManagementContext, resourceGroupName: string, name: string, imageName: string, options?: ImagesGetOptionalParams): Promise<Image_2>;
 
 // @public
 export interface ImagesGetOptionalParams extends OperationOptions {
 }
@@ -25,9 +25,9 @@
 export interface ImagesListDownloadUriOptionalParams extends OperationOptions {
 }
 
 // @public
-export function listByDisconnectedOperation(context: DisconnectedOperationsManagementContext, resourceGroupName: string, name: string, options?: ImagesListByDisconnectedOperationOptionalParams): PagedAsyncIterableIterator<Image>;
+export function listByDisconnectedOperation(context: DisconnectedOperationsManagementContext, resourceGroupName: string, name: string, options?: ImagesListByDisconnectedOperationOptionalParams): PagedAsyncIterableIterator<Image_2>;
 
 // @public
 export function listDownloadUri(context: DisconnectedOperationsManagementContext, resourceGroupName: string, name: string, imageName: string, options?: ImagesListDownloadUriOptionalParams): Promise<ImageDownloadResult>;
 

```