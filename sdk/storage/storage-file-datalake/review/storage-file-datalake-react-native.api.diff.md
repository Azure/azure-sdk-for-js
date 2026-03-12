# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
@@ -16,8 +16,9 @@
 import * as coreClient from '@azure/core-client';
 import * as coreHttpCompat from '@azure/core-http-compat';
 import * as coreRestPipeline from '@azure/core-rest-pipeline';
 import { Credential as Credential_2 } from '@azure/storage-blob';
+import { Credential as Credential_3 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-blob';
 import { CredentialPolicyCreator } from '@azure/storage-blob';
 import { ServiceGetPropertiesResponse as DataLakeServiceGetPropertiesResponse } from '@azure/storage-blob';
 import { BlobServiceProperties as DataLakeServiceProperties } from '@azure/storage-blob';
@@ -314,9 +315,10 @@
 }
 
 // @public
 export class DataLakeFileClient extends DataLakePathClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
+    // Warning: (ae-forgotten-export) The symbol "StorageSharedKeyCredential_2" needs to be exported by the entry point index.d.ts
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     append(body: HttpRequestBody, offset: number, length: number, options?: FileAppendOptions): Promise<FileAppendResponse>;
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
     create(options?: FileCreateOptions): Promise<FileCreateResponse>;
@@ -341,9 +343,9 @@
 // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
 //
 // @public
 export class DataLakeFileSystemClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     create(options?: FileSystemCreateOptions): Promise<FileSystemCreateResponse>;
     createIfNotExists(options?: FileSystemCreateOptions): Promise<FileSystemCreateIfNotExistsResponse>;
     delete(options?: FileSystemDeleteOptions): Promise<FileSystemDeleteResponse>;
@@ -393,9 +395,9 @@
 }
 
 // @public
 export class DataLakePathClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
     delete(recursive?: boolean, options?: PathDeleteOptions): Promise<PathDeleteResponse>;
@@ -467,9 +469,9 @@
 }
 
 // @public
 export class DataLakeServiceClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     static fromConnectionString(connectionString: string, options?: DataLakeClientOptions): DataLakeServiceClient;
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
@@ -1116,12 +1118,12 @@
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
 
@@ -1233,9 +1235,9 @@
 // @public (undocumented)
 export type ModifiedAccessConditions = Omit<ModifiedAccessConditions_3, "ifTags">;
 
 // @public
-export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+export function newPipeline(credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
 export { NodeJSReadableStream }
 
 // @public (undocumented)

```