import type { AbortSignalLike } from "@azure/abort-controller";
import type { RequestBodyType as HttpRequestBody, TransferProgressEvent } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import type { PollOperationState } from "@azure/core-lro";
import type { Readable } from "node:stream";
import { AnonymousCredential } from "./credentials/AnonymousCredential.js";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential.js";
import type { AppendBlobAppendBlockFromUrlResponse, AppendBlobAppendBlockResponse, AppendBlobCreateResponse, BlobAbortCopyFromURLResponse, BlobCopyFromURLResponse, BlobCreateSnapshotResponse, BlobDeleteResponse, BlobDownloadResponseModel, BlobGetAccountInfoResponse, BlobGetPropertiesResponseModel, BlobGetTagsHeaders, BlobSetHTTPHeadersResponse, BlobSetTagsResponse, BlobSetTierResponse, BlobStartCopyFromURLResponse, BlobTags, BlobUndeleteResponse, BlockBlobCommitBlockListResponse, BlockBlobGetBlockListResponse, BlockBlobStageBlockFromURLResponse, BlockBlobStageBlockResponse, BlockBlobUploadHeaders, BlockBlobUploadResponse, BlockListType, CpkInfo, DeleteSnapshotsOptionType, LeaseAccessConditions, PageBlobClearPagesResponse, PageBlobCopyIncrementalResponse, PageBlobCreateResponse, PageBlobResizeResponse, PageBlobUpdateSequenceNumberResponse, PageBlobUploadPagesFromURLResponse, PageBlobUploadPagesResponse, RehydratePriority, SequenceNumberActionType, BlockBlobPutBlobFromUrlResponse, BlobHTTPHeaders, PageBlobGetPageRangesResponseModel, PageRangeInfo, PageBlobGetPageRangesDiffResponseModel, BlobCopySourceTags, BlobDeleteImmutabilityPolicyResponse, BlobSetImmutabilityPolicyResponse, BlobSetLegalHoldResponse, BlobSetMetadataResponse } from "./generatedModels.js";
import type { AppendBlobRequestConditions, BlobDownloadResponseParsed, BlobRequestConditions, BlockBlobTier, Metadata, ObjectReplicationPolicy, PageBlobRequestConditions, PremiumPageBlobTier, Tags, TagConditions, MatchConditions, ModificationConditions, ModifiedAccessConditions, BlobQueryArrowField, BlobImmutabilityPolicy, HttpAuthorization, PollerLikeWithCancellation } from "./models.js";
import type { PageBlobGetPageRangesDiffResponse, PageBlobGetPageRangesResponse } from "./PageBlobRangeResponse.js";
import type { PipelineLike, StoragePipelineOptions } from "./Pipeline.js";
import type { BlobBeginCopyFromUrlPollState } from "./pollers/BlobStartCopyFromUrlPoller.js";
import type { Range } from "./Range.js";
import type { CommonOptions } from "./StorageClient.js";
import { StorageClient } from "./StorageClient.js";
import type { WithResponse } from "./utils/utils.common.js";
import type { SASProtocol } from "./sas/SASQueryParameters.js";
import type { SasIPRange } from "./sas/SasIPRange.js";
import type { BlobSASPermissions } from "./sas/BlobSASPermissions.js";
import { BlobLeaseClient } from "./BlobLeaseClient.js";
import type { PagedAsyncIterableIterator } from "@azure/core-paging";
import type { UserDelegationKey } from "./BlobServiceClient.js";
/**
 * Options to configure the {@link BlobClient.beginCopyFromURL} operation.
 */
export interface BlobBeginCopyFromURLOptions extends BlobStartCopyFromURLOptions {
    /**
     * The amount of time in milliseconds the poller should wait between
     * calls to the service to determine the status of the Blob copy.
     * Defaults to 15 seconds.
     */
    intervalInMs?: number;
    /**
     * Callback to receive the state of the copy progress.
     */
    onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
    /**
     * Serialized poller state that can be used to resume polling from.
     * This may be useful when starting a copy on one process or thread
     * and you wish to continue polling on another process or thread.
     *
     * To get serialized poller state, call `poller.toString()` on an existing
     * poller.
     */
    resumeFrom?: string;
}
/**
 * Contains response data for the {@link BlobClient.beginCopyFromURL} operation.
 */
export interface BlobBeginCopyFromURLResponse extends BlobStartCopyFromURLResponse {
}
/**
 * Options to configure the {@link BlobClient.download} operation.
 */
export interface BlobDownloadOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * An opaque DateTime string value that, when present, specifies the blob snapshot to retrieve.
     */
    snapshot?: string;
    /**
     * When this is set to true and download range of blob, the service returns the MD5 hash for the range,
     * as long as the range is less than or equal to 4 MB in size.
     *
     * rangeGetContentCrc64 and rangeGetContentMD5 cannot be set at same time.
     */
    rangeGetContentMD5?: boolean;
    /**
     * When this is set to true and download range of blob, the service returns the CRC64 hash for the range,
     * as long as the range is less than or equal to 4 MB in size.
     *
     * rangeGetContentCrc64 and rangeGetContentMD5 cannot be set at same time.
     */
    rangeGetContentCrc64?: boolean;
    /**
     * Conditions to meet when downloading blobs.
     */
    conditions?: BlobRequestConditions;
    /**
     * Call back to receive events on the progress of download operation.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Optional. ONLY AVAILABLE IN NODE.JS.
     *
     * How many retries will perform when original body download stream unexpected ends.
     * Above kind of ends will not trigger retry policy defined in a pipeline,
     * because they doesn't emit network errors.
     *
     * With this option, every additional retry means an additional `FileClient.download()` request will be made
     * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
     *
     * Default value is 5, please set a larger value when loading large files in poor network.
     */
    maxRetryRequests?: number;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
}
/**
 * Options to configure the {@link BlobClient.exists} operation.
 */
export interface BlobExistsOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Conditions to meet.
     */
    conditions?: BlobRequestConditions;
}
/**
 * Options to configure the {@link BlobClient.getProperties} operation.
 */
export interface BlobGetPropertiesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when getting blob properties.
     */
    conditions?: BlobRequestConditions;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
}
/**
 * Options to configure the {@link BlobClient.delete} operation.
 */
export interface BlobDeleteOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when deleting blobs.
     */
    conditions?: BlobRequestConditions;
    /**
     * Specifies options to delete blobs that have associated snapshots.
     * - `include`: Delete the base blob and all of its snapshots.
     * - `only`: Delete only the blob's snapshots and not the blob itself.
     */
    deleteSnapshots?: DeleteSnapshotsOptionType;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
}
/**
 * Options to configure the {@link BlobClient.undelete} operation.
 */
export interface BlobUndeleteOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
}
/**
 * Options to configure the {@link BlobClient.setHTTPHeaders} operation.
 */
export interface BlobSetHTTPHeadersOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when setting blob HTTP headers.
     */
    conditions?: BlobRequestConditions;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
}
/**
 * Options to configure the {@link BlobClient.setMetadata} operation.
 */
export interface BlobSetMetadataOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when setting blob metadata.
     */
    conditions?: BlobRequestConditions;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
}
/**
 * Options to configure the {@link BlobClient.setTags} operation.
 */
export interface BlobSetTagsOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet for the blob to perform this operation.
     */
    conditions?: TagConditions & LeaseAccessConditions;
}
/**
 * Options to configure the {@link BlobClient.getTags} operation.
 */
export interface BlobGetTagsOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet for the blob to perform this operation.
     */
    conditions?: TagConditions & LeaseAccessConditions;
}
/**
 * Contains response data for the {@link BlobClient.getTags} operation.
 */
export type BlobGetTagsResponse = WithResponse<{
    tags: Tags;
} & BlobGetTagsHeaders, BlobGetTagsHeaders, BlobTags>;
/**
 * Options to configure Blob - Acquire Lease operation.
 */
export interface BlobAcquireLeaseOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when acquiring the lease of a blob.
     */
    conditions?: ModifiedAccessConditions;
}
/**
 * Options to configure Blob - Release Lease operation.
 */
export interface BlobReleaseLeaseOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when releasing the lease of a blob.
     */
    conditions?: ModifiedAccessConditions;
}
/**
 * Options to configure Blob - Renew Lease operation.
 */
export interface BlobRenewLeaseOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when renewing the lease of a blob.
     */
    conditions?: ModifiedAccessConditions;
}
/**
 * Options to configure Blob - Change Lease operation.
 */
export interface BlobChangeLeaseOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when changing the lease of a blob.
     */
    conditions?: ModifiedAccessConditions;
}
/**
 * Options to configure Blob - Break Lease operation.
 */
export interface BlobBreakLeaseOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when breaking the lease of a blob.
     */
    conditions?: ModifiedAccessConditions;
}
/**
 * Options to configure the {@link BlobClient.createSnapshot} operation.
 */
export interface BlobCreateSnapshotOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * A collection of key-value string pair to associate with the snapshot.
     */
    metadata?: Metadata;
    /**
     * Conditions to meet when creating blob snapshots.
     */
    conditions?: BlobRequestConditions;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
}
/**
 * Options to configure the {@link BlobClient.beginCopyFromURL} operation.
 */
export interface BlobStartCopyFromURLOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * A collection of key-value string pair to associate with the blob that are being copied.
     */
    metadata?: Metadata;
    /**
     * Conditions to meet for the destination blob when copying from a URL to the blob.
     */
    conditions?: BlobRequestConditions;
    /**
     * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
     */
    sourceConditions?: ModifiedAccessConditions;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: BlockBlobTier | PremiumPageBlobTier | string;
    /**
     * Rehydrate Priority - possible values include 'High', 'Standard'.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
     */
    rehydratePriority?: RehydratePriority;
    /**
     * Optional. Specifies immutability policy for a blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    immutabilityPolicy?: BlobImmutabilityPolicy;
    /**
     * Optional. Indicates if a legal hold should be placed on the blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    legalHold?: boolean;
    /**
     * Blob tags.
     */
    tags?: Tags;
    /**
     * Overrides the sealed state of the destination blob. Default true.
     */
    sealBlob?: boolean;
}
/**
 * Options to configure the {@link BlobClient.abortCopyFromURL} operation.
 */
export interface BlobAbortCopyFromURLOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     */
    conditions?: LeaseAccessConditions;
}
/**
 * Options to configure the {@link BlobClient.syncCopyFromURL} operation.
 */
export interface BlobSyncCopyFromURLOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * A collection of key-value string pair to associate with the snapshot.
     */
    metadata?: Metadata;
    /**
     * Conditions to meet for the destination blob when copying from a URL to the blob.
     */
    conditions?: BlobRequestConditions;
    /**
     * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
     */
    sourceConditions?: MatchConditions & ModificationConditions;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: BlockBlobTier | PremiumPageBlobTier | string;
    /**
     * Specify the md5 calculated for the range of bytes that must be read from the copy source.
     */
    sourceContentMD5?: Uint8Array;
    /**
     * Optional. Specifies immutability policy for a blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    immutabilityPolicy?: BlobImmutabilityPolicy;
    /**
     * Optional. Indicates if a legal hold should be placed on the blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    legalHold?: boolean;
    /**
     * Blob tags.
     */
    tags?: Tags;
    /**
     * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
     */
    sourceAuthorization?: HttpAuthorization;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to encrypt the data provided in the request. If not specified, encryption is performed with the default account encryption scope.  For more information, see Encryption at Rest for Azure Storage Services.
     */
    encryptionScope?: string;
    /**
     * Optional. Default 'REPLACE'.  Indicates if source tags should be copied or replaced with the tags specified by {@link tags}.
     */
    copySourceTags?: BlobCopySourceTags;
}
/**
 * Options to configure the {@link BlobClient.setAccessTier} operation.
 */
export interface BlobSetTierOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     */
    conditions?: LeaseAccessConditions & TagConditions;
    /**
     * Rehydrate Priority - possible values include 'High', 'Standard'.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
     */
    rehydratePriority?: RehydratePriority;
}
/**
 * Option interface for the {@link BlobClient.downloadToBuffer} operation.
 */
export interface BlobDownloadToBufferOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * blockSize is the data every request trying to download.
     * Must be greater than or equal to 0.
     * If set to 0 or undefined, blockSize will automatically calculated according to the blob size.
     */
    blockSize?: number;
    /**
     * Optional. ONLY AVAILABLE IN NODE.JS.
     *
     * How many retries will perform when original block download stream unexpected ends.
     * Above kind of ends will not trigger retry policy defined in a pipeline,
     * because they doesn't emit network errors.
     *
     * With this option, every additional retry means an additional FileClient.download() request will be made
     * from the broken point, until the requested block has been successfully downloaded or
     * maxRetryRequestsPerBlock is reached.
     *
     * Default value is 5, please set a larger value when in poor network.
     */
    maxRetryRequestsPerBlock?: number;
    /**
     * Progress updater.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Access conditions headers.
     */
    conditions?: BlobRequestConditions;
    /**
     * Concurrency of parallel download.
     */
    concurrency?: number;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
}
/**
 * Contains response data for the {@link BlobClient.deleteIfExists} operation.
 */
export interface BlobDeleteIfExistsResponse extends BlobDeleteResponse {
    /**
     * Indicate whether the blob is successfully deleted. Is false if the blob does not exist in the first place.
     */
    succeeded: boolean;
}
/**
 * Contains response data for the {@link BlobClient.getProperties} operation.
 */
export interface BlobGetPropertiesResponse extends BlobGetPropertiesResponseModel {
    /**
     * Parsed Object Replication Policy Id, Rule Id(s) and status of the source blob.
     */
    objectReplicationSourceProperties?: ObjectReplicationPolicy[];
    /**
     * Object Replication Policy Id of the destination blob.
     */
    objectReplicationDestinationPolicyId?: string;
}
/**
 * Common options of {@link BlobGenerateSasUrlOptions} and {@link ContainerGenerateSasUrlOptions}.
 */
export interface CommonGenerateSasUrlOptions {
    /**
     * The version of the service this SAS will target. If not specified, it will default to the version targeted by the
     * library.
     */
    version?: string;
    /**
     * Optional. SAS protocols, HTTPS only or HTTPSandHTTP
     */
    protocol?: SASProtocol;
    /**
     * Optional. When the SAS will take effect.
     */
    startsOn?: Date;
    /**
     * Optional only when identifier is provided. The time after which the SAS will no longer work.
     */
    expiresOn?: Date;
    /**
     * Optional. IP ranges allowed in this SAS.
     */
    ipRange?: SasIPRange;
    /**
     * Optional. The name of the access policy on the container this SAS references if any.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/establishing-a-stored-access-policy
     */
    identifier?: string;
    /**
     * Optional. Encryption scope to use when sending requests authorized with this SAS URI.
     */
    encryptionScope?: string;
    /**
     * Optional. The cache-control header for the SAS.
     */
    cacheControl?: string;
    /**
     * Optional. The content-disposition header for the SAS.
     */
    contentDisposition?: string;
    /**
     * Optional. The content-encoding header for the SAS.
     */
    contentEncoding?: string;
    /**
     * Optional. The content-language header for the SAS.
     */
    contentLanguage?: string;
    /**
     * Optional. The content-type header for the SAS.
     */
    contentType?: string;
}
/**
 * Options to configure {@link BlobClient.generateSasUrl} operation.
 */
export interface BlobGenerateSasUrlOptions extends CommonGenerateSasUrlOptions {
    /**
     * Optional only when identifier is provided. Specifies the list of permissions to be associated with the SAS.
     */
    permissions?: BlobSASPermissions;
}
/**
 * Options for deleting immutability policy {@link BlobClient.deleteImmutabilityPolicy} operation.
 */
export interface BlobDeleteImmutabilityPolicyOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * Options for setting immutability policy {@link BlobClient.setImmutabilityPolicy} operation.
 */
export interface BlobSetImmutabilityPolicyOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    modifiedAccessCondition?: ModificationConditions;
}
/**
 * Options for setting legal hold {@link BlobClient.setLegalHold} operation.
 */
export interface BlobSetLegalHoldOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * Options to configure the {@link BlobClient.getAccountInfo} operation.
 */
export interface BlobGetAccountInfoOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
}
/**
 * A BlobClient represents a URL to an Azure Storage blob; the blob may be a block blob,
 * append blob, or page blob.
 */
export declare class BlobClient extends StorageClient {
    /**
     * blobContext provided by protocol layer.
     */
    private blobContext;
    private _name;
    private _containerName;
    private _versionId?;
    private _snapshot?;
    /**
     * The name of the blob.
     */
    get name(): string;
    /**
     * The name of the storage container the blob is associated with.
     */
    get containerName(): string;
    /**
     *
     * Creates an instance of BlobClient from connection string.
     *
     * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param containerName - Container name.
     * @param blobName - Blob name.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
    /**
     * Creates an instance of BlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param url - A Client string pointing to Azure Storage blob service, such as
     *                     "https://myaccount.blob.core.windows.net". You can append a SAS
     *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
     * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
    /**
     * Creates an instance of BlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param url - A URL string pointing to Azure Storage blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blob".
     *                     You can append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param pipeline - Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     */
    constructor(url: string, pipeline: PipelineLike);
    /**
     * Creates a new BlobClient object identical to the source but with the specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a Client to the base blob.
     *
     * @param snapshot - The snapshot timestamp.
     * @returns A new BlobClient object identical to the source but with the specified snapshot timestamp
     */
    withSnapshot(snapshot: string): BlobClient;
    /**
     * Creates a new BlobClient object pointing to a version of this blob.
     * Provide "" will remove the versionId and return a Client to the base blob.
     *
     * @param versionId - The versionId.
     * @returns A new BlobClient object pointing to the version of this blob.
     */
    withVersion(versionId: string): BlobClient;
    /**
     * Creates a AppendBlobClient object.
     *
     */
    getAppendBlobClient(): AppendBlobClient;
    /**
     * Creates a BlockBlobClient object.
     *
     */
    getBlockBlobClient(): BlockBlobClient;
    /**
     * Creates a PageBlobClient object.
     *
     */
    getPageBlobClient(): PageBlobClient;
    /**
     * Reads or downloads a blob from the system, including its metadata and properties.
     * You can also call Get Blob to read a snapshot.
     *
     * * In Node.js, data returns in a Readable stream readableStreamBody
     * * In browsers, data returns in a promise blobBody
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-blob
     *
     * @param offset - From which position of the blob to download, greater than or equal to 0
     * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
     * @param options - Optional options to Blob Download operation.
     *
     *
     * Example usage (Node.js):
     *
     * ```ts snippet:ReadmeSampleDownloadBlob_Node
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     * const blobClient = containerClient.getBlobClient(blobName);
     *
     * // Get blob content from position 0 to the end
     * // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
     * const downloadBlockBlobResponse = await blobClient.download();
     * if (downloadBlockBlobResponse.readableStreamBody) {
     *   const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
     *   console.log(`Downloaded blob content: ${downloaded}`);
     * }
     *
     * async function streamToString(stream: NodeJS.ReadableStream): Promise<string> {
     *   const result = await new Promise<Buffer<ArrayBuffer>>((resolve, reject) => {
     *     const chunks: Buffer[] = [];
     *     stream.on("data", (data) => {
     *       chunks.push(Buffer.isBuffer(data) ? data : Buffer.from(data));
     *     });
     *     stream.on("end", () => {
     *       resolve(Buffer.concat(chunks));
     *     });
     *     stream.on("error", reject);
     *   });
     *   return result.toString();
     * }
     * ```
     *
     * Example usage (browser):
     *
     * ```ts snippet:ReadmeSampleDownloadBlob_Browser
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     * const blobClient = containerClient.getBlobClient(blobName);
     *
     * // Get blob content from position 0 to the end
     * // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
     * const downloadBlockBlobResponse = await blobClient.download();
     * const blobBody = await downloadBlockBlobResponse.blobBody;
     * if (blobBody) {
     *   const downloaded = await blobBody.text();
     *   console.log(`Downloaded blob content: ${downloaded}`);
     * }
     * ```
     */
    download(offset?: number, count?: number, options?: BlobDownloadOptions): Promise<BlobDownloadResponseParsed>;
    /**
     * Returns true if the Azure blob resource represented by this client exists; false otherwise.
     *
     * NOTE: use this function with care since an existing blob might be deleted by other clients or
     * applications. Vice versa new blobs might be added by other clients or applications after this
     * function completes.
     *
     * @param options - options to Exists operation.
     */
    exists(options?: BlobExistsOptions): Promise<boolean>;
    /**
     * Returns all user-defined metadata, standard HTTP properties, and system properties
     * for the blob. It does not return the content of the blob.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-blob-properties
     *
     * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
     * they originally contained uppercase characters. This differs from the metadata keys returned by
     * the methods of {@link ContainerClient} that list blobs using the `includeMetadata` option, which
     * will retain their original casing.
     *
     * @param options - Optional options to Get Properties operation.
     */
    getProperties(options?: BlobGetPropertiesOptions): Promise<BlobGetPropertiesResponse>;
    /**
     * Marks the specified blob or snapshot for deletion. The blob is later deleted
     * during garbage collection. Note that in order to delete a blob, you must delete
     * all of its snapshots. You can delete both at the same time with the Delete
     * Blob operation.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-blob
     *
     * @param options - Optional options to Blob Delete operation.
     */
    delete(options?: BlobDeleteOptions): Promise<BlobDeleteResponse>;
    /**
     * Marks the specified blob or snapshot for deletion if it exists. The blob is later deleted
     * during garbage collection. Note that in order to delete a blob, you must delete
     * all of its snapshots. You can delete both at the same time with the Delete
     * Blob operation.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/delete-blob
     *
     * @param options - Optional options to Blob Delete operation.
     */
    deleteIfExists(options?: BlobDeleteOptions): Promise<BlobDeleteIfExistsResponse>;
    /**
     * Restores the contents and metadata of soft deleted blob and any associated
     * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
     * or later.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/undelete-blob
     *
     * @param options - Optional options to Blob Undelete operation.
     */
    undelete(options?: BlobUndeleteOptions): Promise<BlobUndeleteResponse>;
    /**
     * Sets system properties on the blob.
     *
     * If no value provided, or no value provided for the specified blob HTTP headers,
     * these blob HTTP headers without a value will be cleared.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
     *
     * @param blobHTTPHeaders - If no value provided, or no value provided for
     *                                                   the specified blob HTTP headers, these blob HTTP
     *                                                   headers without a value will be cleared.
     *                                                   A common header to set is `blobContentType`
     *                                                   enabling the browser to provide functionality
     *                                                   based on file type.
     * @param options - Optional options to Blob Set HTTP Headers operation.
     */
    setHTTPHeaders(blobHTTPHeaders?: BlobHTTPHeaders, options?: BlobSetHTTPHeadersOptions): Promise<BlobSetHTTPHeadersResponse>;
    /**
     * Sets user-defined metadata for the specified blob as one or more name-value pairs.
     *
     * If no option provided, or no metadata defined in the parameter, the blob
     * metadata will be removed.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-blob-metadata
     *
     * @param metadata - Replace existing metadata with this value.
     *                               If no value provided the existing metadata will be removed.
     * @param options - Optional options to Set Metadata operation.
     */
    setMetadata(metadata?: Metadata, options?: BlobSetMetadataOptions): Promise<BlobSetMetadataResponse>;
    /**
     * Sets tags on the underlying blob.
     * A blob can have up to 10 tags. Tag keys must be between 1 and 128 characters.  Tag values must be between 0 and 256 characters.
     * Valid tag key and value characters include lower and upper case letters, digits (0-9),
     * space (' '), plus ('+'), minus ('-'), period ('.'), foward slash ('/'), colon (':'), equals ('='), and underscore ('_').
     *
     * @param tags -
     * @param options -
     */
    setTags(tags: Tags, options?: BlobSetTagsOptions): Promise<BlobSetTagsResponse>;
    /**
     * Gets the tags associated with the underlying blob.
     *
     * @param options -
     */
    getTags(options?: BlobGetTagsOptions): Promise<BlobGetTagsResponse>;
    /**
     * Get a {@link BlobLeaseClient} that manages leases on the blob.
     *
     * @param proposeLeaseId - Initial proposed lease Id.
     * @returns A new BlobLeaseClient object for managing leases on the blob.
     */
    getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient;
    /**
     * Creates a read-only snapshot of a blob.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/snapshot-blob
     *
     * @param options - Optional options to the Blob Create Snapshot operation.
     */
    createSnapshot(options?: BlobCreateSnapshotOptions): Promise<BlobCreateSnapshotResponse>;
    /**
     * Asynchronously copies a blob to a destination within the storage account.
     * This method returns a long running operation poller that allows you to wait
     * indefinitely until the copy is completed.
     * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
     * Note that the onProgress callback will not be invoked if the operation completes in the first
     * request, and attempting to cancel a completed copy will result in an error being thrown.
     *
     * In version 2012-02-12 and later, the source for a Copy Blob operation can be
     * a committed blob in any Azure storage account.
     * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
     * an Azure file in any Azure storage account.
     * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
     * operation to copy from another storage account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/copy-blob
     *
     * ```ts snippet:ClientsBeginCopyFromURL
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     * const blobClient = containerClient.getBlobClient(blobName);
     *
     * // Example using automatic polling
     * const automaticCopyPoller = await blobClient.beginCopyFromURL("url");
     * const automaticResult = await automaticCopyPoller.pollUntilDone();
     *
     * // Example using manual polling
     * const manualCopyPoller = await blobClient.beginCopyFromURL("url");
     * while (!manualCopyPoller.isDone()) {
     *   await manualCopyPoller.poll();
     * }
     * const manualResult = manualCopyPoller.getResult();
     *
     * // Example using progress updates
     * const progressUpdatesCopyPoller = await blobClient.beginCopyFromURL("url", {
     *   onProgress(state) {
     *     console.log(`Progress: ${state.copyProgress}`);
     *   },
     * });
     * const progressUpdatesResult = await progressUpdatesCopyPoller.pollUntilDone();
     *
     * // Example using a changing polling interval (default 15 seconds)
     * const pollingIntervalCopyPoller = await blobClient.beginCopyFromURL("url", {
     *   intervalInMs: 1000, // poll blob every 1 second for copy progress
     * });
     * const pollingIntervalResult = await pollingIntervalCopyPoller.pollUntilDone();
     *
     * // Example using copy cancellation:
     * const cancelCopyPoller = await blobClient.beginCopyFromURL("url");
     * // cancel operation after starting it.
     * try {
     *   await cancelCopyPoller.cancelOperation();
     *   // calls to get the result now throw PollerCancelledError
     *   cancelCopyPoller.getResult();
     * } catch (err: any) {
     *   if (err.name === "PollerCancelledError") {
     *     console.log("The copy was cancelled.");
     *   }
     * }
     * ```
     *
     * @param copySource - url to the source Azure Blob/File.
     * @param options - Optional options to the Blob Start Copy From URL operation.
     */
    beginCopyFromURL(copySource: string, options?: BlobBeginCopyFromURLOptions): Promise<PollerLikeWithCancellation<PollOperationState<BlobBeginCopyFromURLResponse>, BlobBeginCopyFromURLResponse>>;
    /**
     * Aborts a pending asynchronous Copy Blob operation, and leaves a destination blob with zero
     * length and full metadata. Version 2012-02-12 and newer.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/abort-copy-blob
     *
     * @param copyId - Id of the Copy From URL operation.
     * @param options - Optional options to the Blob Abort Copy From URL operation.
     */
    abortCopyFromURL(copyId: string, options?: BlobAbortCopyFromURLOptions): Promise<BlobAbortCopyFromURLResponse>;
    /**
     * The synchronous Copy From URL operation copies a blob or an internet resource to a new blob. It will not
     * return a response until the copy is complete.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/copy-blob-from-url
     *
     * @param copySource - The source URL to copy from, Shared Access Signature(SAS) maybe needed for authentication
     * @param options -
     */
    syncCopyFromURL(copySource: string, options?: BlobSyncCopyFromURLOptions): Promise<BlobCopyFromURLResponse>;
    /**
     * Sets the tier on a blob. The operation is allowed on a page blob in a premium
     * storage account and on a block blob in a blob storage account (locally redundant
     * storage only). A premium page blob's tier determines the allowed size, IOPS,
     * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
     * storage type. This operation does not update the blob's ETag.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-blob-tier
     *
     * @param tier - The tier to be set on the blob. Valid values are Hot, Cool, or Archive.
     * @param options - Optional options to the Blob Set Tier operation.
     */
    setAccessTier(tier: BlockBlobTier | PremiumPageBlobTier | string, options?: BlobSetTierOptions): Promise<BlobSetTierResponse>;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Downloads an Azure Blob in parallel to a buffer.
     * Offset and count are optional, downloads the entire blob if they are not provided.
     *
     * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
     * gigabytes on 64-bit systems due to limitations of Node.js/V8. For blobs larger than this size,
     * consider {@link downloadToFile}.
     *
     * @param offset - From which position of the block blob to download(in bytes)
     * @param count - How much data(in bytes) to be downloaded. Will download to the end when passing undefined
     * @param options - BlobDownloadToBufferOptions
     */
    downloadToBuffer(offset?: number, count?: number, options?: BlobDownloadToBufferOptions): Promise<Buffer>;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Downloads an Azure Blob in parallel to a buffer.
     * Offset and count are optional, downloads the entire blob if they are not provided.
     *
     * Warning: Buffers can only support files up to about one gigabyte on 32-bit systems or about two
     * gigabytes on 64-bit systems due to limitations of Node.js/V8. For blobs larger than this size,
     * consider {@link downloadToFile}.
     *
     * @param buffer - Buffer to be fill, must have length larger than count
     * @param offset - From which position of the block blob to download(in bytes)
     * @param count - How much data(in bytes) to be downloaded. Will download to the end when passing undefined
     * @param options - BlobDownloadToBufferOptions
     */
    downloadToBuffer(buffer: Buffer, offset?: number, count?: number, options?: BlobDownloadToBufferOptions): Promise<Buffer>;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Downloads an Azure Blob to a local file.
     * Fails if the the given file path already exits.
     * Offset and count are optional, pass 0 and undefined respectively to download the entire blob.
     *
     * @param filePath -
     * @param offset - From which position of the block blob to download.
     * @param count - How much data to be downloaded. Will download to the end when passing undefined.
     * @param options - Options to Blob download options.
     * @returns The response data for blob download operation,
     *                                                 but with readableStreamBody set to undefined since its
     *                                                 content is already read and written into a local file
     *                                                 at the specified path.
     */
    downloadToFile(filePath: string, offset?: number, count?: number, options?: BlobDownloadOptions): Promise<BlobDownloadResponseParsed>;
    private getBlobAndContainerNamesFromUrl;
    /**
     * Asynchronously copies a blob to a destination within the storage account.
     * In version 2012-02-12 and later, the source for a Copy Blob operation can be
     * a committed blob in any Azure storage account.
     * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
     * an Azure file in any Azure storage account.
     * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
     * operation to copy from another storage account.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/copy-blob
     *
     * @param copySource - url to the source Azure Blob/File.
     * @param options - Optional options to the Blob Start Copy From URL operation.
     */
    private startCopyFromURL;
    /**
     * Only available for BlobClient constructed with a shared key credential.
     *
     * Generates a Blob Service Shared Access Signature (SAS) URI based on the client properties
     * and parameters passed in. The SAS is signed by the shared key credential of the client.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
     *
     * @param options - Optional parameters.
     * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateSasUrl(options: BlobGenerateSasUrlOptions): Promise<string>;
    /**
     * Only available for BlobClient constructed with a shared key credential.
     *
     * Generates string to sign for a Blob Service Shared Access Signature (SAS) URI based on
     * the client properties and parameters passed in. The SAS is signed by the shared key credential of the client.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
     *
     * @param options - Optional parameters.
     * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateSasStringToSign(options: BlobGenerateSasUrlOptions): string;
    /**
     *
     * Generates a Blob Service Shared Access Signature (SAS) URI based on
     * the client properties and parameters passed in. The SAS is signed by the input user delegation key.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
     *
     * @param options - Optional parameters.
     * @param userDelegationKey -  Return value of `blobServiceClient.getUserDelegationKey()`
     * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateUserDelegationSasUrl(options: BlobGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): Promise<string>;
    /**
     * Only available for BlobClient constructed with a shared key credential.
     *
     * Generates string to sign for a Blob Service Shared Access Signature (SAS) URI based on
     * the client properties and parameters passed in. The SAS is signed by the input user delegation key.
     *
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/constructing-a-service-sas
     *
     * @param options - Optional parameters.
     * @param userDelegationKey -  Return value of `blobServiceClient.getUserDelegationKey()`
     * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
     */
    generateUserDelegationSasStringToSign(options: BlobGenerateSasUrlOptions, userDelegationKey: UserDelegationKey): string;
    /**
     * Delete the immutablility policy on the blob.
     *
     * @param options - Optional options to delete immutability policy on the blob.
     */
    deleteImmutabilityPolicy(options?: BlobDeleteImmutabilityPolicyOptions): Promise<BlobDeleteImmutabilityPolicyResponse>;
    /**
     * Set immutability policy on the blob.
     *
     * @param options - Optional options to set immutability policy on the blob.
     */
    setImmutabilityPolicy(immutabilityPolicy: BlobImmutabilityPolicy, options?: BlobSetImmutabilityPolicyOptions): Promise<BlobSetImmutabilityPolicyResponse>;
    /**
     * Set legal hold on the blob.
     *
     * @param options - Optional options to set legal hold on the blob.
     */
    setLegalHold(legalHoldEnabled: boolean, options?: BlobSetLegalHoldOptions): Promise<BlobSetLegalHoldResponse>;
    /**
     * The Get Account Information operation returns the sku name and account kind
     * for the specified account.
     * The Get Account Information operation is available on service versions beginning
     * with version 2018-03-28.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/get-account-information
     *
     * @param options - Options to the Service Get Account Info operation.
     * @returns Response data for the Service Get Account Info operation.
     */
    getAccountInfo(options?: BlobGetAccountInfoOptions): Promise<BlobGetAccountInfoResponse>;
}
/**
 * Options to configure {@link AppendBlobClient.create} operation.
 */
export interface AppendBlobCreateOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when creating append blobs.
     */
    conditions?: BlobRequestConditions;
    /**
     * HTTP headers to set when creating append blobs. A common header
     * to set is `blobContentType`, enabling the browser to provide functionality
     * based on file type.
     *
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when creating append blobs.
     */
    metadata?: Metadata;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Optional. Specifies immutability policy for a blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    immutabilityPolicy?: BlobImmutabilityPolicy;
    /**
     * Optional. Indicates if a legal hold should be placed on the blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    legalHold?: boolean;
    /**
     * Blob tags.
     */
    tags?: Tags;
}
/**
 * Options to configure {@link AppendBlobClient.createIfNotExists} operation.
 */
export interface AppendBlobCreateIfNotExistsOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * HTTP headers to set when creating append blobs. A common header to set is
     * `blobContentType`, enabling the browser to provide functionality
     * based on file type.
     *
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when creating append blobs.
     */
    metadata?: Metadata;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Optional. Specifies immutability policy for a blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    immutabilityPolicy?: BlobImmutabilityPolicy;
    /**
     * Optional. Indicates if a legal hold should be placed on the blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    legalHold?: boolean;
}
/**
 * Options to configure {@link AppendBlobClient.seal} operation.
 */
export interface AppendBlobSealOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet.
     */
    conditions?: AppendBlobRequestConditions;
}
/**
 * Options to configure the {@link AppendBlobClient.appendBlock} operation.
 */
export interface AppendBlobAppendBlockOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when appending append blob blocks.
     */
    conditions?: AppendBlobRequestConditions;
    /**
     * Callback to receive events on the progress of append block operation.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the append block content. This hash is used to verify the integrity of the append block during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
}
/**
 * Options to configure the {@link AppendBlobClient.appendBlockFromURL} operation.
 */
export interface AppendBlobAppendBlockFromURLOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when appending append blob blocks.
     */
    conditions?: AppendBlobRequestConditions;
    /**
     * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
     */
    sourceConditions?: MatchConditions & ModificationConditions;
    /**
     * An MD5 hash of the append block content from the URI.
     * This hash is used to verify the integrity of the append block during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     */
    sourceContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the append block content from the URI.
     * This hash is used to verify the integrity of the append block during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     */
    sourceContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
     */
    sourceAuthorization?: HttpAuthorization;
}
/**
 * Contains response data for the {@link appendBlobClient.createIfNotExists} operation.
 */
export interface AppendBlobCreateIfNotExistsResponse extends AppendBlobCreateResponse {
    /**
     * Indicate whether the blob is successfully created. Is false when the blob is not changed as it already exists.
     */
    succeeded: boolean;
}
/**
 * AppendBlobClient defines a set of operations applicable to append blobs.
 */
export declare class AppendBlobClient extends BlobClient {
    /**
     * appendBlobsContext provided by protocol layer.
     */
    private appendBlobContext;
    /**
     *
     * Creates an instance of AppendBlobClient.
     *
     * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param containerName - Container name.
     * @param blobName - Blob name.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
    /**
     * Creates an instance of AppendBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param url - A URL string pointing to Azure Storage append blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
    /**
     * Creates an instance of AppendBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param url - A URL string pointing to Azure Storage append blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param pipeline - Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     */
    constructor(url: string, pipeline: PipelineLike);
    /**
     * Creates a new AppendBlobClient object identical to the source but with the
     * specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a Client to the base blob.
     *
     * @param snapshot - The snapshot timestamp.
     * @returns A new AppendBlobClient object identical to the source but with the specified snapshot timestamp.
     */
    withSnapshot(snapshot: string): AppendBlobClient;
    /**
     * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
     * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param options - Options to the Append Block Create operation.
     *
     *
     * Example usage:
     *
     * ```ts snippet:ClientsCreateAppendBlob
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     *
     * const appendBlobClient = containerClient.getAppendBlobClient(blobName);
     * await appendBlobClient.create();
     * ```
     */
    create(options?: AppendBlobCreateOptions): Promise<AppendBlobCreateResponse>;
    /**
     * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
     * If the blob with the same name already exists, the content of the existing blob will remain unchanged.
     * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param options -
     */
    createIfNotExists(options?: AppendBlobCreateIfNotExistsOptions): Promise<AppendBlobCreateIfNotExistsResponse>;
    /**
     * Seals the append blob, making it read only.
     *
     * @param options -
     */
    seal(options?: AppendBlobSealOptions): Promise<AppendBlobAppendBlockResponse>;
    /**
     * Commits a new block of data to the end of the existing append blob.
     * @see https://learn.microsoft.com/rest/api/storageservices/append-block
     *
     * @param body - Data to be appended.
     * @param contentLength - Length of the body in bytes.
     * @param options - Options to the Append Block operation.
     *
     *
     * Example usage:
     *
     * ```ts snippet:ClientsAppendBlock
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     *
     * const content = "Hello World!";
     *
     * // Create a new append blob and append data to the blob.
     * const newAppendBlobClient = containerClient.getAppendBlobClient(blobName);
     * await newAppendBlobClient.create();
     * await newAppendBlobClient.appendBlock(content, content.length);
     *
     * // Append data to an existing append blob.
     * const existingAppendBlobClient = containerClient.getAppendBlobClient(blobName);
     * await existingAppendBlobClient.appendBlock(content, content.length);
     * ```
     */
    appendBlock(body: HttpRequestBody, contentLength: number, options?: AppendBlobAppendBlockOptions): Promise<AppendBlobAppendBlockResponse>;
    /**
     * The Append Block operation commits a new block of data to the end of an existing append blob
     * where the contents are read from a source url.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/append-block-from-url
     *
     * @param sourceURL -
     *                 The url to the blob that will be the source of the copy. A source blob in the same storage account can
     *                 be authenticated via Shared Key. However, if the source is a blob in another account, the source blob
     *                 must either be public or must be authenticated via a shared access signature. If the source blob is
     *                 public, no authentication is required to perform the operation.
     * @param sourceOffset - Offset in source to be appended
     * @param count - Number of bytes to be appended as a block
     * @param options -
     */
    appendBlockFromURL(sourceURL: string, sourceOffset: number, count: number, options?: AppendBlobAppendBlockFromURLOptions): Promise<AppendBlobAppendBlockFromUrlResponse>;
}
/**
 * Options to configure {@link BlockBlobClient.upload} operation.
 */
export interface BlockBlobUploadOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when uploading to the block blob.
     */
    conditions?: BlobRequestConditions;
    /**
     * HTTP headers to set when uploading to a block blob. A common header to set is
     * `blobContentType`, enabling the browser to provide functionality
     * based on file type.
     *
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when uploading to a block blob.
     */
    metadata?: Metadata;
    /**
     * Callback to receive events on the progress of upload operation.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: BlockBlobTier | string;
    /**
     * Optional. Specifies immutability policy for a blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    immutabilityPolicy?: BlobImmutabilityPolicy;
    /**
     * Optional. Indicates if a legal hold should be placed on the blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    legalHold?: boolean;
    /**
     * Blob tags.
     */
    tags?: Tags;
}
/**
 * Options to configure {@link BlockBlobClient.syncUploadFromURL} operation.
 */
export interface BlockBlobSyncUploadFromURLOptions extends CommonOptions {
    /**
     * Server timeout in seconds.
     * For more information, @see https://learn.microsoft.com/en-us/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations
     */
    timeoutInSeconds?: number;
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Optional. Specifies a user-defined name-value pair associated with the blob. If no name-value
     * pairs are specified, the operation will copy the metadata from the source blob or file to the
     * destination blob. If one or more name-value pairs are specified, the destination blob is
     * created with the specified metadata, and metadata is not copied from the source blob or file.
     * Note that beginning with version 2009-09-19, metadata names must adhere to the naming rules
     * for C# identifiers. See Naming and Referencing Containers, Blobs, and Metadata for more
     * information.
     */
    metadata?: Metadata;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: BlockBlobTier | string;
    /**
     * Specify the md5 calculated for the range of bytes that must be read from the copy source.
     */
    sourceContentMD5?: Uint8Array;
    /**
     * Blob tags.
     */
    tags?: Tags;
    /**
     * Optional, default is true.  Indicates if properties from the source blob should be copied.
     */
    copySourceBlobProperties?: boolean;
    /**
     * HTTP headers to set when uploading to a block blob.
     *
     * A common header to set is `blobContentType`, enabling the browser to provide functionality
     * based on file type.
     *
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Conditions to meet for the destination Azure Blob.
     */
    conditions?: BlobRequestConditions;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Conditions to meet for the source Azure Blob.
     */
    sourceConditions?: ModifiedAccessConditions;
    /**
     * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
     */
    sourceAuthorization?: HttpAuthorization;
    /**
     * Optional, default 'replace'.  Indicates if source tags should be copied or replaced with the tags specified by {@link tags}.
     */
    copySourceTags?: BlobCopySourceTags;
}
/**
 * Blob query error type.
 */
export interface BlobQueryError {
    /**
     * Whether error is fatal. Fatal error will stop query.
     */
    isFatal: boolean;
    /**
     * Error name.
     */
    name: string;
    /**
     * Position in bytes of the query.
     */
    position: number;
    /**
     * Error description.
     */
    description: string;
}
/**
 * Options to query blob with JSON format.
 */
export interface BlobQueryJsonTextConfiguration {
    /**
     * Record separator.
     */
    recordSeparator: string;
    /**
     * Query for a JSON format blob.
     */
    kind: "json";
}
/**
 * Options to query blob with CSV format.
 */
export interface BlobQueryCsvTextConfiguration {
    /**
     * Record separator.
     */
    recordSeparator: string;
    /**
     * Query for a CSV format blob.
     */
    kind: "csv";
    /**
     * Column separator. Default is ",".
     */
    columnSeparator?: string;
    /**
     * Field quote.
     */
    fieldQuote?: string;
    /**
     * Escape character.
     */
    escapeCharacter?: string;
    /**
     * Has headers. Default is false.
     */
    hasHeaders?: boolean;
}
/**
 * Options to query blob with Apache Arrow format. Only valid for {@link BlockBlobQueryOptions.outputTextConfiguration}.
 */
export interface BlobQueryArrowConfiguration {
    /**
     * Kind.
     */
    kind: "arrow";
    /**
     * List of {@link BlobQueryArrowField} describing the schema of the data.
     */
    schema: BlobQueryArrowField[];
}
/**
 * Options to query blob with Parquet format. Only valid for {@link BlockBlobQueryOptions.inputTextConfiguration}.
 */
export interface BlobQueryParquetConfiguration {
    /**
     * Kind.
     */
    kind: "parquet";
}
/**
 * Options to configure {@link BlockBlobClient.query} operation.
 */
export interface BlockBlobQueryOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Configurations for the query input.
     */
    inputTextConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration | BlobQueryParquetConfiguration;
    /**
     * Configurations for the query output.
     */
    outputTextConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration | BlobQueryArrowConfiguration;
    /**
     * Callback to receive events on the progress of query operation.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Callback to receive error events during the query operaiton.
     */
    onError?: (error: BlobQueryError) => void;
    /**
     * Conditions to meet when uploading to the block blob.
     */
    conditions?: BlobRequestConditions;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
}
/**
 * Options to configure {@link BlockBlobClient.stageBlock} operation.
 */
export interface BlockBlobStageBlockOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     */
    conditions?: LeaseAccessConditions;
    /**
     * Callback to receive events on the progress of stage block operation.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the block content. This hash is used to verify the integrity of the block during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
}
/**
 * Options to configure {@link BlockBlobClient.stageBlockFromURL} operation.
 */
export interface BlockBlobStageBlockFromURLOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Specifies the bytes of the source Blob/File to upload.
     * If not specified, the entire content is uploaded as a single block.
     */
    range?: Range;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     */
    conditions?: LeaseAccessConditions;
    /**
     * An MD5 hash of the content from the URI.
     * This hash is used to verify the integrity of the content during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     */
    sourceContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the content from the URI.
     * This hash is used to verify the integrity of the content during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     */
    sourceContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
     */
    sourceAuthorization?: HttpAuthorization;
}
/**
 * Options to configure {@link BlockBlobClient.commitBlockList} operation.
 */
export interface BlockBlobCommitBlockListOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when committing the block list.
     */
    conditions?: BlobRequestConditions;
    /**
     * HTTP headers to set when committing block list.
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when committing block list.
     */
    metadata?: Metadata;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Optional. Specifies immutability policy for a blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    immutabilityPolicy?: BlobImmutabilityPolicy;
    /**
     * Optional. Indicates if a legal hold should be placed on the blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    legalHold?: boolean;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: BlockBlobTier | string;
    /**
     * Blob tags.
     */
    tags?: Tags;
}
/**
 * Options to configure {@link BlockBlobClient.getBlockList} operation.
 */
export interface BlockBlobGetBlockListOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * If specified, contains the lease id that must be matched and lease with this id
     * must be active in order for the operation to succeed.
     */
    conditions?: LeaseAccessConditions & TagConditions;
}
/**
 * Option interface for the {@link BlockBlobClient.uploadStream} operation.
 */
export interface BlockBlobUploadStreamOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Blob HTTP Headers.
     *
     * A common header to set is `blobContentType`, enabling the
     * browser to provide functionality based on file type.
     *
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Metadata of block blob.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Access conditions headers.
     */
    conditions?: BlobRequestConditions;
    /**
     * Progress updater.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Blob tags.
     */
    tags?: Tags;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: BlockBlobTier | string;
}
/**
 * Option interface for {@link BlockBlobClient.uploadFile} and {@link BlockBlobClient.uploadSeekableStream}.
 */
export interface BlockBlobParallelUploadOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Destination block blob size in bytes.
     */
    blockSize?: number;
    /**
     * Blob size threshold in bytes to start concurrency uploading.
     * Default value is 256MB, blob size less than this option will
     * be uploaded via one I/O operation without concurrency.
     * You can customize a value less equal than the default value.
     */
    maxSingleShotSize?: number;
    /**
     * Progress updater.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * Blob HTTP Headers. A common header to set is
     * `blobContentType`, enabling the browser to provide
     * functionality based on file type.
     *
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * Metadata of block blob.
     */
    metadata?: {
        [propertyName: string]: string;
    };
    /**
     * Access conditions headers.
     */
    conditions?: BlobRequestConditions;
    /**
     * Concurrency of parallel uploading. Must be greater than or equal to 0.
     */
    concurrency?: number;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Blob tags.
     */
    tags?: Tags;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: BlockBlobTier | string;
}
/**
 * Response type for {@link BlockBlobClient.uploadFile}, {@link BlockBlobClient.uploadStream}, and
 * {@link BlockBlobClient.uploadBrowserDate}.
 */
export type BlobUploadCommonResponse = WithResponse<BlockBlobUploadHeaders>;
/**
 * BlockBlobClient defines a set of operations applicable to block blobs.
 */
export declare class BlockBlobClient extends BlobClient {
    /**
     * blobContext provided by protocol layer.
     *
     * Note. Ideally BlobClient should set BlobClient.blobContext to protected. However, API
     * extractor has issue blocking that. Here we redecelare _blobContext in BlockBlobClient.
     */
    private _blobContext;
    /**
     * blockBlobContext provided by protocol layer.
     */
    private blockBlobContext;
    /**
     *
     * Creates an instance of BlockBlobClient.
     *
     * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param containerName - Container name.
     * @param blobName - Blob name.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
    /**
     * Creates an instance of BlockBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param url - A URL string pointing to Azure Storage block blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
    /**
     * Creates an instance of BlockBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param url - A URL string pointing to Azure Storage block blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
     *                     append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param pipeline - Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     */
    constructor(url: string, pipeline: PipelineLike);
    /**
     * Creates a new BlockBlobClient object identical to the source but with the
     * specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a URL to the base blob.
     *
     * @param snapshot - The snapshot timestamp.
     * @returns A new BlockBlobClient object identical to the source but with the specified snapshot timestamp.
     */
    withSnapshot(snapshot: string): BlockBlobClient;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Quick query for a JSON or CSV formatted blob.
     *
     * Example usage (Node.js):
     *
     * ```ts snippet:ClientsQuery
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     * const blockBlobClient = containerClient.getBlockBlobClient(blobName);
     *
     * // Query and convert a blob to a string
     * const queryBlockBlobResponse = await blockBlobClient.query("select from BlobStorage");
     * if (queryBlockBlobResponse.readableStreamBody) {
     *   const downloadedBuffer = await streamToBuffer(queryBlockBlobResponse.readableStreamBody);
     *   const downloaded = downloadedBuffer.toString();
     *   console.log(`Query blob content: ${downloaded}`);
     * }
     *
     * async function streamToBuffer(readableStream: NodeJS.ReadableStream): Promise<Buffer> {
     *   return new Promise((resolve, reject) => {
     *     const chunks: Buffer[] = [];
     *     readableStream.on("data", (data) => {
     *       chunks.push(data instanceof Buffer ? data : Buffer.from(data));
     *     });
     *     readableStream.on("end", () => {
     *       resolve(Buffer.concat(chunks));
     *     });
     *     readableStream.on("error", reject);
     *   });
     * }
     * ```
     *
     * @param query -
     * @param options -
     */
    query(query: string, options?: BlockBlobQueryOptions): Promise<BlobDownloadResponseModel>;
    /**
     * Creates a new block blob, or updates the content of an existing block blob.
     * Updating an existing block blob overwrites any existing metadata on the blob.
     * Partial updates are not supported; the content of the existing blob is
     * overwritten with the new content. To perform a partial update of a block blob's,
     * use {@link stageBlock} and {@link commitBlockList}.
     *
     * This is a non-parallel uploading method, please use {@link uploadFile},
     * {@link uploadStream} or {@link uploadBrowserData} for better performance
     * with concurrency uploading.
     *
     * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param body - Blob, string, ArrayBuffer, ArrayBufferView or a function
     *                               which returns a new Readable stream whose offset is from data source beginning.
     * @param contentLength - Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
     *                               string including non non-Base64/Hex-encoded characters.
     * @param options - Options to the Block Blob Upload operation.
     * @returns Response data for the Block Blob Upload operation.
     *
     * Example usage:
     *
     * ```ts snippet:ClientsUpload
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     * const blockBlobClient = containerClient.getBlockBlobClient(blobName);
     *
     * const content = "Hello world!";
     * const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
     * ```
     */
    upload(body: HttpRequestBody, contentLength: number, options?: BlockBlobUploadOptions): Promise<BlockBlobUploadResponse>;
    /**
     * Creates a new Block Blob where the contents of the blob are read from a given URL.
     * This API is supported beginning with the 2020-04-08 version. Partial updates
     * are not supported with Put Blob from URL; the content of an existing blob is overwritten with
     * the content of the new blob.  To perform partial updates to a block blob’s contents using a
     * source URL, use {@link stageBlockFromURL} and {@link commitBlockList}.
     *
     * @param sourceURL - Specifies the URL of the blob. The value
     *                           may be a URL of up to 2 KB in length that specifies a blob.
     *                           The value should be URL-encoded as it would appear
     *                           in a request URI. The source blob must either be public
     *                           or must be authenticated via a shared access signature.
     *                           If the source blob is public, no authentication is required
     *                           to perform the operation. Here are some examples of source object URLs:
     *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
     *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
     * @param options - Optional parameters.
     */
    syncUploadFromURL(sourceURL: string, options?: BlockBlobSyncUploadFromURLOptions): Promise<BlockBlobPutBlobFromUrlResponse>;
    /**
     * Uploads the specified block to the block blob's "staging area" to be later
     * committed by a call to commitBlockList.
     * @see https://learn.microsoft.com/rest/api/storageservices/put-block
     *
     * @param blockId - A 64-byte value that is base64-encoded
     * @param body - Data to upload to the staging area.
     * @param contentLength - Number of bytes to upload.
     * @param options - Options to the Block Blob Stage Block operation.
     * @returns Response data for the Block Blob Stage Block operation.
     */
    stageBlock(blockId: string, body: HttpRequestBody, contentLength: number, options?: BlockBlobStageBlockOptions): Promise<BlockBlobStageBlockResponse>;
    /**
     * The Stage Block From URL operation creates a new block to be committed as part
     * of a blob where the contents are read from a URL.
     * This API is available starting in version 2018-03-28.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/put-block-from-url
     *
     * @param blockId - A 64-byte value that is base64-encoded
     * @param sourceURL - Specifies the URL of the blob. The value
     *                           may be a URL of up to 2 KB in length that specifies a blob.
     *                           The value should be URL-encoded as it would appear
     *                           in a request URI. The source blob must either be public
     *                           or must be authenticated via a shared access signature.
     *                           If the source blob is public, no authentication is required
     *                           to perform the operation. Here are some examples of source object URLs:
     *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
     *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
     * @param offset - From which position of the blob to download, greater than or equal to 0
     * @param count - How much data to be downloaded, greater than 0. Will download to the end when undefined
     * @param options - Options to the Block Blob Stage Block From URL operation.
     * @returns Response data for the Block Blob Stage Block From URL operation.
     */
    stageBlockFromURL(blockId: string, sourceURL: string, offset?: number, count?: number, options?: BlockBlobStageBlockFromURLOptions): Promise<BlockBlobStageBlockFromURLResponse>;
    /**
     * Writes a blob by specifying the list of block IDs that make up the blob.
     * In order to be written as part of a blob, a block must have been successfully written
     * to the server in a prior {@link stageBlock} operation. You can call {@link commitBlockList} to
     * update a blob by uploading only those blocks that have changed, then committing the new and existing
     * blocks together. Any blocks not specified in the block list and permanently deleted.
     * @see https://learn.microsoft.com/rest/api/storageservices/put-block-list
     *
     * @param blocks -  Array of 64-byte value that is base64-encoded
     * @param options - Options to the Block Blob Commit Block List operation.
     * @returns Response data for the Block Blob Commit Block List operation.
     */
    commitBlockList(blocks: string[], options?: BlockBlobCommitBlockListOptions): Promise<BlockBlobCommitBlockListResponse>;
    /**
     * Returns the list of blocks that have been uploaded as part of a block blob
     * using the specified block list filter.
     * @see https://learn.microsoft.com/rest/api/storageservices/get-block-list
     *
     * @param listType - Specifies whether to return the list of committed blocks,
     *                                        the list of uncommitted blocks, or both lists together.
     * @param options - Options to the Block Blob Get Block List operation.
     * @returns Response data for the Block Blob Get Block List operation.
     */
    getBlockList(listType: BlockListType, options?: BlockBlobGetBlockListOptions): Promise<BlockBlobGetBlockListResponse>;
    /**
     * Uploads a Buffer(Node.js)/Blob(browsers)/ArrayBuffer/ArrayBufferView object to a BlockBlob.
     *
     * When data length is no more than the specifiled {@link BlockBlobParallelUploadOptions.maxSingleShotSize} (default is
     * {@link BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}), this method will use 1 {@link upload} call to finish the upload.
     * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call {@link commitBlockList}
     * to commit the block list.
     *
     * A common {@link BlockBlobParallelUploadOptions.blobHTTPHeaders} option to set is
     * `blobContentType`, enabling the browser to provide
     * functionality based on file type.
     *
     * @param data - Buffer(Node.js), Blob, ArrayBuffer or ArrayBufferView
     * @param options -
     */
    uploadData(data: Buffer | Blob | ArrayBuffer | ArrayBufferView, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
    /**
     * ONLY AVAILABLE IN BROWSERS.
     *
     * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to block blob.
     *
     * When buffer length lesser than or equal to 256MB, this method will use 1 upload call to finish the upload.
     * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call
     * {@link commitBlockList} to commit the block list.
     *
     * A common {@link BlockBlobParallelUploadOptions.blobHTTPHeaders} option to set is
     * `blobContentType`, enabling the browser to provide
     * functionality based on file type.
     *
     * @deprecated Use {@link uploadData} instead.
     *
     * @param browserData - Blob, File, ArrayBuffer or ArrayBufferView
     * @param options - Options to upload browser data.
     * @returns Response data for the Blob Upload operation.
     */
    uploadBrowserData(browserData: Blob | ArrayBuffer | ArrayBufferView, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
    /**
     *
     * Uploads data to block blob. Requires a bodyFactory as the data source,
     * which need to return a {@link HttpRequestBody} object with the offset and size provided.
     *
     * When data length is no more than the specified {@link BlockBlobParallelUploadOptions.maxSingleShotSize} (default is
     * {@link BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}), this method will use 1 {@link upload} call to finish the upload.
     * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call {@link commitBlockList}
     * to commit the block list.
     *
     * @param bodyFactory -
     * @param size - size of the data to upload.
     * @param options - Options to Upload to Block Blob operation.
     * @returns Response data for the Blob Upload operation.
     */
    private uploadSeekableInternal;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Uploads a local file in blocks to a block blob.
     *
     * When file size lesser than or equal to 256MB, this method will use 1 upload call to finish the upload.
     * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
     * to commit the block list.
     *
     * @param filePath - Full path of local file
     * @param options - Options to Upload to Block Blob operation.
     * @returns Response data for the Blob Upload operation.
     */
    uploadFile(filePath: string, options?: BlockBlobParallelUploadOptions): Promise<BlobUploadCommonResponse>;
    /**
     * ONLY AVAILABLE IN NODE.JS RUNTIME.
     *
     * Uploads a Node.js Readable stream into block blob.
     *
     * PERFORMANCE IMPROVEMENT TIPS:
     * * Input stream highWaterMark is better to set a same value with bufferSize
     *    parameter, which will avoid Buffer.concat() operations.
     *
     * @param stream - Node.js Readable stream
     * @param bufferSize - Size of every buffer allocated, also the block size in the uploaded block blob. Default value is 8MB
     * @param maxConcurrency -  Max concurrency indicates the max number of buffers that can be allocated,
     *                                 positive correlation with max uploading concurrency. Default value is 5
     * @param options - Options to Upload Stream to Block Blob operation.
     * @returns Response data for the Blob Upload operation.
     */
    uploadStream(stream: Readable, bufferSize?: number, maxConcurrency?: number, options?: BlockBlobUploadStreamOptions): Promise<BlobUploadCommonResponse>;
}
/**
 * Options to configure the {@link PageBlobClient.create} operation.
 */
export interface PageBlobCreateOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when creating a page blob.
     */
    conditions?: BlobRequestConditions;
    /**
     * A user-controlled value that can be used to track requests.
     * The value must be between 0 and 2^63 - 1. The default value is 0.
     */
    blobSequenceNumber?: number;
    /**
     * HTTP headers to set when creating a page blob.
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when creating append blobs.
     */
    metadata?: Metadata;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Optional. Specifies immutability policy for a blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    immutabilityPolicy?: BlobImmutabilityPolicy;
    /**
     * Optional. Indicates if a legal hold should be placed on the blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    legalHold?: boolean;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: PremiumPageBlobTier | string;
    /**
     * Blob tags.
     */
    tags?: Tags;
}
/**
 * Options to configure the {@link PageBlobClient.createIfNotExists} operation.
 */
export interface PageBlobCreateIfNotExistsOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * A user-controlled value that can be used to track requests.
     * The value must be between 0 and 2^63 - 1. The default value is 0.
     */
    blobSequenceNumber?: number;
    /**
     * HTTP headers to set when creating a page blob.
     */
    blobHTTPHeaders?: BlobHTTPHeaders;
    /**
     * A collection of key-value string pair to associate with the blob when creating append blobs.
     */
    metadata?: Metadata;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Optional. Specifies immutability policy for a blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    immutabilityPolicy?: BlobImmutabilityPolicy;
    /**
     * Optional. Indicates if a legal hold should be placed on the blob.
     * Note that is parameter is only applicable to a blob within a container that
     * has version level worm enabled.
     */
    legalHold?: boolean;
    /**
     * Access tier.
     * More Details - https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
     */
    tier?: PremiumPageBlobTier | string;
}
/**
 * Options to configure the {@link PageBlobClient.uploadPages} operation.
 */
export interface PageBlobUploadPagesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when uploading pages.
     */
    conditions?: PageBlobRequestConditions;
    /**
     * Callback to receive events on the progress of upload pages operation.
     */
    onProgress?: (progress: TransferProgressEvent) => void;
    /**
     * An MD5 hash of the content. This hash is used to verify the integrity of the content during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     */
    transactionalContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the content. This hash is used to verify the integrity of the content during transport.
     * When this is specified, the storage service compares the hash of the content that has arrived with this value.
     *
     * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
     */
    transactionalContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
}
/**
 * Options to configure the {@link PageBlobClient.clearPages} operation.
 */
export interface PageBlobClearPagesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when clearing pages.
     */
    conditions?: PageBlobRequestConditions;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
}
/**
 * Options to configure the {@link PageBlobClient.getPageRanges} operation.
 */
export interface PageBlobGetPageRangesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when getting page ranges.
     */
    conditions?: BlobRequestConditions;
}
/**
 * Options to configure the {@link PageBlobClient.listPageRanges} operation.
 */
export interface PageBlobListPageRangesOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when getting page ranges.
     */
    conditions?: BlobRequestConditions;
}
/**
 * Options to configure the {@link PageBlobClient.getRangesDiff} operation.
 */
export interface PageBlobGetPageRangesDiffOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when getting page ranges diff.
     */
    conditions?: BlobRequestConditions;
    /**
     * (unused)
     */
    range?: string;
}
/**
 * Options to configure the {@link PageBlobClient.listPageRangesDiff} operation.
 */
export interface PageBlobListPageRangesDiffOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when getting page ranges diff.
     */
    conditions?: BlobRequestConditions;
}
/**
 * Options to configure {@link PageBlobClient.resize} operation.
 */
export interface PageBlobResizeOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when resizing a page blob.
     */
    conditions?: BlobRequestConditions;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
}
/**
 * Options to configure {@link PageBlobClient.updateSequenceNumber} operation.
 */
export interface PageBlobUpdateSequenceNumberOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when updating sequence number.
     */
    conditions?: BlobRequestConditions;
}
/**
 * Options to configure {@link PageBlobClient.startCopyIncremental} operation.
 */
export interface PageBlobStartCopyIncrementalOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when starting a copy incremental operation.
     */
    conditions?: ModifiedAccessConditions;
}
/**
 * Options to configure {@link PageBlobClient.uploadPagesFromURL} operation.
 */
export interface PageBlobUploadPagesFromURLOptions extends CommonOptions {
    /**
     * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
     * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Conditions to meet when updating sequence number.
     */
    conditions?: PageBlobRequestConditions;
    /**
     * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
     */
    sourceConditions?: MatchConditions & ModificationConditions;
    /**
     * An MD5 hash of the content from the URI.
     * This hash is used to verify the integrity of the content during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     */
    sourceContentMD5?: Uint8Array;
    /**
     * A CRC64 hash of the content from the URI.
     * This hash is used to verify the integrity of the content during transport of the data from the URI.
     * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
     *
     * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
     */
    sourceContentCrc64?: Uint8Array;
    /**
     * Customer Provided Key Info.
     */
    customerProvidedKey?: CpkInfo;
    /**
     * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
     * encrypt the data provided in the request. If not specified, encryption is performed with the
     * default account encryption scope.  For more information, see Encryption at Rest for Azure
     * Storage Services.
     */
    encryptionScope?: string;
    /**
     * Only Bearer type is supported. Credentials should be a valid OAuth access token to copy source.
     */
    sourceAuthorization?: HttpAuthorization;
}
/**
 * Contains response data for the {@link PageBlobClient.createIfNotExists} operation.
 */
export interface PageBlobCreateIfNotExistsResponse extends PageBlobCreateResponse {
    /**
     * Indicate whether the blob is successfully created. Is false when the blob is not changed as it already exists.
     */
    succeeded: boolean;
}
/**
 * PageBlobClient defines a set of operations applicable to page blobs.
 */
export declare class PageBlobClient extends BlobClient {
    /**
     * pageBlobsContext provided by protocol layer.
     */
    private pageBlobContext;
    /**
     *
     * Creates an instance of PageBlobClient.
     *
     * @param connectionString - Account connection string or a SAS connection string of an Azure storage account.
     *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
     *                                  Account connection string example -
     *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
     *                                  SAS connection string example -
     *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
     * @param containerName - Container name.
     * @param blobName - Blob name.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions);
    /**
     * Creates an instance of PageBlobClient.
     * This method accepts an encoded URL or non-encoded URL pointing to a blob.
     * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     * If a blob name includes ? or %, blob name must be encoded in the URL.
     *
     * @param url - A Client string pointing to Azure Storage page blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can append a SAS
     *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
     * @param credential -  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the `@azure/identity` package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
     * @param options - Optional. Options to configure the HTTP pipeline.
     */
    constructor(url: string, credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions);
    /**
     * Creates an instance of PageBlobClient.
     *
     * @param url - A URL string pointing to Azure Storage page blob, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob".
     *                     You can append a SAS if using AnonymousCredential, such as
     *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
     *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
     *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
     *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
     *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
     * @param pipeline - Call newPipeline() to create a default
     *                            pipeline, or provide a customized pipeline.
     */
    constructor(url: string, pipeline: PipelineLike);
    /**
     * Creates a new PageBlobClient object identical to the source but with the
     * specified snapshot timestamp.
     * Provide "" will remove the snapshot and return a Client to the base blob.
     *
     * @param snapshot - The snapshot timestamp.
     * @returns A new PageBlobClient object identical to the source but with the specified snapshot timestamp.
     */
    withSnapshot(snapshot: string): PageBlobClient;
    /**
     * Creates a page blob of the specified length. Call uploadPages to upload data
     * data to a page blob.
     * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param size - size of the page blob.
     * @param options - Options to the Page Blob Create operation.
     * @returns Response data for the Page Blob Create operation.
     */
    create(size: number, options?: PageBlobCreateOptions): Promise<PageBlobCreateResponse>;
    /**
     * Creates a page blob of the specified length. Call uploadPages to upload data
     * data to a page blob. If the blob with the same name already exists, the content
     * of the existing blob will remain unchanged.
     * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
     *
     * @param size - size of the page blob.
     * @param options -
     */
    createIfNotExists(size: number, options?: PageBlobCreateIfNotExistsOptions): Promise<PageBlobCreateIfNotExistsResponse>;
    /**
     * Writes 1 or more pages to the page blob. The start and end offsets must be a multiple of 512.
     * @see https://learn.microsoft.com/rest/api/storageservices/put-page
     *
     * @param body - Data to upload
     * @param offset - Offset of destination page blob
     * @param count - Content length of the body, also number of bytes to be uploaded
     * @param options - Options to the Page Blob Upload Pages operation.
     * @returns Response data for the Page Blob Upload Pages operation.
     */
    uploadPages(body: HttpRequestBody, offset: number, count: number, options?: PageBlobUploadPagesOptions): Promise<PageBlobUploadPagesResponse>;
    /**
     * The Upload Pages operation writes a range of pages to a page blob where the
     * contents are read from a URL.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/put-page-from-url
     *
     * @param sourceURL - Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication
     * @param sourceOffset - The source offset to copy from. Pass 0 to copy from the beginning of source page blob
     * @param destOffset - Offset of destination page blob
     * @param count - Number of bytes to be uploaded from source page blob
     * @param options -
     */
    uploadPagesFromURL(sourceURL: string, sourceOffset: number, destOffset: number, count: number, options?: PageBlobUploadPagesFromURLOptions): Promise<PageBlobUploadPagesFromURLResponse>;
    /**
     * Frees the specified pages from the page blob.
     * @see https://learn.microsoft.com/rest/api/storageservices/put-page
     *
     * @param offset - Starting byte position of the pages to clear.
     * @param count - Number of bytes to clear.
     * @param options - Options to the Page Blob Clear Pages operation.
     * @returns Response data for the Page Blob Clear Pages operation.
     */
    clearPages(offset?: number, count?: number, options?: PageBlobClearPagesOptions): Promise<PageBlobClearPagesResponse>;
    /**
     * Returns the list of valid page ranges for a page blob or snapshot of a page blob.
     * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param options - Options to the Page Blob Get Ranges operation.
     * @returns Response data for the Page Blob Get Ranges operation.
     */
    getPageRanges(offset?: number, count?: number, options?: PageBlobGetPageRangesOptions): Promise<PageBlobGetPageRangesResponse>;
    /**
     * getPageRangesSegment returns a single segment of page ranges starting from the
     * specified Marker. Use an empty Marker to start enumeration from the beginning.
     * After getting a segment, process it, and then call getPageRangesSegment again
     * (passing the the previously-returned Marker) to get the next segment.
     * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param marker - A string value that identifies the portion of the list to be returned with the next list operation.
     * @param options - Options to PageBlob Get Page Ranges Segment operation.
     */
    private listPageRangesSegment;
    /**
     * Returns an AsyncIterableIterator for {@link PageBlobGetPageRangesResponseModel}
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param marker - A string value that identifies the portion of
     *                          the get of page ranges to be returned with the next getting operation. The
     *                          operation returns the ContinuationToken value within the response body if the
     *                          getting operation did not return all page ranges remaining within the current page.
     *                          The ContinuationToken value can be used as the value for
     *                          the marker parameter in a subsequent call to request the next page of get
     *                          items. The marker value is opaque to the client.
     * @param options - Options to List Page Ranges operation.
     */
    private listPageRangeItemSegments;
    /**
     * Returns an AsyncIterableIterator of {@link PageRangeInfo} objects
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param options - Options to List Page Ranges operation.
     */
    private listPageRangeItems;
    /**
     * Returns an async iterable iterator to list of page ranges for a page blob.
     * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     *  .byPage() returns an async iterable iterator to list of page ranges for a page blob.
     *
     * ```ts snippet:ClientsListPageBlobs
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     * const pageBlobClient = containerClient.getPageBlobClient(blobName);
     *
     * // Example using `for await` syntax
     * let i = 1;
     * for await (const pageRange of pageBlobClient.listPageRanges()) {
     *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
     * }
     *
     * // Example using `iter.next()` syntax
     * i = 1;
     * const iter = pageBlobClient.listPageRanges();
     * let { value, done } = await iter.next();
     * while (!done) {
     *   console.log(`Page range ${i++}: ${value.start} - ${value.end}`);
     *   ({ value, done } = await iter.next());
     * }
     *
     * // Example using `byPage()` syntax
     * i = 1;
     * for await (const page of pageBlobClient.listPageRanges().byPage({ maxPageSize: 20 })) {
     *   for (const pageRange of page.pageRange || []) {
     *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
     *   }
     * }
     *
     * // Example using paging with a marker
     * i = 1;
     * let iterator = pageBlobClient.listPageRanges().byPage({ maxPageSize: 2 });
     * let response = (await iterator.next()).value;
     * // Prints 2 page ranges
     * if (response.pageRange) {
     *   for (const pageRange of response.pageRange) {
     *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
     *   }
     * }
     * // Gets next marker
     * let marker = response.continuationToken;
     * // Passing next marker as continuationToken
     * iterator = pageBlobClient.listPageRanges().byPage({ continuationToken: marker, maxPageSize: 10 });
     * response = (await iterator.next()).value;
     * // Prints 10 page ranges
     * if (response.pageRange) {
     *   for (const pageRange of response.pageRange) {
     *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
     *   }
     * }
     * ```
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param options - Options to the Page Blob Get Ranges operation.
     * @returns An asyncIterableIterator that supports paging.
     */
    listPageRanges(offset?: number, count?: number, options?: PageBlobListPageRangesOptions): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesResponseModel>;
    /**
     * Gets the collection of page ranges that differ between a specified snapshot and this page blob.
     * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     * @param offset - Starting byte position of the page blob
     * @param count - Number of bytes to get ranges diff.
     * @param prevSnapshot - Timestamp of snapshot to retrieve the difference.
     * @param options - Options to the Page Blob Get Page Ranges Diff operation.
     * @returns Response data for the Page Blob Get Page Range Diff operation.
     */
    getPageRangesDiff(offset: number, count: number, prevSnapshot: string, options?: PageBlobGetPageRangesDiffOptions): Promise<PageBlobGetPageRangesDiffResponse>;
    /**
     * getPageRangesDiffSegment returns a single segment of page ranges starting from the
     * specified Marker for difference between previous snapshot and the target page blob.
     * Use an empty Marker to start enumeration from the beginning.
     * After getting a segment, process it, and then call getPageRangesDiffSegment again
     * (passing the the previously-returned Marker) to get the next segment.
     * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
     * @param marker - A string value that identifies the portion of the get to be returned with the next get operation.
     * @param options - Options to the Page Blob Get Page Ranges Diff operation.
     */
    private listPageRangesDiffSegment;
    /**
     * Returns an AsyncIterableIterator for {@link PageBlobGetPageRangesDiffResponseModel}
     *
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
     * @param marker - A string value that identifies the portion of
     *                          the get of page ranges to be returned with the next getting operation. The
     *                          operation returns the ContinuationToken value within the response body if the
     *                          getting operation did not return all page ranges remaining within the current page.
     *                          The ContinuationToken value can be used as the value for
     *                          the marker parameter in a subsequent call to request the next page of get
     *                          items. The marker value is opaque to the client.
     * @param options - Options to the Page Blob Get Page Ranges Diff operation.
     */
    private listPageRangeDiffItemSegments;
    /**
     * Returns an AsyncIterableIterator of {@link PageRangeInfo} objects
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
     * @param options - Options to the Page Blob Get Page Ranges Diff operation.
     */
    private listPageRangeDiffItems;
    /**
     * Returns an async iterable iterator to list of page ranges that differ between a specified snapshot and this page blob.
     * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     *  .byPage() returns an async iterable iterator to list of page ranges that differ between a specified snapshot and this page blob.
     *
     * ```ts snippet:ClientsListPageBlobsDiff
     * import { BlobServiceClient } from "@azure/storage-blob";
     * import { DefaultAzureCredential } from "@azure/identity";
     *
     * const account = "<account>";
     * const blobServiceClient = new BlobServiceClient(
     *   `https://${account}.blob.core.windows.net`,
     *   new DefaultAzureCredential(),
     * );
     *
     * const containerName = "<container name>";
     * const blobName = "<blob name>";
     * const containerClient = blobServiceClient.getContainerClient(containerName);
     * const pageBlobClient = containerClient.getPageBlobClient(blobName);
     *
     * const offset = 0;
     * const count = 1024;
     * const previousSnapshot = "<previous snapshot>";
     * // Example using `for await` syntax
     * let i = 1;
     * for await (const pageRange of pageBlobClient.listPageRangesDiff(offset, count, previousSnapshot)) {
     *   console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
     * }
     *
     * // Example using `iter.next()` syntax
     * i = 1;
     * const iter = pageBlobClient.listPageRangesDiff(offset, count, previousSnapshot);
     * let { value, done } = await iter.next();
     * while (!done) {
     *   console.log(`Page range ${i++}: ${value.start} - ${value.end}`);
     *   ({ value, done } = await iter.next());
     * }
     *
     * // Example using `byPage()` syntax
     * i = 1;
     * for await (const page of pageBlobClient
     *   .listPageRangesDiff(offset, count, previousSnapshot)
     *   .byPage({ maxPageSize: 20 })) {
     *   for (const pageRange of page.pageRange || []) {
     *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
     *   }
     * }
     *
     * // Example using paging with a marker
     * i = 1;
     * let iterator = pageBlobClient
     *   .listPageRangesDiff(offset, count, previousSnapshot)
     *   .byPage({ maxPageSize: 2 });
     * let response = (await iterator.next()).value;
     * // Prints 2 page ranges
     * if (response.pageRange) {
     *   for (const pageRange of response.pageRange) {
     *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
     *   }
     * }
     * // Gets next marker
     * let marker = response.continuationToken;
     * // Passing next marker as continuationToken
     * iterator = pageBlobClient
     *   .listPageRangesDiff(offset, count, previousSnapshot)
     *   .byPage({ continuationToken: marker, maxPageSize: 10 });
     * response = (await iterator.next()).value;
     * // Prints 10 page ranges
     * if (response.pageRange) {
     *   for (const pageRange of response.pageRange) {
     *     console.log(`Page range ${i++}: ${pageRange.start} - ${pageRange.end}`);
     *   }
     * }
     * ```
     *
     * @param offset - Starting byte position of the page ranges.
     * @param count - Number of bytes to get.
     * @param prevSnapshot - Timestamp of snapshot to retrieve the difference.
     * @param options - Options to the Page Blob Get Ranges operation.
     * @returns An asyncIterableIterator that supports paging.
     */
    listPageRangesDiff(offset: number, count: number, prevSnapshot: string, options?: PageBlobListPageRangesDiffOptions): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesDiffResponseModel>;
    /**
     * Gets the collection of page ranges that differ between a specified snapshot and this page blob for managed disks.
     * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
     *
     * @param offset - Starting byte position of the page blob
     * @param count - Number of bytes to get ranges diff.
     * @param prevSnapshotUrl - URL of snapshot to retrieve the difference.
     * @param options - Options to the Page Blob Get Page Ranges Diff operation.
     * @returns Response data for the Page Blob Get Page Range Diff operation.
     */
    getPageRangesDiffForManagedDisks(offset: number, count: number, prevSnapshotUrl: string, options?: PageBlobGetPageRangesDiffOptions): Promise<PageBlobGetPageRangesDiffResponse>;
    /**
     * Resizes the page blob to the specified size (which must be a multiple of 512).
     * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-properties
     *
     * @param size - Target size
     * @param options - Options to the Page Blob Resize operation.
     * @returns Response data for the Page Blob Resize operation.
     */
    resize(size: number, options?: PageBlobResizeOptions): Promise<PageBlobResizeResponse>;
    /**
     * Sets a page blob's sequence number.
     * @see https://learn.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
     *
     * @param sequenceNumberAction - Indicates how the service should modify the blob's sequence number.
     * @param sequenceNumber - Required if sequenceNumberAction is max or update
     * @param options - Options to the Page Blob Update Sequence Number operation.
     * @returns Response data for the Page Blob Update Sequence Number operation.
     */
    updateSequenceNumber(sequenceNumberAction: SequenceNumberActionType, sequenceNumber?: number, options?: PageBlobUpdateSequenceNumberOptions): Promise<PageBlobUpdateSequenceNumberResponse>;
    /**
     * Begins an operation to start an incremental copy from one page blob's snapshot to this page blob.
     * The snapshot is copied such that only the differential changes between the previously
     * copied snapshot are transferred to the destination.
     * The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual.
     * @see https://learn.microsoft.com/rest/api/storageservices/incremental-copy-blob
     * @see https://learn.microsoft.com/en-us/azure/virtual-machines/windows/incremental-snapshots
     *
     * @param copySource - Specifies the name of the source page blob snapshot. For example,
     *                            https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
     * @param options - Options to the Page Blob Copy Incremental operation.
     * @returns Response data for the Page Blob Copy Incremental operation.
     */
    startCopyIncremental(copySource: string, options?: PageBlobStartCopyIncrementalOptions): Promise<PageBlobCopyIncrementalResponse>;
}
//# sourceMappingURL=Clients.d.ts.map