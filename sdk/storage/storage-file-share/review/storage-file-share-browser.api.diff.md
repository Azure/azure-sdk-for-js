# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -11,15 +11,11 @@
 import { BaseRequestPolicy } from '@azure/storage-common';
 import { ClientOptions } from '@azure-rest/core-client';
 import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
-import { CredentialPolicyCreator } from '@azure/storage-common';
 import type { ExtendedServiceClientOptions } from '@azure/core-http-compat';
 import type { FullOperationResponse } from '@azure-rest/core-client';
-import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
-import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
-import type { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
-import { isRestError } from '@azure/core-rest-pipeline';
+import type { HttpHeadersLike } from '@azure/core-http-compat';
 import type { KeepAliveOptions } from '@azure/core-http-compat';
 import type { NodeJSReadableStream } from '@azure/storage-common';
 import { NodeReadableStream } from '@azure/core-rest-pipeline';
 import { OperationOptions } from '@azure-rest/core-client';
@@ -27,77 +23,31 @@
 import type { PagedAsyncIterableIterator } from '@azure/core-paging';
 import { Pipeline as Pipeline_2 } from '@azure/core-rest-pipeline';
 import type { ProxySettings } from '@azure/core-rest-pipeline';
 import type { Readable } from 'node:stream';
+import type { RequestBodyType } from '@azure/core-rest-pipeline';
 import { RequestPolicy } from '@azure/core-http-compat';
 import { RequestPolicyFactory } from '@azure/core-http-compat';
-import { RequestPolicyOptionsLike as RequestPolicyOptions } from '@azure/core-http-compat';
 import { RestError } from '@azure/core-rest-pipeline';
 import { StorageBrowserPolicyFactory } from '@azure/storage-common';
 import { StorageRetryOptions } from '@azure/storage-common';
 import { StorageRetryPolicy } from '@azure/storage-common';
 import { StorageRetryPolicyFactory } from '@azure/storage-common';
 import { StorageRetryPolicyType } from '@azure/storage-common';
-import { StorageSharedKeyCredential } from '@azure/storage-common';
-import { StorageSharedKeyCredentialPolicy } from '@azure/storage-common';
+import type { StorageSharedKeyCredential } from '@azure/storage-common';
 import { TokenCredential } from '@azure/core-auth';
 import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
 import { UserDelegationKey } from '@azure/storage-common';
-import { WebResourceLike as WebResource } from '@azure/core-http-compat';
+import type { WebResourceLike } from '@azure/core-http-compat';
 
 // @public
 export interface AccessPolicy {
     expiresOn?: string;
     permissions?: string;
     startsOn?: string;
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
 
@@ -127,8 +77,9 @@
     contentType?: string;
     expiresOn?: Date;
     identifier?: string;
     ipRange?: SasIPRange;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
     startsOn?: Date;
     version?: string;
 }
@@ -165,10 +116,8 @@
 export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
-export { CredentialPolicyCreator }
-
 // @public
 export type DeleteSnapshotsOptionType = "include" | "include-leased";
 
 // @public
@@ -192,8 +141,9 @@
     fileParentId?: string;
     filePermissionKey?: string;
     isServerEncrypted?: boolean;
     lastModified?: Date;
+    // Warning: (ae-forgotten-export) The symbol "FilePosixProperties" needs to be exported by the entry point index.d.ts
     posixProperties?: FilePosixProperties;
     requestId?: string;
     version?: string;
 }
@@ -202,11 +152,14 @@
 export interface DirectoryCreateIfNotExistsResponse extends DirectoryCreateResponse {
     succeeded: boolean;
 }
 
+// Warning: (ae-forgotten-export) The symbol "FileAndDirectoryCreateCommonOptions" needs to be exported by the entry point index.d.ts
+//
 // @public
 export interface DirectoryCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
     abortSignal?: AbortSignalLike;
+    // Warning: (ae-forgotten-export) The symbol "Metadata" needs to be exported by the entry point index.d.ts
     metadata?: Metadata;
 }
 
 // @public
@@ -357,8 +310,10 @@
     maxResults?: number;
     recursive?: boolean;
 }
 
+// Warning: (ae-forgotten-export) The symbol "FileAndDirectorySetPropertiesCommonOptions" needs to be exported by the entry point index.d.ts
+//
 // @public (undocumented)
 export interface DirectoryProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
     abortSignal?: AbortSignalLike;
 }
@@ -454,32 +409,8 @@
 
 // @public
 export type FileAbortCopyResponse = WithResponse<FileAbortCopyHeaders, FileAbortCopyHeaders>;
 
-// @public (undocumented)
-export interface FileAndDirectoryCreateCommonOptions {
-    changeTime?: Date | TimeNowType;
-    creationTime?: Date | TimeNowType;
-    fileAttributes?: FileSystemAttributes;
-    filePermission?: string | FilePermissionInheritType;
-    filePermissionFormat?: FilePermissionFormat;
-    filePermissionKey?: string;
-    lastWriteTime?: Date | TimeNowType;
-    posixProperties?: FilePosixProperties;
-}
-
-// @public (undocumented)
-export interface FileAndDirectorySetPropertiesCommonOptions {
-    changeTime?: Date | TimeNowType;
-    creationTime?: Date | TimeNowType | TimePreserveType;
-    fileAttributes?: FileSystemAttributes | FileAttributesPreserveType;
-    filePermission?: string | FilePermissionInheritType | FilePermissionPreserveType;
-    filePermissionFormat?: FilePermissionFormat;
-    filePermissionKey?: string;
-    lastWriteTime?: Date | TimeNowType | TimePreserveType;
-    posixProperties?: FilePosixProperties;
-}
-
 // @public
 export type FileAttributesPreserveType = "preserve";
 
 // @public
@@ -544,12 +475,13 @@
 
 // @public
 export interface FileCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
     abortSignal?: AbortSignalLike;
-    content?: HttpRequestBody;
+    content?: RequestBodyType;
     contentChecksumAlgorithm?: StorageChecksumAlgorithm;
     contentLength?: number;
     contentMD5?: Uint8Array;
+    // Warning: (ae-forgotten-export) The symbol "FileHttpHeaders" needs to be exported by the entry point index.d.ts
     fileHttpHeaders?: FileHttpHeaders;
     leaseAccessConditions?: LeaseAccessConditions;
     metadata?: Metadata;
     onProgress?: (progress: TransferProgressEvent) => void;
@@ -703,8 +635,9 @@
 export type FileForceCloseHandlesResponse = WithResponse<CloseHandlesInfo & FileCloseHandlesHeaders, FileForceCloseHandlesHeaders>;
 
 // @public
 export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "FileSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: FileSASPermissions;
 }
 
 // @public
@@ -800,18 +733,8 @@
 
 // @public
 export type FileGetSymbolicLinkResponse = WithResponse<FileGetSymbolicLinkHeaders, FileGetSymbolicLinkHeaders>;
 
-// @public (undocumented)
-export interface FileHttpHeaders {
-    fileCacheControl?: string;
-    fileContentDisposition?: string;
-    fileContentEncoding?: string;
-    fileContentLanguage?: string;
-    fileContentMD5?: Uint8Array;
-    fileContentType?: string;
-}
-
 // @public
 export interface FileItem {
     // (undocumented)
     attributes?: string;
@@ -870,17 +793,8 @@
 
 // @public
 export type FilePermissionPreserveType = "preserve";
 
-// @public
-export interface FilePosixProperties {
-    fileMode?: NfsFileMode;
-    fileType?: NfsFileType;
-    group?: string;
-    linkCount?: number;
-    owner?: string;
-}
-
 // @public (undocumented)
 export interface FileProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
     abortSignal?: AbortSignalLike;
     fileHttpHeaders?: FileHttpHeaders;
@@ -954,37 +868,8 @@
     fileItems: FileItem[];
 }
 
 // @public
-export class FileSASPermissions {
-    create: boolean;
-    delete: boolean;
-    static parse(permissions: string): FileSASPermissions;
-    read: boolean;
-    toString(): string;
-    write: boolean;
-}
-
-// @public
-export interface FileSASSignatureValues {
-    cacheControl?: string;
-    contentDisposition?: string;
-    contentEncoding?: string;
-    contentLanguage?: string;
-    contentType?: string;
-    delegatedUserObjectId?: string;
-    expiresOn?: Date;
-    filePath?: string;
-    identifier?: string;
-    ipRange?: SasIPRange;
-    permissions?: FileSASPermissions | ShareSASPermissions;
-    protocol?: SASProtocol;
-    shareName: string;
-    startsOn?: Date;
-    version?: string;
-}
-
-// @public
 export interface FileServiceProperties {
     cors?: CorsRule[];
     hourMetrics?: Metrics;
     minuteMetrics?: Metrics;
@@ -1147,20 +1032,8 @@
     onProgress?: (progress: TransferProgressEvent) => void;
 }
 
 // @public
-export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public (undocumented)
-export function generateFileSASQueryParameters(fileSASSignatureValues: FileSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
-
-// @public (undocumented)
-export function generateFileSASQueryParameters(fileSASSignatureValues: FileSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
-export function getFileServiceAccountAudience(storageAccountName: string): string;
-
-// @public
 export interface HandleItem {
     // (undocumented)
     accessRightList?: ShareFileHandleAccessRights[];
     clientIp: string;
@@ -1179,26 +1052,18 @@
     scheme: string;
     value: string;
 }
 
-export { HttpHeaders }
-
-export { HttpOperationResponse }
-
-export { HttpRequestBody }
-
 // @public
 export interface HttpResponse {
-    headers: HttpHeaders;
-    request: WebResource;
+    headers: HttpHeadersLike;
+    request: WebResourceLike;
     status: number;
 }
 
 // @public
 export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
 
-export { isRestError }
-
 // @public
 export enum KnownShareTokenIntent {
     // (undocumented)
     Backup = "backup"
@@ -1307,14 +1172,8 @@
 
 // @public
 export const logger: AzureLogger;
 
-// @public (undocumented)
-export interface Metadata {
-    // (undocumented)
-    [propertyName: string]: string;
-}
-
 // @public
 export interface Metrics {
     enabled: boolean;
     includeAPIs?: boolean;
@@ -1328,23 +1187,15 @@
 // @public
 export function newPipeline(credential?: Credential_2 | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
 // @public
-export interface NfsFileMode {
-    effectiveGroupIdentity: boolean;
-    effectiveUserIdentity: boolean;
-    group: PosixRolePermissions;
-    other: PosixRolePermissions;
-    owner: PosixRolePermissions;
-    stickyBit: boolean;
-}
-
-// @public
 export type NfsFileType = string;
 
 // @public
 export type OwnerCopyMode = "source" | "override";
 
+// Warning: (ae-forgotten-export) The symbol "NfsFileMode" needs to be exported by the entry point index.d.ts
+//
 // @public
 export function parseOctalFileMode(input?: string): NfsFileMode | undefined;
 
 // @public
@@ -1374,15 +1225,8 @@
     shareTokenIntent?: ShareTokenIntent;
 }
 
 // @public
-export interface PosixRolePermissions {
-    execute: boolean;
-    read: boolean;
-    write: boolean;
-}
-
-// @public
 interface Range_2 {
     count?: number;
     offset: number;
 }
@@ -1399,15 +1243,8 @@
     blobBody?: Promise<Blob>;
     readableStreamBody?: NodeJSReadableStream;
 };
 
-export { RequestPolicy as IHttpClient }
-export { RequestPolicy }
-
-export { RequestPolicyFactory }
-
-export { RequestPolicyOptions }
-
 // @public
 export interface ResponseLike {
     _response: HttpResponse;
 }
@@ -1442,37 +1279,8 @@
     start: string;
 }
 
 // @public
-export enum SASProtocol {
-    Https = "https",
-    HttpsAndHttp = "https,http"
-}
-
-// @public
-export class SASQueryParameters {
-    constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string, userDelegationKey?: UserDelegationKey, delegatedUserObjectId?: string);
-    readonly cacheControl?: string;
-    readonly contentDisposition?: string;
-    readonly contentEncoding?: string;
-    readonly contentLanguage?: string;
-    readonly contentType?: string;
-    readonly delegatedUserObjectId?: string;
-    readonly expiresOn?: Date;
-    readonly identifier?: string;
-    get ipRange(): SasIPRange | undefined;
-    readonly permissions?: string;
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
 export interface ServiceClientOptions {
     httpClient?: RequestPolicy;
     requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
 }
@@ -1648,8 +1456,9 @@
     };
     paidBurstingEnabled?: boolean;
     paidBurstingMaxBandwidthMibps?: number;
     paidBurstingMaxIops?: number;
+    // Warning: (ae-forgotten-export) The symbol "ShareProtocols" needs to be exported by the entry point index.d.ts
     protocols?: ShareProtocols;
     quota?: number;
     rootSquash?: ShareRootSquash;
     shareProvisionedBandwidthMibps?: number;
@@ -1811,9 +1620,9 @@
     get shareName(): string;
     startCopyFromURL(copySource: string, options?: FileStartCopyOptions): Promise<FileStartCopyResponse>;
     uploadData(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options?: FileParallelUploadOptions): Promise<void>;
     uploadFile(filePath: string, options?: FileParallelUploadOptions): Promise<void>;
-    uploadRange(body: HttpRequestBody, offset: number, contentLength: number, options?: FileUploadRangeOptions): Promise<FileUploadRangeResponse>;
+    uploadRange(body: RequestBodyType, offset: number, contentLength: number, options?: FileUploadRangeOptions): Promise<FileUploadRangeResponse>;
     uploadRangeFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: FileUploadRangeFromURLOptions): Promise<FileUploadRangeFromURLResponse>;
     uploadResetableStream(streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream, size: number, options?: FileParallelUploadOptions): Promise<void>;
     uploadSeekableBlob(blobFactory: (offset: number, size: number) => Blob, size: number, options?: FileParallelUploadOptions): Promise<void>;
     uploadStream(stream: Readable, size: number, bufferSize: number, maxBuffers: number, options?: FileUploadStreamOptions): Promise<void>;
@@ -1832,8 +1641,9 @@
 }
 
 // @public
 export interface ShareGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "ShareSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: ShareSASPermissions;
 }
 
 // @public
@@ -2075,14 +1885,8 @@
     rootSquash?: ShareRootSquash;
 }
 
 // @public
-export interface ShareProtocols {
-    nfsEnabled?: boolean;
-    smbEnabled?: boolean;
-}
-
-// @public
 export interface ShareProtocolSettings {
     nfs?: ShareNfsSettings;
     smb?: ShareSmbSettings;
 }
@@ -2090,19 +1894,8 @@
 // @public
 export type ShareRootSquash = "NoRootSquash" | "RootSquash" | "AllSquash";
 
 // @public
-export class ShareSASPermissions {
-    create: boolean;
-    delete: boolean;
-    list: boolean;
-    static parse(permissions: string): ShareSASPermissions;
-    read: boolean;
-    toString(): string;
-    write: boolean;
-}
-
-// @public
 export class ShareServiceClient extends StorageClient {
     constructor(url: string, credential?: Credential_2 | TokenCredential, options?: ShareClientOptions);
     constructor(url: string, pipeline: Pipeline, options?: ShareClientConfig);
     createShare(shareName: string, options?: ShareCreateOptions): Promise<{
@@ -2110,8 +1903,9 @@
         shareClient: ShareClient;
     }>;
     deleteShare(shareName: string, options?: ShareDeleteMethodOptions): Promise<ShareDeleteResponse>;
     static fromConnectionString(connectionString: string, options?: ShareClientOptions): ShareServiceClient;
+    // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
     getShareClient(shareName: string): ShareClient;
@@ -2259,16 +2053,8 @@
 // @public
 export type StorageChecksumAlgorithm = "Auto" | "None" | "Customized" | "StorageCrc64";
 
 // @public
-export enum StorageFileAudience {
-    StorageOAuthScopes = "https://storage.azure.com/.default"
-}
-
-// @public
-export const StorageOAuthScopes: string | string[];
-
-// @public
 export interface StoragePipelineOptions {
     audience?: string;
     httpClient?: RequestPolicy;
     keepAliveOptions?: KeepAliveOptions;
@@ -2284,12 +2070,8 @@
 export { StorageRetryPolicyFactory }
 
 export { StorageRetryPolicyType }
 
-export { StorageSharedKeyCredential }
-
-export { StorageSharedKeyCredentialPolicy }
-
 // @public
 export type TimeNowType = "now";
 
 // @public
@@ -2314,10 +2096,8 @@
     signedVersion: string;
     value: string;
 }
 
-export { WebResource }
-
 // @public
 export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
 
 // (No @packageDocumentation comment for this package)

```