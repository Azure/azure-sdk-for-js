# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -311,9 +311,10 @@
 }
 
 // @public
 export class DataLakeFileClient extends DataLakePathClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeFileClientOptions);
+    // Warning: (ae-forgotten-export) The symbol "StorageSharedKeyCredential_2" needs to be exported by the entry point index.d.ts
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeFileClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     append(body: HttpRequestBody, offset: number, length: number, options?: FileAppendOptions): Promise<FileAppendResponse>;
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
     create(options?: FileCreateOptions): Promise<FileCreateResponse>;
@@ -341,9 +342,9 @@
 // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
 //
 // @public
 export class DataLakeFileSystemClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeFileSystemClientOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeFileSystemClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     create(options?: FileSystemCreateOptions): Promise<FileSystemCreateResponse>;
     createIfNotExists(options?: FileSystemCreateOptions): Promise<FileSystemCreateIfNotExistsResponse>;
     delete(options?: FileSystemDeleteOptions): Promise<FileSystemDeleteResponse>;
@@ -396,9 +397,9 @@
 }
 
 // @public
 export class DataLakePathClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakePathClientOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakePathClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
     delete(recursive?: boolean, options?: PathDeleteOptions): Promise<PathDeleteResponse>;
@@ -473,9 +474,9 @@
 }
 
 // @public
 export class DataLakeServiceClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeServiceClientOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeServiceClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     static fromConnectionString(connectionString: string, options?: DataLakeServiceClientOptions): DataLakeServiceClient;
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
@@ -1125,12 +1126,12 @@
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
 
@@ -1242,9 +1243,9 @@
 // @public (undocumented)
 export type ModifiedAccessConditions = Omit<ModifiedAccessConditions_3, "ifTags">;
 
 // @public
-export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+export function newPipeline(credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
 export { NodeJSReadableStream }
 
 // @public (undocumented)

```