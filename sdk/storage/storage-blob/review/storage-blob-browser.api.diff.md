# API Report Diff for browser runtime

This file contains only the differences from the Node.js API.
For the complete API surface, see the corresponding -node.api.md file.

```
- import { PollerLike } from '@azure/core-lro';
+ import type { PollOperationState } from '@azure/core-lro';
- import { PollOperationState } from '@azure/core-lro';
+ import type { ProxySettings } from '@azure/core-rest-pipeline';
- import type { ProxySettings } from '@azure/core-rest-pipeline';
+ import type { Readable } from 'node:stream';
- import type { Readable } from 'node:stream';
+ import { RequestPolicy } from '@azure/core-http-compat';
- import { RequestPolicy } from '@azure/core-http-compat';
+ import { RequestPolicyFactory } from '@azure/core-http-compat';
- import { RequestPolicyFactory } from '@azure/core-http-compat';
+ import { RequestPolicyOptionsLike as RequestPolicyOptions } from '@azure/core-http-compat';
- import { RequestPolicyOptionsLike as RequestPolicyOptions } from '@azure/core-http-compat';
+ import { RestError } from '@azure/core-rest-pipeline';
- import { RestError } from '@azure/core-rest-pipeline';
+ import type { TokenCredential } from '@azure/core-auth';
- import type { TokenCredential } from '@azure/core-auth';
+ import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
- import type { TransferProgressEvent } from '@azure/core-rest-pipeline';
+ import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
- import type { UserAgentPolicyOptions } from '@azure/core-rest-pipeline';
+ import { WebResourceLike as WebResource } from '@azure/core-http-compat';
- import { WebResourceLike as WebResource } from '@azure/core-http-compat';
+ 
- 
+ // @public
- // @public
+ export interface AccessPolicy {
- export interface AccessPolicy {
+     expiresOn?: string;
-     expiresOn?: string;
+     permissions?: string;
-     permissions?: string;
+     startsOn?: string;
-     startsOn?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type AccessTier = "P4" | "P6" | "P10" | "P15" | "P20" | "P30" | "P40" | "P50" | "P60" | "P70" | "P80" | "Hot" | "Cool" | "Archive" | "Cold";
- export type AccessTier = "P4" | "P6" | "P10" | "P15" | "P20" | "P30" | "P40" | "P50" | "P60" | "P70" | "P80" | "Hot" | "Cool" | "Archive" | "Cold";
+ 
- 
+ // @public
- // @public
+ export type AccountKind = "Storage" | "BlobStorage" | "StorageV2" | "FileStorage" | "BlockBlobStorage";
- export type AccountKind = "Storage" | "BlobStorage" | "StorageV2" | "FileStorage" | "BlockBlobStorage";
+ 
- 
+ // @public
- // @public
+ export class AnonymousCredential extends Credential_2 {
- export class AccountSASPermissions {
+     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): AnonymousCredentialPolicy;
-     add: boolean;
+ }
-     create: boolean;
+ 
-     delete: boolean;
+ // @public
-     deleteVersion: boolean;
+ export class AnonymousCredentialPolicy extends CredentialPolicy {
-     filter: boolean;
+     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
-     static from(permissionLike: AccountSASPermissionsLike): AccountSASPermissions;
+ }
-     list: boolean;
+ 
-     static parse(permissions: string): AccountSASPermissions;
+ // @public
-     permanentDelete: boolean;
+ export interface AppendBlobAppendBlockFromUrlHeaders {
-     process: boolean;
+     blobAppendOffset?: string;
-     read: boolean;
+     blobCommittedBlockCount?: number;
-     setImmutabilityPolicy: boolean;
+     contentMD5?: Uint8Array;
-     tag: boolean;
+     date?: Date;
-     toString(): string;
+     encryptionKeySha256?: string;
-     update: boolean;
+     encryptionScope?: string;
-     write: boolean;
+     errorCode?: string;
- }
+     etag?: string;
- 
+     isServerEncrypted?: boolean;
- // @public
+     lastModified?: Date;
- export interface AccountSASPermissionsLike {
+     requestId?: string;
-     add?: boolean;
+     version?: string;
-     create?: boolean;
+     xMsContentCrc64?: Uint8Array;
-     delete?: boolean;
+ }
-     deleteVersion?: boolean;
+ 
-     filter?: boolean;
+ // @public
-     list?: boolean;
+ export interface AppendBlobAppendBlockFromURLOptions extends CommonOptions {
-     permanentDelete?: boolean;
+     abortSignal?: AbortSignalLike;
-     process?: boolean;
+     // Warning: (ae-forgotten-export) The symbol "AppendBlobRequestConditions" needs to be exported by the entry point index.d.ts
-     read?: boolean;
+     conditions?: AppendBlobRequestConditions;
-     setImmutabilityPolicy?: boolean;
+     customerProvidedKey?: CpkInfo;
-     tag?: boolean;
+     encryptionScope?: string;
-     update?: boolean;
+     sourceAuthorization?: HttpAuthorization;
-     write?: boolean;
+     sourceConditions?: MatchConditions & ModificationConditions;
- }
+     sourceContentCrc64?: Uint8Array;
- 
+     sourceContentMD5?: Uint8Array;
- // @public
+     sourceShareTokenIntent?: FileShareTokenIntent;
- export class AccountSASResourceTypes {
+ }
-     container: boolean;
+ 
-     object: boolean;
+ // @public
-     static parse(resourceTypes: string): AccountSASResourceTypes;
+ export type AppendBlobAppendBlockFromUrlResponse = WithResponse<AppendBlobAppendBlockFromUrlHeaders, AppendBlobAppendBlockFromUrlHeaders>;
-     service: boolean;
+ 
-     toString(): string;
+ // @public
- }
+ export interface AppendBlobAppendBlockHeaders {
- 
+     blobAppendOffset?: string;
- // @public
+     blobCommittedBlockCount?: number;
- export class AccountSASServices {
+     clientRequestId?: string;
-     blob: boolean;
+     contentMD5?: Uint8Array;
-     file: boolean;
+     date?: Date;
-     static parse(services: string): AccountSASServices;
+     encryptionKeySha256?: string;
-     queue: boolean;
+     encryptionScope?: string;
-     table: boolean;
+     errorCode?: string;
-     toString(): string;
+     etag?: string;
- }
+     isServerEncrypted?: boolean;
- 
+     lastModified?: Date;
- // @public
+     requestId?: string;
- export interface AccountSASSignatureValues {
+     version?: string;
-     encryptionScope?: string;
+     xMsContentCrc64?: Uint8Array;
-     expiresOn: Date;
+ }
-     ipRange?: SasIPRange;
+ 
-     permissions: AccountSASPermissions;
+ // @public
-     protocol?: SASProtocol;
+ export interface AppendBlobAppendBlockOptions extends CommonOptions {
-     resourceTypes: string;
+     abortSignal?: AbortSignalLike;
-     services: string;
+     conditions?: AppendBlobRequestConditions;
-     startsOn?: Date;
+     customerProvidedKey?: CpkInfo;
-     version?: string;
+     encryptionScope?: string;
- }
+     onProgress?: (progress: TransferProgressEvent) => void;
- 
+     transactionalContentCrc64?: Uint8Array;
- // @public
+     transactionalContentMD5?: Uint8Array;
- export class AnonymousCredential extends Credential_2 {
+ }
-     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): AnonymousCredentialPolicy;
+ 
- }
+ // @public
- 
+ export type AppendBlobAppendBlockResponse = WithResponse<AppendBlobAppendBlockHeaders, AppendBlobAppendBlockHeaders>;
- // @public
+ 
- export class AnonymousCredentialPolicy extends CredentialPolicy {
+ // @public
-     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
+ export class AppendBlobClient extends BlobClient {
- }
+     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
- 
+     constructor(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
- // @public
+     constructor(url: string, pipeline: PipelineLike);
- export interface AppendBlobAppendBlockFromUrlHeaders {
+     appendBlock(body: HttpRequestBody, contentLength: number, options?: AppendBlobAppendBlockOptions): Promise<AppendBlobAppendBlockResponse>;
-     blobAppendOffset?: string;
+     appendBlockFromURL(sourceURL: string, sourceOffset: number, count: number, options?: AppendBlobAppendBlockFromURLOptions): Promise<AppendBlobAppendBlockFromUrlResponse>;
-     blobCommittedBlockCount?: number;
+     create(options?: AppendBlobCreateOptions): Promise<AppendBlobCreateResponse>;
-     contentMD5?: Uint8Array;
+     createIfNotExists(options?: AppendBlobCreateIfNotExistsOptions): Promise<AppendBlobCreateIfNotExistsResponse>;
-     date?: Date;
+     seal(options?: AppendBlobSealOptions): Promise<AppendBlobAppendBlockResponse>;
-     encryptionKeySha256?: string;
+     withSnapshot(snapshot: string): AppendBlobClient;
-     encryptionScope?: string;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public
-     isServerEncrypted?: boolean;
+ export interface AppendBlobCreateHeaders {
-     lastModified?: Date;
+     clientRequestId?: string;
-     requestId?: string;
+     contentMD5?: Uint8Array;
-     version?: string;
+     date?: Date;
-     xMsContentCrc64?: Uint8Array;
+     encryptionKeySha256?: string;
- }
+     encryptionScope?: string;
- 
+     errorCode?: string;
- // @public
+     etag?: string;
- export interface AppendBlobAppendBlockFromURLOptions extends CommonOptions {
+     isServerEncrypted?: boolean;
-     abortSignal?: AbortSignalLike;
+     lastModified?: Date;
-     conditions?: AppendBlobRequestConditions;
+     requestId?: string;
-     customerProvidedKey?: CpkInfo;
+     version?: string;
-     encryptionScope?: string;
+     versionId?: string;
-     sourceAuthorization?: HttpAuthorization;
+ }
-     sourceConditions?: MatchConditions & ModificationConditions;
+ 
-     sourceContentCrc64?: Uint8Array;
+ // @public
-     sourceContentMD5?: Uint8Array;
+ export interface AppendBlobCreateIfNotExistsOptions extends CommonOptions {
-     sourceShareTokenIntent?: FileShareTokenIntent;
+     abortSignal?: AbortSignalLike;
- }
+     blobHTTPHeaders?: BlobHTTPHeaders;
- 
+     customerProvidedKey?: CpkInfo;
- // @public
+     encryptionScope?: string;
- export type AppendBlobAppendBlockFromUrlResponse = WithResponse<AppendBlobAppendBlockFromUrlHeaders, AppendBlobAppendBlockFromUrlHeaders>;
+     immutabilityPolicy?: BlobImmutabilityPolicy;
- 
+     legalHold?: boolean;
- // @public
+     // Warning: (ae-forgotten-export) The symbol "Metadata" needs to be exported by the entry point index.d.ts
- export interface AppendBlobAppendBlockHeaders {
+     metadata?: Metadata;
-     blobAppendOffset?: string;
+ }
-     blobCommittedBlockCount?: number;
+ 
-     clientRequestId?: string;
+ // @public
-     contentMD5?: Uint8Array;
+ export interface AppendBlobCreateIfNotExistsResponse extends AppendBlobCreateResponse {
-     date?: Date;
+     succeeded: boolean;
-     encryptionKeySha256?: string;
+ }
-     encryptionScope?: string;
+ 
-     errorCode?: string;
+ // @public
-     etag?: string;
+ export interface AppendBlobCreateOptions extends CommonOptions {
-     isServerEncrypted?: boolean;
+     abortSignal?: AbortSignalLike;
-     lastModified?: Date;
+     blobHTTPHeaders?: BlobHTTPHeaders;
-     requestId?: string;
+     // Warning: (ae-forgotten-export) The symbol "BlobRequestConditions" needs to be exported by the entry point index.d.ts
-     version?: string;
+     conditions?: BlobRequestConditions;
-     xMsContentCrc64?: Uint8Array;
+     customerProvidedKey?: CpkInfo;
- }
+     encryptionScope?: string;
- 
+     immutabilityPolicy?: BlobImmutabilityPolicy;
- // @public
+     legalHold?: boolean;
- export interface AppendBlobAppendBlockOptions extends CommonOptions {
+     metadata?: Metadata;
-     abortSignal?: AbortSignalLike;
+     tags?: Tags;
-     conditions?: AppendBlobRequestConditions;
+ }
-     customerProvidedKey?: CpkInfo;
+ 
-     encryptionScope?: string;
+ // @public
-     onProgress?: (progress: TransferProgressEvent) => void;
+ export type AppendBlobCreateResponse = WithResponse<AppendBlobCreateHeaders, AppendBlobCreateHeaders>;
-     transactionalContentCrc64?: Uint8Array;
+ 
-     transactionalContentMD5?: Uint8Array;
+ // @public
- }
+ export interface AppendBlobSealOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     conditions?: AppendBlobRequestConditions;
- export type AppendBlobAppendBlockResponse = WithResponse<AppendBlobAppendBlockHeaders, AppendBlobAppendBlockHeaders>;
+ }
- export class AppendBlobClient extends BlobClient {
+ export interface AppendPositionAccessConditions {
-     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
+     appendPosition?: number;
-     constructor(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+     maxSize?: number;
-     constructor(url: string, pipeline: PipelineLike);
+ }
-     appendBlock(body: HttpRequestBody, contentLength: number, options?: AppendBlobAppendBlockOptions): Promise<AppendBlobAppendBlockResponse>;
+ 
-     appendBlockFromURL(sourceURL: string, sourceOffset: number, count: number, options?: AppendBlobAppendBlockFromURLOptions): Promise<AppendBlobAppendBlockFromUrlResponse>;
+ // @public
-     create(options?: AppendBlobCreateOptions): Promise<AppendBlobCreateResponse>;
+ export type ArchiveStatus = "rehydrate-pending-to-hot" | "rehydrate-pending-to-cool" | "rehydrate-pending-to-cold";
-     createIfNotExists(options?: AppendBlobCreateIfNotExistsOptions): Promise<AppendBlobCreateIfNotExistsResponse>;
+ 
-     seal(options?: AppendBlobSealOptions): Promise<AppendBlobAppendBlockResponse>;
+ // @public
-     withSnapshot(snapshot: string): AppendBlobClient;
+ export abstract class BaseRequestPolicy implements RequestPolicy {
- }
+     protected constructor(
- 
+     _nextPolicy: RequestPolicy,
- // @public
+     _options: RequestPolicyOptions);
- export interface AppendBlobCreateHeaders {
+     log(logLevel: HttpPipelineLogLevel, message: string): void;
-     clientRequestId?: string;
+     readonly _nextPolicy: RequestPolicy;
-     contentMD5?: Uint8Array;
+     readonly _options: RequestPolicyOptions;
-     date?: Date;
+     abstract sendRequest(webResource: WebResource): Promise<HttpOperationResponse>;
-     encryptionKeySha256?: string;
+     shouldLog(logLevel: HttpPipelineLogLevel): boolean;
-     encryptionScope?: string;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public
-     isServerEncrypted?: boolean;
+ export interface BatchSubRequest {
-     lastModified?: Date;
+     credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential;
-     requestId?: string;
+     url: string;
-     version?: string;
+ }
-     versionId?: string;
+ 
- }
+ // @public
- 
+ export interface BatchSubResponse {
- // @public
+     bodyAsText?: string;
- export interface AppendBlobCreateIfNotExistsOptions extends CommonOptions {
+     errorCode?: string;
-     abortSignal?: AbortSignalLike;
+     headers: HttpHeaders;
-     blobHTTPHeaders?: BlobHTTPHeaders;
+     _request: BatchSubRequest;
-     customerProvidedKey?: CpkInfo;
+     status: number;
-     encryptionScope?: string;
+     statusMessage: string;
-     immutabilityPolicy?: BlobImmutabilityPolicy;
+ }
-     legalHold?: boolean;
+ 
-     metadata?: Metadata;
+ // @public
- }
+ export interface BlobAbortCopyFromURLHeaders {
- 
+     clientRequestId?: string;
- // @public
+     date?: Date;
- export interface AppendBlobCreateIfNotExistsResponse extends AppendBlobCreateResponse {
+     errorCode?: string;
-     succeeded: boolean;
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export interface AppendBlobCreateOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export interface BlobAbortCopyFromURLOptions extends CommonOptions {
-     blobHTTPHeaders?: BlobHTTPHeaders;
+     abortSignal?: AbortSignalLike;
-     conditions?: BlobRequestConditions;
+     conditions?: LeaseAccessConditions;
-     customerProvidedKey?: CpkInfo;
+ }
-     encryptionScope?: string;
+ 
-     immutabilityPolicy?: BlobImmutabilityPolicy;
+ // @public
-     legalHold?: boolean;
+ export type BlobAbortCopyFromURLResponse = WithResponse<BlobAbortCopyFromURLHeaders, BlobAbortCopyFromURLHeaders>;
-     metadata?: Metadata;
+ 
-     tags?: Tags;
+ // @public
- }
+ export interface BlobAcquireLeaseOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     // Warning: (ae-forgotten-export) The symbol "ModifiedAccessConditions" needs to be exported by the entry point index.d.ts
- export type AppendBlobCreateResponse = WithResponse<AppendBlobCreateHeaders, AppendBlobCreateHeaders>;
+     conditions?: ModifiedAccessConditions;
- 
+ }
- // @public
+ 
- export interface AppendBlobRequestConditions extends BlobRequestConditions, AppendPositionAccessConditions {
+ // @public
- }
+ export class BlobBatch {
- 
+     constructor();
- // @public
+     deleteBlob(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobDeleteOptions): Promise<void>;
- export interface AppendBlobSealOptions extends CommonOptions {
+     deleteBlob(blobClient: BlobClient, options?: BlobDeleteOptions): Promise<void>;
-     abortSignal?: AbortSignalLike;
+     getHttpRequestBody(): string;
-     conditions?: AppendBlobRequestConditions;
+     getMultiPartContentType(): string;
- }
+     getSubRequests(): Map<number, BatchSubRequest>;
- 
+     setBlobAccessTier(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, tier: AccessTier, options?: BlobSetTierOptions): Promise<void>;
- // @public
+     setBlobAccessTier(blobClient: BlobClient, tier: AccessTier, options?: BlobSetTierOptions): Promise<void>;
- export interface AppendPositionAccessConditions {
+ }
-     appendPosition?: number;
+ 
-     maxSize?: number;
+ // @public
- }
+ export class BlobBatchClient {
- 
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
- // @public
+     constructor(url: string, pipeline: PipelineLike);
- export type ArchiveStatus = "rehydrate-pending-to-hot" | "rehydrate-pending-to-cool" | "rehydrate-pending-to-cold";
+     createBatch(): BlobBatch;
- 
+     deleteBlobs(urls: string[], credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobDeleteOptions): Promise<BlobBatchDeleteBlobsResponse>;
- // @public
+     deleteBlobs(blobClients: BlobClient[], options?: BlobDeleteOptions): Promise<BlobBatchDeleteBlobsResponse>;
- export abstract class BaseRequestPolicy implements RequestPolicy {
+     setBlobsAccessTier(urls: string[], credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, tier: AccessTier, options?: BlobSetTierOptions): Promise<BlobBatchSetBlobsAccessTierResponse>;
-     protected constructor(
+     setBlobsAccessTier(blobClients: BlobClient[], tier: AccessTier, options?: BlobSetTierOptions): Promise<BlobBatchSetBlobsAccessTierResponse>;
-     _nextPolicy: RequestPolicy,
+     submitBatch(batchRequest: BlobBatch, options?: BlobBatchSubmitBatchOptionalParams): Promise<BlobBatchSubmitBatchResponse>;
-     _options: RequestPolicyOptions);
+ }
-     log(logLevel: HttpPipelineLogLevel, message: string): void;
+ 
-     readonly _nextPolicy: RequestPolicy;
+ // @public
-     readonly _options: RequestPolicyOptions;
+ export type BlobBatchDeleteBlobsResponse = BlobBatchSubmitBatchResponse;
-     abstract sendRequest(webResource: WebResource): Promise<HttpOperationResponse>;
+ 
-     shouldLog(logLevel: HttpPipelineLogLevel): boolean;
+ // @public
- }
+ export type BlobBatchSetBlobsAccessTierResponse = BlobBatchSubmitBatchResponse;
- export interface BatchSubRequest {
+ export interface BlobBatchSubmitBatchOptionalParams extends ServiceSubmitBatchOptionalParamsModel {
-     credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential;
+ }
-     url: string;
+ 
- }
+ // @public
- 
+ export type BlobBatchSubmitBatchResponse = WithResponse<ParsedBatchResponse & ServiceSubmitBatchHeaders, ServiceSubmitBatchHeaders>;
- // @public
+ 
- export interface BatchSubResponse {
+ // @public
-     bodyAsText?: string;
+ export interface BlobBeginCopyFromURLOptions extends BlobStartCopyFromURLOptions {
-     errorCode?: string;
+     intervalInMs?: number;
-     headers: HttpHeaders;
+     // Warning: (ae-forgotten-export) The symbol "BlobBeginCopyFromUrlPollState" needs to be exported by the entry point index.d.ts
-     _request: BatchSubRequest;
+     onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
-     status: number;
+     resumeFrom?: string;
-     statusMessage: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface BlobBeginCopyFromURLResponse extends BlobStartCopyFromURLResponse {
- export interface BlobAbortCopyFromURLHeaders {
+ }
-     clientRequestId?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface BlobBreakLeaseOptions extends CommonOptions {
-     requestId?: string;
+     abortSignal?: AbortSignalLike;
-     version?: string;
+     conditions?: ModifiedAccessConditions;
- export interface BlobAbortCopyFromURLOptions extends CommonOptions {
+ export interface BlobChangeLeaseOptions extends CommonOptions {
-     conditions?: LeaseAccessConditions;
+     conditions?: ModifiedAccessConditions;
- // @public
+ // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
- export type BlobAbortCopyFromURLResponse = WithResponse<BlobAbortCopyFromURLHeaders, BlobAbortCopyFromURLHeaders>;
+ //
- 
+ // @public
- // @public
+ export class BlobClient extends StorageClient {
- export interface BlobAcquireLeaseOptions extends CommonOptions {
+     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
-     abortSignal?: AbortSignalLike;
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
-     conditions?: ModifiedAccessConditions;
+     constructor(url: string, pipeline: PipelineLike);
- }
+     abortCopyFromURL(copyId: string, options?: BlobAbortCopyFromURLOptions): Promise<BlobAbortCopyFromURLResponse>;
- 
+     // Warning: (ae-forgotten-export) The symbol "PollerLikeWithCancellation" needs to be exported by the entry point index.d.ts
- // @public
+     beginCopyFromURL(copySource: string, options?: BlobBeginCopyFromURLOptions): Promise<PollerLikeWithCancellation<PollOperationState<BlobBeginCopyFromURLResponse>, BlobBeginCopyFromURLResponse>>;
- export class BlobBatch {
+     get containerName(): string;
-     constructor();
+     createSnapshot(options?: BlobCreateSnapshotOptions): Promise<BlobCreateSnapshotResponse>;
-     deleteBlob(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobDeleteOptions): Promise<void>;
+     delete(options?: BlobDeleteOptions): Promise<BlobDeleteResponse>;
-     deleteBlob(blobClient: BlobClient, options?: BlobDeleteOptions): Promise<void>;
+     deleteIfExists(options?: BlobDeleteOptions): Promise<BlobDeleteIfExistsResponse>;
-     getHttpRequestBody(): string;
+     deleteImmutabilityPolicy(options?: BlobDeleteImmutabilityPolicyOptions): Promise<BlobDeleteImmutabilityPolicyResponse>;
-     getMultiPartContentType(): string;
+     // Warning: (ae-forgotten-export) The symbol "BlobDownloadResponseParsed" needs to be exported by the entry point index.d.ts
-     getSubRequests(): Map<number, BatchSubRequest>;
+     download(offset?: number, count?: number, options?: BlobDownloadOptions): Promise<BlobDownloadResponseParsed>;
-     setBlobAccessTier(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, tier: AccessTier, options?: BlobSetTierOptions): Promise<void>;
+     downloadToBuffer(offset?: number, count?: number, options?: BlobDownloadToBufferOptions): Promise<Buffer>;
-     setBlobAccessTier(blobClient: BlobClient, tier: AccessTier, options?: BlobSetTierOptions): Promise<void>;
+     downloadToBuffer(buffer: Buffer, offset?: number, count?: number, options?: BlobDownloadToBufferOptions): Promise<Buffer>;
- }
+     downloadToFile(filePath: string, offset?: number, count?: number, options?: BlobDownloadOptions): Promise<BlobDownloadResponseParsed>;
- 
+     exists(options?: BlobExistsOptions): Promise<boolean>;
- // @public
+     generateSasStringToSign(options: BlobGenerateSasUrlOptions): string;
- export class BlobBatchClient {
+     generateSasUrl(options: BlobGenerateSasUrlOptions): Promise<string>;
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+     generateUserDelegationSasStringToSign(options: BlobGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
-     constructor(url: string, pipeline: PipelineLike);
+     generateUserDelegationSasUrl(options: BlobGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
-     createBatch(): BlobBatch;
+     getAccountInfo(options?: BlobGetAccountInfoOptions): Promise<BlobGetAccountInfoResponse>;
-     deleteBlobs(urls: string[], credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: BlobDeleteOptions): Promise<BlobBatchDeleteBlobsResponse>;
+     getAppendBlobClient(): AppendBlobClient;
-     deleteBlobs(blobClients: BlobClient[], options?: BlobDeleteOptions): Promise<BlobBatchDeleteBlobsResponse>;
+     getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient;
-     setBlobsAccessTier(urls: string[], credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, tier: AccessTier, options?: BlobSetTierOptions): Promise<BlobBatchSetBlobsAccessTierResponse>;
+     getBlockBlobClient(): BlockBlobClient;
-     setBlobsAccessTier(blobClients: BlobClient[], tier: AccessTier, options?: BlobSetTierOptions): Promise<BlobBatchSetBlobsAccessTierResponse>;
+     getPageBlobClient(): PageBlobClient;
-     submitBatch(batchRequest: BlobBatch, options?: BlobBatchSubmitBatchOptionalParams): Promise<BlobBatchSubmitBatchResponse>;
+     getProperties(options?: BlobGetPropertiesOptions): Promise<BlobGetPropertiesResponse>;
- }
+     getTags(options?: BlobGetTagsOptions): Promise<BlobGetTagsResponse>;
- 
+     get name(): string;
- // @public
+     setAccessTier(tier: BlockBlobTier | PremiumPageBlobTier | string, options?: BlobSetTierOptions): Promise<BlobSetTierResponse>;
- export type BlobBatchDeleteBlobsResponse = BlobBatchSubmitBatchResponse;
+     setHTTPHeaders(blobHTTPHeaders?: BlobHTTPHeaders, options?: BlobSetHTTPHeadersOptions): Promise<BlobSetHTTPHeadersResponse>;
- 
+     setImmutabilityPolicy(immutabilityPolicy: BlobImmutabilityPolicy, options?: BlobSetImmutabilityPolicyOptions): Promise<BlobSetImmutabilityPolicyResponse>;
- // @public
+     setLegalHold(legalHoldEnabled: boolean, options?: BlobSetLegalHoldOptions): Promise<BlobSetLegalHoldResponse>;
- export type BlobBatchSetBlobsAccessTierResponse = BlobBatchSubmitBatchResponse;
+     setMetadata(metadata?: Metadata, options?: BlobSetMetadataOptions): Promise<BlobSetMetadataResponse>;
- 
+     setTags(tags: Tags, options?: BlobSetTagsOptions): Promise<BlobSetTagsResponse>;
- // @public
+     syncCopyFromURL(copySource: string, options?: BlobSyncCopyFromURLOptions): Promise<BlobCopyFromURLResponse>;
- export interface BlobBatchSubmitBatchOptionalParams extends ServiceSubmitBatchOptionalParamsModel {
+     undelete(options?: BlobUndeleteOptions): Promise<BlobUndeleteResponse>;
- }
+     withSnapshot(snapshot: string): BlobClient;
- 
+     withVersion(versionId: string): BlobClient;
- // @public
+ }
- export type BlobBatchSubmitBatchResponse = WithResponse<ParsedBatchResponse & ServiceSubmitBatchHeaders, ServiceSubmitBatchHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface BlobCopyFromURLHeaders {
- export interface BlobBeginCopyFromURLOptions extends BlobStartCopyFromURLOptions {
+     clientRequestId?: string;
-     intervalInMs?: number;
+     contentMD5?: Uint8Array;
-     onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
+     copyId?: string;
-     resumeFrom?: string;
+     copyStatus?: SyncCopyStatusType;
- }
+     date?: Date;
- 
+     encryptionScope?: string;
- // @public
+     errorCode?: string;
- export interface BlobBeginCopyFromUrlPollState extends PollOperationState<BlobBeginCopyFromURLResponse> {
+     etag?: string;
-     readonly blobClient: CopyPollerBlobClient;
+     lastModified?: Date;
-     copyId?: string;
+     requestId?: string;
-     copyProgress?: string;
+     version?: string;
-     copySource: string;
+     versionId?: string;
-     readonly startCopyFromURLOptions?: BlobStartCopyFromURLOptions;
+     xMsContentCrc64?: Uint8Array;
- export interface BlobBeginCopyFromURLResponse extends BlobStartCopyFromURLResponse {
+ export type BlobCopyFromURLResponse = WithResponse<BlobCopyFromURLHeaders, BlobCopyFromURLHeaders>;
- }
+ 
- 
+ // @public
- // @public
+ export type BlobCopySourceTags = "REPLACE" | "COPY";
- export interface BlobBreakLeaseOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     conditions?: ModifiedAccessConditions;
+ export interface BlobCreateSnapshotHeaders {
- }
+     clientRequestId?: string;
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export interface BlobChangeLeaseOptions extends CommonOptions {
+     etag?: string;
-     abortSignal?: AbortSignalLike;
+     isServerEncrypted?: boolean;
-     conditions?: ModifiedAccessConditions;
+     lastModified?: Date;
- }
+     requestId?: string;
- 
+     snapshot?: string;
- // Warning: (ae-forgotten-export) The symbol "StorageClient" needs to be exported by the entry point index.d.ts
+     version?: string;
- //
+     versionId?: string;
- // @public
+ }
- export class BlobClient extends StorageClient {
+ 
-     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
+ // @public
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+ export interface BlobCreateSnapshotOptions extends CommonOptions {
-     constructor(url: string, pipeline: PipelineLike);
+     abortSignal?: AbortSignalLike;
-     abortCopyFromURL(copyId: string, options?: BlobAbortCopyFromURLOptions): Promise<BlobAbortCopyFromURLResponse>;
+     conditions?: BlobRequestConditions;
-     beginCopyFromURL(copySource: string, options?: BlobBeginCopyFromURLOptions): Promise<PollerLikeWithCancellation<PollOperationState<BlobBeginCopyFromURLResponse>, BlobBeginCopyFromURLResponse>>;
+     customerProvidedKey?: CpkInfo;
-     get containerName(): string;
+     encryptionScope?: string;
-     createSnapshot(options?: BlobCreateSnapshotOptions): Promise<BlobCreateSnapshotResponse>;
+     metadata?: Metadata;
-     delete(options?: BlobDeleteOptions): Promise<BlobDeleteResponse>;
+ }
-     deleteIfExists(options?: BlobDeleteOptions): Promise<BlobDeleteIfExistsResponse>;
+ 
-     deleteImmutabilityPolicy(options?: BlobDeleteImmutabilityPolicyOptions): Promise<BlobDeleteImmutabilityPolicyResponse>;
+ // @public
-     download(offset?: number, count?: number, options?: BlobDownloadOptions): Promise<BlobDownloadResponseParsed>;
+ export type BlobCreateSnapshotResponse = WithResponse<BlobCreateSnapshotHeaders, BlobCreateSnapshotHeaders>;
-     downloadToBuffer(offset?: number, count?: number, options?: BlobDownloadToBufferOptions): Promise<Buffer>;
+ 
-     downloadToBuffer(buffer: Buffer, offset?: number, count?: number, options?: BlobDownloadToBufferOptions): Promise<Buffer>;
+ // @public
-     downloadToFile(filePath: string, offset?: number, count?: number, options?: BlobDownloadOptions): Promise<BlobDownloadResponseParsed>;
+ export interface BlobDeleteHeaders {
-     exists(options?: BlobExistsOptions): Promise<boolean>;
+     clientRequestId?: string;
-     generateSasStringToSign(options: BlobGenerateSasUrlOptions): string;
+     date?: Date;
-     generateSasUrl(options: BlobGenerateSasUrlOptions): Promise<string>;
+     errorCode?: string;
-     generateUserDelegationSasStringToSign(options: BlobGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
+     requestId?: string;
-     generateUserDelegationSasUrl(options: BlobGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
+     version?: string;
-     getAccountInfo(options?: BlobGetAccountInfoOptions): Promise<BlobGetAccountInfoResponse>;
+ }
-     getAppendBlobClient(): AppendBlobClient;
+ 
-     getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient;
+ // @public
-     getBlockBlobClient(): BlockBlobClient;
+ export interface BlobDeleteIfExistsResponse extends BlobDeleteResponse {
-     getPageBlobClient(): PageBlobClient;
+     succeeded: boolean;
-     getProperties(options?: BlobGetPropertiesOptions): Promise<BlobGetPropertiesResponse>;
+ }
-     getTags(options?: BlobGetTagsOptions): Promise<BlobGetTagsResponse>;
+ 
-     get name(): string;
+ // @public
-     setAccessTier(tier: BlockBlobTier | PremiumPageBlobTier | string, options?: BlobSetTierOptions): Promise<BlobSetTierResponse>;
+ export interface BlobDeleteImmutabilityPolicyHeaders {
-     setHTTPHeaders(blobHTTPHeaders?: BlobHTTPHeaders, options?: BlobSetHTTPHeadersOptions): Promise<BlobSetHTTPHeadersResponse>;
+     clientRequestId?: string;
-     setImmutabilityPolicy(immutabilityPolicy: BlobImmutabilityPolicy, options?: BlobSetImmutabilityPolicyOptions): Promise<BlobSetImmutabilityPolicyResponse>;
+     date?: Date;
-     setLegalHold(legalHoldEnabled: boolean, options?: BlobSetLegalHoldOptions): Promise<BlobSetLegalHoldResponse>;
+     requestId?: string;
-     setMetadata(metadata?: Metadata, options?: BlobSetMetadataOptions): Promise<BlobSetMetadataResponse>;
+     version?: string;
-     setTags(tags: Tags, options?: BlobSetTagsOptions): Promise<BlobSetTagsResponse>;
+ }
-     syncCopyFromURL(copySource: string, options?: BlobSyncCopyFromURLOptions): Promise<BlobCopyFromURLResponse>;
+ 
-     undelete(options?: BlobUndeleteOptions): Promise<BlobUndeleteResponse>;
+ // @public
-     withSnapshot(snapshot: string): BlobClient;
+ export interface BlobDeleteImmutabilityPolicyOptions extends CommonOptions {
-     withVersion(versionId: string): BlobClient;
+     abortSignal?: AbortSignalLike;
- export interface BlobCopyFromURLHeaders {
+ export type BlobDeleteImmutabilityPolicyResponse = WithResponse<BlobDeleteImmutabilityPolicyHeaders, BlobDeleteImmutabilityPolicyHeaders>;
-     clientRequestId?: string;
+ 
-     contentMD5?: Uint8Array;
+ // @public
-     copyId?: string;
+ export interface BlobDeleteOptions extends CommonOptions {
-     copyStatus?: SyncCopyStatusType;
+     abortSignal?: AbortSignalLike;
-     date?: Date;
+     conditions?: BlobRequestConditions;
-     encryptionScope?: string;
+     customerProvidedKey?: CpkInfo;
-     errorCode?: string;
+     deleteSnapshots?: DeleteSnapshotsOptionType;
-     etag?: string;
+ }
-     lastModified?: Date;
+ 
-     requestId?: string;
+ // @public
-     version?: string;
+ export type BlobDeleteResponse = WithResponse<BlobDeleteHeaders, BlobDeleteHeaders>;
-     versionId?: string;
+ 
-     xMsContentCrc64?: Uint8Array;
+ // @public
- }
+ export interface BlobDownloadHeaders {
- 
+     acceptRanges?: string;
- // @public
+     blobCommittedBlockCount?: number;
- export type BlobCopyFromURLResponse = WithResponse<BlobCopyFromURLHeaders, BlobCopyFromURLHeaders>;
+     blobContentMD5?: Uint8Array;
- 
+     blobSequenceNumber?: number;
- // @public
+     blobType?: BlobType;
- export type BlobCopySourceTags = "REPLACE" | "COPY";
+     cacheControl?: string;
- 
+     clientRequestId?: string;
- // @public
+     contentCrc64?: Uint8Array;
- export interface BlobCreateSnapshotHeaders {
+     contentDisposition?: string;
-     clientRequestId?: string;
+     contentEncoding?: string;
-     date?: Date;
+     contentLanguage?: string;
-     errorCode?: string;
+     contentLength?: number;
-     etag?: string;
+     contentMD5?: Uint8Array;
-     isServerEncrypted?: boolean;
+     contentRange?: string;
-     lastModified?: Date;
+     contentType?: string;
-     requestId?: string;
+     copyCompletedOn?: Date;
-     snapshot?: string;
+     copyId?: string;
-     version?: string;
+     copyProgress?: string;
-     versionId?: string;
+     copySource?: string;
- }
+     copyStatus?: CopyStatusType;
- 
+     copyStatusDescription?: string;
- // @public
+     createdOn?: Date;
- export interface BlobCreateSnapshotOptions extends CommonOptions {
+     date?: Date;
-     abortSignal?: AbortSignalLike;
+     encryptionKeySha256?: string;
-     conditions?: BlobRequestConditions;
+     encryptionScope?: string;
-     customerProvidedKey?: CpkInfo;
+     errorCode?: string;
-     encryptionScope?: string;
+     etag?: string;
-     metadata?: Metadata;
+     immutabilityPolicyExpiresOn?: Date;
- }
+     immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
- 
+     isCurrentVersion?: boolean;
- // @public
+     isSealed?: boolean;
- export type BlobCreateSnapshotResponse = WithResponse<BlobCreateSnapshotHeaders, BlobCreateSnapshotHeaders>;
+     isServerEncrypted?: boolean;
- 
+     lastAccessed?: Date;
- // @public
+     lastModified?: Date;
- export interface BlobDeleteHeaders {
+     leaseDuration?: LeaseDurationType;
-     clientRequestId?: string;
+     leaseState?: LeaseStateType;
-     date?: Date;
+     leaseStatus?: LeaseStatusType;
-     errorCode?: string;
+     legalHold?: boolean;
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     metadata?: {
- }
+         [propertyName: string]: string;
- 
+     };
- // @public
+     objectReplicationPolicyId?: string;
- export interface BlobDeleteIfExistsResponse extends BlobDeleteResponse {
+     objectReplicationRules?: {
-     succeeded: boolean;
+         [propertyName: string]: string;
- }
+     };
- 
+     requestId?: string;
- // @public
+     tagCount?: number;
- export interface BlobDeleteImmutabilityPolicyHeaders {
+     version?: string;
-     clientRequestId?: string;
+     versionId?: string;
-     date?: Date;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export interface BlobDownloadOptionalParams extends coreClient.OperationOptions {
- 
+     cpkInfo?: CpkInfo;
- // @public
+     leaseAccessConditions?: LeaseAccessConditions;
- export interface BlobDeleteImmutabilityPolicyOptions extends CommonOptions {
+     modifiedAccessConditions?: ModifiedAccessConditionsModel;
-     abortSignal?: AbortSignalLike;
+     range?: string;
- }
+     rangeGetContentCRC64?: boolean;
- 
+     rangeGetContentMD5?: boolean;
- // @public
+     requestId?: string;
- export type BlobDeleteImmutabilityPolicyResponse = WithResponse<BlobDeleteImmutabilityPolicyHeaders, BlobDeleteImmutabilityPolicyHeaders>;
+     snapshot?: string;
- 
+     timeoutInSeconds?: number;
- // @public
+     versionId?: string;
- export interface BlobDeleteOptions extends CommonOptions {
+ }
-     abortSignal?: AbortSignalLike;
+ 
-     conditions?: BlobRequestConditions;
+ // @public
-     customerProvidedKey?: CpkInfo;
+ export interface BlobDownloadOptions extends CommonOptions {
-     deleteSnapshots?: DeleteSnapshotsOptionType;
+     abortSignal?: AbortSignalLike;
- }
+     conditions?: BlobRequestConditions;
- 
+     customerProvidedKey?: CpkInfo;
- // @public
+     maxRetryRequests?: number;
- export type BlobDeleteResponse = WithResponse<BlobDeleteHeaders, BlobDeleteHeaders>;
+     onProgress?: (progress: TransferProgressEvent) => void;
- 
+     rangeGetContentCrc64?: boolean;
- // @public
+     rangeGetContentMD5?: boolean;
- export interface BlobDownloadHeaders {
+     snapshot?: string;
-     acceptRanges?: string;
+ }
-     blobCommittedBlockCount?: number;
+ 
-     blobContentMD5?: Uint8Array;
+ // @public
-     blobSequenceNumber?: number;
+ export type BlobDownloadResponseInternal = BlobDownloadHeaders & {
-     blobType?: BlobType;
+     blobBody?: Promise<Blob>;
-     cacheControl?: string;
+     readableStreamBody?: NodeJS.ReadableStream;
-     clientRequestId?: string;
+ };
-     contentCrc64?: Uint8Array;
+ 
-     contentDisposition?: string;
+ // @public
-     contentEncoding?: string;
+ export type BlobDownloadResponseModel = WithResponse<BlobDownloadResponseInternal, BlobDownloadHeaders>;
-     contentLanguage?: string;
+ 
-     contentLength?: number;
+ // @public
-     contentMD5?: Uint8Array;
+ export interface BlobDownloadToBufferOptions extends CommonOptions {
-     contentRange?: string;
+     abortSignal?: AbortSignalLike;
-     contentType?: string;
+     blockSize?: number;
-     copyCompletedOn?: Date;
+     concurrency?: number;
-     copyId?: string;
+     conditions?: BlobRequestConditions;
-     copyProgress?: string;
+     customerProvidedKey?: CpkInfo;
-     copySource?: string;
+     maxRetryRequestsPerBlock?: number;
-     copyStatus?: CopyStatusType;
+     onProgress?: (progress: TransferProgressEvent) => void;
-     copyStatusDescription?: string;
+ }
-     createdOn?: Date;
+ 
-     date?: Date;
+ // @public
-     encryptionKeySha256?: string;
+ export interface BlobExistsOptions extends CommonOptions {
-     encryptionScope?: string;
+     abortSignal?: AbortSignalLike;
-     errorCode?: string;
+     conditions?: BlobRequestConditions;
-     etag?: string;
+     customerProvidedKey?: CpkInfo;
-     immutabilityPolicyExpiresOn?: Date;
+ }
-     immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
+ 
-     isCurrentVersion?: boolean;
+ // @public
-     isSealed?: boolean;
+ export interface BlobFlatListSegment {
-     isServerEncrypted?: boolean;
+     // (undocumented)
-     lastAccessed?: Date;
+     blobItems: BlobItem[];
-     lastModified?: Date;
+ }
-     leaseDuration?: LeaseDurationType;
+ 
-     leaseState?: LeaseStateType;
+ // @public (undocumented)
-     leaseStatus?: LeaseStatusType;
+ export interface BlobFlatListSegmentModel {
-     legalHold?: boolean;
+     // (undocumented)
-     // (undocumented)
+     blobItems: BlobItemInternal[];
-     metadata?: {
+ }
-         [propertyName: string]: string;
+ 
-     };
+ // @public
-     objectReplicationPolicyId?: string;
+ export interface BlobGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
-     objectReplicationRules?: {
+     // Warning: (ae-forgotten-export) The symbol "BlobSASPermissions" needs to be exported by the entry point index.d.ts
-         [propertyName: string]: string;
+     permissions?: BlobSASPermissions;
-     };
+ }
-     requestId?: string;
+ 
-     tagCount?: number;
+ // @public
-     version?: string;
+ export interface BlobGetAccountInfoHeaders {
-     versionId?: string;
+     accountKind?: AccountKind;
- }
+     clientRequestId?: string;
- 
+     date?: Date;
- // @public
+     isHierarchicalNamespaceEnabled?: boolean;
- export interface BlobDownloadOptionalParams extends coreClient.OperationOptions {
+     requestId?: string;
-     cpkInfo?: CpkInfo;
+     skuName?: SkuName;
-     leaseAccessConditions?: LeaseAccessConditions;
+     version?: string;
-     modifiedAccessConditions?: ModifiedAccessConditionsModel;
+ }
-     range?: string;
+ 
-     rangeGetContentCRC64?: boolean;
+ // @public
-     rangeGetContentMD5?: boolean;
+ export interface BlobGetAccountInfoOptions extends CommonOptions {
-     requestId?: string;
+     abortSignal?: AbortSignalLike;
-     snapshot?: string;
+ }
-     timeoutInSeconds?: number;
+ 
-     versionId?: string;
+ // @public
- }
+ export type BlobGetAccountInfoResponse = WithResponse<BlobGetAccountInfoHeaders, BlobGetAccountInfoHeaders>;
- export interface BlobDownloadOptions extends CommonOptions {
+ export interface BlobGetPropertiesHeaders {
-     abortSignal?: AbortSignalLike;
+     acceptRanges?: string;
-     conditions?: BlobRequestConditions;
+     accessTier?: string;
-     customerProvidedKey?: CpkInfo;
+     accessTierChangedOn?: Date;
-     maxRetryRequests?: number;
+     accessTierInferred?: boolean;
-     onProgress?: (progress: TransferProgressEvent) => void;
+     archiveStatus?: string;
-     rangeGetContentCrc64?: boolean;
+     blobCommittedBlockCount?: number;
-     rangeGetContentMD5?: boolean;
+     blobSequenceNumber?: number;
-     snapshot?: string;
+     blobType?: BlobType;
- }
+     cacheControl?: string;
- 
+     clientRequestId?: string;
- // @public
+     contentDisposition?: string;
- export type BlobDownloadResponseInternal = BlobDownloadHeaders & {
+     contentEncoding?: string;
-     blobBody?: Promise<Blob>;
+     contentLanguage?: string;
-     readableStreamBody?: NodeJS.ReadableStream;
+     contentLength?: number;
- };
+     contentMD5?: Uint8Array;
- 
+     contentType?: string;
- // @public
+     copyCompletedOn?: Date;
- export type BlobDownloadResponseModel = WithResponse<BlobDownloadResponseInternal, BlobDownloadHeaders>;
+     copyId?: string;
- 
+     copyProgress?: string;
- // @public
+     copySource?: string;
- export interface BlobDownloadResponseParsed extends BlobDownloadResponseModel {
+     copyStatus?: CopyStatusType;
-     objectReplicationDestinationPolicyId?: string;
+     copyStatusDescription?: string;
-     objectReplicationSourceProperties?: ObjectReplicationPolicy[];
+     createdOn?: Date;
- }
+     date?: Date;
- 
+     destinationSnapshot?: string;
- // @public
+     encryptionKeySha256?: string;
- export interface BlobDownloadToBufferOptions extends CommonOptions {
+     encryptionScope?: string;
-     abortSignal?: AbortSignalLike;
+     errorCode?: string;
-     blockSize?: number;
+     etag?: string;
-     concurrency?: number;
+     expiresOn?: Date;
-     conditions?: BlobRequestConditions;
+     immutabilityPolicyExpiresOn?: Date;
-     customerProvidedKey?: CpkInfo;
+     immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
-     maxRetryRequestsPerBlock?: number;
+     isCurrentVersion?: boolean;
-     onProgress?: (progress: TransferProgressEvent) => void;
+     isIncrementalCopy?: boolean;
- }
+     isSealed?: boolean;
- 
+     isServerEncrypted?: boolean;
- // @public
+     lastAccessed?: Date;
- export interface BlobExistsOptions extends CommonOptions {
+     lastModified?: Date;
-     abortSignal?: AbortSignalLike;
+     leaseDuration?: LeaseDurationType;
-     conditions?: BlobRequestConditions;
+     leaseState?: LeaseStateType;
-     customerProvidedKey?: CpkInfo;
+     leaseStatus?: LeaseStatusType;
- }
+     legalHold?: boolean;
- 
+     // (undocumented)
- // @public
+     metadata?: {
- export interface BlobFlatListSegment {
+         [propertyName: string]: string;
-     // (undocumented)
+     };
-     blobItems: BlobItem[];
+     objectReplicationPolicyId?: string;
- }
+     objectReplicationRules?: {
- 
+         [propertyName: string]: string;
- // @public (undocumented)
+     };
- export interface BlobFlatListSegmentModel {
+     rehydratePriority?: RehydratePriority;
-     // (undocumented)
+     requestId?: string;
-     blobItems: BlobItemInternal[];
+     tagCount?: number;
- }
+     version?: string;
- 
+     versionId?: string;
- // @public
+ }
- export interface BlobGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+ 
-     permissions?: BlobSASPermissions;
+ // @public
- }
+ export interface BlobGetPropertiesOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     conditions?: BlobRequestConditions;
- export interface BlobGetAccountInfoHeaders {
+     customerProvidedKey?: CpkInfo;
-     accountKind?: AccountKind;
+ }
-     clientRequestId?: string;
+ 
-     date?: Date;
+ // @public
-     isHierarchicalNamespaceEnabled?: boolean;
+ export interface BlobGetPropertiesResponse extends BlobGetPropertiesResponseModel {
-     requestId?: string;
+     objectReplicationDestinationPolicyId?: string;
-     skuName?: SkuName;
+     // Warning: (ae-forgotten-export) The symbol "ObjectReplicationPolicy" needs to be exported by the entry point index.d.ts
-     version?: string;
+     objectReplicationSourceProperties?: ObjectReplicationPolicy[];
- export interface BlobGetAccountInfoOptions extends CommonOptions {
+ export type BlobGetPropertiesResponseModel = WithResponse<BlobGetPropertiesHeaders, BlobGetPropertiesHeaders>;
-     abortSignal?: AbortSignalLike;
+ 
- }
+ // @public
- 
+ export interface BlobGetTagsHeaders {
- // @public
+     clientRequestId?: string;
- export type BlobGetAccountInfoResponse = WithResponse<BlobGetAccountInfoHeaders, BlobGetAccountInfoHeaders>;
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     requestId?: string;
- export interface BlobGetPropertiesHeaders {
+     version?: string;
-     acceptRanges?: string;
+ }
-     accessTier?: string;
+ 
-     accessTierChangedOn?: Date;
+ // @public
-     accessTierInferred?: boolean;
+ export interface BlobGetTagsOptions extends CommonOptions {
-     archiveStatus?: string;
+     abortSignal?: AbortSignalLike;
-     blobCommittedBlockCount?: number;
+     conditions?: TagConditions & LeaseAccessConditions;
-     blobSequenceNumber?: number;
+ }
-     blobType?: BlobType;
+ 
-     cacheControl?: string;
+ // @public
-     clientRequestId?: string;
+ export type BlobGetTagsResponse = WithResponse<{
-     contentDisposition?: string;
+     tags: Tags;
-     contentEncoding?: string;
+ } & BlobGetTagsHeaders, BlobGetTagsHeaders, BlobTags>;
-     contentLanguage?: string;
+ 
-     contentLength?: number;
+ // @public
-     contentMD5?: Uint8Array;
+ export interface BlobHierarchyListSegment {
-     contentType?: string;
+     // (undocumented)
-     copyCompletedOn?: Date;
+     blobItems: BlobItem[];
-     copyId?: string;
+     // (undocumented)
-     copyProgress?: string;
+     blobPrefixes?: BlobPrefix[];
-     copySource?: string;
+ }
-     copyStatus?: CopyStatusType;
+ 
-     copyStatusDescription?: string;
+ // @public (undocumented)
-     createdOn?: Date;
+ export interface BlobHierarchyListSegmentModel {
-     date?: Date;
+     // (undocumented)
-     destinationSnapshot?: string;
+     blobItems: BlobItemInternal[];
-     encryptionKeySha256?: string;
+     // (undocumented)
-     encryptionScope?: string;
+     blobPrefixes?: BlobPrefix[];
-     errorCode?: string;
+ }
-     etag?: string;
+ 
-     expiresOn?: Date;
+ // @public
-     immutabilityPolicyExpiresOn?: Date;
+ export interface BlobHTTPHeaders {
-     immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
+     blobCacheControl?: string;
-     isCurrentVersion?: boolean;
+     blobContentDisposition?: string;
-     isIncrementalCopy?: boolean;
+     blobContentEncoding?: string;
-     isSealed?: boolean;
+     blobContentLanguage?: string;
-     isServerEncrypted?: boolean;
+     blobContentMD5?: Uint8Array;
-     lastAccessed?: Date;
+     blobContentType?: string;
-     lastModified?: Date;
+ }
-     leaseDuration?: LeaseDurationType;
+ 
-     leaseState?: LeaseStateType;
+ // @public
-     leaseStatus?: LeaseStatusType;
+ export interface BlobImmutabilityPolicy {
-     legalHold?: boolean;
+     expiriesOn?: Date;
-     // (undocumented)
+     policyMode?: BlobImmutabilityPolicyMode;
-     metadata?: {
+ }
-         [propertyName: string]: string;
+ 
-     };
+ // @public
-     objectReplicationPolicyId?: string;
+ export type BlobImmutabilityPolicyMode = "Mutable" | "Unlocked" | "Locked";
-     objectReplicationRules?: {
+ 
-         [propertyName: string]: string;
+ // @public
-     };
+ export interface BlobItem {
-     rehydratePriority?: RehydratePriority;
+     // (undocumented)
-     requestId?: string;
+     deleted: boolean;
-     tagCount?: number;
+     // (undocumented)
-     version?: string;
+     hasVersionsOnly?: boolean;
-     versionId?: string;
+     // (undocumented)
- }
+     isCurrentVersion?: boolean;
- 
+     // (undocumented)
- // @public
+     metadata?: {
- export interface BlobGetPropertiesOptions extends CommonOptions {
+         [propertyName: string]: string;
-     abortSignal?: AbortSignalLike;
+     };
-     conditions?: BlobRequestConditions;
+     // (undocumented)
-     customerProvidedKey?: CpkInfo;
+     name: string;
- }
+     // (undocumented)
- 
+     objectReplicationSourceProperties?: ObjectReplicationPolicy[];
- // @public
+     // (undocumented)
- export interface BlobGetPropertiesResponse extends BlobGetPropertiesResponseModel {
+     properties: BlobProperties;
-     objectReplicationDestinationPolicyId?: string;
+     // (undocumented)
-     objectReplicationSourceProperties?: ObjectReplicationPolicy[];
+     snapshot: string;
- }
+     // (undocumented)
- 
+     tags?: Tags;
- // @public
+     // (undocumented)
- export type BlobGetPropertiesResponseModel = WithResponse<BlobGetPropertiesHeaders, BlobGetPropertiesHeaders>;
+     versionId?: string;
- 
+ }
- // @public
+ 
- export interface BlobGetTagsHeaders {
+ // @public
-     clientRequestId?: string;
+ export interface BlobItemInternal {
-     date?: Date;
+     blobTags?: BlobTags;
-     errorCode?: string;
+     // (undocumented)
-     requestId?: string;
+     deleted: boolean;
-     version?: string;
+     hasVersionsOnly?: boolean;
- }
+     // (undocumented)
- 
+     isCurrentVersion?: boolean;
- // @public
+     metadata?: {
- export interface BlobGetTagsOptions extends CommonOptions {
+         [propertyName: string]: string;
-     abortSignal?: AbortSignalLike;
+     };
-     conditions?: TagConditions & LeaseAccessConditions;
+     // (undocumented)
- }
+     name: string;
- 
+     objectReplicationMetadata?: {
- // @public
+         [propertyName: string]: string;
- export type BlobGetTagsResponse = WithResponse<{
+     };
-     tags: Tags;
+     properties: BlobProperties;
- } & BlobGetTagsHeaders, BlobGetTagsHeaders, BlobTags>;
+     // (undocumented)
- 
+     snapshot: string;
- // @public
+     // (undocumented)
- export interface BlobHierarchyListSegment {
+     versionId?: string;
-     // (undocumented)
+ }
-     blobItems: BlobItem[];
+ 
-     // (undocumented)
+ // @public
-     blobPrefixes?: BlobPrefix[];
+ export class BlobLeaseClient {
- }
+     constructor(client: ContainerClient | BlobClient, leaseId?: string);
- 
+     acquireLease(duration: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
- // @public (undocumented)
+     breakLease(breakPeriod: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
- export interface BlobHierarchyListSegmentModel {
+     changeLease(proposedLeaseId: string, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     // (undocumented)
+     get leaseId(): string;
-     blobItems: BlobItemInternal[];
+     releaseLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
-     // (undocumented)
+     renewLease(options?: LeaseOperationOptions): Promise<Lease>;
-     blobPrefixes?: BlobPrefix[];
+     get url(): string;
- // @public
+ // @public (undocumented)
- export interface BlobHTTPHeaders {
+ export interface BlobPrefix {
-     blobCacheControl?: string;
+     // (undocumented)
-     blobContentDisposition?: string;
+     name: string;
-     blobContentEncoding?: string;
+ }
-     blobContentLanguage?: string;
+ 
-     blobContentMD5?: Uint8Array;
+ // @public
-     blobContentType?: string;
+ export interface BlobProperties {
- }
+     // (undocumented)
- 
+     accessTier?: AccessTier;
- // @public
+     // (undocumented)
- export interface BlobImmutabilityPolicy {
+     accessTierChangedOn?: Date;
-     expiriesOn?: Date;
+     // (undocumented)
-     policyMode?: BlobImmutabilityPolicyMode;
+     accessTierInferred?: boolean;
- }
+     // (undocumented)
- 
+     archiveStatus?: ArchiveStatus;
- // @public
+     // (undocumented)
- export type BlobImmutabilityPolicyMode = "Mutable" | "Unlocked" | "Locked";
+     blobSequenceNumber?: number;
- 
+     // (undocumented)
- // @public
+     blobType?: BlobType;
- export interface BlobItem {
+     // (undocumented)
-     // (undocumented)
+     cacheControl?: string;
-     deleted: boolean;
+     // (undocumented)
-     // (undocumented)
+     contentDisposition?: string;
-     hasVersionsOnly?: boolean;
+     // (undocumented)
-     // (undocumented)
+     contentEncoding?: string;
-     isCurrentVersion?: boolean;
+     // (undocumented)
-     // (undocumented)
+     contentLanguage?: string;
-     metadata?: {
+     contentLength?: number;
-         [propertyName: string]: string;
+     // (undocumented)
-     };
+     contentMD5?: Uint8Array;
-     name: string;
+     contentType?: string;
-     objectReplicationSourceProperties?: ObjectReplicationPolicy[];
+     copyCompletedOn?: Date;
-     properties: BlobProperties;
+     copyId?: string;
-     snapshot: string;
+     copyProgress?: string;
-     tags?: Tags;
+     copySource?: string;
-     versionId?: string;
+     copyStatus?: CopyStatusType;
- }
+     // (undocumented)
- 
+     copyStatusDescription?: string;
- // @public
+     // (undocumented)
- export interface BlobItemInternal {
+     createdOn?: Date;
-     blobTags?: BlobTags;
+     // (undocumented)
-     // (undocumented)
+     customerProvidedKeySha256?: string;
-     deleted: boolean;
+     // (undocumented)
-     hasVersionsOnly?: boolean;
+     deletedOn?: Date;
-     isCurrentVersion?: boolean;
+     destinationSnapshot?: string;
-     metadata?: {
+     encryptionScope?: string;
-         [propertyName: string]: string;
+     // (undocumented)
-     };
+     etag: string;
-     name: string;
+     expiresOn?: Date;
-     objectReplicationMetadata?: {
+     immutabilityPolicyExpiresOn?: Date;
-         [propertyName: string]: string;
+     immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
-     };
+     // (undocumented)
-     properties: BlobProperties;
+     incrementalCopy?: boolean;
-     snapshot: string;
+     isSealed?: boolean;
-     versionId?: string;
+     lastAccessedOn?: Date;
- }
+     // (undocumented)
- 
+     lastModified: Date;
- // @public
+     // (undocumented)
- export class BlobLeaseClient {
+     leaseDuration?: LeaseDurationType;
-     constructor(client: ContainerClient | BlobClient, leaseId?: string);
+     // (undocumented)
-     acquireLease(duration: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+     leaseState?: LeaseStateType;
-     breakLease(breakPeriod: number, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+     // (undocumented)
-     changeLease(proposedLeaseId: string, options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+     leaseStatus?: LeaseStatusType;
-     get leaseId(): string;
+     legalHold?: boolean;
-     releaseLease(options?: LeaseOperationOptions): Promise<LeaseOperationResponse>;
+     rehydratePriority?: RehydratePriority;
-     renewLease(options?: LeaseOperationOptions): Promise<Lease>;
+     // (undocumented)
-     get url(): string;
+     remainingRetentionDays?: number;
- }
+     // (undocumented)
- 
+     serverEncrypted?: boolean;
- // @public (undocumented)
+     // (undocumented)
- export interface BlobPrefix {
+     tagCount?: number;
-     // (undocumented)
+ }
-     name: string;
+ 
- }
+ // @public
- 
+ export interface BlobQueryArrowConfiguration {
- // @public
+     kind: "arrow";
- export interface BlobProperties {
+     // Warning: (ae-forgotten-export) The symbol "BlobQueryArrowField" needs to be exported by the entry point index.d.ts
-     // (undocumented)
+     schema: BlobQueryArrowField[];
-     accessTier?: AccessTier;
+ }
-     // (undocumented)
+ 
-     accessTierChangedOn?: Date;
+ // @public
-     // (undocumented)
+ export interface BlobQueryCsvTextConfiguration {
-     accessTierInferred?: boolean;
+     columnSeparator?: string;
-     // (undocumented)
+     escapeCharacter?: string;
-     archiveStatus?: ArchiveStatus;
+     fieldQuote?: string;
-     // (undocumented)
+     hasHeaders?: boolean;
-     blobSequenceNumber?: number;
+     kind: "csv";
-     // (undocumented)
+     recordSeparator: string;
-     blobType?: BlobType;
+ }
-     // (undocumented)
+ 
-     cacheControl?: string;
+ // @public
-     // (undocumented)
+ export interface BlobQueryError {
-     contentDisposition?: string;
+     description: string;
-     // (undocumented)
+     isFatal: boolean;
-     contentEncoding?: string;
+     name: string;
-     // (undocumented)
+     position: number;
-     contentLanguage?: string;
+ }
-     contentLength?: number;
+ 
-     // (undocumented)
+ // @public
-     contentMD5?: Uint8Array;
+ export interface BlobQueryHeaders {
-     // (undocumented)
+     acceptRanges?: string;
-     contentType?: string;
+     blobCommittedBlockCount?: number;
-     // (undocumented)
+     blobContentMD5?: Uint8Array;
-     copyCompletedOn?: Date;
+     blobSequenceNumber?: number;
-     // (undocumented)
+     blobType?: BlobType;
-     copyId?: string;
+     cacheControl?: string;
-     // (undocumented)
+     clientRequestId?: string;
-     copyProgress?: string;
+     contentCrc64?: Uint8Array;
-     // (undocumented)
+     contentDisposition?: string;
-     copySource?: string;
+     contentEncoding?: string;
-     // (undocumented)
+     contentLanguage?: string;
-     copyStatus?: CopyStatusType;
+     contentLength?: number;
-     // (undocumented)
+     contentMD5?: Uint8Array;
-     copyStatusDescription?: string;
+     contentRange?: string;
-     // (undocumented)
+     contentType?: string;
-     createdOn?: Date;
+     copyCompletionTime?: Date;
-     // (undocumented)
+     copyId?: string;
-     customerProvidedKeySha256?: string;
+     copyProgress?: string;
-     // (undocumented)
+     copySource?: string;
-     deletedOn?: Date;
+     copyStatus?: CopyStatusType;
-     // (undocumented)
+     copyStatusDescription?: string;
-     destinationSnapshot?: string;
+     date?: Date;
-     encryptionScope?: string;
+     encryptionKeySha256?: string;
-     // (undocumented)
+     encryptionScope?: string;
-     etag: string;
+     errorCode?: string;
-     // (undocumented)
+     etag?: string;
-     expiresOn?: Date;
+     isServerEncrypted?: boolean;
-     immutabilityPolicyExpiresOn?: Date;
+     lastModified?: Date;
-     immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
+     leaseDuration?: LeaseDurationType;
-     // (undocumented)
+     leaseState?: LeaseStateType;
-     incrementalCopy?: boolean;
+     leaseStatus?: LeaseStatusType;
-     isSealed?: boolean;
+     metadata?: {
-     // (undocumented)
+         [propertyName: string]: string;
-     lastAccessedOn?: Date;
+     };
-     // (undocumented)
+     requestId?: string;
-     lastModified: Date;
+     version?: string;
-     // (undocumented)
+ }
-     leaseDuration?: LeaseDurationType;
+ 
-     // (undocumented)
+ // @public
-     leaseState?: LeaseStateType;
+ export interface BlobQueryJsonTextConfiguration {
-     // (undocumented)
+     kind: "json";
-     leaseStatus?: LeaseStatusType;
+     recordSeparator: string;
-     legalHold?: boolean;
+ }
-     rehydratePriority?: RehydratePriority;
+ 
-     // (undocumented)
+ // @public
-     remainingRetentionDays?: number;
+ export interface BlobQueryParquetConfiguration {
-     // (undocumented)
+     kind: "parquet";
-     serverEncrypted?: boolean;
+ }
-     // (undocumented)
+ 
-     tagCount?: number;
+ // @public
- }
+ export type BlobQueryResponseInternal = BlobQueryHeaders & {
- 
+     blobBody?: Promise<Blob>;
- // @public
+     readableStreamBody?: NodeJS.ReadableStream;
- export interface BlobQueryArrowConfiguration {
+ };
-     kind: "arrow";
+ 
-     schema: BlobQueryArrowField[];
+ // @public
- }
+ export type BlobQueryResponseModel = WithResponse<BlobQueryResponseInternal, BlobQueryHeaders>;
- export interface BlobQueryArrowField {
+ export interface BlobReleaseLeaseOptions extends CommonOptions {
-     name?: string;
+     abortSignal?: AbortSignalLike;
-     precision?: number;
+     conditions?: ModifiedAccessConditions;
-     scale?: number;
+ }
-     type: BlobQueryArrowFieldType;
+ 
- }
+ // @public
- 
+ export interface BlobRenewLeaseOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export type BlobQueryArrowFieldType = "int64" | "bool" | "timestamp[ms]" | "string" | "double" | "decimal";
+     conditions?: ModifiedAccessConditions;
- 
+ }
- // @public
+ 
- export interface BlobQueryCsvTextConfiguration {
+ // @public
-     columnSeparator?: string;
+ export class BlobServiceClient extends StorageClient {
-     escapeCharacter?: string;
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
-     fieldQuote?: string;
+     constructor(url: string, pipeline: PipelineLike);
-     hasHeaders?: boolean;
+     createContainer(containerName: string, options?: ContainerCreateOptions): Promise<{
-     kind: "csv";
+         containerClient: ContainerClient;
-     recordSeparator: string;
+         containerCreateResponse: ContainerCreateResponse;
- }
+     }>;
- 
+     deleteContainer(containerName: string, options?: ContainerDeleteMethodOptions): Promise<ContainerDeleteResponse>;
- // @public
+     findBlobsByTags(tagFilterSqlExpression: string, options?: ServiceFindBlobByTagsOptions): PagedAsyncIterableIterator<FilterBlobItem, ServiceFindBlobsByTagsSegmentResponse>;
- export interface BlobQueryError {
+     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): BlobServiceClient;
-     description: string;
+     // Warning: (ae-forgotten-export) The symbol "AccountSASPermissions" needs to be exported by the entry point index.d.ts
-     isFatal: boolean;
+     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
-     name: string;
+     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
-     position: number;
+     getAccountInfo(options?: ServiceGetAccountInfoOptions): Promise<ServiceGetAccountInfoResponse>;
- }
+     getBlobBatchClient(): BlobBatchClient;
- 
+     getContainerClient(containerName: string): ContainerClient;
- // @public
+     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
- export interface BlobQueryHeaders {
+     getStatistics(options?: ServiceGetStatisticsOptions): Promise<ServiceGetStatisticsResponse>;
-     acceptRanges?: string;
+     getUserDelegationKey(startsOn: Date, expiresOn: Date, options?: ServiceGetUserDelegationKeyOptions): Promise<ServiceGetUserDelegationKeyResponse>;
-     blobCommittedBlockCount?: number;
+     listContainers(options?: ServiceListContainersOptions): PagedAsyncIterableIterator<ContainerItem, ServiceListContainersSegmentResponse>;
-     blobContentMD5?: Uint8Array;
+     setProperties(properties: BlobServiceProperties, options?: ServiceSetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
-     blobSequenceNumber?: number;
+     undeleteContainer(deletedContainerName: string, deletedContainerVersion: string, options?: ServiceUndeleteContainerOptions): Promise<{
-     blobType?: BlobType;
+         containerClient: ContainerClient;
-     cacheControl?: string;
+         containerUndeleteResponse: ContainerUndeleteResponse;
-     clientRequestId?: string;
+     }>;
-     contentCrc64?: Uint8Array;
+ }
-     contentDisposition?: string;
+ 
-     contentEncoding?: string;
+ // @public
-     contentLanguage?: string;
+ export interface BlobServiceProperties {
-     contentLength?: number;
+     blobAnalyticsLogging?: Logging;
-     contentMD5?: Uint8Array;
+     cors?: CorsRule[];
-     contentRange?: string;
+     defaultServiceVersion?: string;
-     contentType?: string;
+     deleteRetentionPolicy?: RetentionPolicy;
-     copyCompletionTime?: Date;
+     hourMetrics?: Metrics;
-     copyId?: string;
+     minuteMetrics?: Metrics;
-     copyProgress?: string;
+     staticWebsite?: StaticWebsite;
-     copySource?: string;
+ }
-     copyStatus?: CopyStatusType;
+ 
-     copyStatusDescription?: string;
+ // @public
-     date?: Date;
+ export interface BlobServiceStatistics {
-     encryptionKeySha256?: string;
+     geoReplication?: GeoReplication;
-     encryptionScope?: string;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public
-     isServerEncrypted?: boolean;
+ export interface BlobSetHTTPHeadersHeaders {
-     lastModified?: Date;
+     blobSequenceNumber?: number;
-     leaseDuration?: LeaseDurationType;
+     clientRequestId?: string;
-     leaseState?: LeaseStateType;
+     date?: Date;
-     leaseStatus?: LeaseStatusType;
+     errorCode?: string;
-     // (undocumented)
+     etag?: string;
-     metadata?: {
+     lastModified?: Date;
-         [propertyName: string]: string;
+     requestId?: string;
-     };
+     version?: string;
-     requestId?: string;
+ }
-     version?: string;
+ 
- }
+ // @public
- 
+ export interface BlobSetHTTPHeadersOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface BlobQueryJsonTextConfiguration {
+     conditions?: BlobRequestConditions;
-     kind: "json";
+     customerProvidedKey?: CpkInfo;
-     recordSeparator: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type BlobSetHTTPHeadersResponse = WithResponse<BlobSetHTTPHeadersHeaders, BlobSetHTTPHeadersHeaders>;
- export interface BlobQueryParquetConfiguration {
+ 
-     kind: "parquet";
+ // @public
- }
+ export interface BlobSetImmutabilityPolicyHeaders {
- 
+     clientRequestId?: string;
- // @public
+     date?: Date;
- export type BlobQueryResponseInternal = BlobQueryHeaders & {
+     immutabilityPolicyExpiry?: Date;
-     blobBody?: Promise<Blob>;
+     immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
-     readableStreamBody?: NodeJS.ReadableStream;
+     requestId?: string;
- };
+     version?: string;
- 
+ }
- // @public
+ 
- export type BlobQueryResponseModel = WithResponse<BlobQueryResponseInternal, BlobQueryHeaders>;
+ // @public
- 
+ export interface BlobSetImmutabilityPolicyOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface BlobReleaseLeaseOptions extends CommonOptions {
+     // (undocumented)
-     abortSignal?: AbortSignalLike;
+     modifiedAccessCondition?: ModificationConditions;
-     conditions?: ModifiedAccessConditions;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type BlobSetImmutabilityPolicyResponse = WithResponse<BlobSetImmutabilityPolicyHeaders, BlobSetImmutabilityPolicyHeaders>;
- export interface BlobRenewLeaseOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     conditions?: ModifiedAccessConditions;
+ export interface BlobSetLegalHoldHeaders {
- }
+     clientRequestId?: string;
- 
+     date?: Date;
- // @public
+     legalHold?: boolean;
- export interface BlobRequestConditions extends ModifiedAccessConditions, LeaseAccessConditions {
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export class BlobSASPermissions {
+ // @public
-     add: boolean;
+ export interface BlobSetLegalHoldOptions extends CommonOptions {
-     create: boolean;
+     abortSignal?: AbortSignalLike;
-     delete: boolean;
+ }
-     deleteVersion: boolean;
+ 
-     execute: boolean;
+ // @public
-     static from(permissionLike: BlobSASPermissionsLike): BlobSASPermissions;
+ export type BlobSetLegalHoldResponse = WithResponse<BlobSetLegalHoldHeaders, BlobSetLegalHoldHeaders>;
-     move: boolean;
+ 
-     static parse(permissions: string): BlobSASPermissions;
+ // @public
-     permanentDelete: boolean;
+ export interface BlobSetMetadataHeaders {
-     read: boolean;
+     clientRequestId?: string;
-     setImmutabilityPolicy: boolean;
+     date?: Date;
-     tag: boolean;
+     encryptionKeySha256?: string;
-     toString(): string;
+     encryptionScope?: string;
-     write: boolean;
+     errorCode?: string;
- }
+     etag?: string;
- 
+     isServerEncrypted?: boolean;
- // @public
+     lastModified?: Date;
- export interface BlobSASPermissionsLike {
+     requestId?: string;
-     add?: boolean;
+     version?: string;
-     create?: boolean;
+     versionId?: string;
-     delete?: boolean;
+ }
-     deleteVersion?: boolean;
+ 
-     execute?: boolean;
+ // @public
-     move?: boolean;
+ export interface BlobSetMetadataOptions extends CommonOptions {
-     permanentDelete?: boolean;
+     abortSignal?: AbortSignalLike;
-     read?: boolean;
+     conditions?: BlobRequestConditions;
-     setImmutabilityPolicy?: boolean;
+     customerProvidedKey?: CpkInfo;
-     tag?: boolean;
+     encryptionScope?: string;
-     write?: boolean;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type BlobSetMetadataResponse = WithResponse<BlobSetMetadataHeaders, BlobSetMetadataHeaders>;
- export interface BlobSASSignatureValues {
+ 
-     blobName?: string;
+ // @public
-     cacheControl?: string;
+ export interface BlobSetTagsHeaders {
-     containerName: string;
+     clientRequestId?: string;
-     contentDisposition?: string;
+     date?: Date;
-     contentEncoding?: string;
+     errorCode?: string;
-     contentLanguage?: string;
+     requestId?: string;
-     contentType?: string;
+     version?: string;
-     correlationId?: string;
+ }
-     encryptionScope?: string;
+ 
-     expiresOn?: Date;
+ // @public
-     identifier?: string;
+ export interface BlobSetTagsOptions extends CommonOptions {
-     ipRange?: SasIPRange;
+     abortSignal?: AbortSignalLike;
-     permissions?: BlobSASPermissions | ContainerSASPermissions;
+     conditions?: TagConditions & LeaseAccessConditions;
-     preauthorizedAgentObjectId?: string;
+ }
-     protocol?: SASProtocol;
+ 
-     snapshotTime?: string;
+ // @public
-     startsOn?: Date;
+ export type BlobSetTagsResponse = WithResponse<BlobSetTagsHeaders, BlobSetTagsHeaders>;
-     version?: string;
+ 
-     versionId?: string;
+ // @public
- }
+ export interface BlobSetTierHeaders {
- 
+     clientRequestId?: string;
- // @public
+     errorCode?: string;
- export class BlobServiceClient extends StorageClient {
+     requestId?: string;
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+     version?: string;
-     constructor(url: string, pipeline: PipelineLike);
+ }
-     createContainer(containerName: string, options?: ContainerCreateOptions): Promise<{
+ 
-         containerClient: ContainerClient;
+ // @public
-         containerCreateResponse: ContainerCreateResponse;
+ export interface BlobSetTierOptions extends CommonOptions {
-     }>;
+     abortSignal?: AbortSignalLike;
-     deleteContainer(containerName: string, options?: ContainerDeleteMethodOptions): Promise<ContainerDeleteResponse>;
+     conditions?: LeaseAccessConditions & TagConditions;
-     findBlobsByTags(tagFilterSqlExpression: string, options?: ServiceFindBlobByTagsOptions): PagedAsyncIterableIterator<FilterBlobItem, ServiceFindBlobsByTagsSegmentResponse>;
+     rehydratePriority?: RehydratePriority;
-     static fromConnectionString(connectionString: string, options?: StoragePipelineOptions): BlobServiceClient;
+ }
-     generateAccountSasUrl(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
+ 
-     generateSasStringToSign(expiresOn?: Date, permissions?: AccountSASPermissions, resourceTypes?: string, options?: ServiceGenerateAccountSasUrlOptions): string;
+ // @public
-     getAccountInfo(options?: ServiceGetAccountInfoOptions): Promise<ServiceGetAccountInfoResponse>;
+ export type BlobSetTierResponse = WithResponse<BlobSetTierHeaders, BlobSetTierHeaders>;
-     getBlobBatchClient(): BlobBatchClient;
+ 
-     getContainerClient(containerName: string): ContainerClient;
+ // @public
-     getProperties(options?: ServiceGetPropertiesOptions): Promise<ServiceGetPropertiesResponse>;
+ export interface BlobStartCopyFromURLHeaders {
-     getStatistics(options?: ServiceGetStatisticsOptions): Promise<ServiceGetStatisticsResponse>;
+     clientRequestId?: string;
-     getUserDelegationKey(startsOn: Date, expiresOn: Date, options?: ServiceGetUserDelegationKeyOptions): Promise<ServiceGetUserDelegationKeyResponse>;
+     copyId?: string;
-     listContainers(options?: ServiceListContainersOptions): PagedAsyncIterableIterator<ContainerItem, ServiceListContainersSegmentResponse>;
+     copyStatus?: CopyStatusType;
-     setProperties(properties: BlobServiceProperties, options?: ServiceSetPropertiesOptions): Promise<ServiceSetPropertiesResponse>;
+     date?: Date;
-     undeleteContainer(deletedContainerName: string, deletedContainerVersion: string, options?: ServiceUndeleteContainerOptions): Promise<{
+     errorCode?: string;
-         containerClient: ContainerClient;
+     etag?: string;
-         containerUndeleteResponse: ContainerUndeleteResponse;
+     lastModified?: Date;
-     }>;
+     requestId?: string;
- }
+     version?: string;
- 
+     versionId?: string;
- // @public
+ }
- export interface BlobServiceProperties {
+ 
-     blobAnalyticsLogging?: Logging;
+ // @public
-     cors?: CorsRule[];
+ export interface BlobStartCopyFromURLOptions extends CommonOptions {
-     defaultServiceVersion?: string;
+     abortSignal?: AbortSignalLike;
-     deleteRetentionPolicy?: RetentionPolicy;
+     conditions?: BlobRequestConditions;
-     hourMetrics?: Metrics;
+     immutabilityPolicy?: BlobImmutabilityPolicy;
-     minuteMetrics?: Metrics;
+     legalHold?: boolean;
-     staticWebsite?: StaticWebsite;
+     metadata?: Metadata;
- }
+     rehydratePriority?: RehydratePriority;
- 
+     sealBlob?: boolean;
- // @public
+     sourceConditions?: ModifiedAccessConditions;
- export interface BlobServiceStatistics {
+     tags?: Tags;
-     geoReplication?: GeoReplication;
+     tier?: BlockBlobTier | PremiumPageBlobTier | string;
- export interface BlobSetHTTPHeadersHeaders {
+ export type BlobStartCopyFromURLResponse = WithResponse<BlobStartCopyFromURLHeaders, BlobStartCopyFromURLHeaders>;
-     blobSequenceNumber?: number;
+ 
-     clientRequestId?: string;
+ // @public
-     date?: Date;
+ export interface BlobSyncCopyFromURLOptions extends CommonOptions {
-     errorCode?: string;
+     abortSignal?: AbortSignalLike;
-     etag?: string;
+     conditions?: BlobRequestConditions;
-     lastModified?: Date;
+     copySourceTags?: BlobCopySourceTags;
-     requestId?: string;
+     encryptionScope?: string;
-     version?: string;
+     immutabilityPolicy?: BlobImmutabilityPolicy;
- }
+     legalHold?: boolean;
- 
+     metadata?: Metadata;
- // @public
+     sourceAuthorization?: HttpAuthorization;
- export interface BlobSetHTTPHeadersOptions extends CommonOptions {
+     sourceConditions?: MatchConditions & ModificationConditions;
-     abortSignal?: AbortSignalLike;
+     sourceContentMD5?: Uint8Array;
-     conditions?: BlobRequestConditions;
+     sourceShareTokenIntent?: FileShareTokenIntent;
-     customerProvidedKey?: CpkInfo;
+     tags?: Tags;
- }
+     tier?: BlockBlobTier | PremiumPageBlobTier | string;
- 
+ }
- // @public
+ 
- export type BlobSetHTTPHeadersResponse = WithResponse<BlobSetHTTPHeadersHeaders, BlobSetHTTPHeadersHeaders>;
+ // @public (undocumented)
- 
+ export interface BlobTag {
- // @public
+     // (undocumented)
- export interface BlobSetImmutabilityPolicyHeaders {
+     key: string;
-     clientRequestId?: string;
+     // (undocumented)
-     date?: Date;
+     value: string;
-     immutabilityPolicyExpiry?: Date;
+ }
-     immutabilityPolicyMode?: BlobImmutabilityPolicyMode;
+ 
-     requestId?: string;
+ // @public
-     version?: string;
+ export interface BlobTags {
- }
+     // (undocumented)
- 
+     blobTagSet: BlobTag[];
- // @public
+ }
- export interface BlobSetImmutabilityPolicyOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     // (undocumented)
+ export type BlobType = "BlockBlob" | "PageBlob" | "AppendBlob";
-     modifiedAccessCondition?: ModificationConditions;
+ 
- }
+ // @public
- 
+ export interface BlobUndeleteHeaders {
- // @public
+     clientRequestId?: string;
- export type BlobSetImmutabilityPolicyResponse = WithResponse<BlobSetImmutabilityPolicyHeaders, BlobSetImmutabilityPolicyHeaders>;
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     requestId?: string;
- export interface BlobSetLegalHoldHeaders {
+     version?: string;
-     clientRequestId?: string;
+ }
-     date?: Date;
+ 
-     legalHold?: boolean;
+ // @public
-     requestId?: string;
+ export interface BlobUndeleteOptions extends CommonOptions {
-     version?: string;
+     abortSignal?: AbortSignalLike;
- }
+     customerProvidedKey?: CpkInfo;
- 
+ }
- // @public
+ 
- export interface BlobSetLegalHoldOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export type BlobUndeleteResponse = WithResponse<BlobUndeleteHeaders, BlobUndeleteHeaders>;
- }
+ 
- 
+ // @public
- // @public
+ export type BlobUploadCommonResponse = WithResponse<BlockBlobUploadHeaders>;
- export type BlobSetLegalHoldResponse = WithResponse<BlobSetLegalHoldHeaders, BlobSetLegalHoldHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface Block {
- export interface BlobSetMetadataHeaders {
+     name: string;
-     clientRequestId?: string;
+     size: number;
-     date?: Date;
+ }
-     encryptionKeySha256?: string;
+ 
-     encryptionScope?: string;
+ // @public
-     errorCode?: string;
+ export class BlockBlobClient extends BlobClient {
-     etag?: string;
+     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
-     isServerEncrypted?: boolean;
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
-     lastModified?: Date;
+     constructor(url: string, pipeline: PipelineLike);
-     requestId?: string;
+     commitBlockList(blocks: string[], options?: BlockBlobCommitBlockListOptions): Promise<BlockBlobCommitBlockListResponse>;
-     version?: string;
+     getBlockList(listType: BlockListType, options?: BlockBlobGetBlockListOptions): Promise<BlockBlobGetBlockListResponse>;
-     versionId?: string;
+     query(query: string, options?: BlockBlobQueryOptions): Promise<BlobDownloadResponseModel>;
- }
+     stageBlock(blockId: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobStageBlockOptions): Promise<BlockBlobStageBlockResponse>;
- 
+     stageBlockFromURL(blockId: string, sourceURL: string, offset?: number, count?: number, options?: BlockBlobStageBlockFromURLOptions): Promise<BlockBlobStageBlockFromURLResponse>;
- // @public
+     syncUploadFromURL(sourceURL: string, options?: BlockBlobSyncUploadFromURLOptions): Promise<BlockBlobPutBlobFromUrlResponse>;
- export interface BlobSetMetadataOptions extends CommonOptions {
+     upload(body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<BlockBlobUploadResponse>;
-     abortSignal?: AbortSignalLike;
+     // @deprecated
-     conditions?: BlobRequestConditions;
+     uploadBrowserData(browserData: Blob | ArrayBuffer | ArrayBufferView, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
-     customerProvidedKey?: CpkInfo;
+     uploadData(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
-     encryptionScope?: string;
+     uploadFile(filePath: string, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
- }
+     uploadStream(stream: Readable, bufferSize?: number, maxConcurrency?: number, options?: BlockBlobUploadStreamOptions): Promise<BlobUploadCommonResponse>;
- 
+     withSnapshot(snapshot: string): BlockBlobClient;
- // @public
+ }
- export type BlobSetMetadataResponse = WithResponse<BlobSetMetadataHeaders, BlobSetMetadataHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface BlockBlobCommitBlockListHeaders {
- export interface BlobSetTagsHeaders {
+     clientRequestId?: string;
-     clientRequestId?: string;
+     contentMD5?: Uint8Array;
-     errorCode?: string;
+     encryptionKeySha256?: string;
-     requestId?: string;
+     encryptionScope?: string;
-     version?: string;
+     errorCode?: string;
- }
+     etag?: string;
- 
+     isServerEncrypted?: boolean;
- // @public
+     lastModified?: Date;
- export interface BlobSetTagsOptions extends CommonOptions {
+     requestId?: string;
-     abortSignal?: AbortSignalLike;
+     version?: string;
-     conditions?: TagConditions & LeaseAccessConditions;
+     versionId?: string;
- }
+     xMsContentCrc64?: Uint8Array;
- 
+ }
- // @public
+ 
- export type BlobSetTagsResponse = WithResponse<BlobSetTagsHeaders, BlobSetTagsHeaders>;
+ // @public
- 
+ export interface BlockBlobCommitBlockListOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface BlobSetTierHeaders {
+     blobHTTPHeaders?: BlobHTTPHeaders;
-     clientRequestId?: string;
+     conditions?: BlobRequestConditions;
-     errorCode?: string;
+     customerProvidedKey?: CpkInfo;
-     requestId?: string;
+     encryptionScope?: string;
-     version?: string;
+     immutabilityPolicy?: BlobImmutabilityPolicy;
- }
+     legalHold?: boolean;
- 
+     metadata?: Metadata;
- // @public
+     tags?: Tags;
- export interface BlobSetTierOptions extends CommonOptions {
+     tier?: BlockBlobTier | string;
-     abortSignal?: AbortSignalLike;
+ }
-     conditions?: LeaseAccessConditions & TagConditions;
+ 
-     rehydratePriority?: RehydratePriority;
+ // @public
- }
+ export type BlockBlobCommitBlockListResponse = WithResponse<BlockBlobCommitBlockListHeaders, BlockBlobCommitBlockListHeaders>;
- export type BlobSetTierResponse = WithResponse<BlobSetTierHeaders, BlobSetTierHeaders>;
+ export interface BlockBlobGetBlockListHeaders {
- 
+     blobContentLength?: number;
- // @public
+     clientRequestId?: string;
- export interface BlobStartCopyFromURLHeaders {
+     contentType?: string;
-     clientRequestId?: string;
+     date?: Date;
-     copyId?: string;
+     errorCode?: string;
-     copyStatus?: CopyStatusType;
+     etag?: string;
-     date?: Date;
+     lastModified?: Date;
-     errorCode?: string;
+     requestId?: string;
-     etag?: string;
+     version?: string;
-     lastModified?: Date;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
-     versionId?: string;
+ export interface BlockBlobGetBlockListOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     conditions?: LeaseAccessConditions & TagConditions;
- // @public
+ }
- export interface BlobStartCopyFromURLOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     conditions?: BlobRequestConditions;
+ export type BlockBlobGetBlockListResponse = WithResponse<BlockBlobGetBlockListResponseInternal, BlockBlobGetBlockListHeaders>;
-     immutabilityPolicy?: BlobImmutabilityPolicy;
+ 
-     legalHold?: boolean;
+ // @public
-     metadata?: Metadata;
+ export type BlockBlobGetBlockListResponseInternal = BlockBlobGetBlockListHeaders & BlockList;
-     rehydratePriority?: RehydratePriority;
+ 
-     sealBlob?: boolean;
+ // @public
-     sourceConditions?: ModifiedAccessConditions;
+ export interface BlockBlobParallelUploadOptions extends CommonOptions {
-     tags?: Tags;
+     abortSignal?: AbortSignalLike;
-     tier?: BlockBlobTier | PremiumPageBlobTier | string;
+     blobHTTPHeaders?: BlobHTTPHeaders;
- }
+     blockSize?: number;
- 
+     concurrency?: number;
- // @public
+     conditions?: BlobRequestConditions;
- export type BlobStartCopyFromURLResponse = WithResponse<BlobStartCopyFromURLHeaders, BlobStartCopyFromURLHeaders>;
+     encryptionScope?: string;
- 
+     maxSingleShotSize?: number;
- // @public
+     metadata?: {
- export interface BlobSyncCopyFromURLOptions extends CommonOptions {
+         [propertyName: string]: string;
-     abortSignal?: AbortSignalLike;
+     };
-     conditions?: BlobRequestConditions;
+     onProgress?: (progress: TransferProgressEvent) => void;
-     copySourceTags?: BlobCopySourceTags;
+     tags?: Tags;
-     encryptionScope?: string;
+     tier?: BlockBlobTier | string;
-     immutabilityPolicy?: BlobImmutabilityPolicy;
+ }
-     legalHold?: boolean;
+ 
-     metadata?: Metadata;
+ // @public
-     sourceAuthorization?: HttpAuthorization;
+ export interface BlockBlobPutBlobFromUrlHeaders {
-     sourceConditions?: MatchConditions & ModificationConditions;
+     clientRequestId?: string;
-     sourceContentMD5?: Uint8Array;
+     contentMD5?: Uint8Array;
-     sourceShareTokenIntent?: FileShareTokenIntent;
+     date?: Date;
-     tags?: Tags;
+     encryptionKeySha256?: string;
-     tier?: BlockBlobTier | PremiumPageBlobTier | string;
+     encryptionScope?: string;
- }
+     errorCode?: string;
- 
+     etag?: string;
- // @public (undocumented)
+     isServerEncrypted?: boolean;
- export interface BlobTag {
+     lastModified?: Date;
-     // (undocumented)
+     requestId?: string;
-     key: string;
+     version?: string;
-     // (undocumented)
+     versionId?: string;
-     value: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type BlockBlobPutBlobFromUrlResponse = WithResponse<BlockBlobPutBlobFromUrlHeaders, BlockBlobPutBlobFromUrlHeaders>;
- export interface BlobTags {
+ 
-     // (undocumented)
+ // @public
-     blobTagSet: BlobTag[];
+ export interface BlockBlobQueryOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     conditions?: BlobRequestConditions;
- // @public
+     customerProvidedKey?: CpkInfo;
- export type BlobType = "BlockBlob" | "PageBlob" | "AppendBlob";
+     inputTextConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration | BlobQueryParquetConfiguration;
- 
+     onError?: (error: BlobQueryError) => void;
- // @public
+     onProgress?: (progress: TransferProgressEvent) => void;
- export interface BlobUndeleteHeaders {
+     outputTextConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration | BlobQueryArrowConfiguration;
-     clientRequestId?: string;
+ }
-     date?: Date;
+ 
-     errorCode?: string;
+ // @public
-     requestId?: string;
+ export interface BlockBlobStageBlockFromURLHeaders {
-     version?: string;
+     clientRequestId?: string;
- }
+     contentMD5?: Uint8Array;
- 
+     date?: Date;
- // @public
+     encryptionKeySha256?: string;
- export interface BlobUndeleteOptions extends CommonOptions {
+     encryptionScope?: string;
-     abortSignal?: AbortSignalLike;
+     errorCode?: string;
-     customerProvidedKey?: CpkInfo;
+     isServerEncrypted?: boolean;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+     xMsContentCrc64?: Uint8Array;
- export type BlobUndeleteResponse = WithResponse<BlobUndeleteHeaders, BlobUndeleteHeaders>;
+ }
- export type BlobUploadCommonResponse = WithResponse<BlockBlobUploadHeaders>;
+ export interface BlockBlobStageBlockFromURLOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     conditions?: LeaseAccessConditions;
- export interface Block {
+     customerProvidedKey?: CpkInfo;
-     name: string;
+     encryptionScope?: string;
-     size: number;
+     range?: Range_2;
- }
+     sourceAuthorization?: HttpAuthorization;
- 
+     sourceContentCrc64?: Uint8Array;
- // @public
+     sourceContentMD5?: Uint8Array;
- export class BlockBlobClient extends BlobClient {
+     sourceShareTokenIntent?: FileShareTokenIntent;
-     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
+ }
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+ 
-     constructor(url: string, pipeline: PipelineLike);
+ // @public
-     commitBlockList(blocks: string[], options?: BlockBlobCommitBlockListOptions): Promise<BlockBlobCommitBlockListResponse>;
+ export type BlockBlobStageBlockFromURLResponse = WithResponse<BlockBlobStageBlockFromURLHeaders, BlockBlobStageBlockFromURLHeaders>;
-     getBlockList(listType: BlockListType, options?: BlockBlobGetBlockListOptions): Promise<BlockBlobGetBlockListResponse>;
+ 
-     query(query: string, options?: BlockBlobQueryOptions): Promise<BlobDownloadResponseModel>;
+ // @public
-     stageBlock(blockId: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobStageBlockOptions): Promise<BlockBlobStageBlockResponse>;
+ export interface BlockBlobStageBlockHeaders {
-     stageBlockFromURL(blockId: string, sourceURL: string, offset?: number, count?: number, options?: BlockBlobStageBlockFromURLOptions): Promise<BlockBlobStageBlockFromURLResponse>;
+     clientRequestId?: string;
-     syncUploadFromURL(sourceURL: string, options?: BlockBlobSyncUploadFromURLOptions): Promise<BlockBlobPutBlobFromUrlResponse>;
+     contentMD5?: Uint8Array;
-     upload(body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<BlockBlobUploadResponse>;
+     date?: Date;
-     // @deprecated
+     encryptionKeySha256?: string;
-     uploadBrowserData(browserData: Blob | ArrayBuffer | ArrayBufferView, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
+     encryptionScope?: string;
-     uploadData(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
+     errorCode?: string;
-     uploadFile(filePath: string, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
+     isServerEncrypted?: boolean;
-     uploadStream(stream: Readable, bufferSize?: number, maxConcurrency?: number, options?: BlockBlobUploadStreamOptions): Promise<BlobUploadCommonResponse>;
+     requestId?: string;
-     withSnapshot(snapshot: string): BlockBlobClient;
+     version?: string;
- }
+     xMsContentCrc64?: Uint8Array;
- 
+ }
- // @public
+ 
- export interface BlockBlobCommitBlockListHeaders {
+ // @public
-     clientRequestId?: string;
+ export interface BlockBlobStageBlockOptions extends CommonOptions {
-     contentMD5?: Uint8Array;
+     abortSignal?: AbortSignalLike;
-     date?: Date;
+     conditions?: LeaseAccessConditions;
-     encryptionKeySha256?: string;
+     customerProvidedKey?: CpkInfo;
-     errorCode?: string;
+     onProgress?: (progress: TransferProgressEvent) => void;
-     etag?: string;
+     transactionalContentCrc64?: Uint8Array;
-     isServerEncrypted?: boolean;
+     transactionalContentMD5?: Uint8Array;
-     lastModified?: Date;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
-     versionId?: string;
+ export type BlockBlobStageBlockResponse = WithResponse<BlockBlobStageBlockHeaders, BlockBlobStageBlockHeaders>;
-     xMsContentCrc64?: Uint8Array;
+ 
- }
+ // @public
- 
+ export interface BlockBlobSyncUploadFromURLOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export interface BlockBlobCommitBlockListOptions extends CommonOptions {
+     blobHTTPHeaders?: BlobHTTPHeaders;
-     abortSignal?: AbortSignalLike;
+     conditions?: BlobRequestConditions;
-     blobHTTPHeaders?: BlobHTTPHeaders;
+     copySourceBlobProperties?: boolean;
-     conditions?: BlobRequestConditions;
+     copySourceTags?: BlobCopySourceTags;
-     immutabilityPolicy?: BlobImmutabilityPolicy;
+     metadata?: Metadata;
-     legalHold?: boolean;
+     sourceAuthorization?: HttpAuthorization;
-     metadata?: Metadata;
+     sourceConditions?: ModifiedAccessConditions;
-     tags?: Tags;
+     sourceContentMD5?: Uint8Array;
-     tier?: BlockBlobTier | string;
+     sourceShareTokenIntent?: FileShareTokenIntent;
- }
+     tags?: Tags;
- 
+     tier?: BlockBlobTier | string;
- // @public
+     timeoutInSeconds?: number;
- export type BlockBlobCommitBlockListResponse = WithResponse<BlockBlobCommitBlockListHeaders, BlockBlobCommitBlockListHeaders>;
+ }
- export interface BlockBlobGetBlockListHeaders {
+ export enum BlockBlobTier {
-     blobContentLength?: number;
+     Archive = "Archive",
-     clientRequestId?: string;
+     Cold = "Cold",
-     contentType?: string;
+     Cool = "Cool",
-     date?: Date;
+     Hot = "Hot"
-     errorCode?: string;
+ }
-     etag?: string;
+ 
-     lastModified?: Date;
+ // @public
-     requestId?: string;
+ export interface BlockBlobUploadHeaders {
-     version?: string;
+     clientRequestId?: string;
- }
+     contentMD5?: Uint8Array;
- 
+     date?: Date;
- // @public
+     encryptionKeySha256?: string;
- export interface BlockBlobGetBlockListOptions extends CommonOptions {
+     encryptionScope?: string;
-     abortSignal?: AbortSignalLike;
+     errorCode?: string;
-     conditions?: LeaseAccessConditions & TagConditions;
+     etag?: string;
- }
+     isServerEncrypted?: boolean;
- 
+     lastModified?: Date;
- // @public
+     requestId?: string;
- export type BlockBlobGetBlockListResponse = WithResponse<BlockBlobGetBlockListResponseInternal, BlockBlobGetBlockListHeaders>;
+     version?: string;
- 
+     versionId?: string;
- // @public
+ }
- export type BlockBlobGetBlockListResponseInternal = BlockBlobGetBlockListHeaders & BlockList;
+ 
- 
+ // @public
- // @public
+ export interface BlockBlobUploadOptions extends CommonOptions {
- export interface BlockBlobParallelUploadOptions extends CommonOptions {
+     abortSignal?: AbortSignalLike;
-     abortSignal?: AbortSignalLike;
+     blobHTTPHeaders?: BlobHTTPHeaders;
-     blobHTTPHeaders?: BlobHTTPHeaders;
+     conditions?: BlobRequestConditions;
-     blockSize?: number;
+     customerProvidedKey?: CpkInfo;
-     concurrency?: number;
+     encryptionScope?: string;
-     conditions?: BlobRequestConditions;
+     immutabilityPolicy?: BlobImmutabilityPolicy;
-     encryptionScope?: string;
+     legalHold?: boolean;
-     maxSingleShotSize?: number;
+     metadata?: Metadata;
-     metadata?: {
+     onProgress?: (progress: TransferProgressEvent) => void;
-         [propertyName: string]: string;
+     tags?: Tags;
-     };
+     tier?: BlockBlobTier | string;
-     onProgress?: (progress: TransferProgressEvent) => void;
+ }
-     tags?: Tags;
+ 
-     tier?: BlockBlobTier | string;
+ // @public
- }
+ export type BlockBlobUploadResponse = WithResponse<BlockBlobUploadHeaders, BlockBlobUploadHeaders>;
- export interface BlockBlobPutBlobFromUrlHeaders {
+ export interface BlockBlobUploadStreamOptions extends CommonOptions {
-     clientRequestId?: string;
+     abortSignal?: AbortSignalLike;
-     contentMD5?: Uint8Array;
+     blobHTTPHeaders?: BlobHTTPHeaders;
-     date?: Date;
+     conditions?: BlobRequestConditions;
-     encryptionKeySha256?: string;
+     customerProvidedKey?: CpkInfo;
-     errorCode?: string;
+     metadata?: {
-     etag?: string;
+         [propertyName: string]: string;
-     isServerEncrypted?: boolean;
+     };
-     lastModified?: Date;
+     onProgress?: (progress: TransferProgressEvent) => void;
-     requestId?: string;
+     tags?: Tags;
-     version?: string;
+     tier?: BlockBlobTier | string;
-     versionId?: string;
+ }
- }
+ 
- 
+ // @public (undocumented)
- // @public
+ export interface BlockList {
- export type BlockBlobPutBlobFromUrlResponse = WithResponse<BlockBlobPutBlobFromUrlHeaders, BlockBlobPutBlobFromUrlHeaders>;
+     // (undocumented)
- 
+     committedBlocks?: Block[];
- // @public
+     // (undocumented)
- export interface BlockBlobQueryOptions extends CommonOptions {
+     uncommittedBlocks?: Block[];
-     abortSignal?: AbortSignalLike;
+ }
-     conditions?: BlobRequestConditions;
+ 
-     customerProvidedKey?: CpkInfo;
+ // @public
-     inputTextConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration | BlobQueryParquetConfiguration;
+ export type BlockListType = "committed" | "uncommitted" | "all";
-     onError?: (error: BlobQueryError) => void;
+ 
-     onProgress?: (progress: TransferProgressEvent) => void;
+ // @public (undocumented)
-     outputTextConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration | BlobQueryArrowConfiguration;
+ export interface ClearRange {
- }
+     // (undocumented)
- 
+     end: number;
- // @public
+     // (undocumented)
- export interface BlockBlobStageBlockFromURLHeaders {
+     start: number;
-     clientRequestId?: string;
+ }
-     contentMD5?: Uint8Array;
+ 
-     date?: Date;
+ // @public
-     encryptionKeySha256?: string;
+ export interface CommonGenerateSasUrlOptions {
-     encryptionScope?: string;
+     cacheControl?: string;
-     errorCode?: string;
+     contentDisposition?: string;
-     isServerEncrypted?: boolean;
+     contentEncoding?: string;
-     requestId?: string;
+     contentLanguage?: string;
-     version?: string;
+     contentType?: string;
-     xMsContentCrc64?: Uint8Array;
+     encryptionScope?: string;
- }
+     expiresOn?: Date;
- 
+     identifier?: string;
- // @public
+     ipRange?: SasIPRange;
- export interface BlockBlobStageBlockFromURLOptions extends CommonOptions {
+     // Warning: (ae-forgotten-export) The symbol "SASProtocol" needs to be exported by the entry point index.d.ts
-     abortSignal?: AbortSignalLike;
+     protocol?: SASProtocol;
-     conditions?: LeaseAccessConditions;
+     startsOn?: Date;
-     customerProvidedKey?: CpkInfo;
+     version?: string;
-     encryptionScope?: string;
+ }
-     range?: Range_2;
+ 
-     sourceAuthorization?: HttpAuthorization;
+ // @public
-     sourceContentCrc64?: Uint8Array;
+ export interface CommonOptions {
-     sourceContentMD5?: Uint8Array;
+     tracingOptions?: OperationTracingOptions;
-     sourceShareTokenIntent?: FileShareTokenIntent;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface ContainerAcquireLeaseOptions extends CommonOptions {
- export type BlockBlobStageBlockFromURLResponse = WithResponse<BlockBlobStageBlockFromURLHeaders, BlockBlobStageBlockFromURLHeaders>;
+     abortSignal?: AbortSignalLike;
- 
+     conditions?: ModifiedAccessConditions;
- // @public
+ }
- export interface BlockBlobStageBlockHeaders {
+ 
-     clientRequestId?: string;
+ // @public
-     contentMD5?: Uint8Array;
+ export interface ContainerBreakLeaseOptionalParams extends coreClient.OperationOptions {
-     date?: Date;
+     breakPeriod?: number;
-     encryptionKeySha256?: string;
+     modifiedAccessConditions?: ModifiedAccessConditionsModel;
-     encryptionScope?: string;
+     requestId?: string;
-     errorCode?: string;
+     timeoutInSeconds?: number;
-     isServerEncrypted?: boolean;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
-     xMsContentCrc64?: Uint8Array;
+ export interface ContainerBreakLeaseOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     conditions?: ModifiedAccessConditions;
- // @public
+ }
- export interface BlockBlobStageBlockOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     conditions?: LeaseAccessConditions;
+ export interface ContainerChangeLeaseOptions extends CommonOptions {
-     customerProvidedKey?: CpkInfo;
+     abortSignal?: AbortSignalLike;
-     encryptionScope?: string;
+     conditions?: ModifiedAccessConditions;
-     onProgress?: (progress: TransferProgressEvent) => void;
+ }
-     transactionalContentCrc64?: Uint8Array;
+ 
-     transactionalContentMD5?: Uint8Array;
+ // @public
- }
+ export class ContainerClient extends StorageClient {
- 
+     constructor(connectionString: string, containerName: string, options?: StoragePipelineOptions);
- // @public
+     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
- export type BlockBlobStageBlockResponse = WithResponse<BlockBlobStageBlockHeaders, BlockBlobStageBlockHeaders>;
+     constructor(url: string, pipeline: PipelineLike);
- 
+     get containerName(): string;
- // @public
+     create(options?: ContainerCreateOptions): Promise<ContainerCreateResponse>;
- export interface BlockBlobSyncUploadFromURLOptions extends CommonOptions {
+     createIfNotExists(options?: ContainerCreateOptions): Promise<ContainerCreateIfNotExistsResponse>;
-     abortSignal?: AbortSignalLike;
+     delete(options?: ContainerDeleteMethodOptions): Promise<ContainerDeleteResponse>;
-     blobHTTPHeaders?: BlobHTTPHeaders;
+     deleteBlob(blobName: string, options?: ContainerDeleteBlobOptions): Promise<BlobDeleteResponse>;
-     conditions?: BlobRequestConditions;
+     deleteIfExists(options?: ContainerDeleteMethodOptions): Promise<ContainerDeleteIfExistsResponse>;
-     copySourceBlobProperties?: boolean;
+     exists(options?: ContainerExistsOptions): Promise<boolean>;
-     copySourceTags?: BlobCopySourceTags;
+     findBlobsByTags(tagFilterSqlExpression: string, options?: ContainerFindBlobByTagsOptions): PagedAsyncIterableIterator<FilterBlobItem, ContainerFindBlobsByTagsSegmentResponse>;
-     customerProvidedKey?: CpkInfo;
+     generateSasStringToSign(options: ContainerGenerateSasUrlOptions): string;
-     encryptionScope?: string;
+     generateSasUrl(options: ContainerGenerateSasUrlOptions): Promise<string>;
-     metadata?: Metadata;
+     generateUserDelegationSasStringToSign(options: ContainerGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
-     sourceAuthorization?: HttpAuthorization;
+     generateUserDelegationSasUrl(options: ContainerGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
-     sourceConditions?: ModifiedAccessConditions;
+     getAccessPolicy(options?: ContainerGetAccessPolicyOptions): Promise<ContainerGetAccessPolicyResponse>;
-     sourceContentMD5?: Uint8Array;
+     getAccountInfo(options?: ContainerGetAccountInfoOptions): Promise<ContainerGetAccountInfoResponse>;
-     sourceShareTokenIntent?: FileShareTokenIntent;
+     getAppendBlobClient(blobName: string): AppendBlobClient;
-     tags?: Tags;
+     getBlobBatchClient(): BlobBatchClient;
-     tier?: BlockBlobTier | string;
+     getBlobClient(blobName: string): BlobClient;
-     timeoutInSeconds?: number;
+     getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient;
- }
+     getBlockBlobClient(blobName: string): BlockBlobClient;
- 
+     getPageBlobClient(blobName: string): PageBlobClient;
- // @public
+     getProperties(options?: ContainerGetPropertiesOptions): Promise<ContainerGetPropertiesResponse>;
- export enum BlockBlobTier {
+     listBlobsByHierarchy(delimiter: string, options?: ContainerListBlobsOptions): PagedAsyncIterableIterator<({
-     Archive = "Archive",
+         kind: "prefix";
-     Cold = "Cold",
+     } & BlobPrefix) | ({
-     Cool = "Cool",
+         kind: "blob";
-     Hot = "Hot"
+     } & BlobItem), ContainerListBlobHierarchySegmentResponse>;
- }
+     listBlobsFlat(options?: ContainerListBlobsOptions): PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse>;
- 
+     setAccessPolicy(access?: PublicAccessType, containerAcl?: SignedIdentifier[], options?: ContainerSetAccessPolicyOptions): Promise<ContainerSetAccessPolicyResponse>;
- // @public
+     setMetadata(metadata?: Metadata, options?: ContainerSetMetadataOptions): Promise<ContainerSetMetadataResponse>;
- export interface BlockBlobUploadHeaders {
+     uploadBlockBlob(blobName: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<{
-     clientRequestId?: string;
+         blockBlobClient: BlockBlobClient;
-     contentMD5?: Uint8Array;
+         response: BlockBlobUploadResponse;
-     date?: Date;
+     }>;
-     encryptionKeySha256?: string;
+ }
-     encryptionScope?: string;
+ 
-     errorCode?: string;
+ // @public
-     etag?: string;
+ export interface ContainerCreateHeaders {
-     isServerEncrypted?: boolean;
+     clientRequestId?: string;
-     lastModified?: Date;
+     date?: Date;
-     requestId?: string;
+     errorCode?: string;
-     version?: string;
+     etag?: string;
-     versionId?: string;
+     lastModified?: Date;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export interface BlockBlobUploadOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     blobHTTPHeaders?: BlobHTTPHeaders;
+ export interface ContainerCreateIfNotExistsResponse extends ContainerCreateResponse {
-     conditions?: BlobRequestConditions;
+     succeeded: boolean;
-     customerProvidedKey?: CpkInfo;
+ }
-     encryptionScope?: string;
+ 
-     immutabilityPolicy?: BlobImmutabilityPolicy;
+ // @public
-     legalHold?: boolean;
+ export interface ContainerCreateOptions extends CommonOptions {
-     metadata?: Metadata;
+     abortSignal?: AbortSignalLike;
-     onProgress?: (progress: TransferProgressEvent) => void;
+     access?: PublicAccessType;
-     tags?: Tags;
+     containerEncryptionScope?: ContainerEncryptionScope;
-     tier?: BlockBlobTier | string;
+     metadata?: Metadata;
- export type BlockBlobUploadResponse = WithResponse<BlockBlobUploadHeaders, BlockBlobUploadHeaders>;
+ export type ContainerCreateResponse = WithResponse<ContainerCreateHeaders, ContainerCreateHeaders>;
- export interface BlockBlobUploadStreamOptions extends CommonOptions {
+ export interface ContainerDeleteBlobOptions extends BlobDeleteOptions {
-     abortSignal?: AbortSignalLike;
+     versionId?: string;
-     blobHTTPHeaders?: BlobHTTPHeaders;
+ }
-     conditions?: BlobRequestConditions;
+ 
-     customerProvidedKey?: CpkInfo;
+ // @public
-     encryptionScope?: string;
+ export interface ContainerDeleteHeaders {
-     metadata?: {
+     clientRequestId?: string;
-         [propertyName: string]: string;
+     date?: Date;
-     };
+     errorCode?: string;
-     onProgress?: (progress: TransferProgressEvent) => void;
+     requestId?: string;
-     tags?: Tags;
+     version?: string;
-     tier?: BlockBlobTier | string;
+ }
- }
+ 
- 
+ // @public
- // @public (undocumented)
+ export interface ContainerDeleteIfExistsResponse extends ContainerDeleteResponse {
- export interface BlockList {
+     succeeded: boolean;
-     // (undocumented)
+ }
-     committedBlocks?: Block[];
+ 
-     // (undocumented)
+ // @public
-     uncommittedBlocks?: Block[];
+ export interface ContainerDeleteMethodOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     conditions?: ContainerRequestConditions;
- // @public
+ }
- export type BlockListType = "committed" | "uncommitted" | "all";
+ 
- 
+ // @public
- // @public (undocumented)
+ export type ContainerDeleteResponse = WithResponse<ContainerDeleteHeaders, ContainerDeleteHeaders>;
- export interface ClearRange {
+ 
-     // (undocumented)
+ // @public
-     end: number;
+ export interface ContainerEncryptionScope {
-     // (undocumented)
+     defaultEncryptionScope?: string;
-     start: number;
+     preventEncryptionScopeOverride?: boolean;
- export interface CommonGenerateSasUrlOptions {
+ export interface ContainerExistsOptions extends CommonOptions {
-     cacheControl?: string;
+     abortSignal?: AbortSignalLike;
-     contentDisposition?: string;
+ }
-     contentEncoding?: string;
+ 
-     contentLanguage?: string;
+ // @public
-     contentType?: string;
+ export interface ContainerFilterBlobsHeaders {
-     encryptionScope?: string;
+     clientRequestId?: string;
-     expiresOn?: Date;
+     date?: Date;
-     identifier?: string;
+     requestId?: string;
-     ipRange?: SasIPRange;
+     version?: string;
-     protocol?: SASProtocol;
+ }
-     startsOn?: Date;
+ 
-     version?: string;
+ // @public
- }
+ export type ContainerFilterBlobsResponse = ContainerFilterBlobsHeaders & FilterBlobSegmentModel;
- export interface CommonOptions {
+ export interface ContainerFindBlobByTagsOptions extends CommonOptions {
-     tracingOptions?: OperationTracingOptions;
+     abortSignal?: AbortSignalLike;
- export interface ContainerAcquireLeaseOptions extends CommonOptions {
+ export type ContainerFindBlobsByTagsSegmentResponse = WithResponse<FilterBlobSegment & ContainerFilterBlobsHeaders, ContainerFilterBlobsHeaders, FilterBlobSegmentModel>;
-     abortSignal?: AbortSignalLike;
+ 
-     conditions?: ModifiedAccessConditions;
+ // @public
- }
+ export interface ContainerGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
- 
+     // Warning: (ae-forgotten-export) The symbol "ContainerSASPermissions" needs to be exported by the entry point index.d.ts
- // @public
+     permissions?: ContainerSASPermissions;
- export interface ContainerBreakLeaseOptionalParams extends coreClient.OperationOptions {
+ }
-     breakPeriod?: number;
+ 
-     modifiedAccessConditions?: ModifiedAccessConditionsModel;
+ // @public
-     requestId?: string;
+ export interface ContainerGetAccessPolicyHeaders {
-     timeoutInSeconds?: number;
+     blobPublicAccess?: PublicAccessType;
- }
+     clientRequestId?: string;
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export interface ContainerBreakLeaseOptions extends CommonOptions {
+     etag?: string;
-     abortSignal?: AbortSignalLike;
+     lastModified?: Date;
-     conditions?: ModifiedAccessConditions;
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export interface ContainerChangeLeaseOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export interface ContainerGetAccessPolicyOptions extends CommonOptions {
-     conditions?: ModifiedAccessConditions;
+     abortSignal?: AbortSignalLike;
- }
+     conditions?: LeaseAccessConditions;
- 
+ }
- // @public
+ 
- export class ContainerClient extends StorageClient {
+ // @public
-     constructor(connectionString: string, containerName: string, options?: StoragePipelineOptions);
+ export type ContainerGetAccessPolicyResponse = WithResponse<{
-     constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+     signedIdentifiers: SignedIdentifier[];
-     constructor(url: string, pipeline: PipelineLike);
+ } & ContainerGetAccessPolicyHeaders, ContainerGetAccessPolicyHeaders, SignedIdentifierModel>;
-     get containerName(): string;
+ 
-     create(options?: ContainerCreateOptions): Promise<ContainerCreateResponse>;
+ // @public
-     createIfNotExists(options?: ContainerCreateOptions): Promise<ContainerCreateIfNotExistsResponse>;
+ export type ContainerGetAccessPolicyResponseModel = ContainerGetAccessPolicyHeaders & SignedIdentifierModel[];
-     delete(options?: ContainerDeleteMethodOptions): Promise<ContainerDeleteResponse>;
+ 
-     deleteBlob(blobName: string, options?: ContainerDeleteBlobOptions): Promise<BlobDeleteResponse>;
+ // @public
-     deleteIfExists(options?: ContainerDeleteMethodOptions): Promise<ContainerDeleteIfExistsResponse>;
+ export interface ContainerGetAccountInfoHeaders {
-     exists(options?: ContainerExistsOptions): Promise<boolean>;
+     accountKind?: AccountKind;
-     findBlobsByTags(tagFilterSqlExpression: string, options?: ContainerFindBlobByTagsOptions): PagedAsyncIterableIterator<FilterBlobItem, ContainerFindBlobsByTagsSegmentResponse>;
+     clientRequestId?: string;
-     generateSasStringToSign(options: ContainerGenerateSasUrlOptions): string;
+     date?: Date;
-     generateSasUrl(options: ContainerGenerateSasUrlOptions): Promise<string>;
+     isHierarchicalNamespaceEnabled?: boolean;
-     generateUserDelegationSasStringToSign(options: ContainerGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
+     requestId?: string;
-     generateUserDelegationSasUrl(options: ContainerGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
+     skuName?: SkuName;
-     getAccessPolicy(options?: ContainerGetAccessPolicyOptions): Promise<ContainerGetAccessPolicyResponse>;
+     version?: string;
-     getAccountInfo(options?: ContainerGetAccountInfoOptions): Promise<ContainerGetAccountInfoResponse>;
+ }
-     getAppendBlobClient(blobName: string): AppendBlobClient;
+ 
-     getBlobBatchClient(): BlobBatchClient;
+ // @public
-     getBlobClient(blobName: string): BlobClient;
+ export interface ContainerGetAccountInfoOptions extends CommonOptions {
-     getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient;
+     abortSignal?: AbortSignalLike;
-     getBlockBlobClient(blobName: string): BlockBlobClient;
+ }
-     getPageBlobClient(blobName: string): PageBlobClient;
+ 
-     getProperties(options?: ContainerGetPropertiesOptions): Promise<ContainerGetPropertiesResponse>;
+ // @public
-     listBlobsByHierarchy(delimiter: string, options?: ContainerListBlobsOptions): PagedAsyncIterableIterator<({
+ export type ContainerGetAccountInfoResponse = WithResponse<ContainerGetAccountInfoHeaders, ContainerGetAccountInfoHeaders>;
-         kind: "prefix";
+ 
-     } & BlobPrefix) | ({
+ // @public
-         kind: "blob";
+ export interface ContainerGetPropertiesHeaders {
-     } & BlobItem), ContainerListBlobHierarchySegmentResponse>;
+     blobPublicAccess?: PublicAccessType;
-     listBlobsFlat(options?: ContainerListBlobsOptions): PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse>;
+     clientRequestId?: string;
-     setAccessPolicy(access?: PublicAccessType, containerAcl?: SignedIdentifier[], options?: ContainerSetAccessPolicyOptions): Promise<ContainerSetAccessPolicyResponse>;
+     date?: Date;
-     setMetadata(metadata?: Metadata, options?: ContainerSetMetadataOptions): Promise<ContainerSetMetadataResponse>;
+     defaultEncryptionScope?: string;
-     uploadBlockBlob(blobName: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<{
+     denyEncryptionScopeOverride?: boolean;
-         blockBlobClient: BlockBlobClient;
+     errorCode?: string;
-         response: BlockBlobUploadResponse;
+     etag?: string;
-     }>;
+     hasImmutabilityPolicy?: boolean;
- }
+     hasLegalHold?: boolean;
- 
+     isImmutableStorageWithVersioningEnabled?: boolean;
- // @public
+     lastModified?: Date;
- export interface ContainerCreateHeaders {
+     leaseDuration?: LeaseDurationType;
-     clientRequestId?: string;
+     leaseState?: LeaseStateType;
-     date?: Date;
+     leaseStatus?: LeaseStatusType;
-     errorCode?: string;
+     // (undocumented)
-     etag?: string;
+     metadata?: {
-     lastModified?: Date;
+         [propertyName: string]: string;
-     requestId?: string;
+     };
-     version?: string;
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export interface ContainerCreateIfNotExistsResponse extends ContainerCreateResponse {
+ // @public
-     succeeded: boolean;
+ export interface ContainerGetPropertiesOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     conditions?: LeaseAccessConditions;
- // @public
+ }
- export interface ContainerCreateOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     access?: PublicAccessType;
+ export type ContainerGetPropertiesResponse = WithResponse<ContainerGetPropertiesHeaders, ContainerGetPropertiesHeaders>;
-     containerEncryptionScope?: ContainerEncryptionScope;
+ 
-     metadata?: Metadata;
+ // @public
- }
+ export interface ContainerItem {
- 
+     // (undocumented)
- // @public
+     deleted?: boolean;
- export type ContainerCreateResponse = WithResponse<ContainerCreateHeaders, ContainerCreateHeaders>;
+     metadata?: {
- 
+         [propertyName: string]: string;
- // @public
+     };
- export interface ContainerDeleteBlobOptions extends BlobDeleteOptions {
+     // (undocumented)
-     versionId?: string;
+     name: string;
- }
+     properties: ContainerProperties;
- 
+     // (undocumented)
- // @public
+     version?: string;
- export interface ContainerDeleteHeaders {
+ }
-     clientRequestId?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface ContainerListBlobFlatSegmentHeaders {
-     requestId?: string;
+     clientRequestId?: string;
-     version?: string;
+     contentType?: string;
- }
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     requestId?: string;
- export interface ContainerDeleteIfExistsResponse extends ContainerDeleteResponse {
+     version?: string;
-     succeeded: boolean;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type ContainerListBlobFlatSegmentResponse = WithResponse<ListBlobsFlatSegmentResponse & ContainerListBlobFlatSegmentHeaders, ContainerListBlobFlatSegmentHeaders, ListBlobsFlatSegmentResponseModel>;
- export interface ContainerDeleteMethodOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     conditions?: ContainerRequestConditions;
+ export interface ContainerListBlobHierarchySegmentHeaders {
- }
+     clientRequestId?: string;
- 
+     contentType?: string;
- // @public
+     date?: Date;
- export type ContainerDeleteResponse = WithResponse<ContainerDeleteHeaders, ContainerDeleteHeaders>;
+     errorCode?: string;
- 
+     requestId?: string;
- // @public
+     version?: string;
- export interface ContainerEncryptionScope {
+ }
-     defaultEncryptionScope?: string;
+ 
-     preventEncryptionScopeOverride?: boolean;
+ // @public
- }
+ export type ContainerListBlobHierarchySegmentResponse = WithResponse<ListBlobsHierarchySegmentResponse & ContainerListBlobHierarchySegmentHeaders, ContainerListBlobHierarchySegmentHeaders, ListBlobsHierarchySegmentResponseModel>;
- export interface ContainerExistsOptions extends CommonOptions {
+ export interface ContainerListBlobsOptions extends CommonOptions {
- }
+     includeCopy?: boolean;
- 
+     includeDeleted?: boolean;
- // @public
+     includeDeletedWithVersions?: boolean;
- export interface ContainerFilterBlobsHeaders {
+     includeImmutabilityPolicy?: boolean;
-     clientRequestId?: string;
+     includeLegalHold?: boolean;
-     date?: Date;
+     includeMetadata?: boolean;
-     requestId?: string;
+     includeSnapshots?: boolean;
-     version?: string;
+     includeTags?: boolean;
- }
+     includeUncommitedBlobs?: boolean;
- 
+     includeVersions?: boolean;
- // @public
+     prefix?: string;
- export type ContainerFilterBlobsResponse = ContainerFilterBlobsHeaders & FilterBlobSegmentModel;
+ }
- export interface ContainerFindBlobByTagsOptions extends CommonOptions {
+ export interface ContainerProperties {
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
- }
+     defaultEncryptionScope?: string;
- 
+     // (undocumented)
- // @public
+     deletedOn?: Date;
- export type ContainerFindBlobsByTagsSegmentResponse = WithResponse<FilterBlobSegment & ContainerFilterBlobsHeaders, ContainerFilterBlobsHeaders, FilterBlobSegmentModel>;
+     // (undocumented)
- 
+     etag: string;
- // @public
+     // (undocumented)
- export interface ContainerGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
+     hasImmutabilityPolicy?: boolean;
-     permissions?: ContainerSASPermissions;
+     // (undocumented)
- }
+     hasLegalHold?: boolean;
- 
+     isImmutableStorageWithVersioningEnabled?: boolean;
- // @public
+     // (undocumented)
- export interface ContainerGetAccessPolicyHeaders {
+     lastModified: Date;
-     blobPublicAccess?: PublicAccessType;
+     // (undocumented)
-     clientRequestId?: string;
+     leaseDuration?: LeaseDurationType;
-     date?: Date;
+     // (undocumented)
-     errorCode?: string;
+     leaseState?: LeaseStateType;
-     etag?: string;
+     // (undocumented)
-     lastModified?: Date;
+     leaseStatus?: LeaseStatusType;
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     preventEncryptionScopeOverride?: boolean;
- }
+     // (undocumented)
- 
+     publicAccess?: PublicAccessType;
- // @public
+     // (undocumented)
- export interface ContainerGetAccessPolicyOptions extends CommonOptions {
+     remainingRetentionDays?: number;
-     abortSignal?: AbortSignalLike;
+ }
-     conditions?: LeaseAccessConditions;
+ 
- }
+ // @public
- 
+ export interface ContainerReleaseLeaseOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export type ContainerGetAccessPolicyResponse = WithResponse<{
+     conditions?: ModifiedAccessConditions;
-     signedIdentifiers: SignedIdentifier[];
+ }
- } & ContainerGetAccessPolicyHeaders, ContainerGetAccessPolicyHeaders, SignedIdentifierModel>;
+ 
- 
+ // @public
- // @public
+ export interface ContainerRenameHeaders {
- export type ContainerGetAccessPolicyResponseModel = ContainerGetAccessPolicyHeaders & SignedIdentifierModel[];
+     clientRequestId?: string;
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export interface ContainerGetAccountInfoHeaders {
+     requestId?: string;
-     accountKind?: AccountKind;
+     version?: string;
-     clientRequestId?: string;
+ }
-     date?: Date;
+ 
-     isHierarchicalNamespaceEnabled?: boolean;
+ // @public
-     requestId?: string;
+ export type ContainerRenameResponse = WithResponse<ContainerRenameHeaders, ContainerRenameHeaders>;
-     skuName?: SkuName;
+ 
-     version?: string;
+ // @public
- }
+ export interface ContainerRenewLeaseOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     conditions?: ModifiedAccessConditions;
- export interface ContainerGetAccountInfoOptions extends CommonOptions {
+ }
-     abortSignal?: AbortSignalLike;
+ 
- }
+ // @public
- 
+ export interface ContainerRequestConditions extends LeaseAccessConditions, ModificationConditions {
- // @public
+ }
- export type ContainerGetAccountInfoResponse = WithResponse<ContainerGetAccountInfoHeaders, ContainerGetAccountInfoHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface ContainerSetAccessPolicyHeaders {
- export interface ContainerGetPropertiesHeaders {
+     clientRequestId?: string;
-     blobPublicAccess?: PublicAccessType;
+     date?: Date;
-     clientRequestId?: string;
+     errorCode?: string;
-     date?: Date;
+     etag?: string;
-     defaultEncryptionScope?: string;
+     lastModified?: Date;
-     denyEncryptionScopeOverride?: boolean;
+     requestId?: string;
-     errorCode?: string;
+     version?: string;
-     etag?: string;
+ }
-     hasImmutabilityPolicy?: boolean;
+ 
-     hasLegalHold?: boolean;
+ // @public
-     isImmutableStorageWithVersioningEnabled?: boolean;
+ export interface ContainerSetAccessPolicyOptions extends CommonOptions {
-     lastModified?: Date;
+     abortSignal?: AbortSignalLike;
-     leaseDuration?: LeaseDurationType;
+     conditions?: ContainerRequestConditions;
-     leaseState?: LeaseStateType;
+ }
-     leaseStatus?: LeaseStatusType;
+ 
-     // (undocumented)
+ // @public
-     metadata?: {
+ export type ContainerSetAccessPolicyResponse = WithResponse<ContainerSetAccessPolicyHeaders, ContainerSetAccessPolicyHeaders>;
-         [propertyName: string]: string;
+ 
-     };
+ // @public
-     requestId?: string;
+ export interface ContainerSetMetadataHeaders {
-     version?: string;
+     clientRequestId?: string;
- }
+     date?: Date;
- 
+     errorCode?: string;
- // @public
+     etag?: string;
- export interface ContainerGetPropertiesOptions extends CommonOptions {
+     lastModified?: Date;
-     abortSignal?: AbortSignalLike;
+     requestId?: string;
-     conditions?: LeaseAccessConditions;
+     version?: string;
- export type ContainerGetPropertiesResponse = WithResponse<ContainerGetPropertiesHeaders, ContainerGetPropertiesHeaders>;
+ export interface ContainerSetMetadataOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public
+     conditions?: ContainerRequestConditions;
- export interface ContainerItem {
+ }
-     // (undocumented)
+ 
-     deleted?: boolean;
+ // @public
-     metadata?: {
+ export type ContainerSetMetadataResponse = WithResponse<ContainerSetMetadataHeaders, ContainerSetMetadataHeaders>;
-         [propertyName: string]: string;
+ 
-     };
+ // @public
-     // (undocumented)
+ export interface ContainerUndeleteHeaders {
-     name: string;
+     clientRequestId?: string;
-     properties: ContainerProperties;
+     date?: Date;
-     // (undocumented)
+     errorCode?: string;
-     version?: string;
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export interface ContainerListBlobFlatSegmentHeaders {
+ // @public
-     clientRequestId?: string;
+ export type ContainerUndeleteResponse = WithResponse<ContainerUndeleteHeaders, ContainerUndeleteHeaders>;
-     contentType?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export type CopyStatusType = "pending" | "success" | "aborted" | "failed";
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export interface CorsRule {
- 
+     allowedHeaders: string;
- // @public
+     allowedMethods: string;
- export type ContainerListBlobFlatSegmentResponse = WithResponse<ListBlobsFlatSegmentResponse & ContainerListBlobFlatSegmentHeaders, ContainerListBlobFlatSegmentHeaders, ListBlobsFlatSegmentResponseModel>;
+     allowedOrigins: string;
- 
+     exposedHeaders: string;
- // @public
+     maxAgeInSeconds: number;
- export interface ContainerListBlobHierarchySegmentHeaders {
+ }
-     clientRequestId?: string;
+ 
-     contentType?: string;
+ // @public
-     date?: Date;
+ export interface CpkInfo {
-     errorCode?: string;
+     encryptionAlgorithm?: EncryptionAlgorithmType;
-     requestId?: string;
+     encryptionKey?: string;
-     version?: string;
+     encryptionKeySha256?: string;
- export type ContainerListBlobHierarchySegmentResponse = WithResponse<ListBlobsHierarchySegmentResponse & ContainerListBlobHierarchySegmentHeaders, ContainerListBlobHierarchySegmentHeaders, ListBlobsHierarchySegmentResponseModel>;
+ abstract class Credential_2 implements RequestPolicyFactory {
- 
+     create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions): RequestPolicy;
- // @public
+ }
- export interface ContainerListBlobsOptions extends CommonOptions {
+ export { Credential_2 as Credential }
-     abortSignal?: AbortSignalLike;
+ 
-     includeCopy?: boolean;
+ // @public
-     includeDeleted?: boolean;
+ export abstract class CredentialPolicy extends BaseRequestPolicy {
-     includeDeletedWithVersions?: boolean;
+     sendRequest(request: WebResource): Promise<HttpOperationResponse>;
-     includeImmutabilityPolicy?: boolean;
+     protected signRequest(request: WebResource): WebResource;
-     includeLegalHold?: boolean;
+ }
-     includeMetadata?: boolean;
+ 
-     includeSnapshots?: boolean;
+ // @public
-     includeTags?: boolean;
+ export type CredentialPolicyCreator = (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => CredentialPolicy;
-     includeUncommitedBlobs?: boolean;
+ 
-     includeVersions?: boolean;
+ // @public
-     prefix?: string;
+ export type DeleteSnapshotsOptionType = "include" | "only";
- }
+ 
- 
+ // @public
- // @public
+ export type EncryptionAlgorithmType = string;
- export interface ContainerProperties {
+ 
-     // (undocumented)
+ // @public
-     defaultEncryptionScope?: string;
+ export type FileShareTokenIntent = string;
-     // (undocumented)
+ 
-     deletedOn?: Date;
+ // @public
-     // (undocumented)
+ export interface FilterBlobItem {
-     etag: string;
+     containerName: string;
-     // (undocumented)
+     name: string;
-     hasImmutabilityPolicy?: boolean;
+     tags?: Tags;
-     // (undocumented)
+     // @deprecated
-     hasLegalHold?: boolean;
+     tagValue: string;
-     isImmutableStorageWithVersioningEnabled?: boolean;
+ }
-     // (undocumented)
+ 
-     lastModified: Date;
+ // @public
-     // (undocumented)
+ export interface FilterBlobItemModel {
-     leaseDuration?: LeaseDurationType;
+     // (undocumented)
-     // (undocumented)
+     containerName: string;
-     leaseState?: LeaseStateType;
+     // (undocumented)
-     // (undocumented)
+     name: string;
-     leaseStatus?: LeaseStatusType;
+     tags?: BlobTags;
-     // (undocumented)
+ }
-     preventEncryptionScopeOverride?: boolean;
+ 
-     // (undocumented)
+ // @public
-     publicAccess?: PublicAccessType;
+ export interface FilterBlobSegment {
-     remainingRetentionDays?: number;
+     blobs: FilterBlobItem[];
- }
+     // (undocumented)
- 
+     continuationToken?: string;
- // @public
+     // (undocumented)
- export interface ContainerReleaseLeaseOptions extends CommonOptions {
+     serviceEndpoint: string;
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     conditions?: ModifiedAccessConditions;
+     where: string;
- export interface ContainerRenameHeaders {
+ export interface FilterBlobSegmentModel {
-     clientRequestId?: string;
+     // (undocumented)
-     date?: Date;
+     blobs: FilterBlobItemModel[];
-     errorCode?: string;
+     // (undocumented)
-     requestId?: string;
+     continuationToken?: string;
-     version?: string;
+     // (undocumented)
- }
+     serviceEndpoint: string;
- 
+     // (undocumented)
- // @public
+     where: string;
- export type ContainerRenameResponse = WithResponse<ContainerRenameHeaders, ContainerRenameHeaders>;
+ }
- export interface ContainerRenewLeaseOptions extends CommonOptions {
+ export interface GeoReplication {
-     abortSignal?: AbortSignalLike;
+     lastSyncOn: Date;
-     conditions?: ModifiedAccessConditions;
+     status: GeoReplicationStatusType;
- export interface ContainerRequestConditions extends LeaseAccessConditions, ModificationConditions {
+ export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";
- }
+ 
- 
+ // @public
- // @public
+ export interface HttpAuthorization {
- export class ContainerSASPermissions {
+     scheme: string;
-     add: boolean;
+     value: string;
-     create: boolean;
+ }
-     delete: boolean;
+ 
-     deleteVersion: boolean;
+ export { HttpHeaders }
-     execute: boolean;
+ 
-     filterByTags: boolean;
+ export { HttpOperationResponse }
-     static from(permissionLike: ContainerSASPermissionsLike): ContainerSASPermissions;
+ 
-     list: boolean;
+ export { HttpRequestBody }
-     move: boolean;
+ 
-     static parse(permissions: string): ContainerSASPermissions;
+ // @public
-     permanentDelete: boolean;
+ export interface HttpResponse {
-     read: boolean;
+     headers: HttpHeaders;
-     setImmutabilityPolicy: boolean;
+     request: WebResource;
-     tag: boolean;
+     status: number;
-     toString(): string;
+ }
-     write: boolean;
+ 
- }
+ // @public
- 
+ export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
- // @public
+ 
- export interface ContainerSASPermissionsLike {
+ // @public
-     add?: boolean;
+ export enum KnownEncryptionAlgorithmType {
-     create?: boolean;
+     // (undocumented)
-     delete?: boolean;
+     AES256 = "AES256"
-     deleteVersion?: boolean;
+ }
-     execute?: boolean;
+ 
-     filterByTags?: boolean;
+ // @public
-     list?: boolean;
+ export interface Lease {
-     move?: boolean;
+     date?: Date;
-     permanentDelete?: boolean;
+     errorCode?: string;
-     read?: boolean;
+     etag?: string;
-     setImmutabilityPolicy?: boolean;
+     lastModified?: Date;
-     tag?: boolean;
+     leaseId?: string;
-     write?: boolean;
+     leaseTime?: number;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export interface ContainerSetAccessPolicyHeaders {
+ 
-     clientRequestId?: string;
+ // @public
-     date?: Date;
+ export interface LeaseAccessConditions {
-     errorCode?: string;
+     leaseId?: string;
-     etag?: string;
+ }
-     lastModified?: Date;
+ 
-     requestId?: string;
+ // @public
-     version?: string;
+ export type LeaseDurationType = "infinite" | "fixed";
- }
+ 
- 
+ // @public
- // @public
+ export interface LeaseOperationOptions extends CommonOptions {
- export interface ContainerSetAccessPolicyOptions extends CommonOptions {
+     abortSignal?: AbortSignalLike;
-     abortSignal?: AbortSignalLike;
+     conditions?: ModifiedAccessConditions;
-     conditions?: ContainerRequestConditions;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type LeaseOperationResponse = WithResponse<Lease, Lease>;
- export type ContainerSetAccessPolicyResponse = WithResponse<ContainerSetAccessPolicyHeaders, ContainerSetAccessPolicyHeaders>;
+ 
- 
+ // @public
- // @public
+ export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
- export interface ContainerSetMetadataHeaders {
+ 
-     clientRequestId?: string;
+ // @public
-     date?: Date;
+ export type LeaseStatusType = "locked" | "unlocked";
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public
-     lastModified?: Date;
+ export interface ListBlobsFlatSegmentResponse {
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     containerName: string;
- }
+     // (undocumented)
- 
+     continuationToken?: string;
- // @public
+     // (undocumented)
- export interface ContainerSetMetadataOptions extends CommonOptions {
+     marker?: string;
-     abortSignal?: AbortSignalLike;
+     // (undocumented)
-     conditions?: ContainerRequestConditions;
+     maxPageSize?: number;
- }
+     // (undocumented)
- 
+     prefix?: string;
- // @public
+     // (undocumented)
- export type ContainerSetMetadataResponse = WithResponse<ContainerSetMetadataHeaders, ContainerSetMetadataHeaders>;
+     segment: BlobFlatListSegment;
- 
+     // (undocumented)
- // @public
+     serviceEndpoint: string;
- export interface ContainerUndeleteHeaders {
+ }
-     clientRequestId?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export interface ListBlobsFlatSegmentResponseModel {
-     requestId?: string;
+     // (undocumented)
-     version?: string;
+     containerName: string;
- }
+     // (undocumented)
- 
+     continuationToken?: string;
- // @public
+     // (undocumented)
- export type ContainerUndeleteResponse = WithResponse<ContainerUndeleteHeaders, ContainerUndeleteHeaders>;
+     marker?: string;
- 
+     // (undocumented)
- // @public
+     maxPageSize?: number;
- export type CopyPollerBlobClient = Pick<BlobClient, "abortCopyFromURL" | "getProperties"> & {
+     // (undocumented)
-     startCopyFromURL(copySource: string, options?: BlobStartCopyFromURLOptions): Promise<BlobBeginCopyFromURLResponse>;
+     prefix?: string;
- };
+     // (undocumented)
- 
+     segment: BlobFlatListSegmentModel;
- // @public
+     // (undocumented)
- export type CopyStatusType = "pending" | "success" | "aborted" | "failed";
+     serviceEndpoint: string;
- 
+ }
- // @public
+ 
- export interface CorsRule {
+ // @public
-     allowedHeaders: string;
+ export interface ListBlobsHierarchySegmentResponse {
-     allowedMethods: string;
+     // (undocumented)
-     allowedOrigins: string;
+     containerName: string;
-     exposedHeaders: string;
+     // (undocumented)
-     maxAgeInSeconds: number;
+     continuationToken?: string;
- }
+     // (undocumented)
- 
+     delimiter?: string;
- // @public
+     // (undocumented)
- export interface CpkInfo {
+     marker?: string;
-     encryptionAlgorithm?: EncryptionAlgorithmType;
+     // (undocumented)
-     encryptionKey?: string;
+     maxPageSize?: number;
-     encryptionKeySha256?: string;
+     // (undocumented)
- }
+     prefix?: string;
- 
+     // (undocumented)
- // @public
+     segment: BlobHierarchyListSegment;
- abstract class Credential_2 implements RequestPolicyFactory {
+     // (undocumented)
-     create(_nextPolicy: RequestPolicy, _options: RequestPolicyOptions): RequestPolicy;
+     serviceEndpoint: string;
- export { Credential_2 as Credential }
+ 
- 
+ // @public
- // @public
+ export interface ListBlobsHierarchySegmentResponseModel {
- export abstract class CredentialPolicy extends BaseRequestPolicy {
+     // (undocumented)
-     sendRequest(request: WebResource): Promise<HttpOperationResponse>;
+     containerName: string;
-     protected signRequest(request: WebResource): WebResource;
+     // (undocumented)
- }
+     continuationToken?: string;
- 
+     // (undocumented)
- // @public
+     delimiter?: string;
- export type CredentialPolicyCreator = (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => CredentialPolicy;
+     // (undocumented)
- 
+     marker?: string;
- // @public
+     // (undocumented)
- export type DeleteSnapshotsOptionType = "include" | "only";
+     maxPageSize?: number;
- 
+     // (undocumented)
- // @public
+     prefix?: string;
- export type EncryptionAlgorithmType = string;
+     // (undocumented)
- 
+     segment: BlobHierarchyListSegmentModel;
- // @public
+     // (undocumented)
- export type FileShareTokenIntent = string;
+     serviceEndpoint: string;
- 
+ }
- // @public
+ 
- export interface FilterBlobItem {
+ // @public
-     containerName: string;
+ export interface ListContainersSegmentResponse {
-     name: string;
+     // (undocumented)
-     tags?: Tags;
+     containerItems: ContainerItem[];
-     // @deprecated
+     // (undocumented)
-     tagValue: string;
+     continuationToken?: string;
- }
+     // (undocumented)
- 
+     marker?: string;
- // @public
+     // (undocumented)
- export interface FilterBlobItemModel {
+     maxPageSize?: number;
-     containerName: string;
+     prefix?: string;
-     name: string;
+     serviceEndpoint: string;
-     tags?: BlobTags;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export const logger: AzureLogger;
- export interface FilterBlobSegment {
+ 
-     // (undocumented)
+ // @public
-     blobs: FilterBlobItem[];
+ export interface Logging {
-     // (undocumented)
+     deleteProperty: boolean;
-     continuationToken?: string;
+     read: boolean;
-     // (undocumented)
+     retentionPolicy: RetentionPolicy;
-     serviceEndpoint: string;
+     version: string;
-     // (undocumented)
+     write: boolean;
-     where: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface MatchConditions {
- export interface FilterBlobSegmentModel {
+     ifMatch?: string;
-     // (undocumented)
+     ifNoneMatch?: string;
-     blobs: FilterBlobItemModel[];
+ }
-     // (undocumented)
+ 
-     continuationToken?: string;
+ // @public
-     // (undocumented)
+ export interface Metrics {
-     serviceEndpoint: string;
+     enabled: boolean;
-     // (undocumented)
+     includeAPIs?: boolean;
-     where: string;
+     retentionPolicy?: RetentionPolicy;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export function generateAccountSASQueryParameters(accountSASSignatureValues: AccountSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+ // @public
- 
+ export interface ModificationConditions {
- // @public
+     ifModifiedSince?: Date;
- export function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, sharedKeyCredential: StorageSharedKeyCredential): SASQueryParameters;
+     ifUnmodifiedSince?: Date;
- 
+ }
- // @public
+ 
- export function generateBlobSASQueryParameters(blobSASSignatureValues: BlobSASSignatureValues, userDelegationKey: UserDelegationKey, accountName: string): SASQueryParameters;
+ // @public
- 
+ export interface ModifiedAccessConditionsModel {
- // @public
+     ifMatch?: string;
- export interface GeoReplication {
+     ifModifiedSince?: Date;
-     lastSyncOn: Date;
+     ifNoneMatch?: string;
-     status: GeoReplicationStatusType;
+     ifTags?: string;
- }
+     ifUnmodifiedSince?: Date;
- 
+ }
- // @public
+ 
- export type GeoReplicationStatusType = "live" | "bootstrap" | "unavailable";
+ // @public
- 
+ export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
- // @public
+ 
- export function getBlobServiceAccountAudience(storageAccountName: string): string;
+ // @public
- 
+ export function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory;
- // @public
+ 
- export interface HttpAuthorization {
+ // @public
-     scheme: string;
+ export interface PageBlobClearPagesHeaders {
-     value: string;
+     blobSequenceNumber?: number;
- }
+     clientRequestId?: string;
- 
+     contentMD5?: Uint8Array;
- export { HttpHeaders }
+     date?: Date;
- 
+     errorCode?: string;
- export { HttpOperationResponse }
+     etag?: string;
- 
+     lastModified?: Date;
- export { HttpRequestBody }
+     requestId?: string;
- 
+     version?: string;
- // @public
+     xMsContentCrc64?: Uint8Array;
- export interface HttpResponse {
+ }
-     headers: HttpHeaders;
+ 
-     request: WebResource;
+ // @public
-     status: number;
+ export interface PageBlobClearPagesOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+     // Warning: (ae-forgotten-export) The symbol "PageBlobRequestConditions" needs to be exported by the entry point index.d.ts
- // @public
+     conditions?: PageBlobRequestConditions;
- export function isPipelineLike(pipeline: unknown): pipeline is PipelineLike;
+     customerProvidedKey?: CpkInfo;
- 
+     encryptionScope?: string;
- // @public
+ }
- export enum KnownEncryptionAlgorithmType {
+ 
-     // (undocumented)
+ // @public
-     AES256 = "AES256"
+ export type PageBlobClearPagesResponse = WithResponse<PageBlobClearPagesHeaders, PageBlobClearPagesHeaders>;
- }
+ 
- 
+ // @public
- // @public
+ export class PageBlobClient extends BlobClient {
- export interface Lease {
+     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
-     date?: Date;
+     constructor(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
-     errorCode?: string;
+     constructor(url: string, pipeline: PipelineLike);
-     etag?: string;
+     clearPages(offset?: number, count?: number, options?: PageBlobClearPagesOptions): Promise<PageBlobClearPagesResponse>;
-     lastModified?: Date;
+     create(size: number, options?: PageBlobCreateOptions): Promise<PageBlobCreateResponse>;
-     leaseId?: string;
+     createIfNotExists(size: number, options?: PageBlobCreateIfNotExistsOptions): Promise<PageBlobCreateIfNotExistsResponse>;
-     leaseTime?: number;
+     getPageRanges(offset?: number, count?: number, options?: PageBlobGetPageRangesOptions): Promise<PageBlobGetPageRangesResponse>;
-     requestId?: string;
+     getPageRangesDiff(offset: number, count: number, prevSnapshot: string, options?: PageBlobGetPageRangesDiffOptions): Promise<PageBlobGetPageRangesDiffResponse>;
-     version?: string;
+     getPageRangesDiffForManagedDisks(offset: number, count: number, prevSnapshotUrl: string, options?: PageBlobGetPageRangesDiffOptions): Promise<PageBlobGetPageRangesDiffResponse>;
- }
+     listPageRanges(offset?: number, count?: number, options?: PageBlobListPageRangesOptions): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesResponseModel>;
- 
+     listPageRangesDiff(offset: number, count: number, prevSnapshot: string, options?: PageBlobListPageRangesDiffOptions): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesDiffResponseModel>;
- // @public
+     resize(size: number, options?: PageBlobResizeOptions): Promise<PageBlobResizeResponse>;
- export interface LeaseAccessConditions {
+     startCopyIncremental(copySource: string, options?: PageBlobStartCopyIncrementalOptions): Promise<PageBlobCopyIncrementalResponse>;
-     leaseId?: string;
+     updateSequenceNumber(sequenceNumberAction: SequenceNumberActionType, sequenceNumber?: number, options?: PageBlobUpdateSequenceNumberOptions): Promise<PageBlobUpdateSequenceNumberResponse>;
- }
+     uploadPages(body: HttpRequestBody, offset: number, count: number, options?: PageBlobUploadPagesOptions): Promise<PageBlobUploadPagesResponse>;
- 
+     uploadPagesFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: PageBlobUploadPagesFromURLOptions): Promise<PageBlobUploadPagesFromURLResponse>;
- // @public
+     withSnapshot(snapshot: string): PageBlobClient;
- export type LeaseDurationType = "infinite" | "fixed";
+ }
- export interface LeaseOperationOptions extends CommonOptions {
+ export interface PageBlobCopyIncrementalHeaders {
-     abortSignal?: AbortSignalLike;
+     clientRequestId?: string;
-     conditions?: ModifiedAccessConditions;
+     copyId?: string;
- }
+     copyStatus?: CopyStatusType;
- 
+     date?: Date;
- // @public
+     errorCode?: string;
- export type LeaseOperationResponse = WithResponse<Lease, Lease>;
+     etag?: string;
- 
+     lastModified?: Date;
- // @public
+     requestId?: string;
- export type LeaseStateType = "available" | "leased" | "expired" | "breaking" | "broken";
+     version?: string;
- 
+ }
- // @public
+ 
- export type LeaseStatusType = "locked" | "unlocked";
+ // @public
- 
+ export type PageBlobCopyIncrementalResponse = WithResponse<PageBlobCopyIncrementalHeaders, PageBlobCopyIncrementalHeaders>;
- // @public
+ 
- export interface ListBlobsFlatSegmentResponse {
+ // @public
-     // (undocumented)
+ export interface PageBlobCreateHeaders {
-     containerName: string;
+     clientRequestId?: string;
-     // (undocumented)
+     contentMD5?: Uint8Array;
-     continuationToken?: string;
+     date?: Date;
-     // (undocumented)
+     encryptionKeySha256?: string;
-     marker?: string;
+     encryptionScope?: string;
-     // (undocumented)
+     errorCode?: string;
-     maxPageSize?: number;
+     etag?: string;
-     // (undocumented)
+     isServerEncrypted?: boolean;
-     prefix?: string;
+     lastModified?: Date;
-     // (undocumented)
+     requestId?: string;
-     segment: BlobFlatListSegment;
+     version?: string;
-     // (undocumented)
+     versionId?: string;
-     serviceEndpoint: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface PageBlobCreateIfNotExistsOptions extends CommonOptions {
- export interface ListBlobsFlatSegmentResponseModel {
+     abortSignal?: AbortSignalLike;
-     // (undocumented)
+     blobHTTPHeaders?: BlobHTTPHeaders;
-     containerName: string;
+     blobSequenceNumber?: number;
-     // (undocumented)
+     customerProvidedKey?: CpkInfo;
-     continuationToken?: string;
+     encryptionScope?: string;
-     // (undocumented)
+     immutabilityPolicy?: BlobImmutabilityPolicy;
-     marker?: string;
+     legalHold?: boolean;
-     // (undocumented)
+     metadata?: Metadata;
-     maxPageSize?: number;
+     tier?: PremiumPageBlobTier | string;
-     // (undocumented)
+ }
-     prefix?: string;
+ 
-     // (undocumented)
+ // @public
-     segment: BlobFlatListSegmentModel;
+ export interface PageBlobCreateIfNotExistsResponse extends PageBlobCreateResponse {
-     // (undocumented)
+     succeeded: boolean;
-     serviceEndpoint: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface PageBlobCreateOptions extends CommonOptions {
- export interface ListBlobsHierarchySegmentResponse {
+     abortSignal?: AbortSignalLike;
-     // (undocumented)
+     blobHTTPHeaders?: BlobHTTPHeaders;
-     containerName: string;
+     blobSequenceNumber?: number;
-     // (undocumented)
+     conditions?: BlobRequestConditions;
-     continuationToken?: string;
+     customerProvidedKey?: CpkInfo;
-     // (undocumented)
+     encryptionScope?: string;
-     delimiter?: string;
+     immutabilityPolicy?: BlobImmutabilityPolicy;
-     // (undocumented)
+     legalHold?: boolean;
-     marker?: string;
+     metadata?: Metadata;
-     // (undocumented)
+     tags?: Tags;
-     maxPageSize?: number;
+     tier?: PremiumPageBlobTier | string;
-     // (undocumented)
+ }
-     prefix?: string;
+ 
-     // (undocumented)
+ // @public
-     segment: BlobHierarchyListSegment;
+ export type PageBlobCreateResponse = WithResponse<PageBlobCreateHeaders, PageBlobCreateHeaders>;
-     // (undocumented)
+ 
-     serviceEndpoint: string;
+ // @public
- }
+ export interface PageBlobGetPageRangesDiffHeaders {
- 
+     blobContentLength?: number;
- // @public
+     clientRequestId?: string;
- export interface ListBlobsHierarchySegmentResponseModel {
+     date?: Date;
-     // (undocumented)
+     errorCode?: string;
-     containerName: string;
+     etag?: string;
-     // (undocumented)
+     lastModified?: Date;
-     continuationToken?: string;
+     requestId?: string;
-     // (undocumented)
+     version?: string;
-     delimiter?: string;
+ }
-     // (undocumented)
+ 
-     marker?: string;
+ // @public
-     // (undocumented)
+ export interface PageBlobGetPageRangesDiffOptions extends CommonOptions {
-     maxPageSize?: number;
+     abortSignal?: AbortSignalLike;
-     // (undocumented)
+     conditions?: BlobRequestConditions;
-     prefix?: string;
+     range?: string;
-     // (undocumented)
+ }
-     segment: BlobHierarchyListSegmentModel;
+ 
-     // (undocumented)
+ // @public
-     serviceEndpoint: string;
+ export interface PageBlobGetPageRangesDiffResponse extends PageList, PageBlobGetPageRangesDiffHeaders, ResponseWithBody<PageBlobGetPageRangesDiffHeaders, PageList> {
- export interface ListContainersSegmentResponse {
+ export type PageBlobGetPageRangesDiffResponseInternal = PageBlobGetPageRangesDiffHeaders & PageListInternal;
-     // (undocumented)
+ 
-     containerItems: ContainerItem[];
+ // @public
-     // (undocumented)
+ export type PageBlobGetPageRangesDiffResponseModel = WithResponse<PageBlobGetPageRangesDiffResponseInternal, PageBlobGetPageRangesDiffHeaders, PageListInternal>;
-     continuationToken?: string;
+ 
-     // (undocumented)
+ // @public
-     marker?: string;
+ export interface PageBlobGetPageRangesHeaders {
-     // (undocumented)
+     blobContentLength?: number;
-     maxPageSize?: number;
+     clientRequestId?: string;
-     // (undocumented)
+     date?: Date;
-     prefix?: string;
+     errorCode?: string;
-     // (undocumented)
+     etag?: string;
-     serviceEndpoint: string;
+     lastModified?: Date;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export const logger: AzureLogger;
+ 
- 
+ // @public
- // @public
+ export interface PageBlobGetPageRangesOptions extends CommonOptions {
- export interface Logging {
+     abortSignal?: AbortSignalLike;
-     deleteProperty: boolean;
+     conditions?: BlobRequestConditions;
-     read: boolean;
+ }
-     retentionPolicy: RetentionPolicy;
+ 
-     version: string;
+ // @public
-     write: boolean;
+ export interface PageBlobGetPageRangesResponse extends PageList, PageBlobGetPageRangesHeaders, ResponseWithBody<PageBlobGetPageRangesHeaders, PageList> {
- export interface MatchConditions {
+ export type PageBlobGetPageRangesResponseInternal = PageBlobGetPageRangesHeaders & PageListInternal;
-     ifMatch?: string;
+ 
-     ifNoneMatch?: string;
+ // @public
- }
+ export type PageBlobGetPageRangesResponseModel = WithResponse<PageBlobGetPageRangesResponseInternal, PageBlobGetPageRangesHeaders, PageListInternal>;
- export interface Metadata {
+ export interface PageBlobListPageRangesDiffOptions extends CommonOptions {
-     [propertyName: string]: string;
+     abortSignal?: AbortSignalLike;
- }
+     conditions?: BlobRequestConditions;
- 
+ }
- // @public
+ 
- export interface Metrics {
+ // @public
-     enabled: boolean;
+ export interface PageBlobListPageRangesOptions extends CommonOptions {
-     includeAPIs?: boolean;
+     abortSignal?: AbortSignalLike;
-     retentionPolicy?: RetentionPolicy;
+     conditions?: BlobRequestConditions;
-     version?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface PageBlobResizeHeaders {
- export interface ModificationConditions {
+     blobSequenceNumber?: number;
-     ifModifiedSince?: Date;
+     clientRequestId?: string;
-     ifUnmodifiedSince?: Date;
+     date?: Date;
- }
+     errorCode?: string;
- 
+     etag?: string;
- // @public
+     lastModified?: Date;
- export interface ModifiedAccessConditions extends MatchConditions, ModificationConditions, TagConditions {
+     requestId?: string;
- }
+     version?: string;
- 
+ }
- // @public
+ 
- export interface ModifiedAccessConditionsModel {
+ // @public
-     ifMatch?: string;
+ export interface PageBlobResizeOptions extends CommonOptions {
-     ifModifiedSince?: Date;
+     abortSignal?: AbortSignalLike;
-     ifNoneMatch?: string;
+     conditions?: BlobRequestConditions;
-     ifTags?: string;
+     encryptionScope?: string;
-     ifUnmodifiedSince?: Date;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type PageBlobResizeResponse = WithResponse<PageBlobResizeHeaders, PageBlobResizeHeaders>;
- export function newPipeline(credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, pipelineOptions?: StoragePipelineOptions): Pipeline;
+ 
- 
+ // @public
- // @public
+ export interface PageBlobStartCopyIncrementalOptions extends CommonOptions {
- export function NewRetryPolicyFactory(retryOptions?: StorageRetryOptions): RequestPolicyFactory;
+     abortSignal?: AbortSignalLike;
- 
+     conditions?: ModifiedAccessConditions;
- // @public
+ }
- export interface ObjectReplicationPolicy {
+ 
-     policyId: string;
+ // @public
-     rules: ObjectReplicationRule[];
+ export interface PageBlobUpdateSequenceNumberHeaders {
- }
+     blobSequenceNumber?: number;
- 
+     clientRequestId?: string;
- // @public
+     date?: Date;
- export interface ObjectReplicationRule {
+     errorCode?: string;
-     replicationStatus: ObjectReplicationStatus;
+     etag?: string;
-     ruleId: string;
+     lastModified?: Date;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export type ObjectReplicationStatus = "complete" | "failed";
+ 
- 
+ // @public
- // @public
+ export interface PageBlobUpdateSequenceNumberOptions extends CommonOptions {
- export interface PageBlobClearPagesHeaders {
+     abortSignal?: AbortSignalLike;
-     blobSequenceNumber?: number;
+     conditions?: BlobRequestConditions;
-     clientRequestId?: string;
+ }
-     contentMD5?: Uint8Array;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export type PageBlobUpdateSequenceNumberResponse = WithResponse<PageBlobUpdateSequenceNumberHeaders, PageBlobUpdateSequenceNumberHeaders>;
-     etag?: string;
+ 
-     lastModified?: Date;
+ // @public
-     requestId?: string;
+ export interface PageBlobUploadPagesFromURLHeaders {
-     version?: string;
+     blobSequenceNumber?: number;
-     xMsContentCrc64?: Uint8Array;
+     contentMD5?: Uint8Array;
- }
+     date?: Date;
- 
+     encryptionKeySha256?: string;
- // @public
+     encryptionScope?: string;
- export interface PageBlobClearPagesOptions extends CommonOptions {
+     errorCode?: string;
-     abortSignal?: AbortSignalLike;
+     etag?: string;
-     conditions?: PageBlobRequestConditions;
+     isServerEncrypted?: boolean;
-     customerProvidedKey?: CpkInfo;
+     lastModified?: Date;
-     encryptionScope?: string;
+     requestId?: string;
- }
+     version?: string;
- 
+     xMsContentCrc64?: Uint8Array;
- // @public
+ }
- export type PageBlobClearPagesResponse = WithResponse<PageBlobClearPagesHeaders, PageBlobClearPagesHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface PageBlobUploadPagesFromURLOptions extends CommonOptions {
- export class PageBlobClient extends BlobClient {
+     abortSignal?: AbortSignalLike;
-     constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
+     conditions?: PageBlobRequestConditions;
-     constructor(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
+     customerProvidedKey?: CpkInfo;
-     constructor(url: string, pipeline: PipelineLike);
+     encryptionScope?: string;
-     clearPages(offset?: number, count?: number, options?: PageBlobClearPagesOptions): Promise<PageBlobClearPagesResponse>;
+     sourceAuthorization?: HttpAuthorization;
-     create(size: number, options?: PageBlobCreateOptions): Promise<PageBlobCreateResponse>;
+     sourceConditions?: MatchConditions & ModificationConditions;
-     createIfNotExists(size: number, options?: PageBlobCreateIfNotExistsOptions): Promise<PageBlobCreateIfNotExistsResponse>;
+     sourceContentCrc64?: Uint8Array;
-     getPageRanges(offset?: number, count?: number, options?: PageBlobGetPageRangesOptions): Promise<PageBlobGetPageRangesResponse>;
+     sourceContentMD5?: Uint8Array;
-     getPageRangesDiff(offset: number, count: number, prevSnapshot: string, options?: PageBlobGetPageRangesDiffOptions): Promise<PageBlobGetPageRangesDiffResponse>;
+     sourceShareTokenIntent?: FileShareTokenIntent;
-     getPageRangesDiffForManagedDisks(offset: number, count: number, prevSnapshotUrl: string, options?: PageBlobGetPageRangesDiffOptions): Promise<PageBlobGetPageRangesDiffResponse>;
+ }
-     listPageRanges(offset?: number, count?: number, options?: PageBlobListPageRangesOptions): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesResponseModel>;
+ 
-     listPageRangesDiff(offset: number, count: number, prevSnapshot: string, options?: PageBlobListPageRangesDiffOptions): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesDiffResponseModel>;
+ // @public
-     resize(size: number, options?: PageBlobResizeOptions): Promise<PageBlobResizeResponse>;
+ export type PageBlobUploadPagesFromURLResponse = WithResponse<PageBlobUploadPagesFromURLHeaders, PageBlobUploadPagesFromURLHeaders>;
-     startCopyIncremental(copySource: string, options?: PageBlobStartCopyIncrementalOptions): Promise<PageBlobCopyIncrementalResponse>;
+ 
-     updateSequenceNumber(sequenceNumberAction: SequenceNumberActionType, sequenceNumber?: number, options?: PageBlobUpdateSequenceNumberOptions): Promise<PageBlobUpdateSequenceNumberResponse>;
+ // @public
-     uploadPages(body: HttpRequestBody, offset: number, count: number, options?: PageBlobUploadPagesOptions): Promise<PageBlobUploadPagesResponse>;
+ export interface PageBlobUploadPagesHeaders {
-     uploadPagesFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: PageBlobUploadPagesFromURLOptions): Promise<PageBlobUploadPagesFromURLResponse>;
+     blobSequenceNumber?: number;
-     withSnapshot(snapshot: string): PageBlobClient;
+     clientRequestId?: string;
- }
+     contentMD5?: Uint8Array;
- 
+     date?: Date;
- // @public
+     encryptionKeySha256?: string;
- export interface PageBlobCopyIncrementalHeaders {
+     encryptionScope?: string;
-     clientRequestId?: string;
+     errorCode?: string;
-     copyId?: string;
+     etag?: string;
-     copyStatus?: CopyStatusType;
+     isServerEncrypted?: boolean;
-     date?: Date;
+     lastModified?: Date;
-     errorCode?: string;
+     requestId?: string;
-     etag?: string;
+     version?: string;
-     lastModified?: Date;
+     xMsContentCrc64?: Uint8Array;
-     requestId?: string;
+ }
-     version?: string;
+ 
- }
+ // @public
- 
+ export interface PageBlobUploadPagesOptions extends CommonOptions {
- // @public
+     abortSignal?: AbortSignalLike;
- export type PageBlobCopyIncrementalResponse = WithResponse<PageBlobCopyIncrementalHeaders, PageBlobCopyIncrementalHeaders>;
+     conditions?: PageBlobRequestConditions;
- 
+     customerProvidedKey?: CpkInfo;
- // @public
+     encryptionScope?: string;
- export interface PageBlobCreateHeaders {
+     onProgress?: (progress: TransferProgressEvent) => void;
-     clientRequestId?: string;
+     transactionalContentCrc64?: Uint8Array;
-     contentMD5?: Uint8Array;
+     transactionalContentMD5?: Uint8Array;
-     date?: Date;
+ }
-     encryptionKeySha256?: string;
+ 
-     encryptionScope?: string;
+ // @public
-     errorCode?: string;
+ export type PageBlobUploadPagesResponse = WithResponse<PageBlobUploadPagesHeaders, PageBlobUploadPagesHeaders>;
-     etag?: string;
+ 
-     isServerEncrypted?: boolean;
+ // @public
-     lastModified?: Date;
+ export interface PageList {
-     requestId?: string;
+     clearRange?: Range_2[];
-     version?: string;
+     pageRange?: Range_2[];
-     versionId?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface PageListInternal {
- export interface PageBlobCreateIfNotExistsOptions extends CommonOptions {
+     // (undocumented)
-     abortSignal?: AbortSignalLike;
+     clearRange?: ClearRange[];
-     blobHTTPHeaders?: BlobHTTPHeaders;
+     // (undocumented)
-     blobSequenceNumber?: number;
+     continuationToken?: string;
-     customerProvidedKey?: CpkInfo;
+     // (undocumented)
-     encryptionScope?: string;
+     pageRange?: PageRange[];
-     immutabilityPolicy?: BlobImmutabilityPolicy;
+ }
-     legalHold?: boolean;
+ 
-     metadata?: Metadata;
+ // @public (undocumented)
-     tier?: PremiumPageBlobTier | string;
+ export interface PageRange {
- }
+     // (undocumented)
- 
+     end: number;
- // @public
+     // (undocumented)
- export interface PageBlobCreateIfNotExistsResponse extends PageBlobCreateResponse {
+     start: number;
-     succeeded: boolean;
+ }
- }
+ 
- 
+ // @public (undocumented)
- // @public
+ export interface PageRangeInfo {
- export interface PageBlobCreateOptions extends CommonOptions {
+     // (undocumented)
-     abortSignal?: AbortSignalLike;
+     end: number;
-     blobHTTPHeaders?: BlobHTTPHeaders;
+     // (undocumented)
-     blobSequenceNumber?: number;
+     isClear: boolean;
-     conditions?: BlobRequestConditions;
+     // (undocumented)
-     customerProvidedKey?: CpkInfo;
+     start: number;
-     encryptionScope?: string;
+ }
-     immutabilityPolicy?: BlobImmutabilityPolicy;
+ 
-     legalHold?: boolean;
+ // @public
-     metadata?: Metadata;
+ export interface ParsedBatchResponse {
-     tags?: Tags;
+     subResponses: BatchSubResponse[];
-     tier?: PremiumPageBlobTier | string;
+     subResponsesFailedCount: number;
- }
+     subResponsesSucceededCount: number;
- 
+ }
- // @public
+ 
- export type PageBlobCreateResponse = WithResponse<PageBlobCreateHeaders, PageBlobCreateHeaders>;
+ // @public
- 
+ export class Pipeline implements PipelineLike {
- // @public
+     constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
- export interface PageBlobGetPageRangesDiffHeaders {
+     readonly factories: RequestPolicyFactory[];
-     blobContentLength?: number;
+     readonly options: PipelineOptions;
-     clientRequestId?: string;
+     toServiceClientOptions(): ServiceClientOptions;
-     date?: Date;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public
-     lastModified?: Date;
+ export interface PipelineLike {
-     requestId?: string;
+     readonly factories: RequestPolicyFactory[];
-     version?: string;
+     readonly options: PipelineOptions;
- }
+     toServiceClientOptions(): ServiceClientOptions;
- 
+ }
- // @public
+ 
- export interface PageBlobGetPageRangesDiffOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export interface PipelineOptions {
-     conditions?: BlobRequestConditions;
+     httpClient?: RequestPolicy;
-     range?: string;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export enum PremiumPageBlobTier {
- export interface PageBlobGetPageRangesDiffResponse extends PageList, PageBlobGetPageRangesDiffHeaders, ResponseWithBody<PageBlobGetPageRangesDiffHeaders, PageList> {
+     P10 = "P10",
- }
+     P15 = "P15",
- 
+     P20 = "P20",
- // @public
+     P30 = "P30",
- export type PageBlobGetPageRangesDiffResponseInternal = PageBlobGetPageRangesDiffHeaders & PageListInternal;
+     P4 = "P4",
- 
+     P40 = "P40",
- // @public
+     P50 = "P50",
- export type PageBlobGetPageRangesDiffResponseModel = WithResponse<PageBlobGetPageRangesDiffResponseInternal, PageBlobGetPageRangesDiffHeaders, PageListInternal>;
+     P6 = "P6",
- 
+     P60 = "P60",
- // @public
+     P70 = "P70",
- export interface PageBlobGetPageRangesHeaders {
+     P80 = "P80"
-     blobContentLength?: number;
+ }
-     clientRequestId?: string;
+ 
-     date?: Date;
+ // @public
-     errorCode?: string;
+ export type PublicAccessType = "container" | "blob";
-     etag?: string;
+ 
-     lastModified?: Date;
+ // @public
-     requestId?: string;
+ interface Range_2 {
-     version?: string;
+     count?: number;
- }
+     offset: number;
- 
+ }
- // @public
+ export { Range_2 as Range }
- export interface PageBlobGetPageRangesOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ // @public
-     conditions?: BlobRequestConditions;
+ export type RehydratePriority = "High" | "Standard";
- }
+ 
- 
+ export { RequestPolicy as IHttpClient }
- // @public
+ export { RequestPolicy }
- export interface PageBlobGetPageRangesResponse extends PageList, PageBlobGetPageRangesHeaders, ResponseWithBody<PageBlobGetPageRangesHeaders, PageList> {
+ 
- }
+ export { RequestPolicyFactory }
- // @public
+ export { RequestPolicyOptions }
- export type PageBlobGetPageRangesResponseInternal = PageBlobGetPageRangesHeaders & PageListInternal;
+ 
- 
+ // @public
- // @public
+ export interface ResponseLike {
- export type PageBlobGetPageRangesResponseModel = WithResponse<PageBlobGetPageRangesResponseInternal, PageBlobGetPageRangesHeaders, PageListInternal>;
+     _response: HttpResponse;
- 
+ }
- // @public
+ 
- export interface PageBlobListPageRangesDiffOptions extends CommonOptions {
+ // @public
-     abortSignal?: AbortSignalLike;
+ export interface ResponseWithBody<Headers, Body> {
-     conditions?: BlobRequestConditions;
+     _response: HttpResponse & {
- }
+         parsedHeaders: Headers;
- 
+         bodyAsText: string;
- // @public
+         parsedBody: Body;
- export interface PageBlobListPageRangesOptions extends CommonOptions {
+     };
-     abortSignal?: AbortSignalLike;
+ }
-     conditions?: BlobRequestConditions;
+ 
- }
+ // @public
- 
+ export interface ResponseWithHeaders<Headers> {
- // @public
+     _response: HttpResponse & {
- export interface PageBlobRequestConditions extends BlobRequestConditions, SequenceNumberAccessConditions {
+         parsedHeaders: Headers;
- }
+     };
- 
+ }
- // @public
+ 
- export interface PageBlobResizeHeaders {
+ export { RestError }
-     blobSequenceNumber?: number;
+ 
-     clientRequestId?: string;
+ // @public
-     date?: Date;
+ export interface RetentionPolicy {
-     errorCode?: string;
+     days?: number;
-     etag?: string;
+     enabled: boolean;
-     lastModified?: Date;
+ }
-     requestId?: string;
+ 
-     version?: string;
+ // @public
- }
+ export interface SasIPRange {
- 
+     end?: string;
- // @public
+     start: string;
- export interface PageBlobResizeOptions extends CommonOptions {
+ }
-     abortSignal?: AbortSignalLike;
+ 
-     conditions?: BlobRequestConditions;
+ // @public
-     encryptionScope?: string;
+ export interface SequenceNumberAccessConditions {
- }
+     ifSequenceNumberEqualTo?: number;
- 
+     ifSequenceNumberLessThan?: number;
- // @public
+     ifSequenceNumberLessThanOrEqualTo?: number;
- export type PageBlobResizeResponse = WithResponse<PageBlobResizeHeaders, PageBlobResizeHeaders>;
+ }
- export interface PageBlobStartCopyIncrementalOptions extends CommonOptions {
+ export type SequenceNumberActionType = "max" | "update" | "increment";
-     abortSignal?: AbortSignalLike;
+ 
-     conditions?: ModifiedAccessConditions;
+ // @public
- }
+ export interface ServiceClientOptions {
- 
+     httpClient?: RequestPolicy;
- // @public
+     requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
- export interface PageBlobUpdateSequenceNumberHeaders {
+ }
-     blobSequenceNumber?: number;
+ 
-     clientRequestId?: string;
+ // @public
-     date?: Date;
+ export interface ServiceFilterBlobsHeaders {
-     errorCode?: string;
+     clientRequestId?: string;
-     etag?: string;
+     date?: Date;
-     lastModified?: Date;
+     errorCode?: string;
- export interface PageBlobUpdateSequenceNumberOptions extends CommonOptions {
+ export interface ServiceFindBlobByTagsOptions extends CommonOptions {
-     conditions?: BlobRequestConditions;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type ServiceFindBlobsByTagsSegmentResponse = WithResponse<FilterBlobSegment & ServiceFilterBlobsHeaders, ServiceFilterBlobsHeaders, FilterBlobSegmentModel>;
- export type PageBlobUpdateSequenceNumberResponse = WithResponse<PageBlobUpdateSequenceNumberHeaders, PageBlobUpdateSequenceNumberHeaders>;
+ 
- 
+ // @public
- // @public
+ export interface ServiceGenerateAccountSasUrlOptions {
- export interface PageBlobUploadPagesFromURLHeaders {
+     encryptionScope?: string;
-     blobSequenceNumber?: number;
+     ipRange?: SasIPRange;
-     contentMD5?: Uint8Array;
+     protocol?: SASProtocol;
-     date?: Date;
+     startsOn?: Date;
-     encryptionKeySha256?: string;
+     version?: string;
-     encryptionScope?: string;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public
-     isServerEncrypted?: boolean;
+ export interface ServiceGetAccountInfoHeaders {
-     lastModified?: Date;
+     accountKind?: AccountKind;
-     requestId?: string;
+     clientRequestId?: string;
-     version?: string;
+     date?: Date;
-     xMsContentCrc64?: Uint8Array;
+     errorCode?: string;
- }
+     isHierarchicalNamespaceEnabled?: boolean;
- 
+     requestId?: string;
- // @public
+     skuName?: SkuName;
- export interface PageBlobUploadPagesFromURLOptions extends CommonOptions {
+     version?: string;
-     abortSignal?: AbortSignalLike;
+ }
-     conditions?: PageBlobRequestConditions;
+ 
-     customerProvidedKey?: CpkInfo;
+ // @public
-     encryptionScope?: string;
+ export interface ServiceGetAccountInfoOptions extends CommonOptions {
-     sourceAuthorization?: HttpAuthorization;
+     abortSignal?: AbortSignalLike;
-     sourceConditions?: MatchConditions & ModificationConditions;
+ }
-     sourceContentCrc64?: Uint8Array;
+ 
-     sourceContentMD5?: Uint8Array;
+ // @public
-     sourceShareTokenIntent?: FileShareTokenIntent;
+ export type ServiceGetAccountInfoResponse = WithResponse<ServiceGetAccountInfoHeaders, ServiceGetAccountInfoHeaders>;
- }
+ 
- 
+ // @public
- // @public
+ export interface ServiceGetPropertiesHeaders {
- export type PageBlobUploadPagesFromURLResponse = WithResponse<PageBlobUploadPagesFromURLHeaders, PageBlobUploadPagesFromURLHeaders>;
+     clientRequestId?: string;
- 
+     errorCode?: string;
- // @public
+     requestId?: string;
- export interface PageBlobUploadPagesHeaders {
+     version?: string;
-     blobSequenceNumber?: number;
+ }
-     clientRequestId?: string;
+ 
-     contentMD5?: Uint8Array;
+ // @public
-     date?: Date;
+ export interface ServiceGetPropertiesOptions extends CommonOptions {
-     encryptionKeySha256?: string;
+     abortSignal?: AbortSignalLike;
-     encryptionScope?: string;
+ }
-     errorCode?: string;
+ 
-     etag?: string;
+ // @public
-     isServerEncrypted?: boolean;
+ export type ServiceGetPropertiesResponse = WithResponse<ServiceGetPropertiesResponseInternal, ServiceGetPropertiesHeaders>;
-     lastModified?: Date;
+ 
-     requestId?: string;
+ // @public
-     version?: string;
+ export type ServiceGetPropertiesResponseInternal = ServiceGetPropertiesHeaders & BlobServiceProperties;
-     xMsContentCrc64?: Uint8Array;
+ 
- }
+ // @public
- 
+ export interface ServiceGetStatisticsHeaders {
- // @public
+     clientRequestId?: string;
- export interface PageBlobUploadPagesOptions extends CommonOptions {
+     date?: Date;
-     abortSignal?: AbortSignalLike;
+     errorCode?: string;
-     conditions?: PageBlobRequestConditions;
+     requestId?: string;
-     customerProvidedKey?: CpkInfo;
+     version?: string;
-     encryptionScope?: string;
+ }
-     onProgress?: (progress: TransferProgressEvent) => void;
+ 
-     transactionalContentCrc64?: Uint8Array;
+ // @public
-     transactionalContentMD5?: Uint8Array;
+ export interface ServiceGetStatisticsOptions extends CommonOptions {
- }
+     abortSignal?: AbortSignalLike;
- 
+ }
- // @public
+ 
- export type PageBlobUploadPagesResponse = WithResponse<PageBlobUploadPagesHeaders, PageBlobUploadPagesHeaders>;
+ // @public
- 
+ export type ServiceGetStatisticsResponse = WithResponse<ServiceGetStatisticsResponseInternal, ServiceGetStatisticsHeaders>;
- // @public
+ 
- export interface PageList {
+ // @public
-     clearRange?: Range_2[];
+ export type ServiceGetStatisticsResponseInternal = ServiceGetStatisticsHeaders & BlobServiceStatistics;
-     pageRange?: Range_2[];
+ 
- }
+ // @public
- 
+ export interface ServiceGetUserDelegationKeyHeaders {
- // @public
+     clientRequestId?: string;
- export interface PageListInternal {
+     date?: Date;
-     // (undocumented)
+     errorCode?: string;
-     clearRange?: ClearRange[];
+     requestId?: string;
-     // (undocumented)
+     version?: string;
-     continuationToken?: string;
+ }
-     // (undocumented)
+ 
-     pageRange?: PageRange[];
+ // @public
- }
+ export interface ServiceGetUserDelegationKeyOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public (undocumented)
+ }
- export interface PageRange {
+ 
-     // (undocumented)
+ // @public
-     end: number;
+ export type ServiceGetUserDelegationKeyResponse = WithResponse<UserDelegationKey & ServiceGetUserDelegationKeyHeaders, ServiceGetUserDelegationKeyHeaders, UserDelegationKeyModel>;
-     // (undocumented)
+ 
-     start: number;
+ // @public
- }
+ export interface ServiceListContainersOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- // @public (undocumented)
+     includeDeleted?: boolean;
- export interface PageRangeInfo {
+     includeMetadata?: boolean;
-     // (undocumented)
+     includeSystem?: boolean;
-     end: number;
+     prefix?: string;
-     // (undocumented)
+ }
-     isClear: boolean;
+ 
-     // (undocumented)
+ // @public
-     start: number;
+ export interface ServiceListContainersSegmentHeaders {
- }
+     clientRequestId?: string;
- 
+     errorCode?: string;
- // @public
+     requestId?: string;
- export interface ParsedBatchResponse {
+     version?: string;
-     subResponses: BatchSubResponse[];
+ }
-     subResponsesFailedCount: number;
+ 
-     subResponsesSucceededCount: number;
+ // @public
- }
+ export type ServiceListContainersSegmentResponse = WithResponse<ServiceListContainersSegmentResponseInternal, ServiceListContainersSegmentHeaders>;
- export class Pipeline implements PipelineLike {
+ export type ServiceListContainersSegmentResponseInternal = ServiceListContainersSegmentHeaders & ListContainersSegmentResponse;
-     constructor(factories: RequestPolicyFactory[], options?: PipelineOptions);
+ 
-     readonly factories: RequestPolicyFactory[];
+ // @public
-     readonly options: PipelineOptions;
+ export interface ServiceRenameContainerOptions extends CommonOptions {
-     toServiceClientOptions(): ServiceClientOptions;
+     abortSignal?: AbortSignalLike;
- }
+     sourceCondition?: LeaseAccessConditions;
- 
+ }
- // @public
+ 
- export interface PipelineLike {
+ // @public
-     readonly factories: RequestPolicyFactory[];
+ export interface ServiceSetPropertiesHeaders {
-     readonly options: PipelineOptions;
+     clientRequestId?: string;
-     toServiceClientOptions(): ServiceClientOptions;
+     errorCode?: string;
- }
+     requestId?: string;
- 
+     version?: string;
- // @public
+ }
- export interface PipelineOptions {
+ 
-     httpClient?: RequestPolicy;
+ // @public
- }
+ export interface ServiceSetPropertiesOptions extends CommonOptions {
- 
+     abortSignal?: AbortSignalLike;
- export { PollerLike }
+ }
- export interface PollerLikeWithCancellation<TState extends PollOperationState<TResult>, TResult> {
+ export type ServiceSetPropertiesResponse = WithResponse<ServiceSetPropertiesHeaders, ServiceSetPropertiesHeaders>;
-     cancelOperation(options?: {
+ 
-         abortSignal?: AbortSignalLike;
+ // @public
-     }): Promise<void>;
+ export interface ServiceSubmitBatchHeaders {
-     getOperationState(): TState;
+     clientRequestId?: string;
-     getResult(): TResult | undefined;
+     contentType?: string;
-     isDone(): boolean;
+     errorCode?: string;
-     isStopped(): boolean;
+     requestId?: string;
-     onProgress(callback: (state: TState) => void): CancelOnProgress;
+     version?: string;
-     poll(options?: {
+ }
-         abortSignal?: AbortSignalLike;
+ 
-     }): Promise<void>;
+ // @public
-     pollUntilDone(): Promise<TResult>;
+ export interface ServiceSubmitBatchOptionalParamsModel extends coreClient.OperationOptions {
-     stopPolling(): void;
+     requestId?: string;
-     toString(): string;
+     timeoutInSeconds?: number;
- export { PollOperationState }
+ // @public
- 
+ export type ServiceSubmitBatchResponseInternal = ServiceSubmitBatchHeaders & {
- // @public
+     blobBody?: Promise<Blob>;
- export enum PremiumPageBlobTier {
+     readableStreamBody?: NodeJS.ReadableStream;
-     P10 = "P10",
+ };
-     P15 = "P15",
+ 
-     P20 = "P20",
+ // @public
-     P30 = "P30",
+ export type ServiceSubmitBatchResponseModel = WithResponse<ServiceSubmitBatchResponseInternal, ServiceSubmitBatchHeaders>;
-     P4 = "P4",
+ 
-     P40 = "P40",
+ // @public
-     P50 = "P50",
+ export interface ServiceUndeleteContainerOptions extends CommonOptions {
-     P6 = "P6",
+     abortSignal?: AbortSignalLike;
-     P60 = "P60",
+     // @deprecated
-     P70 = "P70",
+     destinationContainerName?: string;
-     P80 = "P80"
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface SignedIdentifier {
- export type PublicAccessType = "container" | "blob";
+     accessPolicy: {
- 
+         startsOn?: Date;
- // @public
+         expiresOn?: Date;
- interface Range_2 {
+         permissions?: string;
-     count?: number;
+     };
-     offset: number;
+     id: string;
- export { Range_2 as Range }
+ 
- 
+ // @public
- // @public
+ export interface SignedIdentifierModel {
- export type RehydratePriority = "High" | "Standard";
+     accessPolicy: AccessPolicy;
- 
+     id: string;
- export { RequestPolicy as IHttpClient }
+ }
- export { RequestPolicy }
+ 
- 
+ // @public
- export { RequestPolicyFactory }
+ export type SkuName = "Standard_LRS" | "Standard_GRS" | "Standard_RAGRS" | "Standard_ZRS" | "Premium_LRS";
- export { RequestPolicyOptions }
+ // @public
- 
+ export interface StaticWebsite {
- // @public
+     defaultIndexDocumentPath?: string;
- export interface ResponseLike {
+     enabled: boolean;
-     _response: HttpResponse;
+     errorDocument404Path?: string;
- }
+     indexDocument?: string;
- 
+ }
- // @public
+ 
- export interface ResponseWithBody<Headers, Body> {
+ // @public
-     _response: HttpResponse & {
+ export class StorageBrowserPolicy extends BaseRequestPolicy {
-         parsedHeaders: Headers;
+     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
-         bodyAsText: string;
+     sendRequest(request: WebResource): Promise<HttpOperationResponse>;
-         parsedBody: Body;
+ }
-     };
+ 
- }
+ // @public
- 
+ export function storageBrowserPolicy(): PipelinePolicy;
- // @public
+ 
- export interface ResponseWithHeaders<Headers> {
+ // @public
-     _response: HttpResponse & {
+ export class StorageBrowserPolicyFactory implements RequestPolicyFactory {
-         parsedHeaders: Headers;
+     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageBrowserPolicy;
-     };
+ }
- }
+ 
- 
+ // @public
- export { RestError }
+ export const storageBrowserPolicyName = "storageBrowserPolicy";
- export interface RetentionPolicy {
+ export function storageCorrectContentLengthPolicy(): PipelinePolicy;
-     days?: number;
+ 
-     enabled: boolean;
+ // @public
- }
+ export const storageCorrectContentLengthPolicyName = "StorageCorrectContentLengthPolicy";
- export interface SasIPRange {
+ export const StorageOAuthScopes: string | string[];
-     end?: string;
+ 
-     start: string;
+ // @public
- }
+ export interface StoragePipelineOptions {
- 
+     audience?: string | string[];
- // @public
+     httpClient?: RequestPolicy;
- export enum SASProtocol {
+     keepAliveOptions?: KeepAliveOptions;
-     Https = "https",
+     proxyOptions?: ProxySettings;
-     HttpsAndHttp = "https,http"
+     retryOptions?: StorageRetryOptions;
- }
+     userAgentOptions?: UserAgentPolicyOptions;
- 
+ }
- // @public
+ 
- export class SASQueryParameters {
+ // @public
-     constructor(version: string, signature: string, permissions?: string, services?: string, resourceTypes?: string, protocol?: SASProtocol, startsOn?: Date, expiresOn?: Date, ipRange?: SasIPRange, identifier?: string, resource?: string, cacheControl?: string, contentDisposition?: string, contentEncoding?: string, contentLanguage?: string, contentType?: string, userDelegationKey?: UserDelegationKey, preauthorizedAgentObjectId?: string, correlationId?: string, encryptionScope?: string);
+ export interface StorageRetryOptions {
-     constructor(version: string, signature: string, options?: SASQueryParametersOptions);
+     readonly maxRetryDelayInMs?: number;
-     readonly cacheControl?: string;
+     readonly maxTries?: number;
-     readonly contentDisposition?: string;
+     readonly retryDelayInMs?: number;
-     readonly contentEncoding?: string;
+     readonly retryPolicyType?: StorageRetryPolicyType;
-     readonly contentLanguage?: string;
+     readonly secondaryHost?: string;
-     readonly contentType?: string;
+     readonly tryTimeoutInMs?: number;
-     readonly correlationId?: string;
+ }
-     readonly encryptionScope?: string;
+ 
-     readonly expiresOn?: Date;
+ // @public
-     readonly identifier?: string;
+ export class StorageRetryPolicy extends BaseRequestPolicy {
-     get ipRange(): SasIPRange | undefined;
+     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, retryOptions?: StorageRetryOptions);
-     readonly permissions?: string;
+     protected attemptSendRequest(request: WebResource, secondaryHas404: boolean, attempt: number): Promise<HttpOperationResponse>;
-     readonly preauthorizedAgentObjectId?: string;
+     sendRequest(request: WebResource): Promise<HttpOperationResponse>;
-     readonly protocol?: SASProtocol;
+     protected shouldRetry(isPrimaryRetry: boolean, attempt: number, response?: HttpOperationResponse, err?: RestError): boolean;
-     readonly resource?: string;
+ }
-     readonly resourceTypes?: string;
+ 
-     readonly services?: string;
+ // @public
-     readonly signature: string;
+ export function storageRetryPolicy(options?: StorageRetryOptions): PipelinePolicy;
-     readonly startsOn?: Date;
+ 
-     toString(): string;
+ // @public
-     readonly version: string;
+ export class StorageRetryPolicyFactory implements RequestPolicyFactory {
- }
+     constructor(retryOptions?: StorageRetryOptions);
- 
+     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageRetryPolicy;
- // @public
+ }
- export interface SASQueryParametersOptions {
+ 
-     cacheControl?: string;
+ // @public
-     contentDisposition?: string;
+ export const storageRetryPolicyName = "storageRetryPolicy";
-     contentEncoding?: string;
+ 
-     contentLanguage?: string;
+ // @public
-     contentType?: string;
+ export enum StorageRetryPolicyType {
-     correlationId?: string;
+     EXPONENTIAL = 0,
-     encryptionScope?: string;
+     FIXED = 1
-     expiresOn?: Date;
+ }
-     identifier?: string;
+ 
-     ipRange?: SasIPRange;
+ // @public (undocumented)
-     permissions?: string;
+ export class StorageSharedKeyCredential {
-     preauthorizedAgentObjectId?: string;
+ }
-     protocol?: SASProtocol;
+ 
-     resource?: string;
+ // @public
-     resourceTypes?: string;
+ export function storageSharedKeyCredentialPolicy(_options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
-     services?: string;
+ 
-     startsOn?: Date;
+ // @public
-     userDelegationKey?: UserDelegationKey;
+ export const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";
- }
+ 
- 
+ // @public
- // @public
+ export interface StorageSharedKeyCredentialPolicyOptions {
- export interface SequenceNumberAccessConditions {
+     // (undocumented)
-     ifSequenceNumberEqualTo?: number;
+     accountKey: Buffer;
-     ifSequenceNumberLessThan?: number;
+     // (undocumented)
-     ifSequenceNumberLessThanOrEqualTo?: number;
+     accountName: string;
- export type SequenceNumberActionType = "max" | "update" | "increment";
+ export type SyncCopyStatusType = "success";
- export interface ServiceClientOptions {
+ export interface TagConditions {
-     httpClient?: RequestPolicy;
+     tagConditions?: string;
-     requestPolicyFactories?: RequestPolicyFactory[] | ((defaultRequestPolicyFactories: RequestPolicyFactory[]) => void | RequestPolicyFactory[]);
+ }
- }
+ 
- 
+ // @public
- // @public
+ export type Tags = Record<string, string>;
- export interface ServiceFilterBlobsHeaders {
+ 
-     clientRequestId?: string;
+ // @public
-     date?: Date;
+ export interface UserDelegationKey {
-     errorCode?: string;
+     signedExpiresOn: Date;
-     requestId?: string;
+     signedObjectId: string;
-     version?: string;
+     signedService: string;
- }
+     signedStartsOn: Date;
- 
+     signedTenantId: string;
- // @public
+     signedVersion: string;
- export interface ServiceFindBlobByTagsOptions extends CommonOptions {
+     value: string;
-     abortSignal?: AbortSignalLike;
+ }
- }
+ 
- 
+ // @public
- // @public
+ export interface UserDelegationKeyModel {
- export type ServiceFindBlobsByTagsSegmentResponse = WithResponse<FilterBlobSegment & ServiceFilterBlobsHeaders, ServiceFilterBlobsHeaders, FilterBlobSegmentModel>;
+     signedExpiresOn: string;
- 
+     signedObjectId: string;
- // @public
+     signedService: string;
- export interface ServiceGenerateAccountSasUrlOptions {
+     signedStartsOn: string;
-     encryptionScope?: string;
+     signedTenantId: string;
-     ipRange?: SasIPRange;
+     signedVersion: string;
-     protocol?: SASProtocol;
+     value: string;
-     startsOn?: Date;
+ }
-     version?: string;
+ 
- }
+ export { WebResource }
- export interface ServiceGetAccountInfoHeaders {
+ export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
-     accountKind?: AccountKind;
+ 
-     clientRequestId?: string;
+ // (No @packageDocumentation comment for this package)
-     date?: Date;
+ 
-     errorCode?: string;
+ ```
-     isHierarchicalNamespaceEnabled?: boolean;
+ 
-     requestId?: string;
+ 
-     skuName?: SkuName;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetAccountInfoOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceGetAccountInfoResponse = WithResponse<ServiceGetAccountInfoHeaders, ServiceGetAccountInfoHeaders>;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetPropertiesHeaders {
+ 
-     clientRequestId?: string;
+ 
-     errorCode?: string;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetPropertiesOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceGetPropertiesResponse = WithResponse<ServiceGetPropertiesResponseInternal, ServiceGetPropertiesHeaders>;
+ 
- 
+ 
- // @public
+ 
- export type ServiceGetPropertiesResponseInternal = ServiceGetPropertiesHeaders & BlobServiceProperties;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetStatisticsHeaders {
+ 
-     clientRequestId?: string;
+ 
-     date?: Date;
+ 
-     errorCode?: string;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetStatisticsOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceGetStatisticsResponse = WithResponse<ServiceGetStatisticsResponseInternal, ServiceGetStatisticsHeaders>;
+ 
- 
+ 
- // @public
+ 
- export type ServiceGetStatisticsResponseInternal = ServiceGetStatisticsHeaders & BlobServiceStatistics;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetUserDelegationKeyHeaders {
+ 
-     clientRequestId?: string;
+ 
-     date?: Date;
+ 
-     errorCode?: string;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceGetUserDelegationKeyOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceGetUserDelegationKeyResponse = WithResponse<UserDelegationKey & ServiceGetUserDelegationKeyHeaders, ServiceGetUserDelegationKeyHeaders, UserDelegationKeyModel>;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceListContainersOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     includeDeleted?: boolean;
+ 
-     includeMetadata?: boolean;
+ 
-     includeSystem?: boolean;
+ 
-     prefix?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceListContainersSegmentHeaders {
+ 
-     clientRequestId?: string;
+ 
-     errorCode?: string;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceListContainersSegmentResponse = WithResponse<ServiceListContainersSegmentResponseInternal, ServiceListContainersSegmentHeaders>;
+ 
- 
+ 
- // @public
+ 
- export type ServiceListContainersSegmentResponseInternal = ServiceListContainersSegmentHeaders & ListContainersSegmentResponse;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceRenameContainerOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     sourceCondition?: LeaseAccessConditions;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceSetPropertiesHeaders {
+ 
-     clientRequestId?: string;
+ 
-     errorCode?: string;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceSetPropertiesOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceSetPropertiesResponse = WithResponse<ServiceSetPropertiesHeaders, ServiceSetPropertiesHeaders>;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceSubmitBatchHeaders {
+ 
-     clientRequestId?: string;
+ 
-     contentType?: string;
+ 
-     errorCode?: string;
+ 
-     requestId?: string;
+ 
-     version?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface ServiceSubmitBatchOptionalParamsModel extends coreClient.OperationOptions {
+ 
-     requestId?: string;
+ 
-     timeoutInSeconds?: number;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type ServiceSubmitBatchResponseInternal = ServiceSubmitBatchHeaders & {
+ 
-     blobBody?: Promise<Blob>;
+ 
-     readableStreamBody?: NodeJS.ReadableStream;
+ 
- };
+ 
- 
+ 
- // @public
+ 
- export type ServiceSubmitBatchResponseModel = WithResponse<ServiceSubmitBatchResponseInternal, ServiceSubmitBatchHeaders>;
+ 
- 
+ 
- // @public
+ 
- export interface ServiceUndeleteContainerOptions extends CommonOptions {
+ 
-     abortSignal?: AbortSignalLike;
+ 
-     // @deprecated
+ 
-     destinationContainerName?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface SignedIdentifier {
+ 
-     accessPolicy: {
+ 
-         startsOn?: Date;
+ 
-         expiresOn?: Date;
+ 
-         permissions?: string;
+ 
-     };
+ 
-     id: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface SignedIdentifierModel {
+ 
-     accessPolicy: AccessPolicy;
+ 
-     id: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type SkuName = "Standard_LRS" | "Standard_GRS" | "Standard_RAGRS" | "Standard_ZRS" | "Premium_LRS";
+ 
- 
+ 
- // @public
+ 
- export interface StaticWebsite {
+ 
-     defaultIndexDocumentPath?: string;
+ 
-     enabled: boolean;
+ 
-     errorDocument404Path?: string;
+ 
-     indexDocument?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export enum StorageBlobAudience {
+ 
-     DiskComputeOAuthScopes = "https://disk.compute.azure.com/.default",
+ 
-     StorageOAuthScopes = "https://storage.azure.com/.default"
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export class StorageBrowserPolicy extends BaseRequestPolicy {
+ 
-     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions);
+ 
-     sendRequest(request: WebResource): Promise<HttpOperationResponse>;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export function storageBrowserPolicy(): PipelinePolicy;
+ 
- 
+ 
- // @public
+ 
- export class StorageBrowserPolicyFactory implements RequestPolicyFactory {
+ 
-     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageBrowserPolicy;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export const storageBrowserPolicyName = "storageBrowserPolicy";
+ 
- 
+ 
- // @public
+ 
- export function storageCorrectContentLengthPolicy(): PipelinePolicy;
+ 
- 
+ 
- // @public
+ 
- export const storageCorrectContentLengthPolicyName = "StorageCorrectContentLengthPolicy";
+ 
- 
+ 
- // @public
+ 
- export const StorageOAuthScopes: string | string[];
+ 
- 
+ 
- // @public
+ 
- export interface StoragePipelineOptions {
+ 
-     audience?: string | string[];
+ 
-     httpClient?: RequestPolicy;
+ 
-     keepAliveOptions?: KeepAliveOptions;
+ 
-     proxyOptions?: ProxySettings;
+ 
-     retryOptions?: StorageRetryOptions;
+ 
-     userAgentOptions?: UserAgentPolicyOptions;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface StorageRetryOptions {
+ 
-     readonly maxRetryDelayInMs?: number;
+ 
-     readonly maxTries?: number;
+ 
-     readonly retryDelayInMs?: number;
+ 
-     readonly retryPolicyType?: StorageRetryPolicyType;
+ 
-     readonly secondaryHost?: string;
+ 
-     readonly tryTimeoutInMs?: number;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export class StorageRetryPolicy extends BaseRequestPolicy {
+ 
-     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, retryOptions?: StorageRetryOptions);
+ 
-     protected attemptSendRequest(request: WebResource, secondaryHas404: boolean, attempt: number): Promise<HttpOperationResponse>;
+ 
-     sendRequest(request: WebResource): Promise<HttpOperationResponse>;
+ 
-     protected shouldRetry(isPrimaryRetry: boolean, attempt: number, response?: HttpOperationResponse, err?: RestError): boolean;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export function storageRetryPolicy(options?: StorageRetryOptions): PipelinePolicy;
+ 
- 
+ 
- // @public
+ 
- export class StorageRetryPolicyFactory implements RequestPolicyFactory {
+ 
-     constructor(retryOptions?: StorageRetryOptions);
+ 
-     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageRetryPolicy;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export const storageRetryPolicyName = "storageRetryPolicy";
+ 
- 
+ 
- // @public
+ 
- export enum StorageRetryPolicyType {
+ 
-     EXPONENTIAL = 0,
+ 
-     FIXED = 1
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export class StorageSharedKeyCredential extends Credential_2 {
+ 
-     constructor(accountName: string, accountKey: string);
+ 
-     readonly accountName: string;
+ 
-     computeHMACSHA256(stringToSign: string): string;
+ 
-     create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): StorageSharedKeyCredentialPolicy;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export class StorageSharedKeyCredentialPolicy extends CredentialPolicy {
+ 
-     constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, factory: StorageSharedKeyCredential);
+ 
-     protected signRequest(request: WebResource): WebResource;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export function storageSharedKeyCredentialPolicy(options: StorageSharedKeyCredentialPolicyOptions): PipelinePolicy;
+ 
- 
+ 
- // @public
+ 
- export const storageSharedKeyCredentialPolicyName = "storageSharedKeyCredentialPolicy";
+ 
- 
+ 
- // @public
+ 
- export interface StorageSharedKeyCredentialPolicyOptions {
+ 
-     // (undocumented)
+ 
-     accountKey: Buffer;
+ 
-     // (undocumented)
+ 
-     accountName: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type SyncCopyStatusType = "success";
+ 
- 
+ 
- // @public
+ 
- export interface TagConditions {
+ 
-     tagConditions?: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export type Tags = Record<string, string>;
+ 
- 
+ 
- // @public
+ 
- export interface UserDelegationKey {
+ 
-     signedExpiresOn: Date;
+ 
-     signedObjectId: string;
+ 
-     signedService: string;
+ 
-     signedStartsOn: Date;
+ 
-     signedTenantId: string;
+ 
-     signedVersion: string;
+ 
-     value: string;
+ 
- }
+ 
- 
+ 
- // @public
+ 
- export interface UserDelegationKeyModel {
+ 
-     signedExpiresOn: string;
+ 
-     signedObjectId: string;
+ 
-     signedService: string;
+ 
-     signedStartsOn: string;
+ 
-     signedTenantId: string;
+ 
-     signedVersion: string;
+ 
-     value: string;
+ 
- }
+ 
- 
+ 
- export { WebResource }
+ 
- 
+ 
- // @public
+ 
- export type WithResponse<T, Headers = undefined, Body = undefined> = T & (Body extends object ? ResponseWithBody<Headers, Body> : Headers extends object ? ResponseWithHeaders<Headers> : ResponseLike);
+ 
- 
+ 
- // (No @packageDocumentation comment for this package)
+ 
- 
+ 
- ```
+ 
```