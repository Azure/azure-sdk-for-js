# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -52,10 +52,9 @@
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
@@ -97,54 +96,8 @@
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
 
@@ -250,9 +203,11 @@
     contentType?: string;
     encryptionScope?: string;
     expiresOn?: Date;
     identifier?: string;
+    // Warning: (ae-forgotten-export) The symbol "SasIPRange" needs to be exported by the entry point index.d.ts
     ipRange?: SasIPRange;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
     startsOn?: Date;
     version?: string;
 }
@@ -299,8 +254,9 @@
 }
 
 // @public
 export class DataLakeFileClient extends DataLakePathClient {
+    // Warning: (ae-forgotten-export) The symbol "StorageSharedKeyCredential" needs to be exported by the entry point index.d.ts
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: Pipeline);
     append(body: HttpRequestBody, offset: number, length: number, options?: FileAppendOptions): Promise<FileAppendResponse>;
     create(resourceType: PathResourceTypeModel, options?: PathCreateOptions): Promise<PathCreateResponse>;
@@ -401,53 +357,13 @@
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
-    snapshotTime?: string;
-    startsOn?: Date;
-    version?: string;
-}
-
-// @public
 export class DataLakeServiceClient extends StorageClient {
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: Pipeline);
     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): DataLakeServiceClient;
+    // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     getFileSystemClient(fileSystemName: string): DataLakeFileSystemClient;
     getProperties(options?: ServiceGetPropertiesOptions): Promise<DataLakeServiceGetPropertiesResponse>;
@@ -499,28 +415,13 @@
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
@@ -584,8 +485,9 @@
 export type FileFlushResponse = WithResponse<PathFlushDataHeaders, PathFlushDataHeaders>;
 
 // @public
 export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "DataLakeSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: DataLakeSASPermissions;
 }
 
 // @public
@@ -849,8 +751,9 @@
 }
 
 // @public
 export interface FileSystemGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "FileSystemSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: FileSystemSASPermissions;
 }
 
 // @public (undocumented)
@@ -997,24 +900,8 @@
 
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
@@ -1085,17 +972,8 @@
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
 
@@ -1867,74 +1745,8 @@
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
-    constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string, userDelegationKey?: UserDelegationKey, directoryDepth?: number, preauthorizedAgentObjectId?: string, agentObjectId?: string, correlationId?: string, encryptionScope?: string, delegatedUserObjectId?: string);
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
@@ -2039,12 +1851,8 @@
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