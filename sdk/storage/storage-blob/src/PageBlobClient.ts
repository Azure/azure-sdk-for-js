// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  HttpRequestBody,
  TransferProgressEvent,
  TokenCredential,
  isTokenCredential,
  isNode
} from "@azure/core-http";

import * as Models from "./generated/lib/models";
import { Aborter } from "./Aborter";
import { BlobClient } from "./internal";
import { PageBlob } from "./generated/lib/operations";
import { rangeToString } from "./Range";
import { BlobAccessConditions, Metadata, PageBlobAccessConditions } from "./models";
import { newPipeline, NewPipelineOptions, Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { setURLParameter, extractConnectionStringParts } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { Credential } from "./credentials/Credential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";

/**
 * Options to configure Page Blob - Create operation.
 *
 * @export
 * @interface PageBlobCreateOptions
 */
export interface PageBlobCreateOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof PageBlobCreateOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when creating a page blob.
   *
   * @type {BlobAccessConditions}
   * @memberof PageBlobCreateOptions
   */
  accessConditions?: BlobAccessConditions;
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
   * @type {Models.BlobHTTPHeaders}
   * @memberof PageBlobCreateOptions
   */
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  /**
   * A collection of key-value string pair to associate with the blob when creating append blobs.
   *
   * @type {Metadata}
   * @memberof PageBlobCreateOptions
   */
  metadata?: Metadata;
}

/**
 * Options to configure Page Blob - Upload Pages operation.
 *
 * @export
 * @interface PageBlobUploadPagesOptions
 */
export interface PageBlobUploadPagesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof PageBlobUploadPagesOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when uploading pages.
   *
   * @type {PageBlobAccessConditions}
   * @memberof PageBlobUploadPagesOptions
   */
  accessConditions?: PageBlobAccessConditions;
  /**
   * Callback to receive events on the progress of upload pages operation.
   *
   * @memberof PageBlobUploadPagesOptions
   */
  progress?: (progress: TransferProgressEvent) => void;
  /**
   * A Uint8Array holding the MD5 hash of the blob content.
   * It is only used to verify the integrity of the block during transport.
   * It is not stored in with the blob.
   *
   * @type {Uint8Array}
   * @memberof PageBlobUploadPagesOptions
   */
  transactionalContentMD5?: Uint8Array;
}

/**
 * Options to configure Page Blob - Clear Pages operation.
 *
 * @export
 * @interface PageBlobClearPagesOptions
 */
export interface PageBlobClearPagesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof PageBlobClearPagesOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when clearing pages.
   *
   * @type {PageBlobAccessConditions}
   * @memberof PageBlobClearPagesOptions
   */
  accessConditions?: PageBlobAccessConditions;
}

/**
 * Options to configure Page Blob - Get Page Ranges operation.
 *
 * @export
 * @interface PageBlobGetPageRangesOptions
 */
export interface PageBlobGetPageRangesOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof PageBlobGetPageRangesOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when getting page ranges.
   *
   * @type {BlobAccessConditions}
   * @memberof PageBlobGetPageRangesOptions
   */
  accessConditions?: BlobAccessConditions;
}

/**
 * Options to configure Page Blob - Get Ranges Diff operation.
 *
 * @export
 * @interface PageBlobGetPageRangesDiffOptions
 */
export interface PageBlobGetPageRangesDiffOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof PageBlobGetPageRangesDiffOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when getting page ranges diff.
   *
   * @type {BlobAccessConditions}
   * @memberof PageBlobGetPageRangesDiffOptions
   */
  accessConditions?: BlobAccessConditions;
  /**
   * (unused)
   *
   * @type {string}
   * @memberof PageBlobGetPageRangesDiffOptions
   */
  range?: string;
}

/**
 * Options to configure Page Blob - Resize operation.
 *
 * @export
 * @interface PageBlobResizeOptions
 */
export interface PageBlobResizeOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof PageBlobResizeOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when resizing a page blob.
   *
   * @type {BlobAccessConditions}
   * @memberof PageBlobResizeOptions
   */
  accessConditions?: BlobAccessConditions;
}

/**
 * Options to configure Page Blob - Update Sequence Number operation.
 *
 * @export
 * @interface PageBlobUpdateSequenceNumberOptions
 */
export interface PageBlobUpdateSequenceNumberOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof PageBlobUpdateSequenceNumberOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when updating sequence number.
   *
   * @type {BlobAccessConditions}
   * @memberof PageBlobUpdateSequenceNumberOptions
   */
  accessConditions?: BlobAccessConditions;
}

/**
 * Options to configure Page Blob - Start Copy Incremental operation.
 *
 * @export
 * @interface PageBlobStartCopyIncrementalOptions
 */
export interface PageBlobStartCopyIncrementalOptions {
  /**
   * Aborter instance to cancel request. It can be created with Aborter.none
   * or Aborter.timeout(). Go to documents of {@link Aborter} for more examples
   * about request cancellation.
   *
   * @type {Aborter}
   * @memberof PageBlobStartCopyIncrementalOptions
   */
  abortSignal?: Aborter;
  /**
   * Conditions to meet when startting copy incremental operation.
   *
   * @type {Models.ModifiedAccessConditions}
   * @memberof PageBlobStartCopyIncrementalOptions
   */
  modifiedAccessConditions?: Models.ModifiedAccessConditions;
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
   * ONLY AVAILABLE IN NODE.JS RUNTIME.
   *
   * Creates an instance of PageBlobClient.
   *
   * @param {string} connectionString Connection string for an Azure storage account.
   * @param {string} containerName Container name.
   * @param {string} blobName Blob name.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof PageBlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: NewPipelineOptions
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
   * @param {Credential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential, RawTokenCredential,
   *                                                  or a TokenCredential from @azure/identity.
   * @param {NewPipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof PageBlobClient
   */
  constructor(url: string, credential: Credential | TokenCredential, options?: NewPipelineOptions);
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
    credentialOrPipelineOrContainerName: string | Credential | TokenCredential | Pipeline,
    blobNameOrOptions?: string | NewPipelineOptions,
    options?: NewPipelineOptions
  ) {
    // In TypeScript we cannot simply pass all parameters to super() like below so have to duplicate the code instead.
    //   super(s, credentialOrPipelineOrContainerNameOrOptions, blobNameOrOptions, options);
    let pipeline: Pipeline;
    if (credentialOrPipelineOrContainerName instanceof Pipeline) {
      pipeline = credentialOrPipelineOrContainerName;
    } else if (
      credentialOrPipelineOrContainerName instanceof Credential ||
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
      if (isNode) {
        const containerName = credentialOrPipelineOrContainerName;
        const blobName = blobNameOrOptions;

        const extractedCreds = extractConnectionStringParts(urlOrConnectionString);
        const sharedKeyCredential = new SharedKeyCredential(
          extractedCreds.accountName,
          extractedCreds.accountKey
        );
        urlOrConnectionString = extractedCreds.url + "/" + containerName + "/" + blobName;
        pipeline = newPipeline(sharedKeyCredential, options);
      } else {
        throw new Error("Connection string is only supported in Node.js environment");
      }
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
    super(urlOrConnectionString, pipeline);
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
   * @returns {Promise<Models.PageBlobCreateResponse>} Response data for the Page Blob Create operation.
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
   * @param {HttpRequestBody} body Data to upload
   * @param {number} offset Offset of destination page blob
   * @param {number} count Content length of body, also how many bytes to be uploaded
   * @param {PageBlobUploadPagesOptions} [options] Options to the Page Blob Upload Pages operation.
   * @returns {Promise<Models.PageBlobsUploadPagesResponse>} Response data for the Page Blob Upload Pages operation.
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
   * @param {number} [offset] Starting byte position of the pages to clear.
   * @param {number} [count] Number of bytes to clear.
   * @param {PageBlobClearPagesOptions} [options] Options to the Page Blob Clear Pages operation.
   * @returns {Promise<Models.PageBlobClearPagesResponse>} Response data for the Page Blob Clear Pages operation.
   * @memberof PageBlobClient
   */
  public async clearPages(
    offset: number = 0,
    count?: number,
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
   * @param {number} [offset] Starting byte position of the page ranges.
   * @param {number} [count] Number of bytes to get.
   * @param {PageBlobGetPageRangesOptions} [options] Options to the Page Blob Get Ranges operation.
   * @returns {Promise<Models.PageBlobGetPageRangesResponse>} Response data for the Page Blob Get Ranges operation.
   * @memberof PageBlobClient
   */
  public async getPageRanges(
    offset: number = 0,
    count?: number,
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
   * @param {number} offset Starting byte position of the page blob
   * @param {number} count Number of bytes to get ranges diff.
   * @param {string} prevSnapshot Timestamp of snapshot to retrive the difference.
   * @param {PageBlobGetPageRangesDiffOptions} [options] Options to the Page Blob Get Page Ranges Diff operation.
   * @returns {Promise<Models.PageBlobGetPageRangesDiffResponse>} Response data for the Page Blob Get Page Range Diff operation.
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
   * @param {number} size Target size
   * @param {PageBlobResizeOptions} [options] Options to the Page Blob Resize operation.
   * @returns {Promise<Models.PageBlobResizeResponse>} Response data for the Page Blob Resize operation.
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
   * @param {Models.SequenceNumberActionType} sequenceNumberAction Indicates how the service should modify the blob's sequence number.
   * @param {number} [sequenceNumber] Required if sequenceNumberAction is max or update
   * @param {PageBlobUpdateSequenceNumberOptions} [options] Options to the Page Blob Update Sequence Number operation.
   * @returns {Promise<Models.PageBlobUpdateSequenceNumberResponse>} Response data for the Page Blob Update Sequence Number operation.
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
   * @param {PageBlobStartCopyIncrementalOptions} [options] Options to the Page Blob Copy Incremental operation.
   * @returns {Promise<Models.PageBlobCopyIncrementalResponse>} Response data for the Page Blob Copy Incremental operation.
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
