import { HttpRequestBody, TransferProgressEvent } from "@azure/ms-rest-js";

import { Aborter } from "./Aborter";
import { BlobURL } from "./BlobURL";
import { ContainerURL } from "./ContainerURL";
import * as Models from "./generated/src/models";
import { AppendBlob } from "./generated/src/operations";
import { rangeToString } from "./IRange";
import { IAppendBlobAccessConditions, IBlobAccessConditions, IMetadata, ensureCpkIfSpecified } from "./models";
import { Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { appendToURLPath, setURLParameter } from "./utils/utils.common";

export interface IAppendBlobCreateOptions {
  accessConditions?: IBlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  metadata?: IMetadata;
  customerProvidedKey?: Models.CpkInfo;
}

export interface IAppendBlobAppendBlockOptions {
  accessConditions?: IAppendBlobAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport. 
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   * 
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentMD5?: Uint8Array;

  /**
   * A CRC64 hash of the append block content. This hash is used to verify the integrity of the append block during transport. 
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   * 
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentCrc64?: Uint8Array;

  customerProvidedKey?: Models.CpkInfo;
}

export interface IAppendBlobAppendBlockFromURLOptions {
  accessConditions?: IAppendBlobAccessConditions;
  sourceModifiedAccessConditions?: Models.ModifiedAccessConditions;

  /**
   * An MD5 hash of the append block content from the URI. 
   * This hash is used to verify the integrity of the append block during transport of the data from the URI. 
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   * 
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentMD5?: Uint8Array;

  /**
   * A CRC64 hash of the append block content from the URI. 
   * This hash is used to verify the integrity of the append block during transport of the data from the URI. 
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   * 
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentCrc64?: Uint8Array;

  customerProvidedKey?: Models.CpkInfo;
}

/**
 * AppendBlobURL defines a set of operations applicable to append blobs.
 *
 * @export
 * @class AppendBlobURL
 * @extends {StorageURL}
 */
export class AppendBlobURL extends BlobURL {
  /**
   * Creates a AppendBlobURL object from ContainerURL instance.
   *
   * @static
   * @param {ContainerURL} containerURL A ContainerURL object
   * @param {string} blobName An append blob name
   * @returns {AppendBlobURL}
   * @memberof AppendBlobURL
   */
  public static fromContainerURL(containerURL: ContainerURL, blobName: string): AppendBlobURL {
    return new AppendBlobURL(
      appendToURLPath(containerURL.url, encodeURIComponent(blobName)),
      containerURL.pipeline
    );
  }

  /**
   * Creates a AppendBlobURL object from BlobURL instance.
   *
   * @static
   * @param {BlobURL} blobURL
   * @returns {AppendBlobURL}
   * @memberof AppendBlobURL
   */
  public static fromBlobURL(blobURL: BlobURL): AppendBlobURL {
    return new AppendBlobURL(blobURL.url, blobURL.pipeline);
  }

  /**
   * appendBlobsContext provided by protocol layer.
   *
   * @private
   * @type {AppendBlobs}
   * @memberof AppendBlobURL
   */
  private appendBlobContext: AppendBlob;

  /**
   * Creates an instance of AppendBlobURL.
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
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof AppendBlobURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.appendBlobContext = new AppendBlob(this.storageClientContext);
  }

  /**
   * Creates a new AppendBlobURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {AppendBlobURL}
   * @memberof AppendBlobURL
   */
  public withPipeline(pipeline: Pipeline): AppendBlobURL {
    return new AppendBlobURL(this.url, pipeline);
  }

  /**
   * Creates a new AppendBlobURL object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param {string} snapshot
   * @returns {AppendBlobURL}
   * @memberof AppendBlobURL
   */
  public withSnapshot(snapshot: string): AppendBlobURL {
    return new AppendBlobURL(
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
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {IAppendBlobCreateOptions} [options]
   * @returns {Promise<Models.AppendBlobsCreateResponse>}
   * @memberof AppendBlobURL
   */
  public async create(
    aborter: Aborter,
    options: IAppendBlobCreateOptions = {}
  ): Promise<Models.AppendBlobCreateResponse> {
    options.accessConditions = options.accessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.appendBlobContext.create(0, {
      abortSignal: aborter,
      blobHTTPHeaders: options.blobHTTPHeaders,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * Commits a new block of data to the end of the existing append blob.
   * @see https://docs.microsoft.com/rest/api/storageservices/append-block
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {HttpRequestBody} body
   * @param {number} contentLength Length of the body in bytes
   * @param {IAppendBlobAppendBlockOptions} [options]
   * @returns {Promise<Models.AppendBlobsAppendBlockResponse>}
   * @memberof AppendBlobURL
   */
  public async appendBlock(
    aborter: Aborter,
    body: HttpRequestBody,
    contentLength: number,
    options: IAppendBlobAppendBlockOptions = {}
  ): Promise<Models.AppendBlobAppendBlockResponse> {
    options.accessConditions = options.accessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.appendBlobContext.appendBlock(body, contentLength, {
      abortSignal: aborter,
      appendPositionAccessConditions: options.accessConditions.appendPositionAccessConditions,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      onUploadProgress: options.progress,
      transactionalContentMD5: options.transactionalContentMD5,
      transactionalContentCrc64: options.transactionalContentCrc64,
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * The Append Block operation commits a new block of data to the end of an existing append blob
   * where the contents are read from a source url.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/append-block-from-url
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} sourceURL 
   *                 The url to the blob that will be the source of the copy. A source blob in the same storage account can
   *                 be authenticated via Shared Key. However, if the source is a blob in another account, the source blob
   *                 must either be public or must be authenticated via a shared access signature. If the source blob is
   *                 public, no authentication is required to perform the operation.
   * @param {number} sourceOffset Offset in source to be appended
   * @param {number} count Number of bytes to be appended as a block
   * @param {IAppendBlobAppendBlockFromURLOptions} [options={}]
   * @returns {Promise<Models.AppendBlobAppendBlockFromUrlResponse>}
   * @memberof AppendBlobURL
   */
  public async appendBlockFromURL(
    aborter: Aborter,
    sourceURL: string,
    sourceOffset: number,
    count: number,
    options: IAppendBlobAppendBlockFromURLOptions = {}
  ): Promise<Models.AppendBlobAppendBlockFromUrlResponse> {
    options.accessConditions = options.accessConditions || {};
    options.sourceModifiedAccessConditions = options.sourceModifiedAccessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);
    
    return this.appendBlobContext.appendBlockFromUrl(sourceURL, 0, {
      abortSignal: aborter,
      sourceRange: rangeToString({offset: sourceOffset, count}),
      sourceContentMD5: options.sourceContentMD5,
      sourceContentCrc64: options.sourceContentCrc64,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      appendPositionAccessConditions: options.accessConditions.appendPositionAccessConditions,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      sourceModifiedAccessConditions: {
        sourceIfMatch: options.sourceModifiedAccessConditions.ifMatch,
        sourceIfModifiedSince: options.sourceModifiedAccessConditions.ifModifiedSince,
        sourceIfNoneMatch: options.sourceModifiedAccessConditions.ifNoneMatch,
        sourceIfUnmodifiedSince: options.sourceModifiedAccessConditions.ifUnmodifiedSince
      },
      cpkInfo: options.customerProvidedKey
    })
  }
}
