// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  HttpRequestBody,
  TransferProgressEvent,
  TokenCredential,
  PipelineOptions
} from "@azure/core-http";
import { CanonicalCode } from "@azure/core-tracing";
import { AbortSignalLike } from "@azure/abort-controller";
import { BlobClient, CommonOptions } from "./internal";
import {
  BlobHTTPHeaders,
  CpkInfo,
  ModifiedAccessConditions,
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
import { rangeToString } from "./Range";
import {
  BlobRequestConditions,
  Metadata,
  PageBlobRequestConditions,
  ensureCpkIfSpecified,
  PremiumPageBlobTier,
  toAccessTier
} from "./models";
import { URLConstants } from "./utils/constants";
import { setURLParameter } from "./utils/utils.common";
import { SharedKeyCredential } from "./credentials/SharedKeyCredential";
import { AnonymousCredential } from "./credentials/AnonymousCredential";
import { createSpan } from "./utils/tracing";
import {
  PageBlobGetPageRangesDiffResponse,
  PageBlobGetPageRangesResponse,
  rangeResponseFromModel
} from "./PageBlobRangeResponse";

/**
 * Options to configure Page Blob - Create operation.
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
 * Options to configure Page Blob - Upload Pages operation.
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
 * Options to configure Page Blob - Clear Pages operation.
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
 * Options to configure Page Blob - Get Page Ranges operation.
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
 * Options to configure Page Blob - Get Ranges Diff operation.
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
 * Options to configure Page Blob - Resize operation.
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
 * Options to configure Page Blob - Update Sequence Number operation.
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
 * Options to configure Page Blob - Start Copy Incremental operation.
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
   * @param {PipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof PageBlobClient
   */
  constructor(
    connectionString: string,
    containerName: string,
    blobName: string,
    options?: PipelineOptions
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
   * @param {SharedKeyCredential | AnonymousCredential | TokenCredential} credential Such as AnonymousCredential, SharedKeyCredential
   *                                                  or a TokenCredential from @azure/identity.
   * @param {PipelineOptions} [options] Optional. Options to configure the HTTP pipeline.
   * @memberof PageBlobClient
   */
  constructor(
    url: string,
    credential: SharedKeyCredential | AnonymousCredential | TokenCredential,
    options?: PipelineOptions
  );
  constructor(
    urlOrConnectionString: string,
    credentialOrContainerName: string | SharedKeyCredential | AnonymousCredential | TokenCredential,
    blobNameOrOptions?: string | PipelineOptions,
    options?: PipelineOptions
  ) {
    if (typeof credentialOrContainerName === "string" && typeof blobNameOrOptions === "string") {
      // (connectionString: string, containerName: string, blobName: string, options?: PipelineOptions)
      super(urlOrConnectionString, credentialOrContainerName, blobNameOrOptions, options);
    } else if (
      typeof credentialOrContainerName !== "string" &&
      typeof blobNameOrOptions !== "string"
    ) {
      super(urlOrConnectionString, credentialOrContainerName, options);
    } else {
      throw new Error("Expecting non-empty strings for containerName and blobName parameters");
    }
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
      this.credential,
      this.pipelineOptions
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
    const { span, spanOptions } = createSpan("PageBlobClient-create", options.spanOptions);
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
    const { span, spanOptions } = createSpan("PageBlobClient-uploadPages", options.spanOptions);
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
      options.spanOptions
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
    const { span, spanOptions } = createSpan("PageBlobClient-clearPages", options.spanOptions);
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
    const { span, spanOptions } = createSpan("PageBlobClient-getPageRanges", options.spanOptions);
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
      options.spanOptions
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
    const { span, spanOptions } = createSpan("PageBlobClient-resize", options.spanOptions);
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
      options.spanOptions
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
      options.spanOptions
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
