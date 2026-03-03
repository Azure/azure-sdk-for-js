# API Report Diff for react-native runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ react-native
<<<<<<< HEAD
<<<<<<< HEAD
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
@@ -303,9 +304,10 @@
=======
<<<<<<< HEAD
@@ -303,9 +303,10 @@
=======
@@ -317,9 +317,10 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -318,9 +318,10 @@
>>>>>>> 01a4ce5b39 (Merge main)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -330,9 +332,9 @@
=======
<<<<<<< HEAD
@@ -330,9 +331,9 @@
=======
@@ -344,9 +345,9 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -345,9 +346,9 @@
>>>>>>> 01a4ce5b39 (Merge main)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -375,9 +377,9 @@
=======
<<<<<<< HEAD
@@ -375,9 +376,9 @@
=======
@@ -399,9 +400,9 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -400,9 +401,9 @@
>>>>>>> 01a4ce5b39 (Merge main)
 }
 
 // @public
 export class DataLakePathClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
     createIfNotExists(resourceType: PathResourceTypeModel, options?: PathCreateIfNotExistsOptions): Promise<PathCreateIfNotExistsResponse>;
     delete(recursive?: boolean, options?: PathDeleteOptions): Promise<PathDeleteResponse>;
<<<<<<< HEAD
<<<<<<< HEAD
@@ -447,9 +449,9 @@
=======
<<<<<<< HEAD
@@ -447,9 +448,9 @@
=======
@@ -475,9 +476,9 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -476,9 +477,9 @@
>>>>>>> 01a4ce5b39 (Merge main)
 }
 
 // @public
 export class DataLakeServiceClient extends StorageClient {
-    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
+    constructor(url: string, credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     static fromConnectionString(connectionString: string, options?: DataLakeClientOptions): DataLakeServiceClient;
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1089,12 +1091,12 @@
=======
<<<<<<< HEAD
@@ -1089,12 +1090,12 @@
=======
@@ -1131,12 +1132,12 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -1132,12 +1133,12 @@
>>>>>>> 01a4ce5b39 (Merge main)
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
 
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1206,9 +1208,9 @@
=======
<<<<<<< HEAD
@@ -1206,9 +1207,9 @@
=======
@@ -1248,9 +1249,9 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -1249,9 +1250,9 @@
>>>>>>> 01a4ce5b39 (Merge main)
 // @public (undocumented)
 export type ModifiedAccessConditions = Omit<ModifiedAccessConditions_3, "ifTags">;
 
 // @public
-export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+export function newPipeline(credential?: StorageSharedKeyCredential_2 | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
 export { NodeJSReadableStream }
 
 // @public (undocumented)

```