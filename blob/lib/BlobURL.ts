import { TransferProgressEvent } from "ms-rest-js";

import * as Models from "../lib/generated/models";
import { Aborter } from "./Aborter";
import { ContainerURL } from "./ContainerURL";
import { Blob } from "./generated/operations";
import { rangeToString } from "./IRange";
import {
  IBlobAccessConditions,
  ICommonResponse,
  IDownloadResponse
} from "./models";
import { Pipeline } from "./Pipeline";
import { StorageURL } from "./StorageURL";
import { URLConstants } from "./utils/constants";
import { appendToURLPath, setURLParameter } from "./utils/utils.common";

export interface IBlobDownloadOptions {
  snapshot?: string;
  rangeGetContentMD5?: boolean;
  blobAccessConditions?: IBlobAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;
}

export declare type BlobDownloadResponse = IDownloadResponse &
  Models.BlobDownloadHeaders;

export interface IBlobGetPropertiesOptions {
  blobAccessConditions?: IBlobAccessConditions;
}

export declare type BlobGetPropertiesResponse = ICommonResponse &
  Models.BlobGetPropertiesHeaders;

export interface IBlobDeleteOptions {
  blobAccessConditions?: IBlobAccessConditions;
  deleteSnapshots?: Models.DeleteSnapshotsOptionType;
}

export declare type BlobDeleteResponse = ICommonResponse &
  Models.BlobDeleteHeaders;

export declare type BlobUndeleteResponse = ICommonResponse &
  Models.BlobUndeleteHeaders;

export interface IBlobSetHTTPHeadersOptions {
  blobAccessConditions?: IBlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
}

export declare type BlobSetHTTPHeadersResponse = ICommonResponse &
  Models.BlobSetHTTPHeadersHeaders;

export interface IBlobSetMetadataOptions {
  metadata?: { [propertyName: string]: string };
  blobAccessConditions?: IBlobAccessConditions;
}

export declare type BlobSetMetadataResponse = ICommonResponse &
  Models.BlobSetMetadataHeaders;

export interface IBlobAcquireLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export declare type BlobAcquireLeaseResponse = ICommonResponse &
  Models.BlobAcquireLeaseHeaders;

export interface IBlobReleaseLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export declare type BlobReleaseLeaseResponse = ICommonResponse &
  Models.BlobReleaseLeaseHeaders;

export interface IBlobRenewLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export declare type BlobRenewLeaseResponse = ICommonResponse &
  Models.BlobRenewLeaseHeaders;

export interface IBlobChangeLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export declare type BlobChangeLeaseResponse = ICommonResponse &
  Models.BlobChangeLeaseHeaders;

export interface IBlobBreakLeaseOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export declare type BlobBreakLeaseResponse = ICommonResponse &
  Models.BlobBreakLeaseHeaders;

export interface IBlobCreateSnapshotOptions {
  metadata?: { [propertyName: string]: string };
  blobAccessConditions?: IBlobAccessConditions;
}

export declare type BlobCreateSnapshotResponse = ICommonResponse &
  Models.BlobCreateSnapshotHeaders;

export interface IBlobStartCopyFromURLOptions {
  metadata?: { [propertyName: string]: string };
  blobAccessConditions?: IBlobAccessConditions;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export declare type BlobStartCopyFromURLResponse = ICommonResponse &
  Models.BlobStartCopyFromURLHeaders;

export interface IBlobAbortCopyFromURLOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export declare type BlobAbortCopyFromURLResponse = ICommonResponse &
  Models.BlobAbortCopyFromURLHeaders;

export declare type BlobSetTierResponse = ICommonResponse &
  Models.BlobSetTierHeaders;

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
   * @param {ContainerURL} containerURL
   * @param {string} blobName
   * @returns
   * @memberof BlobURL
   */
  public static fromContainerURL(containerURL: ContainerURL, blobName: string) {
    return new BlobURL(
      appendToURLPath(containerURL.url, blobName),
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
   * @param {string} url
   * @param {Pipeline} pipeline
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
   * WARNING: In Node.js, abort or network error during reading from response stream will NOT
   * trigger any error, readable stream will end immediately. You need to check downloaded data
   * length when stream ends.
   *
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} offset From which position of the blob to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {IBlobDownloadOptions} [options]
   * @returns {Promise<BlobDownloadResponse>}
   * @memberof BlobURL
   */
  public async download(
    aborter: Aborter,
    offset: number,
    count?: number,
    options: IBlobDownloadOptions = {}
  ): Promise<BlobDownloadResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};

    const { parsedHeaders, ...result } = await this.blobContext.download({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions,
      onDownloadProgress: options.progress,
      range:
        offset === 0 && !count ? undefined : rangeToString({ offset, count }),
      rangeGetContentMD5: options.rangeGetContentMD5,
      snapshot: options.snapshot
    });
    const res = { ...result, ...parsedHeaders };

    // Default axios based HTTP client cannot abort download stream, manually pause/abort it
    // Currently, no error will be triggered when network error or abort during reading from response stream
    // TODO: Now need to manually validate the date length when stream ends, add download retry in the future
    if (res.readableStreamBody) {
      aborter.addEventListener("abort", () => {
        if (res.readableStreamBody) {
          res.readableStreamBody.pause();
        }
      });
    }

    return res;
  }

  /**
   * Returns all user-defined metadata, standard HTTP properties, and system properties
   * for the blob. It does not return the content of the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/get-blob-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IBlobGetPropertiesOptions} [options]
   * @returns {Promise<BlobGetPropertiesResponse>}
   * @memberof BlobURL
   */
  public async getProperties(
    aborter: Aborter,
    options: IBlobGetPropertiesOptions = {}
  ): Promise<BlobGetPropertiesResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    const { parsedHeaders, ...result } = await this.blobContext.getProperties({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * Marks the specified blob or snapshot for deletion. The blob is later deleted
   * during garbage collection. Note that in order to delete a blob, you must delete
   * all of its snapshots. You can delete both at the same time with the Delete
   * Blob operation.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/delete-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IBlobDeleteOptions} [options]
   * @returns {Promise<BlobDeleteResponse>}
   * @memberof BlobURL
   */
  public async delete(
    aborter: Aborter,
    options: IBlobDeleteOptions = {}
  ): Promise<BlobDeleteResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    const { parsedHeaders, ...result } = await this.blobContext.deleteMethod({
      abortSignal: aborter,
      deleteSnapshots: options.deleteSnapshots,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * Restores the contents and metadata of soft deleted blob and any associated
   * soft deleted snapshots. Undelete Blob is supported only on version 2017-07-29
   * or later.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/undelete-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<BlobUndeleteResponse>}
   * @memberof BlobURL
   */
  public async undelete(aborter: Aborter): Promise<BlobUndeleteResponse> {
    const { parsedHeaders, ...result } = await this.blobContext.undelete({
      abortSignal: aborter
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * Sets system properties on the blob.
   *
   * If no option provided, or no value provided for the blob HTTP headers in the options,
   * these blob HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IBlobSetHTTPHeadersOptions} [options]
   * @returns {Promise<BlobSetHTTPHeadersResponse>}
   * @memberof BlobURL
   */
  public async setHTTPHeaders(
    aborter: Aborter,
    options: IBlobSetHTTPHeadersOptions = {}
  ): Promise<BlobSetHTTPHeadersResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    const { parsedHeaders, ...result } = await this.blobContext.setHTTPHeaders({
      abortSignal: aborter,
      blobHTTPHeaders: options.blobHTTPHeaders,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * Sets user-defined metadata for the specified blob as one or more name-value pairs.
   *
   * If no option provided, or no metadata defined in the option parameter, the blob
   * metadata will be removed.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-metadata
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IBlobSetMetadataOptions} [options]
   * @returns {Promise<BlobSetMetadataResponse>}
   * @memberof BlobURL
   */
  public async setMetadata(
    aborter: Aborter,
    options: IBlobSetMetadataOptions = {}
  ): Promise<BlobSetMetadataResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    const { parsedHeaders, ...result } = await this.blobContext.setMetadata({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * Establishes and manages a lock on a blob for write and delete operations.
   * The lock duration can be 15 to 60 seconds, or can be infinite.
   * In versions prior to 2012-02-12, the lock duration is 60 seconds.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} proposedLeaseId Can be specified in any valid GUID string format
   * @param {number} duration The lock duration can be 15 to 60 seconds, or can be infinite
   * @param {IBlobAcquireLeaseOptions} [options]
   * @returns {Promise<BlobAcquireLeaseResponse>}
   * @memberof BlobURL
   */
  public async acquireLease(
    aborter: Aborter,
    proposedLeaseId: string,
    duration: number,
    options: IBlobAcquireLeaseOptions = {}
  ): Promise<BlobAcquireLeaseResponse> {
    const { parsedHeaders, ...result } = await this.blobContext.acquireLease({
      abortSignal: aborter,
      duration,
      modifiedAccessConditions: options.modifiedAccessConditions,
      proposedLeaseId
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * To free the lease if it is no longer needed so that another client may immediately
   * acquire a lease against the blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {IBlobReleaseLeaseOptions} [options]
   * @returns {Promise<BlobReleaseLeaseResponse>}
   * @memberof BlobURL
   */
  public async releaseLease(
    aborter: Aborter,
    leaseId: string,
    options: IBlobReleaseLeaseOptions = {}
  ): Promise<BlobReleaseLeaseResponse> {
    const { parsedHeaders, ...result } = await this.blobContext.releaseLease(
      leaseId,
      {
        abortSignal: aborter,
        modifiedAccessConditions: options.modifiedAccessConditions
      }
    );
    return { ...result, ...parsedHeaders };
  }

  /**
   * To renew an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {IBlobRenewLeaseOptions} [options]
   * @returns {Promise<BlobRenewLeaseResponse>}
   * @memberof BlobURL
   */
  public async renewLease(
    aborter: Aborter,
    leaseId: string,
    options: IBlobRenewLeaseOptions = {}
  ): Promise<BlobRenewLeaseResponse> {
    const { parsedHeaders, ...result } = await this.blobContext.renewLease(
      leaseId,
      {
        abortSignal: aborter,
        modifiedAccessConditions: options.modifiedAccessConditions
      }
    );
    return { ...result, ...parsedHeaders };
  }

  /**
   * To change the ID of an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {string} proposedLeaseId
   * @param {IBlobChangeLeaseOptions} [options]
   * @returns {Promise<BlobChangeLeaseResponse>}
   * @memberof BlobURL
   */
  public async changeLease(
    aborter: Aborter,
    leaseId: string,
    proposedLeaseId: string,
    options: IBlobChangeLeaseOptions = {}
  ): Promise<BlobChangeLeaseResponse> {
    const { parsedHeaders, ...result } = await this.blobContext.changeLease(
      leaseId,
      proposedLeaseId,
      {
        abortSignal: aborter,
        modifiedAccessConditions: options.modifiedAccessConditions
      }
    );
    return { ...result, ...parsedHeaders };
  }

  /**
   * To end the lease but ensure that another client cannot acquire a new lease
   * until the current lease period has expired.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} [breakPeriod]
   * @param {IBlobBreakLeaseOptions} [options]
   * @returns {Promise<BlobBreakLeaseResponse>}
   * @memberof BlobURL
   */
  public async breakLease(
    aborter: Aborter,
    breakPeriod?: number,
    options: IBlobBreakLeaseOptions = {}
  ): Promise<BlobBreakLeaseResponse> {
    const { parsedHeaders, ...result } = await this.blobContext.breakLease({
      abortSignal: aborter,
      breakPeriod,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * Creates a read-only snapshot of a blob.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/snapshot-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IBlobCreateSnapshotOptions} [options]
   * @returns {Promise<BlobCreateSnapshotResponse>}
   * @memberof BlobURL
   */
  public async createSnapshot(
    aborter: Aborter,
    options: IBlobCreateSnapshotOptions = {}
  ): Promise<BlobCreateSnapshotResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    const { parsedHeaders, ...result } = await this.blobContext.createSnapshot({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions
    });
    return { ...result, ...parsedHeaders };
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} copySource
   * @param {IBlobStartCopyFromURLOptions} [options]
   * @returns {Promise<BlobStartCopyFromURLResponse>}
   * @memberof BlobURL
   */
  public async startCopyFromURL(
    aborter: Aborter,
    copySource: string,
    options: IBlobStartCopyFromURLOptions = {}
  ): Promise<BlobStartCopyFromURLResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.sourceModifiedAccessConditions =
      options.sourceModifiedAccessConditions || {};
    const {
      parsedHeaders,
      ...result
    } = await this.blobContext.startCopyFromURL(copySource, {
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions:
        options.blobAccessConditions.modifiedAccessConditions,
      sourceModifiedAccessConditions: {
        sourceIfMatches: options.sourceModifiedAccessConditions.ifMatch,
        sourceIfModifiedSince:
          options.sourceModifiedAccessConditions.ifModifiedSince,
        sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
        sourceIfUnmodifiedSince:
          options.sourceModifiedAccessConditions.ifUnmodifiedSince
      }
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * Aborts a pending Copy Blob operation, and leaves a destination blob with zero
   * length and full metadata. Version 2012-02-12 and newer.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/abort-copy-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} copyId
   * @param {IBlobAbortCopyFromURLOptions} [options]
   * @returns {Promise<BlobAbortCopyFromURLResponse>}
   * @memberof BlobURL
   */
  public async abortCopyFromURL(
    aborter: Aborter,
    copyId: string,
    options: IBlobAbortCopyFromURLOptions = {}
  ): Promise<BlobAbortCopyFromURLResponse> {
    const {
      parsedHeaders,
      ...result
    } = await this.blobContext.abortCopyFromURL(copyId, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions
    });
    return { ...result, ...parsedHeaders };
  }

  /**
   * Sets the tier on a blob. The operation is allowed on a page blob in a premium
   * storage account and on a block blob in a blob storage account (locally redundant
   * storage only). A premium page blob's tier determines the allowed size, IOPS,
   * and bandwidth of the blob. A block blob's tier determines Hot/Cool/Archive
   * storage type. This operation does not update the blob's ETag.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-tier
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.None or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Models.AccessTier} tier
   * @returns {Promise<BlobsSetTierResponse>}
   * @memberof BlobURL
   */
  public async setTier(
    aborter: Aborter,
    tier: Models.AccessTier
  ): Promise<BlobSetTierResponse> {
    const { parsedHeaders, ...result } = await this.blobContext.setTier(tier, {
      abortSignal: aborter
    });
    return { ...result, ...parsedHeaders };
  }
}
