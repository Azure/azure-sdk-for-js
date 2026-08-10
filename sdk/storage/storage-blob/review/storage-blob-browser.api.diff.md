# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -12,40 +12,39 @@
 import type { CancelOnProgress } from '@azure/core-lro';
 import { ClientOptions } from '@azure-rest/core-client';
 import { Credential as Credential_2 } from '@azure/storage-common';
 import { CredentialPolicy } from '@azure/storage-common';
-import { CredentialPolicyCreator } from '@azure/storage-common';
 import type { ExtendedServiceClientOptions } from '@azure/core-http-compat';
 import type { FullOperationResponse } from '@azure-rest/core-client';
 import { HttpHeadersLike as HttpHeaders } from '@azure/core-http-compat';
 import { CompatResponse as HttpOperationResponse } from '@azure/core-http-compat';
 import type { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
-import { isRestError } from '@azure/core-rest-pipeline';
 import type { KeepAliveOptions } from '@azure/core-http-compat';
-import { NodeJSReadableStream } from '@azure/storage-common';
+import type { NodeJSReadableStream } from '@azure/storage-common';
 import { NodeReadableStream } from '@azure-rest/core-client';
 import { NodeReadableStream as NodeReadableStream_2 } from '@azure/core-rest-pipeline';
 import { OperationOptions } from '@azure-rest/core-client';
 import type { OperationTracingOptions } from '@azure/core-tracing';
 import type { PagedAsyncIterableIterator } from '@azure/core-paging';
 import { Pipeline as Pipeline_2 } from '@azure/core-rest-pipeline';
-import { PollerLike } from '@azure/core-lro';
-import { PollOperationState } from '@azure/core-lro';
+import type { PollOperationState } from '@azure/core-lro';
 import type { ProxySettings } from '@azure/core-rest-pipeline';
 import type { Readable } from 'node:stream';
 import { RequestPolicy } from '@azure/core-http-compat';
 import { RequestPolicyFactory } from '@azure/core-http-compat';
 import { RequestPolicyOptionsLike as RequestPolicyOptions } from '@azure/core-http-compat';
 import { RestError } from '@azure/core-rest-pipeline';
 import { StorageBrowserPolicy } from '@azure/storage-common';
+import { storageBrowserPolicy } from '@azure/storage-common';
 import { StorageBrowserPolicyFactory } from '@azure/storage-common';
+import { storageCorrectContentLengthPolicy } from '@azure/storage-common';
 import { StorageResponseFormat } from '@azure/storage-common';
 import { StorageRetryOptions } from '@azure/storage-common';
 import { StorageRetryPolicy } from '@azure/storage-common';
+import { storageRetryPolicy } from '@azure/storage-common';
 import { StorageRetryPolicyFactory } from '@azure/storage-common';
 import { StorageRetryPolicyType } from '@azure/storage-common';
 import { StorageSharedKeyCredential } from '@azure/storage-common';
-import { StorageSharedKeyCredentialPolicy } from '@azure/storage-common';
 import { TokenCredential } from '@azure/core-auth';
 import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
 import { UserDelegationKey } from '@azure/storage-common';
@@ -69,77 +68,8 @@
 
 // @public
 export type AccountKind = "Storage" | "BlobStorage" | "StorageV2" | "FileStorage" | "BlockBlobStorage";
 
-// @public
-export class AccountSASPermissions {
-    add: boolean;
-    create: boolean;
-    delete: boolean;
-    deleteVersion: boolean;
-    filter: boolean;
-    static from(permissionLike: AccountSASPermissionsLike): AccountSASPermissions;
-    list: boolean;
-    static parse(permissions: string): AccountSASPermissions;
-    permanentDelete: boolean;
-    process: boolean;
-    read: boolean;
-    setImmutabilityPolicy: boolean;
-    tag: boolean;
-    toString(): string;
-    update: boolean;
-    write: boolean;
-}
-
-// @public
-export interface AccountSASPermissionsLike {
-    add?: boolean;
-    create?: boolean;
-    delete?: boolean;
-    deleteVersion?: boolean;
-    filter?: boolean;
-    list?: boolean;
-    permanentDelete?: boolean;
-    process?: boolean;
-    read?: boolean;
-    setImmutabilityPolicy?: boolean;
-    tag?: boolean;
-    update?: boolean;
-    write?: boolean;
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
 
@@ -162,8 +92,9 @@
 
 // @public
 export interface AppendBlobAppendBlockFromURLOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
+    // Warning: (ae-forgotten-export) The symbol "AppendBlobRequestConditions" needs to be exported by the entry point index.d.ts
     conditions?: AppendBlobRequestConditions;
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
     sourceAuthorization?: HttpAuthorization;
@@ -250,8 +181,9 @@
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
     immutabilityPolicy?: BlobImmutabilityPolicy;
     legalHold?: boolean;
+    // Warning: (ae-forgotten-export) The symbol "Metadata" needs to be exported by the entry point index.d.ts
     metadata?: Metadata;
 }
 
 // @public
@@ -262,8 +194,9 @@
 // @public
 export interface AppendBlobCreateOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
     blobHTTPHeaders?: BlobHTTPHeaders;
+    // Warning: (ae-forgotten-export) The symbol "BlobRequestConditions" needs to be exported by the entry point index.d.ts
     conditions?: BlobRequestConditions;
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
     immutabilityPolicy?: BlobImmutabilityPolicy;
@@ -275,12 +208,8 @@
 // @public
 export type AppendBlobCreateResponse = WithResponse<AppendBlobCreateHeaders, AppendBlobCreateHeaders>;
 
 // @public
-export interface AppendBlobRequestConditions extends BlobRequestConditions, AppendPositionAccessConditions {
-}
-
-// @public
 export interface AppendBlobSealOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
     conditions?: AppendBlobRequestConditions;
 }
@@ -332,8 +261,9 @@
 
 // @public
 export interface BlobAcquireLeaseOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
+    // Warning: (ae-forgotten-export) The symbol "ModifiedAccessConditions" needs to be exported by the entry point index.d.ts
     conditions?: ModifiedAccessConditions;
 }
 
 // @public
@@ -375,22 +305,14 @@
 
 // @public
 export interface BlobBeginCopyFromURLOptions extends BlobStartCopyFromURLOptions {
     intervalInMs?: number;
+    // Warning: (ae-forgotten-export) The symbol "BlobBeginCopyFromUrlPollState" needs to be exported by the entry point index.d.ts
     onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
     resumeFrom?: string;
 }
 
 // @public
-export interface BlobBeginCopyFromUrlPollState extends PollOperationState<BlobBeginCopyFromURLResponse> {
-    readonly blobClient: CopyPollerBlobClient;
-    copyId?: string;
-    copyProgress?: string;
-    copySource: string;
-    readonly startCopyFromURLOptions?: BlobStartCopyFromURLOptions;
-}
-
-// @public
 export interface BlobBeginCopyFromURLResponse extends BlobStartCopyFromURLResponse {
 }
 
 // @public
@@ -412,15 +334,17 @@
     constructor(connectionString: string, containerName: string, blobName: string, options?: BlobClientOptions);
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobClientOptions);
     constructor(url: string, pipeline: PipelineLike, options?: BlobClientConfig);
     abortCopyFromURL(copyId: string, options?: BlobAbortCopyFromURLOptions): Promise<BlobAbortCopyFromURLResponse>;
+    // Warning: (ae-forgotten-export) The symbol "PollerLikeWithCancellation" needs to be exported by the entry point index.d.ts
     beginCopyFromURL(copySource: string, options?: BlobBeginCopyFromURLOptions): Promise<PollerLikeWithCancellation<PollOperationState<BlobBeginCopyFromURLResponse>, BlobBeginCopyFromURLResponse>>;
     protected blobClientConfig?: BlobClientConfig;
     get containerName(): string;
     createSnapshot(options?: BlobCreateSnapshotOptions): Promise<BlobCreateSnapshotResponse>;
     delete(options?: BlobDeleteOptions): Promise<BlobDeleteResponse>;
     deleteIfExists(options?: BlobDeleteOptions): Promise<BlobDeleteIfExistsResponse>;
     deleteImmutabilityPolicy(options?: BlobDeleteImmutabilityPolicyOptions): Promise<BlobDeleteImmutabilityPolicyResponse>;
+    // Warning: (ae-forgotten-export) The symbol "BlobDownloadResponseParsed" needs to be exported by the entry point index.d.ts
     download(offset?: number, count?: number, options?: BlobDownloadOptions): Promise<BlobDownloadResponseParsed>;
     downloadToBuffer(offset?: number, count?: number, options?: BlobDownloadToBufferOptions): Promise<Buffer>;
     downloadToBuffer(buffer: Buffer, offset?: number, count?: number, options?: BlobDownloadToBufferOptions): Promise<Buffer>;
     downloadToFile(filePath: string, offset?: number, count?: number, options?: BlobDownloadOptions): Promise<BlobDownloadResponseParsed>;
@@ -645,14 +569,8 @@
 // @public
 export type BlobDownloadResponseModel = WithResponse<BlobDownloadResponseInternal, BlobDownloadHeaders>;
 
 // @public
-export interface BlobDownloadResponseParsed extends BlobDownloadResponseModel {
-    objectReplicationDestinationPolicyId?: string;
-    objectReplicationSourceProperties?: ObjectReplicationPolicy[];
-}
-
-// @public
 export interface BlobDownloadToBufferOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
     blockSize?: number;
     concurrency?: number;
@@ -776,8 +694,9 @@
 
 // @public
 export interface BlobGetPropertiesResponse extends BlobGetPropertiesResponseModel {
     objectReplicationDestinationPolicyId?: string;
+    // Warning: (ae-forgotten-export) The symbol "ObjectReplicationPolicy" needs to be exported by the entry point index.d.ts
     objectReplicationSourceProperties?: ObjectReplicationPolicy[];
 }
 
 // @public
@@ -1002,23 +921,13 @@
 
 // @public
 export interface BlobQueryArrowConfiguration {
     kind: "arrow";
+    // Warning: (ae-forgotten-export) The symbol "BlobQueryArrowField" needs to be exported by the entry point index.d.ts
     schema: BlobQueryArrowField[];
 }
 
 // @public
-export interface BlobQueryArrowField {
-    name?: string;
-    precision?: number;
-    scale?: number;
-    type: BlobQueryArrowFieldType;
-}
-
-// @public
-export type BlobQueryArrowFieldType = "int64" | "bool" | "timestamp[ms]" | "string" | "double" | "decimal";
-
-// @public
 export interface BlobQueryCsvTextConfiguration {
     columnSeparator?: string;
     escapeCharacter?: string;
     fieldQuote?: string;
@@ -1108,12 +1017,8 @@
     conditions?: ModifiedAccessConditions;
 }
 
 // @public
-export interface BlobRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {
-}
-
-// @public
 export class BlobSASPermissions {
     add: boolean;
     create: boolean;
     delete: boolean;
@@ -1145,35 +1050,8 @@
     write?: boolean;
 }
 
 // @public
-export interface BlobSASSignatureValues {
-    blobName?: string;
-    cacheControl?: string;
-    containerName: string;
-    contentDisposition?: string;
-    contentEncoding?: string;
-    contentLanguage?: string;
-    contentType?: string;
-    correlationId?: string;
-    delegatedUserObjectId?: string;
-    encryptionScope?: string;
-    expiresOn?: Date;
-    identifier?: string;
-    ipRange?: SasIPRange;
-    isDirectory?: boolean;
-    permissions?: BlobSASPermissions | ContainerSASPermissions;
-    preauthorizedAgentObjectId?: string;
-    protocol?: SASProtocol;
-    requestHeaders?: RequestHeaders;
-    requestQueryParameters?: RequestQueryParameters;
-    snapshotTime?: string;
-    startsOn?: Date;
-    version?: string;
-    versionId?: string;
-}
-
-// @public
 export class BlobServiceClient extends StorageClient {
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobServiceClientOptions);
     constructor(url: string, pipeline: PipelineLike, options?: BlobClientConfig);
     createContainer(containerName: string, options?: ContainerCreateOptions): Promise<{
@@ -1182,8 +1060,9 @@
     }>;
     deleteContainer(containerName: string, options?: ContainerDeleteMethodOptions): Promise<ContainerDeleteResponse>;
     findBlobsByTags(tagFilterSqlExpression: string, options?: ServiceFindBlobByTagsOptions): PagedAsyncIterableIterator<FilterBlobItem, ServiceFindBlobsByTagsSegmentResponse>;
     static fromConnectionString(connectionString: string, options?: BlobServiceClientOptions): BlobServiceClient;
+    // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     getAccountInfo(options?: ServiceGetAccountInfoOptions): Promise<ServiceGetAccountInfoResponse>;
     getBlobBatchClient(): BlobBatchClient;
@@ -1737,8 +1616,9 @@
     encryptionScope?: string;
     expiresOn?: Date;
     identifier?: string;
     ipRange?: SasIPRange;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
     startsOn?: Date;
     version?: string;
 }
@@ -1903,8 +1783,9 @@
 export type ContainerFindBlobsByTagsSegmentResponse = WithResponse<FilterBlobSegment & ContainerFilterBlobsHeaders, ContainerFilterBlobsHeaders, FilterBlobSegmentModel>;
 
 // @public
 export interface ContainerGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "ContainerSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: ContainerSASPermissions;
 }
 
 // @public
@@ -2101,45 +1982,8 @@
 export interface ContainerRequestConditions extends LeaseAccessConditions, ModificationConditions {
 }
 
 // @public
-export class ContainerSASPermissions {
-    add: boolean;
-    create: boolean;
-    delete: boolean;
-    deleteVersion: boolean;
-    execute: boolean;
-    filterByTags: boolean;
-    static from(permissionLike: ContainerSASPermissionsLike): ContainerSASPermissions;
-    list: boolean;
-    move: boolean;
-    static parse(permissions: string): ContainerSASPermissions;
-    permanentDelete: boolean;
-    read: boolean;
-    setImmutabilityPolicy: boolean;
-    tag: boolean;
-    toString(): string;
-    write: boolean;
-}
-
-// @public
-export interface ContainerSASPermissionsLike {
-    add?: boolean;
-    create?: boolean;
-    delete?: boolean;
-    deleteVersion?: boolean;
-    execute?: boolean;
-    filterByTags?: boolean;
-    list?: boolean;
-    move?: boolean;
-    permanentDelete?: boolean;
-    read?: boolean;
-    setImmutabilityPolicy?: boolean;
-    tag?: boolean;
-    write?: boolean;
-}
-
-// @public
 export interface ContainerSetAccessPolicyHeaders {
     clientRequestId?: string;
     date?: Date;
     errorCode?: string;
@@ -2190,13 +2034,8 @@
 // @public
 export type ContainerUndeleteResponse = WithResponse<ContainerUndeleteHeaders, ContainerUndeleteHeaders>;
 
 // @public
-export type CopyPollerBlobClient = Pick<BlobClient, "abortCopyFromURL" | "getProperties"> & {
-    startCopyFromURL(copySource: string, options?: BlobStartCopyFromURLOptions): Promise<BlobBeginCopyFromURLResponse>;
-};
-
-// @public
 export type CopyStatusType = "pending" | "success" | "aborted" | "failed";
 
 // @public
 export interface CorsRule {
@@ -2217,10 +2056,8 @@
 export { Credential_2 as Credential }
 
 export { CredentialPolicy }
 
-export { CredentialPolicyCreator }
-
 // @public
 export type DeleteSnapshotsOptionType = "include" | "only";
 
 // @public
@@ -2271,17 +2108,8 @@
     where: string;
 }
 
 // @public
-export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
-export function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
-
-// @public
-export function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
-
-// @public
 export interface GeoReplication {
     lastSyncOn: Date;
     status: GeoReplicationStatusType;
 }
@@ -2289,11 +2117,8 @@
 // @public
 export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";
 
 // @public
-export function getBlobServiceAccountAudience(storageAccountName: string): string;
-
-// @public
 export interface HttpAuthorization {
     scheme: string;
     value: string;
 }
@@ -2313,10 +2138,8 @@
 
 // @public
 export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
 
-export { isRestError }
-
 // @public
 export enum KnownEncryptionAlgorithmType {
     // (undocumented)
     AES256 = "AES256"
@@ -2467,13 +2290,8 @@
     ifNoneMatch?: string;
 }
 
 // @public
-export interface Metadata {
-    [propertyName: string]: string;
-}
-
-// @public
 export interface Metrics {
     enabled: boolean;
     includeAPIs?: boolean;
     retentionPolicy?: RetentionPolicy;
@@ -2486,12 +2304,8 @@
     ifUnmodifiedSince?: Date;
 }
 
 // @public
-export interface ModifiedAccessConditions extends MatchConditions, ModificationConditions, TagConditions {
-}
-
-// @public
 export interface ModifiedAccessConditionsModel {
     ifMatch?: string;
     ifModifiedSince?: Date;
     ifNoneMatch?: string;
@@ -2501,26 +2315,9 @@
 
 // @public
 export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
-export { NodeJSReadableStream }
-
 // @public
-export interface ObjectReplicationPolicy {
-    policyId: string;
-    rules: ObjectReplicationRule[];
-}
-
-// @public
-export interface ObjectReplicationRule {
-    replicationStatus: ObjectReplicationStatus;
-    ruleId: string;
-}
-
-// @public
-export type ObjectReplicationStatus = "complete" | "failed";
-
-// @public
 export interface PageBlobClearPagesHeaders {
     blobSequenceNumber?: number;
     clientRequestId?: string;
     contentMD5?: Uint8Array;
@@ -2535,8 +2332,9 @@
 
 // @public
 export interface PageBlobClearPagesOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
+    // Warning: (ae-forgotten-export) The symbol "PageBlobRequestConditions" needs to be exported by the entry point index.d.ts
     conditions?: PageBlobRequestConditions;
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
 }
@@ -2705,12 +2503,8 @@
     conditions?: BlobRequestConditions;
 }
 
 // @public
-export interface PageBlobRequestConditions extends BlobRequestConditions, SequenceNumberAccessConditions {
-}
-
-// @public
 export interface PageBlobResizeHeaders {
     blobSequenceNumber?: number;
     clientRequestId?: string;
     date?: Date;
@@ -2884,31 +2678,9 @@
 export interface PipelineOptions {
     httpClient?: RequestPolicy;
 }
 
-export { PollerLike }
-
 // @public
-export interface PollerLikeWithCancellation<TState extends PollOperationState<TResult>, TResult> {
-    cancelOperation(options?: {
-        abortSignal?: AbortSignalLike;
-    }): Promise<void>;
-    getOperationState(): TState;
-    getResult(): TResult | undefined;
-    isDone(): boolean;
-    isStopped(): boolean;
-    onProgress(callback: (state: TState) => void): CancelOnProgress;
-    poll(options?: {
-        abortSignal?: AbortSignalLike;
-    }): Promise<void>;
-    pollUntilDone(): Promise<TResult>;
-    stopPolling(): void;
-    toString(): string;
-}
-
-export { PollOperationState }
-
-// @public
 export enum PremiumPageBlobTier {
     P10 = "P10",
     P15 = "P15",
     P20 = "P20",
@@ -2983,70 +2755,8 @@
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
-    constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string, userDelegationKey?: UserDelegationKey, preauthorizedAgentObjectId?: string, correlationId?: string, encryptionScope?: string, delegatedUserObjectId?: string, requestHeaderKeys?: string, requestQueryParameterKeys?: string, directoryDepth?: number);
-    constructor(version: string, signature: string, options?: SASQueryParametersOptions);
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
-// @public
 export interface SequenceNumberAccessConditions {
     ifSequenceNumberEqualTo?: number;
     ifSequenceNumberLessThan?: number;
     ifSequenceNumberLessThanOrEqualTo?: number;
@@ -3265,21 +2975,19 @@
     errorDocument404Path?: string;
     indexDocument?: string;
 }
 
-// @public
-export enum StorageBlobAudience {
-    DiskComputeOAuthScopes = "https://disk.compute.azure.com/.default",
-    StorageOAuthScopes = "https://storage.azure.com/.default"
-}
-
 export { StorageBrowserPolicy }
 
+export { storageBrowserPolicy }
+
 export { StorageBrowserPolicyFactory }
 
 // @public
 export type StorageChecksumAlgorithm = "Auto" | "None" | "Customized" | "StorageCrc64";
 
+export { storageCorrectContentLengthPolicy }
+
 // @public
 export const StorageOAuthScopes: string | string[];
 
 // @public
@@ -3297,16 +3005,14 @@
 export { StorageRetryOptions }
 
 export { StorageRetryPolicy }
 
+export { storageRetryPolicy }
+
 export { StorageRetryPolicyFactory }
 
 export { StorageRetryPolicyType }
 
-export { StorageSharedKeyCredential }
-
-export { StorageSharedKeyCredentialPolicy }
-
 // @public
 export type SyncCopyStatusType = "success";
 
 // @public

```