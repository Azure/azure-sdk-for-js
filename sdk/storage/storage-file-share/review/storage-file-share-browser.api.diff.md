# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -13,87 +13,38 @@
 import * as coreHttpCompat from '@azure/core-http-compat';
 import * as coreRestPipeline from '@azure/core-rest-pipeline';
 import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
-import { CredentialPolicyCreator } from '@azure/storage-common';
-import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
-import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
-import type { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
+import type { HttpHeadersLike } from '@azure/core-http-compat';
 import type { KeepAliveOptions } from '@azure/core-http-compat';
 import type { NodeJSReadableStream } from '@azure/storage-common';
 import type { OperationTracingOptions } from '@azure/core-tracing';
 import type { PagedAsyncIterableIterator } from '@azure/core-paging';
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
 import type { TokenCredential } from '@azure/core-auth';
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
 
@@ -123,8 +74,9 @@
     contentType?: string;
     expiresOn?: Date;
     identifier?: string;
     ipRange?: SasIPRange;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
     startsOn?: Date;
     version?: string;
 }
@@ -161,10 +113,8 @@
 export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
-export { CredentialPolicyCreator }
-
 // @public
 export type DeleteSnapshotsOptionType = "include" | "include-leased";
 
 // @public
@@ -188,8 +138,9 @@
     fileParentId?: string;
     filePermissionKey?: string;
     isServerEncrypted?: boolean;
     lastModified?: Date;
+    // Warning: (ae-forgotten-export) The symbol "FilePosixProperties" needs to be exported by the entry point index.d.ts
     posixProperties?: FilePosixProperties;
     requestId?: string;
     version?: string;
 }
@@ -198,11 +149,14 @@
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
@@ -353,8 +307,10 @@
     maxResults?: number;
     recursive?: boolean;
 }
 
+// Warning: (ae-forgotten-export) The symbol "FileAndDirectorySetPropertiesCommonOptions" needs to be exported by the entry point index.d.ts
+//
 // @public (undocumented)
 export interface DirectoryProperties extends FileAndDirectorySetPropertiesCommonOptions, CommonOptions {
     abortSignal?: AbortSignalLike;
 }
@@ -450,32 +406,8 @@
 
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
@@ -539,9 +471,10 @@
 
 // @public
 export interface FileCreateOptions extends FileAndDirectoryCreateCommonOptions, CommonOptions {
     abortSignal?: AbortSignalLike;
-    fileHttpHeaders?: FileHttpHeaders;
+    // Warning: (ae-forgotten-export) The symbol "FileHttpHeaders_2" needs to be exported by the entry point index.d.ts
+    fileHttpHeaders?: FileHttpHeaders_2;
     leaseAccessConditions?: LeaseAccessConditions;
     metadata?: Metadata;
 }
 
<<<<<<< HEAD
<<<<<<< HEAD
@@ -699,8 +632,9 @@
=======
<<<<<<< HEAD
@@ -698,8 +631,9 @@
=======
@@ -704,8 +640,9 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -707,8 +640,9 @@
>>>>>>> fc0eb7e65c (STG101)
 export type FileForceCloseHandlesResponse = WithResponse<CloseHandlesInfo & FileCloseHandlesHeaders, FileForceCloseHandlesHeaders>;
 
 // @public
 export interface FileGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "FileSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: FileSASPermissions;
 }
 
 // @public
<<<<<<< HEAD
<<<<<<< HEAD
@@ -796,18 +730,8 @@
=======
<<<<<<< HEAD
@@ -795,18 +729,8 @@
=======
@@ -801,18 +738,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -804,18 +738,8 @@
>>>>>>> fc0eb7e65c (STG101)
 
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -849,9 +773,9 @@
=======
<<<<<<< HEAD
@@ -848,9 +772,9 @@
>>>>>>> 6d421431c9 (STG101)
 // @public
 export interface FileParallelUploadOptions extends CommonOptions {
=======
@@ -856,9 +783,9 @@
>>>>>>> 367b8bcce1 (STG101)
=======
@@ -859,9 +783,9 @@
>>>>>>> fc0eb7e65c (STG101)
     abortSignal?: AbortSignalLike;
     concurrency?: number;
     // (undocumented)
     contentChecksumAlgorithm?: StorageChecksumAlgorithm;
-    fileHttpHeaders?: FileHttpHeaders;
+    fileHttpHeaders?: FileHttpHeaders_2;
     leaseAccessConditions?: LeaseAccessConditions;
     metadata?: Metadata;
     onProgress?: (progress: TransferProgressEvent) => void;
     rangeSize?: number;
<<<<<<< HEAD
<<<<<<< HEAD
@@ -865,21 +789,12 @@
=======
<<<<<<< HEAD
@@ -864,21 +788,12 @@
=======
@@ -872,21 +799,12 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -875,21 +799,12 @@
>>>>>>> fc0eb7e65c (STG101)
 
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -949,37 +864,8 @@
=======
<<<<<<< HEAD
@@ -948,37 +863,8 @@
=======
@@ -956,37 +874,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -959,37 +874,8 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1146,27 +1032,15 @@
=======
<<<<<<< HEAD
@@ -1145,27 +1031,15 @@
>>>>>>> 6d421431c9 (STG101)
 
 // @public
=======
@@ -1158,27 +1047,15 @@
>>>>>>> 367b8bcce1 (STG101)
=======
@@ -1161,27 +1047,15 @@
>>>>>>> fc0eb7e65c (STG101)
 export interface FileUploadStreamOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
     // (undocumented)
     contentChecksumAlgorithm?: StorageChecksumAlgorithm;
-    fileHttpHeaders?: FileHttpHeaders;
+    fileHttpHeaders?: FileHttpHeaders_2;
     leaseAccessConditions?: LeaseAccessConditions;
     metadata?: Metadata;
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1185,18 +1059,12 @@
=======
<<<<<<< HEAD
@@ -1184,18 +1058,12 @@
=======
@@ -1197,18 +1074,12 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1200,18 +1074,12 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1311,14 +1179,8 @@
=======
<<<<<<< HEAD
@@ -1310,14 +1178,8 @@
=======
@@ -1323,14 +1194,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1326,14 +1194,8 @@
>>>>>>> fc0eb7e65c (STG101)
 
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1332,23 +1194,15 @@
=======
<<<<<<< HEAD
@@ -1331,23 +1193,15 @@
=======
@@ -1344,23 +1209,15 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1347,23 +1209,15 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1378,15 +1232,8 @@
=======
<<<<<<< HEAD
@@ -1377,15 +1231,8 @@
=======
@@ -1390,15 +1247,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1393,15 +1247,8 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1403,15 +1250,8 @@
=======
<<<<<<< HEAD
@@ -1402,15 +1249,8 @@
=======
@@ -1415,15 +1265,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1418,15 +1265,8 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1446,37 +1286,8 @@
=======
<<<<<<< HEAD
@@ -1445,37 +1285,8 @@
=======
@@ -1458,37 +1301,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1461,37 +1301,8 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1650,8 +1461,9 @@
=======
<<<<<<< HEAD
@@ -1649,8 +1460,9 @@
=======
@@ -1669,8 +1483,9 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1669,8 +1480,9 @@
>>>>>>> fc0eb7e65c (STG101)
     };
     paidBurstingEnabled?: boolean;
     paidBurstingMaxBandwidthMibps?: number;
     paidBurstingMaxIops?: number;
+    // Warning: (ae-forgotten-export) The symbol "ShareProtocols" needs to be exported by the entry point index.d.ts
     protocols?: ShareProtocols;
     quota?: number;
     rootSquash?: ShareRootSquash;
     shareProvisionedBandwidthMibps?: number;
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1806,16 +1618,16 @@
=======
<<<<<<< HEAD
@@ -1805,16 +1617,16 @@
=======
@@ -1825,16 +1640,16 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1825,16 +1637,16 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -1834,8 +1646,9 @@
=======
<<<<<<< HEAD
@@ -1833,8 +1645,9 @@
=======
@@ -1853,8 +1668,9 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -1853,8 +1665,9 @@
>>>>>>> fc0eb7e65c (STG101)
 }
 
 // @public
 export interface ShareGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "ShareSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: ShareSASPermissions;
 }
 
 // @public
<<<<<<< HEAD
<<<<<<< HEAD
@@ -2070,14 +1883,8 @@
=======
<<<<<<< HEAD
@@ -2069,14 +1882,8 @@
=======
@@ -2099,14 +1915,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -2099,14 +1912,8 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -2085,19 +1892,8 @@
=======
<<<<<<< HEAD
@@ -2084,19 +1891,8 @@
=======
@@ -2114,19 +1924,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -2114,19 +1921,8 @@
>>>>>>> fc0eb7e65c (STG101)
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -2105,8 +1901,9 @@
=======
<<<<<<< HEAD
@@ -2104,8 +1900,9 @@
=======
@@ -2134,8 +1933,9 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -2134,8 +1930,9 @@
>>>>>>> fc0eb7e65c (STG101)
         shareClient: ShareClient;
     }>;
     deleteShare(shareName: string, options?: ShareDeleteMethodOptions): Promise<ShareDeleteResponse>;
     static fromConnectionString(connectionString: string, options?: ShareClientOptions): ShareServiceClient;
+    // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
     getShareClient(shareName: string): ShareClient;
<<<<<<< HEAD
<<<<<<< HEAD
@@ -2250,16 +2047,8 @@
=======
<<<<<<< HEAD
@@ -2249,16 +2046,8 @@
=======
@@ -2281,16 +2081,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -2281,16 +2078,8 @@
>>>>>>> fc0eb7e65c (STG101)
 
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
<<<<<<< HEAD
<<<<<<< HEAD
@@ -2275,12 +2064,8 @@
=======
<<<<<<< HEAD
@@ -2274,12 +2063,8 @@
=======
@@ -2306,12 +2098,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -2306,12 +2095,8 @@
>>>>>>> fc0eb7e65c (STG101)
 export { StorageRetryPolicyFactory }
 
 export { StorageRetryPolicyType }
 
-export { StorageSharedKeyCredential }
-
-export { StorageSharedKeyCredentialPolicy }
-
 // @public
 export type TimeNowType = "now";
 
 // @public
<<<<<<< HEAD
<<<<<<< HEAD
@@ -2304,10 +2089,8 @@
=======
<<<<<<< HEAD
@@ -2303,10 +2088,8 @@
=======
@@ -2336,10 +2124,8 @@
>>>>>>> 367b8bcce1 (STG101)
>>>>>>> 6d421431c9 (STG101)
=======
@@ -2336,10 +2121,8 @@
>>>>>>> fc0eb7e65c (STG101)
     signedVersion: string;
     value: string;
 }
 
-export { WebResource }
-
 // @public
 export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
 
 // (No @packageDocumentation comment for this package)

```