// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  RequestBodyType as HttpRequestBody,
  TransferProgressEvent,
} from "@azure/core-rest-pipeline";
import { getDefaultProxySettings } from "@azure/core-rest-pipeline";
import type { TokenCredential } from "@azure/core-auth";
import { isTokenCredential } from "@azure/core-auth";
import { isNodeLike } from "@azure/core-util";
import type { PollOperationState } from "@azure/core-lro";
import { randomUUID } from "@azure/core-util";
import type { Readable } from "node:stream";
import { BlobDownloadResponse } from "./BlobDownloadResponse.js";
import { BlobQueryResponse } from "./BlobQueryResponse.js";
import { AnonymousCredential } from "./credentials/AnonymousCredential.js";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential.js";
import type {
  AppendBlob,
  Blob as StorageBlob,
  BlockBlob,
  PageBlob,
} from "./generated/src/operationsInterfaces/index.js";
import type {
  AppendBlobAppendBlockFromUrlHeaders,
  AppendBlobAppendBlockHeaders,
  AppendBlobCreateHeaders,
  AppendBlobSealHeaders,
  BlobAbortCopyFromURLHeaders,
  BlobCopyFromURLHeaders,
  BlobCreateSnapshotHeaders,
  BlobDeleteHeaders,
  BlobDeleteImmutabilityPolicyHeaders,
  BlobGetAccountInfoHeaders,
  BlobGetPropertiesResponse as BlobGetPropertiesResponseInternal,
  BlobGetTagsResponse as BlobGetTagsResponseInternal,
  BlobSetHttpHeadersHeaders,
  BlobSetImmutabilityPolicyHeaders,
  BlobSetLegalHoldHeaders,
  BlobSetMetadataHeaders,
  BlobSetTagsHeaders,
  BlobSetTierHeaders,
  BlobStartCopyFromURLHeaders,
  BlobUndeleteHeaders,
  BlockBlobCommitBlockListHeaders,
  BlockBlobPutBlobFromUrlHeaders,
  BlockBlobStageBlockFromURLHeaders,
  BlockBlobStageBlockHeaders,
  PageBlobClearPagesHeaders,
  PageBlobCopyIncrementalHeaders,
  PageBlobCreateHeaders,
  PageBlobResizeHeaders,
  PageBlobUpdateSequenceNumberHeaders,
  PageBlobUploadPagesFromURLHeaders,
  PageBlobUploadPagesHeaders,
} from "./generated/src/index.js";
import type {
  AppendBlobAppendBlockFromUrlResponse,
  AppendBlobAppendBlockResponse,
  AppendBlobCreateResponse,
  BlobAbortCopyFromURLResponse,
  BlobCopyFromURLResponse,
  BlobCreateSnapshotResponse,
  BlobDeleteResponse,
  BlobDownloadOptionalParams,
  BlobDownloadResponseModel,
  BlobGetAccountInfoResponse,
  BlobGetPropertiesResponseModel,
  BlobGetTagsHeaders,
  BlobSetHTTPHeadersResponse,
  BlobSetTagsResponse,
  BlobSetTierResponse,
  BlobStartCopyFromURLResponse,
  BlobTags,
  BlobUndeleteResponse,
  BlockBlobCommitBlockListResponse,
  BlockBlobGetBlockListResponse,
  BlockBlobStageBlockFromURLResponse,
  BlockBlobStageBlockResponse,
  BlockBlobUploadHeaders,
  BlockBlobUploadResponse,
  BlockListType,
  CpkInfo,
  DeleteSnapshotsOptionType,
  LeaseAccessConditions,
  PageBlobClearPagesResponse,
  PageBlobCopyIncrementalResponse,
  PageBlobCreateResponse,
  PageBlobResizeResponse,
  PageBlobUpdateSequenceNumberResponse,
  PageBlobUploadPagesFromURLResponse,
  PageBlobUploadPagesResponse,
  RehydratePriority,
  SequenceNumberActionType,
  BlockBlobPutBlobFromUrlResponse,
  BlobHTTPHeaders,
  PageBlobGetPageRangesResponseModel,
  PageRangeInfo,
  PageBlobGetPageRangesDiffResponseModel,
  BlobCopySourceTags,
  BlobDownloadResponseInternal,
  BlobDownloadHeaders,
  BlobGetPropertiesHeaders,
  BlobQueryResponseInternal,
  BlobQueryHeaders,
  BlockBlobGetBlockListHeaders,
  BlockBlobGetBlockListResponseInternal,
  PageBlobGetPageRangesResponseInternal,
  PageBlobGetPageRangesHeaders,
  PageListInternal,
  PageBlobGetPageRangesDiffResponseInternal,
  PageBlobGetPageRangesDiffHeaders,
  BlobDeleteImmutabilityPolicyResponse,
  BlobSetImmutabilityPolicyResponse,
  BlobSetLegalHoldResponse,
  BlobSetMetadataResponse,
  FileShareTokenIntent,
} from "./generatedModels.js";
import type {
  AppendBlobRequestConditions,
  BlobDownloadResponseParsed,
  BlobRequestConditions,
  BlockBlobTier,
  Metadata,
  ObjectReplicationPolicy,
  PageBlobRequestConditions,
  PremiumPageBlobTier,
  Tags,
  TagConditions,
  MatchConditions,
  ModificationConditions,
  ModifiedAccessConditions,
  BlobQueryArrowField,
  BlobImmutabilityPolicy,
  HttpAuthorization,
  PollerLikeWithCancellation,
} from "./models.js";
import { ensureCpkIfSpecified, toAccessTier } from "./models.js";
import type {
  PageBlobGetPageRangesDiffResponse,
  PageBlobGetPageRangesResponse,
} from "./PageBlobRangeResponse.js";
import { rangeResponseFromModel } from "./PageBlobRangeResponse.js";
import type { PipelineLike, StoragePipelineOptions } from "./Pipeline.js";
import { newPipeline, isPipelineLike } from "./Pipeline.js";
import type {
  BlobBeginCopyFromUrlPollState,
  CopyPollerBlobClient,
} from "./pollers/BlobStartCopyFromUrlPoller.js";
import { BlobBeginCopyFromUrlPoller } from "./pollers/BlobStartCopyFromUrlPoller.js";
import type { Range } from "./Range.js";
import { rangeToString } from "./Range.js";
import type { CommonOptions } from "./StorageClient.js";
import { StorageClient } from "./StorageClient.js";
import { Batch } from "./utils/Batch.js";
import { BufferScheduler } from "@azure/storage-common";
import {
  BlobDoesNotUseCustomerSpecifiedEncryption,
  BlobUsesCustomerSpecifiedEncryptionMsg,
  BLOCK_BLOB_MAX_BLOCKS,
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES,
  DEFAULT_BLOCK_BUFFER_SIZE_BYTES,
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  ETagAny,
  URLConstants,
} from "./utils/constants.js";
import { tracingClient } from "./utils/tracing.js";
import type { WithResponse } from "./utils/utils.common.js";
import {
  appendToURLPath,
  appendToURLQuery,
  assertResponse,
  extractConnectionStringParts,
  ExtractPageRangeInfoItems,
  generateBlockID,
  getURLParameter,
  httpAuthorizationToString,
  isIpEndpointStyle,
  parseObjectReplicationRecord,
  setURLParameter,
  toBlobTags,
  toBlobTagsString,
  toQuerySerialization,
  toTags,
} from "./utils/utils.common.js";
import {
  fsCreateReadStream,
  fsStat,
  readStreamToLocalFile,
  streamToBuffer,
} from "./utils/utils.js";
import type { SASProtocol } from "./sas/SASQueryParameters.js";
import type { SasIPRange } from "./sas/SasIPRange.js";
import {
  generateBlobSASQueryParameters,
  generateBlobSASQueryParametersInternal,
} from "./sas/BlobSASSignatureValues.js";
import type { BlobSASPermissions } from "./sas/BlobSASPermissions.js";
import { BlobLeaseClient } from "./BlobLeaseClient.js";
import type { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
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
export interface BlobBeginCopyFromURLResponse extends BlobStartCopyFromURLResponse {}

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
export type BlobGetTagsResponse = WithResponse<
  { tags: Tags } & BlobGetTagsHeaders,
  BlobGetTagsHeaders,
  BlobTags
>;

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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
   */
  tier?: BlockBlobTier | PremiumPageBlobTier | string;
  /**
   * Rehydrate Priority - possible values include 'High', 'Standard'.
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
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
  /**
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
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
   * @see https://learn.microsoft.com/rest/api/storageservices/establishing-a-stored-access-policy
   */
  identifier?: string;

  /**
   * Optional. Beginning in version 2025-07-05, this value specifies the Entra ID of the user would is authorized to
   * use the resulting SAS URL.  The resulting SAS URL must be used in conjunction with an Entra ID token that has been
   * issued to the user specified in this value.
   */
  delegatedUserObjectId?: string;

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
export class BlobClient extends StorageClient {
  /**
   * blobContext provided by protocol layer.
   */
  private blobContext: StorageBlob;

  private _name: string;
  private _containerName: string;

  private _versionId?: string;
  private _snapshot?: string;

  /**
   * The name of the blob.
   */
  public get name(): string {
    return this._name;
  }

  /**
   * The name of the storage container the blob is associated with.
   */
  public get containerName(): string {
    return this._containerName;
  }

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
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
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
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
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
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | PipelineLike,
    blobNameOrOptions?: string | StoragePipelineOptions,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  ) {
    options = options || {};
    let pipeline: PipelineLike;
    let url: string;
    if (isPipelineLike(credentialOrPipelineOrContainerName)) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNodeLike && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      options = blobNameOrOptions as StoragePipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      // The second parameter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      if (blobNameOrOptions && typeof blobNameOrOptions !== "string") {
        options = blobNameOrOptions as StoragePipelineOptions;
      }
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      // (connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions)
      const containerName = credentialOrPipelineOrContainerName;
      const blobName = blobNameOrOptions;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNodeLike) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey,
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          );

          if (!options.proxyOptions) {
            options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          }

          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string",
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }

    super(url, pipeline);
    ({ blobName: this._name, containerName: this._containerName } =
      this.getBlobAndContainerNamesFromUrl());
    this.blobContext = this.storageClientContext.blob;

    this._snapshot = getURLParameter(this.url, URLConstants.Parameters.SNAPSHOT) as string;
    this._versionId = getURLParameter(this.url, URLConstants.Parameters.VERSIONID) as string;
  }

  /**
   * Creates a new BlobClient object identical to the source but with the specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new BlobClient object identical to the source but with the specified snapshot timestamp
   */
  public withSnapshot(snapshot: string): BlobClient {
    return new BlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
    );
  }

  /**
   * Creates a new BlobClient object pointing to a version of this blob.
   * Provide "" will remove the versionId and return a Client to the base blob.
   *
   * @param versionId - The versionId.
   * @returns A new BlobClient object pointing to the version of this blob.
   */
  public withVersion(versionId: string): BlobClient {
    return new BlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.VERSIONID,
        versionId.length === 0 ? undefined : versionId,
      ),
      this.pipeline,
    );
  }

  /**
   * Creates a AppendBlobClient object.
   *
   */
  public getAppendBlobClient(): AppendBlobClient {
    return new AppendBlobClient(this.url, this.pipeline);
  }

  /**
   * Creates a BlockBlobClient object.
   *
   */
  public getBlockBlobClient(): BlockBlobClient {
    return new BlockBlobClient(this.url, this.pipeline);
  }

  /**
   * Creates a PageBlobClient object.
   *
   */
  public getPageBlobClient(): PageBlobClient {
    return new PageBlobClient(this.url, this.pipeline);
  }

  /**
   * Reads or downloads a blob from the system, including its metadata and properties.
   * You can also call Get Blob to read a snapshot.
   *
   * * In Node.js, data returns in a Readable stream readableStreamBody
   * * In browsers, data returns in a promise blobBody
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/get-blob
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
  public async download(
    offset: number = 0,
    count?: number,
    options: BlobDownloadOptions = {},
  ): Promise<BlobDownloadResponseParsed> {
    options.conditions = options.conditions || {};
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return tracingClient.withSpan("BlobClient-download", options, async (updatedOptions) => {
      const res = assertResponse<BlobDownloadResponseInternal, BlobDownloadHeaders>(
        await this.blobContext.download({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          requestOptions: {
            onDownloadProgress: isNodeLike ? undefined : options.onProgress, // for Node.js, progress is reported by RetriableReadableStream
          },
          range: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
          rangeGetContentMD5: options.rangeGetContentMD5,
          rangeGetContentCRC64: options.rangeGetContentCrc64,
          snapshot: options.snapshot,
          cpkInfo: options.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );

      const wrappedRes: BlobDownloadResponseParsed = {
        ...res,
        _response: res._response, // _response is made non-enumerable
        objectReplicationDestinationPolicyId: res.objectReplicationPolicyId,
        objectReplicationSourceProperties: parseObjectReplicationRecord(res.objectReplicationRules),
      };
      // Return browser response immediately
      if (!isNodeLike) {
        return wrappedRes;
      }

      // We support retrying when download stream unexpected ends in Node.js runtime
      // Following code shouldn't be bundled into browser build, however some
      // bundlers may try to bundle following code and "FileReadResponse.ts".
      // In this case, "FileDownloadResponse.browser.ts" will be used as a shim of "FileDownloadResponse.ts"
      // The config is in package.json "browser" field
      if (options.maxRetryRequests === undefined || options.maxRetryRequests < 0) {
        // TODO: Default value or make it a required parameter?
        options.maxRetryRequests = DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS;
      }

      if (res.contentLength === undefined) {
        throw new RangeError(`File download response doesn't contain valid content length header`);
      }

      if (!res.etag) {
        throw new RangeError(`File download response doesn't contain valid etag header`);
      }

      return new BlobDownloadResponse(
        wrappedRes,
        async (start: number): Promise<NodeJS.ReadableStream> => {
          const updatedDownloadOptions: BlobDownloadOptionalParams = {
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ifMatch: options.conditions!.ifMatch || res.etag,
              ifModifiedSince: options.conditions!.ifModifiedSince,
              ifNoneMatch: options.conditions!.ifNoneMatch,
              ifUnmodifiedSince: options.conditions!.ifUnmodifiedSince,
              ifTags: options.conditions?.tagConditions,
            },
            range: rangeToString({
              count: offset + res.contentLength! - start,
              offset: start,
            }),
            rangeGetContentMD5: options.rangeGetContentMD5,
            rangeGetContentCRC64: options.rangeGetContentCrc64,
            snapshot: options.snapshot,
            cpkInfo: options.customerProvidedKey,
          };

          // Debug purpose only
          // console.log(
          //   `Read from internal stream, range: ${
          //     updatedOptions.range
          //   }, options: ${JSON.stringify(updatedOptions)}`
          // );

          return (
            await this.blobContext.download({
              abortSignal: options.abortSignal,
              ...updatedDownloadOptions,
            })
          ).readableStreamBody!;
        },
        offset,
        res.contentLength!,
        {
          maxRetryRequests: options.maxRetryRequests,
          onProgress: options.onProgress,
        },
      );
    });
  }

  /**
   * Returns true if the Azure blob resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing blob might be deleted by other clients or
   * applications. Vice versa new blobs might be added by other clients or applications after this
   * function completes.
   *
   * @param options - options to Exists operation.
   */
  public async exists(options: BlobExistsOptions = {}): Promise<boolean> {
    return tracingClient.withSpan("BlobClient-exists", options, async (updatedOptions) => {
      try {
        ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
        await this.getProperties({
          abortSignal: options.abortSignal,
          customerProvidedKey: options.customerProvidedKey,
          conditions: options.conditions,
          tracingOptions: updatedOptions.tracingOptions,
        });
        return true;
      } catch (e: any) {
        if (e.statusCode === 404) {
          // Expected exception when checking blob existence
          return false;
        } else if (
          e.statusCode === 409 &&
          (e.details.errorCode === BlobUsesCustomerSpecifiedEncryptionMsg ||
            e.details.errorCode === BlobDoesNotUseCustomerSpecifiedEncryption)
        ) {
          // Expected exception when checking blob existence
          return true;
        }
        throw e;
      }
    });
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the blob. It does not return the content of the blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-blob-properties
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the methods of {@link ContainerClient} that list blobs using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @param options - Optional options to Get Properties operation.
   */
  public async getProperties(
    options: BlobGetPropertiesOptions = {},
  ): Promise<BlobGetPropertiesResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlobClient-getProperties", options, async (updatedOptions) => {
      const res = assertResponse<BlobGetPropertiesResponseInternal, BlobGetPropertiesHeaders>(
        await this.blobContext.getProperties({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );

      return {
        ...res,
        _response: res._response, // _response is made non-enumerable
        objectReplicationDestinationPolicyId: res.objectReplicationPolicyId,
        objectReplicationSourceProperties: parseObjectReplicationRecord(res.objectReplicationRules),
      };
    });
  }

  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://learn.microsoft.com/rest/api/storageservices/delete-blob
   *
   * @param options - Optional options to Blob Delete operation.
   */
  public async delete(options: BlobDeleteOptions = {}): Promise<BlobDeleteResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("BlobClient-delete", options, async (updatedOptions) => {
      return assertResponse<BlobDeleteHeaders, BlobDeleteHeaders>(
        await this.blobContext.delete({
          abortSignal: options.abortSignal,
          deleteSnapshots: options.deleteSnapshots,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Marks the specified blob or snapshot for deletion if it exists. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://learn.microsoft.com/rest/api/storageservices/delete-blob
   *
   * @param options - Optional options to Blob Delete operation.
   */
  public async deleteIfExists(
    options: BlobDeleteOptions = {},
  ): Promise<BlobDeleteIfExistsResponse> {
    return tracingClient.withSpan("BlobClient-deleteIfExists", options, async (updatedOptions) => {
      try {
        const res = assertResponse(await this.delete(updatedOptions));
        return {
          succeeded: true,
          ...res,
          _response: res._response, // _response is made non-enumerable
        };
      } catch (e: any) {
        if (e.details?.errorCode === "BlobNotFound") {
          return {
            succeeded: false,
            ...e.response?.parsedHeaders,
            _response: e.response,
          };
        }
        throw e;
      }
    });
  }

  /**
   * Restores the contents and metadata of soft deleted blob and any associated
   * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
   * or later.
   * @see https://learn.microsoft.com/rest/api/storageservices/undelete-blob
   *
   * @param options - Optional options to Blob Undelete operation.
   */
  public async undelete(options: BlobUndeleteOptions = {}): Promise<BlobUndeleteResponse> {
    return tracingClient.withSpan("BlobClient-undelete", options, async (updatedOptions) => {
      return assertResponse<BlobUndeleteHeaders, BlobUndeleteHeaders>(
        await this.blobContext.undelete({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets system properties on the blob.
   *
   * If no value provided, or no value provided for the specified blob HTTP headers,
   * these blob HTTP headers without a value will be cleared.
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param blobHTTPHeaders - If no value provided, or no value provided for
   *                                                   the specified blob HTTP headers, these blob HTTP
   *                                                   headers without a value will be cleared.
   *                                                   A common header to set is `blobContentType`
   *                                                   enabling the browser to provide functionality
   *                                                   based on file type.
   * @param options - Optional options to Blob Set HTTP Headers operation.
   */
  public async setHTTPHeaders(
    blobHTTPHeaders?: BlobHTTPHeaders,
    options: BlobSetHTTPHeadersOptions = {},
  ): Promise<BlobSetHTTPHeadersResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlobClient-setHTTPHeaders", options, async (updatedOptions) => {
      return assertResponse<BlobSetHttpHeadersHeaders, BlobSetHttpHeadersHeaders>(
        await this.blobContext.setHttpHeaders({
          abortSignal: options.abortSignal,
          blobHttpHeaders: blobHTTPHeaders,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          // cpkInfo: options.customerProvidedKey, // CPK is not included in Swagger, should change this back when this issue is fixed in Swagger.
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets user-defined metadata for the specified blob as one or more name-value pairs.
   *
   * If no option provided, or no metadata defined in the parameter, the blob
   * metadata will be removed.
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-metadata
   *
   * @param metadata - Replace existing metadata with this value.
   *                               If no value provided the existing metadata will be removed.
   * @param options - Optional options to Set Metadata operation.
   */
  public async setMetadata(
    metadata?: Metadata,
    options: BlobSetMetadataOptions = {},
  ): Promise<BlobSetMetadataResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlobClient-setMetadata", options, async (updatedOptions) => {
      return assertResponse<BlobSetMetadataHeaders, BlobSetMetadataHeaders>(
        await this.blobContext.setMetadata({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets tags on the underlying blob.
   * A blob can have up to 10 tags. Tag keys must be between 1 and 128 characters.  Tag values must be between 0 and 256 characters.
   * Valid tag key and value characters include lower and upper case letters, digits (0-9),
   * space (' '), plus ('+'), minus ('-'), period ('.'), foward slash ('/'), colon (':'), equals ('='), and underscore ('_').
   *
   * @param tags -
   * @param options -
   */
  public async setTags(tags: Tags, options: BlobSetTagsOptions = {}): Promise<BlobSetTagsResponse> {
    return tracingClient.withSpan("BlobClient-setTags", options, async (updatedOptions) => {
      return assertResponse<BlobSetTagsHeaders, BlobSetTagsHeaders>(
        await this.blobContext.setTags({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          tracingOptions: updatedOptions.tracingOptions,
          tags: toBlobTags(tags),
        }),
      );
    });
  }

  /**
   * Gets the tags associated with the underlying blob.
   *
   * @param options -
   */
  public async getTags(options: BlobGetTagsOptions = {}): Promise<BlobGetTagsResponse> {
    return tracingClient.withSpan("BlobClient-getTags", options, async (updatedOptions) => {
      const response = assertResponse<BlobGetTagsResponseInternal, BlobGetTagsHeaders, BlobTags>(
        await this.blobContext.getTags({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
      const wrappedResponse: BlobGetTagsResponse = {
        ...response,
        _response: response._response, // _response is made non-enumerable
        tags: toTags({ blobTagSet: response.blobTagSet }) || {},
      };
      return wrappedResponse;
    });
  }

  /**
   * Get a {@link BlobLeaseClient} that manages leases on the blob.
   *
   * @param proposeLeaseId - Initial proposed lease Id.
   * @returns A new BlobLeaseClient object for managing leases on the blob.
   */
  public getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient {
    return new BlobLeaseClient(this, proposeLeaseId);
  }

  /**
   * Creates a read-only snapshot of a blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/snapshot-blob
   *
   * @param options - Optional options to the Blob Create Snapshot operation.
   */
  public async createSnapshot(
    options: BlobCreateSnapshotOptions = {},
  ): Promise<BlobCreateSnapshotResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlobClient-createSnapshot", options, async (updatedOptions) => {
      return assertResponse<BlobCreateSnapshotHeaders, BlobCreateSnapshotHeaders>(
        await this.blobContext.createSnapshot({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

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
   * @see https://learn.microsoft.com/rest/api/storageservices/copy-blob
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
  public async beginCopyFromURL(
    copySource: string,
    options: BlobBeginCopyFromURLOptions = {},
  ): Promise<
    PollerLikeWithCancellation<
      PollOperationState<BlobBeginCopyFromURLResponse>,
      BlobBeginCopyFromURLResponse
    >
  > {
    const client: CopyPollerBlobClient = {
      abortCopyFromURL: (...args) => this.abortCopyFromURL(...args),
      getProperties: (...args) => this.getProperties(...args),
      startCopyFromURL: (...args) => this.startCopyFromURL(...args),
    };
    const poller = new BlobBeginCopyFromUrlPoller({
      blobClient: client,
      copySource,
      intervalInMs: options.intervalInMs,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      startCopyFromURLOptions: options,
    });

    // Trigger the startCopyFromURL call by calling poll.
    // Any errors from this method should be surfaced to the user.
    await poller.poll();

    return poller;
  }

  /**
   * Aborts a pending asynchronous Copy Blob operation, and leaves a destination blob with zero
   * length and full metadata. Version 2012-02-12 and newer.
   * @see https://learn.microsoft.com/rest/api/storageservices/abort-copy-blob
   *
   * @param copyId - Id of the Copy From URL operation.
   * @param options - Optional options to the Blob Abort Copy From URL operation.
   */
  public async abortCopyFromURL(
    copyId: string,
    options: BlobAbortCopyFromURLOptions = {},
  ): Promise<BlobAbortCopyFromURLResponse> {
    return tracingClient.withSpan(
      "BlobClient-abortCopyFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<BlobAbortCopyFromURLHeaders, BlobAbortCopyFromURLHeaders>(
          await this.blobContext.abortCopyFromURL(copyId, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * The synchronous Copy From URL operation copies a blob or an internet resource to a new blob. It will not
   * return a response until the copy is complete.
   * @see https://learn.microsoft.com/rest/api/storageservices/copy-blob-from-url
   *
   * @param copySource - The source URL to copy from, Shared Access Signature(SAS) maybe needed for authentication
   * @param options -
   */
  public async syncCopyFromURL(
    copySource: string,
    options: BlobSyncCopyFromURLOptions = {},
  ): Promise<BlobCopyFromURLResponse> {
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};
    return tracingClient.withSpan("BlobClient-syncCopyFromURL", options, async (updatedOptions) => {
      return assertResponse<BlobCopyFromURLHeaders, BlobCopyFromURLHeaders>(
        await this.blobContext.copyFromURL(copySource, {
          abortSignal: options.abortSignal,
          metadata: options.metadata,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          sourceModifiedAccessConditions: {
            sourceIfMatch: options.sourceConditions?.ifMatch,
            sourceIfModifiedSince: options.sourceConditions?.ifModifiedSince,
            sourceIfNoneMatch: options.sourceConditions?.ifNoneMatch,
            sourceIfUnmodifiedSince: options.sourceConditions?.ifUnmodifiedSince,
          },
          sourceContentMD5: options.sourceContentMD5,
          copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
          tier: toAccessTier(options.tier),
          blobTagsString: toBlobTagsString(options.tags),
          immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
          immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
          legalHold: options.legalHold,
          encryptionScope: options.encryptionScope,
          copySourceTags: options.copySourceTags,
          fileRequestIntent: options.sourceShareTokenIntent,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets the tier on a blob. The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-tier
   *
   * @param tier - The tier to be set on the blob. Valid values are Hot, Cool, or Archive.
   * @param options - Optional options to the Blob Set Tier operation.
   */
  public async setAccessTier(
    tier: BlockBlobTier | PremiumPageBlobTier | string,
    options: BlobSetTierOptions = {},
  ): Promise<BlobSetTierResponse> {
    return tracingClient.withSpan("BlobClient-setAccessTier", options, async (updatedOptions) => {
      return assertResponse<BlobSetTierHeaders, BlobSetTierHeaders>(
        await this.blobContext.setTier(toAccessTier(tier)!, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          rehydratePriority: options.rehydratePriority,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  // High level function

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
  public async downloadToBuffer(
    offset?: number,
    count?: number,
    options?: BlobDownloadToBufferOptions,
  ): Promise<Buffer>;

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
  public async downloadToBuffer(
    buffer: Buffer,
    offset?: number,
    count?: number,
    options?: BlobDownloadToBufferOptions,
  ): Promise<Buffer>;

  public async downloadToBuffer(
    param1?: Buffer | number,
    param2?: number,
    param3?: BlobDownloadToBufferOptions | number,
    param4: BlobDownloadToBufferOptions = {},
  ): Promise<Buffer | undefined> {
    let buffer: Buffer | undefined;
    let offset = 0;
    let count = 0;
    let options = param4;
    if (param1 instanceof Buffer) {
      buffer = param1;
      offset = param2 || 0;
      count = typeof param3 === "number" ? param3 : 0;
    } else {
      offset = typeof param1 === "number" ? param1 : 0;
      count = typeof param2 === "number" ? param2 : 0;
      options = (param3 as BlobDownloadToBufferOptions) || {};
    }

    let blockSize = options.blockSize ?? 0;

    if (blockSize < 0) {
      throw new RangeError("blockSize option must be >= 0");
    }
    if (blockSize === 0) {
      blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
    }

    if (offset < 0) {
      throw new RangeError("offset option must be >= 0");
    }

    if (count && count <= 0) {
      throw new RangeError("count option must be greater than 0");
    }

    if (!options.conditions) {
      options.conditions = {};
    }

    return tracingClient.withSpan(
      "BlobClient-downloadToBuffer",
      options,
      async (updatedOptions) => {
        // Customer doesn't specify length, get it
        if (!count) {
          const response = await this.getProperties({
            ...options,
            tracingOptions: updatedOptions.tracingOptions,
          });
          count = response.contentLength! - offset;
          if (count < 0) {
            throw new RangeError(
              `offset ${offset} shouldn't be larger than blob size ${response.contentLength!}`,
            );
          }
        }

        // Allocate the buffer of size = count if the buffer is not provided
        if (!buffer) {
          try {
            buffer = Buffer.alloc(count);
          } catch (error: any) {
            throw new Error(
              `Unable to allocate the buffer of size: ${count}(in bytes). Please try passing your own buffer to the "downloadToBuffer" method or try using other methods like "download" or "downloadToFile".\t ${error.message}`,
            );
          }
        }

        if (buffer.length < count) {
          throw new RangeError(
            `The buffer's size should be equal to or larger than the request count of bytes: ${count}`,
          );
        }

        let transferProgress: number = 0;
        const batch = new Batch(options.concurrency);
        for (let off = offset; off < offset + count; off = off + blockSize) {
          batch.addOperation(async () => {
            // Exclusive chunk end position
            let chunkEnd = offset + count!;
            if (off + blockSize < chunkEnd) {
              chunkEnd = off + blockSize;
            }
            const response = await this.download(off, chunkEnd - off, {
              abortSignal: options.abortSignal,
              conditions: options.conditions,
              maxRetryRequests: options.maxRetryRequestsPerBlock,
              customerProvidedKey: options.customerProvidedKey,
              tracingOptions: updatedOptions.tracingOptions,
            });
            const stream = response.readableStreamBody!;
            await streamToBuffer(stream, buffer!, off - offset, chunkEnd - offset);
            // Update progress after block is downloaded, in case of block trying
            // Could provide finer grained progress updating inside HTTP requests,
            // only if convenience layer download try is enabled
            transferProgress += chunkEnd - off;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          });
        }
        await batch.do();
        return buffer;
      },
    );
  }

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
  public async downloadToFile(
    filePath: string,
    offset: number = 0,
    count?: number,
    options: BlobDownloadOptions = {},
  ): Promise<BlobDownloadResponseParsed> {
    return tracingClient.withSpan("BlobClient-downloadToFile", options, async (updatedOptions) => {
      const response = await this.download(offset, count, {
        ...options,
        tracingOptions: updatedOptions.tracingOptions,
      });
      if (response.readableStreamBody) {
        await readStreamToLocalFile(response.readableStreamBody, filePath);
      }

      // The stream is no longer accessible so setting it to undefined.
      (response as any).blobDownloadStream = undefined;
      return response;
    });
  }

  private getBlobAndContainerNamesFromUrl(): { blobName: string; containerName: string } {
    let containerName;
    let blobName;
    try {
      //  URL may look like the following
      // "https://myaccount.blob.core.windows.net/mycontainer/blob?sasString";
      // "https://myaccount.blob.core.windows.net/mycontainer/blob";
      // "https://myaccount.blob.core.windows.net/mycontainer/blob/a.txt?sasString";
      // "https://myaccount.blob.core.windows.net/mycontainer/blob/a.txt";
      // IPv4/IPv6 address hosts, Endpoints - `http://127.0.0.1:10000/devstoreaccount1/containername/blob`
      // http://localhost:10001/devstoreaccount1/containername/blob

      const parsedUrl = new URL(this.url);

      if (parsedUrl.host.split(".")[1] === "blob") {
        // "https://myaccount.blob.core.windows.net/containername/blob".
        // .getPath() -> /containername/blob
        const pathComponents = parsedUrl.pathname.match("/([^/]*)(/(.*))?");
        containerName = pathComponents![1];
        blobName = pathComponents![3];
      } else if (isIpEndpointStyle(parsedUrl)) {
        // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/containername/blob
        // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/containername/blob
        // .getPath() -> /devstoreaccount1/containername/blob
        const pathComponents = parsedUrl.pathname.match("/([^/]*)/([^/]*)(/(.*))?");
        containerName = pathComponents![2];
        blobName = pathComponents![4];
      } else {
        // "https://customdomain.com/containername/blob".
        // .getPath() -> /containername/blob
        const pathComponents = parsedUrl.pathname.match("/([^/]*)(/(.*))?");
        containerName = pathComponents![1];
        blobName = pathComponents![3];
      }

      // decode the encoded blobName, containerName - to get all the special characters that might be present in them
      containerName = decodeURIComponent(containerName);
      blobName = decodeURIComponent(blobName);

      // Azure Storage Server will replace "\" with "/" in the blob names
      //   doing the same in the SDK side so that the user doesn't have to replace "\" instances in the blobName
      blobName = blobName.replace(/\\/g, "/");

      if (!containerName) {
        throw new Error("Provided containerName is invalid.");
      }

      return { blobName, containerName };
    } catch (error: any) {
      throw new Error("Unable to extract blobName and containerName with provided information.");
    }
  }

  /**
   * Asynchronously copies a blob to a destination within the storage account.
   * In version 2012-02-12 and later, the source for a Copy Blob operation can be
   * a committed blob in any Azure storage account.
   * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
   * an Azure file in any Azure storage account.
   * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
   * operation to copy from another storage account.
   * @see https://learn.microsoft.com/rest/api/storageservices/copy-blob
   *
   * @param copySource - url to the source Azure Blob/File.
   * @param options - Optional options to the Blob Start Copy From URL operation.
   */
  private async startCopyFromURL(
    copySource: string,
    options: BlobStartCopyFromURLOptions = {},
  ): Promise<BlobStartCopyFromURLResponse> {
    return tracingClient.withSpan(
      "BlobClient-startCopyFromURL",
      options,
      async (updatedOptions) => {
        options.conditions = options.conditions || {};
        options.sourceConditions = options.sourceConditions || {};
        return assertResponse<BlobStartCopyFromURLHeaders, BlobStartCopyFromURLHeaders>(
          await this.blobContext.startCopyFromURL(copySource, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            metadata: options.metadata,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            sourceModifiedAccessConditions: {
              sourceIfMatch: options.sourceConditions.ifMatch,
              sourceIfModifiedSince: options.sourceConditions.ifModifiedSince,
              sourceIfNoneMatch: options.sourceConditions.ifNoneMatch,
              sourceIfUnmodifiedSince: options.sourceConditions.ifUnmodifiedSince,
              sourceIfTags: options.sourceConditions.tagConditions,
            },
            immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
            immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
            legalHold: options.legalHold,
            rehydratePriority: options.rehydratePriority,
            tier: toAccessTier(options.tier),
            blobTagsString: toBlobTagsString(options.tags),
            sealBlob: options.sealBlob,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Only available for BlobClient constructed with a shared key credential.
   *
   * Generates a Blob Service Shared Access Signature (SAS) URI based on the client properties
   * and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateSasUrl(options: BlobGenerateSasUrlOptions): Promise<string> {
    return new Promise((resolve) => {
      if (!(this.credential instanceof StorageSharedKeyCredential)) {
        throw new RangeError(
          "Can only generate the SAS when the client is initialized with a shared key credential",
        );
      }

      const sas = generateBlobSASQueryParameters(
        {
          containerName: this._containerName,
          blobName: this._name,
          snapshotTime: this._snapshot,
          versionId: this._versionId,
          ...options,
        },
        this.credential,
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }

  /**
   * Only available for BlobClient constructed with a shared key credential.
   *
   * Generates string to sign for a Blob Service Shared Access Signature (SAS) URI based on
   * the client properties and parameters passed in. The SAS is signed by the shared key credential of the client.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
  public generateSasStringToSign(options: BlobGenerateSasUrlOptions): string {
    if (!(this.credential instanceof StorageSharedKeyCredential)) {
      throw new RangeError(
        "Can only generate the SAS when the client is initialized with a shared key credential",
      );
    }

    return generateBlobSASQueryParametersInternal(
      {
        containerName: this._containerName,
        blobName: this._name,
        snapshotTime: this._snapshot,
        versionId: this._versionId,
        ...options,
      },
      this.credential,
    ).stringToSign;
  }

  /**
   *
   * Generates a Blob Service Shared Access Signature (SAS) URI based on
   * the client properties and parameters passed in. The SAS is signed by the input user delegation key.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @param userDelegationKey -  Return value of `blobServiceClient.getUserDelegationKey()`
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */
  public generateUserDelegationSasUrl(
    options: BlobGenerateSasUrlOptions,
    userDelegationKey: UserDelegationKey,
  ): Promise<string> {
    return new Promise((resolve) => {
      const sas = generateBlobSASQueryParameters(
        {
          containerName: this._containerName,
          blobName: this._name,
          snapshotTime: this._snapshot,
          versionId: this._versionId,
          ...options,
        },
        userDelegationKey,
        this.accountName,
      ).toString();

      resolve(appendToURLQuery(this.url, sas));
    });
  }

  /**
   * Only available for BlobClient constructed with a shared key credential.
   *
   * Generates string to sign for a Blob Service Shared Access Signature (SAS) URI based on
   * the client properties and parameters passed in. The SAS is signed by the input user delegation key.
   *
   * @see https://learn.microsoft.com/rest/api/storageservices/constructing-a-service-sas
   *
   * @param options - Optional parameters.
   * @param userDelegationKey -  Return value of `blobServiceClient.getUserDelegationKey()`
   * @returns The SAS URI consisting of the URI to the resource represented by this client, followed by the generated SAS token.
   */

  public generateUserDelegationSasStringToSign(
    options: BlobGenerateSasUrlOptions,
    userDelegationKey: UserDelegationKey,
  ): string {
    return generateBlobSASQueryParametersInternal(
      {
        containerName: this._containerName,
        blobName: this._name,
        snapshotTime: this._snapshot,
        versionId: this._versionId,
        ...options,
      },
      userDelegationKey,
      this.accountName,
    ).stringToSign;
  }

  /**
   * Delete the immutablility policy on the blob.
   *
   * @param options - Optional options to delete immutability policy on the blob.
   */
  public async deleteImmutabilityPolicy(
    options: BlobDeleteImmutabilityPolicyOptions = {},
  ): Promise<BlobDeleteImmutabilityPolicyResponse> {
    return tracingClient.withSpan(
      "BlobClient-deleteImmutabilityPolicy",
      options,
      async (updatedOptions) => {
        return assertResponse<
          BlobDeleteImmutabilityPolicyHeaders,
          BlobDeleteImmutabilityPolicyHeaders
        >(
          await this.blobContext.deleteImmutabilityPolicy({
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Set immutability policy on the blob.
   *
   * @param options - Optional options to set immutability policy on the blob.
   */
  public async setImmutabilityPolicy(
    immutabilityPolicy: BlobImmutabilityPolicy,
    options: BlobSetImmutabilityPolicyOptions = {},
  ): Promise<BlobSetImmutabilityPolicyResponse> {
    return tracingClient.withSpan(
      "BlobClient-setImmutabilityPolicy",
      options,
      async (updatedOptions) => {
        return assertResponse<BlobSetImmutabilityPolicyHeaders, BlobSetImmutabilityPolicyHeaders>(
          await this.blobContext.setImmutabilityPolicy({
            immutabilityPolicyExpiry: immutabilityPolicy.expiriesOn,
            immutabilityPolicyMode: immutabilityPolicy.policyMode,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Set legal hold on the blob.
   *
   * @param options - Optional options to set legal hold on the blob.
   */
  public async setLegalHold(
    legalHoldEnabled: boolean,
    options: BlobSetLegalHoldOptions = {},
  ): Promise<BlobSetLegalHoldResponse> {
    return tracingClient.withSpan("BlobClient-setLegalHold", options, async (updatedOptions) => {
      return assertResponse<BlobSetLegalHoldHeaders, BlobSetLegalHoldHeaders>(
        await this.blobContext.setLegalHold(legalHoldEnabled, {
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * The Get Account Information operation returns the sku name and account kind
   * for the specified account.
   * The Get Account Information operation is available on service versions beginning
   * with version 2018-03-28.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-account-information
   *
   * @param options - Options to the Service Get Account Info operation.
   * @returns Response data for the Service Get Account Info operation.
   */
  public async getAccountInfo(
    options: BlobGetAccountInfoOptions = {},
  ): Promise<BlobGetAccountInfoResponse> {
    return tracingClient.withSpan("BlobClient-getAccountInfo", options, async (updatedOptions) => {
      return assertResponse<BlobGetAccountInfoHeaders, BlobGetAccountInfoHeaders>(
        await this.blobContext.getAccountInfo({
          abortSignal: options.abortSignal,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }
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
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
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
export class AppendBlobClient extends BlobClient {
  /**
   * appendBlobsContext provided by protocol layer.
   */
  private appendBlobContext: AppendBlob;

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
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
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
  constructor(
    url: string,
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
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
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | PipelineLike,
    blobNameOrOptions?: string | StoragePipelineOptions,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: PipelineLike;
    let url: string;
    options = options || {};
    if (isPipelineLike(credentialOrPipelineOrContainerName)) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNodeLike && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)      url = urlOrConnectionString;
      url = urlOrConnectionString;
      options = blobNameOrOptions as StoragePipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      // (connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions)
      const containerName = credentialOrPipelineOrContainerName;
      const blobName = blobNameOrOptions;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNodeLike) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey,
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          );

          if (!options.proxyOptions) {
            options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          }

          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string",
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(url, pipeline);
    this.appendBlobContext = this.storageClientContext.appendBlob;
  }

  /**
   * Creates a new AppendBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new AppendBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  public withSnapshot(snapshot: string): AppendBlobClient {
    return new AppendBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
    );
  }

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
  public async create(options: AppendBlobCreateOptions = {}): Promise<AppendBlobCreateResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("AppendBlobClient-create", options, async (updatedOptions) => {
      return assertResponse<AppendBlobCreateHeaders, AppendBlobCreateHeaders>(
        await this.appendBlobContext.create(0, {
          abortSignal: options.abortSignal,
          blobHttpHeaders: options.blobHTTPHeaders,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
          immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
          legalHold: options.legalHold,
          blobTagsString: toBlobTagsString(options.tags),
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
   * If the blob with the same name already exists, the content of the existing blob will remain unchanged.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param options -
   */
  public async createIfNotExists(
    options: AppendBlobCreateIfNotExistsOptions = {},
  ): Promise<AppendBlobCreateIfNotExistsResponse> {
    const conditions = { ifNoneMatch: ETagAny };
    return tracingClient.withSpan(
      "AppendBlobClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        try {
          const res = assertResponse(
            await this.create({
              ...updatedOptions,
              conditions,
            }),
          );
          return {
            succeeded: true,
            ...res,
            _response: res._response, // _response is made non-enumerable
          };
        } catch (e: any) {
          if (e.details?.errorCode === "BlobAlreadyExists") {
            return {
              succeeded: false,
              ...e.response?.parsedHeaders,
              _response: e.response,
            };
          }
          throw e;
        }
      },
    );
  }

  /**
   * Seals the append blob, making it read only.
   *
   * @param options -
   */
  public async seal(options: AppendBlobSealOptions = {}): Promise<AppendBlobAppendBlockResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("AppendBlobClient-seal", options, async (updatedOptions) => {
      return assertResponse<AppendBlobSealHeaders, AppendBlobSealHeaders>(
        await this.appendBlobContext.seal({
          abortSignal: options.abortSignal,
          appendPositionAccessConditions: options.conditions,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

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
  public async appendBlock(
    body: HttpRequestBody,
    contentLength: number,
    options: AppendBlobAppendBlockOptions = {},
  ): Promise<AppendBlobAppendBlockResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "AppendBlobClient-appendBlock",
      options,
      async (updatedOptions) => {
        return assertResponse<AppendBlobAppendBlockHeaders, AppendBlobAppendBlockHeaders>(
          await this.appendBlobContext.appendBlock(contentLength, body, {
            abortSignal: options.abortSignal,
            appendPositionAccessConditions: options.conditions,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            requestOptions: {
              onUploadProgress: options.onProgress,
            },
            transactionalContentMD5: options.transactionalContentMD5,
            transactionalContentCrc64: options.transactionalContentCrc64,
            cpkInfo: options.customerProvidedKey,
            encryptionScope: options.encryptionScope,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * The Append Block operation commits a new block of data to the end of an existing append blob
   * where the contents are read from a source url.
   * @see https://learn.microsoft.com/rest/api/storageservices/append-block-from-url
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
  public async appendBlockFromURL(
    sourceURL: string,
    sourceOffset: number,
    count: number,
    options: AppendBlobAppendBlockFromURLOptions = {},
  ): Promise<AppendBlobAppendBlockFromUrlResponse> {
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};

    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "AppendBlobClient-appendBlockFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<
          AppendBlobAppendBlockFromUrlHeaders,
          AppendBlobAppendBlockFromUrlHeaders
        >(
          await this.appendBlobContext.appendBlockFromUrl(sourceURL, 0, {
            abortSignal: options.abortSignal,
            sourceRange: rangeToString({ offset: sourceOffset, count }),
            sourceContentMD5: options.sourceContentMD5,
            sourceContentCrc64: options.sourceContentCrc64,
            leaseAccessConditions: options.conditions,
            appendPositionAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            sourceModifiedAccessConditions: {
              sourceIfMatch: options.sourceConditions?.ifMatch,
              sourceIfModifiedSince: options.sourceConditions?.ifModifiedSince,
              sourceIfNoneMatch: options.sourceConditions?.ifNoneMatch,
              sourceIfUnmodifiedSince: options.sourceConditions?.ifUnmodifiedSince,
            },
            copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
            cpkInfo: options.customerProvidedKey,
            encryptionScope: options.encryptionScope,
            fileRequestIntent: options.sourceShareTokenIntent,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
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
   * For more information, @see https://learn.microsoft.com/rest/api/storageservices/fileservices/setting-timeouts-for-blob-service-operations
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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
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
  /**
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
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
  inputTextConfiguration?:
    | BlobQueryJsonTextConfiguration
    | BlobQueryCsvTextConfiguration
    | BlobQueryParquetConfiguration;
  /**
   * Configurations for the query output.
   */
  outputTextConfiguration?:
    | BlobQueryJsonTextConfiguration
    | BlobQueryCsvTextConfiguration
    | BlobQueryArrowConfiguration;
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
  /**
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
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
  metadata?: { [propertyName: string]: string };

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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
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
  metadata?: { [propertyName: string]: string };

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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
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
export class BlockBlobClient extends BlobClient {
  /**
   * blobContext provided by protocol layer.
   *
   * Note. Ideally BlobClient should set BlobClient.blobContext to protected. However, API
   * extractor has issue blocking that. Here we redecelare _blobContext in BlockBlobClient.
   */
  private _blobContext: StorageBlob;

  /**
   * blockBlobContext provided by protocol layer.
   */
  private blockBlobContext: BlockBlob;

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
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
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
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
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
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | PipelineLike,
    blobNameOrOptions?: string | StoragePipelineOptions,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: PipelineLike;
    let url: string;
    options = options || {};
    if (isPipelineLike(credentialOrPipelineOrContainerName)) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNodeLike && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      options = blobNameOrOptions as StoragePipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      // The second parameter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      if (blobNameOrOptions && typeof blobNameOrOptions !== "string") {
        options = blobNameOrOptions as StoragePipelineOptions;
      }
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      // (connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions)
      const containerName = credentialOrPipelineOrContainerName;
      const blobName = blobNameOrOptions;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNodeLike) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey,
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          );

          if (!options.proxyOptions) {
            options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          }

          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string",
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(url, pipeline);
    this.blockBlobContext = this.storageClientContext.blockBlob;
    this._blobContext = this.storageClientContext.blob;
  }

  /**
   * Creates a new BlockBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new BlockBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  public withSnapshot(snapshot: string): BlockBlobClient {
    return new BlockBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
    );
  }

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
  public async query(
    query: string,
    options: BlockBlobQueryOptions = {},
  ): Promise<BlobDownloadResponseModel> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    if (!isNodeLike) {
      throw new Error("This operation currently is only supported in Node.js.");
    }

    return tracingClient.withSpan("BlockBlobClient-query", options, async (updatedOptions) => {
      const response = assertResponse<BlobQueryResponseInternal, BlobQueryHeaders>(
        await this._blobContext.query({
          abortSignal: options.abortSignal,
          queryRequest: {
            queryType: "SQL",
            expression: query,
            inputSerialization: toQuerySerialization(options.inputTextConfiguration),
            outputSerialization: toQuerySerialization(options.outputTextConfiguration),
          },
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
      return new BlobQueryResponse(response, {
        abortSignal: options.abortSignal,
        onProgress: options.onProgress,
        onError: options.onError,
      });
    });
  }

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
  public async upload(
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobUploadOptions = {},
  ): Promise<BlockBlobUploadResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlockBlobClient-upload", options, async (updatedOptions) => {
      return assertResponse<BlockBlobUploadHeaders, BlockBlobUploadHeaders>(
        await this.blockBlobContext.upload(contentLength, body, {
          abortSignal: options.abortSignal,
          blobHttpHeaders: options.blobHTTPHeaders,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          requestOptions: {
            onUploadProgress: options.onProgress,
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
          immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
          legalHold: options.legalHold,
          tier: toAccessTier(options.tier),
          blobTagsString: toBlobTagsString(options.tags),
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

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

  public async syncUploadFromURL(
    sourceURL: string,
    options: BlockBlobSyncUploadFromURLOptions = {},
  ): Promise<BlockBlobPutBlobFromUrlResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "BlockBlobClient-syncUploadFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<BlockBlobPutBlobFromUrlHeaders, BlockBlobPutBlobFromUrlHeaders>(
          await this.blockBlobContext.putBlobFromUrl(0, sourceURL, {
            ...options,
            blobHttpHeaders: options.blobHTTPHeaders,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            sourceModifiedAccessConditions: {
              sourceIfMatch: options.sourceConditions?.ifMatch,
              sourceIfModifiedSince: options.sourceConditions?.ifModifiedSince,
              sourceIfNoneMatch: options.sourceConditions?.ifNoneMatch,
              sourceIfUnmodifiedSince: options.sourceConditions?.ifUnmodifiedSince,
              sourceIfTags: options.sourceConditions?.tagConditions,
            },
            cpkInfo: options.customerProvidedKey,
            copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
            tier: toAccessTier(options.tier),
            blobTagsString: toBlobTagsString(options.tags),
            copySourceTags: options.copySourceTags,
            fileRequestIntent: options.sourceShareTokenIntent,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

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
  public async stageBlock(
    blockId: string,
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobStageBlockOptions = {},
  ): Promise<BlockBlobStageBlockResponse> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("BlockBlobClient-stageBlock", options, async (updatedOptions) => {
      return assertResponse<BlockBlobStageBlockHeaders, BlockBlobStageBlockHeaders>(
        await this.blockBlobContext.stageBlock(blockId, contentLength, body, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          requestOptions: {
            onUploadProgress: options.onProgress,
          },
          transactionalContentMD5: options.transactionalContentMD5,
          transactionalContentCrc64: options.transactionalContentCrc64,
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * The Stage Block From URL operation creates a new block to be committed as part
   * of a blob where the contents are read from a URL.
   * This API is available starting in version 2018-03-28.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-block-from-url
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
  public async stageBlockFromURL(
    blockId: string,
    sourceURL: string,
    offset: number = 0,
    count?: number,
    options: BlockBlobStageBlockFromURLOptions = {},
  ): Promise<BlockBlobStageBlockFromURLResponse> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "BlockBlobClient-stageBlockFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<BlockBlobStageBlockFromURLHeaders, BlockBlobStageBlockFromURLHeaders>(
          await this.blockBlobContext.stageBlockFromURL(blockId, 0, sourceURL, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            sourceContentMD5: options.sourceContentMD5,
            sourceContentCrc64: options.sourceContentCrc64,
            sourceRange: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
            cpkInfo: options.customerProvidedKey,
            encryptionScope: options.encryptionScope,
            copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
            fileRequestIntent: options.sourceShareTokenIntent,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

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
  public async commitBlockList(
    blocks: string[],
    options: BlockBlobCommitBlockListOptions = {},
  ): Promise<BlockBlobCommitBlockListResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "BlockBlobClient-commitBlockList",
      options,
      async (updatedOptions) => {
        return assertResponse<BlockBlobCommitBlockListHeaders, BlockBlobCommitBlockListHeaders>(
          await this.blockBlobContext.commitBlockList(
            { latest: blocks },
            {
              abortSignal: options.abortSignal,
              blobHttpHeaders: options.blobHTTPHeaders,
              leaseAccessConditions: options.conditions,
              metadata: options.metadata,
              modifiedAccessConditions: {
                ...options.conditions,
                ifTags: options.conditions?.tagConditions,
              },
              cpkInfo: options.customerProvidedKey,
              encryptionScope: options.encryptionScope,
              immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
              immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
              legalHold: options.legalHold,
              tier: toAccessTier(options.tier),
              blobTagsString: toBlobTagsString(options.tags),
              tracingOptions: updatedOptions.tracingOptions,
            },
          ),
        );
      },
    );
  }

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
  public async getBlockList(
    listType: BlockListType,
    options: BlockBlobGetBlockListOptions = {},
  ): Promise<BlockBlobGetBlockListResponse> {
    return tracingClient.withSpan(
      "BlockBlobClient-getBlockList",
      options,
      async (updatedOptions) => {
        const res = assertResponse<
          BlockBlobGetBlockListResponseInternal,
          BlockBlobGetBlockListHeaders
        >(
          await this.blockBlobContext.getBlockList(listType, {
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );

        if (!res.committedBlocks) {
          res.committedBlocks = [];
        }

        if (!res.uncommittedBlocks) {
          res.uncommittedBlocks = [];
        }

        return res;
      },
    );
  }

  // High level functions

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
  public async uploadData(
    data: Buffer | Blob | ArrayBuffer | ArrayBufferView,
    options: BlockBlobParallelUploadOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    return tracingClient.withSpan("BlockBlobClient-uploadData", options, async (updatedOptions) => {
      if (isNodeLike) {
        let buffer: Buffer;
        if (data instanceof Buffer) {
          buffer = data;
        } else if (data instanceof ArrayBuffer) {
          buffer = Buffer.from(data);
        } else {
          data = data as ArrayBufferView;
          buffer = Buffer.from(data.buffer, data.byteOffset, data.byteLength);
        }

        return this.uploadSeekableInternal(
          (offset: number, size: number): Buffer => buffer.slice(offset, offset + size),
          buffer.byteLength,
          updatedOptions,
        );
      } else {
        const browserBlob = new Blob([data]);
        return this.uploadSeekableInternal(
          (offset: number, size: number): Blob => browserBlob.slice(offset, offset + size),
          browserBlob.size,
          updatedOptions,
        );
      }
    });
  }

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
  public async uploadBrowserData(
    browserData: Blob | ArrayBuffer | ArrayBufferView,
    options: BlockBlobParallelUploadOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    return tracingClient.withSpan(
      "BlockBlobClient-uploadBrowserData",
      options,
      async (updatedOptions) => {
        const browserBlob = new Blob([browserData]);
        return this.uploadSeekableInternal(
          (offset: number, size: number): Blob => browserBlob.slice(offset, offset + size),
          browserBlob.size,
          updatedOptions,
        );
      },
    );
  }

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
  private async uploadSeekableInternal(
    bodyFactory: (offset: number, size: number) => HttpRequestBody,
    size: number,
    options: BlockBlobParallelUploadOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    let blockSize = options.blockSize ?? 0;
    if (blockSize < 0 || blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
      throw new RangeError(
        `blockSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES}`,
      );
    }

    const maxSingleShotSize = options.maxSingleShotSize ?? BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES;

    if (maxSingleShotSize < 0 || maxSingleShotSize > BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES) {
      throw new RangeError(
        `maxSingleShotSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}`,
      );
    }

    if (blockSize === 0) {
      if (size > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES * BLOCK_BLOB_MAX_BLOCKS) {
        throw new RangeError(`${size} is too larger to upload to a block blob.`);
      }
      if (size > maxSingleShotSize) {
        blockSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
        if (blockSize < DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES) {
          blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
        }
      }
    }
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.conditions) {
      options.conditions = {};
    }

    return tracingClient.withSpan(
      "BlockBlobClient-uploadSeekableInternal",
      options,
      async (updatedOptions) => {
        if (size <= maxSingleShotSize) {
          return assertResponse(await this.upload(bodyFactory(0, size), size, updatedOptions));
        }

        const numBlocks: number = Math.floor((size - 1) / blockSize) + 1;
        if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
          throw new RangeError(
            `The buffer's size is too big or the BlockSize is too small;` +
              `the number of blocks must be <= ${BLOCK_BLOB_MAX_BLOCKS}`,
          );
        }

        const blockList: string[] = [];
        const blockIDPrefix = randomUUID();
        let transferProgress: number = 0;

        const batch = new Batch(options.concurrency);
        for (let i = 0; i < numBlocks; i++) {
          batch.addOperation(async (): Promise<any> => {
            const blockID = generateBlockID(blockIDPrefix, i);
            const start = blockSize * i;
            const end = i === numBlocks - 1 ? size : start + blockSize;
            const contentLength = end - start;
            blockList.push(blockID);
            await this.stageBlock(blockID, bodyFactory(start, contentLength), contentLength, {
              abortSignal: options.abortSignal,
              conditions: options.conditions,
              encryptionScope: options.encryptionScope,
              tracingOptions: updatedOptions.tracingOptions,
            });
            // Update progress after block is successfully uploaded to server, in case of block trying
            // TODO: Hook with convenience layer progress event in finer level
            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress!({
                loadedBytes: transferProgress,
              });
            }
          });
        }
        await batch.do();

        return this.commitBlockList(blockList, updatedOptions);
      },
    );
  }

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
  public async uploadFile(
    filePath: string,
    options: BlockBlobParallelUploadOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    return tracingClient.withSpan("BlockBlobClient-uploadFile", options, async (updatedOptions) => {
      const size = (await fsStat(filePath)).size;
      return this.uploadSeekableInternal(
        (offset, count) => {
          return () =>
            fsCreateReadStream(filePath, {
              autoClose: true,
              end: count ? offset + count - 1 : Infinity,
              start: offset,
            });
        },
        size,
        {
          ...options,
          tracingOptions: updatedOptions.tracingOptions,
        },
      );
    });
  }

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
  public async uploadStream(
    stream: Readable,
    bufferSize: number = DEFAULT_BLOCK_BUFFER_SIZE_BYTES,
    maxConcurrency: number = 5,
    options: BlockBlobUploadStreamOptions = {},
  ): Promise<BlobUploadCommonResponse> {
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.conditions) {
      options.conditions = {};
    }

    return tracingClient.withSpan(
      "BlockBlobClient-uploadStream",
      options,
      async (updatedOptions) => {
        let blockNum = 0;
        const blockIDPrefix = randomUUID();
        let transferProgress: number = 0;
        const blockList: string[] = [];

        const scheduler = new BufferScheduler(
          stream,
          bufferSize,
          maxConcurrency,
          async (body, length) => {
            const blockID = generateBlockID(blockIDPrefix, blockNum);
            blockList.push(blockID);
            blockNum++;

            await this.stageBlock(blockID, body, length, {
              customerProvidedKey: options.customerProvidedKey,
              conditions: options.conditions,
              encryptionScope: options.encryptionScope,
              tracingOptions: updatedOptions.tracingOptions,
            });

            // Update progress after block is successfully uploaded to server, in case of block trying
            transferProgress += length;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          },
          // concurrency should set a smaller value than maxConcurrency, which is helpful to
          // reduce the possibility when a outgoing handler waits for stream data, in
          // this situation, outgoing handlers are blocked.
          // Outgoing queue shouldn't be empty.
          Math.ceil((maxConcurrency / 4) * 3),
        );
        await scheduler.do();

        return assertResponse(
          await this.commitBlockList(blockList, {
            ...options,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
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
   * More Details - https://learn.microsoft.com/azure/storage/blobs/storage-blob-storage-tiers
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
 * Options to configure page blob - get page ranges segment operations.
 *
 * See:
 * - {@link PageBlobClient.listPageRangesSegment}
 * - {@link PageBlobClient.listPageRangeItemSegments}
 * - {@link PageBlobClient.listPageRangeItems}
 */
interface PageBlobListPageRangesSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   */
  conditions?: BlobRequestConditions;
  /**
   * Specifies the maximum number of containers
   * to return. If the request does not specify maxPageSize, or specifies a
   * value greater than 5000, the server will return up to 5000 items. Note
   * that if the listing operation crosses a partition boundary, then the
   * service will return a continuation token for retrieving the remainder of
   * the results. For this reason, it is possible that the service will return
   * fewer results than specified by maxPageSize, or than the default of 5000.
   */
  maxPageSize?: number;
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
 * Options to configure page blob - get page ranges diff segment operations.
 *
 * See:
 * - {@link PageBlobClient.listPageRangesDiffSegment}
 * - {@link PageBlobClient.listPageRangeDiffItemSegments}
 * - {@link PageBlobClient.listPageRangeDiffItems}
 */
interface PageBlobListPageRangesDiffSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   */
  conditions?: BlobRequestConditions;
  /**
   * Specifies the maximum number of containers
   * to return. If the request does not specify maxPageSize, or specifies a
   * value greater than 5000, the server will return up to 5000 items. Note
   * that if the listing operation crosses a partition boundary, then the
   * service will return a continuation token for retrieving the remainder of
   * the results. For this reason, it is possible that the service will return
   * fewer results than specified by maxPageSize, or than the default of 5000.
   */
  maxPageSize?: number;
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
  /**
   * Valid value is backup
   */
  sourceShareTokenIntent?: FileShareTokenIntent;
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
export class PageBlobClient extends BlobClient {
  /**
   * pageBlobsContext provided by protocol layer.
   */
  private pageBlobContext: PageBlob;

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
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
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
  constructor(
    url: string,
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  );
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
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | PipelineLike,
    blobNameOrOptions?: string | StoragePipelineOptions,
    // Legacy, no fix for eslint error without breaking. Disable it for this interface.
    /* eslint-disable-next-line @azure/azure-sdk/ts-naming-options*/
    options?: StoragePipelineOptions,
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: PipelineLike;
    let url: string;
    options = options || {};
    if (isPipelineLike(credentialOrPipelineOrContainerName)) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNodeLike && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
      options = blobNameOrOptions as StoragePipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      // The second parameter is undefined. Use anonymous credential.
      url = urlOrConnectionString;
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      // (connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions)
      const containerName = credentialOrPipelineOrContainerName;
      const blobName = blobNameOrOptions;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNodeLike) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey,
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          );

          if (!options.proxyOptions) {
            options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          }

          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName),
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string",
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(url, pipeline);
    this.pageBlobContext = this.storageClientContext.pageBlob;
  }

  /**
   * Creates a new PageBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param snapshot - The snapshot timestamp.
   * @returns A new PageBlobClient object identical to the source but with the specified snapshot timestamp.
   */
  public withSnapshot(snapshot: string): PageBlobClient {
    return new PageBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot,
      ),
      this.pipeline,
    );
  }

  /**
   * Creates a page blob of the specified length. Call uploadPages to upload data
   * data to a page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param size - size of the page blob.
   * @param options - Options to the Page Blob Create operation.
   * @returns Response data for the Page Blob Create operation.
   */
  public async create(
    size: number,
    options: PageBlobCreateOptions = {},
  ): Promise<PageBlobCreateResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("PageBlobClient-create", options, async (updatedOptions) => {
      return assertResponse<PageBlobCreateHeaders, PageBlobCreateHeaders>(
        await this.pageBlobContext.create(0, size, {
          abortSignal: options.abortSignal,
          blobHttpHeaders: options.blobHTTPHeaders,
          blobSequenceNumber: options.blobSequenceNumber,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          immutabilityPolicyExpiry: options.immutabilityPolicy?.expiriesOn,
          immutabilityPolicyMode: options.immutabilityPolicy?.policyMode,
          legalHold: options.legalHold,
          tier: toAccessTier(options.tier),
          blobTagsString: toBlobTagsString(options.tags),
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Creates a page blob of the specified length. Call uploadPages to upload data
   * data to a page blob. If the blob with the same name already exists, the content
   * of the existing blob will remain unchanged.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param size - size of the page blob.
   * @param options -
   */
  public async createIfNotExists(
    size: number,
    options: PageBlobCreateIfNotExistsOptions = {},
  ): Promise<PageBlobCreateIfNotExistsResponse> {
    return tracingClient.withSpan(
      "PageBlobClient-createIfNotExists",
      options,
      async (updatedOptions) => {
        try {
          const conditions = { ifNoneMatch: ETagAny };
          const res = assertResponse(
            await this.create(size, {
              ...options,
              conditions,
              tracingOptions: updatedOptions.tracingOptions,
            }),
          );
          return {
            succeeded: true,
            ...res,
            _response: res._response, // _response is made non-enumerable
          };
        } catch (e: any) {
          if (e.details?.errorCode === "BlobAlreadyExists") {
            return {
              succeeded: false,
              ...e.response?.parsedHeaders,
              _response: e.response,
            };
          }

          throw e;
        }
      },
    );
  }

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
  public async uploadPages(
    body: HttpRequestBody,
    offset: number,
    count: number,
    options: PageBlobUploadPagesOptions = {},
  ): Promise<PageBlobUploadPagesResponse> {
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan("PageBlobClient-uploadPages", options, async (updatedOptions) => {
      return assertResponse<PageBlobUploadPagesHeaders, PageBlobUploadPagesHeaders>(
        await this.pageBlobContext.uploadPages(count, body, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          requestOptions: {
            onUploadProgress: options.onProgress,
          },
          range: rangeToString({ offset, count }),
          sequenceNumberAccessConditions: options.conditions,
          transactionalContentMD5: options.transactionalContentMD5,
          transactionalContentCrc64: options.transactionalContentCrc64,
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * The Upload Pages operation writes a range of pages to a page blob where the
   * contents are read from a URL.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-page-from-url
   *
   * @param sourceURL - Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication
   * @param sourceOffset - The source offset to copy from. Pass 0 to copy from the beginning of source page blob
   * @param destOffset - Offset of destination page blob
   * @param count - Number of bytes to be uploaded from source page blob
   * @param options -
   */
  public async uploadPagesFromURL(
    sourceURL: string,
    sourceOffset: number,
    destOffset: number,
    count: number,
    options: PageBlobUploadPagesFromURLOptions = {},
  ): Promise<PageBlobUploadPagesFromURLResponse> {
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return tracingClient.withSpan(
      "PageBlobClient-uploadPagesFromURL",
      options,
      async (updatedOptions) => {
        return assertResponse<PageBlobUploadPagesFromURLHeaders, PageBlobUploadPagesFromURLHeaders>(
          await this.pageBlobContext.uploadPagesFromURL(
            sourceURL,
            rangeToString({ offset: sourceOffset, count }),
            0,
            rangeToString({ offset: destOffset, count }),
            {
              abortSignal: options.abortSignal,
              sourceContentMD5: options.sourceContentMD5,
              sourceContentCrc64: options.sourceContentCrc64,
              leaseAccessConditions: options.conditions,
              sequenceNumberAccessConditions: options.conditions,
              modifiedAccessConditions: {
                ...options.conditions,
                ifTags: options.conditions?.tagConditions,
              },
              sourceModifiedAccessConditions: {
                sourceIfMatch: options.sourceConditions?.ifMatch,
                sourceIfModifiedSince: options.sourceConditions?.ifModifiedSince,
                sourceIfNoneMatch: options.sourceConditions?.ifNoneMatch,
                sourceIfUnmodifiedSince: options.sourceConditions?.ifUnmodifiedSince,
              },
              cpkInfo: options.customerProvidedKey,
              encryptionScope: options.encryptionScope,
              copySourceAuthorization: httpAuthorizationToString(options.sourceAuthorization),
              fileRequestIntent: options.sourceShareTokenIntent,
              tracingOptions: updatedOptions.tracingOptions,
            },
          ),
        );
      },
    );
  }

  /**
   * Frees the specified pages from the page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/put-page
   *
   * @param offset - Starting byte position of the pages to clear.
   * @param count - Number of bytes to clear.
   * @param options - Options to the Page Blob Clear Pages operation.
   * @returns Response data for the Page Blob Clear Pages operation.
   */
  public async clearPages(
    offset: number = 0,
    count?: number,
    options: PageBlobClearPagesOptions = {},
  ): Promise<PageBlobClearPagesResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("PageBlobClient-clearPages", options, async (updatedOptions) => {
      return assertResponse<PageBlobClearPagesHeaders, PageBlobClearPagesHeaders>(
        await this.pageBlobContext.clearPages(0, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          range: rangeToString({ offset, count }),
          sequenceNumberAccessConditions: options.conditions,
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Returns the list of valid page ranges for a page blob or snapshot of a page blob.
   * @see https://learn.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param options - Options to the Page Blob Get Ranges operation.
   * @returns Response data for the Page Blob Get Ranges operation.
   */
  public async getPageRanges(
    offset: number = 0,
    count?: number,
    options: PageBlobGetPageRangesOptions = {},
  ): Promise<PageBlobGetPageRangesResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "PageBlobClient-getPageRanges",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          PageBlobGetPageRangesResponseInternal,
          PageBlobGetPageRangesHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRanges({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            range: rangeToString({ offset, count }),
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
        return rangeResponseFromModel(response);
      },
    );
  }

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
  private async listPageRangesSegment(
    offset: number = 0,
    count?: number,
    marker?: string,
    options: PageBlobListPageRangesSegmentOptions = {},
  ): Promise<PageBlobGetPageRangesResponseModel> {
    return tracingClient.withSpan(
      "PageBlobClient-getPageRangesSegment",
      options,
      async (updatedOptions) => {
        return assertResponse<
          PageBlobGetPageRangesResponseInternal,
          PageBlobGetPageRangesHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRanges({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            range: rangeToString({ offset, count }),
            marker: marker,
            maxPageSize: options.maxPageSize,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
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
  private async *listPageRangeItemSegments(
    offset: number = 0,
    count?: number,
    marker?: string,
    options: PageBlobListPageRangesSegmentOptions = {},
  ): AsyncIterableIterator<PageBlobGetPageRangesResponseModel> {
    let getPageRangeItemSegmentsResponse;
    if (!!marker || marker === undefined) {
      do {
        getPageRangeItemSegmentsResponse = await this.listPageRangesSegment(
          offset,
          count,
          marker,
          options,
        );
        marker = getPageRangeItemSegmentsResponse.continuationToken;
        yield await getPageRangeItemSegmentsResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator of {@link PageRangeInfo} objects
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param options - Options to List Page Ranges operation.
   */
  private async *listPageRangeItems(
    offset: number = 0,
    count?: number,
    options: PageBlobListPageRangesSegmentOptions = {},
  ): AsyncIterableIterator<PageRangeInfo> {
    let marker: string | undefined;
    for await (const getPageRangesSegment of this.listPageRangeItemSegments(
      offset,
      count,
      marker,
      options,
    )) {
      yield* ExtractPageRangeInfoItems(getPageRangesSegment);
    }
  }

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
  public listPageRanges(
    offset: number = 0,
    count?: number,
    options: PageBlobListPageRangesOptions = {},
  ): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesResponseModel> {
    options.conditions = options.conditions || {};
    // AsyncIterableIterator to iterate over blobs
    const iter = this.listPageRangeItems(offset, count, options);
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listPageRangeItemSegments(offset, count, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...options,
        });
      },
    };
  }

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
  public async getPageRangesDiff(
    offset: number,
    count: number,
    prevSnapshot: string,
    options: PageBlobGetPageRangesDiffOptions = {},
  ): Promise<PageBlobGetPageRangesDiffResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "PageBlobClient-getPageRangesDiff",
      options,
      async (updatedOptions) => {
        const result = assertResponse<
          PageBlobGetPageRangesDiffResponseInternal,
          PageBlobGetPageRangesDiffHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRangesDiff({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            prevsnapshot: prevSnapshot,
            range: rangeToString({ offset, count }),
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
        return rangeResponseFromModel(result);
      },
    );
  }

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
  private async listPageRangesDiffSegment(
    offset: number,
    count: number,
    prevSnapshotOrUrl: string,
    marker?: string,
    options: PageBlobListPageRangesDiffSegmentOptions = {},
  ): Promise<PageBlobGetPageRangesResponseModel> {
    return tracingClient.withSpan(
      "PageBlobClient-getPageRangesDiffSegment",
      options,
      async (updatedOptions) => {
        return assertResponse<
          PageBlobGetPageRangesResponseInternal,
          PageBlobGetPageRangesHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRangesDiff({
            abortSignal: options?.abortSignal,
            leaseAccessConditions: options?.conditions,
            modifiedAccessConditions: {
              ...options?.conditions,
              ifTags: options?.conditions?.tagConditions,
            },
            prevsnapshot: prevSnapshotOrUrl,
            range: rangeToString({
              offset: offset,
              count: count,
            }),
            marker: marker,
            maxPageSize: options?.maxPageSize,
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
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
  private async *listPageRangeDiffItemSegments(
    offset: number,
    count: number,
    prevSnapshotOrUrl: string,
    marker?: string,
    options?: PageBlobListPageRangesDiffSegmentOptions,
  ): AsyncIterableIterator<PageBlobGetPageRangesDiffResponseModel> {
    let getPageRangeItemSegmentsResponse: PageBlobGetPageRangesResponseModel;
    if (!!marker || marker === undefined) {
      do {
        getPageRangeItemSegmentsResponse = await this.listPageRangesDiffSegment(
          offset,
          count,
          prevSnapshotOrUrl,
          marker,
          options,
        );
        marker = getPageRangeItemSegmentsResponse.continuationToken;
        yield await getPageRangeItemSegmentsResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator of {@link PageRangeInfo} objects
   *
   * @param offset - Starting byte position of the page ranges.
   * @param count - Number of bytes to get.
   * @param prevSnapshotOrUrl - Timestamp of snapshot to retrieve the difference or URL of snapshot to retrieve the difference.
   * @param options - Options to the Page Blob Get Page Ranges Diff operation.
   */
  private async *listPageRangeDiffItems(
    offset: number,
    count: number,
    prevSnapshotOrUrl: string,
    options?: PageBlobListPageRangesDiffSegmentOptions,
  ): AsyncIterableIterator<PageRangeInfo> {
    let marker: string | undefined;
    for await (const getPageRangesSegment of this.listPageRangeDiffItemSegments(
      offset,
      count,
      prevSnapshotOrUrl,
      marker,
      options,
    )) {
      yield* ExtractPageRangeInfoItems(getPageRangesSegment);
    }
  }

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
  public listPageRangesDiff(
    offset: number,
    count: number,
    prevSnapshot: string,
    options: PageBlobListPageRangesDiffOptions = {},
  ): PagedAsyncIterableIterator<PageRangeInfo, PageBlobGetPageRangesDiffResponseModel> {
    options.conditions = options.conditions || {};

    // AsyncIterableIterator to iterate over blobs
    const iter = this.listPageRangeDiffItems(offset, count, prevSnapshot, {
      ...options,
    });
    return {
      /**
       * The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listPageRangeDiffItemSegments(
          offset,
          count,
          prevSnapshot,
          settings.continuationToken,
          {
            maxPageSize: settings.maxPageSize,
            ...options,
          },
        );
      },
    };
  }

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
  public async getPageRangesDiffForManagedDisks(
    offset: number,
    count: number,
    prevSnapshotUrl: string,
    options: PageBlobGetPageRangesDiffOptions = {},
  ): Promise<PageBlobGetPageRangesDiffResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "PageBlobClient-GetPageRangesDiffForManagedDisks",
      options,
      async (updatedOptions) => {
        const response = assertResponse<
          PageBlobGetPageRangesDiffResponseInternal,
          PageBlobGetPageRangesDiffHeaders,
          PageListInternal
        >(
          await this.pageBlobContext.getPageRangesDiff({
            abortSignal: options.abortSignal,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            prevSnapshotUrl,
            range: rangeToString({ offset, count }),
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
        return rangeResponseFromModel(response);
      },
    );
  }

  /**
   * Resizes the page blob to the specified size (which must be a multiple of 512).
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param size - Target size
   * @param options - Options to the Page Blob Resize operation.
   * @returns Response data for the Page Blob Resize operation.
   */
  public async resize(
    size: number,
    options: PageBlobResizeOptions = {},
  ): Promise<PageBlobResizeResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan("PageBlobClient-resize", options, async (updatedOptions) => {
      return assertResponse<PageBlobResizeHeaders, PageBlobResizeHeaders>(
        await this.pageBlobContext.resize(size, {
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: {
            ...options.conditions,
            ifTags: options.conditions?.tagConditions,
          },
          encryptionScope: options.encryptionScope,
          tracingOptions: updatedOptions.tracingOptions,
        }),
      );
    });
  }

  /**
   * Sets a page blob's sequence number.
   * @see https://learn.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param sequenceNumberAction - Indicates how the service should modify the blob's sequence number.
   * @param sequenceNumber - Required if sequenceNumberAction is max or update
   * @param options - Options to the Page Blob Update Sequence Number operation.
   * @returns Response data for the Page Blob Update Sequence Number operation.
   */
  public async updateSequenceNumber(
    sequenceNumberAction: SequenceNumberActionType,
    sequenceNumber?: number,
    options: PageBlobUpdateSequenceNumberOptions = {},
  ): Promise<PageBlobUpdateSequenceNumberResponse> {
    options.conditions = options.conditions || {};
    return tracingClient.withSpan(
      "PageBlobClient-updateSequenceNumber",
      options,
      async (updatedOptions) => {
        return assertResponse<
          PageBlobUpdateSequenceNumberHeaders,
          PageBlobUpdateSequenceNumberHeaders
        >(
          await this.pageBlobContext.updateSequenceNumber(sequenceNumberAction, {
            abortSignal: options.abortSignal,
            blobSequenceNumber: sequenceNumber,
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }

  /**
   * Begins an operation to start an incremental copy from one page blob's snapshot to this page blob.
   * The snapshot is copied such that only the differential changes between the previously
   * copied snapshot are transferred to the destination.
   * The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual.
   * @see https://learn.microsoft.com/rest/api/storageservices/incremental-copy-blob
   * @see https://learn.microsoft.com/azure/virtual-machines/windows/incremental-snapshots
   *
   * @param copySource - Specifies the name of the source page blob snapshot. For example,
   *                            https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param options - Options to the Page Blob Copy Incremental operation.
   * @returns Response data for the Page Blob Copy Incremental operation.
   */
  public async startCopyIncremental(
    copySource: string,
    options: PageBlobStartCopyIncrementalOptions = {},
  ): Promise<PageBlobCopyIncrementalResponse> {
    return tracingClient.withSpan(
      "PageBlobClient-startCopyIncremental",
      options,
      async (updatedOptions) => {
        return assertResponse<PageBlobCopyIncrementalHeaders, PageBlobCopyIncrementalHeaders>(
          await this.pageBlobContext.copyIncremental(copySource, {
            abortSignal: options.abortSignal,
            modifiedAccessConditions: {
              ...options.conditions,
              ifTags: options.conditions?.tagConditions,
            },
            tracingOptions: updatedOptions.tracingOptions,
          }),
        );
      },
    );
  }
}
