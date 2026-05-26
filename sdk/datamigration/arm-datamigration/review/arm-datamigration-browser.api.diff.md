# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -1128,12 +1128,13 @@
     };
 }
 
 // @public
-export interface FileList {
+interface FileList_2 {
     nextLink?: string;
     value?: ProjectFile[];
 }
+export { FileList_2 as FileList }
 
 // @public
 export interface Files {
     createOrUpdate(groupName: string, serviceName: string, projectName: string, fileName: string, parameters: ProjectFile, options?: FilesCreateOrUpdateOptionalParams): Promise<FilesCreateOrUpdateResponse>;
@@ -1174,16 +1175,16 @@
 export interface FilesListNextOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type FilesListNextResponse = FileList;
+export type FilesListNextResponse = FileList_2;
 
 // @public
 export interface FilesListOptionalParams extends coreClient.OperationOptions {
 }
 
 // @public
-export type FilesListResponse = FileList;
+export type FilesListResponse = FileList_2;
 
 // @public
 export interface FilesReadOptionalParams extends coreClient.OperationOptions {
 }

```