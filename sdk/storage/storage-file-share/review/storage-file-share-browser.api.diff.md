# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -11,9 +11,9 @@
 import { BaseRequestPolicy } from '@azure/storage-common';
 import * as coreClient from '@azure/core-client';
 import * as coreHttpCompat from '@azure/core-http-compat';
 import * as coreRestPipeline from '@azure/core-rest-pipeline';
-import { Credential } from '@azure/storage-common';
+import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
 import { CredentialPolicyCreator } from '@azure/storage-common';
 import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
 import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
@@ -157,9 +157,9 @@
     exposedHeaders: string;
     maxAgeInSeconds: number;
 }
 
-export { Credential }
+export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
 export { CredentialPolicyCreator }
@@ -774,9 +774,9 @@
 export interface FileGetRangeListOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
     includeRenames?: boolean;
     leaseAccessConditions?: LeaseAccessConditions;
-    range?: Range;
+    range?: Range_2;
 }
 
 // @public
 export type FileGetRangeListResponse = WithResponse<FileGetRangeListHeaders & {
@@ -1338,9 +1338,9 @@
 // @public
 export type ModeCopyMode = "source" | "override";
 
 // @public
-export function newPipeline(credential?: Credential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+export function newPipeline(credential?: Credential_2 | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
 // @public
 export interface NfsFileMode {
     effectiveGroupIdentity: boolean;
@@ -1394,12 +1394,13 @@
     write: boolean;
 }
 
 // @public
-export interface Range {
+interface Range_2 {
     count?: number;
     offset: number;
 }
+export { Range_2 as Range }
 
 // @public
 export interface RangeModel {
     end: number;
@@ -1578,9 +1579,9 @@
 //
 // @public
 export class ShareClient extends StorageClient {
     constructor(connectionString: string, name: string, options?: ShareClientOptions);
-    constructor(url: string, credential?: Credential | TokenCredential, options?: ShareClientOptions);
+    constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
     create(options?: ShareCreateOptions): Promise<ShareCreateResponse>;
     createDirectory(directoryName: string, options?: DirectoryCreateOptions): Promise<{
         directoryClient: ShareDirectoryClient;
@@ -1736,9 +1737,9 @@
 export type ShareDeleteResponse = WithResponse<ShareDeleteHeaders, ShareDeleteHeaders>;
 
 // @public
 export class ShareDirectoryClient extends StorageClient {
-    constructor(url: string, credential?: Credential | TokenCredential, options?: ShareClientOptions);
+    constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
     create(options?: DirectoryCreateOptions): Promise<DirectoryCreateResponse>;
     createFile(fileName: string, size: number, options?: FileCreateOptions): Promise<{
         fileClient: ShareFileClient;
@@ -1783,9 +1784,9 @@
 }
 
 // @public
 export class ShareFileClient extends StorageClient {
-    constructor(url: string, credential?: Credential | TokenCredential, options?: ShareClientOptions);
+    constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
     abortCopyFromURL(copyId: string, options?: FileAbortCopyFromURLOptions): Promise<FileAbortCopyResponse>;
     clearRange(offset: number, contentLength: number, options?: FileClearRangeOptions): Promise<FileUploadRangeResponse>;
     create(size: number, options?: FileCreateOptions): Promise<FileCreateResponse>;
@@ -2114,9 +2115,9 @@
 }
 
 // @public
 export class ShareServiceClient extends StorageClient {
-    constructor(url: string, credential?: Credential | TokenCredential, options?: ShareClientOptions);
+    constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
     createShare(shareName: string, options?: ShareCreateOptions): Promise<{
         shareCreateResponse: ShareCreateResponse;
         shareClient: ShareClient;

```