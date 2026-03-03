# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -16,10 +16,10 @@
 import * as coreClient from '@azure/core-client';
 import * as coreHttpCompat from '@azure/core-http-compat';
 import * as coreRestPipeline from '@azure/core-rest-pipeline';
 import { Credential as Credential_2 } from '@azure/storage-blob';
+import { Credential as Credential_3 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-blob';
-import { CredentialPolicyCreator } from '@azure/storage-blob';
 import { ServiceGetPropertiesResponse as DataLakeServiceGetPropertiesResponse } from '@azure/storage-blob';
 import { BlobServiceProperties as DataLakeServiceProperties } from '@azure/storage-blob';
 import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
 import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
@@ -30,9 +30,9 @@
 import { LeaseAccessConditions } from '@azure/storage-blob';
 import { LeaseOperationOptions } from '@azure/storage-blob';
 import { LeaseOperationResponse } from '@azure/storage-blob';
 import type { ModifiedAccessConditions as ModifiedAccessConditions_3 } from '@azure/storage-blob';
-import { NodeJSReadableStream } from '@azure/storage-blob';
+import type { NodeJSReadableStream } from '@azure/storage-blob';
 import type { OperationTracingOptions } from '@azure/core-tracing';
 import type { PagedAsyncIterableIterator } from '@azure/core-paging';
 import { Pipeline } from '@azure/storage-blob';
 import { PipelineLike } from '@azure/storage-blob';
@@ -54,10 +54,9 @@
 import { StorageRetryOptions } from '@azure/storage-blob';
 import { StorageRetryPolicy } from '@azure/storage-blob';
 import { StorageRetryPolicyFactory } from '@azure/storage-blob';
 import { StorageRetryPolicyType } from '@azure/storage-blob';
-import { StorageSharedKeyCredential } from '@azure/storage-blob';
-import { StorageSharedKeyCredentialPolicy } from '@azure/storage-blob';
+import type { StorageSharedKeyCredential as StorageSharedKeyCredential_2 } from '@azure/storage-blob';
 import type { TokenCredential } from '@azure/core-auth';
 import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
 import { UserDelegationKey } from '@azure/storage-common';
@@ -99,54 +98,8 @@
     // (undocumented)
     startsOn?: Date;
 }
 
-// @public
-export class AccountSASPermissions {
-    add: boolean;
-    create: boolean;
-    delete: boolean;
-    list: boolean;
-    static parse(permissions: string): AccountSASPermissions;
-    process: boolean;
-    read: boolean;
-    toString(): string;
-    update: boolean;
-    write: boolean;
-}
-
-// @public
-export class AccountSASResourceTypes {
-    container: boolean;
-    object: boolean;
-    static parse(resourceTypes: string): AccountSASResourceTypes;
-    service: boolean;
-    toString(): string;
-}
-
-// @public
-export class AccountSASServices {
-    blob: boolean;
-    file: boolean;
-    static parse(services: string): AccountSASServices;
-    queue: boolean;
-    table: boolean;
-    toString(): string;
-}
-
-// @public
-export interface AccountSASSignatureValues {
-    encryptionScope?: string;
-    expiresOn: Date;
-    ipRange?: SasIPRange;
-    permissions: AccountSASPermissions;
-    protocol?: SASProtocol;
-    resourceTypes: string;
-    services: string;
-    startsOn?: Date;
-    version?: string;
-}
-
 export { AnonymousCredential }
 
 export { AnonymousCredentialPolicy }
 
@@ -252,9 +205,11 @@
     contentType?: string;
     encryptionScope?: string;
     expiresOn?: Date;
     identifier?: string;
+    // Warning: (ae-forgotten-export) The symbol "SasIPRange" needs to be exported by the entry point index.d.ts
     ipRange?: SasIPRange;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
     startsOn?: Date;
     version?: string;
 }
<<<<<<< HEAD
@@ -278,10 +233,8 @@
=======
@@ -278,10 +232,8 @@
=======
     // (undocumented)
     requestHeaders?: Record<string, string>;
     // (undocumented)
@@ -281,10 +235,8 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
     // (undocumented)
     requestHeaders?: Record<string, string>;
     // (undocumented)
@@ -282,10 +236,8 @@
>>>>>>> 01a4ce5b39 (Merge main)
 export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
-export { CredentialPolicyCreator }
-
 // @public
 export class DataLakeAclChangeFailedError extends Error {
     constructor(error: RestError | Error, continuationToken?: string);
     continuationToken?: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -303,8 +256,9 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -303,8 +255,9 @@
=======
@@ -302,8 +254,9 @@
=======
     // (undocumented)
     requestHeaders?: Record<string, string>;
     // (undocumented)
@@ -314,8 +269,9 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -317,8 +269,9 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -318,8 +270,9 @@
>>>>>>> 01a4ce5b39 (Merge main)
 }
 
 // @public
 export class DataLakeFileClient extends DataLakePathClient {
+    // Warning: (ae-forgotten-export) The symbol "StorageSharedKeyCredential" needs to be exported by the entry point index.d.ts
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     append(body: HttpRequestBody, offset: number, length: number, options?: FileAppendOptions): Promise<FileAppendResponse>;
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -405,53 +359,13 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -405,53 +358,13 @@
=======
<<<<<<< HEAD
@@ -404,53 +357,13 @@
=======
@@ -426,57 +382,13 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -429,57 +382,13 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -430,57 +383,13 @@
>>>>>>> 01a4ce5b39 (Merge main)
 export interface DataLakeRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {
 }
 
 // @public
-export class DataLakeSASPermissions {
-    add: boolean;
-    create: boolean;
-    delete: boolean;
-    execute: boolean;
-    manageAccessControl: boolean;
-    manageOwnership: boolean;
-    move: boolean;
-    static parse(permissions: string): DataLakeSASPermissions;
-    read: boolean;
-    toString(): string;
-    write: boolean;
-}
-
-// @public
-export interface DataLakeSASSignatureValues {
-    agentObjectId?: string;
-    cacheControl?: string;
-    contentDisposition?: string;
-    contentEncoding?: string;
-    contentLanguage?: string;
-    contentType?: string;
-    correlationId?: string;
-    delegatedUserObjectId?: string;
-    directoryDepth?: number;
-    encryptionScope?: string;
-    expiresOn?: Date;
-    fileSystemName: string;
-    identifier?: string;
-    ipRange?: SasIPRange;
-    isDirectory?: boolean;
-    pathName?: string;
-    permissions?: DataLakeSASPermissions | DirectorySASPermissions | FileSystemSASPermissions;
-    preauthorizedAgentObjectId?: string;
-    protocol?: SASProtocol;
-    // (undocumented)
-    requestHeaders?: Record<string, string>;
-    // (undocumented)
-    requestQueryParameters?: Record<string, string>;
-    snapshotTime?: string;
-    startsOn?: Date;
-    version?: string;
-}
-
-// @public
 export class DataLakeServiceClient extends StorageClient {
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     static fromConnectionString(connectionString: string, options?: DataLakeClientOptions): DataLakeServiceClient;
+    // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     getFileSystemClient(fileSystemName: string): DataLakeFileSystemClient;
     getProperties(options?: ServiceGetPropertiesOptions): Promise<DataLakeServiceGetPropertiesResponse>;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -503,28 +417,13 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -503,28 +416,13 @@
=======
<<<<<<< HEAD
@@ -502,28 +415,13 @@
=======
@@ -532,28 +444,13 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -535,28 +444,13 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -536,28 +445,13 @@
>>>>>>> 01a4ce5b39 (Merge main)
 }
 
 // @public
 export interface DirectoryGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "DirectorySASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: DirectorySASPermissions;
 }
 
 // @public
-export class DirectorySASPermissions {
-    add: boolean;
-    create: boolean;
-    delete: boolean;
-    execute: boolean;
-    list: boolean;
-    manageAccessControl: boolean;
-    manageOwnership: boolean;
-    move: boolean;
-    static parse(permissions: string): DirectorySASPermissions;
-    read: boolean;
-    toString(): string;
-    write: boolean;
-}
-
-// @public
 export type EncryptionAlgorithmType = string;
 
 // @public (undocumented)
 export interface FileAppendOptions extends CommonOptions {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -588,8 +487,9 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -588,8 +486,9 @@
=======
<<<<<<< HEAD
@@ -587,8 +485,9 @@
=======
@@ -619,8 +516,9 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -622,8 +516,9 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -623,8 +517,9 @@
>>>>>>> 01a4ce5b39 (Merge main)
 export type FileFlushResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
 
 // @public
 export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "DataLakeSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: DataLakeSASPermissions;
 }
 
 // @public
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -853,8 +753,9 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -853,8 +752,9 @@
=======
<<<<<<< HEAD
@@ -852,8 +751,9 @@
=======
@@ -892,8 +790,9 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -895,8 +790,9 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -896,8 +791,9 @@
>>>>>>> 01a4ce5b39 (Merge main)
 }
 
 // @public
 export interface FileSystemGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "FileSystemSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: FileSystemSASPermissions;
 }
 
 // @public (undocumented)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1001,24 +902,8 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -1001,24 +901,8 @@
=======
<<<<<<< HEAD
@@ -1000,24 +900,8 @@
=======
@@ -1040,24 +939,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -1043,24 +939,8 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -1044,24 +940,8 @@
>>>>>>> 01a4ce5b39 (Merge main)
 
 // @public
 export type FileSystemRenameResponse = ContainerRenameResponse;
 
-// @public
-export class FileSystemSASPermissions {
-    add: boolean;
-    create: boolean;
-    delete: boolean;
-    execute: boolean;
-    list: boolean;
-    manageAccessControl: boolean;
-    manageOwnership: boolean;
-    move: boolean;
-    static parse(permissions: string): FileSystemSASPermissions;
-    read: boolean;
-    toString(): string;
-    write: boolean;
-}
-
 // @public (undocumented)
 export interface FileSystemSetAccessPolicyHeaders {
     // (undocumented)
     clientRequestId?: string;
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1089,17 +974,8 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -1089,17 +973,8 @@
=======
<<<<<<< HEAD
@@ -1088,17 +972,8 @@
=======
@@ -1128,17 +1011,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -1131,17 +1011,8 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -1132,17 +1012,8 @@
>>>>>>> 01a4ce5b39 (Merge main)
 // @public (undocumented)
 export type FileUploadResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
 
 // @public
-export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
-export function generateDataLakeSASQueryParameters(dataLakeSASSignatureValues: DataLakeSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
-export function generateDataLakeSASQueryParameters(dataLakeSASSignatureValues: DataLakeSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
-
-// @public
 export function getDataLakeServiceAccountAudience(storageAccountName: string): string;
 
 export { HttpHeaders }
 
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1208,10 +1084,8 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -1208,10 +1083,8 @@
>>>>>>> e7d1e40d9a (STG101)
=======
@@ -1251,10 +1122,8 @@
>>>>>>> 01a4ce5b39 (Merge main)
 
 // @public
 export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
-export { NodeJSReadableStream }
-
 // @public (undocumented)
 export interface Path {
     // (undocumented)
     contentLength?: number;
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1873,74 +1747,8 @@
=======
@@ -1873,74 +1746,8 @@
=======
<<<<<<< HEAD
@@ -1870,74 +1745,8 @@
=======
@@ -1913,74 +1787,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -1916,74 +1787,8 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -1925,80 +1794,8 @@
>>>>>>> 01a4ce5b39 (Merge main)
     // (undocumented)
     write: boolean;
 }
 
-// @public
-export interface SasIPRange {
-    end?: string;
-    start: string;
-}
-
-// @public
-export enum SASProtocol {
-    Https = "https",
-    HttpsAndHttp = "https,http"
-}
-
-// @public
-export class SASQueryParameters {
-    constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string, userDelegationKey?: UserDelegationKey, directoryDepth?: number, preauthorizedAgentObjectId?: string, agentObjectId?: string, correlationId?: string, encryptionScope?: string, delegatedUserObjectId?: string, requestHeaderKeys?: string, requestQueryParameterKeys?: string);
-    constructor(version: string, signature: string, options?: SASQueryParametersOptions);
-    readonly agentObjectId?: string;
-    readonly cacheControl?: string;
-    readonly contentDisposition?: string;
-    readonly contentEncoding?: string;
-    readonly contentLanguage?: string;
-    readonly contentType?: string;
-    readonly correlationId?: string;
-    readonly delegatedUserObjectId?: string;
-    readonly directoryDepth?: number;
-    readonly encryptionScope?: string;
-    readonly expiresOn?: Date;
-    readonly identifier?: string;
-    get ipRange(): SasIPRange | undefined;
-    readonly permissions?: string;
-    readonly preauthorizedAgentObjectId?: string;
-    readonly protocol?: SASProtocol;
-    readonly requestHeaderKeys?: string;
-    readonly requestQueryParameterKeys?: string;
-    readonly resource?: string;
-    readonly resourceTypes?: string;
-    readonly services?: string;
-    readonly signature: string;
-    readonly startsOn?: Date;
-    toString(): string;
-    readonly version: string;
-}
-
-// @public
-export interface SASQueryParametersOptions {
-    agentObjectId?: string;
-    cacheControl?: string;
-    contentDisposition?: string;
-    contentEncoding?: string;
-    contentLanguage?: string;
-    contentType?: string;
-    correlationId?: string;
-    delegatedUserObjectId?: string;
-    directoryDepth?: number;
-    encryptionScope?: string;
-    expiresOn?: Date;
-    identifier?: string;
-    ipRange?: SasIPRange;
-    permissions?: string;
-    preauthorizedAgentObjectId?: string;
-    protocol?: SASProtocol;
-    // (undocumented)
-    requestHeaderKeys?: string;
-    // (undocumented)
-    requestQueryParameterKeys?: string;
-    resource?: string;
-    resourceTypes?: string;
-    services?: string;
-    startsOn?: Date;
-    userDelegationKey?: UserDelegationKey;
-}
-
 export { ServiceClientOptions }
 
 // @public
 export interface ServiceGenerateAccountSasUrlOptions {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
@@ -2045,12 +1853,8 @@
=======
=======
>>>>>>> fa7aedf037 (STG101)
<<<<<<< HEAD
@@ -2045,12 +1852,8 @@
=======
<<<<<<< HEAD
@@ -2042,12 +1851,8 @@
=======
@@ -2096,12 +1904,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
<<<<<<< HEAD
>>>>>>> e7d1e40d9a (STG101)
=======
=======
@@ -2099,12 +1904,8 @@
>>>>>>> fc0eb7e65c (STG101)
>>>>>>> fa7aedf037 (STG101)
=======
@@ -2114,12 +1911,8 @@
>>>>>>> 01a4ce5b39 (Merge main)
 export { StorageRetryPolicyFactory }
 
 export { StorageRetryPolicyType }
 
-export { StorageSharedKeyCredential }
-
-export { StorageSharedKeyCredentialPolicy }
-
 // @public (undocumented)
 export const ToBlobEndpointHostMappings: string[][];
 
 // @public (undocumented)

```