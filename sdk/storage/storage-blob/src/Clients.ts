// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { AbortSignalLike } from "@azure/abort-controller";
import {
  generateUuid,
  getDefaultProxySettings,
  HttpRequestBody,
  HttpResponse,
  isNode,
  isTokenCredential,
  TokenCredential,
  TransferProgressEvent,
  URLBuilder,
} from "@azure/core-http";
import { PollerLike, PollOperationState } from "@azure/core-lro";
import { PagedAsyncIterableIterator, PageSettings } from "@azure/core-paging";
import { CanonicalCode } from "@opentelemetry/api";
import { Readable } from "stream";

import { BlobDownloadResponse } from "./BlobDownloadResponse";
import { BlobQueryResponse } from "./BlobQueryResponse";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AppendBlob, Blob as StorageBlob, BlockBlob, Container, PageBlob } from "./generated/src/operations";
import { StorageClientContext } from "./generated/src/storageClient";
import {
  AppendBlobAppendBlockFromUrlResponse,
  AppendBlobAppendBlockResponse,
  AppendBlobCreateResponse,
  BlobAbortCopyFromURLResponse,
  BlobCopyFromURLResponse,
  BlobCreateSnapshotResponse,
  BlobDeleteResponse,
  BlobDownloadOptionalParams,
  BlobDownloadResponseModel,
  BlobGetPropertiesResponseModel,
  BlobGetTagsHeaders,
  BlobHTTPHeaders,
  BlobPrefix,
  BlobProperties,
  BlobSetHTTPHeadersResponse,
  BlobSetMetadataResponse,
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
  ContainerBreakLeaseOptionalParams,
  ContainerCreateResponse,
  ContainerDeleteResponse,
  ContainerEncryptionScope,
  ContainerGetAccessPolicyHeaders,
  ContainerGetPropertiesResponse,
  ContainerListBlobFlatSegmentHeaders,
  ContainerListBlobHierarchySegmentHeaders,
  ContainerSetAccessPolicyResponse,
  ContainerSetMetadataResponse,
  CpkInfo,
  DeleteSnapshotsOptionType,
  LeaseAccessConditions,
  ListBlobsFlatSegmentResponseModel,
  ListBlobsHierarchySegmentResponseModel,
  ListBlobsIncludeItem,
  ModifiedAccessConditions,
  PageBlobClearPagesResponse,
  PageBlobCopyIncrementalResponse,
  PageBlobCreateResponse,
  PageBlobResizeResponse,
  PageBlobUpdateSequenceNumberResponse,
  PageBlobUploadPagesFromURLResponse,
  PageBlobUploadPagesResponse,
  PublicAccessType,
  RehydratePriority,
  SequenceNumberActionType,
  SignedIdentifierModel,
} from "./generatedModels";
import {
  AppendBlobRequestConditions,
  BlobDownloadResponseParsed,
  BlobRequestConditions,
  BlockBlobTier,
  ensureCpkIfSpecified,
  Metadata,
  ObjectReplicationPolicy,
  PageBlobRequestConditions,
  PremiumPageBlobTier,
  Tags,
  toAccessTier
} from "./models";
import {
  PageBlobGetPageRangesDiffResponse,
  PageBlobGetPageRangesResponse,
  rangeResponseFromModel,
} from "./PageBlobRangeResponse";
import { newPipeline, Pipeline, StoragePipelineOptions } from "./Pipeline";
import {
  BlobBeginCopyFromUrlPoller,
  BlobBeginCopyFromUrlPollState,
  CopyPollerBlobClient,
} from "./pollers/BlobStartCopyFromUrlPoller";
import { Range, rangeToString } from "./Range";
import { CommonOptions, StorageClient } from "./StorageClient";
import { Batch } from "./utils/Batch";
import { BufferScheduler } from "./utils/BufferScheduler";
import {
  BLOCK_BLOB_MAX_BLOCKS,
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES,
  DEFAULT_BLOCK_BUFFER_SIZE_BYTES,
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  ETagAny,
  ETagNone,
  URLConstants,
} from "./utils/constants";
import { createSpan } from "./utils/tracing";
import {
  appendToURLPath,
  extractConnectionStringParts,
  generateBlockID,
  isIpEndpointStyle,
  parseObjectReplicationRecord,
  setURLParameter,
  toBlobTags,
  toBlobTagsString,
  toQuerySerialization,
  toTags,
  truncatedISO8061Date,
} from "./utils/utils.common";
import { fsCreateReadStream, fsStat, readStreamToLocalFile, streamToBuffer } from "./utils/utils.node";


/**
 * Options to configure the {@link BlobClient.beginCopyFromURL} operation.
 *
 * @export
 * @interface BlobBeginCopyFromURLOptions
 */
export interface BlobBeginCopyFromURLOptions extends BlobStartCopyFromURLOptions {
  /**
   * The amount of time in milliseconds the poller should wait between
   * calls to the service to determine the status of the Blob copy.
   * Defaults to 15 seconds.
   *
   * @type {number}
   * @memberof BlobBeginCopyFromURLOptions
   */
  intervalInMs?: number;
  /**
   * Callback to receive the state of the copy progress.
   *
   * @memberof BlobBeginCopyFromURLOptions
   */
  onProgress?: (state: BlobBeginCopyFromUrlPollState) => void;
  /**
   * Serialized poller state that can be used to resume polling from.
   * This may be useful when starting a copy on one process or thread
   * and you wish to continue polling on another process or thread.
   *
   * To get serialized poller state, call `poller.toString()` on an existing
   * poller.
   *
   * @memberof BlobBeginCopyFromURLOptions
   */
  resumeFrom?: string;
}

/**
 * Contains response data for the {@link BlobClient.beginCopyFromURL} operation.
 *
 * @export
 * @interface BlobBeginCopyFromURLResponse
 */
export interface BlobBeginCopyFromURLResponse extends BlobStartCopyFromURLResponse {}

/**
 * Options to configure the {@link BlobClient.download} operation.
 *
 * @export
 * @interface BlobDownloadOptions
 */
export interface BlobDownloadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobDownloadOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * An opaque DateTime string value that, when present, specifies the blob snapshot to retrieve.
   *
   * @type {string}
   * @memberof BlobDownloadOptions
   */
  snapshot?: string;
  /**
   * When this is set to true and download range of blob, the service returns the MD5 hash for the range,
   * as long as the range is less than or equal to 4 MB in size.
   *
   * rangeGetContentCrc64 and rangeGetContentMD5 cannot be set at same time.
   *
   * @type {boolean}
   * @memberof BlobDownloadOptions
   */
  rangeGetContentMD5?: boolean;
  /**
   * When this is set to true and download range of blob, the service returns the CRC64 hash for the range,
   * as long as the range is less than or equal to 4 MB in size.
   *
   * rangeGetContentCrc64 and rangeGetContentMD5 cannot be set at same time.
   *
   * @type {boolean}
   * @memberof BlobDownloadOptions
   */
  rangeGetContentCrc64?: boolean;
  /**
   * Conditions to meet when downloading blobs.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobDownloadOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Call back to receive events on the progress of download operation.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof BlobDownloadOptions
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
   *
   * @type {number}
   * @memberof BlobDownloadOptions
   */
  maxRetryRequests?: number;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobDownloadOptions
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.exists} operation.
 *
 * @export
 * @interface BlobExistsOptions
 */
export interface BlobExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobExistsOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobExistsOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Conditions to meet.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobExistsOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure the {@link BlobClient.getProperties} operation.
 *
 * @export
 * @interface BlobGetPropertiesOptions
 */
export interface BlobGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobGetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting blob properties.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobGetPropertiesOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobGetPropertiesOptions
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.delete} operation.
 *
 * @export
 * @interface BlobDeleteOptions
 */
export interface BlobDeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobDeleteOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when deleting blobs.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobDeleteOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Specifies options to delete blobs that have associated snapshots.
   * - `include`: Delete the base blob and all of its snapshots.
   * - `only`: Delete only the blob's snapshots and not the blob itself.
   *
   * @type {DeleteSnapshotsOptionType}
   * @memberof BlobDeleteOptions
   */
  deleteSnapshots?: DeleteSnapshotsOptionType;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobDeleteOptions
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.undelete} operation.
 *
 * @export
 * @interface BlobUndeleteOptions
 */
export interface BlobUndeleteOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobUndeleteOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobUndeleteOptions
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.setHTTPHeaders} operation.
 *
 * @export
 * @interface BlobSetHTTPHeadersOptions
 */
export interface BlobSetHTTPHeadersOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobSetHTTPHeadersOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting blob HTTP headers.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobSetHTTPHeadersOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobSetHTTPHeadersOptions
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure the {@link BlobClient.setMetadata} operation.
 *
 * @export
 * @interface BlobSetMetadataOptions
 */
export interface BlobSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobSetMetadataOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting blob metadata.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobSetMetadataOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobSetMetadataOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof BlobSetMetadataOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure the {@link BlobClient.setTags} operation.
 *
 * @export
 * @interface BlobSetTagsOptions
 */
export interface BlobSetTagsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobSetTagsOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure the {@link BlobClient.getTags} operation.
 *
 * @export
 * @interface BlobGetTagsOptions
 */
export interface BlobGetTagsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobGetTagsOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Contains response data for the {@link ContainerClient.getTags} operation.
 */
export type BlobGetTagsResponse = { tags: Tags } & BlobGetTagsHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: BlobGetTagsHeaders;

      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: BlobTags;
    };
  };

/**
 * Options to configure Blob - Acquire Lease operation.
 *
 * @export
 * @interface BlobAcquireLeaseOptions
 */
export interface BlobAcquireLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobAcquireLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when acquiring the lease of a blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof BlobAcquireLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Release Lease operation.
 *
 * @export
 * @interface BlobReleaseLeaseOptions
 */
export interface BlobReleaseLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobReleaseLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when releasing the lease of a blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof BlobReleaseLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Renew Lease operation.
 *
 * @export
 * @interface BlobRenewLeaseOptions
 */
export interface BlobRenewLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobRenewLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when renewing the lease of a blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof BlobRenewLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Change Lease operation.
 *
 * @export
 * @interface BlobChangeLeaseOptions
 */
export interface BlobChangeLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobChangeLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease of a blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof BlobChangeLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Break Lease operation.
 *
 * @export
 * @interface BlobBreakLeaseOptions
 */
export interface BlobBreakLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobBreakLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when breaking the lease of a blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof BlobBreakLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure the {@link BlobClient.createSnapshot} operation.
 *
 * @export
 * @interface BlobCreateSnapshotOptions
 */
export interface BlobCreateSnapshotOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobCreateSnapshotOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the snapshot.
   *
   * @type {Metadata}
   * @memberof BlobCreateSnapshotOptions
   */
  metadata?: Metadata;
  /**
   * Conditions to meet when creating blob snapshots.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobCreateSnapshotOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobCreateSnapshotOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof BlobCreateSnapshotOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure the {@link BlobClient.beginCopyFromURL} operation.
 *
 * @export
 * @interface BlobStartCopyFromURLOptions
 */
export interface BlobStartCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobStartCopyFromURLOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the blob that are being copied.
   *
   * @type {Metadata}
   * @memberof BlobStartCopyFromURLOptions
   */
  metadata?: Metadata;
  /**
   * Conditions to meet for the destination blob when copying from a URL to the blob.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobStartCopyFromURLOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof BlobStartCopyFromURLOptions
   */
  sourceConditions?: ModifiedAccessConditions;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   *
   * @type {BlockBlobTier | PremiumPageBlobTier | string}
   * @memberof BlobStartCopyFromURLOptions
   */
  tier?: BlockBlobTier | PremiumPageBlobTier | string;
  /**
   * Rehydrate Priority - possible values include 'High', 'Standard'.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
   *
   * @type {RehydratePriority}
   * @memberof BlobStartCopyFromURLOptions
   */
  rehydratePriority?: RehydratePriority;
  /**
   * Blob tags.
   *
   * @type {Tags}
   * @memberof BlobStartCopyFromURLOptions
   */
  tags?: Tags;
  /**
   * Overrides the sealed state of the destination blob. Default true.
   *
   * @type {boolean}
   * @memberof BlobStartCopyFromURLOptions
   */
  sealBlob?: boolean;
}

/**
 * Options to configure the {@link BlobClient.abortCopyFromURL} operation.
 *
 * @export
 * @interface BlobAbortCopyFromURLOptions
 */
export interface BlobAbortCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobAbortCopyFromURLOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof BlobAbortCopyFromURLOptions
   */
  conditions?: LeaseAccessConditions;
}

/**
 * Options to configure the {@link BlobClient.syncCopyFromURL} operation.
 *
 * @export
 * @interface BlobSyncCopyFromURLOptions
 */
export interface BlobSyncCopyFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobSyncCopyFromURLOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the snapshot.
   *
   * @type {Metadata}
   * @memberof BlobSyncCopyFromURLOptions
   */
  metadata?: Metadata;
  /**
   * Conditions to meet for the destination blob when copying from a URL to the blob.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobSyncCopyFromURLOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof BlobSyncCopyFromURLOptions
   */
  sourceConditions?: ModifiedAccessConditions;
  /**
   * Specify the md5 calculated for the range of bytes that must be read from the copy source.
   *
   * @type {Uint8Array}
   * @memberof BlobSyncCopyFromURLOptions
   */
  sourceContentMD5?: Uint8Array;
  /**
   * Blob tags.
   *
   * @type {Tags}
   * @memberof BlobSyncCopyFromURLOptions
   */
  tags?: Tags;
}

/**
 * Options to configure the {@link BlobClient.setAccessTier} operation.
 *
 * @export
 * @interface BlobSetTierOptions
 */
export interface BlobSetTierOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobSetTierOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof BlobSetTierOptions
   */
  conditions?: LeaseAccessConditions;
  /**
   * Rehydrate Priority - possible values include 'High', 'Standard'.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
   *
   * @type {RehydratePriority}
   * @memberof BlobSetTierOptions
   */
  rehydratePriority?: RehydratePriority;
}

/**
 * Option interface for the {@link BlobClient.downloadToBuffer} operation.
 *
 * @export
 * @interface BlobDownloadToBufferOptions
 */
export interface BlobDownloadToBufferOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlobDownloadToBufferOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * blockSize is the data every request trying to download.
   * Must be >= 0, if set to 0 or undefined, blockSize will automatically calculated according
   * to the blob size.
   *
   * @type {number}
   * @memberof BlobDownloadToBufferOptions
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
   *
   * @type {number}
   * @memberof BlobDownloadToBufferOptions
   */
  maxRetryRequestsPerBlock?: number;

  /**
   * Progress updater.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof BlobDownloadToBufferOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Access conditions headers.
   *
   * @type {BlobRequestConditions}
   * @memberof BlobDownloadToBufferOptions
   */
  conditions?: BlobRequestConditions;

  /**
   * Concurrency of parallel download.
   *
   * @type {number}
   * @memberof BlobDownloadToBufferOptions
   */
  concurrency?: number;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlobDownloadToBufferOptions
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Contains response data for the {@link BlobClient.deleteIfExists} operation.
 *
 * @export
 * @interface BlobDeleteIfExistsResponse
 */
export interface BlobDeleteIfExistsResponse extends BlobDeleteResponse {
  /**
   * Indicate whether the blob is successfully deleted. Is false if the blob does not exist in the first place.
   *
   * @type {boolean}
   * @memberof BlobDeleteIfExistsResponse
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link BlobClient.getProperties} operation.
 *
 * @export
 * @interface BlobGetPropertiesResponse
 */
export interface BlobGetPropertiesResponse extends BlobGetPropertiesResponseModel {
  /**
   * Parsed Object Replication Policy Id, Rule Id(s) and status of the source blob.
   *
   * @type {ObjectReplicationPolicy[]}
   * @memberof BlobGetPropertiesResponse
   */
  objectReplicationSourceProperties?: ObjectReplicationPolicy[];

  /**
   * Object Replication Policy Id of the destination blob.
   *
   * @type {string}
   * @memberof BlobGetPropertiesResponse
   */
  objectReplicationDestinationPolicyId?: string;
}

/**
 * A BlobClient represents a URL to an Azure Storage blob; the blob may be a block blob,
 * append blob, or page blob.
 *
 * @export
 * @class BlobClient
 */
export class BlobClient extends StorageClient {
  /**
   * blobContext provided by protocol layer.
   *
   * @private
   * @type {Blobs}
   * @memberof BlobClient
   */
  private blobContext: StorageBlob;

  private _name: string;
  private _containerName: string;

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
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} containerName Container name.
   * @param {string} blobName Blob name.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobClient
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blob".
   *                     You can append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlobClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    blobNameOrOptions?: string | StoragePipelineOptions,
    options?: StoragePipelineOptions
  ) {
    options = options || {};
    let pipeline: Pipeline;
    let url: string;
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
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
        if (isNode) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName)
          );

          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName)
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }

    super(url, pipeline);
    ({
      blobName: this._name,
      containerName: this._containerName
    } = this.getBlobAndContainerNamesFromUrl());
    this.blobContext = new StorageBlob(this.storageClientContext);
  }

  /**
   * Creates a new BlobClient object identical to the source but with the specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param {string} snapshot The snapshot timestamp.
   * @returns {BlobClient} A new BlobClient object identical to the source but with the specified snapshot timestamp
   * @memberof BlobClient
   */
  public withSnapshot(snapshot: string): BlobClient {
    return new BlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot
      ),
      this.pipeline
    );
  }

  /**
   * Creates a new BlobClient object pointing to a version of this blob.
   * Provide "" will remove the versionId and return a Client to the base blob.
   *
   * @param {string} versionId The versionId.
   * @returns {BlobClient} A new BlobClient object pointing to the version of this blob.
   * @memberof BlobClient
   */
  public withVersion(versionId: string): BlobClient {
    return new BlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.VERSIONID,
        versionId.length === 0 ? undefined : versionId
      ),
      this.pipeline
    );
  }

  /**
   * Creates a AppendBlobClient object.
   *
   * @returns {AppendBlobClient}
   * @memberof BlobClient
   */
  public getAppendBlobClient(): AppendBlobClient {
    return new AppendBlobClient(this.url, this.pipeline);
  }

  /**
   * Creates a BlockBlobClient object.
   *
   * @returns {BlockBlobClient}
   * @memberof BlobClient
   */
  public getBlockBlobClient(): BlockBlobClient {
    return new BlockBlobClient(this.url, this.pipeline);
  }

  /**
   * Creates a PageBlobClient object.
   *
   * @returns {PageBlobClient}
   * @memberof BlobClient
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
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob
   *
   * @param {number} [offset] From which position of the blob to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {BlobDownloadOptions} [options] Optional options to Blob Download operation.
   * @returns {Promise<BlobDownloadResponseParsed>}
   * @memberof BlobClient
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Download and convert a blob to a string
   * const downloadBlockBlobResponse = await blobClient.download();
   * const downloaded = await streamToString(downloadBlockBlobResponse.readableStreamBody);
   * console.log("Downloaded blob content:", downloaded);
   *
   * async function streamToString(readableStream) {
   *   return new Promise((resolve, reject) => {
   *     const chunks = [];
   *     readableStream.on("data", (data) => {
   *       chunks.push(data.toString());
   *     });
   *     readableStream.on("end", () => {
   *       resolve(chunks.join(""));
   *     });
   *     readableStream.on("error", reject);
   *   });
   * }
   * ```
   *
   * Example usage (browser):
   *
   * ```js
   * // Download and convert a blob to a string
   * const downloadBlockBlobResponse = await blobClient.download();
   * const downloaded = await blobToString(await downloadBlockBlobResponse.blobBody);
   * console.log(
   *   "Downloaded blob content",
   *   downloaded
   * );
   *
   * async function blobToString(blob: Blob): Promise<string> {
   *   const fileReader = new FileReader();
   *   return new Promise<string>((resolve, reject) => {
   *     fileReader.onloadend = (ev: any) => {
   *       resolve(ev.target!.result);
   *     };
   *     fileReader.onerror = reject;
   *     fileReader.readAsText(blob);
   *   });
   * }
   * ```
   */
  public async download(
    offset: number = 0,
    count?: number,
    options: BlobDownloadOptions = {}
  ): Promise<BlobDownloadResponseParsed> {
    options.conditions = options.conditions || {};
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    const { span, spanOptions } = createSpan("BlobClient-download", options.tracingOptions);

    try {
      const res = await this.blobContext.download({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        onDownloadProgress: isNode ? undefined : options.onProgress, // for Node.js, progress is reported by RetriableReadableStream
        range: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
        rangeGetContentMD5: options.rangeGetContentMD5,
        rangeGetContentCRC64: options.rangeGetContentCrc64,
        snapshot: options.snapshot,
        cpkInfo: options.customerProvidedKey,
        spanOptions
      });

      const wrappedRes = {
        ...res,
        _response: res._response, // _response is made non-enumerable
        objectReplicationDestinationPolicyId: res.objectReplicationPolicyId,
        objectReplicationSourceProperties: parseObjectReplicationRecord(res.objectReplicationRules)
      };
      // Return browser response immediately
      if (!isNode) {
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
          const updatedOptions: BlobDownloadOptionalParams = {
            leaseAccessConditions: options.conditions,
            modifiedAccessConditions: {
              ifMatch: options.conditions!.ifMatch || res.etag,
              ifModifiedSince: options.conditions!.ifModifiedSince,
              ifNoneMatch: options.conditions!.ifNoneMatch,
              ifUnmodifiedSince: options.conditions!.ifUnmodifiedSince
            },
            range: rangeToString({
              count: offset + res.contentLength! - start,
              offset: start
            }),
            rangeGetContentMD5: options.rangeGetContentMD5,
            rangeGetContentCRC64: options.rangeGetContentCrc64,
            snapshot: options.snapshot,
            cpkInfo: options.customerProvidedKey
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
              ...updatedOptions
            })
          ).readableStreamBody!;
        },
        offset,
        res.contentLength!,
        {
          abortSignal: options.abortSignal,
          maxRetryRequests: options.maxRetryRequests,
          onProgress: options.onProgress
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns true if the Azure blob resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing blob might be deleted by other clients or
   * applications. Vice versa new blobs might be added by other clients or applications after this
   * function completes.
   *
   * @param {BlobExistsOptions} [options] options to Exists operation.
   * @returns {Promise<boolean>}
   * @memberof BlobClient
   */
  public async exists(options: BlobExistsOptions = {}): Promise<boolean> {
    const { span, spanOptions } = createSpan("BlobClient-exists", options.tracingOptions);
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      await this.getProperties({
        abortSignal: options.abortSignal,
        customerProvidedKey: options.customerProvidedKey,
        conditions: options.conditions,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
      return true;
    } catch (e) {
      if (e.statusCode === 404) {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when checking blob existence"
        });
        return false;
      }
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the blob. It does not return the content of the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-properties
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the methods of {@link ContainerClient} that list blobs using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @param {BlobGetPropertiesOptions} [options] Optional options to Get Properties operation.
   * @returns {Promise<BlobGetPropertiesResponse>}
   * @memberof BlobClient
   */
  public async getProperties(
    options: BlobGetPropertiesOptions = {}
  ): Promise<BlobGetPropertiesResponse> {
    const { span, spanOptions } = createSpan("BlobClient-getProperties", options.tracingOptions);
    try {
      options.conditions = options.conditions || {};
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      const res = await this.blobContext.getProperties({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        cpkInfo: options.customerProvidedKey,
        spanOptions
      });

      return {
        ...res,
        _response: res._response, // _response is made non-enumerable
        objectReplicationDestinationPolicyId: res.objectReplicationPolicyId,
        objectReplicationSourceProperties: parseObjectReplicationRecord(res.objectReplicationRules)
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param {BlobDeleteOptions} [options] Optional options to Blob Delete operation.
   * @returns {Promise<BlobDeleteResponse>}
   * @memberof BlobClient
   */
  public async delete(options: BlobDeleteOptions = {}): Promise<BlobDeleteResponse> {
    const { span, spanOptions } = createSpan("BlobClient-delete", options.tracingOptions);
    options.conditions = options.conditions || {};
    try {
      return await this.blobContext.deleteMethod({
        abortSignal: options.abortSignal,
        deleteSnapshots: options.deleteSnapshots,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Marks the specified blob or snapshot for deletion if it exists. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param {BlobDeleteOptions} [options] Optional options to Blob Delete operation.
   * @returns {Promise<BlobDeleteIfExistsResponse>}
   * @memberof BlobClient
   */
  public async deleteIfExists(
    options: BlobDeleteOptions = {}
  ): Promise<BlobDeleteIfExistsResponse> {
    const { span, spanOptions } = createSpan("BlobClient-deleteIfExists", options.tracingOptions);
    try {
      const res = await this.delete({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res,
        _response: res._response // _response is made non-enumerable
      };
    } catch (e) {
      if (e.details?.errorCode === "BlobNotFound") {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when deleting a blob or snapshot only if it exists."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Restores the contents and metadata of soft deleted blob and any associated
   * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
   * or later.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/undelete-blob
   *
   * @param {BlobUndeleteOptions} [options] Optional options to Blob Undelete operation.
   * @returns {Promise<BlobUndeleteResponse>}
   * @memberof BlobClient
   */
  public async undelete(options: BlobUndeleteOptions = {}): Promise<BlobUndeleteResponse> {
    const { span, spanOptions } = createSpan("BlobClient-undelete", options.tracingOptions);
    try {
      return await this.blobContext.undelete({
        abortSignal: options.abortSignal,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets system properties on the blob.
   *
   * If no value provided, or no value provided for the specified blob HTTP headers,
   * these blob HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param {BlobHTTPHeaders} [blobHTTPHeaders] If no value provided, or no value provided for
   *                                                   the specified blob HTTP headers, these blob HTTP
   *                                                   headers without a value will be cleared.
   * @param {BlobSetHTTPHeadersOptions} [options] Optional options to Blob Set HTTP Headers operation.
   * @returns {Promise<BlobSetHTTPHeadersResponse>}
   * @memberof BlobClient
   */
  public async setHTTPHeaders(
    blobHTTPHeaders?: BlobHTTPHeaders,
    options: BlobSetHTTPHeadersOptions = {}
  ): Promise<BlobSetHTTPHeadersResponse> {
    const { span, spanOptions } = createSpan("BlobClient-setHTTPHeaders", options.tracingOptions);
    options.conditions = options.conditions || {};
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.blobContext.setHTTPHeaders({
        abortSignal: options.abortSignal,
        blobHTTPHeaders,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        cpkInfo: options.customerProvidedKey,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets user-defined metadata for the specified blob as one or more name-value pairs.
   *
   * If no option provided, or no metadata defined in the parameter, the blob
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-metadata
   *
   * @param {Metadata} [metadata] Replace existing metadata with this value.
   *                               If no value provided the existing metadata will be removed.
   * @param {BlobSetMetadataOptions} [options] Optional options to Set Metadata operation.
   * @returns {Promise<BlobSetMetadataResponse>}
   * @memberof BlobClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: BlobSetMetadataOptions = {}
  ): Promise<BlobSetMetadataResponse> {
    const { span, spanOptions } = createSpan("BlobClient-setMetadata", options.tracingOptions);
    options.conditions = options.conditions || {};
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.blobContext.setMetadata({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        metadata,
        modifiedAccessConditions: options.conditions,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets tags on the underlying blob.
   * A blob can have up to 10 tags. Tag keys must be between 1 and 128 characters.  Tag values must be between 0 and 256 characters.
   * Valid tag key and value characters include lower and upper case letters, digits (0-9),
   * space (' '), plus ('+'), minus ('-'), period ('.'), foward slash ('/'), colon (':'), equals ('='), and underscore ('_').
   *
   * @param {Tags} tags
   * @param {BlobSetTagsOptions} [options={}]
   * @returns {Promise<BlobSetTagsResponse>}
   * @memberof BlobClient
   */
  public async setTags(tags: Tags, options: BlobSetTagsOptions = {}): Promise<BlobSetTagsResponse> {
    const { span, spanOptions } = createSpan("BlobClient-setTags", options.tracingOptions);
    try {
      return await this.blobContext.setTags({
        abortSignal: options.abortSignal,
        spanOptions,
        tags: toBlobTags(tags)
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the tags associated with the underlying blob.
   *
   * @param {BlobGetTagsOptions} [options={}]
   * @returns {Promise<BlobGetTagsResponse>}
   * @memberof BlobClient
   */
  public async getTags(options: BlobGetTagsOptions = {}): Promise<BlobGetTagsResponse> {
    const { span, spanOptions } = createSpan("BlobClient-getTags", options.tracingOptions);
    try {
      const response = await this.blobContext.getTags({
        abortSignal: options.abortSignal,
        spanOptions
      });
      const wrappedResponse: BlobGetTagsResponse = {
        ...response,
        _response: response._response, // _response is made non-enumerable
        tags: toTags({ blobTagSet: response.blobTagSet }) || {}
      };
      return wrappedResponse;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get a {@link BlobLeaseClient} that manages leases on the blob.
   *
   * @param {string} [proposeLeaseId] Initial proposed lease Id.
   * @returns {BlobLeaseClient} A new BlobLeaseClient object for managing leases on the blob.
   * @memberof BlobClient
   */
  public getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient {
    return new BlobLeaseClient(this, proposeLeaseId);
  }

  /**
   * Creates a read-only snapshot of a blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/snapshot-blob
   *
   * @param {BlobCreateSnapshotOptions} [options] Optional options to the Blob Create Snapshot operation.
   * @returns {Promise<BlobCreateSnapshotResponse>}
   * @memberof BlobClient
   */
  public async createSnapshot(
    options: BlobCreateSnapshotOptions = {}
  ): Promise<BlobCreateSnapshotResponse> {
    const { span, spanOptions } = createSpan("BlobClient-createSnapshot", options.tracingOptions);
    options.conditions = options.conditions || {};
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.blobContext.createSnapshot({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.conditions,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob
   *
   * Example using automatic polling:
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url');
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example using manual polling:
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url');
   * while (!poller.isDone()) {
   *    await poller.poll();
   * }
   * const result = copyPoller.getResult();
   * ```
   *
   * Example using progress updates:
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url', {
   *   onProgress(state) {
   *     console.log(`Progress: ${state.copyProgress}`);
   *   }
   * });
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example using a changing polling interval (default 15 seconds):
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url', {
   *   intervalInMs: 1000 // poll blob every 1 second for copy progress
   * });
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example using copy cancellation:
   *
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url');
   * // cancel operation after starting it.
   * try {
   *   await copyPoller.cancelOperation();
   *   // calls to get the result now throw PollerCancelledError
   *   await copyPoller.getResult();
   * } catch (err) {
   *   if (err.name === 'PollerCancelledError') {
   *     console.log('The copy was cancelled.');
   *   }
   * }
   * ```
   *
   * @param {string} copySource url to the source Azure Blob/File.
   * @param {BlobBeginCopyFromURLOptions} [options] Optional options to the Blob Start Copy From URL operation.
   */
  public async beginCopyFromURL(
    copySource: string,
    options: BlobBeginCopyFromURLOptions = {}
  ): Promise<
    PollerLike<PollOperationState<BlobBeginCopyFromURLResponse>, BlobBeginCopyFromURLResponse>
  > {
    const client: CopyPollerBlobClient = {
      abortCopyFromURL: (...args) => this.abortCopyFromURL(...args),
      getProperties: (...args) => this.getProperties(...args),
      startCopyFromURL: (...args) => this.startCopyFromURL(...args)
    };
    const poller = new BlobBeginCopyFromUrlPoller({
      blobClient: client,
      copySource,
      intervalInMs: options.intervalInMs,
      onProgress: options.onProgress,
      resumeFrom: options.resumeFrom,
      startCopyFromURLOptions: options
    });

    // Trigger the startCopyFromURL call by calling poll.
    // Any errors from this method should be surfaced to the user.
    await poller.poll();

    return poller;
  }

  /**
   * Aborts a pending asynchronous Copy Blob operation, and leaves a destination blob with zero
   * length and full metadata. Version 2012-02-12 and newer.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-blob
   *
   * @param {string} copyId Id of the Copy From URL operation.
   * @param {BlobAbortCopyFromURLOptions} [options] Optional options to the Blob Abort Copy From URL operation.
   * @returns {Promise<BlobAbortCopyFromURLResponse>}
   * @memberof BlobClient
   */
  public async abortCopyFromURL(
    copyId: string,
    options: BlobAbortCopyFromURLOptions = {}
  ): Promise<BlobAbortCopyFromURLResponse> {
    const { span, spanOptions } = createSpan("BlobClient-abortCopyFromURL", options.tracingOptions);
    try {
      return await this.blobContext.abortCopyFromURL(copyId, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * The synchronous Copy From URL operation copies a blob or an internet resource to a new blob. It will not
   * return a response until the copy is complete.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob-from-url
   *
   * @param {string} copySource The source URL to copy from, Shared Access Signature(SAS) maybe needed for authentication
   * @param {BlobSyncCopyFromURLOptions} [options={}]
   * @returns {Promise<BlobCopyFromURLResponse>}
   * @memberof BlobClient
   */
  public async syncCopyFromURL(
    copySource: string,
    options: BlobSyncCopyFromURLOptions = {}
  ): Promise<BlobCopyFromURLResponse> {
    const { span, spanOptions } = createSpan("BlobClient-syncCopyFromURL", options.tracingOptions);
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};

    try {
      return await this.blobContext.copyFromURL(copySource, {
        abortSignal: options.abortSignal,
        metadata: options.metadata,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        sourceModifiedAccessConditions: {
          sourceIfMatch: options.sourceConditions.ifMatch,
          sourceIfModifiedSince: options.sourceConditions.ifModifiedSince,
          sourceIfNoneMatch: options.sourceConditions.ifNoneMatch,
          sourceIfUnmodifiedSince: options.sourceConditions.ifUnmodifiedSince
        },
        sourceContentMD5: options.sourceContentMD5,
        blobTagsString: toBlobTagsString(options.tags),
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets the tier on a blob. The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier
   *
   * @param {BlockBlobTier | PremiumPageBlobTier | string} tier The tier to be set on the blob. Valid values are Hot, Cool, or Archive.
   * @param {BlobSetTierOptions} [options] Optional options to the Blob Set Tier operation.
   * @returns {Promise<BlobsSetTierResponse>}
   * @memberof BlobClient
   */
  public async setAccessTier(
    tier: BlockBlobTier | PremiumPageBlobTier | string,
    options: BlobSetTierOptions = {}
  ): Promise<BlobSetTierResponse> {
    const { span, spanOptions } = createSpan("BlobClient-setAccessTier", options.tracingOptions);
    try {
      return await this.blobContext.setTier(toAccessTier(tier)!, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        rehydratePriority: options.rehydratePriority,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @export
   * @param {number} offset From which position of the block blob to download(in bytes)
   * @param {number} [count] How much data(in bytes) to be downloaded. Will download to the end when passing undefined
   * @param {BlobDownloadToBufferOptions} [options] BlobDownloadToBufferOptions
   * @returns {Promise<Buffer>}
   */
  public async downloadToBuffer(
    offset?: number,
    count?: number,
    options?: BlobDownloadToBufferOptions
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
   * @export
   * @param {Buffer} buffer Buffer to be fill, must have length larger than count
   * @param {number} offset From which position of the block blob to download(in bytes)
   * @param {number} [count] How much data(in bytes) to be downloaded. Will download to the end when passing undefined
   * @param {BlobDownloadToBufferOptions} [options] BlobDownloadToBufferOptions
   * @returns {Promise<Buffer>}
   */
  public async downloadToBuffer(
    buffer: Buffer,
    offset?: number,
    count?: number,
    options?: BlobDownloadToBufferOptions
  ): Promise<Buffer>;

  public async downloadToBuffer(
    param1?: Buffer | number,
    param2?: number,
    param3?: BlobDownloadToBufferOptions | number,
    param4: BlobDownloadToBufferOptions = {}
  ) {
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
    const { span, spanOptions } = createSpan("BlobClient-downloadToBuffer", options.tracingOptions);

    try {
      if (!options.blockSize) {
        options.blockSize = 0;
      }
      if (options.blockSize < 0) {
        throw new RangeError("blockSize option must be >= 0");
      }
      if (options.blockSize === 0) {
        options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
      }

      if (offset < 0) {
        throw new RangeError("offset option must be >= 0");
      }

      if (count && count <= 0) {
        throw new RangeError("count option must be > 0");
      }

      if (!options.conditions) {
        options.conditions = {};
      }

      // Customer doesn't specify length, get it
      if (!count) {
        const response = await this.getProperties({
          ...options,
          tracingOptions: {
            ...options.tracingOptions,
            spanOptions
          }
        });
        count = response.contentLength! - offset;
        if (count < 0) {
          throw new RangeError(
            `offset ${offset} shouldn't be larger than blob size ${response.contentLength!}`
          );
        }
      }

      // Allocate the buffer of size = count if the buffer is not provided
      if (!buffer) {
        try {
          buffer = Buffer.alloc(count);
        } catch (error) {
          throw new Error(
            `Unable to allocate the buffer of size: ${count}(in bytes). Please try passing your own buffer to the "downloadToBuffer" method or try using other methods like "download" or "downloadToFile".\t ${error.message}`
          );
        }
      }

      if (buffer.length < count) {
        throw new RangeError(
          `The buffer's size should be equal to or larger than the request count of bytes: ${count}`
        );
      }

      let transferProgress: number = 0;
      const batch = new Batch(options.concurrency);
      for (let off = offset; off < offset + count; off = off + options.blockSize) {
        batch.addOperation(async () => {
          // Exclusive chunk end position
          let chunkEnd = offset + count!;
          if (off + options.blockSize! < chunkEnd) {
            chunkEnd = off + options.blockSize!;
          }
          const response = await this.download(off, chunkEnd - off, {
            abortSignal: options.abortSignal,
            conditions: options.conditions,
            maxRetryRequests: options.maxRetryRequestsPerBlock,
            customerProvidedKey: options.customerProvidedKey,
            tracingOptions: {
              ...options.tracingOptions,
              spanOptions
            }
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
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob to a local file.
   * Fails if the the given file path already exits.
   * Offset and count are optional, pass 0 and undefined respectively to download the entire blob.
   *
   * @param {string} filePath
   * @param {number} [offset] From which position of the block blob to download.
   * @param {number} [count] How much data to be downloaded. Will download to the end when passing undefined.
   * @param {BlobDownloadOptions} [options] Options to Blob download options.
   * @returns {Promise<BlobDownloadResponseParsed>} The response data for blob download operation,
   *                                                 but with readableStreamBody set to undefined since its
   *                                                 content is already read and written into a local file
   *                                                 at the specified path.
   * @memberof BlobClient
   */
  public async downloadToFile(
    filePath: string,
    offset: number = 0,
    count?: number,
    options: BlobDownloadOptions = {}
  ): Promise<BlobDownloadResponseParsed> {
    const { span, spanOptions } = createSpan("BlobClient-downloadToFile", options.tracingOptions);
    try {
      const response = await this.download(offset, count, {
        ...options,
        tracingOptions: {
          ...options.tracingOptions,
          spanOptions
        }
      });
      if (response.readableStreamBody) {
        await readStreamToLocalFile(response.readableStreamBody, filePath);
      }

      // The stream is no longer accessible so setting it to undefined.
      (response as any).blobDownloadStream = undefined;
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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

      const parsedUrl = URLBuilder.parse(this.url);

      if (parsedUrl.getHost()!.split(".")[1] === "blob") {
        // "https://myaccount.blob.core.windows.net/containername/blob".
        // .getPath() -> /containername/blob
        const pathComponents = parsedUrl.getPath()!.match("/([^/]*)(/(.*))?");
        containerName = pathComponents![1];
        blobName = pathComponents![3];
      } else if (isIpEndpointStyle(parsedUrl)) {
        // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/containername/blob
        // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/containername/blob
        // .getPath() -> /devstoreaccount1/containername/blob
        const pathComponents = parsedUrl.getPath()!.match("/([^/]*)/([^/]*)(/(.*))?");
        containerName = pathComponents![2];
        blobName = pathComponents![4];
      } else {
        // "https://customdomain.com/containername/blob".
        // .getPath() -> /containername/blob
        const pathComponents = parsedUrl.getPath()!.match("/([^/]*)(/(.*))?");
        containerName = pathComponents![1];
        blobName = pathComponents![3];
      }

      // decode the encoded blobName, containerName - to get all the special characters that might be present in them
      containerName = decodeURIComponent(containerName);
      blobName = decodeURIComponent(blobName);

      // Azure Storage Server will replace "\" with "/" in the blob names
      //   doing the same in the SDK side so that the user doesn't have to replace "\" instances in the blobName
      blobName = blobName.replace(/\\/g, "/");

      if (!blobName) {
        throw new Error("Provided blobName is invalid.");
      } else if (!containerName) {
        throw new Error("Provided containerName is invalid.");
      }

      return { blobName, containerName };
    } catch (error) {
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
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob
   *
   * @param {string} copySource url to the source Azure Blob/File.
   * @param {BlobStartCopyFromURLOptions} [options] Optional options to the Blob Start Copy From URL operation.
   * @returns {Promise<BlobStartCopyFromURLResponse>}
   * @memberof BlobClient
   */
  private async startCopyFromURL(
    copySource: string,
    options: BlobStartCopyFromURLOptions = {}
  ): Promise<BlobStartCopyFromURLResponse> {
    const { span, spanOptions } = createSpan("BlobClient-startCopyFromURL", options.tracingOptions);
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};

    try {
      return await this.blobContext.startCopyFromURL(copySource, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.conditions,
        sourceModifiedAccessConditions: {
          sourceIfMatch: options.sourceConditions.ifMatch,
          sourceIfModifiedSince: options.sourceConditions.ifModifiedSince,
          sourceIfNoneMatch: options.sourceConditions.ifNoneMatch,
          sourceIfUnmodifiedSince: options.sourceConditions.ifUnmodifiedSince
        },
        rehydratePriority: options.rehydratePriority,
        tier: toAccessTier(options.tier),
        blobTagsString: toBlobTagsString(options.tags),
        sealBlob: options.sealBlob,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

/**
 * Options to configure {@link AppendBlobClient.create} operation.
 *
 * @export
 * @interface AppendBlobCreateOptions
 */
export interface AppendBlobCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Conditions to meet when creating append blobs.
   *
   * @type {BlobRequestConditions}
   * @memberof AppendBlobCreateOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when creating append blobs.
   *
   * @type {BlobHTTPHeaders}
   * @memberof AppendBlobCreateOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   *
   * @type {Metadata}
   * @memberof AppendBlobCreateOptions
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof AppendBlobCreateOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof AppendBlobCreateOptions
   */
  encryptionScope?: string;
  /**
   * Blob tags.
   *
   * @type {Tags}
   * @memberof AppendBlobCreateOptions
   */
  tags?: Tags;
}

/**
 * Options to configure {@link AppendBlobClient.createIfNotExists} operation.
 *
 * @export
 * @interface AppendBlobCreateIfNotExistsOptions
 */
export interface AppendBlobCreateIfNotExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobCreateIfNotExistsOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * HTTP headers to set when creating append blobs.
   *
   * @type {BlobHTTPHeaders}
   * @memberof AppendBlobCreateIfNotExistsOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   *
   * @type {Metadata}
   * @memberof AppendBlobCreateIfNotExistsOptions
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof AppendBlobCreateIfNotExistsOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof AppendBlobCreateIfNotExistsOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure {@link AppendBlobClient.seal} operation. 
 *
 * @export
 * @interface AppendBlobSealOptions
 * @extends {CommonOptions}
 */
export interface AppendBlobSealOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobAppendBlockOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet.
   *
   * @type {AppendBlobRequestConditions}
   * @memberof AppendBlobAppendBlockOptions
   */
  conditions?: AppendBlobRequestConditions;
}

/**
 * Options to configure the {@link AppendBlobClient.appendBlock} operation.
 *
 * @export
 * @interface AppendBlobAppendBlockOptions
 */
export interface AppendBlobAppendBlockOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobAppendBlockOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when appending append blob blocks.
   *
   * @type {AppendBlobRequestConditions}
   * @memberof AppendBlobAppendBlockOptions
   */
  conditions?: AppendBlobRequestConditions;
  /**
   * Callback to receive events on the progress of append block operation.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof AppendBlobAppendBlockOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockOptions
   */
  transactionalContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the append block content. This hash is used to verify the integrity of the append block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockOptions
   */
  transactionalContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof AppendBlobAppendBlockOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof AppendBlobAppendBlockOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure the {@link AppendBlobClient.appendBlockFromURL} operation.
 *
 * @export
 * @interface AppendBlobAppendBlockFromURLOptions
 */
export interface AppendBlobAppendBlockFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when appending append blob blocks.
   *
   * @type {AppendBlobRequestConditions}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  conditions?: AppendBlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  sourceConditions?: ModifiedAccessConditions;
  /**
   * An MD5 hash of the append block content from the URI.
   * This hash is used to verify the integrity of the append block during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the append block content from the URI.
   * This hash is used to verify the integrity of the append block during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof AppendBlobAppendBlockFromURLOptions
   */
  encryptionScope?: string;
}

/**
 * Contains response data for the {@link appendBlobClient.createIfNotExists} operation.
 *
 * @export
 * @interface AppendBlobCreateIfNotExistsResponse
 */
export interface AppendBlobCreateIfNotExistsResponse extends AppendBlobCreateResponse {
  /**
   * Indicate whether the blob is successfully created. Is false when the blob is not changed as it already exists.
   *
   * @type {boolean}
   * @memberof AppendBlobCreateIfNotExistsResponse
   */
  succeeded: boolean;
}

/**
 * AppendBlobClient defines a set of operations applicable to append blobs.
 *
 * @export
 * @class AppendBlobClient
 * @extends {BlobClient}
 */
export class AppendBlobClient extends BlobClient {
  /**
   * appendBlobsContext provided by protocol layer.
   *
   * @private
   * @type {AppendBlob}
   * @memberof AppendBlobClient
   */
  private appendBlobContext: AppendBlob;

  /**
   *
   * Creates an instance of AppendBlobClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} containerName Container name.
   * @param {string} blobName Blob name.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof AppendBlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of AppendBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage append blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof AppendBlobClient
   */
  constructor(
    url: string,
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of AppendBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to an append blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage append blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/appendblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof AppendBlobClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    blobNameOrOptions?: string | StoragePipelineOptions,
    options?: StoragePipelineOptions
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: Pipeline;
    let url: string;
    options = options || {};
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
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
        if (isNode) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName)
          );
          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName)
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(url, pipeline);
    this.appendBlobContext = new AppendBlob(this.storageClientContext);
  }

  /**
   * Creates a new AppendBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param {string} snapshot The snapshot timestamp.
   * @returns {AppendBlobClient} A new AppendBlobClient object identical to the source but with the specified snapshot timestamp.
   * @memberof AppendBlobClient
   */
  public withSnapshot(snapshot: string): AppendBlobClient {
    return new AppendBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot
      ),
      this.pipeline
    );
  }

  /**
   * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {AppendBlobCreateOptions} [options] Options to the Append Block Create operation.
   * @returns {Promise<AppendBlobCreateResponse>}
   * @memberof AppendBlobClient
   *
   * Example usage:
   *
   * ```js
   * const appendBlobClient = containerClient.getAppendBlobClient("<blob name>");
   * await appendBlobClient.create();
   * ```
   */
  public async create(options: AppendBlobCreateOptions = {}): Promise<AppendBlobCreateResponse> {
    const { span, spanOptions } = createSpan("AppendBlobClient-create", options.tracingOptions);
    options.conditions = options.conditions || {};
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

      return await this.appendBlobContext.create(0, {
        abortSignal: options.abortSignal,
        blobHTTPHeaders: options.blobHTTPHeaders,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.conditions,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        blobTagsString: toBlobTagsString(options.tags),
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a 0-length append blob. Call AppendBlock to append data to an append blob.
   * If the blob with the same name already exists, the content of the existing blob will remain unchanged.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {AppendBlobCreateIfNotExistsOptions} [options]
   * @returns {Promise<AppendBlobCreateIfNotExistsResponse>}
   * @memberof AppendBlobClient
   */
  public async createIfNotExists(
    options: AppendBlobCreateIfNotExistsOptions = {}
  ): Promise<AppendBlobCreateIfNotExistsResponse> {
    const { span, spanOptions } = createSpan(
      "AppendBlobClient-createIfNotExists",
      options.tracingOptions
    );
    const conditions = { ifNoneMatch: ETagAny };
    try {
      const res = await this.create({
        ...options,
        conditions,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res,
        _response: res._response // _response is made non-enumerable
      };
    } catch (e) {
      if (e.details?.errorCode === "BlobAlreadyExists") {
        span.setStatus({
          code: CanonicalCode.ALREADY_EXISTS,
          message: "Expected exception when creating a blob only if it does not already exist."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }

      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Seals the append blob, making it read only.
   *
   * @param {AppendBlobSealOptions} [options={}]
   * @returns {Promise<AppendBlobAppendBlockResponse>}
   * @memberof AppendBlobClient
   */
  public async seal(
    options: AppendBlobSealOptions = {}
  ): Promise<AppendBlobAppendBlockResponse> {
    const { span, spanOptions } = createSpan(
      "AppendBlobClient-seal",
      options.tracingOptions
    );
    options.conditions = options.conditions || {};
    try {

      return await this.appendBlobContext.seal({
        abortSignal: options.abortSignal,
        appendPositionAccessConditions: options.conditions,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Commits a new block of data to the end of the existing append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/append-block
   *
   * @param {HttpRequestBody} body Data to be appended.
   * @param {number} contentLength Length of the body in bytes.
   * @param {AppendBlobAppendBlockOptions} [options] Options to the Append Block operation.
   * @returns {Promise<AppendBlobAppendBlockResponse>}
   * @memberof AppendBlobClient
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello World!";
   *
   * // Create a new append blob and append data to the blob.
   * const newAppendBlobClient = containerClient.getAppendBlobClient("<blob name>");
   * await newAppendBlobClient.create();
   * await newAppendBlobClient.appendBlock(content, content.length);
   *
   * // Append data to an existing append blob.
   * const existingAppendBlobClient = containerClient.getAppendBlobClient("<blob name>");
   * await existingAppendBlobClient.appendBlock(content, content.length);
   * ```
   */
  public async appendBlock(
    body: HttpRequestBody,
    contentLength: number,
    options: AppendBlobAppendBlockOptions = {}
  ): Promise<AppendBlobAppendBlockResponse> {
    const { span, spanOptions } = createSpan(
      "AppendBlobClient-appendBlock",
      options.tracingOptions
    );
    options.conditions = options.conditions || {};
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

      return await this.appendBlobContext.appendBlock(body, contentLength, {
        abortSignal: options.abortSignal,
        appendPositionAccessConditions: options.conditions,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        onUploadProgress: options.onProgress,
        transactionalContentMD5: options.transactionalContentMD5,
        transactionalContentCrc64: options.transactionalContentCrc64,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * The Append Block operation commits a new block of data to the end of an existing append blob
   * where the contents are read from a source url.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/append-block-from-url
   *
   * @param {string} sourceURL
   *                 The url to the blob that will be the source of the copy. A source blob in the same storage account can
   *                 be authenticated via Shared Key. However, if the source is a blob in another account, the source blob
   *                 must either be public or must be authenticated via a shared access signature. If the source blob is
   *                 public, no authentication is required to perform the operation.
   * @param {number} sourceOffset Offset in source to be appended
   * @param {number} count Number of bytes to be appended as a block
   * @param {AppendBlobAppendBlockFromURLOptions} [options={}]
   * @returns {Promise<AppendBlobAppendBlockFromUrlResponse>}
   * @memberof AppendBlobClient
   */
  public async appendBlockFromURL(
    sourceURL: string,
    sourceOffset: number,
    count: number,
    options: AppendBlobAppendBlockFromURLOptions = {}
  ): Promise<AppendBlobAppendBlockFromUrlResponse> {
    const { span, spanOptions } = createSpan(
      "AppendBlobClient-appendBlockFromURL",
      options.tracingOptions
    );
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

      return await this.appendBlobContext.appendBlockFromUrl(sourceURL, 0, {
        abortSignal: options.abortSignal,
        sourceRange: rangeToString({ offset: sourceOffset, count }),
        sourceContentMD5: options.sourceContentMD5,
        sourceContentCrc64: options.sourceContentCrc64,
        leaseAccessConditions: options.conditions,
        appendPositionAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        sourceModifiedAccessConditions: {
          sourceIfMatch: options.sourceConditions.ifMatch,
          sourceIfModifiedSince: options.sourceConditions.ifModifiedSince,
          sourceIfNoneMatch: options.sourceConditions.ifNoneMatch,
          sourceIfUnmodifiedSince: options.sourceConditions.ifUnmodifiedSince
        },
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

/**
 * Options to configure {@link BlockBlobClient.upload} operation.
 *
 * @export
 * @interface BlockBlobUploadOptions
 */
export interface BlockBlobUploadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlockBlobUploadOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when uploading to the block blob.
   *
   * @type {BlobRequestConditions}
   * @memberof BlockBlobUploadOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when uploading to a block blob.
   *
   * @type {BlobHTTPHeaders}
   * @memberof BlockBlobUploadOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when uploading to a block blob.
   *
   * @type {Metadata}
   * @memberof BlockBlobUploadOptions
   */
  metadata?: Metadata;
  /**
   * Callback to receive events on the progress of upload operation.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof BlockBlobUploadOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlockBlobUploadOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof BlockBlobUploadOptions
   */
  encryptionScope?: string;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   *
   * @type {BlockBlobTier | string}
   * @memberof BlockBlobUploadOptions
   */
  tier?: BlockBlobTier | string;
  /**
   * Blob tags.
   *
   * @type {Tags}
   * @memberof BlockBlobUploadOptions
   */
  tags?: Tags;
}

/**
 * Blob query error type.
 *
 * @export
 * @interface BlobQueryError
 */
export interface BlobQueryError {
  /**
   * Whether error is fatal. Fatal error will stop query.
   *
   * @type {boolean}
   * @memberof BlobQueryError
   */
  isFatal: boolean;
  /**
   * Error name.
   *
   * @type {string}
   * @memberof BlobQueryError
   */
  name: string;
  /**
   * Position in bytes of the query.
   *
   * @type {number}
   * @memberof BlobQueryError
   */
  position: number;
  /**
   * Error description.
   *
   * @type {string}
   * @memberof BlobQueryError
   */
  description: string;
}

/**
 * Base type for options to query blob.
 *
 * @export
 * @interface BlobQueryTextConfiguration
 */
export interface BlobQueryTextConfiguration {
  /**
   * Record separator.
   *
   * @type {string}
   * @memberof BlobQueryTextConfiguration
   */
  recordSeparator: string;
}

/**
 * Options to query blob with JSON format.
 *
 * @export
 * @interface BlobQueryJsonTextConfiguration
 */
export interface BlobQueryJsonTextConfiguration extends BlobQueryTextConfiguration {
  /**
   * Query for a JSON format blob.
   *
   * @type {"json"}
   * @memberof BlobQueryJsonTextConfiguration
   */
  kind: "json";
}

/**
 * Options to query blob with CSV format.
 *
 * @export
 * @interface BlobQueryCsvTextConfiguration
 */
export interface BlobQueryCsvTextConfiguration extends BlobQueryTextConfiguration {
  /**
   * Query for a CSV format blob.
   *
   * @type {"csv"}
   * @memberof BlobQueryCsvTextConfiguration
   */
  kind: "csv";
  /**
   * Column separator. Default is ",".
   *
   * @type {string}
   * @memberof BlobQueryCsvTextConfiguration
   */
  columnSeparator?: string;
  /**
   * Field quote.
   *
   * @type {string}
   * @memberof BlobQueryCsvTextConfiguration
   */
  fieldQuote?: string;
  /**
   * Escape character.
   *
   * @type {string}
   * @memberof BlobQueryCsvTextConfiguration
   */
  escapeCharacter?: string;
  /**
   * Has headers. Default is false.
   *
   * @type {boolean}
   * @memberof BlobQueryCsvTextConfiguration
   */
  hasHeaders?: boolean;
}

/**
 * Options to configure {@link BlockBlobClient.query} operation.
 *
 * @export
 * @interface BlockBlobQueryOptions
 */
export interface BlockBlobQueryOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlockBlobUploadOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Configurations for the query input.
   *
   * @type {BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration}
   * @memberof BlockBlobQueryOptions
   */
  inputTextConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration;
  /**
   * Configurations for the query output.
   *
   * @type {BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration}
   * @memberof BlockBlobQueryOptions
   */
  outputTextConfiguration?: BlobQueryJsonTextConfiguration | BlobQueryCsvTextConfiguration;
  /**
   * Callback to receive events on the progress of query operation.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof BlockBlobUploadOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * Callback to receive error events during the query operaiton.
   *
   * @memberof BlockBlobQueryOptions
   */
  onError?: (error: BlobQueryError) => void;
  /**
   * Conditions to meet when uploading to the block blob.
   *
   * @type {BlobRequestConditions}
   * @memberof BlockBlobUploadOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlockBlobUploadOptions
   */
  customerProvidedKey?: CpkInfo;
}

/**
 * Options to configure {@link BlockBlobClient.stageBlock} operation.
 *
 * @export
 * @interface BlockBlobStageBlockOptions
 */
export interface BlockBlobStageBlockOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlockBlobStageBlockOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof BlockBlobStageBlockOptions
   */
  conditions?: LeaseAccessConditions;
  /**
   * Callback to receive events on the progress of stage block operation.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof BlockBlobStageBlockOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof BlockBlobStageBlockOptions
   */
  transactionalContentMD5?: Uint8Array;

  /**
   * A CRC64 hash of the block content. This hash is used to verify the integrity of the block during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof BlockBlobStageBlockOptions
   */
  transactionalContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlockBlobStageBlockOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof BlockBlobStageBlockOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure {@link BlockBlobClient.stageBlockFromURL} operation.
 *
 * @export
 * @interface BlockBlobStageBlockFromURLOptions
 */
export interface BlockBlobStageBlockFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Specifies the bytes of the source Blob/File to upload.
   * If not specified, the entire content is uploaded as a single block.
   *
   * @type {Range}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  range?: Range;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  conditions?: LeaseAccessConditions;
  /**
   * An MD5 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   * @type {Uint8Array}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof BlockBlobStageBlockFromURLOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure {@link BlockBlobClient.commitBlockList} operation.
 *
 * @export
 * @interface BlockBlobCommitBlockListOptions
 */
export interface BlockBlobCommitBlockListOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlockBlobCommitBlockListOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when committing the block list.
   *
   * @type {BlobRequestConditions}
   * @memberof BlockBlobCommitBlockListOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * HTTP headers to set when committing block list.
   *
   * @type {BlobHTTPHeaders}
   * @memberof BlockBlobCommitBlockListOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when committing block list.
   *
   * @type {Metadata}
   * @memberof BlockBlobCommitBlockListOptions
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof BlockBlobCommitBlockListOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof BlockBlobCommitBlockListOptions
   */
  encryptionScope?: string;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   *
   * @type {BlockBlobTier | string}
   * @memberof BlockBlobCommitBlockListOptions
   */
  tier?: BlockBlobTier | string;

  /**
   * Blob tags.
   *
   * @type {Tags}
   * @memberof BlockBlobCommitBlockListOptions
   */
  tags?: Tags;
}

/**
 * Options to configure {@link BlockBlobClient.getBlockList} operation.
 *
 * @export
 * @interface BlockBlobGetBlockListOptions
 */
export interface BlockBlobGetBlockListOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlockBlobGetBlockListOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof BlockBlobGetBlockListOptions
   */
  conditions?: LeaseAccessConditions;
}

/**
 * Option interface for the {@link BlockBlobClient.uploadStream} operation.
 *
 * @export
 * @interface BlockBlobUploadStreamOptions
 */
export interface BlockBlobUploadStreamOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlockBlobUploadStreamOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Blob HTTP Headers.
   *
   * @type {BlobHTTPHeaders}
   * @memberof BlockBlobUploadStreamOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;

  /**
   * Metadata of block blob.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof BlockBlobUploadStreamOptions
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Access conditions headers.
   *
   * @type {BlobRequestConditions}
   * @memberof BlockBlobUploadStreamOptions
   */
  conditions?: BlobRequestConditions;

  /**
   * Progress updater.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof BlockBlobUploadStreamOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof BlockBlobUploadStreamOptions
   */
  encryptionScope?: string;

  /**
   * Blob tags.
   *
   * @type {Tags}
   * @memberof BlockBlobUploadStreamOptions
   */
  tags?: Tags;
}
/**
 * Option interface for {@link BlockBlobClient.uploadFile} and {@link BlockBlobClient.uploadSeekableStream}.
 *
 * @export
 * @interface BlockBlobParallelUploadOptions
 */
export interface BlockBlobParallelUploadOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof BlockBlobParallelUploadOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * Destination block blob size in bytes.
   *
   * @type {number}
   * @memberof BlockBlobParallelUploadOptions
   */
  blockSize?: number;

  /**
   * Blob size threshold in bytes to start concurrency uploading.
   * Default value is 256MB, blob size less than this option will
   * be uploaded via one I/O operation without concurrency.
   * You can customize a value less equal than the default value.
   *
   * @type {number}
   * @memberof BlockBlobParallelUploadOptions
   */
  maxSingleShotSize?: number;

  /**
   * Progress updater.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof BlockBlobParallelUploadOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;

  /**
   * Blob HTTP Headers.
   *
   * @type {BlobHTTPHeaders}
   * @memberof BlockBlobParallelUploadOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;

  /**
   * Metadata of block blob.
   *
   * @type {{ [propertyName: string]: string }}
   * @memberof BlockBlobParallelUploadOptions
   */
  metadata?: { [propertyName: string]: string };

  /**
   * Access conditions headers.
   *
   * @type {BlobRequestConditions}
   * @memberof BlockBlobParallelUploadOptions
   */
  conditions?: BlobRequestConditions;

  /**
   * Concurrency of parallel uploading. Must be >= 0.
   *
   * @type {number}
   * @memberof BlockBlobParallelUploadOptions
   */
  concurrency?: number;

  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof BlockBlobParallelUploadOptions
   */
  encryptionScope?: string;

  /**
   * Blob tags.
   *
   * @type {Tags}
   * @memberof BlockBlobParallelUploadOptions
   */
  tags?: Tags;
}

/**
 * Response type for {@link BlockBlobClient.uploadFile}, {@link BlockBlobClient.uploadStream}, and
 * {@link BlockBlobClient.uploadBrowserDate}.
 *
 * @export
 */
export type BlobUploadCommonResponse = BlockBlobUploadHeaders & {
  /**
   * The underlying HTTP response.
   *
   * @type {HttpResponse}
   * @memberof BlobUploadCommonResponse
   */
  _response: HttpResponse;
};

/**
 * BlockBlobClient defines a set of operations applicable to block blobs.
 *
 * @export
 * @class BlockBlobClient
 * @extends {BlobClient}
 */
export class BlockBlobClient extends BlobClient {
  /**
   * blobContext provided by protocol layer.
   *
   * Note. Ideally BlobClient should set BlobClient.blobContext to protected. However, API
   * extractor has issue blocking that. Here we redecelare _blobContext in BlockBlobClient.
   *
   * @private
   * @type {Blobs}
   * @memberof BlobClient
   */
  private _blobContext: StorageBlob;

  /**
   * blockBlobContext provided by protocol layer.
   *
   * @private
   * @type {BlockBlobs}
   * @memberof BlockBlobClient
   */
  private blockBlobContext: BlockBlob;

  /**
   *
   * Creates an instance of BlockBlobClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} containerName Container name.
   * @param {string} blobName Blob name.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlockBlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlockBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage block blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlockBlobClient
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of BlockBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a block blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage block blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blockblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlockBlobClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    blobNameOrOptions?: string | StoragePipelineOptions,
    options?: StoragePipelineOptions
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: Pipeline;
    let url: string;
    options = options || {};
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
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
        if (isNode) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName)
          );
          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName)
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(url, pipeline);
    this.blockBlobContext = new BlockBlob(this.storageClientContext);
    this._blobContext = new StorageBlob(this.storageClientContext);
  }

  /**
   * Creates a new BlockBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param {string} snapshot The snapshot timestamp.
   * @returns {BlockBlobClient} A new BlockBlobClient object identical to the source but with the specified snapshot timestamp.
   * @memberof BlockBlobClient
   */
  public withSnapshot(snapshot: string): BlockBlobClient {
    return new BlockBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot
      ),
      this.pipeline
    );
  }

  /**
   * Quick query for a JSON or CSV formatted blob.
   *
   * Example usage (Node.js):
   *
   * ```js
   * // Query and convert a blob to a string
   * const queryBlockBlobResponse = await blockBlobClient.query("select * from BlobStorage");
   * const downloaded = await streamToString(queryBlockBlobResponse.readableStreamBody);
   * console.log("Query blob content:", downloaded);
   *
   * async function streamToString(readableStream) {
   *   return new Promise((resolve, reject) => {
   *     const chunks = [];
   *     readableStream.on("data", (data) => {
   *       chunks.push(data.toString());
   *     });
   *     readableStream.on("end", () => {
   *       resolve(chunks.join(""));
   *     });
   *     readableStream.on("error", reject);
   *   });
   * }
   * ```
   *
   * @param {string} query
   * @param {BlockBlobQueryOptions} [options={}]
   * @returns {Promise<BlobDownloadResponseModel>}
   * @memberof BlockBlobClient
   */
  public async query(
    query: string,
    options: BlockBlobQueryOptions = {}
  ): Promise<BlobDownloadResponseModel> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    const { span, spanOptions } = createSpan("BlockBlobClient-query", options.tracingOptions);

    try {
      const response = await this._blobContext.query({
        abortSignal: options.abortSignal,
        queryRequest: {
          expression: query,
          inputSerialization: toQuerySerialization(options.inputTextConfiguration),
          outputSerialization: toQuerySerialization(options.outputTextConfiguration)
        },
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
      return new BlobQueryResponse(response, {
        abortSignal: options.abortSignal,
        onProgress: options.onProgress,
        onError: options.onError
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param {BlockBlobUploadOptions} [options] Options to the Block Blob Upload operation.
   * @returns {Promise<BlockBlobUploadResponse>} Response data for the Block Blob Upload operation.
   * @memberof BlockBlobClient
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!";
   * const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
   * ```
   */
  public async upload(
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobUploadOptions = {}
  ): Promise<BlockBlobUploadResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("BlockBlobClient-upload", options.tracingOptions);
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.blockBlobContext.upload(body, contentLength, {
        abortSignal: options.abortSignal,
        blobHTTPHeaders: options.blobHTTPHeaders,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.conditions,
        onUploadProgress: options.onProgress,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        tier: toAccessTier(options.tier),
        blobTagsString: toBlobTagsString(options.tags),
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Uploads the specified block to the block blob's "staging area" to be later
   * committed by a call to commitBlockList.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-block
   *
   * @param {string} blockId A 64-byte value that is base64-encoded
   * @param {HttpRequestBody} body Data to upload to the staging area.
   * @param {number} contentLength Number of bytes to upload.
   * @param {BlockBlobStageBlockOptions} [options] Options to the Block Blob Stage Block operation.
   * @returns {Promise<BlockBlobStageBlockResponse>} Response data for the Block Blob Stage Block operation.
   * @memberof BlockBlobClient
   */
  public async stageBlock(
    blockId: string,
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobStageBlockOptions = {}
  ): Promise<BlockBlobStageBlockResponse> {
    const { span, spanOptions } = createSpan("BlockBlobClient-stageBlock", options.tracingOptions);
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.blockBlobContext.stageBlock(blockId, contentLength, body, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        onUploadProgress: options.onProgress,
        transactionalContentMD5: options.transactionalContentMD5,
        transactionalContentCrc64: options.transactionalContentCrc64,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * The Stage Block From URL operation creates a new block to be committed as part
   * of a blob where the contents are read from a URL.
   * This API is available starting in version 2018-03-28.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-block-from-url
   *
   * @param {string} blockId A 64-byte value that is base64-encoded
   * @param {string} sourceURL Specifies the URL of the blob. The value
   *                           may be a URL of up to 2 KB in length that specifies a blob.
   *                           The value should be URL-encoded as it would appear
   *                           in a request URI. The source blob must either be public
   *                           or must be authenticated via a shared access signature.
   *                           If the source blob is public, no authentication is required
   *                           to perform the operation. Here are some examples of source object URLs:
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob
   *                           - https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param {number} [offset] From which position of the blob to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {BlockBlobStageBlockFromURLOptions} [options={}] Options to the Block Blob Stage Block From URL operation.
   * @returns {Promise<BlockBlobStageBlockFromURLResponse>} Response data for the Block Blob Stage Block From URL operation.
   * @memberof BlockBlobClient
   */
  public async stageBlockFromURL(
    blockId: string,
    sourceURL: string,
    offset: number = 0,
    count?: number,
    options: BlockBlobStageBlockFromURLOptions = {}
  ): Promise<BlockBlobStageBlockFromURLResponse> {
    const { span, spanOptions } = createSpan(
      "BlockBlobClient-stageBlockFromURL",
      options.tracingOptions
    );
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.blockBlobContext.stageBlockFromURL(blockId, 0, sourceURL, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        sourceContentMD5: options.sourceContentMD5,
        sourceContentCrc64: options.sourceContentCrc64,
        sourceRange: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Writes a blob by specifying the list of block IDs that make up the blob.
   * In order to be written as part of a blob, a block must have been successfully written
   * to the server in a prior {@link stageBlock} operation. You can call {@link commitBlockList} to
   * update a blob by uploading only those blocks that have changed, then committing the new and existing
   * blocks together. Any blocks not specified in the block list and permanently deleted.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-block-list
   *
   * @param {string[]} blocks  Array of 64-byte value that is base64-encoded
   * @param {BlockBlobCommitBlockListOptions} [options] Options to the Block Blob Commit Block List operation.
   * @returns {Promise<BlockBlobCommitBlockListResponse>} Response data for the Block Blob Commit Block List operation.
   * @memberof BlockBlobClient
   */
  public async commitBlockList(
    blocks: string[],
    options: BlockBlobCommitBlockListOptions = {}
  ): Promise<BlockBlobCommitBlockListResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "BlockBlobClient-commitBlockList",
      options.tracingOptions
    );
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.blockBlobContext.commitBlockList(
        { latest: blocks },
        {
          abortSignal: options.abortSignal,
          blobHTTPHeaders: options.blobHTTPHeaders,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: options.conditions,
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          tier: toAccessTier(options.tier),
          blobTagsString: toBlobTagsString(options.tags),
          spanOptions
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns the list of blocks that have been uploaded as part of a block blob
   * using the specified block list filter.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-block-list
   *
   * @param {BlockListType} listType Specifies whether to return the list of committed blocks,
   *                                        the list of uncommitted blocks, or both lists together.
   * @param {BlockBlobGetBlockListOptions} [options] Options to the Block Blob Get Block List operation.
   * @returns {Promise<BlockBlobGetBlockListResponse>} Response data for the Block Blob Get Block List operation.
   * @memberof BlockBlobClient
   */
  public async getBlockList(
    listType: BlockListType,
    options: BlockBlobGetBlockListOptions = {}
  ): Promise<BlockBlobGetBlockListResponse> {
    const { span, spanOptions } = createSpan(
      "BlockBlobClient-getBlockList",
      options.tracingOptions
    );
    try {
      const res = await this.blockBlobContext.getBlockList(listType, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        spanOptions
      });

      if (!res.committedBlocks) {
        res.committedBlocks = [];
      }

      if (!res.uncommittedBlocks) {
        res.uncommittedBlocks = [];
      }

      return res;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  // High level functions

  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser Blob/File/ArrayBuffer/ArrayBufferView object to block blob.
   *
   * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call
   * {@link commitBlockList} to commit the block list.
   *
   * @export
   * @param {Blob | ArrayBuffer | ArrayBufferView} browserData Blob, File, ArrayBuffer or ArrayBufferView
   * @param {BlockBlobParallelUploadOptions} [options] Options to upload browser data.
   * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
   * @memberof BlockBlobClient
   */
  public async uploadBrowserData(
    browserData: Blob | ArrayBuffer | ArrayBufferView,
    options: BlockBlobParallelUploadOptions = {}
  ): Promise<BlobUploadCommonResponse> {
    const { span, spanOptions } = createSpan(
      "BlockBlobClient-uploadBrowserData",
      options.tracingOptions
    );
    try {
      const browserBlob = new Blob([browserData]);
      return await this.uploadSeekableBlob(
        (offset: number, size: number): Blob => {
          return browserBlob.slice(offset, offset + size);
        },
        browserBlob.size,
        { ...options, tracingOptions: { ...options!.tracingOptions, spanOptions } }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN BROWSERS.
   *
   * Uploads a browser {@link Blob} object to block blob. Requires a blobFactory as the data source,
   * which need to return a {@link Blob} object with the offset and size provided.
   *
   * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
   * to commit the block list.
   *
   * @param {(offset: number, size: number) => Blob} blobFactory
   * @param {number} size size of the data to upload.
   * @param {BlockBlobParallelUploadOptions} [options] Options to Upload to Block Blob operation.
   * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
   * @memberof BlockBlobClient
   */
  private async uploadSeekableBlob(
    blobFactory: (offset: number, size: number) => Blob,
    size: number,
    options: BlockBlobParallelUploadOptions = {}
  ): Promise<BlobUploadCommonResponse> {
    if (!options.blockSize) {
      options.blockSize = 0;
    }
    if (options.blockSize < 0 || options.blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
      throw new RangeError(
        `blockSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES}`
      );
    }

    if (options.maxSingleShotSize !== 0 && !options.maxSingleShotSize) {
      options.maxSingleShotSize = BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES;
    }
    if (
      options.maxSingleShotSize < 0 ||
      options.maxSingleShotSize > BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES
    ) {
      throw new RangeError(
        `maxSingleShotSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}`
      );
    }

    if (options.blockSize === 0) {
      if (size > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES * BLOCK_BLOB_MAX_BLOCKS) {
        throw new RangeError(`${size} is too larger to upload to a block blob.`);
      }
      if (size > options.maxSingleShotSize) {
        options.blockSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
        if (options.blockSize < DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES) {
          options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
        }
      }
    }
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, spanOptions } = createSpan(
      "BlockBlobClient-UploadSeekableBlob",
      options.tracingOptions
    );

    try {
      if (size <= options.maxSingleShotSize) {
        return await this.upload(blobFactory(0, size), size, {
          ...options,
          tracingOptions: { ...options!.tracingOptions, spanOptions }
        });
      }

      const numBlocks: number = Math.floor((size - 1) / options.blockSize) + 1;
      if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
        throw new RangeError(
          `The buffer's size is too big or the BlockSize is too small;` +
            `the number of blocks must be <= ${BLOCK_BLOB_MAX_BLOCKS}`
        );
      }

      const blockList: string[] = [];
      const blockIDPrefix = generateUuid();
      let transferProgress: number = 0;

      const batch = new Batch(options.concurrency);
      for (let i = 0; i < numBlocks; i++) {
        batch.addOperation(
          async (): Promise<any> => {
            const blockID = generateBlockID(blockIDPrefix, i);
            const start = options.blockSize! * i;
            const end = i === numBlocks - 1 ? size : start + options.blockSize!;
            const contentLength = end - start;
            blockList.push(blockID);
            await this.stageBlock(blockID, blobFactory(start, contentLength), contentLength, {
              abortSignal: options.abortSignal,
              conditions: options.conditions,
              encryptionScope: options.encryptionScope,
              tracingOptions: { ...options!.tracingOptions, spanOptions }
            });
            // Update progress after block is successfully uploaded to server, in case of block trying
            // TODO: Hook with convenience layer progress event in finer level
            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress!({
                loadedBytes: transferProgress
              });
            }
          }
        );
      }
      await batch.do();

      return this.commitBlockList(blockList, {
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Uploads a local file in blocks to a block blob.
   *
   * When file size <= 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call stageBlock to upload blocks, and finally call commitBlockList
   * to commit the block list.
   *
   * @param {string} filePath Full path of local file
   * @param {BlockBlobParallelUploadOptions} [options] Options to Upload to Block Blob operation.
   * @returns {(Promise<BlobUploadCommonResponse>)}  Response data for the Blob Upload operation.
   * @memberof BlockBlobClient
   */
  public async uploadFile(
    filePath: string,
    options: BlockBlobParallelUploadOptions = {}
  ): Promise<BlobUploadCommonResponse> {
    const { span, spanOptions } = createSpan("BlockBlobClient-uploadFile", options.tracingOptions);
    try {
      const size = (await fsStat(filePath)).size;
      return await this.uploadResetableStream(
        (offset, count) =>
          fsCreateReadStream(filePath, {
            autoClose: true,
            end: count ? offset + count - 1 : Infinity,
            start: offset
          }),
        size,
        { ...options, tracingOptions: { ...options!.tracingOptions, spanOptions } }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
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
   * @param {Readable} stream Node.js Readable stream
   * @param {number} bufferSize Size of every buffer allocated, also the block size in the uploaded block blob. Default value is 8MB
   * @param {number} maxConcurrency  Max concurrency indicates the max number of buffers that can be allocated,
   *                                 positive correlation with max uploading concurrency. Default value is 5
   * @param {BlockBlobUploadStreamOptions} [options] Options to Upload Stream to Block Blob operation.
   * @returns {Promise<BlobUploadCommonResponse>} Response data for the Blob Upload operation.
   * @memberof BlockBlobClient
   */
  public async uploadStream(
    stream: Readable,
    bufferSize: number = DEFAULT_BLOCK_BUFFER_SIZE_BYTES,
    maxConcurrency: number = 5,
    options: BlockBlobUploadStreamOptions = {}
  ): Promise<BlobUploadCommonResponse> {
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, spanOptions } = createSpan(
      "BlockBlobClient-uploadStream",
      options.tracingOptions
    );

    try {
      let blockNum = 0;
      const blockIDPrefix = generateUuid();
      let transferProgress: number = 0;
      const blockList: string[] = [];

      const scheduler = new BufferScheduler(
        stream,
        bufferSize,
        maxConcurrency,
        async (buffer: Buffer) => {
          const blockID = generateBlockID(blockIDPrefix, blockNum);
          blockList.push(blockID);
          blockNum++;

          await this.stageBlock(blockID, buffer, buffer.length, {
            conditions: options.conditions,
            encryptionScope: options.encryptionScope,
            tracingOptions: { ...options!.tracingOptions, spanOptions }
          });

          // Update progress after block is successfully uploaded to server, in case of block trying
          transferProgress += buffer.length;
          if (options.onProgress) {
            options.onProgress({ loadedBytes: transferProgress });
          }
        },
        // concurrency should set a smaller value than maxConcurrency, which is helpful to
        // reduce the possibility when a outgoing handler waits for stream data, in
        // this situation, outgoing handlers are blocked.
        // Outgoing queue shouldn't be empty.
        Math.ceil((maxConcurrency / 4) * 3)
      );
      await scheduler.do();

      return await this.commitBlockList(blockList, {
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Accepts a Node.js Readable stream factory, and uploads in blocks to a block blob.
   * The Readable stream factory must returns a Node.js Readable stream starting from the offset defined. The offset
   * is the offset in the block blob to be uploaded.
   *
   * When buffer length <= 256MB, this method will use 1 upload call to finish the upload.
   * Otherwise, this method will call {@link stageBlock} to upload blocks, and finally call {@link commitBlockList}
   * to commit the block list.
   *
   * @export
   * @param {(offset: number) => NodeJS.ReadableStream} streamFactory Returns a Node.js Readable stream starting
   *                                                                  from the offset defined
   * @param {number} size Size of the block blob
   * @param {BlockBlobParallelUploadOptions} [options] Options to Upload to Block Blob operation.
   * @returns {(Promise<BlobUploadCommonResponse>)}  Response data for the Blob Upload operation.
   * @memberof BlockBlobClient
   */
  private async uploadResetableStream(
    streamFactory: (offset: number, count?: number) => NodeJS.ReadableStream,
    size: number,
    options: BlockBlobParallelUploadOptions = {}
  ): Promise<BlobUploadCommonResponse> {
    if (!options.blockSize) {
      options.blockSize = 0;
    }
    if (options.blockSize < 0 || options.blockSize > BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
      throw new RangeError(
        `blockSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES}`
      );
    }

    if (options.maxSingleShotSize !== 0 && !options.maxSingleShotSize) {
      options.maxSingleShotSize = BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES;
    }
    if (
      options.maxSingleShotSize < 0 ||
      options.maxSingleShotSize > BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES
    ) {
      throw new RangeError(
        `maxSingleShotSize option must be >= 0 and <= ${BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES}`
      );
    }

    if (options.blockSize === 0) {
      if (size > BLOCK_BLOB_MAX_BLOCKS * BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES) {
        throw new RangeError(`${size} is too larger to upload to a block blob.`);
      }
      if (size > options.maxSingleShotSize) {
        options.blockSize = Math.ceil(size / BLOCK_BLOB_MAX_BLOCKS);
        if (options.blockSize < DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES) {
          options.blockSize = DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES;
        }
      }
    }
    if (!options.blobHTTPHeaders) {
      options.blobHTTPHeaders = {};
    }
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, spanOptions } = createSpan(
      "BlockBlobClient-uploadResetableStream",
      options.tracingOptions
    );

    try {
      if (size <= options.maxSingleShotSize) {
        return await this.upload(() => streamFactory(0), size, {
          ...options,
          tracingOptions: { ...options!.tracingOptions, spanOptions }
        });
      }

      const numBlocks: number = Math.floor((size - 1) / options.blockSize) + 1;
      if (numBlocks > BLOCK_BLOB_MAX_BLOCKS) {
        throw new RangeError(
          `The buffer's size is too big or the BlockSize is too small;` +
            `the number of blocks must be <= ${BLOCK_BLOB_MAX_BLOCKS}`
        );
      }

      const blockList: string[] = [];
      const blockIDPrefix = generateUuid();
      let transferProgress: number = 0;

      const batch = new Batch(options.concurrency);
      for (let i = 0; i < numBlocks; i++) {
        batch.addOperation(
          async (): Promise<any> => {
            const blockID = generateBlockID(blockIDPrefix, i);
            const start = options.blockSize! * i;
            const end = i === numBlocks - 1 ? size : start + options.blockSize!;
            const contentLength = end - start;
            blockList.push(blockID);
            await this.stageBlock(
              blockID,
              () => streamFactory(start, contentLength),
              contentLength,
              {
                abortSignal: options.abortSignal,
                conditions: options.conditions,
                encryptionScope: options.encryptionScope,
                tracingOptions: { ...options!.tracingOptions, spanOptions }
              }
            );
            // Update progress after block is successfully uploaded to server, in case of block trying
            transferProgress += contentLength;
            if (options.onProgress) {
              options.onProgress({ loadedBytes: transferProgress });
            }
          }
        );
      }
      await batch.do();

      return await this.commitBlockList(blockList, {
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

/**
 * Options to configure the {@link PageBlobClient.create} operation.
 *
 * @export
 * @interface PageBlobCreateOptions
 */
export interface PageBlobCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobCreateOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when creating a page blob.
   *
   * @type {BlobRequestConditions}
   * @memberof PageBlobCreateOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * A user-controlled value that can be used to track requests.
   * The value must be between 0 and 2^63 - 1. The default value is 0.
   *
   * @type {number}
   * @memberof PageBlobCreateOptions
   */
  blobSequenceNumber?: number;
  /**
   * HTTP headers to set when creating a page blob.
   *
   * @type {BlobHTTPHeaders}
   * @memberof PageBlobCreateOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   *
   * @type {Metadata}
   * @memberof PageBlobCreateOptions
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof PageBlobCreateOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof PageBlobCreateOptions
   */
  encryptionScope?: string;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   *
   * @type {PremiumPageBlobTier | string}
   * @memberof PageBlobCreateOptions
   */
  tier?: PremiumPageBlobTier | string;
  /**
   * Blob tags.
   *
   * @type {Tags}
   * @memberof PageBlobCreateOptions
   */
  tags?: Tags;
}

/**
 * Options to configure the {@link PageBlobClient.createIfNotExists} operation.
 *
 * @export
 * @interface PageBlobCreateIfNotExistsOptions
 */
export interface PageBlobCreateIfNotExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobCreateIfNotExistsOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A user-controlled value that can be used to track requests.
   * The value must be between 0 and 2^63 - 1. The default value is 0.
   *
   * @type {number}
   * @memberof PageBlobCreateIfNotExistsOptions
   */
  blobSequenceNumber?: number;
  /**
   * HTTP headers to set when creating a page blob.
   *
   * @type {BlobHTTPHeaders}
   * @memberof PageBlobCreateIfNotExistsOptions
   */
  blobHTTPHeaders?: BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   *
   * @type {Metadata}
   * @memberof PageBlobCreateIfNotExistsOptions
   */
  metadata?: Metadata;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof PageBlobCreateIfNotExistsOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof PageBlobCreateIfNotExistsOptions
   */
  encryptionScope?: string;
  /**
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   *
   * @type {PremiumPageBlobTier | string}
   * @memberof PageBlobCreateIfNotExistsOptions
   */
  tier?: PremiumPageBlobTier | string;
}

/**
 * Options to configure the {@link PageBlobClient.uploadPages} operation.
 *
 * @export
 * @interface PageBlobUploadPagesOptions
 */
export interface PageBlobUploadPagesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobUploadPagesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when uploading pages.
   *
   * @type {PageBlobRequestConditions}
   * @memberof PageBlobUploadPagesOptions
   */
  conditions?: PageBlobRequestConditions;
  /**
   * Callback to receive events on the progress of upload pages operation.
   *
   * @type {(progress: TransferProgressEvent) => void}
   * @memberof PageBlobUploadPagesOptions
   */
  onProgress?: (progress: TransferProgressEvent) => void;
  /**
   * An MD5 hash of the content. This hash is used to verify the integrity of the content during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof PageBlobUploadPagesOptions
   */
  transactionalContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the content. This hash is used to verify the integrity of the content during transport.
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   *
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof PageBlobUploadPagesOptions
   */
  transactionalContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof PageBlobUploadPagesOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof PageBlobUploadPagesOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure the {@link PageBlobClient.clearPages} operation.
 *
 * @export
 * @interface PageBlobClearPagesOptions
 */
export interface PageBlobClearPagesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobClearPagesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when clearing pages.
   *
   * @type {PageBlobRequestConditions}
   * @memberof PageBlobClearPagesOptions
   */
  conditions?: PageBlobRequestConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof PageBlobClearPagesOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof PageBlobClearPagesOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure the {@link PageBlobClient.getPageRanges} operation.
 *
 * @export
 * @interface PageBlobGetPageRangesOptions
 */
export interface PageBlobGetPageRangesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobGetPageRangesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges.
   *
   * @type {BlobRequestConditions}
   * @memberof PageBlobGetPageRangesOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure the {@link PageBlobClient.getRangesDiff} operation.
 *
 * @export
 * @interface PageBlobGetPageRangesDiffOptions
 */
export interface PageBlobGetPageRangesDiffOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobGetPageRangesDiffOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when getting page ranges diff.
   *
   * @type {BlobRequestConditions}
   * @memberof PageBlobGetPageRangesDiffOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * (unused)
   *
   * @type {string}
   * @memberof PageBlobGetPageRangesDiffOptions
   */
  range?: string;
}

/**
 * Options to configure {@link PageBlobClient.resize} operation.
 *
 * @export
 * @interface PageBlobResizeOptions
 */
export interface PageBlobResizeOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobResizeOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when resizing a page blob.
   *
   * @type {BlobRequestConditions}
   * @memberof PageBlobResizeOptions
   */
  conditions?: BlobRequestConditions;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof PageBlobResizeOptions
   */
  encryptionScope?: string;
}

/**
 * Options to configure {@link PageBlobClient.updateSequenceNumber} operation.
 *
 * @export
 * @interface PageBlobUpdateSequenceNumberOptions
 */
export interface PageBlobUpdateSequenceNumberOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobUpdateSequenceNumberOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when updating sequence number.
   *
   * @type {BlobRequestConditions}
   * @memberof PageBlobUpdateSequenceNumberOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure {@link PageBlobClient.startCopyIncremental} operation.
 *
 * @export
 * @interface PageBlobStartCopyIncrementalOptions
 */
export interface PageBlobStartCopyIncrementalOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobStartCopyIncrementalOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when starting a copy incremental operation.
   *
   * @type {ModifiedAccessConditions}
   * @memberof PageBlobStartCopyIncrementalOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure {@link PageBlobClient.uploadPagesFromURL} operation.
 *
 * @export
 * @interface PageBlobUploadPagesFromURLOptions
 */
export interface PageBlobUploadPagesFromURLOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof PageBlobUploadPagesFromURLOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when updating sequence number.
   *
   * @type {PageBlobRequestConditions}
   * @memberof PageBlobUploadPagesFromURLOptions
   */
  conditions?: PageBlobRequestConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   *
   * @type {ModifiedAccessConditions}
   * @memberof PageBlobUploadPagesFromURLOptions
   */
  sourceConditions?: ModifiedAccessConditions;
  /**
   * An MD5 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof PageBlobUploadPagesFromURLOptions
   */
  sourceContentMD5?: Uint8Array;
  /**
   * A CRC64 hash of the content from the URI.
   * This hash is used to verify the integrity of the content during transport of the data from the URI.
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   *
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   *
   * @type {Uint8Array}
   * @memberof PageBlobUploadPagesFromURLOptions
   */
  sourceContentCrc64?: Uint8Array;
  /**
   * Customer Provided Key Info.
   *
   * @type {CpkInfo}
   * @memberof PageBlobUploadPagesFromURLOptions
   */
  customerProvidedKey?: CpkInfo;
  /**
   * Optional. Version 2019-07-07 and later.  Specifies the name of the encryption scope to use to
   * encrypt the data provided in the request. If not specified, encryption is performed with the
   * default account encryption scope.  For more information, see Encryption at Rest for Azure
   * Storage Services.
   *
   * @type {string}
   * @memberof PageBlobUploadPagesFromURLOptions
   */
  encryptionScope?: string;
}

/**
 * Contains response data for the {@link PageBlobClient.createIfNotExists} operation.
 *
 * @export
 * @interface PageBlobCreateIfNotExistsResponse
 */
export interface PageBlobCreateIfNotExistsResponse extends PageBlobCreateResponse {
  /**
   * Indicate whether the blob is successfully created. Is false when the blob is not changed as it already exists.
   *
   * @type {boolean}
   * @memberof PageBlobCreateIfNotExistsResponse
   */
  succeeded: boolean;
}

/**
 * PageBlobClient defines a set of operations applicable to page blobs.
 *
 * @export
 * @class PageBlobClient
 * @extends {BlobClient}
 */
export class PageBlobClient extends BlobClient {
  /**
   * pageBlobsContext provided by protocol layer.
   *
   * @private
   * @type {PageBlobs}
   * @memberof PageBlobClient
   */
  private pageBlobContext: PageBlob;

  /**
   *
   * Creates an instance of PageBlobClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} containerName Container name.
   * @param {string} blobName Blob name.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof PageBlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of PageBlobClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A Client string pointing to Azure Storage blob service, such as
   *                     "https://myaccount.blob.core.windows.net". You can append a SAS
   *                     if using AnonymousCredential, such as "https://myaccount.blob.core.windows.net?sasString".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof PageBlobClient
   */
  constructor(
    url: string,
    credential: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of PageBlobClient.
   *
   * @param {string} url A URL string pointing to Azure Storage blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blob".
   *                     You can append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/blob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof PageBlobClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    blobNameOrOptions?: string | StoragePipelineOptions,
    options?: StoragePipelineOptions
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: Pipeline;
    let url: string;
    options = options || {};
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
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
        if (isNode) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey
          );
          url = appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName)
          );
          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(
            appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)),
            encodeURIComponent(blobName)
          ) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(url, pipeline);
    this.pageBlobContext = new PageBlob(this.storageClientContext);
  }

  /**
   * Creates a new PageBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param {string} snapshot The snapshot timestamp.
   * @returns {PageBlobClient} A new PageBlobClient object identical to the source but with the specified snapshot timestamp.
   * @memberof PageBlobClient
   */
  public withSnapshot(snapshot: string): PageBlobClient {
    return new PageBlobClient(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot
      ),
      this.pipeline
    );
  }

  /**
   * Creates a page blob of the specified length. Call uploadPages to upload data
   * data to a page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {number} size size of the page blob.
   * @param {PageBlobCreateOptions} [options] Options to the Page Blob Create operation.
   * @returns {Promise<PageBlobCreateResponse>} Response data for the Page Blob Create operation.
   * @memberof PageBlobClient
   */
  public async create(
    size: number,
    options: PageBlobCreateOptions = {}
  ): Promise<PageBlobCreateResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("PageBlobClient-create", options.tracingOptions);
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.pageBlobContext.create(0, size, {
        abortSignal: options.abortSignal,
        blobHTTPHeaders: options.blobHTTPHeaders,
        blobSequenceNumber: options.blobSequenceNumber,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.conditions,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        tier: toAccessTier(options.tier),
        blobTagsString: toBlobTagsString(options.tags),
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a page blob of the specified length. Call uploadPages to upload data
   * data to a page blob. If the blob with the same name already exists, the content
   * of the existing blob will remain unchanged.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {number} size size of the page blob.
   * @param {PageBlobCreateIfNotExistsOptions} [options]
   * @returns {Promise<PageBlobCreateIfNotExistsResponse>}
   * @memberof PageBlobClient
   */
  public async createIfNotExists(
    size: number,
    options: PageBlobCreateIfNotExistsOptions = {}
  ): Promise<PageBlobCreateIfNotExistsResponse> {
    const { span, spanOptions } = createSpan(
      "PageBlobClient-createIfNotExists",
      options.tracingOptions
    );
    try {
      const conditions = { ifNoneMatch: ETagAny };
      const res = await this.create(size, {
        ...options,
        conditions,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res,
        _response: res._response // _response is made non-enumerable
      };
    } catch (e) {
      if (e.details?.errorCode === "BlobAlreadyExists") {
        span.setStatus({
          code: CanonicalCode.ALREADY_EXISTS,
          message: "Expected exception when creating a blob only if it does not already exist."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }

      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Writes 1 or more pages to the page blob. The start and end offsets must be a multiple of 512.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-page
   *
   * @param {HttpRequestBody} body Data to upload
   * @param {number} offset Offset of destination page blob
   * @param {number} count Content length of the body, also number of bytes to be uploaded
   * @param {PageBlobUploadPagesOptions} [options] Options to the Page Blob Upload Pages operation.
   * @returns {Promise<PageBlobsUploadPagesResponse>} Response data for the Page Blob Upload Pages operation.
   * @memberof PageBlobClient
   */
  public async uploadPages(
    body: HttpRequestBody,
    offset: number,
    count: number,
    options: PageBlobUploadPagesOptions = {}
  ): Promise<PageBlobUploadPagesResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("PageBlobClient-uploadPages", options.tracingOptions);
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.pageBlobContext.uploadPages(body, count, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        onUploadProgress: options.onProgress,
        range: rangeToString({ offset, count }),
        sequenceNumberAccessConditions: options.conditions,
        transactionalContentMD5: options.transactionalContentMD5,
        transactionalContentCrc64: options.transactionalContentCrc64,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * The Upload Pages operation writes a range of pages to a page blob where the
   * contents are read from a URL.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-page-from-url
   *
   * @param {string} sourceURL Specify a URL to the copy source, Shared Access Signature(SAS) maybe needed for authentication
   * @param {number} sourceOffset The source offset to copy from. Pass 0 to copy from the beginning of source page blob
   * @param {number} destOffset Offset of destination page blob
   * @param {number} count Number of bytes to be uploaded from source page blob
   * @param {PageBlobUploadPagesFromURLOptions} [options={}]
   * @returns {Promise<PageBlobUploadPagesFromURLResponse>}
   * @memberof PageBlobClient
   */
  public async uploadPagesFromURL(
    sourceURL: string,
    sourceOffset: number,
    destOffset: number,
    count: number,
    options: PageBlobUploadPagesFromURLOptions = {}
  ): Promise<PageBlobUploadPagesFromURLResponse> {
    options.conditions = options.conditions || {};
    options.sourceConditions = options.sourceConditions || {};
    const { span, spanOptions } = createSpan(
      "PageBlobClient-uploadPagesFromURL",
      options.tracingOptions
    );
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
      return await this.pageBlobContext.uploadPagesFromURL(
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
          modifiedAccessConditions: options.conditions,
          sourceModifiedAccessConditions: {
            sourceIfMatch: options.sourceConditions.ifMatch,
            sourceIfModifiedSince: options.sourceConditions.ifModifiedSince,
            sourceIfNoneMatch: options.sourceConditions.ifNoneMatch,
            sourceIfUnmodifiedSince: options.sourceConditions.ifUnmodifiedSince
          },
          cpkInfo: options.customerProvidedKey,
          encryptionScope: options.encryptionScope,
          spanOptions
        }
      );
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Frees the specified pages from the page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-page
   *
   * @param {number} [offset] Starting byte position of the pages to clear.
   * @param {number} [count] Number of bytes to clear.
   * @param {PageBlobClearPagesOptions} [options] Options to the Page Blob Clear Pages operation.
   * @returns {Promise<PageBlobClearPagesResponse>} Response data for the Page Blob Clear Pages operation.
   * @memberof PageBlobClient
   */
  public async clearPages(
    offset: number = 0,
    count?: number,
    options: PageBlobClearPagesOptions = {}
  ): Promise<PageBlobClearPagesResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("PageBlobClient-clearPages", options.tracingOptions);
    try {
      return await this.pageBlobContext.clearPages(0, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        range: rangeToString({ offset, count }),
        sequenceNumberAccessConditions: options.conditions,
        cpkInfo: options.customerProvidedKey,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns the list of valid page ranges for a page blob or snapshot of a page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param {number} [offset] Starting byte position of the page ranges.
   * @param {number} [count] Number of bytes to get.
   * @param {PageBlobGetPageRangesOptions} [options] Options to the Page Blob Get Ranges operation.
   * @returns {Promise<PageBlobGetPageRangesResponse>} Response data for the Page Blob Get Ranges operation.
   * @memberof PageBlobClient
   */
  public async getPageRanges(
    offset: number = 0,
    count?: number,
    options: PageBlobGetPageRangesOptions = {}
  ): Promise<PageBlobGetPageRangesResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "PageBlobClient-getPageRanges",
      options.tracingOptions
    );
    try {
      return await this.pageBlobContext
        .getPageRanges({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: options.conditions,
          range: rangeToString({ offset, count }),
          spanOptions
        })
        .then(rangeResponseFromModel);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the collection of page ranges that differ between a specified snapshot and this page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param {number} offset Starting byte position of the page blob
   * @param {number} count Number of bytes to get ranges diff.
   * @param {string} prevSnapshot Timestamp of snapshot to retrieve the difference.
   * @param {PageBlobGetPageRangesDiffOptions} [options] Options to the Page Blob Get Page Ranges Diff operation.
   * @returns {Promise<PageBlobGetPageRangesDiffResponse>} Response data for the Page Blob Get Page Range Diff operation.
   * @memberof PageBlobClient
   */
  public async getPageRangesDiff(
    offset: number,
    count: number,
    prevSnapshot: string,
    options: PageBlobGetPageRangesDiffOptions = {}
  ): Promise<PageBlobGetPageRangesDiffResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "PageBlobClient-getPageRangesDiff",
      options.tracingOptions
    );

    try {
      return await this.pageBlobContext
        .getPageRangesDiff({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: options.conditions,
          prevsnapshot: prevSnapshot,
          range: rangeToString({ offset, count }),
          spanOptions
        })
        .then(rangeResponseFromModel);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the collection of page ranges that differ between a specified snapshot and this page blob for managed disks.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param {number} offset Starting byte position of the page blob
   * @param {number} count Number of bytes to get ranges diff.
   * @param {string} prevSnapshotUrl URL of snapshot to retrieve the difference.
   * @param {PageBlobGetPageRangesDiffOptions} [options] Options to the Page Blob Get Page Ranges Diff operation.
   * @returns {Promise<PageBlobGetPageRangesDiffResponse>} Response data for the Page Blob Get Page Range Diff operation.
   * @memberof PageBlobClient
   */
  public async getPageRangesDiffForManagedDisks(
    offset: number,
    count: number,
    prevSnapshotUrl: string,
    options: PageBlobGetPageRangesDiffOptions = {}
  ): Promise<PageBlobGetPageRangesDiffResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "PageBlobClient-GetPageRangesDiffForManagedDisks",
      options.tracingOptions
    );

    try {
      return await this.pageBlobContext
        .getPageRangesDiff({
          abortSignal: options.abortSignal,
          leaseAccessConditions: options.conditions,
          modifiedAccessConditions: options.conditions,
          prevSnapshotUrl,
          range: rangeToString({ offset, count }),
          spanOptions
        })
        .then(rangeResponseFromModel);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Resizes the page blob to the specified size (which must be a multiple of 512).
   * @see https://docs.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param {number} size Target size
   * @param {PageBlobResizeOptions} [options] Options to the Page Blob Resize operation.
   * @returns {Promise<PageBlobResizeResponse>} Response data for the Page Blob Resize operation.
   * @memberof PageBlobClient
   */
  public async resize(
    size: number,
    options: PageBlobResizeOptions = {}
  ): Promise<PageBlobResizeResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan("PageBlobClient-resize", options.tracingOptions);
    try {
      return await this.pageBlobContext.resize(size, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        encryptionScope: options.encryptionScope,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets a page blob's sequence number.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param {SequenceNumberActionType} sequenceNumberAction Indicates how the service should modify the blob's sequence number.
   * @param {number} [sequenceNumber] Required if sequenceNumberAction is max or update
   * @param {PageBlobUpdateSequenceNumberOptions} [options] Options to the Page Blob Update Sequence Number operation.
   * @returns {Promise<PageBlobUpdateSequenceNumberResponse>} Response data for the Page Blob Update Sequence Number operation.
   * @memberof PageBlobClient
   */
  public async updateSequenceNumber(
    sequenceNumberAction: SequenceNumberActionType,
    sequenceNumber?: number,
    options: PageBlobUpdateSequenceNumberOptions = {}
  ): Promise<PageBlobUpdateSequenceNumberResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "PageBlobClient-updateSequenceNumber",
      options.tracingOptions
    );
    try {
      return await this.pageBlobContext.updateSequenceNumber(sequenceNumberAction, {
        abortSignal: options.abortSignal,
        blobSequenceNumber: sequenceNumber,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Begins an operation to start an incremental copy from one page blob's snapshot to this page blob.
   * The snapshot is copied such that only the differential changes between the previously
   * copied snapshot are transferred to the destination.
   * The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual.
   * @see https://docs.microsoft.com/rest/api/storageservices/incremental-copy-blob
   * @see https://docs.microsoft.com/en-us/azure/virtual-machines/windows/incremental-snapshots
   *
   * @param {string} copySource Specifies the name of the source page blob snapshot. For example,
   *                            https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param {PageBlobStartCopyIncrementalOptions} [options] Options to the Page Blob Copy Incremental operation.
   * @returns {Promise<PageBlobCopyIncrementalResponse>} Response data for the Page Blob Copy Incremental operation.
   * @memberof PageBlobClient
   */
  public async startCopyIncremental(
    copySource: string,
    options: PageBlobStartCopyIncrementalOptions = {}
  ): Promise<PageBlobCopyIncrementalResponse> {
    const { span, spanOptions } = createSpan(
      "PageBlobClient-startCopyIncremental",
      options.tracingOptions
    );
    try {
      return await this.pageBlobContext.copyIncremental(copySource, {
        abortSignal: options.abortSignal,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

/**
 * The details for a specific lease.
 */
export interface Lease {
  /**
   * The ETag contains a value that you can use to
   * perform operations conditionally. If the request version is 2011-08-18 or
   * newer, the ETag value will be in quotes.
   */
  etag?: string;
  /**
   * Returns the date and time the container was
   * last modified. Any operation that modifies the blob, including an update
   * of the blob's metadata or properties, changes the last-modified time of
   * the blob.
   */
  lastModified?: Date;
  /**
   * Uniquely identifies a container's lease
   */
  leaseId?: string;
  /**
   * Approximate time remaining in the lease
   * period, in seconds.
   */
  leaseTime?: number;
  /**
   * This header uniquely identifies the request
   * that was made and can be used for troubleshooting the request.
   */
  requestId?: string;
  /**
   * Indicates the version of the Blob service used
   * to execute the request. This header is returned for requests made against
   * version 2009-09-19 and above.
   */
  version?: string;
  /**
   * UTC date/time value generated by the service that
   * indicates the time at which the response was initiated
   */
  date?: Date;
  /**
   * Error code if any associated with the response that returned
   * the Lease information.
   */
  errorCode?: string;
}

/**
 * Contains the response data for operations that create, modify, or delete a lease.
 *
 * See {@link BlobLeaseClient}.
 */
export type LeaseOperationResponse = Lease & {
  /**
   * The underlying HTTP response.
   */
  _response: HttpResponse & {
    /**
     * The parsed HTTP response headers.
     */
    parsedHeaders: Lease;
  };
};

/**
 * Configures lease operations.
 *
 * @export
 * @interface LeaseOperationOptions
 */
export interface LeaseOperationOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof LeaseOperationOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof LeaseOperationOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * A client that manages leases for a {@link ContainerClient} or a {@link BlobClient}.
 *
 * @export
 * @class BlobLeaseClient
 */
export class BlobLeaseClient {
  private _leaseId: string;
  private _url: string;
  private _containerOrBlobOperation: Container | StorageBlob;

  /**
   * Gets the lease Id.
   *
   * @readonly
   * @memberof BlobLeaseClient
   * @type {string}
   */
  public get leaseId(): string {
    return this._leaseId;
  }

  /**
   * Gets the url.
   *
   * @readonly
   * @memberof BlobLeaseClient
   * @type {string}
   */
  public get url(): string {
    return this._url;
  }

  /**
   * Creates an instance of BlobLeaseClient.
   * @param {(ContainerClient | BlobClient)} client The client to make the lease operation requests.
   * @param {string} leaseId Initial proposed lease id.
   * @memberof BlobLeaseClient
   */
  constructor(client: ContainerClient | BlobClient, leaseId?: string) {
    const clientContext = new StorageClientContext(
      client.url,
      (client as any).pipeline.toServiceClientOptions()
    );
    this._url = client.url;

    if (client instanceof ContainerClient) {
      this._containerOrBlobOperation = new Container(clientContext);
    } else {
      this._containerOrBlobOperation = new StorageBlob(clientContext);
    }

    if (!leaseId) {
      leaseId = generateUuid();
    }
    this._leaseId = leaseId;
  }

  /**
   * Establishes and manages a lock on a container for delete operations, or on a blob
   * for write and delete operations.
   * The lock duration can be 15 to 60 seconds, or can be infinite.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {number} duration Must be between 15 to 60 seconds, or infinite (-1)
   * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for acquire lease operation.
   * @memberof BlobLeaseClient
   */
  public async acquireLease(
    duration: number,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan(
      "BlobLeaseClient-acquireLease",
      options.tracingOptions
    );
    try {
      return await this._containerOrBlobOperation.acquireLease({
        abortSignal: options.abortSignal,
        duration,
        modifiedAccessConditions: options.conditions,
        proposedLeaseId: this._leaseId,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * To change the ID of the lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {string} proposedLeaseId the proposed new lease Id.
   * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for change lease operation.
   * @memberof BlobLeaseClient
   */
  public async changeLease(
    proposedLeaseId: string,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan("BlobLeaseClient-changeLease", options.tracingOptions);
    try {
      const response = await this._containerOrBlobOperation.changeLease(
        this._leaseId,
        proposedLeaseId,
        {
          abortSignal: options.abortSignal,
          modifiedAccessConditions: options.conditions,
          spanOptions
        }
      );
      this._leaseId = proposedLeaseId;
      return response;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * To free the lease if it is no longer needed so that another client may
   * immediately acquire a lease against the container or the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {LeaseOperationOptions} [options={}] option to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for release lease operation.
   * @memberof BlobLeaseClient
   */
  public async releaseLease(options: LeaseOperationOptions = {}): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan(
      "BlobLeaseClient-releaseLease",
      options.tracingOptions
    );
    try {
      return await this._containerOrBlobOperation.releaseLease(this._leaseId, {
        abortSignal: options.abortSignal,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * To renew the lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {LeaseOperationOptions} [options={}] Optional option to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for renew lease operation.
   * @memberof BlobLeaseClient
   */
  public async renewLease(options: LeaseOperationOptions = {}): Promise<Lease> {
    const { span, spanOptions } = createSpan("BlobLeaseClient-renewLease", options.tracingOptions);
    try {
      return await this._containerOrBlobOperation.renewLease(this._leaseId, {
        abortSignal: options.abortSignal,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * To end the lease but ensure that another client cannot acquire a new lease
   * until the current lease period has expired.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-container
   * and
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @static
   * @param {number} breakPeriod Break period
   * @param {LeaseOperationOptions} [options={}] Optional options to configure lease management operations.
   * @returns {Promise<LeaseOperationResponse>} Response data for break lease operation.
   * @memberof BlobLeaseClient
   */
  public async breakLease(
    breakPeriod: number,
    options: LeaseOperationOptions = {}
  ): Promise<LeaseOperationResponse> {
    const { span, spanOptions } = createSpan("BlobLeaseClient-breakLease", options.tracingOptions);
    try {
      const operationOptions: ContainerBreakLeaseOptionalParams = {
        abortSignal: options.abortSignal,
        breakPeriod,
        modifiedAccessConditions: options.conditions,
        spanOptions
      };
      return await this._containerOrBlobOperation.breakLease(operationOptions);
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }
}

/**
 * Options to configure {@link ContainerClient.create} operation.
 *
 * @export
 * @interface ContainerCreateOptions
 */
export interface ContainerCreateOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerCreateOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * A collection of key-value string pair to associate with the container.
   *
   * @type {Metadata}
   * @memberof ContainerCreateOptions
   */
  metadata?: Metadata;
  /**
   * Specifies whether data in the container may be accessed publicly and the level of access. Possible values include:
   * - `container`: Specifies full public read access for container and blob data. Clients can enumerate blobs within the container via anonymous request, but cannot enumerate containers within the storage account.
   * - `blob`: Specifies public read access for blobs. Blob data within this container can be read via anonymous request, but container data is not available. Clients cannot enumerate blobs within the container via anonymous request.
   *
   * @type {PublicAccessType}
   * @memberof ContainerCreateOptions
   */
  access?: PublicAccessType;
  /**
   * Container encryption scope info.
   *
   * @type {ContainerEncryptionScope}
   * @memberof ContainerCreateOptions
   */
  containerEncryptionScope?: ContainerEncryptionScope;
}

/**
 * Options to configure {@link ContainerClient.getProperties} operation.
 *
 * @export
 * @interface ContainerGetPropertiesOptions
 */
export interface ContainerGetPropertiesOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerGetPropertiesOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof ContainerGetPropertiesOptions
   */
  conditions?: LeaseAccessConditions;
}

/**
 * Options to configure {@link ContainerClient.delete} operation.
 *
 * @export
 * @interface ContainerDeleteMethodOptions
 */
export interface ContainerDeleteMethodOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerDeleteMethodOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when deleting the container.
   *
   * @type {BlobRequestConditions}
   * @memberof ContainerDeleteMethodOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure {@link ContainerClient.exists} operation.
 *
 * @export
 * @interface ContainerExistsOptions
 */
export interface ContainerExistsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerDeleteMethodOptions
   */
  abortSignal?: AbortSignalLike;
}

/**
 * Options to configure {@link ContainerClient.setMetadata} operation.
 *
 * @export
 * @interface ContainerSetMetadataOptions
 */
export interface ContainerSetMetadataOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerSetMetadataOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {BlobRequestConditions}
   * @memberof ContainerSetMetadataOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure {@link ContainerClient.getAccessPolicy} operation.
 *
 * @export
 * @interface ContainerGetAccessPolicyOptions
 */
export interface ContainerGetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerGetAccessPolicyOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * If specified, contains the lease id that must be matched and lease with this id
   * must be active in order for the operation to succeed.
   *
   * @type {LeaseAccessConditions}
   * @memberof ContainerGetAccessPolicyOptions
   */
  conditions?: LeaseAccessConditions;
}

/**
 * Signed identifier.
 *
 * @export
 * @interface SignedIdentifier
 */
export interface SignedIdentifier {
  /**
   * @member {string} id a unique id
   */
  id: string;
  /**
   * @member {AccessPolicy} accessPolicy
   */
  accessPolicy: {
    /**
     * @member {Date} startsOn Optional. The date-time the policy is active
     */
    startsOn?: Date;
    /**
     * @member {Date} expiresOn Optional. The date-time the policy expires
     */
    expiresOn?: Date;
    /**
     * @member {string} permissions The permissions for the acl policy
     * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
     */
    permissions?: string;
  };
}

/**
 * Contains response data for the {@link ContainerClient.getAccessPolicy} operation.
 */
export declare type ContainerGetAccessPolicyResponse = {
  signedIdentifiers: SignedIdentifier[];
} & ContainerGetAccessPolicyHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ContainerGetAccessPolicyHeaders;
      /**
       * The response body as text (string format)
       */
      bodyAsText: string;
      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: SignedIdentifierModel[];
    };
  };

/**
 * Options to configure {@link ContainerClient.setAccessPolicy} operation.
 *
 * @export
 * @interface ContainerSetAccessPolicyOptions
 */
export interface ContainerSetAccessPolicyOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerSetAccessPolicyOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when setting the access policy.
   *
   * @type {BlobRequestConditions}
   * @memberof ContainerSetAccessPolicyOptions
   */
  conditions?: BlobRequestConditions;
}

/**
 * Options to configure Container - Acquire Lease operation.
 *
 * @export
 * @interface ContainerAcquireLeaseOptions
 */
export interface ContainerAcquireLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerAcquireLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when acquiring the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerAcquireLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Release Lease operation.
 *
 * @export
 * @interface ContainerReleaseLeaseOptions
 */
export interface ContainerReleaseLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerReleaseLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when releasing the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerReleaseLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Renew Lease operation.
 *
 * @export
 * @interface ContainerRenewLeaseOptions
 */
export interface ContainerRenewLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerRenewLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when renewing the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerRenewLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Break Lease operation.
 *
 * @export
 * @interface ContainerBreakLeaseOptions
 */
export interface ContainerBreakLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerBreakLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when breaking the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerBreakLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure Container - Change Lease operation.
 *
 * @export
 * @interface ContainerChangeLeaseOptions
 */
export interface ContainerChangeLeaseOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerChangeLeaseOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Conditions to meet when changing the lease.
   *
   * @type {ModifiedAccessConditions}
   * @memberof ContainerChangeLeaseOptions
   */
  conditions?: ModifiedAccessConditions;
}

/**
 * Options to configure the {@link ContainerClient.deleteBlob} operation.
 *
 * @export
 * @interface ContainerDeleteBlobOptions
 */
export interface ContainerDeleteBlobOptions extends BlobDeleteOptions {
  /**
   * An opaque DateTime value that, when present, specifies the version
   * of the blob to delete. It's for service version 2019-10-10 and newer.
   *
   * @type {string}
   * @memberof ContainerDeleteBlobOptions
   */
  versionId?: string;
}

/**
 * Options to configure Container - List Segment operations.
 *
 * See:
 * - {@link ContainerClient.listSegments}
 * - {@link ContainerClient.listBlobFlatSegment}
 * - {@link ContainerClient.listBlobHierarchySegment}
 * - {@link ContainerClient.listHierarchySegments}
 * - {@link ContainerClient.listItemsByHierarchy}
 *
 * @interface ContainerListBlobsSegmentOptions
 */
interface ContainerListBlobsSegmentOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerListBlobsSegmentOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;
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
  /**
   * Include this parameter to
   * specify one or more datasets to include in the response.
   */
  include?: ListBlobsIncludeItem[];
}

/**
 * An interface representing BlobHierarchyListSegment.
 */
export interface BlobHierarchyListSegment {
  blobPrefixes?: BlobPrefix[];
  blobItems: BlobItem[];
}

/**
 * An enumeration of blobs
 */
export interface ListBlobsHierarchySegmentResponse {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  delimiter?: string;
  segment: BlobHierarchyListSegment;
  continuationToken?: string;
}

/**
 * Contains response data for the listBlobHierarchySegment operation.
 */
export type ContainerListBlobHierarchySegmentResponse = ListBlobsHierarchySegmentResponse &
  ContainerListBlobHierarchySegmentHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ContainerListBlobHierarchySegmentHeaders;

      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ListBlobsHierarchySegmentResponseModel;
    };
  };

/**
 * An Azure Storage blob
 */
export interface BlobItem {
  name: string;
  deleted: boolean;
  snapshot: string;
  versionId?: string;
  isCurrentVersion?: boolean;
  properties: BlobProperties;
  metadata?: { [propertyName: string]: string };
  tags?: Tags;
  objectReplicationSourceProperties?: ObjectReplicationPolicy[];
}

/**
 * An interface representing BlobFlatListSegment.
 */
export interface BlobFlatListSegment {
  blobItems: BlobItem[];
}

/**
 * An enumeration of blobs
 */
export interface ListBlobsFlatSegmentResponse {
  serviceEndpoint: string;
  containerName: string;
  prefix?: string;
  marker?: string;
  maxPageSize?: number;
  segment: BlobFlatListSegment;
  continuationToken?: string;
}

/**
 * Contains response data for the listBlobFlatSegment operation.
 */
export type ContainerListBlobFlatSegmentResponse = ListBlobsFlatSegmentResponse &
  ContainerListBlobFlatSegmentHeaders & {
    /**
     * The underlying HTTP response.
     */
    _response: HttpResponse & {
      /**
       * The parsed HTTP response headers.
       */
      parsedHeaders: ContainerListBlobFlatSegmentHeaders;

      /**
       * The response body as text (string format)
       */
      bodyAsText: string;

      /**
       * The response body as parsed JSON or XML
       */
      parsedBody: ListBlobsFlatSegmentResponseModel;
    };
  };

/**
 * Options to configure Container - List Blobs operations.
 *
 * See:
 * - {@link ContainerClient.listBlobsFlat}
 * - {@link ContainerClient.listBlobsByHierarchy}
 *
 * @export
 * @interface ContainerListBlobsOptions
 */
export interface ContainerListBlobsOptions extends CommonOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof ContainerListBlobsOptions
   */
  abortSignal?: AbortSignalLike;
  /**
   * Filters the results to return only containers
   * whose name begins with the specified prefix.
   */
  prefix?: string;

  /**
   * Specifies whether metadata related to any current or previous Copy Blob operation should be included in the response.
   */
  includeCopy?: boolean;
  /**
   * Specifies whether soft deleted blobs should be included in the response.
   */
  includeDeleted?: boolean;
  /**
   * Specifies whether blob metadata be returned in the response.
   */
  includeMetadata?: boolean;
  /**
   * Specifies whether snapshots should be included in the enumeration. Snapshots are listed from oldest to newest in the response.
   */
  includeSnapshots?: boolean;
  /**
   * Specifies whether versions should be included in the enumeration. Versions are listed from oldest to newest in the response.
   */
  includeVersions?: boolean;
  /**
   * Specifies whether blobs for which blocks have been uploaded, but which have not been committed using Put Block List, be included in the response.
   */
  includeUncommitedBlobs?: boolean;
  /**
   * Specifies whether blob tags be returned in the response.
   */
  includeTags?: boolean;
}

/**
 * Contains response data for the {@link ContainerClient.createIfNotExists} operation.
 *
 * @export
 * @interface ContainerCreateIfNotExistsResponse
 */
export interface ContainerCreateIfNotExistsResponse extends ContainerCreateResponse {
  /**
   * Indicate whether the container is successfully created. Is false when the container is not changed as it already exists.
   *
   * @type {boolean}
   * @memberof ContainerCreateIfNotExistsResponse
   */
  succeeded: boolean;
}

/**
 * Contains response data for the {@link ContainerClient.deleteIfExists} operation.
 *
 * @export
 * @interface ContainerDeleteIfExistsResponse
 */
export interface ContainerDeleteIfExistsResponse extends ContainerDeleteResponse {
  /**
   * Indicate whether the container is successfully deleted. Is false if the container does not exist in the first place.
   *
   * @type {boolean}
   * @memberof ContainerDeleteIfExistsResponse
   */
  succeeded: boolean;
}

/**
 * A ContainerClient represents a URL to the Azure Storage container allowing you to manipulate its blobs.
 *
 * @export
 * @class ContainerClient
 */
export class ContainerClient extends StorageClient {
  /**
   * containerContext provided by protocol layer.
   *
   * @private
   * @type {Containers}
   * @memberof ContainerClient
   */
  private containerContext: Container;

  private _containerName: string;

  /**
   * The name of the container.
   */
  public get containerName(): string {
    return this._containerName;
  }
  /**
   *
   * Creates an instance of ContainerClient.
   *
   * @param {string} connectionString Account connection string or a SAS connection string of an Azure storage account.
   *                                  [ Note - Account connection string can only be used in NODE.JS runtime. ]
   *                                  Account connection string example -
   *                                  `DefaultEndpointsProtocol=https;AccountName=myaccount;AccountKey=accountKey;EndpointSuffix=core.windows.net`
   *                                  SAS connection string example -
   *                                  `BlobEndpoint=https://myaccount.blob.core.windows.net/;QueueEndpoint=https://myaccount.queue.core.windows.net/;FileEndpoint=https://myaccount.file.core.windows.net/;TableEndpoint=https://myaccount.table.core.windows.net/;SharedAccessSignature=sasString`
   * @param {string} containerName Container name.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ContainerClient
   */
  constructor(connectionString: string, containerName: string, options?: StoragePipelineOptions);
  /**
   * Creates an instance of ContainerClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a page blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.
   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {StorageSharedKeyCredential | AnonymousCredential | TokenCredential} credential  Such as AnonymousCredential, StorageSharedKeyCredential or any credential from the @azure/identity package to authenticate requests to the service. You can also provide an object that implements the TokenCredential interface. If not specified, AnonymousCredential is used.
   * @param {StoragePipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof ContainerClient
   */
  constructor(
    url: string,
    credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: StoragePipelineOptions
  );
  /**
   * Creates an instance of ContainerClient.
   * This method accepts an encoded URL or non-encoded URL pointing to a page blob.
   * Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   * If a blob name includes ? or %, blob name must be encoded in the URL.
   *
   * @param {string} url A URL string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
   *                     This method accepts an encoded URL or non-encoded URL pointing to a blob.
   *                     Encoded URL string will NOT be escaped twice, only special characters in URL path will be escaped.
   *                     However, if a blob name includes ? or %, blob name must be encoded in the URL.

   *                     Such as a blob named "my?blob%", the URL should be "https://myaccount.blob.core.windows.net/mycontainer/my%3Fblob%25".
   * @param {Pipeline} pipeline Call newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof ContainerClient
   */
  constructor(url: string, pipeline: Pipeline);
  constructor(
    urlOrConnectionString: string,
    credentialOrPipelineOrContainerName?:
      | string
      | StorageSharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    options?: StoragePipelineOptions
  ) {
    let pipeline: Pipeline;
    let url: string;
    options = options || {};
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      // (url: string, pipeline: Pipeline)
      url = urlOrConnectionString;
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof StorageSharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      // (url: string, credential?: StorageSharedKeyCredential | AnonymousCredential | TokenCredential, options?: StoragePipelineOptions)
      url = urlOrConnectionString;
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
      typeof credentialOrPipelineOrContainerName === "string"
    ) {
      // (connectionString: string, containerName: string, blobName: string, options?: StoragePipelineOptions)
      const containerName = credentialOrPipelineOrContainerName;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const sharedKeyCredential = new StorageSharedKeyCredential(
            extractedCreds.accountName!,
            extractedCreds.accountKey
          );
          url = appendToURLPath(extractedCreds.url, encodeURIComponent(containerName));
          options.proxyOptions = getDefaultProxySettings(extractedCreds.proxyUri);
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        url =
          appendToURLPath(extractedCreds.url, encodeURIComponent(containerName)) +
          "?" +
          extractedCreds.accountSas;
        pipeline = newPipeline(new AnonymousCredential(), options);
      } else {
        throw new Error(
          "Connection string must be either an Account connection string or a SAS connection string"
        );
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName parameter");
    }
    super(url, pipeline);
    this._containerName = this.getContainerNameFromUrl();
    this.containerContext = new Container(this.storageClientContext);
  }

  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, the operation fails.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param {ContainerCreateOptions} [options] Options to Container Create operation.
   * @returns {Promise<ContainerCreateResponse>}
   * @memberof ContainerClient
   *
   * Example usage:
   *
   * ```js
   * const containerClient = blobServiceClient.getContainerClient("<container name>");
   * const createContainerResponse = await containerClient.create();
   * console.log("Container was created successfully", createContainerResponse.requestId);
   * ```
   */
  public async create(options: ContainerCreateOptions = {}): Promise<ContainerCreateResponse> {
    const { span, spanOptions } = createSpan("ContainerClient-create", options.tracingOptions);
    try {
      // Spread operator in destructuring assignments,
      // this will filter out unwanted properties from the response object into result object
      return await this.containerContext.create({
        ...options,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a new container under the specified account. If the container with
   * the same name already exists, it is not changed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/create-container
   *
   * @param {ContainerCreateOptions} [options]
   * @returns {Promise<ContainerCreateIfNotExistsResponse>}
   * @memberof ContainerClient
   */
  public async createIfNotExists(
    options: ContainerCreateOptions = {}
  ): Promise<ContainerCreateIfNotExistsResponse> {
    const { span, spanOptions } = createSpan(
      "ContainerClient-createIfNotExists",
      options.tracingOptions
    );
    try {
      const res = await this.create({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res,
        _response: res._response // _response is made non-enumerable
      };
    } catch (e) {
      if (e.details?.errorCode === "ContainerAlreadyExists") {
        span.setStatus({
          code: CanonicalCode.ALREADY_EXISTS,
          message: "Expected exception when creating a container only if it does not already exist."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }

      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns true if the Azure container resource represented by this client exists; false otherwise.
   *
   * NOTE: use this function with care since an existing container might be deleted by other clients or
   * applications. Vice versa new containers with the same name might be added by other clients or
   * applications after this function completes.
   *
   * @param {ContainerExistsOptions} [options={}]
   * @returns {Promise<boolean>}
   * @memberof ContainerClient
   */
  public async exists(options: ContainerExistsOptions = {}): Promise<boolean> {
    const { span, spanOptions } = createSpan("ContainerClient-exists", options.tracingOptions);
    try {
      await this.getProperties({
        abortSignal: options.abortSignal,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return true;
    } catch (e) {
      if (e.statusCode === 404) {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when checking container existence"
        });
        return false;
      }
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Creates a {@link BlobClient}
   *
   * @param {string} blobName A blob name
   * @returns {BlobClient} A new BlobClient object for the given blob name.
   * @memberof ContainerClient
   */
  public getBlobClient(blobName: string): BlobClient {
    return new BlobClient(appendToURLPath(this.url, encodeURIComponent(blobName)), this.pipeline);
  }

  /**
   * Creates an {@link AppendBlobClient}
   *
   * @param {string} blobName An append blob name
   * @returns {AppendBlobClient}
   * @memberof ContainerClient
   */
  public getAppendBlobClient(blobName: string): AppendBlobClient {
    return new AppendBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a {@link BlockBlobClient}
   *
   * @param {string} blobName A block blob name
   * @returns {BlockBlobClient}
   * @memberof ContainerClient
   *
   * Example usage:
   *
   * ```js
   * const content = "Hello world!";
   *
   * const blockBlobClient = containerClient.getBlockBlobClient("<blob name>");
   * const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
   * ```
   */
  public getBlockBlobClient(blobName: string): BlockBlobClient {
    return new BlockBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Creates a {@link PageBlobClient}
   *
   * @param {string} blobName A page blob name
   * @returns {PageBlobClient}
   * @memberof ContainerClient
   */
  public getPageBlobClient(blobName: string): PageBlobClient {
    return new PageBlobClient(
      appendToURLPath(this.url, encodeURIComponent(blobName)),
      this.pipeline
    );
  }

  /**
   * Returns all user-defined metadata and system properties for the specified
   * container. The data returned does not include the container's list of blobs.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-properties
   *
   * WARNING: The `metadata` object returned in the response will have its keys in lowercase, even if
   * they originally contained uppercase characters. This differs from the metadata keys returned by
   * the `listContainers` method of {@link BlobServiceClient} using the `includeMetadata` option, which
   * will retain their original casing.
   *
   * @param {ContainerGetPropertiesOptions} [options] Options to Container Get Properties operation.
   * @returns {Promise<ContainerGetPropertiesResponse>}
   * @memberof ContainerClient
   */
  public async getProperties(
    options: ContainerGetPropertiesOptions = {}
  ): Promise<ContainerGetPropertiesResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, spanOptions } = createSpan(
      "ContainerClient-getProperties",
      options.tracingOptions
    );
    try {
      return await this.containerContext.getProperties({
        abortSignal: options.abortSignal,
        ...options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Marks the specified container for deletion. The container and any blobs
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param {ContainerDeleteMethodOptions} [options] Options to Container Delete operation.
   * @returns {Promise<ContainerDeleteResponse>}
   * @memberof ContainerClient
   */
  public async delete(
    options: ContainerDeleteMethodOptions = {}
  ): Promise<ContainerDeleteResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    if (
      (options.conditions.ifMatch && options.conditions.ifMatch !== ETagNone) ||
      (options.conditions.ifNoneMatch && options.conditions.ifNoneMatch !== ETagNone)
    ) {
      throw new RangeError(
        "the IfMatch and IfNoneMatch access conditions must have their default\
        values because they are ignored by the service"
      );
    }

    const { span, spanOptions } = createSpan("ContainerClient-delete", options.tracingOptions);

    try {
      return await this.containerContext.deleteMethod({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Marks the specified container for deletion if it exists. The container and any blobs
   * contained within it are later deleted during garbage collection.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-container
   *
   * @param {ContainerDeleteMethodOptions} [options] Options to Container Delete operation.
   * @returns {Promise<ContainerDeleteIfExistsResponse>}
   * @memberof ContainerClient
   */
  public async deleteIfExists(
    options: ContainerDeleteMethodOptions = {}
  ): Promise<ContainerDeleteIfExistsResponse> {
    const { span, spanOptions } = createSpan(
      "ContainerClient-deleteIfExists",
      options.tracingOptions
    );

    try {
      const res = await this.delete({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        succeeded: true,
        ...res,
        _response: res._response // _response is made non-enumerable
      };
    } catch (e) {
      if (e.details?.errorCode === "ContainerNotFound") {
        span.setStatus({
          code: CanonicalCode.NOT_FOUND,
          message: "Expected exception when deleting a container only if it exists."
        });
        return {
          succeeded: false,
          ...e.response?.parsedHeaders,
          _response: e.response
        };
      }
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets one or more user-defined name-value pairs for the specified container.
   *
   * If no option provided, or no metadata defined in the parameter, the container
   * metadata will be removed.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-metadata
   *
   * @param {Metadata} [metadata] Replace existing metadata with this value.
   *                            If no value provided the existing metadata will be removed.
   * @param {ContainerSetMetadataOptions} [options] Options to Container Set Metadata operation.
   * @returns {Promise<ContainerSetMetadataResponse>}
   * @memberof ContainerClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: ContainerSetMetadataOptions = {}
  ): Promise<ContainerSetMetadataResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    if (
      options.conditions.ifUnmodifiedSince ||
      (options.conditions.ifMatch && options.conditions.ifMatch !== ETagNone) ||
      (options.conditions.ifNoneMatch && options.conditions.ifNoneMatch !== ETagNone)
    ) {
      throw new RangeError(
        "the IfUnmodifiedSince, IfMatch, and IfNoneMatch must have their default values\
        because they are ignored by the blob service"
      );
    }

    const { span, spanOptions } = createSpan("ContainerClient-setMetadata", options.tracingOptions);

    try {
      return await this.containerContext.setMetadata({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        metadata,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Gets the permissions for the specified container. The permissions indicate
   * whether container data may be accessed publicly.
   *
   * WARNING: JavaScript Date will potentially lose precision when parsing startsOn and expiresOn strings.
   * For example, new Date("2018-12-31T03:44:23.8827891Z").toISOString() will get "2018-12-31T03:44:23.882Z".
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-container-acl
   *
   * @param {ContainerGetAccessPolicyOptions} [options] Options to Container Get Access Policy operation.
   * @returns {Promise<ContainerGetAccessPolicyResponse>}
   * @memberof ContainerClient
   */
  public async getAccessPolicy(
    options: ContainerGetAccessPolicyOptions = {}
  ): Promise<ContainerGetAccessPolicyResponse> {
    if (!options.conditions) {
      options.conditions = {};
    }

    const { span, spanOptions } = createSpan(
      "ContainerClient-getAccessPolicy",
      options.tracingOptions
    );

    try {
      const response = await this.containerContext.getAccessPolicy({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        spanOptions
      });

      const res: ContainerGetAccessPolicyResponse = {
        _response: response._response,
        blobPublicAccess: response.blobPublicAccess,
        date: response.date,
        etag: response.etag,
        errorCode: response.errorCode,
        lastModified: response.lastModified,
        requestId: response.requestId,
        clientRequestId: response.clientRequestId,
        signedIdentifiers: [],
        version: response.version
      };

      for (const identifier of response) {
        let accessPolicy: any = undefined;
        if (identifier.accessPolicy) {
          accessPolicy = {
            permissions: identifier.accessPolicy.permissions
          };

          if (identifier.accessPolicy.expiresOn) {
            accessPolicy.expiresOn = new Date(identifier.accessPolicy.expiresOn);
          }

          if (identifier.accessPolicy.startsOn) {
            accessPolicy.startsOn = new Date(identifier.accessPolicy.startsOn);
          }
        }

        res.signedIdentifiers.push({
          accessPolicy,
          id: identifier.id
        });
      }

      return res;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Sets the permissions for the specified container. The permissions indicate
   * whether blobs in a container may be accessed publicly.
   *
   * When you set permissions for a container, the existing permissions are replaced.
   * If no access or containerAcl provided, the existing container ACL will be
   * removed.
   *
   * When you establish a stored access policy on a container, it may take up to 30 seconds to take effect.
   * During this interval, a shared access signature that is associated with the stored access policy will
   * fail with status code 403 (Forbidden), until the access policy becomes active.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-container-acl
   *
   * @param {PublicAccessType} [access] The level of public access to data in the container.
   * @param {SignedIdentifier[]} [containerAcl] Array of elements each having a unique Id and details of the access policy.
   * @param {ContainerSetAccessPolicyOptions} [options] Options to Container Set Access Policy operation.
   * @returns {Promise<ContainerSetAccessPolicyResponse>}
   * @memberof ContainerClient
   */
  public async setAccessPolicy(
    access?: PublicAccessType,
    containerAcl?: SignedIdentifier[],
    options: ContainerSetAccessPolicyOptions = {}
  ): Promise<ContainerSetAccessPolicyResponse> {
    options.conditions = options.conditions || {};
    const { span, spanOptions } = createSpan(
      "ContainerClient-setAccessPolicy",
      options.tracingOptions
    );
    try {
      const acl: SignedIdentifierModel[] = [];
      for (const identifier of containerAcl || []) {
        acl.push({
          accessPolicy: {
            expiresOn: identifier.accessPolicy.expiresOn
              ? truncatedISO8061Date(identifier.accessPolicy.expiresOn)
              : "",
            permissions: identifier.accessPolicy.permissions,
            startsOn: identifier.accessPolicy.startsOn
              ? truncatedISO8061Date(identifier.accessPolicy.startsOn)
              : ""
          },
          id: identifier.id
        });
      }

      return await this.containerContext.setAccessPolicy({
        abortSignal: options.abortSignal,
        access,
        containerAcl: acl,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        spanOptions
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Get a {@link BlobLeaseClient} that manages leases on the container.
   *
   * @param {string} [proposeLeaseId] Initial proposed lease Id.
   * @returns {BlobLeaseClient} A new BlobLeaseClient object for managing leases on the container.
   * @memberof ContainerClient
   */
  public getBlobLeaseClient(proposeLeaseId?: string): BlobLeaseClient {
    return new BlobLeaseClient(this, proposeLeaseId);
  }

  /**
   * Creates a new block blob, or updates the content of an existing block blob.
   *
   * Updating an existing block blob overwrites any existing metadata on the blob.
   * Partial updates are not supported; the content of the existing blob is
   * overwritten with the new content. To perform a partial update of a block blob's,
   * use {@link BlockBlobClient.stageBlock} and {@link BlockBlobClient.commitBlockList}.
   *
   * This is a non-parallel uploading method, please use {@link BlockBlobClient.uploadFile},
   * {@link BlockBlobClient.uploadStream} or {@link BlockBlobClient.uploadBrowserData} for better
   * performance with concurrency uploading.
   *
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {string} blobName Name of the block blob to create or update.
   * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param {BlockBlobUploadOptions} [options] Options to configure the Block Blob Upload operation.
   * @returns {Promise<{ blockBlobClient: BlockBlobClient; response: BlockBlobUploadResponse }>} Block Blob upload response data and the corresponding BlockBlobClient instance.
   * @memberof ContainerClient
   */
  public async uploadBlockBlob(
    blobName: string,
    body: HttpRequestBody,
    contentLength: number,
    options: BlockBlobUploadOptions = {}
  ): Promise<{ blockBlobClient: BlockBlobClient; response: BlockBlobUploadResponse }> {
    const { span, spanOptions } = createSpan(
      "ContainerClient-uploadBlockBlob",
      options.tracingOptions
    );
    try {
      const blockBlobClient = this.getBlockBlobClient(blobName);
      const response = await blockBlobClient.upload(body, contentLength, {
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
      return {
        blockBlobClient,
        response
      };
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param {string} blobName
   * @param {ContainerDeleteBlobOptions} [options] Options to Blob Delete operation.
   * @returns {Promise<BlobDeleteResponse>} Block blob deletion response data.
   * @memberof ContainerClient
   */
  public async deleteBlob(
    blobName: string,
    options: ContainerDeleteBlobOptions = {}
  ): Promise<BlobDeleteResponse> {
    const { span, spanOptions } = createSpan("ContainerClient-deleteBlob", options.tracingOptions);
    try {
      let blobClient = this.getBlobClient(blobName);
      if (options.versionId) {
        blobClient = blobClient.withVersion(options.versionId);
      }
      return await blobClient.delete({
        ...options,
        tracingOptions: { ...options!.tracingOptions, spanOptions }
      });
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * listBlobFlatSegment returns a single segment of blobs starting from the
   * specified Marker. Use an empty Marker to start enumeration from the beginning.
   * After getting a segment, process it, and then call listBlobsFlatSegment again
   * (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
   * @param {ContainerListBlobsSegmentOptions} [options] Options to Container List Blob Flat Segment operation.
   * @returns {Promise<ContainerListBlobFlatSegmentResponse>}
   * @memberof ContainerClient
   */
  private async listBlobFlatSegment(
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): Promise<ContainerListBlobFlatSegmentResponse> {
    const { span, spanOptions } = createSpan(
      "ContainerClient-listBlobFlatSegment",
      options.tracingOptions
    );
    try {
      const response = await this.containerContext.listBlobFlatSegment({
        marker,
        ...options,
        spanOptions
      });
      const wrappedResponse: ContainerListBlobFlatSegmentResponse = {
        ...response,
        _response: response._response, // _response is made non-enumerable
        segment: {
          ...response.segment,
          blobItems: response.segment.blobItems.map((blobItemInteral) => {
            const blobItem: BlobItem = {
              ...blobItemInteral,
              tags: toTags(blobItemInteral.blobTags),
              objectReplicationSourceProperties: parseObjectReplicationRecord(
                blobItemInteral.objectReplicationMetadata
              )
            };
            return blobItem;
          })
        }
      };
      return wrappedResponse;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * listBlobHierarchySegment returns a single segment of blobs starting from
   * the specified Marker. Use an empty Marker to start enumeration from the
   * beginning. After getting a segment, process it, and then call listBlobsHierarchicalSegment
   * again (passing the the previously-returned Marker) to get the next segment.
   * @see https://docs.microsoft.com/rest/api/storageservices/list-blobs
   *
   * @param {string} delimiter The character or string used to define the virtual hierarchy
   * @param {string} [marker] A string value that identifies the portion of the list to be returned with the next list operation.
   * @param {ContainerListBlobsSegmentOptions} [options] Options to Container List Blob Hierarchy Segment operation.
   * @returns {Promise<ContainerListBlobHierarchySegmentResponse>}
   * @memberof ContainerClient
   */
  private async listBlobHierarchySegment(
    delimiter: string,
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): Promise<ContainerListBlobHierarchySegmentResponse> {
    const { span, spanOptions } = createSpan(
      "ContainerClient-listBlobHierarchySegment",
      options.tracingOptions
    );
    try {
      const response = await this.containerContext.listBlobHierarchySegment(delimiter, {
        marker,
        ...options,
        spanOptions
      });
      const wrappedResponse: ContainerListBlobHierarchySegmentResponse = {
        ...response,
        _response: response._response, // _response is made non-enumerable
        segment: {
          ...response.segment,
          blobItems: response.segment.blobItems.map((blobItemInteral) => {
            const blobItem: BlobItem = {
              ...blobItemInteral,
              tags: toTags(blobItemInteral.blobTags),
              objectReplicationSourceProperties: parseObjectReplicationRecord(
                blobItemInteral.objectReplicationMetadata
              )
            };
            return blobItem;
          })
        }
      };
      return wrappedResponse;
    } catch (e) {
      span.setStatus({
        code: CanonicalCode.UNKNOWN,
        message: e.message
      });
      throw e;
    } finally {
      span.end();
    }
  }

  /**
   * Returns an AsyncIterableIterator for ContainerListBlobFlatSegmentResponse
   *
   * @private
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
   * @returns {AsyncIterableIterator<ContainerListBlobFlatSegmentResponse>}
   * @memberof ContainerClient
   */
  private async *listSegments(
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<ContainerListBlobFlatSegmentResponse> {
    let listBlobsFlatSegmentResponse;
    if (!!marker || marker === undefined) {
      do {
        listBlobsFlatSegmentResponse = await this.listBlobFlatSegment(marker, options);
        marker = listBlobsFlatSegmentResponse.continuationToken;
        yield await listBlobsFlatSegmentResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator of {@link BlobItem} objects
   *
   * @private
   * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
   * @returns {AsyncIterableIterator<BlobItem>}
   * @memberof ContainerClient
   */
  private async *listItems(
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<BlobItem> {
    let marker: string | undefined;
    for await (const listBlobsFlatSegmentResponse of this.listSegments(marker, options)) {
      yield* listBlobsFlatSegmentResponse.segment.blobItems;
    }
  }

  /**
   * Returns an async iterable iterator to list all the blobs
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the blobs in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * // Get the containerClient before you run these snippets,
   * // Can be obtained from `blobServiceClient.getContainerClient("<your-container-name>");`
   * let i = 1;
   * for await (const blob of containerClient.listBlobsFlat()) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let i = 1;
   * let iter = containerClient.listBlobsFlat();
   * let blobItem = await iter.next();
   * while (!blobItem.done) {
   *   console.log(`Blob ${i++}: ${blobItem.value.name}`);
   *   blobItem = await iter.next();
   * }
   * ```
   *
   * Example using `byPage()`:
   *
   * ```js
   * // passing optional maxPageSize in the page settings
   * let i = 1;
   * for await (const response of containerClient.listBlobsFlat().byPage({ maxPageSize: 20 })) {
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`Blob ${i++}: ${blob.name}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a marker:
   *
   * ```js
   * let i = 1;
   * let iterator = containerClient.listBlobsFlat().byPage({ maxPageSize: 2 });
   * let response = (await iterator.next()).value;
   *
   * // Prints 2 blob names
   * for (const blob of response.segment.blobItems) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   *
   * // Gets next marker
   * let marker = response.continuationToken;
   *
   * // Passing next marker as continuationToken
   *
   * iterator = containerClient.listBlobsFlat().byPage({ continuationToken: marker, maxPageSize: 10 });
   * response = (await iterator.next()).value;
   *
   * // Prints 10 blob names
   * for (const blob of response.segment.blobItems) {
   *   console.log(`Blob ${i++}: ${blob.name}`);
   * }
   * ```
   *
   * @param {ContainerListBlobsOptions} [options={}] Options to list blobs.
   * @returns {PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse>} An asyncIterableIterator that supports paging.
   * @memberof ContainerClient
   */
  public listBlobsFlat(
    options: ContainerListBlobsOptions = {}
  ): PagedAsyncIterableIterator<BlobItem, ContainerListBlobFlatSegmentResponse> {
    const include: ListBlobsIncludeItem[] = [];
    if (options.includeCopy) {
      include.push("copy");
    }
    if (options.includeDeleted) {
      include.push("deleted");
    }
    if (options.includeMetadata) {
      include.push("metadata");
    }
    if (options.includeSnapshots) {
      include.push("snapshots");
    }
    if (options.includeVersions) {
      include.push("versions");
    }
    if (options.includeUncommitedBlobs) {
      include.push("uncommittedblobs");
    }
    if (options.includeTags) {
      include.push("tags");
    }
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    const updatedOptions: ContainerListBlobsSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {})
    };

    // AsyncIterableIterator to iterate over blobs
    const iter = this.listItems(updatedOptions);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listSegments(settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...updatedOptions
        });
      }
    };
  }

  /**
   * Returns an AsyncIterableIterator for ContainerListBlobHierarchySegmentResponse
   *
   * @private
   * @param {string} delimiter The character or string used to define the virtual hierarchy
   * @param {string} [marker] A string value that identifies the portion of
   *                          the list of blobs to be returned with the next listing operation. The
   *                          operation returns the ContinuationToken value within the response body if the
   *                          listing operation did not return all blobs remaining to be listed
   *                          with the current page. The ContinuationToken value can be used as the value for
   *                          the marker parameter in a subsequent call to request the next page of list
   *                          items. The marker value is opaque to the client.
   * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
   * @returns {AsyncIterableIterator<ContainerListBlobHierarchySegmentResponse>}
   * @memberof ContainerClient
   */
  private async *listHierarchySegments(
    delimiter: string,
    marker?: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<ContainerListBlobHierarchySegmentResponse> {
    let listBlobsHierarchySegmentResponse;
    if (!!marker || marker === undefined) {
      do {
        listBlobsHierarchySegmentResponse = await this.listBlobHierarchySegment(
          delimiter,
          marker,
          options
        );
        marker = listBlobsHierarchySegmentResponse.continuationToken;
        yield await listBlobsHierarchySegmentResponse;
      } while (marker);
    }
  }

  /**
   * Returns an AsyncIterableIterator for {@link BlobPrefix} and {@link BlobItem} objects.
   *
   * @private
   * @param {string} delimiter The character or string used to define the virtual hierarchy
   * @param {ContainerListBlobsSegmentOptions} [options] Options to list blobs operation.
   * @returns {AsyncIterableIterator<{ kind: "prefix" } & BlobPrefix | { kind: "blob" } & BlobItem>}
   * @memberof ContainerClient
   */
  private async *listItemsByHierarchy(
    delimiter: string,
    options: ContainerListBlobsSegmentOptions = {}
  ): AsyncIterableIterator<({ kind: "prefix" } & BlobPrefix) | ({ kind: "blob" } & BlobItem)> {
    let marker: string | undefined;
    for await (const listBlobsHierarchySegmentResponse of this.listHierarchySegments(
      delimiter,
      marker,
      options
    )) {
      const segment = listBlobsHierarchySegmentResponse.segment;
      if (segment.blobPrefixes) {
        for (const prefix of segment.blobPrefixes) {
          yield { kind: "prefix", ...prefix };
        }
      }
      for (const blob of segment.blobItems) {
        yield { kind: "blob", ...blob };
      }
    }
  }

  /**
   * Returns an async iterable iterator to list all the blobs by hierarchy.
   * under the specified account.
   *
   * .byPage() returns an async iterable iterator to list the blobs by hierarchy in pages.
   *
   * Example using `for await` syntax:
   *
   * ```js
   * for await (const item of containerClient.listBlobsByHierarchy("/")) {
   *   if (item.kind === "prefix") {
   *     console.log(`\tBlobPrefix: ${item.name}`);
   *   } else {
   *     console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
   *   }
   * }
   * ```
   *
   * Example using `iter.next()`:
   *
   * ```js
   * let iter = containerClient.listBlobsByHierarchy("/", { prefix: "prefix1/" });
   * let entity = await iter.next();
   * while (!entity.done) {
   *   let item = entity.value;
   *   if (item.kind === "prefix") {
   *     console.log(`\tBlobPrefix: ${item.name}`);
   *   } else {
   *     console.log(`\tBlobItem: name - ${item.name}, last modified - ${item.properties.lastModified}`);
   *   }
   *   entity = await iter.next();
   * }
   * ```js
   *
   * Example using `byPage()`:
   *
   * ```js
   * console.log("Listing blobs by hierarchy by page");
   * for await (const response of containerClient.listBlobsByHierarchy("/").byPage()) {
   *   const segment = response.segment;
   *   if (segment.blobPrefixes) {
   *     for (const prefix of segment.blobPrefixes) {
   *       console.log(`\tBlobPrefix: ${prefix.name}`);
   *     }
   *   }
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`);
   *   }
   * }
   * ```
   *
   * Example using paging with a max page size:
   *
   * ```js
   * console.log("Listing blobs by hierarchy by page, specifying a prefix and a max page size");
   *
   * let i = 1;
   * for await (const response of containerClient.listBlobsByHierarchy("/", { prefix: "prefix2/sub1/"}).byPage({ maxPageSize: 2 })) {
   *   console.log(`Page ${i++}`);
   *   const segment = response.segment;
   *
   *   if (segment.blobPrefixes) {
   *     for (const prefix of segment.blobPrefixes) {
   *       console.log(`\tBlobPrefix: ${prefix.name}`);
   *     }
   *   }
   *
   *   for (const blob of response.segment.blobItems) {
   *     console.log(`\tBlobItem: name - ${blob.name}, last modified - ${blob.properties.lastModified}`);
   *   }
   * }
   * ```
   *
   * @param {string} delimiter The character or string used to define the virtual hierarchy
   * @param {ContainerListBlobsOptions} [options={}] Options to list blobs operation.
   * @returns {(PagedAsyncIterableIterator<
   *   { kind: "prefix" } & BlobPrefix | { kind: "blob" } & BlobItem,
   *     ContainerListBlobHierarchySegmentResponse
   *   >)}
   * @memberof ContainerClient
   */
  public listBlobsByHierarchy(
    delimiter: string,
    options: ContainerListBlobsOptions = {}
  ): PagedAsyncIterableIterator<
    ({ kind: "prefix" } & BlobPrefix) | ({ kind: "blob" } & BlobItem),
    ContainerListBlobHierarchySegmentResponse
  > {
    const include: ListBlobsIncludeItem[] = [];
    if (options.includeCopy) {
      include.push("copy");
    }
    if (options.includeDeleted) {
      include.push("deleted");
    }
    if (options.includeMetadata) {
      include.push("metadata");
    }
    if (options.includeSnapshots) {
      include.push("snapshots");
    }
    if (options.includeVersions) {
      include.push("versions");
    }
    if (options.includeUncommitedBlobs) {
      include.push("uncommittedblobs");
    }
    if (options.includeTags) {
      include.push("tags");
    }
    if (options.prefix === "") {
      options.prefix = undefined;
    }

    const updatedOptions: ContainerListBlobsSegmentOptions = {
      ...options,
      ...(include.length > 0 ? { include: include } : {})
    };
    // AsyncIterableIterator to iterate over blob prefixes and blobs
    const iter = this.listItemsByHierarchy(delimiter, updatedOptions);
    return {
      /**
       * @member {Promise} [next] The next method, part of the iteration protocol
       */
      async next() {
        return iter.next();
      },
      /**
       * @member {Symbol} [asyncIterator] The connection to the async iterator, part of the iteration protocol
       */
      [Symbol.asyncIterator]() {
        return this;
      },
      /**
       * @member {Function} [byPage] Return an AsyncIterableIterator that works a page at a time
       */
      byPage: (settings: PageSettings = {}) => {
        return this.listHierarchySegments(delimiter, settings.continuationToken, {
          maxPageSize: settings.maxPageSize,
          ...updatedOptions
        });
      }
    };
  }

  private getContainerNameFromUrl(): string {
    let containerName;
    try {
      //  URL may look like the following
      // "https://myaccount.blob.core.windows.net/mycontainer?sasString";
      // "https://myaccount.blob.core.windows.net/mycontainer";
      // IPv4/IPv6 address hosts, Endpoints - `http://127.0.0.1:10000/devstoreaccount1/containername`
      // http://localhost:10001/devstoreaccount1/containername

      const parsedUrl = URLBuilder.parse(this.url);

      if (parsedUrl.getHost()!.split(".")[1] === "blob") {
        // "https://myaccount.blob.core.windows.net/containername".
        // "https://customdomain.com/containername".
        // .getPath() -> /containername
        containerName = parsedUrl.getPath()!.split("/")[1];
      } else if (isIpEndpointStyle(parsedUrl)) {
        // IPv4/IPv6 address hosts... Example - http://192.0.0.10:10001/devstoreaccount1/containername
        // Single word domain without a [dot] in the endpoint... Example - http://localhost:10001/devstoreaccount1/containername
        // .getPath() -> /devstoreaccount1/containername
        containerName = parsedUrl.getPath()!.split("/")[2];
      } else {
        // "https://customdomain.com/containername".
        // .getPath() -> /containername
        containerName = parsedUrl.getPath()!.split("/")[1];
      }

      // decode the encoded containerName - to get all the special characters that might be present in it
      containerName = decodeURIComponent(containerName);

      if (!containerName) {
        throw new Error("Provided containerName is invalid.");
      }

      return containerName;
    } catch (error) {
      throw new Error("Unable to extract containerName with provided information.");
    }
  }
}
