import { HttpRequestBody, TransferProgressEvent } from "@azure/ms-rest-js";

import { Aborter } from "./Aborter";
import { BlobURL } from "./BlobURL";
import { ContainerURL } from "./ContainerURL";
import * as Models from "./generated/src/models";
import { BlockBlob } from "./generated/src/operations";
import { IRange, rangeToString } from "./IRange";
import { IBlobAccessConditions, IMetadata, ensureCpkIfSpecified, BlockBlobTier, toAccessTier } from "./models";
import { Pipeline } from "./Pipeline";
import { URLConstants } from "./utils/constants";
import { appendToURLPath, setURLParameter } from "./utils/utils.common";

export interface IBlockBlobUploadOptions {
  accessConditions?: IBlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  metadata?: IMetadata;
  progress?: (progress: TransferProgressEvent) => void;
  customerProvidedKey?: Models.CpkInfo;
  tier?: BlockBlobTier | string;
}

export interface IBlockBlobStageBlockOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
  progress?: (progress: TransferProgressEvent) => void;

  /**
   * An MD5 hash of the block content. This hash is used to verify the integrity of the block during transport. 
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   * 
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentMD5?: Uint8Array;

  /**
   * A CRC64 hash of the block content. This hash is used to verify the integrity of the block during transport. 
   * When this is specified, the storage service compares the hash of the content that has arrived with this value.
   * 
   * transactionalContentMD5 and transactionalContentCrc64 cannot be set at same time.
   */
  transactionalContentCrc64?: Uint8Array;
  customerProvidedKey?: Models.CpkInfo;
}

export interface IBlockBlobStageBlockFromURLOptions {
  range?: IRange;
  leaseAccessConditions?: Models.LeaseAccessConditions;

  /**
   * An MD5 hash of the content from the URI. 
   * This hash is used to verify the integrity of the content during transport of the data from the URI. 
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   * 
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentMD5?: Uint8Array;

  /**
   * A CRC64 hash of the content from the URI. 
   * This hash is used to verify the integrity of the content during transport of the data from the URI. 
   * When this is specified, the storage service compares the hash of the content that has arrived from the copy-source with this value.
   * 
   * sourceContentMD5 and sourceContentCrc64 cannot be set at same time.
   */
  sourceContentCrc64?: Uint8Array;
  customerProvidedKey?: Models.CpkInfo;
}

export interface IBlockBlobCommitBlockListOptions {
  accessConditions?: IBlobAccessConditions;
  blobHTTPHeaders?: Models.BlobHTTPHeaders;
  metadata?: IMetadata;
  customerProvidedKey?: Models.CpkInfo;
  accessTier?: Models.AccessTier;
  tier?: BlockBlobTier | string;
}

export interface IBlockBlobGetBlockListOptions {
  leaseAccessConditions?: Models.LeaseAccessConditions;
}

/**
 * BlockBlobURL defines a set of operations applicable to block blobs.
 *
 * @export
 * @class BlockBlobURL
 * @extends {StorageURL}
 */
export class BlockBlobURL extends BlobURL {
  /**
   * Creates a BlockBlobURL object from ContainerURL instance.
   *
   * @static
   * @param {ContainerURL} containerURL A ContainerURL object
   * @param {string} blobName A block blob name
   * @returns {BlockBlobURL}
   * @memberof BlockBlobURL
   */
  public static fromContainerURL(containerURL: ContainerURL, blobName: string): BlockBlobURL {
    return new BlockBlobURL(
      appendToURLPath(containerURL.url, encodeURIComponent(blobName)),
      containerURL.pipeline
    );
  }

  /**
   * Creates a BlockBlobURL object from BlobURL instance.
   *
   * @static
   * @param {BlobURL} blobURL
   * @returns {BlockBlobURL}
   * @memberof BlockBlobURL
   */
  public static fromBlobURL(blobURL: BlobURL): BlockBlobURL {
    return new BlockBlobURL(blobURL.url, blobURL.pipeline);
  }

  /**
   * blockBlobContext provided by protocol layer.
   *
   * @private
   * @type {BlockBlobs}
   * @memberof BlockBlobURL
   */
  private blockBlobContext: BlockBlob;

  /**
   * Creates an instance of BlockBlobURL.
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
   * @param {Pipeline} pipeline Call StorageURL.newPipeline() to create a default
   *                            pipeline, or provide a customized pipeline.
   * @memberof BlockBlobURL
   */
  constructor(url: string, pipeline: Pipeline) {
    super(url, pipeline);
    this.blockBlobContext = new BlockBlob(this.storageClientContext);
  }

  /**
   * Creates a new BlockBlobURL object identical to the source but with the
   * specified request policy pipeline.
   *
   * @param {Pipeline} pipeline
   * @returns {BlockBlobURL}
   * @memberof BlockBlobURL
   */
  public withPipeline(pipeline: Pipeline): BlockBlobURL {
    return new BlockBlobURL(this.url, pipeline);
  }

  /**
   * Creates a new BlockBlobURL object identical to the source but with the
   * specified snapshot timestamp.
   * Provide "" will remove the snapshot and return a URL to the base blob.
   *
   * @param {string} snapshot
   * @returns {BlockBlobURL}
   * @memberof BlockBlobURL
   */
  public withSnapshot(snapshot: string): BlockBlobURL {
    return new BlockBlobURL(
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
   * use stageBlock and commitBlockList.
   *
   * This is a non-parallel uploading method, please use uploadFileToBlockBlob(),
   * uploadStreamToBlockBlob() or uploadBrowserDataToBlockBlob() for better performance
   * with concurrency uploading.
   *
   * @see https://docs.microsoft.com/rest/api/storageservices/put-blob
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {HttpRequestBody} body Blob, string, ArrayBuffer, ArrayBufferView or a function
   *                               which returns a new Readable stream whose offset is from data source beginning.
   * @param {number} contentLength Length of body in bytes. Use Buffer.byteLength() to calculate body length for a
   *                               string including non non-Base64/Hex-encoded characters.
   * @param {IBlockBlobUploadOptions} [options]
   * @returns {Promise<Models.BlockBlobUploadResponse>}
   * @memberof BlockBlobURL
   */
  public async upload(
    aborter: Aborter,
    body: HttpRequestBody,
    contentLength: number,
    options: IBlockBlobUploadOptions = {}
  ): Promise<Models.BlockBlobUploadResponse> {
    options.accessConditions = options.accessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.blockBlobContext.upload(body, contentLength, {
      abortSignal: aborter,
      blobHTTPHeaders: options.blobHTTPHeaders,
      leaseAccessConditions: options.accessConditions.leaseAccessConditions,
      metadata: options.metadata,
      modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
      onUploadProgress: options.progress,
      cpkInfo: options.customerProvidedKey,
      tier: toAccessTier(options.tier)
    });
  }

  /**
   * Uploads the specified block to the block blob's "staging area" to be later
   * committed by a call to commitBlockList.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-block
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string} blockId A 64-byte value that is base64-encoded
   * @param {HttpRequestBody} body
   * @param {number} contentLength
   * @param {IBlockBlobStageBlockOptions} [options]
   * @returns {Promise<Models.BlockBlobStageBlockResponse>}
   * @memberof BlockBlobURL
   */
  public async stageBlock(
    aborter: Aborter,
    blockId: string,
    body: HttpRequestBody,
    contentLength: number,
    options: IBlockBlobStageBlockOptions = {}
  ): Promise<Models.BlockBlobStageBlockResponse> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.blockBlobContext.stageBlock(blockId, contentLength, body, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions,
      onUploadProgress: options.progress,
      transactionalContentMD5: options.transactionalContentMD5,
      transactionalContentCrc64: options.transactionalContentCrc64,
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * The Stage Block From URL operation creates a new block to be committed as part
   * of a blob where the contents are read from a URL.
   * This API is available starting in version 2018-03-28.
   * @see https://docs.microsoft.com/en-us/rest/api/storageservices/put-block-from-url
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
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
   * @param {number} offset From which position of the blob to download, >= 0
   * @param {number} [count] How much data to be downloaded, > 0. Will download to the end when undefined
   * @param {IBlockBlobStageBlockFromURLOptions} [options={}]
   * @returns {Promise<Models.BlockBlobStageBlockFromURLResponse>}
   * @memberof BlockBlobURL
   */
  public async stageBlockFromURL(
    aborter: Aborter,
    blockId: string,
    sourceURL: string,
    offset: number,
    count?: number,
    options: IBlockBlobStageBlockFromURLOptions = {}
  ): Promise<Models.BlockBlobStageBlockFromURLResponse> {
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.blockBlobContext.stageBlockFromURL(blockId, 0, sourceURL, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions,
      sourceContentMD5: options.sourceContentMD5,
      sourceContentCrc64: options.sourceContentCrc64,
      sourceRange: offset === 0 && !count ? undefined : rangeToString({ offset, count }),
      cpkInfo: options.customerProvidedKey
    });
  }

  /**
   * Writes a blob by specifying the list of block IDs that make up the blob.
   * In order to be written as part of a blob, a block must have been successfully written
   * to the server in a prior stageBlock operation. You can call commitBlockList to update a blob
   * by uploading only those blocks that have changed, then committing the new and existing
   * blocks together. Any blocks not specified in the block list and permanently deleted.
   * @see https://docs.microsoft.com/rest/api/storageservices/put-block-list
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {string[]} blocks  Array of 64-byte value that is base64-encoded
   * @param {IBlockBlobCommitBlockListOptions} [options]
   * @returns {Promise<Models.BlockBlobCommitBlockListResponse>}
   * @memberof BlockBlobURL
   */
  public async commitBlockList(
    aborter: Aborter,
    blocks: string[],
    options: IBlockBlobCommitBlockListOptions = {}
  ): Promise<Models.BlockBlobCommitBlockListResponse> {
    options.accessConditions = options.accessConditions || {};
    ensureCpkIfSpecified(options.customerProvidedKey, this.isHttps);

    return this.blockBlobContext.commitBlockList(
      { latest: blocks },
      {
        abortSignal: aborter,
        blobHTTPHeaders: options.blobHTTPHeaders,
        leaseAccessConditions: options.accessConditions.leaseAccessConditions,
        metadata: options.metadata,
        modifiedAccessConditions: options.accessConditions.modifiedAccessConditions,
        cpkInfo: options.customerProvidedKey,
        tier: toAccessTier(options.tier)
      }
    );
  }

  /**
   * Returns the list of blocks that have been uploaded as part of a block blob
   * using the specified block list filter.
   * @see https://docs.microsoft.com/rest/api/storageservices/get-block-list
   *
   * @param {Aborter} aborter Create a new Aborter instance with Aborter.none or Aborter.timeout(),
   *                          goto documents of Aborter for more examples about request cancellation
   * @param {Models.BlockListType} listType
   * @param {IBlockBlobGetBlockListOptions} [options]
   * @returns {Promise<Models.BlockBlobGetBlockListResponse>}
   * @memberof BlockBlobURL
   */
  public async getBlockList(
    aborter: Aborter,
    listType: Models.BlockListType,
    options: IBlockBlobGetBlockListOptions = {}
  ): Promise<Models.BlockBlobGetBlockListResponse> {
    const res = await this.blockBlobContext.getBlockList(listType, {
      abortSignal: aborter,
      leaseAccessConditions: options.leaseAccessConditions
    });

    if (!res.committedBlocks) {
      res.committedBlocks = [];
    }

    if (!res.uncommittedBlocks) {
      res.uncommittedBlocks = [];
    }

    return res;
  }
}
