import { HttpRequestBody, TransferProgressEvent } from "ms-rest-js";

import * as Models from "../lib/generated/models";
import { Aborter } from "./Aborter";
import { BlobURL } from "./BlobURL";
import { ContainerURL } from "./ContainerURL";
import { PageBlob } from "./generated/operations";
import { rangeToString } from "./IRange";
import {
  IBlobAccessConditions,
  IMetadata,
  IPageBlobAccessConditions
} from "./models";
import { Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { appendToURLPath, setURLParameter } from "./utils/utils.common";

export interface IPageBlobCreateOptions {
  accessConditions?: IBlobAccessConditions;
  blobSequenceNumber?: number;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  metadata?: IMetadata;
}

export interface IPageBlobUploadPagesOptions {
  accessConditions?: IPageBlobAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;
  transactionalContentMD5?: Uint8Array;
}

export interface IPageBlobClearPagesOptions {
  accessConditions?: IPageBlobAccessConditions;
}

export interface IPageBlobGetPageRangesOptions {
  accessConditions?: IBlobAccessConditions;
}

export interface IPageBlobGetPageRangesDiffOptions {
  accessConditions?: IBlobAccessConditions;
  range?: string;
}

export interface IPageBlobResizeOptions {
  accessConditions?: IBlobAccessConditions;
}

export interface IPageBlobUpdateSequenceNumberOptions {
  accessConditions?: IBlobAccessConditions;
}

export interface IPageBlobStartCopyIncrementalOptions {
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * PageBlobURL defines a set of operations applicable to page blobs.
 *
 * @export
 * @class PageBlobURL
 * @extends {StorageURL}
 */
export class PageBlobURL extends BlobURL {
  /**
   * Creates a PageBlobURL object from ContainerURL instance.
   *
   * @static
   * @param {ContainerURL} containerURL
   * @param {string} blobName
   * @returns {PageBlobURL}
   * @memberof PageBlobURL
   */
  public static fromContainerURL(
    containerURL: ContainerURL,
    blobName: string
  ): PageBlobURL {
    return new PageBlobURL(
      appendToURLPath(containerURL.url, blobName),
      containerURL.pipeline
    );
  }

  /**
   * Creates a PageBlobURL object from BlobURL instance.
   *
   * @static
   * @param {BlobURL} blobURL
   * @returns {PageBlobURL}
   * @memberof PageBlobURL
   */
  public static fromBlobURL(blobURL: BlobURL): PageBlobURL {
    return new PageBlobURL(blobURL.url, blobURL.pipeline);
  }

  /**
   * pageBlobsContext provided by protocol layer.
   *
   * @private
   * @type {PageBlobs}
   * @memberof PageBlobURL
   */
  private pageBlobContext: PageBlob;

  /**
   * Creates an instance of PageBlobURL.
   * @param {string} url A URL string pointing to Azure Storage page blob, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob". You can
   *                     append a SAS if using AnonymousCredential, such as
   *                     "https://myaccount.blob.core.windows.net/mycontainer/pageblob?sasString".
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof PageBlobURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.pageBlobContext = new PageBlob(this.storageClientContext);
  }

  /**
   * Creates a new PageBlobURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {PageBlobURL}
   * @memberof PageBlobURL
   */
  public withPipeline(pipeline: Pipeline): PageBlobURL {
    return new PageBlobURL(this.url, pipeline);
  }

  /**
   * Creates a new PageBlobURL object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param {string} snapshot
   * @returns {PageBlobURL}
   * @memberof PageBlobURL
   */
  public withSnapshot(snapshot: string): PageBlobURL {
    return new PageBlobURL(
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} size
   * @param {IPageBlobCreateOptions} [options]
   * @returns {Promise<Models.PageBlobCreateResponse>}
   * @memberof PageBlobURL
   */
  public async create(
    aborter: Aborter,
    size: number,
    options: IPageBlobCreateOptions = {}
  ): Promise<Models.PageBlobCreateResponse> {
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.create(0, size, {
      abortSignal: aborter,
      blobHTTPHeaders: options.blobHTTPHeaders,
      blobSequenceNumber: options.blobSequenceNumber,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions:
        options.accessConditions.modifiedAccessConditions
    });
  }

  /**
   * Writes 1 or more pages to the page blob. The start and end offsets must be a multiple of 512.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-page
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {HttpRequestBody} body
   * @param {number} offset Offset of destination page blob
   * @param {number} count Content length of body, also how many bytes to be uploaded
   * @param {IPageBlobUploadPagesOptions} [options]
   * @returns {Promise<Models.PageBlobsUploadPagesResponse>}
   * @memberof PageBlobURL
   */
  public async uploadPages(
    aborter: Aborter,
    body: HttpRequestBody,
    offset: number,
    count: number,
    options: IPageBlobUploadPagesOptions = {}
  ): Promise<Models.PageBlobUploadPagesResponse> {
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.uploadPages(body, count, {
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.accessConditions.modifiedAccessConditions,
      onUploadProgress: options.progress,
      range: rangeToString({ offset, count }),
      sequenceNumberAccessConditions:
        options.accessConditions.sequenceNumberAccessConditions,
      transactionalContentMD5: options.transactionalContentMD5
    });
  }

  /**
   * Frees the specified pages from the page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-page
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} offset
   * @param {number} count
   * @param {IPageBlobClearPagesOptions} [options]
   * @returns {Promise<Models.PageBlobClearPagesResponse>}
   * @memberof PageBlobURL
   */
  public async clearPages(
    aborter: Aborter,
    offset: number,
    count: number,
    options: IPageBlobClearPagesOptions = {}
  ): Promise<Models.PageBlobClearPagesResponse> {
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.clearPages(0, {
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.accessConditions.modifiedAccessConditions,
      range: rangeToString({ offset, count }),
      sequenceNumberAccessConditions:
        options.accessConditions.sequenceNumberAccessConditions
    });
  }

  /**
   * Returns the list of valid page ranges for a page blob or snapshot of a page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} offset
   * @param {number} count
   * @param {IPageBlobGetPageRangesOptions} [options]
   * @returns {Promise<Models.PageBlobGetPageRangesResponse>}
   * @memberof PageBlobURL
   */
  public async getPageRanges(
    aborter: Aborter,
    offset: number,
    count: number,
    options: IPageBlobGetPageRangesOptions = {}
  ): Promise<Models.PageBlobGetPageRangesResponse> {
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.getPageRanges({
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.accessConditions.modifiedAccessConditions,
      range: rangeToString({ offset, count })
    });
  }

  /**
   * Gets the collection of page ranges that differ between a specified snapshot and this page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} offset
   * @param {number} count
   * @param {string} prevSnapshot
   * @param {IPageBlobGetPageRangesDiffOptions} [options]
   * @returns {Promise<Models.PageBlobGetPageRangesDiffResponse>}
   * @memberof PageBlobURL
   */
  public async getPageRangesDiff(
    aborter: Aborter,
    offset: number,
    count: number,
    prevSnapshot: string,
    options: IPageBlobGetPageRangesDiffOptions = {}
  ): Promise<Models.PageBlobGetPageRangesDiffResponse> {
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.getPageRangesDiff({
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.accessConditions.modifiedAccessConditions,
      prevsnapshot: prevSnapshot,
      range: rangeToString({ offset, count })
    });
  }

  /**
   * Resizes the page blob to the specified size (which must be a multiple of 512).
   * @see https://docs.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {number} size
   * @param {IPageBlobResizeOptions} [options]
   * @returns {Promise<Models.PageBlobResizeResponse>}
   * @memberof PageBlobURL
   */
  public async resize(
    aborter: Aborter,
    size: number,
    options: IPageBlobResizeOptions = {}
  ): Promise<Models.PageBlobResizeResponse> {
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.resize(size, {
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.accessConditions.modifiedAccessConditions
    });
  }

  /**
   * Sets a page blob's sequence number.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Models.SequenceNumberActionType} sequenceNumberAction
   * @param {number} [sequenceNumber] Required if sequenceNumberAction is max or update
   * @param {IPageBlobUpdateSequenceNumberOptions} [options]
   * @returns {Promise<Models.PageBlobUpdateSequenceNumberResponse>}
   * @memberof PageBlobURL
   */
  public async updateSequenceNumber(
    aborter: Aborter,
    sequenceNumberAction: Models.SequenceNumberActionType,
    sequenceNumber?: number,
    options: IPageBlobUpdateSequenceNumberOptions = {}
  ): Promise<Models.PageBlobUpdateSequenceNumberResponse> {
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.updateSequenceNumber(sequenceNumberAction, {
      abortSignal: aborter,
      blobSequenceNumber: sequenceNumber,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions:
        options.accessConditions.modifiedAccessConditions
    });
  }

  /**
   * Begins an operation to start an incremental copy from one page blob's snapshot to this page blob.
   * The snapshot is copied such that only the differential changes between the previously
   * copied snapshot are transferred to the destination.
   * The copied snapshots are complete copies of the original snapshot and can be read or copied from as usual.
   * @see https://docs.microsoft.com/rest/api/storageservices/incremental-copy-blob
   * @see https://docs.microsoft.com/en-us/azure/virtual-machines/windows/incremental-snapshots
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} copySource Specifies the name of the source page blob snapshot. For example,
   *                            https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param {IPageBlobStartCopyIncrementalOptions} [options]
   * @returns {Promise<Models.PageBlobCopyIncrementalResponse>}
   * @memberof PageBlobURL
   */
  public async startCopyIncremental(
    aborter: Aborter,
    copySource: string,
    options: IPageBlobStartCopyIncrementalOptions = {}
  ): Promise<Models.PageBlobCopyIncrementalResponse> {
    return this.pageBlobContext.copyIncremental(copySource, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }
}
