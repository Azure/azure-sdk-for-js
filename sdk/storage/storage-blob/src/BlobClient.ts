// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  isNode,
  TransferProgressEvent,
  TokenCredential,
  isTokenCredential,
  getDefaultProxySettings
} from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import {
  BlobDownloadResponseModel,
  CpkInfo,
  DeleteSnapshotsOptionType,
  ModifiedAccessConditions,
  RehydratePriority,
  LeaseAccessConditions,
  BlobDownloadOptionalParams,
  BlobGetPropertiesResponse,
  BlobDeleteResponse,
  BlobUndeleteResponse,
  BlobHTTPHeaders,
  BlobSetHTTPHeadersResponse,
  BlobSetMetadataResponse,
  BlobCreateSnapshotResponse,
  BlobStartCopyFromURLResponse,
  BlobAbortCopyFromURLResponse,
  BlobCopyFromURLResponse,
  BlobSetTierResponse
} from "./generatedModels";
import { AbortSignalLike } from "@azure/abort-controller";
import { BlobDownloadResponse } from "./BlobDownloadResponse";
import { Blob as StorageBlob } from "./generated/src/operations";
import { rangeToString } from "./Range";
import {
  BlobRequestConditions,
  Metadata,
  ensureCpkIfSpecified,
  BlockBlobTier,
  PremiumPageBlobTier,
  toAccessTier
} from "./models";
import { newPipeline, StoragePipelineOptions, Pipeline } from "./Pipeline";
import {
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  URLConstants,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES,
  DevelopmentConnectionString,
  DEFAULT_BLOCK_BUFFER_SIZE_BYTES
} from "./utils/constants";
import {
  setURLParameter,
  extractConnectionStringParts,
  appendToURLPath,
  getValueInConnString
} from "./utils/utils.common";
import { readStreamToLocalFile } from "./utils/utils.node";
import { StorageSharedKeyCredential } from "./credentials/StorageSharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { Batch } from "./utils/Batch";
import { streamToBuffer } from "./utils/utils.node";
import { BlobLeaseClient } from "./BlobLeaseClient";
import { createSpan } from "./utils/tracing";
import { HttpRequestBody } from "@azure/core-http";
import {
  AppendBlobCreateResponse,
  AppendBlobAppendBlockFromUrlResponse,
  AppendBlobAppendBlockResponse
} from "./generatedModels";
import { AppendBlob } from "./generated/src/operations";
import { AppendBlobRequestConditions } from "./models";
import { CommonOptions, StorageClient } from "./StorageClient";
import * as fs from "fs";
import { generateUuid, HttpResponse } from "@azure/core-http";
import {
  BlockBlobUploadHeaders,
  BlockBlobUploadResponse,
  BlockBlobStageBlockResponse,
  BlockBlobStageBlockFromURLResponse,
  BlockBlobCommitBlockListResponse,
  BlockBlobGetBlockListResponse,
  BlockListType
} from "./generatedModels";
import { BlockBlob } from "./generated/src/operations";
import { Range } from "./Range";
import { generateBlockID } from "./utils/utils.common";
import { fsStat } from "./utils/utils.node";
import {
  BLOCK_BLOB_MAX_STAGE_BLOCK_BYTES,
  BLOCK_BLOB_MAX_UPLOAD_BLOB_BYTES,
  BLOCK_BLOB_MAX_BLOCKS
} from "./utils/constants";
import { BufferScheduler } from "./utils/BufferScheduler";
import { Readable } from "stream";
import {
  PageBlobCreateResponse,
  PageBlobUploadPagesResponse,
  PageBlobUploadPagesFromURLResponse,
  PageBlobClearPagesResponse,
  PageBlobResizeResponse,
  SequenceNumberActionType,
  PageBlobUpdateSequenceNumberResponse,
  PageBlobCopyIncrementalResponse
} from "./generatedModels";
import { PageBlob } from "./generated/src/operations";
import { PageBlobRequestConditions } from "./models";
import {
  PageBlobGetPageRangesDiffResponse,
  PageBlobGetPageRangesResponse,
  rangeResponseFromModel
} from "./PageBlobRangeResponse";
import {
  BlobBeginCopyFromUrlPoller,
  BlobBeginCopyFromUrlPollState,
  CopyPollerBlobClient
} from "./pollers/BlobStartCopyFromUrlPoller";
import { PollerLike, PollOperationState } from "@azure/core-lro";

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
}

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
   * @returns {Promise<BlobDownloadResponseModel>}
   * @memberof BlobClient
   *
   * @example
   * ```js
   * // Download and convert a blob to a string (Node.js only)
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
   * @example
   * ```js
   * // Download and convert a blob to a string (Browser only)
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
  ): Promise<BlobDownloadResponseModel> {
    options.conditions = options.conditions || {};
    options.conditions = options.conditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    const { span, spanOptions } = createSpan("BlobClient-download", options.tracingOptions);

    try {
      const res = await this.blobContext.download({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        onDownloadProgress: isNode ? undefined : options.onProgress,
        range: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
        rangeGetContentMD5: options.rangeGetContentMD5,
        rangeGetContentCRC64: options.rangeGetContentCrc64,
        snapshot: options.snapshot,
        cpkInfo: options.customerProvidedKey,
        spanOptions
      });

      // Return browser response immediately
      if (!isNode) {
        return res;
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
        res,
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

          return (await this.blobContext.download({
            abortSignal: options.abortSignal,
            ...updatedOptions
          })).readableStreamBody!;
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
   * Returns true if the Azrue blob resource represented by this client exists; false otherwise.
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
      return this.blobContext.getProperties({
        abortSignal: options.abortSignal,
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
      return this.blobContext.deleteMethod({
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
      return this.blobContext.undelete({
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
   * If no value provided, or no value provided for the specificed blob HTTP headers,
   * these blob HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param {BlobHTTPHeaders} [blobHTTPHeaders] If no value provided, or no value provided for
   *                                                   the specificed blob HTTP headers, these blob HTTP
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
      return this.blobContext.setHTTPHeaders({
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
      return this.blobContext.setMetadata({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        metadata,
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
      return this.blobContext.createSnapshot({
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
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
   * Asynchronously copies a blob to a destination within the storage account.
   * This method returns a long running operation poller that allows you to wait
   * indefinitely until the copy is completed.
   * You can also cancel a copy before it is completed by calling `cancelOperation` on the poller.
   * Note that attempting to cancel a completed copy will result in an error being thrown.
   *
   * In version 2012-02-12 and later, the source for a Copy Blob operation can be
   * a committed blob in any Azure storage account.
   * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
   * an Azure file in any Azure storage account.
   * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
   * operation to copy from another storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob
   *
   * Example usage of automatic polling:
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url');
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example usage of manual polling:
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url');
   * while (!poller.isDone()) {
   *    await poller.poll();
   * }
   * const result = copyPoller.getResult();
   * ```
   *
   * Example usage of progress updates:
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url', {
   *   onProgress(state) {
   *     console.log(`Progress: ${state.copyProgress}`);
   *   }
   * });
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example usage of changing polling interval (default 15 seconds):
   * ```js
   * const copyPoller = await blobClient.beginCopyFromURL('url', {
   *   intervalInMs: 1000 // poll blob every 1 second for copy progress
   * });
   * const result = await copyPoller.pollUntilDone();
   * ```
   *
   * Example usage of copy cancellation:
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
      return this.blobContext.abortCopyFromURL(copyId, {
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
      return this.blobContext.copyFromURL(copySource, {
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
   * @returns {Promise<BlobDownloadResponseModel>} The response data for blob download operation,
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
  ): Promise<BlobDownloadResponseModel> {
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
      // or an emulator URL that starts with the endpoint `http://127.0.0.1:10000/devstoreaccount1`

      let urlWithoutSAS = this.url.split("?")[0]; // removing the sas part of url if present
      urlWithoutSAS = urlWithoutSAS.endsWith("/") ? urlWithoutSAS.slice(0, -1) : urlWithoutSAS; // Slicing off '/' at the end if exists

      // http://127.0.0.1:10000/devstoreaccount1
      const emulatorBlobEndpoint = getValueInConnString(
        DevelopmentConnectionString,
        "BlobEndpoint"
      );

      if (this.url.startsWith(emulatorBlobEndpoint)) {
        // Emulator URL starts with `http://127.0.0.1:10000/devstoreaccount1`
        const partsOfUrl = urlWithoutSAS.match(emulatorBlobEndpoint + "/([^/]*)(/(.*))?");
        containerName = partsOfUrl![1];
        blobName = partsOfUrl![3];
      } else {
        const partsOfUrl = urlWithoutSAS.match("([^/]*)://([^/]*)/([^/]*)(/(.*))?");
        containerName = partsOfUrl![3];
        blobName = partsOfUrl![5];
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
      } else {
        return { blobName, containerName };
      }
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
      return this.blobContext.startCopyFromURL(copySource, {
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
   */
  public async create(options: AppendBlobCreateOptions = {}): Promise<AppendBlobCreateResponse> {
    const { span, spanOptions } = createSpan("AppendBlobClient-create", options.tracingOptions);
    options.conditions = options.conditions || {};
    try {
      ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

      return this.appendBlobContext.create(0, {
        abortSignal: options.abortSignal,
        blobHTTPHeaders: options.blobHTTPHeaders,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
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
   * Commits a new block of data to the end of the existing append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/append-block
   *
   * @param {HttpRequestBody} body Data to be appended.
   * @param {number} contentLength Length of the body in bytes.
   * @param {AppendBlobAppendBlockOptions} [options] Options to the Append Block operation.
   * @returns {Promise<AppendBlobAppendBlockResponse>}
   * @memberof AppendBlobClient
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

      return this.appendBlobContext.appendBlock(body, contentLength, {
        abortSignal: options.abortSignal,
        appendPositionAccessConditions: options.conditions,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        onUploadProgress: options.onProgress,
        transactionalContentMD5: options.transactionalContentMD5,
        transactionalContentCrc64: options.transactionalContentCrc64,
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

      return this.appendBlobContext.appendBlockFromUrl(sourceURL, 0, {
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
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   *
   * @type {BlockBlobTier | string}
   * @memberof BlockBlobUploadOptions
   */
  tier?: BlockBlobTier | string;
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
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   *
   * @type {BlockBlobTier | string}
   * @memberof BlockBlobCommitBlockListOptions
   */
  tier?: BlockBlobTier | string;
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
   * @example
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
      return this.blockBlobContext.upload(body, contentLength, {
        abortSignal: options.abortSignal,
        blobHTTPHeaders: options.blobHTTPHeaders,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.conditions,
        onUploadProgress: options.onProgress,
        cpkInfo: options.customerProvidedKey,
        tier: toAccessTier(options.tier),
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
      return this.blockBlobContext.stageBlock(blockId, contentLength, body, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        onUploadProgress: options.onProgress,
        transactionalContentMD5: options.transactionalContentMD5,
        transactionalContentCrc64: options.transactionalContentCrc64,
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
      return this.blockBlobContext.stageBlockFromURL(blockId, 0, sourceURL, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        sourceContentMD5: options.sourceContentMD5,
        sourceContentCrc64: options.sourceContentCrc64,
        sourceRange: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
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
      return this.blockBlobContext.commitBlockList(
        { latest: blocks },
        {
          abortSignal: options.abortSignal,
          blobHTTPHeaders: options.blobHTTPHeaders,
          leaseAccessConditions: options.conditions,
          metadata: options.metadata,
          modifiedAccessConditions: options.conditions,
          cpkInfo: options.customerProvidedKey,
          tier: toAccessTier(options.tier),
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
      return this.uploadSeekableBlob(
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
        return this.upload(blobFactory(0, size), size, {
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
      return this.uploadResetableStream(
        (offset, count) =>
          fs.createReadStream(filePath, {
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
        return this.upload(() => streamFactory(0), size, {
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
   * Access tier.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-storage-tiers
   *
   * @type {PremiumPageBlobTier | string}
   * @memberof PageBlobCreateOptions
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
   * Conditions to meet when startting copy incremental operation.
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
      return this.pageBlobContext.create(0, size, {
        abortSignal: options.abortSignal,
        blobHTTPHeaders: options.blobHTTPHeaders,
        blobSequenceNumber: options.blobSequenceNumber,
        leaseAccessConditions: options.conditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.conditions,
        cpkInfo: options.customerProvidedKey,
        tier: toAccessTier(options.tier),
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
      return this.pageBlobContext.uploadPages(body, count, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        onUploadProgress: options.onProgress,
        range: rangeToString({ offset, count }),
        sequenceNumberAccessConditions: options.conditions,
        transactionalContentMD5: options.transactionalContentMD5,
        transactionalContentCrc64: options.transactionalContentCrc64,
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
      return this.pageBlobContext.uploadPagesFromURL(
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
      return this.pageBlobContext.clearPages(0, {
        abortSignal: options.abortSignal,
        leaseAccessConditions: options.conditions,
        modifiedAccessConditions: options.conditions,
        range: rangeToString({ offset, count }),
        sequenceNumberAccessConditions: options.conditions,
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
      return this.pageBlobContext
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
   * @param {string} prevSnapshot Timestamp of snapshot to retrive the difference.
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
      return this.pageBlobContext
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
      return this.pageBlobContext.resize(size, {
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
      return this.pageBlobContext.updateSequenceNumber(sequenceNumberAction, {
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
      return this.pageBlobContext.copyIncremental(copySource, {
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
