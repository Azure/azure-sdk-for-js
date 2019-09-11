// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  isNode,
  TransferProgressEvent,
  TokenCredential,
  isTokenCredential
} from "@azure/core-http";

import * as Models from "./generated/src/models";
import { AbortSignalLike } from "@azure/abort-controller";
import { BlobDownloadResponse } from "./BlobDownloadResponse";
import { Blob } from "./generated/src/operations";
import { rangeToString } from "./Range";
import {
  BlobAccessConditions,
  Metadata,
  ensureCpkIfSpecified,
  BlockBlobTier,
  PremiumPageBlobTier,
  toAccessTier
} from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import {
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  URLConstants,
  DEFAULT_BLOB_DOWNLOAD_BLOCK_BYTES
} from "./utils/constants";
import {
  setURLParameter,
  extractConnectionStringParts,
  readStreamToLocalFile
} from "./utils/utils.common";
import { AppendBlobClient, StorageClient } from "./internal";
import { BlockBlobClient } from "./internal";
import { PageBlobClient } from "./internal";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { Batch } from "./utils/Batch";
import { streamToBuffer } from "./utils/utils.node";
import { LeaseClient } from "./LeaseClient";

/**
 * Options to configure Blob - Download operation.
 *
 * @export
 * @interface BlobDownloadOptions
 */
export interface BlobDownloadOptions {
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
   * @type {BlobAccessConditions}
   * @memberof BlobDownloadOptions
   */
  blobAccessConditions?: BlobAccessConditions;
  /**
   * Call back to receive events on the progress of download operation.
   *
   * @memberof BlobDownloadOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileClient.download() request will be made
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
   * @type {Models.CpkInfo}
   * @memberof BlobDownloadOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * Options to configure Blob - Get Properties operation.
 *
 * @export
 * @interface BlobGetPropertiesOptions
 */
export interface BlobGetPropertiesOptions {
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
   * @type {BlobAccessConditions}
   * @memberof BlobGetPropertiesOptions
   */
  blobAccessConditions?: BlobAccessConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {Models.CpkInfo}
   * @memberof BlobGetPropertiesOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * Options to configure the Blob - Delete operation.
 *
 * @export
 * @interface BlobDeleteOptions
 */
export interface BlobDeleteOptions {
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
   * @type {BlobAccessConditions}
   * @memberof BlobDeleteOptions
   */
  blobAccessConditions?: BlobAccessConditions;
  /**
   * Specifies options to delete blobs that have associated snapshots.
   * - `include`: Delete the base blob and all of its snapshots.
   * - `only`: Delete only the blob's snapshots and not the blob itself.
   *
   * @type {Models.DeleteSnapshotsOptionType}
   * @memberof BlobDeleteOptions
   */
  deleteSnapshots?: Models.DeleteSnapshotsOptionType;
  /**
   * Customer Provided Key Info.
   *
   * @type {Models.CpkInfo}
   * @memberof BlobDeleteOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * Options to confgiure Blob - Undelete operation.
 *
 * @export
 * @interface BlobUndeleteOptions
 */
export interface BlobUndeleteOptions {
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
   * @type {Models.CpkInfo}
   * @memberof BlobUndeleteOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * Options to configure Blob - Set Http Headers operation.
 *
 * @export
 * @interface BlobSetHTTPHeadersOptions
 */
export interface BlobSetHTTPHeadersOptions {
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
   * @type {BlobAccessConditions}
   * @memberof BlobSetHTTPHeadersOptions
   */
  blobAccessConditions?: BlobAccessConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {Models.CpkInfo}
   * @memberof BlobSetHTTPHeadersOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * Options to configure Blob - Set Metadata operation.
 *
 * @export
 * @interface BlobSetMetadataOptions
 */
export interface BlobSetMetadataOptions {
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
   * @type {BlobAccessConditions}
   * @memberof BlobSetMetadataOptions
   */
  blobAccessConditions?: BlobAccessConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {Models.CpkInfo}
   * @memberof BlobSetMetadataOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * Options to configure Blob - Acquire Lease operation.
 *
 * @export
 * @interface BlobAcquireLeaseOptions
 */
export interface BlobAcquireLeaseOptions {
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
   * @type {Models.ModifiedAccessConditions}
   * @memberof BlobAcquireLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Release Lease operation.
 *
 * @export
 * @interface BlobReleaseLeaseOptions
 */
export interface BlobReleaseLeaseOptions {
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
   * @type {Models.ModifiedAccessConditions}
   * @memberof BlobReleaseLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Renew Lease operation.
 *
 * @export
 * @interface BlobRenewLeaseOptions
 */
export interface BlobRenewLeaseOptions {
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
   * @type {Models.ModifiedAccessConditions}
   * @memberof BlobRenewLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Change Lease operation.
 *
 * @export
 * @interface BlobChangeLeaseOptions
 */
export interface BlobChangeLeaseOptions {
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
   * @type {Models.ModifiedAccessConditions}
   * @memberof BlobChangeLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Break Lease operation.
 *
 * @export
 * @interface BlobBreakLeaseOptions
 */
export interface BlobBreakLeaseOptions {
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
   * @type {Models.ModifiedAccessConditions}
   * @memberof BlobBreakLeaseOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Create Snapshot operation.
 *
 * @export
 * @interface BlobCreateSnapshotOptions
 */
export interface BlobCreateSnapshotOptions {
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
   * @type {BlobAccessConditions}
   * @memberof BlobCreateSnapshotOptions
   */
  blobAccessConditions?: BlobAccessConditions;
  /**
   * Customer Provided Key Info.
   *
   * @type {Models.CpkInfo}
   * @memberof BlobCreateSnapshotOptions
   */
  customerProvidedKey?: Models.CpkInfo;
}

/**
 * Options to configure Blob - Start Copy from URL operation.
 *
 * @export
 * @interface BlobStartCopyFromURLOptions
 */
export interface BlobStartCopyFromURLOptions {
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
   * @type {BlobAccessConditions}
   * @memberof BlobStartCopyFromURLOptions
   */
  blobAccessConditions?: BlobAccessConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof BlobStartCopyFromURLOptions
   */
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
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
   * @type {Models.RehydratePriority}
   * @memberof BlobStartCopyFromURLOptions
   */
  rehydratePriority?: Models.RehydratePriority;
}

/**
 * Options to configure Blob - Abort Copy from URL operation.
 *
 * @export
 * @interface BlobAbortCopyFromURLOptions
 */
export interface BlobAbortCopyFromURLOptions {
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
   * @type {Models.LeaseAccessConditions}
   * @memberof BlobAbortCopyFromURLOptions
   */
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

/**
 * Options to configure Blob - synchronous Copy From URL operation.
 *
 * @export
 * @interface BlobSyncCopyFromURLOptions
 */
export interface BlobSyncCopyFromURLOptions {
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
   * @type {BlobAccessConditions}
   * @memberof BlobSyncCopyFromURLOptions
   */
  blobAccessConditions?: BlobAccessConditions;
  /**
   * Conditions to meet for the source Azure Blob/File when copying from a URL to the blob.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof BlobSyncCopyFromURLOptions
   */
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * Options to configure Blob - Set Tier operation.
 *
 * @export
 * @interface BlobSetTierOptions
 */
export interface BlobSetTierOptions {
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
   * @type {Models.LeaseAccessConditions}
   * @memberof BlobSetTierOptions
   */
  leaseAccessConditions?: Models.LeaseAccessConditions;
  /**
   * Rehydrate Priority - possible values include 'High', 'Standard'.
   * More Details - https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-rehydration#rehydrate-an-archived-blob-to-an-online-tier
   *
   * @type {Models.RehydratePriority}
   * @memberof BlobSetTierOptions
   */
  rehydratePriority?: Models.RehydratePriority;
}

/**
 * Option interface for BlobClient.downloadToBuffer().
 *
 * @export
 * @interface DownloadFromBlobOptions
 */
export interface DownloadFromBlobOptions {
  /**
   * An implementation of the `AbortSignalLike` interface to signal the request to cancel the operation.
   * For example, use the &commat;azure/abort-controller to create an `AbortSignal`.
   *
   * @type {AbortSignalLike}
   * @memberof DownloadFromBlobOptions
   */
  abortSignal?: AbortSignalLike;

  /**
   * blockSize is the data every request trying to download.
   * Must be >= 0, if set to 0 or undefined, blockSize will automatically calculated according
   * to the blob size.
   *
   * @type {number}
   * @memberof DownloadFromBlobOptions
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
   * @memberof DownloadFromAzureFileOptions
   */
  maxRetryRequestsPerBlock?: number;

  /**
   * Progress updater.
   *
   * @memberof DownloadFromBlobOptions
   */
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Access conditions headers.
   *
   * @type {BlobAccessConditions}
   * @memberof DownloadFromBlobOptions
   */
  blobAccessConditions?: BlobAccessConditions;

  /**
   * Concurrency of parallel download.
   *
   * @type {number}
   * @memberof DownloadFromBlobOptions
   */
  parallelism?: number;
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
  private blobContext: Blob;

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
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: NewPipelineOptions
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
   * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
   *                                                  or a TokenCredential from @azure/identity. If not specified,
   *                                                  AnonymousCredential is used.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof BlobClient
   */
  constructor(
    url: string,
    credential?: SharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: NewPipelineOptions
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
      | SharedKeyCredential
      | AnonymousCredential
      | TokenCredential
      | Pipeline,
    blobNameOrOptions?: string | NewPipelineOptions,
    options?: NewPipelineOptions
  ) {
    let pipeline: Pipeline;
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      (isNode && credentialOrPipelineOrContainerName instanceof SharedKeyCredential) ||
      credentialOrPipelineOrContainerName instanceof AnonymousCredential ||
      isTokenCredential(credentialOrPipelineOrContainerName)
    ) {
      options = blobNameOrOptions as NewPipelineOptions;
      pipeline = newPipeline(credentialOrPipelineOrContainerName, options);
    } else if (
      !credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName !== "string"
    ) {
      // The second parameter is undefined. Use anonymous credential.
      pipeline = newPipeline(new AnonymousCredential(), options);
    } else if (
      credentialOrPipelineOrContainerName &&
      typeof credentialOrPipelineOrContainerName === "string" &&
      blobNameOrOptions &&
      typeof blobNameOrOptions === "string"
    ) {
      const containerName = credentialOrPipelineOrContainerName;
      const blobName = blobNameOrOptions;

      const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
      if (extractedCreds.kind === "AccountConnString") {
        if (isNode) {
          const sharedKeyCredential = new SharedKeyCredential(
            extractedCreds.accountName,
            extractedCreds.accountKey
          );
          urlOrConnectionString = extractedCreds.url + "/" + containerName + "/" + blobName;
          pipeline = newPipeline(sharedKeyCredential, options);
        } else {
          throw new Error("Account connection string is only supported in Node.js environment");
        }
      } else if (extractedCreds.kind === "SASConnString") {
        urlOrConnectionString =
          extractedCreds.url +
          "/" +
          containerName +
          "/" +
          blobName +
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
    super(urlOrConnectionString, pipeline);
    this.blobContext = new Blob(this.storageClientContext);
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
   * @returns {Promise<Models.BlobDownloadResponse>}
   * @memberof BlobClient
   */
  public async download(
    offset: number = 0,
    count?: number,
    options: BlobDownloadOptions = {}
  ): Promise<Models.BlobDownloadResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.blobAccessConditions.modifiedAccessConditions =
      options.blobAccessConditions.modifiedAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    const res = await this.blobContext.download({
      abortSignal: options.abortSignal,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
      onDownloadProgress: isNode ? undefined : options.progress,
      range: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
      rangeGetContentMD5: options.rangeGetContentMD5,
      rangeGetContentCRC64: options.rangeGetContentCrc64,
      snapshot: options.snapshot,
      cpkInfo: options.customerProvidedKey
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

    if (!res.eTag) {
      throw new RangeError(`File download response doesn't contain valid etag header`);
    }

    return new BlobDownloadResponse(
      res,
      async (start: number): Promise<NodeJS.ReadableStream> => {
        const updatedOptions: Models.BlobDownloadOptionalParams = {
          leaseAccessConditions: options.blobAccessConditions!.leaseAccessConditions,
          modifiedAccessConditions: {
            ifMatch: options.blobAccessConditions!.modifiedAccessConditions!.ifMatch || res.eTag,
            ifModifiedSince: options.blobAccessConditions!.modifiedAccessConditions!
              .ifModifiedSince,
            ifNoneMatch: options.blobAccessConditions!.modifiedAccessConditions!.ifNoneMatch,
            ifUnmodifiedSince: options.blobAccessConditions!.modifiedAccessConditions!
              .ifUnmodifiedSince
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
        progress: options.progress
      }
    );
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the blob. It does not return the content of the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-properties
   *
   * @param {BlobGetPropertiesOptions} [options] Optional options to Get Properties operation.
   * @returns {Promise<Models.BlobGetPropertiesResponse>}
   * @memberof BlobClient
   */
  public async getProperties(
    options: BlobGetPropertiesOptions = {}
  ): Promise<Models.BlobGetPropertiesResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return this.blobContext.getProperties({
      abortSignal: options.abortSignal,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param {BlobDeleteOptions} [options] Optional options to Blob Delete operation.
   * @returns {Promise<Models.BlobDeleteResponse>}
   * @memberof BlobClient
   */
  public async delete(options: BlobDeleteOptions = {}): Promise<Models.BlobDeleteResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    return this.blobContext.deleteMethod({
      abortSignal: options.abortSignal,
      deleteSnapshots: options.deleteSnapshots,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Restores the contents and metadata of soft deleted blob and any associated
   * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
   * or later.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/undelete-blob
   *
   * @param {BlobUndeleteOptions} [options] Optional options to Blob Undelete operation.
   * @returns {Promise<Models.BlobUndeleteResponse>}
   * @memberof BlobClient
   */
  public async undelete(options: BlobUndeleteOptions = {}): Promise<Models.BlobUndeleteResponse> {
    return this.blobContext.undelete({
      abortSignal: options.abortSignal
    });
  }

  /**
   * Sets system properties on the blob.
   *
   * If no value provided, or no value provided for the specificed blob HTTP headers,
   * these blob HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param {Models.BlobHTTPHeaders} [blobHTTPHeaders] If no value provided, or no value provided for
   *                                                   the specificed blob HTTP headers, these blob HTTP
   *                                                   headers without a value will be cleared.
   * @param {BlobSetHTTPHeadersOptions} [options] Optional options to Blob Set HTTP Headers operation.
   * @returns {Promise<Models.BlobSetHTTPHeadersResponse>}
   * @memberof BlobClient
   */
  public async setHTTPHeaders(
    blobHTTPHeaders?: Models.BlobHTTPHeaders,
    options: BlobSetHTTPHeadersOptions = {}
  ): Promise<Models.BlobSetHTTPHeadersResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return this.blobContext.setHTTPHeaders({
      abortSignal: options.abortSignal,
      blobHTTPHeaders,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
      cpkInfo: options.customerProvidedKey
    });
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
   * @returns {Promise<Models.BlobSetMetadataResponse>}
   * @memberof BlobClient
   */
  public async setMetadata(
    metadata?: Metadata,
    options: BlobSetMetadataOptions = {}
  ): Promise<Models.BlobSetMetadataResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return this.blobContext.setMetadata({
      abortSignal: options.abortSignal,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * Get a LeaseClient that manages leases on the blob.
   *
   * @param {string} [proposeLeaseId] Initial proposed lease Id.
   * @returns {LeaseClient} A new LeaseClient object for managing leases on the blob.
   * @memberof BlobClient
   */
  public getLeaseClient(proposeLeaseId?: string): LeaseClient {
    return new LeaseClient(this, proposeLeaseId);
  }

  /**
   * Creates a read-only snapshot of a blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/snapshot-blob
   *
   * @param {BlobCreateSnapshotOptions} [options] Optional options to the Blob Create Snapshot operation.
   * @returns {Promise<Models.BlobCreateSnapshotResponse>}
   * @memberof BlobClient
   */
  public async createSnapshot(
    options: BlobCreateSnapshotOptions = {}
  ): Promise<Models.BlobCreateSnapshotResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return this.blobContext.createSnapshot({
      abortSignal: options.abortSignal,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
      cpkInfo: options.customerProvidedKey
    });
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
   * @param {string} copySource url to the ource Azure Blob/File.
   * @param {BlobStartCopyFromURLOptions} [options] Optional options to the Blob Start Copy From URL operation.
   * @returns {Promise<Models.BlobStartCopyFromURLResponse>}
   * @memberof BlobClient
   */
  public async startCopyFromURL(
    copySource: string,
    options: BlobStartCopyFromURLOptions = {}
  ): Promise<Models.BlobStartCopyFromURLResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};

    return this.blobContext.startCopyFromURL(copySource, {
      abortSignal: options.abortSignal,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
      sourceModifiedAccessConditions: {
        sourceIfMatch: options.sourceModifiedAccessConditions.ifMatch,
        sourceIfModifiedSince: options.sourceModifiedAccessConditions.ifModifiedSince,
        sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
        sourceIfUnmodifiedSince: options.sourceModifiedAccessConditions.ifUnmodifiedSince
      },
      rehydratePriority: options.rehydratePriority,
      tier: toAccessTier(options.tier)
    });
  }

  /**
   * Aborts a pending asynchronous Copy Blob operation, and leaves a destination blob with zero
   * length and full metadata. Version 2012-02-12 and newer.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-blob
   *
   * @param {string} copyId Id of the Copy From URL operation.
   * @param {BlobAbortCopyFromURLOptions} [options] Optional options to the Blob Abort Copy From URL operation.
   * @returns {Promise<Models.BlobAbortCopyFromURLResponse>}
   * @memberof BlobClient
   */
  public async abortCopyFromURL(
    copyId: string,
    options: BlobAbortCopyFromURLOptions = {}
  ): Promise<Models.BlobAbortCopyFromURLResponse> {
    return this.blobContext.abortCopyFromURL(copyId, {
      abortSignal: options.abortSignal,
      leaseAccessConditions: options.leaseAccessConditions
    });
  }

  /**
   * The synchronous Copy From URL operation copies a blob or an internet resource to a new blob. It will not
   * return a response until the copy is complete.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob-from-url
   *
   * @param {string} copySource The source URL to copy from, Shared Access Signature(SAS) maybe needed for authentication
   * @param {BlobSyncCopyFromURLOptions} [options={}]
   * @returns {Promise<Models.BlobCopyFromURLResponse>}
   * @memberof BlobURL
   */
  public async syncCopyFromURL(
    copySource: string,
    options: BlobSyncCopyFromURLOptions = {}
  ): Promise<Models.BlobCopyFromURLResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};

    return this.blobContext.copyFromURL(copySource, {
      abortSignal: options.abortSignal,
      metadata: options.metadata,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
      sourceModifiedAccessConditions: {
        sourceIfMatch: options.sourceModifiedAccessConditions.ifMatch,
        sourceIfModifiedSince: options.sourceModifiedAccessConditions.ifModifiedSince,
        sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
        sourceIfUnmodifiedSince: options.sourceModifiedAccessConditions.ifUnmodifiedSince
      }
    });
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
   * @returns {Promise<Models.BlobsSetTierResponse>}
   * @memberof BlobClient
   */
  public async setTier(
    tier: BlockBlobTier | PremiumPageBlobTier | string,
    options: BlobSetTierOptions = {}
  ): Promise<Models.BlobSetTierResponse> {
    return await this.blobContext.setTier(toAccessTier(tier)!, {
      abortSignal: options.abortSignal,
      leaseAccessConditions: options.leaseAccessConditions,
      rehydratePriority: options.rehydratePriority
    });
  }

  // High level function

  /**
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Downloads an Azure Blob in parallel to a buffer.
   * Offset and count are optional, pass 0 for both to download the entire blob.
   *
   * @export
   * @param {Buffer} buffer Buffer to be fill, must have length larger than count
   * @param {number} offset From which position of the block blob to download(in bytes)
   * @param {number} [count] How much data(in bytes) to be downloaded. Will download to the end when passing undefined
   * @param {DownloadFromBlobOptions} [options] DownloadFromBlobOptions
   * @returns {Promise<void>}
   */
  public async downloadToBuffer(
    buffer: Buffer,
    offset: number,
    count?: number,
    options: DownloadFromBlobOptions = {}
  ): Promise<void> {
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

    if (!options.blobAccessConditions) {
      options.blobAccessConditions = {};
    }

    // Customer doesn't specify length, get it
    if (!count) {
      const response = await this.getProperties(options);
      count = response.contentLength! - offset;
      if (count < 0) {
        throw new RangeError(
          `offset ${offset} shouldn't be larger than blob size ${response.contentLength!}`
        );
      }
    }

    if (buffer.length < count) {
      throw new RangeError(
        `The buffer's size should be equal to or larger than the request count of bytes: ${count}`
      );
    }

    let transferProgress: number = 0;
    const batch = new Batch(options.parallelism);
    for (let off = offset; off < offset + count; off = off + options.blockSize) {
      batch.addOperation(async () => {
        // Exclusive chunk end position
        let chunkEnd = offset + count!;
        if (off + options.blockSize! < chunkEnd) {
          chunkEnd = off + options.blockSize!;
        }
        const response = await this.download(off, chunkEnd - off, {
          abortSignal: options.abortSignal,
          blobAccessConditions: options.blobAccessConditions,
          maxRetryRequests: options.maxRetryRequestsPerBlock
        });
        const stream = response.readableStreamBody!;
        await streamToBuffer(stream, buffer, off - offset, chunkEnd - offset);
        // Update progress after block is downloaded, in case of block trying
        // Could provide finer grained progress updating inside HTTP requests,
        // only if convenience layer download try is enabled
        transferProgress += chunkEnd - off;
        if (options.progress) {
          options.progress({ loadedBytes: transferProgress });
        }
      });
    }
    await batch.do();
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
   * @returns {Promise<Models.BlobDownloadResponse>} The response data for blob download operation,
   *                                                 but with readableStreamBody set to undefined since its
   *                                                 content is already read and written into a local file
   *                                                 at the specified path.
   * @memberof BlobClient
   */
  public async downloadToFile(
    filePath: string,
    offset: number = 0,
    count?: number,
    options?: BlobDownloadOptions
  ): Promise<Models.BlobDownloadResponse> {
    const response = await this.download(offset, count, options);
    if (response.readableStreamBody) {
      await readStreamToLocalFile(response.readableStreamBody, filePath);
    }

    // The stream is no longer accessible so setting it to undefined.
    (response as any).blobDownloadStream = undefined;
    return response;
  }
}
