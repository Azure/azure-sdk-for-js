# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```diff
===================================================================
--- NodeJS
+++ browser
@@ -20,24 +20,25 @@
 import { RequestBodyType as HttpRequestBody } from '@azure/core-rest-pipeline';
 import type { KeepAliveOptions } from '@azure/core-http-compat';
 import type { OperationTracingOptions } from '@azure/core-tracing';
 import type { PagedAsyncIterableIterator } from '@azure/core-paging';
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
 import { StorageRetryOptions } from '@azure/storage-common';
 import { StorageRetryPolicy } from '@azure/storage-common';
+import { storageRetryPolicy } from '@azure/storage-common';
 import { StorageRetryPolicyFactory } from '@azure/storage-common';
 import { StorageRetryPolicyType } from '@azure/storage-common';
 import { StorageSharedKeyCredential } from '@azure/storage-common';
-import { StorageSharedKeyCredentialPolicy } from '@azure/storage-common';
 import type { TokenCredential } from '@azure/core-auth';
 import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
 import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
 import { UserDelegationKey } from '@azure/storage-common';
@@ -55,77 +56,8 @@
 
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
 
@@ -148,8 +80,9 @@
 
 // @public
 export interface AppendBlobAppendBlockFromURLOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
+    // Warning: (ae-forgotten-export) The symbol "AppendBlobRequestConditions" needs to be exported by the entry point index.d.ts
     conditions?: AppendBlobRequestConditions;
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
     sourceAuthorization?: HttpAuthorization;
@@ -230,8 +163,9 @@
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
     immutabilityPolicy?: BlobImmutabilityPolicy;
     legalHold?: boolean;
+    // Warning: (ae-forgotten-export) The symbol "Metadata" needs to be exported by the entry point index.d.ts
     metadata?: Metadata;
 }
 
 // @public
@@ -242,8 +176,9 @@
 // @public
 export interface AppendBlobCreateOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
     blobHTTPHeaders?: BlobHTTPHeaders;
+    // Warning: (ae-forgotten-export) The symbol "BlobRequestConditions" needs to be exported by the entry point index.d.ts
     conditions?: BlobRequestConditions;
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
     immutabilityPolicy?: BlobImmutabilityPolicy;
@@ -255,12 +190,8 @@
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
@@ -312,8 +243,9 @@
 
 // @public
 export interface BlobAcquireLeaseOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
+    // Warning: (ae-forgotten-export) The symbol "ModifiedAccessConditions" needs to be exported by the entry point index.d.ts
     conditions?: ModifiedAccessConditions;
 }
 
 // @public
@@ -355,22 +287,14 @@
 
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
@@ -392,14 +316,16 @@
     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: PipelineLike);
     abortCopyFromURL(copyId: string, options?: BlobAbortCopyFromURLOptions): Promise<BlobAbortCopyFromURLResponse>;
+    // Warning: (ae-forgotten-export) The symbol "PollerLikeWithCancellation" needs to be exported by the entry point index.d.ts
     beginCopyFromURL(copySource: string, options?: BlobBeginCopyFromURLOptions): Promise<PollerLikeWithCancellation<PollOperationState<BlobBeginCopyFromURLResponse>, BlobBeginCopyFromURLResponse>>;
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
@@ -607,14 +533,8 @@
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
@@ -644,8 +564,9 @@
 }
 
 // @public
 export interface BlobGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "BlobSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: BlobSASPermissions;
 }
 
 // @public
@@ -735,8 +656,9 @@
 
 // @public
 export interface BlobGetPropertiesResponse extends BlobGetPropertiesResponseModel {
     objectReplicationDestinationPolicyId?: string;
+    // Warning: (ae-forgotten-export) The symbol "ObjectReplicationPolicy" needs to be exported by the entry point index.d.ts
     objectReplicationSourceProperties?: ObjectReplicationPolicy[];
 }
 
 // @public
@@ -952,23 +874,13 @@
 
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
@@ -1058,69 +970,8 @@
     conditions?: ModifiedAccessConditions;
 }
 
 // @public
-export interface BlobRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {
-}
-
-// @public
-export class BlobSASPermissions {
-    add: boolean;
-    create: boolean;
-    delete: boolean;
-    deleteVersion: boolean;
-    execute: boolean;
-    static from(permissionLike: BlobSASPermissionsLike): BlobSASPermissions;
-    move: boolean;
-    static parse(permissions: string): BlobSASPermissions;
-    permanentDelete: boolean;
-    read: boolean;
-    setImmutabilityPolicy: boolean;
-    tag: boolean;
-    toString(): string;
-    write: boolean;
-}
-
-// @public
-export interface BlobSASPermissionsLike {
-    add?: boolean;
-    create?: boolean;
-    delete?: boolean;
-    deleteVersion?: boolean;
-    execute?: boolean;
-    move?: boolean;
-    permanentDelete?: boolean;
-    read?: boolean;
-    setImmutabilityPolicy?: boolean;
-    tag?: boolean;
-    write?: boolean;
-}
-
-// @public
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
-    permissions?: BlobSASPermissions | ContainerSASPermissions;
-    preauthorizedAgentObjectId?: string;
-    protocol?: SASProtocol;
-    snapshotTime?: string;
-    startsOn?: Date;
-    version?: string;
-    versionId?: string;
-}
-
-// @public
 export class BlobServiceClient extends StorageClient {
     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
     constructor(url: string, pipeline: PipelineLike);
     createContainer(containerName: string, options?: ContainerCreateOptions): Promise<{
@@ -1129,8 +980,9 @@
     }>;
     deleteContainer(containerName: string, options?: ContainerDeleteMethodOptions): Promise<ContainerDeleteResponse>;
     findBlobsByTags(tagFilterSqlExpression: string, options?: ServiceFindBlobByTagsOptions): PagedAsyncIterableIterator<FilterBlobItem, ServiceFindBlobsByTagsSegmentResponse>;
     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): BlobServiceClient;
+    // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
     getAccountInfo(options?: ServiceGetAccountInfoOptions): Promise<ServiceGetAccountInfoResponse>;
     getBlobBatchClient(): BlobBatchClient;
@@ -1665,8 +1517,9 @@
     encryptionScope?: string;
     expiresOn?: Date;
     identifier?: string;
     ipRange?: SasIPRange;
+    // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
     protocol?: SASProtocol;
     startsOn?: Date;
     version?: string;
 }
@@ -1828,8 +1681,9 @@
 export type ContainerFindBlobsByTagsSegmentResponse = WithResponse<FilterBlobSegment & ContainerFilterBlobsHeaders, ContainerFilterBlobsHeaders, FilterBlobSegmentModel>;
 
 // @public
 export interface ContainerGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+    // Warning: (ae-forgotten-export) The symbol "ContainerSASPermissions" needs to be exported by the entry point index.d.ts
     permissions?: ContainerSASPermissions;
 }
 
 // @public
@@ -2024,45 +1878,8 @@
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
@@ -2113,13 +1930,8 @@
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
@@ -2192,17 +2004,8 @@
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
@@ -2210,11 +2013,8 @@
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
@@ -2386,13 +2186,8 @@
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
@@ -2405,12 +2200,8 @@
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
@@ -2421,23 +2212,8 @@
 // @public
 export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
 
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
@@ -2452,8 +2228,9 @@
 
 // @public
 export interface PageBlobClearPagesOptions extends CommonOptions {
     abortSignal?: AbortSignalLike;
+    // Warning: (ae-forgotten-export) The symbol "PageBlobRequestConditions" needs to be exported by the entry point index.d.ts
     conditions?: PageBlobRequestConditions;
     customerProvidedKey?: CpkInfo;
     encryptionScope?: string;
 }
@@ -2619,12 +2396,8 @@
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
@@ -2795,31 +2568,9 @@
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
@@ -2888,64 +2639,8 @@
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
-    constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string, userDelegationKey?: UserDelegationKey, preauthorizedAgentObjectId?: string, correlationId?: string, encryptionScope?: string, delegatedUserObjectId?: string);
-    constructor(version: string, signature: string, options?: SASQueryParametersOptions);
-    readonly cacheControl?: string;
-    readonly contentDisposition?: string;
-    readonly contentEncoding?: string;
-    readonly contentLanguage?: string;
-    readonly contentType?: string;
-    readonly correlationId?: string;
-    readonly delegatedUserObjectId?: string;
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
-    cacheControl?: string;
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
-// @public
 export interface SequenceNumberAccessConditions {
     ifSequenceNumberEqualTo?: number;
     ifSequenceNumberLessThan?: number;
     ifSequenceNumberLessThanOrEqualTo?: number;
@@ -3164,18 +2859,16 @@
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
 
+export { storageCorrectContentLengthPolicy }
+
 // @public
 export const StorageOAuthScopes: string | string[];
 
 // @public
@@ -3191,16 +2884,14 @@
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