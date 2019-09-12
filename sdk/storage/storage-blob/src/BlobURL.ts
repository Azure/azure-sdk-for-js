import { isNode, TransferProgressEvent } from "@azure/ms-rest-js";

import { Aborter } from "./Aborter";
import { BlobDownloadResponse } from "./BlobDownloadResponse";
import { ContainerURL } from "./ContainerURL";
import * as Models from "./generated/src/models";
import { Blob } from "./generated/src/operations";
import { rangeToString } from "./IRange";
import { IBlobAccessConditions, IMetadata, ensureCpkIfSpecified, BlockBlobTier, PremiumPageBlobTier, toAccessTier } from "./models";
import { Pipeline } from "./Pipeline";
import { StorageURL } from "./StorageURL";
import { DEFAULT_MAX_DOWNLOAD_RETRY_REQUESTS, URLConstants } from "./utils/constants";
import { appendToURLPath, setURLParameter } from "./utils/utils.common";

export interface IBlobDownloadOptions {
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

  customerProvidedKey?: Models.CpkInfo;
}

export interface IBlobGetPropertiesOptions {
  blobAccessConditions?: IBlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
}

export interface IBlobDeleteOptions {
  blobAccessConditions?: IBlobAccessConditions;
  deleteSnapshots?: Models.DeleteSnapshotsOptionType;
}

export interface IBlobSetHTTPHeadersOptions {
  blobAccessConditions?: IBlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
}

export interface IBlobSetMetadataOptions {
  blobAccessConditions?: IBlobAccessConditions;
  customerProvidedKey?: Models.CpkInfo;
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
  customerProvidedKey?: Models.CpkInfo;
}

export interface IBlobStartCopyFromURLOptions {
  metadata?: IMetadata;
  blobAccessConditions?: IBlobAccessConditions;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
  tier?: BlockBlobTier | PremiumPageBlobTier | string;
  rehydratePriority?: Models.RehydratePriority;
}

export interface IBlobAbortCopyFromURLOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

export interface IBlobSyncCopyFromURLOptions {
  metadata?: IMetadata;
  blobAccessConditions?: IBlobAccessConditions;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;
}

export interface IBlobSetTierOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
  rehydratePriority?: Models.RehydratePriority;
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} offset From which position of the blob to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {IBlobDownloadOptions} [options]
   * @returns {Promise<Models.BlobDownloadResponse>}
   * @memberof BlobURL
   */
  public async download(
    aborter: Aborter,
    offset: number,
    count?: number,
    options: IBlobDownloadOptions = {}
  ): Promise<Models.BlobDownloadResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.blobAccessConditions.modifiedAccessConditions =
      options.blobAccessConditions.modifiedAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    const res = await this.blobContext.download({
      abortSignal: aborter,
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
      aborter,
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
          abortSignal: aborter,
          ...updatedOptions
        })).readableStreamBody!;
      },
      offset,
      res.contentLength!,
      {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IBlobGetPropertiesOptions} [options]
   * @returns {Promise<Models.BlobGetPropertiesResponse>}
   * @memberof BlobURL
   */
  public async getProperties(
    aborter: Aborter,
    options: IBlobGetPropertiesOptions = {}
  ): Promise<Models.BlobGetPropertiesResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    return this.blobContext.getProperties({
      abortSignal: aborter,
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IBlobDeleteOptions} [options]
   * @returns {Promise<Models.BlobDeleteResponse>}
   * @memberof BlobURL
   */
  public async delete(
    aborter: Aborter,
    options: IBlobDeleteOptions = {}
  ): Promise<Models.BlobDeleteResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    return this.blobContext.deleteMethod({
      abortSignal: aborter,
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @returns {Promise<Models.BlobUndeleteResponse>}
   * @memberof BlobURL
   */
  public async undelete(aborter: Aborter): Promise<Models.BlobUndeleteResponse> {
    return this.blobContext.undelete({
      abortSignal: aborter
    });
  }

  /**
   * Sets system properties on the blob.
   *
   * If no value provided, or no value provided for the specificed blob HTTP headers,
   * these blob HTTP headers without a value will be cleared.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Models.BlobHTTPHeaders} [blobHTTPHeaders] If no value provided, or no value provided for
   *                                                   the specificed blob HTTP headers, these blob HTTP
   *                                                   headers without a value will be cleared.
   * @param {IBlobSetHTTPHeadersOptions} [options]
   * @returns {Promise<Models.BlobSetHTTPHeadersResponse>}
   * @memberof BlobURL
   */
  public async setHTTPHeaders(
    aborter: Aborter,
    blobHTTPHeaders?: Models.BlobHTTPHeaders,
    options: IBlobSetHTTPHeadersOptions = {}
  ): Promise<Models.BlobSetHTTPHeadersResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.blobContext.setHTTPHeaders({
      abortSignal: aborter,
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IMetadata} [metadata] Replace existing metadata with this value.
   *                               If no value provided the existing metadata will be removed.
   * @param {IBlobSetMetadataOptions} [options]
   * @returns {Promise<Models.BlobSetMetadataResponse>}
   * @memberof BlobURL
   */
  public async setMetadata(
    aborter: Aborter,
    metadata?: IMetadata,
    options: IBlobSetMetadataOptions = {}
  ): Promise<Models.BlobSetMetadataResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.blobContext.setMetadata({
      abortSignal: aborter,
      leaseAccessConditions: options.blobAccessConditions.leaseAccessConditions,
      metadata,
      modifiedAccessConditions: options.blobAccessConditions.modifiedAccessConditions,
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * Establishes and manages a lock on a blob for write and delete operations.
   * The lock duration can be 15 to 60 seconds, or can be infinite.
   * In versions prior to 2012-02-12, the lock duration is 60 seconds.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} proposedLeaseId Can be specified in any valid GUID string format
   * @param {number} duration The lock duration can be 15 to 60 seconds, or can be infinite
   * @param {IBlobAcquireLeaseOptions} [options]
   * @returns {Promise<Models.BlobAcquireLeaseResponse>}
   * @memberof BlobURL
   */
  public async acquireLease(
    aborter: Aborter,
    proposedLeaseId: string,
    duration: number,
    options: IBlobAcquireLeaseOptions = {}
  ): Promise<Models.BlobAcquireLeaseResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {IBlobReleaseLeaseOptions} [options]
   * @returns {Promise<Models.BlobReleaseLeaseResponse>}
   * @memberof BlobURL
   */
  public async releaseLease(
    aborter: Aborter,
    leaseId: string,
    options: IBlobReleaseLeaseOptions = {}
  ): Promise<Models.BlobReleaseLeaseResponse> {
    return this.blobContext.releaseLease(leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To renew an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {IBlobRenewLeaseOptions} [options]
   * @returns {Promise<Models.BlobRenewLeaseResponse>}
   * @memberof BlobURL
   */
  public async renewLease(
    aborter: Aborter,
    leaseId: string,
    options: IBlobRenewLeaseOptions = {}
  ): Promise<Models.BlobRenewLeaseResponse> {
    return this.blobContext.renewLease(leaseId, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }

  /**
   * To change the ID of an existing lease.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/lease-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} leaseId
   * @param {string} proposedLeaseId
   * @param {IBlobChangeLeaseOptions} [options]
   * @returns {Promise<Models.BlobChangeLeaseResponse>}
   * @memberof BlobURL
   */
  public async changeLease(
    aborter: Aborter,
    leaseId: string,
    proposedLeaseId: string,
    options: IBlobChangeLeaseOptions = {}
  ): Promise<Models.BlobChangeLeaseResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} [breakPeriod]
   * @param {IBlobBreakLeaseOptions} [options]
   * @returns {Promise<Models.BlobBreakLeaseResponse>}
   * @memberof BlobURL
   */
  public async breakLease(
    aborter: Aborter,
    breakPeriod?: number,
    options: IBlobBreakLeaseOptions = {}
  ): Promise<Models.BlobBreakLeaseResponse> {
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IBlobCreateSnapshotOptions} [options]
   * @returns {Promise<Models.BlobCreateSnapshotResponse>}
   * @memberof BlobURL
   */
  public async createSnapshot(
    aborter: Aborter,
    options: IBlobCreateSnapshotOptions = {}
  ): Promise<Models.BlobCreateSnapshotResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.blobContext.createSnapshot({
      abortSignal: aborter,
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} copySource
   * @param {IBlobStartCopyFromURLOptions} [options]
   * @returns {Promise<Models.BlobStartCopyFromURLResponse>}
   * @memberof BlobURL
   */
  public async startCopyFromURL(
    aborter: Aborter,
    copySource: string,
    options: IBlobStartCopyFromURLOptions = {}
  ): Promise<Models.BlobStartCopyFromURLResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};

    return this.blobContext.startCopyFromURL(copySource, {
      abortSignal: aborter,
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} copyId
   * @param {IBlobAbortCopyFromURLOptions} [options]
   * @returns {Promise<Models.BlobAbortCopyFromURLResponse>}
   * @memberof BlobURL
   */
  public async abortCopyFromURL(
    aborter: Aborter,
    copyId: string,
    options: IBlobAbortCopyFromURLOptions = {}
  ): Promise<Models.BlobAbortCopyFromURLResponse> {
    return this.blobContext.abortCopyFromURL(copyId, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions
    });
  }

  /**
   * The synchronous Copy From URL operation copies a blob or an internet resource to a new blob. It will not
   * return a response until the copy is complete.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/copy-blob-from-url
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} copySource The source URL to copy from, Shared Access Signature(SAS) maybe needed for authentication
   * @param {IBlobSyncCopyFromURLOptions} [options={}]
   * @returns {Promise<Models.BlobCopyFromURLResponse>}
   * @memberof BlobURL
   */
  public async syncCopyFromURL(
    aborter: Aborter,
    copySource: string,
    options: IBlobSyncCopyFromURLOptions = {}
  ): Promise<Models.BlobCopyFromURLResponse> {
    options.blobAccessConditions = options.blobAccessConditions || {};
    options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};

    return this.blobContext.copyFromURL(copySource, {
      abortSignal: aborter,
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {BlockBlobTier | PremiumPageBlobTier | string} tier
   * @param {IBlobSetTierOptions} [options]
   * @returns {Promise<Models.BlobsSetTierResponse>}
   * @memberof BlobURL
   */
  public async setTier(
    aborter: Aborter,
    tier: BlockBlobTier | PremiumPageBlobTier | string,
    options: IBlobSetTierOptions = {}
  ): Promise<Models.BlobSetTierResponse> {
    return await this.blobContext.setTier(
      toAccessTier(tier)!,
      {
        abortSignal: aborter,
        leaseAccessConditions: options.leaseAccessConditions,
        rehydratePriority: options.rehydratePriority
      });
  }
}
