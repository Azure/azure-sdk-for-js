# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -299,9 +299,10 @@
 }
 
 // @public
 export class DataLakeFileClient extends DataLakePathClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+    // Warning: (ae-forgotten-export) The symbol "StorageSharedKeyCredential_2" needs to be exported by the entry point index.d.ts
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: Pipeline);
     append(body: HttpRequestBody, offset: number, length: number, options?: FileAppendOptions): Promise<FileAppendResponse>;
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
     create(options?: FileCreateOptions): Promise<FileCreateResponse>;
@@ -326,9 +327,9 @@
 // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
 //
 // @public
 export class DataLakeFileSystemClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: Pipeline);
     create(options?: FileSystemCreateOptions): Promise<FileSystemCreateResponse>;
     createIfNotExists(options?: FileSystemCreateOptions): Promise<FileSystemCreateIfNotExistsResponse>;
     delete(options?: FileSystemDeleteOptions): Promise<FileSystemDeleteResponse>;
@@ -371,9 +372,9 @@
 }
 
 // @public
 export class DataLakePathClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: Pipeline);
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
     delete(recursive?: boolean, options?: PathDeleteOptions): Promise<PathDeleteResponse>;
@@ -443,9 +444,9 @@
 }
 
 // @public
 export class DataLakeServiceClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: Pipeline);
     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): DataLakeServiceClient;
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
@@ -1085,12 +1086,12 @@
 // @public (undocumented)
 export type FileUploadResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
 
 // @public
-export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential_2): SASQueryParameters;
 
 // @public
-export function generateDataLakeSASQueryParameters(dataLakeSASSignatureValues: DataLakeSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+export function generateDataLakeSASQueryParameters(dataLakeSASSignatureValues: DataLakeSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential_2): SASQueryParameters;
 
 // @public
 export function generateDataLakeSASQueryParameters(dataLakeSASSignatureValues: DataLakeSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
 
@@ -1202,9 +1203,9 @@
 // @public (undocumented)
 export type ModifiedAccessConditions = Omit<ModifiedAccessConditions_3, "ifTags">;
 
 // @public
-export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+export function newPipeline(credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
 // @public (undocumented)
 export interface Path {
     // (undocumented)

```