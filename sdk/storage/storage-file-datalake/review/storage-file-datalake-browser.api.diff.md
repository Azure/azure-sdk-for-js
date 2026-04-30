# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
<<<<<<< HEAD
@@ -17,10 +17,10 @@
 import * as coreClient from '@azure/core-client';
=======
@@ -17,9 +17,8 @@
>>>>>>> origin/main
 import * as coreHttpCompat from '@azure/core-http-compat';
 import * as coreRestPipeline from '@azure/core-rest-pipeline';
 import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
-import { CredentialPolicyCreator } from '@azure/storage-common';
 import { ServiceGetPropertiesResponse as DataLakeServiceGetPropertiesResponse } from '@azure/storage-blob';
 import { BlobServiceProperties as DataLakeServiceProperties } from '@azure/storage-blob';
 import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
 import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
<<<<<<< HEAD
@@ -31,9 +31,9 @@
=======
@@ -30,9 +29,9 @@
>>>>>>> origin/main
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
<<<<<<< HEAD
@@ -55,10 +55,9 @@
 import { StorageRetryOptions } from '@azure/storage-blob';
 import { StorageRetryPolicy } from '@azure/storage-blob';
 import { StorageRetryPolicyFactory } from '@azure/storage-blob';
 import { StorageRetryPolicyType } from '@azure/storage-blob';
-import { StorageSharedKeyCredential } from '@azure/storage-blob';
-import { StorageSharedKeyCredentialPolicy } from '@azure/storage-blob';
+import type { StorageSharedKeyCredential as StorageSharedKeyCredential_2 } from '@azure/storage-blob';
 import { Tags } from '@azure/storage-blob';
 import type { TokenCredential } from '@azure/core-auth';
 import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
@@ -101,54 +100,8 @@
=======
@@ -54,10 +53,9 @@
 import { StorageRetryOptions } from '@azure/storage-common';
 import { StorageRetryPolicy } from '@azure/storage-common';
 import { StorageRetryPolicyFactory } from '@azure/storage-common';
 import { StorageRetryPolicyType } from '@azure/storage-common';
-import { StorageSharedKeyCredential } from '@azure/storage-common';
-import { StorageSharedKeyCredentialPolicy } from '@azure/storage-common';
+import type { StorageSharedKeyCredential as StorageSharedKeyCredential_2 } from '@azure/storage-common';
 import type { TokenCredential } from '@azure/core-auth';
 import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
 import { UserDelegationKey } from '@azure/storage-common';
@@ -99,54 +97,8 @@
>>>>>>> origin/main
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
 
<<<<<<< HEAD
@@ -254,9 +207,11 @@
=======
@@ -252,9 +204,11 @@
>>>>>>> origin/main
     contentType?: string;
     encryptionScope?: string;
     expiresOn?: Date;
     identifier?: string;
+    // Warning: (ae-forgotten-export) The symbol "SasIPRange" needs to be exported by the entry point index.d.ts
     ipRange?: SasIPRange;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
     requestHeaders?: RequestHeaders;
     requestQueryParameters?: RequestQueryParameters;
     startsOn?: Date;
<<<<<<< HEAD
@@ -282,10 +237,8 @@
=======
@@ -280,10 +234,8 @@
>>>>>>> origin/main
 export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
-export { CredentialPolicyCreator }
-
 // @public
 export class DataLakeAclChangeFailedError extends Error {
     constructor(error: RestError | Error, continuationToken?: string);
     continuationToken?: string;
<<<<<<< HEAD
@@ -316,8 +269,9 @@
=======
@@ -314,8 +266,9 @@
>>>>>>> origin/main
 }
 
 // @public
 export class DataLakeFileClient extends DataLakePathClient {
+    // Warning: (ae-forgotten-export) The symbol "StorageSharedKeyCredential" needs to be exported by the entry point index.d.ts
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: DataLakeClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: DataLakeClientConfig);
     append(body: HttpRequestBody, offset: number, length: number, options?: FileAppendOptions): Promise<FileAppendResponse>;
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
<<<<<<< HEAD
@@ -428,56 +382,13 @@
=======
@@ -423,55 +376,13 @@
>>>>>>> origin/main
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
-    tag: boolean;
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
-    requestHeaders?: RequestHeaders;
-    requestQueryParameters?: RequestQueryParameters;
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
@@ -530,28 +441,13 @@
=======
@@ -524,28 +435,13 @@
>>>>>>> origin/main
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
@@ -616,8 +512,9 @@
=======
@@ -610,8 +506,9 @@
>>>>>>> origin/main
 export type FileFlushResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
 
 // @public
 export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "DataLakeSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: DataLakeSASPermissions;
 }
 
 // @public
<<<<<<< HEAD
@@ -886,8 +783,9 @@
=======
@@ -880,8 +777,9 @@
>>>>>>> origin/main
 }
 
 // @public
 export interface FileSystemGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "FileSystemSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: FileSystemSASPermissions;
 }
 
 // @public (undocumented)
<<<<<<< HEAD
@@ -1034,25 +932,8 @@
=======
@@ -1028,24 +926,8 @@
>>>>>>> origin/main
 
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
-    tag: boolean;
-    toString(): string;
-    write: boolean;
-}
-
 // @public (undocumented)
 export interface FileSystemSetAccessPolicyHeaders {
     // (undocumented)
     clientRequestId?: string;
<<<<<<< HEAD
@@ -1123,17 +1004,8 @@
=======
@@ -1116,17 +998,8 @@
>>>>>>> origin/main
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
@@ -1242,10 +1114,8 @@
=======
@@ -1235,10 +1108,8 @@
>>>>>>> origin/main
 
 // @public
 export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
-export { NodeJSReadableStream }
-
 // @public (undocumented)
 export interface Path {
     // (undocumented)
     contentLength?: number;
<<<<<<< HEAD
@@ -1997,78 +1867,8 @@
=======
@@ -1908,78 +1779,8 @@
>>>>>>> origin/main
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
-    requestHeaderKeys?: string;
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
@@ -2176,12 +1976,8 @@
=======
@@ -2087,12 +1888,8 @@
>>>>>>> origin/main
 export { StorageRetryPolicyFactory }
 
 export { StorageRetryPolicyType }
 
-export { StorageSharedKeyCredential }
-
-export { StorageSharedKeyCredentialPolicy }
-
 // @public
 export interface TagConditions {
     tagConditions?: string;
 }

```