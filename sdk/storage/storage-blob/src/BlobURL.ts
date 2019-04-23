import { isNode, TransferProgressEvent } from "@azure/ms-rest-js";

import * as Models from "../src/generated/lib/models";
import { Aborter } from "./Aborter";
import { BlobDownloadResponse } from "./BlobDownloadResponse";
import { ContainerURL } from "./ContainerURL";
import { Blob } from "./generated/lib/operations";
import { rangeToString } from "./IRange";
import { IBlobAccessConditions, IMetadata } from "./models";
import { Pipeline } from "./Pipeline";
import { StorageURL } from "./StorageURL";
import {
  DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS,
  URLConstants
} from "./utils/constants";
import { appendToURLPath, setURLParameter } from "./utils/utils.common";
import { CancellationOptions } from './CancellationOptions';

export interface IBlobDownloadOptions {
  snapshot?: string;
  rangeGetContentMD5?: boolean;
  blobAccessConditions?: IBlobAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * Optional. ONLY AVAILABLE IN NODE.JS.
   *
   * How many retries will perform when original body download stream unexpected ends.
   * Above kind of ends will not trigger retry policy defined in a pipeline,
   * because they doesn't emit network errors.
   *
   * With this option, every additional retry means an additional FileURL.download() request will be made
   * from the broken point, until the requested range has been successfully downloaded or maxRetryRequests is reached.
   *
   * Default value is 5, please set a larger value when loading large files in poor network.
   *
   * @type {number}
   * @memberof IBlobDownloadOptions
   */
  maxRetryRequests?: number;
}

export interface IBlobGetPropertiesOptions {
  blobAccessConditions?: IBlobAccessConditions;
}

export interface IBlobDeleteOptions {
  blobAccessConditions?: IBlobAccessConditions;
  deleteSnapshots?: Models.DeleteSnapshotsOptionType;
}

export interface IBlobSetHTTPHeadersOptions {
  blobAccessConditions?: IBlobAccessConditions;
}

export interface IBlobSetMetadataOptions {
  blobAccessConditions?: IBlobAccessConditions;
}

export interface IBlobAcquireLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IBlobReleaseLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IBlobRenewLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IBlobChangeLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IBlobBreakLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IBlobCreateSnapshotOptions {
  metadata?: IMetadata;
  blobAccessConditions?: IBlobAccessConditions;
}

export interface IBlobStartCopyFromURLOptions {
  metadata?: IMetadata;
  blobAccessConditions?: IBlobAccessConditions;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IBlobAbortCopyFromURLOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface IBlobSetTierOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

/**
 * A BlobURL represents a URL to an Azure Storage blob; the blob may be a block blob,
 * append blob, or page blob.
 *
 * @export
 * @class BlobURL
 * @extends {StorageURL}
 */
export class BlobURL extends StorageURL {
  /**
   * Creates a BlobURL object from an ContainerURL object.
   *
   * @static
   * @param {ContainerURL} containerURL A ContainerURL object
   * @param {string} blobName A blob name
   * @returns
   * @memberof BlobURL
   */
  public static fromContainerURL(containerURL: ContainerURL, blobName: string) {
    return new BlobURL(
      appendToURLPath(containerURL.url, encodeURIComponent(blobName)),
      containerURL.pipeline
    );
  }

  /**
   * blobContext provided by protocol layer.
   *
   * @private
   * @type {Blobs}
   * @memberof BlobURL
   */
  private blobContext: Blob;

  /**
   * Creates an instance of BlobURL.
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
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlobURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.blobContext = new Blob(this.storageClientContext);
  }

  /**
   * Creates a new BlobURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {BlobURL}
   * @memberof BlobURL
   */
  public withPipeline(pipeline: Pipeline): BlobURL {
    return new BlobURL(this.url, pipeline);
  }

  /**
   * Creates a new BlobURL object identical to the source but with the specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param {string} snapshot
   * @returns {BlobURL} A new BlobURL object identical to the source but with the specified snapshot timestamp
   * @memberof BlobURL
   */
  public withSnapshot(snapshot: string): BlobURL {
    return new BlobURL(
      setURLParameter(
        this.url,
        URLConstants.Parameters.SNAPSHOT,
        snapshot.length === 0 ? undefined : snapshot
      ),
      this.pipeline
    );
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
   * @param {number} offset From which position of the blob to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {IBlobDownloadOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobDownloadResponse>}
   * @memberof BlobURL
   */
  public async download(
    offset: number,
    count?: number,
    options: IBlobDownloadOptions & CancellationOptions = {}
  ): Promise<Models.BlobDownloadResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.blobAccessConditions.modifiedAccessConditions =
      options.blobAccessConditions.modifiedAccessConditions || {};

    const res = await this.blobContext.download({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions,
      onDownloadProgress: isNode ? undefined : options.progress,
      range:
        offset === 0 && !count ? undefined : rangeToString({ offset, count }),
      rangeGetContentMD5: options.rangeGetContentMD5,
      snapshot: options.snapshot
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
    if (
      options.maxRetryRequests === undefined ||
      options.maxRetryRequests < 0
    ) {
      // TODO: Default value or make it a required parameter?
      options.maxRetryRequests = DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS;
    }

    if (res.contentLength === undefined) {
      throw new RangeError(
        `File download response doesn't contain valid content length header`
      );
    }

    if (!res.eTag) {
      throw new RangeError(
        `File download response doesn't contain valid etag header`
      );
    }

    return new BlobDownloadResponse(
      res,
      async (start: number): Promise<NodeJS.ReadableStream> => {
        const updatedOptions: Models.BlobDownloadOptionalParams = {
          leaseAccessConditions: options.blobAccessConditions!
            .leaseAccessConditions,
          modifiedAccessConditions: {
            ifMatch:
              options.blobAccessConditions!.modifiedAccessConditions!.ifMatch ||
              res.eTag,
            ifModifiedSince: options.blobAccessConditions!
              .modifiedAccessConditions!.ifModifiedSince,
            ifNoneMatch: options.blobAccessConditions!.modifiedAccessConditions!
              .ifNoneMatch,
            ifUnmodifiedSince: options.blobAccessConditions!
              .modifiedAccessConditions!.ifUnmodifiedSince
          },
          range: rangeToString({
            count: offset + res.contentLength! - start,
            offset: start
          }),
          snapshot: options.snapshot
        };

        // Debug purpose only
        // console.log(
        //   `Read from internal stream, range: ${
        //     updatedOptions.range
        //   }, options: ${JSON.stringify(updatedOptions)}`
        // );

        return (await this.blobContext.download({
          abortSignal: aborter,
          ...updatedOptions
        })).readableStreamBody!;
      },
      offset,
      res.contentLength!,
      {
        abortSignal: aborter,
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
   * @param {IBlobGetPropertiesOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobGetPropertiesResponse>}
   * @memberof BlobURL
   */
  public async getProperties(
    options: IBlobGetPropertiesOptions & CancellationOptions = {}
  ): Promise<Models.BlobGetPropertiesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.blobAccessConditions = options.blobAccessConditions || {};
    return this.blobContext.getProperties({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param {IBlobDeleteOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobDeleteResponse>}
   * @memberof BlobURL
   */
  public async delete(
    options: IBlobDeleteOptions & CancellationOptions = {}
  ): Promise<Models.BlobDeleteResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.blobAccessConditions = options.blobAccessConditions || {};
    return this.blobContext.deleteMethod({
      abortSignal: aborter,
      deleteSnapshots: options.deleteSnapshots,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Restores the contents and metadata of soft deleted blob and any associated
   * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
   * or later.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/undelete-blob
   *
   * @returns {Promise<Models.BlobUndeleteResponse>}
   * @memberof BlobURL
   */
  public async undelete(
    aborter?: Aborter
  ): Promise<Models.BlobUndeleteResponse> {
    return this.blobContext.undelete({
      abortSignal: aborter || Aborter.none
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
   * @param {IBlobSetHTTPHeadersOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobSetHTTPHeadersResponse>}
   * @memberof BlobURL
   */
  public async setHTTPHeaders(
    blobHTTPHeaders?: Models.BlobHTTPHeaders,
    options: IBlobSetHTTPHeadersOptions & CancellationOptions = {}
  ): Promise<Models.BlobSetHTTPHeadersResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.blobAccessConditions = options.blobAccessConditions || {};
    return this.blobContext.setHTTPHeaders({
      abortSignal: aborter,
      blobHTTPHeaders,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Sets user-defined metadata for the specified blob as one or more name-value pairs.
   *
   * If no option provided, or no metadata defined in the parameter, the blob
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-metadata
   *
   * @param {IMetadata} [metadata] Replace existing metadata with this value.
   *                               If no value provided the existing metadata will be removed.
   * @param {IBlobSetMetadataOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobSetMetadataResponse>}
   * @memberof BlobURL
   */
  public async setMetadata(
    metadata?: IMetadata,
    options: IBlobSetMetadataOptions & CancellationOptions = {}
  ): Promise<Models.BlobSetMetadataResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.blobAccessConditions = options.blobAccessConditions || {};
    return this.blobContext.setMetadata({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Establishes and manages a lock on a blob for write and delete operations.
   * The lock duration can be 15 to 60 seconds, or can be infinite.
   * In versions prior to 2012-02-12, the lock duration is 60 seconds.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {string} proposedLeaseId Can be specified in any valid GUID string format
   * @param {number} duration The lock duration can be 15 to 60 seconds, or can be infinite
   * @param {IBlobAcquireLeaseOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobAcquireLeaseResponse>}
   * @memberof BlobURL
   */
  public async acquireLease(
    proposedLeaseId: string,
    duration: number,
    options: IBlobAcquireLeaseOptions & CancellationOptions = {}
  ): Promise<Models.BlobAcquireLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.blobContext.acquireLease({
      abortSignal: aborter,
      duration,
      modifiedAccessConditions: options.modifiedAccessConditions,
      proposedLeaseId
    });
  }

  /**
   * To free the lease if it is no longer needed so that another client may immediately
   * acquire a lease against the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {string} leaseId
   * @param {IBlobReleaseLeaseOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobReleaseLeaseResponse>}
   * @memberof BlobURL
   */
  public async releaseLease(
    leaseId: string,
    options: IBlobReleaseLeaseOptions & CancellationOptions = {}
  ): Promise<Models.BlobReleaseLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.blobContext.releaseLease(leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To renew an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {string} leaseId
   * @param {IBlobRenewLeaseOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobRenewLeaseResponse>}
   * @memberof BlobURL
   */
  public async renewLease(
    leaseId: string,
    options: IBlobRenewLeaseOptions & CancellationOptions = {}
  ): Promise<Models.BlobRenewLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.blobContext.renewLease(leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To change the ID of an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {string} leaseId
   * @param {string} proposedLeaseId
   * @param {IBlobChangeLeaseOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobChangeLeaseResponse>}
   * @memberof BlobURL
   */
  public async changeLease(
    leaseId: string,
    proposedLeaseId: string,
    options: IBlobChangeLeaseOptions & CancellationOptions = {}
  ): Promise<Models.BlobChangeLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.blobContext.changeLease(leaseId, proposedLeaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To end the lease but ensure that another client cannot acquire a new lease
   * until the current lease period has expired.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {number} [breakPeriod]
   * @param {IBlobBreakLeaseOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobBreakLeaseResponse>}
   * @memberof BlobURL
   */
  public async breakLease(
    breakPeriod?: number,
    options: IBlobBreakLeaseOptions & CancellationOptions = {}
  ): Promise<Models.BlobBreakLeaseResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.blobContext.breakLease({
      abortSignal: aborter,
      breakPeriod,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * Creates a read-only snapshot of a blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/snapshot-blob
   *
   * @param {IBlobCreateSnapshotOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobCreateSnapshotResponse>}
   * @memberof BlobURL
   */
  public async createSnapshot(
    options: IBlobCreateSnapshotOptions & CancellationOptions = {}
  ): Promise<Models.BlobCreateSnapshotResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.blobAccessConditions = options.blobAccessConditions || {};
    return this.blobContext.createSnapshot({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
  }

  /**
   * Copies a blob to a destination within the storage account.
   * In version 2012-02-12 and later, the source for a Copy Blob operation can be
   * a committed blob in any Azure storage account.
   * Beginning with version 2015-02-21, the source for a Copy Blob operation can be
   * an Azure file in any Azure storage account.
   * Only storage accounts created on or after June 7th, 2012 allow the Copy Blob
   * operation to copy from another storage account.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob
   *
   * @param {string} copySource
   * @param {IBlobStartCopyFromURLOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobStartCopyFromURLResponse>}
   * @memberof BlobURL
   */
  public async startCopyFromURL(
    copySource: string,
    options: IBlobStartCopyFromURLOptions & CancellationOptions = {}
  ): Promise<Models.BlobStartCopyFromURLResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.sourceModifiedAccessConditions =
      options.sourceModifiedAccessConditions || {};

    return this.blobContext.startCopyFromURL(copySource, {
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions,
      sourceModifiedAccessConditions: {
        sourceIfMatch: options.sourceModifiedAccessConditions.ifMatch,
        sourceIfModifiedSince:
          options.sourceModifiedAccessConditions.ifModifiedSince,
        sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
        sourceIfUnmodifiedSince:
          options.sourceModifiedAccessConditions.ifUnmodifiedSince
      }
    });
  }

  /**
   * Aborts a pending Copy Blob operation, and leaves a destination blob with zero
   * length and full metadata. Version 2012-02-12 and newer.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-blob
   *
   * @param {string} copyId
   * @param {IBlobAbortCopyFromURLOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobAbortCopyFromURLResponse>}
   * @memberof BlobURL
   */
  public async abortCopyFromURL(
    copyId: string,
    options: IBlobAbortCopyFromURLOptions & CancellationOptions = {}
  ): Promise<Models.BlobAbortCopyFromURLResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.blobContext.abortCopyFromURL(copyId, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions
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
   * @param {Models.AccessTier} tier
   * @param {IBlobSetTierOptions & CancellationOptions} [options]
   * @returns {Promise<Models.BlobsSetTierResponse>}
   * @memberof BlobURL
   */
  public async setTier(
    tier: Models.AccessTier,
    options: IBlobSetTierOptions & CancellationOptions= {}
  ): Promise<Models.BlobSetTierResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return await this.blobContext.setTier(tier, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions
    });
  }
}
