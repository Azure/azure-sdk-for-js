import { HttpRequestBody, TransferProgressEvent } from "@azure/ms-rest-js";

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { BlobClient } from "./BlobClient";
import { ContainerClient } from "./ContainerClient";
import { PageBlob } from "./generated/lib/operations";
import { rangeToString } from "./Range";
import { BlobAccessConditions, Metadata, PageBlobAccessConditions } from "./models";
import { Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { appendToURLPath, setURLParameter, extractPartsWithValidation } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { StorageClient, NewPipelineOptions } from "./StorageClient";

export interface PageBlobCreateOptions {
  abortSignal?: Aborter;
  accessConditions?: BlobAccessConditions;
  blobSequenceNumber?: number;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  metadata?: Metadata;
}

export interface PageBlobUploadPagesOptions {
  abortSignal?: Aborter;
  accessConditions?: PageBlobAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;
  transactionalContentMD5?: Uint8Array;
}

export interface PageBlobClearPagesOptions {
  abortSignal?: Aborter;
  accessConditions?: PageBlobAccessConditions;
}

export interface PageBlobGetPageRangesOptions {
  abortSignal?: Aborter;
  accessConditions?: BlobAccessConditions;
}

export interface PageBlobGetPageRangesDiffOptions {
  abortSignal?: Aborter;
  accessConditions?: BlobAccessConditions;
  range?: string;
}

export interface PageBlobResizeOptions {
  abortSignal?: Aborter;
  accessConditions?: BlobAccessConditions;
}

export interface PageBlobUpdateSequenceNumberOptions {
  abortSignal?: Aborter;
  accessConditions?: BlobAccessConditions;
}

export interface PageBlobStartCopyIncrementalOptions {
  abortSignal?: Aborter;
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
}

/**
 * PageBlobClient defines a set of operations applicable to page blobs.
 *
 * @export
 * @class PageBlobClient
 * @extends {StorageClient}
 */
export class PageBlobClient extends BlobClient {
  /**
   * Creates a PageBlobClient object from ContainerClient instance.
   *
   * @static
   * @param {ContainerClient} containerClient A ContainerClient object
   * @param {string} blobName A page blob name
   * @returns {PageBlobClient}
   * @memberof PageBlobClient
   */
  public static fromContainerClient(
    containerClient: ContainerClient,
    blobName: string
  ): PageBlobClient {
    return new PageBlobClient(
      appendToURLPath(containerClient.url, encodeURIComponent(blobName)),
      containerClient.pipeline
    );
  }

  /**
   * Creates a PageBlobClient object from BlobClient instance.
   *
   * @static
   * @param {BlobClient} blobClient
   * @returns {PageBlobClient}
   * @memberof PageBlobClient
   */
  public static fromBlobClient(blobClient: BlobClient): PageBlobClient {
    return new PageBlobClient(blobClient.url, blobClient.pipeline);
  }

  /**
   * pageBlobsContext provided by protocol layer.
   *
   * @private
   * @type {PageBlobs}
   * @memberof PageBlobClient
   */
  private pageBlobContext: PageBlob;

  /**
   * Creates an instance of PageBlobClient.
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
   * @param {Pipeline} pipeline Call StorageClient.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof PageBlobClient
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.pageBlobContext = new PageBlob(this.storageClientContext);
  }

  /**
   * Creates a new PageBlobURL object from ConnectionString
   *
   * @param {string} connectionString
   * @param {INewPipelineOptions} pipelineOptions
   * @returns {PageBlobURL}
   * @memberof PageBlobURL
   */
  static fromConnectionString(
    connectionString: string,
    pipelineOptions?: NewPipelineOptions
  ): PageBlobClient {
    const extractedCreds = extractPartsWithValidation(connectionString);
    const sharedKeyCredential = new SharedKeyCredential(
      extractedCreds.accountName,
      extractedCreds.accountKey
    );
    const pipeline = StorageClient.newPipeline(sharedKeyCredential, pipelineOptions);
    // using the new constructor that takes BlobConnectionOptions
    return new PageBlobClient(extractedCreds.url, pipeline);
  }

  /**
   * Creates a new PageBlobURL object identical to the source but with the
   * Creates a new PageBlobClient object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {PageBlobClient}
   * @memberof PageBlobClient
   */
  public withPipeline(pipeline: Pipeline): PageBlobClient {
    return new PageBlobClient(this.url, pipeline);
  }

  /**
   * Creates a new PageBlobClient object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a Client to the base blob.
   *
   * @param {string} snapshot
   * @returns {PageBlobClient}
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
   * @param {number} size
   * @param {PageBlobCreateOptions} [options]
   * @returns {Promise<Models.PageBlobCreateResponse>}
   * @memberof PageBlobClient
   */
  public async create(
    size: number,
    options: PageBlobCreateOptions = {}
  ): Promise<Models.PageBlobCreateResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.create(0, size, {
      abortSignal: aborter,
      blobHTTPHeaders: options.blobHTTPHeaders,
      blobSequenceNumber: options.blobSequenceNumber,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions
    });
  }

  /**
   * Writes 1 or more pages to the page blob. The start and end offsets must be a multiple of 512.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-page
   *
   * @param {HttpRequestBody} body
   * @param {number} offset Offset of destination page blob
   * @param {number} count Content length of body, also how many bytes to be uploaded
   * @param {PageBlobUploadPagesOptions} [options]
   * @returns {Promise<Models.PageBlobsUploadPagesResponse>}
   * @memberof PageBlobClient
   */
  public async uploadPages(
    body: HttpRequestBody,
    offset: number,
    count: number,
    options: PageBlobUploadPagesOptions = {}
  ): Promise<Models.PageBlobUploadPagesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.uploadPages(body, count, {
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      onUploadProgress: options.progress,
      range: rangeToString({ offset, count }),
      sequenceNumberAccessConditions: options.accessConditions.sequenceNumberAccessConditions,
      transactionalContentMD5: options.transactionalContentMD5
    });
  }

  /**
   * Frees the specified pages from the page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-page
   *
   * @param {number} offset
   * @param {number} count
   * @param {PageBlobClearPagesOptions} [options]
   * @returns {Promise<Models.PageBlobClearPagesResponse>}
   * @memberof PageBlobClient
   */
  public async clearPages(
    offset: number,
    count: number,
    options: PageBlobClearPagesOptions = {}
  ): Promise<Models.PageBlobClearPagesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.clearPages(0, {
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      range: rangeToString({ offset, count }),
      sequenceNumberAccessConditions: options.accessConditions.sequenceNumberAccessConditions
    });
  }

  /**
   * Returns the list of valid page ranges for a page blob or snapshot of a page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param {number} offset
   * @param {number} count
   * @param {PageBlobGetPageRangesOptions} [options]
   * @returns {Promise<Models.PageBlobGetPageRangesResponse>}
   * @memberof PageBlobClient
   */
  public async getPageRanges(
    offset: number,
    count: number,
    options: PageBlobGetPageRangesOptions = {}
  ): Promise<Models.PageBlobGetPageRangesResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.getPageRanges({
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      range: rangeToString({ offset, count })
    });
  }

  /**
   * Gets the collection of page ranges that differ between a specified snapshot and this page blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-page-ranges
   *
   * @param {number} offset
   * @param {number} count
   * @param {string} prevSnapshot
   * @param {PageBlobGetPageRangesDiffOptions} [options]
   * @returns {Promise<Models.PageBlobGetPageRangesDiffResponse>}
   * @memberof PageBlobClient
   */
  public async getPageRangesDiff(
    offset: number,
    count: number,
    prevSnapshot: string,
    options: PageBlobGetPageRangesDiffOptions = {}
  ): Promise<Models.PageBlobGetPageRangesDiffResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.getPageRangesDiff({
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      prevsnapshot: prevSnapshot,
      range: rangeToString({ offset, count })
    });
  }

  /**
   * Resizes the page blob to the specified size (which must be a multiple of 512).
   * @see https://docs.microsoft.com/rest/api/storageservices/set-blob-properties
   *
   * @param {number} size
   * @param {PageBlobResizeOptions} [options]
   * @returns {Promise<Models.PageBlobResizeResponse>}
   * @memberof PageBlobClient
   */
  public async resize(
    size: number,
    options: PageBlobResizeOptions = {}
  ): Promise<Models.PageBlobResizeResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.resize(size, {
      abortSignal: aborter,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions
    });
  }

  /**
   * Sets a page blob's sequence number.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/set-blob-properties
   *
   * @param {Models.SequenceNumberActionType} sequenceNumberAction
   * @param {number} [sequenceNumber] Required if sequenceNumberAction is max or update
   * @param {PageBlobUpdateSequenceNumberOptions} [options]
   * @returns {Promise<Models.PageBlobUpdateSequenceNumberResponse>}
   * @memberof PageBlobClient
   */
  public async updateSequenceNumber(
    sequenceNumberAction: Models.SequenceNumberActionType,
    sequenceNumber?: number,
    options: PageBlobUpdateSequenceNumberOptions = {}
  ): Promise<Models.PageBlobUpdateSequenceNumberResponse> {
    const aborter = options.abortSignal || Aborter.none;
    options.accessConditions = options.accessConditions || {};
    return this.pageBlobContext.updateSequenceNumber(sequenceNumberAction, {
      abortSignal: aborter,
      blobSequenceNumber: sequenceNumber,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions
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
   * @param {string} copySource Specifies the name of the source page blob snapshot. For example,
   *                            https://myaccount.blob.core.windows.net/mycontainer/myblob?snapshot=<DateTime>
   * @param {PageBlobStartCopyIncrementalOptions} [options]
   * @returns {Promise<Models.PageBlobCopyIncrementalResponse>}
   * @memberof PageBlobClient
   */
  public async startCopyIncremental(
    copySource: string,
    options: PageBlobStartCopyIncrementalOptions = {}
  ): Promise<Models.PageBlobCopyIncrementalResponse> {
    const aborter = options.abortSignal || Aborter.none;
    return this.pageBlobContext.copyIncremental(copySource, {
      abortSignal: aborter,
      modifiedAccessConditions: options.modifiedAccessConditions
    });
  }
}
