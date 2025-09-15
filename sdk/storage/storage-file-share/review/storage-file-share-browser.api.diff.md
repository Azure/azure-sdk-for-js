# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -13,84 +13,36 @@
 import * as coreHttpCompat from '@azure/core-http-compat';
 import * as coreRestPipeline from '@azure/core-rest-pipeline';
 import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
-import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
-import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
-import { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
+import type { HttpHeadersLike } from '@azure/core-http-compat';
 import type { KeepAliveOptions } from '@azure/core-http-compat';
 import type { OperationTracingOptions } from '@azure/core-tracing';
 import type { PagedAsyncIterableIterator } from '@azure/core-paging';
 import type { ProxySettings } from '@azure/core-rest-pipeline';
 import { Readable } from 'node:stream';
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
 import type { TokenCredential } from '@azure/core-auth';
 import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
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
 
@@ -120,8 +72,9 @@
     contentType?: string;
     expiresOn?: Date;
     identifier?: string;
     ipRange?: SasIPRange;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
     startsOn?: Date;
     version?: string;
 }
@@ -183,8 +136,9 @@
     fileParentId?: string;
     filePermissionKey?: string;
     isServerEncrypted?: boolean;
     lastModified?: Date;
+    // Warning: (ae-forgotten-export) The symbol "FilePosixProperties" needs to be exported by the entry point index.d.ts
     posixProperties?: FilePosixProperties;
     requestId?: string;
     version?: string;
 }
@@ -193,11 +147,14 @@
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
@@ -348,8 +305,10 @@
     maxResults?: number;
     recursive?: boolean;
 }
 
+// Warning: (ae-forgotten-export) The symbol "FileAndDirectorySetPropertiesCommonOptions" needs to be exported by the entry point index.d.ts
+//
 // @public (undocumented)
 export interface DirectoryProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
     abortSignal?: AbortSignalLike;
 }
@@ -445,32 +404,8 @@
 
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
@@ -534,9 +469,10 @@
 
 // @public
 export interface FileCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
     abortSignal?: AbortSignalLike;
-    fileHttpHeaders?: FileHttpHeaders;
+    // Warning: (ae-forgotten-export) The symbol "FileHttpHeaders_2" needs to be exported by the entry point index.d.ts
+    fileHttpHeaders?: FileHttpHeaders_2;
     leaseAccessConditions?: LeaseAccessConditions;
     metadata?: Metadata;
 }
 
@@ -694,8 +630,9 @@
 export type FileForceCloseHandlesResponse = WithResponse<CloseHandlesInfo & FileCloseHandlesHeaders, FileForceCloseHandlesHeaders>;
 
 // @public
 export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "FileSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: FileSASPermissions;
 }
 
 // @public
@@ -791,18 +728,8 @@
 
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
@@ -844,9 +771,9 @@
 // @public
 export interface FileParallelUploadOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
     concurrency?: number;
-    fileHttpHeaders?: FileHttpHeaders;
+    fileHttpHeaders?: FileHttpHeaders_2;
     leaseAccessConditions?: LeaseAccessConditions;
     metadata?: Metadata;
     onProgress?: (progress: TransferProgressEvent) => void;
     rangeSize?: number;
@@ -860,21 +787,12 @@
 
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
-    fileHttpHeaders?: FileHttpHeaders;
+    fileHttpHeaders?: FileHttpHeaders_2;
     leaseAccessConditions?: LeaseAccessConditions;
 }
 
 // @public
@@ -944,36 +862,8 @@
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
@@ -1140,24 +1030,15 @@
 
 // @public
 export interface FileUploadStreamOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
-    fileHttpHeaders?: FileHttpHeaders;
+    fileHttpHeaders?: FileHttpHeaders_2;
     leaseAccessConditions?: LeaseAccessConditions;
     metadata?: Metadata;
     onProgress?: (progress: TransferProgressEvent) => void;
 }
 
 // @public
-export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
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
@@ -1176,18 +1057,12 @@
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
@@ -1302,14 +1177,8 @@
 
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
@@ -1323,23 +1192,15 @@
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
@@ -1369,15 +1230,8 @@
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
@@ -1394,15 +1248,8 @@
     blobBody?: Promise<Blob>;
     readableStreamBody?: NodeJS.ReadableStream;
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
@@ -1437,36 +1284,8 @@
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
-    constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string);
-    readonly cacheControl?: string;
-    readonly contentDisposition?: string;
-    readonly contentEncoding?: string;
-    readonly contentLanguage?: string;
-    readonly contentType?: string;
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
@@ -1622,8 +1441,9 @@
     };
     paidBurstingEnabled?: boolean;
     paidBurstingMaxBandwidthMibps?: number;
     paidBurstingMaxIops?: number;
+    // Warning: (ae-forgotten-export) The symbol "ShareProtocols" needs to be exported by the entry point index.d.ts
     protocols?: ShareProtocols;
     quota?: number;
     rootSquash?: ShareRootSquash;
     shareProvisionedBandwidthMibps?: number;
@@ -1776,16 +1596,16 @@
         destinationFileClient: ShareFileClient;
         fileRenameResponse: FileRenameResponse;
     }>;
     resize(length: number, options?: FileResizeOptions): Promise<FileSetHTTPHeadersResponse>;
-    setHttpHeaders(fileHttpHeaders?: FileHttpHeaders, options?: FileSetHttpHeadersOptions): Promise<FileSetHTTPHeadersResponse>;
+    setHttpHeaders(fileHttpHeaders?: FileHttpHeaders_2, options?: FileSetHttpHeadersOptions): Promise<FileSetHTTPHeadersResponse>;
     setMetadata(metadata?: Metadata, options?: FileSetMetadataOptions): Promise<FileSetMetadataResponse>;
     setProperties(properties?: FileProperties): Promise<SetPropertiesResponse>;
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
@@ -1804,8 +1624,9 @@
 }
 
 // @public
 export interface ShareGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "ShareSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: ShareSASPermissions;
 }
 
 // @public
@@ -2030,33 +1851,16 @@
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
     smb?: ShareSmbSettings;
 }
 
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
@@ -2064,8 +1868,9 @@
         shareClient: ShareClient;
     }>;
     deleteShare(shareName: string, options?: ShareDeleteMethodOptions): Promise<ShareDeleteResponse>;
     static fromConnectionString(connectionString: string, options?: ShareClientOptions): ShareServiceClient;
+    // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
     getShareClient(shareName: string): ShareClient;
@@ -2202,16 +2007,8 @@
 
 export { StorageBrowserPolicyFactory }
 
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
@@ -2227,12 +2024,8 @@
 export { StorageRetryPolicyFactory }
 
 export { StorageRetryPolicyType }
 
-export { StorageSharedKeyCredential }
-
-export { StorageSharedKeyCredentialPolicy }
-
 // @public
 export type TimeNowType = "now";
 
 // @public
@@ -2243,10 +2036,8 @@
 
 // @public
 export function toSymbolicFileMode(input?: NfsFileMode): string | undefined;
 
-export { WebResource }
-
 // @public
 export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
 
 // (No @packageDocumentation comment for this package)

```